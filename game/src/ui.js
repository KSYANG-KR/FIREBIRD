// 화면 위 글자·버튼(HTML): 시작 화면, 새 선택, 숨 고르기, 엔딩, 랭킹, 게임 중 정보(HUD).
import { BIRDS, BIRD_ORDER, POPUP, ROLL, STAGES, SCORING } from './config.js';
import { displayName } from './ranking.js';

// 17차 U2: iPhone 무음 안내는 iOS 기기에서만
const IOS = typeof navigator !== 'undefined' && (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`; // 15차: m:ss
}

export function birdIcon(id) {
  const b = BIRDS[id] || BIRDS.sparrow;
  return `<span class="bird-icon" style="--c:${b.color}" title="${esc(b.name)}">${esc(b.name[0])}</span>`;
}

// 17차 U2: 숫자 없이 막대만(SPEED · HP · HITBOX)
function stat(label, value, max) {
  const pct = Math.round((value / max) * 100);
  return `<div class="stat"><span>${label}</span><div class="bar"><i style="width:${pct}%"></i></div></div>`;
}

export class UI {
  constructor(root, onAction) {
    this.root = root;
    this.onAction = onAction;
    root.innerHTML = `
      <div id="border"></div>
      <div id="hud" class="hidden">
        <div class="hud-tl"><div class="progress"><i></i></div><div class="phase"></div></div>
        <div class="hud-tc"><div class="score"></div><div class="combo"><b class="cnum"></b><span class="cmul"></span></div><div class="judge"></div><div class="foodpop"></div></div>
        <div class="hud-bl"><div class="hp-label"></div><div class="hpbar"><i></i><em></em></div></div>
        <div class="hud-bc only-kb">
          <div class="special roll"><span class="key">SPACE</span><span class="roll-name">ROLL</span><div class="gems">${'<b></b>'.repeat(ROLL.max)}</div></div>
        </div>
        <div class="tc only-touch">
          <div class="tc-zone"></div>
          <div class="tc-ring"></div><div class="tc-knob"></div>
          <button class="tc-roll" type="button" aria-label="Roll"><span>ROLL</span><div class="tc-gems">${Array.from({ length: ROLL.max }, (_, i) => `<b style="--a:${(-60 + i * 30)}deg"></b>`).join('')}</div></button>
          <button class="tc-pause" type="button" aria-label="Pause">II</button>
          <div class="tc-hint hidden"><div class="h-stick"><i class="finger"></i><span>Drag to fly</span></div><div class="h-roll"><i class="finger"></i><span>Roll</span></div><div class="h-pause"><span>Pause</span></div></div>
        </div>
      </div>
      <div id="vignette"></div>
      <div id="pops"></div>
      <div id="edges"></div>
      <div id="hint" class="hidden"></div>
      <div id="arrows"></div>
      <div id="wow" class="hidden">WOOOO!</div>
      <div id="toast"></div>
      <div id="banner" class="hidden"><div class="b-title"></div><div class="b-sub"></div></div>
      <div id="intro-text" class="hidden"></div>
      <div id="fps"></div>
      <div id="loading" class="hidden"><span>0%</span><div class="lbar"><i></i></div></div>
      <div id="dev" class="hidden"></div>
      <div id="notice" class="hidden"></div>
      <div id="screen" class="hidden"></div>
      <div id="pause" class="hidden"></div>
      <div id="fade"></div>
      <div id="stage-loading" class="hidden"><span></span></div>
      <div id="rotate" class="hidden"><div class="panel rotate-panel">
        <div class="rot-icon" aria-hidden="true"></div>
        <p>Rotate to landscape.</p>
        <small class="rot-sub">Rotation lock must be off.</small>
        <div class="buttons"><button data-act="quit">MENU</button></div>
      </div></div>
    `;
    this.$ = (sel) => root.querySelector(sel);
    this.hud = this.$('#hud');
    this.screen = this.$('#screen');
    this.pause = this.$('#pause');
    this.border = this.$('#border');
    this.wowEl = this.$('#wow');
    this.toastEl = this.$('#toast');
    this.arrowsEl = this.$('#arrows');
    this.fpsEl = this.$('#fps');
    this.bannerEl = this.$('#banner');
    this.introEl = this.$('#intro-text');
    this.arrowPool = [];
    this.hudCache = {};
    this.popsEl = this.$('#pops');
    this.pops = []; // 11차 새 옆 팝업 글자
    this.popXY = null;
    this.clock = () => performance.now(); // 11차: 팝업 시계(게임이 게임 시각으로 바꿔 끼움 — 일시정지·점검 단계 진행과 맞게)
    // 16차 3-1: 터치 조작 부품(input.js 가 붙인다)
    this.tc = { zone: this.$('.tc-zone'), ring: this.$('.tc-ring'), knob: this.$('.tc-knob'), roll: this.$('.tc-roll'), pause: this.$('.tc-pause'), hint: this.$('.tc-hint') };
    this.rotateEl = this.$('#rotate');
    this.view = null; // 16차 3-2: 3D 화면 자리 { top, h }(4:3 보다 좁으면 위아래 검은 띠) — 렌더러가 알려 준다
    // 16차 3-2: 가상 키보드가 이름 칸을 가리지 않게 — 보이는 높이(visualViewport)만큼 판을 올린다
    if (typeof window !== 'undefined' && window.visualViewport) {
      const vv = window.visualViewport;
      const fit = () => {
        const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        root.style.setProperty('--kb', `${Math.round(kb)}px`);
        const a = document.activeElement;
        if (kb > 40 && a && a.id === 'nick') {
          try { a.scrollIntoView({ block: 'center' }); } catch { /* 그만 */ }
        }
      };
      vv.addEventListener('resize', fit);
      vv.addEventListener('scroll', fit);
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-act]');
      if (!el || !root.contains(el)) return;
      if (el.tagName === 'BUTTON') el.blur(); // 버튼에 초점이 남아 Space 로 다시 눌리지 않게
      this.onAction(el.dataset.act, { ...el.dataset });
    });
    root.addEventListener('change', (e) => {
      const el = e.target;
      if (el.dataset && el.dataset.opt) {
        this.onAction('opt', { key: el.dataset.opt, value: el.checked });
        el.blur();
      }
    });
    root.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = root.querySelector('#nick');
      if (input) this.onAction('register', { name: input.value });
    });
  }

  // ---------- 화면(메뉴) ----------
  _show(html, cls = '') {
    this.screen.className = cls;
    this.screen.innerHTML = html;
  }

  hideGpuNotice() {
    const el = this.root.querySelector('#gpu-note');
    if (el) el.remove();
  }

  hideScreen() {
    this.screen.className = 'hidden';
    this.screen.innerHTML = '';
  }

  // 15차: 옵션은 3개만(Sound · Reduce Motion · Low Graphics). 빛 번짐은 Low Graphics 에 합침
  options(settings) {
    const box = (key, label) =>
      `<label class="opt"><input type="checkbox" data-opt="${key}" ${settings[key] ? 'checked' : ''}/> <span>${label}</span></label>`;
    return `<div class="options">
      ${box('sound', 'Sound')}
      ${box('reduceMotion', 'Reduce Motion')}
      ${box('lowSpec', 'Low Graphics')}
      ${IOS ? '<div class="opt-touch">iPhone: turn off silent mode for sound.</div>' : ''}
    </div>`;
  }

  // 순위 목록 한 벌(TOP 10). 이름 규칙에 맞지 않는 옛 이름은 표시만 "Player". 15차까지 옛 기록(legacy)은 "v15" 작은 표시
  // highlight = 내 기록 id(문자열) 또는 id 집합(Set)
  rankList(entries, highlight = null) {
    if (!entries.length) return '<div class="rank-empty">No records yet.</div>';
    const mine = (id) => (highlight instanceof Set ? highlight.has(id) : id === highlight);
    return `<table class="rank-table"><tr><th>#</th><th>NAME</th><th>SCORE</th><th title="Retries">↺</th></tr>${entries
      .map((e, i) => `<tr class="${mine(e.id) ? 'me' : ''}"><td>${i + 1}</td><td>${birdIcon(e.bird)} ${esc(displayName(e.name))}</td><td>${e.score.toLocaleString()}</td><td>${e.continues}</td></tr>`)
      .join('')}</table>`;
  }

  // 16차 4-6: TOP 10 탭 — [FULL RUN](안에 NO RETRY 기본 / ALL) · [S1]~[S5](안에 RUN 기본 / PRACTICE)
  rankTabs(tabs) {
    const t = tabs || { tab: '1', sub: 'run' };
    const b = (act, attrs, label, on) => `<button class="rtab ${on ? 'on' : ''}" data-act="${act}" ${attrs}>${label}</button>`;
    const st = STAGES.map((s) => b('rank-tab', `data-tab="${s.id}"`, `S${s.id}`, t.tab === String(s.id))).join('');
    const top = `<div class="rank-tabs">${b('rank-tab', 'data-tab="full"', 'FULL RUN', t.tab === 'full')}${st}</div>`;
    const subs = t.tab === 'full'
      ? [['clean', 'NO RETRY'], ['all', 'ALL']]
      : [['run', 'RUN'], ['practice', 'PRACTICE']];
    const sub = `<div class="rank-subs">${subs.map(([k, label]) => b('rank-tab', `data-tab="${t.tab}" data-sub="${k}"`, label, t.sub === k)).join('')}</div>`;
    return top + sub;
  }

  // ---------- 15차 C-2: 전체 화면 타이틀 ----------
  // animate = 이 페이지에서 처음(연출) / false = 일시정지 Quit 으로 돌아옴(마지막 장면 그대로)
  showTitle({ settings, touch, gpuWarn = false, animate = true, reduceMotion = false }) {
    const letters = (word) => [...word].map((c, i) => `<span class="tl" style="--i:${i}">${c}</span>`).join('');
    this._show(`
      <div class="title-full ${animate ? 'anim' : 'still'} ${reduceMotion ? 'rm' : ''}" data-act="title-go">
        <div class="t-fade"></div>
        <div class="t-block">
          <div class="t-line t1 game-title">${letters('FIREWORK')}</div>
          <div class="t-line t2 game-title">${letters('SURVIVAL')}</div>
          <div class="t-sub">Fun for people. A nightmare for birds.</div>
          <div class="t-load"><div class="t-lbar"><i></i></div><span>0%</span></div>
          <div class="t-press"><span class="only-kb">PRESS ANY KEY</span><span class="only-touch">TAP TO START</span></div>
        </div>
        ${gpuWarn ? `<div class="gpu-note" id="gpu-note"><b>Turn on hardware acceleration, then restart Chrome.</b>
          <div class="gpu-row"><code>chrome://settings/system</code><button data-act="gpu-copy">COPY</button><button data-act="gpu-close">CLOSE</button></div></div>` : ''}
        <div class="t-warn">⚠ Flashing lights. Don't play if you have photosensitive epilepsy.</div>
      </div>`, 'screen-title');
    this.fitTitle();
    this.setLoading(this._loadP ?? 0);
    if (!this._fitOn) {
      this._fitOn = true;
      window.addEventListener('resize', () => this.fitTitle());
    }
  }

  // 제목 두 줄이 창 폭의 약 85% 를 채우게(높이는 창의 70% 안). FIREWORK 는 글자 크기로, SURVIVAL 은 작은 글자 + 넓은 자간으로 같은 폭
  fitTitle() {
    const t1 = this.root.querySelector('.title-full .t1');
    const t2 = this.root.querySelector('.title-full .t2');
    if (!t1 || !t2) return;
    const W = window.innerWidth, H = window.innerHeight;
    const c = this._mc || (this._mc = document.createElement('canvas').getContext('2d'));
    const fam = getComputedStyle(t1).fontFamily;
    c.font = `100px ${fam}`;
    const w1 = c.measureText('FIREWORK').width / 100;
    const w2 = c.measureText('SURVIVAL').width / 100;
    const target = W * 0.85;
    let f1 = target / w1;
    const f2r = 0.66;
    // 16차 3-2: 낮은 화면(휴대폰 가로)은 제목이 부제·TAP TO START·경고 줄과 겹치지 않게 높이의 40% 까지
    f1 = Math.min(f1, (H * (H <= 500 ? 0.4 : 0.7)) / (0.95 * (1 + f2r)));
    const f2 = f1 * f2r;
    const tw = f1 * w1;
    const ls = Math.max(0, (tw - f2 * w2) / 8);
    t1.style.fontSize = `${f1.toFixed(1)}px`;
    t2.style.fontSize = `${f2.toFixed(1)}px`;
    t2.style.letterSpacing = `${ls.toFixed(1)}px`;
    t2.style.marginRight = `${(-ls).toFixed(1)}px`;
    this.titleFit = { W, H, f1: +f1.toFixed(1), f2: +f2.toFixed(1), widthFrac: +(tw / W).toFixed(3) };
  }

  // ---------- 새 고르기 ----------
  // 16차 2-6: 스테이지 칩 한 줄 — [1] FULL RUN(기본) / [2]~[5] PRACTICE. 잠긴 칩은 자물쇠 + "Clear stage N−1", 아직 없는 스테이지는 "Coming soon"
  stageChips(stages, sel) {
    if (!stages || !stages.length) return '';
    const chip = (s) => {
      const ok = s.unlocked && s.playable;
      // 17차 U2: 칩에는 숫자만. 잠긴 칩은 자물쇠 + 작은 「Clear S1」, 아직 없는 스테이지는 흐린 칩. 고른 칩의 종류(FULL RUN / PRACTICE)는 줄 오른쪽 한 단어
      const sub = !s.unlocked ? `<span><i class="lock" aria-hidden="true"></i>Clear S${s.id - 1}</span>` : '';
      return `<button class="schip ${s.id === sel ? 'on' : ''} ${ok ? '' : 'locked'} ${s.playable ? '' : 'soon'}" data-act="stage" data-stage="${s.id}" ${ok ? '' : 'disabled'} title="${esc(s.name)}"><b>${s.id}</b>${sub}</button>`;
    };
    return `<div class="stage-row"><span class="sr-label">STAGE</span><div class="schips">${stages.map(chip).join('')}</div><span class="sr-kind">${sel === 1 ? 'FULL RUN' : 'PRACTICE'}</span></div>`;
  }

  showSelect({ selected, best = 0, top = [], tabs = null, settings, showTop = false, showOpts = false, stages = null, selStage = 1 }) {
    const maxL = Math.max(...BIRD_ORDER.map((id) => BIRDS[id].lateral)), maxH = Math.max(...BIRD_ORDER.map((id) => BIRDS[id].hp));
    const maxR = Math.max(...BIRD_ORDER.map((id) => BIRDS[id].radius));
    const cards = BIRD_ORDER.map((id) => {
      const b = BIRDS[id];
      return `<button class="bird-card ${id === selected ? 'sel' : ''}" data-act="pick" data-bird="${id}">
        <div class="bc-head">${birdIcon(id)}<b>${esc(b.name)}</b></div>
        <div class="bc-tag">${esc(b.role)}</div>
        ${stat('SPEED', b.lateral, maxL)}
        ${stat('HP', b.hp, maxH)}
        ${stat('HITBOX', b.radius, maxR)}
      </button>`;
    }).join('');
    this._show(`
      <div class="panel select-panel">
        ${showOpts ? this.options(settings) : ''}
        <div class="cards">${cards}</div>
        ${this.stageChips(stages, selStage)}
        <div class="sel-row">
          <div class="best">BEST <b>${best.toLocaleString()}</b> <button class="small" data-act="top">TOP 10</button>
            <button class="gear ${showOpts ? 'on' : ''}" data-act="gear" title="Options" aria-label="Options">⚙</button></div>
          <button class="primary fly" data-act="fly">FLY</button>
        </div>
        ${showTop ? `<div class="top-box">${this.rankTabs(tabs)}${this.rankList(top)}<div class="opt-note">Saved on this device.</div></div>` : ''}
        <div class="keys only-kb"><span><kbd>WASD</kbd>/<kbd>←↑→↓</kbd> Move</span><span><kbd>SPACE</kbd> Roll</span><span><kbd>ESC</kbd> Pause</span><span><kbd>M</kbd> Sound</span></div>
      </div>`, 'screen-select');
  }

  // 17차 U1 추락 결과: 갈색 판 없이 통닭 장면 위, 아래에서 올라오는 그러데이션 위에 글. 주인공은 핵심 문구(Anton) 하나.
  //   YOU FELL(0) → 핵심(0.3) → 변주 한 줄(0.9) → 기록(1.4) → 버튼(1.7), 각 0.3초 서서히. 키를 누르면 바로 전부
  //   기록 = 진행 막대 + % + SCORE(비행 시간·Hits 는 뺌). 휴대폰 가로는 기록을 머리말 옆에, 이름 칸·SAVE 는 버튼 줄 오른쪽(style.css)
  // 16차 2-6: cont = CONTINUE(작은 「S2」) + START OVER, 아니면 TRY AGAIN. canSave = 지금까지 깬 스테이지 기록 저장(선택, 이름 칸에 커서가 있을 때만 Enter = SAVE)
  showEnding({ joke, fact, progress = 0, score, cont = false, stageN = 1, canSave = false }) {
    let last = '';
    try { last = localStorage.getItem('bvf.lastName') || ''; } catch { /* 없으면 빈 칸 */ }
    const save = canSave ? `<form class="register save-stages" autocomplete="off">
            <div class="row"><input id="nick" maxlength="24" placeholder="NAME" aria-label="Name" value="${esc(last)}" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"/><button type="submit">SAVE</button></div>
            <div class="reg-msg"></div>
          </form>` : '';
    const enter = '<small class="kb-enter only-kb" aria-hidden="true">↵</small>';
    const buttons = cont
      ? `<button class="primary" data-act="retry">CONTINUE <small class="e-sn">S${stageN}</small>${enter}</button>
            <button data-act="start-over">START OVER</button>
            <button data-act="restart">CHANGE BIRD</button>`
      : `<button class="primary" data-act="retry">TRY AGAIN${enter}</button>
            <button data-act="restart">CHANGE BIRD</button>`;
    const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);
    this._show(`
      <div class="end-wrap fell">
        <div class="end-card">
          <div class="e-kicker">YOU FELL</div>
          <p class="e-core">${esc(fact)}</p>
          <p class="e-line">${esc(joke)}</p>
          <div class="e-rec"><span class="e-bar" aria-hidden="true"><i style="width:${pct}%"></i></span><span class="e-pct">${pct}%</span><span class="e-score"><small>SCORE</small> <b>${score.toLocaleString()}</b></span></div>
          <div class="e-actions">
            <div class="buttons">
            ${buttons}
            </div>
            ${save}
          </div>
        </div>
      </div>`, 'screen-ending');
  }

  // 17차 U1 클리어 결과: YOU SURVIVED → 핵심 → 변주 → TOTAL 줄(새 아이콘 · TOTAL · 숫자 · 시간) → 이름 칸 + SAVE → (저장 뒤) TOP 10 → 버튼
  //   점수 내역표는 스테이지 카드에서 보므로 뺀다. 「YOUR NAME」 이름표도 없음(빈 칸 안내 NAME)
  showVictory({ line, fact, total, bird, time }) {
    this._show(`
      <div class="end-wrap clear">
        <div class="end-card">
          <div class="e-kicker">YOU SURVIVED</div>
          <p class="e-core">${esc(fact)}</p>
          <p class="e-line">${esc(line)}</p>
          <div class="e-total">${birdIcon(bird)}<small>TOTAL</small><b>${total.toLocaleString()}</b><small class="e-time">${esc(formatTime(time))}</small></div>
          <form class="register" autocomplete="off">
            <div class="row"><input id="nick" maxlength="24" placeholder="NAME" aria-label="Name" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"/><button class="primary" type="submit">SAVE</button></div>
            <div class="reg-msg"></div>
          </form>
          <div class="top-box hidden"></div>
          <div class="buttons">
            <button class="primary" data-act="again">PLAY AGAIN</button>
            <button data-act="restart">CHANGE BIRD</button>
          </div>
        </div>
      </div>`, 'screen-victory');
    const nick = this.root.querySelector('#nick');
    if (nick) {
      // 16차: 마지막에 쓴 이름을 미리 채운다(bvf.lastName)
      try { const last = localStorage.getItem('bvf.lastName'); if (last) nick.value = last; } catch { /* 없으면 빈 칸 */ }
      setTimeout(() => nick.focus(), 0);
    }
  }

  // 17차 U1 「STAGE n CLEAR」 카드(어두운 판 유지 — 게임 화면 위에 뜬다): 머리말 → 스테이지 점수(Anton) → 작은 2×2 칸(Clear | HP / Bonus | No-hit) → TOTAL → +30% HP
  //   버튼 [NEXT](밑에 작은 「S2 · Sign Alley」, Enter·탭, 8초 뒤 자동) / [QUIT]. 마지막 스테이지는 [RESULTS] 하나(자동 없음)
  showStageClear({ rec, total, heal, next }) {
    const S = SCORING;
    const cell = (k, v) => `<span class="sc-cell"><span>${k}</span><b>${v}</b></span>`;
    const enter = '<small class="kb-enter only-kb" aria-hidden="true">↵</small>';
    this._show(`
      <div class="end-wrap card-wrap">
        <div class="end-card stage-card">
          <div class="e-kicker">STAGE ${rec.id} CLEAR</div>
          <div class="sc-score">${(rec.score ?? 0).toLocaleString()}</div>
          <div class="sc-grid">
            ${cell('Clear', (S.clearPerStage * rec.id).toLocaleString())}${cell('HP', (Math.ceil(rec.hpEnd) * S.hpPoint).toLocaleString())}
            ${cell('Bonus', (rec.bonus ?? 0).toLocaleString())}${cell('No-hit', (rec.hits === 0 ? S.noHitBonus : 0).toLocaleString())}
          </div>
          <div class="sc-total"><small>TOTAL</small> <b>${total.toLocaleString()}</b></div>
          ${next ? `<div class="e-heal">+${Math.round(heal * 100)}% HP</div>
          <div class="buttons">
            <button class="primary sc-next" data-act="next"><span>NEXT${enter}</span><small class="sc-sub">S${next.id} · ${esc(next.name)}</small></button>
            <button data-act="clear-quit">QUIT</button>
          </div>` : `<div class="buttons">
            <button class="primary" data-act="see-results">RESULTS${enter}</button>
          </div>`}
        </div>
      </div>`, 'screen-victory screen-stageclear');
  }

  // 16차 4-6: 추락 판 「Save stage scores」 저장 뒤 — 이름 칸을 잠그고 결과를 알림(이후 Enter = CONTINUE)
  stageScoresSaved(msg, ok) {
    const f = this.root.querySelector('.save-stages');
    if (f) {
      const inp = f.querySelector('input');
      if (inp) { inp.disabled = true; inp.blur(); }
      const b = f.querySelector('button');
      if (b) b.disabled = true;
    }
    this.setRegisterMessage(msg, ok);
  }

  // 16차 2-6: 스테이지 전환 0.6초 검게(on) / 다시 밝게(off)
  fade(on) {
    const el = this.$('#fade');
    if (el) el.classList.toggle('on', !!on);
  }

  // 키를 누르면 엔딩 글을 바로 전부 보인다
  revealAll() {
    const c = this.root.querySelector('.end-card');
    if (c && !c.classList.contains('all')) c.classList.add('all');
  }

  setRegisterMessage(msg, ok = false) {
    const el = this.root.querySelector('.reg-msg');
    if (el) {
      el.textContent = msg;
      el.className = `reg-msg ${ok ? 'ok' : 'err'}`;
    }
  }

  // 저장한 뒤: 그 자리에 TOP 10 을 펼치고 내 줄을 강조, 이름 칸은 잠근다(이후 Enter = PLAY AGAIN)
  // 16차: tabs = TOP 10 탭 상태, note = { msg, ok } (순위 밖이면 "Saved, but not in the top 100." 등)
  showSaved(entries, myIds, tabs = null, note = null) {
    const f = this.root.querySelector('.register');
    if (f) {
      const inp = f.querySelector('input');
      if (inp) { inp.disabled = true; inp.blur(); }
      const b = f.querySelector('button');
      if (b) b.disabled = true;
    }
    this.setRegisterMessage(note ? note.msg : 'Saved.', note ? note.ok : true);
    const box = this.root.querySelector('.top-box');
    if (box) {
      box.classList.remove('hidden');
      box.innerHTML = this.rankTabs(tabs) + this.rankList(entries, myIds);
      try { box.scrollIntoView({ block: 'nearest' }); } catch { /* 낮은 화면에서 목록이 보이게(실패해도 그만) */ }
    }
  }

  showPause(show, settings) {
    if (!show) {
      this.pause.className = 'hidden';
      this.pause.innerHTML = '';
      return;
    }
    this.pause.className = '';
    this.pause.innerHTML = `
      <div class="panel pause-panel">
        <h2>PAUSED</h2>
        <div class="buttons"><button class="primary" data-act="resume">RESUME</button><button data-act="restart-run">RESTART</button><button data-act="quit">QUIT</button></div>
        ${this.options(settings)}
      </div>`;
  }

  // 16차 3-2: 세로 화면 판(플레이 중 세로가 되면). QUIT TO MENU 는 data-act="quit"
  showRotate(v) {
    if (this.rotateEl.classList.contains('hidden') === !v) return;
    this.rotateEl.classList.toggle('hidden', !v);
  }

  // 16차 3-4: 「Loading STAGE n」(빈 글이면 숨김)
  stageLoading(text) {
    const el = this.$('#stage-loading');
    if (!el) return;
    el.classList.toggle('hidden', !text);
    el.firstChild.textContent = text || '';
  }

  // 16차 3-1: 첫 플레이 4초 동안 스틱 자리·ROLL 위에 반투명 손가락 그림
  touchHint() {
    const el = this.tc.hint;
    if (!el) return;
    el.classList.remove('hidden');
    clearTimeout(this._thT);
    this._thT = setTimeout(() => el.classList.add('hidden'), 4000);
  }

  // ---------- 게임 중 정보 ----------
  showHud(v) {
    this.hud.classList.toggle('hidden', !v);
    if (!v) this.setArrows([]);
  }

  _set(key, el, value, prop = 'textContent') {
    if (this.hudCache[key] === value) return;
    this.hudCache[key] = value;
    if (prop === 'width') el.style.width = value;
    else el[prop] = value;
  }

  updateHud(d) {
    const $ = this.$;
    this._set('prog', $('.progress i'), `${Math.min(100, (d.elapsed / d.stage.duration) * 100).toFixed(1)}%`, 'width');
    this._set('phase', $('.phase'), formatTime(Math.max(0, Math.ceil(d.stage.duration - d.elapsed))));
    this._set('score', $('.score'), d.score.toLocaleString());
    this._set('cnum', $('.cnum'), d.combo > 0 ? `COMBO ${d.combo}` : '');
    this._set('cmul', $('.cmul'), d.mult > 1 ? ` ×${d.mult}` : '');
    // 11차: HP 먹이를 먹으면 숫자가 0.4초 동안 올라가며 센다
    let hpShow = d.hp;
    const HA = this._hpAnim;
    if (HA) {
      const k = Math.min(1, (performance.now() - HA.t0) / 400);
      hpShow = HA.from + (HA.to - HA.from) * k;
      if (k >= 1) this._hpAnim = null;
    }
    this._set('hpl', $('.hp-label'), `HP ${Math.ceil(hpShow)}/${d.maxHp}${d.god ? ' [GOD]' : ''}`);
    const hpPct = `${Math.max(0, (d.hp / d.maxHp) * 100).toFixed(1)}%`;
    this._set('hp', $('.hpbar i'), hpPct, 'width');
    this.hud.classList.toggle('low-hp', d.hp / d.maxHp < 0.3);
    // 10차: 롤 개수 ◆◆◇(채워진 칸 = 남은 롤, 시안). 대기 0.5초 동안은 칸이 조금 흐림
    if (d.rolls !== undefined && this.hudCache.rolls !== d.rolls) {
      this.hudCache.rolls = d.rolls;
      $('.roll .gems').querySelectorAll('b').forEach((el, i) => el.classList.toggle('on', i < d.rolls));
      $('.tc-gems').querySelectorAll('b').forEach((el, i) => el.classList.toggle('on', i < d.rolls)); // 16차: 터치 ROLL 버튼 둘레
    }
    this.hud.classList.toggle('sp-ready', true);
    this.hud.classList.toggle('roll-ready', !d.rolling && d.rollCd <= 0 && d.rolls > 0);
    this.hud.classList.toggle('roll-empty', d.rolls === 0);
  }

  // 실사 그래픽 에셋 불러오기 진행률(0~1). 다 되면 숨긴다. 못 읽은 파일이 있으면 잠깐 알린다(코드 그래픽으로 대신함).
  setLoading(p, failed = []) {
    this._loadP = p;
    const tl = this.root.querySelector('.title-full .t-load');
    if (tl) {
      tl.classList.toggle('done', p >= 1);
      tl.querySelector('i').style.width = `${Math.round(p * 100)}%`;
      tl.querySelector('span').textContent = `${Math.round(p * 100)}%`;
    }
    const el = this.root.querySelector('#loading');
    if (!el) return;
    el.classList.toggle('hidden', p >= 1 || !!tl); // 15차: 타이틀이 떠 있으면 타이틀 아래 가는 막대로만
    el.querySelector('i').style.width = `${Math.round(p * 100)}%`;
    el.querySelector('span').textContent = `${Math.round(p * 100)}%`;
    if (p >= 1 && failed.length) {
      this.notice("Some graphics didn't load.");
      setTimeout(() => this.notice(''), 5000);
    }
  }

  // 17차 U2: 공개판에서는 숨김(개발 모드이거나 주소에 ?fps=1 일 때만 — game.js 가 show 를 정함)
  setFps(fps, show = true) {
    this.fpsEl.textContent = show ? `${fps} FPS` : '';
  }

  setDev(text) {
    const el = this.$('#dev');
    el.className = text ? '' : 'hidden';
    el.textContent = text;
  }

  // 피격: 흰 번쩍임 대신 가장자리 붉은 테두리
  setBorder(v) {
    this.border.style.opacity = v.toFixed(3);
  }

  wow() {
    const el = this.wowEl;
    el.classList.remove('hidden', 'pop');
    void el.offsetWidth; // 애니메이션 다시 시작
    el.classList.add('pop');
    clearTimeout(this._wowT);
    this._wowT = setTimeout(() => el.classList.add('hidden'), 1500);
  }

  toast(text, cls = '') {
    const d = document.createElement('div');
    d.className = `toast ${cls}`;
    d.textContent = text;
    this.toastEl.appendChild(d);
    setTimeout(() => d.remove(), 1300);
  }

  banner(title, sub, ms = 2400) {
    this.bannerEl.querySelector('.b-title').textContent = title;
    this.bannerEl.querySelector('.b-sub').textContent = sub;
    this.bannerEl.className = 'show';
    clearTimeout(this._bT);
    this._bT = setTimeout(() => (this.bannerEl.className = 'hidden'), ms);
  }

  introText(text) {
    this.introEl.className = text ? 'show' : 'hidden';
    this.introEl.textContent = text || '';
  }

  notice(text) {
    const el = this.$('#notice');
    el.className = text ? '' : 'hidden';
    el.textContent = text || '';
  }

  // 안내 한 줄(화면 아래 가운데)
  hint(text) {
    const el = this.$('#hint');
    el.className = text ? 'show' : 'hidden';
    el.textContent = text || '';
  }

  // 판정 글자(점수 아래): 퍼펙트·스침·회피·피해
  // 7차 먹이: 작은 점수 글자(판정 글자와 따로)
  foodPop(text, kind = '') {
    const el = this.$('.foodpop');
    if (!el) return;
    el.textContent = text;
    el.className = `foodpop${kind ? ' ' + kind : ''}`;
    void el.offsetWidth;
    el.classList.add('pop');
    clearTimeout(this._fT);
    this._fT = setTimeout(() => (el.className = 'foodpop'), 700);
  }

  // 10차: HP 먹이 — HP 막대가 민트로 한 번 번쩍(막대 하나 크기라 화면 번쩍임 아님)
  // 11차: 늘어난 구간이 민트 흰빛으로 0.4초 동안 차오르고, 숫자가 올라가며 센다
  hpFlash(before = null, after = null, max = null) {
    const el = this.$('.hpbar');
    if (!el) return;
    el.classList.remove('heal');
    void el.offsetWidth;
    el.classList.add('heal');
    clearTimeout(this._hfT);
    this._hfT = setTimeout(() => el.classList.remove('heal'), 600);
    if (before !== null && max) {
      const seg = el.querySelector('em');
      if (seg) {
        seg.style.left = `${((before / max) * 100).toFixed(1)}%`;
        seg.style.width = `${(((after - before) / max) * 100).toFixed(1)}%`;
        seg.classList.remove('gain');
        void seg.offsetWidth;
        seg.classList.add('gain');
      }
      this._hpAnim = { from: before, to: after, t0: performance.now() };
    }
  }

  // ---------- 11차 새 옆 팝업 글자(#pops) ----------
  // 새 화면 위치 아래(0, +50px @1080p, 해상도 비례)에 0.8초. 겹치면 26px 씩 아래로 쌓고, 판정 시간에는 불투명도 0.5
  pop(text, kind = 'hp') {
    const box = this.popsEl;
    if (!box) return;
    const used = new Set(this.pops.map((p) => p.slot));
    let slot = 0;
    while (used.has(slot)) slot++;
    const d = document.createElement('div');
    d.className = 'pop';
    const sp = document.createElement('span');
    sp.className = `pop-t ${kind}`;
    sp.textContent = text;
    d.appendChild(sp);
    box.appendChild(d);
    const p = { el: d, slot, t0: this.clock(), text, kind };
    this.pops.push(p);
    (this.popLog || (this.popLog = [])).push({ text, kind, slot, t: p.t0 });
    this._placePops();
    return p;
  }

  // 매 프레임: x·y = 새 화면 위치(CSS 화소), dim = 판정 시간이면 true
  updatePops(x, y, dim) {
    if (x !== null) this.popXY = [x, y];
    this.popDim = dim;
    this._placePops();
  }

  _placePops() {
    if (!this.pops.length) return;
    const P = POPUP;
    const total = P.pop + P.rise + P.fade;
    const now = this.clock();
    const sc = (typeof window !== 'undefined' ? window.innerHeight : 1080) / P.ref;
    const xy = this.popXY || [window.innerWidth / 2, window.innerHeight / 2];
    const dimA = this.popDim ? P.judgeA : 1;
    for (let i = this.pops.length - 1; i >= 0; i--) {
      const p = this.pops[i];
      const age = (now - p.t0) / 1000;
      if (age >= total || age < -1) {
        p.el.remove();
        this.pops.splice(i, 1);
        continue;
      }
      // 0.1초 튀어나옴(0.6 → 1.15 → 1.0) → 0.45초 30px 위로 → 0.25초 사라짐(게임 시계 — 일시정지면 멈춤)
      let scl = 1, rise = 0, a = 1;
      if (age < P.pop) {
        const k = age / P.pop;
        scl = k < 0.5 ? 0.6 + (1.15 - 0.6) * (k / 0.5) : 1.15 + (1 - 1.15) * ((k - 0.5) / 0.5);
      } else if (age < P.pop + P.rise) {
        const k = (age - P.pop) / P.rise;
        rise = P.risePx * (1 - (1 - k) * (1 - k));
      } else {
        const k = (age - P.pop - P.rise) / P.fade;
        rise = P.risePx + 8 * k;
        a = 1 - k;
      }
      const yy = xy[1] + (P.dy + p.slot * P.stack - rise) * sc;
      p.el.style.transform = `translate(${xy[0].toFixed(1)}px, ${yy.toFixed(1)}px) scale(${scl.toFixed(3)})`;
      p.el.style.fontSize = `${(P.size * sc).toFixed(1)}px`;
      p.el.style.opacity = (a * dimA).toFixed(3);
      p.lastA = a * dimA;
    }
  }

  clearPops() {
    for (const p of this.pops) p.el.remove();
    this.pops.length = 0;
  }

  // 11차: 가득일 때 먹으면 — 롤 칸 5개가 금빛으로 한 번 번쩍(from = 'roll') 또는 HP 막대(from = 'hp'), 「+점수」가 그 자리에서 점수판으로 날아가(0.5초) 점수판이 1.15배로 튄다
  scoreFly(pts, from = 'roll') {
    const src = from === 'roll' ? this.$('.roll .gems') : this.$('.hpbar');
    const dst = this.$('.hud-tc .score');
    if (!src || !dst) return;
    if (from === 'roll') {
      src.classList.remove('full');
      void src.offsetWidth;
      src.classList.add('full');
      clearTimeout(this._gfT);
      this._gfT = setTimeout(() => src.classList.remove('full'), 450);
    }
    const a = src.getBoundingClientRect(), b = dst.getBoundingClientRect();
    const f = document.createElement('div');
    f.className = 'fly';
    f.textContent = `+${pts}`;
    f.style.transform = `translate(${(a.left + a.width / 2).toFixed(0)}px, ${(a.top + a.height / 2).toFixed(0)}px) translate(-50%, -50%)`;
    this.popsEl.appendChild(f);
    void f.offsetWidth;
    f.style.transform = `translate(${(b.left + b.width / 2).toFixed(0)}px, ${(b.top + b.height / 2).toFixed(0)}px) translate(-50%, -50%) scale(0.8)`;
    f.style.opacity = '0.2';
    setTimeout(() => {
      f.remove();
      dst.classList.remove('bump');
      void dst.offsetWidth;
      dst.classList.add('bump');
    }, 500);
    (this.flyLog || (this.flyLog = [])).push({ pts, from, t: performance.now() });
  }

  // 10차: 롤 하나 얻음 — 새로 채워진 칸이 톡 튀어나옴
  rollGain() {
    const gems = this.$('.roll .gems');
    if (!gems) return;
    this.hudCache.rolls = undefined;
    const on = gems.querySelectorAll('b.on');
    const all = gems.querySelectorAll('b');
    const el = all[Math.min(all.length - 1, on.length)];
    if (!el) return;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  }

  // 10차: 롤 0개에 Space — 표시칸이 흔들림
  rollShake() {
    const el = this.$('.special.roll');
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    clearTimeout(this._rsT);
    this._rsT = setTimeout(() => el.classList.remove('shake'), 400);
  }

  judge(text, cls) {
    const el = this.$('.judge');
    el.textContent = text;
    el.className = `judge ${cls}`;
    void el.offsetWidth;
    el.classList.add('pop');
    clearTimeout(this._jT);
    this._jT = setTimeout(() => (el.className = 'judge'), 900);
  }

  // 퍼펙트: 화면 가장자리 시안 비네트 펄스(흰 번쩍임 아님, 세기 0.15)
  pulse(strength) {
    const el = this.$('#vignette');
    el.style.setProperty('--v', String(strength));
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  }

  // 화면 밖 위협: 그쪽 가장자리 부채꼴 빛. list: [{x, y(−1~1 가장자리 방향), color, a}]
  setEdges(list) {
    const box = this.$('#edges');
    if (!this.edgePool) this.edgePool = [];
    while (this.edgePool.length < list.length) {
      const d = document.createElement('div');
      d.className = 'edge';
      box.appendChild(d);
      this.edgePool.push(d);
    }
    const W = window.innerWidth;
    const H = this.view ? this.view.h : window.innerHeight;
    const top = this.view ? this.view.top : 0;
    this.edgePool.forEach((d, i) => {
      const it = list[i];
      if (!it) {
        if (d.style.display !== 'none') d.style.display = 'none';
        return;
      }
      d.style.display = 'block';
      const px = ((it.x + 1) / 2) * W;
      const py = top + ((1 - it.y) / 2) * H;
      const c = it.color;
      const m = Math.max(c[0], c[1], c[2], 0.01);
      const rgb = `${Math.round((c[0] / m) * 255)},${Math.round((c[1] / m) * 255)},${Math.round((c[2] / m) * 255)}`;
      const R = W * 0.06;
      d.style.width = `${R * 2}px`;
      d.style.height = `${R * 2}px`;
      d.style.transform = `translate(${(px - R).toFixed(0)}px, ${(py - R).toFixed(0)}px)`;
      d.style.background = `radial-gradient(circle, rgba(${rgb},${(0.55 * it.a).toFixed(2)}) 0%, rgba(${rgb},${(0.2 * it.a).toFixed(2)}) 45%, rgba(${rgb},0) 70%)`;
    });
  }

  // 화면 밖 위협 화살표. list: [{x, y, angle, urgency}]
  setArrows(list) {
    while (this.arrowPool.length < list.length) {
      const a = document.createElement('div');
      a.className = 'arrow';
      this.arrowsEl.appendChild(a);
      this.arrowPool.push(a);
    }
    this.arrowPool.forEach((a, i) => {
      const it = list[i];
      if (!it) {
        a.style.display = 'none';
        return;
      }
      a.style.display = 'block';
      a.style.transform = `translate(${it.x.toFixed(0)}px, ${it.y.toFixed(0)}px) rotate(${it.angle.toFixed(3)}rad)`;
      a.style.opacity = (0.4 + 0.6 * it.urgency).toFixed(2);
    });
  }
}
