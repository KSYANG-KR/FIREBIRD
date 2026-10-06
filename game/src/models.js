// 모델: 새 3종(회전체 몸통·깃털을 겹겹이 붙인 2단 관절 날개·부채꼴 꼬리깃)과 엔딩의 통닭. 이미지 파일 없이 코드로 만든 도형만 쓴다.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { birdWeights } from './birdglb.js';

// 12차: 생성 3D 새(GLB). 있으면 createBirdModel 이 이것으로 만든다(없거나 못 읽으면 코드 새)
let GLB = {};
export function setBirdGLB(map) {
  GLB = map || {};
}
export function hasBirdGLB(id) {
  return !!GLB[id];
}

function mat(color, extra = {}) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true, ...extra });
}

function mesh(geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
}

// 종마다 색. back: 등, belly: 배, cov: 날개덮깃, sec: 둘째날개깃, pri: 첫째날개깃(가장자리·깃대), tail: 꼬리깃.
// stripe: 깃 가운데(깃대) 색 — 참새의 갈색 줄무늬, priInner: 첫째깃 안쪽 깃판(까치의 흰 무늬), gloss: 윤기(까치 푸른 광택)
const LOOKS = {
  sparrow: {
    back: 0x8a5a33, belly: 0xd9c8a8, head: 0x6e4a2c, cap: 0x5c3a22, cheek: 0xe6dcc8, beak: 0x3a3026,
    cov: 0x9a6a3e, covStripe: 0x3b2516, sec: 0x6b4426, secStripe: 0x2e1c10, secEdge: 0xc49a6a,
    pri: 0x4a321e, priStripe: 0x241710, priInner: 0x5a3e26, tail: 0x5a3c22, tailStripe: 0x2a1a0e,
    tailLen: 0.36, tailW: 0.075, nTail: 8, gloss: 0, wingBar: 0xf0e6d0, neck: null, span: 1.2,
  },
  magpie: {
    back: 0x0d0e14, belly: 0xe2e2e2, head: 0x08080c, cap: 0x08080c, cheek: 0x08080c, beak: 0x0a0a0a,
    cov: 0xf2f2f2, covStripe: 0xdedede, sec: 0x14306a, secStripe: 0x0c1838, secEdge: 0x1d4a8a,
    pri: 0x0e1018, priStripe: 0x05060a, priInner: 0xf0f0f0, tail: 0x0f2a48, tailStripe: 0x081626,
    tailLen: 1.05, tailW: 0.07, nTail: 10, gloss: 1, wingBar: null, neck: null, span: 1.25,
  },
  pigeon: {
    back: 0x8a909c, belly: 0x9aa0ad, head: 0x5d6474, cap: 0x5d6474, cheek: 0x5d6474, beak: 0x2e2a2a,
    cov: 0x9aa1ae, covStripe: 0x8a909c, sec: 0x8a909e, secStripe: 0x7a808e, secEdge: 0x3a3f4a,
    pri: 0x3c414c, priStripe: 0x2a2e36, priInner: 0x565c68, tail: 0x6a707e, tailStripe: 0x2c3038,
    tailLen: 0.38, tailW: 0.08, nTail: 10, gloss: 0.3, wingBar: 0x2a2e38, neck: 0x3e9a78, span: 1.25,
  },
};

const _ca = new THREE.Color();
const _cb = new THREE.Color();

