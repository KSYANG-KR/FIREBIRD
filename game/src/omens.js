// 예고 그림(12차): 「범위 원」(발사 + 0.1초부터, 판정 띠 그대로) · 알(폭발 0.45초 전, 째깍 1번 · 조임) · 도화선 호 · 조준점(새 자리 고리).
// - 그리기 호출 1번(인스턴스 사각형 하나, 조각 셰이더가 모양을 그린다 — 화면에 사각형은 보이지 않는다).
// - bloom 뒤에 깊이 검사 없이 맨 위에 그린다(game → renderer 의 overlay 장면). 폭발 불빛에 묻히지 않게 알 뒤에 어두운 받침을 깐다.
// - 범위 원 = 판정: 띠 종류는 바깥 원(r_out)과 구멍 원(r_in), 원판 종류는 바깥 원 + 안쪽 옅은 채움. 점선 48칸, 불꽃 색 채도 −30%, HDR 0.6.
//   중심 = 지나는 순간 띠 중심(폭발 중심 − 처짐). 0.15초 동안 나타나고, 판정 시간에는 불투명도 0.5, 판정이 끝나면 바로 사라진다(16차 U11 — 지난 껍질 원은 카메라 15m 안이면 지움, 화면에서 커진 원판 채움은 빗금).
// - 조준점: 다음 웨이브에 띠 종류 껍질이 있으면 그 폭발 면 위 「지금 새 자리(u, w)」에 반지름 b 의 점선 고리(흰색 HDR 0.5) — 카메라 시차 없이 구멍을 겨눈다.
import * as THREE from 'three';
import { OMEN, BEAT, TIMING, BURST, BAND } from './config.js';

const T_EGG = 0, T_FUSE = 1, T_FAINT = 4, T_DASH = 5, T_LINE = 6, T_FILL = 7; // eslint-disable-line no-unused-vars

