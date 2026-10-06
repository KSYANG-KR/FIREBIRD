// 안무(미리 짜기): 판을 시작할 때 씨앗값 하나로 한 판 전체 웨이브(같은 박자에 함께 터지는 알 묶음)를 정한다.
// 12차: 「위험 띠(r_in ~ r_out) / 위험 원판(0 ~ r_out)」 판정 모델(config BAND·BURST). 피하는 길은 밖·센터(구멍) 둘뿐.
// - 순수 계산(three·화면 없음). 게임(director·bursts)·봇·점검이 같은 함수를 쓴다.
// - 알 좌표 (u, w) = 폭발 중심(통로 좌표). 띠는 처짐만큼 함께 내려간다(지나는 순간 중심 = (u, w − drop)).
// - 여유 clear2D = 판정 경계까지 거리(음수 = 맞음). 지나는 순간 ± BAND.window 초(앞·가운데·뒤 세 시각)의 가장 나쁜 쪽.
// - B-2 안전 지대 지도: 이동 타원 × 0.95 − 위험 영역(새 판정 반지름 b 만큼 넓힘)을 0.3m 격자로. 연결된 덩어리마다 내접 반경 ins · 앞 목표에서 거리 M.
// - B-3 난이도 D(0~100, 새마다) = 100 × min_j [0.50·M_j/reachH + 0.30·clamp((1.3 − ins_j)/0.8) + 0.20·clamp((1.7 − T_h)/0.6)] + (덩어리 1개면 +10)
//   배치는 규칙 R1~R6 을 통과한 후보 가운데 목표 D(구간별 곡선)에 가장 가까운 것을 고른다.
import { BIRDS, BURST, BAND, CHOREO, COURSE, BEAT, FEEL, TIMING } from './config.js';

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const E = COURSE.ellipse;
const CELL = CHOREO.cell;
const NU = 2 * Math.ceil(E.u / CELL) + 1;
const NW = 2 * Math.ceil(E.v / CELL) + 1;
const NC = NU * NW;
const cU = (c) => ((c % NU) - (NU - 1) / 2) * CELL;
const cW = (c) => (((c / NU) | 0) - (NW - 1) / 2) * CELL;
const CU = new Float32Array(NC);
const CW = new Float32Array(NC);
const IN_SAFE = new Uint8Array(NC);
const IN_BIRD = new Uint8Array(NC);
for (let c = 0; c < NC; c++) {
  CU[c] = cU(c);
  CW[c] = cW(c);
  const q = (CU[c] / E.u) ** 2 + (CW[c] / E.v) ** 2;
  IN_BIRD[c] = q <= 1 ? 1 : 0;
  IN_SAFE[c] = q <= CHOREO.ellSafe * CHOREO.ellSafe ? 1 : 0;
}
export const CGRID = { NU, NW, NC, CELL, CU, CW, IN_SAFE, IN_BIRD };
const TAU = Math.PI * 2;

// ---------- 종류·시각(TIMING 표에서만 읽는다) ----------
export const kindSize = (kind) => BURST[kind].size;
export const kindLead = (kind) => TIMING.lead[BURST[kind].size];
export const kindK = (kind) => TIMING.k[BURST[kind].size];
export const launchToBurst = (kind) => TIMING.launchToBurst[BURST[kind].size];
// 정보(범위 원) = 폭발 − infoBefore = 발사 + 0.1
export const infoBefore = (kind) => launchToBurst(kind) - TIMING.infoAfterLaunch;
export const infoToArrive = (kind) => infoBefore(kind) + kindLead(kind);
// (옛 이름) 알 공개 — 12차는 「정보」 시각
export const revealBefore = infoBefore;
// 새 판정 반지름(참새 0.23 · 까치 0.32 · 비둘기 0.38m)
export function birdR(spec) {
  return spec.radius * BURST.birdHitMult;
}
export const sideMargin = birdR;
// 판정 시간 동안 처짐(띠 전체가 함께)
export function dropJ(t) {
  return t > 0 ? 0.5 * BAND.gJudge * t * t : 0;
}

// 알(= 웨이브의 껍질 하나). rand: 씨앗 난수(0~1). (u, w) = 폭발 중심
export function makeEgg(kind, u, w, rand = Math.random) {
  const K = BURST[kind];
  const rout = K.rout[0] + rand() * (K.rout[1] - K.rout[0]);
  const rin = K.shape === 'disk' ? 0 : K.rinOff ? rout - K.rinOff : K.rin;
  return eggGeom({ kind, shape: K.shape, u, w, rout, rin });
}
// 시각 값 채우기: 지나는 순간 ± window 의 세 시각(펴짐 비율 f, 처짐 d)
export function eggGeom(e) {
  const k = kindK(e.kind), lead = kindLead(e.kind);
  const ex = 1 - Math.exp(-k * lead);
  e.k = k;
  e.lead = lead;
  e.ex = ex;
  const W = BAND.window;
  e.tw = [Math.max(0.02, lead - W), lead, lead + W];
  e.fw = e.tw.map((t) => (1 - Math.exp(-k * t)) / ex);
  e.dw = e.tw.map(dropJ);
  e.drop = dropJ(lead); // 지나는 순간 처짐
  e.R = e.rout / ex; // 펴짐 상한(옛 이름 — 그림·점검)
  e.rp = e.rout; // 옛 이름
  e.tipMax = e.rout * e.fw[2];
  return e;
}
// 크기 배율 f 의 띠(rin·f ~ rout·f)에서 반경 rho 의 여유(음수 = 맞음). b = 새 판정 반지름
export function clrRho(shape, rin, rout, rho, b) {
  const hi = rout - BAND.tol + b;
  if (rho >= hi) return rho - hi;
  if (shape === 'band') {
    const lo = rin + BAND.tol - b;
    if (lo > 0) {
      if (rho <= lo) return lo - rho;
      return -Math.min(hi - rho, rho - lo);
    }
  }
  return -(hi - rho);
}
// 알 하나에 대한 여유(지나는 순간 ± window 세 시각 중 가장 나쁜 쪽). (u, w) 통로 좌표
export function clear2D(e, u, w, b = 0) {
  const du = u - e.u;
  let best = Infinity;
  for (let i = 0; i < 3; i++) {
    const dw = w - (e.w - e.dw[i]);
    const c = clrRho(e.shape, e.rin * e.fw[i], e.rout * e.fw[i], Math.sqrt(du * du + dw * dw), b);
    if (c < best) best = c;
  }
  return best;
}
export function clearOf(eggs, u, w, b = 0) {
  let best = Infinity;
  for (const e of eggs) {
    const c = clear2D(e, u, w, b);
    if (c < best) best = c;
  }
  return best;
}
export function safeAt(eggs, u, w, b, ell = true) {
  if (ell && (u / (E.u * CHOREO.ellSafe)) ** 2 + (w / (E.v * CHOREO.ellSafe)) ** 2 > 1) return false;
  return clearOf(eggs, u, w, b) >= 0;
}
// 알 하나 기준 길(지나는 순간 중심 기준): 'center'(구멍 안) · 'in'(띠·원판 안) · 'out'(밖). du·dw = 폭발 중심 기준
export function pathOfOne(e, du, dw) {
  const r = Math.hypot(du, dw + e.drop);
  if (e.shape === 'band' && r < e.rin) return 'center';
  return r < e.rout ? 'in' : 'out';
}
// 여러 알: 어느 알의 구멍 안이면 center, 아니면 out(맞음 여부는 따로)
export function pathOf(eggs, u, w) {
  let any = 'out';
  for (const e of eggs) {
    const p = pathOfOne(e, u - e.u, w - e.w);
    if (p === 'center') return 'center';
    if (p === 'in') any = 'in';
  }
  return any;
}
// 가만히 있으면 맞는가(여유 ≤ −pad)
export function stillHit(eggs, u, w, b, pad = 0.03) {
  return clearOf(eggs, u, w, b) <= -pad;
}
// 닿을 거리(저HP 기준). react 생략 = 봇(CHOREO.react)
export function reachOf(spec, T, lowHp = true, react = CHOREO.react) {
  const a = spec.accel * (lowHp ? FEEL.heavyAccel : 1);
  return spec.lateral * Math.max(0, T - react - 1 / a) * CHOREO.reachMult;
}

