// 16차 U9: S4 Glass Canyon(유리 협곡) 월드 생성기 — world.js build() 가 S4(kit.style 'canyon')에서 부른다.
// 1차 테마: 유리 업무 빌딩 사이 협곡. 통로(새)는 42~60m 를 날고, 양옆 25~60m 에는 통로보다 10~30m 높은 유리 탑(구간마다 4~6개)이 벽처럼 서 있다.
//   그 바깥은 코스에서 멀어질수록 높아지는 유리 빌딩(가까운 띠 지붕 ≤ 중심 − 12.5 → 중간 띠 경사 상한까지 꽉 → 먼 띠 70~170m 고층) — 비행 높이에서 「유리 벽 사이 골짜기」로 읽히게.
// 생성기(그리기 호출 늘지 않음 — 건물·구조물·빛 인스턴스, LED 외벽은 간판 인스턴스)
//   towers    : 유리 탑(kind 1) + 모서리 세로 LED 띠 + 머리 띠 + 항공등(차가운 흰빛). 회전 호에서 40m 안 금지, 회전 안쪽 금지
//   glass     : 가까운·중간·먼 띠 유리 업무 빌딩(kind 1, 일부 상가 2) + 옥상 난간·설비
//   skybridge : 가로 길 위에서 마주 보는 두 빌딩을 잇는 유리 다리(≤ 중심 − 12.5, 두 지붕보다 4m 넘게 아래) + 아래 가장자리 빛
//   helipad   : 넓은 옥상 헬리패드(일반 H 표시, 가장자리 초록·흰 점 빛)
//   crane     : 공사장 타워 크레인(마스트 + 지브는 코스 쪽, 꼭대기 차가운 흰빛 — 모든 코스 구간 상한 아래)
//   led       : 중간 띠 유리 빌딩 코스 쪽 벽의 LED 외벽(추상 무늬 · OPEN · 24H — 실존 상호 없음)
//   그 밖     : 가운데 대로(가로수·가로등·차) · 가로 길 · 외곽 길, 광장(Plaza Turn 안쪽), 군중(보도·광장·옥상 Rooftop Pause)
// 붉은 주황은 위험 전용(빛은 차가운 흰빛·청록·보라·초록). 강 없음(지형 높이 0 — world.noWater).
// 난수는 Math.random(점검 하네스가 씨앗 난수로 바꿔 끼움).
import { CITY, ELLIPSE } from './config.js';
import { rect, RectGrid, SegGrid } from './alley.js';

const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const hex = (c) => (Math.round(Math.min(1, c[0]) * 255) << 16) | (Math.round(Math.min(1, c[1]) * 255) << 8) | Math.round(Math.min(1, c[2]) * 255);
// LED 색(차가운 흰빛·청록·하늘·보라 — 붉은 주황 없음)
const EDGE = [[0.55, 0.78, 0.95], [0.4, 0.85, 0.85], [0.62, 0.55, 0.95], [0.75, 0.82, 0.92]];
const LEDC = [[0.25, 0.75, 1.0], [0.62, 0.42, 1.0], [0.35, 1.0, 0.55], [0.85, 0.9, 1.0], [0.2, 0.95, 0.85]];

