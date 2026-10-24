// 키보드 입력. event.key 가 아니라 event.code 를 쓴다 — 한글 입력 상태에서도 WASD 가 그대로 동작한다.
// 16차 3-1: 터치 — 떠다니는 스틱(touchAxis)과 화면 버튼(virtualPress: ROLL → 'Space', II → 'Escape').
//   axis() 는 키보드 축이 0 이 아니면 키보드 축, 0 이면 터치 축. 터치 모드는 pointerType 'touch' 인 첫 입력에서 켜지고 키 입력이 오면 꺼진다.
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown']);

// 스틱 수치(CSS px): 데드존 8, 최대 56 에서 1.0, 사이는 선형. 방향은 정규화
export const STICK = { dead: 8, max: 56 };

// 손가락이 중심에서 (dx, dy)(화면 좌표, 아래가 +) 만큼 떨어졌을 때의 축 { x, y }(위가 +)
export function stickAxis(dx, dy) {
  const L = Math.hypot(dx, dy);
  if (L <= STICK.dead) return { x: 0, y: 0 };
  const m = Math.min(1, (L - STICK.dead) / (STICK.max - STICK.dead));
  return { x: (dx / L) * m, y: (-dy / L) * m };
}

function isTyping(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export class Input {
  constructor({ touch = false } = {}) {
    this.down = new Set();
    this.pressed = new Set();
    this.touchAxis = { x: 0, y: 0 };
    this.touchMode = !!touch;
    this.onTouchMode = null; // (on) => {} — 터치 모드가 바뀔 때
    this.stick = null; // { id, ox, oy, x, y } 스틱을 잡은 손가락
    window.addEventListener('keydown', (e) => this.onKeyDown(e), { passive: false });
    window.addEventListener('keyup', (e) => this.down.delete(e.code));
    window.addEventListener('blur', () => {
      this.down.clear();
      this.releaseStick();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.releaseStick();
    });
    window.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') this.setTouchMode(true);
    }, true);
  }

  setTouchMode(on) {
    on = !!on;
    if (on === this.touchMode) return;
    this.touchMode = on;
    if (!on) this.releaseStick();
    if (this.onTouchMode) this.onTouchMode(on);
  }

  onKeyDown(e) {
    if (isTyping(e.target)) return; // 닉네임 입력 중에는 게임 키를 받지 않는다(가상 키보드도 터치 모드를 끄지 않게)
    this.setTouchMode(false);
    if (SCROLL_KEYS.has(e.code)) e.preventDefault(); // 방향키·Space 로 페이지가 스크롤되지 않게
    if (!e.repeat) this.pressed.add(e.code);
    this.down.add(e.code);
  }

  // 화면 버튼: 키를 한 번 누른 것과 같다(다음 프레임에 consume)
  virtualPress(code) {
    this.pressed.add(code);
  }

  // 스틱 영역·고리를 붙인다. zone = 손가락을 받는 영역, ring = 바깥 고리(112px), knob = 안쪽 고리(44px)
  bindStick(zone, ring, knob) {
    this.stickEls = { zone, ring, knob };
    const down = (e) => {
      if (this.stick) return; // 스틱은 첫 손가락 하나만
      e.preventDefault();
      try { zone.setPointerCapture(e.pointerId); } catch { /* 이미 놓은 손가락 */ }
      this.stick = { id: e.pointerId, ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY };
      this._stickUpdate();
    };
    const move = (e) => {
      const s = this.stick;
      if (!s || e.pointerId !== s.id) return;
      e.preventDefault();
      s.x = e.clientX;
      s.y = e.clientY;
      // 손가락이 최대 거리 밖으로 나가면 중심이 끌려온다
      const dx = s.x - s.ox, dy = s.y - s.oy;
      const L = Math.hypot(dx, dy);
      if (L > STICK.max) {
        const k = (L - STICK.max) / L;
        s.ox += dx * k;
        s.oy += dy * k;
      }
      this._stickUpdate();
    };
    const up = (e) => {
      if (this.stick && e.pointerId === this.stick.id) this.releaseStick();
    };
    zone.addEventListener('pointerdown', down);
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerup', up);
    zone.addEventListener('pointercancel', up);
    zone.addEventListener('lostpointercapture', up);
  }

  // 버튼: 누르는 순간(pointerdown) 키 한 번. 클릭·초점·확대가 생기지 않게 막는다
  bindButton(el, code) {
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.virtualPress(code);
      el.classList.remove('press');
      void el.offsetWidth;
      el.classList.add('press');
    });
    el.addEventListener('click', (e) => e.preventDefault());
  }

  releaseStick() {
    this.stick = null;
    this.touchAxis = { x: 0, y: 0 };
    this._stickDraw();
  }

  _stickUpdate() {
    const s = this.stick;
    this.touchAxis = s ? stickAxis(s.x - s.ox, s.y - s.oy) : { x: 0, y: 0 };
    this._stickDraw();
  }

  _stickDraw() {
    const E = this.stickEls;
    if (!E) return;
    const s = this.stick;
    E.ring.classList.toggle('on', !!s);
    E.knob.classList.toggle('on', !!s);
    if (!s) {
      E.ring.style.transform = '';
      E.knob.style.transform = '';
      return;
    }
    const dx = s.x - s.ox, dy = s.y - s.oy;
    const L = Math.hypot(dx, dy);
    const k = L > STICK.max ? STICK.max / L : 1;
    E.ring.style.transform = `translate(${s.ox.toFixed(1)}px, ${s.oy.toFixed(1)}px) translate(-50%, -50%)`;
    E.knob.style.transform = `translate(${(s.ox + dx * k).toFixed(1)}px, ${(s.oy + dy * k).toFixed(1)}px) translate(-50%, -50%)`;
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
    if (x || y) return { x, y };
    const t = this.touchAxis;
    return { x: t.x, y: t.y };
  }

  clearPressed() {
    this.pressed.clear();
  }

  endFrame() {
    this.pressed.clear();
  }
}
