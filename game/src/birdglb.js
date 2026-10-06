// 12차 C-2: 생성 3D 새(GLB) 정렬·점검·뼈대 — 순수 계산(three 없이 Float32Array 만). 게임(models.js)과 점검 스크립트가 같이 쓴다.
// 1) 주성분 분석: 가장 넓게 퍼진 축 = 좌우(날개), 다음 = 앞뒤, 가장 작은 축 = 위아래
// 2) 좌우 대칭면을 x = 0 에(거울 오차가 가장 작은 x 이동)
// 3) 날개마다 |x| > 0.3 × 반날개폭 정점으로 최소제곱 평면 → 두 평면 평균이 수평이 되게 돌림
// 4) 앞 = −Z(부리 쪽은 앞뒤 끝 가운데 폭이 좁은 쪽), 위 = 등(몸 가운데가 날개 평면보다 아래 → 배 쪽이 아래)
// 5) 크기: 몸 앞뒤 길이(부리 끝 ~ 꼬리 밑동)를 코드 새와 같게(BODY_LEN)
// 자동 점검 5항목: 날개 경사(상반각·앞뒤 젖힘) ≤ 15° · 어깨선 단면 앞뒤 길이 ≥ 몸 길이 25% 와 구멍 없음 · 좌우 거울 오차(최대) ≤ 날개폭 8% · 삼각형 ≤ 8천 · GLB ≤ 3MB
export const BODY_LEN = 0.925; // 코드 새(createBirdModel) 부리 끝(z −0.625) ~ 꼬리 밑동(z +0.30)

