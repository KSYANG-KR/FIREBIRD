// 시작점: WebGL·터치 기기 확인 → 렌더러·입력·소리·화면·게임을 만들고 매 프레임 돌린다.
import './style.css';
import { hasWebGL, Renderer } from './renderer.js';
import { Input } from './input.js';
import { Sound } from './audio.js';
import { UI } from './ui.js';
import { Game } from './game.js';
import { settings } from './settings.js';
import { loadAssets } from './assets.js';

const uiRoot = document.getElementById('ui');

function isTouchOnly() {
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const fine = window.matchMedia && window.matchMedia('(any-pointer: fine)').matches;
  return !!coarse && !fine;
}

if (!hasWebGL()) {
  uiRoot.innerHTML = `<div id="screen"><div class="panel"><h1>Birds vs Fireworks</h1>
    <p>이 브라우저(또는 컴퓨터)에서는 3D 그래픽(WebGL)을 쓸 수 없어 게임을 열 수 없습니다.</p>
    <p>최신 크롬·엣지·파이어폭스에서 열거나, 브라우저 설정의 「하드웨어 가속 사용」을 켜 보세요.</p></div></div>`;
} else {
  const input = new Input();
  const renderer = new Renderer(document.getElementById('canvas-wrap'), settings);
  const sound = new Sound(settings);
  let game = null;
  const ui = new UI(uiRoot, (act, data) => game && game.onAction(act, data));
  game = new Game({ renderer, input, sound, ui, settings, touch: isTouchOnly() });

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
  requestAnimationFrame(loop);
}
