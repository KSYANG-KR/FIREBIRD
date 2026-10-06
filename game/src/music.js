// 5차 배경음악: 음원 파일 없이 Web Audio 로 합성한 120BPM 축제풍 루프(태고풍 북 + 시메 + 셰이커 + 베이스 + 5음계 패드 + 종).
// 박자 시계는 하나: 게임의 「박자 시계」(스테이지 시작부터 게임 시간을 누적, 슬로모·히트스톱이면 그만큼 느려지거나 멈춤).
// 스케줄러는 매 프레임 이 시계를 읽어, 실제 시간으로 lookahead(0.05초) 안에 들어온 16분음표만 소리 시계(AudioContext)에 예약한다.
//   예약 시각 = 지금 소리 시각 + (그 박자까지 남은 게임 시간을 게임의 슬로모·히트스톱 시간표로 실제 시간으로 바꾼 값).
//   그래서 슬로모·히트스톱 동안에는 다음 음이 그만큼 뒤로 밀린다. 슬로모·히트스톱이 새로 걸리면 rewind() 로 미리 예약한 음을 거둬 다시 예약한다.
// 음원 파일로 바꿀 때: beatTime()/update() 인터페이스를 유지하고, update 에서 파일 재생 위치를 박자 시계에 맞추면 된다.
import { MUSIC, BEAT } from './config.js';

const S16 = BEAT.sixteenth;
// 라 단조 5음계(라 도 레 미 솔). 마디마다 화음(근음, 화음 음들)
const CHORDS = [
  { root: 55, notes: [220, 261.63, 329.63] }, // A C E
  { root: 49, notes: [196, 261.63, 293.66] }, // G C D
  { root: 65.41, notes: [261.63, 329.63, 392] }, // C E G
  { root: 73.42, notes: [293.66, 392, 440] }, // D G A
];
const BELL = [440, 523.25, 587.33, 659.25, 783.99, 880];

export class Music {
  constructor(sound) {
    this.sound = sound;
    this.on = false;
    this.next = 0;
    this.log = []; // 점검: { Tb(박자 시각), at(예약 소리 시각) }
    this.logOn = false;
    this.clock = () => 0;
    this.levelAt = () => 1;
    this.pending = []; // 예약했지만 아직 울리지 않은 음 { Tb, nodes } — 슬로모·히트스톱이 시작되면 거둬들여 다시 예약
    this._cur = null;
    this.accents = new Set(); // 9차: 위협 불꽃 폭발 박자(16분음표 번호) — 그 박에 큰 북을 세게
  }

  // 9차: 폭발 박자 목록(박자 시계 초)을 받아 그 박에 킥(큰 북)을 맞춘다
  setAccents(times) {
    this.accents = new Set(times.map((t) => Math.round(t / S16)));
  }

  _track(node) {
    if (this._cur) this._cur.push(node);
    return node;
  }

  // 시간 배율이 갑자기 줄면(슬로모 시작·히트스톱) 이미 예약한 앞 음을 거둬들이고 그 박자부터 다시 예약한다
  rewind() {
    const s = this.sound;
    if (!this.on || !s.ready) return;
    const now = this.clock();
    let first = null;
    for (const p of this.pending) {
      if (p.Tb <= now + 1e-6) continue;
      for (const n of p.nodes) {
        try { n.stop(0); } catch { /* 이미 끝남 */ }
      }
      if (first === null || p.Tb < first) first = p.Tb;
    }
    this.pending = this.pending.filter((p) => p.Tb <= now + 1e-6);
    if (first !== null) {
      this.next = Math.round(first / S16);
      if (this.logOn) this.log = this.log.filter((m) => m.Tb < first - 1e-6);
    }
  }

  // 지금 게임 박자 시계(초)
  beatTime() {
    return this.clock();
  }

  start(clockFn, levelFn) {
    this.clock = clockFn;
    this.levelAt = levelFn;
    this.next = Math.max(0, Math.ceil(clockFn() / S16 - 1e-6));
    this.on = true;
  }

  stop() {
    this.on = false;
  }

  // 박자 시각 Tb 가 소리 시계로 언제인가. aheadFn 이 숫자면 그 배율로 나눈다
  audioTimeOf(Tb, aheadFn) {
    const s = this.sound;
    if (!s.ready) return 0;
    const d = Math.max(0, Tb - this.clock());
    return s.ctx.currentTime + (typeof aheadFn === 'function' ? aheadFn(d) : d / Math.max(0.05, aheadFn || 1));
  }

  // 다음 16분음표 박자 시각(지금 이후)
  nextSixteenth() {
    return Math.ceil(this.clock() / S16 + 1e-6) * S16;
  }