function jacobi(A) {
  const a = A.map((r) => r.slice());
  const V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let it = 0; it < 60; it++) {
    let p = 0, q = 1, mx = Math.abs(a[0][1]);
    if (Math.abs(a[0][2]) > mx) { mx = Math.abs(a[0][2]); p = 0; q = 2; }
    if (Math.abs(a[1][2]) > mx) { mx = Math.abs(a[1][2]); p = 1; q = 2; }
    if (mx < 1e-12) break;
    const th = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(th), s = Math.sin(th);
    for (let k = 0; k < 3; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
    for (let k = 0; k < 3; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
    for (let k = 0; k < 3; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
  }
  return { val: [a[0][0], a[1][1], a[2][2]], vec: [0, 1, 2].map((i) => [V[0][i], V[1][i], V[2][i]]) };
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// 3×3 행렬(행 = 새 축) × 점
const mul = (M, p) => [dot(M[0], p), dot(M[1], p), dot(M[2], p)];
const rotX = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
const rotZ = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
const mm = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));

// 최소제곱 평면 y = a·x + b·z + c
function planeFit(P, idx) {
  let sxx = 0, sxz = 0, szz = 0, sx = 0, sz = 0, n = 0, sxy = 0, szy = 0, sy = 0;
  for (const i of idx) { const x = P[i * 3], y = P[i * 3 + 1], z = P[i * 3 + 2]; sxx += x * x; sxz += x * z; szz += z * z; sx += x; sz += z; sy += y; sxy += x * y; szy += z * y; n++; }
  const A = [[sxx, sxz, sx], [sxz, szz, sz], [sx, sz, n]], B = [sxy, szy, sy];
  // 3×3 풀기(크라메르)
  const det = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const D = det(A) || 1e-12;
  const col = (k) => A.map((r, i) => r.map((v, j) => (j === k ? B[i] : v)));
  return { a: det(col(0)) / D, b: det(col(1)) / D, c: det(col(2)) / D, n };
}

// pos: Float32Array(n×3) 원본 정점, index: 삼각형 색인. 반환 { M(3×3 회전), t(이동), s(크기), 정렬된 pos, 점검 값 }
export function alignBird(pos, index, opts = {}) {
  const n = pos.length / 3;
  let cx = 0, cy = 0, cz = 0;
  for (let i = 0; i < n; i++) { cx += pos[i * 3]; cy += pos[i * 3 + 1]; cz += pos[i * 3 + 2]; }
  cx /= n; cy /= n; cz /= n;
  const C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < n; i++) {
    const d = [pos[i * 3] - cx, pos[i * 3 + 1] - cy, pos[i * 3 + 2] - cz];
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) C[a][b] += d[a] * d[b];
  }
  const { val, vec } = jacobi(C);
  const ord = [0, 1, 2].sort((a, b) => val[b] - val[a]);
  let ex = vec[ord[0]], ez = vec[ord[1]], ey = cross(ez, ex); // 오른손 좌표: y = z × x
  let M = [ex, ey, ez];
  const P = new Float32Array(n * 3);
  const apply = (M2, shift = [cx, cy, cz]) => { for (let i = 0; i < n; i++) { const q = mul(M2, [pos[i * 3] - shift[0], pos[i * 3 + 1] - shift[1], pos[i * 3 + 2] - shift[2]]); P[i * 3] = q[0]; P[i * 3 + 1] = q[1]; P[i * 3 + 2] = q[2]; } };
  apply(M);
  const ext = () => { let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9]; for (let i = 0; i < n; i++) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], P[i * 3 + k]); mx[k] = Math.max(mx[k], P[i * 3 + k]); } return { mn, mx }; };
  // ② 대칭면: x 이동 sx(거울 정점 → 가장 가까운 정점 평균 거리 최소)
  let E0 = ext();
  const span0 = E0.mx[0] - E0.mn[0];
  const cell = span0 * 0.012;
  const grid = new Map();
  const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (let i = 0; i < n; i++) { const k = key(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]); let a = grid.get(k); if (!a) grid.set(k, (a = [])); a.push(i); }
  const nn = (x, y, z, lim = 4) => {
    let best = Infinity;
    const ix = Math.floor(x / cell), iy = Math.floor(y / cell), iz = Math.floor(z / cell);
    for (let r = 0; r <= lim && best > r * cell; r++) {
      for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let c = -r; c <= r; c++) {
        if (Math.max(Math.abs(a), Math.abs(b), Math.abs(c)) !== r) continue;
        const L = grid.get(`${ix + a},${iy + b},${iz + c}`);
        if (!L) continue;
        for (const j of L) { const d = Math.hypot(P[j * 3] - x, P[j * 3 + 1] - y, P[j * 3 + 2] - z); if (d < best) best = d; }
      }
    }
    return best;
  };
  const sample = [];
  for (let i = 0; i < n; i += Math.max(1, Math.floor(n / 1500))) sample.push(i);
  const mirrorErr = (sx) => { let s = 0, mx = 0, all = []; for (const i of sample) { const d = nn(2 * sx - P[i * 3], P[i * 3 + 1], P[i * 3 + 2]); const dd = Math.min(d, cell * 5); s += dd; all.push(d); } all.sort((a, b) => a - b); return { mean: s / sample.length, max: all[all.length - 1], p99: all[Math.floor(all.length * 0.99)] }; };
  let bestSx = 0, bestE = Infinity;
  for (let sx = -0.04 * span0; sx <= 0.04 * span0 + 1e-9; sx += 0.004 * span0) { const e = mirrorErr(sx).mean; if (e < bestE) { bestE = e; bestSx = sx; } }
  for (let i = 0; i < n; i++) P[i * 3] -= bestSx;
  // ③ 날개 평면 → 두 평면 평균 수평
  const h = span0 / 2;
  const wingIdx = (side) => { const r = []; for (let i = 0; i < n; i++) if (side * P[i * 3] > 0.3 * h) r.push(i); return r; };
  let fr = planeFit(P, wingIdx(1)), fl = planeFit(P, wingIdx(-1));
  const roll = Math.atan((fr.a + fl.a) / 2); // 두 날개 평균 기울기(좌우)
  const pitch = Math.atan((fr.b + fl.b) / 2); // 앞뒤
  const L1 = mm(rotX(pitch), rotZ(-roll));
  for (let i = 0; i < n; i++) { const q = mul(L1, [P[i * 3], P[i * 3 + 1], P[i * 3 + 2]]); P[i * 3] = q[0]; P[i * 3 + 1] = q[1]; P[i * 3 + 2] = q[2]; }
  M = mm(L1, M);
  // ④ 위·앞 방향
  E0 = ext();
  fr = planeFit(P, wingIdx(1));
  fl = planeFit(P, wingIdx(-1));
  let cyBody = 0, nb = 0;
  for (let i = 0; i < n; i++) if (Math.abs(P[i * 3]) < 0.12 * h) { cyBody += P[i * 3 + 1]; nb++; }
  cyBody /= nb || 1;
  const wingY0 = (fr.c + fl.c) / 2;
  let flipY = cyBody > wingY0; // 몸 가운데가 날개 평면보다 위면 뒤집힘(배가 위)
  const L = E0.mx[2] - E0.mn[2];
  const widthAt = (z0, z1) => { let mx = 0; for (let i = 0; i < n; i++) { const z = P[i * 3 + 2]; if (z >= z0 && z <= z1) mx = Math.max(mx, Math.abs(P[i * 3])); } return mx; };
  const wFront = widthAt(E0.mn[2], E0.mn[2] + 0.12 * L), wBack = widthAt(E0.mx[2] - 0.12 * L, E0.mx[2]);
  let headAtMinZ = wFront < wBack;
  // 앞 = −Z: 머리가 +z 면 y 축으로 180° · 위아래 뒤집힘이면 z 축으로 180°(둘 다 회전이라 손잡이 그대로)
  let F = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  if (flipY) F = mm([[-1, 0, 0], [0, -1, 0], [0, 0, 1]], F);
  // flipY 를 z 축 180° 로 했으므로 z 는 그대로
  if (!headAtMinZ) F = mm([[-1, 0, 0], [0, 1, 0], [0, 0, -1]], F);
  for (let i = 0; i < n; i++) { const q = mul(F, [P[i * 3], P[i * 3 + 1], P[i * 3 + 2]]); P[i * 3] = q[0]; P[i * 3 + 1] = q[1]; P[i * 3 + 2] = q[2]; }
  M = mm(F, M);
  // ⑤ 몸 길이(부리 끝 ~ 꼬리 밑동): 가운데 조각(|x| < 0.12h)의 z 칸마다 위아래 두께 → 가장 두꺼운 칸 뒤로 두께가 35% 아래로 떨어지는 곳 = 꼬리 밑동
  E0 = ext();
  const z0 = E0.mn[2], z1 = E0.mx[2];
  const NB = 60;
  const lo = new Float32Array(NB).fill(1e9), hi = new Float32Array(NB).fill(-1e9);
  for (let i = 0; i < n; i++) {
    if (Math.abs(P[i * 3]) > 0.12 * h) continue;
    const k = Math.min(NB - 1, Math.floor(((P[i * 3 + 2] - z0) / (z1 - z0)) * NB));
    lo[k] = Math.min(lo[k], P[i * 3 + 1]); hi[k] = Math.max(hi[k], P[i * 3 + 1]);
  }
  let kMax = 0, tMax = 0;
  for (let k = 0; k < NB; k++) { const t = hi[k] - lo[k]; if (t > tMax && hi[k] > lo[k]) { tMax = t; kMax = k; } }
  let kTail = NB - 1;
  for (let k = kMax; k < NB; k++) if (!(hi[k] > lo[k]) || hi[k] - lo[k] < 0.35 * tMax) { kTail = k; break; }
  let zBeak = 1e9;
  for (let i = 0; i < n; i++) if (Math.abs(P[i * 3]) < 0.1 * h) zBeak = Math.min(zBeak, P[i * 3 + 2]);
  const zTail = z0 + ((kTail + 0.5) / NB) * (z1 - z0);
  const bodyLen = zTail - zBeak;
  const s = (opts.bodyLen || BODY_LEN) / bodyLen;
  // 크기·원점: 원점 = 몸 가운데(부리~꼬리 밑동 중간, 날개 평면 높이)
  const zMid = (zBeak + zTail) / 2;
  const yMid = (planeFit(P, wingIdx(1)).c + planeFit(P, wingIdx(-1)).c) / 2;
  for (let i = 0; i < n; i++) { P[i * 3] *= s; P[i * 3 + 1] = (P[i * 3 + 1] - yMid) * s; P[i * 3 + 2] = (P[i * 3 + 2] - zMid) * s; }
  const chk = checkBird(P, index, sample, opts.bodyLen || BODY_LEN);
  return { M, center: [cx, cy, cz], shiftX: bestSx, scale: s, zMid, yMid, pos: P, span: chk.span, bodyLenRaw: bodyLen, zBeak: (zBeak - zMid) * s, zTail: (zTail - zMid) * s, flipY, headAtMinZ, check: chk.check };
}

