// 위협 불꽃(12차): 판정과 그림을 떼어 놓았다.
// - 판정: 껍질 하나 = 위험 띠(r_in ~ r_out) 또는 위험 원판(0 ~ r_out). 새가 폭발 면을 지나는 순간 ± 0.07초(choreo.js 와 같은 식, bandClear).
// - 그림(StarRenderer): 그 띠 안에서 사실적으로 — 가는 별 수백 개(층화 각도·속도 흔들림 ±2%·깊이 흔들림), 머리(처음 0.12초 흰빛 → 색),
//   지나온 자취를 따라 휘는 리본 꼬리(폭 0.05 → 0.01m, 밝기는 머리에서 지수로 줄고 바닥 0.35, 끝 r_in 에 주황·적갈 변색 점), 15% 반짝임, 처짐.
//   판정 시간 동안 띠 밖(r_out + 0.1m 너머)과 구멍 안(r_in − 0.05m 안)에는 그림이 없다 → 「보이는 범위 = 판정」.
// - 판정 뒤(지남 + 0.3초): 처짐 g 2~3m/s², 반짝이며 사라짐, 버드나무 흘러내림, 4갈래 딱총, 타닥 크래클, 연기(입자, 판정 0).
// - 일생: 발사(폭발 1.0/0.95/0.9초 전) → 0.1초 뒤 범위 원(omens.js) → 폭발 0.45초 전 알 → 폭발 → 새 도착(+0.5/0.45/0.4초).
// - 지나간 불꽃: 「새」가 면을 지나고 0.1초 뒤부터 0.25초 동안 25% 로. 카메라 10m 안 별은 밝기 ×0.5, 화면 크기 상한.
import * as THREE from 'three';
import { BURST, BAND, COURSE, ROLL, OMEN, SCORING, DAMAGE, THREAT, TIMING } from './config.js';
import { ParticleSystem, FLAG_FLICKER, FLAG_TAIL, FLAG_TRAIL, emitGlitter } from './particles.js';
import { Omens } from './omens.js';
import { CGRID, safeGrid, sideMargin, pathOfOne, clrRho, dropJ } from './choreo.js';

const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const DEG = Math.PI / 180;
const E = COURSE.ellipse;

function segDist(px, py, pz, ax, ay, az, bx, by, bz) {
  const dx = bx - ax, dy = by - ay, dz = bz - az;
  const L2 = dx * dx + dy * dy + dz * dz;
  let t = L2 > 1e-9 ? ((px - ax) * dx + (py - ay) * dy + (pz - az) * dz) / L2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const qx = ax + dx * t - px, qy = ay + dy * t - py, qz = az + dz * t - pz;
  return Math.sqrt(qx * qx + qy * qy + qz * qz);
}

