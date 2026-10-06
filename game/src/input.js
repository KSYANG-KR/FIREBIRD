// 키보드 입력. event.key 가 아니라 event.code 를 쓴다 — 한글 입력 상태에서도 WASD 가 그대로 동작한다.
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown']);

function isTyping(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export class Input {
  constructor() {
    this.down = new Set();
    this.pressed = new Set();
    window.addEventListener('keydown', (e) => this.onKeyDown(e), { passive: false });
    window.addEventListener('keyup', (e) => this.down.delete(e.code));
    window.addEventListener('blur', () => this.down.clear());
  }

  onKeyDown(e) {
    if (isTyping(e.target)) return; // 닉네임 입력 중에는 게임 키를 받지 않는다
    if (SCROLL_KEYS.has(e.code)) e.preventDefault(); // 방향키·Space 로 페이지가 스크롤되지 않게
    if (!e.repeat) this.pressed.add(e.code);
    this.down.add(e.code);
  }

  isDown(code) {
    return this.down.has(code);
  }

  // 이번 프레임에 새로 눌렸으면 true (한 번만)
  consume(...codes) {
    for (const c of codes) {
      if (this.pressed.has(c)) {
        this.pressed.delete(c);
        return true;
      }
    }
    return false;
  }

  axis() {
    const d = this.down;
    const x = (d.has('ArrowRight') || d.has('KeyD') ? 1 : 0) - (d.has('ArrowLeft') || d.has('KeyA') ? 1 : 0);
    const y = (d.has('ArrowUp') || d.has('KeyW') ? 1 : 0) - (d.has('ArrowDown') || d.has('KeyS') ? 1 : 0);
    return { x, y };
  }

  clearPressed() {
    this.pressed.clear();
  }

  endFrame() {
    this.pressed.clear();
  }
}
