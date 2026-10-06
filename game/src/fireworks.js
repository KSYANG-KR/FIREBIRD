// 장식 불꽃(판정 없음, 4차): 비행 단면 밖 세 거리대(55~150 / 150~300 / 300~900m)에서 발사 꼬리 → 폭발 → 불씨 → 잔광 연기.
// 위협 불꽃은 bursts.js. 장식은 실제 발사대(바지선·옥상)에서 쏘고, 절반 남짓은 위협 발사와 0.5초 안에 같은 색으로 함께 쏜다(「한 쇼」).
// 바코드 방지: 꼬리 상한 10m, 불씨마다 길이·밝기 ±30%.
import * as THREE from 'three';
import { ParticleSystem, FLAG_FLICKER, emitGlitter } from './particles.js';
import { FIREWORK_TYPES, RENDER, LAUNCH, DECOR, THREAT, BURST } from './config.js';

const TAIL = 0.3; // 꼬리 길이 = 보이는 반지름 × 이 값(상한 DECOR.tailMax)
const GRAV = 5.5; // 발사체에 걸리는 중력(보기 좋게 약하게)
const rand = (a, b) => a + Math.random() * (b - a);
const DECOR_GLOW = 2.4; // 팔레트 색에 곱하는 밝기(이후 hdrMax 로 자름)
const DEG = Math.PI / 180;

function unitRandom(out) {
  let x, y, z, d;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    d = x * x + y * y + z * z;
  } while (d > 1 || d < 0.01);
  d = Math.sqrt(d);
  out[0] = x / d; out[1] = y / d; out[2] = z / d;
  return out;
}

function weightedPick(weights) {
  let sum = 0;
  for (const k in weights) sum += weights[k];
  let r = Math.random() * sum;
  for (const k in weights) {
    r -= weights[k];
    if (r <= 0) return k;
  }
  return Object.keys(weights)[0];
}

