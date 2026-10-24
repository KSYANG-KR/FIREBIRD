// 플레이어 새(6차): 경로를 따라 자동 전진(s), 옆(u)·위아래(w = 통로 중심에서 높이) 이동. 이동 타원(±9, ±6m) 끝에서 부드럽게 멈춤, 날갯짓.
// v(세계 높이) = 통로 중심 높이(course.center(s)) + w. 오르막·내리막에서도 손을 놓으면 통로 가운데 높이를 그대로 따라간다.
// Shift 특수 능력은 6차에서 뺐다(조작 단순화).
// 세계 위치(pos)는 매 걸음 경로 좌표에서 계산한다. 몸은 경로 방향을 바라본다.
import * as THREE from 'three';
import { BIRDS, ROLL, FEEL, BAND } from './config.js';
import { createBirdModel, poseBird, setBirdGLB } from './models.js';

export class Bird {
  constructor(scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.pos = this.group.position;
    this.vx = 0;
    this.vy = 0;
    this.phase = 0;
    this.roll = 0;
    this.pitch = 0;
    this.lastDir = { x: 1, y: 0 };
    // 비둘기 특수(피해 절반) 보호막
    this.shield = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.7, 1.4), transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    this.shield.visible = false;
    this.group.add(this.shield);
    this.shield.renderOrder = 51;
    this.yaw = 0;
    this.fold = 0; // 12차: 센터 통과 날개 접기(0~1)
    this.foldTarget = 0;
    this.setSpecies('sparrow');
  }

  setSpecies(id) {
    if (this.model) {
      this.group.remove(this.model.root);
      // 16차 U11(2-7 메모리): 판을 시작할 때마다 새 모델을 만들므로 옛 모델의 복제 기하·재질·뼈 텍스처(Skeleton boneTexture 8×8)를 놓아 준다.
      // 공유하는 GLB 텍스처(map)는 재질 dispose 가 지우지 않는다. 안 하면 판마다 geometries·textures 가 1씩 늘었다
      this.model.root.traverse((m) => {
        if (m.isSkinnedMesh && m.skeleton) m.skeleton.dispose();
        if (m.geometry) m.geometry.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const mt of mats) mt.dispose();
      });
    }
    this.spec = BIRDS[id];
    this.model = createBirdModel(id);
    // 모델 몸길이 ≈ 1 → 맞는 범위(반지름)에 맞춰 키운다
    const s = this.spec.radius * 2.3;
    this.model.root.scale.setScalar(s);
    this.group.add(this.model.root);
    // 판 위 위험 구역 그림(투명)보다 나중에 그려 새가 늘 위에 보이게
    this.model.root.traverse((m) => {
      if (m.isMesh) {
        m.renderOrder = 50;
        m.material.transparent = true;
      }
    });
    this.shield.scale.setScalar(this.spec.radius * 1.5);
    this._mats = [];
    this.model.root.traverse((m) => {
      if (m.isMesh && m.material && m.material.color && !this._mats.includes(m.material)) this._mats.push(m.material);
    });
    this._scorch = -1;
    this._applyEnv();
  }

  // 반사 환경맵(야경 HDR)을 깃털 재질에 — 까치 푸른 광택·비둘기 목 광택이 살아난다
  useAssets(a) {
    this.env = a.env || null;
    if (a.birds) {
      setBirdGLB(a.birds);
      if (this.spec) this.setSpecies(this.spec.id); // 12차: GLB 새로 바꿈
    }
    this._applyEnv();
  }

  _applyEnv() {
    if (!this.env || !this.model) return;
    this.model.root.traverse((m) => {
      if (m.isMesh && m.material.isMeshStandardMaterial) {
        m.material.envMap = this.env;
        m.material.needsUpdate = true;
      }
    });
  }

  get radius() {
    return this.spec.radius;
  }

  get forward() {
    return this.spec.forward;
  }

  // v: 시작 높이(경로 좌표). s: 경로 거리
  reset(hp, v = this.startV || 16, s = 0) {
    this.startV = v;
    this.s = s;
    this.u = 0;
    this.w = this.course ? v - this.course.center(s) : 0;
    this.v = v;
    this.vx = 0;
    this.vy = 0;
    this.hp = hp;
    this.maxHp = this.spec.hp;
    this.invuln = 0;
    this.obsInvuln = 0;
    this.cooldown = 0;
    this.activeT = 0;
    this.dashT = 0;
    this.rollT = -1; // 롤 진행(초), −1 이면 안 함
    this.rollInv = 0; // 롤 무적 남은 시간
    this.rollCD = 0; // 롤 대기(롤이 끝난 뒤부터)
    this.rolls = ROLL.start; // 10차: 남은 롤 개수(최대 ROLL.max)
    this.rollEmpty = false; // 10차: 0개일 때 Space 를 눌렀다(게임이 「턱」을 내고 끔)
    this.rollStart = -99; // 롤 시작 게임 시각
    this.rollDir = { x: 0, y: 0 };
    this.spin = 0;
    this.fold = 0;
    this.foldTarget = 0;
    this.heavy = false;
    this.lastHitReal = -99;
    this.scorchLevel = 0;
    this.smokeT = 0;
    this.setScorch(0);
    this.roll = 0;
    this.pitch = 0;
    this.yaw = 0;
    this.heading = 0;
    this.group.rotation.set(0, 0, 0);
    this.group.visible = true;
    this.model.root.visible = true;
    this.shield.visible = false;
    if (this.course) this.place();
    else this.pos.set(0, v, -s);
  }

  setCourse(course) {
    this.course = course;
  }

  // 경로 좌표 → 세계 위치·방향
  place() {
    const c = this.course;
    if (c.center) this.v = c.center(this.s) + this.w;
    c.toWorld(this.s, this.u, this.v, this.pos);
    const p = c.at(this.s, this._at || (this._at = {}));
    this.heading = p.th;
    this.group.rotation.order = 'YXZ';
    this.group.rotation.y = -p.th;
    if (c.slope) this.group.rotation.x = Math.atan(c.slope(this.s)) * 0.8; // 오르막에서 머리를 든다
  }

  // 세계 위치에서 경로 좌표로(시작 장면이 끝날 때)
  syncFromWorld() {
    const n = this.course.nearest(this.pos.x, this.pos.z, 0);
    this.s = n.s;
    this.u = n.u;
    this.v = this.pos.y;
    this.w = this.course.center ? this.v - this.course.center(this.s) : 0;
  }

  get revealing() {
    return this.spec.special.kind === 'reveal' && this.activeT > 0;
  }

  get guarding() {
    return this.spec.special.kind === 'guard' && this.activeT > 0;
  }

  get dashing() {
    return this.dashT > 0;
  }

  get damageMult() {
    return this.guarding ? this.spec.special.damageMult : 1;
  }

  get rolling() {
    return this.rollT >= 0;
  }

  get rollCooldown() {
    return ROLL.cooldown;
  }

  // 10차: 롤 개수 더하기(최대 ROLL.max). 실제로 더한 개수
  gainRoll(n = 1) {
    const before = this.rolls;
    this.rolls = Math.min(ROLL.max, this.rolls + n);
    return this.rolls - before;
  }

  // 급회피 롤(Space). 0.35초 한 바퀴 + 누른 방향으로 2m, 무적 0.30초. 쓰였으면 true
  tryRoll(axis, now) {
    if (this.rolling || this.rollCD > 0) return false;
    if (this.rolls <= 0) {
      this.rollEmpty = true; // 10차: 0개 — 롤은 나가지 않는다
      return false;
    }
    this.rolls--;
    this.rollT = 0;
    this.rollInv = ROLL.invuln;
    this.rollStart = now;
    const L = Math.hypot(axis.x, axis.y);
    this.rollDir = L > 0 ? { x: axis.x / L, y: axis.y / L } : { x: 0, y: 0 };
    this.spinSign = axis.x > 0 ? -1 : 1;
    return true;
  }

  // 깃털 그을림(0~3): 재질을 어둡게
  setScorch(level) {
    if (level === this._scorch || !this._mats) return;
    this._scorch = level;
    const k = FEEL.scorch[Math.max(0, Math.min(FEEL.scorch.length - 1, level))];
    for (const m of this._mats) m.color.setRGB(k, k * 0.96, k * 0.92);
  }

  // 특수 능력 사용. 쓰였으면 true
  trySpecial(axis) {
    return false; // 6차: 특수 능력 없음
    // eslint-disable-next-line no-unreachable
    if (this.cooldown > 0) return false;
    const sp = this.spec.special;
    this.cooldown = sp.cooldown;
    if (sp.kind === 'dash') {
      this.dashT = sp.duration;
      const d = axis.x || axis.y ? axis : this.lastDir;
      const len = Math.hypot(d.x, d.y) || 1;
      this.dashDir = { x: d.x / len, y: d.y / len };
    } else {
      this.activeT = sp.duration;
    }
    return true;
  }

  // 조종 한 걸음. axis: {x, y} (-1~1). sec: 지금 비행 단면 {u, v0, v1}
  steer(dt, axis, sec) {
    const sp = this.spec;
    if (axis.x || axis.y) this.lastDir = { x: axis.x, y: axis.y };
    if (this.dashT > 0) {
      const v = sp.lateral * sp.special.speedMult;
      this.vx = this.dashDir.x * v;
      this.vy = this.dashDir.y * v;
      this.dashT -= dt;
    } else {
      const k = 1 - Math.exp(-sp.accel * (this.heavy ? FEEL.heavyAccel : 1) * dt);
      this.vx += (axis.x * sp.lateral - this.vx) * k;
      this.vy += (axis.y * sp.lateral - this.vy) * k;
    }
    this.u += this.vx * dt;
    this.w += this.vy * dt;
    // 롤: 누른 방향으로 2m(롤 동안 고르게), 몸은 한 바퀴
    if (this.rollT >= 0) {
      const a = Math.min(dt, Math.max(0, ROLL.duration - this.rollT));
      const pv = ROLL.push / ROLL.duration;
      this.u += this.rollDir.x * pv * a;
      this.w += this.rollDir.y * pv * a;
      this.rollT += dt;
      const x = Math.min(1, this.rollT / ROLL.duration);
      this.spin = this.spinSign * Math.PI * 2 * (x * x * (3 - 2 * x));
      if (this.rollT >= ROLL.duration) {
        this.rollT = -1;
        this.spin = 0;
        this.rollCD = this.rollCooldown;
      }
    } else {
      this.rollCD = Math.max(0, this.rollCD - dt);
    }
    this.rollInv = Math.max(0, this.rollInv - dt);
    this.s += sp.forward * dt;
    this.applyBounds(dt, sec);
    this.place();

    this.cooldown = Math.max(0, this.cooldown - dt);
    this.activeT = Math.max(0, this.activeT - dt);
    this.invuln = Math.max(0, this.invuln - dt);
    this.obsInvuln = Math.max(0, this.obsInvuln - dt);

    this.animate(dt, 1);
  }

  // 이동 타원 끝: 부드럽게 멈추고 피해는 없다(경계선은 그리지 않는다). 새 중심이 타원(±E.u, ±E.v) 안
  applyBounds(dt, sec) {
    const E = this.course && this.course.E ? this.course.E : { u: sec.u, v: (sec.v1 - sec.v0) / 2 };
    const q = (this.u / E.u) ** 2 + (this.w / E.v) ** 2;
    if (q > 1) {
      const k = 1 / Math.sqrt(q);
      this.u *= k;
      this.w *= k;
      // 바깥으로 향하는 속도 성분을 없앤다
      const nx = this.u / (E.u * E.u);
      const ny = this.w / (E.v * E.v);
      const nl = Math.hypot(nx, ny) || 1;
      const dot = (this.vx * nx + this.vy * ny) / nl;
      if (dot > 0) {
        this.vx -= (dot * nx) / nl;
        this.vy -= (dot * ny) / nl;
      }
    }
  }

  // 폭발 순간광을 받아 윤곽이 빛나게(테두리광)
  setRim(color) {
    this.model.rim.copy(color);
  }

  animate(dt, flapMult = 1, folded = 0) {
    this.phase += this.spec.flapHz * Math.PI * 2 * dt * flapMult * (this.dashT > 0 ? 1.8 : 1);
    const lat = this.spec.lateral;
    // 선회할 때 크게 기울고(최대 약 63°) 몸을 튼다(카메라는 3° 이하만 따라감)
    const targetRoll = -(this.vx / lat) * 1.1;
    const targetPitch = (this.vy / lat) * 0.45;
    const targetYaw = -(this.vx / lat) * 0.4;
    const k = 1 - Math.exp(-9 * dt);
    this.roll += (targetRoll - this.roll) * k;
    this.pitch += (targetPitch - this.pitch) * k;
    this.yaw += (targetYaw - this.yaw) * k;
    // 12차: 센터 통과 ± 0.2초 날개 접기(접힘 0.1초 · 펴기 0.15초)
    const ft = this.foldTarget || 0;
    this.fold = ft > this.fold ? Math.min(ft, this.fold + dt / BAND.foldT[0]) : Math.max(ft, this.fold - dt / BAND.foldT[1]);
    poseBird(this.model, this.phase, Math.max(folded, this.fold * (this.model.glb ? BAND.foldAmtGLB : BAND.foldAmt)), this.pitch, this.roll);
    this.model.body.rotation.y = this.yaw;
    this.model.root.rotation.z = this.spin || 0;
    // 무적 시간에는 깜빡임(작은 물체라 화면 밝기에는 영향 없음)
    const inv = Math.max(this.invuln, this.obsInvuln || 0);
    this.model.root.visible = inv <= 0 || Math.floor(inv * 10) % 2 === 0;
    this.shield.visible = this.guarding;
  }
}