// 자동 점검 5항목(이미 정렬된 정점 — 옮기지 않는다)
export function checkBird(P, index, sample = null, bodyL = BODY_LEN) {
  const n = P.length / 3;
  if (!sample) { sample = []; for (let i = 0; i < n; i += Math.max(1, Math.floor(n / 1500))) sample.push(i); }
  const grid = new Map();
  let E0 = { mn: [1e9, 1e9, 1e9], mx: [-1e9, -1e9, -1e9] };
  for (let i = 0; i < n; i++) for (let k = 0; k < 3; k++) { E0.mn[k] = Math.min(E0.mn[k], P[i * 3 + k]); E0.mx[k] = Math.max(E0.mx[k], P[i * 3 + k]); }
  const span = E0.mx[0] - E0.mn[0], hs = span / 2;
  const wr = planeFit(P, (() => { const r = []; for (let i = 0; i < n; i++) if (P[i * 3] > 0.3 * hs) r.push(i); return r; })());
  const wl = planeFit(P, (() => { const r = []; for (let i = 0; i < n; i++) if (P[i * 3] < -0.3 * hs) r.push(i); return r; })());
  const deg = (x) => (Math.atan(x) * 180) / Math.PI;
  const dihedralR = deg(wr.a), dihedralL = deg(-wl.a), sweepR = deg(wr.b), sweepL = deg(wl.b);
  const wingTilt = Math.max(Math.abs(dihedralR), Math.abs(dihedralL), Math.abs(sweepR), Math.abs(sweepL));
  // 거울 오차(정렬 뒤 다시)
  grid.clear();
  const cell2 = span * 0.012;
  const key2 = (x, y, z) => `${Math.floor(x / cell2)},${Math.floor(y / cell2)},${Math.floor(z / cell2)}`;
  for (let i = 0; i < n; i++) { const k = key2(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]); let a = grid.get(k); if (!a) grid.set(k, (a = [])); a.push(i); }
  const nn2 = (x, y, z) => { let best = Infinity; const ix = Math.floor(x / cell2), iy = Math.floor(y / cell2), iz = Math.floor(z / cell2); for (let r = 0; r <= 8 && best > r * cell2; r++) { for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let c = -r; c <= r; c++) { if (Math.max(Math.abs(a), Math.abs(b), Math.abs(c)) !== r) continue; const Lx = grid.get(`${ix + a},${iy + b},${iz + c}`); if (!Lx) continue; for (const j of Lx) { const d = Math.hypot(P[j * 3] - x, P[j * 3 + 1] - y, P[j * 3 + 2] - z); if (d < best) best = d; } } } return best; };
  const md = [];
  for (const i of sample) md.push(nn2(-P[i * 3], P[i * 3 + 1], P[i * 3 + 2]));
  md.sort((a, b) => a - b);
  const mirrorMax = md[md.length - 1] / span, mirrorP99 = md[Math.floor(md.length * 0.99)] / span;
  // 어깨선 단면: |x| ≈ 몸 반폭(0.17 × 반날개폭) 조각의 앞뒤 길이 / 몸 길이, 앞뒤 빈틈(구멍)
  const xs = 0.17 * hs;
  const zsec = [];
  for (let i = 0; i < n; i++) if (Math.abs(Math.abs(P[i * 3]) - xs) < 0.02 * hs) zsec.push(P[i * 3 + 2]);
  zsec.sort((a, b) => a - b);
  const secLen = zsec.length ? zsec[zsec.length - 1] - zsec[0] : 0;
  let secGap = 0;
  for (let i = 1; i < zsec.length; i++) secGap = Math.max(secGap, zsec[i] - zsec[i - 1]);
  const tris = index ? index.length / 3 : n / 3;
  return {
    span,
    check: {
      wingTiltDeg: +wingTilt.toFixed(1), dihedralR: +dihedralR.toFixed(1), dihedralL: +dihedralL.toFixed(1), sweepR: +sweepR.toFixed(1), sweepL: +sweepL.toFixed(1),
      shoulderLenRatio: +(secLen / bodyL).toFixed(3), shoulderGapRatio: +(secGap / bodyL).toFixed(3), mirrorMaxRatio: +mirrorMax.toFixed(3), mirrorP99Ratio: +mirrorP99.toFixed(3), tris,
    },
  };
}

