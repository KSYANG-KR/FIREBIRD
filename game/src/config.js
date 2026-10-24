// =====================================================================
// 게임 수치 모음 — 균형을 조정할 때는 이 파일만 고치면 된다.
// 4차: 새는 굽은 비행 경로를 따라 난다. 위치는 「경로 거리 s · 좌우 u(오른쪽 +) · 높이 v(수면 위 m)」로 다룬다.
// =====================================================================

// ---------- 새 3종 능력치 ----------
export const BIRDS = {
  sparrow: {
    id: 'sparrow',
    name: 'Sparrow',
    role: 'FAST', // 17차 U2: 한 단어
    forward: 13.3, // 12차: 전진 속도 세 새 모두 13.3m/s(180초)
    lateral: 10, // 6차: 옆·위아래 이동 속도 m/s(약 9 기준, 새마다 ±1)
    accel: 24, // 6차: 최고 속도까지 0.15초 안(1 − e^(−accel·0.15) ≥ 95%)
    hp: 60,
    radius: 0.5, // 맞는 범위(반지름 m)
    flapHz: 7.5, // 날갯짓 빠르기
    special: {
      kind: 'dash',
      name: 'Dash',
      desc: 'Burst of speed',
      cooldown: 4,
      duration: 0.25,
      speedMult: 2.8,
    },
    color: '#b07a45',
  },
  magpie: {
    id: 'magpie',
    name: 'Magpie',
    role: 'BALANCED',
    forward: 13.3,
    lateral: 9,
    accel: 22,
    hp: 105,
    radius: 0.7,
    flapHz: 4.2,
    special: {
      kind: 'reveal',
      name: 'Sense',
      desc: 'See bursts early',
      cooldown: 8,
      duration: 3,
    },
    color: '#4a6fa5',
  },
  pigeon: {
    id: 'pigeon',
    name: 'Pigeon',
    role: 'TOUGH',
    forward: 13.3,
    lateral: 8,
    accel: 20,
    hp: 205,
    radius: 0.85,
    flapHz: 5,
    special: {
      kind: 'guard',
      name: 'Guard',
      desc: 'Half damage',
      cooldown: 8,
      duration: 3,
      damageMult: 0.5,
    },
    color: '#8a8f99',
  },
};
export const BIRD_ORDER = ['sparrow', 'magpie', 'pigeon'];

// ---------- 피해 ----------
export const DAMAGE = {
  threat: 15, // 9차: 위협 불꽃 25 → 15(웨이브당 1회)
  bySize: { L: 15, M: 15, S: 15 }, // 11차 D 조정 ④ 시험: 대·중형 20 은 참새 클리어를 1/8 로 떨어뜨려(목표 4~6/8) 15 유지(비둘기는 8/8)
  curtain: 35, // 피날레 커튼
  invulnTime: 1.2, // 9차: 불꽃 피격 후 무적 1.0 → 1.2초
  obstacle: 10, // 구조물(다리·고가) 충돌
  obstacleInvuln: 0.6,
  bounceGap: 0.4, // 튕겨 낸 자리: 구조물 면에서 새반지름 + 이만큼
  willow: 25,
  crossette: 25,
};

// ---------- 위협 불꽃 공통(입자) ----------
export const THREAT = {
  pool: 12000, // 10차: 위협 장식 입자 몫(피날레 3알 × 겹치는 3웨이브 × 껍질당 약 1300). 장식 불꽃 입자계(RENDER.particlePool)에 이만큼 더해 함께 쓴다
  hot: [2.6, 2.3, 1.6], // 터지는 순간 따뜻한 흰 코어(HDR, 별 하나 크기라 화면 번쩍임 아님)
  dragK: 25, // 옛 잔류 구 입자 식(지금은 안 씀)
  nearCamFade: [2, 3.5, 0.2], // 5차: 카메라 2m 안 불씨만 옅게(껍질이 카메라 옆을 지나는 모습이 보이게)
};

// ---------- 5차: 박자(만남 기준) ----------
// 120BPM, 한 박 0.5초, 한 마디 2초. 위협의 「만남」(새의 작은 판정이 껍질 띠에 처음 닿는 순간)이 8분음표(0.25초) 칸에 떨어진다.
// 폭발 = 만남 − 지연(종류별 상수), 발사 = 폭발 − 비행 시간. 롤 예고음 「틱」은 만남 1박 전.
export const BEAT = { bpm: 120, beat: 0.5, bar: 2, eighth: 0.25, sixteenth: 0.125, tickBefore: 0.5 };

// ---------- 6차: 코스(거리 기준, 새 속도와 상관없이 세계에 고정) ----------
// plan: [길이 m, 회전 °(+ 오른쪽)] — 첫 직선은 시작점 뒤 320m(메뉴·시작 장면)부터 s = 70 까지.
//   s 70~180 좌 90°(반경 70, 호 110) · 180~276 직선 · 276~324 우 45°(반경 60, 협곡 꺾임 s = 300) · 324~485 직선 · 485~586 우 120°(반경 48, 호 100) · 이후 직선
// height: [s, 통로 중심 높이] — 사이는 코사인으로 이어 최대 경사 10° 이하(평균 6.4° 이하)
// zones: 환경 구간. rest = 쉬는 박자(선회, 문 없음 · 금색 잔불 줄 · 구경 불꽃)
// 12차 단위 3(임시 연장, 180초): 872m 코스의 직선(강·대로·협곡)을 늘려 약 2,400m. 새 장소는 없다(다리 C·바지선은 뒤 단위).
//   전진 13.3m/s 통일, s ≈ 11 + 13.3·t. 0~8초 출발 · 8~40 구간1(강) · 40~50 쉼1(좌 90°) · 50~95 구간2(대로·협곡·상승) · 95~105 쉼2(옥상 우 120°)
//   · 105~150 구간3(강 하강·본류) · 150~157 쉼3(다리 B 밑 — 다리 C 자리 임시) · 157~180 피날레(본류 직선 — 바지선 구역 자리 임시)
//   s 70~180 좌 90° → 555~665, 우 45° 276~324 → 915~962, 우 120° 485~586 → 1290~1390.5(옛 s 는 COURSE.remap 으로 옮긴다)
// 16차 U6a: 이동 타원은 모든 스테이지 공통(choreo 안전 칸 격자·먹이·판정이 모듈 상수로 쓴다)
export const ELLIPSE = { u: 9, v: 6 }; // 통로 중심 기준 좌우 ±9, 위아래 ±6m
// 16차 U6a: S1 코스 정의(course.def). 스테이지마다 STAGES[i].course 에 같은 모양으로 둔다. 게임 코드는 Course.def 로만 읽는다
const S1_COURSE = {
  pre: 320,
  plan: [[875, 0], [(70 * Math.PI) / 2, -90], [250, 0], [(60 * Math.PI) / 4, 45], [327.9, 0], [(48 * Math.PI * 2) / 3, 120], [1450, 0]],
  length: 2405, // 피날레 끝(약 180초)
  // 15차 A-1: 지붕 위를 난다. 강·다리 A·좌 90° 35 → 대로 진입 46(경사 7.3°) → 시내 46 → 출구 56(4.8°) → 옥상 우 120° 56 → 강으로 35(9.0°) → 본류 35
  // 16차 1절: 통로를 +4m(39/50/60). 경사는 그대로 7.3° / 4.7° / 8.9°
  height: [[0, 39], [665, 39], [800, 50], [1100, 50], [1290, 60], [1390, 60], [1600, 39], [3200, 39]],
  ellipse: ELLIPSE, // 이동 타원(통로 중심 기준 좌우 ±9, 위아래 ±6m)
  capS: [-150, 2465], // 15차 A-2 건물 상한을 거는 s 범위(16차 2-1: [−150, length + 60]) — 16차 U6a: CITY.cap 에서 코스로 옮김
  zones: [
    { id: 'river', name: 'River', s: [-400, 543], music: 1, phase: 'early' },
    { id: 'turn1', name: 'Left Turn', s: [543, 676], rest: true, music: 0, phase: 'rest' },
    { id: 'avenue', name: 'Avenue', s: [676, 760], music: 1, phase: 'mid' },
    { id: 'canyon', name: 'Downtown Rooftops', s: [760, 1100], music: 2, phase: 'mid' },
    { id: 'climb', name: 'Climb', s: [1100, 1275], music: 2, phase: 'mid' },
    { id: 'roof', name: 'Rooftop Turn', s: [1275, 1408], rest: true, music: 0, phase: 'rest' },
    { id: 'descent', name: 'Descent', s: [1408, 1600], music: 2, phase: 'late' },
    { id: 'lower', name: 'Main River', s: [1600, 2006], music: 2, phase: 'late' },
    { id: 'rest3', name: 'Over Bridge B', s: [2006, 2099], rest: true, music: 0, phase: 'rest' },
    { id: 'finale', name: 'Finale', s: [2099, 9000], music: 3, phase: 'finale' },
  ],
  bridges: [{ id: 'A', s: 8, underside: 17 }, { id: 'B', s: 2050, underside: 17 }], // 15차 A-4: 다리 A s 45 → 8(시작 횃대: 새가 트러스 위에서 잠든다), 다리 B 아랫면 19 → 17(트러스 맨 위 약 27.2m < 통로 바닥 29m)
  // 옛 코스(11차, 872m) s → 새 s(직선만 늘림). world.js 의 s 고정 배치가 이것으로 옮긴다
  remap: [[-400, -400], [70, 555], [180, 665], [276.5, 915], [323.6, 962.1], [485, 1290], [586, 1390.5], [3000, 3804.5]],
};
// def = 그 스테이지 코스 정의(course.def). remap 이 없는 코스는 그대로
export function remapS(sOld, def = S1_COURSE) {
  const K = def.remap;
  if (!K) return sOld;
  if (sOld <= K[0][0]) return sOld;
  for (let i = 1; i < K.length; i++) if (sOld <= K[i][0]) return K[i - 1][1] + ((sOld - K[i - 1][0]) * (K[i][1] - K[i - 1][1])) / (K[i][0] - K[i - 1][0]);
  return sOld + (K[K.length - 1][1] - K[K.length - 1][0]);
}

