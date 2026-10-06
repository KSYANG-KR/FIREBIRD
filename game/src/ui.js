// 화면 위 글자·버튼(HTML): 시작 화면, 새 선택, 숨 고르기, 엔딩, 랭킹, 게임 중 정보(HUD).
import { BIRDS, BIRD_ORDER, STAGES, FOOD, POPUP, ROLL } from './config.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}분 ${s % 60}초` : `${s}초`;
}

export function birdIcon(id) {
  const b = BIRDS[id] || BIRDS.sparrow;
  return `<span class="bird-icon" style="--c:${b.color}" title="${esc(b.name)}">${esc(b.name[0])}</span>`;
}

function stat(label, value, max) {
  const pct = Math.round((value / max) * 100);
  return `<div class="stat"><span>${label}</span><div class="bar"><i style="width:${pct}%"></i></div><b>${value}</b></div>`;
}

export class UI {
  constructor(root, onAction) {
    this.root = root;
    this.onAction = onAction;
    root.innerHTML = `
      <div id="border"></div>
      <div id="hud" class="hidden">
        <div class="hud-tl"><div class="stage-name"></div><div class="progress"><i></i></div><div class="phase"></div></div>
        <div class="hud-tc"><div class="score"></div><div class="combo"><b class="cnum"></b><span class="cmul"></span></div><div class="near"></div><div class="judge"></div><div class="foodpop"></div></div>
        <div class="hud-bl"><div class="hp-label"></div><div class="hpbar"><i></i><em></em></div></div>
        <div class="hud-bc">
          <div class="special roll"><span class="key">Space</span><span class="roll-name">급회피 롤</span><div class="gems">${'<b></b>'.repeat(ROLL.max)}</div></div>
        </div>
        <div class="hud-help">방향키/WASD 이동 · 범위 원 밖 · 가운데 구멍 · Space 롤(최대 5) · Esc/P 일시정지 · M 소리</div>
      </div>
      <div id="vignette"></div>
      <div id="pops"></div>
      <div id="edges"></div>
      <div id="hint" class="hidden"></div>
      <div id="arrows"></div>
      <div id="wow" class="hidden">와아아!</div>
      <div id="toast"></div>
      <div id="banner" class="hidden"><div class="b-title"></div><div class="b-sub"></div></div>
      <div id="intro-text" class="hidden"></div>
      <div id="fps"></div>
      <div id="loading" class="hidden"><span>그래픽 불러오는 중</span><div class="lbar"><i></i></div></div>
      <div id="dev" class="hidden"></div>
      <div id="notice" class="hidden"></div>
      <div id="screen" class="hidden"></div>
      <div id="pause" class="hidden"></div>
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

  options(settings) {
    const box = (key, label, hint) =>
      `<label class="opt"><input type="checkbox" data-opt="${key}" ${settings[key] ? 'checked' : ''}/> <span>${label}</span>${hint ? `<small>${hint}</small>` : ''}</label>`;
    return `<div class="options">
      ${box('reduceMotion', '흔들림 줄이기', '화면 기울기·시야 튐·흔들림·퍼펙트 슬로모 끔')}
      ${box('bloom', '빛 번짐(블룸)', '')}
      ${box('lowSpec', '저사양 모드', '블룸 끔 · 불씨 절반 · 해상도 낮춤')}
      ${box('sound', '소리', 'M 키로도 켜고 끔')}
    </div>`;
  }

  showTitle({ settings, touch, top, dev, gpuWarn = false }) {
    const rows = top.length
      ? top.map((e, i) => `<li><b>${i + 1}</b>${birdIcon(e.bird)}<span>${esc(e.name)}${(e.ver || 0) >= 6 ? "" : " <small class=\"old\">v5 이전</small>"}</span><em>${e.score.toLocaleString()}</em></li>`).join('')
      : '<li class="empty">아직 기록이 없어요.</li>';
    this._show(`
      <div class="panel title-panel">
        <h1>Birds vs Fireworks</h1>
        <p class="sub">사람에게는 축제, 새에게는 악몽. 도심의 불꽃놀이를 피해 끝까지 날아 보세요.</p>
        <div class="warning">
          <b>광과민성 발작 경고</b>
          이 게임에는 불꽃의 빛과 밝기 변화가 나옵니다. 빛에 민감하거나 발작을 겪은 적이 있다면 플레이하지 마세요.
          하다가 어지럽거나 눈이 불편하면 바로 멈추고 쉬세요.
        </div>
        ${gpuWarn ? `<div class="gpu-note" id="gpu-note">
          <b>그래픽 가속이 꺼져 있습니다. 크롬 설정 → 시스템 → '가능한 경우 그래픽 가속 사용'을 켜고 크롬을 다시 시작하세요.</b>
          엣지로 열어도 됩니다.
          <div class="gpu-row"><code>chrome://settings/system</code><button data-act="gpu-copy">주소 복사</button><button data-act="gpu-close">닫기</button></div>
          <small>지금은 품질을 자동으로 낮췄어요(빛 번짐 끔 · 장식 불꽃 절반 · 물 반사 끔 · 해상도 낮춤).</small>
        </div>` : ''}
        ${touch ? '<div class="touch-note">이 게임은 PC 키보드로 즐겨 주세요. 휴대폰·태블릿 터치 조작은 아직 없어요.</div>' : ''}
        ${this.options(settings)}
        <div class="buttons">
          <button class="primary" data-act="start">시작하기</button>
          <button data-act="ranking">랭킹 보기</button>
        </div>
        <div class="mini-rank"><div class="mini-title">이 브라우저의 캐주얼 랭킹 상위 10 (이어하기 없는 기록)</div><ol>${rows}</ol></div>
        <div class="controls">조작: 방향키 또는 WASD 이동 — 불꽃이 올라가면 바로 점선 「범위 원」이 뜨고 약 1초 뒤 새가 닿는 순간 터집니다(원 안 = 모두 위험). 피하는 길은 둘: 원 밖으로 · 가운데 구멍으로(구멍이 있는 불꽃만, 하얀 작은 고리 = 내 새가 지날 자리, 점수 큼) · 민트 고리 먹이 = HP 회복 · 시안 깃털 = 롤 +1 · Space 급회피 롤(시작 3개 · 최대 5개, 가득일 때 먹으면 +200점) · Esc/P 일시정지 · M 소리 끄기/켜기${dev ? ' · [개발] N 스테이지 건너뛰기, G 무적, B 판정 띠' : ''}</div>
      </div>`, 'screen-title');
  }

  showSelect({ selected }) {
    const maxF = 14, maxL = 10, maxH = Math.max(...BIRD_ORDER.map((id) => BIRDS[id].hp));
    const cards = BIRD_ORDER.map((id) => {
      const b = BIRDS[id];
      const sp = b.special;
      return `<button class="bird-card ${id === selected ? 'sel' : ''}" data-act="pick" data-bird="${id}">
        <div class="bc-head">${birdIcon(id)}<b>${esc(b.name)}</b><small>${esc(b.role)}</small></div>
        ${stat('전진', b.forward, maxF)}
        ${stat('옆·위아래', b.lateral, maxL)}
        ${stat('HP', b.hp, maxH)}
        ${stat('맞는 범위', b.radius, 1)}
        <small class="fav-food">HP 먹이: ${esc(FOOD.kinds[FOOD.fav[id]].label)}(민트 고리) · 롤 먹이: 시안 깃털</small>
      </button>`;
    }).join('');
    this._show(`
      <div class="panel select-panel">
        <h2>어떤 새로 날까요?</h2>
        <div class="cards">${cards}</div>
        <div class="stage-strip">${STAGES.map((st) => st.playable
    ? `<div class="stage-chip open"><b>STAGE ${st.id}</b><span>${esc(st.name)}</span><small>약 ${st.duration}초</small></div>`
    : `<button class="stage-chip locked" data-act="locked"><b>STAGE ${st.id}</b><span>${esc(st.name)}</span><small>준비 중</small></button>`).join('')}</div>
        <div class="hint">←/→ 로 고르고 Enter, 또는 카드를 누르세요. 맞는 범위가 작을수록 피하기 쉽습니다.</div>
        <div class="buttons">
          <button class="primary" data-act="fly">이 새로 날기</button>
          <button data-act="back">처음 화면</button>
        </div>
      </div>`, 'screen-select');
  }

  showInterlude({ stage, rec, hpBefore, hpAfter, maxHp, next, total, isLast }) {
    this._show(`
      <div class="panel interlude">
        <div class="kicker">STAGE ${stage.id} 완주</div>
        <h2>${esc(stage.name)}</h2>
        <table class="score-table">
          <tr><td>완주</td><td>${(1000 * stage.id).toLocaleString()}</td></tr>
          <tr><td>퍼펙트 ${rec.perfect ?? 0}회 · 스침 ${rec.graze ?? 0}회 · 최대 콤보 ${rec.maxChain ?? 0}</td><td>${(rec.bonus ?? 0).toLocaleString()}</td></tr>
          <tr><td>남은 HP ${Math.ceil(rec.hpEnd)}</td><td>${(Math.ceil(rec.hpEnd) * 10).toLocaleString()}</td></tr>
          <tr><td>무피격</td><td>${rec.hits === 0 ? '500' : '0'}</td></tr>
          <tr class="sum"><td>스테이지 점수</td><td>${rec.score.toLocaleString()}</td></tr>
          <tr class="sum"><td>누적 점수</td><td>${total.toLocaleString()}</td></tr>
        </table>
        ${isLast ? '' : `<p class="heal">숨 고르기: HP ${Math.ceil(hpBefore)} → <b>${Math.ceil(hpAfter)}</b> / ${maxHp} (최대치의 30% 회복)</p>
        <p class="next">다음: STAGE ${next.id} ${esc(next.name)} · ${next.duration}초</p>`}
        <div class="buttons"><button class="primary" data-act="next">${isLast ? '결과 보기' : '다음 스테이지'} (Enter)</button></div>
      </div>`, 'screen-interlude');
  }

  showEnding({ joke, fact, stage, time, hits, score }) {
    this._show(`
      <div class="ending-text">
        <p class="joke">${esc(joke)}</p>
        <div class="record">STAGE ${stage.id} ${esc(stage.name)}에서 추락 · 비행 ${esc(formatTime(time))} · 맞은 횟수 ${hits} · 점수 ${score.toLocaleString()}</div>
        <p class="fact">${esc(fact)}</p>
        <div class="buttons">
          <button class="primary" data-act="retry">이 스테이지 다시 (그 스테이지 시작 HP로)</button>
          <button data-act="restart">처음부터</button>
        </div>
      </div>`, 'screen-ending');
  }

  showVictory({ line, fact, total, records, continues, bird, time }) {
    const rows = records.map((r) => `<tr><td>${r.id}. ${esc(STAGES[r.id - 1].name)}</td><td>${r.score.toLocaleString()}</td></tr>`).join('');
    this._show(`
      <div class="panel victory">
        <div class="kicker">최종 클리어</div>
        <h2>${esc(line)}</h2>
        <p class="fact">${esc(fact)}</p>
        <table class="score-table">${rows}
          <tr class="sum"><td>합계 ${birdIcon(bird)} 이어하기 ${continues}회 · ${esc(formatTime(time))}</td><td>${total.toLocaleString()}</td></tr>
        </table>
        <form class="register" autocomplete="off">
          <label>닉네임 (2~12자, 한글·영문·숫자)</label>
          <div class="row"><input id="nick" maxlength="24" placeholder="닉네임"/><button class="primary" type="submit">랭킹에 등록</button></div>
          <div class="reg-msg"></div>
          <small>캐주얼 랭킹: 이 브라우저에만 저장되는 재미용 순위입니다. 조작을 완전히 막지는 못합니다.</small>
        </form>
        <div class="buttons"><button data-act="ranking">랭킹 보기</button><button data-act="restart">처음부터</button></div>
      </div>`, 'screen-victory');
  }

  setRegisterMessage(msg, ok = false) {
    const el = this.root.querySelector('.reg-msg');
    if (el) {
      el.textContent = msg;
      el.className = `reg-msg ${ok ? 'ok' : 'err'}`;
    }
  }

  showRanking({ entries, tab, highlightId, from }) {
    const rows = entries.length
      ? entries.map((e, i) => `<tr class="${e.id === highlightId ? 'me' : ''}"><td>${i + 1}</td><td>${birdIcon(e.bird)} ${esc(e.name)}${(e.ver || 0) >= 6 ? "" : " <small class=\"old\">v5 이전</small>"}</td><td>${e.score.toLocaleString()}</td><td>${e.continues}</td><td>${new Date(e.at).toLocaleDateString()}</td></tr>`).join('')
      : '<tr><td colspan="5" class="empty">아직 기록이 없어요. 5스테이지를 모두 버티면 등록할 수 있어요.</td></tr>';
    this._show(`
      <div class="panel ranking">
        <h2>캐주얼 랭킹</h2>
        <p class="sub">이 브라우저에만 저장되는 재미용 순위입니다. 조작을 완전히 막지는 못합니다.</p>
        <div class="tabs">
          <button class="${tab === 'clean' ? 'on' : ''}" data-act="tab" data-tab="clean">이어하기 없이</button>
          <button class="${tab === 'all' ? 'on' : ''}" data-act="tab" data-tab="all">이어하기 포함</button>
        </div>
        <table class="rank-table"><tr><th>순위</th><th>닉네임</th><th>점수</th><th>이어하기</th><th>날짜</th></tr>${rows}</table>
        <div class="buttons"><button class="primary" data-act="${from === 'victory' ? 'restart' : 'back'}">${from === 'victory' ? '처음부터' : '처음 화면'}</button></div>
      </div>`, 'screen-ranking');
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
        <h2>일시정지</h2>
        ${this.options(settings)}
        <div class="buttons"><button class="primary" data-act="resume">계속 (Esc)</button><button data-act="quit">처음 화면으로</button></div>
      </div>`;
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
    this._set('stage', $('.stage-name'), `STAGE ${d.stage.id} · ${d.stage.name}`);
    this._set('prog', $('.progress i'), `${Math.min(100, (d.elapsed / d.stage.duration) * 100).toFixed(1)}%`, 'width');
    this._set('phase', $('.phase'), `${['도입', '본공연', '피날레'][d.phase] || ''} · 남은 ${Math.max(0, Math.ceil(d.stage.duration - d.elapsed))}초`);
    this._set('score', $('.score'), `점수 ${d.score.toLocaleString()}`);
    this._set('cnum', $('.cnum'), d.combo > 0 ? `콤보 ${d.combo}` : '');
    this._set('cmul', $('.cmul'), d.mult > 1 ? ` ×${d.mult}` : '');
    this._set('near', $('.near'), d.center !== undefined ? `센터 ${d.center} · 타이밍 ${d.timing || 0} · 스침 ${d.graze} · HP 먹이 ${d.hpFood || 0} · 롤 먹이 ${d.rollFood || 0} · 맞음 ${d.hits}` : `퍼펙트 ${d.perfect} · 스침 ${d.graze} · 맞음 ${d.hits}`);
    // 11차: HP 먹이를 먹으면 숫자가 0.4초 동안 올라가며 센다
    let hpShow = d.hp;
    const HA = this._hpAnim;
    if (HA) {
      const k = Math.min(1, (performance.now() - HA.t0) / 400);
      hpShow = HA.from + (HA.to - HA.from) * k;
      if (k >= 1) this._hpAnim = null;
    }
    this._set('hpl', $('.hp-label'), `${d.birdName} HP ${Math.ceil(hpShow)} / ${d.maxHp}${d.god ? ' [무적]' : ''}`);
    const hpPct = `${Math.max(0, (d.hp / d.maxHp) * 100).toFixed(1)}%`;
    this._set('hp', $('.hpbar i'), hpPct, 'width');
    this.hud.classList.toggle('low-hp', d.hp / d.maxHp < 0.3);
    // 10차: 롤 개수 ◆◆◇(채워진 칸 = 남은 롤, 시안). 대기 0.5초 동안은 칸이 조금 흐림
    if (d.rolls !== undefined && this.hudCache.rolls !== d.rolls) {
      this.hudCache.rolls = d.rolls;
      $('.roll .gems').querySelectorAll('b').forEach((el, i) => el.classList.toggle('on', i < d.rolls));
    }
    this.hud.classList.toggle('sp-ready', true);
    this.hud.classList.toggle('roll-ready', !d.rolling && d.rollCd <= 0 && d.rolls > 0);
    this.hud.classList.toggle('roll-empty', d.rolls === 0);
  }

  // 실사 그래픽 에셋 불러오기 진행률(0~1). 다 되면 숨긴다. 못 읽은 파일이 있으면 잠깐 알린다(코드 그래픽으로 대신함).
  setLoading(p, failed = []) {
    const el = this.root.querySelector('#loading');
    if (!el) return;
    el.classList.toggle('hidden', p >= 1);
    el.querySelector('i').style.width = `${Math.round(p * 100)}%`;
    el.querySelector('span').textContent = `그래픽 불러오는 중 ${Math.round(p * 100)}%`;
    if (p >= 1 && failed.length) {
      this.notice(`일부 그래픽(${failed.length}개)을 불러오지 못해 기본 그래픽으로 보여 줍니다.`);
      setTimeout(() => this.notice(''), 5000);
    }
  }

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
    const H = window.innerHeight;
    this.edgePool.forEach((d, i) => {
      const it = list[i];
      if (!it) {
        if (d.style.display !== 'none') d.style.display = 'none';
        return;
      }
      d.style.display = 'block';
      const px = ((it.x + 1) / 2) * W;
      const py = ((1 - it.y) / 2) * H;
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
