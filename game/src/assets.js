// 외부 에셋 불러오기(출처는 public/assets/CREDITS.txt).
// - 경로는 import.meta.env.BASE_URL 기준이라 GitHub Pages 하위 주소(./)에서도 깨지지 않는다.
// - 하나라도 못 읽으면 그 자리만 코드 그래픽으로 대신한다(게임은 그대로 돈다).
// - 4차: 상하이 원경 사진·HDR 은 뺐다. 반사 환경맵은 장면에서 만든다(world.makeEnv). 간판 폰트(BvfSign)를 더했다.
//   폰트는 실행 중 외부에서 받지 않고 assets 폴더의 파일만 쓴다.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const BASE = (import.meta.env && import.meta.env.BASE_URL) || './';
const url = (f) => `${BASE}assets/${f}`;

// 건물 외벽(ambientCG, CC0). tile: 텍스처 한 장이 덮는 크기(m), cells: 한 장 안의 창 칸 수(가로, 세로)
export const FACADES = [
  { id: 'Facade011', tile: 110, cells: [24, 39], dark: 1.0 }, // 어두운 유리 업무 빌딩
  { id: 'Facade013', tile: 100, cells: [32, 32], dark: 0.16 }, // 벽돌·창 촘촘한 건물
  { id: 'Facade017', tile: 42, cells: [12, 12], dark: 0.14 }, // 콘크리트 격자(상가)
];

export const FONT = { family: 'BvfSign', file: 'BvfSign.woff2' };

// 11차 배1: 바닥 질감(ambientCG, CC0 1.0) — 아스팔트 Asphalt031(색·거칠기), 보도블록 PavingStones128(색). 월드 좌표 4m 반복, 멀면 평균색
//   https://ambientcg.com/view?id=Asphalt031 · https://ambientcg.com/view?id=PavingStones128 (라이선스 https://ambientcg.com/license)
export const GROUND = { asph: 'Asphalt031_Color.jpg', asphR: 'Asphalt031_Roughness.jpg', pave: 'PavingStones128_Color.jpg' };

export const assets = {
  facades: [],
  ground: {},
  smoke: [],
  font: false, // 간판 폰트를 쓸 수 있는가
  rooms: null, // 12차 배8: 창 안 실내 그림 아틀라스(생성 6장)
  sky: [], // 12차 배8: 원경 스카이라인 2장(하늘 뺀 PNG)
  birds: {}, // 12차: 생성 3D 새(GLB, Higgsfield gpt_image_2_5 + Meshy 7 → 정렬·대칭·다리 걷기·상반각 펴기 처리본) — 못 읽으면 코드 새
  failed: [],
  done: false,
};

let started = null;
// renderer: 이방성 필터 상한 확인용. onProgress(0~1, 실패 목록)
export function loadAssets(renderer, onProgress) {
  if (started) return started;
  const tl = new THREE.TextureLoader();
  const jobs = [];
  let n = 0;
  let total = 0;
  const tick = () => {
    n++;
    if (onProgress) onProgress(n / total, assets.failed);
  };
  const tex = (file, srgb = true, opts = {}) => {
    total++;
    return new Promise((res) => {
      tl.load(
        url(file),
        (t) => {
          t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          t.anisotropy = opts.aniso || 1;
          if (opts.wrap) t.wrapS = t.wrapT = THREE.RepeatWrapping;
          tick();
          res(t);
        },
        undefined,
        () => {
          assets.failed.push(file);
          tick();
          res(null);
        },
      );
    });
  };
  const maxAniso = renderer ? renderer.capabilities.getMaxAnisotropy() : 1;
  FACADES.forEach((f, i) => {
    jobs.push(Promise.all([
      tex(`${f.id}_Color.jpg`, true, { wrap: true, aniso: Math.min(8, maxAniso) }),
      tex(`${f.id}_Emission.jpg`, true, { wrap: true, aniso: Math.min(8, maxAniso) }),
    ]).then(([c, e]) => { assets.facades[i] = c && e ? { color: c, emis: e, ...f } : null; }));
  });
  jobs.push(tex(GROUND.asph, true, { wrap: true, aniso: Math.min(8, maxAniso) }).then((t) => { assets.ground.asph = t; }));
  jobs.push(tex(GROUND.asphR, false, { wrap: true, aniso: Math.min(8, maxAniso) }).then((t) => { assets.ground.asphR = t; }));
  jobs.push(tex(GROUND.pave, true, { wrap: true, aniso: Math.min(8, maxAniso) }).then((t) => { assets.ground.pave = t; }));
  jobs.push(tex('smoke_01.jpg', false).then((t) => { assets.smoke[0] = t; }));
  jobs.push(tex('smoke_07.jpg', false).then((t) => { assets.smoke[1] = t; }));
  jobs.push(tex('rooms/rooms_atlas.jpg', true).then((t) => { assets.rooms = t; }));
  jobs.push(tex('sky/skyline_a.png', true).then((t) => { assets.sky[0] = t; }));
  jobs.push(tex('sky/skyline_b.png', true).then((t) => { assets.sky[1] = t; }));
  // 12차: 새 GLB(birds/참새·까치·비둘기). 메시 하나 + 텍스처(1024² JPEG)
  const gl = new GLTFLoader();
  for (const id of ['sparrow', 'magpie', 'pigeon']) {
    total++;
    jobs.push(gl.loadAsync(url(`birds/${id}.glb`)).then((g) => {
      let mesh = null;
      g.scene.traverse((o) => { if (o.isMesh && !mesh) mesh = o; });
      if (mesh) assets.birds[id] = { geometry: mesh.geometry, map: mesh.material.map, userData: mesh.userData || {} };
      tick();
    }).catch(() => { assets.failed.push(`birds/${id}.glb`); tick(); }));
  }
  // 간판 폰트: 준비됐는지 document.fonts 로 확인. 실패하면 글자 없이 네온 테두리만 그린다.
  if (typeof document !== 'undefined' && typeof FontFace !== 'undefined') {
    total++;
    jobs.push((async () => {
      try {
        const ff = new FontFace(FONT.family, `url(${url(FONT.file)}) format('woff2')`);
        await ff.load();
        document.fonts.add(ff);
        await document.fonts.load(`64px ${FONT.family}`, '치킨');
        assets.font = document.fonts.check(`64px ${FONT.family}`, '치킨');
      } catch {
        assets.font = false;
      }
      if (!assets.font) assets.failed.push(FONT.file);
      tick();
    })());
  }
  started = Promise.all(jobs).then(() => {
    assets.done = true;
    return assets;
  });
  return started;
}
