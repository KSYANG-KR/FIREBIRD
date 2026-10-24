// 16차 U7: S2 Sign Alley(간판 골목) 월드 생성기 — world.js build() 가 S2(kit.style 'alley')에서 부른다.
// 1차 테마: 낡은 상가 4~7층이 길을 따라 앞면을 맞대고 늘어선 골목. 통로(새)는 골목 위 39~46m 를 지나 발아래로 골목을 내려다본다.
// 생성기(그리기 호출: 상가·간판은 기존 인스턴스 그대로, 전선 +1, 천막 +1)
//   shops  : 길 따라 앞면 줄(1층 가게 유리) + 블록 안쪽 채움, 4~7층(가까운 띠 지붕 ≤ 중심 − 12.5), 옥상 소품 ≤ 통로 바닥 − 1(5.5m 이하)
//   signs  : 1층 간판 띠 · 층 간판 · 돌출 세로 간판 · 옥상 간판 틀(≤ 5.5m). 색은 SIGNS.neon(시안·보라·초록·흰색)과 상자 간판 바탕(파랑·보라·초록·남색)
//   wires  : 전봇대(보안등·애자 점 빛) · 전선 다발(가로 3가닥 + 통신선 · 건너는 선 · 건물 인입선, 굵기 0.045~0.1m · 화면 최소 1.5px) — 통로 바닥보다 30m 넘게 아래(장식, 판정 없음)
//   stalls : 야시장 천막 줄(Night Market · Alley Plaza) + 전구 줄
//   그 밖  : 먼 띠 아파트·업무 건물, 군중 자리(길가·광장·옥상 테라스), 옥상 발사대
// 강·강둑·다리는 없다(지형 높이 0 — world.noWater). 실존 상호·랜드마크 없음. 붉은 주황은 위험 전용이라 쓰지 않는다.
// 난수는 Math.random(점검 하네스가 씨앗 난수로 바꿔 끼움). 겹침: 모든 건물 바닥은 서로·도로와 겹치지 않게 놓는다(사각형 분리축 검사).
import { CITY, SIGNS } from './config.js';

const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));

// 간판 글자: 간판 폰트(BvfSign 서브셋)에 있는 글자만으로 만든 가상 일반명사(실제 상호 없음)
const VERT_WORDS = ['치킨', '약국', '노래방', '편의점', '부동산', '커피', '호프', '분식', '세탁', '국밥', 'PC방', '당구장']; // world.js buildAtlas 의 VERT 와 같은 순서
const GLYPHS = new Set([...SIGNS.texts.join(''), ...VERT_WORDS.join(''), '동', ...'0123456789 ']);
const WORDS = ['식당', '갈비집', '분식집', '호프집', '한식', '해장국', '국밥집', '커피', '노래방', '약국', '편의점', '부동산', '세탁', '꽃집', '당구장', 'PC방', '24시', '숯불갈비', '치킨', '한식뷔페', '24시 편의점', '갈비', '해장국집', '치킨호프'];
export const SIGN_WORDS = WORDS.filter((w) => [...w].every((c) => GLYPHS.has(c)));
const NEON_RGB = SIGNS.neon.map((h) => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]);
// 천막 색(파랑·남색·보라·초록·청록·흰색 — 붉은 주황 없음)
const CANOPY = [[0.08, 0.22, 0.42], [0.1, 0.12, 0.3], [0.26, 0.12, 0.38], [0.08, 0.3, 0.16], [0.06, 0.3, 0.3], [0.42, 0.44, 0.46]];
const BULB = [[0.62, 0.52, 0.34], [0.3, 0.55, 0.66], [0.46, 0.3, 0.66], [0.34, 0.62, 0.36]];

// 간판 가로세로 비(아틀라스 칸 크기 추정 — 옥상 틀 다리 자리만 씀, 실제 크기는 world._buildSigns 가 아틀라스로 정함)
const aspectOf = (type, pick) => {
  if (type === 'panel') { const w = SIGN_WORDS[pick % SIGN_WORDS.length]; return (86 * [...w].length + 64) / 138; }
  if (type === 'neon') { const w = SIGNS.texts[pick % SIGNS.texts.length]; return (96 * [...w].length + 70) / 138; }
  const n = VERT_WORDS[pick % VERT_WORDS.length] === 'PC방' ? 2 : [...VERT_WORDS[pick % VERT_WORDS.length]].length;
  return type === 'vert' ? 140 / (130 * n + 30) : 130 / (120 * n + 26);
};

// ---------- 사각형(건물 바닥) 칸 표: 분리축 검사로 겹침 확인 ----------
function rect(x, z, a, hw, hd) {
  const c = Math.cos(a), s = Math.sin(a);
  return { x, z, a, c, s, hw, hd, ext: Math.hypot(hw, hd) };
}
function rectsOverlap(A, B, gap) {
  const dx = B.x - A.x, dz = B.z - A.z;
  if (Math.hypot(dx, dz) > A.ext + B.ext + gap) return false;
  const axes = [[A.c, A.s], [-A.s, A.c], [B.c, B.s], [-B.s, B.c]];
  for (const [nx, nz] of axes) {
    const ra = A.hw * Math.abs(A.c * nx + A.s * nz) + A.hd * Math.abs(-A.s * nx + A.c * nz);
    const rb = B.hw * Math.abs(B.c * nx + B.s * nz) + B.hd * Math.abs(-B.s * nx + B.c * nz);
    if (Math.abs(dx * nx + dz * nz) > ra + rb + gap) return false;
  }
  return true;
}
class RectGrid {
  constructor(cell = 24) { this.cell = cell; this.m = new Map(); this.all = []; }
  _cells(r, fn) {
    const c = this.cell, e = r.ext;
    for (let i = Math.floor((r.x - e) / c); i <= Math.floor((r.x + e) / c); i++) for (let j = Math.floor((r.z - e) / c); j <= Math.floor((r.z + e) / c); j++) fn((i + 4096) * 8192 + (j + 4096));
  }
  add(r) {
    this.all.push(r);
    this._cells(r, (k) => { let a = this.m.get(k); if (!a) this.m.set(k, (a = [])); a.push(r); });
  }
  hits(r, gap = 0.12) {
    let hit = false;
    this._cells(r, (k) => { if (hit) return; const a = this.m.get(k); if (a) for (const o of a) if (rectsOverlap(r, o, gap)) { hit = true; return; } });
    return hit;
  }
}

