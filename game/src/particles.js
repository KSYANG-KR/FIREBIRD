// 입자(불씨·꼬리 불빛·연기) 풀.
// 불씨는 점 대신 「속도 방향으로 늘린 사각형」(줄무늬)을 인스턴스 한 번에 그린다 — 궤적이 선으로 보인다.
// 살아 있는 칸 목록만 돌므로 빈 칸이 많아도 느려지지 않는다. 미리 만든 칸만 쓰고 새로 메모리를 잡지 않는다.
import * as THREE from 'three';
import { RENDER, THREAT } from './config.js';
import { FLASH_GLSL } from './lights.js';

export const FLAG_TRAIL = 1; // 움직이며 작은 꼬리 입자를 남김(버드나무)
export const FLAG_FLICKER = 2; // 수명 후반 40% 반짝임
export const FLAG_HOT = 4; // 처음 0.1초 흰 코어
export const FLAG_POP = 8; // 수명 끝에 작은 딱총 섬광
export const FLAG_FADE = 16; // 판정 반지름 바깥으로 나가면 옅어짐(위협 불꽃)
export const FLAG_TAIL = 32; // 지나온 길을 꼬리로 남김(국화 꽃잎처럼 퍼지는 선)
export const FLAG_HOLD = 64; // 위협 구: 반지름까지 퍼진 뒤 중력 없이 머묾 → hold 뒤 무너져 흘러내림(위치를 식으로 계산해 구 밖으로 나가지 않음)
export const FLAG_SHELL = 128; // 5차 껍질 별: 위치를 식으로(판정과 같은 r(t) = R(1 − e^(−k·t)) + 처짐)
const HOLD_K = THREAT.dragK;

const HOT_T = 0.1;

const SPARK_VERT = /* glsl */ `
attribute vec4 aPS;   // 위치 xyz, 크기(m)
attribute vec3 aVel;  // 줄무늬: 머리에서 꼬리 반대 방향 벡터(m)
attribute vec4 aCA;   // 색 rgb(HDR), 불투명도
uniform float uScale; // 깊이 1 에서 1m 가 몇 픽셀인지
uniform vec2 uViewport;
uniform float uMaxPx;
uniform float uStreakMax;
uniform vec3 uNear; // 카메라 가까움 처리: x~y m 에서 z 까지 옅게
varying vec3 vColor;
varying float vAlpha;
varying vec2 vP;
varying float vL;
varying float vR;
void main() {
  vec4 mvH = modelViewMatrix * vec4(aPS.xyz, 1.0);
  float depth = -mvH.z;
  if (depth < 0.4 || aCA.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec3 v = mat3(modelViewMatrix) * aVel;
  float vl = length(v);
  float sl = min(vl, uStreakMax);
  vec3 mvT = mvH.xyz - (vl > 1e-4 ? v / vl * sl : vec3(0.0));
  if (-mvT.z < 0.4) mvT = mvH.xyz;
  vec4 cH = projectionMatrix * mvH;
  vec4 cT = projectionMatrix * vec4(mvT, 1.0);
  vec2 hv = uViewport * 0.5;
  vec2 sH = cH.xy / cH.w * hv;
  vec2 sT = cT.xy / cT.w * hv;
  float px = aPS.w * uScale / depth;
  float a = aCA.a * mix(uNear.z, 1.0, smoothstep(uNear.x, uNear.y, depth)); // 카메라 8m 안 불씨는 0.15 까지 옅게(화면 점유율·광과민 보호)
  const float minPx = 1.8; // 이보다 작으면 크기 대신 밝기를 줄여(깜빡임·계단 없이) 보이게
  if (px < minPx) { a *= px * px / (minPx * minPx); px = minPx; }
  px = min(px, uMaxPx);
  float r = px * 0.5;
  vec2 d = sH - sT;
  float L0 = length(d);
  vec2 dir = L0 > 0.001 ? d / L0 : vec2(1.0, 0.0);
  float L = min(L0, uViewport.y * 0.12); // 화면에서 줄무늬 최대 길이
  sT = sH - dir * L;
  vec2 nrm = vec2(-dir.y, dir.x);
  r = max(0.9, r * mix(1.0, 0.55, clamp(L / (8.0 * r), 0.0, 1.0))); // 긴 줄무늬는 가늘게
  float along = position.x * 0.5 + 0.5;
  vec2 s = mix(sT, sH, along) + dir * position.x * r + nrm * position.y * r;
  a *= mix(1.0, (2.0 * r) / (2.0 * r + L), 0.55); // 길게 늘어난 만큼 조금 어둡게
  gl_Position = vec4(s / hv * cH.w, cH.z, cH.w);
  vP = vec2(along * L + position.x * r, position.y * r);
  vL = L;
  vR = r;
  vColor = aCA.rgb;
  vAlpha = a;
}
`;