// ---------- 12차 별 그리기(인스턴스 한 번 = 그리기 호출 1): 머리 점 + 지나온 자취 리본 꼬리 + 꼬리 끝 변색 점 ----------
// 별 i: 머리 반경 r(t) = R(1 − e^(−k·t)), 꼬리 끝 = r × endR. 자취 위 반경 r' 의 점 = 원점 + 방향 × r' − 처짐.
//   처짐 = 판정 처짐 ½·1.0·age²(띠 전체 같은 값, 곧은 꼬리) + 판정 뒤 처짐 ½·g·(t' − tDrop)²(그 점을 지난 시각 t' 기준 — 꼬리가 휜다)
const SEG = 3;
const LK = BURST.look;
const STAR_VERT = /* glsl */ `
attribute vec4 aO;  // 원점 xyz(세계), R(머리 반경 상한)
attribute vec4 aD;  // 방향 xyz(세계, 깊이 흔들림 포함), k
attribute vec4 aP;  // 나이, 꼬리 끝 비율 endR, 머리 코어 반지름(m), 꼬리 폭(머리 쪽, m)
attribute vec4 aC;  // 머리 색 rgb(HDR), 불투명도
attribute vec4 aE;  // 꼬리 끝 점 색 rgb, 끝 점 밝기(0 = 없음)
attribute vec4 aG;  // 판정 처짐(m), 판정 뒤 처짐 가속, 판정 뒤 처짐 시작 나이, 꼬리 밝기 반감 길이(m)
attribute vec4 aF;  // 반짝임 Hz(0 = 없음), 위상, 꼬리 밝기 바닥, 꼬리 폭(끝 쪽, m)
attribute vec3 aQ;  // 꼬리 색 rgb(HDR, 흰빛 시작 없이 그 불꽃 색)
uniform float uScale;
uniform vec2 uViewport;
uniform float uMaxPx;
uniform vec3 uNear;
uniform vec4 uNearCam;
varying vec3 vC;
varying vec3 vT;
varying vec3 vQ;
varying float vA;
varying vec2 vP;
varying float vS;
varying float vMode;
varying float vW;
varying float vL;
varying vec4 vF;
varying float vHalf;
vec3 posAtR(float r) {
  float x = clamp(r / max(aO.w, 1e-3), 0.0, 0.999);
  float tp = -log(1.0 - x) / max(aD.w, 1e-3);
  float q = max(0.0, tp - aG.z);
  return aO.xyz + aD.xyz * r - vec3(0.0, aG.x + 0.5 * aG.y * q * q, 0.0);
}
void main() {
  float age = aP.x;
  float rH = aO.w * (1.0 - exp(-aD.w * age));
  float rE = rH * aP.y;
  vec3 H = posAtR(rH);
  vec4 mvH = modelViewMatrix * vec4(H, 1.0);
  float depth = -mvH.z;
  if (depth < 0.3 || aC.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 hv = uViewport * 0.5;
  float a = aC.a * mix(uNear.z, 1.0, smoothstep(uNear.x, uNear.y, depth)); // 카메라 1.5~4.5m 안 별은 빨리 옅게
  a *= mix(uNearCam.z, 1.0, smoothstep(uNearCam.x, uNearCam.y, depth)); // 카메라 10m 안 별 밝기 ×0.5
  vC = aC.rgb;
  vT = aE.rgb;
  vQ = aQ;
  vF = aF;
  vHalf = aG.w;
  vL = rH - rE;
  vW = 0.0;
  vS = 0.0;
  if (position.z > 0.5) {
    // 머리(1) · 꼬리 끝 점(2): 화면을 보는 둥근 점
    bool tip = position.z > 1.5;
    if (tip && (aE.w <= 0.0 || vL < 0.02)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    vec3 Pp = tip ? posAtR(rE) : H;
    vec4 mv = modelViewMatrix * vec4(Pp, 1.0);
    float d = max(0.3, -mv.z);
    float rad = tip ? 0.035 : aP.z;
    float ext = tip ? 1.6 : 2.2;
    float px = rad * uScale / d;
    if (d < uNearCam.y && px > uNearCam.w * 0.5) px = uNearCam.w * 0.5;
    if (px < 0.9) { a *= px * px / 0.81; px = 0.9; }
    px = min(px, uMaxPx);
    vec4 c = projectionMatrix * mv;
    c.xy += position.xy * ext * px / hv * c.w;
    gl_Position = c;
    vP = position.xy * ext;
    vMode = tip ? 2.0 : 1.0;
    vA = a * (tip ? aE.w : 1.0);
    return;
  }
  // 리본 꼬리: position.x = 0(머리) ~ 1(끝), position.y = ±1
  if (vL < 0.01) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float s = position.x;
  float r = rH - s * vL;
  float e = max(0.02, vL * 0.08);
  vec3 p = posAtR(r);
  vec3 pa = posAtR(min(rH, r + e));
  vec3 pb = posAtR(max(rE, r - e));
  vec4 m1 = modelViewMatrix * vec4(p, 1.0);
  vec4 ma = modelViewMatrix * vec4(pa, 1.0);
  vec4 mb = modelViewMatrix * vec4(pb, 1.0);
  if (-m1.z < 0.3) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (-ma.z < 0.3) ma = m1;
  if (-mb.z < 0.3) mb = m1;
  vec4 c1 = projectionMatrix * m1;
  vec4 ca = projectionMatrix * ma;
  vec4 cb = projectionMatrix * mb;
  vec2 sa = ca.xy / ca.w * hv, sb = cb.xy / cb.w * hv;
  vec2 dd = sb - sa;
  float dl = length(dd);
  vec2 dir = dl > 0.001 ? dd / dl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float wpx = mix(aP.w, aF.w, s) * uScale / max(0.3, -m1.z);
  float aw = 1.0;
  if (wpx < 1.1) { aw = wpx / 1.1; wpx = 1.1; }
  float hw = wpx * 0.5 + 0.7; // 가장자리 부드럽게 0.7px
  vec2 sc = c1.xy / c1.w * hv + nrm * position.y * hw;
  gl_Position = vec4(sc / hv * c1.w, c1.z, c1.w);
  vP = vec2(0.0, position.y * hw);
  vW = wpx * 0.5;
  vS = s;
  vMode = 0.0;
  vA = a * aw;
}
`;
const STAR_FRAG = /* glsl */ `
uniform float uTime;
varying vec3 vC;
varying vec3 vT;
varying vec3 vQ;
varying float vA;
varying vec2 vP;
varying float vS;
varying float vMode;
varying float vW;
varying float vL;
varying vec4 vF;
varying float vHalf;
void main() {
  vec3 col;
  if (vMode > 1.5) {
    // 꼬리 끝 변색 점(구멍 경계를 선으로)
    float q = length(vP);
    float I = 1.0 - smoothstep(0.65, 1.35, q);
    if (I <= 0.0) discard;
    col = vT * I;
  } else if (vMode > 0.5) {
    // 머리: 가우스 빛(코어 반지름 1 에서 0.08) + 가운데 작은 뜨거운 점
    float q = length(vP);
    if (q > 2.2) discard;
    float I = exp(-2.5 * q * q) + 0.3 * (1.0 - smoothstep(0.0, 0.55, q));
    col = vC * I;
  } else {
    // 꼬리: 머리에서 멀어질수록 지수로 옅어짐(반감 길이 vHalf, 바닥 vF.z), 끝으로 갈수록 끝 색, 15% 는 반짝임
    float e = abs(vP.y);
    float prof = 1.0 - smoothstep(max(0.0, vW - 0.5), vW + 0.7, e);
    if (prof <= 0.0) discard;
    float d = vS * vL;
    float b = max(exp2(-d / max(vHalf, 0.01)), vF.z);
    if (vF.x > 0.0) b *= 0.45 + 0.55 * step(0.4, fract(sin(floor(vS * 16.0) * 12.9898 + vF.y) * 43758.5453 + uTime * vF.x));
    float hm = max(vQ.r, max(vQ.g, vQ.b));
    vec3 cc = mix(vQ, mix(vQ, vT * hm, 0.5) * 0.8, smoothstep(0.6, 1.0, vS));
    col = cc * b * (0.3 + 0.45 * exp2(-d / max(vHalf * 0.5, 0.01))) * prof; // 머리 쪽은 더 밝고 굵어 보이게(끝으로 갈수록 가는 실)
  }
  gl_FragColor = vec4(col, vA);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

class StarRenderer {
  constructor(max) {
    this.max = max;
    this.n = 0;
    this.A = {};
    const g = new THREE.InstancedBufferGeometry();
    const pos = [];
    for (let j = 0; j <= SEG; j++) pos.push(j / SEG, -1, 0, j / SEG, 1, 0);
    const hq = pos.length / 3;
    pos.push(-1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1);
    const tq = pos.length / 3;
    pos.push(-1, -1, 2, 1, -1, 2, -1, 1, 2, 1, 1, 2);
    const idx = [];
    for (let j = 0; j < SEG; j++) { const a = 2 * j; idx.push(a, a + 1, a + 2, a + 2, a + 1, a + 3); }
    idx.push(hq, hq + 1, hq + 2, hq + 2, hq + 1, hq + 3);
    idx.push(tq, tq + 1, tq + 2, tq + 2, tq + 1, tq + 3);
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    g.setIndex(idx);
    this.attrs = [];
    for (const name of ['aO', 'aD', 'aP', 'aC', 'aE', 'aG', 'aF']) {
      const arr = new Float32Array(max * 4);
      this.A[name] = arr;
      const at = new THREE.InstancedBufferAttribute(arr, 4).setUsage(THREE.DynamicDrawUsage);
      g.setAttribute(name, at);
      this.attrs.push(at);
    }
    this.A.aQ = new Float32Array(max * 3);
    const aq = new THREE.InstancedBufferAttribute(this.A.aQ, 3).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aQ', aq);
    this.attrs.push(aq);
    g.instanceCount = 0;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: {
        uScale: { value: 500 }, uViewport: { value: new THREE.Vector2(1280, 720) }, uMaxPx: { value: 60 }, uNear: { value: new THREE.Vector3(1.5, 4.5, 0.05) }, uNearCam: { value: new THREE.Vector4(8, 10, 0.5, 30) },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide, // 리본 방향(감김)이 화면에서 바뀌어도 그린다
      blending: THREE.AdditiveBlending,
    });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 8;
    this.isDebug = new Uint8Array(max);
  }

  begin(now = 0) {
    this.n = 0;
    this.material.uniforms.uTime.value = now;
  }

  // 별 하나: 원점 o(세계)·방향 d(세계)·R·k·나이 age·꼬리 끝 비율·머리 반지름·꼬리 폭(머리/끝)·머리 색(HDR)·불투명도·끝 점 색·끝 점 밝기·판정 처짐·판정 뒤 가속·뒤 처짐 시작·반감 길이·반짝임 Hz·위상·바닥
  push(ox, oy, oz, dx, dy, dz, R, k, age, endR, hr, tw0, tw1, cr, cg, cb, a, er, eg, eb, ea, dropJudge, gA, tDrop, half, spk, ph, floor, qr = cr, qg = cg, qb = cb) {
    if (this.n >= this.max) { this.over = (this.over || 0) + 1; return -1; }
    const i = this.n++;
    const o = i * 4;
    const A = this.A;
    A.aO[o] = ox; A.aO[o + 1] = oy; A.aO[o + 2] = oz; A.aO[o + 3] = R;
    A.aD[o] = dx; A.aD[o + 1] = dy; A.aD[o + 2] = dz; A.aD[o + 3] = k;
    A.aP[o] = age; A.aP[o + 1] = endR; A.aP[o + 2] = hr; A.aP[o + 3] = tw0;
    A.aC[o] = cr; A.aC[o + 1] = cg; A.aC[o + 2] = cb; A.aC[o + 3] = a;
    A.aE[o] = er; A.aE[o + 1] = eg; A.aE[o + 2] = eb; A.aE[o + 3] = ea;
    A.aG[o] = dropJudge; A.aG[o + 1] = gA; A.aG[o + 2] = tDrop; A.aG[o + 3] = half;
    A.aF[o] = spk; A.aF[o + 1] = ph; A.aF[o + 2] = floor; A.aF[o + 3] = tw1;
    const q3 = i * 3;
    A.aQ[q3] = qr; A.aQ[q3 + 1] = qg; A.aQ[q3 + 2] = qb;
    this.isDebug[i] = 0;
    return i;
  }

  // 점 하나(점검·디버그): 위치 x,y,z, 반지름, 색
  dot(x, y, z, size, r, g, b, a = 1) {
    const i = this.push(x, y, z, 0, 0, 0, 1, 10, 1, 1, size, 0, 0, r, g, b, a, 0, 0, 0, 0, 0, 0, 99, 1, 0, 0, 0);
    if (i >= 0) this.isDebug[i] = 1;
    return i;
  }

  end() {
    const g = this.mesh.geometry;
    g.instanceCount = this.n;
    for (const a of this.attrs) {
      a.clearUpdateRanges();
      if (this.n) a.addUpdateRange(0, this.n * a.itemSize);
      a.needsUpdate = true;
    }
  }
}

// 장식용 난수(Math.random 과 따로 — 그림이 판정·봇의 난수 흐름을 바꾸지 않게)
let _ds = 0x9e3779b9;
const drand = () => {
  _ds ^= _ds << 13; _ds >>>= 0;
  _ds ^= _ds >>> 17;
  _ds ^= _ds << 5; _ds >>>= 0;
  return _ds / 4294967296;
};
const dr = (a, b) => a + drand() * (b - a);
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export class Bursts {
  constructor(scene, lights) {
    this.root = new THREE.Group();
    scene.add(this.root);
    this.lights = lights;
    this.list = []; // 별 껍질(발사 ~ 사라짐)
    this.events = []; // 웨이브
    this.nextId = 1;
    this.course = null;
    this.world = null;
    this.debug = false;
    this.stars = new StarRenderer(7000);
    this.root.add(this.stars.mesh);
    this.sparks = new ParticleSystem(THREAT.pool, { kind: 'spark' }); // 10차: 위협 장식 풀(게임에서는 장식 불꽃 입자계와 함께 씀 — useSparks)
    this.sparks.mesh.renderOrder = 7;
    this.root.add(this.sparks.mesh);
    this.omens = new Omens();
    this.omens.dropAt = (sh, age) => Bursts.dropAt(sh, age);
    this.overlay = this.omens.scene;
    this.emitMult = 1;
    this.shadowOn = false;
    this._c = [0, 0, 0];
    this._dbgSafe = new Uint8Array(CGRID.NC);
    this.resetLog();
  }

  resetLog() {
    this.log = { gen: [], fails: 0, hits: 0, judgeMs: [], judgeSegs: 0, visOutHits: 0, hitDist: [], maxActive: 0, arrive: [], eggGap: [], timing: 0, plan: null, maxJudging: 0, burstT: [], burstLate: [], hitPart: [], headMin: Infinity, decorMax: 0, decorN: 0, decorRej: 0, embersN: 0, embersCut: 0, decorSafe: 0, decorMoved: 0, decorChecked: 0 };
    if (this.omens) this.omens.resetStats();
  }

  setStage(stage, course, world = null) {
    this.stage = stage;
    this.course = course;
    this.world = world;
    this.reset();
  }

  reset() {
    this.list.length = 0;
    this.events.length = 0;
    if (!this.sharedSparks) this.sparks.clear();
    this.stars.begin();
    this.stars.end();
    if (this.omens) this.omens.update([], 0, null);
    if (this.lights) this.lights.releaseHeld();
  }

  setLowSpec(low, mult) {
    this.emitMult = low ? mult : 1;
    if (!this.sharedSparks) this.sparks.limit = Math.floor(THREAT.pool * this.emitMult);
  }

  // 8차: 불티 입자를 장식 불꽃 입자계와 같이 쓴다(그리기 호출 −1). 갱신·크기는 그쪽이 한다
  useSparks(ps) {
    this.root.remove(this.sparks.mesh);
    this.sparks = ps;
    this.sharedSparks = true;
  }

  setPointScale(v, vw, vh, maxPx) {
    if (!this.sharedSparks) {
      this.sparks.setScale(v, vw, vh);
      this.sparks.setScaleMax(maxPx);
    }
    const u = this.stars.material.uniforms;
    u.uScale.value = v;
    u.uViewport.value.set(vw, vh);
    u.uMaxPx.value = 60 * (vh / 1080);
    const N = BURST.nearCam;
    u.uNearCam.value.set(N.from, N.dist, N.mult, (N.capM * v) / N.dist);
    this.omens.setScale(v, vh, vw);
  }

  static rb(bird) {
    return bird.radius * BURST.birdHitMult;
  }

  // ======================= 별 위치 식(그림·장식·점검이 같이 쓴다) =======================
  // 별 i 의 머리 H 와 꼬리 끝 T(지역 좌표 x 앞 · y 오른쪽 · z 위). 살아 있으면 u(나이 ÷ 수명), 아니면 −1. 처짐은 띠 전체 같은 값
  static starAt(sh, i, t, H, T, o) {
    const L = sh.life[i];
    if (t < 0 || t >= L) return -1;
    const r = sh.spd[i] * (1 - Math.exp(-sh.k * t));
    const re = r * sh.endR[i];
    const i3 = i * 3;
    const dx = sh.dir[i3], dy = sh.dir[i3 + 1], dz = sh.dir[i3 + 2];
    const drop = Bursts.dropAt(sh, t);
    H[o] = sh.ox + dx * r; H[o + 1] = sh.oy + dy * r; H[o + 2] = sh.oz + dz * r - drop;
    T[o] = sh.ox + dx * re; T[o + 1] = sh.oy + dy * re; T[o + 2] = sh.oz + dz * re - drop;
    return t / L;
  }

  // 11차 C: 색 이름의 색상을 상대 휘도 BURST.colorLum 에 맞춘 HDR 줄기 색
  static lumColor(c) {
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    const k = BURST.colorLum / Math.max(1e-6, L);
    return [c[0] * k, c[1] * k, c[2] * k];
  }

  // 12차 처짐: 띠 전체가 함께 내려간다. 판정 시간 동안 ½·1.0·t²(choreo.dropJ), 판정이 끝난 뒤(tDrop)부터 ½·g·q² 를 더한다(g 2~3m/s²)
  static dropAt(sh, t) {
    const q = t - sh.tDrop;
    return dropJ(t) + (q > 0 ? 0.5 * sh.gAfter * q * q : 0);
  }

  // 12차 판정: 나이 age 의 띠(r_in·f ~ r_out·f, 중심 − 처짐)와 점 p(지역, x 앞 · y 오른쪽 · z 위)의 여유(음수 = 맞음). 깊이(x)는 _judge 가 ± 0.07초 창으로 거른다
  static bandClear(sh, age, px, py, pz, rb) {
    if (age < 0) return Infinity;
    const f = (1 - Math.exp(-sh.k * age)) / sh.ex;
    const dy = py - sh.oy, dz = pz - (sh.oz - Bursts.dropAt(sh, age));
    return clrRho(sh.shape, sh.rin * f, sh.rout * f, Math.sqrt(dy * dy + dz * dz), rb);
  }
  static stemClear(sh, age, px, py, pz, rb) {
    return Bursts.bandClear(sh, age, px, py, pz, rb);
  }


  // 12차: 새가 띠 껍질의 구멍(r_in) 안에 있고 그 면을 지나기 ± 0.2초면 true(날개 접기)
  foldWanted(bird) {
    const l = this._lf || (this._lf = [0, 0, 0]);
    for (const sh of this.list) {
      if (sh.shape !== 'band' || !sh.egg) continue;
      const tt = (sh.s - bird.s) / bird.forward;
      if (Math.abs(tt) > BAND.foldWin) continue;
      Bursts.toL(sh, bird.pos, l);
      if (Math.hypot(l[1] - sh.oy, l[2] - (sh.oz - sh.egg.drop)) < sh.rin) return true;
    }
    return false;
  }

  // 9차: 이 껍질이 지금 판정하는가 — 폭발 ~ 새가 면을 지난 시각(아직이면 예정 시각) + 0.3초
  static judging(sh, now) {
    return sh.burst && now <= (sh.crossT !== undefined ? sh.crossT : sh.tMeet) + BURST.judgeAfter;
  }

  // 지역 → 세계
  // 11차: 지역 좌표의 앞(x)은 통로 경사를 따른다(높이 = z + 경사 × x) — 오르막·내리막에서도 새가 면을 곧게 지나 판정이 평면 거리와 같다
  static toW(sh, x, y, z, out) {
    out.x = sh.Cw.x + sh.F.x * x + sh.R.x * y;
    out.y = sh.Cw.y + z + (sh.slope || 0) * x;
    out.z = sh.Cw.z + sh.F.z * x + sh.R.z * y;
    return out;
  }

  // 세계 점 → 그 껍질의 지역 좌표
  static toL(sh, P, out) {
    const dx = P.x - sh.Cw.x, dy = P.y - sh.Cw.y, dz = P.z - sh.Cw.z;
    out[0] = dx * sh.F.x + dz * sh.F.z;
    out[1] = dx * sh.R.x + dz * sh.R.z;
    out[2] = dy - (sh.slope || 0) * out[0];
    return out;
  }

  // ======================= 미리 짠 안무 넣기(플레이 시작 때 한 번) =======================
  // plan: choreo.planStage 결과, tStart: 플레이 시작(경과 0) 게임 시각
  loadPlan(plan, tStart, bird) {
    this.reset();
    this.plan = plan;
    this.birdSpec = bird.spec;
    this.log.plan = { seed: plan.seed, ms: +plan.ms.toFixed(1), waves: plan.waves.length, fails: plan.log.fails, relaxed: plan.log.relaxed, losFail: plan.log.losFail };
    this.log.fails = plan.log.fails;
    const f = bird.forward;
    for (const w of plan.waves) {
      const tq = tStart + w.tq;
      const ev = {
        id: this.nextId++, type: w.pat, wave: w, bird_r: bird.radius, s: w.s, tq, tqE: w.tq, meetT: tStart + w.tPass, meetE: w.tPass, passE: w.tPass, finale: w.kind === 'finale',
        layers: [], shells: [], ready: true, res: null, hit: false, minClear: Infinity, centered: false, hasRing: false, target: w.target, P: w.P,
      };
      const L = { kind: 'mix', meetT: ev.meetT, tBurst: tq, shells: [], target: w.target, s: w.s };
      let ext = 0;
      for (const e of w.eggs) {
        const tm = tStart + e.tm;
        // 12차 시각: 발사(tq − 1.0/0.95/0.9) → 범위 원(발사 + 0.1, 정보) → 알(폭발 − 0.45) → 쾅 → 도착(tq + lead)
        const pseudo = { tLaunch: tStart + e.launch, tBurst: tq, meetT: tm, s: e.s };
        const sh = this._shell(e.kind, pseudo, e.u, e.w, e);
        sh.ev = ev;
        sh.egg = e;
        sh.rPassPlan = e.rout;
        sh.rPass = e.rout;
        sh.tInfo = tStart + e.info;
        sh.tOpen = tStart + e.egg;
        sh.emberPh = Math.random() * 6.28;
        L.shells.push(sh);
        ev.shells.push(sh);
        this.list.push(sh);
        if (e.shape === 'band') ev.hasRing = true; // 구멍(센터)이 있는 알
        ext = Math.max(ext, 0.5);
      }
      L.winStart = tq;
      L.winEnd = (L.shells.length ? Math.max(...L.shells.map((q) => q.tMeet)) : ev.meetT) + (ext + bird.radius + 0.6) / f;
      ev.layers.push(L);
      if (ev.shells.length) ev.shells[0].light = true; // 점광원은 웨이브마다 하나
      this.events.push(ev);
      this.log.gen.push({ id: ev.id, i: w.i, pat: w.pat, tq: +w.tq.toFixed(2), n: w.eggs.length, ratio: w.ratio !== undefined ? +w.ratio.toFixed(3) : null, need: w.need !== undefined ? +w.need.toFixed(2) : null, reach: +w.reach.toFixed(2), worst: w.worst !== undefined ? +w.worst.toFixed(2) : null, T: +w.T.toFixed(2), kind: w.kind, failed: !!w.failed, relaxed: !!w.relaxed, los: !w.losFail });
    }
  }

  // ---------- 껍질 하나 만들기(12차: 판정 띠 = 안무 알 egg, 그림 = 그 띠 안의 별 수백 개) ----------
  // L: { tLaunch, tBurst, meetT(새 도착), s(깊이) }, uc·wcMeet: 폭발 중심(통로 좌표)
  _shell(kind, L, uc, wcMeet, egg) {
    const K = BURST[kind];
    const C = this.course;
    const sh = {
      id: this.nextId++, kind, K, tLaunch: L.tLaunch, tBurst: L.tBurst, tMeet: L.meetT, s: L.s,
      launched: false, opened: false, burst: false, res: null, dim: 1, camPassed: -1, color: [2, 1.3, 0.5],
      k: egg.k, droop: BAND.gJudge, ox: 0, oy: 0, oz: 0, dimUntil: -99,
    };
    sh.uc = uc;
    sh.wc = wcMeet;
    const p = C.at(sh.s, {});
    sh.F = { x: Math.sin(p.th), z: -Math.cos(p.th) };
    sh.R = { x: Math.cos(p.th), z: Math.sin(p.th) };
    sh.Cw = C.toWorld(sh.s, uc, C.center(sh.s) + sh.wc, new THREE.Vector3());
    sh.slope = C.slope(sh.s);
    sh.R0 = egg.R;
    // 판정 띠(choreo 알과 같은 값)
    sh.shape = egg.shape;
    sh.rin = egg.rin;
    sh.rout = egg.rout;
    sh.ex = egg.ex;
    sh.lead = egg.lead;
    sh.rp = egg.rout;
    sh.lam = egg.shape === 'band' ? 1 - egg.rin / egg.rout : 1;
    sh.hole = egg.shape === 'band';
    sh.tDrop = sh.tMeet - sh.tBurst + BURST.judgeAfter;
    sh.gAfter = dr(BAND.gAfter[0], BAND.gAfter[1]) * (K.look === 'willow' ? 1.25 : 1);
    sh.look = K.look;
    sh.dense = K.look === "peony" ? 0.55 : K.look === "dahlia" ? 0.8 : 1; // 촘촘한 모란은 겹쳐 흰 원판이 되지 않게 어둡게
    // ---- 별 목록 ----
    const ex = egg.ex;
    const rings = []; // [별 수, 종류: 'band'(띠 별) | 'sphere'(구면 투영 점별), 반경, 꼬리 끝 반경]
    // 바깥 테 별(층화 각도 ± angJit 칸): 이웃 간격 ≤ (1 + 2·angJit) × 칸 ≤ 0.2m 가 되는 수 이상. 넓은 띠는 안쪽 머리 별(30%)을 따로 더한다
    const minN = Math.ceil((2 * Math.PI * egg.rout * (1 + 2 * LK.angJit)) / (LK.starGap * 0.97));
    const inner = (rim, rEnd) => (egg.rout - rEnd > 1.2 ? Math.round((rim * LK.inner.frac) / (1 - LK.inner.frac)) : 0);
    if (K.look === 'peony') rings.push([randi(K.stars[0], K.stars[1]), 'sphere', egg.rout, 0]);
    else {
      const rEnd = K.look === 'dahlia' ? K.core.r - 0.1 : egg.rin;
      const rim = Math.max(randi(K.stars[0], K.stars[1]), minN);
      rings.push([rim, 'band', egg.rout, rEnd]);
      const ni = inner(rim, rEnd);
      if (ni) rings.push([ni, 'inner', egg.rout, rEnd]);
      if (K.look === 'dahlia') rings.push([K.core.n, 'sphere', K.core.r, 0]);
    }
    let n = 0;
    for (const r of rings) n += r[0];
    sh.n = n;
    sh.nOuter = rings[0][0];
    this._alloc(sh, n);
    const willow = K.look === 'willow';
    let i = 0;
    for (const [cnt, typ, Rr, rEnd] of rings) {
      const th0 = dr(0, Math.PI * 2);
      const step = (Math.PI * 2) / cnt;
      for (let q = 0; q < cnt; q++, i++) {
        const a = th0 + (q + 0.5 + dr(-LK.angJit, LK.angJit)) * step; // 층화 각도 + 흔들림 ±0.4칸
        const hr = willow ? dr(0.11, 0.14) : typ === 'sphere' ? dr(0.07, 0.1) : dr(LK.head[0], LK.head[1]);
        let rh, endR, depth, half, floor, tw0, tw1, tip, spk;
        if (typ === 'band' || typ === 'inner') {
          rh = (Rr - 0.5 * hr) * (typ === 'inner' ? dr(LK.inner.j[0], LK.inner.j[1]) : dr(1 - 2 * LK.spdJit, 1)); // 속도 흔들림 −2%~0(머리 바깥 끝이 r_out 을 넘지 않게) · 안쪽 머리 별
          // 35% 는 꼬리가 띠 중간에서 끝남(길이가 제각각인 진짜 국화) — 나머지 65% 가 r_in 의 끝 점 테를 만든다
          const shortT = rEnd > 0.5 && Rr - rEnd > 1.2 && drand() < 0.35;
          endR = Math.min(0.98, (shortT ? rEnd + dr(0.25, 0.6) * (rh - rEnd) : Math.max(0, rEnd)) / rh);
          depth = dr(0, LK.depthJit); // 깊이 흔들림 0~+0.25m(카메라 반대쪽 — 화면에서 바깥 테가 커 보이지 않게)
          half = Math.max(0.15, (rh - rEnd) * LK.tailHalf);
          floor = LK.tailFloor;
          tw0 = willow ? 0.075 : LK.tailW[0];
          tw1 = willow ? 0.022 : LK.tailW[1];
          tip = shortT ? 0 : 1;
        } else {
          // 구면 투영: 3D 방향 고르게 → 면 위 반경 = R·√(1 − z²)(가장자리가 촘촘한 진짜 모란), 깊이 = z × 0.25
          const z = dr(-1, 1);
          const qq = Math.sqrt(Math.max(0, 1 - z * z));
          rh = Math.max(0.05, qq * (Rr - 0.5 * hr) * dr(0.97, 1));
          const Lt = Math.min(0.35, rh * 0.45);
          endR = Math.max(0, 1 - Lt / rh);
          depth = z * LK.depthJit;
          half = 0.12;
          floor = 0;
          tw0 = 0.035;
          tw1 = 0.01;
          tip = 0;
        }
        sh.dir[i * 3] = depth / Math.max(0.3, rh);
        sh.dir[i * 3 + 1] = Math.cos(a);
        sh.dir[i * 3 + 2] = Math.sin(a);
        sh.spd[i] = rh / ex;
        sh.endR[i] = endR;
        sh.hr[i] = hr;
        sh.half[i] = half;
        sh.floor[i] = floor;
        sh.tw0[i] = tw0;
        sh.tw1[i] = tw1;
        sh.tip[i] = tip;
        sh.spk[i] = drand() < LK.sparkle.frac ? dr(LK.sparkle.hz[0], LK.sparkle.hz[1]) : 0;
        sh.life[i] = dr(K.life[0], K.life[1]);
        sh.size[i] = hr;
        sh.core[i] = typ === 'sphere' && rings.length > 1 ? 1 : 0;
        sh.ph[i] = dr(0, 6.28);
      }
    }
    // 색: 위협 8색 중 하나(상대 휘도를 금색과 같게) × HDR 1.8~2.2. 30% 는 날아가며 다른 색으로 바뀐다(2색). 버드나무는 금빛
    const pal = Object.keys(BURST.colors).filter((c) => !BURST.colorDrop.includes(c));
    sh.colName = willow ? 'gold' : pal[Math.floor(dr(0, pal.length)) % pal.length];
    sh.hdr = willow ? 1.7 : dr(LK.hdr[0], LK.hdr[1]);
    sh.color = Bursts.lumColor(BURST.colors[sh.colName]);
    if (!willow && drand() < BURST.twoTone) {
      let c2 = pal[Math.floor(dr(0, pal.length)) % pal.length];
      if (c2 === sh.colName) c2 = pal[(pal.indexOf(c2) + 1 + Math.floor(dr(0, pal.length - 1))) % pal.length];
      sh.colName2 = c2;
      sh.color2 = Bursts.lumColor(BURST.colors[c2]);
    }
    sh.eggCol = BURST.colors[sh.colName];
    sh.after = willow ? 'willow' : BURST.after[Math.floor(dr(0, BURST.after.length)) % BURST.after.length];
    if (this.forceColor) { sh.colName = this.forceColor; sh.color = Bursts.lumColor(BURST.colors[sh.colName]); sh.color2 = null; sh.eggCol = BURST.colors[sh.colName]; } // 점검용(8색 캡처)
    return sh;
  }

  _alloc(sh, n) {
    sh.dir = new Float32Array(n * 3);
    sh.spd = new Float32Array(n);
    sh.endR = new Float32Array(n);
    sh.hr = new Float32Array(n);
    sh.half = new Float32Array(n);
    sh.floor = new Float32Array(n);
    sh.tw0 = new Float32Array(n);
    sh.tw1 = new Float32Array(n);
    sh.tip = new Uint8Array(n);
    sh.spk = new Float32Array(n);
    sh.life = new Float32Array(n);
    sh.size = new Float32Array(n);
    sh.core = new Uint8Array(n);
    sh.ph = new Float32Array(n);
    sh.H = new Float32Array(n * 3);
    sh.T = new Float32Array(n * 3);
    sh.U = new Float32Array(n).fill(-1);
  }

  // 껍질 하나의 주 별 중 점 p(지역)에 가장 가까운 것까지 여유(m) = 머리 구간 거리 − 새 판정 − 별 크기 × 0.8. starAt() 과 같은 식(빠르게 펼침)
  // 껍질 하나의 점 p(지역)까지 여유(m) — 판정과 같은 줄기 캡슐 식
  static minClear(sh, age, px, py, pz, rb) {
    return Bursts.stemClear(sh, age, px, py, pz, rb);
  }

  // ======================= 매 프레임 =======================
  // out 사건: launch | open | burst | hit | perfect | dodge | center | timing | pass | graze | swish
  update(dt, now, bird, out, camPos = null, cam = null) {
    const tg0 = performance.now();
    const sp = this.sparks;
    let active = 0;
    let judging = 0;
    const up = this._up || (this._up = new THREE.Vector3());
    for (const sh of this.list) {
      if (!sh.launched && now >= sh.tLaunch) {
        sh.launched = true;
        this._launchSite(sh);
        out.push({ kind: 'launch', threat: sh, gate: sh });
      }
      if (sh.launched && !sh.opened) this._rise(sh, now, dt);
      if (sh.launched && !sh.opened && now >= sh.tOpen) {
        sh.opened = true;
        sh.eggW = sh.eggW || new THREE.Vector3();
        out.push({ kind: 'open', threat: sh });
      }
      if (sh.opened && !sh.burst) {
        // 11차: 알은 정점(폭발 중심)에 멈춰 있다(OMEN.descent 0)
        const h = OMEN.descent * Math.max(0, sh.tBurst - now);
        sh.eggW.set(sh.Cw.x, sh.Cw.y + h, sh.Cw.z);
        sh.headW.copy(sh.eggW);
      }
      if (sh.launched && !sh.burst && now >= sh.tBurst) {
        sh.burst = true;
        this.log.burstT.push(+sh.tBurst.toFixed(3));
        this.log.burstLate.push(+(now - sh.tBurst).toFixed(4));
        if (sh.eggW) this.log.eggGap.push(+(sh.eggW.distanceTo(sh.Cw)).toFixed(4));
        this._burstFx(sh);
        out.push({ kind: 'burst', threat: sh, gate: sh });
        if (this.lights && sh.light) sh.lightSlot = this.lights.hold(sh.id, sh.Cw, BURST.light.color, 0, BURST.light.radius);
      }
      if (sh.burst && !sh.done) active++;
      if (Bursts.judging(sh, now)) judging++;
      if (sh.burst && camPos && sh.camPassed < 0) {
        const dx = camPos.x - sh.Cw.x, dz = camPos.z - sh.Cw.z;
        if (dx * sh.F.x + dz * sh.F.z > 0) sh.camPassed = now;
      }
      if (sh.burst && this.lights && sh.lightSlot !== undefined && sh.lightSlot >= 0) {
        const Lc = BURST.light;
        const age = now - sh.tBurst;
        const upk = Math.min(1, age / Lc.inT);
        const dn = age < Lc.inT + Lc.holdT ? 1 : Math.max(0, 1 - (age - Lc.inT - Lc.holdT) / Lc.outT);
        this.lights.setHeld(sh.lightSlot, Lc.I * upk * dn);
        if (dn <= 0) {
          this.lights.release(sh.lightSlot);
          sh.lightSlot = -1;
        }
      }
      // 10차: 판정이 끝나면(새 통과 + 0.3초) 머리가 지나간 자리에 불티를 떨군다
      if (sh.burst && sh.tJudgeEnd === undefined && !Bursts.judging(sh, now)) sh.tJudgeEnd = now;
      // 11차: 장식은 판정이 끝나고, 그 면 앞뒤 4m 안에 판정 중인 다른 불꽃(같은 웨이브의 다른 알)이 없을 때만
      if (sh.burst && !sh.embered && sh.tJudgeEnd !== undefined && !this._judgingNear(sh, now, BURST.look.decorGap)) {
        sh.embered = true;
        this._embers(sh, now);
        out.push({ kind: 'fade', threat: sh }); // 10차: 잔광 「타닥」
      }
      if (sh.burst && now - sh.tBurst > BURST[sh.kind].life[1] + 0.1) sh.done = true;
    }
    this.log.maxActive = Math.max(this.log.maxActive, active);
    this.log.maxJudging = Math.max(this.log.maxJudging, judging);
    this._positions(now);
    this._nowCv = now;
    this._draw(now, dt);
    if (bird) this._judge(now, dt, bird, out);
    for (let i = this.list.length - 1; i >= 0; i--) {
      const sh = this.list[i];
      if (sh.done && (sh.ev.res || !bird)) {
        if (sh.lightSlot >= 0 && this.lights) this.lights.release(sh.lightSlot);
        this.list.splice(i, 1);
      }
    }
    for (let i = this.events.length - 1; i >= 0; i--) {
      const ev = this.events[i];
      if (ev.res && now > ev.meetT + 4) this.events.splice(i, 1);
    }
    if (!this.sharedSparks) sp.update(dt);
    this.omens.update(this.events, now, cam, bird);
    this.lastMs = performance.now() - tg0;
  }

  // 별 위치(지역) 계산 — 이 값을 판정과 그림이 같이 쓴다
  _positions(now) {
    for (const sh of this.list) {
      if (!sh.burst) continue;
      const age = now - sh.tBurst;
      for (let i = 0; i < sh.n; i++) sh.U[i] = Bursts.starAt(sh, i, age, sh.H, sh.T, i * 3);
    }
  }

  _judge(now, dt, bird, out) {
    const t0 = performance.now();
    const rb = Bursts.rb(bird);
    const l = this._l || (this._l = [0, 0, 0]);
    const hit = this._hit || (this._hit = { i: -1, r: 0, rh: 0 });
    let segs = 0;
    for (const ev of this.events) {
      if (!ev.ready || ev.res || !ev.layers.length) continue;
      const lastEnd = ev.layers[0].winEnd;
      if (!ev.shells.length) {
        if (now > lastEnd + 0.05) { ev.res = 'empty'; ev.reported = true; }
        continue;
      }
      for (const sh of ev.shells) {
        Bursts.toL(sh, bird.pos, l);
        // 폭발 면을 지나는 순간(새의 경로 거리가 그 깊이를 넘는 순간) — 길 분류(센터·사이·밖), 타이밍 퍼펙트
        const xs = bird.s - sh.s;
        if (sh.prevX !== undefined && sh.prevX < 0 && xs >= 0 && !sh.crossed) {
          sh.crossed = true;
          const k = sh.prevX / (sh.prevX - xs);
          const tc = now - dt + dt * k;
          sh.crossT = tc;
          this.log.arrive.push({ kind: sh.kind, d: +(sh.tBurst - tc).toFixed(4), ra: +(tc - sh.tOpen).toFixed(4), ev: ev.id, u: +bird.u.toFixed(2), w: +bird.w.toFixed(2) });
          if (sh.burst) {
            const rho = Math.hypot(l[1] - sh.oy, l[2] - sh.oz);
            sh.path = sh.egg ? pathOfOne(sh.egg, l[1] - sh.oy, l[2] - sh.oz) : 'out';
            sh.crossRho = rho;
            (ev.paths || (ev.paths = [])).push(sh.path);
            if (!ev.hit) {
              let c = Infinity;
              for (const s2 of ev.shells) {
                if (!s2.burst) continue;
                const l2 = [0, 0, 0];
                Bursts.toL(s2, bird.pos, l2);
                c = Math.min(c, Bursts.stemClear(s2, now - s2.tBurst, l2[0], l2[1], l2[2], rb));
              }
              if (c > 0 && c <= SCORING.timingR) ev.timing = true;
            }
          }
        }
        sh.prevX = xs;
        if (!sh.burst) continue;
        const judgeOn = Bursts.judging(sh, now);
        if (Math.abs(l[0]) > 3) continue;
        if (!sh.swished && l[0] > 0) {
          sh.swished = true;
          let Ls = 0, Rs = 0;
          for (let i = 0; i < sh.n; i++) {
            if (sh.U[i] < 0) continue;
            const i3 = i * 3;
            if (Math.hypot(sh.H[i3] - l[0], sh.H[i3 + 1] - l[1], sh.H[i3 + 2] - l[2]) < BURST.swish) { if (sh.H[i3 + 1] < l[1]) Ls++; else Rs++; }
          }
          if (Ls + Rs) out.push({ kind: 'swish', L: Ls, R: Rs, threat: sh });
        }
        // 12차: 폭발 면을 지나는 순간 ± 0.07초(깊이 |x| ≤ 전진 속도 × 0.07) 동안만 띠 판정
        if (!judgeOn || Math.abs(l[0]) > bird.forward * BAND.window + 1e-6) continue;
        segs++;
        const d = Bursts.bandClear(sh, now - sh.tBurst, l[0], l[1], l[2], rb);
        if (d < ev.minClear) ev.minClear = d;
        if (d < 0) { hit.i = 0; hit.rho = Math.hypot(l[1] - sh.oy, l[2] - (sh.oz - Bursts.dropAt(sh, now - sh.tBurst))); this._contact(ev, sh, 0, now, bird, out, d, l, hit); }
      }
      if (now > lastEnd + 0.05) this._finish(ev, out);
    }
    this.log.judgeSegs = Math.max(this.log.judgeSegs, segs);
    const ms = performance.now() - t0;
    if (segs > 0) {
      this.log.judgeMs.push(ms);
      if (this.log.judgeMs.length > 20000) this.log.judgeMs.shift();
    }
  }

  _contact(ev, sh, i, now, bird, out, d, l = null, hit = null) {
    if (ev.hit || ev.rolled) return;
    if (bird.rollInv > 0) {
      ev.rolled = true;
      const lead = now - bird.rollStart;
      const perfect = lead >= -1e-6 && lead <= ROLL.perfectWindow + 1 / 60;
      ev.res = perfect ? 'perfect' : 'dodge';
      this._pierce(sh, bird);
      out.push({ kind: ev.res, ev, threat: sh, gate: sh, lead, how: 'roll' });
      return;
    }
    if (bird.invuln > 0) {
      ev.immune = true;
      return;
    }
    ev.hit = true;
    ev.res = 'hit';
    // 점검: 맞은 순간 그려진 줄기·머리 캡슐 가운데 가장 가까운 것까지(그림 버퍼에서 따로 계산)
    const vd = this._visDist(bird, sh);
    const rb = Bursts.rb(bird);
    this.log.hitDist.push(+(vd).toFixed(3));
    if (vd > 1e-3) this.log.visOutHits++;
    this.log.hits++;
    // 점검(11차): 맞은 자리 — 머리에서 몇 m 안쪽인가(0 = 머리 끝), 머리 구간(0.3m)인가 줄기인가
    // 점검(12차): 맞은 자리 반경(띠 r_in ~ r_out 기준)
    if (hit) this.log.hitPart.push({ rho: +(hit.rho || 0).toFixed(3), rin: +sh.rin.toFixed(2), rout: +sh.rout.toFixed(2), kind: sh.kind, core: 0, along: 0 });
    this._pierce(sh, bird, true);
    out.push({ kind: 'hit', ev, threat: sh, gate: sh, dmg: (DAMAGE.bySize && DAMAGE.bySize[BURST[sh.kind].size]) || DAMAGE.threat, clear: d, vis: vd, rb });
  }

  // 점검: 맞은 순간 그린 띠(구멍 r_in·f − 0.05 ~ 바깥 r_out·f + 0.065)와 새 판정 구의 거리(≤ 0 이면 겹침 — 띠 판정은 늘 겹친다)
  _visDist(bird, sh = null) {
    if (!sh) return 0;
    const l = [0, 0, 0];
    Bursts.toL(sh, bird.pos, l);
    const age = this._nowCv - sh.tBurst;
    const f = (1 - Math.exp(-sh.k * age)) / sh.ex;
    const rho = Math.hypot(l[1] - sh.oy, l[2] - (sh.oz - Bursts.dropAt(sh, age)));
    const rb = Bursts.rb(bird);
    const lo = sh.shape === 'band' ? sh.rin * f - 0.05 : -1, hi = sh.rout * f + 0.065;
    if (rho + rb < lo) return lo - rho - rb;
    if (rho - rb > hi) return rho - rb - hi;
    return -Math.min(rho + rb - lo, hi - (rho - rb));
  }

  _finish(ev, out) {
    if (ev.res) {
      if (!ev.reported) ev.reported = true;
      return;
    }
    ev.reported = true;
    if (ev.minClear < Math.max(BURST.graze, 1.6 * ev.bird_r)) out.push({ kind: 'graze', ev, gap: ev.minClear });
    if (ev.timing) {
      this.log.timing++;
      out.push({ kind: 'timing', ev });
    }
    // 12차 두 길: 구멍으로 지나면 센터, 아니면 밖(통과)
    const P = ev.paths || [];
    if (ev.immune) {
      ev.res = 'immune';
      out.push({ kind: 'immune', ev });
    } else if (P.includes('center')) {
      ev.res = 'center';
      out.push({ kind: 'center', ev });
    } else {
      ev.res = 'pass';
      out.push({ kind: 'pass', ev });
    }
    this.log.paths = this.log.paths || { center: 0, out: 0 };
    this.log.paths[ev.res === 'center' ? 'center' : 'out']++;
  }

  // 11차: 이 껍질 면에서 앞뒤 gap(m) 안에 판정 중인 다른 껍질이 있는가(장식 금지 구역)
  _judgingNear(sh, now, gap) {
    for (const o of this.list) {
      if (o === sh || !o.burst || !Bursts.judging(o, now)) continue;
      if (Math.abs(o.s - sh.s) < gap + 0.5) return true;
    }
    return false;
  }

  // 9차: 시각 t 의 ±w 초 안에 터지는(또는 터진) 위협 껍질이 있는가(장식 불꽃을 비켜 쏘기)
  burstNear(t, w) {
    for (const sh of this.list) if (Math.abs(sh.tBurst - t) < w) return true;
    return false;
  }

  // 점검: 위협 불꽃이 화면을 덮는 비율 — 껍질마다 지금 띠(r_in·f ~ r_out·f, 원판은 0 ~)를 화면 격자(세로 54칸)에 칠해 센다.
  // 반환 { all, byEv: Map(웨이브 id → 비율), hull·hullByEv: 바깥 원판 기준 }. 옅어진 껍질(밝기 < 0.2)은 뺀다
  coverage(cam, vw = 1920, vh = 1080) {
    const NY = 54;
    const NX = Math.max(8, Math.round((NY * vw) / vh));
    const NC = NX * NY;
    if (!this._cv || this._cv.length !== NC) { this._cv = new Uint8Array(NC); this._cw = new Uint8Array(NC); this._ch = new Uint8Array(NC); this._chw = new Uint8Array(NC); }
    const all = this._cv, gw = this._cw, hAll = this._ch, hw = this._chw;
    all.fill(0);
    hAll.fill(0);
    const tanH = Math.tan((cam.fov * Math.PI) / 360);
    const e = cam.matrixWorldInverse.elements;
    const w = this._cv1 || (this._cv1 = new THREE.Vector3());
    const PF = BURST.passedFade;
    const byEv = new Map(), hullByEv = new Map();
    let nAll = 0, nHull = 0;
    const groups = new Map();
    for (const sh of this.list) if (sh.burst && !sh.done) { const g = groups.get(sh.ev) || []; g.push(sh); groups.set(sh.ev, g); }
    for (const [ev, shells] of groups) {
      gw.fill(0);
      hw.fill(0);
      let n = 0, nh = 0;
      for (const sh of shells) {
        const age = this._nowCv - sh.tBurst;
        const pt = this._nowCv - sh.tMeet - PF.delay;
        const br = pt > 0 ? 1 - (1 - PF.to) * Math.min(1, pt / PF.time) : 1;
        const uL = age / sh.K.life[1];
        const aL = uL > 0.6 ? Math.max(0, 1 - (uL - 0.6) / 0.4) : 1;
        if (br * aL < 0.2) continue;
        const f = (1 - Math.exp(-sh.k * age)) / sh.ex;
        const ro = sh.rout * f, ri = sh.shape === 'band' ? sh.rin * f : 0;
        w.copy(sh.Cw);
        w.y -= Bursts.dropAt(sh, age);
        const dC = -(e[2] * w.x + e[6] * w.y + e[10] * w.z + e[14]);
        if (dC <= 0.3) continue;
        w.project(cam);
        const cx = ((w.x + 1) / 2) * NX, cy = ((1 - w.y) / 2) * NY;
        const k = NY / 2 / (dC * tanH);
        const rgo = ro * k, rgi = ri * k;
        const x0 = Math.max(0, Math.floor(cx - rgo)), x1 = Math.min(NX - 1, Math.ceil(cx + rgo));
        const y0 = Math.max(0, Math.floor(cy - rgo)), y1 = Math.min(NY - 1, Math.ceil(cy + rgo));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          const qx = x + 0.5 - cx, qy = y + 0.5 - cy;
          const d2 = qx * qx + qy * qy;
          if (d2 > rgo * rgo) continue;
          const c = y * NX + x;
          if (!hw[c]) { hw[c] = 1; nh++; }
          if (!hAll[c]) { hAll[c] = 1; nHull++; }
          if (d2 < rgi * rgi) continue;
          if (!gw[c]) { gw[c] = 1; n++; }
          if (!all[c]) { all[c] = 1; nAll++; }
        }
      }
      byEv.set(ev.id, n / NC);
      hullByEv.set(ev.id, nh / NC);
    }
    return { all: nAll / NC, byEv, hull: nHull / NC, hullByEv };
  }

  // 맞음·롤로 뚫음: 새 둘레 별을 흩는다(그 별은 꺼짐)
  // 맞음·롤로 뚫음: 새 둘레 1.3m 안 줄기를 흩는다(그 줄기는 꺼짐)
  _pierce(sh, bird, hit = false) {
    const l = [0, 0, 0];
    Bursts.toL(sh, bird.pos, l);
    const w = new THREE.Vector3();
    for (let i = 0; i < sh.n; i++) {
      if (sh.U[i] < 0) continue;
      const i3 = i * 3;
      if (segDist(l[0], l[1], l[2], sh.T[i3], sh.T[i3 + 1], sh.T[i3 + 2], sh.H[i3], sh.H[i3 + 1], sh.H[i3 + 2]) > 1.3) continue;
      Bursts.toW(sh, sh.H[i3], sh.H[i3 + 1], sh.H[i3 + 2], w);
      const col = hit ? [2.2, 0.75, 0.2] : [0.55, 1.7, 2.1];
      for (let q = 0; q < 3; q++) {
        this.sparks.emit(w.x, w.y, w.z, rand(-4, 4), rand(-3, 3), rand(-4, 4), 0.4, 0.22, 0.04, col[0], col[1], col[2], col[0] * 0.3, col[1] * 0.3, col[2] * 0.3, 1, 3, 2, FLAG_FLICKER, 2);
      }
      sh.cut = sh.cut || new Uint8Array(sh.n);
      sh.cut[i] = 1;
    }
  }

  // 발사 자리: 터질 자리 아래, 조금 먼 쪽 땅·옥상·수면
  _launchSite(sh) {
    const C = this.course;
    const W = C.toWorld(sh.s + rand(4, 9), sh.uc + rand(-1.5, 1.5), 0, new THREE.Vector3());
    W.y = this.world && this.world.surfaceY ? this.world.surfaceY(W.x, W.z) + 0.4 : 0.6;
    if (!(W.y > -5)) W.y = 0.6;
    sh.Lw = W;
    sh.headW = W.clone();
  }

  // 올라가는 꼬리(0.8초): 고리 = 끊기는 점선 금빛 불티 / 모란 = 굵게 이어진 금빛 꼬리. 꼭대기 = 낙하산이 펴질 자리(폭발 중심 위)
  _rise(sh, now, dt) {
    const T = Math.max(0.05, sh.tOpen - sh.tLaunch);
    const k = Math.max(0, Math.min(1, (now - sh.tLaunch) / T));
    const e = 1 - (1 - k) * (1 - k);
    const L = sh.Lw, C = sh.Cw;
    const topY = C.y + OMEN.descent * (sh.tBurst - sh.tOpen);
    const x = L.x + (C.x - L.x) * e, y = L.y + (topY - L.y) * e, z = L.z + (C.z - L.z) * e;
    const v = (2 * (1 - k)) / T;
    const vx = (C.x - L.x) * v, vy = (topY - L.y) * v, vz = (C.z - L.z) * v;
    sh.headW.set(x, y, z);
    const sp = this.sparks;
    if (sh.kind === 'ring') {
      const on = Math.floor((now - sh.tLaunch) / 0.07) % 2 === 0;
      sp.emit(x, y, z, vx * 0.4, vy * 0.4, vz * 0.4, Math.max(0.03, dt * 1.5), 0.28, 0.28, 2.3, 1.75, 0.8, 2.3, 1.75, 0.8, 1, 0, 0, 0, 2);
      if (on) {
        const n = Math.max(1, Math.round(3 * this.emitMult));
        for (let i = 0; i < n; i++) sp.emit(x, y, z, rand(-0.6, 0.6), rand(-1.2, 0.2), rand(-0.6, 0.6), rand(0.35, 0.6), 0.16, 0.05, 2.3, 1.7, 0.6, 0.6, 0.25, 0.05, 1, 1.5, 2.5, FLAG_FLICKER, 1);
      }
    } else {
      sp.emit(x, y, z, vx * 0.5, vy * 0.5, vz * 0.5, Math.max(0.03, dt * 1.5), 0.55, 0.55, 2.2, 1.45, 0.5, 2.2, 1.45, 0.5, 1, 0, 0, 0, 3.5);
      const n = Math.max(1, Math.round(2 * this.emitMult));
      for (let i = 0; i < n; i++) sp.emit(x, y, z, rand(-0.2, 0.2), rand(-0.6, 0), rand(-0.2, 0.2), rand(0.45, 0.7), 0.42, 0.18, 1.9, 1.15, 0.35, 0.7, 0.25, 0.06, 0.85, 1, 0.5, 0, 1);
    }
  }

  // 폭발 순간: 가운데 작은 따뜻한 점(흰 번쩍임 아님, 0.05초) + 10차 장식(가는 줄기·심, 판정 0)
  // 11차: 폭발 순간에는 장식을 만들지 않는다(판정 시간 동안 통로 평면 앞뒤 4m 안 장식 0). 묶음 번호만
  _burstFx(sh) {
    this._group(sh);
  }

  // 10차: 연기는 장식 불꽃 연기 입자계와 함께 쓴다(그리기 호출 늘지 않음)
  useSmoke(ps) {
    this.smoke = ps;
  }

  // 10차 연기: 중심에 6~10덩이, 불투명도 0.15, 3초 동안 바람에 흐르며 불꽃빛(순간광)을 받는다. 풀이 모자라면 맨 마지막으로 줄인다
  _smoke(sh) {
    const sm = this.smoke;
    if (!sm) return;
    const S = BURST.look.smoke;
    const P = sh.Cw;
    const n = Math.max(1, Math.round(dr(S.n[0], S.n[1]) * this.emitMult));
    const sr = sh.R0 * S.spread;
    const r0 = sm.rejects;
    for (let q = 0; q < n; q++) {
      const k = sm.emit(P.x + dr(-sr, sr), P.y + dr(-sr, sr) * 0.6, P.z + dr(-sr, sr), S.wind[0] + dr(-0.25, 0.25), S.wind[1] + dr(0, 0.2), S.wind[2] + dr(-0.25, 0.25),
        dr(S.life[0], S.life[1]), S.size[0] * dr(0.8, 1.2), S.size[1] * dr(0.8, 1.2), 0.32, 0.17, 0.06, 0.06, 0.055, 0.07, S.a, 0.15, -0.04, 0);
      if (k >= 0) this.log.smokeN = (this.log.smokeN || 0) + 1;
    }
    this.log.smokeRej = (this.log.smokeRej || 0) + sm.rejects - r0;
  }

  // 10차: 껍질마다 묶음 번호(장식 입자가 그 껍질의 「지나간 뒤 옅어짐」을 따르게)
  _group(sh) {
    this._gi = ((this._gi || 0) % 255) + 1;
    sh.grp = this._gi;
    this.sparks.gdim[sh.grp] = 1;
    return sh.grp;
  }

  // 지역 방향(x 앞 · y 오른쪽 · z 위) → 세계 방향
  static dirW(sh, x, y, z, out) {
    out[0] = sh.F.x * x + sh.R.x * y;
    out[1] = z + (sh.slope || 0) * x;
    out[2] = sh.F.z * x + sh.R.z * y;
    return out;
  }

  // 10차 불티: 판정이 끝난 뒤 머리가 지나온 리본 자리에서 떨어지는 반짝 가루(감속·처짐·깜빡임·금 → 검붉게). 판정 0
  // 10차 불티 + 11차: 판정이 끝난 뒤(새 통과 + 0.3초, 같은 자리 앞뒤 4m 안에 판정 중인 불꽃이 없을 때) 줄기 장식 · 잔광 · 불티 · 연기
  _embers(sh, now) {
    const sp = this.sparks;
    const E = BURST.look.embers;
    const age = now - sh.tBurst;
    const heads = [];
    for (let i = 0; i < sh.n; i++) if (!sh.core[i] && sh.U[i] >= 0 && !(sh.cut && sh.cut[i])) heads.push(i);
    if (!heads.length) return;

    this._smoke(sh);
    let n = Math.round(dr(E.n[0], E.n[1]) * this.emitMult);
    const ring = sh.after === 'crossette'; // 11차 C: 껍질마다 하나 — 버드나무 흘러내림 · 4갈래 딱총 · 타닥 크래클
    const crack = sh.after === 'crackle';
    const CR = BURST.look.crossette, WL = BURST.look.willow;
    let nA = ring ? heads.length * CR.n : crack ? heads.length * 3 : heads.length;
    let room = sp.limit - sp.alive - BURST.look.reserve;
    if (room < nA + n) {
      const cutA = Math.min(nA, nA + n - Math.max(0, room));
      this.log.afterCut = (this.log.afterCut || 0) + cutA;
      nA -= cutA;
      room -= nA;
      if (room < n) {
        this.log.embersCut += n - Math.max(0, room);
        n = Math.max(0, room);
      }
    }
    const dw = this._dw || (this._dw = [0, 0, 0]);
    const w = this._w3 || (this._w3 = new THREE.Vector3());
    const ex = Math.exp(-sh.k * age);
    const cc = sh.color;
    const cm = Math.max(cc[0], cc[1], cc[2]);
    const dk = Math.min(1.1, 1.1 * cm) / cm; // 잔광 색 = 껍질 색(밝기 ≤ 1.1)
    const wc = [cc[0] * dk, cc[1] * dk, cc[2] * dk];
    for (let q = 0; q < nA; q++) {
      const i = heads[ring ? Math.floor(q / CR.n) : crack ? Math.floor(q / 3) % heads.length : q];
      const i3 = i * 3;
      const dx = sh.dir[i3], dy = sh.dir[i3 + 1], dz = sh.dir[i3 + 2];
      Bursts.toW(sh, sh.H[i3], sh.H[i3 + 1], sh.H[i3 + 2], w);
      Bursts.dirW(sh, dx, dy, dz, dw);
      const v = sh.spd[i] * sh.k * ex;
      let k;
      if (ring) {
        const a = (q % CR.n) * (Math.PI / 2) + dr(-0.3, 0.3) + sh.ph[i];
        const nw = Bursts.dirW(sh, 1, 0, 0, [0, 0, 0]);
        const ux = dw[1] * nw[2] - dw[2] * nw[1], uy = dw[2] * nw[0] - dw[0] * nw[2], uz = dw[0] * nw[1] - dw[1] * nw[0];
        const ca = Math.cos(a), sa = Math.sin(a), s = dr(CR.speed[0], CR.speed[1]);
        k = sp.emit(w.x, w.y, w.z, (nw[0] * ca + ux * sa) * s + dw[0] * v * 0.5, (nw[1] * ca + uy * sa) * s + dw[1] * v * 0.5, (nw[2] * ca + uz * sa) * s + dw[2] * v * 0.5,
          dr(CR.life[0], CR.life[1]), CR.size, CR.size * 0.5, CR.col[0], CR.col[1], CR.col[2], CR.end[0], CR.end[1], CR.end[2], CR.a, 2.5, 1.0, FLAG_FLICKER, 1.2);
      } else if (crack) {
        // 타닥 크래클: 머리 자리에서 작은 불티가 사방으로 튀었다가 짧게 터짐(반짝)
        const s2 = dr(1.2, 2.6);
        let vx = dr(-1, 1), vy = dr(-1, 1), vz = dr(-1, 1);
        const vl = Math.hypot(vx, vy, vz) || 1;
        k = sp.emit(w.x, w.y, w.z, (vx / vl) * s2 + dw[0] * v * 0.3, (vy / vl) * s2 + dw[1] * v * 0.3, (vz / vl) * s2 + dw[2] * v * 0.3, dr(0.25, 0.5), 0.06, 0.03,
          1.25, 1.15, 0.95, wc[0] * 0.5, wc[1] * 0.5, wc[2] * 0.5, 0.85, 3.0, 1.2, FLAG_FLICKER, 1);
      } else {
        k = sp.emit(w.x, w.y, w.z, dw[0] * v, dw[1] * v, dw[2] * v, dr(WL.life[0], WL.life[1]), WL.size, WL.size * 0.4,
          wc[0] * WL.a * 2, wc[1] * WL.a * 2, wc[2] * WL.a * 2, WL.end[0], WL.end[1], WL.end[2], WL.a, WL.drag, WL.grav, FLAG_TRAIL | FLAG_FLICKER, 1);
      }
      if (k >= 0) this.log.afterN = (this.log.afterN || 0) + 1;
    }
    const rej0 = sp.rejects;
    for (let q = 0; q < n; q++) {
      const i = heads[q % heads.length];
      const i3 = i * 3;
      const f = 0.55 + 0.45 * drand();
      Bursts.toW(sh, sh.T[i3] + (sh.H[i3] - sh.T[i3]) * f, sh.T[i3 + 1] + (sh.H[i3 + 1] - sh.T[i3 + 1]) * f, sh.T[i3 + 2] + (sh.H[i3 + 2] - sh.T[i3 + 2]) * f, w);
      Bursts.dirW(sh, sh.dir[i3], sh.dir[i3 + 1], sh.dir[i3 + 2], dw);
      const v = dr(0.2, 1.1);
      const k = emitGlitter(sp, w.x, w.y, w.z, dw[0] * v + dr(-0.5, 0.5), dw[1] * v + dr(-0.4, 0.3), dw[2] * v + dr(-0.5, 0.5), E, drand, E.size, E.col, E.end, E.a);
      if (k >= 0) this.log.embersN++;
    }
    this.log.decorRej += sp.rejects - rej0;
  }

  // 그리기(12차): 껍질마다 별 수백 개(머리 + 꼬리 + 끝 점). 판정 시간 동안 꼬리는 곧고(띠 전체가 함께 처짐) 띠 밖·구멍 안에는 그림이 없다.
  // 판정이 끝나면 처짐이 커지고(꼬리가 휜다) 꼬리가 짧아지며 반짝이며 사라진다. 버드나무는 꼬리가 길게 흘러내린다
  _draw(now, dt) {
    const S = this.stars;
    S.begin(now);
    const PF = BURST.passedFade;
    const dw = this._dwv || (this._dwv = [0, 0, 0]);
    const HOT = [2.6, 2.45, 2.2];
    let nStar = 0;
    for (const sh of this.list) {
      if (!sh.burst) continue;
      const age = now - sh.tBurst;
      let bright = 1;
      const pt = now - sh.tMeet - PF.delay;
      if (pt > 0) bright *= 1 - (1 - PF.to) * Math.min(1, pt / PF.time);
      if (sh.grp) this.sparks.gdim[sh.grp] = bright;
      const judging = Bursts.judging(sh, now);
      const tLose = judging ? 0 : now - (sh.tJudgeEnd !== undefined ? sh.tJudgeEnd : now);
      const ramp = Math.min(1, age / 0.14) ** 2 * 0.85 + 0.15; // 폭발 직후 한 점에 겹친 순간은 옅게 시작(흰 덩어리 방지)
      // 머리 색: 처음 0.12초 흰빛(HDR 2.6) → 그 불꽃 색 × HDR. 2색 껍질은 0.3~0.5초에 둘째 색으로
      const hot = age < LK.hotT ? 1 - smooth(LK.hotT * 0.5, LK.hotT, age) : 0;
      const c1 = sh.color, c2 = sh.color2;
      const m2 = c2 ? smooth(0.3, 0.5, age) : 0;
      const hk = sh.hdr * (sh.dense || 1);
      const hotK = hot * (sh.dense || 1);
      const cr = ((c1[0] + ((c2 ? c2[0] : c1[0]) - c1[0]) * m2) * hk) * (1 - hot) + HOT[0] * hotK;
      const cg = ((c1[1] + ((c2 ? c2[1] : c1[1]) - c1[1]) * m2) * hk) * (1 - hot) + HOT[1] * hotK;
      const cb = ((c1[2] + ((c2 ? c2[2] : c1[2]) - c1[2]) * m2) * hk) * (1 - hot) + HOT[2] * hotK;
      // 꼬리 색 = 그 불꽃 색(흰빛 시작 없음 — 폭발 직후 꼬리가 겹친 흰 원판 방지)
      const qr = cr - HOT[0] * hotK, qg = cg - HOT[1] * hotK, qb = cb - HOT[2] * hotK;
      const TC = LK.tipCol;
      const tipA = LK.tipDot.a;
      const dJ = dropJ(age);
      const gA = age > sh.tDrop ? sh.gAfter : 0;
      const willow = sh.look === 'willow';
      const O = sh.Cw;
      for (let i = 0; i < sh.n; i++) {
        const L = sh.life[i];
        if (age >= L || (sh.cut && sh.cut[i])) continue;
        const u = age / L;
        let a = ramp * bright;
        // 수명 끝 40%: 반짝이며 사라짐(판정이 끝난 뒤에만 반짝임)
        if (u > 0.6) a *= Math.max(0, 1 - (u - 0.6) / 0.4) * (tLose > 0 ? 0.65 + 0.35 * Math.sin(age * 29 + sh.ph[i]) : 1);
        // 판정 뒤: 꼬리가 짧아진다(버드나무는 길게 흘러내린다 — 구멍 안까지)
        let endR = sh.endR[i];
        if (tLose > 0) endR = willow ? endR + (0.08 - endR) * Math.min(1, tLose / 0.6) : 1 - (1 - endR) * Math.max(0.3, 1 - tLose / 0.5);
        const i3 = i * 3;
        Bursts.dirW(sh, sh.dir[i3], sh.dir[i3 + 1], sh.dir[i3 + 2], dw);
        const ta = sh.tip[i] && tLose < 0.15 ? tipA * (1 - tLose / 0.15) : 0;
        S.push(O.x, O.y, O.z, dw[0], dw[1], dw[2], sh.spd[i], sh.k, age, endR, sh.hr[i], sh.tw0[i], sh.tw1[i], cr, cg, cb, a,
          TC[0] * 0.9, TC[1] * 0.9, TC[2] * 0.9, ta, dJ, gA, sh.tDrop, sh.half[i], sh.spk[i], sh.ph[i], sh.floor[i], qr, qg, qb);
        nStar++;
      }
    }
    this.log.maxStars = Math.max(this.log.maxStars || 0, nStar);
    if (this.debug) this._drawDebug(now);
    S.end();
  }

  // 디버그(B): 다음 웨이브의 안전 칸(초록)과 목표(시안 큰 점)를 그 깊이에 점으로
  _drawDebug(now) {
    const S = this.stars;
    const C = this.course;
    const w = new THREE.Vector3();
    // 12차: 판정 중인 껍질의 판정 경계(바깥 r_out − 0.05 자홍 · 구멍 r_in + 0.05 시안, 새 판정 반지름 빼기 전) — 그린 바깥 테·꼬리 끝과 맞는지 보는 용도
    for (const sh of this.list) {
      if (!sh.burst || !Bursts.judging(sh, now)) continue;
      const age = now - sh.tBurst;
      const fK = (1 - Math.exp(-sh.k * age)) / sh.ex;
      const drop = Bursts.dropAt(sh, age);
      this.log.judgeDropMax = Math.max(this.log.judgeDropMax || 0, drop);
      const rings = [[sh.rout * fK - BAND.tol, [1.6, 0.3, 1.6]]];
      if (sh.shape === 'band') rings.push([sh.rin * fK + BAND.tol, [0.1, 1.2, 1.4]]);
      for (const [r, c] of rings) {
        const n = Math.max(24, Math.round(r * 14));
        for (let q = 0; q < n; q++) {
          const a = (q / n) * Math.PI * 2;
          Bursts.toW(sh, 0, sh.oy + Math.cos(a) * r, sh.oz - drop + Math.sin(a) * r, w);
          S.dot(w.x, w.y, w.z, 0.035, c[0], c[1], c[2], 1);
        }
      }
    }
    let ev = null;
    for (const e of this.events) if (e.shells.length && now < e.tq + 0.3 && (!ev || e.tq < ev.tq)) ev = e;
    if (!ev || !this.birdSpec) return;
    const m = sideMargin(this.birdSpec);
    const eggs = ev.wave.eggs;
    const safe = safeGrid(eggs, m, this._dbgSafe);
    const s = ev.wave.eggs[0] ? ev.wave.eggs[0].s : ev.s;
    const v0 = C.center(s);
    for (let c = 0; c < CGRID.NC; c += 2) {
      if (!CGRID.IN_BIRD[c]) continue;
      const u = CGRID.CU[c], ww = CGRID.CW[c];
      C.toWorld(s, u, v0 + ww, w);
      const ok = safe[c];
      S.dot(w.x, w.y, w.z, 0.04, ok ? 0.05 : 0.5, ok ? 0.8 : 0.04, ok ? 0.3 : 0.04, ok ? 0.5 : 0.25);
    }
    C.toWorld(s, ev.target[0], v0 + ev.target[1], w);
    S.dot(w.x, w.y, w.z, 0.3, 0.2, 1.6, 1.8, 1);
  }
}