// 깃털 한 장(평면, 법선 +Y). 뿌리(0,0,0) → 끝(0,0,len) 방향(+Z), 가로 3줄(가장자리-깃대-가장자리)로 깃대에 줄무늬 색.
// 끝은 둥글게 좁아지고, inner 쪽(왼쪽 가장자리, -X) 깃판은 따로 색(까치 흰 무늬)
function featherGeo(len, w, colEdge, colShaft, colInner = colEdge, colTip = null, seg = 6) {
  const pos = [];
  const col = [];
  const idx = [];
  const ce = new THREE.Color(colEdge), cs = new THREE.Color(colShaft), ci = new THREE.Color(colInner);
  const ct = colTip !== null ? new THREE.Color(colTip) : null;
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const z = t * len;
    // 폭: 뿌리 0.6 → 가운데 1 → 끝 둥글게 0
    const wf = (0.6 + 0.4 * Math.sin(Math.min(1, t * 1.6) * Math.PI * 0.5)) * Math.sqrt(Math.max(0, 1 - Math.pow(Math.max(0, (t - 0.7) / 0.3), 2)));
    const hw = (w / 2) * wf;
    const sag = Math.sin(t * Math.PI) * w * 0.12; // 살짝 아래로 휜 깃
    for (const [x, c] of [[-hw, ci], [0, cs], [hw, ce]]) {
      pos.push(x, -sag, z);
      _ca.copy(c);
      if (ct) _ca.lerp(ct, Math.max(0, (t - 0.6) / 0.4));
      col.push(_ca.r, _ca.g, _ca.b);
    }
    if (i < seg) {
      const a = i * 3;
      idx.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// 깃털을 놓는다: 뿌리 위치(x, y, z), 방향 각(yaw, +Z 기준 시계 반대로 +X 쪽), 아래로 처짐(pitch)
function placeFeather(g, x, y, z, yaw, pitch = 0, roll = 0) {
  g.rotateX(pitch);
  g.rotateZ(roll);
  g.rotateY(yaw);
  g.translate(x, y, z);
  return g;
}

// 여러 깃털을 하나로 합친다(그리기 호출 줄이기)
function merge(list) {
  return mergeGeometries(list.map((g) => (g.index ? g.toNonIndexed() : g)));
}

// 위(등)는 몸 색, 아래(배)는 배 색 — 법선 방향으로 꼭짓점 색을 칠한다. stripe 가 있으면 등에 세로 줄무늬
// rearZ: 이 z 보다 뒤(꼬리 쪽) 몸은 등 색 — 뒤에서 보는 카메라에 흰 배가 덩어리로 보이지 않게
function paintByNormal(geo, top, bottom, split = -0.15, stripe = null, rearZ = null) {
  const n = geo.attributes.normal;
  const p = geo.attributes.position;
  const col = new Float32Array(n.count * 3);
  const a = new THREE.Color(top), b = new THREE.Color(bottom), c = new THREE.Color(), s = stripe !== null ? new THREE.Color(stripe) : null;
  for (let i = 0; i < n.count; i++) {
    let t = THREE.MathUtils.smoothstep(n.getY(i), split - 0.25, split + 0.25);
    if (rearZ !== null) t = Math.max(t, THREE.MathUtils.smoothstep(p.getZ(i), rearZ - 0.1, rearZ + 0.1));
    c.copy(b).lerp(a, t);
    if (s && t > 0.6 && Math.sin(Math.atan2(p.getX(i), p.getY(i)) * 9) > 0.55) c.lerp(s, 0.6);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

// 순간광 테두리광(rim): 폭발 빛을 받으면 새 윤곽이 그 색으로 빛난다. uRim 은 모델마다 하나를 공유.
// 깃털은 MeshStandardMaterial(반사 환경맵을 받으면 윤기가 난다). gloss: 까치 푸른 광택
function birdMaterial(rim, { color = 0xffffff, vertexColors = true, rough = 0.75, gloss = 0, side = THREE.DoubleSide } = {}) {
  const m = new THREE.MeshStandardMaterial({ color, vertexColors, roughness: rough, metalness: 0, side, envMapIntensity: 0.6 });
  m.userData.gloss = gloss;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uRim = rim;
    sh.uniforms.uGloss = { value: gloss };
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uRim;\nuniform float uGloss;')
      .replace('#include <opaque_fragment>', `
        float rimF = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
        outgoingLight += uRim * pow(rimF, 2.5) + uRim * 0.12;
        // 윤곽에 아주 옅은 달빛 테두리(어두운 배경에서도 새 모양이 읽히게) + 까치 푸른 광택
        outgoingLight += vec3(0.05, 0.06, 0.09) * pow(rimF, 3.0) + vec3(0.02, 0.06, 0.16) * uGloss * pow(rimF, 1.5);
        #include <opaque_fragment>`);
  };
  return m;
}

// 새 모델. 몸길이 약 1(단위)로 만들고 호출하는 쪽에서 크기를 맞춘다. 앞쪽이 -Z.
// 몸통은 회전체, 날개는 어깨·팔꿈치 두 관절에 깃털을 겹겹이(덮깃 → 둘째날개깃, 첫째날개깃은 손가락처럼 갈라짐), 꼬리깃은 부채꼴.
export function createBirdModel(id, opts = {}) {
  if (GLB[id] && !opts.code) return createGLBBird(id, GLB[id]);
  const L = LOOKS[id] || LOOKS.sparrow;
  const rim = { value: new THREE.Color(0, 0, 0) };
  const root = new THREE.Group();
  const body = new THREE.Group(); // 몸 기울기용
  root.add(body);
  const featherMat = birdMaterial(rim, { rough: L.gloss ? 0.42 : 0.8, gloss: L.gloss });
  const bodyMat = birdMaterial(rim, { rough: 0.85, gloss: L.gloss * 0.6, side: THREE.FrontSide });

  // 몸통: 꼬리 쪽(-0.46) → 가슴 → 목(0.35)
  const prof = [[0, -0.46], [0.06, -0.43], [0.13, -0.32], [0.18, -0.15], [0.195, 0.0], [0.185, 0.12], [0.15, 0.23], [0.1, 0.31], [0, 0.35]];
  const bodyGeo = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 20);
  bodyGeo.rotateX(-Math.PI / 2); // +Y(앞) → -Z
  bodyGeo.scale(0.86, 0.78, 1); // 뒤에서 볼 때 공처럼 보이지 않게 가늘게
  bodyGeo.computeVertexNormals();
  paintByNormal(bodyGeo, L.back, L.belly, -0.1, id === 'sparrow' ? L.covStripe : null, 0.02);
  body.add(new THREE.Mesh(bodyGeo, bodyMat));

  const head = new THREE.Group();
  head.position.set(0, 0.16, -0.36); // 뒤에서 볼 때 등 너머로 머리가 살짝 보이게
  body.add(head);
  const headGeo = paintByNormal(new THREE.SphereGeometry(0.14, 18, 12), L.cap, L.cheek, 0.1);
  headGeo.scale(0.95, 0.92, 1.08);
  head.add(new THREE.Mesh(headGeo, bodyMat));
  const beakGeo = new THREE.ConeGeometry(0.04, 0.15, 10);
  beakGeo.rotateX(-Math.PI / 2);
  const beakCol = new Float32Array(beakGeo.attributes.position.count * 3);
  _cb.set(L.beak);
  for (let i = 0; i < beakCol.length; i += 3) { beakCol[i] = _cb.r; beakCol[i + 1] = _cb.g; beakCol[i + 2] = _cb.b; }
  beakGeo.setAttribute('color', new THREE.BufferAttribute(beakCol, 3));
  head.add(mesh(beakGeo, bodyMat, 0, -0.02, -0.19));
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const eyeGeo = new THREE.SphereGeometry(0.024, 8, 6);
  head.add(mesh(eyeGeo, eyeMat, 0.1, 0.035, -0.08));
  head.add(mesh(eyeGeo, eyeMat, -0.1, 0.035, -0.08));
  if (L.neck) {
    // 비둘기 목 광택(초록·보라)
    const neckGeo = paintByNormal(new THREE.SphereGeometry(0.15, 16, 10), L.neck, 0x7a4a8a, 0.2);
    const neck = mesh(neckGeo, birdMaterial(rim, { rough: 0.35, gloss: 0.8, side: THREE.FrontSide }), 0, -0.08, 0.1);
    neck.scale.set(1.08, 0.82, 0.9);
    head.add(neck);
  }

  // 꼬리깃: 부채꼴로 겹친 깃털. 까치는 가운데가 가장 긴 층진 긴 꼬리
  const tailList = [];
  const nT = L.nTail;
  for (let i = 0; i < nT; i++) {
    const u = nT === 1 ? 0 : i / (nT - 1) - 0.5; // -0.5 ~ 0.5
    const spread = id === 'magpie' ? 0.22 : 0.55;
    const len = id === 'magpie' ? L.tailLen * (1 - Math.abs(u) * 0.9) : L.tailLen * (1 - Math.abs(u) * 0.15);
    const g = featherGeo(len, L.tailW, L.tail, L.tailStripe, L.tail, id === 'pigeon' ? 0x1e2128 : null, 6);
    placeFeather(g, u * 0.07, 0.01 + Math.abs(u) * -0.008 + (0.5 - Math.abs(u)) * 0.004, 0, u * spread, -0.06);
    tailList.push(g);
  }
  const tail = new THREE.Mesh(merge(tailList), featherMat);
  tail.position.set(0, 0.04, 0.3);
  tail.rotation.x = 0.5; // 몸을 숙인 만큼 꼬리는 내려 뒤로 곧게(뒤에서 볼 때 꼬리가 위로 솟아 보이지 않게)
  body.add(tail);

  // 날개 하나(side 1 오른쪽, -1 왼쪽). 어깨(pivot) → 팔 쪽(덮깃·둘째날개깃) + 팔꿈치(elbow) → 손 쪽(첫째날개깃)
  const span = L.span;
  function wing(side) {
    const pivot = new THREE.Group();
    pivot.position.set(0.14 * side, 0.08, -0.06);
    pivot.rotation.order = 'ZYX'; // 비틀기(X)를 먼저, 날갯짓(Z)은 나중 — 날개 길이 축을 중심으로 비튼다
    const inner = [];
    // 둘째날개깃: 뒤로 뻗는 긴 깃 7장(뒷가장자리가 톱니처럼)
    for (let i = 0; i < 7; i++) {
      const x = (0.02 + i * 0.05) * span;
      const g = featherGeo(0.25 - i * 0.006, 0.075, L.sec, L.secStripe, L.sec, L.secEdge, 5);
      inner.push(placeFeather(g, x, -0.004 - i * 0.0006, -0.02, 0.06 + i * 0.03, -0.05));
    }
    // 큰덮깃(둘째날개깃 뿌리를 덮는 짧은 깃) — 참새·비둘기는 날개 띠 무늬
    for (let i = 0; i < 8; i++) {
      const x = (0.0 + i * 0.045) * span;
      const tip = L.wingBar !== null ? L.wingBar : null;
      const g = featherGeo(0.13, 0.06, L.cov, L.covStripe, L.cov, tip, 4);
      inner.push(placeFeather(g, x, 0.008, -0.07, 0.1 + i * 0.02, -0.04));
    }
    // 작은덮깃(앞가장자리 띠)
    for (let i = 0; i < 9; i++) {
      const x = (0.0 + i * 0.04) * span;
      const g = featherGeo(0.08, 0.06, L.cov, L.cov, L.cov, null, 3);
      inner.push(placeFeather(g, x, 0.014, -0.095, 0.15, -0.02));
    }
    const innerGeo = merge(inner);
    if (side < 0) mirrorX(innerGeo);
    pivot.add(new THREE.Mesh(innerGeo, featherMat));

    const elbow = new THREE.Group();
    elbow.position.x = 0.38 * span * side;
    pivot.add(elbow);
    const outer = [];
    // 첫째날개깃 8장: 뒤쪽(안)에서 바깥쪽으로 부채꼴, 바깥 깃일수록 길고 끝이 갈라진다(손가락 깃)
    for (let i = 0; i < 8; i++) {
      const u = i / 7;
      const len = (0.26 + 0.2 * Math.sin(u * Math.PI * 0.62)) * span;
      const w = 0.07 - u * 0.012;
      const g = featherGeo(len, w, L.pri, L.priStripe, L.priInner, null, 6);
      const yaw = 0.35 + u * 1.05; // +Z(뒤)에서 +X(바깥)으로
      outer.push(placeFeather(g, u * 0.07 * span, -0.003 - u * 0.0015, -0.03 + u * 0.01, yaw, -0.04));
    }
    // 첫째덮깃
    for (let i = 0; i < 6; i++) {
      const u = i / 5;
      const g = featherGeo(0.12, 0.06, id === 'magpie' ? L.pri : L.cov, L.covStripe, id === 'magpie' ? L.pri : L.cov, null, 3);
      outer.push(placeFeather(g, -0.02 + u * 0.08 * span, 0.008, -0.07, 0.4 + u * 0.9, -0.03));
    }
    const outerGeo = merge(outer);
    if (side < 0) mirrorX(outerGeo);
    elbow.add(new THREE.Mesh(outerGeo, featherMat));
    body.add(pivot);
    return { pivot, elbow };
  }
  const wr = wing(1);
  const wl = wing(-1);

  return { root, body, head, wingL: wl.pivot, wingR: wr.pivot, elbowL: wl.elbow, elbowR: wr.elbow, rim: rim.value, mats: [featherMat, bodyMat] };
}

// 12차 C-2: GLB 새 → 뼈 7개(몸 · 어깨 R/L · 팔꿈치 R/L · 꼬리) SkinnedMesh. 가중치는 좌우 거리 |x|(birdglb.birdWeights).
// 재질: MeshStandardMaterial + 생성 텍스처, 순간광 테두리·달빛 테두리·까치 광택(birdMaterial)·그을림(색), 자체발광 0.06(밤 배경 대비)
function createGLBBird(id, data) {
  const rim = { value: new THREE.Color(0, 0, 0) };
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const geo = data.geometry.clone();
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const span = bb.max.x - bb.min.x;
  const P = geo.attributes.position.array;
  const ud = data.userData || {};
  const info = { span, zTail: ud.zTail ?? 0.46, zBeak: ud.zBeak ?? -0.46 };
  const w = birdWeights(P, info);
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(w.si, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(w.sw, 4));
  // 어깨 앞뒤 자리: |x| ≈ 어깨선 정점들의 z 가운데
  let zs = 0, ns = 0;
  for (let i = 0; i < P.length / 3; i++) if (Math.abs(Math.abs(P[i * 3]) - w.xs) < 0.03) { zs += P[i * 3 + 2]; ns++; }
  zs = ns ? zs / ns : 0;
  const bone = (x, y, z) => { const b = new THREE.Bone(); b.position.set(x, y, z); b.rotation.order = 'ZYX'; return b; };
  const B0 = bone(0, 0, 0);
  const sR = bone(w.xs, 0, zs), eR = bone(w.xe - w.xs, 0, 0), sL = bone(-w.xs, 0, zs), eL = bone(-(w.xe - w.xs), 0, 0), tl = bone(0, 0, w.zt);
  B0.add(sR, sL, tl);
  sR.add(eR);
  sL.add(eL);
  const bones = [B0, sR, eR, sL, eL, tl, bone(0, 0, 0)];
  B0.add(bones[6]);
  const gloss = id === 'magpie' ? 1 : id === 'pigeon' ? 0.3 : 0;
  const mat = birdMaterial(rim, { vertexColors: false, rough: gloss ? 0.5 : 0.8, gloss, side: THREE.DoubleSide });
  mat.map = data.map;
  mat.emissive = new THREE.Color(GLB_EMIS, GLB_EMIS, GLB_EMIS); // 명세 0.06 은 밤 조명(푸른 하늘빛)에서 깃털 색이 안 보여 0.3(텍스처 색으로 빛남)
  mat.emissiveMap = data.map;
  mat.envMapIntensity = 0.25; // 도시 반사가 깃털 색을 하얗게 덮지 않게
  const mesh = new THREE.SkinnedMesh(geo, mat);
  mesh.add(B0);
  mesh.bind(new THREE.Skeleton(bones));
  mesh.frustumCulled = false;
  body.add(mesh);
  const head = new THREE.Group(); // (시작 장면이 고개를 움직이는 자리 — GLB 는 머리 뼈 없음)
  body.add(head);
  return { root, body, head, wingL: sL, wingR: sR, elbowL: eL, elbowR: eR, tail: tl, rim: rim.value, mats: [mat], glb: true, mesh, span };
}

// 왼쪽 날개: X 를 뒤집고 면 방향을 바로잡는다
function mirrorX(g) {
  g.scale(-1, 1, 1);
  const idx = g.index;
  if (idx) {
    for (let i = 0; i < idx.count; i += 3) {
      const a = idx.getX(i + 1);
      idx.setX(i + 1, idx.getX(i + 2));
      idx.setX(i + 2, a);
    }
  } else {
    const p = g.attributes.position;
    const c = g.attributes.color;
    const n = g.attributes.normal;
    for (let i = 0; i < p.count; i += 3) {
      for (const at of [p, c, n]) {
        if (!at) continue;
        for (let k = 0; k < at.itemSize; k++) {
          const v1 = at.array[(i + 1) * at.itemSize + k];
          at.array[(i + 1) * at.itemSize + k] = at.array[(i + 2) * at.itemSize + k];
          at.array[(i + 2) * at.itemSize + k] = v1;
        }
      }
    }
  }
  g.computeVertexNormals();
  return g;
}

// 날갯짓·자세. phase 는 라디안, folded 는 0~1(1 = 접고 앉음). 팔꿈치는 어깨보다 조금 늦게 따라온다(2단 관절).
// 날개는 살짝 V 자(위로 12°)로 들고, 몸은 머리를 조금 숙여(뒤에서 보는 카메라에 등과 날개 윗면이 보이게) 난다.
const DIHEDRAL = 0.2;
const BODY_TILT = 0.18;
// 날개 비틀기: 앞가장자리를 들어(받음각) 뒤에서 보는 카메라에 날개 윗면 깃털 무늬가 보이게
const TWIST = 0.55;
export function poseBird(model, phase, folded = 0, pitch = 0, roll = 0) {
  if (model.glb) return poseGLB(model, phase, folded, pitch, roll);
  const open = 1 - folded;
  const flap = Math.sin(phase) * 0.8 * open + DIHEDRAL * open;
  const lag = Math.sin(phase - 0.8) * 0.5 * open;
  model.wingR.rotation.z = flap - folded * 0.3;
  model.wingL.rotation.z = -flap + folded * 0.3;
  model.wingR.rotation.y = folded * 1.3;
  model.wingL.rotation.y = -folded * 1.3;
  model.wingR.rotation.x = TWIST * open;
  model.wingL.rotation.x = TWIST * open;
  if (model.elbowR) {
    model.elbowR.rotation.z = lag * 0.9 - folded * 0.2;
    model.elbowL.rotation.z = -lag * 0.9 + folded * 0.2;
    model.elbowR.rotation.y = folded * 2.2 - Math.max(0, -Math.sin(phase)) * 0.25 * open; // 올리는 동안 손을 조금 접는다
    model.elbowL.rotation.y = -folded * 2.2 + Math.max(0, -Math.sin(phase)) * 0.25 * open;
  }
  model.body.rotation.x = pitch - BODY_TILT * open;
  model.body.rotation.z = roll;
}

// 12차 GLB 새 자세: 날갯짓(어깨 ±0.7rad + 위로 0.12) · 늦게 따라오는 팔꿈치 · 작은 비틀기(0.1) · 접기(어깨 뒤로 젖힘 + 팔꿈치 접기) · 꼬리 살짝
const G_DIH = 0.12, G_TWIST = 0.1, G_FOLD = [1.5, 2.2, 0.45];
const GLB_EMIS = 0.22; // GLB 새 자체발광(텍스처 색)
function poseGLB(model, phase, folded, pitch, roll) {
  const open = 1 - folded;
  const flap = Math.sin(phase) * 0.7 * open + G_DIH * open;
  const lag = Math.sin(phase - 0.8) * 0.45 * open;
  model.wingR.rotation.set(G_TWIST * open, -folded * G_FOLD[0], flap - folded * 0.15);
  const ws = 1 - G_FOLD[2] * folded; // 접을 때 날개를 조금 오므림(접힌 날개가 몸에 붙어 보이게)
  model.wingR.scale.set(ws, 1, ws);
  model.wingL.scale.set(ws, 1, ws);
  model.wingL.rotation.set(G_TWIST * open, folded * G_FOLD[0], -flap + folded * 0.15);
  model.elbowR.rotation.set(0, -folded * G_FOLD[1] + Math.max(0, -Math.sin(phase)) * 0.25 * open, lag * 0.9);
  model.elbowL.rotation.set(0, folded * G_FOLD[1] - Math.max(0, -Math.sin(phase)) * 0.25 * open, -lag * 0.9);
  if (model.tail) model.tail.rotation.x = 0.06 * Math.sin(phase + 1.2) * open;
  model.body.rotation.x = pitch - 0.1 * open;
  model.body.rotation.z = roll;
}

// 엔딩용 로우폴리 통닭(접시 포함). 김은 호출하는 쪽에서 입자로.
export function createRoastChicken() {
  const g = new THREE.Group();
  const plate = mesh(new THREE.CylinderGeometry(1.75, 1.5, 0.14, 18), mat(0xf5f1e8));
  g.add(plate);
  const rim = mesh(new THREE.TorusGeometry(1.68, 0.07, 4, 18), mat(0xd9cfbd), 0, 0.08, 0);
  rim.rotation.x = Math.PI / 2;
  g.add(rim);

  const skin = mat(0xc9782c);
  const skinDark = mat(0xa55a1c);
  const body = mesh(new THREE.IcosahedronGeometry(0.8, 1), skin, 0, 0.62, 0);
  body.scale.set(1.2, 0.72, 0.95);
  g.add(body);
  const breast = mesh(new THREE.IcosahedronGeometry(0.42, 0), skinDark, 0, 0.9, -0.25);
  breast.scale.set(1.5, 0.7, 1.1);
  g.add(breast);

  const bone = mat(0xf7efe0);
  for (const s of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(0.55 * s, 0.75, -0.45);
    leg.rotation.set(-0.9, 0, -0.35 * s);
    const thigh = mesh(new THREE.CylinderGeometry(0.16, 0.3, 0.75, 6), skin, 0, 0.3, 0);
    leg.add(thigh);
    leg.add(mesh(new THREE.IcosahedronGeometry(0.11, 0), bone, 0, 0.72, 0));
    leg.add(mesh(new THREE.IcosahedronGeometry(0.09, 0), bone, 0.08, 0.78, 0));
    g.add(leg);
    const wingStub = mesh(new THREE.IcosahedronGeometry(0.3, 0), skinDark, 0.95 * s, 0.55, 0.2);
    wingStub.scale.set(0.6, 0.5, 1.1);
    g.add(wingStub);
  }
  // 곁들이: 상추·레몬
  const lettuce = mat(0x4f9a3a);
  for (let i = 0; i < 5; i++) {
    const a = Math.PI * 0.6 + i * 0.35;
    const leaf = mesh(new THREE.IcosahedronGeometry(0.28, 0), lettuce, Math.cos(a) * 1.25, 0.14, Math.sin(a) * 1.25);
    leaf.scale.set(1, 0.35, 1);
    g.add(leaf);
  }
  const lemon = mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 6, 1, false, 0, Math.PI), mat(0xf2d03b), -1.15, 0.2, -0.5);
  lemon.rotation.z = Math.PI / 2;
  g.add(lemon);
  return g;
}