// 뼈 가중치(정렬된 정점): 몸 · 어깨 R/L · 팔꿈치 R/L · 꼬리 · 다리(숨김). 반환 { skinIndex(Uint16 n×4), skinWeight(Float32 n×4), bones: {...위치} }
// 어깨 = smoothstep(xs − 0.02, xs + 0.05, |x|), 팔꿈치 = 같은 식을 날개 길이 45% 에서(정규 단위 = 몸 길이 0.925 기준)
export const BONE = { body: 0, shoulderR: 1, elbowR: 2, shoulderL: 3, elbowL: 4, tail: 5, legs: 6 };
export function birdWeights(P, info, opts = {}) {
  const n = P.length / 3;
  const hs = info.span / 2;
  const xs = 0.17 * hs, xe = xs + 0.45 * (hs - xs);
  const zt = info.zTail;
  const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  // 다리: 몸 아래로 튀어나온 가는 정점(가운데 |x| < 0.12h, 몸 앞뒤 사이, 같은 z 칸 몸 아랫면보다 0.06 아래)
  const legs = new Uint8Array(n);
  if (opts.hideLegs) {
    const NB = 40, z0 = info.zBeak, z1 = info.zTail;
    const ys = Array.from({ length: NB }, () => []);
    for (let i = 0; i < n; i++) { const x = P[i * 3], z = P[i * 3 + 2]; if (Math.abs(x) > 0.12 * hs || z < z0 || z > z1) continue; ys[Math.min(NB - 1, Math.floor(((z - z0) / (z1 - z0)) * NB))].push(P[i * 3 + 1]); }
    const belly = ys.map((a) => { a.sort((p, q) => p - q); return a.length ? a[Math.floor(a.length * 0.35)] : 0; });
    for (let i = 0; i < n; i++) {
      const x = P[i * 3], y = P[i * 3 + 1], z = P[i * 3 + 2];
      if (Math.abs(x) > 0.12 * hs || z < z0 || z > z1) continue;
      const k = Math.min(NB - 1, Math.floor(((z - z0) / (z1 - z0)) * NB));
      if (y < belly[k] - opts.legDrop) legs[i] = 1;
    }
  }
  let nLeg = 0;
  for (let i = 0; i < n; i++) {
    const x = P[i * 3], z = P[i * 3 + 2], ax = Math.abs(x);
    const o = i * 4;
    if (legs[i]) { si[o] = BONE.legs; sw[o] = 1; nLeg++; continue; }
    const wS = sm(xs - 0.02, xs + 0.05, ax), wE = sm(xe - 0.02, xe + 0.05, ax);
    const wT = (1 - wS) * sm(zt - 0.02, zt + 0.08, z);
    const R = x > 0;
    si[o] = BONE.body; sw[o] = Math.max(0, 1 - wS - wT);
    si[o + 1] = R ? BONE.shoulderR : BONE.shoulderL; sw[o + 1] = wS - wE;
    si[o + 2] = R ? BONE.elbowR : BONE.elbowL; sw[o + 2] = wE;
    si[o + 3] = BONE.tail; sw[o + 3] = wT;
  }
  return { si, sw, xs, xe, zt, nLeg };
}