// ---------- 도로 선분 칸 표: 사각형·원이 도로(반폭 + 보도)에 닿는가 ----------
function distSegPt(ax, az, bx, bz, px, pz) {
  const dx = bx - ax, dz = bz - az;
  const L = dx * dx + dz * dz;
  let t = L > 0 ? ((px - ax) * dx + (pz - az) * dz) / L : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}
// 선분(지역 좌표)과 축 정렬 상자 [−hw, hw] × [−hd, hd] 사이 거리(만나면 0)
function distSegBox(x0, z0, x1, z1, hw, hd) {
  // 선분이 상자와 만나는가(Liang–Barsky)
  let t0 = 0, t1 = 1;
  const dx = x1 - x0, dz = z1 - z0;
  const clip = (p, q) => { if (Math.abs(p) < 1e-12) return q >= 0; const r = q / p; if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; } return true; };
  if (clip(-dx, x0 + hw) && clip(dx, hw - x0) && clip(-dz, z0 + hd) && clip(dz, hd - z0) && t0 <= t1) return 0;
  const box = (px, pz) => Math.hypot(Math.max(0, Math.abs(px) - hw), Math.max(0, Math.abs(pz) - hd));
  let d = Math.min(box(x0, z0), box(x1, z1));
  for (const [cx, cz] of [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]]) d = Math.min(d, distSegPt(x0, z0, x1, z1, cx, cz));
  return d;
}
class SegGrid {
  constructor(lines, cell = 40) {
    this.cell = cell;
    this.m = new Map();
    for (const L of lines) {
      const r = L.half + L.walk + 0.2;
      for (let i = 0; i < L.pts.length - 1; i++) {
        const a = L.pts[i], b = L.pts[i + 1];
        const sg = { ax: a[0], az: a[2], bx: b[0], bz: b[2], r };
        const c = cell;
        for (let ix = Math.floor((Math.min(a[0], b[0]) - r) / c); ix <= Math.floor((Math.max(a[0], b[0]) + r) / c); ix++) {
          for (let iz = Math.floor((Math.min(a[2], b[2]) - r) / c); iz <= Math.floor((Math.max(a[2], b[2]) + r) / c); iz++) {
            const k = (ix + 4096) * 8192 + (iz + 4096);
            let arr = this.m.get(k);
            if (!arr) this.m.set(k, (arr = []));
            arr.push(sg);
          }
        }
      }
    }
  }
  _near(x, z, e, fn) {
    const c = this.cell;
    const seen = new Set();
    for (let i = Math.floor((x - e) / c); i <= Math.floor((x + e) / c); i++) for (let j = Math.floor((z - e) / c); j <= Math.floor((z + e) / c); j++) {
      const a = this.m.get((i + 4096) * 8192 + (j + 4096));
      if (!a) continue;
      for (const sg of a) { if (seen.has(sg)) continue; seen.add(sg); if (fn(sg)) return true; }
    }
    return false;
  }
  hitsRect(R) {
    return this._near(R.x, R.z, R.ext, (sg) => {
      // 사각형 지역 좌표로
      const lx = (px, pz) => (px - R.x) * R.c + (pz - R.z) * R.s;
      const lz = (px, pz) => -(px - R.x) * R.s + (pz - R.z) * R.c;
      return distSegBox(lx(sg.ax, sg.az), lz(sg.ax, sg.az), lx(sg.bx, sg.bz), lz(sg.bx, sg.bz), R.hw, R.hd) < sg.r;
    });
  }
  hitsCircle(x, z, rr) {
    return this._near(x, z, rr, (sg) => distSegPt(sg.ax, sg.az, sg.bx, sg.bz, x, z) < sg.r + rr);
  }
}

function polyLen(pts) {
  let L = 0;
  for (let i = 0; i < pts.length - 1; i++) L += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][2] - pts[i][2]);
  return L;
}
// 선 위 거리 d 의 점·방향(누적 길이 표로 빠르게)
function polyIndex(pts) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][2] - pts[i - 1][2]));
  return acc;
}
function polyAtI(pts, acc, d, out = {}) {
  let lo = 0, hi = acc.length - 1;
  if (d <= 0) lo = 0;
  else if (d >= acc[hi]) lo = hi - 1;
  else { while (hi - lo > 1) { const m = (lo + hi) >> 1; if (acc[m] <= d) lo = m; else hi = m; } }
  const a = pts[lo], b = pts[Math.min(pts.length - 1, lo + 1)];
  const L = Math.max(1e-6, acc[lo + 1] - acc[lo]);
  const t = Math.max(0, Math.min(1, (d - acc[lo]) / L));
  out.x = a[0] + (b[0] - a[0]) * t;
  out.z = a[2] + (b[2] - a[2]) * t;
  out.dx = (b[0] - a[0]) / L;
  out.dz = (b[2] - a[2]) / L;
  return out;
}

// 16차 U8: S3 고가 교차로(overpass.js)도 같은 사각형·도로 칸 표를 쓴다
export { rect, RectGrid, SegGrid, polyIndex, polyAtI, distSegPt, polyLen };