// ---------- 6차: 도시 배치(세계 좌표) ----------
// 지류: x = 30 중심, 반폭 60(경로 s 0~70 은 서쪽 강가에서 30m 안쪽 수면 위). 본류: 마지막 직선(경로)을 왼쪽으로 40m 옮긴 선이 중심, 반폭 70.
export const CITY = {
  trib: { x: 30, hw: 60, zTop: 1700 },
  main: { off: -40, hw: 70, back: 1700, ahead: 1700 },
  avenueHalf: 15, // 대로 반폭(차도 + 보도)
  canyonSetback: 21, // 협곡 빌딩 벽이 경로에서 떨어진 거리
  clearU: 16, // (14차까지) 경로에서 이만큼 안쪽 건물은 통로 바닥 − 3m 아래로만 — 15차에는 아래 cap 세 띠로 바뀜
  // 15차 A-2: 건물 상한 세 띠(edge = 경로에서 건물 모서리까지 m). 가까운 띠 지붕 ≤ 중심 − 9.5, 지붕 + 옥상 소품 ≤ 통로 바닥 − 1
  //   중간 띠 상한 = 중심 − 9.5 + 0.35 × (edge − 80) · 먼 띠(> 180m) 상한 없음. capS = 이 s 범위 안 건물만(코스 밖은 그대로)
  //   16차 1절: drop 9.5 → 12.5(지붕 ≤ 중심 − 12.5, 지붕 + 소품 ≤ 중심 − 7 이라 소품은 5.5m 이하)
  cap: { near: 80, mid: 180, drop: 12.5, slope: 0.35, propGap: 1 }, // capS 는 16차 U6a 에 코스 정의(course.def.capS)로 옮김
  // 가까운 띠 높이: 블록(40~80m) 단위 계단 — 낮은 블록 상한 × 0.55~0.7, 높은 블록 × 0.9~1.0 이 번갈아(좌우 따로)
  block: { len: [40, 80], low: [0.55, 0.7], high: [0.9, 1.0] },
  // 옆 탑 예외: 구간마다 2~4개, edge 25~60m, 지붕 = 통로 중심 + 10~20m, 이동 타원(±9m)에서 가로 15m 이상. 위협 발사 자리 후보에서 뺀다
  tower: { n: [2, 4], edge: [25, 60], top: [10, 20], gap: 15, size: [14, 20] },
  water: 2.4, // 가까운 띠 물탱크 높이(뚜껑 포함)
  fill: 330, // 코스 양옆 이 거리까지 도시 블록을 채운다(안개 거리 250m 보다 넉넉히)
  rampGrade: 0.085,
  roadFar: 1500, // 열린 도로 끝은 코스에서 이만큼 넘게(안개 너머)
};

// ---------- 12차: 위협 불꽃 = 「위험 띠(고리, r_in ~ r_out)」 또는 「위험 원판(0 ~ r_out)」 하나(choreo.js·bursts.js 가 같은 식) ----------
// 판정과 그림을 떼어 놓는다. 판정은 띠·원판 하나, 그림은 그 띠 안에서 마음대로 사실적으로(가는 별 수백 개·흐려지는 꼬리·변색·반짝임·처짐).
// 그림 제약은 하나: 판정 시간 동안 띠 밖(r_out + 0.1m 너머)과 구멍 안(r_in − 0.1m 안)에는 밝은 그림이 0 → 「보이는 범위 = 판정」.
// 펴짐: r(t) = r_pass × (1 − e^(−k·t)) ÷ (1 − e^(−k·lead)) — 새가 지나는 순간(폭발 + lead) 반경 = 표의 값. r_in 도 같은 비율.
// 처짐: 띠 전체가 함께 내려간다(중심 − ½·g·t², 별마다 같은 값). 판정 시간 동안 g = 1.0m/s²(지나는 순간 약 0.13~0.16m), 판정이 끝나면 2~3m/s² 를 더한다.
// 피격: 새가 폭발 면을 지나는 순간 ± 0.07초 동안
//   띠: (r_in + 0.05) − b < ρ < (r_out − 0.05) + b · 원판: ρ < (r_out − 0.05) + b   (0.05m = 보이지 않는 관대함, b = 새 판정 반지름)
// 길은 둘: 밖(ρ ≥ r_out + b + 0.1) · 센터(ρ ≤ r_in − b − 0.05). 줄기 사이 길·하트·바늘·틈새 점수는 없앴다.
export const BAND = {
  tol: 0.05,
  window: 0.07,
  gJudge: 1.0,
  gAfter: [2, 3],
  outPad: 0.1,
  centerPad: 0.05,
  foldT: [0.1, 0.15], // 센터 통과 ± 0.2초 날개 접기(접힘 0.1초 · 펴기 0.15초)
  foldWin: 0.2,
  foldAmt: 0.7, // 접는 정도(poseBird folded, 코드 새) — 비둘기 그림 날개폭 4.85 → 2.21m(≤ 2 × (r_in − 0.1) = 2.4m)
  foldAmtGLB: 1.0, // 생성 3D 새(GLB) 접기 — 어깨 뒤로 젖힘 1.5 · 팔꿈치 2.2rad · 날개 오므림 45%
};
export const BURST = {
  // 종류(12차 A-2). size: 시각표(TIMING) 크기 L 대 · M 중 · S 소. shape: band 띠 · disk 원판. rout: 지나는 순간 바깥 반경(m), rin: 구멍 반경(고리는 rout − rinOff)
  // stars: 별 수(그림), egg: 알 지름(m), life: 별 수명(초, 판정 뒤 사라짐까지), look: 그림 종류
  chrysL: { label: 'Chrysanthemum L', size: 'L', shape: 'band', rout: [5.0, 5.5], rin: 1.45, stars: [180, 216], egg: 0.45, life: [1.5, 1.9], look: 'chrys',
    whistle: { f0: 700, f1: 2400, wave: 'sine', q: 9, gain: 0.11 } },
  willowL: { label: 'Willow L', size: 'L', shape: 'band', rout: [5.0, 5.4], rin: 1.45, stars: [130, 155], egg: 0.45, life: [2.4, 3.0], look: 'willow',
    whistle: { f0: 600, f1: 2000, wave: 'sine', q: 8, gain: 0.12 } },
  chrysM: { label: 'Chrysanthemum M', size: 'M', shape: 'band', rout: [3.4, 3.9], rin: 1.3, stars: [135, 162], egg: 0.35, life: [1.4, 1.8], look: 'chrys',
    whistle: { f0: 900, f1: 2900, wave: 'sine', q: 10, gain: 0.11 } },
  ring: { label: 'Ring', size: 'M', shape: 'band', rout: [3.6, 4.0], rinOff: 0.7, stars: [90, 110], egg: 0.35, life: [1.3, 1.6], look: 'ring',
    whistle: { f0: 1000, f1: 3100, wave: 'sine', q: 10, gain: 0.11 } },
  peonyS: { label: 'Peony S', size: 'S', shape: 'disk', rout: [2.2, 2.6], rin: 0, stars: [260, 320], egg: 0.25, life: [1.2, 1.5], look: 'peony',
    whistle: { hiss: true, f0: 420, f1: 700, gain: 0.16 } },
  dahlia: { label: 'Dahlia M', size: 'M', shape: 'disk', rout: [3.2, 3.6], rin: 0, stars: [120, 120], core: { n: 80, r: 1.5 }, egg: 0.35, life: [1.4, 1.8], look: 'dahlia',
    whistle: { f0: 600, f1: 2200, wave: 'sine', q: 9, gain: 0.12 } },
  // 16차 U7(2-4): S2 palm — 띠, M, rout 3.6~4.0, rin 1.3. 굵은 줄기(바퀴살) 없이 띠 전체를 채움 별로 채운다(바깥 테 별 간격 ≤ 0.2m, 줄 사이 틈 ≤ 0.2m).
  //   fill: { rowGap 줄(반경) 간격 m, tail 별 꼬리 길이 m, starGap 한 줄 안 별 간격 m } — 판정은 다른 띠와 같다
  palm: { label: 'Palm M', size: 'M', shape: 'band', rout: [3.6, 4.0], rin: 1.3, stars: [0, 0], egg: 0.35, life: [1.4, 1.8], look: 'palm',
    fill: { rowGap: 0.7, tail: 0.55, starGap: 0.19, jit: 0.025, head: [0.07, 0.09], sparkle: 0.35 }, // 줄 안 간격 ≤ 0.19 × 1.05 ≈ 0.2 · 줄 사이 틈 = rowGap − tail − 머리 ≈ 0.07m
    whistle: { f0: 820, f1: 2600, wave: 'sine', q: 9, gain: 0.11 } },
  // 16차 U8(2-4): S3 kamuro — 원판, M, rout 3.2~3.6. 금빛 굵은 별(버드나무처럼 굵은 머리·꼬리) + 가운데 채움(core).
  //   판정 시간에는 원판 안에서만(늘어짐 없음, 처짐 1.0m/s² 그대로), 판정이 끝난 뒤(after)에만 꼬리가 길게 흘러내리고 처짐 × 1.45(gAfterMult)
  kamuro: { label: 'Kamuro M', size: 'M', shape: 'disk', rout: [3.2, 3.6], rin: 0, stars: [150, 170], core: { n: 56, r: 1.25 }, egg: 0.35, life: [2.3, 2.9], look: 'kamuro', gAfterMult: 1.45,
    whistle: { f0: 560, f1: 1900, wave: 'sine', q: 8, gain: 0.12 } },
  // 16차 U9(2-4): S4 brocade — 띠, L, rout 5.0~5.5, rin 1.45. 금·은빛 반짝이는 긴 꼬리(모든 별이 r_out 에서 r_in 까지 이어진 꼬리, 짧은 꼬리 없음).
  //   긴 꼬리는 판정 시간 동안 띠 안에서만(r_in 에서 끝), 판정이 끝난 뒤에만 구멍 안으로 흘러내림(after willow) · 처짐 × 1.25
  brocade: { label: 'Brocade L', size: 'L', shape: 'band', rout: [5.0, 5.5], rin: 1.45, stars: [170, 200], egg: 0.45, life: [2.0, 2.6], look: 'brocade', gAfterMult: 1.25,
    whistle: { f0: 640, f1: 2100, wave: 'sine', q: 8, gain: 0.12 } },
  // 구간별 종류 비율(%) — 구간1(early) / 구간2(mid) / 구간3(late) / 피날레(finale). 쉬는 구간은 early 비율
  mix: {
    early: { chrysL: 30, chrysM: 25, ring: 20, peonyS: 25 },
    mid: { chrysL: 25, willowL: 10, chrysM: 20, ring: 10, peonyS: 20, dahlia: 15 },
    late: { chrysL: 25, willowL: 10, chrysM: 20, ring: 5, peonyS: 20, dahlia: 20 },
    finale: { chrysL: 25, willowL: 15, chrysM: 15, peonyS: 25, dahlia: 20 },
  },
  // 위협 8색(11차): 색 이름 → 색상(밝기 1 기준). 별 밝기는 「눈에 보이는 밝기(상대 휘도)」를 금색과 같게 맞춘다
  colors: {
    gold: [1.0, 0.62, 0.18], crimson: [1.0, 0.2, 0.28], orange: [1.0, 0.33, 0.06], silver: [0.82, 0.88, 1.0],
    teal: [0.12, 0.95, 0.85], lime: [0.55, 1.0, 0.2], purple: [0.66, 0.34, 1.0], pink: [1.0, 0.4, 0.72],
  },
  colorLum: 0.75,
  colorDrop: [],
  twoTone: 0.3, // 2색 변색(30%)
  after: ['willow', 'crossette', 'crackle'], // 판정이 끝난 뒤 모양 변화(판정 없음)
  passedFade: { delay: 0.1, time: 0.25, to: 0.25 },
  nearCam: { dist: 13, from: 9, mult: 0.4, capM: 0.4 }, // 12차: 카메라 13m 안 별 밝기 ×0.4(새가 지날 때 가까운 머리들이 하얗게 번지지 않게 — 흰 화소 p99 ≤ 3%)
  birdHitMult: 0.45, // 새 판정 = 반지름 × 0.45(참새 0.23 · 까치 0.32 · 비둘기 0.38m)
  judgeAfter: 0.3,
  // 12차 그림(A-3, bursts.js StarRenderer). 판정 데이터는 읽기만 한다
  look: {
    angJit: 0.25, // 층화 각도 흔들림(칸 비율) — 이웃 간격 ≤ (1 + 2 × 0.25) × 칸이 0.2m 이하가 되게
    spdJit: 0.02, // 속도 흔들림
    depthJit: 0.25, // 깊이 흔들림(m)
    head: [0.09, 0.13], // 머리 코어 반지름(m)
    hotT: 0.12, hot: 2.6, hdr: [1.8, 2.2], // 처음 0.12초 흰빛 HDR 2.6, 이후 색 HDR 1.8~2.2
    tailW: [0.03, 0.006], // 꼬리 폭(머리 → 끝) — 명세 0.05 → 0.01 은 가까이서 막대처럼 보여 가늘게
    inner: { frac: 0.3, j: [0.72, 0.95] }, // 별 30% 는 띠 안쪽에서 머리(띠 안이라 판정 그대로) — 시계 문자판 같은 고른 바퀴살을 깸
    tailHalf: 0.35, // 꼬리 밝기 반감 길이 = 띠 폭 × 0.35
    tailFloor: 0.35, // 꼬리 밝기 바닥(r_in 에 닿기 전 0.3 아래로 내려가지 않게)
    tipDot: { a: 0.6, d: 0.07 }, // 꼬리 끝(r_in) 변색 점(밝기 ≥ 0.5, 지름 0.06~0.08m)
    tipCol: [1.0, 0.42, 0.12], // 꼬리 끝 주황·적갈
    clip: 0.05, // r_in − 0.05m 안쪽 밝기 0
    sparkle: { frac: 0.15, hz: [12, 20] },
    starGap: 0.2, // r_out 에서 이웃 별 간격 ≤ 0.2m
    lose: 0.3, // 판정이 끝나면 0.3초 동안 머리가 반짝이며 사라지고 잔광이 이어 감
    embers: { n: [500, 750], size: 0.055, col: [1.0, 0.72, 0.3], end: [0.4, 0.08, 0.02], life: [0.6, 1.5], grav: [1.5, 3.2], a: 0.6 },
    reserve: 1500,
    smoke: { n: [6, 10], a: 0.15, life: [2.6, 3.2], size: [1.6, 4.2], spread: 0.35, wind: [0.5, 0.08, 0.25] },
    willow: { life: [1.5, 2.2], a: 0.4, col: [1.0, 0.6, 0.2], end: [0.35, 0.08, 0.02], size: 0.09, drag: 1.4, grav: 1.1 },
    crossette: { n: 4, speed: [1.8, 2.8], life: [0.35, 0.55], size: 0.07, col: [1.1, 0.7, 0.25], end: [0.5, 0.15, 0.03], a: 0.75 },
    decorGap: 4, // 판정 시간 동안 통로 평면 앞뒤 이 거리(m) 안에는 장식을 두지 않는다
  },
  coverCap: { wave: 0.45, all: 0.55 },
  kick: { fov: 1.5, shake: 0.1 },
  light: { I: 0.35, radius: 36, inT: 0.02, holdT: 0, outT: 0.4, color: [1.0, 0.78, 0.5] },
  centerBonus: 0.15, // 센터(구멍)로 지나면 배율 +0.15
  graze: 1.0,
  swish: 3,
};
// ---------- 12차 시각표(TIMING, B-1) — 시각 값은 이 표 한 곳에만. 크기 L 대 · M 중 · S 소 ----------
// tq = 폭발(8분음표 칸). 발사 = tq − launchToBurst. 범위 원(= 정보) = 발사 + 0.1. 알 = 폭발 − 0.45(째깍 1번 −0.25, 조임 0.12). 도착 = tq + lead.
// 정보 → 도착 = launchToBurst − 0.1 + lead = 1.4 / 1.3 / 1.2초. 다음 웨이브 정보 ≥ 지금 웨이브 폭발 + 0.15초.
export const TIMING = {
  launchToBurst: { L: 1.0, M: 0.95, S: 0.9 },
  infoAfterLaunch: 0.1,
  eggBefore: 0.45,
  ticks: [0.25],
  squeeze: 0.12,
  lead: { L: 0.5, M: 0.45, S: 0.4 },
  k: { L: 10, M: 11, S: 13 },
  infoGap: 0.15,
};