const VERT = /* glsl */ `
attribute vec3 aCorner;
attribute vec4 aP; // 세계 위치 xyz, 반폭(m)
attribute vec4 aC; // 색 rgb, 불투명도(밝기)
attribute vec4 aK; // 종류, p1, p2, p3
uniform float uScale;
uniform float uMinPx;
uniform float uLinePx;
uniform vec2 uViewport;
varying vec2 vUv;
varying vec4 vC;
varying vec4 vK;
varying float vPx;
void main() {
  float t = aK.x;
  if (t > 4.5 && t < 6.5) {
    // 선분(점선 한 칸): 시작 aP.xyz, 끝 aK.yzw, 반폭 aP.w(m). 6 = 가는 선(최소 반폭 uLinePx)
    vec4 m0 = modelViewMatrix * vec4(aP.xyz, 1.0);
    vec4 m1 = modelViewMatrix * vec4(aK.yzw, 1.0);
    if (-m0.z < 0.4 || -m1.z < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    vec4 c0 = projectionMatrix * m0, c1 = projectionMatrix * m1;
    vec2 s0 = c0.xy / c0.w, s1 = c1.xy / c1.w;
    float along = aCorner.x * 0.5 + 0.5;
    vec4 cc = mix(c0, c1, along);
    vec2 dir = (s1 - s0) * uViewport;
    float L = length(dir);
    dir = L > 1e-6 ? dir / L : vec2(1.0, 0.0);
    vec2 nrm = vec2(-dir.y, dir.x);
    float depthM = mix(-m0.z, -m1.z, along);
    float hpx = max(aP.w * uScale / depthM, t > 5.5 ? uLinePx : uMinPx * 0.75);
    vec2 off = (nrm * aCorner.y * (hpx + 0.7) * 2.0 + dir * aCorner.x * (t > 5.5 ? 0.7 : hpx) * 2.0) / uViewport;
    gl_Position = vec4(cc.xy + off * cc.w, cc.z, cc.w);
    vUv = vec2(aCorner.x, aCorner.y * (hpx + 0.7) / max(hpx, 0.5));
    vC = aC;
    vK = aK;
    vPx = hpx;
    return;
  }
  vec4 mv = modelViewMatrix * vec4(aP.xyz, 1.0);
  float depth = -mv.z;
  if (depth < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float px = aP.w * uScale / depth;
  // 아주 멀어도 알이 점으로 남게 최소 화소(알은 빛무리 포함 크기 기준). 채움(7)은 최소 없음
  float minPx = t < 0.5 ? uMinPx * ${OMEN.glow.toFixed(2)} : t < 1.5 ? uMinPx * 2.6 : t > 6.5 ? 0.0 : uMinPx * 1.4;
  float k = px < minPx ? minPx / max(px, 1e-4) : 1.0;
  vec2 ext = vec2(aP.w * k);
  mv.xy += aCorner.xy * ext;
  gl_Position = projectionMatrix * mv;
  vUv = aCorner.xy;
  vC = aC;
  vK = aK;
  vPx = px * k;
}
`;
const FRAG = /* glsl */ `
varying vec2 vUv;
varying vec4 vC;
varying vec4 vK;
varying float vPx;
uniform vec2 uFillPx; // 16차 U11: 원판 채움을 빗금으로 바꾸는 화면 반지름(화소, 시작·끝)
uniform vec2 uHatch; // 빗금 간격(화소)·칠한 비율
// 결과는 미리 곱한 알파: rgb = 더할 빛, a = 뒤를 어둡게 하는 정도
void main() {
  float t = vK.x;
  float r = length(vUv);
  vec3 col = vec3(0.0);
  float a = 0.0;
  float aa = 1.5 / max(vPx, 1.0);
  if (t < 0.5) {
    // 알: 반폭 = 빛무리 끝(받침 끝). 알 반지름 = 1/back
    float rb = r * ${OMEN.back.r.toFixed(2)};
    if (rb > ${OMEN.back.r.toFixed(2)}) discard;
    float back = (1.0 - smoothstep(${(OMEN.back.r * 0.75).toFixed(2)}, ${OMEN.back.r.toFixed(2)}, rb)) * ${OMEN.back.a.toFixed(2)} * min(1.0, vC.a * 1.6);
    float edge = aa * ${OMEN.back.r.toFixed(2)};
    float core;
    vec3 cc;
    if (vK.y > 2.5) {
      // 심 모란 알: 꽉 찬 작은 심 + 바깥 고리(두 겹)
      vec2 q2 = vUv * ${OMEN.back.r.toFixed(2)};
      float rr = length(q2);
      core = max(1.0 - smoothstep(0.5 - edge, 0.5 + edge, rr), (1.0 - smoothstep(1.0 - edge, 1.0 + edge, rr)) * smoothstep(0.78 - edge, 0.78 + edge, rr));
      cc = mix(vec3(${OMEN.peonyCore.join(', ')}), vC.rgb, smoothstep(0.0, 0.5, rr));
    } else if (vK.y > 1.5) {
      // 버드나무 알: 꽉 찬 알 + 아래로 처진 금빛 꼬리 셋
      float drip = 0.0;
      for (int q = -1; q <= 1; q++) {
        vec2 p = vUv * ${OMEN.back.r.toFixed(2)} - vec2(float(q) * 0.55, -1.2);
        drip = max(drip, (1.0 - smoothstep(0.12 - edge, 0.12 + edge, abs(p.x))) * (1.0 - smoothstep(0.0, 0.9, abs(p.y + 0.0))) * step(-0.9, p.y) * step(p.y, 0.4));
      }
      core = max(1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb), drip * 0.8);
      cc = mix(vec3(${OMEN.peonyCore.join(', ')}), vC.rgb, smoothstep(0.0, 0.85, rb));
    } else if (vK.y > 0.5) {
      // 띠(국화·고리) 알: 고리(가운데가 어둡게 빔)
      core = (1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb)) * smoothstep(vK.z - edge, vK.z + edge, rb);
      cc = vC.rgb;
    } else {
      // 원판(모란) 알: 꽉 찬 알, 가운데 따뜻하게
      core = 1.0 - smoothstep(1.0 - edge, 1.0 + edge, rb);
      cc = mix(vec3(${OMEN.peonyCore.join(', ')}), vC.rgb, smoothstep(0.0, 0.85, rb));
    }
    float glow = exp(-max(0.0, rb - 0.9) * 1.6) * (1.0 - smoothstep(${(OMEN.glow * 0.8).toFixed(2)}, ${OMEN.glow.toFixed(2)}, rb)) * 0.32;
    col = (cc * core + vC.rgb * glow) * vC.a;
    a = max(back, core * min(1.0, vC.a * 1.4));
  } else if (t < 1.5) {
    // 도화선 호: 반지름 1(반폭 기준 0.8), 위에서 시계 방향으로 남은 만큼(vK.y = 0~1)
    float R0 = 0.8;
    float w = max(vK.z, aa * 1.2);
    float band = 1.0 - smoothstep(w * 0.5, w * 0.5 + aa, abs(r - R0));
    float ang = atan(vUv.x, vUv.y);
    if (ang < 0.0) ang += 6.2831853;
    float frac = ang / 6.2831853;
    float on = step(frac, vK.y);
    float ta = vK.y * 6.2831853;
    vec2 tip = vec2(sin(ta), cos(ta)) * R0;
    float spark = 1.0 - smoothstep(w * 1.2, w * 1.2 + aa * 2.0, length(vUv - tip));
    if (band * on < 0.01 && spark < 0.01) discard;
    col = vC.rgb * band * on * vC.a + vec3(1.0, 0.9, 0.7) * spark * vC.a;
    a = max(band * on, spark) * 0.5 * min(1.0, vC.a * 1.5);
  } else if (t > 4.5 && t < 5.5) {
    // 굵은 점선(옛 불티 줄)
    float d = (1.0 - smoothstep(0.35, 1.0, abs(vUv.y))) * (1.0 - smoothstep(0.55, 1.0, abs(vUv.x)));
    if (d <= 0.01) discard;
    col = vC.rgb * d * vC.a;
    a = d * 0.3 * min(1.0, vC.a);
  } else if (t > 5.5 && t < 6.5) {
    // 가는 선(범위 원·조준점 점선 한 칸): 가장자리 0.7px 부드럽게, 빛무리 없음
    float e = abs(vUv.y);
    float d = 1.0 - smoothstep(0.85, 1.0 + 0.7 / max(vPx, 0.5), e);
    if (d <= 0.01) discard;
    col = vC.rgb * d * vC.a;
    a = d * 0.25 * min(1.0, vC.a);
  } else if (t > 6.5) {
    // 원판 안쪽 옅은 채움(「다 위험」) — 둥근 가장자리
    // 16차 U11: 화면에서 아주 커진 원판(지나기 직전, 카메라 가까이)은 빗금으로 채운다 — 꽉 채우면 다음 예고를 덮는다.
    //   「다 위험」 뜻은 그대로(안쪽 전체에 빗금, 띠 껍질의 빈 구멍과 헷갈리지 않게 가운데를 비우지 않음)
    float d = 1.0 - smoothstep(1.0 - aa, 1.0, r);
    float big = smoothstep(uFillPx.x, uFillPx.y, vPx);
    float hatch = step(fract((gl_FragCoord.x + gl_FragCoord.y) / uHatch.x), uHatch.y);
    d *= mix(1.0, hatch, big);
    if (d <= 0.0) discard;
    col = vC.rgb * d * vC.a;
    a = d * vC.a;
  } else {
    // 흐린 점(2번째 웨이브부터)
    float d = 1.0 - smoothstep(0.25, 1.0, r);
    if (d <= 0.0) discard;
    col = vC.rgb * d * d * vC.a;
    a = d * 0.25 * min(1.0, vC.a * 2.0);
  }
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}
`;