// ---------- 거리 변환(정확한 유클리드, 칸 단위 → m) ----------
const BIG = 1e10;
const NM = Math.max(NU, NW);
const _f = new Float64Array(NM);
const _d = new Float64Array(NM);
const _v = new Int32Array(NM);
const _z = new Float64Array(NM + 1);
function edt1(n) {
  let k = 0;
  _v[0] = 0;
  _z[0] = -BIG;
  _z[1] = BIG;
  for (let q = 1; q < n; q++) {
    let s = (_f[q] + q * q - (_f[_v[k]] + _v[k] * _v[k])) / (2 * q - 2 * _v[k]);
    while (s <= _z[k]) {
      k--;
      s = (_f[q] + q * q - (_f[_v[k]] + _v[k] * _v[k])) / (2 * q - 2 * _v[k]);
    }
    k++;
    _v[k] = q;
    _z[k] = s;
    _z[k + 1] = BIG;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (_z[k + 1] < q) k++;
    _d[q] = (q - _v[k]) ** 2 + _f[_v[k]];
  }
}
// seed 칸(1)까지 거리(m)
export function edt(seed, out) {
  let any = false;
  for (let c = 0; c < NC; c++) if (seed[c]) { any = true; break; }
  if (!any) { out.fill(1e6); return out; }
  for (let i = 0; i < NU; i++) {
    for (let j = 0; j < NW; j++) _f[j] = seed[j * NU + i] ? 0 : BIG;
    edt1(NW);
    for (let j = 0; j < NW; j++) out[j * NU + i] = _d[j];
  }
  for (let j = 0; j < NW; j++) {
    for (let i = 0; i < NU; i++) _f[i] = out[j * NU + i];
    edt1(NU);
    for (let i = 0; i < NU; i++) out[j * NU + i] = _d[i] >= BIG * 0.5 ? 1e6 : Math.sqrt(_d[i]) * CELL;
  }
  return out;
}

// 안전 칸(1) 격자: 이동 타원 × 0.95 안 + 모든 알에서 여유 ≥ minClr
export function safeGrid(eggs, b, out = new Uint8Array(NC), minClr = 0) {
  out.set(IN_SAFE);
  const h0 = (NU - 1) / 2, v0 = (NW - 1) / 2;
  for (const e of eggs) {
    const rr = e.tipMax + b + minClr + 0.3;
    const wc = e.w - e.drop;
    const i0 = Math.max(0, Math.floor((e.u - rr) / CELL + h0)), i1 = Math.min(NU - 1, Math.ceil((e.u + rr) / CELL + h0));
    const j0 = Math.max(0, Math.floor((wc - rr) / CELL + v0)), j1 = Math.min(NW - 1, Math.ceil((wc + rr) / CELL + v0));
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const c = j * NU + i;
        if (!out[c]) continue;
        if (clear2D(e, CU[c], CW[c], b) < minClr) out[c] = 0;
      }
    }
  }
  return out;
}