export function buildCanyon(W, MAX) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const C = W.course;
  const K = (W.kit && W.kit.canyon) || {};
  const FILL = K.fill ?? CITY.fill;
  const W1 = (K.ring && K.ring[0]) || 125, W2 = (K.ring && K.ring[1]) || 250;
  const stats = { lots: {}, kinds: {}, towers: 0, towerByZone: {}, towerArcMin: Infinity, towerInnerSkip: 0, skybridges: 0, sbWhy: { lot: 0, face: 0, across: 0, low: 0 }, helipads: 0, cranes: 0, leds: 0, crowd: 0, rejOverlap: 0, rejRoad: 0, edgeLights: 0 };
  W.crowdY = [];
  W.infra = [];
  W.extraTrees = [];
  const lampC = W.stage.city.lampColor;
  const lamp = [((lampC >> 16) & 255) / 255, ((lampC >> 8) & 255) / 255, (lampC & 255) / 255];
  const P3 = (x, z) => [x, 0.05, z];
  const arcs = C.segs.filter((g) => Math.abs(g.turn) > 1e-6).map((g) => ({ a: g.a, b: g.b, sgn: Math.sign(g.turn) }));
  const inArc = (s, pad) => arcs.some((A) => s > A.a - pad && s < A.b + pad);
  // 회전 호 위 점(2m 마다) — 탑과 회전 호 거리 검사
  const arcPts = [];
  for (const A of arcs) for (let s = A.a; s <= A.b + 1e-6; s += 2) { const p = C.at(s, {}); arcPts.push([p.x, p.z]); }
  const arcDist = (x, z) => { let d = Infinity; for (const q of arcPts) d = Math.min(d, Math.hypot(q[0] - x, q[1] - z)); return d; };

  // ---------- 1. 길 ----------
  const sA = C.sMin - 1250, sB = C.length + 150 + 1250;
  const centerPts = (s0, s1) => {
    const pts = [];
    for (let s = s0; s < s1 - 1e-6; s += s < C.sMin || s > C.sMax ? 50 : 10) { const p = C.xz(s, 0, {}); pts.push(P3(p.x, p.z)); }
    const p = C.xz(s1, 0, {});
    pts.push(P3(p.x, p.z));
    return pts;
  };
  const mk = (name, pts, half, walk, extra = {}) => { const L = W._addLine(name, pts, half, extra.kind || 'road', walk); Object.assign(L, extra); return L; };
  const avenue = mk('협곡 대로', centerPts(sA, sB), 10.6, 4.2, { kind: 'avenue', cars: 170, lampStep: 36, lampFar: 700, role: 'center' });
  // 가로 길: 직선 구간에서 95~125m 마다, 대로에서 양쪽 W2 까지(다른 구간 땅으로 넘어가면 그쪽은 뺀다)
  const crosses = [];
  for (let s = -300; s < C.length + 420; s += rand(K.crossGap ? K.crossGap[0] : 95, K.crossGap ? K.crossGap[1] : 125)) {
    if (inArc(s, 45)) continue;
    for (const side of [-1, 1]) {
      let ok = true;
      for (let u = 10; u <= W2 + 1e-6 && ok; u += 10) {
        const p = C.xz(s, side * u, {});
        if (Math.abs(C.nearest(p.x, p.z).s - s) > 3) ok = false;
      }
      if (!ok) continue;
      const a = C.xz(s, 0, {}), b = C.xz(s, side * W2, {});
      crosses.push({ s, side, L: mk(`가로 길 s${Math.round(s)}${side > 0 ? '오른쪽' : '왼쪽'}`, [P3(a.x, a.z), P3(b.x, b.z)], 5.5, 2.5, { kind: 'road', cars: 16, lampStep: 48, lampFar: 420, noCone: true, simple: true, role: 'cross', s, side }) });
    }
  }
  // 안쪽 길(W1)·외곽 길(W2): 그 쪽 첫 가로 길 끝에서 마지막 가로 길 끝까지, 코스에서 그 거리인 선
  for (const [Wr, nm, hw, wk, extra] of [[W1, '안쪽 길', 5.0, 2.2, { kind: 'road', cars: 30, noLamp: true, simple: true, role: 'ring1' }], [W2, '외곽 길', 6.0, 2.5, { kind: 'road', cars: 60, lampStep: 48, lampSides: [1], lampFar: 700, noCone: true, role: 'ring2' }]]) {
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
      pieces.forEach((pts, k) => mk(`${nm} ${side > 0 ? '오른쪽' : '왼쪽'}${pieces.length > 1 ? ` ${k + 1}` : ''}`, pts, hw, wk, { ...extra, side }));
    }
  }
  W._buildRoads(false);
  const segs = new SegGrid(W.lines);
  const rects = new RectGrid(24);
  const roadNear = (x, z, r) => segs.hitsCircle(x, z, r + 0.5);

  // 광장(Plaza Turn 안쪽 — 우 90° 회전 가운데, 반지름 44m): 비운 땅(도로 칸) + 군중 + 바닥 빛
  const plaza = (() => {
    const z0 = C.def.zones.find((z) => z.id === 'plaza');
    const A = arcs.find((a) => z0 && a.a >= z0.s[0] - 1 && a.b <= z0.s[1] + 1);
    if (!A) return null;
    const sm = (A.a + A.b) / 2;
    const f = C.at(sm, {});
    const R = (A.b - A.a) / (Math.PI / 2); // 우 90° 반지름
    const side = A.sgn; // 회전 안쪽 = 오른쪽(+)
    const cx = f.x + Math.cos(f.th) * side * R, cz = f.z + Math.sin(f.th) * side * R;
    const r = Math.max(20, R - 26);
    for (let x = -r; x <= r; x += 4) for (let z = -r; z <= r; z += 4) if (x * x + z * z <= r * r) W._occMark(cx + x, cz + z, 2, 0, 2);
    rects.add(rect(cx, cz, 0, r, r));
    return { x: cx, z: cz, r };
  })();

  // ---------- 2. 유리 탑(이 스테이지만: 구간마다 4~6개, edge 25~60m, 지붕 = 통로 중심 + 10~30m) ----------
  const TK = { ...CITY.tower, ...(W.kit.tower || {}) };
  W.towers = [];
  W._tag = 'tower';
  for (const zone of C.def.zones) {
    const a = Math.max(-60, zone.s[0]), b = Math.min(C.length, zone.s[1]);
    if (b - a < 40) continue;
    const n = Math.max(TK.n[0], Math.min(TK.n[1], Math.round((b - a) / 110)));
    let placed = 0;
    for (let i = 0; i < n; i++) {
      let ok = false;
      for (let tries = 0; tries < 70 && !ok; tries++) {
        const s = tries < 24 ? a + ((i + 0.5) * (b - a)) / n + rand(-0.35, 0.35) * ((b - a) / n) : rand(a, b);
        const side = (i + tries) % 2 === 0 ? 1 : -1; // 회전 안쪽은 아래 nArc 검사가 뺀다
        const w = rand(TK.size[0], TK.size[1]), d = rand(TK.size[0], TK.size[1]);
        const hd = Math.hypot(w, d) / 2;
        for (let e = TK.edge[0]; e <= TK.edge[1] && !ok; e += 2.5) {
          const p = C.xz(s, side * (e + hd), {});
          const nn = C.nearest(p.x, p.z);
          const edge = Math.abs(nn.u) - hd;
          if (edge < TK.edge[0] || edge > TK.edge[1] || edge - ELLIPSE.u < TK.gap) continue;
          // 회전 안쪽 금지: 가장 가까운 점이 회전 호 앞뒤 60m 안이면 그 회전의 바깥쪽만
          const nArc = arcs.find((A) => nn.s > A.a - 60 && nn.s < A.b + 60);
          if (nArc && Math.sign(nn.u) === nArc.sgn) { stats.towerInnerSkip++; continue; }
          const ad = arcDist(p.x, p.z) - hd;
          if (ad < (TK.arcGap ?? 40)) continue;
          if (roadNear(p.x, p.z, hd)) continue;
          if (W.towers.some((t) => Math.hypot(t.x - p.x, t.z - p.z) < t.hd + hd + 8)) continue;
          const th = C.at(nn.s, {}).th;
          const R = rect(p.x, p.z, th, w / 2, d / 2); // 건물 yaw = −th 와 같은 축(w 는 코스 오른쪽 방향)
          if (rects.hits(R, 2)) continue;
          rects.add(R);
          const yaw = -C.at(nn.s, {}).th;
          let cvMax = 0;
          for (let k = -2; k <= 2; k++) cvMax = Math.max(cvMax, C.center(Math.max(C.sMin, Math.min(C.sMax, nn.s + (k * hd) / 2))));
          const top = cvMax + rand(TK.top[0], TK.top[1]);
          W.towers.push({ x: p.x, z: p.z, w, d, yaw, hd, top, s: nn.s, u: nn.u, edge, zone: zone.id, kind: 'tower', arcD: ad, cvMax });
          stats.towerArcMin = Math.min(stats.towerArcMin, ad);
          ok = true;
        }
      }
      if (ok) placed++;
    }
    stats.towerByZone[zone.id] = placed;
  }
  for (const t of W.towers) {
    const col = EDGE[randi(0, EDGE.length - 1)];
    W._addBuildingWorld(t.x, t.z, t.yaw, t.w, t.d, t.top, 1, rand(0.6, 0.85), rand(1.25, 1.45)); // 탑은 창 빛을 더 밝게(배경 하늘보다 밝은 벽 — 명도 차)
    W._occMark(t.x, t.z, 3, t.top, Math.min(t.w, t.d) / 2);
    W.lots.push({ x: t.x, z: t.z, w: t.w, d: t.d, h: t.top, kind: 1, yaw: t.yaw, top: t.top, propTop: t.top, s: t.s, edge: t.edge, band: 'tower', tower: true, gen: 'tower' });
    const cy = Math.cos(t.yaw), sy = Math.sin(t.yaw);
    const loc = (lx, lz) => [t.x + cy * lx + sy * lz, t.z - sy * lx + cy * lz];
    // 모서리 세로 LED 띠(바닥 8m 위부터 지붕까지) — 「테마 핵심 구조물은 가장자리 빛」(gate16s3 제안 3)
    const ec = hex(col.map((c) => c * 0.38));
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      const q = loc(sx * (t.w / 2 + 0.05), sz * (t.d / 2 + 0.05));
      W._addStructW(q[0], (t.top + 8) / 2, q[1], t.yaw, 0.32, t.top - 8, 0.32, ec, 3.0);
      stats.edgeLights++;
    }
    // 머리 띠(지붕 1.2m 아래, 네 변) + 층 띠 하나(지붕 아래 40%)
    for (const yb of [t.top - 1.2, t.top * 0.62]) {
      for (const e of [-1, 1]) {
        let q = loc(0, e * (t.d / 2 + 0.06)); W._addStructW(q[0], yb, q[1], t.yaw, t.w + 0.2, 0.28, 0.12, ec, 2.6);
        q = loc(e * (t.w / 2 + 0.06), 0); W._addStructW(q[0], yb, q[1], t.yaw, 0.12, 0.28, t.d + 0.2, ec, 2.6);
      }
    }
    // 옥상 난간 + 항공등(차가운 흰빛)
    W._addBuildingWorld(t.x, t.z, t.yaw, t.w + 0.3, t.d + 0.3, 0.9, 3, 0, 1, t.top);
    const ah = rand(4, 7);
    W._addBuildingWorld(t.x, t.z, 0, 0.3, 0.3, ah, 3, 0, 1, t.top);
    const g = W._addGlow(t.x, t.top + ah + 0.2, t.z, 0.4, 0.4, 0.4, W.avCol);
    if (g >= 0) (W.avLights || (W.avLights = [])).push(g);
    t.propTop = t.top + ah + 0.4;
    W.launchers.push({ x: t.x, y: t.top + 1, z: t.z, kind: 'roof' });
  }
  stats.towers = W.towers.length;
  W._tag = null;

  // ---------- 3. 공사장(크레인) 자리 — 건물보다 먼저 자리를 잡는다 ----------
  const cranes = [];
  W._tag = 'crane';
  for (const zone of C.def.zones) {
    if (zone.rest) continue;
    const a = Math.max(-40, zone.s[0]), b = Math.min(C.length + 200, zone.s[1]);
    const want = zone.id === 'finale' ? 3 : 2;
    let got = 0;
    for (let tries = 0; tries < 40 && got < want; tries++) {
      const s = rand(a, b), side = Math.random() < 0.5 ? -1 : 1, u = side * rand(95, 170);
      const p = C.xz(s, u, {});
      const nn = C.nearest(p.x, p.z);
      if (Math.abs(nn.u) < 90) continue;
      const R = rect(p.x, p.z, 0, 11, 11);
      if (rects.hits(R, 3) || segs.hitsRect(R)) continue;
      const ca = W.capAllAt(p.x, p.z, 32); // 지브가 32m 까지 돌아도 모든 코스 구간 상한 아래
      const capTop = Math.min(ca.body, W._capTop(nn.s, Math.abs(nn.u) - 32, 32));
      const H = Math.min(capTop - 1.5, rand(55, 75));
      if (!(H > 30)) continue;
      rects.add(R);
      cranes.push({ x: p.x, z: p.z, H, s: nn.s, u: nn.u });
      got++;
    }
  }
  for (const k of cranes) {
    // 공사 중인 낮은 몸통(2~4층, 어두운 콘크리트) + 마스트 + 코스 쪽 지브 + 뒤 균형추 + 꼭대기 차가운 흰빛
    const f = C.at(k.s, {});
    const toC = Math.atan2(-Math.cos(f.th) * Math.sign(k.u), -Math.sin(f.th) * Math.sign(k.u)) + rand(-0.5, 0.5); // 코스 쪽(± 30°)
    const podH = randi(2, 4) * 4.0;
    W._addBuildingWorld(k.x, k.z, 0, 20, 20, podH, 3, 0, 1);
    W.lots.push({ x: k.x, z: k.z, w: 20, d: 20, h: podH, kind: 3, yaw: 0, top: podH, propTop: podH, s: k.s, u: k.u, edge: Math.abs(k.u) - 14.2, hd: 14.2, band: 'mid', gen: 'crane' });
    W._occMark(k.x, k.z, 3, podH, 10);
    W._occMark(k.x, k.z, 3, k.H + 1.2, 1.5); // 마스트(los 가림 검사가 보게)
    const mc = 0x8a8c7a;
    W._addStructW(k.x, k.H / 2, k.z, 0, 1.8, k.H, 1.8, mc);
    for (let y = 6; y < k.H - 2; y += 6) W._addStructW(k.x, y, k.z, 0, 2.0, 0.18, 2.0, mc); // 마스트 가로살
    const jx = Math.sin(toC), jz = Math.cos(toC);
    const jl = 28, cl = 9;
    const yawJ = Math.atan2(-jz, jx);
    W._addStructW(k.x + jx * jl / 2, k.H + 0.6, k.z + jz * jl / 2, yawJ, jl, 1.1, 1.1, mc);
    W._addStructW(k.x - jx * cl / 2, k.H + 0.6, k.z - jz * cl / 2, yawJ, cl, 1.0, 1.4, mc);
    W._addStructW(k.x - jx * (cl - 1.5), k.H - 0.6, k.z - jz * (cl - 1.5), yawJ, 3, 2.2, 2.4, 0x5a5c62); // 균형추
    W._addStructW(k.x, k.H + 2.6, k.z, 0, 0.6, 3.2, 0.6, mc); // 꼭대기 기둥
    W._addStructW(k.x + jx * 3, k.H - 1.0, k.z + jz * 3, yawJ, 2.4, 2.0, 2.2, 0x6c7078, 0.25); // 조종석
    for (const dd of [jl - 0.5, -cl + 0.5]) { W._addGlow(k.x + jx * dd, k.H + 1.3, k.z + jz * dd, 0.35, 0.35, 0.35, [0.8, 0.86, 0.95]); W._addHalo(k.x + jx * dd, k.H + 1.3, k.z + jz * dd, 1.6, [0.24, 0.26, 0.3]); }
    W._addGlow(k.x, k.H + 4.4, k.z, 0.35, 0.35, 0.35, W.avCol);
    const top = k.H + 4.4;
    W.infra.push({ gen: 'crane', x: k.x, y: k.H / 2, z: k.z, w: 2, h: k.H, d: 2, yaw: 0, tilt: 0, r: 2, hd: 1.3, top, propTop: top });
    W.infra.push({ gen: 'crane', x: k.x + jx * jl / 2, y: k.H + 0.6, z: k.z + jz * jl / 2, w: jl, h: 1.1, d: 1.1, yaw: yawJ, tilt: 0, r: jl / 2, hd: jl / 2, top: k.H + 1.2, propTop: k.H + 1.3 });
    stats.cranes++;
  }
  W._tag = null;

  // ---------- 4. 유리 빌딩(코스 좌표 격자 26m, 흔들어서 — 길·탑·광장·공사장과 겹치지 않게) ----------
  const ledList = [];
  const finish = (R, info) => {
    const n = C.nearest(R.x, R.z);
    if (n.d > FILL + 20) return false;
    const w = R.hw * 2, d = R.hd * 2, hd = Math.hypot(w, d) / 2;
    const edge = Math.abs(n.u) - hd;
    const ca = W.capAllAt(R.x, R.z, hd);
    const capTop = Math.min(W._capTop(n.s, edge, hd), ca.body);
    const band = !Number.isFinite(capTop) ? 'far' : Math.min(edge, ca.edge) <= CITY.cap.near ? 'near' : 'mid';
    let kind = info.kind, h;
    // 협곡 벽: 상한까지 거의 꽉(가까운 띠 0.8~1.0 · 중간 띠 0.85~1.0), 먼 띠는 70~170m 고층
    if (band === 'far') h = rand(70, 170) * (Math.random() < 0.2 ? 0.6 : 1);
    else h = capTop * (band === 'near' ? rand(0.8, 1.0) : rand(0.85, 1.0));
    if (Number.isFinite(capTop)) h = Math.min(h, capTop);
    if (kind === 2) h = Math.min(h, randi(4, 9) * 3.4 + 1.2); // 상가(낮은 받침 건물)
    if (h < 8) return false;
    const yaw = -R.a;
    const lit = rand(0.4, 0.85);
    W._tag = 'glass';
    const bi = W._addBuildingWorld(R.x, R.z, yaw, w, d, h, kind, lit, rand(0.9, 1.2));
    W._tag = null;
    if (bi < 0) return false;
    const near = band === 'near';
    const pLim = Math.min(near ? W._propTop(n.s, hd) : Infinity, ca.prop);
    const room = pLim - h;
    let propTop = h;
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    const loc = (lx, lz) => [R.x + cs * lx + sn * lz, R.z - sn * lx + cs * lz];
    if (room >= 1.0) { W._addBuildingWorld(R.x, R.z, yaw, w + 0.3, d + 0.3, 0.9, 3, 0, 1, h); propTop = h + 0.9; }
    const lot = { x: R.x, z: R.z, w, d, h, kind, yaw, top: h, propTop, s: n.s, u: n.u, edge, hd, band, gen: info.gen, R };
    // 헬리패드(넓은 옥상, 가까운·중간 띠, 코스에서 200m 안): 어두운 판 + 흰 H + 가장자리 점 빛(초록·흰)
    if (band !== 'far' && w >= 17 && d >= 15 && room >= 0.6 && Math.abs(n.u) < 200 && Math.random() < 0.16) {
      W._tag = 'helipad';
      const y = h + 0.12;
      const ps = Math.min(w, d) * 0.72;
      W._addStructW(R.x, y, R.z, yaw, ps, 0.24, ps, 0x2a2e36);
      const hc = hex([0.55, 0.58, 0.6]);
      const L = ps * 0.36;
      for (const e of [-1, 1]) { const q = loc(e * L * 0.32, 0); W._addStructW(q[0], y + 0.14, q[1], yaw, 0.55, 0.05, L, hc, 1.1); }
      W._addStructW(R.x, y + 0.14, R.z, yaw, L * 0.64, 0.05, 0.55, hc, 1.1);
      for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1], [0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const q = loc((sx * ps) / 2, (sz * ps) / 2);
        const gc = (sx + sz) % 2 === 0 ? [0.3, 0.95, 0.55] : [0.85, 0.9, 0.95];
        W._addGlow(q[0], y + 0.25, q[1], 0.28, 0.2, 0.28, gc);
      }
      W._addHalo(R.x, y + 0.4, R.z, ps * 0.5, [0.05, 0.09, 0.07]);
      W.infra.push({ gen: 'helipad', x: R.x, y, z: R.z, w: ps, h: 0.3, d: ps, yaw, tilt: 0, r: ps * 0.71, hd: ps * 0.71, top: h, propTop: y + 0.3 }); // 본체 = 그 건물 지붕, 헬리패드는 옥상 소품
      propTop = Math.max(propTop, y + 0.3);
      stats.helipads++;
      W._tag = null;
    } else if (band !== 'far' && Math.abs(n.u) < 220 && room >= 1.4) {
      // 옥상 설비(실외기·기계실)
      const na = randi(2, 5);
      for (let k = 0; k < na; k++) { const q = loc(rand(-R.hw * 0.6, R.hw * 0.6), rand(-R.hd * 0.6, R.hd * 0.6)); W._addBuildingWorld(q[0], q[1], yaw, rand(1.4, 2.6), rand(1.0, 2.0), 1.2, 3, 0, 1, h); }
      propTop = Math.max(propTop, h + 1.2);
      if (room >= 3.4 && Math.random() < 0.3) { const q = loc(rand(-R.hw * 0.3, R.hw * 0.3), rand(-R.hd * 0.3, R.hd * 0.3)); W._addBuildingWorld(q[0], q[1], yaw, rand(4, 7), rand(3.5, 6), 3.2, 3, 0, 1, h); propTop = Math.max(propTop, h + 3.2); }
    }
    // LED 외벽(중간 띠 유리, 코스 쪽 벽 위쪽): 추상 무늬 · OPEN · 24H
    if (band === 'mid' && kind === 1 && h > 26 && Math.abs(n.u) < 190 && Math.random() < 0.2) ledList.push({ R, h, u: n.u, s: n.s });
    lot.propTop = propTop;
    W.lots.push(lot);
    R.lot = lot;
    W._occMark(R.x, R.z, 3, h, Math.min(w, d) / 2);
    if (Math.random() < 0.3) W.launchers.push({ x: R.x, y: h + 0.5, z: R.z, kind: 'roof' });
    stats.lots[info.gen] = (stats.lots[info.gen] || 0) + 1;
    stats.kinds[kind] = (stats.kinds[kind] || 0) + 1;
    return true;
  };
  const tryPlace = (x, z, a, hw, hd, info) => {
    for (let k = 0; k < 2; k++) {
      const R = rect(x, z, a, hw, hd);
      if (rects.hits(R, 1.2)) { stats.rejOverlap++; hw *= 0.72; hd *= 0.72; continue; }
      if (segs.hitsRect(R)) { stats.rejRoad++; hw *= 0.72; hd *= 0.72; continue; }
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
      const q = Math.random();
      if (Math.abs(u) < 60 && q < 0.18) tryPlace(x, z, a, rand(8, 11), rand(7, 10), { kind: 2, gen: 'podium' });
      else tryPlace(x, z, a, rand(9, 13), rand(8, 12), { kind: 1, gen: 'glass' });
    }
  }

  // ---------- 5. LED 외벽(간판 인스턴스, 아틀라스 led 칸) ----------
  for (const L of ledList) {
    const R = L.R;
    const side = Math.sign(L.u) || 1;
    const lz = -side * (R.hd + 0.18); // 코스 쪽 벽(지역 z = 코스 오른쪽 방향)
    const x = R.x - lz * Math.sin(R.a), z = R.z + lz * Math.cos(R.a);
    const nx = -side * -Math.sin(R.a), nz = -side * Math.cos(R.a); // 벽 바깥 방향(코스 쪽)
    const hS = Math.min(rand(7, 13), L.h * 0.35);
    const y = L.h - hS / 2 - rand(2.5, 6);
    W._rq('sign');
    if (W.signList.length < MAX.sign) {
      const c = LEDC[randi(0, LEDC.length - 1)];
      const k = rand(0.5, 0.62);
      W.signList.push({ kind: 'q', type: 'led', x, y, z, yaw: Math.atan2(nx, nz), h: hS, wMax: R.hw * 2 * 0.86, pick: randi(0, 999), col: [c[0] * k + 0.04, c[1] * k + 0.04, c[2] * k + 0.04] });
      stats.leds++;
    }
  }

  // ---------- 6. 스카이브리지(가로 길 위, 마주 보는 두 빌딩 사이) ----------
  const lotAt = (x, z) => {
    const c = rects.cell;
    const a = rects.m.get((Math.floor(x / c) + 4096) * 8192 + (Math.floor(z / c) + 4096));
    if (!a) return null;
    for (const r of a) { if (!r.lot) continue; const lx = (x - r.x) * r.c + (z - r.z) * r.s, lzz = -(x - r.x) * r.s + (z - r.z) * r.c; if (Math.abs(lx) <= r.hw && Math.abs(lzz) <= r.hd) return r.lot; }
    return null;
  };
  W._tag = 'skybridge';
  for (const cr of crosses) {
    if (cr.s < -150 || cr.s > C.length + 200) continue;
    const half = cr.L.half + cr.L.walk;
    for (let u = 32; u <= 200; u += rand(26, 40)) {
      if (Math.random() > 0.6) continue;
      // 가로 길 양쪽에서 가장 가까운 빌딩(길 가장자리에서 2~22m 안을 2m 마다 찾음)
      const find = (sg) => { for (let dd = half + 2; dd <= half + 22; dd += 2) { const p = C.xz(cr.s + sg * dd, cr.side * u, {}); const L = lotAt(p.x, p.z); if (L) return L; } return null; };
      const A = find(-1), B = find(1);
      if (!A || !B || A === B) { stats.sbWhy.lot++; continue; }
      const p0 = C.xz(cr.s, cr.side * u, {});
      const f = C.at(cr.s, {});
      const Fx = Math.sin(f.th), Fz = -Math.cos(f.th);
      const nx = -Fz, nz = Fx;
      // 두 빌딩의 마주 보는 벽(코스 앞 방향 F 로 잰 거리) — 다리 끝은 벽 안으로 1m
      const along = (L) => (L.x - p0.x) * Fx + (L.z - p0.z) * Fz, across = (L) => (L.x - p0.x) * nx + (L.z - p0.z) * nz;
      const fA = along(A) + A.R.hw, fB = along(B) - B.R.hw;
      if (!(fA < -half + 0.5 && fB > half - 0.5) || fB - fA > 34) { stats.sbWhy.face++; continue; }
      if (Math.abs(across(A)) > A.R.hd - 2.6 || Math.abs(across(B)) > B.R.hd - 2.6) { stats.sbWhy.across++; continue; } // 다리 폭(4.6m)이 두 벽 안에 들어감
      const len = fB - fA + 2, mid = (fA + fB) / 2;
      const pm = { x: p0.x + Fx * mid, z: p0.z + Fz * mid };
      const ca = W.capAllAt(pm.x, pm.z, len / 2 + 2.3);
      const nn = C.nearest(pm.x, pm.z);
      const yTopMax = Math.min(ca.body, W._capTop(nn.s, Math.abs(nn.u) - len / 2 - 2.3, len / 2 + 2.3), A.top - 4, B.top - 4);
      const y = yTopMax - 3.5 - rand(0, 6);
      if (y < 12) { stats.sbWhy.low++; continue; }
      const yaw = Math.atan2(-Fz, Fx);
      W._addStructW(pm.x, y + 1.6, pm.z, yaw, len, 3.2, 4.2, 0x40505e, 0.22); // 유리 통로(엷게 빛남)
      W._addStructW(pm.x, y + 3.35, pm.z, yaw, len + 0.4, 0.3, 4.6, 0x5a6470); // 지붕
      const ec = hex([0.55, 0.8, 0.95].map((c) => c * 0.4));
      for (const e of [-1, 1]) W._addStructW(pm.x + nx * e * 2.2, y + 0.1, pm.z + nz * e * 2.2, yaw, len, 0.18, 0.16, ec, 3.0); // 아래 가장자리 빛
      for (let k = -1; k <= 1; k++) W._addHalo(pm.x + Fx * k * len * 0.3, y + 1.6, pm.z + Fz * k * len * 0.3, 2.2, [0.12, 0.18, 0.22]);
      W.infra.push({ gen: 'skybridge', x: pm.x, y: y + 1.7, z: pm.z, w: len, h: 3.5, d: 4.6, yaw, tilt: 0, r: len / 2, hd: Math.hypot(len, 4.6) / 2, top: y + 3.5, propTop: y + 3.5 });
      stats.skybridges++;
    }
  }
  W._tag = null;

  // ---------- 7. 군중(대로 보도 · 광장 · Rooftop Pause 옥상) ----------
  {
    // 대로 보도(코스 −100 ~ 끝, 300m 안)
    const pts = avenue.pts;
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      const nn = C.nearest(p[0], p[2]);
      if (nn.s < -100 || nn.s > C.length + 60 || nn.d > 5) continue;
      if (Math.random() > 0.55) continue;
      const dx = q[0] - p[0], dz = q[2] - p[2], l = Math.hypot(dx, dz) || 1;
      for (let k = 0; k < 4; k++) {
        const t = rand(0, 1), side = Math.random() < 0.5 ? -1 : 1, o = side * (avenue.half + rand(0.6, avenue.walk - 0.6));
        W.crowdSpots.push(p[0] + dx * t - (dz / l) * o, p[2] + dz * t + (dx / l) * o, Math.random()); W.crowdY.push(0);
      }
    }
    if (plaza) {
      for (let k = 0; k < 520; k++) { const a = rand(0, 6.283), r = Math.sqrt(Math.random()) * (plaza.r - 2); W.crowdSpots.push(plaza.x + Math.cos(a) * r, plaza.z + Math.sin(a) * r, Math.random()); W.crowdY.push(0); }
      W._tag = 'plaza';
      for (let k = 0; k < 10; k++) { const a = (k / 10) * 6.283; const x = plaza.x + Math.cos(a) * (plaza.r - 3), z = plaza.z + Math.sin(a) * (plaza.r - 3); W._addGlow(x, 4.2, z, 0.45, 0.2, 0.45, [lamp[0] * 1.6, lamp[1] * 1.6, lamp[2] * 1.6]); W._addBuildingWorld(x, z, 0, 0.2, 0.2, 4.2, 3, 0, 1); W._addHalo(x, 4.2, z, 2.4, [lamp[0] * 0.4, lamp[1] * 0.4, lamp[2] * 0.4]); W._addPool(x, 0.2, z, 5, [lamp[0] * 0.12, lamp[1] * 0.12, lamp[2] * 0.12]); }
      W._tag = null;
    }
    // Rooftop Pause: 그 구간 가까운 띠 옥상 테라스(사람마다 지붕 높이)
    const rz = C.def.zones.find((z) => z.id === 'roof');
    if (rz) {
      for (const L of W.lots) {
        if (L.band !== 'near' || L.tower || L.s < rz.s[0] - 40 || L.s > rz.s[1] + 40) continue;
        const room = Math.min(W._propTop(L.s, L.hd), W.capAllAt(L.x, L.z, L.hd).prop) - L.top;
        if (room < 2) continue;
        const nP = randi(14, 30);
        const cs = Math.cos(L.yaw), sn = Math.sin(L.yaw);
        for (let k = 0; k < nP; k++) { const lx = rand(-L.w * 0.4, L.w * 0.4), lz = rand(-L.d * 0.4, L.d * 0.4); W.crowdSpots.push(L.x + cs * lx + sn * lz, L.z - sn * lx + cs * lz, Math.random()); W.crowdY.push(L.top); }
        for (let k = 0; k < 4; k++) { const lx = rand(-L.w * 0.4, L.w * 0.4), lz = rand(-L.d * 0.4, L.d * 0.4); W._addHalo(L.x + cs * lx + sn * lz, L.top + 1.9, L.z - sn * lx + cs * lz, 0.55, [0.32, 0.5, 0.62]); }
        L.propTop = Math.max(L.propTop, L.top + 1.95);
      }
    }
  }
  stats.crowd = W.crowdY.length;
  // 서치라이트 자리: 광장 · Rooftop Pause 옆
  const sp = (s, u, side) => { const p = C.xz(s, u, {}); return { x: p.x, z: p.z, ph: Math.random() * 6.28, side }; };
  W.alleySearch = [plaza ? { x: plaza.x, z: plaza.z, ph: Math.random() * 6.28, side: -1 } : sp(610, 60, -1), sp(2050, -70, 1)];
  stats.towerArcMin = Number.isFinite(stats.towerArcMin) ? +stats.towerArcMin.toFixed(1) : null;
  stats.ms = +((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0).toFixed(1);
  W.canyonStats = stats;
}
