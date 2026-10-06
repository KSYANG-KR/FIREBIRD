// 서울풍 가상 도시(6차, S1 「강과 도심」): 지류(시작 강, 다리 A) → 강변을 넘어 대로·빌딩 협곡 → 옥상 지대 → 본류(끝 강, 다리 B).
// 코스(course.js)는 이 도시를 선회·상승·하강하며 지난다. 강·도로·다리는 세계 좌표 선이고, 모든 도로·다리는 끝이 다른 길에 붙거나 안개 너머까지 이어진다.
// 층(레이어): 수면·바지선 / 둔치(군중)·강변도로 / 협곡 유리 빌딩·옥상(물탱크·실외기·안테나) / 강변 아파트(동 번호) / 원경 아파트 / 산 능선.
// 실존 랜드마크·실제 상호·전파탑 없음. 지명·상호는 가상 일반명사.
// 품질 예산 순서: 높이 안개 → 수면·유리의 불꽃 반사 → 창 불빛 밀도 → 블룸.
// 그리기 호출을 줄이려고 같은 종류는 모두 인스턴스 한 번으로 그린다(건물 1, 구조물 1, 불빛 1, 간판 1 …).
import * as THREE from 'three';
import { SIGNS, LIGHTS, CITY, COURSE, remapS } from './config.js';
// 12차 단위 3: 옛 코스(872m)에 고정했던 s 값은 remapS(옛 s)로 옮긴다(직선만 늘림 — 「비율로 옮김」). 코스 끝까지 도는 반복은 COURSE.length 까지
const S_END = () => COURSE.length + 150;
import { FLASH_GLSL } from './lights.js';
import { FACADES } from './assets.js';
import { Path2D } from './course.js';

const N = LIGHTS.count;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HASH_GLSL = /* glsl */ `
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
// 5차 B0: 배경 색 보정 — 채도 −20%, 대비 −15%(기준 0.08 둘레로 눌러 줌). 불꽃·위협은 이 보정을 거치지 않는다
vec3 bgGrade(vec3 c) {
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, 0.8);
  return 0.08 * pow(max(c, vec3(0.0)) / 0.08, vec3(0.85));
}
`;

// 높이 안개: 낮을수록 짙고, 낮은 곳은 도시 불빛(주황) 색 — 「도시광 안개」. 폭발 순간광이 안개를 비춘다.
const FOG_GLSL = /* glsl */ `
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uCityGlow;
varying float vFogDepth;
vec3 applyFogK(vec3 c, vec3 wp, float k) {
  float hf = exp(-max(wp.y, 0.0) * 0.018);
  float dens = uFogDensity * (0.55 + 0.9 * hf) * k;
  float f = clamp(1.0 - exp(-dens * dens * vFogDepth * vFogDepth), 0.0, 1.0);
  if (f < 0.002) return c;
  vec3 fc = mix(uFogColor, uCityGlow, hf * 0.75); // 11차 배5: 낮은 층 도시광 색 비율 0.65 → 0.75
  if (f > 0.03) fc += flashVol(wp) * 0.05;
  return mix(c, fc, f);
}
vec3 applyFog(vec3 c, vec3 wp) { return applyFogK(c, wp, 1.0); }
`;

const LIGHT_GLSL = /* glsl */ `
uniform vec3 uAmbient;
vec3 ambientAt(vec3 wp, vec3 n) {
  float sky = 0.5 + 0.5 * n.y;
  float moon = max(dot(n, normalize(vec3(-0.38, 0.42, -0.82))), 0.0);
  return uAmbient * (0.6 * sky + 0.5) + vec3(0.06, 0.07, 0.11) * moon + uCityGlow * 0.22 * exp(-max(wp.y, 0.0) * 0.025) * (0.6 - 0.4 * n.y);
}
// 불꽃 빛이 유리·젖은 면에 비친 반짝임
vec3 flashSpec(vec3 wp, vec3 n, float pw) {
  vec3 V = normalize(wp - cameraPosition);
  vec3 R = reflect(V, n);
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${N}; i++) {
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    vec3 L = uLPos[i].xyz - wp;
    float d = max(length(L), 0.001);
    float x = clamp(dot(R, L / d), 0.0, 1.0);
    s += c * (x > 1e-4 ? exp2(pw * log2(x)) : 0.0) * min(1.0, 160.0 / d); // pow(0, n) 이 일부 그래픽 드라이버에서 NaN 이 되는 것을 피한다
  }
  return s;
}
`;

