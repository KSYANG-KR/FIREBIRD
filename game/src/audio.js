// 소리: 음원 파일 없이 Web Audio 로 합성한다.
// 5차: 3D 소리(HRTF — 머리 방향 입체 음향, 리스너 = 카메라). 종류별 휘파람(길이 = 실제 비행 시간, 음 높이 = 높이 비율, 끝 0.3초 떨림),
//      발사 「퉁」, 거리 ÷ 340 만큼 늦게 오는 「쿵」, 롤 예고음 「틱」, 퍼펙트 「칭」(5음계), 「휙」, 피격 「지직-쿵」, 껍질 접근 「쉬이익」, 환호.
//      배경음악(music.js)은 musicIn/drumGain → 먹먹함 필터 → master 로 들어온다.
// 브라우저는 사용자가 누르기 전에는 소리를 낼 수 없으므로, 시작 버튼을 누를 때 start() 를 부른다.
import { AUDIO, MUSIC } from './config.js';

export class Sound {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.active = 0;
    this.log = []; // 점검용: { type, at(소리 시각), now(부른 때 소리 시계), id }
    this.logOn = false;
  }

  get ready() {
    return !!this.ctx;
  }

  get now() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  start() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.settings.sound ? AUDIO.masterVolume : 0;
    const comp = ctx.createDynamicsCompressor(); // 피날레에 소리가 몰려도 찢어지지 않게
    comp.threshold.value = -14;
    comp.ratio.value = 6;
    this.master.connect(comp);
    comp.connect(ctx.destination);
    this.sfx = ctx.createGain();
    this.sfx.connect(this.master);

    // 배경음악 버스: 북(따로 뺄 수 있게) + 나머지 → 먹먹함(저역 통과) → master
    this.musicFilter = ctx.createBiquadFilter();
    this.musicFilter.type = 'lowpass';
    this.musicFilter.frequency.value = 18000;
    this.musicFilter.Q.value = 0.7;
    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = MUSIC.volume;
    this.musicIn = ctx.createGain();
    this.drumGain = ctx.createGain();
    this.musicIn.connect(this.musicFilter);
    this.drumGain.connect(this.musicFilter);
    this.musicFilter.connect(this.musicGain).connect(this.master);

    // 공용 잡음(2초)
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // 군중 웅성임(계속 깔림)
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 520;
    bp.Q.value = 0.7;
    this.murmur = ctx.createGain();
    this.murmur.gain.value = 0;
    src.connect(bp).connect(this.murmur).connect(this.sfx);
    src.start();

    // 껍질 접근 「쉬이익」(계속 깔고 크기만 바꾼다)
    const ap = ctx.createBufferSource();
    ap.buffer = this.noise;
    ap.loop = true;
    this.apFilter = ctx.createBiquadFilter();
    this.apFilter.type = 'bandpass';
    this.apFilter.frequency.value = 2400;
    this.apFilter.Q.value = 1.2;
    this.apGain = ctx.createGain();
    this.apGain.gain.value = 0;
    ap.connect(this.apFilter).connect(this.apGain).connect(this.sfx);
    ap.start();
  }

  setMuted(muted) {
    this.settings.sound = !muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : AUDIO.masterVolume, this.ctx.currentTime, 0.05);
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend();
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setMurmur(level) {
    if (!this.ctx) return;
    this.murmur.gain.setTargetAtTime(level * 0.06, this.ctx.currentTime, 0.4);
  }

  _log(type, at, id = 0, extra = null) {
    if (!this.logOn) return;
    this.log.push({ type, at, now: this.ctx.currentTime, id, ...(extra || {}) });
    if (this.log.length > 6000) this.log.splice(0, 1000);
  }

  // 리스너 = 카메라(위치·방향)
  setListener(cam) {
    if (!this.ctx) return;
    const L = this.ctx.listener;
    const e = cam.matrixWorld.elements;
    const fx = -e[8], fy = -e[9], fz = -e[10];
    const ux = e[4], uy = e[5], uz = e[6];
    const p = cam.position;
    if (L.positionX) {
      const t = this.ctx.currentTime;
      L.positionX.setValueAtTime(p.x, t); L.positionY.setValueAtTime(p.y, t); L.positionZ.setValueAtTime(p.z, t);
      L.forwardX.setValueAtTime(fx, t); L.forwardY.setValueAtTime(fy, t); L.forwardZ.setValueAtTime(fz, t);
      L.upX.setValueAtTime(ux, t); L.upY.setValueAtTime(uy, t); L.upZ.setValueAtTime(uz, t);
    } else {
      L.setPosition(p.x, p.y, p.z);
      L.setOrientation(fx, fy, fz, ux, uy, uz);
    }
  }

  // 동시 소리 상한. 넘으면 이번 소리는 건너뛴다.
  _take(duration) {
    if (!this.ctx || !this.settings.sound) return false;
    if (this.active >= AUDIO.maxVoices) return false;
    this.active++;
    setTimeout(() => {
      this.active = Math.max(0, this.active - 1);
    }, (duration + 0.1) * 1000);
    return true;
  }

  // 3D 위치 소리 출구(HRTF)
  _panner(pos, gain, ref = 12) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = gain;
    const p = ctx.createPanner();
    p.panningModel = 'HRTF';
    p.distanceModel = 'inverse';
    p.refDistance = ref;
    p.rolloffFactor = 0.9;
    p.maxDistance = 3000;
    if (p.positionX) {
      p.positionX.value = pos.x;
      p.positionY.value = pos.y;
      p.positionZ.value = pos.z;
    } else p.setPosition(pos.x, pos.y, pos.z);
    g.connect(p).connect(this.sfx);
    g.panner = p;
    return g;
  }

  _setPos(p, pos) {
    if (p.positionX) {
      const t = this.ctx.currentTime;
      p.positionX.setTargetAtTime(pos.x, t, 0.02);
      p.positionY.setTargetAtTime(pos.y, t, 0.02);
      p.positionZ.setTargetAtTime(pos.z, t, 0.02);
    } else p.setPosition(pos.x, pos.y, pos.z);
  }

  _out(pan, gain) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = gain;
    if (ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      g.connect(p).connect(this.sfx);
    } else {
      g.connect(this.sfx);
    }
    return g;
  }

  _noise(at, dur) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    s.start(at, Math.random() * 1.5, dur + 0.05);
    return s;
  }

  // ---------- 5차 위협 소리 ----------
  // 발사 「퉁」(발사점) + 휘파람 시작. 휘파람은 게임이 매 프레임 update(위치, 높이 비율, 남은 초)로 움직이고 정점(폭발 프레임)에서 end()
  launch(spec, pos, id) {
    if (!this.ctx || !this.settings.sound) return null;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('launch', t, id);
    if (this._take(0.4)) {
      const out = this._panner(pos, 0.9, 10);
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.9, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + 0.35);
    }
    if (!this._take(2.5)) return null;
    const W = spec.whistle;
    if (W.hiss) return this._hiss(W, pos, id, t);
    const out = this._panner(pos, W.gain * 3, 14);
    const o = ctx.createOscillator();
    o.type = W.wave;
    o.frequency.setValueAtTime(W.f0, t);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(W.f0 * 1.2, t);
    bp.Q.value = W.q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.08);
    // 끝 0.3초 떨림(트레몰로): 깊이를 그때 올린다
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 22;
    const lg = ctx.createGain();
    lg.gain.value = 0;
    lfo.connect(lg).connect(g.gain);
    o.connect(bp).connect(g).connect(out);
    o.start(t);
    lfo.start(t);
    let fizz = null;
    if (W.f0 < 200) {
      // 버드나무: 지글거림
      fizz = this._noise(t, 3);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 3500;
      const fg = ctx.createGain();
      fg.gain.value = 0.18;
      fizz.connect(hp).connect(fg).connect(out);
    }
    const self = this;
    let ended = false;
    let trem = false;
    let lastF = W.f0;
    return {
      update(posNow, k, remaining) {
        if (ended) return;
        const tt = ctx.currentTime;
        const f = Math.max(lastF, W.f0 * Math.pow(W.f1 / W.f0, Math.max(0, Math.min(1, k)))); // 음 높이는 오르기만
        lastF = f;
        o.frequency.setTargetAtTime(f, tt, 0.015);
        bp.frequency.setTargetAtTime(f * 1.2, tt, 0.015);
        self._setPos(out.panner, posNow);
        if (!trem && remaining < 0.3) {
          trem = true;
          lg.gain.setTargetAtTime(0.6, tt, 0.03);
        }
      },
      end() {
        if (ended) return;
        ended = true;
        const tt = ctx.currentTime;
        self._log('whistleEnd', tt, id);
        g.gain.cancelScheduledValues(tt);
        g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), tt);
        g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.03);
        o.stop(tt + 0.05);
        lfo.stop(tt + 0.05);
        if (fizz) fizz.stop(tt + 0.05);
      },
    };
  }

  // 7차 모란 발사: 휘파람 없이 낮은 「쉭」(잡음을 낮은 대역으로 거름, 음 높이 조금만 오름). 휘파람과 같은 update/end
  _hiss(W, pos, id, t) {
    const ctx = this.ctx;
    const out = this._panner(pos, W.gain * 3, 14);
    const n = this._noise(t, 3);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(W.f0, t);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.1);
    n.connect(bp).connect(lp).connect(g).connect(out);
    const self = this;
    let ended = false;
    return {
      update(posNow, k) {
        if (ended) return;
        const tt = ctx.currentTime;
        bp.frequency.setTargetAtTime(W.f0 + (W.f1 - W.f0) * Math.max(0, Math.min(1, k)), tt, 0.03);
        self._setPos(out.panner, posNow);
      },
      end() {
        if (ended) return;
        ended = true;
        const tt = ctx.currentTime;
        self._log('whistleEnd', tt, id);
        g.gain.cancelScheduledValues(tt);
        g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), tt);
        g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.05);
        n.stop(tt + 0.08);
      },
    };
  }

  // 7차 먹이 「톡」 + 새 울음(참새 짹 · 까치 깍 · 비둘기 구). step: 콤보(5음계로 한 칸씩 위), at: 다음 16분음표
  eat(birdId, step, at, fav = false) {
    if (!this._take(0.35)) return;
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    this._log('eat', t, 0, { step });
    const scale = [0, 2, 4, 7, 9];
    const semi = 12 * Math.floor(step / 5) + scale[step % 5];
    const up = Math.pow(2, Math.min(19, semi) / 12);
    const out = this._out(0, fav ? 0.3 : 0.24);
    // 톡
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(1500 * up, t);
    o.frequency.exponentialRampToValueAtTime(900 * up, t + 0.035);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.9, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.07);
    // 울음(톡 바로 뒤)
    const c = t + 0.04;
    const v = ctx.createOscillator();
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0.0001, c);
    if (birdId === 'sparrow') {
      v.type = 'sine';
      v.frequency.setValueAtTime(3400 * Math.sqrt(up), c);
      v.frequency.exponentialRampToValueAtTime(5200 * Math.sqrt(up), c + 0.05);
      vg.gain.exponentialRampToValueAtTime(0.45, c + 0.008);
      vg.gain.exponentialRampToValueAtTime(0.0001, c + 0.07);
    } else if (birdId === 'magpie') {
      v.type = 'square';
      v.frequency.setValueAtTime(1150 * Math.sqrt(up), c);
      v.frequency.exponentialRampToValueAtTime(950 * Math.sqrt(up), c + 0.08);
      vg.gain.exponentialRampToValueAtTime(0.18, c + 0.006);
      vg.gain.exponentialRampToValueAtTime(0.0001, c + 0.09);
    } else {
      v.type = 'sine';
      v.frequency.setValueAtTime(330 * Math.sqrt(up), c);
      v.frequency.linearRampToValueAtTime(390 * Math.sqrt(up), c + 0.06);
      v.frequency.linearRampToValueAtTime(300 * Math.sqrt(up), c + 0.16);
      vg.gain.exponentialRampToValueAtTime(0.55, c + 0.02);
      vg.gain.exponentialRampToValueAtTime(0.0001, c + 0.18);
    }
    v.connect(vg).connect(out);
    v.start(c);
    v.stop(c + 0.2);
  }

  // 폭발 「쿵」: 빛보다 늦게 도착한다(거리 ÷ 340)
  boom(size, dist, pos, id = 0) {
    const dur = 1.4 + size * 0.6;
    const delay = dist / AUDIO.speedOfSound;
    if (!this._take(dur + delay)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    this._log('boom', t, id, { delay, dist });
    const out = this._panner(pos, Math.min(1.4, 0.75 * size), 18);
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(95, t);
    o.frequency.exponentialRampToValueAtTime(36, t + 0.6);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.9, t + 0.015);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    o.connect(og).connect(out);
    o.start(t);
    o.stop(t + 1);
    const n = this._noise(t, dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(Math.max(500, 4200 - dist * 12), t);
    lp.frequency.exponentialRampToValueAtTime(200, t + dur);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.75, t + 0.012);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(lp).connect(ng).connect(out);
  }

  // 9차 위협 불꽃 「쾅」: 박자에 정확히(거리 지연 없음). 120ms 저음 + 높은 「파삭」. at: 폭발 박자 시각(소리 시계)
  bang(at, pos, id = 0, size = 1) {
    if (!this._take(0.9)) return;
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    this._log('bang', t, id);
    const out = this._panner(pos, Math.min(1.4, 0.9 * size), 16);
    // 저음 120ms
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(1.0, t + 0.006);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    o.connect(og).connect(out);
    o.start(t);
    o.stop(t + 0.16);
    // 몸통(짧은 저역 잡음)
    const n = this._noise(t, 0.35);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1800, t);
    lp.frequency.exponentialRampToValueAtTime(240, t + 0.3);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.55, t + 0.005);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    n.connect(lp).connect(ng).connect(out);
    // 높은 「파삭」(고역 잡음 짧게 여러 번)
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3200;
    hp.connect(out);
    for (let i = 0; i < 6; i++) {
      const tt = t + 0.01 + i * 0.022 + Math.random() * 0.012;
      const c = this._noise(tt, 0.025);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.7 * (1 - i * 0.12), tt);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.025);
      c.connect(g).connect(hp);
    }
  }

  // 10차 HP 먹이 「띠링」: 따뜻한 두 음 상승(9차 「줄 완성」 화음은 없앰)
  heal() {
    if (!this._take(0.8)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('heal', t);
    const out = this._out(0, 0.24);
    [[784, 0], [1174.66, 0.11]].forEach(([f, d]) => {
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(f, t + d);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(0.5, t + d + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.6);
      o.connect(g).connect(out);
      o.start(t + d);
      o.stop(t + d + 0.65);
    });
  }

  // 10차 위협 불꽃 불티 「치이익」: 높은 잡음이 0.55초 동안 내려가며 줄어듦(폭발 바로 뒤)
  sizzle(pos, dur = 0.55) {
    if (!this._take(dur + 0.1)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + 0.03;
    this._log('sizzle', t);
    const out = this._panner(pos, 0.32, 14);
    const n = this._noise(t, dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(5200, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(bp).connect(g).connect(out);
  }

  // 타닥타닥(불씨)
  crackle(dist, pos, count = 10, span = 0.9) {
    const delay = dist / AUDIO.speedOfSound;
    if (!this._take(span + delay + 0.2)) return;
    const ctx = this.ctx;
    const out = this._panner(pos, 0.5, 14);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    hp.connect(out);
    for (let i = 0; i < count; i++) {
      const t = ctx.currentTime + delay + 0.15 + Math.random() * span;
      const s = this._noise(t, 0.03);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.9, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      s.connect(g).connect(hp);
    }
  }

  // 롤 예고음 「틱」(시안 계열의 작은 소리). at: 소리 시각(박자에 맞춘 시각)
  tick(at, id = 0) {
    if (!this.ctx || !this.settings.sound) return; // 롤 신호라 동시 소리 상한에서 빼지 않는다
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    this._log('tick', t, id);
    const out = this._out(0, 0.22);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    g.connect(out);
    for (const f of [2637, 3951]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t);
      o.connect(g);
      o.start(t);
      o.stop(t + 0.08);
    }
  }

  // 8차 「째깍」: 다음 웨이브 마지막 4박, 그 알 자리에서(3D). 짧은 딸깍 두 겹, 마지막 박은 한 음 높게
  tickAt(at, pos, last = false, id = 0) {
    if (!this.ctx || !this.settings.sound) return;
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    this._log('tick', t, id, { last });
    const out = this._panner(pos, last ? 0.75 : 0.55, 14);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = last ? 3200 : 2400;
    bp.Q.value = 6;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    const n = this._noise(t, 0.06);
    n.connect(bp).connect(g).connect(out);
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(last ? 1760 : 1320, t);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.35, t + 0.002);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(og).connect(out);
    o.start(t);
    o.stop(t + 0.07);
  }

  // 8차 낙하산 펴짐 「퍽」(작고 낮게, 웨이브마다 한 번)
  chute(pos, id = 0) {
    if (!this.ctx || !this.settings.sound || !this._take(0.2)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('chute', t, id);
    const out = this._panner(pos, 0.35, 12);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    const n = this._noise(t, 0.2);
    n.connect(lp).connect(g).connect(out);
  }

  // 퍼펙트 「칭」 — 콤보마다 5음계 한 칸 위. at: 다음 16분음표
  chime(step, at) {
    if (!this._take(1.2)) return;
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    this._log('chime', t);
    const scale = [0, 2, 4, 7, 9]; // 도 레 미 솔 라
    const semi = 12 * Math.floor(step / 5) + scale[step % 5];
    const f = 1046.5 * Math.pow(2, Math.min(24, semi) / 12);
    const out = this._out(0, 0.3);
    for (const [mul, gain, dec] of [[1, 1, 0.9], [2.01, 0.35, 0.45], [3.02, 0.15, 0.25]]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f * mul, t);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + dec + 0.05);
    }
  }

  // 10차: 롤 0개일 때 Space 「턱」(둔하고 짧은 저음 — 롤이 안 나감)
  thud() {
    if (!this.ctx || !this.settings.sound) return; // 조작 신호라 동시 소리 상한에서 빼지 않는다
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('thud', t);
    const out = this._out(0, 0.5);
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(70, t + 0.08);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.8, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.12);
  }

  // 10차: 롤 하나 얻음(롤 먹이·쉬는 구간 보충) — 바람 「휙」 + 높은 종 두 번
  rollGain() {
    if (!this._take(0.8)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('rollGain', t);
    this.whoosh(0.45, 0);
    const out = this._out(0, 0.22);
    [[2093, 0.05], [3136, 0.13]].forEach(([f, d]) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t + d);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(0.6, t + d + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.5);
      o.connect(g).connect(out);
      o.start(t + d);
      o.stop(t + d + 0.55);
    });
  }

  // 11차 점수 전환 「찰랑」: 가득일 때 먹이를 먹으면 맑은 3음(위로)
  coin() {
    if (!this._take(0.8)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('coin', t);
    const out = this._out(0, 0.2);
    [[1568, 0], [2093, 0.07], [2637, 0.14]].forEach(([f, d]) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t + d);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(0.55, t + d + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.45);
      o.connect(g).connect(out);
      o.start(t + d);
      o.stop(t + d + 0.5);
    });
  }

  // 「휙」(스침·퍼펙트 뒤)
  whoosh(level = 1, pan = 0) {
    if (!this._take(0.5)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const out = this._out(pan, 0.35 * level);
    const n = this._noise(t, 0.4);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.5;
    bp.frequency.setValueAtTime(600, t);
    bp.frequency.exponentialRampToValueAtTime(3000, t + 0.12);
    bp.frequency.exponentialRampToValueAtTime(500, t + 0.38);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
    n.connect(bp).connect(g).connect(out);
  }

  // 피격 「지직-쿵」
  zap() {
    if (!this._take(0.7)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._log('zap', t);
    const out = this._out(0, 0.6);
    const n = this._noise(t, 0.22);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2200;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    for (let i = 0; i < 7; i++) {
      const a = t + i * 0.022;
      ng.gain.setValueAtTime(0.9, a);
      ng.gain.setValueAtTime(0.05, a + 0.012);
    }
    ng.gain.setValueAtTime(0.0001, t + 0.18);
    n.connect(hp).connect(ng).connect(out);
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, t + 0.12);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.5);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t + 0.12);
    og.gain.exponentialRampToValueAtTime(1, t + 0.13);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    o.connect(og).connect(out);
    o.start(t + 0.12);
    o.stop(t + 0.65);
  }

  // 껍질 접근 「쉬이익」 크기(0~1). 분위기 소리일 뿐 타이밍 신호는 아니다
  approach(level) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const l = Math.max(0, Math.min(1, level));
    this.apGain.gain.setTargetAtTime(0.16 * l * l, t, 0.04);
    this.apFilter.frequency.setTargetAtTime(1600 + 2600 * l, t, 0.05);
  }

  // 배경음악 먹먹함: 저역 통과 hz 로 dur 초 뒤 원래대로. drumsOut: 그동안 북 빠짐(Thumper 방식)
  muffle(dur, hz, drumsOut = false) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const f = this.musicFilter.frequency;
    const base = this._settled ? 900 : 18000;
    f.cancelScheduledValues(t);
    f.setValueAtTime(Math.max(50, f.value), t);
    f.exponentialRampToValueAtTime(hz, t + 0.03);
    f.setValueAtTime(hz, t + dur);
    f.exponentialRampToValueAtTime(base, t + dur + 0.25);
    if (drumsOut) {
      const g = this.drumGain.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(0, t + 0.05);
      g.setValueAtTime(0, t + dur);
      g.linearRampToValueAtTime(1, t + dur + 0.2);
    }
  }

  // 숨 고르기 구간: 오래 가라앉힘(false 면 원래대로)
  settle(on) {
    if (!this.ctx || this._settled === on) return;
    this._settled = on;
    const t = this.ctx.currentTime;
    const f = this.musicFilter.frequency;
    f.cancelScheduledValues(t);
    f.setTargetAtTime(on ? 900 : 18000, t, on ? 0.6 : 0.3);
  }

  // 환호: 잡음을 사람 목소리 대역(모음 「아」의 공명)으로 걸러 여러 겹. at: 시작 소리 시각(박자 맞춤)
  cheer(level, dur = 1.8, at = 0) {
    if (!this._take(dur)) return;
    const ctx = this.ctx;
    const t = Math.max(ctx.currentTime, at);
    const out = this._out(0, 0.28 * Math.min(1.3, level));
    const layers = level > 0.8 ? 5 : 3;
    for (let k = 0; k < layers; k++) {
      const s = this._noise(t, dur);
      const f1 = ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.value = 700 + Math.random() * 250;
      f1.Q.value = 6;
      const f2 = ctx.createBiquadFilter();
      f2.type = 'bandpass';
      f2.frequency.value = 1150 + Math.random() * 300;
      f2.Q.value = 5;
      const g = ctx.createGain();
      const st = t + Math.random() * 0.1;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(1, st + 0.2);
      g.gain.setTargetAtTime(0.0001, st + dur * 0.5, dur * 0.2);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 3 + Math.random() * 4;
      const lg = ctx.createGain();
      lg.gain.value = 0.35;
      lfo.connect(lg).connect(g.gain);
      lfo.start(st);
      lfo.stop(st + dur);
      s.connect(f1);
      s.connect(f2);
      f1.connect(g);
      f2.connect(g);
      g.connect(out);
    }
  }

  // 구조물에 부딪힘
  hit() {
    if (!this._take(0.4)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const out = this._out(0, 0.5);
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(320, t);
    o.frequency.exponentialRampToValueAtTime(90, t + 0.3);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.8, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.4);
  }

  // 특수 능력·롤 안내음
  blip(freq = 880, dur = 0.12, vol = 0.18) {
    if (!this._take(dur)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const out = this._out(0, vol);
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  // 장식 불꽃 발사음(멀리서 짧게)
  whistle(dist, pos) {
    const dur = 1.1;
    if (dist > 160 || !this._take(dur)) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const out = this._panner(pos, 0.25, 20);
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(700 + Math.random() * 300, t);
    o.frequency.exponentialRampToValueAtTime(2200 + Math.random() * 600, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
}