// 색상(도). 무채색이면 -1
export function hueDeg(c) {
  const [r, g, b] = c;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  if (mx - mn < 1e-4 || (mx - mn) / mx < 0.12) return -1;
  let h;
  if (mx === r) h = ((g - b) / (mx - mn)) % 6;
  else if (mx === g) h = (b - r) / (mx - mn) + 2;
  else h = (r - g) / (mx - mn) + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

const FALLBACK = [[0.4, 0.7, 1.4], [0.85, 0.4, 1.4], [0.4, 1.3, 0.7], [0.3, 1.2, 1.3]];
// HDR 밝기 상한 안으로
function capColor(c, mult, max = DECOR.hdrMax) {
  const m = Math.max(c[0], c[1], c[2]) * mult;
  const k = m > max ? (mult * max) / m : mult;
  return [c[0] * k, c[1] * k, c[2] * k];
}

export class Fireworks {
  constructor(scene, lights = null) {
    this.scene = scene;
    this.sparks = new ParticleSystem(RENDER.particlePool + THREAT.pool, { kind: 'spark' }); // 10차: 위협 장식 몫(THREAT.pool)을 더해 함께 쓴다
    this.smoke = new ParticleSystem(RENDER.smokePool, { kind: 'smoke', lights });
    scene.add(this.sparks.mesh, this.smoke.mesh);
    this.pending = []; // 아직 터지지 않은 불꽃(발사 전·비행 중)
    this.recent = []; // 터진 장식 불꽃(거리대 동시 수 세기)
    this.glit = []; // 10차: 장식 불꽃의 불티(위협 불꽃과 같은 그림 emitGlitter, 색은 장식 팔레트)
    this.emitMult = 1;
    this.lowSpec = false;
    this.onBurst = null;
    this.onLaunch = null;
    this.smokeTint = [0.07, 0.06, 0.08]; // 연기가 식은 뒤 색(도시 불빛)
    this.palette = FALLBACK;
    this._dir = [0, 0, 0];
    this._v = new THREE.Vector3();
    this.log = { decor: 0, maxHdr: 0, colors: [] };
  }

  // 연기를 Kenney 연기 사진으로(에셋이 있을 때)
  useAssets(a) {
    this.smoke.useSmoke(a.smoke[0], a.smoke[1]);
  }

  reset() {
    this.pending.length = 0;
    this.recent.length = 0;
    this.glit.length = 0;
    this.sparks.clear();
    this.smoke.clear();
  }

  setStage(stage) {
    this.palette = stage.palette || FALLBACK; // 4차: 위협·장식 모두 스테이지 팔레트 하나(「한 쇼」)
  }

  setLowSpec(low) {
    this.lowSpec = low;
    this.emitMult = low ? RENDER.lowSpecParticleMult : 1;
    this.sparks.emitMult = this.emitMult;
    this.sparks.limit = Math.floor((RENDER.particlePool + THREAT.pool) * this.emitMult);
  }

  setPointScale(v, vw, vh) {
    this.sparks.setScale(v, vw, vh);
    this.smoke.setScale(v, vw, vh);
    // 불씨·연기 최대 픽셀은 1080p 기준값을 해상도에 비례해서
    this.sparks.setScaleMax(RENDER.maxSparkPx * (vh / 1080));
    this.smoke.setScaleMax(RENDER.maxSmokePx * (vh / 1080));
  }

  // 장식 불꽃(판정 없음) 한 발 — 거리대 band(near 55~150 / mid 150~300 / far 300~900m, 카메라에서).
  // 눈에 보이는 실제 발사대(바지선·옥상)에서 쏘고, 비행 단면 경계에서 8m 이상 바깥에서 터지며 불씨가 단면에 닿지 않게 둔다.
  // ctx: { camera, course, world, camS, color }. 놓았으면 true
  spawnDecorBand(band, t, ctx, opts = {}) {
    if (this.bandAlive(band.id, t) >= band.max) return false;
    const { camera, course, world } = ctx;
    const C = camera.position;
    camera.getWorldDirection(this._v);
    const f = this._v;
    f.y = 0;
    if (f.lengthSq() < 1e-6) f.set(0, 0, -1);
    f.normalize();
    const keys = band.id === 'near' ? ['peony', 'chrysanthemum', 'ring', 'peony'] : ['chrysanthemum', 'chrysanthemum', 'peony', 'willow', 'ring', 'finale'];
    const sec = {};
    for (let tries = 0; tries < 16; tries++) {
      const key = keys[Math.floor(Math.random() * keys.length)];
      const spec = FIREWORK_TYPES[key];
      const D = rand(band.dist[0], band.dist[1]);
      const yaw = rand(-DECOR.yawDeg, DECOR.yawDeg) * DEG;
      const cs = Math.cos(yaw), sn = Math.sin(yaw);
      const hx = f.x * cs + f.z * sn;
      const hz = -f.x * sn + f.z * cs;
      const visR = rand(band.visR[0], band.visR[1]);
      const life = rand(DECOR.life[0], DECOR.life[1]);
      const drop = 0.5 * spec.gravity * Math.max(1, visR / spec.visR) * 0.55 * life * life + (key === 'willow' ? visR : 0);
      // 발사대: 그 방향·거리 가까운 바지선·옥상(없으면 땅·수면)
      const H = { x: C.x + hx * D * 0.97, z: C.z + hz * D * 0.97 };
      const L = world && world.launcherNear ? world.launcherNear(H.x, H.z, band.id === 'far' ? 120 : 45) : null;
      const base = L || { x: H.x + rand(-10, 10), y: 1, z: H.z + rand(-10, 10) };
      // 단면 밖(옆으로 충분히 비켜 있거나, 충분히 높이)
      const n = course ? course.nearest(base.x, base.z, (ctx.camS || 0) + D) : { s: 0, u: 999 };
      const s0 = course ? course.section(n.s, sec) : { u: 16, v1: 28 };
      // 발사대가 단면 바로 아래면 발사 꼬리가 단면을 지나므로 버린다
      if (Math.abs(n.u) < s0.u + DECOR.margin && n.s > (ctx.camS || 0) - 20) continue;
      const lateral = Math.abs(n.u) - s0.u - visR * 1.08 - 5 >= DECOR.margin;
      let y = base.y + rand(22, 55) * (band.id === 'far' ? 1.8 : band.id === 'mid' ? 1.3 : 1);
      if (!lateral) y = Math.max(y, s0.v1 + DECOR.margin + visR * 1.08 + drop + rand(0, 10));
      const p = new THREE.Vector3(base.x + rand(-4, 4), y, base.z + rand(-4, 4));
      const d3 = p.distanceTo(C);
      if (d3 < band.dist[0] * 0.95 || d3 > band.dist[1] * 1.05) continue;
      const c = ctx.color || this.palette[Math.floor(Math.random() * this.palette.length)];
      const flight = opts.flight ?? rand(DECOR.rise[0], DECOR.rise[1]);
      const time = t + flight + (opts.delay || 0);
      if (ctx.quiet && ctx.quiet(time)) return false; // 9차: 위협 불꽃 폭발 ±0.5초 안에는 장식 불꽃을 터뜨리지 않는다
      this._schedule(key, spec, p, time, c, world, {
        launchPos: new THREE.Vector3(base.x, base.y, base.z),
        flight,
        visR,
        size: rand(band.size[0], band.size[1]),
        particles: this.lowSpec ? DECOR.lowSpecParticles : Math.round(rand(band.particles[0], band.particles[1])),
        life,
        band: band.id,
        clearS: n.s, clearU: n.u, lateral, drop,
      });
      return true;
    }
    return false;
  }

  // 이 거리대에서 날아가는·터져 있는 장식 불꽃 수
  bandAlive(id, t) {
    let n = 0;
    for (const p of this.pending) if (p.band === id) n++;
    for (const r of this.recent) if (r.band === id && r.until > t) n++;
    return n;
  }

  _schedule(key, spec, pos, time, color, world, opts = {}) {
    const lp = opts.launchPos || new THREE.Vector3(pos.x, 0.6, pos.z);
    const flight = Math.max(0.25, opts.flight ?? LAUNCH.maxRise);
    this.pending.push({
      key, spec, pos, time, color,
      visR: opts.visR || spec.visR || spec.R,
      size: opts.size || spec.size || 0.5,
      particles: opts.particles || 0,
      life: opts.life || 0,
      launchPos: lp,
      launchTime: time - flight,
      flight,
      launched: false,
      shellPos: lp.clone(),
      shellVel: new THREE.Vector3(),
      smokeAcc: 0,
      band: opts.band || null,
      clearS: opts.clearS, clearU: opts.clearU, lateral: opts.lateral, drop: opts.drop || 0,
    });
  }

  // ---------- 매 프레임 ----------
  update(dt, t) {
    const sp = this.sparks;
    const m = this.emitMult;
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const f = this.pending[i];
      if (!f.launched && t >= f.launchTime) {
        f.launched = true;
        const T = Math.max(0.05, f.time - t);
        f.shellVel.set(
          (f.pos.x - f.launchPos.x) / T,
          (f.pos.y - f.launchPos.y + 0.5 * GRAV * T * T) / T,
          (f.pos.z - f.launchPos.z) / T,
        );
        if (this.onLaunch) this.onLaunch(f);
      }
      if (f.launched) {
        f.shellVel.y -= GRAV * dt;
        f.shellPos.addScaledVector(f.shellVel, dt);
        const v = f.shellVel;
        const P = f.shellPos;
        // 꼬리 머리: 푸른 흰색(주황 아님)
        const hc = LAUNCH.headColor;
        const hs = LAUNCH.headSize;
        sp.emit(P.x, P.y, P.z, v.x, v.y, v.z, Math.max(0.03, dt * 1.5), hs, hs, hc[0], hc[1], hc[2], hc[0], hc[1], hc[2], 1, 0, 0, 0, LAUNCH.headStreak);
        // 흩날리는 불티(불꽃 색)
        const cc = capColor(f.color, 1.1);
        const n = Math.random() < m ? 2 : 1;
        for (let k = 0; k < n; k++) {
          sp.emit(P.x, P.y, P.z,
            -v.x * 0.08 + rand(-1, 1), -v.y * 0.08 + rand(-1.5, 0.3), -v.z * 0.08 + rand(-1, 1),
            rand(0.35, 0.7), hs * 0.45, hs * 0.1,
            cc[0], cc[1], cc[2], cc[0] * 0.3, cc[1] * 0.3, cc[2] * 0.3, 0.9, 2.5, 2.5, FLAG_FLICKER);
        }
        f.smokeAcc += dt;
        if (f.smokeAcc > 0.06) {
          f.smokeAcc = 0;
          const st = this.smokeTint;
          this.smoke.emit(P.x, P.y, P.z, rand(-0.2, 0.2), rand(0, 0.3), rand(-0.2, 0.2),
            rand(1.6, 2.4), 2, 7, 0.5, 0.4, 0.3, st[0], st[1], st[2], 0.22, 0.4, -0.05, 0);
        }
      }
      if (t >= f.time) {
        this.pending.splice(i, 1);
        this._burst(f, t);
      }
    }
    // 10차: 수명 절반쯤에 별이 지나간 자리에서 불티가 떨어진다(위협 불꽃과 같은 그림)
    for (let i = this.glit.length - 1; i >= 0; i--) {
      const q = this.glit[i];
      if (t < q.t) continue;
      this.glit.splice(i, 1);
      const n = Math.max(0, Math.min(q.n, Math.floor(sp.limit * 0.75) - sp.alive - Math.floor(THREAT.pool * this.emitMult * 0.5)));
      const tt = q.t - q.t0;
      const r = q.visR * (1 - Math.exp(-q.k * tt));
      const drop = 0.5 * q.g * tt * tt;
      const dir = this._dir;
      for (let k = 0; k < n; k++) {
        unitRandom(dir);
        const rr = r * (0.55 + Math.random() * 0.45);
        emitGlitter(sp, q.pos.x + dir[0] * rr, q.pos.y + dir[1] * rr - drop, q.pos.z + dir[2] * rr, dir[0] * 0.6, dir[1] * 0.6, dir[2] * 0.6, BURST.look.embers, Math.random, q.size, q.c, q.end, 0.7);
      }
    }
    sp.update(dt);
    this.smoke.update(dt);
  }

  _burst(f, t) {
    const { key, spec, pos, color } = f;
    const hz = { key, spec, pos: pos.clone(), t0: t, threat: false, color, visR: f.visR, band: f.band, life: f.life, clearS: f.clearS, clearU: f.clearU, lateral: f.lateral, drop: f.drop };
    this.recent.push({ band: f.band, until: t + (f.life || 2.5) });
    if (this.recent.length > 40) this.recent.splice(0, this.recent.length - 40);
    const sp = this.sparks;
    const J = RENDER.sparkJitter;
    const c = capColor(color, DECOR_GLOW);
    const fadeTo = [c[0] * 0.35, c[1] * 0.35, c[2] * 0.35]; // 식으며 같은 색으로 어두워짐(주황으로 가지 않음)
    this.log.decor++;
    this.log.maxHdr = Math.max(this.log.maxHdr, c[0], c[1], c[2]);
    if (this.log.colors.length < 400) this.log.colors.push(color);
    const visR = f.visR;
    const size = f.size;
    const life = (a, b) => (f.life ? f.life * rand(0.85, 1.1) : rand(a, b));
    const gScale = Math.max(1, visR / (spec.visR || spec.R)) * 0.55; // 큰 장식 불꽃은 더 크게 처진다
    let count = f.particles || spec.particles;
    count = Math.max(0, Math.min(count, Math.floor(sp.limit * 0.75) - sp.alive - Math.floor(THREAT.pool * this.emitMult * 0.5))); // 10차: 위협 장식 몫의 절반은 늘 비워 둔다
    const tail = Math.min(visR * TAIL, DECOR.tailMax);
    const dir = this._dir;
    // 불씨 하나: 길이(줄무늬·꼬리)·밝기 ±30%
    const one = (vx, vy, vz, lf, s0, s1, col, end, drag, grav, flags) => {
      const b = rand(1 - J, 1 + J);
      const idx = sp.emit(pos.x, pos.y, pos.z, vx, vy, vz, lf, s0, s1,
        Math.min(DECOR.hdrMax, col[0] * b), Math.min(DECOR.hdrMax, col[1] * b), Math.min(DECOR.hdrMax, col[2] * b),
        end[0] * b, end[1] * b, end[2] * b, 1, drag, grav, flags, rand(1 - J, 1 + J));
      if (idx >= 0) sp.setTail(idx, Math.min(DECOR.tailMax, tail * rand(1 - J, 1 + J)));
      return idx;
    };

    // 폭발 순간 섬광
    sp.emit(pos.x, pos.y, pos.z, 0, 0, 0, 0.1, size * 3, size * 5, c[0] * 0.5 + 0.4, c[1] * 0.5 + 0.4, c[2] * 0.5 + 0.4, c[0] * 0.4, c[1] * 0.4, c[2] * 0.4, 1, 0, 0, 0);

    if (key === 'ring') {
      const n = new THREE.Vector3(rand(-0.45, 0.45), rand(-0.45, 0.45), 1).normalize();
      const u = new THREE.Vector3().crossVectors(n, new THREE.Vector3(0, 1, 0)).normalize();
      const v = new THREE.Vector3().crossVectors(n, u).normalize();
      const speed = visR * spec.k;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const ca = Math.cos(a), sa = Math.sin(a);
        const jitter = rand(0.96, 1.04);
        one((u.x * ca + v.x * sa) * speed * jitter, (u.y * ca + v.y * sa) * speed * jitter, (u.z * ca + v.z * sa) * speed * jitter,
          life(spec.life[0], spec.life[1]), size, size * 0.4, c, fadeTo, spec.k, spec.gravity * gScale, i % 2 ? FLAG_FLICKER : 0);
      }
    } else {
      // 국화·작은 국화·버드나무·피날레(공 모양)
      const willow = key === 'willow';
      for (let i = 0; i < count; i++) {
        unitRandom(dir);
        const s = visR * spec.k * rand(willow ? 0.9 : 0.95, willow ? 1.08 : 1.05);
        one(dir[0] * s, dir[1] * s, dir[2] * s, life(spec.life[0], spec.life[1]), size, size * (willow ? 0.5 : 0.35),
          c, fadeTo, spec.k, spec.gravity * gScale, i % 3 === 0 ? FLAG_FLICKER : 0);
      }
      if (key === 'finale' || key === 'chrysanthemum') {
        // 안쪽 두 번째 겹(같은 계열의 밝은 색)
        const inner = Math.floor(count * 0.35);
        const c2 = capColor([color[0] * 0.7 + 0.4, color[1] * 0.7 + 0.4, color[2] * 0.7 + 0.45], DECOR_GLOW);
        for (let i = 0; i < inner; i++) {
          unitRandom(dir);
          const s = visR * 0.55 * spec.k * rand(0.9, 1.1);
          one(dir[0] * s, dir[1] * s, dir[2] * s, life(spec.life[0], spec.life[1]) * 1.1, size * 0.8, size * 0.3,
            c2, fadeTo, spec.k, 1.5 * gScale, FLAG_FLICKER);
        }
      }
    }

    // 10차 불티(위협 불꽃과 같은 그림): 수명 절반쯤, 장식 팔레트 색(따뜻한 색 아님)
    if (key !== 'willow' && count > 0) {
      const gl = f.life || (spec.life[0] + spec.life[1]) / 2;
      this.glit.push({ t0: t, t: t + gl * 0.5, pos: pos.clone(), visR, k: spec.k, g: spec.gravity * gScale, n: Math.round(count * 0.5), size: size * 0.55,
        c: [c[0] * 0.55, c[1] * 0.55, c[2] * 0.55], end: [c[0] * 0.15, c[1] * 0.15, c[2] * 0.15] });
    }

    // 잔광 연기: 폭발 색으로 빛나다가 도시 불빛 색으로 퍼진다
    const st = this.smokeTint;
    const sr = visR * 0.3;
    for (let k = 0; k < 3; k++) {
      this.smoke.emit(pos.x + rand(-sr, sr), pos.y + rand(-sr, sr) * 0.6, pos.z + rand(-sr, sr), rand(-0.4, 0.4), rand(0.1, 0.5), rand(-0.4, 0.4),
        rand(4, 6.5), visR * 0.5, visR * 1.1,
        c[0] * 0.12, c[1] * 0.12, c[2] * 0.12, st[0], st[1], st[2], 0.25, 0.3, -0.05, 0);
    }
    if (this.onBurst) this.onBurst(hz, f);
  }
}

export { weightedPick };
