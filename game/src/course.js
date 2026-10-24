// 비행 경로(6차): 「거리(m)」 기준 길. 직선과 원호를 이은 평면 길(Path2D) + 거리에 따른 통로 중심 높이(코사인으로 부드럽게).
// 새·카메라·꽃문은 모두 「경로 좌표」(s 거리, u 좌우(오른쪽 +), v 세계 높이)로 다룬다. 통로 중심 높이 = center(s).
// 방향각 th: 앞 = (sin th, 0, −cos th), 오른쪽 = (cos th, 0, sin th). th = 0 이면 −Z 로 난다(시작 장면과 같은 방향).
// 시간 기준(4·5차 `s0 + t * forward`)을 없앴다 — 코스 모양·다리·협곡·옥상은 새 속도와 상관없이 세계에 고정된다.
import { STAGES } from './config.js';

const DEG = Math.PI / 180;

// 평면 길: segs = [[길이, 회전(도, + 오른쪽)], …]. start = { x, z, th }, sMin 에서 시작
export class Path2D {
  constructor(segs, start = { x: 0, z: 0, th: 0 }, sMin = 0, ds = 1) {
    this.sMin = sMin;
    this.ds = ds;
    const list = [];
    let s = sMin;
    let x = start.x;
    let z = start.z;
    let th = start.th;
    for (const [len, deg] of segs) {
      const g = { a: s, b: s + len, turn: deg * DEG, x, z, th };
      const e = Path2D._end(g, len);
      list.push(g);
      x = e.x;
      z = e.z;
      th = e.th;
      s += len;
    }
    this.segs = list;
    this.sMax = s;
    const n = Math.ceil((this.sMax - this.sMin) / ds) + 1;
    this.n = n;
    this.X = new Float64Array(n);
    this.Z = new Float64Array(n);
    this.TH = new Float64Array(n);
    this.K = new Float64Array(n); // 굽음(1/반지름, + 오른쪽)
    let gi = 0;
    for (let i = 0; i < n; i++) {
      const si = this.sMin + i * ds;
      while (gi < list.length - 1 && si > list[gi].b) gi++;
      const g = list[gi];
      const p = Path2D._end(g, si - g.a);
      this.X[i] = p.x;
      this.Z[i] = p.z;
      this.TH[i] = p.th;
      this.K[i] = g.turn / (g.b - g.a);
    }
  }

  static _end(g, d) {
    const L = g.b - g.a;
    if (Math.abs(g.turn) < 1e-9) return { x: g.x + Math.sin(g.th) * d, z: g.z - Math.cos(g.th) * d, th: g.th };
    const k = g.turn / L;
    const th = g.th + k * d;
    return { x: g.x + (Math.cos(g.th) - Math.cos(th)) / k, z: g.z + (Math.sin(g.th) - Math.sin(th)) / k, th };
  }

  // s 에서 점과 방향(범위 밖은 직선으로 늘림)
  at(s, out = {}) {
    const fi = (s - this.sMin) / this.ds;
    if (fi <= 0 || fi >= this.n - 1) {
      const i = fi <= 0 ? 0 : this.n - 1;
      const d = s - (this.sMin + i * this.ds);
      const th = this.TH[i];
      out.x = this.X[i] + Math.sin(th) * d;
      out.z = this.Z[i] - Math.cos(th) * d;
      out.th = th;
      out.k = 0;
      return out;
    }
    const i = Math.floor(fi);
    const w = fi - i;
    out.x = this.X[i] + (this.X[i + 1] - this.X[i]) * w;
    out.z = this.Z[i] + (this.Z[i + 1] - this.Z[i]) * w;
    out.th = this.TH[i] + (this.TH[i + 1] - this.TH[i]) * w;
    out.k = this.K[i];
    return out;
  }

  // 평면 좌표(오른쪽 u) → 세계 x, z
  xz(s, u, out = {}) {
    const p = this.at(s, this._t || (this._t = {}));
    out.x = p.x + Math.cos(p.th) * u;
    out.z = p.z + Math.sin(p.th) * u;
    return out;
  }

  // 세계 (x, z) → 가장 가까운 길 점의 { s, u, d }. hint: 찾기 시작할 s
  nearest(x, z, hint = null) {
    let best = 0;
    let bd = Infinity;
    if (hint !== null && Number.isFinite(hint)) {
      const c = Math.round((hint - this.sMin) / this.ds);
      for (let i = Math.max(0, c - 300); i <= Math.min(this.n - 1, c + 300); i += 2) {
        const d = (this.X[i] - x) ** 2 + (this.Z[i] - z) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
    } else {
      for (let i = 0; i < this.n; i += 6) {
        const d = (this.X[i] - x) ** 2 + (this.Z[i] - z) ** 2;
        if (d < bd) { bd = d; best = i; }
      }
    }
    for (let i = Math.max(0, best - 8); i <= Math.min(this.n - 1, best + 8); i++) {
      const d = (this.X[i] - x) ** 2 + (this.Z[i] - z) ** 2;
      if (d < bd) { bd = d; best = i; }
    }
    const th = this.TH[best];
    const dx = x - this.X[best];
    const dz = z - this.Z[best];
    const along = Math.sin(th) * dx - Math.cos(th) * dz;
    const u = Math.cos(th) * dx + Math.sin(th) * dz;
    return { s: this.sMin + best * this.ds + along, u, d: Math.hypot(along, u) };
  }
}

export class Course extends Path2D {
  // forward: 그 새의 전진 속도(시각 ↔ 거리 변환용으로만 쓴다)
  // 16차 U6a: 코스 모양은 그 스테이지 코스 정의(stage.course = this.def)에서 읽는다
  constructor(stage, forward, s0 = 0) {
    const D = (stage && stage.course) || STAGES[0].course;
    super(D.plan, { x: 0, z: D.pre, th: 0 }, -D.pre, 1);
    this.def = D;
    this.stage = stage;
    this.f = forward;
    this.s0 = s0;
    this.length = D.length;
    this.E = D.ellipse;
    const H = D.height;
    this.H = new Float64Array(this.n);
    this.SL = new Float64Array(this.n); // 경사(dv/ds)
    for (let i = 0; i < this.n; i++) this.H[i] = Course._h(H, this.sMin + i * this.ds);
    for (let i = 0; i < this.n; i++) {
      const s = this.sMin + i * this.ds;
      this.SL[i] = (Course._h(H, s + 0.25) - Course._h(H, s - 0.25)) / 0.5;
    }
    this.colliders = []; // 6차: 통로 안에 들어오는 구조물이 없다(다리 상판은 통로 위)
    this.structRanges = [];
    this.bridges = (D.bridges || []).map((b) => ({ ...b }));
  }

