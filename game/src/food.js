// 먹이 — 10차: 점수 먹이 줄은 없애고 두 가지만 드물게 놓는다.
// - HP 먹이(판당 4~6개): 웨이브 폭발 면 위, 새가 지나는 순간의 판정 머리에서 0.5~0.9m 바깥(머리 사이 주머니·틈 가장자리).
//   그 자리에 정확히 가면 맞지 않는다(실제 별 위치·나이로 검사) — 위험을 감수하고 타이밍을 맞춰 먹는 먹이. 회복 = 최대 HP 25%(최소 15).
//   모양: 그 새가 좋아하는 먹이(참새 곡식 · 까치 나방 · 비둘기 빵) + 민트(HP 막대 색) 빛무리와 「+」 고리(천천히 맥박).
// - 롤 먹이(판당 5~7개): 웨이브 사이 깊이 가운데, 계획 경로에서 2~4m 비켜(폭발 면 위 아님). 롤 +1(11차: 최대 5, 가득이면 +200점).
//   모양: 시안(롤 표시 색) 깃털이 천천히 돈다 — 길쭉한 실루엣이라 둥근 HP 먹이와 모양으로도 구분된다.
// - 줍기: 새 중심에서 1.0m 안(끌림 없음). 그 자리에서 0.15초 동안 작아진다.
// - 그림: 조각 셰이더 한 장, 인스턴스 1개 = 그리기 호출 +1. 불꽃 색(금·주황·진홍)은 쓰지 않는다.
import * as THREE from 'three';
import { FOOD, COURSE, BIRDS, BURST } from './config.js';
import { CGRID, clearOf, reachOf, pathOf } from './choreo.js';

const KINDS = ['mayfly', 'moth', 'crumb', 'grain'];
const FEATHER = 8; // 그림 번호: 0~3 모델, 4~7 = HP 먹이(4 + 모델), 8 = 롤 깃털
const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const E = COURSE.ellipse;
const inEll = (u, w, k = 0.93) => (u / (E.u * k)) ** 2 + (w / (E.v * k)) ** 2 <= 1;