// ---------- 예고(omens.js) — 12차: 발사 → 0.1초 뒤 「범위 원」(정보) → 폭발 0.45초 전 알(째깍 1번 0.25초 전, 조임 0.12초) → 쾅 ----------
// 범위 원: 띠는 바깥 원(r_out)과 구멍 원(r_in) 두 줄, 원판은 바깥 원 + 안쪽 옅은 채움(0.08). 점선 48칸, 두께 화면 최소 1.5px, HDR 0.6, 불꽃 색 채도 −30%.
//   0.15초 동안 나타나고, 판정 시간에는 불투명도 0.5 로 띠 경계를 잡아 주고, 판정이 끝나면 0.2초 동안 사라진다. 다음 웨이브만(진한 예고 규칙 유지).
// 조준점: 다음 웨이브에 띠 종류가 있으면, 그 폭발 면 위 「지금 새 자리(u, w)」에 반지름 b 의 작은 점선 고리(흰색 HDR 0.5). 정보 시각 ~ 통과까지 실시간.
// 그림은 bloom 뒤에 깊이 검사 없이 맨 위에(폭발에 묻히지 않게).
export const OMEN = {
  descent: 0, // 알은 정점(폭발 중심)에 멈춰 있다
  eggR: 0.175, // 알 지름 0.35m
  glow: 2.6, // 빛무리 = 알 반지름 × 2.6
  back: { r: 4.2, a: 0.6 }, // 알 뒤 어두운 받침(대비)
  minPx: 2.2, // 알 반지름 최소 화소(1080p 기준)
  fuseR: 0.5, // 도화선 호 반지름(m)
  fuseW: 0.045,
  strong: [1.0, 0.6],
  faint: { size: 0.5, bright: 0.3 },
  maxStrong: 3, // 진한 예고는 다음 1웨이브만(알 3개까지)
  strongRanks: 1,
  maxFaint: 6,
  pulse: { amp: 0.55, width: 0.06 },
  // 12차 카운트다운: 알이 뜰 때 1.0 → 째깍(0.25초 전) 1.3배, 조임 0.12초 → 0.6배, 마지막 0.06초 알 빛 +0.5(알 하나 크기)
  count: { scale: [1.0, 1.3], bright: [0.85, 1.0], fuse: [[1.0, 0.72, 0.28], [1.0, 0.93, 0.82]], ease: 0.05 },
  squeeze: { t: 0.12, to: 0.6, glint: 0.06, gain: 0.5 },
  peonyCol: [1.0, 0.3, 0.28],
  peonyCore: [1.0, 0.9, 0.8],
  ringCol: [1.0, 0.78, 0.32],
  fuseCol: [1.0, 0.72, 0.28],
  range: { dashes: 48, duty: 0.55, px: 1.5, w: 0.035, hdr: 0.6, desat: 0.3, fadeIn: 0.15, judgeA: 0.5, fadeOut: 0.2, fillA: 0.08, passNear: 15, fillPx: [180, 240], hatch: [10, 0.3] }, // 16차 U11: 판정 끝 = 바로 지움(fadeOut 은 쓰지 않음), 지난 껍질 원은 카메라 15m 안이면 지움, 화면 반지름 180→240px(1080 기준)이면 원판 채움을 빗금(간격 10px·칠 30%)으로
  aim: { dashes: 16, duty: 0.5, hdr: 0.5, w: 0.03, px: 1.5 },
};

