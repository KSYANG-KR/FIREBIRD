// 16차 U10: S5 Riverside Festival(강변 불꽃축제) 월드 생성기 — world.js build() 가 S5(kit.style 'riverside')에서 부른다.
// 1차 테마: 강변 불꽃축제. S1 의 「강 2개 틀」(지류 = 첫 직선 아래 · 본류 = 마지막 직선을 왼쪽으로 40m 옮긴 선, world._layout)을 그대로 쓰고
//   그 위에 축제 배치를 새로 놓는다(S1 과 이름 가린 시트에서 구별되게 — 둔치 공원 · 바지선 · 축제 군중).
// 생성기(그리기 호출 늘지 않음 — 건물·구조물·빛 인스턴스, 천막·등 줄은 S2 천막·전선 메시)
//   roads   : 지류 양쪽·본류 양쪽 강변도로, 다리 C(지류, s 470)·D(본류, s 2050) 거리, 북쪽 강변 대로, 단지 사이 길
//   bridges : 트러스 다리 C·D(world._buildBridges — S1 다리 A·B 와 같은 모양, 이름표 bridgeC·bridgeD)
//   parks   : 둔치 공원(River Mouth 양쪽 둔치 마당 · Embankment Parks) — 잔디 판·나무 무리·산책로 등·축제 천막 줄·등 줄·군중
//   apts    : 강변 아파트(판상형·탑상형, 동 번호) · 상가 · 먼 띠 고층 — 가까운 띠 지붕 ≤ 중심 − 12.5, 소품 ≤ 바닥 − 1
//   barges  : 바지선 발사대(지류 River Mouth · 본류 Barge Finale 두 줄) — 갑판 등·발사 틀·수면 반사
//   crowd   : 축제 군중(지류 둔치 · 공원 잔디 · 본류 둔치) — 5,000명(모바일 × 0.4)
// 빛 색: 축제 등은 따뜻한 등 색(0xffd6a0 쪽, 색상 약 35°)과 차가운 색(청록·보라·초록·흰)만. 붉은 주황(345°~25°)은 위험 전용이라 쓰지 않는다.
// 원경 전파탑 없음, 실존 랜드마크·상호 없음. 난수는 Math.random(점검 하네스가 씨앗 난수로 바꿔 끼움).
import { CITY, ELLIPSE } from './config.js';
import { rect, RectGrid, SegGrid } from './alley.js';

const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
// 등 줄 전구 색(따뜻한 등 · 청록 · 보라 · 초록 · 흰) — 붉은 주황 없음
const BULB = [[0.62, 0.5, 0.34], [0.3, 0.55, 0.66], [0.46, 0.3, 0.66], [0.34, 0.62, 0.36], [0.6, 0.56, 0.48]];
// 축제 천막 색(파랑·남색·보라·초록·청록·흰)
const CANOPY = [[0.08, 0.22, 0.42], [0.1, 0.12, 0.3], [0.26, 0.12, 0.38], [0.08, 0.3, 0.16], [0.06, 0.3, 0.3], [0.42, 0.44, 0.46]];
const LAWN = [0x16261a, 0x18291c, 0x142318];