// ---------- B-2 안전 지대 지도 ----------
const _lab = new Int32Array(NC);
const _stack = new Int32Array(NC);
const _uns = new Uint8Array(NC);
const _din = new Float32Array(NC);
// safe(1) 격자 → 덩어리 목록 [{ id, n, ins, M, cM(가장 가까운 칸), cIns(가장 깊은 칸), path: 'center'|'out' }]. P = 앞 목표
export function zones(safe, eggs, P) {
  for (let c = 0; c < NC; c++) _uns[c] = safe[c] ? 0 : 1;
  edt(_uns, _din); // 위험·타원 밖 칸까지 거리
  _lab.fill(-1);
  const out = [];
  for (let c0 = 0; c0 < NC; c0++) {
    if (!safe[c0] || _lab[c0] >= 0) continue;
    const id = out.length;
    const z = { id, n: 0, ins: 0, M: Infinity, cM: c0, cIns: c0, center: 0 };
    let sp = 0;
    _stack[sp++] = c0;
    _lab[c0] = id;
    while (sp) {
      const c = _stack[--sp];
      z.n++;
      const ins = _din[c] - CELL * 0.5;
      if (ins > z.ins) { z.ins = ins; z.cIns = c; }
      const d = Math.hypot(CU[c] - P[0], CW[c] - P[1]);
      if (d < z.M) { z.M = d; z.cM = c; }
      const i = c % NU, j = (c / NU) | 0;
      if (i > 0 && safe[c - 1] && _lab[c - 1] < 0) { _lab[c - 1] = id; _stack[sp++] = c - 1; }
      if (i < NU - 1 && safe[c + 1] && _lab[c + 1] < 0) { _lab[c + 1] = id; _stack[sp++] = c + 1; }
      if (j > 0 && safe[c - NU] && _lab[c - NU] < 0) { _lab[c - NU] = id; _stack[sp++] = c - NU; }
      if (j < NW - 1 && safe[c + NU] && _lab[c + NU] < 0) { _lab[c + NU] = id; _stack[sp++] = c + NU; }
    }
    z.path = pathOf(eggs, CU[z.cIns], CW[z.cIns]) === 'center' ? 'center' : 'out';
    out.push(z);
  }
  return out;
}
export const zoneLabel = (c) => _lab[c];
// 덩어리 비용(D 의 한 항) — reachH: 사람 닿을 거리, Th: 사람이 쓸 수 있는 시간
export function zoneCost(z, reachH, Th) {
  const cl = (x) => Math.max(0, Math.min(1, x));
  return 0.5 * (z.M / Math.max(1e-6, reachH)) + 0.3 * cl((1.3 - z.ins) / 0.8) + 0.2 * cl((1.7 - Th) / 0.6);
}
// 웨이브 난이도 D(0~100): 닿는 덩어리(M ≤ reachH)들 중 가장 싼 것. 닿는 덩어리가 1개면 +10
export function waveD(zs, reachH, Th, wts = null) {
  let best = Infinity, n = 0, bz = null;
  for (const z of zs) {
    if (z.M > reachH) continue;
    n++;
    const c = wts ? wts[0] * (z.M / Math.max(1e-6, reachH)) + wts[1] * Math.max(0, Math.min(1, (1.3 - z.ins) / 0.8)) + wts[2] * Math.max(0, Math.min(1, (1.7 - Th) / 0.6)) : zoneCost(z, reachH, Th);
    if (c < best) { best = c; bz = z; }
  }
  if (!n) return { D: 100, n: 0, z: null };
  return { D: Math.min(100, 100 * best + (n === 1 ? 10 : 0)), n, z: bz };
}

// R4 실틈 금지: 두 알의 위험 영역 바깥 테 사이 틈이 (−overlap, sep) 안이면 실틈. 띠와 이동 타원 가장자리 사이도 (0, edge) 안이면 실틈
export function fakeGap(eggs) {
  const M = CHOREO.map;
  for (let i = 0; i < eggs.length; i++) {
    const a = eggs[i];
    for (let j = i + 1; j < eggs.length; j++) {
      const c = eggs[j];
      const gap = Math.hypot(a.u - c.u, a.w - a.drop - (c.w - c.drop)) - a.rout - c.rout;
      if (gap > -M.overlap && gap < M.sep) {
        // 한쪽이 다른 쪽 구멍 안에 통째로 들어가 있으면 따로 보지 않는다(드묾)
        return 'pair';
      }
    }
    // 가장자리: 중심에서 32 방향으로 타원까지 거리 − r_out 중 가장 작은 값(띠가 타원을 넘으면 0 이하)
    let gMin = Infinity;
    const wc = a.w - a.drop;
    if ((a.u / E.u) ** 2 + (wc / E.v) ** 2 < 1) {
      for (let k = 0; k < 32; k++) {
        const th = (k / 32) * TAU;
        const dx = Math.cos(th), dy = Math.sin(th);
        // 타원 (u/Eu)² + (w/Ev)² = 1 과 반직선의 교점
        const A = (dx / E.u) ** 2 + (dy / E.v) ** 2, B = 2 * ((a.u * dx) / (E.u * E.u) + (wc * dy) / (E.v * E.v)), C = (a.u / E.u) ** 2 + (wc / E.v) ** 2 - 1;
        const t = (-B + Math.sqrt(Math.max(0, B * B - 4 * A * C))) / (2 * A);
        gMin = Math.min(gMin, t - a.rout);
      }
      if (gMin > 0 && gMin < M.edge) return 'edge';
    }
  }
  return null;
}

