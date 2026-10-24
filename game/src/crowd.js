// 둔치(강가 공원)의 군중 실루엣 수천 명(4차: 경로를 따라 굽은 둔치 위 세계 좌표에 놓는다). 환호 동작은 셰이더(GPU)에서 계산한다.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CROWD } from './config.js';

const MAX_BURSTS = 8;
const _dir = new THREE.Vector3();
const SHOULDER = 1.35;

function part(sx, sy, sz, x, y, z, arm, head) {
  const g = new THREE.BoxGeometry(sx, sy, sz);
  g.translate(x, y, z);
  const n = g.attributes.position.count;
  g.setAttribute('aArm', new THREE.BufferAttribute(new Float32Array(n).fill(arm), 1));
  g.setAttribute('aHead', new THREE.BufferAttribute(new Float32Array(n).fill(head), 1));
  g.deleteAttribute('uv');
  return g;
}

function personGeometry() {
  return mergeGeometries([
    part(0.5, 1.35, 0.28, 0, 0.675, 0, 0, 0), // 다리 + 몸(11차: 한 상자로 — 삼각형 25만 이하)
    part(0.3, 0.3, 0.3, 0, 1.55, 0, 0, 1), // 머리
    part(0.13, 0.66, 0.13, 0.33, 1.02, 0, 1, 0), // 오른팔
    part(0.13, 0.66, 0.13, -0.33, 1.02, 0, 1, 0), // 왼팔
  ]);
}