  static _h(H, s) {
    if (s <= H[0][0]) return H[0][1];
    for (let k = 0; k < H.length - 1; k++) {
      const [s0, h0] = H[k];
      const [s1, h1] = H[k + 1];
      if (s <= s1) {
        const x = (s - s0) / (s1 - s0);
        return h0 + ((h1 - h0) * (1 - Math.cos(Math.PI * x))) / 2;
      }
    }
    return H[H.length - 1][1];
  }

  // 통로 중심 높이
  center(s) {
    const fi = (s - this.sMin) / this.ds;
    if (fi <= 0) return this.H[0];
    if (fi >= this.n - 1) return this.H[this.n - 1];
    const i = Math.floor(fi);
    return this.H[i] + (this.H[i + 1] - this.H[i]) * (fi - i);
  }

  slope(s) {
    const fi = (s - this.sMin) / this.ds;
    if (fi <= 0) return this.SL[0];
    if (fi >= this.n - 1) return this.SL[this.n - 1];
    const i = Math.floor(fi);
    return this.SL[i] + (this.SL[i + 1] - this.SL[i]) * (fi - i);
  }

  // 경로 좌표 → 세계 좌표(v 는 세계 높이)
  toWorld(s, u, v, out) {
    const p = this.at(s, this._tmp || (this._tmp = {}));
    out.x = p.x + Math.cos(p.th) * u;
    out.y = v;
    out.z = p.z + Math.sin(p.th) * u;
    return out;
  }

  sAt(t) {
    return this.s0 + t * this.f;
  }

  // 좌우로 도는 빠르기(°/초, 그 새 속도에서)
  yawRate(s, f = this.f) {
    return (Math.abs(this.at(s, this._yr || (this._yr = {})).k) * f) / DEG;
  }

  // 구간(환경) 정보
  zoneAt(s) {
    const Z = this.def.zones;
    for (const z of Z) if (s >= z.s[0] && s < z.s[1]) return z;
    return s < 0 ? Z[0] : Z[Z.length - 1];
  }

  // 16차 U6a: 구간(밖이면 null — game 의 쉬는 구간 보충용) · 구간(밖이면 마지막 — 안무·감독용, 옛 Director.zoneAt 과 같음)
  zoneIn(s) {
    for (const z of this.def.zones) if (s >= z.s[0] && s < z.s[1]) return z;
    return null;
  }

  zoneOr(s) {
    return this.zoneIn(s) || this.def.zones[this.def.zones.length - 1];
  }

  isOpen() {
    return true;
  }

  // 비행 단면(이동 타원을 감싸는 상자). 장식 불꽃·점검이 쓴다
  section(s, out = {}) {
    const c = this.center(s);
    out.u = this.E.u;
    out.v0 = c - this.E.v;
    out.v1 = c + this.E.v;
    out.c = c;
    return out;
  }

  banks(s, out = {}) {
    out.l = 0;
    out.r = 0;
    return out;
  }
}

// ---------- 상자 계산(경로 좌표) — 예전 점검 코드 호환 ----------
export function boxDist(b, s, u, v) {
  const ds = Math.max(b.s0 - s, 0, s - b.s1);
  const du = Math.max(b.u0 - u, 0, u - b.u1);
  const dv = Math.max(b.v0 - v, 0, v - b.v1);
  return Math.sqrt(ds * ds + du * du + dv * dv);
}

export function insideBox(b, s, u, v, m = 0) {
  return s > b.s0 - m && s < b.s1 + m && u > b.u0 - m && u < b.u1 + m && v > b.v0 - m && v < b.v1 + m;
}

export function segHitsBox(box, a, b, m = 0) {
  let t0 = 0;
  let t1 = 1;
  const lo = [box.s0 - m, box.u0 - m, box.v0 - m];
  const hi = [box.s1 + m, box.u1 + m, box.v1 + m];
  for (let k = 0; k < 3; k++) {
    const d = b[k] - a[k];
    if (Math.abs(d) < 1e-9) {
      if (a[k] < lo[k] || a[k] > hi[k]) return false;
    } else {
      let ta = (lo[k] - a[k]) / d;
      let tb = (hi[k] - a[k]) / d;
      if (ta > tb) [ta, tb] = [tb, ta];
      t0 = Math.max(t0, ta);
      t1 = Math.min(t1, tb);
      if (t0 > t1) return false;
    }
  }
  return true;
}
