// 옵션(흔들림 줄이기·저사양·소리)을 이 브라우저에 기억한다.
const KEY = 'bvf.settings.v1';

export const systemPrefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const defaults = {
  reduceMotion: systemPrefersReducedMotion, // 운영체제 「애니메이션 줄이기」가 켜져 있으면 처음부터 켬
  bloom: true, // 빛 번짐(블룸). 끄면 가벼워진다
  lowSpec: false, // 블룸 끄기 + 불씨 절반 + 픽셀 배율 1
  sound: true,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaults };
    const saved = JSON.parse(raw);
    // 15차: 옵션 3개(빛 번짐은 Low Graphics 에 합침). 옛 bloom=false 는 처음 한 번 Low Graphics=on 으로 옮긴다(다시 끌 수 있음)
    if (saved.bloom === false && !saved.bloomMoved) {
      saved.lowSpec = true;
      saved.bloomMoved = true;
      try { localStorage.setItem(KEY, JSON.stringify({ ...defaults, ...saved, bloom: true })); } catch { /* 저장 못 해도 계속 */ }
    }
    return { ...defaults, ...saved, bloom: true };
  } catch {
    return { ...defaults };
  }
}

export const settings = load();

// 16차 3-4: 터치 기기는 저사양으로 자동 시작하되 저장하지 않는다(사용자가 Low Graphics 를 직접 바꾸면 그때부터 그 값을 저장)
let forcedLow = null; // 강제로 켰을 때 원래 저장값
export function forceLowSpec() {
  if (settings.lowSpec) return;
  forcedLow = false;
  settings.lowSpec = true;
}
export function userSetLowSpec() {
  forcedLow = null;
}

export function saveSettings() {
  try {
    const out = forcedLow === null ? settings : { ...settings, lowSpec: forcedLow };
    localStorage.setItem(KEY, JSON.stringify(out));
  } catch {
    // 저장 공간을 쓸 수 없어도 게임은 계속한다
  }
}