const VERT = /* glsl */ `
attribute vec4 aInst;   // x, z: 세계 위치, y: 바라보는 방향(라디안), w: 위상
attribute vec3 aMisc;   // x: 키 배율, y: 휴대폰 불빛 여부, z: 바닥 높이(16차 U7 옥상 테라스, 보통 0)
attribute float aArm;
attribute float aHead;
uniform float uTime;
uniform float uGroundY;
uniform float uHitTime;
uniform float uBigTime;
uniform float uMaxCheer;
uniform float uCheerR;
uniform vec4 uBursts[${MAX_BURSTS}];
varying float vPhone;
varying float vFogDepth;
varying float vShade;
void main() {
  vec3 base = vec3(aInst.x, uGroundY + aMisc.z, aInst.z);
  float cy = cos(aInst.y), sy = sin(aInst.y);

  float cheer = 0.0;
  for (int i = 0; i < ${MAX_BURSTS}; i++) {
    vec4 b = uBursts[i];
    float age = uTime - b.w;
    if (age > 0.0 && age < 2.4) {
      float d = distance(base.xz, b.xz);
      float env = smoothstep(0.0, 0.25, age) * (1.0 - age / 2.4);
      cheer = max(cheer, exp(-d / uCheerR) * env);
    }
  }
  float hitAge = uTime - uHitTime;
  float big = (hitAge > 0.0 && hitAge < uBigTime) ? 1.0 - hitAge / uBigTime : 0.0;
  big = max(big, uMaxCheer);
  float amount = clamp(max(cheer, big), 0.0, 1.0);

  float hop = abs(sin(uTime * (5.5 + aInst.w * 2.5) + aInst.w * 6.2831));
  float jump = hop * (0.3 * cheer + 0.85 * big);

  vec3 p = position * aMisc.x;
  float sh = ${SHOULDER.toFixed(2)} * aMisc.x;
  if (aArm > 0.5) {
    float up = clamp(amount * 1.6, 0.0, 1.0);
    p.y = mix(p.y, sh + (sh - p.y), up);
    p.x *= 1.0 + up * 0.35;
  }
  p.x += sin(uTime * 1.3 + aInst.w * 20.0) * 0.03 * p.y;
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  vec3 wp = base + p + vec3(0.0, jump, 0.0);

  vPhone = (aMisc.y > 0.5 && aArm > 0.5 && position.y < 1.0) ? amount : 0.0;
  vShade = 0.6 + 0.4 * aHead;
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogDensity;
varying float vPhone;
varying float vFogDepth;
varying float vShade;
void main() {
  vec3 col = uColor * vShade;
  col += vec3(1.6, 1.7, 2.0) * vPhone;
  float f = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
  col = mix(col, uFogColor, clamp(f, 0.0, 1.0) * (1.0 - vPhone * 0.6));
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export class Crowd {
  constructor(scene, shared) {
    this.scene = scene;
    this.geo = personGeometry();
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uGroundY: { value: 0.6 },
        uHitTime: { value: -100 },
        uBigTime: { value: CROWD.bigCheerTime },
        uMaxCheer: { value: 0 },
        uCheerR: { value: CROWD.cheerRadius },
        uBursts: { value: Array.from({ length: MAX_BURSTS }, () => new THREE.Vector4(0, 0, 0, -100)) },
        uColor: { value: new THREE.Color(CROWD.color) },
        uFogColor: shared.uFogColor,
        uFogDensity: shared.uFogDensity,
      },
    });
    this.mesh = null;
    this.burstCursor = 0;
    this.R = 280; // 카메라에서 이 거리 안 사람만 그린다(16차 U10: 스테이지 city.crowdR — S5 220, 나머지 280 그대로)
  }

  // spots: [x, z, 무작위, …] (world.crowdSpots). count: 사람 수(자리보다 많으면 자리 수)
  // 16차 U7: ys = 자리마다 바닥 높이(옥상 테라스 — S2). 없으면 모두 groundY(난수 부르는 순서는 그대로)
  build(spots, groundY, count = 1500, ys = null) {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }
    const total = Math.floor(spots.length / 3);
    const n = Math.max(1, Math.min(total, count));
    const geo = this.geo.clone();
    const inst = new Float32Array(n * 4);
    const misc = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const j = Math.floor((i / n) * total) * 3;
      inst[i * 4] = spots[j] + (Math.random() - 0.5) * 0.4;
      inst[i * 4 + 1] = Math.random() * Math.PI * 2;
      inst[i * 4 + 2] = spots[j + 1] + (Math.random() - 0.5) * 0.4;
      inst[i * 4 + 3] = spots[j + 2];
      misc[i * 3] = 0.85 + Math.random() * 0.3;
      misc[i * 3 + 1] = Math.random() < 0.12 ? 1 : 0;
      misc[i * 3 + 2] = ys ? ys[j / 3] || 0 : 0;
    }
    geo.setAttribute('aInst', new THREE.InstancedBufferAttribute(inst, 4));
    geo.setAttribute('aMisc', new THREE.InstancedBufferAttribute(misc, 3));
    this.mesh = new THREE.InstancedMesh(geo, this.material, n);
    this.mesh.frustumCulled = false;
    // 12차: 180초 코스(둑이 2배 넘게 길어짐) — 카메라 280m 안 사람만 앞으로 모아 그린다(삼각형 절약)
    this.master = [inst.slice(), misc.slice()];
    this.attrs = [geo.attributes.aInst, geo.attributes.aMisc];
    this.nAll = n;
    this._last = null;
    this.scene.add(this.mesh);
    const u = this.material.uniforms;
    u.uGroundY.value = groundY;
    u.uHitTime.value = -100;
    u.uMaxCheer.value = 0;
    for (const b of u.uBursts.value) b.set(0, 0, 0, -100);
  }

  // 불꽃이 터지면 가까운 군중이 작게 환호
  addBurst(pos, time) {
    const b = this.material.uniforms.uBursts.value[this.burstCursor];
    b.set(pos.x, pos.y, pos.z, time);
    this.burstCursor = (this.burstCursor + 1) % MAX_BURSTS;
  }

  // 새가 맞으면 군중 전체가 크게 점프
  birdHit(time) {
    this.material.uniforms.uHitTime.value = time;
  }

  setMaxCheer(v) {
    this.material.uniforms.uMaxCheer.value = v;
  }

  update(time, cam = null) {
    this.material.uniforms.uTime.value = time;
    if (cam && this.mesh && this.master) {
      const x = cam.position.x, z = cam.position.z;
      // 16차 3-4 모바일(view): 카메라 앞 부채꼴(±75°, 40m 안은 모두)만 — 방향이 15° 넘게 돌아도 다시 모은다
      const V = this.view;
      let fx = 0, fz = -1;
      if (V) { cam.getWorldDirection(_dir); const L = Math.hypot(_dir.x, _dir.z) || 1; fx = _dir.x / L; fz = _dir.z / L; }
      const turned = V && this._last && fx * this._last[2] + fz * this._last[3] < V.turnCos;
      if (!turned && this._last && Math.hypot(x - this._last[0], z - this._last[1]) < 30) return;
      this._last = [x, z, fx, fz];
      const [mi, mm] = this.master;
      const [ai, am] = this.attrs;
      let k = 0;
      for (let i = 0; i < this.nAll; i++) {
        const dx = mi[i * 4] - x, dz = mi[i * 4 + 2] - z;
        const d2 = dx * dx + dz * dz;
        if (d2 > this.R * this.R) continue;
        if (V && d2 > 1600 && dx * fx + dz * fz < V.cos * Math.sqrt(d2)) continue;
        for (let q = 0; q < 4; q++) ai.array[k * 4 + q] = mi[i * 4 + q];
        am.array[k * 3] = mm[i * 3]; am.array[k * 3 + 1] = mm[i * 3 + 1]; am.array[k * 3 + 2] = mm[i * 3 + 2];
        k++;
      }
      this.mesh.count = k;
      ai.needsUpdate = true;
      am.needsUpdate = true;
      this.shown = k;
    }
  }

  setVisible(v) {
    if (this.mesh) this.mesh.visible = v;
  }
}
