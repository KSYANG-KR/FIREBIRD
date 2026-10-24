// 16차 U8: S3 Overpass(고가 교차로) 월드 생성기 — world.js build() 가 S3(kit.style 'overpass')에서 부른다.
// 1차 테마: 고가 도로가 8 · 15 · 22m 세 층으로 겹쳐 지나는 교차로. 통로(새)는 39~54m 를 날며 발아래로 램프·고가 선로·육교·톨게이트를 내려다본다.
// 생성기(그리기 호출 늘지 않음 — 상판·교각·요금소는 구조물 인스턴스, 기둥은 원통, 차·열차 불빛은 차량 불빛 줄, 전차선은 S2 전선 메시)
//   ramps      : 곧은 고속도로(T1 22m · T2 8m · T3 15m · E2 8m · T6 15m · H 22m · H2 8m) + 연결 램프(곡선) + 클로버 고리 2개(0 → 8m).
//                상판 = 슬래브 + 양쪽 난간 + 층 색 LED 줄 + 거더, 교각 28m 마다, 가로등 36m 마다. 차 불빛 줄(S1 것)
//   viaduct    : 고가 선로 24m(복선) + 전차선 문형 기둥 48m 마다(맨 위 29.6m ≤ 통로 바닥 − 1) + 전차선 + 열차 불빛 줄(앞 칸만 불빛, 객실 띠)
//   footbridge : Footbridges 구간 대로(B5) 위 육교 8개(7m, 지붕·계단탑·유리 난간 빛, 사람)
//   tollbooth  : Toll Plaza 구간 요금소(10차로 · 부스 9 · 지붕 8.2m · 아래 빛 띠)
//   그 밖      : 주변 업무·아파트·창고 건물(가까운 띠 상한 · 모든 코스 구간 상한), 대로 가로수, 군중(육교·고가 아래 광장·보도)
// 모든 상판·소품은 「모든 코스 구간 상한」(world.capAllAt) 아래: 본체 ≤ 중심 − 12.5, 난간·가로등·전차선까지 ≤ 중심 − 7.
// 층끼리 겹치는 곳은 높이 차 ≥ 6.8m(아래 상판 위 난간 1.0 + 위 상판 두께 1.1 + 여유 4.7) — 점검 결과는 W.infraCross.
// 강·강둑 없음(지형 높이 0 — world.noWater). 실존 지명·랜드마크 없음. 붉은 주황은 위험 전용(LED·항공등·꼬리등은 차갑거나 어둡게).
import { CITY } from './config.js';
import { rect, RectGrid, SegGrid, distSegPt } from './alley.js';

const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

// 층 색 LED(난간 위 줄) — 8m 차가운 흰빛 · 15m 청록 · 22m 연보라 · 선로 흰빛(붉은 주황 없음)
const LED = { 8: [0.42, 0.55, 0.72], 15: [0.22, 0.62, 0.66], 22: [0.5, 0.42, 0.78], 24: [0.62, 0.66, 0.72] };
const hex = (c) => (Math.round(c[0] * 255) << 16) | (Math.round(c[1] * 255) << 8) | Math.round(c[2] * 255);
// 16차 U8b(gate16s3 1-2): 상판·난간을 지붕(유리·상가 지붕 albedo 약 0.08)보다 한 단계 밝게 · 선로 슬래브는 밝은 따뜻한 콘크리트(상판과 구별, 1-1)
const DECK = 0x5a5e66, PARA = 0x6c7078, PIER = 0x4c4f56, RAIL_SLAB = 0x8e8676, RAIL_PARA = 0x9a948a;

