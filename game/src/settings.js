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
    return { ...defaults, ...saved };
  } catch {
    return { ...defaults };
  }
}

export const settings = load();

export function saveSettings() {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    // 저장 공간을 쓸 수 없어도 게임은 계속한다
  }
}