// ======================= 본 생성 =======================
// W = World(이번 스테이지 course·kit·stage 가 들어 있음), MAX = 인스턴스 버퍼 크기
export function buildAlley(W, MAX) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const C = W.course;
  const A = (W.kit && W.kit.alley) || {};
  const W1 = A.W1 ?? 100, W2 = A.W2 ?? 230, FILL = A.fill ?? CITY.fill;
  const zoneFl = (s) => { const z = C.zoneAt(Math.max(-40, Math.min(C.length + 20, s))); return { id: z.id, signs: 1, wires: 1, stalls: 0, roof: 0.15, ...((A.zones && A.zones[z.id]) || {}) }; };
  const stats = { lots: {}, kinds: {}, signs: 0, signReq: 0, wires: 0, stalls: 0, poles: 0, insul: 0, crowd: 0, rejOverlap: 0, rejRoad: 0, roofSigns: 0, terrace: 0, nearShops: 0, nearProps: 0, roofRooms: 0, roofTanks: 0, roofAC: 0, frontPairs: 0, frontStep: 0 };
  W.crowdY = []; // 군중 자리마다 바닥 높이(길 0 · 옥상 테라스 = 지붕)
  const lamp = { r: 1, g: 0.88, b: 0.69 };
  { const c = W.stage.city.lampColor; lamp.r = ((c >> 16) & 255) / 255; lamp.g = ((c >> 8) & 255) / 255; lamp.b = (c & 255) / 255; }
  const P3 = (x, z) => [x, 0.05, z];
  const arcs = C.segs.filter((g) => Math.abs(g.turn) > 1e-6).map((g) => [g.a, g.b]);
  const inArc = (s, pad) => arcs.some(([a, b]) => s > a - pad && s < b + pad);
  const plazaZone = C.def.zones.find((z) => z.id === (A.plazaZone || 'plaza'));
  const PZ = plazaZone ? [plazaZone.s[0] + 4, plazaZone.s[1] - 4] : null;
  const PH = A.plazaHalf ?? 22;

  // ---------- 1. 길 ----------
  const sA = C.sMin - 1250, sB = C.length + 150 + 1250; // 중앙 골목 양 끝은 코스에서 1.2km 넘게(안개 너머)
  const centerPts = (s0, s1) => {
    const pts = [];
    for (let s = s0; s < s1 - 1e-6; s += s < C.sMin || s > C.sMax ? 50 : 10) { const p = C.xz(s, 0, {}); pts.push(P3(p.x, p.z)); }
    const p = C.xz(s1, 0, {});
    pts.push(P3(p.x, p.z));
    return pts;
  };
  const mk = (name, pts, half, walk, extra = {}) => { const L = W._addLine(name, pts, half, extra.kind || 'alley', walk); Object.assign(L, extra); return L; };
  const centers = [];
  let plazaLine = null;
  if (PZ) {
    centers.push(mk('중앙 골목(앞)', centerPts(sA, PZ[0]), 4.0, 2.0, { noLamp: true, role: 'center' }));
    centers.push(mk('중앙 골목(뒤)', centerPts(PZ[1], sB), 4.0, 2.0, { noLamp: true, role: 'center' }));
    plazaLine = mk('골목 광장', centerPts(PZ[0] - 2, PZ[1] + 2), 0.5, PH, { noLamp: true, simple: true, role: 'plaza' });
  } else centers.push(mk('중앙 골목', centerPts(sA, sB), 4.0, 2.0, { noLamp: true, role: 'center' }));
  // 가로 골목: 직선 구간에서 70~95m 마다, 중앙 골목에서 양쪽 W2 까지(다른 구간 땅으로 넘어가면 그쪽은 뺀다)
  const crosses = [];
  for (let s = (A.crossStart ?? -300); s < C.length + 420; s += rand(A.crossGap ? A.crossGap[0] : 70, A.crossGap ? A.crossGap[1] : 95)) {
    if (inArc(s, 42)) continue;
    if (PZ && s > PZ[0] - 34 && s < PZ[1] + 34) continue;
    for (const side of [-1, 1]) {
      let ok = true;
      for (let u = 10; u <= W2 + 1e-6 && ok; u += 10) {
        const p = C.xz(s, side * u, {});
        if (Math.abs(C.nearest(p.x, p.z).s - s) > 3) ok = false;
      }
      if (!ok) continue;
      const a = C.xz(s, 0, {}), b = C.xz(s, side * W2, {});
      crosses.push({ s, side, L: mk(`가로 골목 s${Math.round(s)}${side > 0 ? '오른쪽' : '왼쪽'}`, [P3(a.x, a.z), P3(b.x, b.z)], 2.8, 1.0, { noLamp: true, simple: true, role: 'cross', s, side }) });
    }
  }
  // 뒷골목(W1)·외곽 도로(W2): 그 쪽 첫 가로 골목 끝에서 마지막 가로 골목 끝까지, 코스에서 그 거리인 선(안쪽 모서리는 꺾어 잇는다)
  const rings = [];
  for (const [Wr, nm, hw, wk, extra] of [[W1, '뒷골목', 3.2, 1.4, { noLamp: true, simple: true, role: 'ring1' }], [W2, '외곽 도로', 4.5, 2.0, { kind: 'road', cars: A.ringCars ?? 70, lampStep: 42, lampSides: [1], lampFar: 700, role: 'ring2' }]]) {
    for (const side of [-1, 1]) {
      const cs = crosses.filter((c) => c.side === side).map((c) => c.s);
      if (cs.length < 2) continue;
      const s0 = cs[0], s1 = cs[cs.length - 1];
      const pieces = [];
      let cur = [];
      const ss = [];
      for (let s = s0; s < s1; s += 10) ss.push(s);
      ss.push(s1);
      for (const s of ss) {
        const p = C.xz(s, side * Wr, {});
        if (C.nearest(p.x, p.z).d < Wr - 1.5) continue;
        const last = cur[cur.length - 1];
        if (last && Math.hypot(p.x - last[0], p.z - last[2]) > 60) { if (cur.length > 1) pieces.push(cur); cur = []; }
        cur.push(P3(p.x, p.z));
      }
      if (cur.length > 1) pieces.push(cur);
      pieces.forEach((pts, k) => rings.push(mk(`${nm} ${side > 0 ? '오른쪽' : '왼쪽'}${pieces.length > 1 ? ` ${k + 1}` : ''}`, pts, hw, wk, { ...extra, side })));
    }
  }
  W._buildRoads(false);
  // 광장 바닥은 점유 격자에 도로(2)로(빈 땅이 아님)
  if (plazaLine) for (let s = PZ[0]; s <= PZ[1]; s += 4) for (let u = -PH; u <= PH; u += 4) { const p = C.xz(s, u, {}); W._occMark(p.x, p.z, 2, 0, 2); }
  const segs = new SegGrid(W.lines);
  const rects = new RectGrid(24);
  const roadNear = (x, z, r) => segs.hitsCircle(x, z, r + 0.5);

  // ---------- 2. 옆 탑(S1 규칙 그대로, 개수·종류는 kit) ----------
  W._buildTowers(roadNear);
  for (const t of W.towers) rects.add(rect(t.x, t.z, -t.yaw, t.w / 2, t.d / 2));
  stats.lots.tower = W.towers.length;

  // ---------- 3. 건물 ----------
  const fronts = new Map(); // 선 → 앞면 점 목록(전선 인입선)
  const signList = W.signList;
  const pushSign = (o) => { W._rq('sign'); stats.signReq++; if (signList.length < MAX.sign) { signList.push(o); stats.signs++; } }; // 16차 U7b(1-4): 요청 수를 세고(버퍼 포화 점검) 넘치면 뺀다
  const neonCol = (k) => { const c = NEON_RGB[Math.floor(Math.random() * NEON_RGB.length)]; const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; return [(L + (c[0] - L) * 0.85) * k + 0.05, (L + (c[1] - L) * 0.85) * k + 0.05, (L + (c[2] - L) * 0.85) * k + 0.05]; };
  const boxCol = (k) => [0.58 * k, 0.58 * k, 0.6 * k];
  const sign = (type, x, y, z, yaw, h, wMax, extra = {}) => {
    const k = type === 'panel' || type === 'vbox' ? rand(0.6, 0.72) : rand(0.48, 0.6);
    pushSign({ kind: 'q', type, x, y, z, yaw, h, wMax, pick: randi(0, 999), col: type === 'panel' || type === 'vbox' ? boxCol(k) : neonCol(k), ...extra });
  };
  const local = (R, lx, lz) => ({ x: R.x + lx * R.c - lz * R.s, z: R.z + lx * R.s + lz * R.c });

  // 건물 하나 마무리: 높이(세 띠 상한)·옥상 소품·간판·발사대·점유 격자·바닥 목록
  const finish = (R, info) => {
    const n = C.nearest(R.x, R.z);
    if (n.d > FILL + 20) return false;
    const sC = Math.max(-40, Math.min(C.length + 20, n.s));
    const fl = zoneFl(sC);
    const w = R.hw * 2, d = R.hd * 2;
    const hd = Math.hypot(w, d) / 2;
    const edge = Math.abs(n.u) - hd;
    const ca = W.capAllAt(R.x, R.z, hd); // 16차 U7b: 모든 코스 구간 상한(가장 가까운 점 + 경사·다른 구간)
    const capTop = Math.min(W._capTop(n.s, edge, hd), ca.body);
    const band = !Number.isFinite(capTop) ? 'far' : Math.min(edge, ca.edge) <= CITY.cap.near ? 'near' : 'mid';
    let kind = info.kind, floors, h;
    const gen = info.gen;
    if (gen === 'apts') { floors = randi(12, 20); h = Math.round(floors) * 2.8 + 1.4; }
    else if (gen === 'offices') { floors = randi(8, 14); h = floors * 3.4 + 1.2; }
    else {
      const low = Math.random() < (band === 'near' ? 0.12 : 0.1);
      floors = low ? randi(2, 3) : band === 'near' ? randi(4, 7) : band === 'mid' ? randi(4, 8) : randi(4, 9);
      if (gen === 'tall') floors = randi(6, 10);
      // 16차 U7b(1-2): 길가 앞면 줄은 바로 옆 가게와 2~3층 차이(평평한 지붕 격자가 아니라 들쭉날쭉한 골목 지붕선) — 상한 안의 층수만
      if (info.front && info.prevF) {
        const fMax = Number.isFinite(capTop) ? Math.floor((capTop - 1.0) / 3.3) : 9;
        const hi = Math.min(fMax, 9);
        const c = [info.prevF - 3, info.prevF - 2, info.prevF + 2, info.prevF + 3].filter((f) => f >= 2 && f <= hi);
        if (c.length) floors = c[Math.floor(Math.random() * c.length)];
      }
      h = 1.0 + 3.3 * floors;
    }
    if (Number.isFinite(capTop)) {
      if (kind === 0) h = Math.min(h, Math.floor((capTop - 1.4) / 2.8) * 2.8 + 1.4);
      else h = Math.min(h, capTop);
    }
    if (h < 5) return false;
    const top = h;
    const yaw = -R.a;
    const lit = rand(0.35, 0.8);
    const bi = W._addBuildingWorld(R.x, R.z, yaw, w, d, h, kind, lit, rand(0.85, 1.15));
    if (bi < 0) return false;
    if (kind === 0 && w < 30) W._addBuildingWorld(R.x, R.z, yaw + Math.PI / 2, w, d, h, kind, lit, 1, 0, W.infoAttr.getX(bi));
    const near = band === 'near';
    const pLim = Math.min(near ? W._propTop(n.s, hd) : Infinity, ca.prop);
    const room = pLim - top;
    let propTop = top;
    const prop = (hh) => { propTop = Math.max(propTop, top + hh); };
    const au = Math.abs(n.u);
    const lot = { x: R.x, z: R.z, w, d, h: top, kind, yaw, top, s: n.s, u: n.u, edge, hd, band, gen };
    // 옥상 소품(가까운 쪽만 — 먼 건물은 상자 하나). 16차 U7b(1-2): 가까운 띠는 옥탑방·물탱크·실외기를 더 자주(옥상 소품 비율 ≥ 0.5), 모두 통로 바닥 − 1 아래(room)
    let hasProp = false;
    if (au < 150 && gen !== 'apts') {
      const pRoom = near ? 0.42 : 0.28, pTank = near ? 0.38 : 0.12, pAC = near ? 0.35 : 0;
      if (Math.random() < 0.45 && room >= 0.8) { W._addBuildingWorld(R.x, R.z, yaw, w + 0.25, d + 0.25, 0.8, 3, 0, 1, top); prop(0.8); }
      if (Math.random() < pRoom && room >= 2.9 && w > 6 && d > 6) {
        const q = local(R, rand(-R.hw * 0.3, R.hw * 0.3), rand(-R.hd * 0.3, R.hd * 0.3));
        W._addBuildingWorld(q.x, q.z, yaw, rand(3.5, Math.min(6, w * 0.55)), rand(3, Math.min(5, d * 0.55)), 2.7, 6, rand(0.3, 0.9), 1, top); // 옥탑방
        prop(2.7);
        hasProp = true;
        stats.roofRooms++;
      }
      if (Math.random() < pTank && room >= 2.4) {
        const nT = near && w > 8 && d > 8 && Math.random() < 0.4 ? 2 : 1;
        for (let k = 0; k < nT; k++) {
          const q = local(R, rand(-R.hw * 0.4, R.hw * 0.4), rand(-R.hd * 0.4, R.hd * 0.4));
          const r = rand(0.9, 1.35);
          W._addCylW(q.x, top + 1.2, q.z, r * 2, 2.4, r * 2, 0x56585e); // 16차 U7b: 뚜껑 원통을 빼고 몸통 하나(삼각형 예산)
        }
        prop(2.4);
        hasProp = true;
        stats.roofTanks++;
      }
      if (Math.random() < pAC && room >= 1.2) {
        const nA = randi(3, 6);
        for (let k = 0; k < nA; k++) { const q = local(R, rand(-R.hw * 0.75, R.hw * 0.75), rand(-R.hd * 0.75, R.hd * 0.75)); W._addBuildingWorld(q.x, q.z, yaw, rand(1.1, 1.6), rand(0.7, 1.0), 1.0, 3, 0, 1, top); } // 실외기
        prop(1.0);
        stats.roofAC++;
      }
    }
    // 간판(앞면이 있는 길가 가게, 코스에서 170m 안)
    if (info.front && au < 165 && h > 6) {
      const m = info.m, ns = info.ns;
      const D = [m.dx, m.dz];
      const fx = m.x + ns[0] * info.set, fz = m.z + ns[1] * info.set; // 앞면 가운데(길 쪽 벽)
      const yawF = Math.atan2(-ns[0], -ns[1]);
      const ms = fl.signs;
      if (Math.random() < Math.min(1, 0.8 * ms)) sign(Math.random() < 0.5 ? 'neon' : 'panel', fx - ns[0] * 0.12, 4.05, fz - ns[1] * 0.12, yawF, rand(0.8, 1.05), info.fw * 0.86);
      for (let k = 2; k <= Math.min(floors, 5); k++) {
        const y = 4.2 + (k - 2) * 3.3 + 1.7;
        if (y + 0.8 > top - 0.3) break;
        if (au < 140 && Math.random() < 0.22 * ms) sign(Math.random() < 0.75 ? 'panel' : 'neon', fx - ns[0] * 0.12, y, fz - ns[1] * 0.12, yawF, rand(0.95, 1.35), info.fw * rand(0.55, 0.9));
      }
      const nV = Math.random() < Math.min(0.95, 0.5 * ms) ? (info.fw > 9.5 && Math.random() < 0.35 * ms ? 2 : 1) : 0;
      // 돌출 세로 간판: 앞면 끝에서 길 쪽으로 튀어나옴. 읽히는 면은 다가오는 새 쪽
      const F = C.at(sC, {});
      const Fx = Math.sin(F.th), Fz = -Math.cos(F.th);
      const dn = D[0] * -Fx + D[1] * -Fz >= 0 ? 1 : -1;
      const yawV = Math.atan2(D[0] * dn, D[1] * dn);
      const ends = nV === 2 ? [-1, 1] : [Math.random() < 0.5 ? -1 : 1];
      for (let k = 0; k < nV; k++) {
        const e = ends[k];
        const hv = Math.min(rand(4, 7.5), top - 0.5 - 4.7);
        if (hv < 2.4) break;
        const ax = fx + D[0] * e * (info.fw / 2 - 0.7) - ns[0] * 0.15, az = fz + D[1] * e * (info.fw / 2 - 0.7) - ns[1] * 0.15;
        sign(Math.random() < 0.55 ? 'vert' : 'vbox', ax, 4.7 + hv / 2, az, yawV, hv, 1.7, { ax: -ns[0], az: -ns[1] });
      }
      // 옥상 간판 틀(≤ 5.5m, 통로 바닥 − 1 아래): 다가오는 새 쪽을 본다
      const roofP = info.line && (info.line.role === 'center' || info.line.role === 'plaza' || (info.line.role === 'cross' && au < 110)) ? Math.max(fl.roof, 0.35) : fl.roof * 0.25; // 16차 U7b(1-2): 길가 옥상 간판 틀 최소 0.35
      if (near && room >= 2.4 && Math.random() < roofP) {
        const hs = Math.min(room - 0.7, rand(2.0, 4.2));
        if (hs >= 1.6) {
          const type = Math.random() < 0.5 ? 'neon' : 'panel';
          const pick = randi(0, 999);
          const wMax = Math.min(Math.max(w, d) * 0.92, 10);
          const wE = Math.min(wMax, hs * aspectOf(type, pick));
          const yawR = Math.atan2(-Fx, -Fz);
          const wx = Math.cos(yawR), wz = -Math.sin(yawR); // 판 가로 방향
          const cx = R.x, cz = R.z;
          for (const e of [-1, 1]) W._addBuildingWorld(cx + wx * e * (wE / 2 - 0.15), cz + wz * e * (wE / 2 - 0.15), yawR, 0.16, 0.16, 0.6 + hs, 3, 0, 1, top);
          W._addStructW(cx + Fx * 0.1, top + 0.6 + hs / 2, cz + Fz * 0.1, yawR, wE, hs, 0.1, 0x18191e);
          const k = type === 'panel' ? rand(0.62, 0.72) : rand(0.52, 0.62);
          pushSign({ kind: 'q', type, x: cx - Fx * 0.02, y: top + 0.6 + hs / 2, z: cz - Fz * 0.02, yaw: yawR, h: hs, wMax, pick, col: type === 'panel' ? boxCol(k) : neonCol(k) });
          prop(0.6 + hs);
          stats.roofSigns++;
          hasProp = true;
        }
      }
      if (info.line) {
        let a = fronts.get(info.line);
        if (!a) fronts.set(info.line, (a = []));
        a.push({ t: info.t, side: info.side, x: fx, z: fz, top });
      }
    }
    // 옥상 테라스(군중·전구) — 가까운 띠 낮은 지붕 일부
    if (near && au < 120 && Math.random() < 0.08 && room >= 2) {
      const nP = randi(4, 9);
      for (let k = 0; k < nP; k++) { const q = local(R, rand(-R.hw * 0.7, R.hw * 0.7), rand(-R.hd * 0.7, R.hd * 0.7)); W.crowdSpots.push(q.x, q.z, Math.random()); W.crowdY.push(top); }
      for (let k = 0; k < 4; k++) { const q = local(R, rand(-R.hw * 0.8, R.hw * 0.8), rand(-R.hd * 0.8, R.hd * 0.8)); W._addHalo(q.x, top + 1.9, q.z, 0.55, BULB[k % BULB.length]); }
      prop(1.95);
      stats.terrace++;
    }
    lot.propTop = propTop;
    if (near && gen === 'shops') { stats.nearShops++; if (hasProp) stats.nearProps++; }
    lot.floors = floors;
    W.lots.push(lot);
    W._occMark(R.x, R.z, 3, top, Math.min(w, d) / 2);
    if (kind === 0 && w > 30 && au < 330) { W._rq('sign'); stats.signReq++; if (W.signList.length < MAX.sign) W.signList.push({ x: R.x, z: R.z, yaw, w, d, top, kind: 'dong', n: stats.kinds[0] || 0, size: 8 }); }
    if (Math.random() < (A.launcherKeep ?? 0.3)) W.launchers.push({ x: R.x, y: top + 0.5, z: R.z, kind: 'roof' });
    stats.lots[gen] = (stats.lots[gen] || 0) + 1;
    stats.kinds[kind] = (stats.kinds[kind] || 0) + 1;
    info.outF = floors;
    return true;
  };

  const tryPlace = (x, z, a, hw, hd, info, shrink = 0.72) => {
    for (let k = 0; k < 2; k++) {
      const R = rect(x, z, a, hw, hd);
      if (rects.hits(R)) { stats.rejOverlap++; hw *= shrink; hd *= shrink; continue; }
      if (segs.hitsRect(R)) { stats.rejRoad++; hw *= shrink; hd *= shrink; continue; }
      rects.add(R);
      if (!finish(R, info)) return null;
      return R;
    }
    return null;
  };

  // 3-1. 길 따라 앞면 줄(앞면 = 길 쪽, 1층 가게 유리)
  const rowsAlong = (L, fw, dp, t0 = 0) => {
    const pts = L.pts;
    const acc = polyIndex(pts);
    const tot = acc[acc.length - 1];
    const set = L.half + L.walk + 0.3;
    const m = {};
    for (const side of [-1, 1]) {
      let t = t0 + rand(0, 3);
      let prevF = 0; // 16차 U7b(1-2): 바로 옆(앞) 가게 층수 — 2~3층 차이
      while (t < tot - 2) {
        const f = rand(fw[0], fw[1]);
        polyAtI(pts, acc, t + f / 2, m);
        const nn = C.nearest(m.x, m.z);
        if (nn.s < C.sMin - 10 || nn.s > C.length + 430 || nn.d > FILL) { t += f; continue; }
        const nsx = -m.dz * side, nsz = m.dx * side;
        let dpt = rand(dp[0], dp[1]);
        let placed = false;
        for (let k = 0; k < 2 && !placed; k++, dpt *= 0.7) {
          const cx = m.x + nsx * (set + dpt / 2), cz = m.z + nsz * (set + dpt / 2);
          const R = rect(cx, cz, Math.atan2(m.dz, m.dx), f / 2, dpt / 2);
          if (rects.hits(R)) { stats.rejOverlap++; continue; }
          if (segs.hitsRect(R)) { stats.rejRoad++; continue; }
          rects.add(R);
          const info = { kind: side > 0 ? 4 : 5, gen: 'shops', front: true, line: L, side, t: t + f / 2, m: { ...m }, ns: [nsx, nsz], set, fw: f, prevF };
          const okF = finish(R, info);
          if (okF && prevF) { stats.frontPairs++; const dF = Math.abs(info.outF - prevF); if (dF >= 2 && dF <= 3) stats.frontStep++; }
          prevF = okF ? info.outF : 0;
          placed = true;
        }
        if (!placed) prevF = 0;
        t += placed ? f + rand(0.08, 0.5) : 2.5;
      }
    }
  };
  for (const L of centers) rowsAlong(L, [7, 12.5], [10, 16]);
  if (plazaLine) rowsAlong(plazaLine, [8, 13], [10, 15]);
  for (const c of crosses) rowsAlong(c.L, [7, 12.5], [9, 14], 6);
  for (const L of rings) rowsAlong(L, L.role === 'ring2' ? [10, 17] : [8, 13.5], L.role === 'ring2' ? [12, 18] : [10, 15]);

  // 3-2. 먼 띠(외곽 도로 바깥 ~ 채움 끝): 큰 건물(아파트·업무·높은 상가)
  for (let s = C.sMin - 10; s <= C.length + 440; s += 34) {
    const fr = C.at(s, {});
    const Fx = Math.sin(fr.th), Fz = -Math.cos(fr.th), Rx = Math.cos(fr.th), Rz = Math.sin(fr.th);
    const a = Math.atan2(Fz, Fx);
    for (let u = W2 + 20; u <= FILL + 10; u += 30) {
      for (const side of [-1, 1]) {
        const uu = side * (u + rand(-3, 3)), ss = rand(-4, 4);
        const x = fr.x + Rx * uu + Fx * ss, z = fr.z + Rz * uu + Fz * ss;
        const q = Math.random();
        if (q < 0.42) tryPlace(x, z, a + Math.PI / 2, rand(15, 21), rand(6, 7.5), { kind: 0, gen: 'apts' }); // 판상 아파트(긴 변이 길과 직각 — 코스에서 옆면 창이 보임)
        else if (q < 0.62) tryPlace(x, z, a, rand(9, 13), rand(8, 12), { kind: Math.random() < 0.3 ? 1 : 2, gen: 'offices' });
        else tryPlace(x, z, a, rand(7, 10), rand(7, 10), { kind: 6, gen: 'tall' });
      }
    }
  }
  // 3-3. 블록 안쪽 채움(코스 좌표 격자 13m, 흔들어서) — 앞면 없는 낡은 상가
  for (let s = C.sMin - 10; s <= C.length + 440; s += 13) {
    const fr = C.at(s, {});
    const Fx = Math.sin(fr.th), Fz = -Math.cos(fr.th), Rx = Math.cos(fr.th), Rz = Math.sin(fr.th);
    const a = Math.atan2(Fz, Fx);
    for (let u = -FILL; u <= FILL; u += 13) {
      if (Math.abs(u) < 8) continue;
      const uu = u + rand(-1.5, 1.5), ss = rand(-1.5, 1.5);
      const x = fr.x + Rx * uu + Fx * ss, z = fr.z + Rz * uu + Fz * ss;
      const big = Math.abs(u) > W2 + 10;
      tryPlace(x, z, a, big ? rand(6, 9.5) : rand(4.6, 6.8), big ? rand(6, 9.5) : rand(4.6, 6.8), { kind: 6, gen: 'shops' });
    }
  }

  // ---------- 4. 전봇대·보안등·전선 다발 ----------
  const lc = [lamp.r * 1.8, lamp.g * 1.8, lamp.b * 1.8];
  const wire = (a, b, sag, w) => { if (W._addWire(a, b, sag, w) >= 0) stats.wires++; };
  const poleAt = (x, z, nlx, nlz, side, lampOn) => {
    // 기둥(콘크리트 10.8m) · 가로대(길 건너 방향) · 변압기(25%) · 보안등(길 쪽 1.2m)
    const yawP = -Math.atan2(nlz, nlx);
    W._addBuildingWorld(x, z, yawP, 0.34, 0.34, 10.8, 3, 0, 1, 0);
    W._addBuildingWorld(x, z, yawP, 2.0, 0.14, 0.14, 3, 0, 1, 9.6);
    if (Math.random() < 0.1) W._addCylW(x - nlx * side * 0.45, 8.4, z - nlz * side * 0.45, 0.7, 1.1, 0.7, 0x4a4c52);
    // 16차 U7b(1-1): 가로대 양 끝 애자(작은 차가운 점 빛) — 비행 높이에서 전선 다발이 어디서 시작하는지 보이게
    for (const e of [-1, 1]) if (W._addHalo(x + nlx * e * 0.85, 9.92, z + nlz * e * 0.85, 0.34, [0.36, 0.4, 0.46]) >= 0) stats.insul++;
    if (lampOn) {
      const lx = x - nlx * side * 1.2, lz = z - nlz * side * 1.2;
      W._addGlow(lx, 7.3, lz, 0.45, 0.16, 0.45, lc);
      W._addHalo(lx, 7.3, lz, 2.3, [lamp.r * 0.55, lamp.g * 0.45, lamp.b * 0.32]);
      W._addPool(x - nlx * side * 2.6, 0.2, z - nlz * side * 2.6, 5.2, [lamp.r * 0.16, lamp.g * 0.12, lamp.b * 0.08]);
      if (Math.random() < 0.45) W._addCone(lx, 7.2, lz, 7.1, 3.0, [lamp.r * 0.07, lamp.g * 0.055, lamp.b * 0.035]);
    }
    stats.poles++;
    return { x, z, nlx, nlz, side };
  };
  const top3 = (p) => [[p.x + p.nlx * 0.85, 9.78, p.z + p.nlz * 0.85], [p.x, 9.78, p.z], [p.x - p.nlx * 0.85, 9.78, p.z - p.nlz * 0.85]];
  const span = (p, q, fl) => {
    const L = Math.hypot(p.x - q.x, p.z - q.z);
    const sag = L * 0.02 + rand(0.15, 0.4);
    const A3 = top3(p), B3 = top3(q);
    for (let k = 0; k < 3; k++) wire(A3[k], B3[k], sag + rand(-0.05, 0.08), 0.07); // 16차 U7b(1-1): 굵기 0.035 → 0.07(+ 화면 최소 1.5px)
    const nc = fl.wires >= 1.5 ? randi(3, 4) : randi(1, 2);
    for (let k = 0; k < nc; k++) wire([p.x, 7.0 - k * 0.25, p.z], [q.x, 7.0 - k * 0.25, q.z], sag * 1.4 + rand(0, 0.3), 0.1);
  };
  const drops = (p, L, t, fl) => {
    const F = fronts.get(L);
    if (!F) return;
    const nD = Math.round((fl.wires >= 1.5 ? 2.5 : 1.2) * rand(0.6, 1.4));
    for (let k = 0; k < nD; k++) {
      const c = F[Math.floor(Math.random() * F.length)];
      if (!c || Math.abs(c.t - t) > 16) continue;
      const y = fl.wires >= 1.5 && Math.random() < 0.5 ? c.top - rand(0.5, 2.0) : Math.min(c.top - 1.0, rand(5.5, 8.2)); // 16차 U7b: Wire Lanes 는 절반을 지붕 끝까지(위에서 보이게)
      wire([p.x, rand(6.6, 9.3), p.z], [c.x, y, c.z], rand(0.3, 0.8), 0.045);
    }
  };
  const polesOn = (L, t0, t1, step, bothSides) => {
    const pts = L.pts;
    const acc = polyIndex(pts);
    const m = {};
    const list = [];
    let i = 0;
    for (let t = t0; t <= Math.min(t1, acc[acc.length - 1]); t += step, i++) {
      polyAtI(pts, acc, t, m);
      const nn = C.nearest(m.x, m.z);
      if (nn.s < C.sMin + 5 || nn.s > C.length + 400) continue;
      const fl = zoneFl(nn.s);
      const side = bothSides ? (i % 2 ? 1 : -1) : L.poleSide || 1;
      const nlx = -m.dz, nlz = m.dx;
      const off = L.half + 0.45;
      const p = poleAt(m.x + nlx * side * off, m.z + nlz * side * off, nlx, nlz, side, true);
      p.t = t;
      p.fl = fl;
      list.push(p);
    }
    return list;
  };
  // 중앙 골목: 17m 마다 양쪽 번갈아(같은 쪽은 34m)
  for (const L of centers) {
    const ps = polesOn(L, 0, polyLen(L.pts), 17, true);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (ps[i + 2]) span(p, ps[i + 2], p.fl);
      if (ps[i + 1] && Math.hypot(ps[i + 1].x - p.x, ps[i + 1].z - p.z) < 30) {
        const q = ps[i + 1];
        wire([p.x, 9.0, p.z], [q.x, 8.7, q.z], rand(0.4, 0.7), 0.06); // 길을 건너는 선
        if (p.fl.wires >= 1.5) wire([p.x, 7.2, p.z], [q.x, 7.4, q.z], rand(0.5, 0.9), 0.08);
      }
      if (p.fl.wires >= 1.5 && ps[i + 3] && Math.random() < 0.5) wire([p.x, 8.2, p.z], [ps[i + 3].x, 8.0, ps[i + 3].z], rand(0.8, 1.4), 0.07); // 늘어진 긴 선
      drops(p, L, p.t, p.fl);
    }
  }
  // 16차 U7b(1-1): 지붕 끝 ↔ 맞은편 지붕 끝 전선(골목을 가로질러 지붕 높이로 — 비행 높이에서 골목 틈 위로 보이는 선). Wire Lanes 는 다발(2~3가닥), 그 밖은 드물게
  //   양 끝은 각 건물 지붕 0.4~1.4m 아래(옥상 소품 상한 아래), 처짐 0.4~0.9m
  for (const L of centers) {
    const F = fronts.get(L);
    if (!F) continue;
    const right = F.filter((c) => c.side > 0).sort((a, b) => a.t - b.t);
    for (const c of F) {
      if (c.side > 0) continue;
      const fl = zoneFl(C.nearest(c.x, c.z).s);
      const p = fl.wires >= 1.5 ? 0.85 : 0.18;
      if (Math.random() > p) continue;
      let best = null;
      for (const r of right) { if (Math.abs(r.t - c.t) < 7 && (!best || Math.abs(r.t - c.t) < Math.abs(best.t - c.t))) best = r; }
      if (!best) continue;
      const n = fl.wires >= 1.5 ? randi(2, 3) : 1;
      for (let k = 0; k < n; k++) {
        const ya = c.top - rand(0.4, 1.4), yb = best.top - rand(0.4, 1.4);
        wire([c.x, ya, c.z], [best.x, yb, best.z], rand(0.4, 0.9), k === 0 ? 0.09 : 0.06);
      }
      stats.roofWires = (stats.roofWires || 0) + n;
    }
  }
  // 가로 골목: 한쪽에만 32m 마다(중앙 골목에서 150m 까지), 첫 기둥은 중앙 골목 기둥과 잇는다
  for (const c of crosses) {
    const L = c.L;
    L.poleSide = Math.random() < 0.5 ? -1 : 1;
    const ps = polesOn(L, 12, 150, 32, false);
    for (let i = 0; i < ps.length; i++) {
      if (ps[i + 1]) span(ps[i], ps[i + 1], ps[i].fl);
      drops(ps[i], L, ps[i].t, ps[i].fl);
    }
  }

  // ---------- 5. 야시장 천막·전구 줄·광장 ----------
  const stallLine = (L, t0, t1) => {
    const pts = L.pts;
    const acc = polyIndex(pts);
    const m = {};
    for (let t = t0; t < Math.min(t1, acc[acc.length - 1]); t += 3.1) {
      polyAtI(pts, acc, t, m);
      const nn = C.nearest(m.x, m.z);
      const fl = zoneFl(nn.s);
      if (!fl.stalls || nn.s < 0 || nn.s > C.length + 60) continue;
      const nlx = -m.dz, nlz = m.dx;
      for (const side of [-1, 1]) {
        if (Math.random() > 0.85 * fl.stalls) continue;
        const o = L.half - 1.35;
        const x = m.x + nlx * side * o, z = m.z + nlz * side * o;
        if (W._addStall(x, 0.07, z, Math.atan2(nlx * side, nlz * side), CANOPY[Math.floor(Math.random() * CANOPY.length)]) >= 0) stats.stalls++;
        if (Math.random() < 0.5) W._addHalo(x, 2.0, z, 3.2, [0.16, 0.12, 0.07]);
      }
      // 사람: 천막 사이 가운데(어깨를 맞대고)
      for (let k = 0; k < 3; k++) { const uu = rand(-1.1, 1.1), tt = rand(-1.5, 1.5); W.crowdSpots.push(m.x + nlx * uu + m.dx * tt, m.z + nlz * uu + m.dz * tt, Math.random()); W.crowdY.push(0); }
      // 전구 줄(6m 마다 길을 건넘)
      if (Math.floor(t / 3.1) % 2 === 0) {
        const a = [m.x + nlx * (L.half - 0.3), 4.4, m.z + nlz * (L.half - 0.3)], b = [m.x - nlx * (L.half - 0.3), 4.4, m.z - nlz * (L.half - 0.3)];
        const sag = 0.55;
        wire(a, b, sag, 0.03);
        for (let q = 1; q < 8; q++) { const f = q / 8; W._addHalo(a[0] + (b[0] - a[0]) * f, 4.4 - sag * 4 * f * (1 - f) - 0.1, a[2] + (b[2] - a[2]) * f, 0.6, BULB[(q + Math.floor(t)) % BULB.length]); }
      }
    }
  };
  for (const L of centers) stallLine(L, 0, polyLen(L.pts));
  if (plazaLine) {
    // 광장: 천막 줄 셋(가운데 길을 남기고), 사람·전구
    const pts = plazaLine.pts;
    const acc = polyIndex(pts);
    const m = {};
    const tot = acc[acc.length - 1];
    for (let t = 2; t < tot - 2; t += 3.3) {
      polyAtI(pts, acc, t, m);
      const nlx = -m.dz, nlz = m.dx;
      for (const uu of [-17, -11, -5, 5, 11, 17]) {
        if (Math.random() > 0.8) continue;
        const sd = uu < 0 ? -1 : 1;
        const face = Math.abs(uu) === 11 ? -sd : sd;
        if (W._addStall(m.x + nlx * uu, 0.07, m.z + nlz * uu, Math.atan2(nlx * face, nlz * face), CANOPY[Math.floor(Math.random() * CANOPY.length)]) >= 0) stats.stalls++;
      }
      for (let k = 0; k < 9; k++) { const uu = rand(-PH + 1, PH - 1), tt = rand(-1.6, 1.6); W.crowdSpots.push(m.x + nlx * uu + m.dx * tt, m.z + nlz * uu + m.dz * tt, Math.random()); W.crowdY.push(0); }
      if (Math.floor(t / 3.3) % 3 === 0) {
        const a = [m.x + nlx * PH, 5.0, m.z + nlz * PH], b = [m.x - nlx * PH, 5.0, m.z - nlz * PH];
        wire(a, b, 1.2, 0.03);
        for (let q = 1; q < 16; q++) { const f = q / 16; W._addHalo(a[0] + (b[0] - a[0]) * f, 5.0 - 1.2 * 4 * f * (1 - f) - 0.1, a[2] + (b[2] - a[2]) * f, 0.6, BULB[q % BULB.length]); }
      }
    }
  }
  // 길가 보도 사람(중앙 골목, 가로 골목 앞쪽)
  for (const L of centers) {
    const pts = L.pts;
    const acc = polyIndex(pts);
    const m = {};
    for (let t = 0; t < acc[acc.length - 1]; t += 1.6) {
      polyAtI(pts, acc, t, m);
      const nn = C.nearest(m.x, m.z);
      if (nn.s < -40 || nn.s > C.length + 80) continue;
      const nlx = -m.dz, nlz = m.dx;
      for (const side of [-1, 1]) {
        if (Math.random() > 0.55) continue;
        const o = side * (L.half + rand(0.4, L.walk - 0.2));
        W.crowdSpots.push(m.x + nlx * o, m.z + nlz * o, Math.random());
        W.crowdY.push(0);
      }
    }
  }
  for (const c of crosses) {
    const L = c.L;
    const a = L.pts[0], b = L.pts[1];
    const len = Math.hypot(b[0] - a[0], b[2] - a[2]);
    const dx = (b[0] - a[0]) / len, dz = (b[2] - a[2]) / len;
    for (let t = 8; t < Math.min(70, len); t += 2.2) {
      if (Math.random() > 0.5) continue;
      const o = (Math.random() < 0.5 ? -1 : 1) * rand(0, L.half + 0.6);
      W.crowdSpots.push(a[0] + dx * t - dz * o, a[2] + dz * t + dx * o, Math.random());
      W.crowdY.push(0);
    }
  }
  stats.crowd = W.crowdY.length;

  // ---------- 6. 서치라이트 자리(광장·야시장) ----------
  const sp = (s, u, side) => { const p = C.xz(s, u, {}); return { x: p.x, z: p.z, ph: Math.random() * 6.28, side }; };
  W.alleySearch = [sp(PZ ? (PZ[0] + PZ[1]) / 2 : 2050, -(PH + 14), -1), sp(1700, 70, 1)];
  stats.lines = W.lines.length;
  stats.ms = +((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(1);
  W.alleyStats = stats;
}