// ---------- 안무(choreo.js) — 판 시작 때 씨앗값으로 한 판 전체 웨이브를 미리 짠다 ----------
// 12차 B-2 안전 지대 지도: 이동 타원(±9 × ±6m, × 0.95) − 모든 껍질의 위험 영역(새 판정 반지름만큼 넓힘)을 0.3m 격자로 계산해
// 연결된 안전 덩어리마다 내접 반경 ins 와 앞 목표 P 에서 가장 가까운 거리 M 을 잰다.
// R1 강제 이동(쉬는 구간이 아니면 P 는 위험 영역 안) · R2 도달 보장(M ≤ 0.75 × reachH 인 덩어리 ≥ 1) · R3 최소 크기(센터 0.5 · 밖 0.8m)
// R4 실틈 금지(두 띠는 0.3m 이상 겹치거나 2 × 0.38 + 0.8m 이상 떨어짐, 가장자리와 띠도 0 또는 1.2m 이상) · R5 선택지(D 목표 < 40 → 덩어리 ≥ 2, ≥ 60 → ≤ 2) · R6 방향(좌우 65 · 위아래 35%)
// 닿을 거리 reach(T) = 옆 속도 × (T − 반응 − 1/a) × 0.9, a = accel × 0.9(저HP 기준). 봇 사슬 검사 반응 0.15 · 사람 0.35
export const CHOREO = {
  cell: 0.3,
  react: 0.15,
  humanReact: 0.35,
  reachMult: 0.9,
  ellSafe: 0.95,
  outMove: [0.55, 0.7], // 앞 목표 → 노리는 안전 덩어리 = 사람 reach × 0.55~0.70
  moveMax: 5.5,
  moveMin: 0.6,
  pathMix: { out: 58, center: 42 }, // 최적 봇 길 목표 밖 55~70 · 센터 30~45%
  camp: 0.85, // 시작 자리(손 놓고 버티기)가 안 맞는 웨이브에 작은 모란을 더할 확률
  stillIn: 0.25, // R1: 앞 목표 P 는 위험 영역 안쪽 0.25m 이상
  first: 8, // 첫 웨이브 폭발(초, 플레이 시작 기준) — 0~8초 출발(위협 없음)
  endPad: 27, // 마지막 약 2초는 위협 없이(클리어 연출)
  gap: { early: [8, 9], mid: [6, 7], late: [5, 6], finale: [4, 5], rest: [12, 12] }, // 간격(8분음표 칸)
  maxWaves: 110, // 180초 판 약 100~106웨이브(간격표대로)
  double: { early: 0, mid: 0.3, late: 0.35, rest: 0 }, // 알 2개 비율(피날레는 무늬 close = 3개)
  finaleMax: 3,
  tries: 60,
  triesMax: 200, // 후보가 모자라면 200 까지
  cands: 12, // 웨이브마다 규칙을 통과한 후보 12개까지 모아 봇 피격률로 고른다
  botN: 12, // 후보 하나에 사람 근사 봇 12번
  // 12차 D 검증: 세 항 D 와 봇 피격률 상관 0.47 · 0.40 · 0.25(회귀 2회 뒤 0.56 · 0.25 · 0.16) < 0.6 → D = 사람 근사 봇 피격률(%)
  // 목표 곡선(구간 진행 0~1): 구간1 1→2.5 · 구간2 2.5→4.5 · 구간3 4.5→7 · 피날레 7→10%, 쉬는 구간 0
  dTarget: { early: [1, 2.5], mid: [2.5, 4.5], late: [4.5, 7], finale: [7, 10], rest: [0, 0] },
  los: { step: 0.25, hfov: 40, vfov: 24 }, // 정보 시각(범위 원)부터 가려짐·화면 밖 검사
  map: { reach: 0.75, insCenter: 0.5, insOut: 0.8, overlap: 0.3, sep: 2 * 0.3825 + 0.8, edge: 1.2, lr: 0.65 },
  // 무늬(반복). zig 좌우 · wave 위아래 · chain 대각선 · close 닫힘(피날레, 알 3개)
  seq: {
    early: [['zig', [2, 3]], ['wave', [1, 2]], ['zig', [2, 3]], ['chain', [2, 2]]],
    mid: [['zig', [3, 4]], ['wave', [2, 3]], ['chain', [2, 3]], ['zig', [2, 3]], ['wave', [1, 2]]],
    late: [['zig', [2, 3]], ['chain', [2, 3]], ['wave', [2, 3]], ['zig', [2, 3]]],
    finale: [['close', [2, 3]], ['zig', [1, 2]], ['close', [2, 3]], ['wave', [1, 2]]],
  },
};

// ---------- 10차: 먹이 2종(food.js) — 점수 먹이 줄은 없앰 ----------
// HP 먹이: 판당 5개(4~6), 대략 12~15초에 하나, 첫 4웨이브 안에는 두지 않고 피날레에 1개는 꼭. 웨이브 폭발 면 위,
//   새가 지나는 순간의 판정 머리에서 0.5~0.9m 바깥(머리 사이 주머니·틈 가장자리), 안전 틈 중심에서 2~3.5m 비켜, 앞뒤 목표에서 닿을 거리 안.
//   그 자리에 정확히 가면 맞지 않는다(실제 별 위치로 검사). 줍는 반경 1.0m, 끌림 없음. 회복 = 최대 HP 의 25%(최소 15). 가득이면 +100점.
//   모양 = 그 새가 좋아하는 먹이 + 민트(HP 막대 색) 빛무리와 「+」 고리(천천히 맥박).
// 롤 먹이: 판당 6개(5~7), 웨이브 사이 깊이 가운데, 계획 경로에서 2~4m 비켜(폭발 면 위 아님), 먹은 뒤 다음 목표에 닿을 수 있는 자리. 롤 +1, 가득이면 +200점.
//   모양 = 시안(롤 표시 색) 깃털이 천천히 돈다(길쭉한 실루엣).
export const FOOD = {
  kinds: {
    mayfly: { label: 'Mayfly', size: 0.8 },
    moth: { label: 'Moth', size: 0.72 },
    crumb: { label: 'Bread', size: 0.62 },
    grain: { label: 'Grain', size: 0.7 },
  },
  fav: { sparrow: 'grain', magpie: 'moth', pigeon: 'crumb' }, // HP 먹이 모양(그 새가 좋아하는 먹이)
  hp: { n: [10, 12], gap: [12, 15], skipWaves: 4, edge: [0.25, 0.9], // 11차 edge: 새 판정 기준 줄기까지 여유(바깥 띠·구멍)
     offGap: [2.0, 3.5], safe: 0.12, collect: 1.0, heal: 0.25, healMin: 15, fullPts: 100, ring: 1.6, glow: [0.5, 1.0, 0.77] },
  roll: { n: [12, 15], off: [2.0, 4.0], planeGap: 3, burstPad: 1.5, collect: 1.0, fullPts: 200, size: 0.95 },
  eatT: 0.12, // 11차: 먹힘 연출 — 1.3배로 커졌다가 터짐(0.12초)
  eatGrow: 1.3,
  // 11차 획득 이펙트(판정 없음, 기존 인스턴스 안 — 그리기 호출 늘지 않음). 색: HP 민트 · 롤 시안 · 점수 전환 금
  fx: {
    col: { hp: [0.5, 1.0, 0.77], roll: [0.37, 0.91, 1.0], gold: [1.0, 0.83, 0.42] },
    css: { hp: '#7fffc4', roll: '#5fe9ff', gold: '#ffd36a' },
    ring: { r: 1.6, t: 0.35, w: 0.08, hdr: 1.2 }, // 새 중심에서 넓어지는 고리(0 → 1.6m, 0.35초, 두께 0.08m, 밝기 1.2 — 위협 머리 3.0 보다 어둡게)
    sparks: { n: 20, life: 0.5, size: 0.12, up: [2.5, 5.0], side: 1.8, hdr: 1.2 }, // 위로 튀는 반짝 입자 20개(0.5초)
    rim: { t: 0.4, gain: 0.55 }, // 새 몸 테두리 빛 0.4초
  },
  viewFar: 70, // 이 거리 밖은 옅어져 안 보임
};

// ---------- 11차: 새 옆 팝업 글자(ui.js #pops) — 화면 가운데 토스트와 따로 ----------
// 새 화면 위치 기준 아래쪽(0, +50px @1080p, 해상도 비례). 0.8초 = 튀어나옴 0.1(0.6 → 1.15 → 1.0) + 올라감 0.45 + 사라짐 0.25.
// 겹치면 26px 씩 아래로 쌓는다. 판정 시간(위협 폭발 ~ 지남 + 0.3초)과 겹치면 불투명도 0.5. 28px 굵게, 검은 외곽선 2px, 종류 색.
export const POPUP = { dy: 50, size: 28, outline: 2, pop: 0.1, rise: 0.45, fade: 0.25, risePx: 30, stack: 26, judgeA: 0.5, ref: 1080 };

// ---------- 5차: 급회피 롤(Space, 모든 새) ----------
// 0.35초에 한 바퀴, 누른 방향으로 2m. 무적 0.30초(세 새 같음). 대기는 롤이 끝난 뒤부터 센다.
// 퍼펙트 = 만남 전 0.12초 안에 롤 시작 + 만남이 무적 구간 안. 무적에 걸리기만 했으면 「회피」(점수 0, 콤보 유지).
// 10차 개수제: 시작 3개 · 최대 3개 · 쉬는 구간(turn1·roof)에 들어갈 때 1개 보충 · 롤 먹이 하나에 +1. 자연 충전 없음. 0개면 Space 에 「턱」만(롤 안 나감)
export const ROLL = {
  duration: 0.35, push: 2, invuln: 0.3, cooldown: 0.5, // 10차: 대기 0.5초(연타만 막음, 세 새 같음)
  start: 3, max: 5, restRefill: 1, // 11차: 최대 3 → 5(확정). 5개일 때 롤 먹이 = +200점(FOOD.roll.fullPts, 배율 미적용)
  perfectWindow: 0.12, lateGrace: 0.05, // 닿은 뒤 0.05초(60fps 3프레임) 안에 롤을 시작하면 피해 없이 「회피」(퍼펙트 아님)
  camFollowDeg: 3, fovKick: 3,
};

// ---------- 5차: 손맛 ----------
export const FEEL = {
  hitStop: 0.07, // 피격 순간 정지(실제 초, 약 4프레임)
  slowmo: { scale: 0.35, inT: 0.04, holdT: 0.04, outT: 0.12, cooldown: 3 }, // 퍼펙트 슬로모(실제 0.2초). 피날레에서는 끔
  trauma: { hit: 0.6, near: 0.15, maxShake: 0.35, decay: 1.2, freq: 17 },
  graze: 1.6, // 띠 판정 바깥 1.6m 안을 스치면 스침
  scorch: [1, 0.62, 0.42, 0.28], // HP 비율 3단계로 깃털 어둡게
  heavyBelow: 0.4, heavyAccel: 0.9, heavyRecover: 6, // HP 40% 아래면 옆 가속 −10%, 6초 안 맞으면 한 단계 회복
  trail: { perCombo: 0.06, max: 0.8 }, // 날개 끝 시안 흔적 길이(초) = 콤보 × 이 값
  vignette: 0.15,
  smokeTime: 1.5, feathers: 3,
};