  // aheadFn(박자 Δ) → 실제 몇 초 뒤인가(게임이 정해 둔 슬로모·히트스톱 시간표를 그대로 따라 계산)
  update(aheadFn) {
    const s = this.sound;
    if (!this.on || !s.ready || !s.settings.sound) return;
    const ctx = s.ctx;
    const now = this.clock();
    if (this.pending.length > 8) this.pending = this.pending.filter((p) => p.Tb > now - 0.5);
    for (let guard = 0; guard < 16; guard++) {
      const Tb = this.next * S16;
      const ahead = Tb >= now ? aheadFn(Tb - now) : (Tb - now);
      if (ahead > MUSIC.lookahead) break;
      if (ahead > -0.04) {
        const at = ctx.currentTime + Math.max(0, ahead);
        this._cur = [];
        this._step(this.next, at, this.levelAt(Tb));
        this.pending.push({ Tb, nodes: this._cur });
        this._cur = null;
        if (this.logOn) {
          this.log.push({ Tb, at });
          if (this.log.length > 3000) this.log.splice(0, 500);
        }
      }
      this.next++;
    }
  }

  _step(i, at, level) {
    const st = i % 16;
    const bar = Math.floor(i / 16);
    const ch = CHORDS[bar % 4];
    if (st === 0) this._pad(at, ch.notes, BEAT.bar, level === 0 ? 0.05 : 0.04);
    // 태고(큰 북)
    const taiko = level === 0 ? { 0: 0.45, 8: 0.25 } : level === 1 ? { 0: 1, 6: 0.45, 8: 0.8, 11: 0.4 } : level === 2 ? { 0: 1, 3: 0.4, 6: 0.55, 8: 0.85, 11: 0.5, 14: 0.4 } : { 0: 1, 2: 0.5, 4: 0.7, 6: 0.6, 8: 1, 10: 0.5, 12: 0.75, 13: 0.4, 14: 0.7, 15: 0.5 };
    if (this.accents.has(i)) this._taiko(at, 1.15); // 9차: 폭발 박에 킥
    else if (taiko[st]) this._taiko(at, taiko[st]);
    if (level >= 1 && (st === 4 || st === 12)) this._shime(at, 0.5);
    if (level >= 2) {
      this._shaker(at, st % 2 ? 0.55 : 0.3);
      if (st === 14 || st === 15) this._shime(at, 0.35);
    }
    // 베이스
    if (level >= 1) {
      const bassSteps = level >= 3 ? [0, 2, 4, 6, 8, 10, 12, 14] : [0, 3, 8, 11];
      if (bassSteps.includes(st)) {
        const f = st === 3 || st === 11 || st === 6 || st === 14 ? ch.root * 1.5 : ch.root;
        this._bass(at, f, level >= 3 ? 0.22 : 0.32);
      }
    }
    if (level >= 3 && st % 2 === 0) this._bell(at, BELL[(st / 2 + bar * 3) % BELL.length]);
  }

  _taiko(at, vel) {
    const ctx = this.sound.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(92, at);
    o.frequency.exponentialRampToValueAtTime(44, at + 0.28);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.9 * vel, at + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.45);
    o.connect(g).connect(this.sound.drumGain);
    o.start(at);
    o.stop(at + 0.5);
    this._track(o);
    const n = this._track(this.sound._noise(at, 0.08));
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.5 * vel, at);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.07);
    n.connect(lp).connect(ng).connect(this.sound.drumGain);
  }

  _shime(at, vel) {
    const ctx = this.sound.ctx;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(330, at);
    o.frequency.exponentialRampToValueAtTime(250, at + 0.06);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.35 * vel, at + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.1);
    o.connect(g).connect(this.sound.drumGain);
    o.start(at);
    o.stop(at + 0.12);
    this._track(o);
    const n = this._track(this.sound._noise(at, 0.05));
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2200;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.35 * vel, at);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.05);
    n.connect(bp).connect(ng).connect(this.sound.drumGain);
  }

  _shaker(at, vel) {
    const ctx = this.sound.ctx;
    const n = this._track(this.sound._noise(at, 0.06));
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.16 * vel, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.055);
    n.connect(hp).connect(g).connect(this.sound.drumGain);
  }

  _bass(at, f, dur) {
    const ctx = this.sound.ctx;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(f, at);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(700, at);
    lp.frequency.exponentialRampToValueAtTime(220, at + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.32, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(lp).connect(g).connect(this.sound.musicIn);
    o.start(at);
    o.stop(at + dur + 0.02);
    this._track(o);
  }

  _pad(at, notes, dur, vol) {
    const ctx = this.sound.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1300;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(vol, at + 0.35);
    g.gain.setValueAtTime(vol, at + dur - 0.3);
    g.gain.linearRampToValueAtTime(0.0001, at + dur + 0.15);
    lp.connect(g).connect(this.sound.musicIn);
    for (const f of notes) {
      for (const det of [-6, 6]) {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det;
        o.connect(lp);
        o.start(at);
        o.stop(at + dur + 0.2);
        this._track(o);
      }
    }
  }

  _bell(at, f) {
    const ctx = this.sound.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f * 2, at);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.07, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
    o.connect(g).connect(this.sound.musicIn);
    o.start(at);
    o.stop(at + 0.32);
    this._track(o);
  }
}