export class Omens {
  constructor(max = 900) {
    this.scene = new THREE.Scene();
    this.max = max;
    this.P = new Float32Array(max * 4);
    this.C = new Float32Array(max * 4);
    this.K = new Float32Array(max * 4);
    const g = new THREE.InstancedBufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), 3));
    g.setAttribute('aCorner', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), 3));
    g.setIndex([0, 1, 2, 2, 1, 3]);
    this.aP = new THREE.InstancedBufferAttribute(this.P, 4).setUsage(THREE.DynamicDrawUsage);
    this.aC = new THREE.InstancedBufferAttribute(this.C, 4).setUsage(THREE.DynamicDrawUsage);
    this.aK = new THREE.InstancedBufferAttribute(this.K, 4).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aP', this.aP);
    g.setAttribute('aC', this.aC);
    g.setAttribute('aK', this.aK);
    g.instanceCount = 0;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { uScale: { value: 900 }, uMinPx: { value: OMEN.minPx }, uLinePx: { value: OMEN.range.px * 0.5 }, uViewport: { value: new THREE.Vector2(1920, 1080) }, uFillPx: { value: new THREE.Vector2(OMEN.range.fillPx[0], OMEN.range.fillPx[1]) }, uHatch: { value: new THREE.Vector2(OMEN.range.hatch[0], OMEN.range.hatch[1]) } },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.ZeroFactor,
      blendDstAlpha: THREE.OneFactor,
    });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
    this.n = 0;
    this.visible = true;
    this.showRange = true;
    this.showAim = true;
    this.resetStats();
    this._w = new THREE.Vector3();
  }

  // lineMin = 범위 원 선 최소 반폭(장치 화소). 16차 3-4: 모바일은 화면 1.5 CSS px 이상(게임이 넘김), 그 밖은 0.75
  setScale(scale, vh, vw = vh * 16 / 9, lineMin = 0.75) {
    this.material.uniforms.uScale.value = scale;
    this.material.uniforms.uViewport.value.set(vw, vh);
    this.material.uniforms.uMinPx.value = OMEN.minPx * (vh / 1080);
    this.material.uniforms.uFillPx.value.set(OMEN.range.fillPx[0] * (vh / 1080), OMEN.range.fillPx[1] * (vh / 1080));
    this.material.uniforms.uHatch.value.set(Math.max(4, OMEN.range.hatch[0] * (vh / 1080)), OMEN.range.hatch[1]);
    this.material.uniforms.uLinePx.value = Math.max(lineMin, OMEN.range.px * 0.5 * (vh / 1080));
  }

  _push(x, y, z, half, r, g, b, a, type, p1 = 0, p2 = 0, p3 = 0) {
    if (this.n >= this.max) { this.stats.overflow++; return; }
    const o = this.n * 4;
    this.P[o] = x; this.P[o + 1] = y; this.P[o + 2] = z; this.P[o + 3] = half;
    this.C[o] = r; this.C[o + 1] = g; this.C[o + 2] = b; this.C[o + 3] = a;
    this.K[o] = type; this.K[o + 1] = p1; this.K[o + 2] = p2; this.K[o + 3] = p3;
    this.n++;
  }

  // 껍질 면 위 점(y 오른쪽, z 위 — 폭발 중심 기준)을 세계로
  static planeW(sh, y, z, out) {
    out.x = sh.Cw.x + sh.R.x * y;
    out.y = sh.Cw.y + z;
    out.z = sh.Cw.z + sh.R.z * y;
    return out;
  }

  // 껍질 면 위 점선 원(중심 (y0, z0), 반지름 r, n 칸, 칸 비율 duty)
  _dashCircle(sh, y0, z0, r, n, duty, w, c, a, ph = 0) {
    const p = this._w, q = this._q || (this._q = new THREE.Vector3());
    const step = (Math.PI * 2) / n;
    for (let i = 0; i < n; i++) {
      const a0 = ph + i * step, a1 = a0 + step * duty;
      Omens.planeW(sh, y0 + Math.cos(a0) * r, z0 + Math.sin(a0) * r, p);
      Omens.planeW(sh, y0 + Math.cos(a1) * r, z0 + Math.sin(a1) * r, q);
      this._push(p.x, p.y, p.z, w * 0.5, c[0], c[1], c[2], a, T_LINE, q.x, q.y, q.z);
    }
  }

  // 박자 맥박
  static pulse(now, tq) {
    const P = OMEN.pulse;
    const left = tq - now;
    if (left <= 0) return 1;
    const k = Math.round(left / BEAT.beat);
    let best = Math.abs(left - k * BEAT.beat);
    if (left < BEAT.beat + 0.1) best = Math.min(best, Math.abs(left - BEAT.beat * 0.5));
    return 1 + P.amp * Math.exp(-((best / P.width) ** 2));
  }

  // 12차 카운트다운: 알이 뜰 때 1.0 → 째깍(TIMING.ticks[0] = 0.25초 전) 1.3배 · 조임 0.12초 → 0.6배 · 마지막 반짝
  static countdown(left, out = { sc: 1, br: 1, fc: null }) {
    const C = OMEN.count;
    const S = OMEN.squeeze;
    const TK = TIMING.ticks;
    const b = left > TK[0] ? 0 : 1;
    const since = b === 0 ? 1e9 : TK[0] - left;
    const k = b === 0 ? 0 : Math.min(1, since / C.ease);
    out.sc = C.scale[0] + (C.scale[1] - C.scale[0]) * k;
    out.br = C.bright[0] + (C.bright[1] - C.bright[0]) * k;
    const f0 = C.fuse[0], f1 = C.fuse[1];
    out.fc = [f0[0] + (f1[0] - f0[0]) * k, f0[1] + (f1[1] - f0[1]) * k, f0[2] + (f1[2] - f0[2]) * k];
    if (left < S.t) {
      const q = 1 - Math.max(0, left) / S.t;
      out.sc *= 1 + (S.to - 1) * q * q * (3 - 2 * q);
      if (left < S.glint) out.br += S.gain;
    }
    return out;
  }

  // 범위 원 색: 불꽃 색 채도 −30%, 밝기 HDR 0.6
  static rangeCol(sh, out) {
    const c = sh.eggCol || [1, 0.8, 0.4];
    const m = Math.max(c[0], c[1], c[2]) || 1;
    const R = OMEN.range;
    const L = (c[0] + c[1] + c[2]) / (3 * m);
    for (let i = 0; i < 3; i++) out[i] = (c[i] / m + (L - c[i] / m) * R.desat) * R.hdr;
    return out;
  }

  // 껍질의 범위 원 불투명도(0~1): 정보(발사 + 0.1) 0.15초 페이드 인 → 폭발 뒤 판정 시간 0.5 → 판정이 끝나면 바로 0
  // 16차 U11(gate16s5 제안 1): 판정이 끝난 원은 더 알려 줄 것이 없는데, 카메라 가까이 남아 다음 예고를 덮었다(피날레 최대 98%) — 페이드 아웃 없이 지운다
  static rangeAlpha(sh, now) {
    const R = OMEN.range;
    if (sh.tInfo === undefined || now < sh.tInfo) return 0;
    let a = Math.min(1, (now - sh.tInfo) / R.fadeIn);
    if (sh.burst) {
      const jEnd = sh.tJudgeEnd !== undefined ? sh.tJudgeEnd : (sh.crossT !== undefined ? sh.crossT : sh.tMeet) + BURST.judgeAfter;
      if (now > jEnd) return 0;
      a *= R.judgeA + (1 - R.judgeA) * Math.max(0, 1 - (now - sh.tBurst) / 0.1);
    }
    return a;
  }

  // 16차 U11: 새가 이미 지난 껍질의 원이 카메라 OMEN.range.passNear(15m) 안이면 지운다 — 새 뒤·카메라 앞에서 화면을 덮는 원
  //   「지남」 = 새의 경로 거리가 껍질 면 + 판정 띠 깊이(전진 × 0.07초)를 넘음(웨이브가 먼저 끝나 crossed 가 안 찍힌 껍질도 포함). 새가 없으면 crossed
  static passedNear(sh, cp, bird = null) {
    if (!cp || !sh.Cw) return false;
    const passed = bird ? bird.s - sh.s > (bird.forward || 0) * BAND.window : !!sh.crossed; // 면 뒤 판정 띠(전진 × 0.07초)까지 지난 뒤
    if (!passed) return false;
    const n = OMEN.range.passNear;
    const dx = sh.Cw.x - cp.x, dy = sh.Cw.y - cp.y, dz = sh.Cw.z - cp.z;
    return dx * dx + dy * dy + dz * dz < n * n;
  }

  // events: 웨이브(사건) 목록, now: 게임 시각, cam: 카메라, bird: 새(조준점용, 없으면 생략)
  update(events, now, cam, bird = null) {
    this.n = 0;
    let strong = 0, faint = 0, ranges = 0, aims = 0;
    if (this.visible) {
      const list = [];
      for (const ev of events) if (ev.shells && ev.shells.length && now < ev.tq) list.push(ev);
      list.sort((a, b) => a.tq - b.tq);
      const cp = cam ? cam.position : null;
      // ① 알·도화선(다음 웨이브), 흐린 점(그다음)
      for (let rank = 0; rank < list.length; rank++) {
        const ev = list[rank];
        const strongW = rank < OMEN.strongRanks;
        const pul = Omens.pulse(now, ev.tq);
        const cd = Omens.countdown(ev.tq - now, this._cd || (this._cd = { sc: 1, br: 1, fc: null }));
        for (const sh of ev.shells) {
          if (!sh.opened || sh.burst) continue;
          const E = sh.eggW;
          if (!E) continue;
          const ec = sh.eggCol || OMEN.peonyCol;
          const em = Math.max(ec[0], ec[1], ec[2]);
          const base = [ec[0] / em, ec[1] / em, ec[2] / em];
          // 알 모양 = 종류: 원판(꽉 참) · 띠(고리, 구멍 비율 = r_in/r_out) · 버드나무(처진 꼬리) · 심 모란(두 겹)
          const K = BURST[sh.kind];
          const shape = sh.kind === 'dahlia' ? 3 : sh.kind === 'willowL' ? 2 : K.shape === 'band' ? 1 : 0;
          const holeK = K.shape === 'band' ? Math.max(0.3, Math.min(0.8, sh.rin / sh.rout + 0.15)) : 0;
          if (strongW && strong < OMEN.maxStrong) {
            strong++;
            const br = OMEN.strong[rank] * cd.br * pul;
            const eggR = (K.egg / 2) * cd.sc; // 알 크기 = 불꽃 크기(대 0.45 · 중 0.35 · 소 0.25m)
            const half = eggR * OMEN.back.r;
            this._push(E.x, E.y, E.z, half, base[0], base[1], base[2], br, T_EGG, shape, holeK);
            // 도화선: 알이 뜬 뒤 남은 시간 비율
            const frac = Math.max(0, Math.min(1, (sh.tBurst - now) / Math.max(0.05, sh.tBurst - sh.tOpen)));
            const fhalf = (OMEN.fuseR / 0.8) * Math.max(1, cd.sc);
            const fc = cd.fc;
            this._push(E.x, E.y, E.z, fhalf, fc[0], fc[1], fc[2], OMEN.strong[rank] * (0.75 + 0.25 * pul), T_FUSE, frac, (OMEN.fuseW / fhalf) * 1.0);
          } else if (faint < OMEN.maxFaint) {
            faint++;
            const F = OMEN.faint;
            this._push(E.x, E.y, E.z, OMEN.eggR * OMEN.glow * F.size, base[0], base[1], base[2], F.bright * (0.85 + 0.15 * pul), T_FAINT);
          }
        }
      }
      // ② 범위 원(정보 시각부터, 판정 띠 그대로)
      const R = OMEN.range;
      const col = this._rc || (this._rc = [0, 0, 0]);
      if (this.showRange) {
        for (const ev of events) {
          if (!ev.shells) continue;
          for (const sh of ev.shells) {
            const a = Omens.rangeAlpha(sh, now);
            if (a <= 0.004 || Omens.passedNear(sh, cp, bird)) continue;
            ranges++;
            Omens.rangeCol(sh, col);
            const age = now - sh.tBurst;
            const e = sh.egg;
            const drop = Math.max(e ? e.drop : 0, sh.burst && this.dropAt ? this.dropAt(sh, age) : 0);
            const z0 = sh.oz - drop;
            const ph = sh.emberPh || 0;
            this._dashCircle(sh, sh.oy, z0, sh.rout, R.dashes, R.duty, R.w, col, a, ph);
            if (sh.shape === 'band') this._dashCircle(sh, sh.oy, z0, sh.rin, Math.max(16, Math.round(R.dashes * 0.5)), R.duty, R.w, col, a, ph);
            else {
              const p = this._w;
              Omens.planeW(sh, sh.oy, z0, p);
              this._push(p.x, p.y, p.z, sh.rout, col[0], col[1], col[2], R.fillA * a, T_FILL);
            }
          }
        }
      }
      // ③ 조준점: 다음(아직 지나지 않은) 웨이브에 띠 껍질이 있으면, 그 면 위 지금 새 자리에 반지름 b 고리
      if (this.showAim && bird && bird.spec) {
        let tgt = null;
        for (const ev of events) {
          if (!ev.shells || !ev.shells.length) continue;
          for (const sh of ev.shells) {
            if (sh.shape !== 'band' || sh.crossed || sh.tInfo === undefined || now < sh.tInfo) continue;
            if (bird.s > sh.s + 0.5) continue;
            if (!tgt || sh.s < tgt.s) tgt = sh;
          }
        }
        if (tgt) {
          aims++;
          const A = OMEN.aim;
          const b = bird.spec.radius * BURST.birdHitMult;
          const fa = Math.min(1, (now - tgt.tInfo) / R.fadeIn);
          const ac = [A.hdr, A.hdr, A.hdr];
          this._dashCircle(tgt, bird.u - tgt.uc, bird.w - tgt.wc, b, A.dashes, A.duty, A.w, ac, fa, now * 1.5);
          this.stats.aimLast = { u: +bird.u.toFixed(2), w: +bird.w.toFixed(2), sh: tgt.id };
        }
      }
    }
    this.stats.strong = strong;
    this.stats.faint = faint;
    this.stats.ranges = ranges;
    this.stats.aims = aims;
    this.stats.maxStrong = Math.max(this.stats.maxStrong, strong);
    this.stats.maxFaint = Math.max(this.stats.maxFaint, faint);
    this.stats.maxN = Math.max(this.stats.maxN, this.n);
    const g = this.mesh.geometry;
    g.instanceCount = this.n;
    for (const at of [this.aP, this.aC, this.aK]) {
      at.clearUpdateRanges();
      if (this.n) at.addUpdateRange(0, this.n * 4);
      at.needsUpdate = true;
    }
  }

  resetStats() {
    this.stats = { strong: 0, faint: 0, maxStrong: 0, maxFaint: 0, ranges: 0, aims: 0, maxN: 0, overflow: 0, emberRatio: [] };
  }
}