export function buildOverpass(W, MAX) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const C = W.course;
  const K = (W.kit && W.kit.overpass) || {};
  const FILL = K.fill ?? CITY.fill;
  const stats = { lines: 0, pieces: {}, piers: 0, pierSkip: 0, lamps: 0, portals: 0, footbridges: 0, booths: 0, lots: {}, rejOverlap: 0, rejRoad: 0, crowd: 0, cross: 0, crossViol: 0, gradeMax: 0, rMin: Infinity };
  W.crowdY = [];
  W.infra = [];
  W.extraTrees = [];
  const lampC = W.stage.city.lampColor;
  const lamp = [((lampC >> 16) & 255) / 255, ((lampC >> 8) & 255) / 255, (lampC & 255) / 255];
  const at = (s) => { const p = C.at(s, {}); return { x: p.x, z: p.z, fx: Math.sin(p.th), fz: -Math.cos(p.th), rx: Math.cos(p.th), rz: Math.sin(p.th) }; };
  const xz = (s, u) => { const p = C.xz(s, u, {}); return [p.x, p.z]; };
  const nrm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };

  // ---------- 1. 길(선) ----------
  const nets = []; // { L, lev, gen, deck: true/false, rail }
  const addLine = (name, pts, half, walk, extra = {}) => {
    const L = W._addLine(name, pts, half, extra.kind || 'road', walk);
    Object.assign(L, extra);
    nets.push(L);
    stats.lines++;
    return L;
  };
  // 높이 단면: 평지(plateau) lev, 그 밖은 경사 g 로 땅까지
  const profY = (t, P) => {
    if (t >= P.plat[0] && t <= P.plat[1]) return P.lev;
    const d = t < P.plat[0] ? P.plat[0] - t : t - P.plat[1];
    return Math.max(0.05, P.lev - d * (P.g ?? 0.06));
  };
  // 곧은 고속도로: 점 P 를 지나 방향 D, t ∈ far 범위(양 끝은 안개 너머), plat 안은 lev
  const trunk = (sp) => {
    const D = nrm(sp.D);
    const pts = [];
    const add = (t) => pts.push([sp.P[0] + D[0] * t, profY(t, sp), sp.P[1] + D[1] * t]);
    const brk = [sp.far[0], sp.far[1], sp.plat[0], sp.plat[1], sp.plat[0] - sp.lev / (sp.g ?? 0.06), sp.plat[1] + sp.lev / (sp.g ?? 0.06), ...(sp.breaks || [])].filter((t) => t >= sp.far[0] && t <= sp.far[1]);
    const ts = new Set();
    for (let t = sp.far[0]; t < sp.far[1]; t += 10) ts.add(+t.toFixed(3));
    for (const b of brk) ts.add(+b.toFixed(3));
    [...ts].sort((a, b) => a - b).forEach(add);
    const L = addLine(sp.name, pts, sp.half, sp.walk ?? 1.2, { kind: sp.kind || 'road', cars: sp.cars ?? 120, lev: sp.lev, gen: sp.gen || 'ramps', noLamp: sp.noLamp, noCone: sp.noCone, lampStep: 80, lampFar: 420, P: sp.P, D, sp });
    return L;
  };
  // 곡선 램프: 고속도로 LA 의 t = tA(진행 sA = ±1)에서 갈라져 LB 의 tB(진행 sB)로 합류. 끝점은 두 고속도로 가운데 선 위(붙음),
  //   30m 동안 비스듬히 차로 밖(반폭 + 6.1m)으로 나간 뒤 3차 베지어로 잇는다. 높이는 갈라진 곳 → 합류 곳까지 일정 경사
  const rampT = (name, LA, tA, sA, LB, tB, sB, opt = {}) => {
    const Aax = onT(LA, tA), Bax = onT(LB, tB);
    const dA = [LA.D[0] * sA, LA.D[1] * sA], dB = [LB.D[0] * sB, LB.D[1] * sB];
    const crs = (d, v) => d[0] * v[1] - d[1] * v[0];
    const sideA = Math.sign(crs(dA, [Bax[0] - Aax[0], Bax[1] - Aax[1]])) || 1;
    const sideB = Math.sign(crs(dB, [Aax[0] - Bax[0], Aax[1] - Bax[1]])) || 1;
    const wA = LA.half + (opt.half ?? 5.5) + 2.2, wB = LB.half + (opt.half ?? 5.5) + 2.2;
    const Ae = [Aax[0] + dA[0] * 30 - dA[1] * sideA * wA, Aax[1] + dA[1] * 30 + dA[0] * sideA * wA];
    const Be = [Bax[0] - dB[0] * 30 - dB[1] * sideB * wB, Bax[1] - dB[1] * 30 + dB[0] * sideB * wB];
    const L = ramp(name, Ae, dA, yT(LA, tA + sA * 30), Be, dB, yT(LB, tB - sB * 30), opt);
    L.pts.unshift([Aax[0], yT(LA, tA), Aax[1]]);
    L.pts.push([Bax[0], yT(LB, tB), Bax[1]]);
    stats.ramps = stats.ramps || [];
    const len = L.pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - L.pts[i - 1][0], p[2] - L.pts[i - 1][2]) : 0), 0);
    stats.ramps.push({ name, len: Math.round(len), grade: +(Math.abs(yT(LB, tB - sB * 30) - yT(LA, tA + sA * 30)) / Math.max(1, len - 60)).toFixed(3) });
    return L;
  };
  // 곡선 램프(3차 베지어): A(높이 hA, 방향 dA) → B(높이 hB, 방향 dB). 높이는 길이 따라 일정 경사
  const ramp = (name, A, dA, hA, B, dB, hB, opt = {}) => {
    dA = nrm(dA); dB = nrm(dB);
    const dist = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const k = (opt.k ?? 0.42) * dist;
    const P1 = [A[0] + dA[0] * k, A[1] + dA[1] * k], P2 = [B[0] - dB[0] * k, B[1] - dB[1] * k];
    const bz = (t) => { const u = 1 - t; return [u * u * u * A[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * B[0], u * u * u * A[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * B[1]]; };
    const raw = [];
    for (let i = 0; i <= 200; i++) raw.push(bz(i / 200));
    const acc = [0];
    for (let i = 1; i < raw.length; i++) acc.push(acc[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
    const len = acc[acc.length - 1];
    const pts = [];
    let next = 0;
    for (let i = 0; i < raw.length; i++) {
      if (acc[i] + 1e-6 < next && i < raw.length - 1) continue;
      const f = acc[i] / len;
      pts.push([raw[i][0], hA + (hB - hA) * f, raw[i][1]]);
      next = acc[i] + 5;
    }
    stats.gradeMax = Math.max(stats.gradeMax, Math.abs(hB - hA) / len);
    return addLine(name, pts, opt.half ?? 5.5, 0.8, { kind: 'road', cars: opt.cars ?? 30, carPiece: 14, carStep: 5, lev: Math.max(hA, hB), gen: 'ramps', noLamp: true, curve: true });
  };
  // 원호(클로버 고리 등): 가운데 c, 반지름 r, 각 a0 에서 sweep(라디안, + 반시계), 높이 h0 → h1. 앞뒤에 곧은 이음(pre·post 점)
  const arc = (name, c, r, a0, sweep, h0, h1, pre, post, opt = {}) => {
    const n = Math.max(8, Math.ceil((Math.abs(sweep) * r) / 5));
    const raw = [];
    if (pre) raw.push(pre);
    for (let i = 0; i <= n; i++) { const a = a0 + (sweep * i) / n; raw.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]); }
    if (post) raw.push(post);
    const acc = [0];
    for (let i = 1; i < raw.length; i++) acc.push(acc[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
    const len = acc[acc.length - 1];
    const pts = raw.map((p, i) => [p[0], h0 + (h1 - h0) * (acc[i] / len), p[1]]);
    stats.gradeMax = Math.max(stats.gradeMax, Math.abs(h1 - h0) / len);
    stats.rMin = Math.min(stats.rMin, r);
    return addLine(name, pts, opt.half ?? 5.0, 0.8, { kind: 'road', cars: opt.cars ?? 24, carPiece: 12, carStep: 5, lev: Math.max(h0, h1), gen: 'ramps', noLamp: true, curve: true });
  };

  // --- 코스 기준 자리(S3 plan 기준 — 코스 정의가 바뀌어도 s·u 로 따라감) ---
  const f0 = at(0); // 첫 직선(남쪽)
  const D1 = [f0.fx, f0.fz];
  const R1 = [f0.rx, f0.rz];
  // T1: 첫 직선 왼쪽 45m, 22m(쌓인 층의 맨 위). 남쪽은 고가 선로와 엇갈리기 전에 내려온다
  const pT1 = xz(0, -45);
  const T1 = trunk({ name: '고가 T1(22m)', P: pT1, D: D1, lev: 22, plat: [-200, 345], g: 0.06, far: [-2050, 2700], half: 10.5, cars: 100, noCone: true });
  // T2: s 200 에서 코스를 가로지르는 8m
  const pT2 = xz(200, 0);
  const T2 = trunk({ name: '고가 T2(8m)', P: pT2, D: [-R1[0], -R1[1]], lev: 8, plat: [-440, 300], g: 0.06, far: [-1700, 2050], half: 9, cars: 90, noCone: true });
  // T3: 요금소(땅) → 북동쪽으로 올라 15m — 끝 직선(피날레) 아래 땅 고속도로, Stacked Ramps 에서 코스 아래를 가로지른다
  const fF = at(2200);
  const D3 = [-fF.fx, -fF.fz];
  const pT3 = xz(2083, 0); // 피날레 직선 시작점(요금소 쪽)
  const tollT = [-215, -105]; // 요금소: 피날레 직선 시작 앞(쉬는 구간 Toll Plaza 에서 앞쪽으로 내려다보임)
  const T3prof = { lev: 15, plat: [560, 1500], g: 0.06 };
  const t3pts = (ta, tb) => { const pts = []; for (let t = ta; t < tb; t += 10) pts.push([pT3[0] + D3[0] * t, profY(t, T3prof), pT3[1] + D3[1] * t]); pts.push([pT3[0] + D3[0] * tb, profY(tb, T3prof), pT3[1] + D3[1] * tb]); return pts; };
  const T3a = addLine('땅 고속도로 T3(피날레 아래)', t3pts(-1950, tollT[0]), 11, 1.5, { kind: 'road', cars: 120, lev: 0, gen: 'ramps', lampStep: 60, lampFar: 420 });
  const toll = addLine('요금소 광장', t3pts(tollT[0], tollT[1]), 27, 1.5, { kind: 'alley', cars: 0, lev: 0, gen: 'tollbooth', simple: true, noLamp: true });
  const T3b = addLine('고가 T3(15m)', t3pts(tollT[1], 2900), 11, 1.5, { kind: 'road', cars: 110, lev: 15, gen: 'ramps', lampStep: 80, lampFar: 420, noCone: true });
  T3b.P = pT3; T3b.D = D3; T3b.sp = { P: pT3, lev: 15, plat: T3prof.plat, g: 0.06, far: [tollT[1], 2900] };
  // 클로버(Interchange Turn 우 90° 회전 가운데): E1 땅(5구간 방향) × E2 8m(직각), 동쪽 두 사분면에 고리(0 → 8m)
  const fA = at(1290), fB = at(1390.5);
  const O = [fA.x + fA.rx * 64, fA.z + fA.rz * 64]; // 회전 가운데(r64)
  const a5 = [fB.fx, fB.fz], b5 = [fB.rx, fB.rz]; // E1 방향(5구간) · E2 방향
  const E2 = trunk({ name: '고가 E2(8m)', P: O, D: b5, lev: 8, plat: [-130, 130], g: 0.06, far: [-1500, 2050], half: 9, cars: 90, noCone: true });
  // E1 남쪽 끝은 요금소 광장(T3)에 붙는다
  const tE1 = (() => { const den = a5[0] * D3[1] - a5[1] * D3[0]; return ((pT3[0] - O[0]) * D3[1] - (pT3[1] - O[1]) * D3[0]) / den; })();
  const E1 = trunk({ name: '클로버 땅길 E1', P: O, D: a5, lev: 0, plat: [0, 0], g: 1, far: [-1650, tE1], half: 8, cars: 70, noCone: true });
  const loops = [];
  for (const sa of [-1, 1]) {
    // 사분면 (sa·a, +b): 고리 가운데 = O + (sa·a + b) × 44, 반지름 30 — 땅길 E1 에서 나와 270° 돌아 E2(8m)로
    const cq = [O[0] + (sa * a5[0] + b5[0]) * 44, O[1] + (sa * a5[1] + b5[1]) * 44];
    // E1 위 시작점(가운데에서 a 방향 sa·(44 + 30)) · E2 위 끝점(b 방향 44 + 30)
    const pre = [O[0] + a5[0] * sa * 110, O[1] + a5[1] * sa * 110]; // E1 가운데 선 위(붙음)
    const post = [O[0] + b5[0] * 110, O[1] + b5[1] * 110]; // E2 가운데 선 위(8m 평지)
    const ang = (v) => Math.atan2(v[1], v[0]);
    // 고리는 E1 쪽 접점(가운데에서 −b 방향)에서 시작해 E2 쪽 접점(가운데에서 −a·sa 방향)에서 끝난다(270°)
    const s0 = ang([-b5[0], -b5[1]]), s1 = ang([-a5[0] * sa, -a5[1] * sa]);
    let sw = s1 - s0;
    // 270° 쪽으로
    while (sw <= 0) sw += Math.PI * 2;
    if (sw < Math.PI) sw -= Math.PI * 2;
    loops.push(arc(`클로버 고리 ${sa > 0 ? '남동' : '북동'}`, cq, 30, s0, sw, 0.05, 8, pre, post));
  }
  // B5: Footbridges 구간 대로(5구간 바로 아래, 땅) — 북쪽은 안개 너머, 남쪽 끝은 T3 에 붙는다
  const fC = at(1390.5);
  const pB5 = [fC.x, fC.z];
  const B5 = (() => {
    const D = a5;
    // T3a 선과 만나는 t(땅 고속도로에 붙음)
    const ex = D3[0], ez = D3[1];
    const den = D[0] * ez - D[1] * ex;
    const tJ = ((pT3[0] - pB5[0]) * ez - (pT3[1] - pB5[1]) * ex) / den;
    const pts = [];
    for (let t = -1650; t < tJ; t += 10) pts.push([pB5[0] + D[0] * t, 0.05, pB5[1] + D[1] * t]);
    pts.push([pB5[0] + D[0] * tJ, 0.05, pB5[1] + D[1] * tJ]);
    return addLine('육교 대로 B5', pts, 13, 4, { kind: 'avenue', cars: 100, lev: 0, gen: 'ramps', tJ, lampFar: 420, lampStep: 36 });
  })();
  // T6: 피날레 오른쪽 40m 15m 고가(북북동은 T3 와 나란히 — 엇갈림 없음)
  const pT6 = xz(2083, 40);
  const T6 = trunk({ name: '고가 T6(15m)', P: pT6, D: [fF.fx, fF.fz], lev: 15, plat: [-200, 950], g: 0.06, far: [-2700, 2300], half: 9.5, cars: 105, noCone: true });
  // H: s 2350 에서 가로지르는 22m, H2: s 2600 8m
  const fH = at(2350), fH2 = at(2600);
  const H = trunk({ name: '고가 H(22m)', P: [fH.x, fH.z], D: [fH.rx, fH.rz], lev: 22, plat: [-150, 150], g: 0.06, far: [-1500, 1500], half: 9, cars: 90, noCone: true });
  const H2 = trunk({ name: '고가 H2(8m)', P: [fH2.x, fH2.z], D: [-fH2.rx, -fH2.rz], lev: 8, plat: [-170, 170], g: 0.06, far: [-1500, 1500], half: 9, cars: 90, noCone: true });
  // Stacked Ramps: 3구간 s 700~800 에서 T1(22m → 땅, 이곳 약 7m) · T3(15m) · 고가 선로(24m)가 세 층으로 겹쳐 보인다(따로 더한 상판 없음 — 평행 고가는 피날레 T3·T6 과 겹쳐 뺐다)
  // 연결 램프: T2(8m) ↔ T1(22m) 남쪽, T6(15m) → H(22m)
  const onT = (L, t) => [L.P[0] + L.D[0] * t, L.P[1] + L.D[1] * t];
  const yT = (L, t) => profY(t, L.sp);
  // 고가 선로(24m 복선): 첫 직선 오른쪽 70m 로 내려와 r250 좌회전 → 3구간(Stacked/Rail Viaduct) 바로 아래를 지나 서북서로 안개 너머
  const rail = (() => {
    const pN = xz(-1700, 70), pS = xz(250, 70);
    const c = [pS[0] - R1[0] * 250, pS[1] - R1[1] * 250]; // 왼쪽(−u)으로 도는 가운데
    const pts2 = [];
    for (let t = 0; t <= 1; t += 1 / 195) pts2.push([pN[0] + (pS[0] - pN[0]) * t, pN[1] + (pS[1] - pN[1]) * t]);
    const a0 = Math.atan2(pS[1] - c[1], pS[0] - c[0]);
    const sweep = -(120 * Math.PI) / 180 * Math.sign(R1[0] * D1[1] - R1[1] * D1[0] || 1);
    // 앞(D1) 방향으로 돌도록 각 방향을 고른다
    let sg = 1;
    { const a1 = a0 + 0.05, q = [c[0] + Math.cos(a1) * 250, c[1] + Math.sin(a1) * 250]; if ((q[0] - pS[0]) * D1[0] + (q[1] - pS[1]) * D1[1] < 0) sg = -1; }
    void sweep;
    const nA = 105;
    for (let i = 1; i <= nA; i++) { const a = a0 + sg * ((120 * Math.PI) / 180) * (i / nA); pts2.push([c[0] + Math.cos(a) * 250, c[1] + Math.sin(a) * 250]); }
    const pe = pts2[pts2.length - 1], pq = pts2[pts2.length - 2];
    const dE = nrm([pe[0] - pq[0], pe[1] - pq[1]]);
    for (let t = 10; t <= 2300; t += 10) pts2.push([pe[0] + dE[0] * t, pe[1] + dE[1] * t]);
    // 높이: 코스에서 1,000m 안은 24m, 그 밖은 3% 로 땅까지
    const dC = pts2.map((p) => C.nearest(p[0], p[1]).d);
    const acc = [0];
    for (let i = 1; i < pts2.length; i++) acc.push(acc[i - 1] + Math.hypot(pts2[i][0] - pts2[i - 1][0], pts2[i][1] - pts2[i - 1][1]));
    let iA = 0, iB = pts2.length - 1;
    while (iA < pts2.length - 1 && dC[iA] > 1000) iA++;
    while (iB > 0 && dC[iB] > 1000) iB--;
    const pts = pts2.map((p, i) => {
      const d = i < iA ? acc[iA] - acc[i] : i > iB ? acc[i] - acc[iB] : 0;
      return [p[0], Math.max(0.05, 24 - d * 0.03), p[1]];
    });
    return addLine('고가 선로', pts, 5.6, 0.6, { kind: 'alley', cars: 1, train: { units: 7 }, carPiece: 420, carStep: 10, lev: 24, gen: 'viaduct', noLamp: true, rail: true, simple: true });
  })();
  // 연결 램프(곡선) — 위치는 고속도로 위 t 로
  const rampList = [];
  {
    // R1: T1(22m) 남행 → T2(8m) 서행(첫 직선 왼쪽 남서 사분면) · R2: T2(8m) 동행 → T1(22m) 북행(북서 사분면, R1 바깥)
    rampList.push(rampT('램프 T1→T2', T1, 33, 1, T2, 213, 1, { k: 0.39 })); // 반지름 약 120m 사분원
    rampList.push(rampT('램프 T2→T1', T2, 330, -1, T1, -83.5, -1, { k: 0.39 })); // 반지름 약 237m 사분원(R1 바깥)
    // R3: T6(15m) 남행 → H(22m) 오른쪽 방향(피날레 오른쪽)
    rampList.push(rampT('램프 T6→H', T6, 150, 1, H, 130, 1, { k: 0.45 }));
  }
  W._buildRoads(false);
  // 실제 경사(20m 창, 떠 있는 부분) — 모든 선
  stats.gradeLines = {};
  for (const L of nets) { let g = 0; const P = L.pts; for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const d = Math.hypot(P[j][0] - P[i][0], P[j][2] - P[i][2]); if (d < 20) continue; if (P[i][1] > 1.05 || P[j][1] > 1.05) g = Math.max(g, Math.abs(P[j][1] - P[i][1]) / d); break; } if (g > 0.07) stats.gradeLines[L.name] = +g.toFixed(3); stats.gradeMax = Math.max(stats.gradeMax, g); }

  // ---------- 2. 층 겹침 점검(평면에서 겹치는 두 상판의 높이 차 ≥ 6.8m, 합류 끝 70m 안은 뺌) ----------
  const segsOf = (L) => { const a = []; for (let i = 0; i < L.pts.length - 1; i++) a.push([L.pts[i], L.pts[i + 1], i]); return a; };
  const crossList = [];
  {
    const all = nets.map((L) => ({ L, segs: segsOf(L) }));
    // 선분 칸 표(40m) — 짝마다 모든 선분을 보지 않게
    const SG = new Map();
    const idx = new Map(all.map((A, i) => [A, i]));
    for (const A of all) for (const s of A.segs) {
      const r = A.L.half + 14; // 다른 선 반폭(≤ 11) + 1.5 까지 잡히게
      for (let ix = Math.floor((Math.min(s[0][0], s[1][0]) - r) / 40); ix <= Math.floor((Math.max(s[0][0], s[1][0]) + r) / 40); ix++) for (let iz = Math.floor((Math.min(s[0][2], s[1][2]) - r) / 40); iz <= Math.floor((Math.max(s[0][2], s[1][2]) + r) / 40); iz++) {
        const k = `${ix},${iz}`; let arr = SG.get(k); if (!arr) SG.set(k, (arr = [])); arr.push([A, s]);
      }
    }
    // 끝점이 다른 선 M 의 가운데 선 9m 안이면 「붙은 끝」(합류) — 그 끝 70m 안의 겹침은 합류 구간이라 뺀다
    const joinedEnds = new Map();
    for (const A of all) {
      const ends = [];
      for (const e of [A.L.pts[0], A.L.pts[A.L.pts.length - 1]]) {
        const near = new Set();
        const a = SG.get(`${Math.floor(e[0] / 40)},${Math.floor(e[2] / 40)}`) || [];
        for (const [B, s] of a) if (B !== A && distSegPt(s[0][0], s[0][2], s[1][0], s[1][2], e[0], e[2]) < 9) near.add(B.L);
        ends.push({ e, near });
      }
      joinedEnds.set(A.L, ends);
    }
    const endsNear = (L, M, p) => { for (const { e, near } of joinedEnds.get(L)) if (near.has(M) && Math.hypot(e[0] - p[0], e[2] - p[2]) <= 70) return true; return false; };
    const worstOf = new Map();
    for (const A of all) {
      for (const [a0, a1] of A.segs) {
        const mx = (a0[0] + a1[0]) / 2, mz = (a0[2] + a1[2]) / 2, my = (a0[1] + a1[1]) / 2;
        const cand = SG.get(`${Math.floor(mx / 40)},${Math.floor(mz / 40)}`) || [];
        for (const [B, bs] of cand) {
          if (B === A || idx.get(B) < idx.get(A)) continue;
          const [b0, b1] = bs;
          const d = distSegPt(b0[0], b0[2], b1[0], b1[2], mx, mz);
          if (d > A.L.half + B.L.half + 1.5) continue;
          // B 위 가장 가까운 점 높이
          const dx = b1[0] - b0[0], dz = b1[2] - b0[2];
          const L2 = dx * dx + dz * dz;
          const t = L2 > 0 ? Math.max(0, Math.min(1, ((mx - b0[0]) * dx + (mz - b0[2]) * dz) / L2)) : 0;
          const by = b0[1] + (b1[1] - b0[1]) * t;
          const dy = Math.abs(my - by);
          if (my < 1.05 && by < 1.05) continue; // 둘 다 땅(평면 교차로)
          if (dy >= 6.8) continue;
          const p = [mx, my, mz];
          if (endsNear(A.L, B.L, p) || endsNear(B.L, A.L, p)) continue;
          const key = A.L.name + '|' + B.L.name;
          const w0 = worstOf.get(key);
          if (!w0 || dy < w0.dy) worstOf.set(key, { a: A.L.name, b: B.L.name, at: [+mx.toFixed(0), +mz.toFixed(0)], ya: +my.toFixed(1), yb: +by.toFixed(1), dy: +dy.toFixed(2), s: +C.nearest(mx, mz).s.toFixed(0) });
        }
      }
    }
    crossList.push(...worstOf.values());
    stats.crossViol = crossList.length;
    stats.crossPairsChecked = all.length;
  }
  W.infraCross = { viol: crossList.length, list: crossList.slice(0, 12) };

  // ---------- 3. 상판·교각·난간·가로등 ----------
  const segG = new SegGrid(W.lines);
  // 선 높이 칸 표(교각이 다른 길 위에 서지 않게): 10m 칸
  const hGrid = new Map();
  for (const L of nets) for (const [a, b] of segsOf(L)) {
    const r = L.half + L.walk + 1;
    for (let ix = Math.floor((Math.min(a[0], b[0]) - r) / 20); ix <= Math.floor((Math.max(a[0], b[0]) + r) / 20); ix++) for (let iz = Math.floor((Math.min(a[2], b[2]) - r) / 20); iz <= Math.floor((Math.max(a[2], b[2]) + r) / 20); iz++) {
      const k = `${ix},${iz}`; let arr = hGrid.get(k); if (!arr) hGrid.set(k, (arr = [])); arr.push([a, b, L]);
    }
  }
  // (x, z) 에 기둥(반지름 rr)을 세우면 다른 길(그 자리 높이가 yTop − 3 아래)의 차로를 막는가
  const pierBlocked = (x, z, rr, yTop, self) => {
    const a = hGrid.get(`${Math.floor(x / 20)},${Math.floor(z / 20)}`);
    if (!a) return false;
    for (const [p, q, L] of a) {
      if (L === self) continue;
      const d = distSegPt(p[0], p[2], q[0], q[2], x, z);
      if (d > L.half + L.walk + rr + 0.5) continue;
      const dx = q[0] - p[0], dz = q[2] - p[2], L2 = dx * dx + dz * dz;
      const t = L2 > 0 ? Math.max(0, Math.min(1, ((x - p[0]) * dx + (z - p[2]) * dz) / L2)) : 0;
      const y = p[1] + (q[1] - p[1]) * t;
      if (y < yTop - 3) return true;
    }
    return false;
  };
  // (x, z) 에서 r 안에 떠 있는(4m 넘는) 상판이 있는가
  const deckNear = (x, z, r) => {
    for (let i = Math.floor((x - r) / 20); i <= Math.floor((x + r) / 20); i++) for (let j = Math.floor((z - r) / 20); j <= Math.floor((z + r) / 20); j++) {
      const a = hGrid.get(`${i},${j}`);
      if (!a) continue;
      for (const [p, q, L] of a) { if (p[1] < 4 && q[1] < 4) continue; if (distSegPt(p[0], p[2], q[0], q[2], x, z) < r + L.half) return true; }
    }
    return false;
  };
  const pieceOf = (L, A, B, opt) => {
    const dx = B[0] - A[0], dz = B[2] - A[2], dy = B[1] - A[1];
    const Lh = Math.hypot(dx, dz);
    if (Lh < 0.5) return;
    const len = Math.hypot(Lh, dy);
    const yaw = Math.atan2(-dz, dx);
    const roll = Math.atan2(dy, Lh);
    const nx = -dz / Lh, nz = dx / Lh;
    const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, mz = (A[2] + B[2]) / 2;
    const hw = L.half + (opt.rail ? 0.4 : 0.6);
    W._addStructW(mx, my - 0.8, mz, yaw, len + 0.5, 1.6, hw * 2, opt.rail ? RAIL_SLAB : DECK, 0, 0, roll); // 슬래브(거더 포함 두께 1.6m — 삼각형 예산으로 거더 상자를 따로 두지 않음)
    const ph = opt.rail ? 0.8 : 1.0;
    const led = LED[opt.lev] || LED[8];
    for (const e of [-1, 1]) {
      W._addStructW(mx + nx * e * (hw - 0.18), my + ph / 2, mz + nz * e * (hw - 0.18), yaw, len + 0.3, ph, 0.35, opt.rail ? RAIL_PARA : PARA, 0, 0, roll);
      // 층 색 LED 줄(난간 위). 16차 U8b(1-1): 선로에도 붙인다 — 차가운 흰빛, 상판보다 조금 밝게(열차가 없는 장에서도 선로 윤곽이 보이게)
      W._addStructW(mx + nx * e * (hw - 0.18), my + ph + 0.07, mz + nz * e * (hw - 0.18), yaw, len + 0.3, 0.14, 0.26, hex(led.map((c) => c * (opt.rail ? 0.42 : 0.35))), opt.rail ? 3.6 : 3.2, 0, roll);
    }
    const top = Math.max(A[1], B[1]);
    W.infra.push({ gen: opt.gen, x: mx, y: my - 0.8, z: mz, w: len, h: 1.6, d: hw * 2, yaw, tilt: roll, r: len / 2 + hw, hd: Math.hypot(len, hw * 2) / 2, top, propTop: top + ph + 0.1, line: L.name });
    stats.pieces[opt.gen] = (stats.pieces[opt.gen] || 0) + 1;
    W._occMark(mx, mz, 5, top, Math.min(L.half, Lh / 2));
  };
  const deckLine = (L, opt) => {
    const pts = L.pts;
    let run = [];
    const runs = [];
    for (const p of pts) { if (p[1] > 1.05) run.push(p); else { if (run.length > 1) runs.push(run); run = []; } }
    if (run.length > 1) runs.push(run);
    for (const R of runs) {
      // 조각: 방향 2.5°·경사 0.4% 안, 길이 maxLen 까지 한 상자
      let i0 = 0;
      while (i0 < R.length - 1) {
        let j = i0 + 1;
        const a0 = Math.atan2(R[i0 + 1][2] - R[i0][2], R[i0 + 1][0] - R[i0][0]);
        const g0 = (R[i0 + 1][1] - R[i0][1]) / (Math.hypot(R[i0 + 1][0] - R[i0][0], R[i0 + 1][2] - R[i0][2]) || 1);
        while (j + 1 < R.length) {
          const aj = Math.atan2(R[j + 1][2] - R[j][2], R[j + 1][0] - R[j][0]);
          const gj = (R[j + 1][1] - R[j][1]) / (Math.hypot(R[j + 1][0] - R[j][0], R[j + 1][2] - R[j][2]) || 1);
          let da = Math.abs(aj - a0); if (da > Math.PI) da = Math.PI * 2 - da;
          if (da > (2.5 * Math.PI) / 180 || Math.abs(gj - g0) > 0.004 || Math.hypot(R[j + 1][0] - R[i0][0], R[j + 1][2] - R[i0][2]) > (opt.maxLen || 42)) break;
          j++;
        }
        pieceOf(L, R[i0], R[j], opt);
        i0 = j;
      }
      // 교각(28m 마다, 다른 길을 막으면 건너뜀) · 가로등(36m 마다 양쪽 번갈아) · 전차선 문형 기둥(48m 마다, 선로)
      const acc = [0];
      for (let i = 1; i < R.length; i++) acc.push(acc[i - 1] + Math.hypot(R[i][0] - R[i - 1][0], R[i][2] - R[i - 1][2]));
      const tot = acc[acc.length - 1];
      const pAt = (d) => { let i = 0; while (i < acc.length - 2 && acc[i + 1] < d) i++; const f = (d - acc[i]) / Math.max(1e-6, acc[i + 1] - acc[i]); const a = R[i], b = R[i + 1]; const dx = b[0] - a[0], dz = b[2] - a[2], l = Math.hypot(dx, dz) || 1; return { x: a[0] + dx * f, y: a[1] + (b[1] - a[1]) * f, z: a[2] + dz * f, dx: dx / l, dz: dz / l }; };
      for (let d = 14; d < tot - 6; d += opt.pierStep || 28) {
        const q = pAt(d);
        if (q.y < 5.5) continue;
        const nx = -q.dz, nz = q.dx;
        const two = L.half >= 8.5;
        const cols = two ? [-L.half * 0.45, L.half * 0.45] : [0];
        const hTop = q.y - 2.0;
        let ok = true;
        for (const o of cols) if (pierBlocked(q.x + nx * o, q.z + nz * o, 1.2, q.y, L)) ok = false;
        if (!ok) { stats.pierSkip++; continue; }
        for (const o of cols) W._addCylW(q.x + nx * o, hTop / 2, q.z + nz * o, two ? 1.9 : 2.3, hTop, two ? 1.9 : 2.3, PIER);
        W._addStructW(q.x, hTop - 0.5, q.z, Math.atan2(-q.dz, q.dx), 2.2, 1.0, L.half * 1.7, PIER);
        W.infra.push({ gen: opt.gen, x: q.x, y: hTop / 2, z: q.z, w: 2.3, h: hTop, d: two ? L.half * 1.2 : 2.3, yaw: Math.atan2(-q.dz, q.dx), tilt: 0, r: L.half, hd: L.half, top: hTop, propTop: hTop, pier: true });
        stats.piers++;
      }
      if (!opt.rail) {
        let side = 1;
        for (let d = 18; d < tot - 6; d += 36, side = -side) {
          const q = pAt(d);
          if (q.y < 4) continue;
          const nx = -q.dz, nz = q.dx;
          const off = L.half + 0.3;
          const x = q.x + nx * side * off, z = q.z + nz * side * off;
          W._addBuildingWorld(x, z, 0, 0.22, 0.22, 6.4, 3, 0, 1, q.y + 1.0);
          const lx = x - nx * side * 1.4, lz = z - nz * side * 1.4;
          W._addGlow(lx, q.y + 7.25, lz, 0.6, 0.2, 0.6, [lamp[0] * 1.8, lamp[1] * 1.8, lamp[2] * 1.8]);
          W._addHalo(lx, q.y + 7.2, lz, 2.4, [lamp[0] * 0.5, lamp[1] * 0.42, lamp[2] * 0.3]);
          W._addHalo(lx, q.y + 0.3, lz, 5.0, [lamp[0] * 0.09, lamp[1] * 0.075, lamp[2] * 0.05]); // 상판 위 빛 고임
          stats.lamps++;
        }
      } else {
        // 전차선: 문형 기둥(양쪽 기둥 + 가로보, 맨 위 +5.6m) · 두 선로 위 전선(+5.1m)
        let prev = null;
        for (let d = 10; d < tot - 4; d += 48) {
          const q = pAt(d);
          const nx = -q.dz, nz = q.dx;
          const yaw = Math.atan2(-q.dz, q.dx);
          for (const e of [-1, 1]) W._addStructW(q.x + nx * e * (L.half + 0.1), q.y + 2.8, q.z + nz * e * (L.half + 0.1), yaw, 0.3, 5.6, 0.3, 0x55585e);
          W._addStructW(q.x, q.y + 5.45, q.z, yaw, 0.3, 0.3, L.half * 2 + 0.5, 0x55585e);
          for (const e of [-1, 1]) W._addHalo(q.x + nx * e * 2.3, q.y + 5.35, q.z + nz * e * 2.3, 0.3, [0.34, 0.38, 0.44]);
          // 16차 U8b(1-1): 문형 기둥 머리 점 빛(양쪽, 차가운 흰빛) — 멀리서도 선로 줄이 점선으로 읽히게
          for (const e of [-1, 1]) { W._addGlow(q.x + nx * e * (L.half + 0.1), q.y + 5.75, q.z + nz * e * (L.half + 0.1), 0.38, 0.38, 0.38, [0.75, 0.82, 0.95]); W._addHalo(q.x + nx * e * (L.half + 0.1), q.y + 5.75, q.z + nz * e * (L.half + 0.1), 1.6, [0.22, 0.25, 0.3]); }
          if (prev) for (const e of [-2.3, 2.3]) { W._addWire([prev.x + prev.nx * e, prev.y + 5.1, prev.z + prev.nz * e], [q.x + nx * e, q.y + 5.1, q.z + nz * e], 0.25, 0.06); W._addWire([prev.x + prev.nx * e, prev.y + 5.4, prev.z + prev.nz * e], [q.x + nx * e, q.y + 5.4, q.z + nz * e], 0.55, 0.04); }
          prev = { x: q.x, y: q.y, z: q.z, nx, nz };
          stats.portals++;
        }
        // 16차 U8b(1-1): 선로 가장자리 점 빛(16m 마다 양쪽 번갈아, 난간 위) — 레일 가장자리 띠와 함께
        { let sd = 1; for (let d = 8; d < tot - 4; d += 16, sd = -sd) { const q = pAt(d); const nx = -q.dz, nz = q.dx; W._addHalo(q.x + nx * sd * (L.half + 0.2), q.y + 1.0, q.z + nz * sd * (L.half + 0.2), 1.1, [0.2, 0.23, 0.28]); } }
        for (const it of W.infra) if (it.line === L.name && !it.pier) it.propTop = Math.max(it.propTop, it.top + 5.95);
      }
    }
  };
  for (const L of nets) {
    if (L === toll) continue;
    W._tag = L.rail ? 'viaduct' : 'ramps'; // 16차 U8b: 점검 도구용 이름표
    deckLine(L, { gen: L.gen === 'viaduct' ? 'viaduct' : 'ramps', lev: L.rail ? 24 : L.lev >= 20 ? 22 : L.lev >= 12 ? 15 : 8, rail: !!L.rail, maxLen: L.curve ? 7 : L.rail ? 30 : 42 });
  }

  W._tag = 'tollbooth';
  // ---------- 4. 요금소(T3 위, 땅) ----------
  const rects = new RectGrid(24);
  {
    const tc = (tollT[0] + tollT[1]) / 2;
    const c = [pT3[0] + D3[0] * tc, pT3[1] + D3[1] * tc];
    const nx = -D3[1], nz = D3[0];
    const yaw = Math.atan2(-D3[1], D3[0]);
    // 지붕(가로 54m × 깊이 16m, 8.2m) + 아래 빛 띠 6줄 + 기둥(부스 섬마다)
    W._addStructW(c[0], 8.6, c[1], yaw, 16, 0.8, 54, 0x5c6068);
    W._addStructW(c[0], 9.15, c[1], yaw, 16.4, 0.3, 54.4, 0x6a6e76, 0.15);
    for (let k = -2.5; k <= 2.5; k += 1) W._addStructW(c[0] + D3[0] * k * 2.4, 8.12, c[1] + D3[1] * k * 2.4, yaw, 0.5, 0.08, 52, hex([0.55, 0.6, 0.66]), 2.0);
    W.infra.push({ gen: 'tollbooth', x: c[0], y: 8.6, z: c[1], w: 16, h: 0.8, d: 54, yaw, tilt: 0, r: 28, hd: 28.5, top: 9.3, propTop: 9.3 });
    for (let i = -4; i <= 4; i++) {
      const o = i * 5.4;
      const bx = c[0] + nx * o, bz = c[1] + nz * o;
      W._addStructW(bx, 1.45, bz, yaw, 5.0, 2.9, 1.7, 0x8a8e96, 0.12); // 부스
      W._addStructW(bx, 2.0, bz, yaw, 5.05, 0.7, 1.75, hex([0.5, 0.6, 0.68]), 1.4); // 부스 창 빛
      W._addStructW(bx, 0.2, bz, yaw, 9, 0.4, 2.1, 0x6a6c72); // 섬
      W._addCylW(bx + D3[0] * 3.5, 4.25, bz + D3[1] * 3.5, 0.6, 8.5, 0.6, 0x60636a);
      W._addGlow(bx - D3[0] * 2.8, 3.2, bz - D3[1] * 2.8, 0.25, 0.25, 0.25, [0.2, 0.9, 0.55]); // 차로 열림 신호(초록)
      W.infra.push({ gen: 'tollbooth', x: bx, y: 1.45, z: bz, w: 5, h: 2.9, d: 1.7, yaw, tilt: 0, r: 2.7, hd: 2.7, top: 2.9, propTop: 2.9 });
      stats.booths++;
    }
    for (let k = -3; k <= 3; k++) { const q = [c[0] + nx * k * 8, c[1] + nz * k * 8]; W._addHalo(q[0], 7.6, q[1], 6, [0.1, 0.11, 0.12]); }
    rects.add(rect(c[0], c[1], Math.atan2(D3[1], D3[0]), 60, 28));
    W.alleySearch = [{ x: c[0] + nx * 40, z: c[1] + nz * 40, ph: Math.random() * 6.28, side: -1 }];
    W._occMark(c[0], c[1], 5, 9.3, 20);
  }

  W._tag = 'footbridge';
  // ---------- 5. 육교(B5 위) ----------
  {
    for (let s = 1450; s <= 1975; s += 75) {
      const f = at(s);
      const nn = [f.rx, f.rz];
      const yaw = Math.atan2(-nn[1], nn[0]); // 상자 x = 가로(대로를 건넘)
      const span = 2 * (B5.half + B5.walk) + 6;
      const y = 7.0;
      W._addStructW(f.x, y - 0.4, f.z, yaw, span, 0.8, 4.2, 0x50535a);
      for (const e of [-1, 1]) {
        W._addStructW(f.x + f.fx * e * 1.95, y + 0.6, f.z + f.fz * e * 1.95, yaw, span, 1.2, 0.12, hex([0.3, 0.5, 0.6]), 0.9); // 유리 난간(빛)
        W._addStructW(f.x + f.fx * e * 1.95, y + 3.4, f.z + f.fz * e * 1.95, yaw, span, 0.18, 0.18, 0x60646c);
      }
      W._addStructW(f.x, y + 3.6, f.z, yaw, span + 0.6, 0.22, 4.8, 0x585c64); // 지붕
      for (const e of [-1, 1]) {
        const q = [f.x + nn[0] * e * (span / 2 + 2), f.z + nn[1] * e * (span / 2 + 2)];
        W._addStructW(q[0], 5.4, q[1], yaw, 4.2, 10.8, 4.6, 0x4e525a); // 계단탑
        W._addStructW(q[0] - nn[0] * e * 2.12, 5.4, q[1] - nn[1] * e * 2.12, yaw, 0.08, 9.6, 3.2, hex([0.4, 0.55, 0.62]), 1.1); // 계단탑 창 빛
        rects.add(rect(q[0], q[1], Math.atan2(nn[1], nn[0]), 3, 3.2));
        W.infra.push({ gen: 'footbridge', x: q[0], y: 5.4, z: q[1], w: 4.2, h: 10.8, d: 4.6, yaw, tilt: 0, r: 3.2, hd: 3.2, top: 10.8, propTop: 10.8 });
      }
      for (let k = -2; k <= 2; k++) W._addHalo(f.x + nn[0] * k * 7, y + 3.2, f.z + nn[1] * k * 7, 1.6, [0.3, 0.34, 0.38]);
      W.infra.push({ gen: 'footbridge', x: f.x, y: y - 0.4, z: f.z, w: span, h: 0.8 + 4, d: 4.2, yaw, tilt: 0, r: span / 2, hd: Math.hypot(span, 4.8) / 2, top: y + 3.7, propTop: y + 3.7 });
      for (let k = 0; k < 14; k++) { const o = rand(-span / 2 + 1, span / 2 - 1), w2 = rand(-1.4, 1.4); W.crowdSpots.push(f.x + nn[0] * o + f.fx * w2, f.z + nn[1] * o + f.fz * w2, Math.random()); W.crowdY.push(y); }
      stats.footbridges++;
    }
  }

  W._tag = null;
  // ---------- 6. 건물(코스 좌표 격자 22m, 흔들어서 — 길·상판·요금소·육교 계단탑과 겹치지 않게) ----------
  const finish = (R, info) => {
    const n = C.nearest(R.x, R.z);
    if (n.d > FILL + 20) return false;
    const w = R.hw * 2, d = R.hd * 2, hd = Math.hypot(w, d) / 2;
    const edge = Math.abs(n.u) - hd;
    const ca = W.capAllAt(R.x, R.z, hd);
    const capTop = Math.min(W._capTop(n.s, edge, hd), ca.body);
    const band = !Number.isFinite(capTop) ? 'far' : Math.min(edge, ca.edge) <= CITY.cap.near ? 'near' : 'mid';
    let kind = info.kind, h;
    if (info.gen === 'apts') h = Math.round(randi(12, 22)) * 2.8 + 1.4;
    else if (info.gen === 'offices') h = randi(6, 16) * 3.6 + 1.0;
    else h = randi(2, 5) * 4.2 + 0.8; // 창고·작업장
    // 고가 옆·코스 바로 아래는 낮은 창고·작업장만(비행 높이에서 상판·램프가 가려지지 않게): 상판 25m 안 · 코스 85m 안은 13.4m 이하
    if (Math.abs(n.u) < 85 || deckNear(R.x, R.z, hd + 25)) { if (kind === 0) return false; h = Math.min(h, randi(2, 3) * 4.2 + 0.8); }
    if (Number.isFinite(capTop)) h = kind === 0 ? Math.min(h, Math.floor((capTop - 1.4) / 2.8) * 2.8 + 1.4) : Math.min(h, capTop);
    if (h < 6) return false;
    const yaw = -R.a;
    const lit = info.gen === 'works' ? rand(0.2, 0.45) : rand(0.35, 0.8);
    const bi = W._addBuildingWorld(R.x, R.z, yaw, w, d, h, kind, lit, rand(0.85, 1.15));
    if (bi < 0) return false;
    if (kind === 0 && w < 30) W._addBuildingWorld(R.x, R.z, yaw + Math.PI / 2, w, d, h, kind, lit, 1, 0, W.infoAttr.getX(bi));
    const near = band === 'near';
    const pLim = Math.min(near ? W._propTop(n.s, hd) : Infinity, ca.prop);
    const room = pLim - h;
    let propTop = h;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const loc = (lx, lz) => [R.x + c * lx + s * lz, R.z - s * lx + c * lz];
    if (room >= 1.0) { W._addBuildingWorld(R.x, R.z, yaw, w + 0.3, d + 0.3, 0.9, 3, 0, 1, h); propTop = h + 0.9; }
    if (Math.abs(n.u) < 200 && info.gen !== 'apts') {
      const na = randi(2, 6);
      if (room >= 1.2) for (let k = 0; k < na; k++) { const q = loc(rand(-w * 0.4, w * 0.4), rand(-d * 0.4, d * 0.4)); W._addBuildingWorld(q[0], q[1], yaw, rand(1.2, 1.8), rand(0.8, 1.2), 1.0, 3, 0, 1, h); propTop = Math.max(propTop, h + 1.0); }
      if (room >= 3.0 && Math.random() < 0.35) { const q = loc(rand(-w * 0.25, w * 0.25), rand(-d * 0.25, d * 0.25)); W._addBuildingWorld(q[0], q[1], yaw, rand(4, 7), rand(3.5, 6), 3.0, 3, 0, 1, h); propTop = Math.max(propTop, h + 3.0); }
    }
    if (kind === 0 && w > 30 && Math.abs(n.u) < 330) { W._rq('sign'); if (W.signList.length < MAX.sign) W.signList.push({ x: R.x, z: R.z, yaw, w, d, top: h, kind: 'dong', n: stats.lots.apts || 0, size: 8 }); }
    W.lots.push({ x: R.x, z: R.z, w, d, h, kind, yaw, top: h, propTop, s: n.s, u: n.u, edge, hd, band, gen: info.gen });
    W._occMark(R.x, R.z, 3, h, Math.min(w, d) / 2);
    if (Math.random() < 0.35) W.launchers.push({ x: R.x, y: h + 0.5, z: R.z, kind: 'roof' });
    stats.lots[info.gen] = (stats.lots[info.gen] || 0) + 1;
    return true;
  };
  const tryPlace = (x, z, a, hw, hd, info) => {
    for (let k = 0; k < 2; k++) {
      const R = rect(x, z, a, hw, hd);
      if (rects.hits(R, 1.0)) { stats.rejOverlap++; hw *= 0.72; hd *= 0.72; continue; }
      if (segG.hitsRect(R)) { stats.rejRoad++; hw *= 0.72; hd *= 0.72; continue; }
      rects.add(R);
      if (!finish(R, info)) return null;
      return R;
    }
    return null;
  };
  W._buildTowers((x, z, r) => segG.hitsCircle(x, z, r + 0.5));
  for (const t of W.towers) rects.add(rect(t.x, t.z, -t.yaw, t.w / 2, t.d / 2));
  stats.lots.tower = W.towers.length;
  for (let s = C.sMin - 10; s <= C.length + 440; s += 22) {
    const fr = C.at(s, {});
    const Fx = Math.sin(fr.th), Fz = -Math.cos(fr.th), Rx = Math.cos(fr.th), Rz = Math.sin(fr.th);
    const a = Math.atan2(Fz, Fx);
    for (let u = -FILL; u <= FILL; u += 22) {
      if (Math.abs(u) < 18) continue;
      const uu = u + rand(-3, 3), ss = rand(-3, 3);
      const x = fr.x + Rx * uu + Fx * ss, z = fr.z + Rz * uu + Fz * ss;
      const au = Math.abs(u);
      const q = Math.random();
      if (au > 200 && q < 0.45) tryPlace(x, z, a + Math.PI / 2, rand(16, 21), rand(6, 7.5), { kind: 0, gen: 'apts' });
      else if (q < 0.7) tryPlace(x, z, a, rand(7, 12), rand(7, 11), { kind: Math.random() < 0.45 ? 1 : 2, gen: 'offices' });
      else tryPlace(x, z, a, rand(8, 14), rand(6, 10), { kind: 2, gen: 'works' });
    }
  }

  // ---------- 7. 군중(고가 아래 광장 · 대로 보도) · 가로수 ----------
  {
    // 고가 선로 아래 광장(Rail Viaduct 구간 s 1080 근처): 선로 양쪽 20m 띠
    const f = at(1080);
    for (let k = 0; k < 700; k++) {
      const s = rand(-60, 60), u = rand(-26, 26);
      const x = f.x + f.fx * s + f.rx * u, z = f.z + f.fz * s + f.rz * u;
      if (segG.hitsCircle(x, z, 0.4) && Math.abs(u) > 7) continue;
      W.crowdSpots.push(x, z, Math.random()); W.crowdY.push(0);
    }
    // B5 보도
    const pts = B5.pts;
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      const nn = C.nearest(p[0], p[2]);
      if (nn.d > 300 || nn.s < 1350 || nn.s > 2050) continue;
      const dx = q[0] - p[0], dz = q[2] - p[2], l = Math.hypot(dx, dz) || 1;
      for (let k = 0; k < 10; k++) {
        const t = rand(0, 1), side = Math.random() < 0.5 ? -1 : 1, o = side * (B5.half + rand(0.5, B5.walk - 0.6));
        W.crowdSpots.push(p[0] + dx * t - (dz / l) * o, p[2] + dz * t + (dx / l) * o, Math.random()); W.crowdY.push(0);
      }
    }
    // 클로버 고리 안 둔덕 나무 · 광장 둘레
    for (const L of loops) {
      const c = L.pts[Math.floor(L.pts.length / 2)];
      void c;
    }
    for (const sa of [-1, 1]) {
      const cq = [O[0] + (sa * a5[0] + b5[0]) * 44, O[1] + (sa * a5[1] + b5[1]) * 44];
      for (let k = 0; k < 26; k++) { const a = rand(0, 6.28), r = Math.sqrt(Math.random()) * 22; W.extraTrees.push([cq[0] + Math.cos(a) * r, 0.05, cq[1] + Math.sin(a) * r, rand(0.8, 1.15)]); }
      W._occMark(cq[0], cq[1], 4, 0, 22);
    }
  }
  stats.crowd = W.crowdY.length;
  if (!W.alleySearch || W.alleySearch.length < 2) { const f = at(1350); (W.alleySearch || (W.alleySearch = [])).push({ x: O[0] + b5[0] * 90, z: O[1] + b5[1] * 90, ph: Math.random() * 6.28, side: 1 }); void f; }
  stats.rMin = Number.isFinite(stats.rMin) ? stats.rMin : null;
  stats.gradeMax = +stats.gradeMax.toFixed(4);
  stats.ms = +((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(1);
  W.overpassStats = stats;
}
