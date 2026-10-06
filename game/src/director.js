// 스테이지 진행(8차): 플레이를 시작할 때 그 새로 한 판 전체 안무(웨이브 50~60개)를 미리 짠다(choreo.js).
// - 씨앗값: 판마다 새로 뽑아 결과 기록(run.records·콘솔)에 남긴다. 점검은 scriptOpts.seed 로 같은 판을 다시 본다.
// - 가려짐 검사: 폭발 3.0초 전부터 예상 카메라에서 알까지 화면 안이고 건물(지도 칸 높이)에 가리지 않는가.
// - 장식 불꽃: 거리대마다 초당 발수, 쉬는 구간에 더 자주. 웨이브 발사 때 장식 한 발을 0.5초 안에 함께 쏜다(「한 쇼」).
import * as THREE from 'three';
import { DECOR, CHOREO, COURSE, CAMERA, OMEN, BURST } from './config.js';
import { planStage } from './choreo.js';

export class Director {
  constructor(stage, course, bird, lowSpec = false, opts = {}) {
    this.stage = stage;
    this.course = course;
    this.f = bird.forward;
    this.birdId = bird.spec.id;
    this.lowSpec = lowSpec;
    this.opts = opts;
    this.acc = DECOR.bands.map(() => Math.random() * 0.6);
    this.showQ = [];
    this.s0 = course.s0;
    this.events = [];
    this.doors = this.events;
    this.duration = (COURSE.length - course.s0) / this.f;
    this.plan = null;
  }

  // 플레이 시작: sStart = 그때 새의 경로 거리(시작 장면이 끝난 실제 자리)
  begin(sStart, world, seed, startW = -1) {
    this.s0 = sStart;
    this.duration = (COURSE.length - sStart) / this.f;
    const los = world && world.occ ? (w) => this._los(w, world) : null;
    this.plan = planStage(this.birdId, { seed, sStart, los, startW });
    this.events = this.plan.waves.map((w) => ({ ...w, type: w.pat, meetE: w.tPass, passE: w.tPass, finale: w.kind === 'finale' }));
    this.doors = this.events;
    return this.plan;
  }

  // 폭발 3.0초 전 ~ 폭발: 예상 카메라(새 뒤 6m, 새를 느슨히 따라감)에서 알이 화면 안이고 건물에 안 가리는가
  _los(w, world) {
    const C = this.course;
    const L = CHOREO.los;
    const cam = this._cam || (this._cam = new THREE.Vector3());
    const look = this._look || (this._look = new THREE.Vector3());
    const egg = this._egg || (this._egg = new THREE.Vector3());
    const fwd = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3();
    const tanH = Math.tan((L.hfov * Math.PI) / 180), tanV = Math.tan((L.vfov * Math.PI) / 180);
    // 12차: 정보(범위 원, 발사 + 0.1) 시각부터 폭발까지
    const from = Math.max(0.2, ...w.eggs.map((e) => (e.info !== undefined ? w.tq - e.info : 0.9)));
    for (let t = w.tq - from; t <= w.tq + 1e-6; t += L.step) {
      const sb = this.s0 + t * this.f;
      const sc = sb - CAMERA.distance;
      const cu = CAMERA.followU * w.P[0];
      const cv = C.center(sc) + CAMERA.followV * w.P[1] + CAMERA.upOffset;
      C.toWorld(sc, cu, cv, cam);
      C.toWorld(sc + CAMERA.lookAhead, cu, cv - CAMERA.pitchDrop, look);
      fwd.subVectors(look, cam).normalize();
      right.set(-fwd.z, 0, fwd.x).normalize();
      up.crossVectors(right, fwd);
      for (const e of w.eggs) {
        const drop = 0; // 알·폭발 중심(처짐 전)
        if (e.info !== undefined && t < e.info) continue; // 정보 전 알은 안 보임
        C.toWorld(e.s, e.u, C.center(e.s) + e.w + drop, egg);
        const vx = egg.x - cam.x, vy = egg.y - cam.y, vz = egg.z - cam.z;
        const z = vx * fwd.x + vy * fwd.y + vz * fwd.z;
        if (z < 1) return false;
        if (Math.abs(vx * right.x + vz * right.z) / z > tanH) return false;
        if (Math.abs(vx * up.x + vy * up.y + vz * up.z) / z > tanV) return false;
        if (Director.occluded(world, cam, egg)) return false;
      }
    }
    return true;
  }

  // 지도 칸(10m) 건물 높이로 광선 검사: 카메라 → 알 사이 건물 칸 지붕이 광선보다 높으면 가림
  static occluded(world, a, b) {
    const o = world.occ;
    if (!o) return false;
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
    const L = Math.hypot(dx, dz);
    const n = Math.max(1, Math.ceil(L / 4));
    for (let k = 1; k < n; k++) {
      const q = k / n;
      const x = a.x + dx * q, y = a.y + dy * q, z = a.z + dz * q;
      const ix = Math.floor((x - o.x0) / o.cell), iz = Math.floor((z - o.z0) / o.cell);
      if (ix < 0 || iz < 0 || ix >= o.n || iz >= o.n) continue;
      const c = iz * o.n + ix;
      if (o.t[c] === 3 && o.h[c] > y) return true;
    }
    return false;
  }

  static zoneAt(s) {
    for (const z of COURSE.zones) if (s >= z.s[0] && s < z.s[1]) return z;
    return COURSE.zones[COURSE.zones.length - 1];
  }

  sAt(elapsed) {
    return this.s0 + elapsed * this.f;
  }

  sectionAt(elapsed) {
    const z = Director.zoneAt(this.sAt(elapsed));
    return { name: z.id, level: z.music, rest: !!z.rest, noSlowmo: z.id === 'finale', muffle: false, zone: z };
  }

  phase(elapsed) {
    const z = Director.zoneAt(this.sAt(elapsed));
    return z.id === 'finale' ? 2 : z.music >= 2 ? 1 : 0;
  }

  // ctx: { now, elapsed, spawnDecor(band, color) → bool }
  update(dt, ctx) {
    const { now, elapsed } = ctx;
    const sec = this.sectionAt(elapsed);
    const w = sec.rest ? 1.3 : sec.name === 'finale' ? 1 : 0.55;
    const mult = this.lowSpec ? 0.5 : 1;
    DECOR.bands.forEach((b, i) => {
      this.acc[i] += (b.rate[0] + (b.rate[1] - b.rate[0]) * Math.min(1, w)) * (w > 1 ? w : 1) * dt * mult;
      if (this.acc[i] >= 1) {
        if (ctx.spawnDecor(i, null)) this.acc[i] -= 1;
        else this.acc[i] = 1;
      }
    });
    for (let k = this.showQ.length - 1; k >= 0; k--) {
      const q = this.showQ[k];
      if (now < q.at) continue;
      this.showQ.splice(k, 1);
      let bi = 1;
      for (let i = 1; i < this.acc.length; i++) if (this.acc[i] > this.acc[bi]) bi = i;
      if (this.acc[bi] > 0.2 && ctx.spawnDecor(bi, q.color)) this.acc[bi] -= 1;
    }
    return this.phase(elapsed);
  }

  onThreatLaunch(now) {
    if (Math.random() < DECOR.showChance) this.showQ.push({ at: now + Math.random() * DECOR.showWindow * 0.8, color: null });
  }
}