// ---------- 12차 D 검증 결과: 세 항 D 와 사람 근사 봇 피격률의 상관이 0.6 미만(회귀 2회 뒤에도) → D = 봇으로 잰 피격률 × 100 ----------
// 사람 근사 봇(한 웨이브만): 앞 목표 P 에서 출발, 범위 원(정보) + 반응 0.35 + 조작 0.1 뒤 움직임, 알 자리 오차 ±0.3m(폭발이 보이면 ±0.15m 로 다시),
// 「가까운 안전 칸(여유 0.25m 이상)」을 노림, 방향키(켜고 끄기), 조준점이 없는 길(밖·원판)은 카메라 시차(위아래 1.2 × 남은 거리 ÷ 6).
// 가까운 칸 찾기는 미리 정렬한 칸 거리 목록(OFFS)을 차례로 본다(빠름). 같은 난수 흐름 rnd 로 n 번
const OFFS = (() => {
  const r = Math.ceil(13 / CELL);
  const a = [];
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) * CELL; if (d <= 13) a.push([i, j, d]); }
  a.sort((p, q) => p[2] - q[2]);
  return a;
})();
function nearSafe(eggs, u, w, b, minClr = 0.25) {
  const i0 = Math.round(u / CELL), j0 = Math.round(w / CELL);
  const lim = CHOREO.ellSafe * CHOREO.ellSafe;
  for (const [di, dj] of OFFS) {
    const x = (i0 + di) * CELL, y = (j0 + dj) * CELL;
    if ((x / E.u) ** 2 + (y / E.v) ** 2 > lim) continue;
    if (clearOf(eggs, x, y, b) >= minClr) return [x, y];
  }
  return [u, w];
}
export function simHit(spec, w, n = 12, rnd = Math.random, opts = {}) {
  const b = birdR(spec);
  const dt = 1 / 30;
  const f = spec.forward;
  const react = opts.react ?? CHOREO.humanReact, ctrl = 0.1;
  const tKnow = Math.max(w.tPrev, w.tInfo + react) + ctrl;
  const tSee = w.tq + react + ctrl;
  const arrive = Math.min(...w.eggs.map((e) => w.tq + e.lead));
  const tEnd = Math.max(...w.eggs.map((e) => w.tq + e.lead)) + 0.05;
  const hasBand = w.eggs.some((e) => e.shape === 'band');
  const a = spec.accel * FEEL.heavyAccel;
  const k = 1 - Math.exp(-a * dt);
  const est = (err) => w.eggs.map((q) => { const t = rnd() * TAU, r = err * Math.sqrt(rnd()); return { ...q, u: q.u + Math.cos(t) * r, w: q.w + Math.sin(t) * r }; });
  // 맞음을 0/1 대신 「여유 c 의 부드러운 맞음」 1/(1 + e^(c/0.08))로 센다(판 12번으로도 1~10% 를 가를 수 있게). hard = 실제로 맞은 비율
  let hits = 0, hard = 0;
  for (let s = 0; s < n; s++) {
    let u = w.P[0], ww = w.P[1], vx = 0, vy = 0, aim = null, fixed = false;
    const done = new Uint8Array(w.eggs.length);
    let hit = false, cMin = Infinity;
    for (let t = Math.min(tKnow, w.tPrev); t <= tEnd && !hit; t += dt) {
      if (!aim && t >= tKnow) aim = nearSafe(est(0.3), u, ww, b);
      if (aim && !fixed && t >= tSee) { fixed = true; aim = nearSafe(est(0.15), u, ww, b); }
      let ax = 0, ay = 0;
      if (aim) {
        let tw = aim[1];
        if (opts.parallax !== false && !(hasBand && pathOf(w.eggs, aim[0], aim[1]) === 'center')) tw += (1.2 * Math.max(0, (arrive - t) * f + f * ctrl)) / 6;
        const du = aim[0] - u, dw = tw - ww;
        ax = Math.abs(du) > Math.abs(vx) / a + 0.08 ? Math.sign(du) : 0;
        ay = Math.abs(dw) > Math.abs(vy) / a + 0.08 ? Math.sign(dw) : 0;
      }
      vx += (ax * spec.lateral - vx) * k;
      vy += (ay * spec.lateral - vy) * k;
      u += vx * dt;
      ww += vy * dt;
      const q = (u / E.u) ** 2 + (ww / E.v) ** 2;
      if (q > 1) { const kk = 1 / Math.sqrt(q); u *= kk; ww *= kk; }
      for (let i = 0; i < w.eggs.length; i++) {
        const e = w.eggs[i];
        if (done[i] || t < w.tq + e.lead) continue;
        done[i] = 1;
        const c = clear2D(e, u, ww, b);
        if (c < cMin) cMin = c;
        if (c < 0) { hit = true; break; }
      }
    }
    if (hit) hard++;
    hits += 1 / (1 + Math.exp(Math.min(30, cMin / 0.08)));
  }
  simHit.hard = hard / n;
  return hits / n;
}

const zoneAt = (s) => {
  for (const z of COURSE.zones) if (s >= z.s[0] && s < z.s[1]) return z;
  return COURSE.zones[COURSE.zones.length - 1];
};
// 구간별 D 목표 곡선(진행 0~1). 12차 D 검증 뒤 D = 사람 근사 봇 피격률(%) — config CHOREO.dTarget
export const D_TARGET = CHOREO.dTarget;
// 구간별 대표 장면(구간마다 1번, 앞뒤 1웨이브는 목표 D 를 낮춤): [이름, 연속 웨이브 수, 주 알 종류, 바라는 길]
const SCENES = { early: ['국화 대 센터 연속 3발', 3, 'chrysL', 'center'], mid: ['고리 연타', 3, 'ring', null], late: ['심 모란 벽 사이 밖 길', 1, 'dahlia', 'out'], finale: ['버드나무 커튼 센터', 1, 'willowL', 'center'] };