export function buildRiverside(W, MAX) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const C = W.course;
  const KR = (W.kit && W.kit.riverside) || {};
  const FILL = KR.fill ?? CITY.fill;
  const stats = { lots: {}, kinds: {}, parks: 0, lawn: 0, parkTrees: 0, parkLamps: 0, stalls: 0, strings: 0, barges: { trib: 0, main: 0 }, crowd: { trib: 0, park: 0, main: 0 }, rejOverlap: 0, rejRoad: 0 };
  W.crowdY = [];
  W.infra = [];
  W.extraTrees = [];
  W.towers = [];
  const T = W.trib, M = W.main;
  const K = CITY;
  const lampC = W.stage.city.lampColor;
  const lamp = [((lampC >> 16) & 255) / 255, ((lampC >> 8) & 255) / 255, (lampC & 255) / 255];
  const gy = (x, z) => Math.max(0, W.terrainY(x, z));

  // ---------- 0. 강둑 띠(축대 → 둔치 → 강변도로 자리 → 땅) — S1 과 같은 단면 ----------
  W._buildRibbons();

  // ---------- 1. 길 ----------
  const Tx = K.trib.x;
  const roadOff = 22.5;
  const xW = Tx - T.hw - roadOff, xE = Tx + T.hw + roadOff;
  const uN = M.hw + roadOff, uS = -(M.hw + roadOff);
  const uAve = 330; // 북쪽 강변 대로(본류 가운데에서 330m)
  const far = K.roadFar;
  const y = (x, z) => gy(x, z) + 0.05;
  const P3 = (x, z, yy = null) => [x, yy === null ? y(x, z) : yy, z];
  const o0 = M.path.segs[0];
  const atU = (u, x) => W._mainXZ((x - o0.x - M.rx * u) / M.fx, u); // 본류 좌표 u 선 위에서 세계 x 인 점
  const jW = atU(uN, xW), jE = atU(uN, xE);
  const mk = (name, pts, half, walk, extra = {}) => { const L = W._addLine(name, pts, half, extra.kind || 'road', walk); Object.assign(L, extra); return L; };
  mk('지류 서쪽 강변도로', [P3(xW, K.trib.zTop), P3(jW.x, jW.z)], 6.5, 2.5);
  mk('지류 동쪽 강변도로', [P3(xE, K.trib.zTop), P3(jE.x, jE.z)], 6.5, 2.5);
  {
    const a = W._mainXZ(0, uN), b = W._mainXZ(M.path.sMax, uN);
    mk('본류 도심쪽 강변도로(서)', [P3(a.x, a.z), P3(jW.x, jW.z)], 6.5, 2.5);
    mk('본류 도심쪽 강변도로(동)', [P3(jE.x, jE.z), P3(b.x, b.z)], 6.5, 2.5);
    const c = W._mainXZ(0, uS), d = W._mainXZ(M.path.sMax, uS);
    mk('본류 건너편 강변도로', [P3(c.x, c.z), P3(d.x, d.z)], 6.5, 2.5);
  }
  // 북쪽 강변 대로(본류 u = 330): 서쪽 조각은 본류 서쪽 끝(안개 너머) → 지류 서쪽 강변도로, 동쪽 조각은 지류 동쪽 강변도로 → 본류 동쪽 끝
  const aveW = atU(uAve, xW), aveE = atU(uAve, xE);
  {
    const a = W._mainXZ(0, uAve), b = W._mainXZ(M.path.sMax, uAve);
    mk('북쪽 강변 대로(서)', [P3(a.x, a.z), P3(aveW.x, aveW.z)], 10.6, 4.2, { kind: 'avenue', cars: 90, lampStep: 34 });
    mk('북쪽 강변 대로(동)', [P3(aveE.x, aveE.z), P3(b.x, b.z)], 10.6, 4.2, { kind: 'avenue', cars: 110, lampStep: 34 });
  }
  // 다리 C(지류, s 470) + 양쪽 경사로 + 동서 거리(1.8km 밖까지) — S1 다리 A 와 같은 모양
  {
    const ps = C.xz(C.bridges[0].s, 0, {});
    const z = ps.z;
    const top = C.bridges[0].underside + 1.2;
    const xa = Tx - T.hw - 15, xb = Tx + T.hw + 15;
    const ramp = top / K.rampGrade;
    W.bridgeA = { z, xa, xb, top, ramp, perchZ: z + 6.6, perchY: top + 8.5 + 0.42 + 0.09 };
    mk('다리 C 와 동서 거리', [P3(-far - 500, z), P3(xa - ramp, z), [xa, top, z], [xb, top, z], P3(xb + ramp, z), P3(far + Tx + 400, z)], 7, 2.5, { kind: 'bridge' });
  }
  // 다리 D(본류, s 2050) + 경사로: 도심(북) 쪽은 북쪽 강변 대로에 붙고, 건너편은 1.5km 밖까지
  {
    const ps = C.xz(C.bridges[1].s, 0, {});
    const sB = W._mainUV(ps.x, ps.z).s;
    const top = C.bridges[1].underside + 1.2;
    const ua = -(M.hw + 15), ub = M.hw + 15;
    const ramp = top / 0.12, rampS = top / K.rampGrade;
    const A = W._mainXZ(sB, ub + ramp), J = W._mainXZ(sB, uAve);
    const a = W._mainXZ(sB, ua), b = W._mainXZ(sB, ub), S = W._mainXZ(sB, ua - rampS), SF = W._mainXZ(sB, -far - 200);
    W.bridgeB = { s: sB, ua, ub, top, ramp, rampS };
    mk('다리 D 와 남북 거리', [P3(J.x, J.z), P3(A.x, A.z), [b.x, top, b.z], [a.x, top, a.z], P3(S.x, S.z), P3(SF.x, SF.z)], 7, 2.5, { kind: 'bridge' });
  }
  // 단지 사이 길(본류 도심쪽 강변도로 ↔ 북쪽 강변 대로, 본류를 따라 150~190m 마다) — 지류 근처·다리 D 근처는 뺀다
  {
    const sJW = W._mainUV(jW.x, jW.z).s, sJE = W._mainUV(jE.x, jE.z).s, sD = W.bridgeB.s;
    for (let s = 120; s < M.path.sMax - 60; s += rand(150, 190)) {
      if (s > sJW - 60 && s < sJE + 60) continue;
      if (Math.abs(s - sD) < 60) continue;
      const a = W._mainXZ(s, uN), b = W._mainXZ(s, uAve);
      mk(`단지 길 s${Math.round(s)}`, [P3(a.x, a.z), P3(b.x, b.z)], 5.0, 2.2, { kind: 'road', cars: 10, lampStep: 40, simple: true, noCone: true });
    }
    // 지류 양쪽 안쪽 길(지류에서 170m, 지류를 따라 북쪽 끝 → 북쪽 강변 대로)
    for (const [x, nm] of [[xE + 160, '지류 동쪽 안길'], [xW - 160, '지류 서쪽 안길']]) {
      const e = atU(uAve, x);
      mk(nm, [P3(x, K.trib.zTop), P3(e.x, e.z)], 5.5, 2.5, { kind: 'road', cars: 30, lampStep: 40, simple: true, noCone: true });
    }
  }
  W._buildRoads(false);
  const segs = new SegGrid(W.lines);
  const rects = new RectGrid(24);
  const roadNear = (x, z, r) => segs.hitsCircle(x, z, r + 0.5);

  // ---------- 2. 둔치 공원 ----------
  // 공원 땅: (가) River Mouth 지류 양쪽 마당(강변도로 바깥 12~140m, 코스 s −150~600) (나) Embankment Parks(코스 s 600~1330, 코스에서 130m 안) — 물·강둑(36m) 밖
  const parkAt = (x, z) => {
    if (W.bankDist(x, z) < 36) return false;
    const nn = C.nearest(x, z);
    if (nn.s > 600 && nn.s < 1330 && nn.d < 95) return true;
    if (nn.s > -150 && nn.s < 600 && ((x > xE + 12 && x < xE + 62) || (x < xW - 12 && x > xW - 62))) return true;
    return false;
  };
  const PG = 24; // 잔디 판 칸
  let gx0 = Infinity, gx1 = -Infinity, gz0 = Infinity, gz1 = -Infinity;
  for (let s = -200; s <= 1400; s += 10) { const p = C.xz(s, 0, {}); gx0 = Math.min(gx0, p.x); gx1 = Math.max(gx1, p.x); gz0 = Math.min(gz0, p.z); gz1 = Math.max(gz1, p.z); }
  gx0 -= 300; gx1 += 300; gz0 -= 200; gz1 += 200;
  const parkCells = [];
  W._tag = 'park';
  for (let gx = Math.floor(gx0 / PG) * PG; gx < gx1; gx += PG) {
    for (let gz = Math.floor(gz0 / PG) * PG; gz < gz1; gz += PG) {
      const x = gx + PG / 2, z = gz + PG / 2;
      if (!parkAt(x, z) || roadNear(x, z, PG * 0.5)) continue;
      parkCells.push([x, z]);
      const yy = gy(x, z);
      W._addStructW(x, yy + 0.06, z, 0, PG - 0.6, 0.12, PG - 0.6, LAWN[randi(0, LAWN.length - 1)]);
      W._occMark(x, z, 4, 0, PG / 2 - 1);
      rects.add(rect(x, z, 0, PG / 2, PG / 2));
      stats.lawn++;
    }
  }
  stats.parks = parkCells.length;
  // 나무 무리(공원 칸 40% 에 2~4그루) · 산책로 등(칸 30%: 기둥 + 등 + 빛무리 + 바닥 빛) · 군중(잔디 위 앉은·선 사람)
  const people = (x, z, n, r) => { for (let k = 0; k < n; k++) { const a = rand(0, 6.283), rr = Math.sqrt(Math.random()) * r; const px = x + Math.cos(a) * rr, pz = z + Math.sin(a) * rr; W.crowdSpots.push(px, pz, Math.random()); W.crowdY.push(gy(px, pz) - W.crowdGroundY); } };
  for (const [x, z] of parkCells) {
    const yy = gy(x, z);
    const q = Math.random();
    if (q < 0.4) {
      const nT = randi(2, 4);
      for (let k = 0; k < nT; k++) { W.extraTrees.push([x + rand(-9, 9), yy + 0.15, z + rand(-9, 9), rand(0.8, 1.15)]); stats.parkTrees++; }
    } else if (q < 0.7) {
      W._addBuildingWorld(x, z, 0, 0.18, 0.18, 4.2, 3, 0, 1, yy);
      W._addGlow(x, yy + 4.3, z, 0.42, 0.24, 0.42, [lamp[0] * 1.5, lamp[1] * 1.5, lamp[2] * 1.5]);
      W._addHalo(x, yy + 4.3, z, 2.2, [lamp[0] * 0.38, lamp[1] * 0.32, lamp[2] * 0.24]);
      W._addPool(x, yy + 0.2, z, 6, [lamp[0] * 0.13, lamp[1] * 0.11, lamp[2] * 0.08]);
      stats.parkLamps++;
      people(x, z, randi(8, 16), 10);
    } else {
      people(x, z, randi(14, 26), 10);
      // 돗자리 빛(앉은 사람들 손전등·등) — 바닥 빛
      W._addPool(x + rand(-5, 5), yy + 0.2, z + rand(-5, 5), 3.5, [0.08, 0.07, 0.05]);
    }
  }
  // 축제 천막 줄 + 등 줄: 공원 칸 가운데를 지나는 줄(공원 칸 3칸 넘게 이어진 곳) — 공원 칸 행마다 하나 걸러
  {
    const byRow = new Map();
    for (const c of parkCells) { const k = Math.round(c[1] / PG); if (!byRow.has(k)) byRow.set(k, []); byRow.get(k).push(c); }
    let ri = 0;
    for (const [, row] of [...byRow.entries()].sort((a, b) => a[0] - b[0])) {
      if (ri++ % 2) continue;
      row.sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < row.length; i++) {
        const c = row[i];
        // 천막 2~4개(칸 가운데 줄 양쪽)
        if (Math.random() < 0.55) {
          const yy = gy(c[0], c[1]);
          for (let k = 0; k < randi(2, 4); k++) {
            const side = k % 2 ? 1 : -1;
            if (W._addStall(c[0] + rand(-8, 8), yy + 0.07, c[1] + side * 4.5, side > 0 ? Math.PI : 0, CANOPY[randi(0, CANOPY.length - 1)]) >= 0) stats.stalls++;
          }
          people(c[0], c[1], randi(6, 12), 6);
        }
        // 이웃 칸까지 등 줄(기둥 5m, 처짐 0.7, 전구 9개)
        const d = row[i + 1];
        if (d && Math.abs(d[0] - c[0] - PG) < 1 && Math.random() < 0.7) {
          const ya = gy(c[0], c[1]) + 5.0, yb = gy(d[0], d[1]) + 5.0;
          W._addBuildingWorld(c[0], c[1], 0, 0.16, 0.16, 5.0, 3, 0, 1, ya - 5.0);
          const A = [c[0], ya, c[1]], B = [d[0], yb, d[1]];
          if (W._addWire(A, B, 0.7, 0.03) >= 0) stats.strings++;
          for (let k = 1; k < 10; k++) { const f = k / 10; W._addHalo(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f - 0.7 * 4 * f * (1 - f) - 0.1, A[2] + (B[2] - A[2]) * f, 0.7, BULB[(k + i) % BULB.length]); }
        }
      }
    }
  }
  W._tag = null;

  // ---------- 3. 강변 아파트·상가(코스 좌표 격자 26m, 흔들어서 — 길·공원·강둑과 겹치지 않게) ----------
  let dong = 0;
  const finish = (R, info) => {
    const n = C.nearest(R.x, R.z);
    if (n.d > FILL + 20) return false;
    const w = R.hw * 2, d = R.hd * 2, hd = Math.hypot(w, d) / 2;
    const edge = Math.abs(n.u) - hd;
    const ca = W.capAllAt(R.x, R.z, hd);
    const capTop = Math.min(W._capTop(n.s, edge, hd), ca.body);
    const band = !Number.isFinite(capTop) ? 'far' : Math.min(edge, ca.edge) <= CITY.cap.near ? 'near' : 'mid';
    const ty = gy(R.x, R.z);
    let kind = info.kind;
    let h;
    if (band === 'far') h = kind === 0 ? rand(40, 80) : kind === 2 ? rand(10, 26) : rand(50, 100);
    else if (band === 'near') h = (capTop - ty) * rand(0.75, 1.0);
    else h = Math.min(kind === 0 ? rand(36, 66) : kind === 2 ? rand(10, 28) : rand(40, 90), capTop - ty);
    if (kind === 2) h = Math.min(h, rand(10, 28));
    if (kind === 0) h = Math.floor((h - 1.4) / 2.8) * 2.8 + 1.4; // 아파트는 층 높이(2.8m) 단위로 내림
    if (h < 8) return false;
    const yaw = -R.a;
    const lit = rand(0.3, 0.75);
    W._tag = 'apts';
    const bgain = rand(0.9, 1.2);
    const bi = W._addBuildingWorld(R.x, R.z, yaw, w, d, h + ty, kind, lit, bgain);
    if (bi >= 0 && info.cross) W._addBuildingWorld(R.x, R.z, yaw + Math.PI / 2, w, d, h + ty, kind, lit, bgain, 0, W.infoAttr.getX(bi)); // 탑상형(十자)
    W._tag = null;
    if (bi < 0) return false;
    const top = h + ty;
    const near = band === 'near';
    const pLim = Math.min(near ? W._propTop(n.s, hd) : Infinity, ca.prop);
    const room = pLim - top;
    let propTop = top;
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    const loc = (lx, lz) => [R.x + cs * lx + sn * lz, R.z - sn * lx + cs * lz];
    if (kind === 0) {
      if (room >= 3.2) { const q = loc(rand(-w * 0.3, w * 0.3), 0); W._addBuildingWorld(q[0], q[1], yaw, rand(6, 9), Math.min(d * 0.6, 8), 3.2, 3, 0, 1, top); propTop = Math.max(propTop, top + 3.2); }
      if (room >= 1.1) { W._addBuildingWorld(R.x, R.z, yaw, w + 0.25, d + 0.25, 1.1, 3, 0, 1, top); propTop = Math.max(propTop, top + 1.1); }
      W.signList.push({ x: R.x, z: R.z, yaw, w, d, top, kind: 'dong', n: dong++, size: 8 });
    } else if (room >= 1.0) {
      const na = randi(2, 5);
      for (let k = 0; k < na; k++) { const q = loc(rand(-R.hw * 0.6, R.hw * 0.6), rand(-R.hd * 0.6, R.hd * 0.6)); W._addBuildingWorld(q[0], q[1], yaw, rand(1.2, 2.2), rand(0.8, 1.6), 1.0, 3, 0, 1, top); }
      W._addBuildingWorld(R.x, R.z, yaw, w + 0.3, d + 0.3, 0.9, 3, 0, 1, top);
      propTop = Math.max(propTop, top + 1.0);
    }
    if (kind === 2 && n.d < 260 && top > 7) W.signList.push({ x: R.x, z: R.z, yaw, w, d, top, kind: 'band' });
    const lot = { x: R.x, z: R.z, w, d, h: top, kind, yaw, top, propTop, s: n.s, u: n.u, edge, hd, band, gen: info.gen };
    W.lots.push(lot);
    W._occMark(R.x, R.z, 3, top, Math.min(w, d) / 2);
    if (Math.random() < 0.3) W.launchers.push({ x: R.x, y: top + 0.5, z: R.z, kind: 'roof' });
    stats.lots[info.gen] = (stats.lots[info.gen] || 0) + 1;
    stats.kinds[kind] = (stats.kinds[kind] || 0) + 1;
    return true;
  };
  const tryPlace = (x, z, a, hw, hd, info) => {
    for (let k = 0; k < 3; k++) {
      const R = rect(x, z, a, hw, hd);
      if (rects.hits(R, 1.2)) { stats.rejOverlap++; hw *= 0.75; hd *= 0.75; continue; }
      if (segs.hitsRect(R)) { stats.rejRoad++; hw *= 0.75; hd *= 0.75; continue; }
      // 네 모서리·가운데가 모두 땅(물가 40m 밖)·공원 밖
      const cs = Math.cos(a), sn = Math.sin(a);
      let ok = true;
      for (const [lx, lz] of [[0, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]) { const px = x + cs * lx * hw - sn * lz * hd, pz = z + sn * lx * hw + cs * lz * hd; if (W.bankDist(px, pz) < 40 || parkAt(px, pz)) { ok = false; break; } }
      if (!ok) return null;
      rects.add(R);
      if (!finish(R, info)) return null;
      return R;
    }
    return null;
  };
  for (let s = C.sMin - 10; s <= C.length + 440; s += 26) {
    const fr = C.at(s, {});
    const Fx = Math.sin(fr.th), Fz = -Math.cos(fr.th), Rx = Math.cos(fr.th), Rz = Math.sin(fr.th);
    const a = Math.atan2(Fz, Fx);
    for (let u = -FILL; u <= FILL; u += 26) {
      if (Math.abs(u) < 20) continue;
      const uu = u + rand(-3, 3), ss = rand(-3, 3);
      const x = fr.x + Rx * uu + Fx * ss, z = fr.z + Rz * uu + Fz * ss;
      const bd = W.bankDist(x, z);
      if (bd < 40) continue;
      const q = Math.random();
      if (bd < 260 && q < 0.7) {
        // 강변 아파트: 판상형(길이 34~50, 깊이 13~15) 또는 탑상형(十자)
        if (Math.random() < 0.3) tryPlace(x, z, a, rand(10, 12), rand(5, 6), { kind: 0, gen: 'apts', cross: true });
        else tryPlace(x, z, a + (Math.random() < 0.5 ? 0 : Math.PI / 2), rand(17, 25), rand(6.5, 7.5), { kind: 0, gen: 'apts' });
      } else if (q < 0.82) tryPlace(x, z, a, rand(8, 11), rand(7, 10), { kind: 2, gen: 'shops' });
      else if (q < 0.9) tryPlace(x, z, a, rand(9, 12), rand(8, 11), { kind: 1, gen: 'office' });
      else tryPlace(x, z, a + Math.PI / 2, rand(17, 24), rand(6.5, 7.5), { kind: 0, gen: 'apts' });
    }
  }
  // 채움: 같은 격자를 반 칸 비켜 작은 상가·저층 아파트로 빈틈을 채운다(S1 처럼 촘촘한 강변 동네 — 품질 관문 300m 안 건물 수)
  for (let s = C.sMin + 3; s <= C.length + 440; s += 26) {
    const fr = C.at(s, {});
    const Fx = Math.sin(fr.th), Fz = -Math.cos(fr.th), Rx = Math.cos(fr.th), Rz = Math.sin(fr.th);
    const a = Math.atan2(Fz, Fx);
    for (let u = -FILL + 13; u <= FILL; u += 26) {
      if (Math.abs(u) < 20) continue;
      const x = fr.x + Rx * u, z = fr.z + Rz * u;
      if (W.bankDist(x, z) < 40) continue;
      if (Math.random() < 0.6) tryPlace(x, z, a, rand(6, 9), rand(6, 8), { kind: 2, gen: 'shops' });
      else tryPlace(x, z, a, rand(7, 10), rand(5.5, 7), { kind: 0, gen: 'apts' });
    }
  }

  // ---------- 4. 다리 C·D(트러스 — S1 다리와 같은 모양) ----------
  W._buildBridges();

  // ---------- 5. 바지선 발사대 ----------
  W._tag = 'barge';
  const barge = (x, z, yaw, len, wd, where) => {
    if (W._bai >= MAX.barge) return false;
    if (C.nearest(x, z).d < 20) return false; // 비행 통로 아래는 비움(발사대·불꽃이 통로에 닿지 않게)
    const i = W._bai++;
    W.barges.setMatrixAt(i, W._worldMatrix(x, 0.3, z, yaw, wd, 0.6, len));
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    const loc = (lx, lz) => [x + cs * lx + sn * lz, z - sn * lx + cs * lz];
    // 「꾸민 바지선」: 갑판 가장자리 빛 띠(양 옆 · 앞뒤, 따뜻한 흰빛) · 발사 틀(낮은 상자 두 줄 + 끝 점 빛) · 가운데 돛대(5m)에서 뱃머리·꼬리로 내려오는 전구 줄 · 수면 반사
    const ec = where === 'main' ? [0.95, 0.85, 0.62] : [0.55, 0.85, 0.95];
    for (const e of [-1, 1]) {
      const q = loc(e * (wd / 2 + 0.05), 0);
      W._addGlow(q[0], 0.68, q[1], 0.16, 0.14, len, ec, yaw);
      const r = loc(0, e * (len / 2 + 0.05));
      W._addGlow(r[0], 0.68, r[1], wd, 0.14, 0.16, ec, yaw);
    }
    for (const lx of [-wd * 0.22, wd * 0.22]) for (let k = 0; k < 5; k++) { const q = loc(lx, -len * 0.3 + k * len * 0.15); W._addBuildingWorld(q[0], q[1], yaw, 0.55, 0.55, 1.2, 3, 0, 1, 0.6); }
    const mast = loc(0, 0);
    W._addBuildingWorld(mast[0], mast[1], 0, 0.2, 0.2, 5.2, 3, 0, 1, 0.6);
    for (const e of [-1, 1]) {
      const end = loc(0, e * len * 0.48);
      for (let k = 1; k <= 7; k++) { const f = k / 8; W._addHalo(mast[0] + (end[0] - mast[0]) * f, 5.8 - 4.9 * f - 0.5 * 4 * f * (1 - f), mast[1] + (end[1] - mast[1]) * f, 0.6, BULB[(k + (e > 0 ? 0 : 2)) % BULB.length]); }
    }
    W._addGlow(mast[0], 5.9, mast[1], 0.3, 0.3, 0.3, [0.85, 0.88, 0.95]);
    W._addHalo(x, 1.0, z, len * 0.45, [0.26, 0.22, 0.15]);
    W._addRefl(x, z, len * 1.8, 1.6, [0.22, 0.18, 0.12]);
    W.launchers.push({ x, y: 1.5, z, kind: 'barge' });
    stats.barges[where]++;
    return true;
  };
  // 지류(River Mouth): 코스 오른쪽 물 위(x 35~80) 9척 + 왼쪽 가장자리 3척
  for (let z = 240; z > -580; z -= rand(55, 72)) barge(Tx + rand(15, 48), z, rand(-0.15, 0.15), rand(12, 16), rand(5, 6), 'trib');
  for (const z of [180, -130, -360]) barge(Tx - T.hw + 12, z, rand(-0.1, 0.1), rand(11, 13), rand(4.5, 5.5), 'trib');
  // 본류(Barge Finale): 코스 왼쪽 물 위 두 줄(본류 u −50 · −15 — 코스는 u +40), 다리 D 앞부터 코스 끝 너머까지
  {
    const sStart = W._mainUV(...(() => { const p = C.xz(1880, 0, {}); return [p.x, p.z]; })()).s;
    const sEnd = W._mainUV(...(() => { const p = C.xz(C.length + 150, 0, {}); return [p.x, p.z]; })()).s;
    const yawM = Math.atan2(M.fx, M.fz); // 바지선 길이 방향(지역 z → 세계 (sin yaw, cos yaw))을 본류 방향으로
    for (let s = sStart; s < sEnd; s += rand(42, 56)) {
      if (Math.abs(s - W.bridgeB.s) < 22) continue;
      for (const u of [-50, -15]) { const p = W._mainXZ(s + rand(-6, 6), u + rand(-4, 4)); barge(p.x, p.z, yawM + rand(-0.08, 0.08), rand(13, 17), rand(5, 6.5), 'main'); }
    }
  }
  W._tag = null;

  // ---------- 6. 축제 군중 · 둑 등 줄 ----------
  // 지류 둔치(물가 3~14m, River Mouth z 260 ~ −560 양쪽)
  for (let z = 260; z > -560; z -= 0.55) {
    if (Math.random() > 0.85) continue;
    if (Math.abs(z - W.bridgeA.z) < 10) continue;
    for (const side of [-1, 1]) {
      if (Math.random() < 0.3) continue;
      const x = Tx + side * (T.hw + rand(3, 14));
      W.crowdSpots.push(x, z, Math.random()); W.crowdY.push(gy(x, z) - W.crowdGroundY); stats.crowd.trib++;
    }
  }
  // 본류 둔치(도심 쪽: 코스 s 1380 ~ 끝 + 60, 건너편: 피날레 s 2000 ~)
  {
    const p = {};
    for (let s = 1380; s < C.length + 60; s += 0.6) {
      if (Math.random() > 0.8) continue;
      C.xz(s, 0, p);
      const uv = W._mainUV(p.x, p.z);
      if (Math.abs(uv.s - W.bridgeB.s) < 10) continue;
      const q = W._mainXZ(uv.s, M.hw + rand(3, 14));
      W.crowdSpots.push(q.x, q.z, Math.random()); W.crowdY.push(gy(q.x, q.z) - W.crowdGroundY); stats.crowd.main++;
      if (s > 2000 && Math.random() < 0.6) { const r = W._mainXZ(uv.s, -(M.hw + rand(3, 14))); W.crowdSpots.push(r.x, r.z, Math.random()); W.crowdY.push(gy(r.x, r.z) - W.crowdGroundY); stats.crowd.main++; }
    }
  }
  stats.crowd.park = W.crowdY.length - stats.crowd.trib - stats.crowd.main;
  // 둑 등 줄: 둔치 위 기둥(30m 마다, 4.6m) 사이 처진 줄 + 전구 9개(따뜻한 등·차가운 색 번갈아) — 지류 양쪽 · 본류 도심 쪽 · 피날레 건너편
  W._tag = 'lanterns';
  const string = (A, B) => {
    W._addBuildingWorld(A[0], A[2], 0, 0.16, 0.16, 4.6, 3, 0, 1, A[1] - 4.6);
    if (W._addWire(A, B, 0.8, 0.03) >= 0) stats.strings++;
    for (let k = 1; k < 10; k++) { const f = k / 10; const c = BULB[k % BULB.length]; W._addHalo(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f - 0.8 * 4 * f * (1 - f) - 0.1, A[2] + (B[2] - A[2]) * f, 1.0, [c[0] * 1.3, c[1] * 1.3, c[2] * 1.3]); }
    // 둔치 산책로 바닥 빛 띠(등 줄 아래, 따뜻한 등 색 — 축제 둑이 멀리서도 빛의 선으로 읽히게)
    const mx = (A[0] + B[0]) / 2, mz = (A[2] + B[2]) / 2, Lh = Math.hypot(B[0] - A[0], B[2] - A[2]);
    W._addGlow(mx, gy(mx, mz) + 0.3, mz, 0.35, 0.12, Lh - 1, [lamp[0] * 0.55, lamp[1] * 0.45, lamp[2] * 0.32], Math.atan2(B[0] - A[0], B[2] - A[2]));
  };
  for (const side of [-1, 1]) {
    for (let z = 250; z > -560; z -= 30) {
      if (Math.abs(z - W.bridgeA.z) < 18 || Math.abs(z - 30 - W.bridgeA.z) < 18) continue;
      const x = Tx + side * (T.hw + 9);
      string([x, gy(x, z) + 4.6, z], [x, gy(x, z - 30) + 4.6, z - 30]);
    }
  }
  {
    const pS = W._mainUV(...(() => { const p = C.xz(1380, 0, {}); return [p.x, p.z]; })()).s;
    const pE = W._mainUV(...(() => { const p = C.xz(C.length + 60, 0, {}); return [p.x, p.z]; })()).s;
    for (let s = pS; s < pE; s += 30) {
      if (Math.abs(s - W.bridgeB.s) < 20 || Math.abs(s + 30 - W.bridgeB.s) < 20) continue;
      for (const u of s > W.bridgeB.s - 120 ? [M.hw + 9, -(M.hw + 9)] : [M.hw + 9]) {
        const a = W._mainXZ(s, u), b = W._mainXZ(s + 30, u);
        string([a.x, gy(a.x, a.z) + 4.6, a.z], [b.x, gy(b.x, b.z) + 4.6, b.z]);
      }
    }
  }
  W._tag = null;
  stats.crowdTotal = W.crowdY.length;
  stats.ms = +((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(1);
  W.riversideStats = stats;
}