const SPARK_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying vec2 vP;
varying float vL;
varying float vR;
void main() {
  float dx = max(0.0, max(-vP.x, vP.x - vL));
  float d = length(vec2(dx, vP.y)) / vR;
  if (d > 1.0) discard;
  float t = vL > 0.5 ? clamp(vP.x / vL, 0.0, 1.0) : 1.0;
  float core = exp(-d * d * 12.0);          // 작고 밝은 코어
  float halo = (1.0 - d) * (1.0 - d) * (1.0 - d) * 0.22; // 옅은 후광
  float tail = mix(0.3, 1.0, t * t);        // 머리 쪽이 밝다
  vec3 col = vColor * (core + halo) + vec3(0.2) * core * core * (vColor.r + vColor.g + vColor.b) * 0.33;
  gl_FragColor = vec4(col * tail, vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const SMOKE_VERT = /* glsl */ `
attribute vec4 aPS;
attribute vec3 aVel; // x: 무늬 회전 씨앗
attribute vec4 aCA;
uniform float uScale;
uniform vec2 uViewport;
uniform float uMaxPx;
uniform float uFlashGain;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
varying float vPick;
${FLASH_GLSL}
void main() {
  vPick = step(0.5, fract(aVel.x * 7.31));
  vec4 mv = modelViewMatrix * vec4(aPS.xyz, 1.0);
  float depth = -mv.z;
  if (depth < 0.5 || aCA.a < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec4 c = projectionMatrix * mv;
  vec2 hv = uViewport * 0.5;
  float px = min(aPS.w * uScale / depth, uMaxPx);
  float a = aCA.a;
  if (px < 2.0) { a *= px * 0.5; px = 2.0; }
  float ang = aVel.x * 6.2831;
  float cs = cos(ang), sn = sin(ang);
  vec2 q = vec2(cs * position.x - sn * position.y, sn * position.x + cs * position.y);
  vec2 s = c.xy / c.w * hv + position.xy * px * 0.5;
  gl_Position = vec4(s / hv * c.w, c.z, c.w);
  vUv = q * 0.5 + 0.5;
  vColor = aCA.rgb + flashVol(aPS.xyz) * uFlashGain; // 폭발 순간광을 받는다
  vAlpha = a;
}
`;

const SMOKE_FRAG = /* glsl */ `
uniform sampler2D uNoise;
uniform sampler2D uSmoke0; // Kenney 연기 사진 2장(CC0). 없으면 코드 노이즈
uniform sampler2D uSmoke1;
uniform float uSmokeOn;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vUv;
varying float vPick;
void main() {
  float n;
  vec3 c = vColor;
  if (uSmokeOn > 0.5) {
    n = vPick < 0.5 ? texture2D(uSmoke0, vUv).r : texture2D(uSmoke1, vUv).r;
    n = smoothstep(0.02, 0.85, n);
    c *= 0.55 + 0.75 * n; // 짙은 곳이 더 밝게 빛을 받는 덩어리 느낌
  } else {
    n = texture2D(uNoise, vUv).r;
  }
  if (n < 0.01) discard;
  gl_FragColor = vec4(c, n * vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

// 코드로 만든 연기 무늬 텍스처(값 노이즈 여러 겹 × 둥근 감쇠) 1장
function makeSmokeTexture(size = 64) {
  const data = new Uint8Array(size * size * 4);
  const g = 8;
  const grid = [];
  for (let i = 0; i < (g + 1) * (g + 1); i++) grid.push(Math.random());
  const val = (x, y, f) => {
    const gx = (x * f) % g, gy = (y * f) % g;
    const ix = Math.floor(gx), iy = Math.floor(gy);
    const fx = gx - ix, fy = gy - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const at = (a, b) => grid[(b % g) * (g + 1) + (a % g)];
    const top = at(ix, iy) * (1 - sx) + at(ix + 1, iy) * sx;
    const bot = at(ix, iy + 1) * (1 - sx) + at(ix + 1, iy + 1) * sx;
    return top * (1 - sy) + bot * sy;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      let n = 0.5 * val(u * g, v * g, 1) + 0.3 * val(u * g, v * g, 2) + 0.2 * val(u * g, v * g, 4);
      const dx = u - 0.5, dy = v - 0.5;
      const r = Math.sqrt(dx * dx + dy * dy) * 2;
      const fall = Math.max(0, 1 - r);
      const a = Math.max(0, Math.min(1, fall * fall * (0.35 + n * 1.1)));
      const i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = Math.round(a * 255);
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

// 10차 불티 한 알(위협 불꽃·장식 불꽃이 같이 쓰는 그림): 감속·처짐·깜빡임, c → end 로 식음. E = { life, grav }(config BURST.look.embers 꼴), rnd = 0~1 난수 함수
export function emitGlitter(sp, x, y, z, vx, vy, vz, E, rnd, size, c, end, a) {
  return sp.emit(x, y, z, vx, vy, vz, E.life[0] + rnd() * (E.life[1] - E.life[0]), size * (0.7 + rnd() * 0.5), size * 0.35,
    c[0], c[1], c[2], end[0], end[1], end[2], a, 1.8, E.grav[0] + rnd() * (E.grav[1] - E.grav[0]), FLAG_FLICKER, 0.6);
}

export class ParticleSystem {
  // kind: 'spark'(더하기 섞기, 줄무늬) 또는 'smoke'(보통 섞기, 둥근 무늬)
  constructor(max, { kind = 'spark', lights = null } = {}) {
    this.max = max;
    this.kind = kind;
    this.pos = new Float32Array(max * 3);
    this.vel = new Float32Array(max * 3);
    this.org = new Float32Array(max * 4); // 처음 위치 xyz + 옅어지기 시작 반지름
    this.c0 = new Float32Array(max * 3);
    this.c1 = new Float32Array(max * 3);
    this.a0 = new Float32Array(max);
    this.s0 = new Float32Array(max);
    this.s1 = new Float32Array(max);
    this.age = new Float32Array(max);
    this.life = new Float32Array(max);
    this.drag = new Float32Array(max);
    this.grav = new Float32Array(max);
    this.stk = new Float32Array(max); // 줄무늬 길이 배율
    this.tl = new Float32Array(max); // 꼬리 최대 길이(m, FLAG_TAIL)
    this.flags = new Uint8Array(max);
    this.hold = new Float32Array(max); // FLAG_HOLD: 머무는 시간(초)
    this.zid = new Int32Array(max).fill(-1); // 위협 불씨: 속한 위험 구역 번호(-1 이면 없음)
    this.grp = new Uint8Array(max); // 10차: 묶음 번호(0 = 없음). 묶음 밝기 gdim[묶음] 을 곱한다(위협 껍질의 장식이 그 껍질과 함께 옅어지게)
    this.gdim = new Float32Array(256).fill(1);
    this.rejects = 0; // 10차: 풀이 차서 못 만든 횟수(점검용)
    this.clip = null; // (구역 번호, x, y, 크기) → true 면 그 불씨를 없앤다(구역 밖으로 나감)
    // 빈 칸 더미와 살아 있는 칸 목록
    this.free = new Int32Array(max);
    for (let i = 0; i < max; i++) this.free[i] = max - 1 - i;
    this.freeTop = max;
    this.list = new Int32Array(max);
    this.alive = 0;
    this.emitMult = 1;
    this.limit = max; // 저사양이면 줄어듦
    // 갱신 중에 생기는 입자(꼬리·섬광)는 끝난 뒤 한꺼번에 만든다
    this.queue = new Float32Array(2048 * 12);
    this.qn = 0;

    // GPU 로 보내는 값(살아 있는 것만 앞에서부터 채움)
    this.gPS = new Float32Array(max * 4);
    this.gVel = new Float32Array(max * 3);
    this.gCA = new Float32Array(max * 4);
    const g = new THREE.InstancedBufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), 3));
    g.setIndex([0, 1, 2, 2, 1, 3]);
    this.psAttr = new THREE.InstancedBufferAttribute(this.gPS, 4).setUsage(THREE.DynamicDrawUsage);
    this.velAttr = new THREE.InstancedBufferAttribute(this.gVel, 3).setUsage(THREE.DynamicDrawUsage);
    this.caAttr = new THREE.InstancedBufferAttribute(this.gCA, 4).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aPS', this.psAttr);
    g.setAttribute('aVel', this.velAttr);
    g.setAttribute('aCA', this.caAttr);
    g.instanceCount = 0;
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.geometry = g;

    const additive = kind === 'spark';
    const uniforms = {
      uScale: { value: 400 },
      uViewport: { value: new THREE.Vector2(1280, 720) },
      uMaxPx: { value: additive ? RENDER.maxSparkPx : RENDER.maxSmokePx },
    };
    if (additive) {
      uniforms.uStreakMax = { value: RENDER.tailMax };
    const nf = THREAT.nearCamFade;
    uniforms.uNear = { value: new THREE.Vector3(nf[0], nf[1], nf[2]) };
    } else {
      uniforms.uNoise = { value: makeSmokeTexture() };
      uniforms.uSmoke0 = { value: uniforms.uNoise.value };
      uniforms.uSmoke1 = { value: uniforms.uNoise.value };
      uniforms.uSmokeOn = { value: 0 };
      uniforms.uFlashGain = { value: 0.35 };
      const lu = lights ? lights.uniforms : { uLPos: { value: [] }, uLCol: { value: [] } };
      uniforms.uLPos = lu.uLPos;
      uniforms.uLCol = lu.uLCol;
    }
    this.material = new THREE.ShaderMaterial({
      vertexShader: additive ? SPARK_VERT : SMOKE_VERT,
      fragmentShader: additive ? SPARK_FRAG : SMOKE_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = additive ? 5 : 4;
    this.points = this.mesh; // 예전 이름 호환
  }

  // 연기 사진 텍스처(둘 다 있을 때만)
  useSmoke(t0, t1) {
    const u = this.material.uniforms;
    if (!u.uSmokeOn || !t0 || !t1) return;
    u.uSmoke0.value = t0;
    u.uSmoke1.value = t1;
    u.uSmokeOn.value = 1;
  }

  setScale(v, vw, vh) {
    this.material.uniforms.uScale.value = v;
    if (vw) this.material.uniforms.uViewport.value.set(vw, vh);
  }

  // 입자 하나 만들기. 만든 칸 번호(없으면 -1)
  emit(x, y, z, vx, vy, vz, life, size0, size1, r0, g0, b0, r1, g1, b1, alpha, drag, gravity, flags = 0, stk = 1) {
    if (this.freeTop === 0 || this.alive >= this.limit) {
      this.rejects++;
      return -1;
    }
    const i = this.free[--this.freeTop];
    this.list[this.alive++] = i;
    const i3 = i * 3;
    this.pos[i3] = x; this.pos[i3 + 1] = y; this.pos[i3 + 2] = z;
    this.vel[i3] = vx; this.vel[i3 + 1] = vy; this.vel[i3 + 2] = vz;
    this.c0[i3] = r0; this.c0[i3 + 1] = g0; this.c0[i3 + 2] = b0;
    this.c1[i3] = r1; this.c1[i3 + 1] = g1; this.c1[i3 + 2] = b1;
    this.a0[i] = alpha;
    this.s0[i] = size0;
    this.s1[i] = size1;
    this.age[i] = 0;
    this.life[i] = life;
    this.drag[i] = drag;
    this.grav[i] = gravity;
    this.flags[i] = flags;
    this.stk[i] = stk;
    const i4 = i * 4;
    this.org[i4] = x; this.org[i4 + 1] = y; this.org[i4 + 2] = z; this.org[i4 + 3] = 0;
    this.tl[i] = 0;
    this.zid[i] = -1;
    this.grp[i] = 0;
    return i;
  }

  // 위협 구 불씨: org 에서 off 방향으로 0.15초 안에 퍼져 머문다. hold 초 뒤 g 로 흘러내리며 c1 로 어두워진다
  emitHold(x, y, z, ox, oy, oz, life, hold, size0, size1, r0, g0, b0, r1, g1, b1, alpha, g, flags = 0) {
    const i = this.emit(x, y, z, ox, oy, oz, life, size0, size1, r0, g0, b0, r1, g1, b1, alpha, 0, g, flags | FLAG_HOLD, 1);
    if (i >= 0) this.hold[i] = hold;
    return i;
  }

  // 지나온 길을 꼬리로(최대 길이 m)
  setTail(i, len) {
    if (i < 0) return;
    this.tl[i] = len;
    this.flags[i] |= FLAG_TAIL;
  }

  // 10차: 묶음 밝기를 따르게
  setGroup(i, g) {
    if (i >= 0) this.grp[i] = g;
  }

  // 위험 구역에 가둔다(구역 밖으로 나가면 update 에서 바로 없앰)
  setZone(i, id) {
    if (i >= 0) this.zid[i] = id;
  }

  setScaleMax(px) {
    this.material.uniforms.uMaxPx.value = px;
  }

  // 판정 반지름 바깥에서 옅어지게
  setFade(i, radius) {
    if (i < 0) return;
    this.org[i * 4 + 3] = radius;
    this.flags[i] |= FLAG_FADE;
  }

  _queue(x, y, z, life, size, r, g, b, a, kind) {
    if (this.qn >= 2048) return;
    const q = this.queue;
    const o = this.qn++ * 12;
    q[o] = x; q[o + 1] = y; q[o + 2] = z; q[o + 3] = life; q[o + 4] = size;
    q[o + 5] = r; q[o + 6] = g; q[o + 7] = b; q[o + 8] = a; q[o + 9] = kind;
  }

  update(dt) {
    const { pos, vel, c0, c1, a0, s0, s1, age, life, drag, grav, flags, stk, org, tl, list, gPS, gVel, gCA } = this;
    const sT = RENDER.streakTime, sMax = RENDER.streakMax;
    const smoke = this.kind === 'smoke';
    const clip = this.clip;
    const zid = this.zid;
    let w = 0;
    const n = this.alive;
    for (let k = 0; k < n; k++) {
      const i = list[k];
      age[i] += dt;
      const u = age[i] / life[i];
      const f = flags[i];
      const i3 = i * 3;
      if (u >= 1) {
        if (f & FLAG_POP && Math.random() < 0.35) this._queue(pos[i3], pos[i3 + 1], pos[i3 + 2], 0.09, s0[i] * 2.2, 3.2, 2.9, 2.2, 1, 1);
        this.free[this.freeTop++] = i;
        continue;
      }
      if (f & FLAG_SHELL) {
        this._shellStep(i, i3, f, u, w);
        list[w++] = i;
        continue;
      }
      if (f & FLAG_HOLD) {
        this._holdStep(i, i3, f, u, w);
        list[w++] = i;
        continue;
      }
      const damp = Math.exp(-drag[i] * dt);
      vel[i3] *= damp;
      vel[i3 + 1] = vel[i3 + 1] * damp - grav[i] * dt;
      vel[i3 + 2] *= damp;
      pos[i3] += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;
      // 위협 불씨: 구역 밖(경계에 걸친 것 포함)으로 나가면 바로 없앤다
      if (clip && zid[i] >= 0 && clip(zid[i], pos[i3], pos[i3 + 1], s0[i] + (s1[i] - s0[i]) * u)) {
        this.free[this.freeTop++] = i;
        continue;
      }
      list[w] = i;

      let r, g, b, a;
      if (smoke) {
        // 폭발 뒤 0.6초 동안 폭발 색 → 도시 불빛 색으로
        const m = Math.min(1, age[i] / 0.6);
        r = c0[i3] + (c1[i3] - c0[i3]) * m;
        g = c0[i3 + 1] + (c1[i3 + 1] - c0[i3 + 1]) * m;
        b = c0[i3 + 2] + (c1[i3 + 2] - c0[i3 + 2]) * m;
        a = a0[i] * Math.min(1, age[i] * 4) * (1 - u) * (1 - u);
      } else {
        // 색 흐름: 흰 코어(0~0.1초) → 주 색 → 주황 불씨 → 소멸
        if (u < 0.55) {
          r = c0[i3]; g = c0[i3 + 1]; b = c0[i3 + 2];
        } else {
          const m = (u - 0.55) / 0.45;
          r = c0[i3] + (c1[i3] - c0[i3]) * m;
          g = c0[i3 + 1] + (c1[i3 + 1] - c0[i3 + 1]) * m;
          b = c0[i3 + 2] + (c1[i3 + 2] - c0[i3 + 2]) * m;
        }
        if (f & FLAG_HOT && age[i] < HOT_T) {
          const h = 1 - age[i] / HOT_T;
          r += (2.4 - r) * h; g += (2.3 - g) * h; b += (2.1 - b) * h;
        }
        a = a0[i] * this.gdim[this.grp[i]];
        if (u > 0.7) a *= 1 - (u - 0.7) / 0.3;
        if (f & FLAG_FLICKER && u > 0.6) a *= Math.random() < 0.5 ? 1 : 0.25;
        if (f & FLAG_FADE) {
          const i4 = i * 4;
          const dx = pos[i3] - org[i4], dy = pos[i3 + 1] - org[i4 + 1], dz = pos[i3 + 2] - org[i4 + 2];
          const fr = org[i4 + 3];
          const dd = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dd > fr) a *= 1 - 0.6 * Math.min(1, (dd - fr) / (fr * 0.33));
        }
        if (f & FLAG_TRAIL && Math.random() < 6 * dt * this.emitMult) {
          this._queue(pos[i3], pos[i3 + 1], pos[i3 + 2], 0.6, s0[i] * 0.6, r * 0.7, g * 0.5, b * 0.3, a * 0.6, 0);
        }
      }
      const s = s0[i] + (s1[i] - s0[i]) * u;
      const w4 = w * 4, w3 = w * 3;
      gPS[w4] = pos[i3]; gPS[w4 + 1] = pos[i3 + 1]; gPS[w4 + 2] = pos[i3 + 2]; gPS[w4 + 3] = s;
      if (smoke) {
        gVel[w3] = (i * 0.618) % 1; gVel[w3 + 1] = 0; gVel[w3 + 2] = 0;
      } else {
        // 줄무늬 = 속도 × 0.05초(최대 6m). 꼬리 입자는 지나온 길(점점 짧아짐) 중 긴 쪽
        const sk = stk[i] * sT;
        let vx = vel[i3] * sk, vy = vel[i3 + 1] * sk, vz = vel[i3 + 2] * sk;
        let L = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const lim = sMax * stk[i];
        if (L > lim) { const k = lim / L; vx *= k; vy *= k; vz *= k; L = lim; }
        if (f & FLAG_TAIL) {
          const i4 = i * 4;
          const dx = pos[i3] - org[i4], dy = pos[i3 + 1] - org[i4 + 1], dz = pos[i3 + 2] - org[i4 + 2];
          const dd = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const want = Math.min(dd * 0.5, tl[i]) * (1 - u) * (1 - u);
          if (want > L && dd > 1e-3) { const k = want / dd; vx = dx * k; vy = dy * k; vz = dz * k; }
        }
        gVel[w3] = vx; gVel[w3 + 1] = vy; gVel[w3 + 2] = vz;
      }
      gCA[w4] = r; gCA[w4 + 1] = g; gCA[w4 + 2] = b; gCA[w4 + 3] = a;
      w++;
    }
    this.alive = w;
    // 미뤄 둔 입자(꼬리·섬광) 만들기 — 다음 프레임부터 그려진다
    const q = this.queue;
    for (let j = 0; j < this.qn; j++) {
      const o = j * 12;
      if (q[o + 9] === 1) {
        this.emit(q[o], q[o + 1], q[o + 2], 0, 0, 0, q[o + 3], q[o + 4], q[o + 4] * 0.5, q[o + 5], q[o + 6], q[o + 7], q[o + 5], q[o + 6], q[o + 7], q[o + 8], 0, 0, 0);
      } else {
        this.emit(q[o], q[o + 1], q[o + 2], 0, -0.5, 0, q[o + 3], q[o + 4], q[o + 4] * 0.3, q[o + 5], q[o + 6], q[o + 7], q[o + 5] * 0.4, q[o + 6] * 0.2, q[o + 7] * 0.05, q[o + 8], 2, 1.5, 0);
      }
    }
    this.qn = 0;
    this._upload(w);
  }

  // 5차 껍질 별: pos = org + dir·R·(1 − e^(−k·나이)) − ½·처짐·나이² (위치를 식으로 — 판정 식과 같다). k = drag, 처짐 = grav
  _shellStep(i, i3, f, u, w) {
    const { pos, vel, c0, c1, a0, s0, s1, age, drag, grav, org, tl, stk, gPS, gVel, gCA } = this;
    const i4 = i * 4;
    const A = age[i];
    const k = drag[i];
    const ex = Math.exp(-k * A);
    const e = 1 - ex;
    pos[i3] = org[i4] + vel[i3] * e;
    pos[i3 + 1] = org[i4 + 1] + vel[i3 + 1] * e - 0.5 * grav[i] * A * A;
    pos[i3 + 2] = org[i4 + 2] + vel[i3 + 2] * e;
    let r = c0[i3], g = c0[i3 + 1], b = c0[i3 + 2];
    if (f & FLAG_HOT && A < 0.05) {
      const h = (1 - A / 0.05) * 0.7; // 터지는 순간 흰 코어는 짧고 약하게(뭉쳐서 흰 공처럼 보이지 않게)
      r += (THREAT.hot[0] - r) * h; g += (THREAT.hot[1] - g) * h; b += (THREAT.hot[2] - b) * h;
    }
    if (u > 0.55) {
      const m = (u - 0.55) / 0.45;
      r += (c1[i3] - r) * m; g += (c1[i3 + 1] - g) * m; b += (c1[i3 + 2] - b) * m;
    }
    let a = a0[i] * this.gdim[this.grp[i]];
    if (A < 0.1) a *= 0.05 + 0.95 * (A / 0.1) * (A / 0.1); // 10차: 한 점에 겹친 첫 순간은 옅게(흰 덩어리 방지)
    if (u > 0.72) a *= 1 - (u - 0.72) / 0.28;
    if (f & FLAG_FLICKER && u > 0.5) a *= 0.55 + 0.45 * Math.sin(A * 31 + i * 1.7);
    const size = s0[i] + (s1[i] - s0[i]) * u;
    const w4 = w * 4, w3 = w * 3;
    gPS[w4] = pos[i3]; gPS[w4 + 1] = pos[i3 + 1]; gPS[w4 + 2] = pos[i3 + 2]; gPS[w4 + 3] = size;
    // 줄무늬 = 순간 속도 × 0.05초, 꼬리(FLAG_TAIL) = 지나온 길(최대 tl)
    const sk = RENDER.streakTime * stk[i];
    let vx = vel[i3] * k * ex * sk, vy = (vel[i3 + 1] * k * ex - grav[i] * A) * sk, vz = vel[i3 + 2] * k * ex * sk;
    if (f & FLAG_TAIL) {
      const dx = pos[i3] - org[i4], dy = pos[i3 + 1] - org[i4 + 1], dz = pos[i3 + 2] - org[i4 + 2];
      const dd = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const want = Math.min(dd * 0.7, tl[i]) * (1 - u * 0.6);
      const L = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (want > L && dd > 1e-3) { const q = want / dd; vx = dx * q; vy = dy * q; vz = dz * q; }
    }
    gVel[w3] = vx; gVel[w3 + 1] = vy; gVel[w3 + 2] = vz;
    gCA[w4] = r; gCA[w4 + 1] = g; gCA[w4 + 2] = b; gCA[w4 + 3] = a;
  }

  // 지금 이 별의 순간 속도(껍질 별) — 퍼펙트 때 갈라지게 하려고
  shellVel(i, out) {
    const i3 = i * 3;
    const k = this.drag[i];
    const ex = Math.exp(-k * this.age[i]);
    out[0] = this.vel[i3] * k * ex; out[1] = this.vel[i3 + 1] * k * ex - this.grav[i] * this.age[i]; out[2] = this.vel[i3 + 2] * k * ex;
    return out;
  }

  // 껍질 별을 자유 입자로 바꿔 (vx,vy,vz)로 흘려보낸다(퍼펙트: 새 옆에서 양옆으로 갈라져 길게 흐름)
  part(i, vx, vy, vz, stretch = 3) {
    const i3 = i * 3, i4 = i * 4;
    this.flags[i] = (this.flags[i] & ~(FLAG_SHELL | FLAG_TAIL)) | FLAG_FLICKER;
    this.vel[i3] = vx; this.vel[i3 + 1] = vy; this.vel[i3 + 2] = vz;
    this.org[i4] = this.pos[i3]; this.org[i4 + 1] = this.pos[i3 + 1]; this.org[i4 + 2] = this.pos[i3 + 2];
    this.drag[i] = 2.2;
    this.grav[i] = 1.5;
    this.stk[i] = stretch;
    this.life[i] = this.age[i] + 0.45;
  }

  // 위협 구 불씨 한 칸(위치는 식으로: org + off × (1 − e^(−k·나이)), 무너질 때만 아래로)
  _holdStep(i, i3, f, u, w) {
    const { pos, vel, c0, c1, a0, s0, s1, age, life, grav, org, hold, gPS, gVel, gCA } = this;
    const i4 = i * 4;
    const A = age[i];
    const ex = Math.exp(-HOLD_K * A);
    const e = 1 - ex;
    pos[i3] = org[i4] + vel[i3] * e;
    pos[i3 + 1] = org[i4 + 1] + vel[i3 + 1] * e;
    pos[i3 + 2] = org[i4 + 2] + vel[i3 + 2] * e;
    const H = hold[i];
    let r = c0[i3], g = c0[i3 + 1], b = c0[i3 + 2];
    let a = a0[i];
    let size = s0[i];
    if (A < 0.1) {
      const h = 1 - A / 0.1;
      r += (THREAT.hot[0] - r) * h; g += (THREAT.hot[1] - g) * h; b += (THREAT.hot[2] - b) * h;
    }
    if (A > H) {
      const m = Math.min(1, (A - H) / Math.max(0.05, life[i] - H));
      const tt = A - H;
      pos[i3 + 1] -= 0.5 * grav[i] * tt * tt;
      r += (c1[i3] - r) * m; g += (c1[i3 + 1] - g) * m; b += (c1[i3 + 2] - b) * m;
      a *= (1 - m) * (1 - m);
      size = s0[i] + (s1[i] - s0[i]) * m;
    } else if (f & FLAG_FLICKER) {
      a *= 0.55 + 0.45 * Math.sin(A * 23 + i * 1.7);
    }
    const w4 = w * 4, w3 = w * 3;
    gPS[w4] = pos[i3]; gPS[w4 + 1] = pos[i3 + 1]; gPS[w4 + 2] = pos[i3 + 2]; gPS[w4 + 3] = size;
    // 줄무늬: 퍼지는 동안만(속도 = off × k × e^(−k·나이))
    const sk = HOLD_K * ex * RENDER.streakTime * 1.6;
    gVel[w3] = vel[i3] * sk; gVel[w3 + 1] = vel[i3 + 1] * sk; gVel[w3 + 2] = vel[i3 + 2] * sk;
    gCA[w4] = r; gCA[w4 + 1] = g; gCA[w4 + 2] = b; gCA[w4 + 3] = a;
  }

  _upload(count) {
    this.geometry.instanceCount = count;
    for (const [attr, size] of [[this.psAttr, 4], [this.velAttr, 3], [this.caAttr, 4]]) {
      attr.clearUpdateRanges();
      if (count > 0) attr.addUpdateRange(0, count * size);
      attr.needsUpdate = true;
    }
  }

  clear() {
    for (let k = 0; k < this.alive; k++) this.free[this.freeTop++] = this.list[k];
    this.alive = 0;
    this.qn = 0;
    this._upload(0);
  }
}
