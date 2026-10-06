// 플레이 카메라(6차): 경로를 따라 새 뒤 9m, 30m 앞을 약 6° 내려다본다. 높이는 통로 중심(course.center)을 따라간다.
// 새를 느슨하게 따라가(좌우 0.45, 위아래 0.6) 새를 끝까지 몰면 화면 가장자리 가까이까지 간다.
// 멀미 규칙(6차 명세): 화면 기울기 = 경로 몫 5° + 새 몫 3°, 롤 따라가기까지 합쳐 8° 이하.
//   오르막·내리막: 카메라 위아래 기울기(피치)는 경사의 절반만 따라가고 5° 이하. FOV 변화는 합쳐 5° 이하.
// 6차 코스에는 통로 안 구조물이 없어(다리 상판은 통로 위) 가둠은 이동 타원을 1m 넓힌 범위만 본다.
import * as THREE from 'three';
import { CAMERA, FEEL, ROLL } from './config.js';

const DEG = Math.PI / 180;

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    camera.near = CAMERA.near;
    camera.updateProjectionMatrix();
    this.course = null;
    this.s = 0;
    this.u = 0;
    this.w = 1.2;
    this.v = 17;
    this.roll = 0;
    this.rollExtra = 0;
    this.pitch = 0; // 경사로 생긴 피치(라디안, + 위)
    this.kick = 0;
    this.trauma = 0; // 트라우마 흔들림(0~1): 흔들림 = 트라우마² × 최대 0.35m, 부드러운 잡음, 1초에 1.2 감쇠
    this.tt = 0;
    this.finale = 0; // 0~1: 피날레 직전 전경 연출
    this.off = new THREE.Vector3();
    this._p = new THREE.Vector3();
    this._look = new THREE.Vector3();
    this._sec = {};
    this.colliders = [];
  }

  setCourse(course) {
    this.course = course;
  }

  _center(s) {
    const C = this.course;
    if (C.center) return C.center(s);
    const sec = C.stage.section;
    return (sec.v0 + sec.v1) / 2;
  }

  // 목표(경로 좌표 s, u, w = 통로 중심에서 높이)
  _target(bird) {
    const dist = CAMERA.distance + CAMERA.finaleBack * this.finale;
    const s = bird.s - dist;
    const bw = bird.w !== undefined ? bird.w : bird.v - this._center(bird.s);
    return { s, u: CAMERA.followU * bird.u, w: CAMERA.followV * bw + CAMERA.upOffset, v: this._center(s) + CAMERA.followV * bw + CAMERA.upOffset };
  }

  _clamp() {
    const C = this.course;
    const E = C.E || { u: 9, v: 6 };
    this.u = Math.max(-E.u - 1, Math.min(E.u + 1, this.u));
    this.w = Math.max(-E.v + 0.5, Math.min(E.v + 1, this.w));
    this.v = this._center(this.s) + this.w;
  }

  reset(bird) {
    if (!this.course) return;
    const t = this._target(bird);
    this.s = t.s;
    this.u = t.u;
    this.w = t.w;
    this.roll = 0;
    this.rollExtra = 0;
    this.pitch = this._pitchTarget(bird.s);
    this.kick = 0;
    this.trauma = 0;
    this.off.set(0, 0, 0);
    this._clamp();
    this.apply();
  }

  snap(bird) {
    const t = this._target(bird);
    this.u = t.u;
    this.w = t.w;
  }

  fovKick(deg = CAMERA.fovKick) {
    this.kick = Math.max(this.kick, deg);
  }

  shake(strength) {
    if (strength <= 0) return;
    this.addTrauma(0.35 * Math.min(1, strength));
  }

  addTrauma(x) {
    this.trauma = Math.min(1, this.trauma + x);
  }

  // 경사의 절반, 5° 이하
  _pitchTarget(s) {
    const C = this.course;
    if (!C.slope) return 0;
    // 카메라 자리와 새 자리 사이 평균 경사(갑자기 꺾이지 않게)
    const sl = (C.slope(s) + C.slope(s - CAMERA.distance) + C.slope(s + 10)) / 3;
    const a = Math.atan(sl) * CAMERA.pitchFollow;
    return THREE.MathUtils.clamp(a, -CAMERA.maxPitchDeg * DEG, CAMERA.maxPitchDeg * DEG);
  }

  // dtReal: 실제 시간(슬로모·히트스톱과 무관하게 흔들림이 줄어든다)
  update(dt, bird, reduceMotion, dtReal = dt) {
    const t = this._target(bird);
    const k = 1 - Math.exp(-CAMERA.spring * dt);
    this.s = t.s;
    this.u += (t.u - this.u) * k;
    this.w += (t.w - this.w) * k;
    this._clamp();
    // 기울기: 경로 굽음(경사 선회) 5° 이하 + 새 기울기 3° 이하
    const p = this.course.at(bird.s, this._at || (this._at = {}));
    const f = bird.forward || 13;
    const pathRoll = THREE.MathUtils.clamp(-Math.atan((f * f * p.k) / 9.8), -CAMERA.maxRollPathDeg * DEG, CAMERA.maxRollPathDeg * DEG);
    const birdRoll = THREE.MathUtils.clamp((bird.roll || 0) * CAMERA.rollFromBird, -CAMERA.maxRollBirdDeg * DEG, CAMERA.maxRollBirdDeg * DEG);
    const rx = bird.rollT >= 0 ? Math.min(1, bird.rollT / ROLL.duration) : 0;
    const rollFollow = bird.rollT >= 0 ? -(bird.spinSign || 1) * ROLL.camFollowDeg * DEG * Math.sin(Math.PI * rx) : 0;
    const targetRoll = reduceMotion ? 0 : pathRoll + birdRoll;
    this.roll += (targetRoll - this.roll) * Math.min(1, 4 * dt);
    this.rollExtra = reduceMotion ? 0 : rollFollow;
    // 합계 8° 이하
    const lim = CAMERA.maxRollDeg * DEG;
    const sum = this.roll + this.rollExtra;
    if (Math.abs(sum) > lim) this.rollExtra = Math.sign(sum) * lim - this.roll;
    const pt = reduceMotion ? 0 : this._pitchTarget(bird.s);
    this.pitch += (pt - this.pitch) * Math.min(1, 3 * dt);
    this.kick = reduceMotion ? 0 : this.kick * Math.exp(-CAMERA.fovKickDecay * dt);
    this.trauma = Math.max(0, this.trauma - FEEL.trauma.decay * dtReal);
    this.tt += dtReal;
    if (this.trauma > 0 && !reduceMotion) {
      const a = this.trauma * this.trauma * FEEL.trauma.maxShake;
      const w = this.tt * FEEL.trauma.freq;
      const nx = Math.sin(w * 1.0 + 1.3) * 0.6 + Math.sin(w * 2.31 + 0.2) * 0.3 + Math.sin(w * 4.7 + 2.1) * 0.1;
      const ny = Math.sin(w * 1.17 + 4.1) * 0.6 + Math.sin(w * 2.73 + 1.7) * 0.3 + Math.sin(w * 5.3 + 0.6) * 0.1;
      this.off.set(nx * a, ny * a, 0);
    } else {
      this.off.set(0, 0, 0);
    }
    this.apply();
  }

  // 지금 화면 기울기·피치(점검용, 도)
  get rollDeg() {
    return ((this.roll + (this.rollExtra || 0)) / DEG);
  }

  apply() {
    const c = this.camera;
    const C = this.course;
    C.toWorld(this.s, this.u + this.off.x, this.v + this.off.y, this._p);
    c.position.copy(this._p);
    // 30m 앞, 기본 6° 내려다봄 + 경사 절반
    const L = CAMERA.lookAhead;
    const drop = CAMERA.pitchDrop - Math.tan(this.pitch) * L;
    C.toWorld(this.s + L, this.u, this.v - drop, this._look);
    c.up.set(0, 1, 0);
    c.lookAt(this._look);
    if (this.roll || this.rollExtra) c.rotateZ(this.roll + (this.rollExtra || 0));
    const fov = CAMERA.fov + (CAMERA.finaleFov - CAMERA.fov) * this.finale + this.kick;
    if (Math.abs(c.fov - fov) > 1e-3) {
      c.fov = fov;
      c.updateProjectionMatrix();
    }
  }

  // 추락 때: 경로 뒤에서 떨어지는 새를 바라본다
  follow(dt, bird) {
    const c = this.camera;
    const k = 1 - Math.exp(-3 * dt);
    this.s = bird.s - CAMERA.distance - 2;
    this.u += (bird.u * 0.5 - this.u) * k;
    this.v += (Math.max(3, bird.v + 5) - this.v) * k;
    this.w = this.v - this._center(this.s);
    this.roll *= Math.exp(-4 * dt);
    this.rollExtra = 0;
    this.kick = 0;
    this.course.toWorld(this.s, this.u, this.v, this._p);
    c.position.copy(this._p);
    c.up.set(0, 1, 0);
    c.lookAt(bird.pos);
    if (Math.abs(c.fov - CAMERA.fov) > 1e-3) {
      c.fov = CAMERA.fov;
      c.updateProjectionMatrix();
    }
  }
}