// ---------- 5차: 배경음악(코드 합성 루프, music.js) ----------
export const MUSIC = {
  lookahead: 0.05, // 실제 초. 이 안에 들어온 음만 예약(슬로모·히트스톱에 박자를 밀기 위해 짧게)
  volume: 0.5,
  root: 220, // A3 — 5음계(라 도 레 미 솔)
  muffleHz: 600,
};

// ---------- 시작 장면·추락·엔딩 ----------
export const INTRO = { sleep: 1.8, startle: 0.7, rise: 2.0 }; // 16차: 떠오름 1.7 → 2.0초(통로가 4m 높아져 상승 ≤ 8m/s), 시작 s0 = 13.3 × 2.0 × 0.5 = 13.3
export const FALL = { duration: 2.8, gravity: 14, spin: 7 };

// ---------- 점수 ----------
export const SCORING = {
  clearPerStage: 1000,
  perfect: 300, // 퍼펙트 롤 × 배율
  graze: 100, // 스침 × 배율
  pass: 50, // 7차: 사건을 맞지 않고 통과 × 배율
  center: 200, // 12차: 센터(구멍) 통과 × 배율(+ 배율 0.15). 밖 = pass 50
  timing: 80, // 8차: 타이밍 퍼펙트(새가 폭발 면을 지나는 순간 별 1.2m 안을 스침) × 배율(+ 배율 0.1)
  timingR: 1.2,
  comboMult: [[0, 1], [3, 1.5], [6, 2], [10, 3]], // [콤보 이상, 배율]
  hpPoint: 10,
  noHitBonus: 500,
};
export const HEAL_BETWEEN_STAGES = 0.3;

// ---------- 군중 ----------
export const CROWD = {
  cheerRadius: 100, // 15차: 둑까지 약 75~80m
  bigCheerTime: 2.6,
  color: 0x07070c,
};

// ---------- 랭킹 ----------
export const RANKING = { nameMin: 2, nameMax: 12, keep: 100, show: 50 };

// ---------- 카메라·멀미 ----------
// 새 뒤 9m, 30m 앞을 6° 내려다본다. 새를 느슨하게 따라가(좌우 0.45, 위아래 0.6) 새가 화면 끝까지 갈 수 있다.
// 카메라는 단면 안(1m 안쪽)과 구조물 상자 + 0.5m 바깥에 가둔다. 「흔들림 줄이기」를 켜면 기울기·FOV 튐·흔들림 끔.
export const CAMERA = {
  distance: 6.5, // 15차: 6 → 6.5(지붕 위를 날며 아래 지붕이 보이게)
  lookAhead: 30,
  pitchDrop: 6.0, // 15차: 3.15 → 6.0 — 30m 앞에서 이만큼 아래(내려다보는 각 약 11.6° = atan((1.5 + 6.0) / 36.5))
  followU: 0.45,
  followV: 0.6,
  upOffset: 1.5, // 15차: 1.2 → 1.5 — 세로 시차 upOffset/distance = 0.23(0.17~0.23 안에 묶음)
  spring: 6,
  fov: 60,
  fit: { hHalf: 42, min: 60, max: 66, minAspect: 1.3 }, // 16차 3-2: 좁은 화면(4:3) 세로 FOV 정적 보정, 1.30 미만은 위아래 검은 띠
  maxRollPathDeg: 5, // 6차: 경로 굽음 기울기 상한
  maxRollBirdDeg: 3, // 6차: 새 기울기 반영 상한
  maxRollDeg: 8, // 6차: 화면 기울기 합(롤 따라가기 포함) 상한 — 「기울기 15%」를 어느 해석으로 읽어도 지켜지는 값
  pitchFollow: 0.5, // 6차: 카메라 위아래 기울기는 경사의 절반만 따라간다
  maxPitchDeg: 5, // 6차: 경사로 생기는 카메라 피치 상한(기본 내려다봄 6° 와 따로)
  rollFromBird: 0.06,
  fovKick: 4,
  fovKickDecay: 7,
  shake: 0.22,
  shakeRange: 6,
  shakeTime: 0.28,
  finaleBack: 0, // 6차: 피날레에 카메라를 뒤로 빼지 않음(문 커짐 2배 유지). FOV +2° 만
  finaleFov: 62, // 5차: 피날레 +2° 와 롤·대시 +3° 를 합쳐도 FOV 변화 5° 이하(광과민·멀미 규칙)
  structMargin: 0.5, // 구조물 상자 바깥 여유
  underDeck: 1.0, // 다리 밑에서는 상판 − 1m 아래
  sectionInset: 1.0,
  fadeOpacity: 0.3, // 가리는 구조물 불투명도
  fadeTime: 0.2,
  near: 0.2,
};

// ---------- 그래픽·성능 ----------
export const RENDER = {
  maxPixelRatio: 1.25,
  lowSpecPixelRatio: 1.0,
  msaaSamples: 4,
  toneMapping: 'ACESFilmic',
  exposure: 1.0,
  particlePool: 9000,
  smokePool: 2500, // 10차: 위협 불꽃 연기(웨이브마다 6~10덩이)를 함께 쓴다(1500 → 2500, 그리기 호출은 늘지 않음)
  maxSparkPx: 28,
  maxSmokePx: 90,
  streakTime: 0.05,
  streakMax: 6,
  tailMax: 10,
  sparkJitter: 0.3,
  bloom: { strength: 0.6, radius: 0.4, threshold: 1.0 },
  maxDt: 0.05,
  lowSpecParticleMult: 0.5,
  lowFpsThreshold: 28,
  lowFpsSeconds: 6,
  softwareRe: /SwiftShader|Basic Render|llvmpipe|softpipe|WARP|Software/i,
  softwareMaxWidth: 1280,
  budget: { calls: 100, tris: 250000 }, // S1 예산(점검용 기록)
  // 16차 3-4: 터치 기기 저사양 프로필(자동, 저장 안 함). 픽셀 배율 1.0·MSAA 0·블룸 끔은 lowSpec 이 하고, 여기는 그 위에 더하는 것
  mobile: { crowdMult: 0.4, decorMax: 2, maxSparkPx: 14, maxSmokePx: 45, far: 1100, fogMult: 1.3, headMinCss: 3, lineMinCss: 1.5 },
  // 16차 3-4(L3): 해상도 조절기 하나 — 메뉴 처음 2초 프레임 간격 중앙값 = 화면 주기(cap)
  res: { capSec: 2, min: 0.75, max: 1, step: 0.1, downK: 0.75, downSec: 3, upK: 0.95, upSec: 5, lock30: [31, 35], lowSec: 6 },
};

// ---------- 폭발 순간광(동시 4개 이하) ----------
export const LIGHTS = {
  count: 6, // 6차: 폭발 순간광 4 + 꽃문 점광원 2
  held: 2,
  decay: 3,
  radiusMult: 3,
  gain: 1.0,
  intensity: { threat: 0.9, curtain: 1.1, chrysanthemum: 1.0, willow: 0.8, ring: 0.8, peony: 0.7, finale: 1.2 },
  decorMult: 0.9,
};

// ---------- 광과민 안전 ----------
export const SAFETY = {
  maxFlashesPerSecond: 3,
  flashThreshold: 0.25,
  maxFlash: 0.8,
  proximity: 240,
};

// ---------- 소리 ----------
export const AUDIO = { maxVoices: 24, masterVolume: 0.7, speedOfSound: 340 };

// ---------- 장식 불꽃 모양 ----------
export const FIREWORK_TYPES = {
  chrysanthemum: { label: 'Chrysanthemum', visR: 15, k: 4, particles: 480, size: 0.5, life: [1.6, 2.3], gravity: 1.6 },
  peony: { label: 'Peony', visR: 10, k: 5, particles: 350, size: 0.45, life: [1.1, 1.6], gravity: 1.4 },
  willow: { label: 'Willow', visR: 16, k: 2.6, particles: 400, size: 0.45, life: [3.0, 3.8], gravity: 3.2 },
  ring: { label: 'Ring', visR: 14, k: 7, particles: 360, size: 0.5, life: [1.3, 1.8], gravity: 0.9 },
  finale: { label: 'Finale', visR: 22, k: 3, particles: 600, size: 0.6, life: [2.2, 3.0], gravity: 1.2 },
};

// ---------- 발사 꼬리 ----------
export const LAUNCH = {
  maxRise: 2.2,
  headSize: 1.2,
  headColor: [1.6, 1.7, 2.0],
  headStreak: 3.5,
};

// ---------- 장식 불꽃(판정 없음, 단면 밖) — 거리대별 ----------
// 거리 = 카메라에서. 단면 경계에서 8m 이상 바깥에서 터지고 불씨가 단면에 닿지 않는다(떨어지는 거리까지 계산).
export const DECOR = {
  bands: [
    { id: 'near', dist: [55, 150], rate: [0.4, 0.8], max: 3, visR: [8, 13], size: [0.35, 0.55], particles: [220, 320] },
    { id: 'mid', dist: [150, 300], rate: [0.3, 0.6], max: 3, visR: [13, 22], size: [0.7, 1.1], particles: [280, 380] },
    { id: 'far', dist: [300, 900], rate: [0.2, 0.4], max: 3, visR: [22, 40], size: [1.6, 2.6], particles: [300, 420] },
  ],
  margin: 8, // 단면 경계에서 이만큼 바깥
  camAbove: { near: [5, 25], mid: [15, 45], far: [30, 90] }, // 15차: 장식 폭발은 카메라 높이 + 이만큼 이상(띠별)
  salvo: 0.25, // 15차: near 의 25% 는 옥상 소형 연발(지붕 + 8~15m)
  yawDeg: 40,
  showWindow: 0.5, // 위협 발사와 0.5초 안에 함께 쏘는 「한 쇼」
  quiet: 0.5, // 9차: 장식 불꽃은 위협 폭발 ±0.5초 안에 터지지 않게
  showChance: 0.55,
  hdrMax: 1.4, // 11차: 장식 HDR ≤ 1.4(위협 머리 3.0 · 줄기보다 어둡게, 반짝임 필수)
  tailMax: 10,
  lowSpecParticles: 150,
  life: [2.0, 3.2],
  rise: [1.3, 2.0],
  introRate: 1.6,
  titleRate: 1.4,
  victoryRate: 2.5,
  opening: { count: 6, start: 0.4, window: 1.5 },
};