const VERT = /* glsl */ `
attribute vec3 aLocal; // 사각형 모서리(-1~1)
attribute vec4 aP;     // 세계 위치 xyz, 크기(지름 m)
attribute vec4 aK;     // 그림 번호, 위상, 불투명도, 크기 배율(11차 먹힘: 1 → 1.3배). 획득 고리(9~11)는 고리 반경 비율, 불투명도, 고리 반두께 비율
uniform float uTime;
varying vec2 vUv;
varying float vKind;
varying float vA;
varying float vSeed;
varying float vFlap;
varying float vW;
void main() {
  bool fx = aK.x > 8.5;
  float size = fx ? aP.w : aP.w * aK.w;
  vec3 wp = fx ? aP.xyz : aP.xyz + vec3(0.0, sin(uTime * 2.1 + aK.y) * 0.07, 0.0); // 제자리 너울
  vW = aK.w;
  vec4 mv = modelViewMatrix * vec4(wp, 1.0);
  mv.xy += aLocal.xy * size * 0.5;
  gl_Position = projectionMatrix * mv;
  vUv = aLocal.xy;
  vKind = aK.x;
  vA = aK.z;
  vSeed = aK.y;
  float km = mod(aK.x, 4.0);
  vFlap = km < 0.5 ? sin(uTime * 14.0 * 6.2831 + aK.y) : sin(uTime * 7.0 * 6.2831 + aK.y);
}
`;
const FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uGlowHp;
uniform vec3 uFx[3];
varying vec2 vUv;
varying float vKind;
varying float vA;
varying float vSeed;
varying float vFlap;
varying float vW;
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float ell(vec2 p, vec2 c, vec2 r) { return length((p - c) / r) - 1.0; }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
void main() {
  int kk = int(vKind + 0.5);
  if (kk >= 9) {
    // 11차 획득 고리: 새 중심에서 넓어지는 얇은 고리(밝기 HDR 1.2 — 위협 머리보다 어둡게, 흰 심 없음)
    vec3 fc = kk == 9 ? uFx[0] : kk == 10 ? uFx[1] : uFx[2];
    float rr = length(vUv);
    float aR = fwidth(rr) * 1.2;
    float m = 1.0 - smoothstep(vW - aR, vW + aR, abs(rr - vSeed));
    if (m * vA < 0.01) discard;
    gl_FragColor = vec4(fc * ${FOOD.fx.ring.hdr.toFixed(2)}, m * vA);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    return;
  }
  bool hpF = kk >= 4 && kk < 8;
  bool feather = kk == 8;
  int k = hpF ? kk - 4 : kk;
  float R = length(vUv);
  // HP 먹이: 모델은 고리 안쪽(× 1.6 작게)
  vec2 p = hpF ? vUv * ${FOOD.hp.ring.toFixed(2)} : vUv;
  float r = length(p);
  vec3 col = vec3(0.0);
  float a = 0.0;
  float aa = fwidth(p.x) * 1.2;
  float glow = 0.0;
  vec3 glowC = vec3(0.0);
  if (feather) {
    // 롤 깃털: 시안 깃(길쭉한 잎 모양) + 가운데 깃대 + 깃가지 줄무늬, 천천히 돈다
    vec2 q = rot(uTime * 0.9 + vSeed) * p;
    float vane = ell(q, vec2(0.04, 0.05), vec2(0.26, 0.78));
    float shaft = sdSeg(q, vec2(0.0, -0.95), vec2(0.0, 0.8)) - 0.022;
    float mv = 1.0 - smoothstep(-aa, aa, vane);
    float ms = 1.0 - smoothstep(-aa, aa, shaft);
    float barbs = 0.75 + 0.25 * sin(q.y * 46.0 - abs(q.x) * 30.0);
    col = mix(vec3(0.3, 0.86, 0.98) * barbs, vec3(0.86, 1.0, 1.0), ms);
    a = max(mv * 0.9, ms);
    glow = (1.0 - smoothstep(0.15, 1.0, R)) * 0.3;
    glowC = vec3(0.3, 0.85, 0.95);
  } else if (k == 0) {
    // 하루살이 5마리: 몸(연두) + 날개 두 장(옅은 연두) + 긴 꼬리 두 가닥
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 c = vec2(sin(fi * 2.4 + vSeed) * 0.5, cos(fi * 1.7 + vSeed * 1.3) * 0.45) + 0.05 * vec2(sin(uTime * 3.0 + fi), cos(uTime * 2.3 + fi * 1.3));
      vec2 q = rot(0.5 + fi) * (p - c);
      float body = ell(q, vec2(0.0), vec2(0.045, 0.13));
      float wing = min(ell(q, vec2(-0.08, 0.05), vec2(0.1, 0.05 + 0.03 * vFlap)), ell(q, vec2(0.08, 0.05), vec2(0.1, 0.05 + 0.03 * vFlap)));
      float tail = min(sdSeg(q, vec2(0.0, -0.12), vec2(-0.06, -0.38)), sdSeg(q, vec2(0.0, -0.12), vec2(0.06, -0.38))) - 0.008;
      float mb = 1.0 - smoothstep(-aa, aa, body);
      float mw = 1.0 - smoothstep(-aa, aa, wing);
      float mt = 1.0 - smoothstep(-aa, aa, tail);
      col = mix(col, vec3(0.62, 0.86, 0.66), mw * 0.6);
      col = mix(col, vec3(0.45, 0.82, 0.22), max(mb, mt));
      a = max(a, max(max(mb, mt), mw * 0.6));
    }
  } else if (k == 1) {
    // 나방: 앞날개 두 장(크고 크림색, 갈색 점) + 뒷날개 두 장(작게) + 갈색 몸 + 더듬이
    float f = 0.55 + 0.45 * abs(vFlap);
    vec2 q = vec2(abs(p.x) / f, p.y);
    float fw = ell(q, vec2(0.42, 0.18), vec2(0.42, 0.3));
    float hw = ell(q, vec2(0.3, -0.25), vec2(0.28, 0.22));
    float body = ell(p, vec2(0.0, 0.0), vec2(0.08, 0.38));
    float ant = min(sdSeg(p, vec2(0.02, 0.34), vec2(0.22, 0.7)), sdSeg(p, vec2(-0.02, 0.34), vec2(-0.22, 0.7))) - 0.014;
    float spot = ell(q, vec2(0.45, 0.2), vec2(0.1, 0.1));
    float mf = 1.0 - smoothstep(-aa, aa, fw), mh = 1.0 - smoothstep(-aa, aa, hw);
    float mb = 1.0 - smoothstep(-aa, aa, body), ma = 1.0 - smoothstep(-aa, aa, ant);
    float edge = smoothstep(-0.25, -0.02, max(fw * (1.0 - mh), hw * (1.0 - mf)));
    vec3 cream = vec3(0.86, 0.8, 0.62), brown = vec3(0.36, 0.24, 0.14);
    col = mix(cream, brown, max(edge * 0.8, 1.0 - smoothstep(-aa, aa, spot)));
    col = mix(col, vec3(0.75, 0.66, 0.5), mh * (1.0 - mf));
    col = mix(col, brown * 0.8, max(mb, ma));
    a = max(max(mf, mh), max(mb, ma));
  } else if (k == 2) {
    // 식빵 단면: 아래는 둥근 모서리 직육면 단면, 위는 두 봉우리 → 크림 속 + 갈색 껍질
    vec2 q = p * vec2(1.0, 1.05) + vec2(0.0, 0.05);
    vec2 bq = abs(q - vec2(0.0, -0.22)) - vec2(0.52, 0.42);
    float bottom = length(max(bq, 0.0)) + min(max(bq.x, bq.y), 0.0) - 0.1;
    float tops = min(length(q - vec2(-0.3, 0.26)) - 0.36, length(q - vec2(0.3, 0.26)) - 0.36);
    float d = min(bottom, tops);
    float m = 1.0 - smoothstep(-aa, aa, d);
    float crust = smoothstep(-0.13, -0.08, d);
    float holes = 0.0;
    for (int i = 0; i < 4; i++) { float fi = float(i); holes = max(holes, 1.0 - smoothstep(0.0, 0.03, length(q - vec2(sin(fi * 2.7 + vSeed) * 0.3, cos(fi * 1.9) * 0.25 - 0.05)) - 0.035)); }
    col = mix(vec3(0.92, 0.84, 0.62), vec3(0.55, 0.32, 0.13), crust);
    col = mix(col, vec3(0.75, 0.66, 0.45), holes * (1.0 - crust));
    a = m;
  } else {
    // 이삭: 연두 줄기(비스듬) + 낱알 7개(양쪽 번갈아, 연두빛 금색) + 끝 수염
    vec2 q = rot(-0.5) * p;
    float stem = sdSeg(q, vec2(0.0, -0.85), vec2(0.0, 0.7)) - 0.025;
    float kern = 1e3;
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      float y = -0.35 + fi * 0.15;
      float sx = mod(fi, 2.0) < 0.5 ? -1.0 : 1.0;
      vec2 kq = rot(sx * 0.5) * (q - vec2(sx * 0.09, y));
      kern = min(kern, ell(kq, vec2(0.0), vec2(0.075, 0.12)));
    }
    float awn = sdSeg(q, vec2(0.0, 0.7), vec2(0.05, 0.92)) - 0.01;
    float ms = 1.0 - smoothstep(-aa, aa, min(stem, awn));
    float mk = 1.0 - smoothstep(-aa, aa, kern);
    col = mix(vec3(0.42, 0.7, 0.2), vec3(0.78, 0.8, 0.36), mk);
    a = max(ms, mk);
  }
  if (hpF) {
    // 민트 빛무리 + 「+」 고리(천천히 맥박)
    float pulse = 0.72 + 0.28 * sin(uTime * 3.2 + vSeed);
    float aR = fwidth(R) * 1.2;
    float ringD = abs(R - 0.86) - 0.035;
    float plus = min(sdSeg(vUv, vec2(-0.13, 0.86), vec2(0.13, 0.86)), sdSeg(vUv, vec2(0.0, 0.73), vec2(0.0, 0.99))) - 0.04;
    float gap = 1.0 - smoothstep(0.17, 0.2, length(vUv - vec2(0.0, 0.86))); // 「+」 자리는 고리를 끊음
    float mr = (1.0 - smoothstep(-aR, aR, ringD)) * (1.0 - gap);
    float mp = 1.0 - smoothstep(-aR, aR, plus);
    float m = max(mr, mp);
    col = mix(col, uGlowHp * (0.85 + 0.15 * pulse), m * (1.0 - a * 0.5));
    a = max(a, m * pulse);
    glow = (1.0 - smoothstep(0.1, 0.95, R)) * 0.42 * pulse;
    glowC = uGlowHp;
  }
  vec3 outc = mix(glowC * glow, col, a);
  float oa = max(a, glow) * vA;
  if (oa < 0.01) discard;
  gl_FragColor = vec4(outc, oa);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export class Food {
  constructor(scene, max = 64) {
    this.max = max;
    this.items = [];
    this.P = new Float32Array(max * 4);
    this.K = new Float32Array(max * 4);
    const g = new THREE.InstancedBufferGeometry();
    const loc = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(loc.length), 3));
    g.setAttribute('aLocal', new THREE.BufferAttribute(new Float32Array(loc), 3));
    g.setIndex([0, 1, 2, 2, 1, 3]);
    this.aP = new THREE.InstancedBufferAttribute(this.P, 4).setUsage(THREE.DynamicDrawUsage);
    this.aK = new THREE.InstancedBufferAttribute(this.K, 4).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aP', this.aP);
    g.setAttribute('aK', this.aK);
    g.instanceCount = 0;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { uTime: { value: 0 }, uGlowHp: { value: new THREE.Vector3(...FOOD.hp.glow) }, uFx: { value: [new THREE.Vector3(...FOOD.fx.col.hp), new THREE.Vector3(...FOOD.fx.col.roll), new THREE.Vector3(...FOOD.fx.col.gold)] } },
      transparent: true,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9;
    scene.add(this.mesh);
    this.resetLog();
  }

  resetLog() {
    this.log = { placed: 0, hpPlaced: 0, rollPlaced: 0, eaten: 0, hpEaten: 0, rollEaten: 0, maxVisible: 0, hpFail: 0, rollFail: 0, hpWaves: [], hpClear: [] };
  }

  reset() {
    this.items.length = 0;
    this.fx = [];
    this.mesh.geometry.instanceCount = 0;
  }

  _add(course, type, s, u, w, extra = {}) {
    if (!inEll(u, w)) {
      const k = 0.92 / Math.sqrt((u / E.u) ** 2 + (w / E.v) ** 2);
      u *= k;
      w *= k;
    }
    const W = course.toWorld(s, u, course.center(s) + w, new THREE.Vector3());
    const it = { type, s, u, w, W, ph: Math.random() * 6.28, got: false, eatT: -1, passed: false, ...extra };
    this.items.push(it);
    this.log.placed++;
    if (type === 'hp') this.log.hpPlaced++;
    else this.log.rollPlaced++;
    return it;
  }

  // 판 시작(안무 전): 9차의 고정 먹이는 없앴다 — 비워 두기만 한다.
  // 다만 9차가 여기서 쓰던 난수 개수만큼 Math.random 을 그대로 소비한다(뒤이어 만드는 위협 별의 난수가 9차와 같게 — 같은 씨앗이면 같은 판정)
  build() {
    this.reset();
    this.resetLog();
    const R = Math.random;
    for (let q = 0; q < 5; q++) {
      R(); R();
      const n = Math.floor(3 + R() * 2);
      for (let i = 0; i < n; i++) { R(); R(); R(); }
    }
    R();
    for (let i = 0; i < 5 + 6 + 4 + 10 + 4; i++) R();
    for (let q = 0; q < 2; q++) {
      R();
      for (let i = 0; i < 2; i++) { R(); R(); R(); }
    }
  }

  // 10차: 미리 짠 안무(plan)와 실제 위협 껍질(threats.list — 별 방향·속도·수명이 정해진 뒤)에 맞춰 HP 먹이·롤 먹이를 놓는다
  addPlanFood(course, plan, bird, threats = null) {
    this.items = [];
    const spec = BIRDS[plan.bird];
    const favKind = FOOD.fav[plan.bird];
    const ws = plan.waves.filter((w) => w.eggs.length);
    const sOf = (w) => Math.min(...w.eggs.map((e) => e.s));
    const sHi = (w) => Math.max(...w.eggs.map((e) => e.s));
    // ---------- HP 먹이 ----------
    const H = FOOD.hp;
    const rb = spec.radius * BURST.birdHitMult;
    const shellsOf = (w) => (threats ? threats.list.filter((sh) => sh.ev && sh.ev.wave === w) : []);
    const Bc = threats ? threats.constructor : null;
    // 그 자리(u, w)로 면을 지나면 맞지 않는가(실제 별 — 면 앞뒤 2m 를 새 속도로 지나는 동안, 머리 판정 여유 H.safe 이상)
    const safeThrough = (w, u, ww) => {
      const shells = shellsOf(w);
      if (!shells.length || !Bc) return true;
      for (const sh of shells) {
        for (let dx = -2; dx <= 2.01; dx += 0.25) {
          const age = sh.tMeet - sh.tBurst + dx / spec.forward;
          if (age < 0) continue;
          const c = Bc.minClear(sh, age, dx, u - sh.uc, ww - sh.wc, rb);
          if (c < H.safe) return false;
        }
      }
      return true;
    };
    const want = randi(H.n[0], H.n[1]);
    const cand = ws.filter((w) => w.i >= H.skipWaves || ws.indexOf(w) >= H.skipWaves);
    const chosen = [];
    let last = -99;
    let gapT = rand(H.gap[0], H.gap[1]);
    for (const w of cand) {
      if (w.tq - last < gapT) continue;
      chosen.push(w);
      last = w.tq;
      gapT = rand(H.gap[0], H.gap[1]);
    }
    // 피날레에 하나는 꼭
    const fin = cand.filter((w) => w.kind === 'finale');
    if (fin.length && !chosen.some((w) => w.kind === 'finale')) chosen.push(fin[Math.floor(fin.length / 2)]);
    chosen.sort((a, b) => a.tq - b.tq);
    // 모자라면 가장 긴 빈 시간 가운데 웨이브를 더한다(판당 4~6개)
    while (chosen.length < want) {
      let best = null, bl = -1;
      const edges = [cand[0] ? cand[0].tq - H.gap[0] : 0, ...chosen.map((w) => w.tq), cand.length ? cand[cand.length - 1].tq + H.gap[0] : 0];
      for (let i = 0; i + 1 < edges.length; i++) {
        const mid = (edges[i] + edges[i + 1]) / 2;
        const w = cand.filter((q) => !chosen.includes(q)).sort((x, y) => Math.abs(x.tq - mid) - Math.abs(y.tq - mid))[0];
        if (!w) continue;
        const L = Math.min(Math.abs(w.tq - edges[i]), Math.abs(edges[i + 1] - w.tq));
        if (L > bl) { bl = L; best = w; }
      }
      if (!best) break;
      chosen.push(best);
      chosen.sort((a, b) => a.tq - b.tq);
    }
    while (chosen.length > want) {
      // 피날레 것은 남기고, 가장 붙어 있는 것부터 뺀다
      let bi = -1, bd = Infinity;
      for (let i = 1; i < chosen.length; i++) {
        if (chosen[i].kind === 'finale' && !chosen.slice(0, i).some((w) => w.kind === 'finale') && chosen.filter((w) => w.kind === 'finale').length === 1) continue;
        const d = chosen[i].tq - chosen[i - 1].tq;
        if (d < bd) { bd = d; bi = i; }
      }
      if (bi < 0) break;
      chosen.splice(bi, 1);
    }
    const G = CGRID;
    const placeHp = (w) => {
      const wi = ws.indexOf(w);
      const prev = wi > 0 ? ws[wi - 1] : null;
      const next = wi + 1 < ws.length ? ws[wi + 1] : null;
      const tgt = w.target;
      const pts = [];
      for (let c = 0; c < G.NC; c++) {
        if (!G.IN_SAFE[c]) continue;
        const u = G.CU[c], ww = G.CW[c];
        // 11차: 줄기 모델의 안전 영역(바깥 띠 또는 구멍)에만 — 새 판정 기준 여유 edge[0]~edge[1](줄기 바로 바깥). 정지 띠·줄기 사이에는 두지 않는다
        const pth = pathOf(w.eggs, u, ww);
        if (pth === 'gap') continue;
        const dg = Math.hypot(u - tgt[0], ww - tgt[1]);
        if (pth === 'out' && (dg < H.offGap[0] || dg > H.offGap[1])) continue;
        const cl = clearOf(w.eggs, u, ww, rb);
        if (cl < H.edge[0] || cl > H.edge[1]) continue;
        // 앞 목표에서 닿고(이 웨이브 reach), 먹은 뒤 다음 목표에 닿는다(다음 웨이브 reach)
        if (prev && Math.hypot(u - prev.target[0], ww - prev.target[1]) > w.reach) continue;
        if (next && Math.hypot(u - next.target[0], ww - next.target[1]) > next.reach) continue;
        pts.push([u, ww, cl]);
      }
      // 무작위 순서로 실제 별 검사
      for (let i = pts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pts[i], pts[j]] = [pts[j], pts[i]]; }
      for (const [u, ww, cl] of pts) {
        if (!safeThrough(w, u, ww)) continue;
        return { u, w: ww, cl };
      }
      return null;
    };
    const usedW = new Set();
    for (const w of chosen) {
      let p = placeHp(w), ww = w;
      if (!p) {
        // 안 되면 앞뒤 가까운 웨이브(같은 구간 성격 유지)
        const wi = ws.indexOf(w);
        for (const d of [1, -1, 2, -2]) {
          const w2 = ws[wi + d];
          if (!w2 || usedW.has(w2) || ws.indexOf(w2) < H.skipWaves) continue;
          p = placeHp(w2);
          if (p) { ww = w2; break; }
        }
      }
      if (!p) { this.log.hpFail++; continue; }
      usedW.add(ww);
      this._add(course, 'hp', sOf(ww), p.u, p.w, { model: favKind, wave: ww.i, clear: p.cl });
      this.log.hpWaves.push(ww.i);
      this.log.hpClear.push(+p.cl.toFixed(2));
    }
    // ---------- 롤 먹이 ----------
    const Rf = FOOD.roll;
    const eggsAll = [];
    for (const w of ws) for (const e of w.eggs) eggsAll.push(e);
    const okAt = (s, u, ww) => {
      if (!inEll(u, ww, 0.9)) return false;
      for (const w of ws) if (s > sOf(w) - Rf.planeGap && s < sHi(w) + Rf.planeGap) return false;
      for (const e of eggsAll) {
        if (Math.abs(e.s - s) > e.R + Rf.burstPad + 0.5) continue;
        if (Math.hypot(e.s - s, e.u - u, e.w - ww) < e.R + Rf.burstPad) return false;
      }
      for (const it of this.items) if (Math.hypot(it.s - s, it.u - u, it.w - ww) < 6) return false;
      return true;
    };
    const gaps = [];
    for (let i = 1; i < ws.length; i++) gaps.push({ a: ws[i - 1], b: ws[i] });
    const nRoll = randi(Rf.n[0], Rf.n[1]);
    const placeRoll = (gp) => {
      const s0 = sHi(gp.a), s1 = sOf(gp.b);
      if (s1 - s0 < 2 * Rf.planeGap + 1) return null;
      const f = spec.forward;
      for (let t = 0; t < 40; t++) {
        const s = (s0 + s1) / 2 + rand(-0.15, 0.15) * (s1 - s0);
        const k = (s - s0) / (s1 - s0);
        const pu = gp.a.target[0] + (gp.b.target[0] - gp.a.target[0]) * k, pw = gp.a.target[1] + (gp.b.target[1] - gp.a.target[1]) * k;
        const an = Math.random() * Math.PI * 2, off = rand(Rf.off[0], Rf.off[1]);
        const u = pu + Math.cos(an) * off, ww = pw + Math.sin(an) * off;
        if (!okAt(s, u, ww)) continue;
        // 앞 면에서 출발해 닿고, 먹은 뒤 다음 목표에 닿는가
        if (Math.hypot(u - gp.a.target[0], ww - gp.a.target[1]) > reachOf(spec, (s - s0) / f)) continue;
        if (Math.hypot(u - gp.b.target[0], ww - gp.b.target[1]) > reachOf(spec, (s1 - s) / f)) continue;
        return { s, u, w: ww };
      }
      return null;
    };
    // 판 전체에 고르게(가까운 칸을 차례로 시도)
    const order = [];
    for (let q = 0; q < nRoll; q++) order.push(Math.min(gaps.length - 1, Math.floor(((q + 0.5) / nRoll) * gaps.length)));
    const usedG = new Set();
    for (const gi of order) {
      let p = null;
      for (const d of [0, 1, -1, 2, -2, 3, -3]) {
        const g2 = gaps[gi + d];
        if (!g2 || usedG.has(g2)) continue;
        p = placeRoll(g2);
        if (p) { usedG.add(g2); break; }
      }
      if (!p) { this.log.rollFail++; continue; }
      this._add(course, 'roll', p.s, p.u, p.w, {});
    }
    this.items.sort((a, b) => a.s - b.s);
  }

  // out: { kind: 'eat', item }
  update(dt, now, bird, birdId, out, cam) {
    this.material.uniforms.uTime.value = now;
    if (bird) {
      for (const it of this.items) {
        if (it.got || it.passed) continue;
        if (bird.s > it.s + 1.5) {
          it.passed = true;
          continue;
        }
        const R = it.type === 'hp' ? FOOD.hp.collect : FOOD.roll.collect;
        if (Math.abs(bird.s - it.s) > R + 0.2) continue;
        if (it.W.distanceTo(bird.pos) <= R) {
          it.got = true;
          it.eatT = 0;
          this.log.eaten++;
          if (it.type === 'hp') this.log.hpEaten++;
          else this.log.rollEaten++;
          out.push({ kind: 'eat', item: it });
        }
      }
    }
    for (const it of this.items) if (it.eatT >= 0 && it.eatT <= FOOD.eatT) it.eatT += dt;
    // 11차 획득 고리: 새를 따라다니며 0.35초 동안 넓어지고 옅어짐
    if (this.fx) {
      for (const f of this.fx) f.t += dt;
      this.fx = this.fx.filter((f) => f.t < FOOD.fx.ring.t);
    }
    this._draw(cam, bird);
  }

  // 11차: 먹은 순간 고리(색 0 HP 민트 · 1 롤 시안 · 2 점수 전환 금)
  ringFx(col) {
    (this.fx || (this.fx = [])).push({ t: 0, col });
    this.log.fx = (this.log.fx || 0) + 1;
  }

  _draw(cam, bird = null) {
    const P = this.P, K = this.K;
    let n = 0;
    let vis = 0;
    const far = FOOD.viewFar;
    const cp = cam ? cam.position : null;
    const fwd = this._f || (this._f = new THREE.Vector3());
    if (cam) cam.getWorldDirection(fwd);
    const cosHalf = cam ? Math.cos(((cam.fov * Math.max(1, cam.aspect)) / 2 + 6) * (Math.PI / 180)) : 0;
    for (const it of this.items) {
      if (it.got && it.eatT > FOOD.eatT) continue;
      let a = 1;
      if (cp) {
        const dx = it.W.x - cp.x, dy = it.W.y - cp.y, dz = it.W.z - cp.z;
        const d = Math.hypot(dx, dy, dz);
        if (d > far) continue;
        a = Math.min(1, (far - d) / 15);
        const dot = (dx * fwd.x + dy * fwd.y + dz * fwd.z) / Math.max(1e-6, d);
        if (dot < 0) continue;
        if (dot > cosHalf && a > 0.3) vis++;
      }
      if (n >= this.max) break;
      const o = n * 4;
      const hp = it.type === 'hp';
      const size = hp ? FOOD.kinds[it.model].size * FOOD.hp.ring : FOOD.roll.size;
      // 11차 먹힘: 0.12초 동안 1.3배로 커지며(앞 60%) 터져 사라짐(뒤 40%, 반짝 입자는 게임이 뿌림)
      const ep = it.eatT >= 0 ? Math.min(1, it.eatT / FOOD.eatT) : 0;
      const grow = 1 + (FOOD.eatGrow - 1) * Math.min(1, ep / 0.6);
      const fade = ep > 0.6 ? Math.max(0, 1 - (ep - 0.6) / 0.4) : 1;
      P[o] = it.W.x; P[o + 1] = it.W.y; P[o + 2] = it.W.z; P[o + 3] = size;
      K[o] = hp ? 4 + KINDS.indexOf(it.model) : FEATHER; K[o + 1] = it.ph; K[o + 2] = a * fade; K[o + 3] = grow;
      n++;
    }
    if (bird && this.fx) {
      const RG = FOOD.fx.ring;
      for (const f of this.fx) {
        if (n >= this.max) break;
        const k = Math.min(1, f.t / RG.t);
        const r = RG.r * (1 - (1 - k) * (1 - k)); // 빨리 퍼지고 천천히 멈춤
        const half = r + RG.w;
        const o = n * 4;
        P[o] = bird.pos.x; P[o + 1] = bird.pos.y; P[o + 2] = bird.pos.z; P[o + 3] = half * 2;
        K[o] = 9 + f.col; K[o + 1] = r / half; K[o + 2] = (1 - k) * (1 - 0.3 * k); K[o + 3] = (RG.w * 0.5) / half;
        n++;
      }
    }
    this.visible = vis;
    this.log.maxVisible = Math.max(this.log.maxVisible, vis);
    const g = this.mesh.geometry;
    g.instanceCount = n;
    for (const at of [this.aP, this.aK]) {
      at.clearUpdateRanges();
      if (n) at.addUpdateRange(0, n * 4);
      at.needsUpdate = true;
    }
  }
}