// 건물(아파트·업무 유리·상가·옥상 구조물). aInfo: 씨앗, 종류(0 아파트 1 유리 2 상가 3 구조물), 점등률, 밝기
function makeBuildingMaterial(shared) {
  const blank = shared.uBlank.value;
  return new THREE.ShaderMaterial({
    uniforms: {
      ...shared,
      uFacadeOn: { value: 0 },
      uFC0: { value: blank }, uFE0: { value: blank },
      uFC1: { value: blank }, uFE1: { value: blank },
      uFC2: { value: blank }, uFE2: { value: blank },
      uFTile: { value: new THREE.Vector3(...FACADES.map((f) => f.tile)) },
      uFDark: { value: new THREE.Vector3(...FACADES.map((f) => f.dark)) },
      uFCells2: { value: new THREE.Vector2(...FACADES[2].cells) },
      uFCells1: { value: new THREE.Vector2(...FACADES[1].cells) },
      uRoom: { value: blank }, uRoomOn: { value: 0 }, // 12차 배8: 창 안 실내 그림 아틀라스(생성 6장, 3×2)
    },
    vertexShader: /* glsl */ `
      attribute vec4 aInfo;
      varying vec3 vWP;
      varying vec3 vN;
      varying vec3 vNL;
      varying vec3 vLocal;
      varying vec3 vScale;
      varying vec4 vInfo;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vWP = wp.xyz;
        vN = normalize(mat3(m) * normal);
        vNL = normal;
        vLocal = position;
        vScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
        vInfo = aInfo;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uFacadeOn;
      uniform sampler2D uFC0; uniform sampler2D uFE0;
      uniform sampler2D uFC1; uniform sampler2D uFE1;
      uniform sampler2D uFC2; uniform sampler2D uFE2;
      uniform vec3 uFTile; uniform vec3 uFDark; uniform vec2 uFCells2; uniform vec2 uFCells1;
      uniform sampler2D uRoom; uniform float uRoomOn;
      uniform float uTime;
      varying vec3 vWP; varying vec3 vN; varying vec3 vNL; varying vec3 vLocal; varying vec3 vScale; varying vec4 vInfo;
      ${HASH_GLSL}
      ${FLASH_GLSL}
      ${FOG_GLSL}
      ${LIGHT_GLSL}
      // 창 칸 격자: cell 좌표, 창 사각형(lo~hi), 점등률 → (창 색, 창 마스크)
      vec4 windows(vec2 cell, vec2 lo, vec2 hi, float seed, float lit, float gain) {
        vec2 fw = fwidth(cell);
        vec2 id = floor(cell);
        vec2 f = fract(cell);
        vec2 mk = smoothstep(lo - fw, lo + fw, f) * (1.0 - smoothstep(hi - fw, hi + fw, f));
        vec2 hid = vec2(floor(id.x / 2.0), id.y); // 11차 배3: 가로 2칸 = 한 집(함께 켜고 끔)
        float h = hash(hid + seed * 13.1);
        float k2 = hash(hid + vec2(seed, 7.0));
        // 11차 배3: 색온도는 건물(단지) 단위로 치우침 — 따뜻한 2700K 단지 / 백색 LED 4000K 단지, 집마다 20% 는 다른 색
        float bt = hash(vec2(seed, 21.7));
        vec3 warm = vec3(1.0, 0.6, 0.3), led = vec3(0.92, 0.9, 0.86);
        vec3 wc = k2 < 0.8 ? (bt < 0.5 ? warm : led) : (bt < 0.5 ? led : warm);
        if (k2 > 0.97) wc = vec3(0.76, 0.86, 1.0);
        wc *= (0.35 + 0.55 * hash(id + vec2(3.0, 9.0))) * gain;
        float k3 = hash(id + vec2(11.0, seed));
        vec2 wf = (f - lo) / max(hi - lo, vec2(1e-3));
        if (k3 < 0.2) wc *= 0.5 + 0.5 * step(0.45, fract(wf.y * 7.0)); // 블라인드(가로 살)
        else if (k3 < 0.42) wc *= mix(0.35, 1.0, 1.0 - smoothstep(0.1, 0.3, abs(wf.x - 0.5))); // 커튼(양옆 어둡게)
        else if (k3 > 0.99) wc = vec3(0.45, 0.6, 1.0) * gain * (0.45 + 0.35 * sin(uTime * 6.0 + id.x * 3.1) * sin(uTime * 2.3 + id.y)); // TV
        // 아래쪽이 조금 더 밝은 실내 빛(천장등이 아래 벽을 비춤)
        wc *= 0.8 + 0.35 * (1.0 - wf.y);
        vec3 on = h < lit ? wc : vec3(0.012, 0.014, 0.02);
        // 멀어서 창이 한 픽셀보다 작으면 평균 밝기로 녹인다(무아레 방지)
        float far = smoothstep(0.3, 0.85, max(fw.x, fw.y));
        vec3 avg = vec3(0.85, 0.62, 0.4) * gain * 0.55 * lit * (hi.x - lo.x) * (hi.y - lo.y);
        return vec4(mix(on * mk.x * mk.y, avg, far), mix(mk.x * mk.y, (hi.x - lo.x) * (hi.y - lo.y), far));
      }
      // 5차 interior mapping(가짜 실내): 창 칸 하나를 폭 3.3 × 높이 2.8 × 깊이 4m 방으로 보고, 시선이 방 안 벽·바닥·천장에 닿는 곳을 그린다.
      // 방마다(칸 해시) 벽 색·가구 실루엣·천장등이 다르다. 파일 없이 셰이더로만.
      vec3 interior(vec2 f, vec2 id, float seed, vec3 N, vec3 lightCol) {
        vec3 V = normalize(vWP - cameraPosition);
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 T = normalize(cross(N, up));
        vec3 d = vec3(dot(V, T) / 3.3, dot(V, up) / 2.8, max(dot(V, -N), 0.05) / 4.0);
        vec3 o = vec3(f, 0.0);
        float tx = d.x > 0.0 ? (1.0 - o.x) / d.x : -o.x / min(d.x, -1e-4);
        float ty = d.y > 0.0 ? (1.0 - o.y) / d.y : -o.y / min(d.y, -1e-4);
        float tz = 1.0 / d.z;
        float t = min(min(tx, ty), tz);
        vec3 p = o + d * t;
        float r = hash(id + vec2(seed * 3.7, 5.1));
        vec3 wall = r < 0.3 ? vec3(0.78, 0.7, 0.58) : (r < 0.55 ? vec3(0.62, 0.68, 0.6) : (r < 0.8 ? vec3(0.7, 0.7, 0.72) : vec3(0.56, 0.6, 0.72)));
        vec3 c;
        if (t == tz) {
          c = wall * 0.8;
          // 가구 실루엣(소파·책장·액자)
          float r2 = hash(id + vec2(9.3, seed));
          if (r2 < 0.5 && p.y < 0.32 && p.x > 0.18 && p.x < 0.78) c *= 0.25;
          else if (r2 > 0.7 && p.x > 0.72 && p.y < 0.75) c *= 0.3;
          if (r2 > 0.35 && r2 < 0.6 && p.y > 0.5 && p.y < 0.68 && p.x > 0.35 && p.x < 0.6) c = mix(c, vec3(0.3, 0.35, 0.45), 0.7);
        } else if (t == ty) {
          c = d.y < 0.0 ? vec3(0.32, 0.22, 0.14) : wall * 1.15;
          if (d.y > 0.0) c += lightCol * 0.9 * exp(-dot(p.xz - vec2(0.5, 0.45), p.xz - vec2(0.5, 0.45)) * 18.0); // 천장등
        } else {
          c = wall * 0.62;
        }
        // 안쪽일수록 어둡게(창가가 밝다)
        c *= mix(1.0, 0.5, p.z);
        return c * lightCol * 0.62;
      }
      void main() {
        float seed = floor(vInfo.x + 0.5);
        float kind = floor(vInfo.y + 0.5);
        float lit = vInfo.z;
        float gain = vInfo.w;
        bool side = abs(vNL.y) < 0.5;
        float topM = (1.0 - vLocal.y) * vScale.y;
        float hx = abs(vNL.x) > 0.5 ? vLocal.z * vScale.z * sign(vNL.x) : -vLocal.x * vScale.x * sign(vNL.z);
        float faceW = abs(vNL.x) > 0.5 ? vScale.z : vScale.x;
        vec3 amb = ambientAt(vWP, vN);
        vec3 albedo;
        vec3 col;
        if (kind < 0.5) {
          // ---- 아파트: 밝은 벽 + 층마다 발코니 창(동 번호는 간판 아틀라스로 따로) ----
          albedo = vec3(0.46, 0.45, 0.43) * (0.85 + 0.3 * hash(vec2(seed, 2.0)));
          col = albedo * amb;
          float dcam = length(vWP - cameraPosition);
          if (side && dcam > 420.0) {
            // 5차 B8 원경: 창 대신 4층×5칸 블록마다 켜진 비율을 구운 듯한 평균 빛(계산을 크게 줄임)
            vec2 bc = vec2(hx / 6.6, vWP.y / 5.6);
            vec2 blk = floor(bc);
            vec2 fwb = fwidth(bc);
            float on = step(hash(blk + seed), lit) * (0.6 + 0.4 * hash(blk + seed + 7.0));
            float bt = hash(vec2(seed, 21.7));
            vec3 wc = mix(bt < 0.5 ? vec3(1.0, 0.66, 0.36) : vec3(0.92, 0.9, 0.86), bt < 0.5 ? vec3(0.92, 0.9, 0.86) : vec3(1.0, 0.66, 0.36), step(0.8, hash(blk + seed + 3.0)));
            // 블록이 화소보다 작으면 평균으로 녹인다
            float far2 = smoothstep(0.25, 0.7, max(fwb.x, fwb.y));
            float m = mix(on, lit * 0.8, far2);
            col = mix(albedo * amb, wc * gain * 0.4, m * 0.6 * step(4.0, vWP.y) * step(1.4, topM));
          } else if (side) {
            if (faceW > 16.0) {
              vec4 w = windows(vec2(hx / 3.3 + seed, vWP.y / 2.8), vec2(0.1, 0.24), vec2(0.9, 0.9), seed, lit, gain);
              float rows = step(4.0, vWP.y) * step(1.4, topM);
              // 11차 배3: 220m 안 켜진 창은 interior mapping(190~220m 에서 평면 창으로 녹아든다)
              vec2 cell0 = vec2(hx / 3.3 + seed, vWP.y / 2.8);
              vec2 cf0 = fract(cell0);
              if (dcam < 220.0) {
                vec2 cell = cell0;
                vec2 cid = floor(cell);
                vec2 cf = cf0;
                vec2 wf = (cf - vec2(0.1, 0.24)) / vec2(0.8, 0.66);
                vec2 hid = vec2(floor(cid.x / 2.0), cid.y);
                if (hash(hid + seed * 13.1) < lit && wf.x > 0.0 && wf.x < 1.0 && wf.y > 0.0 && wf.y < 1.0) {
                  float k2 = hash(hid + vec2(seed, 7.0));
                  float bt = hash(vec2(seed, 21.7));
                  vec3 lc = k2 < 0.8 ? (bt < 0.5 ? vec3(1.0, 0.6, 0.3) : vec3(0.92, 0.9, 0.86)) : (bt < 0.5 ? vec3(0.92, 0.9, 0.86) : vec3(1.0, 0.6, 0.3));
                  lc *= (0.5 + 0.5 * hash(cid + vec2(3.0, 9.0))) * gain;
                  vec3 ic = interior(wf, cid, seed, normalize(vN), lc);
                  // 12차 배8: 실내 그림(생성 이미지 6종 중 집마다 하나) — 시선 따라 조금 밀려 깊이감, 그 집 불빛 색으로 살짝 물들임
                  if (uRoomOn > 0.5) {
                    vec3 Nn = normalize(vN), Vv = normalize(vWP - cameraPosition), Tt = normalize(cross(Nn, vec3(0.0, 1.0, 0.0)));
                    vec2 par = vec2(dot(Vv, Tt), dot(Vv, vec3(0.0, 1.0, 0.0))) * 0.12;
                    vec2 ruv = clamp(wf * 0.86 + 0.07 + par, 0.0, 1.0);
                    float ri = floor(hash(hid + vec2(seed * 5.3, 2.9)) * 5.999);
                    vec2 tl = vec2(mod(ri, 3.0), floor(ri / 3.0));
                    vec3 rc = texture2D(uRoom, vec2((tl.x + ruv.x) / 3.0, 1.0 - (tl.y + 1.0 - ruv.y) / 2.0)).rgb;
                    float lm = max(max(lc.r, lc.g), max(lc.b, 0.01));
                    ic = mix(ic, rc * (0.6 + 0.4 * hash(cid + 2.0)) * gain * 1.15 * mix(vec3(1.0), lc / lm, 0.25), 0.88);
                  }
                  float k3 = hash(cid + vec2(11.0, seed));
                  if (k3 < 0.2) ic = mix(ic, w.rgb, 0.75); // 블라인드가 내려진 창은 실내가 거의 안 보임
                  float near = 1.0 - smoothstep(190.0, 220.0, dcam);
                  w.rgb = mix(w.rgb, ic, near);
                }
              }
              // 11차 배3: 확장 발코니 새시(창마다 세로 문살 2개, 폭 0.06m) · 실외기(창 아래 20% 칸, 어두운 상자, 집마다 있거나 없음)
              {
                vec2 fwc = fwidth(cell0);
                float wx = (cf0.x - 0.1) / 0.8;
                float mull = 0.0;
                for (int q = 1; q <= 2; q++) mull = max(mull, 1.0 - smoothstep(0.0, 0.0115 + fwc.x * 1.2, abs(wx - float(q) / 3.0)));
                w.rgb *= 1.0 - 0.75 * mull * step(0.0, wx) * step(wx, 1.0) * (1.0 - smoothstep(0.3, 0.6, max(fwc.x, fwc.y)));
                float acOn = step(0.45, hash(floor(cell0) + vec2(seed * 3.7, 17.0)));
                float acx = step(0.55, cf0.x) * step(cf0.x, 0.82);
                float acy = step(0.02, cf0.y) * step(cf0.y, 0.2);
                col = mix(col, albedo * amb * 0.35, acOn * acx * acy * step(4.0, vWP.y) * step(1.4, topM) * (1.0 - smoothstep(0.3, 0.6, max(fwc.x, fwc.y))));
              }
              vec2 f = fract(vec2(hx / 3.3, vWP.y / 2.8));
              float rail = smoothstep(0.17, 0.2, f.y) * (1.0 - smoothstep(0.23, 0.26, f.y)) * rows;
              col = mix(col, w.rgb, w.a * rows) + albedo * amb * rail * 0.5;
              // 5차 B2: 층마다 슬래브 띠(밝은 콘크리트 선 + 아래 그늘)
              float fy = fract(vWP.y / 2.8);
              float slab = (smoothstep(0.0, 0.02, fy) - smoothstep(0.05, 0.08, fy)) * rows;
              float shade = (smoothstep(0.08, 0.1, fy) - smoothstep(0.1, 0.16, fy)) * rows;
              col = col + albedo * amb * slab * 0.45 - col * shade * 0.25;
            } else {
              // 옆벽: 가운데 계단실 창 한 줄
              vec4 w = windows(vec2(hx / 2.4 + 0.5, vWP.y / 2.8), vec2(0.3, 0.35), vec2(0.7, 0.8), seed + 3.0, 0.9, gain * 0.6);
              float strip = step(abs(hx), 1.2) * step(4.0, vWP.y) * step(1.4, topM);
              col = mix(col, w.rgb, w.a * strip);
              // 12차 배6: 측벽 2~3색 띠 도색(단지마다 색, 위쪽) — 가상 단지명 없이 색 띠만
              float bk = hash(vec2(seed, 31.0));
              vec3 bc1 = bk < 0.33 ? vec3(0.22, 0.52, 0.58) : (bk < 0.66 ? vec3(0.72, 0.42, 0.24) : vec3(0.3, 0.55, 0.32));
              vec3 bc2 = bk < 0.5 ? vec3(0.62, 0.62, 0.66) : vec3(0.75, 0.66, 0.42);
              float inW = step(abs(hx), faceW * 0.5 - 0.5);
              float b1 = (smoothstep(2.6, 2.75, topM) - smoothstep(4.4, 4.55, topM)) * inW;
              float b2 = (smoothstep(5.0, 5.15, topM) - smoothstep(5.6, 5.75, topM)) * inW;
              float b3 = (smoothstep(6.2, 6.35, topM) - smoothstep(6.5, 6.65, topM)) * inW * step(0.5, hash(vec2(seed, 33.0)));
              col = mix(col, bc1 * amb * 1.7, b1 * 0.85);
              col = mix(col, bc2 * amb * 1.6, max(b2, b3) * 0.8);
            }
            col *= mix(0.3, 1.0, step(3.6, vWP.y)); // 1층 필로티(어둡게)
            col = mix(col, albedo * amb * 1.25, 1.0 - smoothstep(0.4, 0.75, topM));
          } else {
            col = albedo * amb * 0.45;
          }
        } else if (kind < 2.5) {
          // ---- 업무 유리(1)·상가(2): 실사 외벽 텍스처(ambientCG). 없으면 코드 창 ----
          albedo = vec3(0.16, 0.17, 0.2);
          col = albedo * amb;
          if (side) {
            float sc = 0.7 + 0.6 * hash(vec2(seed, 5.3));
            if (uFacadeOn > 0.5) {
              float fi = kind < 1.5 ? 0.0 : (hash(vec2(seed, 1.7)) < 0.6 ? 2.0 : 1.0);
              float tile = fi < 0.5 ? uFTile.x : (fi < 1.5 ? uFTile.y : uFTile.z);
              float dark = fi < 0.5 ? uFDark.x : (fi < 1.5 ? uFDark.y : uFDark.z);
              vec2 uv = vec2(hx / (tile * sc) + hash(vec2(seed, 9.1)), vWP.y / (tile * sc) + floor(hash(vec2(seed, 1.1)) * 7.0) / 7.0);
              vec3 c0 = texture2D(uFC0, uv).rgb, e0 = texture2D(uFE0, uv).rgb;
              vec3 c1 = texture2D(uFC1, uv).rgb, e1 = texture2D(uFE1, uv).rgb;
              vec3 c2 = texture2D(uFC2, uv).rgb, e2 = texture2D(uFE2, uv).rgb;
              vec3 fc = fi < 0.5 ? c0 : (fi < 1.5 ? c1 : c2);
              vec3 fe = fi < 0.5 ? e0 : (fi < 1.5 ? e1 : e2);
              vec2 cells = fi < 1.5 ? uFCells1 : uFCells2;
              float on = hash(floor(uv * cells) + vec2(seed * 7.13, seed * 1.31)) < lit ? 1.0 : 0.06;
              albedo = fc * dark;
              col = albedo * amb * 1.6 + fe * on * gain * 0.75 * step(4.6, vWP.y);
            } else {
              vec4 w = windows(vec2(hx / 2.2, vWP.y / 3.4), vec2(0.15, 0.3), vec2(0.85, 0.85), seed, lit, gain);
              col = mix(col, w.rgb, w.a * step(4.6, vWP.y));
            }
            if (kind > 1.5) {
              // 1층 가게 유리(밝은 띠, 가게마다 색)
              float shop = step(0.5, vWP.y) * (1.0 - step(4.0, vWP.y));
              float sid = floor(hx / 6.0);
              vec3 sc2 = hash(vec2(sid, seed)) < 0.5 ? vec3(1.0, 0.85, 0.6) : vec3(0.75, 0.9, 1.0);
              float open = step(0.25, hash(vec2(sid, seed + 2.0)));
              float frame = step(0.08, fract(hx / 6.0)) * step(fract(hx / 6.0), 0.92);
              col = mix(col, sc2 * (0.25 + 0.3 * hash(vec2(sid, seed + 5.0))) * open * frame * (0.75 + 0.25 * smoothstep(0.5, 3.5, vWP.y)), shop);
            }
            if (kind < 1.5) {
              col += flashSpec(vWP, vN, 60.0) * 0.6 + vec3(0.02, 0.03, 0.05) * pow(1.0 - abs(dot(normalize(vWP - cameraPosition), vN)), 3.0);
              // 5차 B2: 유리 커튼월 멀리언(세로 1.5m)·층 띠(3.4m)
              vec2 fwm = fwidth(vec2(hx / 1.5, vWP.y / 3.4));
              float mul = 1.0 - smoothstep(0.0, fwm.x * 1.5 + 0.02, min(fract(hx / 1.5), 1.0 - fract(hx / 1.5)));
              float flr = 1.0 - smoothstep(0.0, fwm.y * 1.5 + 0.03, min(fract(vWP.y / 3.4), 1.0 - fract(vWP.y / 3.4)));
              col = mix(col, vec3(0.05, 0.055, 0.065) * amb * 4.0, max(mul * 0.6, flr * 0.8) * step(4.6, vWP.y));
            }
            col = mix(col, albedo * amb * 1.4, 1.0 - smoothstep(0.35, 0.6, topM));
          } else {
            col = albedo * amb * 0.5;
          }
        } else {
          // ---- 옥상 구조물·기둥 ----
          albedo = vec3(0.2, 0.2, 0.22);
          col = albedo * amb;
        }
        // 12차 배6: 바닥 쪽 그늘(땅에 가까울수록 어둡게, 9m 까지)
        if (side) col *= mix(0.55, 1.0, smoothstep(0.0, 9.0, vLocal.y * vScale.y));
        col = bgGrade(col);
        col += albedo * 3.0 * flashAt(vWP, vN, 0.2);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 구조물(철교·고가·교각): 인스턴스마다 색·발광·불투명도(가림 처리 — 디더링으로 그리기 호출을 늘리지 않는다)
function makeStructMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { ...shared },
    vertexShader: /* glsl */ `
      attribute vec2 aFE; // 불투명도, 발광
      varying vec3 vWP;
      varying vec3 vN;
      varying vec3 vCol;
      varying vec2 vFE;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vWP = wp.xyz;
        vN = normalize(mat3(m) * normal);
        #ifdef USE_INSTANCING_COLOR
        vCol = instanceColor;
        #else
        vCol = vec3(0.5);
        #endif
        vFE = aFE;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWP; varying vec3 vN; varying vec3 vCol; varying vec2 vFE;
      ${HASH_GLSL}
      ${FLASH_GLSL}
      ${FOG_GLSL}
      ${LIGHT_GLSL}
      float bayer(vec2 p) {
        vec2 q = mod(floor(p), 4.0);
        float i = q.x + q.y * 4.0;
        // 4×4 베이어 행렬
        float b = 0.0;
        if (i < 0.5) b = 0.0; else if (i < 1.5) b = 8.0; else if (i < 2.5) b = 2.0; else if (i < 3.5) b = 10.0;
        else if (i < 4.5) b = 12.0; else if (i < 5.5) b = 4.0; else if (i < 6.5) b = 14.0; else if (i < 7.5) b = 6.0;
        else if (i < 8.5) b = 3.0; else if (i < 9.5) b = 11.0; else if (i < 10.5) b = 1.0; else if (i < 11.5) b = 9.0;
        else if (i < 12.5) b = 15.0; else if (i < 13.5) b = 7.0; else if (i < 14.5) b = 13.0; else b = 5.0;
        return (b + 0.5) / 16.0;
      }
      void main() {
        if (vFE.x < 0.999 && bayer(gl_FragCoord.xy) > vFE.x) discard;
        vec3 amb = ambientAt(vWP, vN);
        // 다리 조명이 아래에서 비추는 느낌(낮은 곳 따뜻하게)
        vec3 col = vCol * amb * 1.3 + vCol * vec3(0.9, 0.7, 0.5) * 0.18 * (1.0 - smoothstep(4.0, 24.0, vWP.y));
        col += vCol * 3.0 * flashAt(vWP, vN, 0.25) + flashSpec(vWP, vN, 40.0) * 0.25;
        col += vCol * vFE.y;
        // 5차 B3: 아래를 보는 면(상판·고가 아랫면)은 물·강변 불빛이 올려 비춘 따뜻한 반사광을 받는다(단색 검은 아랫면 방지)
        col += (vCol * 2.0 + vec3(0.03)) * vec3(0.95, 0.72, 0.5) * (0.35 + 0.65 * max(-vN.y, 0.0)) * (1.0 - max(vN.y, 0.0)) * (1.0 - smoothstep(10.0, 26.0, vWP.y)) * 0.55;
        // 물에 닿는 부분(수면 위 1.4m 까지) 젖은 어두운 띠 + 살짝 젖은 반짝임
        float wet = 1.0 - smoothstep(0.9, 1.5, vWP.y);
        col *= 1.0 - 0.6 * wet * step(vFE.y, 0.01);
        col = bgGrade(col);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 바닥 한 장: 강(마스크 안)은 물, 밖은 도시 땅(가로등 불빛 점). 물: 노이즈 물결, 하늘·도시광 반사, 불꽃 빛의 세로 줄무늬 반사.
function makeGroundMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: {
      ...shared,
      uMask: { value: shared.uBlank.value },
      uMaskBox: { value: new THREE.Vector4(0, 0, 1, 1) }, // x0, z0, 크기x, 크기z
      uWaterCol: { value: new THREE.Color() },
      uLandCol: { value: new THREE.Color() },
      uSkyLow: { value: new THREE.Color() },
      uSkyTop: { value: new THREE.Color() },
      uLamp: { value: new THREE.Color() },
      uReflect: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWP;
      varying float vFogDepth;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWP = wp.xyz;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMask; uniform vec4 uMaskBox;
      uniform vec3 uWaterCol; uniform vec3 uLandCol; uniform vec3 uSkyLow; uniform vec3 uSkyTop; uniform vec3 uLamp;
      uniform float uTime; uniform float uReflect;
      varying vec3 vWP;
      ${HASH_GLSL}
      ${FLASH_GLSL}
      ${FOG_GLSL}
      vec3 vnoiseD(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        vec2 du = 6.0 * f * (1.0 - f);
        float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
        return vec3(a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y,
                    du * (vec2(b - a, c - a) + (a - b - c + d) * u.yx));
      }
      // 5차 B6: 물 법선 두 겹(서로 다른 방향으로 흐르는 방향성 물결의 합) — 격자 노이즈를 쓰지 않아 네모 픽셀이 없다.
      // 겹 1: 긴 바람 물결(4~9m), 겹 2: 비스듬한 잔물결(0.8~2m). 멀수록(화소보다 작은 물결) 줄여 반짝이 계단을 막는다
      vec2 waveSet(vec2 p, vec2 dir, float base, float speed, float amp, float fw) {
        vec2 g = vec2(0.0);
        for (int i = 0; i < 4; i++) {
          float fi = float(i);
          float a = fi * 0.61 - 0.9;
          vec2 d = normalize(dir + vec2(cos(a * 2.3), sin(a * 1.7)) * 0.55);
          float k = base * (1.0 + fi * 0.73);
          float lam = 6.2831 / k;
          float att = clamp(lam / (fw * 6.0) - 0.3, 0.0, 1.0); // 화소보다 짧은 물결은 끔
          float ph = dot(d, p) * k + uTime * speed * sqrt(k) * (1.0 + fi * 0.13) + fi * 1.7;
          g += d * cos(ph) * amp * k / (1.0 + fi * 0.9) * att;
        }
        return g;
      }
      vec3 waterNormal(vec2 p, float dist) {
        float fw = max(length(fwidth(p)), 0.02);
        vec2 g = waveSet(p, vec2(0.25, 1.0), 0.75, 1.1, 0.055, fw) + waveSet(p, vec2(-0.9, 0.35), 3.2, 1.7, 0.018, fw);
        g += vec2(vnoise(p * 0.07 + uTime * 0.02) - 0.5, vnoise(p.yx * 0.07 - uTime * 0.03) - 0.5) * 0.05;
        float k = 1.0 / (1.0 + dist * 0.003);
        return normalize(vec3(-g.x * k, 1.0, -g.y * k));
      }
      void main() {
        vec2 muv = (vWP.xz - uMaskBox.xy) / uMaskBox.zw;
        vec2 m = (muv.x < 0.0 || muv.y < 0.0 || muv.x > 1.0 || muv.y > 1.0) ? vec2(0.0) : texture2D(uMask, muv).rg;
        float water = smoothstep(0.35, 0.65, m.r);
        float shore = m.g; // 강가 가까움(흐리게 번진 값)
        vec3 V = normalize(vWP - cameraPosition);
        float dist = length(vWP - cameraPosition);
        // 11차 배1: 땅 = 어두운 바닥 + 저주파 얼룩(40~80m, 밝기 ±15%). 26m 격자 빛웅덩이(반복 무늬)는 없앴다 — 빛웅덩이는 실제 가로등 자리에만(바닥 무늬 인스턴스)
        float blot = 0.65 * vnoise(vWP.xz / 60.0) + 0.35 * vnoise(vWP.xz / 23.0 + 7.3);
        vec3 land = uLandCol * (0.85 + 0.3 * blot) + uLandCol * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
        // 물
        vec3 N = waterNormal(vWP.xz, dist);
        float rip = N.z * 4.0;
        vec3 R = reflect(V, N);
        R.y = abs(R.y);
        float cosT = clamp(-dot(V, N), 0.0, 1.0);
        float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
        vec3 sky = mix(mix(uSkyLow, uCityGlow, 0.45), uSkyTop, smoothstep(0.0, 0.5, R.y));
        // 강가 도시 불빛이 비친 흔들리는 띠(수평선 쪽)
        float az = atan(R.x, R.z);
        float lights = smoothstep(0.55, 1.0, vnoise(vec2(az * 140.0, 0.0)) * 0.7 + 0.5 * rip * 0.3) * exp(-R.y * 22.0);
        vec3 refl = sky * 0.7 + uLamp * lights * 0.35 * uReflect + uCityGlow * exp(-R.y * 9.0) * 0.25;
        // 프레넬: 가까운 물은 어둡게 물빛, 멀수록 하늘·도시광이 더 비친다
        vec3 wcol = uWaterCol * 0.3 + refl * mix(0.12, 1.0, fres);
        // 폭발 빛의 세로 줄무늬 반사(거울상 방향과 가까울수록)
        if (uReflect > 0.5) {
          vec2 a = normalize(V.xz);
          for (int i = 0; i < ${N}; i++) {
            vec3 c = uLCol[i].rgb;
            if (c.r + c.g + c.b < 0.01) continue;
            vec4 L = uLPos[i];
            vec3 M = vec3(L.x, -L.y, L.z);
            vec3 dm = normalize(M - cameraPosition);
            float angH = sqrt(max(0.0, 2.0 * (1.0 - dot(a, normalize(dm.xz)))));
            float dd = max(10.0, distance(cameraPosition.xz, L.xz));
            float wH = (L.w / 3.0) * 0.45 / dd + 0.004;
            float dep = V.y - dm.y;
            float s = exp(-pow(angH / wH, 2.0)) * exp(-pow(dep / (0.05 + wH * 2.5), 2.0));
            s *= 0.4 + 0.9 * smoothstep(-0.4, 0.9, rip);
            wcol += c * s * 0.9;
          }
        }
        // 강둑 가로등 불빛 줄
        float streak = smoothstep(0.6, 1.0, sin(vWP.z * 0.37 + vWP.x * 0.21 + hash(floor(vWP.xz / 7.0)) * 6.0) * 0.5 + 0.5 * rip);
        wcol += uLamp * 0.09 * shore * shore * streak;
        wcol += flashVol(vWP) * 0.05;
        vec3 col = bgGrade(mix(land, wcol, water));
        gl_FragColor = vec4(applyFogK(col, vWP, mix(1.0, 0.7, water)), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 강둑 띠(축대·둔치·강변도로·땅): 꼭짓점 색 + 가로등 불빛 웅덩이 + 순간광
function makeRibbonMaterial(shared, road = false) {
  const blank = shared.uBlank.value;
  return new THREE.ShaderMaterial({
    uniforms: { ...shared, uLamp: { value: new THREE.Color() }, uRoad: { value: road ? 1 : 0 }, uTexOn: { value: 0 }, uAsph: { value: blank }, uAsphR: { value: blank }, uPave: { value: blank }, uCross: { value: new Array(8).fill(-1e5) }, uSkyLow: { value: new THREE.Color() } },
    vertexShader: /* glsl */ `
      attribute vec3 color;
      attribute vec2 aSU; // 경로 거리, 강둑에서 거리 (11차 도로: 도로를 따라 거리, 중심에서 거리(부호))
      attribute vec2 aRK; // 11차 도로: 차도 반폭(m), 종류(0 일반 · 1 대로 · 2 다리 거리)
      varying vec3 vWP;
      varying vec3 vCol;
      varying vec2 vSU;
      varying vec2 vRK;
      varying float vFogDepth;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWP = wp.xyz;
        vCol = color;
        vSU = aSU;
        vRK = aRK;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uLamp; uniform float uRoad; uniform float uTexOn; uniform sampler2D uAsph; uniform sampler2D uAsphR; uniform sampler2D uPave; uniform float uCross[8]; uniform vec3 uSkyLow;
      varying vec3 vWP; varying vec3 vCol; varying vec2 vSU; varying vec2 vRK;
      ${HASH_GLSL}
      ${FLASH_GLSL}
      ${FOG_GLSL}
      // 선 하나(중심 c, 폭 w)의 덮임(화소 크기로 부드럽게)
      float band(float x, float c, float w, float fw) { return 1.0 - smoothstep(w * 0.5 - fw, w * 0.5 + fw, abs(x - c)); }
      vec3 roadColor() {
        float off = vSU.y, ao = abs(off), al = vSU.x, H = vRK.x, kind = vRK.y;
        vec2 tuv = vWP.xz / 4.0; // 질감: 월드 4m 반복
        float tf = length(fwidth(tuv));
        float farK = smoothstep(0.12, 0.5, tf); // 멀면 평균색으로 녹임(무아레 방지)
        float fo = max(fwidth(off), 0.01);
        vec3 col;
        if (ao < H) {
          vec3 a = uTexOn > 0.5 ? texture2D(uAsph, tuv).rgb : vec3(0.36);
          a = mix(a, vec3(0.36), farK);
          col = vec3(0.034, 0.034, 0.039) * (0.45 + 1.5 * a);
          // 노면 표시(밤이라 가로등 빛을 받은 정도로 어둡게): 중앙선 황색 실선 2줄 · 차선 백색 점선(칠 3 · 빈칸 5m) · 가장자리 백색 실선
          float yel = band(ao, 0.15, 0.15, fo);
          float wht = 0.0;
          float dash = step(fract(al / 8.0), 0.375);
          for (int k = 1; k <= 3; k++) {
            float c = 0.225 + 3.3 * float(k);
            if (c < H - 1.0) wht = max(wht, band(ao, c, 0.15, fo) * dash);
          }
          wht = max(wht, band(ao, H - 0.35, 0.15, fo));
          // 횡단보도(대로 교차로): 줄 폭 0.45 · 간격 0.45, 6m 띠
          if (kind > 0.5 && kind < 1.5) {
            for (int i = 0; i < 8; i++) {
              if (abs(al - uCross[i]) < 3.0 && ao < H - 0.6) wht = max(wht, 1.0 - smoothstep(0.5 - 0.06, 0.5 + 0.06, fract(off / 0.9 + 0.25)) );
            }
          }
          col = mix(col, vec3(0.17, 0.125, 0.035), yel * 0.9);
          col = mix(col, vec3(0.15, 0.15, 0.145), wht * 0.85);
          // 젖은 노면: 웅덩이(덮는 비율 약 20%, 1.5~6m) — 하늘·도시광을 1.6배 비춘다
          float rr = uTexOn > 0.5 ? texture2D(uAsphR, tuv * 0.37).r : 0.5;
          float pm = 0.62 * vnoise(vWP.xz / 4.5) + 0.38 * vnoise(vWP.xz / 1.7 + 3.1) + (rr - 0.5) * 0.15;
          float wet = smoothstep(0.6, 0.68, pm);
          vec3 V = normalize(vWP - cameraPosition);
          float fres = 0.04 + 0.96 * pow(1.0 - clamp(-V.y, 0.0, 1.0), 5.0);
          vec3 refl = (uSkyLow * 1.3 + uCityGlow * 0.3) * 1.6;
          col = mix(col, col * 0.4 + refl * mix(0.25, 1.0, fres), wet * 0.85);
        } else if (ao < H + 0.2) {
          col = vec3(0.075, 0.074, 0.078); // 연석(콘크리트, 0.15m 높음)
        } else {
          vec3 pv = uTexOn > 0.5 ? texture2D(uPave, tuv * 1.6).rgb : vec3(0.45);
          pv = mix(pv, vec3(0.45), farK);
          col = vec3(0.07, 0.066, 0.064) * (0.5 + 1.0 * pv);
          // 보도블록 0.3m 격자(가까울 때만)
          vec2 gq = abs(fract(vec2(al, off) / 0.3) - 0.5);
          float fg = max(fwidth(al / 0.3), 0.001);
          col *= 1.0 - 0.18 * (1.0 - smoothstep(0.47 - fg, 0.5, max(gq.x, gq.y))) * (1.0 - farK);
        }
        return col;
      }
      void main() {
        if (uRoad > 0.5) {
          vec3 rc = bgGrade(roadColor());
          rc += vec3(0.08) * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
          gl_FragColor = vec4(applyFog(rc, vWP), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec3 col = vCol;
        // 강변도로 차선(점선)
        float b = vSU.y;
        float lane = step(abs(b - 22.5), 0.12) * step(0.5, fract(vSU.x / 9.0)) + step(abs(b - 18.0), 0.1) + step(abs(b - 27.0), 0.1);
        col = mix(col, vec3(0.55, 0.5, 0.38), clamp(lane, 0.0, 1.0) * 0.45);
        // 가로등 불빛 웅덩이(둔치 산책로·도로, 30m 마다)
        float lz = fract(vSU.x / 30.0) - 0.5;
        float p1 = exp(-pow(lz * 30.0 / 7.0, 2.0) - pow((b - 12.0) / 5.0, 2.0));
        float p2 = exp(-pow((fract(vSU.x / 30.0 + 0.5) - 0.5) * 30.0 / 8.0, 2.0) - pow((b - 28.5) / 6.0, 2.0));
        col += uLamp * (p1 * 0.16 + p2 * 0.2);
        col = bgGrade(col);
        col += vCol * 3.0 * flashAt(vWP, vec3(0.0, 1.0, 0.0), 0.0);
        gl_FragColor = vec4(applyFog(col, vWP), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 하늘: 세로 그라데이션 + 지평선 도시광 + 구름(fbm) + 달 + 반짝이는 별(빛 공해로 적게). 순간광이 구름·하늘을 밝힌다.
function makeSkyMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uLPos: shared.uLPos, uLCol: shared.uLCol, uTime: shared.uTime, uCityGlow: shared.uCityGlow, uFogColor: shared.uFogColor,
      uTop: { value: new THREE.Color() },
      uBottom: { value: new THREE.Color() },
      uMoonDir: { value: new THREE.Vector3(-0.42, 0.36, -0.83).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop; uniform vec3 uBottom; uniform vec3 uCityGlow; uniform vec3 uFogColor; uniform float uTime; uniform vec3 uMoonDir;
      uniform vec4 uLPos[${N}]; uniform vec4 uLCol[${N}];
      varying vec3 vDir;
      ${HASH_GLSL}
      float fbm(vec2 p) {
        return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.03 + 7.1) + 0.15 * vnoise(p * 4.1 + 3.7);
      }
      void main() {
        vec3 d = normalize(vDir);
        float el = asin(clamp(d.y, -1.0, 1.0));
        float h = clamp(d.y * 1.6 + 0.06, 0.0, 1.0);
        vec3 col = mix(uBottom, uTop, pow(h, 0.65));
        col += uCityGlow * exp(-max(el, 0.0) * 9.0) * 0.6; // 지평선 도시광
        // 11차 배5: 광공해 돔 — 고도 0~12° 에 주황·분홍 빛(도시광 세기에 비례, 배경이라 HDR 1.0 아래)
        float dome = 1.0 - smoothstep(0.0, 0.2094, max(el, 0.0));
        col += vec3(0.353, 0.227, 0.165) * (length(uCityGlow) / 0.33) * dome * dome * 0.55;
        vec3 halo = vec3(0.0);
        vec3 wide = vec3(0.0);
        for (int i = 0; i < ${N}; i++) {
          vec3 c = uLCol[i].rgb;
          if (c.r + c.g + c.b < 0.005) continue;
          vec3 lp = uLPos[i].xyz - cameraPosition;
          float dist = length(lp);
          float ang = acos(clamp(dot(d, lp / dist), -1.0, 1.0));
          float w = min((uLPos[i].w / 3.0) * 2.2 / dist, 0.35);
          halo += c * exp(-pow(ang / w, 2.0));
          wide += c * exp(-ang / (w * 3.0)) * 0.3;
        }
        vec3 sp = d * 230.0;
        vec3 sid = floor(sp);
        float sh = hash13(sid);
        if (sh > 0.988 && el > 0.05) {
          vec3 off = vec3(hash13(sid + 1.3), hash13(sid + 2.7), hash13(sid + 5.1)) - 0.5;
          float r = length(fract(sp) - 0.5 - off * 0.5);
          float tw = 0.55 + 0.45 * sin(uTime * (1.5 + sh * 40.0) + sh * 300.0);
          col += vec3(0.75, 0.82, 1.0) * smoothstep(0.16, 0.0, r) * tw * (sh - 0.988) * 40.0 * smoothstep(0.05, 0.25, el);
        }
        float md = acos(clamp(dot(d, uMoonDir), -1.0, 1.0));
        float mr = 0.016;
        float fwm = fwidth(md);
        float disc = 1.0 - smoothstep(mr - fwm, mr + fwm, md);
        vec3 moon = vec3(0.62, 0.59, 0.51);
        col += vec3(0.55, 0.55, 0.62) * (exp(-md * 14.0) * 0.06 + exp(-md * 60.0) * 0.09);
        if (el > 0.0) {
          vec2 cuv = d.xz / (d.y + 0.12) * 0.55 + vec2(uTime * 0.006, uTime * 0.002);
          float n = fbm(cuv * 1.6);
          float cloud = smoothstep(0.5, 0.82, n) * smoothstep(0.0, 0.1, el);
          vec3 cc = uTop * 1.3 + uCityGlow * 0.35 * (1.0 - h) + vec3(0.008);
          cc += vec3(0.4, 0.4, 0.46) * exp(-md * 4.0) * 0.3;
          cc += halo * 0.45 + wide * 0.3;
          col = mix(col, cc, cloud * 0.85);
          col = mix(col, moon, disc * (1.0 - cloud * 0.85));
        }
        col += halo * 0.04 + wide * 0.04;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
}

// 먼 산 능선(전파탑 없음): 어두운 실루엣, 위로 갈수록 하늘과 이어진다
function makeRidgeMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uFogColor: shared.uFogColor, uCityGlow: shared.uCityGlow, uBase: { value: new THREE.Color(0x0a0c18) } },
    vertexShader: /* glsl */ `
      varying float vH;
      varying float vY;
      void main() {
        vH = uv.y;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uFogColor; uniform vec3 uCityGlow; uniform vec3 uBase;
      varying float vH;
      varying float vY;
      void main() {
        vec3 col = mix(mix(uFogColor, uCityGlow, 0.5) * 0.9, uBase, smoothstep(0.0, 0.7, vH));
        col += uCityGlow * 0.12 * exp(-vY * 0.01);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 11차 배5: 원경 3겹 카드(600 · 900 · 1300m, 높이 40~90m) — 메시 하나(그리기 호출 +1). 겹이 멀수록 안개색으로(35 · 60 · 80%).
// 창 점은 1겹에만(블록 평균, 점등률 0.15). 혼합 없음(불투명), 실루엣은 꼭짓점 높이로
function makeFarCardMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uFogColor: shared.uFogColor, uCityGlow: shared.uCityGlow, uTime: shared.uTime, uSkyA: { value: BLANK }, uSkyB: { value: BLANK }, uSkyOn: { value: 0 }, uSkyRep: { value: 1361 } },
    vertexShader: /* glsl */ `
      attribute vec3 aF; // 겹(0·1·2), 가로 위치(m), 높이 비율(0 바닥 ~ 1 꼭대기)
      varying vec3 vF;
      varying float vY;
      void main() {
        vF = aF;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uFogColor; uniform vec3 uCityGlow;
      uniform sampler2D uSkyA; uniform sampler2D uSkyB; uniform float uSkyOn; uniform float uSkyRep;
      varying vec3 vF; varying float vY;
      ${HASH_GLSL}
      void main() {
        float layer = vF.x;
        if (layer > 2.5) {
          // 12차 배8: 원경 가상 도시 밤 띠(생성 이미지 2장, 좌우를 거울로 이어 씀). 하늘 부분은 버린다(알파)
          if (uSkyOn < 0.5) discard;
          float u = vF.y / uSkyRep;
          float k = floor(u);
          float fu = fract(u);
          if (mod(k, 2.0) > 0.5) fu = 1.0 - fu;
          vec4 t = mod(k, 4.0) < 1.5 ? texture2D(uSkyA, vec2(fu, vF.z)) : texture2D(uSkyB, vec2(fu, vF.z));
          if (t.a < 0.5) discard;
          vec3 fc2 = mix(uFogColor, uCityGlow, 0.35);
          gl_FragColor = vec4(bgGrade(mix(t.rgb * 0.75, fc2, 0.5)), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec3 base = vec3(0.018, 0.02, 0.03);
        float fogMix = layer < 0.5 ? 0.35 : layer < 1.5 ? 0.6 : 0.8;
        vec3 fc = mix(uFogColor, uCityGlow, 0.55 * exp(-max(vY, 0.0) * 0.012));
        vec3 col = mix(base, fc, fogMix);
        if (layer < 0.5 && vY > 4.0) {
          // 1겹 창 점: 6m × 5.6m 블록마다 켜짐(점등률 0.15), 블록 평균 밝기
          vec2 bc = vec2(vF.y / 6.0, vY / 5.6);
          float on = step(hash(floor(bc) + 3.7), 0.15);
          vec2 f = fract(bc);
          float m = step(0.2, f.x) * step(f.x, 0.8) * step(0.25, f.y) * step(f.y, 0.75);
          col += vec3(0.9, 0.7, 0.45) * 0.18 * on * m * (1.0 - fogMix);
        }
        gl_FragColor = vec4(bgGrade(col), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 5차 B3·B4: 빛 무리(가산 혼합 빌보드) — 가로등·차 전조등·창 묶음·바지선 작업등. 인스턴스 한 번(그리기 호출 1)
// aHP: 위치 xyz, 크기(m) / aHC: 색 rgb, 세기. 화면 쪽을 보는 사각형에 둥근 번짐
function makeHaloMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uFogDensity: shared.uFogDensity },
    vertexShader: /* glsl */ `
      attribute vec4 aHP;
      attribute vec4 aHC;
      varying vec2 vQ;
      varying vec4 vC;
      varying float vF;
      uniform float uFogDensity;
      void main() {
        vec4 mv = viewMatrix * vec4(aHP.xyz, 1.0);
        float d = -mv.z;
        mv.xy += position.xy * aHP.w;
        vQ = position.xy * 2.0;
        vC = aHC;
        vF = exp(-uFogDensity * uFogDensity * d * d * 0.7);
        if (aHC.a < 0.001 || d < 1.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vQ;
      varying vec4 vC;
      varying float vF;
      void main() {
        float r = length(vQ);
        if (r > 1.0) discard;
        float a = exp(-r * r * 5.0) * 0.8 + (1.0 - r) * (1.0 - r) * 0.2;
        gl_FragColor = vec4(vC.rgb * vC.a * a * vF, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

// 5차 B5: 수면 반사 쿼드 — 가로등·간판·다리 불빛이 물에 세로로 늘어져 번진 빛 띠. 물 위에 누운 사각형이 카메라 쪽으로 늘어난다.
// aRP: 물가 기준점 xz, 길이, 폭 / aRC: 색 rgb, 세기. 강 마스크 안(물)에서만 보인다. 인스턴스 한 번
function makeReflMaterial(shared, maskU, boxU) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: shared.uTime, uMask: maskU, uMaskBox: boxU, uFogDensity: shared.uFogDensity },
    vertexShader: /* glsl */ `
      attribute vec4 aRP;
      attribute vec4 aRC;
      varying vec2 vQ;
      varying vec4 vC;
      varying vec3 vWP;
      varying float vFogDepth;
      varying float vMode;
      void main() {
        vec2 F = aRP.xy;
        vMode = aRC.a >= 3.5 ? 2.0 : aRC.a >= 1.5 ? 1.0 : 0.0; // 0 물 · 1 젖은 도로 반사 · 2 바닥 빛웅덩이
        float yy = vMode > 1.5 ? (aRC.a - 4.0) * 4.0 : vMode > 0.5 ? (aRC.a - 2.0) * 4.0 : 0.04;
        if (vMode > 1.5) {
          // 바닥 빛웅덩이: 땅에 누운 원(반지름 aRP.w)
          vec2 p = F + position.xy * 2.0 * aRP.w;
          vWP = vec3(p.x, yy, p.y);
          vQ = position.xy * 2.0;
          vC = aRC;
          vec4 mv = viewMatrix * vec4(vWP, 1.0);
          vFogDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
          return;
        }
        vec2 toCam = cameraPosition.xz - F;
        float dc = length(toCam);
        vec2 d = toCam / max(dc, 0.001);
        vec2 n = vec2(-d.y, d.x);
        float len = min(aRP.z * (0.6 + 0.004 * dc), dc * 0.8);
        vec2 p = F + d * (position.y + 0.5) * len + n * position.x * aRP.w;
        vWP = vec3(p.x, yy, p.y);
        vQ = vec2(position.x * 2.0, position.y + 0.5);
        vC = aRC;
        vec4 mv = viewMatrix * vec4(vWP, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform sampler2D uMask; uniform vec4 uMaskBox; uniform float uFogDensity;
      varying vec2 vQ; varying vec4 vC; varying vec3 vWP; varying float vFogDepth; varying float vMode;
      void main() {
        float f0 = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        if (vMode > 1.5) {
          float r2 = dot(vQ, vQ);
          if (r2 > 1.0) discard;
          gl_FragColor = vec4(vC.rgb * exp(-r2 * 3.2) * (1.0 - r2) * f0, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          return;
        }
        vec2 muv = (vWP.xz - uMaskBox.xy) / uMaskBox.zw;
        float water = vMode > 0.5 ? 1.0 : texture2D(uMask, muv).r;
        if (water < 0.3) discard;
        float across = exp(-vQ.x * vQ.x * 3.0);
        float along = smoothstep(0.0, 0.08, vQ.y) * (1.0 - vQ.y) * (1.0 - vQ.y);
        // 물결에 끊기는 빛(가로 줄무늬가 천천히 흐름)
        float rip = 0.55 + 0.45 * sin(vQ.y * 38.0 + uTime * 2.3 + vC.a * 31.0) * sin(vQ.y * 13.0 - uTime * 1.1 + vQ.x * 2.0);
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(vC.rgb * across * along * rip * f * smoothstep(0.3, 0.6, water), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

// 11차 배2: 차량 불빛 흐름 — 인스턴스 하나(그리기 호출 +1). 차마다 도로 선분 A→B 위를 위상으로 움직이는 빛 줄기(길이 4~6m · 폭 0.35m).
// CPU 는 시간만 넘긴다(uTime). 카메라 쪽으로 오는 차 = 전조등(따뜻한 흰색, HDR 0.8), 멀어지는 차 = 미등(빨강, HDR 0.5). 흰 심·깜빡임 없음, 도로면(통로 바닥 − 3m 아래)에만.
// aA: 선분 시작 xyz, 위상 / aB: 선분 끝 xyz, 초당 위상(속도 ÷ 길이) / aC: 줄기 길이, 폭, 밝기, (안 씀)
function makeCarMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: shared.uTime, uFogDensity: shared.uFogDensity },
    vertexShader: /* glsl */ `
      attribute vec4 aA;
      attribute vec4 aB;
      attribute vec4 aC;
      uniform float uTime;
      varying vec3 vCol;
      varying vec2 vQ;
      varying float vFogDepth;
      void main() {
        float t = fract(aA.w + uTime * aB.w);
        vec3 D = aB.xyz - aA.xyz;
        float L = max(length(D), 0.01);
        D /= L;
        vec3 P = aA.xyz + D * L * t;
        float along = position.x + 0.5; // 0 꼬리 ~ 1 머리
        vec3 W = P - D * aC.x * (1.0 - along);
        vec3 V = cameraPosition - W;
        vec3 N = cross(D, V);
        float nl = length(N);
        N = nl > 1e-4 ? N / nl : vec3(0.0, 1.0, 0.0);
        float wdist = length(cameraPosition - P);
        W += N * position.y * max(aC.y, wdist * 0.0024); // 멀어도 1.5화소 안팎 폭이 남게
        vec3 Rl = normalize(cross(D, vec3(0.0, 1.0, 0.0)));
        W += Rl * position.z * (aC.w > 0.5 ? 1.05 : 0.72); // 12차: 전조등·미등 쌍
        bool toward = dot(D, cameraPosition - P) > 0.0;
        float brake = toward ? 1.0 : 1.0 + 1.6 * smoothstep(0.82, 0.97, t); // 교차로(선분 끝) 앞에서 브레이크등
        vCol = (toward ? vec3(1.0, 0.95, 0.85) * 0.8 : vec3(1.0, 0.12, 0.06) * 0.5 * brake) * aC.z;
        vCol *= clamp(min(t, 1.0 - t) * L / 12.0, 0.0, 1.0); // 선분 끝에서 부드럽게 나타나고 사라짐
        vQ = vec2(along, position.y * 2.0);
        vec4 mv = viewMatrix * vec4(W, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uFogDensity;
      varying vec3 vCol; varying vec2 vQ; varying float vFogDepth;
      void main() {
        float across = 1.0 - vQ.y * vQ.y;
        float a = across * mix(0.15, 1.0, vQ.x * vQ.x);
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(vCol * a * f, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// 12차 배7: 차 몸체 — 불빛과 같은 위치 식(aA 출발·aB 도착·속도, aC.x 꼬리 길이 · aC.w 버스). 어두운 차체 + 버스 실내등 띠, 안개
function makeCarBodyMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: shared.uTime, uFogDensity: shared.uFogDensity, uFogColor: shared.uFogColor },
    vertexShader: /* glsl */ `
      attribute vec4 aA;
      attribute vec4 aB;
      attribute vec4 aC;
      uniform float uTime;
      varying vec3 vLoc;
      varying float vBus;
      varying float vFogDepth;
      varying float vShade;
      void main() {
        float t = fract(aA.w + uTime * aB.w);
        vec3 D = aB.xyz - aA.xyz;
        float L = max(length(D), 0.01);
        D /= L;
        vec3 P = aA.xyz + D * L * t - vec3(0.0, 0.65, 0.0);
        vec3 R = normalize(cross(D, vec3(0.0, 1.0, 0.0)));
        float bus = aC.w;
        vec3 sz = bus > 0.5 ? vec3(2.5, 3.1, 11.0) : vec3(1.8, 1.35, 4.3);
        vec3 lp = position * sz;
        vec3 W = P + R * lp.x + vec3(0.0, lp.y, 0.0) + D * lp.z;
        float fade = clamp(min(t, 1.0 - t) * L / 12.0, 0.0, 1.0);
        if (fade < 0.02) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
        vLoc = position + vec3(0.0, 0.0, 0.5);
        vBus = bus;
        vShade = 0.6 + 0.4 * max(0.0, normal.y) + 0.15 * abs(normal.x);
        vec4 mv = viewMatrix * vec4(W, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uFogDensity; uniform vec3 uFogColor;
      varying vec3 vLoc; varying float vBus; varying float vFogDepth; varying float vShade;
      void main() {
        vec3 col = vec3(0.028, 0.03, 0.036) * vShade;
        if (vLoc.y > 0.42) col *= 0.7; // 지붕·유리 쪽 어둡게
        if (vBus > 0.5) {
          // 버스 실내등 띠(창 높이, 기둥 사이)
          float band = step(0.48, vLoc.y) * step(vLoc.y, 0.82) * step(0.12, fract(vLoc.z * 6.0));
          col += vec3(1.0, 0.78, 0.5) * 0.28 * band;
        }
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8);
        gl_FragColor = vec4(mix(uFogColor * 0.6, col, f), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

// 12차 가로수 잎 그림(캔버스, 파일 없음): 둥근 수관 안에 잎 덩어리 수백 개(알파), 왼쪽 아래 구석은 줄기 색
let _leafTex = null;
function makeLeafTexture() {
  if (_leafTex) return _leafTex;
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 256, 256);
  let s = 7;
  const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 520; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 108;
    const x = 128 + Math.cos(a) * d, y = 122 + Math.sin(a) * d * 0.95;
    const k = 0.55 + 0.45 * r() - (y / 256) * 0.25; // 아래쪽 잎은 조금 어둡게
    g.fillStyle = `rgba(${Math.round(70 * k)}, ${Math.round(105 * k)}, ${Math.round(62 * k)}, 1)`;
    g.beginPath();
    g.ellipse(x, y, 4 + r() * 7, 3 + r() * 5, r() * 3.14, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = 'rgb(40,32,26)';
  g.fillRect(0, 248, 8, 8);
  _leafTex = new THREE.CanvasTexture(c);
  _leafTex.colorSpace = THREE.SRGBColorSpace;
  return _leafTex;
}
const L0kind = (L) => L.kind === 'avenue' || L.name.includes('강변도로');

// 5차 B4: 가짜 빛기둥 — 바닥면 없는 원뿔(가산 혼합). 가로등 아래와 축제 서치라이트. 인스턴스 한 번
// 원뿔 꼭대기(광원)가 원점, 아래(−y)로 퍼진다. aCC: 색 rgb, 세기
function makeConeMaterial(shared) {
  return new THREE.ShaderMaterial({
    uniforms: { uFogDensity: shared.uFogDensity },
    vertexShader: /* glsl */ `
      attribute vec4 aCC;
      varying float vT;
      varying vec4 vC;
      varying vec3 vN;
      varying vec3 vV;
      varying float vFogDepth;
      void main() {
        mat4 m = modelMatrix * instanceMatrix;
        vec4 wp = m * vec4(position, 1.0);
        vT = -position.y; // 0 꼭대기 → 1 바닥
        vC = aCC;
        vN = mat3(m) * vec3(position.x, 0.0, position.z); // 꼭대기 점은 길이 0 — 조각에서 안전하게 나눈다
        vV = cameraPosition - wp.xyz;
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uFogDensity;
      varying float vT; varying vec4 vC; varying vec3 vN; varying vec3 vV; varying float vFogDepth;
      void main() {
        float ndv = abs(dot(vN / max(length(vN), 1e-4), vV / max(length(vV), 1e-4)));
        float a = pow(ndv, 1.6) * (1.0 - vT) * smoothstep(0.0, 0.12, vT) * vC.a;
        float f = exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.6);
        gl_FragColor = vec4(vC.rgb * a * f, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// 간판(옥상 네온·아파트 동 번호): 아틀라스 1장, 재질 1개. aUV: 아틀라스 칸, aCol: 색·세기
function makeSignMaterial(shared, tex) {
  return new THREE.ShaderMaterial({
    uniforms: { uAtlas: { value: tex }, uTime: shared.uTime, uFogColor: shared.uFogColor, uFogDensity: shared.uFogDensity },
    vertexShader: /* glsl */ `
      attribute vec4 aUV;
      attribute vec4 aCol; // rgb, 깜빡임 씨앗
      varying vec2 vUv;
      varying vec4 vCol;
      varying float vFogDepth;
      void main() {
        vUv = aUV.xy + uv * aUV.zw;
        vCol = aCol;
        vec4 mv = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uAtlas; uniform float uTime; uniform vec3 uFogColor; uniform float uFogDensity;
      varying vec2 vUv;
      varying vec4 vCol;
      varying float vFogDepth;
      void main() {
        vec3 t = texture2D(uAtlas, vUv).rgb;
        float fl = vCol.a > 0.5 ? (0.85 + 0.15 * step(0.12, fract(sin(floor(uTime * 9.0 + vCol.a * 7.0) * 12.9898) * 43758.5))) : 1.0;
        float f = clamp(1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth * 0.8), 0.0, 1.0);
        gl_FragColor = vec4(t * vCol.rgb * fl * (1.0 - f), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// ---------- 간판 아틀라스(캔버스 1장 2048×1024) ----------
// 폰트(BvfSign = Black Han Sans 서브셋)를 못 읽으면 글자 없이 네온 테두리만 그린다(네모로 깨진 글자 없음).
function buildAtlas(fontOk) {
  const entries = [];
  if (typeof document === 'undefined') return { tex: null, entries, fontOk: false };
  const W = 2048;
  const H = 2048; // 11차 배4: 세로 간판 칸을 더하려고 1024 → 2048
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, W, H);
  let x = 8;
  let y = 8;
  const rowH = 150;
  const place = (w) => {
    if (x + w > W - 8) {
      x = 8;
      y += rowH;
    }
    const r = { x, y, w, h: rowH - 12 };
    x += w + 10;
    return r;
  };
  // 네온 간판: 테두리 관 + 글자(빛 번짐)
  SIGNS.texts.forEach((text, i) => {
    const color = SIGNS.neon[i % SIGNS.neon.length];
    g.font = `100px ${SIGNS.font}`;
    const tw = fontOk ? g.measureText(text).width : 60 * text.length;
    const r = place(Math.ceil(tw + 70));
    g.save();
    g.shadowColor = color;
    g.shadowBlur = 16;
    g.strokeStyle = color;
    g.lineWidth = 7;
    g.beginPath();
    g.roundRect(r.x + 8, r.y + 8, r.w - 16, r.h - 16, 18);
    g.stroke();
    if (fontOk) {
      g.fillStyle = '#ffffff';
      g.textBaseline = 'middle';
      g.textAlign = 'center';
      g.shadowBlur = 22;
      g.fillText(text, r.x + r.w / 2, r.y + r.h / 2 + 6);
      g.shadowBlur = 0;
      g.fillStyle = color;
      g.globalAlpha = 0.35;
      g.fillText(text, r.x + r.w / 2, r.y + r.h / 2 + 6);
    }
    g.restore();
    entries.push({ kind: 'neon', text, color, uv: [r.x / W, 1 - (r.y + r.h) / H, r.w / W, r.h / H], aspect: r.w / r.h });
  });
  // 아파트 동 번호(가상 숫자, 흰 칠)
  for (let n = 101; n <= 118; n++) {
    const text = `${n}동`;
    g.font = `110px ${SIGNS.font}`;
    const tw = fontOk ? g.measureText(text).width : 200;
    const r = place(Math.ceil(tw + 30));
    if (fontOk) {
      g.fillStyle = '#e8e4da';
      g.textBaseline = 'middle';
      g.textAlign = 'center';
      g.fillText(text, r.x + r.w / 2, r.y + r.h / 2 + 6);
    }
    entries.push({ kind: 'dong', text, uv: [r.x / W, 1 - (r.y + r.h) / H, r.w / W, r.h / H], aspect: r.w / r.h });
  }
  // 11차 배4: 세로 돌출 간판(2~5층) — 글자를 위에서 아래로 쌓음. 가상 일반명사만
  x = 8;
  y += rowH + 10;
  const VERT = ['치킨', '약국', '노래방', '편의점', '부동산', '커피', '호프', '분식', '세탁', '국밥', 'PC방', '당구장'];
  VERT.forEach((text, i) => {
    const color = SIGNS.neon[i % SIGNS.neon.length];
    const chars = text === 'PC방' ? ['PC', '방'] : [...text];
    const cw = 140, ch = 130;
    const w = cw, h = ch * chars.length + 30;
    if (x + w > W - 8) { x = 8; y += 560; }
    const r = { x, y, w, h };
    x += w + 10;
    g.save();
    g.fillStyle = 'rgba(20, 22, 30, 1)';
    g.fillRect(r.x + 6, r.y + 6, r.w - 12, r.h - 12);
    g.shadowColor = color;
    g.shadowBlur = 12;
    g.strokeStyle = color;
    g.lineWidth = 6;
    g.strokeRect(r.x + 8, r.y + 8, r.w - 16, r.h - 16);
    if (fontOk) {
      g.font = `${chars[0] === 'PC' ? 72 : 100}px ${SIGNS.font}`;
      g.fillStyle = '#ffffff';
      g.textBaseline = 'middle';
      g.textAlign = 'center';
      chars.forEach((c, k) => g.fillText(c, r.x + r.w / 2, r.y + 15 + ch * (k + 0.5) + 6));
    }
    g.restore();
    entries.push({ kind: 'vert', text, color, uv: [r.x / W, 1 - (r.y + r.h) / H, r.w / W, r.h / H], aspect: r.w / r.h });
  });
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.generateMipmaps = true;
  return { tex, entries, fontOk };
}

const BLANK = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat);
BLANK.needsUpdate = true;

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();
const UP = new THREE.Vector3(0, 1, 0);
const ZAX = new THREE.Vector3(0, 0, 1);
const XAX = new THREE.Vector3(1, 0, 0);

// 12차: 코스가 2.4km 로 길어져 건물·가로수는 「카메라 가까운 것만 그리기」(NearWindow) — 전체 목록은 더 크게 둔다
const MAX_CAR = 1500; // 12차 배7: 600 → 1500
const CONE_SEARCH = 2; // 14차: 서치라이트 원뿔 수(아래 this.search 길이와 같게)
const MAX = { building: 14000, struct: 2200, glow: 2600, sign: 900, barge: 16, cyl: 900, halo: 2200, refl: 2600, cone: 1200, car: MAX_CAR, tree: 4200 }; // 14차: cone 600 → 1200(가로등 원뿔 약 954 + 서치라이트 2 + 여유. 600 이면 넘친 만큼 그리기 오류·서치라이트 안 보임). 11차: refl 900 → 2600(바닥 빛웅덩이·젖은 노면 반사 띠), 차량 불빛 줄기 600, 간판 300 → 900, 가로수 1500

// 12차: 인스턴스 메시 「가까운 것만」 — 지은 뒤 전체 목록을 따로 두고, 카메라에서 R m 안의 인스턴스만 앞으로 모아 count 로 그린다
// (그리기 호출은 그대로, 삼각형만 줄어듦). 카메라가 step m 넘게 움직이면 다시 모은다. attrs: 같이 옮길 인스턴스 속성들
class NearWindow {
  constructor(mesh, attrs, R = 800, step = 40) {
    this.mesh = mesh;
    this.attrs = [mesh.instanceMatrix, ...attrs];
    this.R = R;
    this.step = step;
    this.n = 0;
    this.last = null;
  }

  snapshot(n) {
    this.n = n;
    this.master = this.attrs.map((a) => a.array.slice(0, n * a.itemSize));
    const m = this.master[0];
    this.cx = new Float32Array(n);
    this.cz = new Float32Array(n);
    for (let i = 0; i < n; i++) { this.cx[i] = m[i * 16 + 12]; this.cz[i] = m[i * 16 + 14]; }
    this.last = null;
  }

  update(x, z, force = false) {
    if (!this.master) return;
    if (!force && this.last && Math.hypot(x - this.last[0], z - this.last[1]) < this.step) return;
    this.last = [x, z];
    const R2 = this.R * this.R;
    let k = 0;
    for (let i = 0; i < this.n; i++) {
      const dx = this.cx[i] - x, dz = this.cz[i] - z;
      if (dx * dx + dz * dz > R2) continue;
      for (let a = 0; a < this.attrs.length; a++) {
        const sz = this.attrs[a].itemSize;
        const src = this.master[a], dst = this.attrs[a].array;
        for (let q = 0; q < sz; q++) dst[k * sz + q] = src[i * sz + q];
      }
      k++;
    }
    this.mesh.count = k;
    for (const a of this.attrs) a.needsUpdate = true;
    this.shown = k;
  }
}

export class World {
  constructor(scene, lights) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
    const lu = lights ? lights.uniforms : { uLPos: { value: Array.from({ length: N }, () => new THREE.Vector4()) }, uLCol: { value: Array.from({ length: N }, () => new THREE.Vector4()) } };
    this.shared = {
      uFogColor: { value: new THREE.Color() },
      uFogDensity: { value: 0.002 },
      uCityGlow: { value: new THREE.Color() },
      uAmbient: { value: new THREE.Color(0.05, 0.055, 0.08) },
      uTime: { value: 0 },
      uLPos: lu.uLPos,
      uLCol: lu.uLCol,
      uBlank: { value: BLANK },
    };

    const boxB = new THREE.BoxGeometry(1, 1, 1);
    boxB.translate(0, 0.5, 0); // 바닥이 y=0
    this.buildingMat = makeBuildingMaterial(this.shared);
    this.buildings = new THREE.InstancedMesh(boxB, this.buildingMat, MAX.building);
    this.infoAttr = new THREE.InstancedBufferAttribute(new Float32Array(MAX.building * 4), 4);
    boxB.setAttribute('aInfo', this.infoAttr);
    this.buildings.frustumCulled = false;
    this.group.add(this.buildings);

    const boxC = new THREE.BoxGeometry(1, 1, 1); // 가운데 기준
    this.structMat = makeStructMaterial(this.shared);
    this.structs = new THREE.InstancedMesh(boxC, this.structMat, MAX.struct);
    this.structs.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX.struct * 3), 3);
    this.feAttr = new THREE.InstancedBufferAttribute(new Float32Array(MAX.struct * 2).fill(1), 2).setUsage(THREE.DynamicDrawUsage);
    boxC.setAttribute('aFE', this.feAttr);
    this.structs.frustumCulled = false;
    this.group.add(this.structs);
    // 5차 B3: 둥근(타원) 교각 — 같은 재질, 인스턴스 한 번
    const cylG = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1); // 11차: 둘레 20 → 8칸(삼각형 25만 이하)
    this.cyls = new THREE.InstancedMesh(cylG, this.structMat, MAX.cyl);
    this.cyls.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX.cyl * 3), 3);
    this.cylFE = new THREE.InstancedBufferAttribute(new Float32Array(MAX.cyl * 2).fill(1), 2).setUsage(THREE.DynamicDrawUsage);
    cylG.setAttribute('aFE', this.cylFE);
    this.cyls.frustumCulled = false;
    this.group.add(this.cyls);
    // 빛 무리
    const hq = new THREE.PlaneGeometry(1, 1);
    const hg = new THREE.InstancedBufferGeometry();
    hg.index = hq.index;
    hg.setAttribute('position', hq.attributes.position);
    this.haloP = new THREE.InstancedBufferAttribute(new Float32Array(MAX.halo * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.haloC = new THREE.InstancedBufferAttribute(new Float32Array(MAX.halo * 4), 4).setUsage(THREE.DynamicDrawUsage);
    hg.setAttribute('aHP', this.haloP);
    hg.setAttribute('aHC', this.haloC);
    hg.instanceCount = 0;
    hg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.halos = new THREE.Mesh(hg, makeHaloMaterial(this.shared));
    this.halos.frustumCulled = false;
    this.halos.renderOrder = 4;
    this.group.add(this.halos);

    // 작은 불빛(가로등·차 불빛·바지선 등·항공등): 한 번에
    this.glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.glow = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), this.glowMat, MAX.glow);
    this.glow.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX.glow * 3), 3);
    this.glow.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.glow.frustumCulled = false;
    this.group.add(this.glow);

    // 11차 배2: 차량 불빛 줄기(인스턴스 하나)
    {
      // 12차 배7: 전조등·미등 「쌍」 — 사각형 두 장(position.z = −1 왼쪽 · +1 오른쪽, 차 폭 1.5m)
      const q = new THREE.PlaneGeometry(1, 1);
      const qp = q.attributes.position.array;
      const pp = [];
      for (const sd of [-1, 1]) for (let i = 0; i < qp.length; i += 3) pp.push(qp[i], qp[i + 1], sd);
      const qi = Array.from(q.index.array);
      const cg = new THREE.InstancedBufferGeometry();
      cg.setIndex([...qi, ...qi.map((v) => v + 4)]);
      cg.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
      this.carA = new THREE.InstancedBufferAttribute(new Float32Array(MAX.car * 4), 4);
      this.carB = new THREE.InstancedBufferAttribute(new Float32Array(MAX.car * 4), 4);
      this.carC = new THREE.InstancedBufferAttribute(new Float32Array(MAX.car * 4), 4);
      cg.setAttribute('aA', this.carA);
      cg.setAttribute('aB', this.carB);
      cg.setAttribute('aC', this.carC);
      cg.instanceCount = 0;
      cg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
      this.carMesh = new THREE.Mesh(cg, makeCarMaterial(this.shared));
      this.carMesh.frustumCulled = false;
      this.carMesh.renderOrder = 3;
      this.group.add(this.carMesh);
      // 12차 배7: 차 몸체(어두운 낮은 상자, 12삼각형) — 불빛과 같은 움직임 식(같은 인스턴스 속성), 버스는 실내등 띠. 그리기 호출 +1
      const box = new THREE.BoxGeometry(1, 1, 1);
      box.translate(0, 0.5, -0.5); // 앞(불빛 자리)이 z = 0, 몸은 뒤(−z → 진행 반대)로
      const bg2 = new THREE.InstancedBufferGeometry();
      bg2.setIndex(box.index);
      bg2.setAttribute('position', box.attributes.position);
      bg2.setAttribute('normal', box.attributes.normal);
      bg2.setAttribute('aA', this.carA);
      bg2.setAttribute('aB', this.carB);
      bg2.setAttribute('aC', this.carC);
      bg2.instanceCount = 0;
      bg2.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
      this.carBody = new THREE.Mesh(bg2, makeCarBodyMaterial(this.shared));
      this.carBody.frustumCulled = false;
      this.carBody.renderOrder = 2;
      this.group.add(this.carBody);
    }
    // 11차 배4: 가로수(줄기 + 수관 저폴리, 정점 색, 인스턴스 하나 — 그리기 호출 +1)
    {
      // 12차 가로수: 높이 8~10m · 수관 폭 5m — 캔버스로 그린 잎 알파 카드 2장을 十자로(+ 줄기). 가로등 가까운 나무는 따뜻하게(인스턴스 색)
      const card = (rot) => { const g = new THREE.PlaneGeometry(5, 5.4); g.rotateY(rot); g.translate(0, 6.3, 0); return g; };
      const trunk = new THREE.CylinderGeometry(0.13, 0.2, 4.4, 4, 1, true);
      trunk.translate(0, 2.2, 0);
      const tuv = [];
      for (let i = 0; i < trunk.attributes.position.count; i++) tuv.push(0.02, 0.02); // 잎 그림 왼쪽 아래 구석(줄기 색 칸)
      trunk.setAttribute('uv', new THREE.Float32BufferAttribute(tuv, 2));
      const tg = new THREE.BufferGeometry();
      {
        const P = [], UV = [];
        for (const g of [card(0).toNonIndexed(), card(Math.PI / 2).toNonIndexed(), trunk.toNonIndexed()]) { P.push(...g.attributes.position.array); UV.push(...g.attributes.uv.array); }
        tg.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
        tg.setAttribute('uv', new THREE.Float32BufferAttribute(UV, 2));
      }
      this.treeTris = tg.attributes.position.count / 3;
      const tmat = new THREE.MeshBasicMaterial({ map: makeLeafTexture(), alphaTest: 0.42, side: THREE.DoubleSide, fog: true });
      this.trees = new THREE.InstancedMesh(tg, tmat, MAX.tree);
      this.trees.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX.tree * 3), 3);
      this.trees.frustumCulled = false;
      this.trees.count = 0;
      this.group.add(this.trees);
    }
    // 바지선(발사대)
    this.bargeMat = new THREE.MeshLambertMaterial({ color: 0x15161b });
    this.barges = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), this.bargeMat, MAX.barge);
    this.barges.frustumCulled = false;
    this.group.add(this.barges);

    // 바닥(강·땅) 한 장
    this.groundMat = makeGroundMaterial(this.shared);
    this.ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.groundMat);
    this.ground.rotation.x = -Math.PI / 2;
    this.group.add(this.ground);

    // 빛기둥(원뿔) — 마지막 두 칸은 서치라이트(매 프레임 돈다)
    {
      const cg = new THREE.ConeGeometry(1, 1, 10, 1, true); // 11차: 둘레 18 → 10(삼각형 25만 이하)
      cg.translate(0, -0.5, 0); // 꼭대기가 원점
      this.coneCC = new THREE.InstancedBufferAttribute(new Float32Array(MAX.cone * 4), 4);
      cg.setAttribute('aCC', this.coneCC);
      this.cones = new THREE.InstancedMesh(cg, makeConeMaterial(this.shared), MAX.cone);
      this.cones.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.cones.frustumCulled = false;
      this.cones.renderOrder = 3;
      this.cones.count = 0;
      this.group.add(this.cones);
    }
    // 수면 반사 쿼드
    {
      const rq = new THREE.PlaneGeometry(1, 1);
      const rg = new THREE.InstancedBufferGeometry();
      rg.index = rq.index;
      rg.setAttribute('position', rq.attributes.position);
      this.reflP = new THREE.InstancedBufferAttribute(new Float32Array(MAX.refl * 4), 4);
      this.reflC = new THREE.InstancedBufferAttribute(new Float32Array(MAX.refl * 4), 4);
      rg.setAttribute('aRP', this.reflP);
      rg.setAttribute('aRC', this.reflC);
      rg.instanceCount = 0;
      rg.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
      const gu = this.groundMat.uniforms;
      this.refl = new THREE.Mesh(rg, makeReflMaterial(this.shared, gu.uMask, gu.uMaskBox));
      this.refl.frustumCulled = false;
      this.refl.renderOrder = 2;
      this.group.add(this.refl);
    }
    this.ribbonMat = makeRibbonMaterial(this.shared);
    // 6차 도로 띠: 땅 띠와 같은 셰이더, 겹침 깜빡임을 막으려고 앞으로 당겨 그린다
    this.roadMat = makeRibbonMaterial(this.shared, true);
    this.roadMat.polygonOffset = true;
    this.roadMat.polygonOffsetFactor = -2;
    this.roadMat.polygonOffsetUnits = -4;
    this.roadMat.side = THREE.DoubleSide; // 11차 배1: 도로 띠 면 방향이 뒤집혀 있어(위에서 안 보임) 양면으로
    this.roads = null;
    this.ribbon = null;
    this.ridgeMat = makeRidgeMaterial(this.shared);
    this.ridge = null;
    this.farCardMat = makeFarCardMaterial(this.shared);
    this.farCards = null;

    this.skyMat = makeSkyMaterial(this.shared);
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1500, 32, 16), this.skyMat);
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    scene.add(this.sky);

    this.hemi = new THREE.HemisphereLight(0x8090c0, 0x302018, 1.2);
    this.dir = new THREE.DirectionalLight(0xc8d0ff, 0.45);
    this.dir.position.set(-0.38, 0.42, -0.82);
    scene.add(this.hemi, this.dir);
    this.fog = new THREE.FogExp2(0x000000, 0.002);
    scene.fog = this.fog;

    this.signs = null;
    this.atlas = null;
    this.fontOk = false;
    this.cars = [];
    this.launchers = [];
    this.lampXZ = [];
    this.crowdSpots = [];
    this.course = null;
    this.lowSpec = false;
  }

  // 에셋: 실사 외벽, 간판 폰트
  useAssets(a) {
    const u = this.buildingMat.uniforms;
    // 12차 배8: 실내 그림 아틀라스 · 원경 스카이라인(생성 이미지)
    if (a.rooms) { u.uRoom.value = a.rooms; u.uRoomOn.value = 1; }
    if (a.sky && a.sky[0] && a.sky[1]) { const fu = this.farCardMat.uniforms; fu.uSkyA.value = a.sky[0]; fu.uSkyB.value = a.sky[1]; fu.uSkyOn.value = 1; }
    if (a.facades && a.facades.length === 3 && a.facades.every(Boolean)) {
      a.facades.forEach((f, i) => {
        u[`uFC${i}`].value = f.color;
        u[`uFE${i}`].value = f.emis;
      });
      u.uFacadeOn.value = 1;
    }
    // 11차 배1: 아스팔트·보도블록 질감(ambientCG CC0)
    if (a.ground && a.ground.asph && a.ground.pave) {
      const ru = this.roadMat.uniforms;
      ru.uAsph.value = a.ground.asph;
      ru.uAsphR.value = a.ground.asphR || a.ground.asph;
      ru.uPave.value = a.ground.pave;
      ru.uTexOn.value = 1;
    }
    this.fontOk = !!a.font;
    this._makeAtlas();
    if (this.course) this._buildSigns();
  }

  _makeAtlas() {
    if (this.atlas && this.atlas.fontOk === this.fontOk) return;
    if (this.atlas && this.atlas.tex) this.atlas.tex.dispose();
    this.atlas = buildAtlas(this.fontOk);
    if (!this.atlas.tex) return;
    if (this.signs) {
      this.signs.material.uniforms.uAtlas.value = this.atlas.tex;
    }
  }

  setLowSpec(low) {
    this.lowSpec = low;
    this.groundMat.uniforms.uReflect.value = low ? 0 : 1; // 가속 꺼짐: 반사 끔
  }

  // 반사 환경맵(파일 없이 장면에서 만든다): 하늘 + 도시광 + 불빛 몇 개
  makeEnv(renderer) {
    if (!renderer || this.env) return this.env;
    try {
      const sc = new THREE.Scene();
      const skyM = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { uTop: { value: new THREE.Color(0x0a1030) }, uLow: { value: new THREE.Color(0x6a4030) } },
        vertexShader: 'varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: 'uniform vec3 uTop; uniform vec3 uLow; varying vec3 vD; void main(){ float h = normalize(vD).y; vec3 c = mix(uLow, uTop, smoothstep(-0.05, 0.5, h)); if (h < 0.0) c = uLow * 0.25; gl_FragColor = vec4(c, 1.0); }',
      });
      sc.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyM));
      const lm = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.5, 0.9) });
      const cm = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 1.2, 2.0) });
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2;
        const m = new THREE.Mesh(new THREE.BoxGeometry(rand(2, 6), rand(0.5, 2.5), 0.5), i % 3 ? lm : cm);
        m.position.set(Math.cos(a) * 40, rand(0.5, 4), Math.sin(a) * 40);
        m.lookAt(0, m.position.y, 0);
        sc.add(m);
      }
      const pm = new THREE.PMREMGenerator(renderer);
      this.env = pm.fromScene(sc, 0.03).texture;
      pm.dispose();
    } catch {
      this.env = null;
    }
    return this.env;
  }

  get crowdGroundY() {
    return 1.25;
  }

  // ---------- 스테이지 짓기(6차 도시 배치) ----------
  // 지류(시작 강) · 본류(끝 강) · 강둑 띠 · 도로망(강변도로 4줄 · 대로 · 다리 A·B 와 경사로 · 골목) · 구역별 건물(협곡 유리 빌딩 · 옥상 · 강변 아파트 · 상가) · 원경 · 능선.
  // 모든 선형 구조물(도로·다리)은 끝이 다른 길에 붙거나 코스에서 CITY.roadFar(1.5km) 넘게(안개 너머) 이어진다 → endpointReport() 로 검사.
  build(stage, course) {
    this.stage = stage;
    this.course = course;
    const sh = this.shared;
    sh.uFogColor.value.set(stage.fog.color);
    sh.uFogDensity.value = stage.fog.density;
    sh.uCityGlow.value.set(stage.cityGlow);
    this.fog.color.set(stage.fog.color);
    this.fog.density = stage.fog.density;
    const sk = this.skyMat.uniforms;
    sk.uTop.value.set(stage.sky.top);
    sk.uBottom.value.set(stage.sky.bottom);
    const g = this.groundMat.uniforms;
    g.uWaterCol.value.set(stage.groundColor);
    g.uLandCol.value.set(stage.landColor).multiplyScalar(0.6);
    g.uSkyLow.value.set(stage.sky.bottom);
    g.uSkyTop.value.set(stage.sky.top);
    g.uLamp.value.set(stage.lampColor);
    this.ribbonMat.uniforms.uLamp.value.set(stage.lampColor);
    this.roadMat.uniforms.uLamp.value.set(stage.lampColor);
    this.roadMat.uniforms.uSkyLow.value.set(stage.sky.bottom);

    this.launchers = [];
    this.crowdSpots = [];
    this.cars = [];
    this.avLights = [];
    this._crossN = 0;
    this.crosses = 0;
    this._signRefl = false;
    this._bi = 0;
    this._si = 0;
    this._gi = 0;
    this._bai = 0;
    this._ci = 0;
    this._hi = 0;
    this._ri = 0;
    this._ki = 0;
    this.search = [];
    this.structOf = [];
    this.cylOf = [];
    this.signList = [];
    this.lines = []; // 선형 구조물(도로·다리): { name, pts: [[x, y, z], …], half, kind }
    this.lots = []; // 건물 바닥(점검·발사대)

    this._layout();
    this._buildMask();
    this._buildOcc();
    this._buildRibbons();
    this._buildRoads();
    this._buildBridges();
    this._buildCity();
    this._buildFar();
    this._buildRidge();
    this._buildFarCards();
    this._buildBarges();
    this._buildLamps();
    this._buildCars();
    this._buildTrees();
    this._makeAtlas();
    this._buildSigns();
    this._checkEnds();
    this._dilateOcc();

    this.buildings.count = this._bi;
    this.buildings.instanceMatrix.needsUpdate = true;
    this.infoAttr.needsUpdate = true;
    this.nearB = new NearWindow(this.buildings, [this.infoAttr], 650);
    this.nearB.snapshot(this._bi);
    if (this.trees) { this.nearT = new NearWindow(this.trees, this.trees.instanceColor ? [this.trees.instanceColor] : [], 420); this.nearT.snapshot(this.trees.count); }
    // 12차: 옥상 물탱크(원통)도 가까운 것만(600m)
    this.nearC = new NearWindow(this.cyls, [this.cyls.instanceColor, this.cylFE], 600);
    this.nearC.snapshot(this._ci);
    this.structs.count = this._si;
    this.structs.instanceMatrix.needsUpdate = true;
    this.structs.instanceColor.needsUpdate = true;
    this.feAttr.needsUpdate = true;
    this.glowStatic = this._gi;
    this.haloStatic = this._hi;
    this.coneStatic = this._ki;
    this.cones.count = Math.min(this._ki + CONE_SEARCH, MAX.cone); // 14차: 버퍼(MAX.cone)보다 많이 그리지 않게
    this.cones.instanceMatrix.needsUpdate = true;
    this.coneCC.needsUpdate = true;
    this.refl.geometry.instanceCount = this._ri;
    this.reflP.needsUpdate = true;
    this.reflC.needsUpdate = true;
    this.cyls.count = this._ci;
    this.cyls.instanceMatrix.needsUpdate = true;
    this.cyls.instanceColor.needsUpdate = true;
    this.cylFE.needsUpdate = true;
    this.barges.count = this._bai;
    this.barges.instanceMatrix.needsUpdate = true;
    // 축제 서치라이트 2개(지류 양쪽 둔치에서 하늘로, 천천히 돈다)
    const T = CITY.trib;
    this.search = [
      { x: T.x - T.hw - 8, z: 120, ph: Math.random() * 6.28, side: -1 },
      { x: T.x + T.hw + 8, z: -260, ph: Math.random() * 6.28, side: 1 },
    ];
    this.update(0, null, 0, 0);
  }

  // ---------- 배치 계산 ----------
  _layout() {
    const C = this.course;
    const K = CITY;
    // 본류: 마지막 직선을 왼쪽으로 옮긴 선
    const last = C.segs[C.segs.length - 1];
    const th = last.th;
    const fx = Math.sin(th), fz = -Math.cos(th);
    const p0 = C.xz(last.a, K.main.off, {});
    const start = { x: p0.x - fx * K.main.back, z: p0.z - fz * K.main.back, th };
    this.main = { path: new Path2D([[K.main.back + K.main.ahead, 0]], start, 0, 2), hw: K.main.hw, fx, fz, rx: Math.cos(th), rz: Math.sin(th) };
    // 지류: x = trib.x, 북쪽(+Z)에서 −Z 로 본류 중심선까지
    const t = (K.trib.x - p0.x) / fx;
    const zc = p0.z + fz * t;
    this.tribEnd = zc;
    this.trib = { path: new Path2D([[K.trib.zTop - zc, 0]], { x: K.trib.x, z: K.trib.zTop, th: 0 }, 0, 2), hw: K.trib.hw, len: K.trib.zTop - zc };
    this.rivers = [this.trib, this.main];
  }

  // 본류 좌표(s 앞, u 오른쪽 = 도심 쪽)
  _mainUV(x, z) {
    const M = this.main;
    const o = M.path.segs[0];
    const dx = x - o.x, dz = z - o.z;
    return { s: dx * M.fx + dz * M.fz, u: dx * M.rx + dz * M.rz };
  }

  _mainXZ(s, u) {
    const o = this.main.path.segs[0];
    const M = this.main;
    return { x: o.x + M.fx * s + M.rx * u, z: o.z + M.fz * s + M.rz * u };
  }

  // 물가에서 거리(물 안은 −). 지류는 본류 안쪽 끝까지만
  bankDist(x, z) {
    const m = this._mainUV(x, z);
    let d = Math.abs(m.u) - this.main.hw;
    const T = this.trib;
    const zr = Math.max(this.tribEnd, Math.min(CITY.trib.zTop, z));
    const dt = Math.hypot(x - CITY.trib.x, z - zr) - T.hw;
    // 지류 끝(본류 안)은 본류가 덮는다
    if (z >= this.tribEnd - 5) d = Math.min(d, dt);
    return d;
  }

  isWater(x, z) {
    return this.bankDist(x, z) < 0;
  }

  // 땅 높이(강둑 띠와 같은 단면)
  terrainY(x, z) {
    const d = this.bankDist(x, z);
    return bankProfileY(d);
  }

  // 그 자리 지붕·땅 높이(발사대·점검)
  surfaceY(x, z) {
    const o = this.occ;
    if (o) {
      const ix = Math.floor((x - o.x0) / o.cell);
      const iz = Math.floor((z - o.z0) / o.cell);
      if (ix >= 0 && iz >= 0 && ix < o.n && iz < o.n) {
        const h = o.h[iz * o.n + ix];
        if (h > 0) return h;
      }
    }
    return Math.max(0, this.terrainY(x, z));
  }

  // 물 마스크(위에서 본 그림): r = 물, g = 강가 가까움(번짐)
  _buildMask() {
    const C = this.course;
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < C.n; i += 10) {
      x0 = Math.min(x0, C.X[i]); x1 = Math.max(x1, C.X[i]);
      z0 = Math.min(z0, C.Z[i]); z1 = Math.max(z1, C.Z[i]);
    }
    const pad = 1000;
    const size = Math.max(x1 - x0, z1 - z0) + pad * 2;
    const ox = (x0 + x1) / 2 - size / 2;
    const oz = (z0 + z1) / 2 - size / 2;
    const R = 768;
    const cell = size / R;
    const water = new Float32Array(R * R);
    for (let iz = 0; iz < R; iz++) {
      for (let ix = 0; ix < R; ix++) {
        const x = ox + (ix + 0.5) * cell;
        const z = oz + (iz + 0.5) * cell;
        water[iz * R + ix] = this.bankDist(x, z) < 0 ? 1 : 0;
      }
    }
    const blur = (src, rad) => {
      const tmp = new Float32Array(R * R);
      const out = new Float32Array(R * R);
      for (let z = 0; z < R; z++) {
        let acc = 0;
        for (let x = -rad; x <= rad; x++) acc += src[z * R + Math.max(0, Math.min(R - 1, x))];
        for (let x = 0; x < R; x++) {
          tmp[z * R + x] = acc / (2 * rad + 1);
          acc += src[z * R + Math.min(R - 1, x + rad + 1)] - src[z * R + Math.max(0, x - rad)];
        }
      }
      for (let x = 0; x < R; x++) {
        let acc = 0;
        for (let z = -rad; z <= rad; z++) acc += tmp[Math.max(0, Math.min(R - 1, z)) * R + x];
        for (let z = 0; z < R; z++) {
          out[z * R + x] = acc / (2 * rad + 1);
          acc += tmp[Math.min(R - 1, z + rad + 1) * R + x] - tmp[Math.max(0, z - rad) * R + x];
        }
      }
      return out;
    };
    const soft = blur(water, 1);
    const wide = blur(water, 7);
    const data = new Uint8Array(R * R * 4);
    for (let i = 0; i < R * R; i++) {
      data[i * 4] = Math.round(soft[i] * 255);
      const shv = water[i] > 0.5 ? 1 - wide[i] : 0;
      data[i * 4 + 1] = Math.round(Math.min(1, shv * 2.2) * 255);
      data[i * 4 + 3] = 255;
    }
    if (this.maskTex) this.maskTex.dispose();
    const tex = new THREE.DataTexture(data, R, R, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    this.maskTex = tex;
    this.maskInfo = { ox, oz, size, R, water };
    const u = this.groundMat.uniforms;
    u.uMask.value = tex;
    u.uMaskBox.value.set(ox, oz, size, size);
    this.ground.scale.set(size + 3000, size + 3000, 1);
    this.ground.position.set(ox + size / 2, 0, oz + size / 2);
  }

  // 점유 격자(10m): 0 빈 땅 · 1 물 · 2 도로 · 3 건물 · 4 강둑·공원 · 5 다리·경사로. h = 지붕 높이
  _buildOcc() {
    const m = this.maskInfo;
    const cell = 10;
    const n = Math.ceil(m.size / cell);
    const o = { x0: m.ox, z0: m.oz, cell, n, t: new Uint8Array(n * n), h: new Float32Array(n * n) };
    for (let iz = 0; iz < n; iz++) {
      for (let ix = 0; ix < n; ix++) {
        const x = o.x0 + (ix + 0.5) * cell;
        const z = o.z0 + (iz + 0.5) * cell;
        const d = this.bankDist(x, z);
        o.t[iz * n + ix] = d < 0 ? 1 : d < 34 ? 4 : 0;
      }
    }
    this.occ = o;
  }

  // 건물에서 20m 안 빈 칸은 「도심 틈(6)」으로 본다(건물 사이 골목·마당 — 3D 에서는 옆 건물이 시야를 막는다)
  _dilateOcc() {
    const o = this.occ;
    const n = o.n;
    const src = o.t.slice();
    for (let iz = 0; iz < n; iz++) {
      for (let ix = 0; ix < n; ix++) {
        const k = iz * n + ix;
        if (src[k] !== 0) continue;
        let near = false;
        for (let dz = -2; dz <= 2 && !near; dz++) for (let dx = -2; dx <= 2 && !near; dx++) {
          const jx = ix + dx, jz = iz + dz;
          if (jx < 0 || jz < 0 || jx >= n || jz >= n) continue;
          const v = src[jz * n + jx];
          if (v === 3 || v === 2) near = true;
        }
        if (near) o.t[k] = 6;
      }
    }
  }

  _occMark(x, z, type, h = 0, r = 0) {
    const o = this.occ;
    const c = o.cell;
    for (let dx = -r; dx <= r + 1e-6; dx += c * 0.5) {
      for (let dz = -r; dz <= r + 1e-6; dz += c * 0.5) {
        const ix = Math.floor((x + dx - o.x0) / c);
        const iz = Math.floor((z + dz - o.z0) / c);
        if (ix < 0 || iz < 0 || ix >= o.n || iz >= o.n) continue;
        const k = iz * o.n + ix;
        if (type === 3 || o.t[k] === 0 || o.t[k] === 4) o.t[k] = type;
        if (h > o.h[k]) o.h[k] = h;
      }
    }
  }

  // 강둑 띠(축대 → 둔치 공원 → 강변도로 자리 → 땅으로 낮아짐). 지류·본류 양쪽. 서로 겹치는 곳은 잘라 낸다
  _buildRibbons() {
    if (this.ribbon) {
      this.group.remove(this.ribbon);
      this.ribbon.geometry.dispose();
    }
    const pos = [];
    const col = [];
    const su = [];
    const idx = [];
    const step = 10; // 11차: 4 → 10m(삼각형 25만 이하)
    const T = this.trib;
    const M = this.main;
    const tribEndS = T.len;
    // 지류 띠: 본류 물가에서 PROF 바깥 끝(150m)까지는 본류 띠가 덮으므로 거기서 멈춘다
    const addRiver = (riv, s0, s1, keep) => {
      for (const side of [-1, 1]) {
        const start = pos.length / 3;
        let rows = 0;
        const p = {};
        const ok = [];
        for (let s = s0; s <= s1; s += step) {
          riv.path.at(s, p);
          for (const [off, y, c] of PROF) {
            const u = side * (riv.hw + off);
            const x = p.x + Math.cos(p.th) * u;
            const z = p.z + Math.sin(p.th) * u;
            pos.push(x, y, z);
            col.push(c[0], c[1], c[2]);
            su.push(s, off);
            ok.push(keep(x, z, off));
          }
          rows++;
        }
        const P = PROF.length;
        for (let r = 0; r < rows - 1; r++) {
          for (let k = 0; k < P - 1; k++) {
            const a = start + r * P + k;
            const b = a + P;
            const o0 = r * P + k;
            if (!(ok[o0] && ok[o0 + 1] && ok[o0 + P] && ok[o0 + P + 1])) continue;
            if (side > 0) idx.push(a, b, a + 1, a + 1, b, b + 1);
            else idx.push(a, a + 1, b, a + 1, b + 1, b);
          }
        }
      }
    };
    // 본류: 지류 물(+ 축대 5m) 안은 비움
    addRiver(M, 0, M.path.sMax, (x, z) => !(Math.abs(x - CITY.trib.x) < T.hw + 1 && z > this.tribEnd - 10));
    // 지류: 본류 띠 범위(본류 물가 + 150m) 안은 비움
    addRiver(T, 0, tribEndS, (x, z) => Math.abs(this._mainUV(x, z).u) > M.hw + PROF[PROF.length - 1][0] - 1);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setAttribute('aSU', new THREE.Float32BufferAttribute(su, 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    this.ribbon = new THREE.Mesh(geo, this.ribbonMat);
    this.ribbon.frustumCulled = false;
    this.group.add(this.ribbon);
  }

  // ---------- 도로망 ----------
  // 도로 하나 = 점 목록(세계 x, z) + 반폭. 높이는 땅(또는 다리·경사로가 정함)
  _addLine(name, pts, half, kind = 'road', walk = 2.5) {
    const L = { name, pts, half, kind, walk };
    this.lines.push(L);
    return L;
  }

  _layoutRoads() {
    const C = this.course;
    const K = CITY;
    const T = this.trib;
    const M = this.main;
    const Tx = K.trib.x;
    const roadOff = 22.5; // 물가에서 도로 가운데까지
    const xW = Tx - T.hw - roadOff; // 지류 서쪽 강변도로
    const xE = Tx + T.hw + roadOff;
    const uN = M.hw + roadOff; // 본류 도심 쪽 강변도로(u +)
    const uS = -(M.hw + roadOff);
    const far = K.roadFar;
    const y = (x, z) => Math.max(0, this.terrainY(x, z)) + 0.05;
    const P3 = (x, z, yy = null) => [x, yy === null ? y(x, z) : yy, z];
    // 본류 도심 쪽 도로가 지류 서·동 도로와 만나는 점
    const mN = (x) => {
      // 본류 좌표 u = uN 인 선에서 x 인 점
      const o = M.path.segs[0];
      const s = (x - o.x - M.rx * uN) / M.fx;
      return this._mainXZ(s, uN);
    };
    const jW = mN(xW);
    const jE = mN(xE);
    this.roadPts = { xW, xE, uN, uS, jW, jE };
    // 1·2 지류 강변도로(북쪽 끝은 1.7km 밖)
    this._addLine('지류 서쪽 강변도로', [P3(xW, K.trib.zTop), P3(jW.x, jW.z)], 6.5);
    this._addLine('지류 동쪽 강변도로', [P3(xE, K.trib.zTop), P3(jE.x, jE.z)], 6.5);
    // 3·4 본류 도심 쪽 강변도로(지류에서 끊겨 서·동 도로에 붙음)
    {
      const a = this._mainXZ(0, uN);
      const b = this._mainXZ(M.path.sMax, uN);
      this._addLine('본류 도심쪽 강변도로(서)', [P3(a.x, a.z), P3(jW.x, jW.z)], 6.5);
      this._addLine('본류 도심쪽 강변도로(동)', [P3(jE.x, jE.z), P3(b.x, b.z)], 6.5);
      const c = this._mainXZ(0, uS);
      const d = this._mainXZ(M.path.sMax, uS);
      this._addLine('본류 건너편 강변도로', [P3(c.x, c.z), P3(d.x, d.z)], 6.5);
    }
    // 5 대로: 지류 서쪽 강변도로(z = −140) → 코스 s 180~485 → 곧게 본류 도심 쪽 강변도로까지
    {
      const pts = [];
      const s180 = remapS(180), s485 = remapS(485);
      const p180 = C.xz(s180, 0, {});
      pts.push(P3(xW, p180.z));
      for (let s = s180; s <= s485; s += 5) {
        const p = C.xz(s, 0, {});
        pts.push(P3(p.x, p.z));
      }
      const p = C.xz(s485, 0, {});
      const th = C.at(s485, {}).th;
      const fx = Math.sin(th), fz = -Math.cos(th);
      // 본류 u = uN 선까지 거리
      const uv = this._mainUV(p.x, p.z);
      const du = fx * M.rx + fz * M.rz;
      const t = (uN - uv.u) / du;
      for (let k = 1; k <= 4; k++) {
        const q = { x: p.x + fx * t * (k / 4), z: p.z + fz * t * (k / 4) };
        pts.push(P3(q.x, q.z));
      }
      this._addLine('대로', pts, 10.6, 'avenue', 4.2); // 11차 배1: 차도 반폭 10.6m(3차로 × 3.3 + 0.7) + 인도 4.2m = 반폭 14.8m(CITY.avenueHalf 15 안)
    }
    // 6 다리 A(지류, s 45) + 양쪽 경사로 + 거리(동서로 1.5km 밖까지)
    {
      const ps = C.xz(COURSE.bridges[0].s, 0, {});
      const z = ps.z;
      const top = COURSE.bridges[0].underside + 1.2;
      const xa = Tx - T.hw - 15;
      const xb = Tx + T.hw + 15;
      const ramp = top / K.rampGrade;
      const pts = [P3(-far - 500, z), P3(xa - ramp, z), [xa, top, z], [xb, top, z], P3(xb + ramp, z), P3(far + Tx, z)];
      this.bridgeA = { z, xa, xb, top, ramp };
      this._addLine('다리 A 와 동서 거리', pts, 7, 'bridge');
    }
    // 7 다리 B(본류, s 775) + 경사로: 도심 쪽은 지류 서쪽 강변도로에 붙고, 건너편은 1.5km 밖까지
    {
      const ps = C.xz(COURSE.bridges[1].s, 0, {});
      const uv = this._mainUV(ps.x, ps.z);
      const sB = uv.s;
      const top = COURSE.bridges[1].underside + 1.2;
      const ua = -(M.hw + 15);
      const ub = M.hw + 15;
      const ramp = top / 0.12; // 도심 쪽은 짧은 경사로(12%)
      const rampS = top / K.rampGrade;
      const A = this._mainXZ(sB, ub + ramp); // 도심 쪽 경사로 끝(땅)
      // 그 방향으로 지류 서쪽 강변도로(x = xW)까지
      const t = (xW - A.x) / M.rx;
      const J = { x: xW, z: A.z + M.rz * t };
      const a = this._mainXZ(sB, ua);
      const b = this._mainXZ(sB, ub);
      const S = this._mainXZ(sB, ua - rampS);
      const SF = this._mainXZ(sB, -far);
      this.bridgeB = { s: sB, ua, ub, top, ramp, rampS };
      this._addLine('다리 B 와 남북 거리', [P3(J.x, J.z), P3(A.x, A.z), [b.x, top, b.z], [a.x, top, a.z], P3(S.x, S.z), P3(SF.x, SF.z)], 7, 'bridge');
    }
    // 8 골목(대로 ↔ 다리 A 거리, 대로 ↔ 본류 강변도로)
    {
      const zA = this.bridgeA.z;
      for (const s0 of [400, 462]) {
        const s = remapS(s0);
        const p = C.xz(s, 0, {});
        this._addLine(`골목 북 s${s}`, [P3(p.x, p.z), P3(p.x, zA)], 4.5);
      }
      for (const s0 of [250, 420]) {
        const s = remapS(s0);
        const p = C.xz(s, 0, {});
        // 본류 쪽(−u 방향 아님: 지도에서 본류 도심쪽 도로까지 곧게 −Z)
        const uv = this._mainUV(p.x, p.z);
        const t = (uv.u - uN) / M.rz; // z 방향으로 내려가며 u 가 줄어드는 거리
        this._addLine(`골목 남 s${s}`, [P3(p.x, p.z), P3(p.x, p.z - t)], 4.5);
      }
    }
  }

  // 도로 그리기(땅 띠와 따로 — 겹침 깜빡임 방지용 polygonOffset)
  _buildRoads() {
    this._layoutRoads();
    if (this.roads) {
      this.group.remove(this.roads);
      this.roads.geometry.dispose();
    }
    const pos = [];
    const col = [];
    const su = [];
    const idx = [];
    const asph = [0.028, 0.028, 0.034];
    const walk = [0.05, 0.05, 0.056];
    const rk = [];
    const cross = [];
    for (const L of this.lines) {
      // 다리 상판·경사로 위(높은 부분)는 구조물이 그린다. 땅 위만 띠로
      const pts = this._densify(L.pts, 10); // 11차: 6 → 10m(삼각형 25만 이하)
      let along = 0;
      const W = L.walk;
      const ck = 0.15; // 연석 높이
      // 11차 배1: [중심에서 거리, 높이, 색] — 인도 바깥 · 연석 위 · 연석 아래(단) · 차도 · 반대편
      const prof = [[-L.half - W, ck, walk], [-L.half, ck, walk], [-L.half, 0, asph], [L.half, 0, asph], [L.half, ck, walk], [L.half + W, ck, walk]];
      const kindN = L.kind === 'avenue' ? 1 : L.kind === 'bridge' ? 2 : 0;
      let prev = null;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const q = pts[Math.min(pts.length - 1, i + 1)];
        const o = pts[Math.max(0, i - 1)];
        let dx = q[0] - o[0], dz = q[2] - o[2];
        const l = Math.hypot(dx, dz) || 1;
        dx /= l; dz /= l;
        if (prev) along += Math.hypot(p[0] - prev[0], p[2] - prev[2]);
        prev = p;
        const base = pos.length / 3;
        for (const [off, hy, c] of prof) {
          pos.push(p[0] - dz * off, p[1] + 0.02 + hy, p[2] + dx * off);
          col.push(c[0], c[1], c[2]);
          su.push(along, off);
          rk.push(L.half, kindN);
        }
        if (i > 0) {
          for (let k = 0; k < prof.length - 1; k++) {
            const a = base - prof.length + k;
            const b = base + k;
            // 땅에서 높이 뜬(다리·경사로) 부분은 띠를 그리지 않는다
            if (this._raised(p) || this._raised(pts[i - 1])) continue; // 11차 배1: 땅에서 1m 넘게 뜬(다리·경사로) 부분만 뺀다(언덕 위 대로는 그린다)
            idx.push(a, b, a + 1, a + 1, b, b + 1);
          }
        }
        // 점유 격자: 도로
        if (!this._raised(p)) this._occMark(p[0], p[2], 2, 0, L.half);
        else this._occMark(p[0], p[2], 5, p[1], L.half);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setAttribute('aSU', new THREE.Float32BufferAttribute(su, 2));
    geo.setAttribute('aRK', new THREE.Float32BufferAttribute(rk, 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    // 11차 배1: 대로 횡단보도 — 골목이 대로와 만나는 자리(대로를 따라 거리)
    const av = this.lines.find((L) => L.kind === 'avenue');
    if (av) {
      const ap = this._densify(av.pts, 6);
      const acc = [0];
      for (let i = 1; i < ap.length; i++) acc.push(acc[i - 1] + Math.hypot(ap[i][0] - ap[i - 1][0], ap[i][2] - ap[i - 1][2]));
      for (const L of this.lines) {
        if (!L.name.startsWith('골목')) continue;
        const e = L.pts[0];
        let bi = 0, bd = Infinity;
        for (let i = 0; i < ap.length; i++) { const d = Math.hypot(ap[i][0] - e[0], ap[i][2] - e[2]); if (d < bd) { bd = d; bi = i; } }
        if (bd < 12) cross.push(acc[bi] - (L.half + L.walk + 3), acc[bi] + (L.half + L.walk + 3)); // 골목 양옆 대로를 건너는 횡단보도
      }
    }
    const cu = this.roadMat.uniforms.uCross.value;
    for (let i = 0; i < 8; i++) cu[i] = i < cross.length ? cross[i] : -1e5;
    this.crossAt = cross.slice(0, 8);
    this.roads = new THREE.Mesh(geo, this.roadMat);
    this.roads.frustumCulled = false;
    this.group.add(this.roads);
  }

  // 11차 배1: 땅에서 1m 넘게 뜬 점(다리 상판·경사로)인가 — 언덕 위(땅 높이 1.6m 넘는 곳) 도로도 띠로 그리게
  _raised(p) {
    return p[1] - (Math.max(0, this.terrainY(p[0], p[2])) + 0.05) > 1.0;
  }

  _densify(pts, step) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const L = Math.hypot(b[0] - a[0], b[2] - a[2]);
      const n = Math.max(1, Math.ceil(L / step));
      for (let k = 0; k < n; k++) {
        const t = k / n;
        const x = a[0] + (b[0] - a[0]) * t, z = a[2] + (b[2] - a[2]) * t;
        // 경사로·상판은 선형 높이, 땅은 땅 높이
        const yl = a[1] + (b[1] - a[1]) * t;
        const yt = Math.max(0, this.terrainY(x, z)) + 0.05;
        out.push([x, a[1] > 1.6 || b[1] > 1.6 ? Math.max(yl, yt) : yt, z]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  // 세계 좌표 상자(가운데 x, y, z · 돌림 yaw · 크기 · 앞뒤 기울기 rx)
  _worldMatrix(x, y, z, yaw, sx, sy, sz, tilt = 0, roll = 0) {
    _p.set(x, y, z);
    _q.setFromAxisAngle(UP, yaw);
    if (tilt) {
      _q2.setFromAxisAngle(XAX, tilt);
      _q.multiply(_q2);
    }
    if (roll) {
      _q2.setFromAxisAngle(ZAX, roll);
      _q.multiply(_q2);
    }
    _s.set(sx, sy, sz);
    return _m.compose(_p, _q, _s);
  }

  _addStructW(x, y, z, yaw, sx, sy, sz, color, emis = 0, tilt = 0, roll = 0) {
    if (this._si >= MAX.struct) return;
    const i = this._si++;
    this.structs.setMatrixAt(i, this._worldMatrix(x, y, z, yaw, sx, sy, sz, tilt, roll));
    _c.set(color);
    this.structs.setColorAt(i, _c);
    this.feAttr.setXY(i, 1, emis);
    this.structOf[i] = -1;
  }

  _addCylW(x, y, z, sx, sy, sz, color, emis = 0, yaw = 0) {
    if (this._ci >= MAX.cyl) return;
    const i = this._ci++;
    this.cyls.setMatrixAt(i, this._worldMatrix(x, y, z, yaw, sx, sy, sz));
    _c.set(color);
    this.cyls.setColorAt(i, _c);
    this.cylFE.setXY(i, 1, emis);
    this.cylOf[i] = -1;
  }

  _addBuildingWorld(x, z, yaw, w, d, h, kind, lit, gain = 1, base = 0, seed = null) {
    if (this._bi >= MAX.building) return -1;
    const i = this._bi++;
    _p.set(x, base, z);
    _q.setFromAxisAngle(UP, yaw);
    _s.set(w, h, d);
    this.buildings.setMatrixAt(i, _m.compose(_p, _q, _s));
    this.infoAttr.setXYZW(i, seed !== null ? seed : Math.floor(Math.random() * 97), kind, lit, gain);
    return i;
  }

  _addCone(x, y, z, h, r, col, a = 1, i = -1, tiltX = 0, tiltZ = 0) {
    // 14차: 고정 원뿔은 서치라이트 자리(CONE_SEARCH)를 남기고 한도에서 멈춘다(넘쳐도 _ki 를 올리지 않음)
    if (i < 0 && this._ki >= MAX.cone - CONE_SEARCH) return -1;
    const k = i >= 0 ? i : this._ki++;
    if (k >= MAX.cone) return -1;
    _p.set(x, y, z);
    _q.setFromEuler(new THREE.Euler(tiltX, 0, tiltZ));
    _s.set(r, h, r);
    this.cones.setMatrixAt(k, _m.compose(_p, _q, _s));
    this.coneCC.setXYZW(k, col[0], col[1], col[2], a);
    return k;
  }

  _addRefl(x, z, len, w, col) {
    if (this._ri >= MAX.refl) return;
    const i = this._ri++;
    this.reflP.setXYZW(i, x, z, len, w);
    this.reflC.setXYZW(i, col[0], col[1], col[2], Math.random());
  }

  // 11차 배1: 바닥 빛웅덩이(가로등 자리) — 수면 반사 쿼드와 같은 인스턴스(그리기 호출 늘지 않음). 종류 표시 = 세기 칸 4 + 높이/2
  _addPool(x, y, z, r, col) {
    if (this._ri >= MAX.refl) return;
    const i = this._ri++;
    this.reflP.setXYZW(i, x, z, 0, r);
    this.reflC.setXYZW(i, col[0], col[1], col[2], 4 + Math.min(0.99, Math.max(0, y) / 4));
  }

  // 11차 배1: 젖은 노면 위 가짜 반사 띠(카메라 쪽으로 늘어남, 물 마스크 없이). 종류 표시 = 2 + 높이/4
  _addRoadRefl(x, y, z, len, w, col) {
    if (this._ri >= MAX.refl) return;
    const i = this._ri++;
    this.reflP.setXYZW(i, x, z, len, w);
    this.reflC.setXYZW(i, col[0], col[1], col[2], 2 + Math.min(0.99, Math.max(0, y) / 4));
  }

  _addHalo(x, y, z, size, col, a = 1, i = -1) {
    const k = i >= 0 ? i : this._hi++;
    if (k >= MAX.halo) return -1;
    this.haloP.setXYZW(k, x, y, z, size);
    this.haloC.setXYZW(k, col[0], col[1], col[2], a);
    return k;
  }

  _addGlow(x, y, z, sx, sy, sz, col, yaw = 0) {
    if (this._gi >= MAX.glow) return -1;
    const i = this._gi++;
    _p.set(x, y, z);
    _q.setFromAxisAngle(UP, yaw);
    _s.set(sx, sy, sz);
    this.glow.setMatrixAt(i, _m.compose(_p, _q, _s));
    _c.setRGB(col[0], col[1], col[2]);
    this.glow.setColorAt(i, _c);
    return i;
  }

  // ---------- 다리 A·B(트러스 상판 + 교각 + 양쪽 경사로가 땅에 닿음) ----------
  _buildBridges() {
    const steel = [0x48505e, 0x4a4652];
    const led = [[0.35, 0.8, 1.6], [0.7, 0.45, 1.5]];
    const deckCol = 0x34363c;
    const mk = (bi, ax, az, dx, dz, L0, L1, top, rampA, rampB) => {
      // 다리 축: 점 (ax, az) 에서 방향 (dx, dz) 로 L0 ~ L1 이 상판(높이 top), 그 바깥 rampA·rampB 길이 경사로
      const yaw = Math.atan2(-dz, dx); // 상자 x 축을 다리 방향으로
      const half = 7;
      const P = (t) => ({ x: ax + dx * t, z: az + dz * t });
      const nx = -dz, nz = dx; // 다리 폭 방향
      const span = L1 - L0;
      const mid = P((L0 + L1) / 2);
      const col = steel[bi];
      const yb = top + 0.3;
      const yt = top + 8.5;
      // 상판 · 난간 불빛
      this._addStructW(mid.x, top - 0.6, mid.z, yaw, span, 1.2, half * 2, deckCol);
      for (const e of [-1, 1]) this._addStructW(mid.x + nx * e * (half - 0.2), top + 0.45, mid.z + nz * e * (half - 0.2), yaw, span, 0.25, 0.25, 0x302820, 3.0);
      // 트러스 두 면(와렌)
      const panel = 8;
      for (const e of [-1, 1]) {
        const ox = nx * e * (half - 0.4), oz = nz * e * (half - 0.4);
        this._addStructW(mid.x + ox, yb, mid.z + oz, yaw, span, 0.6, 0.6, col);
        this._addStructW(mid.x + ox, yt, mid.z + oz, yaw, span, 0.6, 0.6, col);
        for (let t = L0; t < L1 - 1; t += panel) {
          const q = P(t);
          this._addStructW(q.x + ox, (yb + yt) / 2, q.z + oz, yaw, 0.5, yt - yb, 0.5, col);
          const k = Math.round((t - L0) / panel) % 2 === 0 ? 1 : -1;
          const Lg = Math.hypot(panel, yt - yb);
          const ang = Math.atan2((yt - yb) * k, panel);
          const q2 = P(t + panel / 2);
          this._addStructW(q2.x + ox, (yb + yt) / 2, q2.z + oz, yaw, Lg, 0.45, 0.45, col, 0, 0, ang);
        }
        const lc = led[bi];
        this._addStructW(mid.x + ox, yt + 0.42, mid.z + oz, yaw, span, 0.18, 0.18, new THREE.Color(lc[0] * 0.3, lc[1] * 0.3, lc[2] * 0.3).getHex(), 1.6);
      }
      // 위 가로보
      for (let t = L0; t < L1; t += panel * 2) {
        const q = P(t);
        this._addStructW(q.x, yt, q.z, yaw, 0.4, 0.4, half * 2 - 0.8, col);
      }
      // 상판 아래 리브·경관 조명(밑을 지날 때 보이게)
      for (const e of [-4.6, -1.6, 1.6, 4.6]) this._addStructW(mid.x + nx * e, top - 1.55, mid.z + nz * e, yaw, span, 0.7, 0.4, 0x2c2e34);
      for (let t = L0 + 3; t < L1 - 3; t += 6) {
        const q = P(t);
        this._addStructW(q.x, top - 1.4, q.z, yaw, 0.35, 0.4, half * 2 - 0.6, 0x30323a);
      }
      for (const e of [-3.1, 0, 3.1]) this._addStructW(mid.x + nx * e, top - 1.28, mid.z + nz * e, yaw, span, 0.06, 0.16, 0x5a3c18, 1.6);
      for (let t = L0 + 4; t < L1 - 4; t += 9) {
        const q = P(t);
        this._addHalo(q.x, top - 1.6, q.z, 3.2, [0.32, 0.2, 0.08]);
      }
      // 교각(물 위, 22~26m 마다) — 상판 아래까지
      for (let t = L0 + 22; t < L1 - 10; t += 24) {
        const q = P(t);
        if (!this.isWater(q.x, q.z)) continue;
        if (this.course.nearest(q.x, q.z).d < 18) continue; // 비행 통로(타원 ±9 + 카메라·여유)에는 교각을 두지 않는다
        this._addCylW(q.x, (top - 1.8) / 2, q.z, 2.2, top - 1.8, 6.5, 0x4a4b52, 0, yaw);
        this._addStructW(q.x, top - 2.2, q.z, yaw, 2.8, 1.0, half * 2 + 1, 0x3c3d44);
        this._addCylW(q.x, 1.25, q.z, 2.7, 0.25, 7.0, 0x2a2016, 0.9, yaw);
      }
      // 양끝 교대(강둑에 닿는 받침) + 경사로(땅까지)
      for (const [t0, len, sgn] of [[L0, rampA, -1], [L1, rampB, 1]]) {
        const q = P(t0);
        const yG = Math.max(0, this.terrainY(q.x, q.z));
        this._addStructW(q.x, (top + yG) / 2 - 0.6, q.z, yaw, 3, top - yG, half * 2 + 1, 0x3a3a40);
        // 경사로: 상판과 같은 단면, 기울여서 땅까지(12m 마다 받침 기둥)
        const e = P(t0 + sgn * len);
        const ye = Math.max(0, this.terrainY(e.x, e.z));
        const midR = P(t0 + (sgn * len) / 2);
        const dy = top - ye;
        const Lr = Math.hypot(len, dy);
        const tilt = Math.atan2(dy, len) * -sgn;
        this._addStructW(midR.x, (top + ye) / 2 - 0.6, midR.z, yaw, Lr, 1.2, half * 2, deckCol, 0, 0, tilt);
        for (const ee of [-1, 1]) this._addStructW(midR.x + nx * ee * (half - 0.3), (top + ye) / 2 + 0.3, midR.z + nz * ee * (half - 0.3), yaw, Lr, 0.9, 0.3, 0x45474e, 0, 0, tilt);
        for (let k = 12; k < len - 6; k += 14) {
          const qq = P(t0 + sgn * k);
          const yy = top - (dy * k) / len - 1.2;
          const yg = Math.max(0, this.terrainY(qq.x, qq.z));
          if (yy - yg < 1.5) continue;
          this._addStructW(qq.x, (yy + yg) / 2, qq.z, yaw, 1.6, yy - yg, 4, 0x3e4046);
        }
      }
      // 11차 배2: 다리 위 차는 「다리 A 와 동서 거리」·「다리 B 와 남북 거리」 선의 차량 불빛 줄기로(_buildCars)
      // 수면 반사 띠
      for (let t = L0 + 6; t < L1 - 6; t += 9) {
        const q = P(t);
        if (!this.isWater(q.x, q.z)) continue;
        const lc = led[bi];
        this._addRefl(q.x + nx * 6.5, q.z + nz * 6.5, 34, 1.1, [lc[0] * 0.09, lc[1] * 0.09, lc[2] * 0.09]);
      }
    };
    const A = this.bridgeA;
    mk(0, 0, A.z, 1, 0, A.xa, A.xb, A.top, A.ramp, A.ramp);
    const B = this.bridgeB;
    const o = this._mainXZ(B.s, 0);
    mk(1, o.x, o.z, this.main.rx, this.main.rz, B.ua, B.ub, B.top, B.rampS, B.ramp);
  }

  // ---------- 건물(구역별) ----------
  _buildCity() {
    const C = this.course;
    const K = CITY;
    const o = this.occ;
    // 코스 둘레 격자 칸(26m)에 건물 하나씩(흔들어서)
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let s = -320; s <= S_END(); s += 10) {
      const p = C.xz(s, 0, {});
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x);
      z0 = Math.min(z0, p.z); z1 = Math.max(z1, p.z);
    }
    x0 -= K.fill; x1 += K.fill; z0 -= K.fill; z1 += K.fill;
    const cell = 26;
    const roadNear = (x, z, r) => {
      for (const L of this.lines) {
        for (let i = 0; i < L.pts.length - 1; i++) {
          const a = L.pts[i], b = L.pts[i + 1];
          const d = segDist(x, z, a[0], a[2], b[0], b[2]);
          if (d < L.half + L.walk + 0.5 + r) return true;
        }
      }
      return false;
    };
    let dong = 0;
    for (let gx = x0; gx < x1; gx += cell) {
      for (let gz = z0; gz < z1; gz += cell) {
        const x = gx + rand(-3, 3);
        const z = gz + rand(-3, 3);
        const n = C.nearest(x, z);
        if (n.d > K.fill + 20) continue;
        const bd = this.bankDist(x, z);
        if (bd < 36) continue; // 물·강둑·둔치·강변도로
        const sC = Math.max(-40, Math.min(COURSE.length + 20, n.s));
        const zone = C.zoneAt(sC);
        const pth = C.at(sC, {});
        const yaw = n.d < 230 ? -pth.th : Math.round(-pth.th / (Math.PI / 2)) * (Math.PI / 2);
        let w = rand(14, 21);
        let d = rand(12, 19);
        const halfDiag = Math.hypot(w, d) / 2;
        if (roadNear(x, z, halfDiag)) continue;
        // 통로 둘레: 경로에서 clearU 안쪽(건물 모서리 기준)은 통로 바닥 − 3m 아래로만
        const cv = C.center(sC);
        const edge = Math.abs(n.u) - halfDiag;
        let hMax = 300;
        if (n.s > -60 && n.s < COURSE.length + 60 && edge < K.clearU) hMax = cv - COURSE.ellipse.v - 3;
        if (hMax < 5) continue;
        let kind = 2;
        let h;
        let lit = rand(0.25, 0.75); // 11차 배3: 건물마다 점등률 0.25~0.75
        const au = Math.abs(n.u);
        if ((zone.id === 'canyon' || zone.id === 'avenue' || (zone.id === 'climb' && sC < remapS(380))) && au < 120 && n.d < 125) {
          // 빌딩 협곡: 유리 업무 빌딩(대로 쪽 벽이 경로에서 21m)
          kind = 1;
          h = rand(48, 112) * (au < 60 ? 1 : 0.8);
          w = rand(18, 26);
          d = rand(16, 24);
        } else if ((zone.id === 'climb' || zone.id === 'roof') && au < 170) {
          // 협곡 출구 → 옥상: 지붕이 통로 아래로 낮아진다(가까울수록 통로 바닥 바로 아래)
          kind = Math.random() < 0.3 ? 1 : 2;
          const below = cv - COURSE.ellipse.v - rand(3.5, 9);
          h = au < 70 ? below : rand(Math.max(10, below - 6), below + 14);
          w = rand(16, 24);
          d = rand(14, 22);
          lit = rand(0.35, 0.6);
        } else if (bd < 140) {
          // 강변 아파트(판상형) — 11차 배3: 35% 는 탑상형(두 상자를 十자로)
          kind = 0;
          h = Math.round(rand(36, 66) / 2.8) * 2.8 + 1.4;
          w = rand(40, 56);
          d = rand(13, 15);
          if (Math.random() < 0.35) { w = rand(22, 26); d = rand(10, 12); }
          if (roadNear(x, z, Math.hypot(w, d) / 2)) continue;
        } else {
          kind = Math.random() < 0.55 ? 0 : 2;
          h = kind === 0 ? Math.round(rand(30, 60) / 2.8) * 2.8 + 1.4 : rand(10, 28);
          if (kind === 0) {
            w = rand(36, 50);
            d = rand(13, 15);
            if (roadNear(x, z, Math.hypot(w, d) / 2)) continue;
          }
        }
        h = Math.min(h, hMax);
        if (h < 5) continue;
        const ty = Math.max(0, this.terrainY(x, z));
        const bgain = rand(0.85, 1.15);
        const bi0 = this._addBuildingWorld(x, z, yaw, w, d, h + ty, kind, lit, bgain);
        if (kind === 0 && w < 30) {
          // 탑상형: 같은 높이 상자를 직각으로 하나 더(十자) — 같은 건물 인스턴스(그리기 호출 늘지 않음)
          this._addBuildingWorld(x, z, yaw + Math.PI / 2, w, d, h + ty, kind, lit, bgain, 0, bi0 >= 0 ? this.infoAttr.getX(bi0) : null);
        }
        this.lots.push({ x, z, w, d, h: h + ty, kind, yaw });
        this._occMark(x, z, 3, h + ty, Math.min(w, d) / 2);
        const top = h + ty;
        const cy = Math.cos(yaw), sy = Math.sin(yaw);
        const at = (lx, lz) => ({ x: x + cy * lx + sy * lz, z: z - sy * lx + cy * lz });
        // 옥상 소품
        if (kind === 0) {
          // 옥탑(기계실) + 물탱크 + 동 번호
          const q = at(rand(-w * 0.3, w * 0.3), 0);
          this._addBuildingWorld(q.x, q.z, yaw, rand(6, 9), Math.min(d * 0.6, 8), 3.2, 3, 0, 1, top);
          // 12차 배6: 계단실·승강기 탑(판상형은 양쪽 끝 가까이 1~2개, 옥상 위로 4.5~6.5m) + 옥상 난간(낮은 테두리)
          const nT = w > 30 ? 2 : 1;
          for (let t2 = 0; t2 < nT; t2++) {
            const q2 = at((t2 === 0 ? -1 : 1) * w * rand(0.18, 0.36), rand(-d * 0.15, d * 0.15));
            this._addBuildingWorld(q2.x, q2.z, yaw, rand(4.5, 6.5), rand(4.5, 6), rand(4.5, 6.5), 3, 0, 1, top);
          }
          this._addBuildingWorld(x, z, yaw, w + 0.25, d + 0.25, 1.1, 3, 0, 1, top);
          this.signList.push({ x, z, yaw, w, d, top, kind: 'dong', n: dong++, size: 8 });
        } else if (top < 45 || zone.id === 'roof' || zone.id === 'climb') {
          // 물탱크(원통) · 실외기(작은 상자) · 안테나(항공등)
          const nt = 1 + Math.floor(Math.random() * 2);
          for (let k = 0; k < nt; k++) {
            const q = at(rand(-w * 0.3, w * 0.3), rand(-d * 0.3, d * 0.3));
            const r = rand(1.4, 2.2);
            this._addCylW(q.x, top + 1.4, q.z, r * 2, 2.8, r * 2, 0x56585e);
            this._addCylW(q.x, top + 3.0, q.z, r * 2.05, 0.3, r * 2.05, 0x3c3e44);
          }
          const na = 3 + Math.floor(Math.random() * 4);
          for (let k = 0; k < na; k++) {
            const q = at(rand(-w * 0.4, w * 0.4), rand(-d * 0.4, d * 0.4));
            this._addBuildingWorld(q.x, q.z, yaw + rand(-0.1, 0.1), rand(1.2, 1.8), rand(0.8, 1.2), 1.0, 3, 0, 1, top);
          }
          if (Math.random() < 0.55) {
            const q = at(rand(-w * 0.3, w * 0.3), rand(-d * 0.3, d * 0.3));
            const ah = rand(5, 11);
            this._addBuildingWorld(q.x, q.z, 0, 0.25, 0.25, ah, 3, 0, 1, top);
            const gi2 = this._addGlow(q.x, top + ah + 0.2, q.z, 0.35, 0.35, 0.35, [0.55, 0.02, 0.05]); // 항공등: 어둡고 작은 진홍(위험색 붉은 주황과 다름)
            if (gi2 >= 0) (this.avLights || (this.avLights = [])).push(gi2); // 11차 배4: 0.5Hz 로 부드럽게(밝기 변화 0.2 이하), 판정 시간에는 멈춤
          }
          // 옥상 난간(낮은 테두리)
          this._addBuildingWorld(x, z, yaw, w + 0.3, d + 0.3, 0.9, 3, 0, 1, top);
          if (kind === 2 && Math.random() < 0.5) this.signList.push({ x, z, yaw, w, d, top, kind: 'neon' });
          // 11차 배4: 교회 십자가 네온(상가 8곳에 1개, 옥상 위 +4~6m, 통로 중심선 25m 밖, HDR 0.6, 깜빡임 없음)
          if (kind === 2 && n.d > 25 && (this._crossN = (this._crossN || 0) + 1) % 8 === 0) {
            const cy2 = top + rand(4, 6);
            const red = [0.6, 0.05, 0.06];
            this._addGlow(x, cy2, z, 0.25, 3, 0.25, red, yaw);
            this._addGlow(x, cy2 + 0.55, z, 1.6, 0.25, 0.25, red, yaw);
            this._addBuildingWorld(x, z, yaw, 0.3, 0.3, cy2 - 1.5 - top, 3, 0, 1, top);
            this.crosses = (this.crosses || 0) + 1;
          }
        }
        // 11차 배4: 상가(가까운 곳) 1층 가로 간판 띠 + 2~5층 세로 돌출 간판
        if (kind === 2 && n.d < 260 && top > 7) {
          this.signList.push({ x, z, yaw, w, d, top, kind: 'band' });
          if (top > 12 && Math.random() < 0.6) this.signList.push({ x, z, yaw, w, d, top, kind: 'vert', side: Math.random() < 0.5 ? -1 : 1 });
        }
        if (zone.id !== 'canyon' || Math.random() < 0.3) this.launchers.push({ x, y: top + 0.5, z, kind: 'roof' });
      }
    }
    // 둔치 군중(지류 시작 구간 양쪽, 본류 끝 구간 도심 쪽)
    const T = this.trib;
    for (let z = 260; z > -40; z -= 0.6) {
      if (Math.random() > 0.85) continue;
      if (Math.abs(z - this.bridgeA.z) < 10) continue;
      for (const side of [-1, 1]) {
        if (Math.random() < 0.4) continue;
        const x = CITY.trib.x + side * (T.hw + rand(3, 14));
        this.crowdSpots.push(x, z, Math.random());
      }
    }
    const sCr = remapS(640);
    for (let s = 0; s < COURSE.length + 40 - sCr; s += 0.6) {
      if (Math.random() > 0.8) continue;
      const p = C.xz(sCr + s, 0, {});
      const uv = this._mainUV(p.x, p.z);
      const q = this._mainXZ(uv.s, this.main.hw + rand(3, 14));
      if (this.bridgeB && Math.abs(uv.s - this.bridgeB.s) < 10) continue;
      this.crowdSpots.push(q.x, q.z, Math.random());
    }
  }

  // 원경 아파트 단지(코스에서 350m 넘게)
  _buildFar() {
    const C = this.course;
    const m = this.maskInfo;
    const cx = m.ox + m.size / 2;
    const cz = m.oz + m.size / 2;
    let made = 0;
    for (let tries = 0; tries < 1400 && made < 190; tries++) {
      const a = rand(0, Math.PI * 2);
      const r = rand(360, 1350);
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (this.bankDist(x, z) < 40) continue;
      const n = C.nearest(x, z);
      if (n.d < CITY.fill + 15) continue;
      const yaw = Math.random() < 0.5 ? -C.at(Math.max(C.sMin, Math.min(C.sMax, n.s)), {}).th : rand(0, Math.PI);
      const cnt = Math.floor(rand(3, 7));
      const hBase = rand(40, 90);
      for (let k = 0; k < cnt; k++) {
        const ox = (k - cnt / 2) * rand(30, 40);
        const px = x - Math.sin(yaw) * ox;
        const pz = z + Math.cos(yaw) * ox;
        if (this.bankDist(px, pz) < 40) continue;
        const h = Math.round((hBase * rand(0.8, 1.2)) / 2.8) * 2.8 + 1.4;
        this._addBuildingWorld(px, pz, yaw, rand(45, 70), rand(13, 16), h, Math.random() < 0.85 ? 0 : 1, rand(0.25, 0.75), rand(0.9, 1.2));
        this._occMark(px, pz, 3, h, 8);
        if (Math.random() < 0.5) this.launchers.push({ x: px, y: h + 1, z: pz, kind: 'roof' });
        if (k === 0) this._addHalo(px, h * 0.55, pz, h * 0.9, [0.06, 0.045, 0.03]);
      }
      made++;
    }
  }

  _buildRidge() {
    if (this.ridge) {
      this.group.remove(this.ridge);
      this.ridge.geometry.dispose();
    }
    const m = this.maskInfo;
    const cx = m.ox + m.size / 2;
    const cz = m.oz + m.size / 2;
    const pos = [];
    const uv = [];
    const idx = [];
    const n = 220;
    for (const [rad, hmin, hmax, ph] of [[1700, 60, 170, 0.3], [1500, 30, 110, 2.1]]) {
      const start = pos.length / 3;
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2;
        const h = hmin + (hmax - hmin) * (0.5 + 0.3 * Math.sin(a * 3 + ph) + 0.15 * Math.sin(a * 7.3 + ph * 2) + 0.05 * Math.sin(a * 17 + ph));
        const x = cx + Math.cos(a) * rad;
        const z = cz + Math.sin(a) * rad;
        pos.push(x, -5, z, x, h, z);
        uv.push(i / n, 0, i / n, 1);
      }
      for (let i = 0; i < n; i++) {
        const a = start + i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    this.ridgeMat.side = THREE.DoubleSide;
    this.ridge = new THREE.Mesh(geo, this.ridgeMat);
    this.ridge.frustumCulled = false;
    this.ridge.renderOrder = -5;
    this.group.add(this.ridge);
  }

  // 11차 배5: 원경 3겹 카드 — 지도 가운데를 둘러싼 고리 세 겹(600 · 900 · 1300m). 2~5° 마다 높이가 다른 건물 윗선(40~90m)
  _buildFarCards() {
    if (this.farCards) {
      this.group.remove(this.farCards);
      this.farCards.geometry.dispose();
    }
    const m = this.maskInfo;
    const cx = m.ox + m.size / 2;
    const cz = m.oz + m.size / 2;
    const pos = [], af = [], idx = [];
    // 12차 배8: 3겹(1300m)은 생성 스카이라인 띠 — 높이 150m 이어진 고리(겹 번호 3, 가로 위치 = 호 길이)
    {
      const rad = 1300, H = 150;
      for (let a = 0; a < Math.PI * 2 - 1e-6; a += Math.PI / 90) {
        const a1 = a + Math.PI / 90;
        const p0 = [cx + Math.cos(a) * rad, cz + Math.sin(a) * rad], p1 = [cx + Math.cos(a1) * rad, cz + Math.sin(a1) * rad];
        if (this.course.nearest((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2).d < 1000) continue;
        const b = pos.length / 3;
        pos.push(p0[0], -5, p0[1], p1[0], -5, p1[1], p0[0], H, p0[1], p1[0], H, p1[1]);
        af.push(3, a * rad, 0, 3, a1 * rad, 0, 3, a * rad, 1, 3, a1 * rad, 1);
        idx.push(b, b + 1, b + 2, b + 2, b + 1, b + 3);
      }
    }
    [[600, 0], [900, 1], [1300, 2]].forEach(([rad, layer]) => {
      let a = Math.random() * 0.05;
      while (a < Math.PI * 2) {
        const da = (rand(2, 5) * Math.PI) / 180;
        const h = rand(40, 90) * (Math.random() < 0.15 ? 0.55 : 1);
        const a1 = Math.min(Math.PI * 2, a + da);
        const r = rad * rand(0.97, 1.03);
        const p0 = [cx + Math.cos(a) * r, cz + Math.sin(a) * r], p1 = [cx + Math.cos(a1) * r, cz + Math.sin(a1) * r];
        // 코스에서 충분히 먼 조각만(1겹 450m · 2겹 700m · 3겹 1000m 밖) — 가까우면 납작한 벽으로 보인다
        const minD = [450, 700, 1000][layer];
        if (this.course.nearest((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2).d < minD) { a = a1; continue; }
        const b = pos.length / 3;
        pos.push(p0[0], -5, p0[1], p1[0], -5, p1[1], p0[0], h, p0[1], p1[0], h, p1[1]);
        const xa = a * r, xb = a1 * r;
        af.push(layer, xa, 0, layer, xb, 0, layer, xa, 1, layer, xb, 1);
        idx.push(b, b + 1, b + 2, b + 2, b + 1, b + 3);
        a = a1;
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aF', new THREE.Float32BufferAttribute(af, 3));
    geo.setIndex(idx);
    this.farCardMat.side = THREE.DoubleSide;
    this.farCards = new THREE.Mesh(geo, this.farCardMat);
    this.farCards.frustumCulled = false;
    this.farCards.renderOrder = -4;
    this.group.add(this.farCards);
  }

  // 바지선: 6차 — 지류 시작 구간에 3척만(장식 발사대)
  _buildBarges() {
    const T = CITY.trib;
    for (const [x, z, len, w] of [[T.x + 38, 150, 12, 5], [T.x + 42, -110, 14, 5.5], [T.x - 20, -230, 11, 4.5]]) {
      if (this._bai >= MAX.barge) break;
      const i = this._bai++;
      this.barges.setMatrixAt(i, this._worldMatrix(x, 0.25, z, 0, w, 0.5, len));
      this._addGlow(x, 0.75, z, 0.25, 0.25, 0.25, [0.95, 0.85, 0.6]);
      this._addHalo(x, 0.85, z, 1.6, [0.3, 0.25, 0.16]);
      for (let k = 0; k < 6; k++) this._addBuildingWorld(x - w * 0.2, z - len * 0.35 + k * len * 0.12, 0, 0.32, 0.32, 0.95, 3, 0, 1, 0.5);
      this.launchers.push({ x, y: 1.5, z, kind: 'barge' });
    }
  }

  // 가로등: 강변도로·대로·골목(땅 위 부분)
  _buildLamps() {
    const lamp = new THREE.Color(this.stage.lampColor);
    const lc = [lamp.r * 1.8, lamp.g * 1.8, lamp.b * 1.8];
    for (const L of this.lines) {
      const pts = this._densify(L.pts, 30);
      for (let i = 0; i < pts.length - 1; i++) {
        const p = pts[i];
        if (this._raised(p)) continue;
        const q = pts[i + 1];
        let dx = q[0] - p[0], dz = q[2] - p[2];
        const l = Math.hypot(dx, dz) || 1;
        dx /= l; dz /= l;
        // 코스에서 1.2km 넘게 먼 가로등은 생략(안 보임)
        const n = this.course.nearest(p[0], p[2]);
        if (n.d > 900) continue;
        for (const side of [-1, 1]) {
          const off = L.half + 1.2;
          const x = p[0] - dz * side * off;
          const z = p[2] + dx * side * off;
          const y = p[1] + 7;
          this._addGlow(x, y, z, 0.6, 0.25, 0.6, lc);
          (this.lampXZ || (this.lampXZ = [])).push([x, z]);
          this._addBuildingWorld(x, z, 0, 0.22, 0.22, 7, 3, 0, 1, p[1]);
          this._addHalo(x, y, z, 2.6, [lamp.r * 0.55, lamp.g * 0.45, lamp.b * 0.32]);
          if (n.d < 420) this._addCone(x, y - 0.1, z, 6.7, 3.2, [lamp.r * 0.07, lamp.g * 0.055, lamp.b * 0.035]);
          // 11차 배1: 그 가로등 아래 바닥 빛웅덩이(반지름 5.5m) + 차도 쪽 젖은 노면 반사 띠(길이 6~10m · 폭 0.6m · 밝기 0.35 이하)
          if (n.d < 600) {
            const xg = p[0] - dz * side * (L.half - 1.5), zg = p[2] + dx * side * (L.half - 1.5);
            this._addPool(xg, p[1] + 0.2, zg, 5.5, [lamp.r * 0.16, lamp.g * 0.12, lamp.b * 0.08]);
            if (Math.random() < 0.55) this._addRoadRefl(p[0] - dz * side * (L.half - 2.2), p[1] + 0.07, p[2] + dx * side * (L.half - 2.2), rand(6, 10), 0.6, [lamp.r * 0.3, lamp.g * 0.24, lamp.b * 0.15]);
          }
        }
      }

    }
    // 강둑 가로등 불빛 수면 반사
    for (const riv of this.rivers) {
      const p = {};
      for (let s = 0; s < riv.path.sMax; s += 30) {
        riv.path.at(s, p);
        const n = this.course.nearest(p.x, p.z);
        if (n.d > 700) continue;
        for (const side of [-1, 1]) {
          const u = side * (riv.hw - 1.5);
          const x = p.x + Math.cos(p.th) * u, z = p.z + Math.sin(p.th) * u;
          if (!this.isWater(x, z)) continue;
          this._addRefl(x, z, 26, 0.9, [lamp.r * 0.22, lamp.g * 0.18, lamp.b * 0.12]);
        }
      }
    }
  }

  // 11차 배2: 차량 불빛 줄기 — 강변도로 한 줄 120대 · 대로 60대 · 다리 하나 40대(최대 600). 3~6대씩 무리, 속도 14~22m/s.
  // 도로를 최대 160m 선분으로 나누고, 차는 제 선분 안을 돈다(끝에서 부드럽게 사라졌다 나타남). 통로 가까이(40m)에서 통로 바닥 − 3m 보다 높은 선분은 뺀다(다리 위 등).
  _buildCars() {
    const C = this.course;
    const segs = [];
    for (const L of this.lines) {
      const per = L.name.includes('강변도로') ? 150 : L.kind === 'avenue' ? 120 : L.kind === 'bridge' ? 60 : 0; // 12차 배7: 줄당 150대(강변) · 대로 120 · 다리 60
      if (!per) continue;
      const pts = this._densify(L.pts, 40);
      // 선분 묶기(최대 160m)
      const pieces = [];
      let a = 0;
      for (let i = 1; i < pts.length; i++) {
        const len = Math.hypot(pts[i][0] - pts[a][0], pts[i][2] - pts[a][2]);
        if (len >= 150 || i === pts.length - 1) { pieces.push([pts[a], pts[i]]); a = i; }
      }
      const ok = pieces.filter(([p, q]) => {
        for (const f of [0, 0.25, 0.5, 0.75, 1]) {
          const x = p[0] + (q[0] - p[0]) * f, y = p[1] + (q[1] - p[1]) * f, z = p[2] + (q[2] - p[2]) * f;
          const n = C.nearest(x, z);
          if (n.d > 1100) return false;
          if (n.d < 40 && y + 1 > C.center(Math.max(C.sMin, Math.min(C.sMax, n.s))) - COURSE.ellipse.v - 3) return false;
        }
        return true;
      });
      const totLen = ok.reduce((t, [p, q]) => t + Math.hypot(q[0] - p[0], q[2] - p[2]), 0);
      if (!ok.length || totLen < 1) continue;
      for (const [p, q] of ok) {
        const len = Math.hypot(q[0] - p[0], q[2] - p[2]);
        const n = Math.max(1, Math.round((per * len) / totLen));
        segs.push({ L, p, q, len, n });
      }
    }
    let k = 0;
    for (const sg of segs) {
      const dx = (sg.q[0] - sg.p[0]) / sg.len, dz = (sg.q[2] - sg.p[2]) / sg.len;
      let left = sg.n;
      while (left > 0 && k < MAX.car) {
        const g = Math.min(left, 3 + Math.floor(Math.random() * 4)); // 3~6대 무리
        const dir = Math.random() < 0.5 ? 1 : -1;
        const lanes = Math.max(1, Math.floor((sg.L.half - 0.6) / 3.3));
        const lane = 1 + Math.floor(Math.random() * lanes);
        const off = dir * (0.225 + 3.3 * (lane - 0.5)); // 우측 통행(진행 방향 오른쪽 차로)
        const ph0 = Math.random();
        const sp = rand(14, 22);
        for (let j = 0; j < g && k < MAX.car; j++) {
          const A = dir > 0 ? sg.p : sg.q, B = dir > 0 ? sg.q : sg.p;
          const ox = -dz * off, oz = dx * off;
          this.carA.setXYZW(k, A[0] + ox, A[1] + 0.65, A[2] + oz, (ph0 + j * rand(9, 16) / sg.len) % 1);
          this.carB.setXYZW(k, B[0] + ox, B[1] + 0.65, B[2] + oz, sp / sg.len);
          const bus = L0kind(sg.L) && Math.random() < 0.1 ? 1 : 0; // 12차: 10% 버스(길이 11m, 실내등 띠)
          this.carC.setXYZW(k, rand(4, 6), 0.35, rand(0.8, 1.0), bus);
          k++;
        }
        left -= g;
      }
    }
    this.carMesh.geometry.instanceCount = k;
    this.carBody.geometry.instanceCount = k;
    this.carA.needsUpdate = true;
    this.carB.needsUpdate = true;
    this.carC.needsUpdate = true;
    this.carCount = k;
  }

  // 11차 배4: 가로수 — 대로 인도와 강변도로 바깥 인도에 9m 간격(최대 1,500그루). 통로(경로에서 16m) 안쪽은 통로 바닥 − 3m 아래 높이만, 가로등 자리(3m 안)는 비움
  _buildTrees() {
    const C = this.course;
    let k = 0;
    for (const L of this.lines) {
      if (!(L.kind === 'avenue' || L.name.includes('강변도로'))) continue;
      const pts = this._densify(L.pts, 9);
      for (let i = 0; i < pts.length - 1 && k < MAX.tree; i++) {
        const p = pts[i];
        if (this._raised(p)) continue;
        const q = pts[i + 1];
        let dx = q[0] - p[0], dz = q[2] - p[2];
        const l = Math.hypot(dx, dz) || 1;
        dx /= l; dz /= l;
        for (const side of [-1, 1]) {
          const off = L.half + L.walk - 1.0;
          const x = p[0] - dz * side * off, z = p[2] + dx * side * off;
          const n = C.nearest(x, z);
          if (n.d > 700) continue;
          if (this.isWater(x, z)) continue;
          let sc = rand(0.85, 1.2);
          if (n.s > -60 && n.s < COURSE.length + 60 && Math.abs(n.u) < CITY.clearU + 2) {
            const maxH = C.center(Math.max(C.sMin, Math.min(C.sMax, n.s))) - COURSE.ellipse.v - 3 - p[1];
            if (maxH < 3.5) continue;
            sc = Math.min(sc, maxH / 6.2);
          }
          if (Math.abs((i * 9) % 30 - 0) < 3) continue; // 가로등 자리
          this._treeAt(k++, x, p[1] + 0.15, z, sc);
          if (k >= MAX.tree) break;
        }
      }
    }
    // 12차: 대로 가운데 분리대에도 12m 간격(통로 바닥 − 3m 아래 높이만)
    for (const L of this.lines) {
      if (L.kind !== 'avenue') continue;
      const pts = this._densify(L.pts, 12);
      for (let i = 0; i < pts.length && k < MAX.tree; i++) {
        const p = pts[i];
        if (this._raised(p) || i % 5 === 0) continue;
        const n = C.nearest(p[0], p[2]);
        let sc = rand(0.8, 1.05);
        if (n.s > -60 && n.s < COURSE.length + 60 && Math.abs(n.u) < CITY.clearU + 2) {
          const maxH = C.center(Math.max(C.sMin, Math.min(C.sMax, n.s))) - COURSE.ellipse.v - 3 - p[1];
          if (maxH < 4) continue;
          sc = Math.min(sc, maxH / 9);
        }
        this._treeAt(k++, p[0], p[1] + 0.15, p[2], sc);
      }
    }
    this.trees.count = k;
    this.trees.instanceMatrix.needsUpdate = true;
    if (this.trees.instanceColor) this.trees.instanceColor.needsUpdate = true;
    this.treeCount = k;
  }

  // 12차 가로수 하나: 크기 sc, 가로등(12m 안)에 가까우면 따뜻한 빛(인스턴스 색)
  _treeAt(k, x, y, z, sc) {
    this.trees.setMatrixAt(k, this._worldMatrix(x, y, z, rand(0, 6.28), sc, sc * rand(0.9, 1.1), sc));
    let warm = 0;
    for (const L of this.lampXZ || []) { const d = Math.hypot(L[0] - x, L[1] - z); if (d < 12) warm = Math.max(warm, 1 - d / 12); }
    const v = rand(0.85, 1.15);
    this.trees.setColorAt(k, _c.setRGB((0.32 + 1.1 * warm) * v, (0.42 + 0.75 * warm) * v, (0.3 + 0.32 * warm) * v));
  }

  // 간판 인스턴스(아틀라스가 준비되면)
  _buildSigns() {
    if (!this.atlas || !this.atlas.tex) return;
    if (!this.signs) {
      const g = new THREE.PlaneGeometry(1, 1);
      g.setAttribute('aUV', new THREE.InstancedBufferAttribute(new Float32Array(MAX.sign * 4), 4));
      g.setAttribute('aCol', new THREE.InstancedBufferAttribute(new Float32Array(MAX.sign * 4), 4));
      this.signs = new THREE.InstancedMesh(g, makeSignMaterial(this.shared, this.atlas.tex), MAX.sign);
      this.signs.frustumCulled = false;
      this.signs.renderOrder = 3;
      this.group.add(this.signs);
    }
    this.signs.material.uniforms.uAtlas.value = this.atlas.tex;
    const neon = this.atlas.entries.filter((e) => e.kind === 'neon');
    const dong = this.atlas.entries.filter((e) => e.kind === 'dong');
    const vert = this.atlas.entries.filter((e) => e.kind === 'vert');
    const aUV = this.signs.geometry.attributes.aUV;
    const aCol = this.signs.geometry.attributes.aCol;
    let n = 0;
    for (const sg of this.signList) {
      if (n >= MAX.sign) break;
      if (sg.kind === 'band' || sg.kind === 'vert') {
        // 11차 배4: 1층 가로 간판 띠(건물 앞면 폭 80%, 높이 0.9m, 3.6m 높이) · 세로 돌출 간판(모서리에서 직각으로 0.6m 튀어나옴, 2~5층)
        const cy = Math.cos(sg.yaw), sy = Math.sin(sg.yaw);
        const nn = this.course.nearest(sg.x, sg.z);
        const face = nn.u > 0 ? -1 : 1;
        const yawF = sg.yaw + (face > 0 ? 0 : Math.PI);
        const base = Math.max(0, this.terrainY(sg.x, sg.z));
        if (sg.kind === 'band') {
          const e = pick(neon);
          const h = 0.9, w = Math.min(sg.w * 0.8, h * e.aspect * 1.6);
          const lz = face * (sg.d / 2 + 0.12);
          this.signs.setMatrixAt(n, this._worldMatrix(sg.x + sy * lz, base + 4.1, sg.z + cy * lz, yawF, w, h, 1));
          aUV.setXYZW(n, e.uv[0], e.uv[1], e.uv[2], e.uv[3]);
        } else {
          const e = pick(vert);
          if (!e) continue;
          const h = Math.min(sg.top - base - 6, rand(4.5, 6.5)), w = h * e.aspect;
          const lz = face * (sg.d / 2 + 0.7), lx = sg.side * (sg.w / 2 - 1.2);
          this.signs.setMatrixAt(n, this._worldMatrix(sg.x + cy * lx + sy * lz, base + 6.5 + h / 2, sg.z - sy * lx + cy * lz, yawF + Math.PI / 2, w, h, 1));
          aUV.setXYZW(n, e.uv[0], e.uv[1], e.uv[2], e.uv[3]);
        }
        const c = new THREE.Color(sg.kind === 'band' ? pick(SIGNS.neon) : pick(SIGNS.neon));
        const L = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
        const k = 0.5; // HDR 0.7 이하, 채도 −20%
        aCol.setXYZW(n, (L + (c.r - L) * 0.8) * k + 0.06, (L + (c.g - L) * 0.8) * k + 0.06, (L + (c.b - L) * 0.8) * k + 0.06, 0);
        n++;
        continue;
      }
      const e = sg.kind === 'neon' ? pick(neon) : dong[sg.n % dong.length];
      const h = sg.kind === 'neon' ? rand(2.6, 3.4) : sg.size * 0.42;
      const w = h * e.aspect;
      // 건물 앞면(코스 쪽) 위: 옥상 네온은 지붕 위, 동 번호는 벽 위쪽
      const cy = Math.cos(sg.yaw), sy = Math.sin(sg.yaw);
      const C = this.course;
      const nn = C.nearest(sg.x, sg.z);
      const face = nn.u > 0 ? -1 : 1; // 코스 쪽 면
      const lz = face * (sg.d / 2 + (sg.kind === 'neon' ? -1.2 : 0.15));
      const x = sg.x + sy * lz;
      const z = sg.z + cy * lz;
      const y = sg.kind === 'neon' ? sg.top + h / 2 + 0.3 : sg.top - 5;
      const yaw = sg.yaw + (face > 0 ? 0 : Math.PI);
      this.signs.setMatrixAt(n, this._worldMatrix(x, y, z, yaw, w, h, 1));
      aUV.setXYZW(n, e.uv[0], e.uv[1], e.uv[2], e.uv[3]);
      if (sg.kind === 'neon') {
        const c = new THREE.Color(e.color);
        const hero = Math.random() < 0.2;
        const k = hero ? 0.62 : 0.5; // 11차 배4: 간판 HDR 0.7 이하(블룸 문턱 1.0 아래), 깜빡임 없음
        const b0 = hero ? 0.06 : 0.04;
        aCol.setXYZW(n, b0 + c.r * k, b0 + c.g * k, b0 + c.b * k, 0);
      } else {
        aCol.setXYZW(n, 0.42, 0.4, 0.37, 0);
      }
      n++;
    }
    this.signs.count = n;
    this.signs.instanceMatrix.needsUpdate = true;
    aUV.needsUpdate = true;
    aCol.needsUpdate = true;
  }

  launcherNear(x, z, maxD) {
    let best = null;
    let bd = maxD * maxD;
    for (const L of this.launchers) {
      const d = (L.x - x) ** 2 + (L.z - z) ** 2;
      if (d < bd) { bd = d; best = L; }
    }
    return best;
  }

  // ---------- 끊긴 끝점 검사 ----------
  // 선형 구조물 끝점마다: 다른 구조물 선에서 8m 안(같은 높이 ±2.5m)이면 「붙음」, 코스 어디서도 roadFar − 50m 넘게 멀면 「안개 너머」. 둘 다 아니면 「끊김」.
  _checkEnds() {
    const C = this.course;
    const res = [];
    for (const L of this.lines) {
      for (const end of [L.pts[0], L.pts[L.pts.length - 1]]) {
        let joined = null;
        for (const O of this.lines) {
          if (O === L) continue;
          for (let i = 0; i < O.pts.length - 1; i++) {
            const a = O.pts[i], b = O.pts[i + 1];
            const d = segDist(end[0], end[2], a[0], a[2], b[0], b[2]);
            if (d < 8 && Math.abs(end[1] - (a[1] + b[1]) / 2) < 2.5 + Math.abs(a[1] - b[1])) { joined = O.name; break; }
          }
          if (joined) break;
        }
        let dMin = Infinity;
        for (let s = -320; s <= S_END(); s += 5) {
          const p = C.xz(s, 0, this._ce || (this._ce = {}));
          dMin = Math.min(dMin, Math.hypot(p.x - end[0], p.z - end[2]));
        }
        const farOK = dMin > CITY.roadFar - 300;
        res.push({ name: L.name, end: end.map((v) => +v.toFixed(1)), joined, dCourse: +dMin.toFixed(0), status: joined ? '붙음' : farOK ? '안개 너머' : '끊김' });
      }
    }
    this.endReport = res;
    this.openEnds = res.filter((r) => r.status !== '붙음').map((r) => r.end);
    return res;
  }

  endpointReport() {
    return this.endReport || this._checkEnds();
  }

  // 0.5초마다(점검): 열린 끝점이 안개 안 시야(700m 안, 화면 안)에 있는가 · 빈 땅이 보이는가(시야 21줄, 250m 안 60m 넘게 빈 땅) · 땅 밖(지도 끝)
  checkView(cam) {
    const v = this._cv || (this._cv = new THREE.Vector3());
    let openEnds = 0;
    for (const e of this.openEnds || []) {
      v.set(e[0], e[1], e[2]);
      if (v.distanceTo(cam.position) > 700) continue;
      v.project(cam);
      if (v.z < 1 && Math.abs(v.x) < 1 && Math.abs(v.y) < 1) openEnds++;
    }
    const o = this.occ;
    const dir = this._cd || (this._cd = new THREE.Vector3());
    cam.getWorldDirection(dir);
    const yaw0 = Math.atan2(dir.x, -dir.z);
    const hf = Math.atan(Math.tan((cam.fov * Math.PI) / 360) * cam.aspect);
    let empty = 0;
    let mapEnd = 0;
    for (let k = 0; k <= 20; k++) {
      const a = yaw0 - hf + (2 * hf * k) / 20;
      const sx = Math.sin(a), sz = -Math.cos(a);
      let run = 0;
      for (let d = 20; d <= 250; d += 5) {
        const x = cam.position.x + sx * d, z = cam.position.z + sz * d;
        const ix = Math.floor((x - o.x0) / o.cell), iz = Math.floor((z - o.z0) / o.cell);
        if (ix < 0 || iz < 0 || ix >= o.n || iz >= o.n) { mapEnd++; break; }
        const t = o.t[iz * o.n + ix];
        if (t === 0) {
          run += 5;
          if (run >= 60) { empty++; break; }
        } else if (t === 3 || t === 5) break; // 건물·다리에 시야가 막힘
        else run = 0;
      }
    }
    return { openEnds, empty, mapEnd };
  }

  // 6차: 통로 안 구조물이 없어 가림 처리 없음(예전 호출 호환)
  updateFades() {}

  _siCount() {
    return this.structs.count;
  }

  // 매 프레임: 차 불빛 이동, 서치라이트 회전, 하늘을 카메라에
  update(birdS, camera, time = 0, dt = 0) {
    this.shared.uTime.value = time;
    if (camera) this.sky.position.copy(camera.position);
    if (camera && this.nearB) { this.nearB.update(camera.position.x, camera.position.z); if (this.nearT) this.nearT.update(camera.position.x, camera.position.z); if (this.nearC) this.nearC.update(camera.position.x, camera.position.z); }
    if (!this.course) return;
    if (this.search && this.search.length) {
      let k = this.coneStatic || 0;
      for (const sl of this.search) {
        const a = sl.ph + time * 0.25 * sl.side;
        this._addCone(sl.x, 1.5, sl.z, 420, 16, [0.05, 0.055, 0.07], 1, k++, Math.PI + Math.sin(a) * 0.45, Math.cos(a * 0.8) * 0.4);
      }
      this.cones.instanceMatrix.needsUpdate = true;
    }
    let gi = this.glowStatic || 0;
    let hi = this.haloStatic || 0;
    // 11차 배2: 차는 셰이더가 시간으로 움직인다(차량 불빛 줄기). 옛 점 불빛 차는 없앰
    // 11차 배4: 항공등 0.5Hz 부드러운 점멸(밝기 0.8~1.0 배, 변화 0.2 이하). 판정 시간(calm)에는 멈춤
    if (this.avLights && this.avLights.length) {
      const f = this.calm ? 1 : 0.9 + 0.1 * Math.sin(time * Math.PI);
      for (const i of this.avLights) { _c.setRGB(0.55 * f, 0.02 * f, 0.05 * f); this.glow.setColorAt(i, _c); }
    }
    this.glow.count = gi;
    this.halos.geometry.instanceCount = hi;
    this.haloP.needsUpdate = true;
    this.haloC.needsUpdate = true;
    this.glow.instanceMatrix.needsUpdate = true;
    if (this.glow.instanceColor) this.glow.instanceColor.needsUpdate = true;
  }
}

// 강둑 단면: [물가에서 거리, 높이, 색]
const PROF = [
  [-5, -0.4, [0.05, 0.05, 0.06]],
  [0.5, 1.2, [0.07, 0.07, 0.08]],
  [2, 1.2, [0.02, 0.035, 0.025]],
  [16, 1.2, [0.022, 0.04, 0.028]],
  [16.5, 1.3, [0.03, 0.03, 0.035]],
  [29, 1.3, [0.03, 0.03, 0.035]],
  [30, 1.0, [0.025, 0.024, 0.03]],
  [60, 0.6, [0.022, 0.022, 0.028]],
  [150, 0.02, [0.02, 0.02, 0.025]],
];

// 위치·색만 있는 비색인 기하 여러 개를 하나로(새 라이브러리 없이)
function mergeGeoms(list) {
  const pos = [], col = [], nor = [];
  for (const g of list) {
    g.computeVertexNormals();
    pos.push(...g.attributes.position.array);
    col.push(...g.attributes.color.array);
    nor.push(...g.attributes.normal.array);
  }
  const m = new THREE.BufferGeometry();
  m.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  m.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  m.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return m;
}

function bankProfileY(d) {
  if (d <= PROF[0][0]) return -0.4;
  for (let i = 0; i < PROF.length - 1; i++) {
    const [a, ya] = PROF[i];
    const [b, yb] = PROF[i + 1];
    if (d <= b) return ya + ((yb - ya) * (d - a)) / (b - a);
  }
  return 0;
}

function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const L = dx * dx + dz * dz;
  let t = L > 0 ? ((px - ax) * dx + (pz - az) * dz) / L : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}

function polyLen(pts) {
  let L = 0;
  for (let i = 0; i < pts.length - 1; i++) L += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][2] - pts[i][2]);
  return L;
}

function polyAt(pts, d) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const L = Math.hypot(b[0] - a[0], b[2] - a[2]);
    if (d <= L || i === pts.length - 2) {
      const t = L > 0 ? Math.min(1, d / L) : 0;
      return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, z: a[2] + (b[2] - a[2]) * t, dx: (b[0] - a[0]) / (L || 1), dz: (b[2] - a[2]) / (L || 1) };
    }
    d -= L;
  }
  const p = pts[pts.length - 1];
  return { x: p[0], y: p[1], z: p[2], dx: 1, dz: 0 };
}