// ---------- 스테이지 ----------
// 16차 U6a: 스테이지 틀. STAGES[i] = { id, name, duration, playable, section,
//   course(코스 정의: plan·height·zones·bridges·remap·capS·length) · city(하늘·안개·등·군중·장식 색) · kit(구역 → 건물 생성기 표)
//   · choreo(간격·알 2개 비율·D 목표) · mix(위협 종류 비율) · food(HP·롤 먹이 수) · intro(시작 장면) }
// 생성기 표(kit.zones): 구역 id → 앞에서부터 해 보는 생성기 이름(끝은 늘 'base' = 강변 아파트·상가). { gen, sBelow } 는 그 s 아래에서만
//   glass = 유리 업무 빌딩(가까운 띠) · 먼 스카이라인 / lowRoof = 통로 바로 아래 옥상 / base = 강변 아파트(물가 140m 안)·아파트와 상가
// 16차 U6b: S2 Sign Alley 코스(2-2) — 구간 경계는 공통 뼈대(2-1). 16차 U7: 다리·remap 없음(강이 없는 간판 골목, alley.js)
const S2_COURSE = {
  pre: 320,
  plan: [[875, 0], [109.956, 90], [235.044, 0], [41.888, -30], [348.112, 0], [100.531, 60], [1450, 0]], // r70 · r80(s 900~942 mid) · r96, 끝 s 2,840.5
  length: 2405,
  height: [[0, 39], [680, 39], [800, 46], [1420, 46], [1560, 39], [3200, 39]], // 경사 5.2° / 4.5°
  ellipse: ELLIPSE,
  capS: [-150, 2465],
  zones: [
    { id: 'shops', name: 'Old Shop Rows', s: [-400, 543], music: 1, phase: 'early' },
    { id: 'corner', name: 'Sign Corner', s: [543, 676], rest: true, music: 0, phase: 'rest' },
    { id: 'neon', name: 'Neon Strip', s: [676, 960], music: 1, phase: 'mid' },
    { id: 'wires', name: 'Wire Lanes', s: [960, 1275], music: 2, phase: 'mid' },
    { id: 'billboard', name: 'Billboard Roofs', s: [1275, 1408], rest: true, music: 0, phase: 'rest' },
    { id: 'market', name: 'Night Market', s: [1408, 2006], music: 2, phase: 'late' },
    { id: 'plaza', name: 'Alley Plaza', s: [2006, 2099], rest: true, music: 0, phase: 'rest' },
    { id: 'finale', name: 'Finale', s: [2099, 9000], music: 3, phase: 'finale' },
  ],
  bridges: [],
};
// 16차 U8: S3 Overpass 코스(2-2) — 좌 120°(r50, rest1) · 우 45°(r60, s 1150~1197 mid) · 우 90°(r64, rest2) · 좌 45°(r80, s 2020~2083 rest3), 끝 s 2,840
//   높이 39 → 50(7.0°) → 44(4.9°) → 54(7.5°) → 42(7.2°). 셋째 직선이 첫 직선 끝에서 약 380~440m(겹침 0 검사를 모든 구간에)
const S3_COURSE = {
  pre: 320,
  plan: [[875, 0], [104.720, -120], [490.280, 0], [47.124, 45], [92.876, 0], [100.531, 90], [629.469, 0], [62.832, -45], [757.168, 0]],
  length: 2405,
  height: [[0, 39], [690, 39], [830, 50], [980, 50], [1090, 44], [1420, 44], [1540, 54], [1700, 54], [1850, 42], [3200, 42]],
  ellipse: ELLIPSE,
  capS: [-150, 2465],
  zones: [
    { id: 'ramps', name: 'Ramp Field', s: [-400, 543], music: 1, phase: 'early' },
    { id: 'loop', name: 'Loop Ramp Turn', s: [543, 676], rest: true, music: 0, phase: 'rest' },
    { id: 'stacked', name: 'Stacked Ramps', s: [676, 1000], music: 1, phase: 'mid' },
    { id: 'rail', name: 'Rail Viaduct', s: [1000, 1275], music: 2, phase: 'mid' },
    { id: 'inter', name: 'Interchange Turn', s: [1275, 1408], rest: true, music: 0, phase: 'rest' },
    { id: 'foot', name: 'Footbridges', s: [1408, 2006], music: 2, phase: 'late' },
    { id: 'toll', name: 'Toll Plaza', s: [2006, 2099], rest: true, music: 0, phase: 'rest' },
    { id: 'finale', name: 'Finale', s: [2099, 9000], music: 3, phase: 'finale' },
  ],
  bridges: [],
};
// 16차 U9: S4 Glass Canyon 코스(2-2) — 우 90°(r70, rest1) · 좌 30°(r80, s 950~992 mid) · 좌 90°(r64, rest2), 끝 s 2,840.5
//   높이 42 → 52(6.4°) → 60(6.0°) → 52(6.0°). 최저 통로 중심 42
const S4_COURSE = {
  pre: 320,
  plan: [[875, 0], [109.956, 90], [285.044, 0], [41.888, -30], [298.112, 0], [100.531, -90], [1450, 0]],
  length: 2405,
  height: [[0, 42], [680, 42], [820, 52], [1420, 52], [1540, 60], [1880, 60], [2000, 52], [3200, 52]],
  ellipse: ELLIPSE,
  capS: [-150, 2465],
  zones: [
    { id: 'office', name: 'Office Blocks', s: [-400, 543], music: 1, phase: 'early' },
    { id: 'plaza', name: 'Plaza Turn', s: [543, 676], rest: true, music: 0, phase: 'rest' },
    { id: 'canyon', name: 'Glass Canyon', s: [676, 1275], music: 2, phase: 'mid' },
    { id: 'skyturn', name: 'Sky Bridge Turn', s: [1275, 1408], rest: true, music: 0, phase: 'rest' },
    { id: 'climb', name: 'Tower Climb', s: [1408, 1880], music: 2, phase: 'late' },
    { id: 'descent', name: 'Descent', s: [1880, 2006], music: 2, phase: 'late' },
    { id: 'roof', name: 'Rooftop Pause', s: [2006, 2099], rest: true, music: 0, phase: 'rest' },
    { id: 'finale', name: 'Finale', s: [2099, 9000], music: 3, phase: 'finale' },
  ],
  bridges: [],
};
// 16차 U10: S5 Riverside Festival 코스(2-2) — 좌 60°(r100, rest1) · 우 45°(r60, s 900~947 mid) · 우 90°(r64, rest2), 끝 s 2,840.5
//   높이 39 → 46(5.2°) → 39. 다리 C(s 470, 지류 위 — 첫 직선) · D(s 2050, 본류 위 — rest3), 아랫면 17(트러스 맨 위 약 27.3 ≤ 바닥 33 − 1)
//   첫 직선은 S1 처럼 지류 물 위(x = 0, 지류 가운데 x = 30), 마지막 직선은 본류(코스를 왼쪽으로 40m 옮긴 선이 본류 가운데) — S1 강 2개 틀
const S5_COURSE = {
  pre: 320,
  plan: [[875, 0], [104.720, -60], [240.280, 0], [47.124, 45], [342.876, 0], [100.531, 90], [1450, 0]],
  length: 2405,
  height: [[0, 39], [1420, 39], [1540, 46], [1880, 46], [2000, 39], [3200, 39]],
  ellipse: ELLIPSE,
  capS: [-150, 2465],
  zones: [
    { id: 'mouth', name: 'River Mouth', s: [-400, 543], music: 1, phase: 'early' },
    { id: 'bend', name: 'River Bend', s: [543, 676], rest: true, music: 0, phase: 'rest' },
    { id: 'parks', name: 'Embankment Parks', s: [676, 1275], music: 2, phase: 'mid' },
    { id: 'bendturn', name: 'Bend Turn', s: [1275, 1408], rest: true, music: 0, phase: 'rest' },
    { id: 'apts', name: 'Apartment Embankment', s: [1408, 2006], music: 2, phase: 'late' },
    { id: 'bridgeD', name: 'Over Bridge D', s: [2006, 2099], rest: true, music: 0, phase: 'rest' },
    { id: 'finale', name: 'Barge Finale', s: [2099, 9000], music: 3, phase: 'finale' },
  ],
  bridges: [{ id: 'C', s: 470, underside: 17 }, { id: 'D', s: 2050, underside: 17 }],
};
const S1_KIT = {
  zones: { avenue: ['glass'], canyon: ['glass'], climb: [{ gen: 'glass', sBelow: remapS(380, S1_COURSE) }, 'lowRoof'], roof: ['lowRoof'] },
  roofProps: ['climb', 'roof'], // 이 구역은 지붕 높이와 상관없이 물탱크·실외기 옥상 소품
  launcherKeep: { canyon: 0.3 }, // 옥상 발사대로 쓰는 비율(없는 구역은 모두)
  landmarks: { turn1: { side: 1, kind: 'spire' }, roof: { side: -1, kind: 'board' } }, // 회전 구간 바깥쪽 랜드마크(좌 90° 바깥 = 오른쪽, 우 120° 바깥 = 왼쪽)
};
export const STAGES = [
  {
    id: 1,
    name: 'River City',
    duration: 180, // 12차: 코스 약 2,400m ÷ 전진 13.3m/s(세 새 같음) ≈ 180초
    playable: true,
    phases: [0.12, 0.8],
    section: { u: 9, v0: 2, v1: 14, v0Struct: 2 },
    course: S1_COURSE,
    city: {
      // 5차 B0: 보라 → 남색 하늘, 지평선 도시광 주황, 배경 채도·밝기를 낮춰 불꽃만 튀게
      sky: { top: 0x030817, bottom: 0x101830 },
      fog: { color: 0x0e1424, density: 0.0021 },
      cityGlow: 0x4e3018,
      groundColor: 0x08111f,
      landColor: 0x111216,
      lampColor: 0xffd6a0,
      crowd: 4000, // 12차: 둑이 길어져 4000(카메라 280m 안만 그림)
      palette: [[0.45, 0.85, 1.4], [0.78, 0.45, 1.35], [0.45, 1.25, 0.6], [1.4, 0.75, 0.3], [1.4, 0.45, 0.8], [1.3, 0.3, 0.35]], // 11차: 장식 색 제한 풂(위험은 색이 아니라 「흰 심 머리 + 흔들림 없는 실선」으로 구분, 장식은 HDR 1.4 이하·반짝임·통로 밖)
    },
    kit: S1_KIT,
    choreo: { gap: CHOREO.gap, double: CHOREO.double, dTarget: CHOREO.dTarget },
    mix: BURST.mix,
    food: { hp: FOOD.hp.n, roll: FOOD.roll.n },
    intro: { sleep: true }, // 다리 A 트러스 위에서 잠든 새 → 놀라 날아오름(s0 = 전진 × INTRO.rise × 0.5)
  },
  // 16차 U7: S2 Sign Alley(간판 골목, 1차 테마) — 낡은 상가 4~7층·간판·전봇대 전선·야시장 천막. 생성기는 alley.js(kit.style 'alley')
  {
    id: 2,
    name: 'Sign Alley',
    duration: 180,
    playable: true,
    phases: [0.12, 0.8],
    section: { u: 9, v0: 2, v1: 14, v0Struct: 2 },
    course: S2_COURSE,
    city: {
      // 2-3: 하늘 0x0a0618 / 0x2a1430, 안개 0x1a1024 밀도 0.0024, 등 0xffe0b0. 도시광은 보랏빛(붉은 주황은 위험 전용)
      sky: { top: 0x0a0618, bottom: 0x2a1430 },
      fog: { color: 0x1a1024, density: 0.0024 },
      cityGlow: 0x3a1c44,
      groundColor: 0x08111f,
      landColor: 0x15131a,
      lampColor: 0xffe0b0,
      avColor: [0.42, 0.46, 0.52], // 16차 U7b: 항공등은 차가운 흰빛(붉은 주황·진홍은 위험 전용 — 월드만 그린 화면 붉은 주황 0)
      crowd: 2500, // 2-3: 길가·광장·옥상 테라스
      palette: [[0.45, 0.85, 1.4], [0.78, 0.45, 1.35], [0.45, 1.25, 0.6], [1.4, 0.45, 0.8], [1.1, 1.15, 1.35]], // 장식 불꽃 색(붉은 주황 뺌)
    },
    kit: {
      style: 'alley',
      landmarks: { corner: { side: -1, kind: 'spire' }, billboard: { side: -1, kind: 'board' } }, // 우 90°·우 60° 바깥 = 왼쪽
      tower: { n: [1, 2] }, // 옆 탑(낡은 고층 상가) 구간마다 1~2개(S1 규칙: edge 25~60m, 지붕 = 중심 + 10~20m)
      towerKind: 6,
      alley: {
        W1: 100, W2: 230, fill: 330, crossGap: [70, 95], plazaZone: 'plaza', plazaHalf: 22, launcherKeep: 0.3, ringCars: 70,
        // 구간 느낌: signs 간판 배수 · wires 전선 배수(1.5 넘으면 다발) · stalls 천막 · roof 옥상 간판 틀 비율
        zones: {
          shops: { signs: 1.0, wires: 1.0, stalls: 0, roof: 0.25 },
          corner: { signs: 1.5, wires: 0.8, stalls: 0.35, roof: 0.5 },
          neon: { signs: 1.8, wires: 0.8, stalls: 0, roof: 0.4 },
          wires: { signs: 0.9, wires: 2.0, stalls: 0, roof: 0.2 },
          billboard: { signs: 1.2, wires: 0.8, stalls: 0, roof: 0.85 },
          market: { signs: 1.2, wires: 1.0, stalls: 1.0, roof: 0.2 },
          plaza: { signs: 1.3, wires: 0.6, stalls: 1.0, roof: 0.3 },
          finale: { signs: 1.4, wires: 1.0, stalls: 0.5, roof: 0.3 },
        },
      },
    },
    // 2-5: D 목표 early 1.5→3 · mid 3→5 · late 5→7 · finale 7→10, 간격 8~9 / 6~7 / 5~6 / 4~5, 알 2개 비율 mid·late 0.35, 좌우 쌍 0.75
    choreo: { gap: CHOREO.gap, double: { early: 0, mid: 0.35, late: 0.35, rest: 0 }, dTarget: { early: [1.5, 3], mid: [3, 5], late: [5, 7], finale: [7, 10], rest: [0, 0] }, lr: 0.75 },
    // 2-4: palm 이 처음 나오는 스테이지 — early 10%, mid·late·finale 15%(나머지는 S1 비율을 줄여 맞춤)
    mix: {
      early: { chrysL: 27, chrysM: 22.5, ring: 18, peonyS: 22.5, palm: 10 },
      mid: { chrysL: 21.25, willowL: 8.5, chrysM: 17, ring: 8.5, peonyS: 17, dahlia: 12.75, palm: 15 },
      late: { chrysL: 21.25, willowL: 8.5, chrysM: 17, ring: 4.25, peonyS: 17, dahlia: 17, palm: 15 },
      finale: { chrysL: 21.25, willowL: 12.75, chrysM: 12.75, peonyS: 21.25, dahlia: 17, palm: 15 },
    },
    food: { hp: [10, 12], roll: [12, 15] }, // 2-5: HP 먹이 [10,12], 롤 먹이 [12,15]
    intro: { sleep: false, s0: 11, flyIn: 1.5 }, // 2-6: 1.5초 날아드는 장면, s0 = 11
  },
  // 16차 U8: S3 Overpass(고가 교차로, 1차 테마) — 램프 8·15·22m 3층·고가 선로 24m·육교·톨게이트. 생성기는 overpass.js(kit.style 'overpass')
  {
    id: 3,
    name: 'Overpass',
    duration: 180,
    playable: true,
    phases: [0.12, 0.8],
    section: { u: 9, v0: 2, v1: 14, v0Struct: 2 },
    course: S3_COURSE,
    city: {
      // 2-3: 하늘 0x040a14 / 0x14202c, 안개 0x101820 밀도 0.0020, 등 0xffd08a. 도시광은 어두운 회청(붉은 주황은 위험 전용)
      // 16차 U8b(gate16s3 1-2): S1(남색)·S2(보라)와 구별되는 청회색 하늘로 한 단계 밝게 — 안개·도시광도 같은 색조(나트륨 주황 갈색 아님)
      sky: { top: 0x07131f, bottom: 0x2a3c4c },
      fog: { color: 0x17222c, density: 0.002 },
      cityGlow: 0x29343e,
      groundColor: 0x08111f,
      landColor: 0x131518,
      lampColor: 0xffd08a,
      avColor: [0.42, 0.46, 0.52], // 항공등 차가운 흰빛
      carTail: [0.075, 0.011, 0.007], brakeK: 0, // 꼬리등은 어둡게(붉은 주황 밝은 화소 0 — 위험 전용), 브레이크 번쩍임 없음
      warmWin: [1.0, 0.72, 0.42], // 따뜻한 창 빛을 노란 쪽으로(색상 30° — 붉은 주황 345°~25° 밖, 따뜻한 등 제외 띠 안)
      roGuard: true, // 건물 창·실내 그림의 붉은 주황을 호박색 쪽으로(월드만 그린 화면 붉은 주황 밝은 화소 0)
      crowd: 2000, // 2-3: 육교·고가 아래 광장
      palette: [[0.45, 0.85, 1.4], [0.78, 0.45, 1.35], [0.45, 1.25, 0.6], [1.4, 0.45, 0.8], [1.1, 1.15, 1.35]],
    },
    kit: {
      style: 'overpass',
      landmarks: { loop: { side: 1, kind: 'board' }, inter: { side: -1, kind: 'spire' } }, // 좌 120° 바깥 = 오른쪽, 우 90° 바깥 = 왼쪽
      tower: { n: [1, 2] },
      towerKind: 1,
      overpass: { fill: 330 },
    },
    // 2-5: D 목표 early 2→3.5 · mid 3.5→5.5 · late 5.5→7.5 · finale 7.5→10.5, 간격 7~8 / 6~7 / 5~6 / 4~5, 알 2개 mid 0.35 · late 0.4, 좌우 쌍 0.45(나머지 위아래 쌍 — 「층 바꾸기」)
    // 16차 U8b(gate16s3 1-3): 참새 16판 7/16(< 8판 4/8 비율) → 조정 순서대로 dTarget −0.5(모든 위협 구간)
    choreo: { gap: { early: [7, 8], mid: [6, 7], late: [5, 6], finale: [4, 5], rest: [12, 12] }, double: { early: 0, mid: 0.35, late: 0.4, rest: 0 }, dTarget: { early: [1.5, 3], mid: [3, 5], late: [5, 7], finale: [7, 10], rest: [0, 0] }, lr: 0.45, triesMax: 400 },
    // 2-4: kamuro 가 처음 나오는 스테이지 — early 10% · mid·late·finale 15%, palm 은 다음 스테이지라 10%(나머지는 S1 비율을 줄여 맞춤)
    mix: {
      early: { chrysL: 24, chrysM: 20, ring: 16, peonyS: 20, palm: 10, kamuro: 10 },
      mid: { chrysL: 18.75, willowL: 7.5, chrysM: 15, ring: 7.5, peonyS: 15, dahlia: 11.25, palm: 10, kamuro: 15 },
      late: { chrysL: 18.75, willowL: 7.5, chrysM: 15, ring: 3.75, peonyS: 15, dahlia: 15, palm: 10, kamuro: 15 },
      finale: { chrysL: 18.75, willowL: 11.25, chrysM: 11.25, peonyS: 18.75, dahlia: 15, palm: 10, kamuro: 15 },
    },
    food: { hp: [10, 12], roll: [12, 15] }, // 2-5: HP 먹이 [10,12], 롤 먹이 [12,15]
    intro: { sleep: false, s0: 11, flyIn: 1.5 },
  },
  // 16차 U9: S4 Glass Canyon(유리 협곡, 1차 테마) — 통로 양옆 25~60m 에 통로보다 10~30m 높은 유리 탑(구간마다 4~6개), 그 바깥으로 갈수록 높아지는 유리 업무 빌딩 벽,
  //   통로 아래 스카이브리지·헬리패드·크레인·LED 외벽. 생성기는 canyon.js(kit.style 'canyon')
  {
    id: 4,
    name: 'Glass Canyon',
    duration: 180,
    playable: true,
    phases: [0.12, 0.8],
    section: { u: 9, v0: 2, v1: 14, v0Struct: 2 },
    course: S4_COURSE,
    city: {
      // 2-3: 하늘 0x020614 / 0x0a1a3a, 안개 0x0a1428 밀도 0.0016, 등 0xd8ecff. 도시광은 차가운 청색(붉은 주황은 위험 전용)
      sky: { top: 0x020614, bottom: 0x0a1a3a },
      fog: { color: 0x0a1428, density: 0.0016 },
      cityGlow: 0x1e3050,
      groundColor: 0x08111f,
      landColor: 0x111419,
      lampColor: 0xd8ecff,
      avColor: [0.42, 0.46, 0.52], // 항공등 차가운 흰빛
      carTail: [0.075, 0.011, 0.007], brakeK: 0, // 꼬리등 어둡게(S3 와 같음)
      warmWin: [1.0, 0.72, 0.42], // 따뜻한 창 빛을 노란 쪽으로(색상 30°)
      roGuard: true, // 건물 창·실내 그림·유리에 비친 불꽃빛의 붉은 주황을 호박색 쪽으로(월드만 그린 화면 붉은 주황 0)
      glassTint: [0.007, 0.024, 0.028, 1], // 16차 U10(gate16s4 권고 a): 유리 몸체 짙은 청록 + 약한 층 띠(그리기 호출 늘지 않음)
      crowd: 2500, // 2-3: 광장·옥상
      palette: [[0.45, 0.85, 1.4], [0.78, 0.45, 1.35], [0.45, 1.25, 0.6], [1.4, 0.45, 0.8], [1.1, 1.15, 1.35]],
    },
    kit: {
      style: 'canyon',
      towerKind: 1,
      // 2-3 towers: 이 스테이지만 구간마다 4~6개, edge 25~60m, 지붕 = 통로 중심 + 10~30m, 회전 호에서 40m 안 금지(회전 안쪽은 두지 않음)
      tower: { n: [4, 6], edge: [25, 60], top: [10, 30], gap: 15, size: [16, 24], arcGap: 40 },
      canyon: { fill: 330, crossGap: [95, 125], ring: [125, 250] },
      farGlass: 0.7, farH: 1.6, // 원경 블록도 유리 고층 위주(먼 스카이라인)
    },
    // 2-5: D 목표 early 2→4 · mid 4→6 · late 6→8 · finale 8→11, 간격 7~8 / 5~6 / 5~6 / 4~5, 알 2개 비율 mid·late 0.4, 좌우 쌍 0.65
    choreo: { gap: { early: [7, 8], mid: [5, 6], late: [5, 6], finale: [4, 5], rest: [12, 12] }, double: { early: 0, mid: 0.4, late: 0.4, rest: 0 }, dTarget: { early: [2, 4], mid: [4, 6], late: [6, 8], finale: [8, 11], rest: [0, 0] }, lr: 0.65, triesMax: 400 },
    // 2-4: brocade 가 처음 나오는 스테이지 — early 10% · mid·late·finale 15%, palm·kamuro 는 다음 스테이지라 10%씩(나머지는 S1 비율을 줄여 맞춤)
    mix: {
      early: { chrysL: 21, chrysM: 17.5, ring: 14, peonyS: 17.5, palm: 10, kamuro: 10, brocade: 10 },
      mid: { chrysL: 16.25, willowL: 6.5, chrysM: 13, ring: 6.5, peonyS: 13, dahlia: 9.75, palm: 10, kamuro: 10, brocade: 15 },
      late: { chrysL: 16.25, willowL: 6.5, chrysM: 13, ring: 3.25, peonyS: 13, dahlia: 13, palm: 10, kamuro: 10, brocade: 15 },
      finale: { chrysL: 16.25, willowL: 9.75, chrysM: 9.75, peonyS: 16.25, dahlia: 13, palm: 10, kamuro: 10, brocade: 15 },
    },
    food: { hp: [11, 13], roll: [12, 15] }, // 2-5: HP 먹이 [11,13], 롤 먹이 [12,15]
    intro: { sleep: false, s0: 11, flyIn: 1.5 },
  },
  // 16차 U10: S5 Riverside Festival(강변 불꽃축제, 1차 테마) — S1 강 2개 틀(지류 + 본류)·트러스 다리 C·D·바지선 발사대·강변 아파트·둔치 공원·축제 군중 5,000.
  //   생성기는 riverside.js(kit.style 'riverside'). 원경 전파탑 없음, 실존 랜드마크 없음
  {
    id: 5,
    name: 'Riverside Festival',
    duration: 180,
    playable: true,
    phases: [0.12, 0.8],
    section: { u: 9, v0: 2, v1: 14, v0Struct: 2 },
    course: S5_COURSE,
    city: {
      // 2-3: 하늘 0x050412 / 0x2a1a20, 안개 0x1c1418 밀도 0.0026, 등 0xffd6a0(축제 등 — 색상 약 35°, 붉은 주황 345°~25° 밖)
      sky: { top: 0x050412, bottom: 0x2a1a20 },
      fog: { color: 0x1c1418, density: 0.0026 },
      cityGlow: 0x302840, // 보랏빛 도시광(붉은 기운이 등 빛을 붉은 주황 쪽으로 끌지 않게)
      groundColor: 0x0a1020,
      landColor: 0x121216,
      lampColor: 0xffd6a0,
      avColor: [0.42, 0.46, 0.52], // 항공등 차가운 흰빛(붉은 주황은 위험 전용)
      carTail: [0.075, 0.011, 0.007], brakeK: 0, // 꼬리등 어둡게(S3·S4 와 같음)
      warmWin: [1.0, 0.72, 0.42], // 따뜻한 창 빛을 노란 쪽으로(색상 30°)
      roGuard: true,
      crowd: 5000, // 2-3: 축제 군중 5,000(모바일 × 0.4 — RENDER.mobile.crowdMult)
      crowdR: 220, // 군중은 카메라 220m 안만 그림(5,000명이 코스 가까이 몰려 삼각형 25만 이하 — S1~S4 280m 그대로)
      bargeColor: 0x3a3c44, // 꾸민 바지선 선체(S1 0x15161b 보다 밝게 — 물 위에서 보이게)
      palette: [[0.45, 0.85, 1.4], [0.78, 0.45, 1.35], [0.45, 1.25, 0.6], [1.4, 0.45, 0.8], [1.1, 1.15, 1.35]],
    },
    kit: {
      style: 'riverside',
      towerKind: 0,
      river: { ahead: 2700 }, // 본류를 코스 끝 너머(안개 너머)까지 — 강변도로 끝이 끊기지 않게
      riverside: { fill: 330 },
    },
    // 2-5: D 목표 early 2.5→4.5 · mid 4.5→6.5 · late 6.5→8.5 · finale 8.5→12, 간격 7~8 / 5~6 / 5 / 4, 알 2개 비율 mid 0.4 · late 0.45, 좌우 쌍 0.65
    //   2-4: 피날레 close 무늬를 늘림(seq.finale — close 3웨이브 묶음이 4묶음 중 2 → 3)
    choreo: {
      gap: { early: [7, 8], mid: [5, 6], late: [5, 5], finale: [4, 4], rest: [12, 12] }, double: { early: 0, mid: 0.4, late: 0.45, rest: 0 },
      dTarget: { early: [2.5, 4.5], mid: [4.5, 6.5], late: [6.5, 8.5], finale: [8.5, 12], rest: [0, 0] }, lr: 0.65, triesMax: 400,
      seq: { finale: [['close', [3, 3]], ['zig', [1, 2]], ['close', [3, 3]], ['wave', [1, 1]], ['close', [3, 3]], ['zig', [1, 1]]] },
    },
    // 2-4: 새 종류 없이 모든 종류를 섞음 — palm·kamuro·brocade 모두 「다음 스테이지부터 10%」(나머지는 S1 비율 × 0.7)
    mix: {
      early: { chrysL: 21, chrysM: 17.5, ring: 14, peonyS: 17.5, palm: 10, kamuro: 10, brocade: 10 },
      mid: { chrysL: 17.5, willowL: 7, chrysM: 14, ring: 7, peonyS: 14, dahlia: 10.5, palm: 10, kamuro: 10, brocade: 10 },
      late: { chrysL: 17.5, willowL: 7, chrysM: 14, ring: 3.5, peonyS: 14, dahlia: 14, palm: 10, kamuro: 10, brocade: 10 },
      finale: { chrysL: 17.5, willowL: 10.5, chrysM: 10.5, peonyS: 17.5, dahlia: 14, palm: 10, kamuro: 10, brocade: 10 },
    },
    food: { hp: [11, 13], roll: [12, 15] }, // 2-5: HP 먹이 [11,13], 롤 먹이 [12,15]
    intro: { sleep: false, s0: 11, flyIn: 1.5 },
  },
];
export const PLAYABLE = STAGES.filter((s) => s.playable).length;