// ---------- 처리: 정렬 → 좌우 반쪽 거울(대칭) → 늘어진 다리 걷기 → 상반각 펴기 → 퇴화 삼각형 빼기 ----------
// geo: { pos, nrm, uv, index }(원본). opts: { keep: −1(왼쪽 반 유지), legCut(정렬·크기 맞춘 높이 y, 이보다 아래 가운데 정점 = 다리), dihedral: true }
// 반환: { pos, nrm, uv, index, info(alignBird), raw(정렬 직후 점검), check(처리 뒤 점검), notes }
export function processBird(geo, opts = {}) {
  const info = alignBird(geo.pos, geo.index, opts);
  const raw = info.check;
  const n0 = geo.pos.length / 3;
  const M = info.M;
  let P = Array.from(info.pos);
  let N = new Array(n0 * 3);
  for (let i = 0; i < n0; i++) { const q = mul(M, [geo.nrm[i * 3], geo.nrm[i * 3 + 1], geo.nrm[i * 3 + 2]]); N[i * 3] = q[0]; N[i * 3 + 1] = q[1]; N[i * 3 + 2] = q[2]; }
  let U = Array.from(geo.uv);
  let I = Array.from(geo.index);
  const notes = [];
  // ① 좌우 반쪽 거울: keep 쪽만 x = 0 에서 잘라 남기고 반대쪽으로 거울 복사(위치·법선 x 반전, 감김 반대)
  const keep = opts.keep ?? -1;
  {
    const nP = [], nN = [], nU = [], nI = [];
    const map = new Map();
    const addV = (k) => { if (map.has(k)) return map.get(k); const j = nP.length / 3; nP.push(P[k * 3], P[k * 3 + 1], P[k * 3 + 2]); nN.push(N[k * 3], N[k * 3 + 1], N[k * 3 + 2]); nU.push(U[k * 2], U[k * 2 + 1]); map.set(k, j); return j; };
    const addCut = (a, b) => {
      const xa = P[a * 3], xb = P[b * 3];
      const t = xa / (xa - xb);
      const j = nP.length / 3;
      nP.push(0, P[a * 3 + 1] + (P[b * 3 + 1] - P[a * 3 + 1]) * t, P[a * 3 + 2] + (P[b * 3 + 2] - P[a * 3 + 2]) * t);
      const ny = N[a * 3 + 1] + (N[b * 3 + 1] - N[a * 3 + 1]) * t, nz = N[a * 3 + 2] + (N[b * 3 + 2] - N[a * 3 + 2]) * t;
      const L = Math.hypot(ny, nz) || 1;
      nN.push(0, ny / L, nz / L);
      nU.push(U[a * 2] + (U[b * 2] - U[a * 2]) * t, U[a * 2 + 1] + (U[b * 2 + 1] - U[a * 2 + 1]) * t);
      return j;
    };
    const inside = (k) => keep * P[k * 3] >= -1e-6;
    for (let f = 0; f < I.length; f += 3) {
      const t = [I[f], I[f + 1], I[f + 2]];
      const ins = t.map(inside);
      const ni = ins.filter(Boolean).length;
      if (ni === 3) { nI.push(addV(t[0]), addV(t[1]), addV(t[2])); continue; }
      if (ni === 0) continue;
      const poly = [];
      for (let q = 0; q < 3; q++) {
        const a = t[q], b = t[(q + 1) % 3];
        if (ins[q]) poly.push(addV(a));
        if (ins[q] !== ins[(q + 1) % 3]) poly.push(addCut(a, b));
      }
      for (let q = 1; q + 1 < poly.length; q++) nI.push(poly[0], poly[q], poly[q + 1]);
    }
    for (let j = 0; j < nP.length / 3; j++) if (Math.abs(nP[j * 3]) < 1e-4) { nP[j * 3] = 0; const ny = nN[j * 3 + 1], nz = nN[j * 3 + 2], L = Math.hypot(ny, nz) || 1; nN[j * 3] = 0; nN[j * 3 + 1] = ny / L; nN[j * 3 + 2] = nz / L; }
    const nv = nP.length / 3, ni = nI.length;
    for (let j = 0; j < nv; j++) { nP.push(-nP[j * 3], nP[j * 3 + 1], nP[j * 3 + 2]); nN.push(-nN[j * 3], nN[j * 3 + 1], nN[j * 3 + 2]); nU.push(nU[j * 2], nU[j * 2 + 1]); }
    for (let f = 0; f < ni; f += 3) nI.push(nI[f] + nv, nI[f + 2] + nv, nI[f + 1] + nv);
    P = nP; N = nN; U = nU; I = nI;
    notes.push((keep < 0 ? '왼쪽' : '오른쪽') + ' 반쪽을 x=0 에서 잘라 거울 복사(좌우 대칭)');
  }
  let hs = 0;
  for (let j = 0; j < P.length / 3; j++) hs = Math.max(hs, Math.abs(P[j * 3]));
  // ② 늘어진 다리: 가운데(|x| < 0.25h)·legCut 아래 정점이 든 삼각형을 뺀다(발가락까지)
  if (opts.legCut !== undefined) {
    const nv = P.length / 3;
    const leg = new Uint8Array(nv);
    let nl = 0;
    for (let j = 0; j < nv; j++) if (Math.abs(P[j * 3]) < 0.25 * hs && P[j * 3 + 1] < opts.legCut) { leg[j] = 1; nl++; }
    const nI = [];
    let cut = 0;
    for (let f = 0; f < I.length; f += 3) { if (leg[I[f]] || leg[I[f + 1]] || leg[I[f + 2]]) { cut++; continue; } nI.push(I[f], I[f + 1], I[f + 2]); }
    I = nI;
    notes.push('다리 걷기: y < ' + opts.legCut + ' 가운데 정점 ' + nl + '개, 삼각형 ' + cut + '개 뺌');
  }
  // ③ 상반각 펴기: 날개마다 |x| > 0.3h 평면 기울기를 어깨선(|x| = 0.17h) 바깥에서 0 으로(어깨 가중치만큼 z 축 둘레로)
  if (opts.dihedral !== false) {
    const nv = P.length / 3;
    const xs = 0.17 * hs;
    const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    for (const side of [1, -1]) {
      const idx = [];
      for (let j = 0; j < nv; j++) if (side * P[j * 3] > 0.3 * hs) idx.push(j);
      const fit = planeFit(P, idx);
      const ang = Math.atan(side * fit.a); // 위로 꺾이면 +
      if (Math.abs(ang) < Math.PI / 180) continue;
      for (let j = 0; j < nv; j++) {
        const x = P[j * 3];
        if (side * x <= 0) continue;
        const w = sm(xs - 0.03, xs + 0.12, side * x);
        if (w <= 0) continue;
        const th = -side * ang * w;
        const dx = x - side * xs, y = P[j * 3 + 1];
        const cs = Math.cos(th), sn = Math.sin(th);
        P[j * 3] = side * xs + dx * cs - y * sn;
        P[j * 3 + 1] = dx * sn + y * cs;
        const nx = N[j * 3], ny = N[j * 3 + 1];
        N[j * 3] = nx * cs - ny * sn;
        N[j * 3 + 1] = nx * sn + ny * cs;
      }
      notes.push((side > 0 ? '오른' : '왼') + '쪽 날개 상반각 ' + ((ang * 180) / Math.PI).toFixed(1) + '° → 0°');
    }
  }
  // ④ 퇴화 삼각형 빼기 · 안 쓰는 정점 정리
  {
    const nI = [];
    for (let f = 0; f < I.length; f += 3) {
      const a = I[f], b = I[f + 1], cc = I[f + 2];
      const ab = [P[b * 3] - P[a * 3], P[b * 3 + 1] - P[a * 3 + 1], P[b * 3 + 2] - P[a * 3 + 2]];
      const ac = [P[cc * 3] - P[a * 3], P[cc * 3 + 1] - P[a * 3 + 1], P[cc * 3 + 2] - P[a * 3 + 2]];
      const cr = cross(ab, ac);
      if (Math.hypot(cr[0], cr[1], cr[2]) < 1e-9) continue;
      nI.push(a, b, cc);
    }
    const used = new Int32Array(P.length / 3).fill(-1);
    const rP = [], rN = [], rU = [];
    for (const v of nI) if (used[v] < 0) { used[v] = rP.length / 3; rP.push(P[v * 3], P[v * 3 + 1], P[v * 3 + 2]); rN.push(N[v * 3], N[v * 3 + 1], N[v * 3 + 2]); rU.push(U[v * 2], U[v * 2 + 1]); }
    I = nI.map((v) => used[v]);
    P = rP; N = rN; U = rU;
  }
  // ⑤ 삼각형 상한(opts.maxTris, 8천): 가장 짧은 변부터 두 끝점을 가운데로 합친다(한 번에 끝점마다 한 번)
  if (opts.maxTris && I.length / 3 > opts.maxTris) {
    const t0 = I.length / 3;
    for (let pass = 0; pass < 20 && I.length / 3 > opts.maxTris; pass++) {
      const nv = P.length / 3;
      const seen = new Set();
      const edges = [];
      for (let f = 0; f < I.length; f += 3) for (let q = 0; q < 3; q++) { const a = I[f + q], b = I[f + ((q + 1) % 3)]; const k = a < b ? a * nv + b : b * nv + a; if (seen.has(k)) continue; seen.add(k); edges.push([Math.hypot(P[a * 3] - P[b * 3], P[a * 3 + 1] - P[b * 3 + 1], P[a * 3 + 2] - P[b * 3 + 2]), a, b]); }
      edges.sort((x, y) => x[0] - y[0]);
      const need = Math.ceil((I.length / 3 - opts.maxTris) / 2) + 2;
      const lock = new Uint8Array(nv), to = new Int32Array(nv).map((_, i) => i);
      let done = 0;
      for (const [, a, b] of edges) {
        if (done >= need) break;
        if (lock[a] || lock[b] || Math.abs(P[a * 3]) < 1e-6 !== Math.abs(P[b * 3]) < 1e-6) continue; // 가운데 이음선은 따로 두지 않게
        lock[a] = lock[b] = 1;
        for (let q = 0; q < 3; q++) { P[a * 3 + q] = (P[a * 3 + q] + P[b * 3 + q]) / 2; N[a * 3 + q] = (N[a * 3 + q] + N[b * 3 + q]) / 2; }
        to[b] = a;
        done++;
      }
      const nI = [];
      for (let f = 0; f < I.length; f += 3) { const a = to[I[f]], b = to[I[f + 1]], c2 = to[I[f + 2]]; if (a === b || b === c2 || a === c2) continue; nI.push(a, b, c2); }
      I = nI;
    }
    // 거울 대칭 유지: 반쪽을 줄였으면 위에서 이미 양쪽이 같이 줄어든다(같은 길이 변) — 대칭 오차는 점검에서 다시 잰다
    notes.push('삼각형 ' + t0 + ' → ' + I.length / 3 + '(짧은 변 합치기)');
  }
  const out = { pos: new Float32Array(P), nrm: new Float32Array(N), uv: new Float32Array(U), index: new Uint32Array(I) };
  const chk = checkBird(out.pos, out.index);
  return { ...out, info, raw, check: chk.check, span: chk.span, notes };
}