// ======================= 한 판 짜기 =======================
// opts: { seed, sStart, los(wave) → bool, startW, wts(D 가중치), Dfix(웨이브마다 목표 D 덮어쓰기 — 검증용), noD }
export function planStage(birdId, opts = {}) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const spec = BIRDS[birdId];
  const f = spec.forward;
  const seed = (opts.seed ?? 1) >>> 0;
  const R = rng(seed);
  const rand = (a, b) => a + R() * (b - a);
  const sStart = opts.sStart ?? 0;
  const b = birdR(spec);
  const eighth = BEAT.eighth;
  const leadMax = Math.max(...Object.values(TIMING.lead));
  const waves = [];
  const log = { tries: 0, fails: 0, relaxed: 0, losReject: 0, losFail: 0, why: {}, relaxLog: [], capped: 0 };
  const M = CHOREO.map;
  // ---------- ① 박자 목록(박자 전용 난수) ----------
  const Rs = rng((seed ^ 0x5bd1e995) >>> 0);
  const ri = (a, b2) => Math.floor(a + Rs() * (b2 - a + 1));
  let tq = Math.ceil(CHOREO.first / eighth) * eighth;
  const slots = [];
  const seqI = {};
  let left = 0;
  let cur = null;
  const endS = (opts.length ?? COURSE.length) - CHOREO.endPad;
  while (sStart + (tq + leadMax) * f <= endS && slots.length < CHOREO.maxWaves) {
    const s = sStart + tq * f;
    const z = zoneAt(s);
    const phase = z.rest ? 'rest' : z.phase || 'mid';
    let pat = 'single';
    if (slots.length > 0 && phase !== 'rest') {
      if (left <= 0 || !cur || cur.phase !== phase) {
        const seq = CHOREO.seq[phase] || CHOREO.seq.mid;
        seqI[phase] = seqI[phase] || 0;
        const it = seq[seqI[phase] % seq.length];
        seqI[phase]++;
        // R7: 같은 무늬가 3웨이브 넘게 이어지지 않게(앞 무늬와 같으면 다음 무늬로)
        let it2 = it;
        if (cur && cur.pat === it[0]) { it2 = seq[seqI[phase] % seq.length]; seqI[phase]++; }
        cur = { pat: it2[0], phase };
        left = Math.min(3, ri(it2[1][0], it2[1][1]));
      }
      pat = cur.pat;
      left--;
    } else {
      left = 0;
      cur = null;
    }
    slots.push({ tq, s, zone: z.id, kind: phase === 'rest' ? 'rest' : phase === 'finale' ? 'finale' : 'mid', phase, pat });
    const g = CHOREO.gap[phase] || CHOREO.gap.mid;
    tq += ri(g[0], g[1]) * eighth;
  }
  // 구간 진행(0~1) → D 목표
  const span = {};
  for (const sl of slots) { const q = span[sl.phase] || (span[sl.phase] = [Infinity, -Infinity]); q[0] = Math.min(q[0], sl.tq); q[1] = Math.max(q[1], sl.tq); }
  for (const sl of slots) {
    const q = span[sl.phase];
    const p = q[1] > q[0] ? (sl.tq - q[0]) / (q[1] - q[0]) : 0;
    const T = D_TARGET[sl.phase] || D_TARGET.mid;
    sl.Dt = T[0] + (T[1] - T[0]) * p;
  }
  // ---------- ② 알 수 ----------
  for (const sl of slots) {
    if (sl.phase === 'finale') sl.nE = sl.pat === 'close' ? CHOREO.finaleMax : sl.pat === 'single' ? 1 : 2;
    else sl.nE = R() < (CHOREO.double[sl.phase] || 0) && sl.pat !== 'single' ? 2 : 1;
  }
  // 대표 장면: 구간 가운데쯤(간격이 그 종류 정보 규칙을 지키는 자리)에 연속 n 웨이브, 앞뒤 1웨이브 목표 D × 0.6
  if (!opts.noScenes) {
    for (const [ph, sc] of Object.entries(SCENES)) {
      const idx = [];
      for (let i = 1; i < slots.length; i++) if (slots[i].phase === ph) idx.push(i);
      if (idx.length < sc[1] + 2) continue;
      const need = launchToBurst(sc[2]) - TIMING.infoAfterLaunch + TIMING.infoGap;
      let st = -1;
      for (let d = 0; d < idx.length && st < 0; d++) {
        for (const sgn of [1, -1]) {
          const k0 = Math.floor(idx.length * 0.5) + sgn * d;
          if (k0 < 1 || k0 + sc[1] >= idx.length) continue;
          let ok = true;
          for (let q = 0; q < sc[1]; q++) { const a = slots[idx[k0 + q]], p0 = slots[idx[k0 + q] - 1]; if (a.tq - p0.tq < need - 1e-6 || idx[k0 + q] !== idx[k0] + q) ok = false; }
          if (ok) { st = k0; break; }
        }
      }
      if (st < 0) continue;
      for (let q = 0; q < sc[1]; q++) { const s2 = slots[idx[st + q]]; s2.scene = sc[0]; s2.forceKind = sc[2]; s2.forceWish = sc[3]; s2.nE = sc[2] === 'dahlia' ? 2 : 1; if (s2.pat === 'single') s2.pat = 'zig'; }
      for (const j of [idx[st] - 1, idx[st + sc[1] - 1] + 1]) if (slots[j] && !slots[j].scene) { slots[j].Dt *= 0.6; slots[j].sceneNb = true; }
      log.scenes = (log.scenes || 0) + 1;
    }
  }
  if (opts.Dfix) for (let i = 0; i < slots.length; i++) if (opts.Dfix[i] !== undefined) slots[i].Dt = opts.Dfix[i];
  const Rb = rng((seed ^ 0x2545f491) >>> 0); // 봇 피격률 잴 때 난수(배치 난수와 따로)
  // ---------- ③ 웨이브마다 배치 ----------
  const safe = new Uint8Array(NC);
  const dt = new Float32Array(NC);
  const dS = new Float32Array(NC);
  let Sprev = new Uint8Array(NC);
  let P = [0, opts.startW ?? -1];
  {
    let best = 0, bd = Infinity;
    for (let c = 0; c < NC; c++) if (IN_BIRD[c]) { const d = Math.hypot(CU[c] - P[0], CW[c] - P[1]); if (d < bd) { bd = d; best = c; } }
    Sprev[best] = 1;
  }
  let prevArrive = 0, prevTq = -99;
  const Fcamp = [0, opts.startW ?? -1]; // 손을 놓은 새가 머무는 시작 자리
  let chainDir = null;
  let zigSign = R() < 0.5 ? 1 : -1;
  let waveSign = 1;
  const pathCount = { out: 0, center: 0 };
  const clampEgg = (e) => e.w >= -7.5 && e.w <= 8.5 && Math.abs(e.u) <= 12.5;
  const pickKind = (phase, okFn) => {
    const mix = BURST.mix[phase === 'rest' ? 'early' : phase] || BURST.mix.mid;
    const ks = Object.keys(mix).filter((k) => mix[k] > 0 && okFn(k));
    if (!ks.length) return null;
    let tot = 0;
    for (const k of ks) tot += mix[k];
    let x = R() * tot;
    for (const k of ks) { x -= mix[k]; if (x <= 0) return k; }
    return ks[ks.length - 1];
  };
  const wts = opts.wts || null;
  for (let i = 0; i < slots.length; i++) {
    const sl = slots[i];
    const free = sl.pat === 'single' || sl.phase === 'rest';
    if (sl.pat === 'chain' && (!chainDir || !slots[i - 1] || slots[i - 1].pat !== 'chain')) {
      const a = (rand(30, 55) * Math.PI) / 180;
      chainDir = [Math.cos(a) * (P[0] > 0 ? -1 : 1), Math.sin(a) * (P[1] > 0 ? -1 : 1)];
    }
    const dirFor = () => {
      if (sl.pat === 'zig' || sl.pat === 'close') {
        if (Math.abs(P[0]) > 1) zigSign = P[0] > 0 ? -1 : 1;
        else zigSign = -zigSign;
        const j = rand(-0.25, 0.25);
        const L = Math.hypot(1, j);
        return [zigSign / L, j / L];
      }
      if (sl.pat === 'wave') {
        if (Math.abs(P[1]) > 0.8) waveSign = P[1] > 0 ? -1 : 1;
        else waveSign = -waveSign;
        const j = rand(-0.3, 0.3);
        const L = Math.hypot(1, j);
        return [j / L, waveSign / L];
      }
      if (sl.pat === 'chain') return chainDir.slice();
      const a = rand(0, Math.PI * 2);
      const x = Math.cos(a) - P[0] / E.u, y = Math.sin(a) - P[1] / E.v;
      const L = Math.hypot(x, y) || 1;
      return [x / L, y / L];
    };
    // 정보 간격: 이 알의 정보 ≥ 앞 웨이브 폭발 + 0.15
    const infoOK = (k) => sl.tq - infoBefore(k) >= prevTq + TIMING.infoGap - 1e-6;
    let best = null, bestScore = Infinity, fallbackLos = null;
    const cands = [];
    // R7: 주 알 종류 3웨이브 넘게 연속 금지 · 최적 길 4웨이브 넘게 연속 금지
    const lastK = waves.slice(-3).filter((w) => w.kindA).map((w) => w.kindA);
    const kindRun = lastK.length === 3 && lastK.every((x) => x === lastK[0]) ? lastK[0] : null;
    const lastP = waves.slice(-4).filter((w) => w.path).map((w) => w.path);
    const pathRun = lastP.length === 4 && lastP.every((x) => x === lastP[0]) ? lastP[0] : null;
    let tries = 0;
    let relax = 0; // 0: 모두 · 1: R5 풂 · 2: + R6 풂 · 3: + R3 풂
    let valid = 0;
    const want = sl.Dt;
    const maxAll = CHOREO.triesMax;
    let kindW = null;
    for (let k = 0; k < maxAll; k++) {
      if (cands.length >= CHOREO.cands || (cands.length >= 3 && k >= CHOREO.tries)) break; // 후보가 넉넉하면 끝
      if (k === CHOREO.tries && !cands.length) relax = 1;
      if (k === CHOREO.tries + 50 && !cands.length) relax = 2;
      if (k === CHOREO.tries + 100 && !cands.length) relax = 3;
      tries++;
      log.tries++;
      const why = (k2) => { const key = sl.phase + ':' + k2; log.why[key] = (log.why[key] || 0) + 1; };
      // 주 알 종류는 웨이브마다 한 번(구간 비율대로) — 안 되면 완화 단계마다 한 번 다시
      if (!kindW || k === CHOREO.tries || k === CHOREO.tries + 50 || k === CHOREO.tries + 100) kindW = sl.forceKind && infoOK(sl.forceKind) && k < CHOREO.tries + 100 ? sl.forceKind : pickKind(sl.phase, (kk) => infoOK(kk) && kk !== kindRun);
      const kindA = kindW;
      if (!kindA) { why('info'); continue; }
      const A = makeEgg(kindA, 0, 0, R);
      const band = A.shape === 'band' && A.rin + BAND.tol - b > 0;
      // 길 바람: 띠면 센터/밖(지금까지 비율이 목표에 가깝게), 원판이면 밖
      let wish = 'out';
      if (band) {
        const tot = pathCount.out + pathCount.center;
        const fc = tot ? pathCount.center / tot : 0;
        const pc = CHOREO.pathMix.center / (CHOREO.pathMix.out + CHOREO.pathMix.center);
        wish = R() < Math.max(0.1, Math.min(0.9, pc + (pc - fc) * 2)) ? 'center' : 'out';
        if (pathRun) wish = pathRun === 'center' ? 'out' : 'center';
      }
      if (sl.forceWish && (band || sl.forceWish === 'out')) wish = sl.forceWish;
      // 이 웨이브 시각(알 하나 먼저 — 곁 알을 더한 뒤 다시 계산)
      let T = sl.tq + A.lead - Math.max(prevArrive, sl.tq - infoBefore(kindA));
      let reach = reachOf(spec, T), reachH = reachOf(spec, T, true, CHOREO.humanReact);
      const d = dirFor();
      // 이동 거리: 사람 reach 의 0.25~0.85(목표 D 에 따라 넓게 뽑고 D 로 고른다)
      const fr = free ? rand(0.15, 0.45) : rand(0.25, 0.9);
      const Dw = Math.max(CHOREO.moveMin, Math.min(CHOREO.moveMax, reachH * fr));
      const loStill = band ? A.rin + BAND.tol - b + CHOREO.stillIn : 0;
      const hiStill = A.rout - BAND.tol + b - CHOREO.stillIn;
      let rhoP;
      let dd = d;
      if (wish === 'out') {
        rhoP = A.rout + b + BAND.outPad + 0.1 - Dw;
        rhoP = Math.max(loStill, Math.min(hiStill, rhoP));
        // 출구 방향 d 를 타원 안쪽으로(P 가 가장자리면 반대로)
        const ex = A.rout + b + BAND.outPad + 0.2 - rhoP;
        if ((P[0] + d[0] * ex) ** 2 / (E.u * 0.9) ** 2 + (P[1] + d[1] * ex) ** 2 / (E.v * 0.9) ** 2 > 1) dd = [-d[0], -d[1]];
        A.u = P[0] - dd[0] * rhoP;
        A.w = P[1] - dd[1] * rhoP + A.drop;
      } else {
        const rc = A.rin - b - BAND.centerPad;
        rhoP = Math.max(loStill, Math.min(hiStill, rc - 0.1 + Dw));
        // 구멍 중심이 타원 안쪽(× 0.8)에 오게
        if ((P[0] + d[0] * rhoP) ** 2 / (E.u * 0.8) ** 2 + (P[1] + d[1] * rhoP) ** 2 / (E.v * 0.8) ** 2 > 1) dd = [-d[0], -d[1]];
        A.u = P[0] + dd[0] * rhoP;
        A.w = P[1] + dd[1] * rhoP + A.drop;
      }
      const eggs = [A];
      // 곁 알(구간2·3 은 30~35% 가 2개, 피날레 close 3개): 출구 옆을 막거나 멀리 둔다(R4: 0.3m 이상 겹치거나 1.56m 이상 떨어짐)
      const nE = sl.nE;
      for (let q = 1; q < nE; q++) {
        const kx = sl.forceKind === 'dahlia' && infoOK('dahlia') ? 'dahlia' : pickKind(sl.phase, (kk) => infoOK(kk));
        if (!kx) break;
        const X = makeEgg(kx, 0, 0, R);
        // 놓을 자리를 몇 번 뽑아 통로 범위 안에 드는 것
        let placed = false;
        for (let t2 = 0; t2 < 8 && !placed; t2++) {
          const side = q === 1 ? (R() < 0.5 ? -1 : 1) : -eggs[1].side;
          const ang = Math.atan2(dd[1], dd[0]) + side * (rand(60, 150) * Math.PI) / 180;
          const gap = sl.forceKind === 'dahlia' ? rand(1.8, 3.0) : R() < 0.7 ? rand(-1.6, -0.4) : rand(1.7, 3.0); // 심 모란 벽: 사이 길
          const dist = Math.max(0.5, A.rout + X.rout + gap);
          X.u = A.u + Math.cos(ang) * dist;
          X.w = A.w - A.drop + Math.sin(ang) * dist + X.drop;
          X.side = side;
          placed = clampEgg(X);
        }
        if (!placed) break;
        eggs.push(X);
      }
      // 제자리 버티기 막기: 시작 자리(손을 놓은 새)가 이 웨이브에 맞지 않으면 작은 모란을 그 자리에(쉬는 구간·첫 웨이브 제외)
      if (!free && !stillHit(eggs, Fcamp[0], Fcamp[1], b, 0.2) && R() < CHOREO.camp) {
        const X = makeEgg('peonyS', 0, 0, R);
        const a2 = rand(0, Math.PI * 2), o2 = rand(0, 0.8);
        X.u = Fcamp[0] + Math.cos(a2) * o2;
        X.w = Fcamp[1] + Math.sin(a2) * o2 + X.drop;
        X.camp = true;
        if (infoOK('peonyS')) eggs.push(X);
      }
      if (!eggs.every(clampEgg)) { why('clamp'); continue; }
      // R4 실틈 금지(완화하지 않음)
      const fg = fakeGap(eggs);
      if (fg) { why('R4' + fg); continue; }
      // 시각: 정보 = 가장 늦은 알 정보, 도착 = 가장 이른 알 도착
      const infoW = Math.max(...eggs.map((e) => sl.tq - infoBefore(e.kind)));
      const arrW = Math.min(...eggs.map((e) => sl.tq + e.lead));
      T = arrW - Math.max(prevArrive, infoW);
      reach = reachOf(spec, T);
      reachH = reachOf(spec, T, true, CHOREO.humanReact);
      // R1 강제 이동(완화하지 않음): 쉬는 구간·첫 웨이브가 아니면 가만히 있으면 맞는다
      if (!free && !stillHit(eggs, P[0], P[1], b, CHOREO.stillIn - 0.05)) { why('R1'); continue; }
      // 안전 지대 지도
      safeGrid(eggs, b, safe);
      const zs = zones(safe, eggs, P);
      // R2 도달 보장 + R3 최소 크기(완화 3단계에서 R3 만 풂)
      const insMin = (z) => (relax >= 3 ? 0.3 : z.path === 'center' ? M.insCenter : M.insOut);
      const ok = zs.filter((z) => z.M <= M.reach * reachH && z.ins >= insMin(z));
      if (!ok.length) { why('R2'); continue; }
      // 봇 닿을 거리 안 덩어리
      const okBot = ok.filter((z) => z.M <= reach * 0.95);
      if (!okBot.length) { why('reach'); continue; }
      // D
      const Dres = waveD(zs, reachH, T, wts);
      // R5 선택지(완화 1단계부터 풂)
      if (relax < 1 && !free) {
        const nReach = Dres.n;
        if (sl.phase === 'early' && nReach < 2) { why('R5lo'); continue; }
        if ((sl.phase === 'late' || sl.phase === 'finale') && nReach > 2) { why('R5hi'); continue; }
      }
      // R6 방향(완화 2단계부터 풂): 무늬 zig = 좌우, wave = 위아래 — 노리는 덩어리가 그 축을 따라 있어야
      // 노릴 덩어리: 바란 길이 있으면 그 길에서, 없으면 가장 싼 덩어리
      let zT = null, cT = Infinity;
      for (const z of okBot) {
        const c = zoneCost(z, reachH, T) + (z.path === wish ? 0 : sl.forceWish ? 5 : 0.6);
        if (c < cT) { cT = c; zT = z; }
      }
      if (relax < 2 && !free && (sl.pat === 'zig' || sl.pat === 'wave')) {
        const tx = CU[zT.cM] - P[0], ty = CW[zT.cM] - P[1];
        const L = Math.hypot(tx, ty);
        if (L > 0.8) {
          const horiz = Math.abs(tx) >= Math.abs(ty);
          if ((sl.pat === 'zig') !== horiz) { why('R6'); continue; }
        }
      }
      // ④ 사슬(봇): 앞 웨이브에서 닿을 수 있는 어느 칸에서 출발해도 이 웨이브 안전 칸까지 reach 안
      edt(safe, dt);
      let worst = 0;
      for (let c = 0; c < NC; c++) if (Sprev[c] && dt[c] > worst) worst = dt[c];
      if (worst > reach) { why('chain'); continue; }
      // 목표 칸: 그 덩어리 안, 가장 가까운 칸 근처(+0.45m, 센터는 +1.2m)의 여유가 가장 큰 칸(밖 0.15 · 센터 0.1 이상)
      const pad = zT.path === 'center' ? 0.1 : 0.15;
      let tc = zT.cM, tcl = -Infinity;
      for (let c = 0; c < NC; c++) {
        if (!safe[c] || zoneLabel(c) !== zT.id) continue;
        const ddc = Math.hypot(CU[c] - P[0], CW[c] - P[1]);
        if (ddc > zT.M + (zT.path === 'center' ? 1.2 : 0.45)) continue;
        const cl = clearOf(eggs, CU[c], CW[c], b);
        if (cl < pad) continue;
        const sc = Math.min(cl, 0.7) - 0.3 * Math.max(0, ddc - zT.M);
        if (sc > tcl) { tcl = sc; tc = c; }
      }
      const target = [CU[tc], CW[tc]];
      const need = Math.hypot(target[0] - P[0], target[1] - P[1]);
      if (need > reach * 0.95) { why('need'); continue; }
      valid++;
      const cand = { eggs, need, target, path: zT.path, wish, D: Dres.D, nZone: Dres.n, zones: zs.map((z) => ({ M: +z.M.toFixed(2), ins: +z.ins.toFixed(2), path: z.path, n: z.n })), zT: { M: zT.M, ins: zT.ins }, dir: dd, pat: sl.pat, T, Th: T, reach, reachH, worst, relax, tInfo: infoW, tPrev: prevArrive, tArr: arrW, kindA };
      // ⑤ 화면 안·가려짐
      if (opts.los) {
        const w = { tq: sl.tq, s: sl.s, eggs, P: P.slice(), T: target };
        for (const e of eggs) { e.info = sl.tq - infoBefore(e.kind); e.s = sStart + (sl.tq + e.lead) * f; }
        if (!opts.los(w)) {
          log.losReject++;
          if (!fallbackLos || Math.abs(cand.D - want) < Math.abs(fallbackLos.D - want)) fallbackLos = cand;
          continue;
        }
      }
      cands.push(cand);
    }
    // 후보마다 사람 근사 봇 피격률(D, %) — 장면이 바라는 길·R7 길 연속을 먼저 거른 뒤 목표 D 에 가장 가까운 것
    let pool = cands;
    if (sl.forceWish && pool.some((c) => c.path === sl.forceWish)) pool = pool.filter((c) => c.path === sl.forceWish);
    if (pathRun && pool.some((c) => c.path !== pathRun)) pool = pool.filter((c) => c.path !== pathRun);
    for (const c of pool) {
      c.Df = c.D; // 세 항 식 D(참고)
      c.D = opts.noBot ? c.Df : 100 * simHit(spec, { eggs: c.eggs, P: P.slice(), tq: sl.tq, tInfo: c.tInfo, tPrev: c.tPrev }, CHOREO.botN, Rb);
      const score = free ? c.D : Math.abs(c.D - want) + 0.01 * Math.abs(c.Df - 50);
      if (score < bestScore) { bestScore = score; best = c; }
    }
    if (!best && fallbackLos) {
      best = fallbackLos;
      best.losFail = true;
      log.losFail++;
    }
    const wave = { i: waves.length, tq: sl.tq, s: sl.s, zone: sl.zone, kind: sl.kind, phase: sl.phase, nE: sl.nE, pat: sl.pat, Dt: +want.toFixed(1), scene: sl.scene || null, sceneNb: !!sl.sceneNb, nCand: cands.length, gapE: Math.round((sl.tq - (waves.length ? waves[waves.length - 1].tq : 0)) / eighth), P: P.slice(), tries };
    if (!best) {
      log.fails++;
      wave.failed = true;
      wave.eggs = [];
      wave.target = P.slice();
      wave.T = 0;
      wave.reach = 0;
      wave.reachH = 0;
      wave.D = null;
      edt(Sprev, dS);
      const Sn = new Uint8Array(NC);
      for (let c = 0; c < NC; c++) Sn[c] = IN_SAFE[c] && dS[c] <= 3 ? 1 : 0;
      Sprev = Sn;
    } else {
      Object.assign(wave, best);
      if (best.relax) { log.relaxed++; log.relaxLog.push({ i: wave.i, phase: sl.phase, relax: ['', 'R5', 'R5+R6', 'R5+R6+R3'][best.relax] }); }
      pathCount[best.path] = (pathCount[best.path] || 0) + 1;
      safeGrid(best.eggs, b, safe);
      edt(Sprev, dS);
      const Sn = new Uint8Array(NC);
      let cnt = 0;
      for (let c = 0; c < NC; c++) if (safe[c] && dS[c] <= best.reach) { Sn[c] = 1; cnt++; }
      wave.sCount = cnt;
      Sprev = Sn;
      P = best.target.slice();
    }
    for (const e of wave.eggs) {
      e.tm = sl.tq + e.lead;
      e.s = sStart + e.tm * f;
      e.info = sl.tq - infoBefore(e.kind);
      e.reveal = e.info; // 옛 이름
      e.launch = sl.tq - launchToBurst(e.kind);
      e.egg = sl.tq - TIMING.eggBefore;
    }
    wave.tPass = wave.eggs.length ? Math.max(...wave.eggs.map((e) => e.tm)) : sl.tq + TIMING.lead.M;
    wave.info = wave.eggs.length ? Math.max(...wave.eggs.map((e) => e.info)) : sl.tq;
    wave.reveal = wave.eggs.length ? Math.min(...wave.eggs.map((e) => e.info)) : sl.tq;
    if (waves.length && wave.eggs.length) {
      wave.infoAfterPrevBurst = +(wave.reveal - prevTq).toFixed(3);
      if (wave.reveal < prevTq + TIMING.infoGap - 1e-6) log.infoViol = (log.infoViol || 0) + 1;
    }
    if (wave.eggs.length) {
      prevArrive = wave.tPass;
      prevTq = sl.tq;
    }
    waves.push(wave);
  }
  const ms = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
  return { bird: birdId, seed, sStart, waves, log, ms };
}