// ---------- 간판(가상 일반명사만, 실제 상호 없음) ----------
export const SIGNS = {
  font: 'BvfSign', // Black Han Sans(OFL) 서브셋을 이름 바꿔 넣음
  texts: ['치킨', '호프', '노래방', '약국', '편의점', '분식', '국밥', '커피', '숯불갈비', '꽃집', '세탁', '부동산', '24시 해장국', '한식뷔페', '당구장', 'PC방'],
  neon: ['#4fe3ff', '#b07dff', '#7dff6a', '#e8f0ff'], // 6차: 간판은 시안·보라·초록·흰색(붉은 주황은 위험 전용)
};

// ---------- 15차 엔딩 문구(영어) — 핵심 문구 하나는 고정, 변주는 섞은 순서대로 하나씩(셔플 백). 숫자·사건명 없음 ----------
export const ENDING_CORE = 'Firework noise startles sleeping birds into the night sky.';
// 17차: 변주 문구는 40자 이하 한 줄(tools/lines-test.mjs 가 잰다). 핵심 문구가 주인공이고 변주는 그 아래 보조 한 줄
export const ENDING_LINE_MAX = 40;
export const FALL_LINES = [
  'You were asleep. Then the show started.',
  'The crowd cheered. Not for you.',
  "Many birds can't see in the dark.",
  'Woke up. Flew up. Fell down.',
  "The show goes on. You don't.",
  'Well done. Extra crispy.',
  'Short show for them. Long night for you.',
  'Startled birds take off without looking.',
  'Scared birds can hit wires at night.',
  'Scared flocks scatter from their roosts.',
  'Somewhere tonight, a roost is empty.',
];
export const CLEAR_LINES = [
  'You made it. Not every bird does.',
  "You survived. It's back next year.",
  "The smoke clears. You're still here.",
  'The crowd cheered. You just survived.',
  'You flew all night. Time to sleep.',
  'Every bird in the city is awake.',
  "The show is over. Your heart isn't.",
  'Quieter fireworks exist. Just saying.',
  'Applause for the show. None for you.',
  'Safe at last. Home is still far away.',
];