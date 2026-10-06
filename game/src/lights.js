// 폭발 순간광: 최근 폭발 8개를 광원 목록으로 들고, 건물·물·연기·구름·새 재질이 함께 쓴다.
// 세기 = I0 × exp(-3 × 경과초), 반경 = 보이는 반지름 × 3. 화면 전체 번쩍임 대신 이것만 쓴다.
// 기본 재질(Lambert: 새·장애물·소품)은 같은 값을 받는 PointLight 8개로 비춘다.
import * as THREE from 'three';
import { LIGHTS } from './config.js';

const N = LIGHTS.count;
const HELD = LIGHTS.held || 0; // 6차: 꽃문 점광원 칸(동시 2개)

// 셰이더에서 쓰는 조각. flashAt(위치, 법선) = 그 점이 받는 순간광(색×세기)
export const FLASH_GLSL = /* glsl */ `
uniform vec4 uLPos[${N}]; // xyz 위치, w 반경
uniform vec4 uLCol[${N}]; // rgb 색×세기
vec3 flashAt(vec3 p, vec3 n, float wrap) {
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${N}; i++) {
    vec4 L = uLPos[i];
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    vec3 d = L.xyz - p;
    float dist = length(d);
    float a = clamp(1.0 - dist / L.w, 0.0, 1.0);
    a *= a;
    float lam = mix(max(dot(n, d / max(dist, 0.001)), 0.0), 1.0, wrap);
    s += c * a * lam;
  }
  return s;
}
// 법선 없이(연기·안개처럼 사방으로 받음)
vec3 flashVol(vec3 p) {
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${N}; i++) {
    vec4 L = uLPos[i];
    vec3 c = uLCol[i].rgb;
    if (c.r + c.g + c.b < 0.002) continue;
    float a = clamp(1.0 - length(L.xyz - p) / L.w, 0.0, 1.0);
    s += c * a * a;
  }
  return s;
}
`;

export class FlashLights {
  constructor(scene) {
    this.pos = Array.from({ length: N }, () => new THREE.Vector4(0, -1000, 0, 1));
    this.col = Array.from({ length: N }, () => new THREE.Vector4(0, 0, 0, 0));
    this.slots = Array.from({ length: N }, () => ({ t0: -100, I0: 0, r: 0, g: 0, b: 0, cur: 0 }));
    this.uniforms = { uLPos: { value: this.pos }, uLCol: { value: this.col } };
    this.points = [];
    if (scene) {
      for (let i = 0; i < N; i++) {
        const l = new THREE.PointLight(0xffffff, 0, 1, 0); // decay 0: 반경 안에서 부드럽게 줄어듦
        l.position.set(0, -1000, 0);
        scene.add(l);
        this.points.push(l);
      }
    }
    this._c = new THREE.Color();
  }

  clear() {
    for (let i = 0; i < N; i++) {
      this.slots[i].held = false;
      this.slots[i].I0 = 0;
      this.slots[i].cur = 0;
      this.col[i].set(0, 0, 0, 0);
      if (this.points[i]) this.points[i].intensity = 0;
    }
  }

  // 가장 약해진 칸에 새 광원을 넣는다
  add(pos, color, I0, radius, t) {
    let best = 0;
    let bestV = Infinity;
    for (let i = 0; i < N - HELD; i++) {
      const v = this.slots[i].cur;
      if (v < bestV) {
        bestV = v;
        best = i;
      }
    }
    const s = this.slots[best];
    s.t0 = t;
    s.I0 = I0;
    s.cur = I0;
    // 색은 밝기 1 로 맞추고(순수한 색), 세기는 따로
    const m = Math.max(color[0], color[1], color[2], 0.001);
    s.r = color[0] / m;
    s.g = color[1] / m;
    s.b = color[2] / m;
    this.pos[best].set(pos.x, pos.y, pos.z, radius);
    const pl = this.points[best];
    if (pl) {
      pl.position.set(pos.x, pos.y, pos.z);
      pl.distance = radius;
      pl.color.setRGB(s.r, s.g, s.b);
    }
  }

  // 6차 꽃문 점광원: 마지막 HELD 칸은 문마다 붙잡아 두고 세기를 직접 정한다(0.3초 넘게 밝아지고 0.5초에 꺼짐 — 밝기 급변 아님)
  hold(key, pos, color, I, radius) {
    for (let i = N - HELD; i < N; i++) {
      const s = this.slots[i];
      if (s.held) continue;
      s.held = true;
      s.key = key;
      s.manual = I;
      const m = Math.max(color[0], color[1], color[2], 0.001);
      s.r = color[0] / m;
      s.g = color[1] / m;
      s.b = color[2] / m;
      this.pos[i].set(pos.x, pos.y, pos.z, radius);
      const pl = this.points[i];
      if (pl) {
        pl.position.set(pos.x, pos.y, pos.z);
        pl.distance = radius;
        pl.color.setRGB(s.r, s.g, s.b);
      }
      return i;
    }
    return -1;
  }

  setHeld(i, I) {
    if (i >= 0 && this.slots[i].held) this.slots[i].manual = I;
  }

  release(i) {
    if (i < 0) return;
    const s = this.slots[i];
    s.held = false;
    s.manual = 0;
    s.I0 = 0;
  }

  releaseHeld() {
    for (let i = N - HELD; i < N; i++) this.release(i);
  }

  // 현재 세기 합(카메라 거리 반영 전)
  update(t) {
    for (let i = 0; i < N; i++) {
      const s = this.slots[i];
      const age = t - s.t0;
      const I = s.held ? s.manual : s.I0 > 0 && age >= 0 ? s.I0 * Math.exp(-LIGHTS.decay * age) : 0;
      s.cur = I < 0.004 ? 0 : I;
      const g = s.cur * LIGHTS.gain;
      this.col[i].set(s.r * g, s.g * g, s.b * g, 0);
      if (this.points[i]) this.points[i].intensity = g * 2.2;
    }
  }

  // 한 점(새 등)이 받는 순간광 합
  sampleAt(p, out) {
    out.setRGB(0, 0, 0);
    for (let i = 0; i < N; i++) {
      const c = this.col[i];
      if (c.x + c.y + c.z < 0.002) continue;
      const L = this.pos[i];
      const d = Math.hypot(L.x - p.x, L.y - p.y, L.z - p.z);
      let a = Math.max(0, 1 - d / L.w);
      a *= a;
      out.r += c.x * a;
      out.g += c.y * a;
      out.b += c.z * a;
    }
    return out;
  }
}