// 웨이브 목록 요약 지표(점검·보고용)
export function planStats(plan) {
  const all = plan.waves.filter((w) => !w.failed);
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map((x) => (x - m) ** 2))); };
  const ph = {};
  for (const w of plan.waves) ph[w.phase] = (ph[w.phase] || 0) + 1;
  const paths = { out: 0, center: 0 };
  for (const w of all) paths[w.path] = (paths[w.path] || 0) + 1;
  const kinds = {};
  for (const w of all) for (const e of w.eggs) kinds[e.kind] = (kinds[e.kind] || 0) + 1;
  const Dby = {};
  for (const w of all) (Dby[w.phase] || (Dby[w.phase] = [])).push(w.D);
  const Dstat = {};
  for (const [k, a] of Object.entries(Dby)) Dstat[k] = { n: a.length, mean: +mean(a).toFixed(1), sd: +sd(a).toFixed(1), min: +Math.min(...a).toFixed(1), max: +Math.max(...a).toFixed(1) };
  let nbMax = 0;
  for (let i = 1; i < all.length; i++) {
    if (all[i - 1].phase === 'rest' || all[i].phase === 'rest') continue;
    nbMax = Math.max(nbMax, Math.abs(all[i].D - all[i - 1].D));
  }
  return {
    waves: plan.waves.length, eggs: all.reduce((a, w) => a + w.eggs.length, 0), maxEggs: Math.max(0, ...all.map((w) => w.eggs.length)),
    phases: ph, paths, kinds, D: Dstat, neighborMax: +nbMax.toFixed(1),
    gapMin: +Math.min(...plan.waves.slice(1).map((w) => w.T || 99)).toFixed(2),
    fails: plan.log.fails, relaxed: plan.log.relaxed, losFail: plan.log.losFail, infoViol: plan.log.infoViol || 0, ms: +plan.ms.toFixed(1),
  };
}
