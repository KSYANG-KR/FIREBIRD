// 시작점: WebGL·터치 기기 확인 → 렌더러·입력·소리·화면·게임을 만들고 매 프레임 돌린다.
import './style.css';
import { hasWebGL, Renderer } from './renderer.js';
import { Input } from './input.js';
import { Sound } from './audio.js';
import { UI } from './ui.js';
import { Game } from './game.js';
import { settings, forceLowSpec } from './settings.js';
import { loadAssets } from './assets.js';

const uiRoot = document.getElementById('ui');

// 15차: 제목 글꼴 Anton(SIL OFL 1.1, public/assets/fonts). 경로는 BASE_URL 기준(하위 주소에서도 깨지지 않게). 못 읽으면 Impact·Arial Black
try {
  const BASE = (import.meta.env && import.meta.env.BASE_URL) || './';
  const ff = new FontFace('Anton', `url(${BASE}assets/fonts/Anton-Latin.woff2) format('woff2')`);
  document.fonts.add(ff);
  ff.load().catch(() => {});
} catch {
  // 글꼴 없이도 게임은 돈다
}

function isTouchOnly() {
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const fine = window.matchMedia && window.matchMedia('(any-pointer: fine)').matches;
  return !!coarse && !fine;
}

if (!hasWebGL()) {
  uiRoot.innerHTML = `<div id="screen"><div class="panel"><h1>Firework Survival</h1>
    <p>This browser cannot show 3D graphics (WebGL).</p>
    <p>Try the latest Chrome, Edge or Firefox, and turn on hardware acceleration.</p></div></div>`;
} else {
  const touchOnly = isTouchOnly();
  const input = new Input({ touch: touchOnly });
  // 16차 3-4: 터치 기기는 저사양 프로필로 자동 시작(저장하지 않음)
  if (touchOnly) forceLowSpec();
  const renderer = new Renderer(document.getElementById('canvas-wrap'), settings, { mobile: touchOnly });
  const sound = new Sound(settings);
  let game = null;
  const ui = new UI(uiRoot, (act, data) => game && game.onAction(act, data));
  game = new Game({ renderer, input, sound, ui, settings, touch: touchOnly, mobile: touchOnly });
  // 16차 3-2: 3D 화면 자리(검은 띠가 있으면 위치)를 글 화면에 알린다(화면 밖 위협 빛 위치)
  const view = () => { ui.view = renderer.viewTop > 0 ? { top: renderer.viewTop, h: renderer.height } : null; };
  view();
  renderer.onResize.push(view);

  // 16차 3-1: 터치 모드(html.touch) — 터치 조작·안내 문구를 켜고 끈다. 스틱은 왼쪽 영역, ROLL → Space, II → Escape
  const setTouch = (on) => {
    document.documentElement.classList.toggle('touch', on);
    game.touch = on;
  };
  setTouch(input.touchMode);
  input.onTouchMode = setTouch;
  input.bindStick(ui.tc.zone, ui.tc.ring, ui.tc.knob);
  input.bindButton(ui.tc.roll, 'Space');
  input.bindButton(ui.tc.pause, 'Escape');

  // 16차 3-3: 소리 — 누르고 떼고 키를 칠 때마다(그 처리 안에서 동기로) 꺼져 있으면 다시 켠다. 일시정지 중에는 그대로 둔다
  // (화면으로 돌아온 뒤에도 다음 터치에서 다시 켜진다)
  const unlock = () => {
    if (!game.paused) sound.unlock();
  };
  for (const t of ['pointerdown', 'pointerup', 'keydown']) window.addEventListener(t, unlock, true);
  // 16차 3-2: 길게 누름 메뉴·iOS 두 손가락 확대 막기
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  // 실사 그래픽 에셋(원경 사진·외벽·연기·반사 환경맵)을 불러온다. 그동안·실패 시에는 코드 그래픽으로 돈다.
  ui.setLoading(0);
  loadAssets(renderer.renderer, (p, failed) => ui.setLoading(p, failed)).then((a) => game.useAssets(a));

  // 탭을 가리면 자동 일시정지
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) game.onHidden();
  });
  window.addEventListener('blur', () => game.onHidden());

  let last = performance.now();
  const loop = (now) => {
    const dt = Math.min(0.25, Math.max(0, (now - last) / 1000));
    last = now;
    game.frame(dt, now / 1000);
    requestAnimationFrame(loop);
  };
  // 16차: 개발 모드에서 주소 끝에 ?step=1 이면 rAF 를 돌리지 않는다 — 회귀 하네스(tools/harness)가 __bvf.frame(1/60, t) 으로 한 프레임씩 진행
  const STEP = !!(import.meta.env && import.meta.env.DEV) && new URLSearchParams(location.search).get('step') === '1';
  if (!STEP) requestAnimationFrame(loop);
}
