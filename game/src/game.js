// 게임 흐름: 시작 화면 → 새 선택(스테이지 줄: S1 만 열림, S2~S5 「준비 중」) → 시작 장면 → S1 → 클리어(최종) / 추락 → 통닭 엔딩 → 다시.
// 6차: 새는 거리 기준 코스(course.js)를 따라 강 위(다리 A 밑) → 좌 90° 선회 → 대로·빌딩 협곡 → 상승 → 옥상 위 우 120° → 강으로 하강 → 다리 B 밑을 난다.
//      7차: 위협은 실제 불꽃 두 종류(bursts.js — 가운데가 빈 고리는 가운데로, 가운데가 꽉 찬 모란은 사이로), 점수는 먹이(food.js).
//      8차: 판 시작 때 안무를 미리 짠다(choreo.js). 터질 자리를 4초 앞부터 「낙하산 불꽃 알」로 예고(omens.js), 새가 그 깊이에 닿는 순간 터진다.
//      (6차 꽃문·5차 껍질 코드는 9차에 지움) 장식 불꽃은 통로 밖 세 거리대(fireworks.js), 카메라는 경로를 따라(camera.js).
import * as THREE from 'three';
import {
  BIRDS, BIRD_ORDER, STAGES, PLAYABLE, SCORING, HEAL_BETWEEN_STAGES, DAMAGE, CAMERA, RENDER, INTRO, FALL,
  ENDING_CORE, FALL_LINES, CLEAR_LINES, RANKING, FIREWORK_TYPES, LIGHTS, SAFETY, DECOR,
  ROLL, FEEL, BEAT, MUSIC, BURST, FOOD, OMEN, TIMING,
} from './config.js';
import { FLAG_FLICKER } from './particles.js';
import { World } from './world.js';
import { Crowd } from './crowd.js';
import { Fireworks } from './fireworks.js';
import { Bursts } from './bursts.js';
import { Food } from './food.js';
import { Music } from './music.js';
import { Director } from './director.js';
import * as Choreo from './choreo.js';
import { Bird } from './bird.js';
import { CameraRig, baseFov } from './camera.js';
import { Course, boxDist, insideBox, segHitsBox } from './course.js';
import { FlashLimiter } from './safety.js';
import { FlashLights } from './lights.js';
import { createRoastChicken, poseBird } from './models.js';
import { normalizeNickname, rankingStore, tabList, defaultTab } from './ranking.js';
import { stageScore, newRun, onStageStart, onStageClear, onFallRetry, buildSubmission, runTotal } from './run.js';
import { formatTime } from './ui.js';
import { saveSettings, userSetLowSpec } from './settings.js';
import { progressStore } from './progress.js';

// 개발 모드(npm.cmd run dev)에서만 켜진다. 공개 빌드에서는 false 로 바뀌어 빠진다.
const DEV = !!(import.meta.env && import.meta.env.DEV);
// 17차 U2: FPS 표시는 개발 모드이거나 주소에 ?fps=1 일 때만
const SHOW_FPS = DEV || (typeof location !== 'undefined' && new URLSearchParams(location.search).get('fps') === '1');

const BURST_SIZE = { finale: 1.4, chrysanthemum: 1, willow: 0.9, ring: 0.8, peony: 0.7 };
const MUSICLOOK = MUSIC.lookahead;
const BIRD_RIM = new THREE.Color(0.05, 0.16, 0.22);
const FLAG_FLICKER_FX = FLAG_FLICKER;
const GPU_KEY = 'bvf.gpuNoticeClosed';
const MENU_FORWARD = 13; // 메뉴 배경에서 쓰는 경로(가운데 새 속도)

export { stageScore }; // 16차: run.js 로 옮김(옛 import 경로 유지)
const LAST_NAME_KEY = 'bvf.lastName';
const TAB_IDS = STAGES.map((s) => String(s.id)); // 16차 4-6: TOP 10 스테이지 탭 S1~S5
const CLEAR_CRUISE = 3; // 2-6: 스테이지 끝 3초 순항 뒤 STAGE CLEAR 카드
const CLEAR_AUTO = 8; // 카드가 뜬 뒤 8초면 NEXT 자동
const FADE_MS = 600; // 0.6초 동안 검게

export class Game {
  constructor({ renderer, input, sound, ui, settings, touch = false, mobile = false, store = rankingStore, progress = progressStore }) {
    this.renderer = renderer;
    this.input = input;
    this.sound = sound;
    this.ui = ui;
    this.settings = settings;
    this.touch = touch;
    this.mobile = mobile; // 16차 3-4: 터치 기기 저사양 프로필(시작 때 정함)
    this.store = store;
    this.progress = progress; // 16차 2-6: 잠금 해제 진행(bvf.progress.v1)
    this.selStage = 1; // 고르기 화면 스테이지 칩(1 = FULL RUN, 2~5 = PRACTICE)

    this.scene = new THREE.Scene();
    const aspect = renderer ? renderer.width / renderer.height : 16 / 9;
    this.camera = new THREE.PerspectiveCamera(baseFov(aspect), aspect, CAMERA.near, mobile ? RENDER.mobile.far : 2200); // 16차: 4:3 FOV 보정, 모바일 far 1100
    this.lights = new FlashLights(this.scene); // 폭발 순간광(동시 4개 이하)
    this.world = new World(this.scene, this.lights);
    this.crowd = new Crowd(this.scene, this.world.shared);
    this.fw = new Fireworks(this.scene, this.lights);
    this.threats = new Bursts(this.scene, this.lights);
    this.threats.useSparks(this.fw.sparks); // 8차: 입자계 공유(그리기 호출 −1)
    this.threats.useSmoke(this.fw.smoke); // 10차: 위협 불꽃 연기도 같은 연기 입자계로(그리기 호출 늘지 않음)
    this.Bursts = Bursts; // 봇·점검용(게임이 쓰는 것과 같은 판정 함수)
    this.Choreo = Choreo; // 8차 봇·점검용(안전 칸 계산)
    this.food = new Food(this.scene);
    this.music = new Music(sound);
    // 5차 시간: 게임 시간 = 실제 시간 × 배율(슬로모 0.35, 히트스톱 0). 박자 시계 = 스테이지 시작부터 누적한 게임 시간(stats.elapsed)
    this.timeScale = 1;
    this.hitStopT = 0;
    this.slowT = -1; // 슬로모 진행(실제 초), −1 이면 아님
    this.lastSlow = -99;
    this.realPlay = 0; // 플레이 중 실제 시간 누적
    this.evlog = []; // 점검용 사건 기록(measureOn 일 때)
    this.scriptOpts = {}; // 점검용: { untilBar, variant }
    this.geo = { boxDist, insideBox, segHitsBox };
    this.bird = new Bird(this.scene);
    this.rig = new CameraRig(this.camera);
    this._applyLowSpec();
    if (renderer) {
      renderer.onResize.push((w, h) => {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.endCam.aspect = w / h;
        this.endCam.updateProjectionMatrix();
      });
    }
    // 시작 장면에서 「날아갈 방향」 하늘을 미리 채울 때 쓰는 보조 카메라(−Z 를 봄)
    this.aheadCam = new THREE.PerspectiveCamera(baseFov(aspect), aspect, 0.2, 2000);

    this.flashLimiter = new FlashLimiter();
    this.popClock = 0;
    try { ui.clock = () => this.popClock * 1000; } catch { /* 점검용 가짜 UI */ } // 11차: 팝업 글자는 게임의 실제 시각으로 움직인다
    this._rim = new THREE.Color();
    this.border = 0;
    this.lastCheer = -10;
    this.t = 0;
    this.real = 0;
    this.god = false;
    this.paused = false;
    this.selected = 'sparrow';
    this.rankTab = null; // 16차: TOP 10 탭 { tab: 'full' | '1', sub } — null 이면 기본 탭(FULL RUN 에 기록이 있으면 FULL RUN, 없으면 S1)
    this.fps = 60;
    this._fpsAcc = 0;
    this._fpsN = 0;
    this._lowFpsT = 0;
    this._lowFpsTold = false;
    this.perfLog = {};
    this.measureOn = false; // 점검 지표(봇·확인 스크립트가 켬). 게임 중에는 꺼서 가볍게
    this.resetMetrics();

    // 시작 장면: 강 위 두 기둥 사이 전깃줄
    this.perch = new THREE.Group();
    const wireMat = new THREE.MeshLambertMaterial({ color: 0x111116 });
    this.perch.add(new THREE.Mesh(new THREE.BoxGeometry(80, 0.06, 0.06), wireMat));
    this.poles = [];
    for (const x of [-40, 40]) {
      const pole = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), new THREE.MeshLambertMaterial({ color: 0x3a3c44 }));
      pole.position.x = x;
      this.perch.add(pole);
      this.poles.push(pole);
    }
    this.scene.add(this.perch);
    this.perch.visible = false;

    // 엔딩 장면(주황 화면의 통닭)
    this.endScene = new THREE.Scene();
    this.endScene.background = new THREE.Color(0xf08a24);
    this.endScene.add(new THREE.HemisphereLight(0xfff2dd, 0x8a4a10, 2.2));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(2, 4, 3);
    this.endScene.add(sun);
    this.chicken = createRoastChicken();
    this.chicken.position.y = -0.2;
    this.endScene.add(this.chicken);
    this.steam = [];
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false });
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 0), steamMat.clone());
      s.userData.t = Math.random() * 2;
      this.endScene.add(s);
      this.steam.push(s);
    }
    this.endCam = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.endCam.position.set(0, 2.3, 5.6);
    this.endCam.lookAt(0, -0.75, 0); // 15차: 통닭을 화면 위쪽 절반에(아래는 글 판)

    this.cruiser = { s: 0, u: 0, v: 22, vx: 0, vy: 0, roll: 0, radius: 0.5, forward: 9, pos: new THREE.Vector3() };
    this.fw.onBurst = (hz) => this._onBurst(hz);
    this.fw.onLaunch = (f) => this._onLaunch(f);
    this.gpuSoftware = !!(renderer && renderer.software);
    this.currentStageIndex = -1;
    this.currentForward = 0;

    this.devFreeze = false;
    if (DEV) {
      ui.setDev('DEV · N skip stage · G god mode · B hit bands');
      if (typeof window !== 'undefined') window.__bvf = this;
    }
    this.enterTitle();
  }

  resetMetrics() {
    this.metrics = {
      frames: 0, camInside: 0, camInsideLog: [], birdOccluded: 0, bounces: 0, bounceHits: 0, lastBounce: -10,
      bursts: [], occMax: 0, occWhat: '', decorIntrude: 0, decorCenterIn: 0,
      screen: { minX: 1, maxX: 0, minY: 1, maxY: 0 }, visViol: [],
      perf: { calls: [Infinity, 0], tris: [Infinity, 0], fps: [Infinity, 0] },
      scaleLog: [], clock: [], trauma: 0, maxApproach: 0, maxLive: 0,
    };
  }

  _applyLowSpec() {
    const low = this.settings.lowSpec;
    this.fw.setLowSpec(low);
    this.threats.setLowSpec(low, RENDER.lowSpecParticleMult);
    this.world.setLowSpec(low);
    if (this.director) this.director.lowSpec = low;
    // 16차 3-4: 모바일 프로필 — 장식 불꽃 거리대마다 2, 먼 배경은 far 안으로
    this.fw.decorMax = this.mobile ? RENDER.mobile.decorMax : Infinity;
    if (this.world.setFar) this.world.setFar(this.mobile ? RENDER.mobile.far : 2200);
    this.crowd.view = this.world.nearView || null;
  }

  // 외부 에셋(외벽·연기·간판 폰트)을 다 읽은 뒤 한 번
  useAssets(a) {
    this.assets = a;
    this.world.useAssets(a);
    this.fw.useAssets(a);
    const env = this.renderer ? this.world.makeEnv(this.renderer.renderer) : null;
    this.bird.useAssets({ env, birds: a.birds });
    if (a.smoke[0] && a.smoke[1]) {
      const plane = new THREE.PlaneGeometry(0.42, 0.42);
      this.steam.forEach((s, i) => {
        s.geometry = plane;
        s.material.alphaMap = a.smoke[i % 2];
        s.material.needsUpdate = true;
        s.rotation.z = Math.random() * Math.PI * 2;
      });
    }
  }

  // ======================= 상태 전환 =======================
  _useStage(i, forward) {
    const st = STAGES[i];
    this.stage = st;
    this.currentStageIndex = i;
    this.currentForward = forward;
    // 시작 장면에서 날아오르며 간 거리(16차 U6a: 스테이지 intro 정의 — 잠든 새 장면이면 전진 × 떠오름 × 0.5, 아니면 intro.s0)
    this.s0 = st.intro && st.intro.s0 !== undefined ? st.intro.s0 : forward * INTRO.rise * 0.5;
    this.course = new Course(st, forward, this.s0);
    this.world.build(st, this.course);
    this.crowd.build(this.world.crowdSpots, this.world.crowdGroundY, Math.round(st.city.crowd * (this.mobile ? RENDER.mobile.crowdMult : this.settings.lowSpec ? 0.6 : 1)), this.world.crowdY);
    this.crowd.R = st.city.crowdR || 280; // 16차 U10
    this.crowd._last = null;
    this.fw.reset();
    this.fw.setStage(st);
    if (this.mobile) { // 16차 3-4: 안개 ×1.3(far 1100 안에서 끝이 보이지 않게)
      this.world.fog.density *= RENDER.mobile.fogMult;
      this.world.shared.uFogDensity.value *= RENDER.mobile.fogMult;
    }
    this.threats.setStage(st, this.course, this.world);
    this.threats.shadowOn = false;
    this.bird.setCourse(this.course);
    this.rig.setCourse(this.course);
    this.rig.finale = 0;
    for (const b of this.course.colliders) b.fade = 1;
    const glow = new THREE.Color(st.city.cityGlow);
    this.fw.smokeTint = [glow.r * 0.55 + 0.035, glow.g * 0.5 + 0.035, glow.b * 0.45 + 0.045]; // 5차 B7: 연막이 도시광을 받아 번진다
    this.lights.clear();
  }

  _startV() {
    return this.course.center(0) - 1;
  }

  _resetCruiser() {
    const c = this.cruiser;
    c.s = 0;
    c.u = 0;
    c.v = this.course.center(0) + 4; // 15차: 메뉴 순항 높이도 통로 중심을 따른다
    this.rig.reset(c);
    this.decorAcc = 0;
  }

  async enterTitle() {
    this.state = 'title';
    this.paused = false;
    this.ui.showPause(false);
    this.ui.showHud(false);
    this.ui.introText('');
    this.ui.setBorder(0);
    this.crowd.setMaxCheer(0);
    if (this.currentStageIndex !== 0 || this.currentForward !== MENU_FORWARD) this._useStage(0, MENU_FORWARD);
    this.bird.group.visible = false;
    this.perch.visible = false;
    this.threats.reset();
    this.food.reset();
    this._resetCruiser();
    // 15차 C-2: 전체 화면 타이틀. 연출은 이 페이지를 연 뒤 처음 한 번(새로고침하면 다시), 일시정지 Quit 으로 오면 마지막 장면 그대로
    const animate = !this._titleShown;
    this._titleShown = true;
    this.titleT = animate ? 0 : 99;
    this._titleBoom = !animate;
    this.ui.showTitle({ settings: this.settings, touch: this.touch, gpuWarn: this._gpuWarnVisible(), animate, reduceMotion: !!this.settings.reduceMotion });
  }

  // 15차 타이틀 연출: 0.6초 가운데 뒤로 발사 꼬리 하나 → 1.2초 제목 뒤에서 금색 국화 한 발(장식 불꽃, HDR 1.4 이하, 번쩍임 제한 안)
  _titleShow(dt) {
    this.titleT += dt;
    if (!this._titleBoom && this.titleT >= 0.05) {
      this._titleBoom = true;
      const cam = this.camera;
      cam.updateMatrixWorld();
      const f = new THREE.Vector3();
      cam.getWorldDirection(f);
      f.y = 0;
      f.normalize();
      const p = cam.position.clone().addScaledVector(f, 150);
      p.y = cam.position.y + 34;
      const lp = p.clone();
      lp.y = Math.max(0.6, this.world.surfaceY ? this.world.surfaceY(lp.x, lp.z) + 0.4 : 0.6);
      this.fw._schedule('chrysanthemum', FIREWORK_TYPES.chrysanthemum, p, this.t + 1.2 - this.titleT, [1.35, 0.82, 0.28], this.world, { launchPos: lp, flight: 0.6, visR: 24, size: 1.2, particles: 520, life: 2.6 });
    }
  }

  // 새 고르기 화면 다시 그리기(TOP 10 펼침·톱니 옵션 상태 유지)
  _showSelect() {
    const view = this._rankView || null;
    const rt = this._tabState();
    const top = tabList(view, rt.tab, rt.sub);
    const best = view ? Math.max(0, ...view.runs.map((e) => e.score), ...view.stages['1'].filter((e) => e.mode === 'run').map((e) => e.score)) : 0;
    if (!this._stageOk(this.selStage)) this.selStage = 1;
    const stages = STAGES.map((s) => ({ id: s.id, name: s.name, playable: !!s.playable, unlocked: this._unlocked(s.id) }));
    this.ui.showSelect({ selected: this.selected, best, top: top.slice(0, 10), tabs: rt, settings: this.settings, showTop: !!this.selTop, showOpts: !!this.selOpts, stages, selStage: this.selStage });
  }

  // 16차 2-6: 스테이지 n 이 열렸는가(DEV 는 모두) · 고를 수 있는가(열림 + 만들어진 스테이지)
  _unlocked(n) {
    return this.progress.unlocked(n, DEV);
  }

  _stageOk(n) {
    const s = STAGES[n - 1];
    return !!s && !!s.playable && this._unlocked(n);
  }

  // 16차: TOP 10 탭 상태(FULL RUN: NO RETRY 기본 / ALL · S1: RUN 기본 / PRACTICE)
  _tabState() {
    if (!this.rankTab) {
      const tab = defaultTab(this._rankView);
      return { tab, sub: tab === 'full' ? 'clean' : 'run' };
    }
    return this.rankTab;
  }

  _setRankTab(tab, sub) {
    const t = tab === 'full' ? 'full' : TAB_IDS.includes(String(tab)) ? String(tab) : '1'; // 16차 U6b: S1~S5
    const s = t === 'full' ? (sub === 'all' ? 'all' : 'clean') : sub === 'practice' ? 'practice' : 'run';
    this.rankTab = { tab: t, sub: s };
  }

  async _loadTop() {
    try {
      this._rankView = await this.store.list();
    } catch {
      this._rankView = null;
    }
  }

  _gpuWarnVisible() {
    if (!this.gpuSoftware) return false;
    try {
      return typeof sessionStorage === 'undefined' || sessionStorage.getItem(GPU_KEY) !== '1';
    } catch {
      return true;
    }
  }

  enterSelect() {
    this.state = 'select';
    this.paused = false;
    this.ui.showPause(false);
    this.ui.showHud(false);
    this.ui.introText('');
    this.crowd.setMaxCheer(0);
    if (this.currentStageIndex !== 0 || this.currentForward !== MENU_FORWARD) {
      this._useStage(0, MENU_FORWARD);
      this._resetCruiser();
    }
    this.threats.reset();
    this.food.reset();
    this.perch.visible = false;
    this.bird.setSpecies(this.selected);
    this.bird.reset(BIRDS[this.selected].hp, this.cruiser.v, this.cruiser.s);
    this.bird.group.visible = true;
    this.selectAngle = 0.6;
    this.selTop = false;
    this.selOpts = false;
    this._showSelect();
    this._loadTop().then(() => { if (this.state === 'select') this._showSelect(); });
  }

  startRun() {
    this.run = newRun(this.selected, 'run', 1); // 16차: run.js(전체 판, S1 부터)
    this.bird.setSpecies(this.selected);
    this.startStage(0, BIRDS[this.selected].hp, true);
  }

  // 16차 2-6: 연습 = 그 스테이지 하나만, HP 가득, 스테이지 기록만
  startPractice(n) {
    this.run = newRun(this.selected, 'practice', n);
    this.bird.setSpecies(this.selected);
    this.startStage(n - 1, BIRDS[this.selected].hp, true);
  }

  // withIntro: S1 은 잠든 새 장면, S2~S5 는 1.5초 날아드는 장면(intro.flyIn). rolls: 시작 롤 개수(없으면 기본 3)
  startStage(i, hp, withIntro, rolls = null) {
    onStageStart(this.run, i, hp);
    this._useStage(i, BIRDS[this.selected].forward);
    this.director = new Director(this.stage, this.course, this.bird, this.settings.lowSpec, this.scriptOpts);
    this.stageDur = this.director.duration;
    // 15차: 시작 장면은 다리 A 트러스 윗현 위에서 잠든 새(기둥·전깃줄 횃대 없음)
    const A = this.world.bridgeA;
    const perchS = A ? this.course.nearest(0, A.perchZ).s : 0;
    const IN = this.stage.intro || {};
    const flyIn = withIntro && !IN.sleep ? IN.flyIn || 1.5 : 0;
    if (withIntro && IN.sleep && A) this.bird.reset(hp, A.perchY + BIRDS[this.selected].radius * 0.85, perchS);
    else if (flyIn) this.bird.reset(hp, this._startV(), this.s0 - BIRDS[this.selected].forward * flyIn); // 날아드는 장면: s0 에 닿게 뒤에서 출발
    else this.bird.reset(hp, this._startV(), withIntro ? 0 : this.s0);
    if (rolls !== null && rolls !== undefined) this.bird.rolls = rolls; // 16차: 다음 스테이지·이어하기는 롤 개수를 이어 감
    this._stageRolls = this.bird.rolls;
    this.bird.group.visible = true;
    this.stats = { nearMiss: 0, rings: 0, bonus: 0, chain: 0, hits: 0, elapsed: 0, phase: 0, obstacleHits: 0, perfect: 0, graze: 0, dodge: 0, maxChain: 0, rolls: 0, center: 0, centerMult: 0, pass: 0, timing: 0, food: 0, hpFood: 0, rollFood: 0, healed: 0 };
    this.music.stop();
    this.hitStopT = 0;
    this.slowT = -1;
    this.lastSlow = -99;
    this.realPlay = 0;
    this.evlog = [];
    this.hintBar = 0;
    this._restZone = null; // 10차: 쉬는 구간 롤 보충(구간마다 한 번)
    this.border = 0;
    this.crowd.setMaxCheer(0);
    this.paused = false;
    this.ui.showPause(false);
    this.ui.hideScreen();
    this.ui.setBorder(0);
    if (this.ui.clearPops) this.ui.clearPops();
    this._rimFx = null;
    this.rig.reset(this.bird);
    this.sound.setMurmur(0.6);
    this.threats.resetLog();
    this.food.resetLog();
    this.food.build(this.course);
    this.resetMetrics();
    if (flyIn) {
      this.state = 'flyin';
      this.introT = 0;
      this.flyInT = flyIn;
      this.perch.visible = false;
      this.ui.showHud(false);
      this.ui.introText('');
    } else if (withIntro) {
      this.state = 'intro';
      this.introT = 0;
      this.introBoom = false;
      this.perch.visible = false;
      this.perchY = this.bird.pos.y - this.bird.radius * 0.85;
      this.introY0 = null;
      this.ui.showHud(false);
      this.ui.introText('Z z z …');
    } else {
      this._beginPlay();
    }
  }

  _ctx(color = null) {
    return { camera: this.camera, course: this.course, world: this.world, camS: this.rig.s, color, quiet: this._quietFn || (this._quietFn = (t) => this.threats.burstNear(t, DECOR.quiet)) };
  }

  _beginPlay() {
    if (this.state === 'intro') this.bird.syncFromWorld();
    this.state = 'play';
    this.threats.shadowOn = true;
    // 8차: 안무를 미리 짠다. 씨앗값은 판마다 새로(점검은 scriptOpts.seed 로 같은 판)
    const seed = this.scriptOpts && this.scriptOpts.seed !== undefined ? this.scriptOpts.seed >>> 0 : Math.floor(Math.random() * 2147483647) + 1;
    this.runSeed = seed;
    const plan = this.director.begin(this.bird.s, this.world, seed, this.bird.w);
    this.stageDur = this.director.duration;
    this.threats.loadPlan(plan, this.t, this.bird);
    this.music.setAccents(plan.waves.filter((w) => w.eggs.length).map((w) => w.tq)); // 9차: 폭발 박에 큰 북
    if (this.food.addPlanFood) this.food.addPlanFood(this.course, plan, this.bird, this.threats); // 10차: 실제 별로 HP 먹이 자리 검사
    this.planInfo = { seed, ms: +plan.ms.toFixed(1), waves: plan.waves.length, fails: plan.log.fails };
    if (typeof console !== 'undefined') console.info('[bvf seed]', JSON.stringify({ bird: this.bird.spec.id, ...this.planInfo }));
    this.ui.introText('');
    this.ui.showHud(true);
    this.ui.banner(this.stage.name.toUpperCase(), `${this.stage.id} / ${STAGES.length}`); // 17차 U2: 「이름 / 2 / 5」
    this.rig.reset(this.bird);
    this.stats.elapsed = 0;
    this.realPlay = 0;
    this.music.start(() => this.stats.elapsed, (Tb) => this.director.sectionAt(Tb).level);
    this.ui.hint('Dodge the ring, or fly through the hole.');
    // 16차 3-1: 터치 첫 플레이 4초 동안 손가락 그림
    if (this.touch && !this._touchHinted && this.ui.touchHint) {
      this._touchHinted = true;
      this.ui.touchHint();
    }
    // 개막 일제 발사: 시작하자마자 여러 거리에서 불꽃
    const op = DECOR.opening;
    for (let i = 0; i < op.count; i++) {
      const at = op.start + (i / Math.max(1, op.count - 1)) * op.window + Math.random() * 0.15;
      this.fw.spawnDecorBand(DECOR.bands[i % 3], this.t, this._ctx(), { flight: Math.min(at, DECOR.rise[1]), delay: Math.max(0, at - DECOR.rise[1]) });
    }
  }

  stageClear() {
    const st = this.stage;
    const rec = { id: st.id, seed: this.runSeed, nearMiss: this.stats.nearMiss, perfect: this.stats.perfect, graze: this.stats.graze, maxChain: this.stats.maxChain, bonus: Math.round(this.stats.bonus), hits: this.stats.hits, hpEnd: Math.max(0, this.bird.hp) };
    rec.score = stageScore(st.id, rec);
    rec.rolls = this.bird.rolls;
    // 16차: 기록·다음 HP(30% 회복)·롤(최소 3)은 run.js
    onStageClear(this.run, rec, this.bird.maxHp);
    this.run.totalTime += this.stageDur || st.duration;
    this._logPerf();
    this.progress.markCleared(st.id); // 16차 2-6: 모드와 상관없이 깨면 다음 스테이지가 열린다
    this.music.stop();
    this.ui.hint('');
    this.ui.setEdges([]);
    this.ui.showHud(false);
    if (this.ui.clearPops) this.ui.clearPops();
    this.ui.setBorder(0);
    this.threats.shadowOn = false;
    this.threats.reset();
    this.food.reset();
    this.cruiser.s = this.bird.s;
    this.cruiser.u = this.bird.u;
    this.cruiser.v = this.bird.v;
    // 16차 2-6: 전체 판은 3초 순항 → STAGE CLEAR 카드. 다음 스테이지가 있으면 [NEXT], 마지막 스테이지면 [SEE RESULTS](U11 — S5 보너스 내역을 보여 주려고)
    // 연습은 결과 판
    const next = STAGES[this.run.stageIndex + 1];
    if (this.run.mode === 'run') this.enterStageClear(rec, next && next.playable ? this.run.stageIndex + 1 : null);
    else this.enterVictory(rec);
  }

  enterStageClear(rec, nextIndex) {
    this.state = 'stageclear';
    this.endingT = 0;
    this._clearRec = rec;
    this._nextIndex = nextIndex;
    this._cardShown = false;
    this._transit = false;
    this.crowd.setMaxCheer(1);
    this.sound.cheer(0.9, 3);
  }

  _showStageClear() {
    this._cardShown = true;
    this._cardT = this.endingT;
    const nx = this._nextIndex === null ? null : STAGES[this._nextIndex];
    this.ui.showStageClear({ rec: this._clearRec, total: this.runTotal(), heal: HEAL_BETWEEN_STAGES, next: nx ? { id: nx.id, name: nx.name } : null });
  }

  // 16차 U11: 마지막 스테이지 카드의 [SEE RESULTS] → 결과 판(이름 입력)
  _seeResults() {
    if (this.state !== 'stageclear' || this._transit || this._nextIndex !== null) return;
    this.enterVictory(this._clearRec);
  }

  // NEXT: 0.6초 동안 검게 → 월드 다시 짓기(「Loading STAGE n」 한 프레임 뒤) → 1.5초 날아드는 장면 → 배너
  _nextStage() {
    if (this.state !== 'stageclear' || this._transit) return;
    this._transit = true;
    const i = this._nextIndex;
    this.ui.hideScreen();
    this.ui.fade(true);
    setTimeout(() => {
      this._withLoading(() => {
        this.startStage(i, this.run.nextHp, true, this.run.nextRolls);
        this.ui.fade(false);
      }, i + 1);
    }, FADE_MS);
  }

  runTotal() {
    return runTotal(this.run);
  }

  // 15차 B: 변주 문구는 섞은 순서대로 하나씩(셔플 백) — 같은 문구가 연달아 나오지 않게
  _bagPick(key, list) {
    const bags = this._bags || (this._bags = {});
    let b = bags[key];
    if (!b || !b.left.length) {
      const idx = list.map((_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
      if (b && b.last !== undefined && idx[0] === b.last && idx.length > 1) [idx[0], idx[1]] = [idx[1], idx[0]];
      b = bags[key] = { left: idx, last: b ? b.last : undefined };
    }
    const i = b.left.shift();
    b.last = i;
    return list[i];
  }

  startFall() {
    this.state = 'falling';
    this.music.stop();
    this.ui.hint('');
    this.ui.setEdges([]);
    this.timeScale = 1;
    this.slowT = -1;
    this.hitStopT = 0;
    this.threats.shadowOn = false;
    this.fallT = 0;
    this.fallVy = 3;
    this.fallVx = this.bird.vx * 0.3;
    this._logPerf();
    this.ui.showHud(false);
    this.crowd.setMaxCheer(1);
    this.crowd.birdHit(this.t);
    this.ui.wow();
    this.sound.cheer(1, 3.2);
  }

  enterEnding() {
    this.state = 'ending';
    this.threats.reset();
    this.food.reset();
    this.crowd.setMaxCheer(0);
    this.sound.setMurmur(0);
    const time = this.run.totalTime + this.stats.elapsed;
    const joke = this._bagPick('fall', FALL_LINES);
    this.chicken.rotation.y = 0;
    this.endingT = 0;
    const s0 = this.s0 || 0;
    const r = this.run;
    this.ui.showEnding({
      // 16차 2-6: 전체 판 S1 은 TRY AGAIN(새 판), 그 밖은 CONTINUE STAGE n + START OVER. 전체 판 도중이면 「Save stage scores」(선택)
      cont: !(r.mode === 'run' && r.stageIndex === 0), stageN: this.stage.id,
      canSave: r.mode === 'run' && r.records.some(Boolean) && !r.stagesSaved,
      joke, fact: ENDING_CORE, stage: this.stage, time,
      progress: Math.max(0, Math.min(1, (this.bird.s - s0) / Math.max(1, this.course.length - s0))),
      hits: this.run.records.reduce((a, r) => a + (r ? r.hits : 0), 0) + this.stats.hits,
      score: this.runTotal() + Math.round(this.stats.bonus),
    });
  }

  // 16차: 전체 판 S1 추락 뒤 TRY AGAIN = 새 판(이어하기 0, 15차까지는 여기서도 continues++ 를 하던 버그). 그 밖은 그 스테이지 시작 HP 로 이어하기 +1
  retryStage() {
    const r = onFallRetry(this.run);
    if (r.newRun) {
      this.run = newRun(this.selected, 'run', 1); // 새 판이지만 15차처럼 시작 장면 없이 바로
      this.startStage(0, BIRDS[this.selected].hp, false);
    } else {
      this.startStage(this.run.stageIndex, r.hp, true, this._stageRolls); // 그 스테이지 시작 HP·롤로, S2~S5 는 날아드는 장면부터
    }
  }

  // 16차 2-6: START OVER — 전체 판은 S1 부터 새 판, 연습은 그 스테이지 새로
  startOver() {
    if (this.run && this.run.mode === 'practice') this.startPractice(this.run.startStage);
    else this.startRun();
  }

  enterVictory(rec) {
    this.state = 'victory';
    this.endingT = 0;
    this.ui.showHud(false);
    this.sound.cheer(0.9, 3);
    this.ui.showVictory({
      line: this._bagPick('clear', CLEAR_LINES), fact: ENDING_CORE, rec: rec || this.run.records[0] || {}, total: this.runTotal(),
      bird: this.run.bird, time: this.run.totalTime,
    });
  }

  // 16차 4-4: 두 번 저장 막기 — await 전에 동기로 registering 을 세운다. 제출 내용은 run.js buildSubmission
  async register(rawName) {
    if (this.state === 'ending') return this.saveStageScores(rawName); // 16차: 추락 판의 「Save stage scores」
    const run = this.run;
    if (!run || run.registered || run.registering) return;
    const n = normalizeNickname(rawName);
    if (!n.ok) {
      this.ui.setRegisterMessage(n.reason);
      return;
    }
    run.registering = true;
    let res;
    try {
      res = await this.store.submit(buildSubmission(run, n));
    } catch {
      res = { ok: false, reason: "Couldn't save." };
    }
    if (!res.ok && !res.memOnly) {
      run.registering = false; // 저장 실패(이름 그대로 다시 시도 가능)
      this.ui.setRegisterMessage(res.reason || "Couldn't save.");
      return;
    }
    run.registered = true;
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(LAST_NAME_KEY, n.name); } catch { /* 이름 기억 못 해도 그만 */ }
    const ids = res.ids || { run: null, stages: {} };
    this._savedIds = new Set([ids.run, ...Object.values(ids.stages)].filter(Boolean));
    // 그 자리 TOP 10: 전체 완주 기록이 있으면 FULL RUN, 없으면 마지막으로 깬 스테이지 탭(RUN / PRACTICE)
    const lastStage = run.records.reduce((a, rr, i) => (rr ? i + 1 : a), run.startStage || 1);
    this._setRankTab(ids.run ? 'full' : String(lastStage), ids.run ? (run.continues ? 'all' : 'clean') : run.mode);
    const ranked = res.ranked || {};
    const inTop = ids.run ? ranked.run : Object.values(ranked.stages || {}).some(Boolean);
    let msg = 'Saved.';
    if (res.memOnly) msg = res.reason || "Couldn't save.";
    else if (res.duplicate) msg = 'Already saved.';
    else if (!inTop) msg = ids.run ? 'Saved (outside top 100).' : 'Saved (outside top 50).';
    this._savedMsg = { msg, ok: !!res.ok };
    await this._showSavedTop();
  }

  // 16차 4-6: 전체 판 도중 추락 — 지금까지 깬 스테이지 기록만 저장(선택). await 전에 동기로 막는다. 저장소가 runId + stage 중복을 거부
  async saveStageScores(rawName) {
    const run = this.run;
    if (!run || run.stageSaving || run.stagesSaved) return;
    const n = normalizeNickname(rawName);
    if (!n.ok) {
      this.ui.setRegisterMessage(n.reason);
      return;
    }
    run.stageSaving = true;
    let res;
    try {
      const sub = buildSubmission(run, n);
      res = await this.store.submit({ run: null, stages: sub.stages });
    } catch {
      res = { ok: false, reason: "Couldn't save." };
    }
    run.stageSaving = false;
    if (!res.ok && !res.memOnly) {
      this.ui.setRegisterMessage(res.reason || "Couldn't save.");
      return;
    }
    run.stagesSaved = true;
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(LAST_NAME_KEY, n.name); } catch { /* 이름 기억 못 해도 그만 */ }
    const msg = res.memOnly ? res.reason || "Couldn't save." : res.duplicate ? 'Already saved.' : 'Saved.';
    if (this.ui.stageScoresSaved) this.ui.stageScoresSaved(msg, !!res.ok);
  }

  async _showSavedTop() {
    await this._loadTop();
    const rt = this._tabState();
    const list = tabList(this._rankView, rt.tab, rt.sub);
    let top = list.slice(0, 10);
    const mine = list.find((e) => this._savedIds && this._savedIds.has(e.id));
    if (mine && !top.includes(mine)) top = [...top.slice(0, 9), mine];
    this.ui.showSaved(top, this._savedIds, rt, this._savedMsg);
  }

  // ======================= UI 버튼 =======================
  onAction(act, data) {
    const s = this.sound;
    switch (act) {
      case 'title-go':
        if (this.state === 'title' && this.titleT > 0.3) this.onAction('start', {});
        break;
      case 'start':
        s.start();
        s.setMuted(!this.settings.sound);
        this.enterSelect();
        break;
      case 'top':
        this.selTop = !this.selTop;
        this._showSelect();
        break;
      case 'rank-tab': {
        // 16차: TOP 10 탭(FULL RUN / S1)과 그 안의 거르기(NO RETRY·ALL / RUN·PRACTICE)
        const cur = this._tabState();
        const tab = data.tab || cur.tab;
        this._setRankTab(tab, data.sub || (tab === cur.tab ? cur.sub : null));
        if (this.state === 'select') this._showSelect();
        else if (this.state === 'victory' && this.run && this.run.registered) this._showSavedTop();
        break;
      }
      case 'gear':
        this.selOpts = !this.selOpts;
        this._showSelect();
        break;
      case 'pick':
        if (BIRDS[data.bird]) this._select(data.bird);
        break;
      case 'fly': {
        s.start();
        this._androidFullscreen();
        const n = this._stageOk(this.selStage) ? this.selStage : 1;
        this._withLoading(() => (n > 1 ? this.startPractice(n) : this.startRun()), n);
        break;
      }
      case 'stage': {
        // 16차 2-6: 스테이지 칩(1 = FULL RUN, 2~5 = PRACTICE). 잠긴 칩은 고를 수 없다
        const n = Number(data.stage);
        if (this.state === 'select' && this._stageOk(n)) { this.selStage = n; this._showSelect(); }
        break;
      }
      case 'retry':
        if (this.state !== 'ending') break;
        this._withLoading(() => this.retryStage(), this.stage.id);
        break;
      case 'start-over':
        this._withLoading(() => this.startOver(), this.run && this.run.mode === 'practice' ? this.run.startStage : 1);
        break;
      case 'next':
        this._nextStage();
        break;
      case 'see-results':
        this._seeResults();
        break;
      case 'clear-quit':
        // 16차 2-6: 카드의 QUIT — 판을 여기서 끝내고 결과 판(지금까지 깬 스테이지 기록을 저장할 수 있게)
        if (this.state === 'stageclear' && !this._transit) this.enterVictory(this._clearRec);
        break;
      case 'again':
        s.start();
        this._withLoading(() => this.startOver(), this.run && this.run.mode === 'practice' ? this.run.startStage : 1);
        break;
      case 'restart':
        this.enterSelect();
        break;
      case 'restart-run':
        this.setPaused(false);
        this._withLoading(() => this.startOver(), this.run && this.run.mode === 'practice' ? this.run.startStage : 1);
        break;
      case 'resume':
        this.setPaused(false);
        break;
      case 'quit':
        this.setPaused(false);
        this.enterTitle();
        break;
      case 'register':
        this.register(data.name);
        break;
      case 'opt':
        this.setOption(data.key, data.value);
        break;
      case 'gpu-copy': {
        const addr = 'chrome://settings/system';
        const done = () => this.ui.toast('Copied.');
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(done, () => this.ui.toast(addr));
          else this.ui.toast(addr);
        } catch {
          this.ui.toast(addr);
        }
        break;
      }
      case 'gpu-close':
        try {
          sessionStorage.setItem(GPU_KEY, '1');
        } catch {
          // 저장하지 못해도 닫기만 한다
        }
        this.ui.hideGpuNotice();
        break;
      default:
        break;
    }
  }

  // 16차 3-4: 월드를 다시 짓기 전에 「Loading STAGE n」 을 한 프레임 그린 뒤 setTimeout(0) 으로 한 번에(모바일에서 멈춘 화면 대신)
  _withLoading(fn, n = 1) {
    if (this._loadingBusy) return;
    if (typeof requestAnimationFrame !== 'function' || !this.ui.stageLoading) { fn(); return; }
    this._loadingBusy = true;
    this.ui.stageLoading(`STAGE ${n}`);
    requestAnimationFrame(() => setTimeout(() => {
      try { fn(); } finally {
        this._loadingBusy = false;
        this.ui.stageLoading('');
      }
    }, 0));
  }

  // 16차 3-2: 안드로이드 터치는 FLY 를 누를 때 전체 화면 + 가로 고정을 시도(실패는 무시). iOS 는 세로 판 안내만
  _androidFullscreen() {
    if (!this.touch || typeof navigator === 'undefined' || !/Android/i.test(navigator.userAgent || '')) return;
    const lock = () => {
      try {
        const o = typeof screen !== 'undefined' && screen.orientation;
        if (o && o.lock) o.lock('landscape').catch(() => {});
      } catch { /* 고정 못 해도 그만 */ }
    };
    try {
      const el = document.documentElement;
      const p = !document.fullscreenElement && el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'hide' }) : null;
      if (p && p.then) p.then(lock, () => {});
      else lock();
    } catch { /* 전체 화면 못 해도 그만 */ }
  }

  _select(id) {
    this.selected = id;
    this.bird.setSpecies(id);
    this.bird.reset(BIRDS[id].hp, this.cruiser.v, this.cruiser.s);
    this._showSelect();
  }
  setOption(key, value) {
    if (!(key in this.settings)) return;
    if (key === 'lowSpec') userSetLowSpec(); // 16차: 직접 바꾸면 그 값부터 저장
    this.settings[key] = !!value;
    saveSettings();
    if (key === 'sound') this.sound.setMuted(!value);
    if (key === 'lowSpec') {
      this._applyLowSpec();
      if (this.renderer) this.renderer.resize();
    }
  }

  setPaused(p) {
    if (p === this.paused) return;
    this.paused = p;
    if (p && this.input && this.input.releaseStick) this.input.releaseStick(); // 16차: 멈추면 스틱 축 0
    if (p) this.sound.suspend();
    else this.sound.resume();
    this.ui.showPause(p, this.settings);
  }

  get pausable() {
    return this.state === 'play' || this.state === 'intro' || this.state === 'flyin' || this.state === 'falling';
  }

  onHidden() {
    if (this.pausable) this.setPaused(true);
  }

  // ======================= 매 프레임 =======================
  frame(dtReal, nowSec) {
    const input = this.input;
    this.real = nowSec;
    this._countFps(dtReal);
    if (input.consume('KeyM')) {
      const on = !this.settings.sound;
      this.setOption('sound', on);
      const box = typeof document !== 'undefined' ? document.querySelector('input[data-opt="sound"]') : null;
      if (box) box.checked = on;
      this.ui.toast(on ? 'Sound on' : 'Sound off');
    }
    // 16차 3-2: 터치 모드에서 플레이 중 세로가 되면 자동 일시정지 + 「가로로 돌리세요」 판(QUIT TO MENU)
    const portrait = this.touch && typeof window !== 'undefined' && window.innerHeight > window.innerWidth;
    if (portrait && this.pausable && !this.paused) this.setPaused(true);
    if (this.ui.showRotate) this.ui.showRotate(portrait && this.pausable);
    if (this.pausable && input.consume('Escape', 'KeyP')) this.setPaused(!this.paused);
    if (DEV && input.consume('KeyG')) {
      this.god = !this.god;
      this.ui.setDev(`DEV · N skip stage · G god mode${this.god ? ' [ON]' : ''} · B hit bands`);
    }
    if (DEV && input.consume('KeyB')) this.threats.debug = !this.threats.debug;
    if (!this.paused && !this.devFreeze) this._tick(Math.min(dtReal, RENDER.maxDt));
    this.border = Math.max(0, this.border - dtReal * 1.6);
    this.ui.setBorder(this.border);
    this.render();
    input.endFrame();
  }

  // 실제 시간 dr 한 걸음: 배율(히트스톱 0 · 슬로모 0.35)을 정하고 게임 시간을 그만큼 진행
  _tick(dr) {
    this.popClock += dr; // 11차: 팝업 글자 시계(실제 시간, 일시정지면 멈춤)
    const sc = this._scaleStep(dr);
    this.timeScale = sc;
    if (this.state === 'play') this.realPlay += dr;
    this._step(dr * sc, dr);
  }

  _scaleStep(dr) {
    if (this.state !== 'play') return 1;
    if (this.hitStopT > 0) {
      this.hitStopT -= dr;
      return 0;
    }
    if (this.slowT >= 0) {
      const S = FEEL.slowmo;
      const T = this.slowT;
      this.slowT += dr;
      const total = S.inT + S.holdT + S.outT;
      if (T >= total - 1e-9) {
        this.slowT = -1;
        if (this.measureOn) this._ev('slowEnd', null, {});
        return 1;
      }
      if (T < S.inT) return 1 + (S.scale - 1) * (T / S.inT);
      if (T < S.inT + S.holdT) return S.scale;
      return S.scale + (1 - S.scale) * ((T - S.inT - S.holdT) / S.outT);
    }
    return 1;
  }

  // 게임 시간 d 가 지나려면 실제로 몇 초 걸리나(지금 걸린 히트스톱·슬로모 시간표를 그대로 따라가며). 음악·틱 예약용
  _realUntil(d) {
    if (d <= 0) return 0;
    let real = Math.max(0, this.hitStopT);
    let g = 0;
    let T = this.slowT;
    const S = FEEL.slowmo;
    const total = S.inT + S.holdT + S.outT;
    const h = 0.002;
    while (T >= 0 && T < total && g < d) {
      const sc = T < S.inT ? 1 + (S.scale - 1) * (T / S.inT) : T < S.inT + S.holdT ? S.scale : S.scale + (1 - S.scale) * ((T - S.inT - S.holdT) / S.outT);
      g += sc * h;
      real += h;
      T += h;
    }
    if (g < d) real += d - g;
    return real;
  }

  _step(dt, dr = dt) {
    this.t += dt;
    this.update(dt, dr);
    this.lights.update(this.t);
    // 5차: 새 윤곽에 옅은 시안 테두리(플레이어 색 — 불꽃 사이에서 새가 읽히게) + 폭발 순간광
    this.bird.setRim(this.lights.sampleAt(this.bird.pos, this._rim).multiplyScalar(0.5).add(BIRD_RIM));
    // 11차: 먹은 순간 새 몸 테두리 빛 0.4초(종류 색)
    if (this._rimFx && this._rimFx.t > 0) {
      const R = this._rimFx;
      const k = (R.t / FOOD.fx.rim.t) * FOOD.fx.rim.gain;
      this._rim.r += R.c[0] * k; this._rim.g += R.c[1] * k; this._rim.b += R.c[2] * k;
      this.bird.setRim(this._rim);
      R.t -= dt;
    }
  }

  // 개발용(DEV 전용): 게임 시간을 강제로 진행한다(실제 시간 걸음, 슬로모·히트스톱 포함)
  devAdvance(sec, step = 1 / 60) {
    if (!DEV) return;
    const n = Math.round(sec / step);
    for (let i = 0; i < n; i++) {
      this.real += step;
      this._tick(step);
    }
  }

  _countFps(dt) {
    this._capSample(dt);
    this._fpsAcc += dt;
    this._fpsN++;
    if (this._fpsAcc >= 0.5) {
      this.fps = Math.round(this._fpsN / this._fpsAcc);
      this._fpsAcc = 0;
      this._fpsN = 0;
      this.ui.setFps(this.fps, SHOW_FPS);
      if (this.state === 'play') {
        const p = this.metrics.perf.fps;
        p[0] = Math.min(p[0], this.fps);
        p[1] = Math.max(p[1], this.fps);
      }
      this._resStep();
    }
  }

  // 16차 3-4(L3) 해상도 조절기 하나: 메뉴 처음 2초 프레임 간격 중앙값 = 화면 주기(cap).
  // 플레이 중 fps < 0.75 × cap 이 3초 → 배율 −0.1(최저 0.75), fps ≥ 0.95 × cap 이 5초 → +0.1(상한 1.0). 30Hz 기기(cap 31~35ms)는 fps 30 이면 내리지 않음.
  // 옛 「느리면 Low Graphics 안내」는 배율이 0.75 이고 fps < 0.75 × cap 이 6초일 때만
  _capSample(dt) {
    const R = RENDER.res;
    if (this.capMs || !(this.state === 'title' || this.state === 'select') || !(dt > 0 && dt < 0.25)) return;
    const s = this._capS || (this._capS = { t: 0, list: [] });
    s.t += dt;
    s.list.push(dt * 1000);
    if (s.t >= R.capSec && s.list.length >= 10) {
      const a = s.list.slice().sort((x, y) => x - y);
      this.capMs = a[Math.floor(a.length / 2)];
      this._capS = null;
    }
  }

  _resStep() {
    const R = RENDER.res;
    if (this.state !== 'play' || !this.renderer || !this.renderer.setScale) {
      this._resLow = this._resHigh = this._lowFpsT = 0;
      return;
    }
    const capMs = this.capMs || 1000 / 60;
    const capFps = 1000 / capMs;
    const lock30 = capMs >= R.lock30[0] && capMs <= R.lock30[1] && this.fps >= 29;
    const slow = this.fps < R.downK * capFps && !lock30;
    this._resLow = slow ? (this._resLow || 0) + 0.5 : 0;
    this._resHigh = this.fps >= R.upK * capFps ? (this._resHigh || 0) + 0.5 : 0;
    const sc = this.renderer.scale;
    if (this._resLow >= R.downSec && sc > R.min + 1e-6) {
      this.renderer.setScale(sc - R.step);
      this._resLow = 0;
    } else if (this._resHigh >= R.upSec && sc < R.max - 1e-6) {
      this.renderer.setScale(sc + R.step);
      this._resHigh = 0;
    }
    (this.resLog || (this.resLog = [])).length > 400 || this.resLog.push([+(this.stats ? this.stats.elapsed : 0).toFixed(1), this.fps, this.renderer.scale]);
    if (slow && this.renderer.scale <= R.min + 1e-6 && !this.settings.lowSpec) {
      this._lowFpsT += 0.5;
      if (this._lowFpsT >= R.lowSec && !this._lowFpsTold) {
        this._lowFpsTold = true;
        this.ui.notice(this.touch ? 'Slow? Turn on Low Graphics (II).' : 'Slow? Turn on Low Graphics (Esc).'); // 17차 U2: 짧게. 터치는 오른쪽 위 II(일시정지) 버튼
        setTimeout(() => this.ui.notice(''), 6000);
      }
    } else {
      this._lowFpsT = 0;
    }
  }

  update(dt, dr = dt) {
    const input = this.input;
    switch (this.state) {
      case 'title':
        this._cruise(dt, false);
        this._titleShow(dt);
        // 15차: 아무 키나(0.3초 이후) → 소리를 열고 새 고르기
        if (this.titleT > 0.3 && input.pressed && input.pressed.size > 0) {
          input.pressed.clear();
          this.onAction('start', {});
        }
        break;
      case 'stageclear':
        this._cruise(dt, false);
        this.endingT = (this.endingT || 0) + dt;
        // 16차 2-6: 3초 순항 뒤 카드(Enter 를 누르면 바로). 카드에서는 Enter = NEXT, 8초 뒤 자동
        if (!this._cardShown) {
          if (this.endingT >= CLEAR_CRUISE || input.consume('Enter', 'NumpadEnter')) this._showStageClear();
        } else if (this._nextIndex === null) {
          // 마지막 스테이지 카드: Enter = SEE RESULTS(자동으로 넘기지 않음 — 보너스 내역을 읽게)
          if (input.consume('Enter', 'NumpadEnter')) this._seeResults();
        } else if (input.consume('Enter', 'NumpadEnter') || this.endingT - this._cardT >= CLEAR_AUTO) {
          this._nextStage();
        }
        break;
      case 'victory':
        this._cruise(dt, false);
        this.endingT = (this.endingT || 0) + dt;
        // 15차: 이름 칸에 커서가 있으면 Enter = SAVE(폼이 처리, 게임 키는 받지 않음). 저장 뒤나 칸 밖이면 Enter = PLAY AGAIN
        if (input.consume('Enter', 'NumpadEnter')) this.onAction('again', {});
        else if (this.ui.revealAll && input.pressed && input.pressed.size > 0) this.ui.revealAll();
        break;
      case 'select':
        this._cruise(dt, true);
        if (input.consume('ArrowLeft', 'KeyA')) this._select(BIRD_ORDER[(BIRD_ORDER.indexOf(this.selected) + 2) % 3]);
        if (input.consume('ArrowRight', 'KeyD')) this._select(BIRD_ORDER[(BIRD_ORDER.indexOf(this.selected) + 1) % 3]);
        if (input.consume('Escape') && this.selTop) { this.selTop = false; this._showSelect(); }
        if (input.consume('Enter', 'NumpadEnter', 'Space')) this.onAction('fly', {});
        // 16차 2-6: ↑↓ = 스테이지 칩(고를 수 있는 것만)
        for (const [k, d] of [['ArrowUp', -1], ['ArrowDown', 1]]) {
          if (!input.consume(k)) continue;
          for (let q = 1; q <= STAGES.length; q++) {
            const n = ((this.selStage - 1 + d * q + STAGES.length * 2) % STAGES.length) + 1;
            if (this._stageOk(n)) { if (n !== this.selStage) { this.selStage = n; this._showSelect(); } break; }
          }
        }
        break;
      case 'intro':
        this._intro(dt);
        break;
      case 'flyin':
        this._flyIn(dt);
        break;
      case 'play':
        this._play(dt, dr);
        break;
      case 'falling':
        this._fall(dt);
        break;
      case 'ending':
        this._endingAnim(dt);
        this.endingT = (this.endingT || 0) + dt;
        // 15차: 추락 화면 Enter = TRY AGAIN, 다른 키는 문구를 바로 전부 보이게
        if (input.consume('Enter', 'NumpadEnter')) this.onAction('retry', {});
        else if (this.ui.revealAll && input.pressed && input.pressed.size > 0) this.ui.revealAll();
        break;
      default:
        break;
    }
  }

  // 메뉴 뒤 배경: 경로를 따라 천천히 날며 여러 거리에서 불꽃이 터진다
  _cruise(dt, showBird) {
    const c = this.cruiser;
    c.s += c.forward * dt;
    c.v = this.course.center(c.s) + 4;
    if (c.s > this.course.sMax - 200) c.s = 0;
    this.course.toWorld(c.s, c.u, c.v, c.pos);
    this.decorAcc = (this.decorAcc || 0) + dt * (this.state === 'victory' || this.state === 'stageclear' ? DECOR.victoryRate : DECOR.titleRate);
    while (this.decorAcc >= 1) {
      this.decorAcc -= 1;
      this.fw.spawnDecorBand(DECOR.bands[Math.floor(Math.random() * 3)], this.t, this._ctx());
    }
    this.fw.update(dt, this.t);
    this.world.update(c.s, this.camera, this.t, dt);
    this.crowd.update(this.t, this.camera);
    if (showBird) {
      const b = this.bird;
      b.s = c.s;
      b.u = c.u;
      b.v = c.v;
      b.place();
      b.vx = 0;
      b.vy = 0;
      b.animate(dt);
      this.selectAngle += dt * 0.35;
      // 새 뒤 비스듬한 자리에서 좌우로 천천히 흔들며 본다(새 너머로 강·다리·도시 야경)
      const r = 2.2 + b.radius * 3;
      const a = Math.sin(this.selectAngle * 0.8) * 1.05;
      const p = this.course.at(c.s, {});
      const fx = Math.sin(p.th), fz = -Math.cos(p.th);
      const rx = Math.cos(p.th), rz = Math.sin(p.th);
      const camY = c.pos.y - 0.25 * r;
      this.camera.position.set(c.pos.x + (rx * Math.sin(a) - fx * Math.cos(a)) * r, camY, c.pos.z + (rz * Math.sin(a) - fz * Math.cos(a)) * r);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(c.pos.x, camY + 0.05 * r, c.pos.z);
      const bf = baseFov(this.camera.aspect);
      if (this.camera.fov !== bf) {
        this.camera.fov = bf;
        this.camera.updateProjectionMatrix();
      }
    } else {
      this.bird.group.visible = this.state === 'interlude' || this.state === 'victory' || this.state === 'stageclear';
      if (this.bird.group.visible) {
        this.bird.s = c.s;
        this.bird.u = c.u;
        this.bird.v = c.v;
        this.bird.place();
        this.bird.animate(dt);
      }
      this.rig.update(dt, c, true);
    }
  }

  _introDecor(dt) {
    this.decorAcc = (this.decorAcc || 0) + dt * DECOR.introRate;
    const b = this.bird;
    while (this.decorAcc >= 1) {
      this.decorAcc -= 1;
      this._introFlip = !this._introFlip;
      let cam = this.camera;
      if (this._introFlip) {
        cam = this.aheadCam;
        cam.position.set(b.pos.x, b.pos.y + 2, b.pos.z + CAMERA.distance);
        cam.lookAt(b.pos.x, b.pos.y, b.pos.z - 100);
        cam.updateMatrixWorld();
      }
      this.fw.spawnDecorBand(DECOR.bands[Math.floor(Math.random() * 3)], this.t, { camera: cam, course: this.course, world: this.world, camS: 0 });
    }
  }

  // 시작 장면: 강 위 전깃줄에서 자다가 폭음에 놀라 날아오른다
  _intro(dt) {
    const b = this.bird;
    this.introT += dt;
    const T = this.introT;
    const wake = INTRO.sleep;
    const rise = INTRO.sleep + INTRO.startle;
    const end = rise + INTRO.rise;
    if (this.input.consume('Enter', 'NumpadEnter', 'Space')) {
      this.perch.visible = false;
      b.model.head.rotation.x = 0;
      // 16차 U12: 건너뛰면 떠오름이 끝난 높이(통로 중심 − 1, 끝까지 본 것과 같은 자리)에서 시작한다. U1 에서 통로를 +4m 올린 뒤로
      // 트러스 위(통로 중심 − 11m)에서 바로 시작하면 안무의 시작 자리가 알 허용 범위(w −7.5 미만) 밖이라 모든 웨이브가 실패(위협 0)했다
      b.pos.y = this.course.center(-b.pos.z) - 1;
      this.ui.introText('');
      this._beginPlay();
      return;
    }
    if (!this.introBoom) {
      this.introBoom = true;
      const p = new THREE.Vector3(b.pos.x - 30, b.pos.y + 8, b.pos.z + 16);
      this.fw._schedule('chrysanthemum', FIREWORK_TYPES.chrysanthemum, p, this.t + wake - dt, [0.9, 0.5, 1.3], this.world, { launchPos: new THREE.Vector3(b.pos.x - 36, 0.6, b.pos.z + 22), flight: 1.6 });
    }
    const s = b.radius * 2.3;
    const camTarget = new THREE.Vector3();
    if (T < wake) {
      poseBird(b.model, 0, 1, 0.35, 0);
      b.model.head.rotation.x = 0.5 + Math.sin(T * 2) * 0.05;
      camTarget.set(b.pos.x + 2.6 * s, b.pos.y + 0.5 * s, b.pos.z - 2.2 * s);
    } else if (T < rise) {
      if (this.ui.introEl && this.ui.introEl.textContent !== '!!') this.ui.introText('!!');
      b.model.head.rotation.x = -0.3;
      const k = (T - wake) / INTRO.startle;
      b.phase += 30 * dt;
      poseBird(b.model, b.phase, Math.max(0, 1 - k * 3), -0.2, 0);
      b.pos.y = this.perchY + b.radius * 0.85 + Math.sin(Math.min(1, k) * Math.PI) * 0.6 * s;
      camTarget.set(b.pos.x + 2.6 * s, b.pos.y + 0.5 * s, b.pos.z - 2.2 * s);
    } else {
      this.ui.introText('');
      b.model.head.rotation.x = 0;
      const k = Math.min(1, (T - rise) / INTRO.rise);
      b.pos.z -= b.forward * dt * k;
      // 15차: 트러스 위(약 27m)에서 통로 중심(35m)까지 INTRO.rise 동안 부드럽게 떠오른다
      if (this.introY0 === null) this.introY0 = b.pos.y;
      const yEnd = this.course.center(-b.pos.z) - 1;
      b.pos.y = this.introY0 + (yEnd - this.introY0) * (k * k * (3 - 2 * k));
      b.animate(dt, 1.4);
      // 옆 모습 → 플레이 카메라 자리(경로 뒤 9m)로 부드럽게
      const side = new THREE.Vector3(b.pos.x + 2.6 * s, b.pos.y + 0.5 * s, b.pos.z - 2.2 * s);
      const tg = this.rig._target({ s: -b.pos.z, u: b.pos.x, v: b.pos.y, radius: b.radius });
      const behind = this.course.toWorld(tg.s, tg.u, tg.v, new THREE.Vector3());
      const e = k * k * (3 - 2 * k);
      camTarget.lerpVectors(side, behind, e);
    }
    this.camera.position.lerp(camTarget, 1 - Math.exp(-6 * dt));
    if (T < 0.05) this.camera.position.copy(camTarget);
    const look = new THREE.Vector3(b.pos.x, b.pos.y, b.pos.z);
    if (T > rise) {
      const e = Math.min(1, (T - rise) / INTRO.rise);
      const endL = new THREE.Vector3(this.camera.position.x, this.camera.position.y - CAMERA.pitchDrop, b.pos.z - CAMERA.lookAhead + CAMERA.distance);
      look.lerp(endL, e * e * (3 - 2 * e));
    }
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(look);
    const bf = baseFov(this.camera.aspect);
    if (this.camera.fov !== bf) {
      this.camera.fov = bf;
      this.camera.updateProjectionMatrix();
    }
    this._introDecor(dt);
    this.fw.update(dt, this.t);
    this.world.update(-b.pos.z, this.camera, this.t, dt);
    this.crowd.update(this.t, this.camera);
    if (T >= end) {
      this.perch.visible = false;
      this._beginPlay();
    }
  }

  // 16차 2-6: S2~S5 시작 — 통로 중심에서 1.5초 동안 s0 까지 날아든다(조종 없음, 위협 없음). Enter·Space 는 바로 시작
  _flyIn(dt) {
    const b = this.bird;
    this.introT += dt;
    if (this.input.consume('Enter', 'NumpadEnter', 'Space') || this.introT >= this.flyInT) {
      this._beginPlay();
      return;
    }
    b.steer(dt, { x: 0, y: 0 }, this.course.section(b.s, this._sec || (this._sec = {})));
    this.rig.update(dt, b, this.settings.reduceMotion, dt);
    this.camera.updateMatrixWorld();
    this.fw.update(dt, this.t);
    this.world.update(b.s, this.camera, this.t, dt);
    this.crowd.update(this.t, this.camera);
  }

  _play(dt, dr = dt) {
    const b = this.bird;
    const st = this.stage;
    const input = this.input;
    const axis = input.axis();
    if (DEV && input.consume('KeyN')) {
      this.stageClear();
      return;
    }
    // Space = 급회피 롤(모든 새, 선택 기술). 히트스톱 중에도 누름은 받는다(롤 시작은 그 프레임 게임 시각). 6차: Shift 특수 능력 없음
    if (input.consume('Space')) {
      if (b.tryRoll(axis, this.t - dt)) {
        this.stats.rolls++;
        this.rig.fovKick(ROLL.fovKick);
        this.sound.whoosh(0.5, axis.x * 0.6);
        if (this.measureOn) this._ev('roll', null, { e: this.stats.elapsed, left: b.rolls });
      } else if (b.rollEmpty) {
        // 10차: 롤 0개 — 둔한 「턱」, 표시칸이 흔들림, 롤은 나가지 않는다
        b.rollEmpty = false;
        this.stats.rollEmpty = (this.stats.rollEmpty || 0) + 1;
        if (this.sound.ready && this.sound.thud) this.sound.thud();
        this.ui.rollShake();
        if (this.measureOn) this._ev('rollEmpty', null, { e: this.stats.elapsed });
      }
    }
    // 10차: 쉬는 구간(turn1·roof)에 들어갈 때 롤 1개 보충(11차: 최대 5)
    const zNow = this._zoneOf(b.s);
    if (zNow && zNow.rest && this._restZone !== zNow.id) {
      this._restZone = zNow.id;
      const got = b.gainRoll(ROLL.restRefill);
      if (got) {
        this.ui.rollGain();
        if (this.sound.ready && this.sound.rollGain) this.sound.rollGain();
        this.ui.pop(`ROLL +${got}`, 'roll');
        this._pickFx('roll');
      }
      if (this.measureOn) this._ev('rollRefill', null, { e: this.stats.elapsed, got, zone: zNow.id });
    }
    const sec = this.course.section(b.s, this._sec || (this._sec = {}));
    b.foldTarget = this.threats.foldWanted(b) ? 1 : 0; // 12차: 센터 통과 ± 0.2초 날개 접기
    b.steer(dt, axis, sec);

    this.stats.elapsed += dt;
    const elapsed = this.stats.elapsed;
    const section = this.director.sectionAt(elapsed);
    // 피날레 직전: 카메라를 조금 뒤로 빼고 FOV +2°(FOV 변화는 롤 +3° 와 합쳐 5° 이하)
    const fz = this.course.def.zones.find((z) => z.id === 'finale');
    const fin = section.name === 'finale' || (!!fz && b.s > fz.s[0] - 30);
    this.rig.finale += ((fin ? 1 : 0) - this.rig.finale) * Math.min(1, dt / 1.5);
    this.stats.phase = this.director.update(dt, {
      threats: this.threats, bird: b, now: this.t, elapsed,
      spawnDecor: (bi, color) => this.fw.spawnDecorBand(DECOR.bands[bi], this.t, this._ctx(color)),
    });
    this.music.update(this._aheadFn || (this._aheadFn = (d) => this._realUntil(d)));
    if (this.sound.ready) this.sound.settle(false);
    this._hints(section, elapsed);
    this.fw.update(dt, this.t);

    this.world.calm = this._judgingNow(); // 11차 배4: 판정 시간에는 항공등 점멸을 멈춘다
    this.world.update(b.s, this.camera, this.t, dt);
    this.crowd.update(this.t, this.camera);
    this.rig.update(dt, b, this.settings.reduceMotion, dr);
    this.camera.updateMatrixWorld();
    const events = this._events || (this._events = []);
    events.length = 0;
    this.threats.update(dt, this.t, b, events, this.camera.position, this.camera);
    for (const e of events) this._threatEvent(e);
    const fe = this._fev || (this._fev = []);
    fe.length = 0;
    this.food.update(dt, this.t, b, b.spec.id, fe, this.camera);
    for (const e of fe) this._eat(e);
    this._popFollow();
    this._gateSounds();
    this._feelFx(dt, dr);
    if (this.sound.ready) this.sound.setListener(this.camera);
    this._edges();
    if (this.measureOn) this._measure(dt, dr);

    const mult = this._mult();
    const dur = this.stageDur;
    this.ui.updateHud({
      stage: { ...st, duration: dur }, elapsed, phase: this.stats.phase, section: section.name,
      score: this.runTotal() + Math.round(this.stats.bonus),
      combo: this.stats.chain, mult, perfect: this.stats.perfect, graze: this.stats.graze, hits: this.stats.hits,
      center: this.stats.center, timing: this.stats.timing, food: this.stats.food, hpFood: this.stats.hpFood || 0, rollFood: this.stats.rollFood || 0,
      hp: b.hp, maxHp: b.maxHp, birdName: b.spec.name, god: this.god,
      rolling: b.rolling, rollCd: b.rollCD, rollFrac: b.rolling ? 0 : 1 - b.rollCD / b.rollCooldown, rolls: b.rolls, rollMax: ROLL.max,
    });
    if (b.hp <= 0) {
      b.hp = 0;
      this.startFall();
      return;
    }
    if (b.s >= this.course.length) this.stageClear();
  }

  // 10차: 경로 거리 s 의 코스 구간
  _zoneOf(s) {
    return this.course.zoneIn(s); // 16차 U6a: 그 스테이지 구간
  }

  // 안내 한 줄: 첫 문들 동안만, 쉬는 박자에서 금색 잔불 안내
  _hints(section, elapsed) {
    // 15차: 처음 두 웨이브 동안만 한 줄씩(아래 가운데)
    if (this.hintBar < 0.5 && elapsed > 8.3) {
      this.hintBar = 0.5;
      this.ui.hint('Dotted ring = you.');
    }
    if (this.hintBar < 1 && elapsed > 12.5) {
      this.hintBar = 1;
      this.ui.hint('');
    }
    if (this.hintBar < 2 && section.rest) {
      this.hintBar = 2;
      this.ui.hint('Breather. Grab the bugs.');
    }
    if (this.hintBar === 2 && !section.rest) {
      this.hintBar = 3;
      this.ui.hint('');
    }
  }

  _mult() {
    let m = 1;
    for (const [c, k] of SCORING.comboMult) if (this.stats.chain >= c) m = k;
    return +(m * (1 + (this.stats.centerMult || 0))).toFixed(2); // 7차: 센터 배율(고리 가운데 통과마다 +0.1, 피격 전까지)
  }

  _ev(type, t, extra = {}) {
    this.evlog.push({ type, t: this.t, e: this.stats ? this.stats.elapsed : 0, real: this.realPlay, id: t ? t.id : 0, kind: t ? t.kind : '', ...extra });
  }

  // 휘파람(매 프레임 위치·음 높이), 「틱」(통과 1박 전, 박자 시각에 예약), 다가오는 문 「쉬이익」
  _gateSounds() {
    const el = this.stats.elapsed;
    let near = 0;
    for (const g of this.threats.list) {
      if (g.whistle && g.launched && !g.opened) {
        const k = Math.max(0, Math.min(1, (this.t - g.tLaunch) / Math.max(0.05, g.tOpen - g.tLaunch)));
        g.whistle.update(g.headW, k, g.tOpen - this.t);
      }
      if (g.burst && g.ev && !g.ev.res) {
        const d = g.Cw.distanceTo(this.bird.pos) - g.R0;
        near = Math.max(near, Math.max(0, 1 - Math.max(0, d) / 22));
      }
    }
    // 「째깍」: 바로 다음 웨이브의 마지막 3박(9차: 폭발 1.5·1.0·0.5초 전), 그 알 자리에서. 앞 웨이브가 터진 뒤의 박만
    // 9차 「쾅」: 폭발 박자 시각에 정확히(소리 거리 지연 없음 — 위협 불꽃만), 미리 예약
    let prevTq = -99;
    for (const ev of this.threats.events) {
      if (!ev.shells || !ev.shells.length) continue;
      if (!ev.banged && el >= ev.tqE - MUSICLOOK * Math.max(0.05, this.timeScale)) {
        ev.banged = true;
        const sh0 = ev.shells[0];
        if (this.sound.ready && this.sound.bang) this.sound.bang(this.music.audioTimeOf(ev.tqE, this._aheadFn), sh0.Cw, ev.id, ev.shells.length > 1 ? 1.15 : 1);
        if (this.measureOn) this._ev('bangSched', null, { tq: ev.tqE, id: ev.id, at: el });
      }
      const TK = TIMING.ticks; // 11차: 째깍 2번(폭발 0.5 · 0.25초 전)
      ev.ticks = ev.ticks || new Array(TK.length).fill(false);
      for (let i = 0; i < TK.length; i++) {
        if (ev.ticks[i]) continue;
        const tb = ev.tqE - TK[i];
        if (tb <= prevTq + 0.02) { ev.ticks[i] = true; continue; }
        if (el >= tb - MUSICLOOK * Math.max(0.05, this.timeScale)) {
          ev.ticks[i] = true;
          if (this.sound.ready) {
            const pos = ev.shells[0].eggW || ev.shells[0].Cw;
            if (this.sound.tickAt) this.sound.tickAt(this.music.audioTimeOf(tb, this._aheadFn), pos, i === TK.length - 1, ev.id);
            else this.sound.tick(this.music.audioTimeOf(tb, this._aheadFn), ev.id);
          }
          if (this.measureOn) this._ev('tick', null, { tb, tq: ev.tqE, id: ev.id });
        }
      }
      prevTq = ev.tqE;
    }
    if (this.sound.ready) this.sound.approach(near * 0.6);
  }

  // 10차 먹이 2종: HP 먹이(최대 HP 25%·최소 15 회복, 가득이면 +100점) · 롤 먹이(롤 +1, 가득이면 +200점)
  // 11차: 먹은 느낌 — 새 아래 팝업 글자(0.8초) · 넓어지는 고리 · 위로 튀는 입자 20개 · 새 테두리 빛 · HUD 반응 · 가득이면 「찰랑」+ 점수가 점수판으로 날아감
  _eat(e) {
    const st = this.stats;
    const b = this.bird;
    const it = e.item;
    st.food++;
    let text, kind;
    if (it.type === 'hp') {
      st.hpFood = (st.hpFood || 0) + 1;
      const H = FOOD.hp;
      if (b.hp >= b.maxHp - 1e-6) {
        st.bonus += H.fullPts;
        text = `FULL +${H.fullPts}`;
        kind = 'gold';
        this.ui.scoreFly(H.fullPts, 'hp');
        if (this.sound.ready && this.sound.coin) this.sound.coin();
      } else {
        const before = b.hp;
        const want = Math.max(H.healMin, Math.round(b.maxHp * H.heal));
        b.hp = Math.min(b.maxHp, b.hp + want);
        const got = Math.round(b.hp - before);
        st.healed += b.hp - before;
        text = `+HP ${got}`;
        kind = 'hp';
        this.ui.hpFlash(before, b.hp, b.maxHp);
        if (this.sound.ready && this.sound.heal) this.sound.heal();
      }
    } else {
      st.rollFood = (st.rollFood || 0) + 1;
      const got = b.gainRoll(1);
      if (got) {
        text = 'ROLL +1';
        kind = 'roll';
        this.ui.rollGain();
        if (this.sound.ready && this.sound.rollGain) this.sound.rollGain();
      } else {
        st.bonus += FOOD.roll.fullPts;
        text = `FULL +${FOOD.roll.fullPts}`;
        kind = 'gold';
        this.ui.scoreFly(FOOD.roll.fullPts, 'roll');
        if (this.sound.ready && this.sound.coin) this.sound.coin();
      }
    }
    this.ui.pop(text, kind);
    this._pickFx(kind);
    if (this.measureOn) this._ev('eat', null, { ft: it.type, rolls: b.rolls, hp: Math.round(b.hp), text, kind, judging: this._judgingNow() });
  }

  // 11차 획득 이펙트: 고리(먹이 인스턴스) + 위로 튀는 반짝 입자 20개(장식 입자계, 판정 없음) + 새 테두리 빛 0.4초. 그리기 호출 늘지 않음
  _pickFx(kind) {
    const F = FOOD.fx;
    const ci = kind === 'hp' ? 0 : kind === 'roll' ? 1 : 2;
    const c = F.col[kind] || F.col.gold;
    this.food.ringFx(ci);
    const b = this.bird;
    const S = F.sparks;
    const sp = this.fw.sparks;
    for (let i = 0; i < S.n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * S.side;
      const up = S.up[0] + Math.random() * (S.up[1] - S.up[0]);
      sp.emit(b.pos.x, b.pos.y, b.pos.z, Math.cos(a) * r, up, Math.sin(a) * r, S.life * (0.8 + Math.random() * 0.4), S.size, S.size * 0.4,
        c[0] * S.hdr, c[1] * S.hdr, c[2] * S.hdr, c[0] * 0.4, c[1] * 0.4, c[2] * 0.4, 1, 2, 3, FLAG_FLICKER_FX, 1);
    }
    this._rimFx = { t: F.rim.t, c };
  }

  // 11차: 지금 위협이 판정 중인가(폭발 ~ 새가 그 면을 지난 뒤 0.3초) — 팝업 불투명도 50%
  _judgingNow() {
    for (const sh of this.threats.list) if (Bursts.judging(sh, this.t)) return true;
    return false;
  }

  // 11차: 팝업을 새 화면 위치에 붙인다(매 프레임)
  _popFollow() {
    if (!this.ui.updatePops) return;
    if (!this.ui.pops || !this.ui.pops.length) return;
    const v = this._popV || (this._popV = new THREE.Vector3());
    v.copy(this.bird.pos).project(this.camera);
    const W = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const H = this.renderer ? this.renderer.height : typeof window !== 'undefined' ? window.innerHeight : 1080; // 16차: 검은 띠가 있으면 3D 화면 자리
    const top = this.renderer ? this.renderer.viewTop || 0 : 0;
    this.ui.updatePops(((v.x + 1) / 2) * W, top + ((1 - v.y) / 2) * H, this._judgingNow());
  }

  // 손맛 효과: 날개 끝 시안 흔적(길이 = 콤보), 속도선, 피격 뒤 연기, 무거워짐 회복, 깃털 그을림
  _feelFx(dt, dr) {
    const b = this.bird;
    const sp = this.fw.sparks;
    const p = this.course.at(b.s, this._at2 || (this._at2 = {}));
    const rx = Math.cos(p.th), rz = Math.sin(p.th);
    const fx = Math.sin(p.th), fz = -Math.cos(p.th);
    const combo = this.stats.chain;
    if (combo > 0 && dt > 0) {
      const life = Math.min(FEEL.trail.max, combo * FEEL.trail.perCombo) + 0.05;
      const w = b.radius * 1.35;
      const cr = Math.cos(b.roll + (b.spin || 0));
      const sr = Math.sin(b.roll + (b.spin || 0));
      for (const side of [-1, 1]) {
        const ox = side * w * cr;
        const oy = side * w * sr * -1;
        sp.emit(b.pos.x + rx * ox, b.pos.y + oy, b.pos.z + rz * ox, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4,
          life, 0.16, 0.04, 0.5, 1.7, 2.2, 0.15, 0.6, 1.0, 0.9, 0.5, 0, FLAG_FLICKER_FX);
      }
    }
    // 속도선: 새 앞에서 생겨 뒤로 흐르는 옅은 선
    if (dt > 0 && Math.random() < 0.9) {
      const s = b.s + 8 + Math.random() * 14;
      const u = b.u + (Math.random() < 0.5 ? -1 : 1) * (2.5 + Math.random() * 6);
      const v = b.v + (Math.random() - 0.5) * 9;
      const w = this.course.toWorld(s, u, v, this._v3 || (this._v3 = new THREE.Vector3()));
      sp.emit(w.x, w.y, w.z, -fx * 9, 0, -fz * 9, 0.7, 0.05, 0.03, 0.55, 0.62, 0.8, 0.3, 0.35, 0.5, 0.3, 0, 0, 0, 3.5);
    }
    // 피격 뒤 1.5초 연기 꼬리
    if (b.smokeT > 0) {
      b.smokeT -= dt;
      if (Math.random() < 0.8) {
        this.fw.smoke.emit(b.pos.x, b.pos.y, b.pos.z, (Math.random() - 0.5) * 0.5, 0.3, (Math.random() - 0.5) * 0.5,
          1.4, 0.4 * b.radius * 2, 2.2 * b.radius * 2, 0.16, 0.14, 0.13, 0.05, 0.05, 0.05, 0.5, 0.6, -0.3, 0);
      }
    }
    // HP 40% 아래 무거워짐 → 6초 안 맞으면 한 단계 회복(그을림 한 단계 + 무거움 풀림)
    if (b.heavy || b.scorchLevel > 0) {
      if (this.realPlay - b.lastHitReal > FEEL.heavyRecover) {
        b.lastHitReal = this.realPlay;
        b.heavy = false;
        b.scorchLevel = Math.max(0, b.scorchLevel - 1);
        b.setScorch(b.scorchLevel);
      }
    }
  }

  // 화면 밖 위협: 그쪽 가장자리에 위협 색 부채꼴 빛(폭 6%, 정점이 가까울수록 진하게)
  _edges() {
    const cam = this.camera;
    const out = this._edgeList || (this._edgeList = []);
    out.length = 0;
    const v = this._pe || (this._pe = new THREE.Vector3());
    const e = cam.matrixWorldInverse.elements;
    for (const t of this.threats.list) {
      if (!t.launched || this.t > t.tMeet || t.res) continue;
      const P = t.burst ? t.Cw : t.headW;
      const z = e[2] * P.x + e[6] * P.y + e[10] * P.z + e[14];
      v.copy(P).project(cam);
      let x = v.x;
      let y = v.y;
      if (z > 0) { x = -x; y = -y; }
      const inside = z < 0 && Math.abs(x) <= 0.98 && Math.abs(y) <= 0.98;
      if (inside) continue;
      const k = Math.max(0, Math.min(1, (this.t - t.tLaunch) / Math.max(0.1, t.tBurst - t.tLaunch)));
      const m = Math.max(Math.abs(x), Math.abs(y), 1e-3);
      out.push({ x: x / m, y: y / m, color: t.color, a: 0.35 + 0.65 * k, id: t.id });
      if (this.measureOn && !t.edgeLogged) {
        t.edgeLogged = true;
        this._ev('edge', t, { dt: this.t - t.tLaunch });
      }
    }
    this.ui.setEdges(out);
  }

  // 새가 지금 (u, v)를 유지할 때 경로 거리 s 에서의 카메라 경로 좌표(가림 검사용)
  _camAt(birdS, v = this.bird.v) {
    const b = this.bird;
    return this.rig._target({ s: birdS, u: b.u, v, radius: b.radius });
  }

  _threatEvent(e) {
    const b = this.bird;
    const sh = e.threat || null;
    const ev = e.ev || (sh ? sh.ev : null);
    if (this.measureOn) {
      this._ev(e.kind, null, { id: ev ? ev.id : sh ? sh.id : 0, et: ev ? ev.type : '', sk: sh ? sh.kind : '', meetE: ev ? ev.meetE : 0, lead: e.lead, how: e.how, clear: e.clear, gap: e.gap, L: e.L, R: e.R, vis: e.vis, r: e.r, inv: b.invuln });
    }
    switch (e.kind) {
      case 'launch':
        // 8차: 웨이브마다 휘파람·「한 쇼」 하나(알이 여럿이어도)
        if (sh.ev && sh.ev.shells[0] !== sh) return;
        this.director.onThreatLaunch(this.t);
        if (this.sound.ready) sh.whistle = this.sound.launch(BURST[sh.kind], sh.Lw, sh.id);
        return;
      case 'open':
        if (sh.whistle) { sh.whistle.end(); sh.whistle = null; }
        if (this.sound.ready && this.sound.chute && sh.ev && sh.ev.shells[0] === sh) this.sound.chute(sh.eggW, sh.id);
        return;
      case 'burst':
        if (sh.whistle) { sh.whistle.end(); sh.whistle = null; }
        if (this.measureOn) this._eggVisEnd(sh);
        if (sh.ev && sh.ev.shells[0] !== sh) return; // 「쿵」은 웨이브마다 한 번
        this._onThreatBurst(sh);
        return;
      case 'fade':
        // 10차: 판정이 끝나 잔광으로 바뀔 때 「타닥」(웨이브마다 한 번)
        if (this.sound.ready && sh.ev && sh.ev.shells[0] === sh) this.sound.crackle(0, sh.Cw, 10, 1.4);
        return;
      case 'swish': {
        // 3m 안으로 스친 별: 왼쪽·오른쪽으로 나눈 「쉭」(한쪽에 최대 3번, 45ms 간격)
        if (!this.sound.ready) return;
        const n = Math.min(3, e.L);
        const m = Math.min(3, e.R);
        for (let i = 0; i < n; i++) setTimeout(() => this.sound.whoosh(0.32, -0.85), i * 45);
        for (let i = 0; i < m; i++) setTimeout(() => this.sound.whoosh(0.32, 0.85), 20 + i * 45);
        return;
      }
      case 'perfect': {
        const pts = SCORING.perfect * this._mult();
        this.stats.bonus += pts;
        this.stats.perfect++;
        this.stats.nearMiss++;
        this.stats.chain++;
        this.stats.maxChain = Math.max(this.stats.maxChain, this.stats.chain);
        this.ui.judge(`PERFECT +${Math.round(pts)}`, 'perfect');
        this.ui.pulse(FEEL.vignette);
        if (this.sound.ready) {
          this.sound.chime(this.stats.chain - 1, this.music.audioTimeOf(this.music.nextSixteenth(), this._aheadFn));
          this.sound.muffle(0.2, 700);
          setTimeout(() => this.sound.whoosh(1), 200);
          const e8 = Math.ceil(this.stats.elapsed / BEAT.eighth + 1e-6) * BEAT.eighth;
          this.sound.cheer(Math.min(1.2, 0.3 + this.stats.chain * 0.08), 1.6, this.music.audioTimeOf(e8, this._aheadFn));
        }
        this._trailBurst();
        const section = this.director.sectionAt(this.stats.elapsed);
        if (!this.settings.reduceMotion && !section.noSlowmo && this.realPlay - this.lastSlow >= FEEL.slowmo.cooldown && this.slowT < 0) {
          this.slowT = 0;
          this.lastSlow = this.realPlay;
          this.music.rewind();
          if (this.measureOn) this._ev('slowStart', null, {});
        }
        return;
      }
      case 'dodge':
        this.ui.judge('DODGED', 'dodge');
        return;
      case 'graze': {
        const pts = SCORING.graze * this._mult();
        this.stats.bonus += pts;
        this.stats.graze++;
        this.stats.nearMiss++;
        this.stats.chain++;
        this.stats.maxChain = Math.max(this.stats.maxChain, this.stats.chain);
        this.ui.judge(`GRAZE +${Math.round(pts)}`, 'graze');
        if (this.sound.ready) {
          this.sound.whoosh(0.9);
          const e8 = Math.ceil(this.stats.elapsed / BEAT.eighth + 1e-6) * BEAT.eighth;
          if (this.stats.chain >= 3) this.sound.cheer(Math.min(1, 0.2 + this.stats.chain * 0.06), 1.2, this.music.audioTimeOf(e8, this._aheadFn));
        }
        this._trailBurst(0.5);
        return;
      }
      case 'center':
      case 'gap': {
        // 12차: 센터(구멍) 200 × 배율, 배율 +0.15(다음 피격 전까지 쌓임). 줄기 사이 길(틈새)은 없앰
        const gap = e.kind === 'gap';
        const bonus = gap ? BURST.gapBonus : BURST.centerBonus;
        this.stats.centerMult = +(this.stats.centerMult + bonus).toFixed(2);
        const pts = (gap ? SCORING.gap : SCORING.center) * this._mult();
        this.stats.bonus += pts;
        if (gap) this.stats.gap = (this.stats.gap || 0) + 1;
        else this.stats.center++;
        this.stats.chain++;
        this.stats.maxChain = Math.max(this.stats.maxChain, this.stats.chain);
        this.ui.judge(`THROUGH +${Math.round(pts)}`, 'perfect');
        if (this.sound.ready) this.sound.chime(Math.min(14, this.stats.center + (this.stats.gap || 0) - 1), this.music.audioTimeOf(this.music.nextSixteenth(), this._aheadFn));
        this._trailBurst(gap ? 0.8 : 0.6);
        return;
      }
      case 'timing': {
        // 8차 타이밍 퍼펙트: 터지는 순간 별 1.2m 안을 스치며 지나감 → 배율 +0.1
        this.stats.centerMult = +(this.stats.centerMult + BURST.centerBonus).toFixed(2);
        const pts = SCORING.timing * this._mult();
        this.stats.bonus += pts;
        this.stats.timing = (this.stats.timing || 0) + 1;
        this.ui.judge(`TIMING +${Math.round(pts)}`, 'perfect');
        if (this.sound.ready) this.sound.chime(Math.min(14, this.stats.timing - 1), this.music.audioTimeOf(this.music.nextSixteenth(), this._aheadFn));
        this._trailBurst(0.5);
        return;
      }
      case 'pass': {
        const pts = SCORING.pass * this._mult();
        this.stats.bonus += pts;
        this.stats.pass = (this.stats.pass || 0) + 1;
        this.stats.chain++;
        this.stats.maxChain = Math.max(this.stats.maxChain, this.stats.chain);
        this.ui.judge(`PASS +${Math.round(pts)}`, 'dodge');
        return;
      }
      case 'hit':
        if (b.invuln > 0 || this.god) return;
        this._damage(e.dmg * b.damageMult, 'burst');
        return;
      default:
    }
  }

  // 날개 끝 시안 불티를 한 번 크게
  _trailBurst(k = 1) {
    const b = this.bird;
    const sp = this.fw.sparks;
    const n = Math.round(26 * k);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 5;
      sp.emit(b.pos.x, b.pos.y, b.pos.z, Math.cos(a) * s, Math.sin(a) * s, (Math.random() - 0.5) * 3, 0.35 + Math.random() * 0.3, 0.18, 0.04, 0.6, 1.8, 2.3, 0.1, 0.5, 0.9, 1, 3, 0, FLAG_FLICKER_FX, 2);
    }
  }

  // 구조물 충돌: 피해 10, 가장 가까운 빈 곳으로 튕겨 냄, 무적 0.6초
  _collide() {
    const b = this.bird;
    const C = this.course;
    for (const box of C.colliders) {
      if (box.s1 < b.s - 2 || box.s0 > b.s + 2) continue;
      if (boxDist(box, b.s, b.u, b.v) >= b.radius) continue;
      const r = b.radius + DAMAGE.bounceGap;
      const sec = C.section(b.s, {});
      const cand = [[b.u, box.v0 - r], [b.u, box.v1 + r], [box.u0 - r, b.v], [box.u1 + r, b.v]];
      const okSec = (u, v) => Math.abs(u) <= sec.u - b.radius && v >= sec.v0 + b.radius - 0.01 && v <= sec.v1 - b.radius;
      const free = (u, v) => !C.colliders.some((o) => o !== box && (boxDist(o, b.s, u, v) < b.radius + 0.1 || boxDist(o, b.s + b.forward * 0.4, u, v) < b.radius + 0.1));
      let list = cand.filter(([u, v]) => okSec(u, v) && free(u, v));
      if (!list.length) list = cand.filter(([u, v]) => okSec(u, v));
      if (!list.length) list = cand;
      list.sort((p, q) => Math.hypot(p[0] - b.u, p[1] - b.v) - Math.hypot(q[0] - b.u, q[1] - b.v));
      const [nu, nv] = list[0];
      const du = nu - b.u;
      const dv = nv - b.v;
      b.u = nu;
      b.v = nv;
      const L = Math.hypot(du, dv) || 1;
      b.vx = (du / L) * 3;
      b.vy = (dv / L) * 3;
      b.place();
      this.metrics.bounces++;
      this.metrics.lastBounce = this.t;
      this.stats.obstacleHits++;
      this.rig.snap(b);
      this.rig.shake(0.8);
      if (b.obsInvuln <= 0 && !this.god) {
        b.hp -= DAMAGE.obstacle * b.damageMult;
        this.stats.hits++;
        this.stats.chain = 0;
        this.border = Math.min(1, this.border + 0.5);
        this.sound.hit();
        this.ui.judge(`−${Math.round(DAMAGE.obstacle * b.damageMult)}`, 'hit');
      }
      b.obsInvuln = DAMAGE.obstacleInvuln;
      b.invuln = Math.max(b.invuln, DAMAGE.obstacleInvuln);
      break;
    }
  }

  // 불꽃 피격: 히트스톱 0.07초 · 트라우마 +0.6 · 깃털 그을림 · 연기 1.5초 · 깃털 조각 · 「지직-쿵」 · 음악 1마디 먹먹함(북 빠짐) · 군중 최대 환호
  _damage(amount, kind) {
    const b = this.bird;
    b.hp -= amount;
    b.invuln = DAMAGE.invulnTime;
    this.stats.hits++;
    this.stats.chain = 0;
    this.stats.centerMult = 0; // 7차: 센터 배율은 피격 때 사라짐

    this.border = Math.min(1, this.border + 0.8);
    this.hitStopT = FEEL.hitStop;
    this.music.rewind();
    if (this.measureOn) this._ev('hitStop', null, {});
    this.rig.addTrauma(FEEL.trauma.hit);
    const frac = Math.max(0, b.hp / b.maxHp);
    b.scorchLevel = frac > 0.66 ? 1 : frac > 0.33 ? 2 : 3;
    b.setScorch(b.scorchLevel);
    b.smokeT = FEEL.smokeTime;
    b.lastHitReal = this.realPlay;
    if (frac < FEEL.heavyBelow) b.heavy = true;
    // 맞은 자리 불티(주황, 화면 번쩍임 없이 새 둘레만)
    for (let i = 0; i < 46; i++) {
      const a = Math.random() * Math.PI * 2;
      const z = Math.random() * 2 - 1;
      const q = Math.sqrt(1 - z * z);
      const sp = 4 + Math.random() * 7;
      this.fw.sparks.emit(b.pos.x, b.pos.y, b.pos.z, Math.cos(a) * q * sp, z * sp, Math.sin(a) * q * sp, 0.3 + Math.random() * 0.35, 0.22, 0.05,
        2.4, 1.1, 0.3, 0.8, 0.15, 0.03, 1, 4, 2, FLAG_FLICKER_FX, 1.5);
    }
    this.fw.smoke.emit(b.pos.x, b.pos.y, b.pos.z, 0, 0.4, 0, 1.6, b.radius * 2, b.radius * 6, 0.35, 0.18, 0.08, 0.06, 0.05, 0.05, 0.6, 0.8, -0.2, 0);
    // 깃털 조각
    const c = new THREE.Color(b.spec.color);
    for (let i = 0; i < FEEL.feathers; i++) {
      this.fw.smoke.emit(b.pos.x, b.pos.y, b.pos.z, (Math.random() - 0.5) * 3, 1 + Math.random() * 2, (Math.random() - 0.5) * 3,
        1.3, 0.22, 0.18, c.r * 0.6, c.g * 0.6, c.b * 0.6, c.r * 0.3, c.g * 0.3, c.b * 0.3, 0.9, 1.5, 3.5, 0);
    }
    this.sound.zap();
    if (this.sound.ready) this.sound.muffle(BEAT.bar, 500, true);
    this.ui.judge(`−${Math.round(amount)}`, 'hit');
    this.crowd.birdHit(this.t);
    this.ui.wow();
    this.sound.cheer(1, 2.4);
  }

  // 위협 불꽃 폭발: 군중 · 9차 FOV +1.5°·흔들림 0.1(「쾅」은 _gateSounds 가 박자에 맞춰 미리 예약). 빛은 껍질마다 잠깐 붙잡은 약한 점광원(bursts.js)이 0.35초에 걸쳐 밝아진다(밝기 급변 아님)
  _onThreatBurst(g) {
    const wp = g.Cw;
    const d = wp.distanceTo(this.camera.position);
    if (this.sound.ready) {
      this.sound.crackle(0, wp, 8, 0.6);
      if (this.sound.sizzle) this.sound.sizzle(wp); // 10차: 「쾅」 뒤 불티 「치이익」
    }
    this.rig.fovKick(BURST.kick.fov);
    this.rig.shake(BURST.kick.shake);
    if (this.measureOn) this._ev('boomSched', null, { id: g.id, dist: d, delay: 0 });
    this.crowd.addBurst(wp, this.t);
    this.metrics.bursts.push({ t: this.stats.elapsed, d, src: 'burst', type: g.kind });
    const gap = Math.max(0, wp.distanceTo(this.bird.pos) - g.R0);
    if (gap < 12) this.rig.addTrauma(FEEL.trauma.near * 0.5 * (1 - gap / 12));
  }

  _onLaunch(f) {
    if (!this.sound.ready) return;
    const d = f.launchPos.distanceTo(this.camera.position);
    this.sound.whistle(d, f.launchPos);
  }

  _pan(p) {
    const c = this.camera;
    const r = this._right || (this._right = new THREE.Vector3());
    r.setFromMatrixColumn(c.matrixWorld, 0);
    return Math.max(-1, Math.min(1, ((p.x - c.position.x) * r.x + (p.z - c.position.z) * r.z) / 30));
  }

  // 장식 불꽃 폭발: 소리(거리만큼 늦게)·군중·순간광·거리대 기록
  _onBurst(hz) {
    const d = hz.pos.distanceTo(this.camera.position);
    const size = BURST_SIZE[hz.key] || 1;
    if (this.sound.ready) {
      this.sound.boom(size * 0.8, d, hz.pos);
      if (hz.key === 'willow' || hz.key === 'finale') this.sound.crackle(d + 40, hz.pos, 14);
    }
    this.crowd.addBurst(hz.pos, this.t);
    if (this.t - this.lastCheer > 1.3 && d < 160 && this.state !== 'ending') {
      this.lastCheer = this.t;
      this.sound.cheer(0.35, 1.4);
    }
    let I0 = (LIGHTS.intensity[hz.key] || 0.6) * LIGHTS.decorMult;
    const impact = I0 * Math.max(0, 1 - d / SAFETY.proximity);
    if (impact > 0.001) {
      const allowed = this.flashLimiter.request(impact, this.real);
      if (allowed < impact) I0 *= allowed / impact;
    }
    this.lights.add(hz.pos, hz.color, I0, (hz.visR || 10) * LIGHTS.radiusMult, this.t);
    if (this.state === 'play') {
      this.metrics.bursts.push({ t: this.stats.elapsed, d, src: 'decor', band: hz.band });
      // 장식 불꽃 중심이 단면 안이면 「예고 없는 폭발」(0 이어야 한다)
      if (this.course) {
        const n = this.course.nearest(hz.pos.x, hz.pos.z, hz.clearS ?? this.bird.s);
        const sec = this.course.section(n.s, {});
        const R = (hz.visR || 10) * 1.05;
        if (Math.abs(n.u) < sec.u + R && hz.pos.y - R - (hz.drop || 0) < sec.v1 && hz.pos.y + R > sec.v0) this.metrics.decorCenterIn++;
      }
      (this._decorLive || (this._decorLive = [])).push({ pos: hz.pos.clone(), visR: hz.visR || 10, t0: this.t, life: hz.life || 2.5 });
    }
  }

  // ---------- 점검 지표(매 프레임, 화면 없이도 계산) ----------
  _measure(dt, dr) {
    const M = this.metrics;
    const b = this.bird;
    const cam = this.camera;
    const rig = this.rig;
    M.frames++;
    M.scaleLog.push(this.timeScale);
    if (M.scaleLog.length > 20000) M.scaleLog.shift();
    if (this.sound.ready) {
      M.clock.push([this.stats.elapsed, this.sound.ctx.currentTime]);
      if (M.clock.length > 20000) M.clock.shift();
    }
    M.trauma = Math.max(M.trauma, rig.trauma);
    // 화면 기울기·피치·FOV
    const v = this._pv || (this._pv = new THREE.Vector3());
    M.maxRoll = Math.max(M.maxRoll || 0, Math.abs(rig.rollDeg));
    M.maxSlopePitch = Math.max(M.maxSlopePitch || 0, Math.abs(rig.pitch) * (180 / Math.PI));
    cam.getWorldDirection(v);
    const cp = Math.asin(Math.max(-1, Math.min(1, v.y))) * (180 / Math.PI);
    M.camPitch = M.camPitch || [99, -99];
    M.camPitch[0] = Math.min(M.camPitch[0], cp);
    M.camPitch[1] = Math.max(M.camPitch[1], cp);
    M.fov = M.fov || [99, 0];
    M.fov[0] = Math.min(M.fov[0], cam.fov);
    M.fov[1] = Math.max(M.fov[1], cam.fov);
    if (M.frames % 6 === 0) (M.rollLog || (M.rollLog = [])).push([+this.stats.elapsed.toFixed(2), +rig.rollDeg.toFixed(2), +cp.toFixed(2), +b.s.toFixed(1)]);
    v.copy(b.pos).project(cam);
    const sx = (v.x + 1) / 2;
    const sy = (1 - v.y) / 2;
    M.screen.minX = Math.min(M.screen.minX, sx);
    M.screen.maxX = Math.max(M.screen.maxX, sx);
    M.screen.minY = Math.min(M.screen.minY, sy);
    M.screen.maxY = Math.max(M.screen.maxY, sy);
    // 7차: 화면 위 위협 사건 수, 결정 순간(만남 − 0.8초) → 만남 − 0.3초 화면 크기(커짐 배율), 먹이 동시 보임
    const W = this.renderer ? this.renderer.canvas.width : 1920;
    let onScreen = 0;
    const el = cam.matrixWorldInverse.elements;
    for (const ev of this.threats.events) {
      if (!ev.ready || ev.res || !ev.shells || !ev.shells.length) continue;
      const sh = ev.shells[0];
      if (!sh.burst) continue;
      const z = el[2] * sh.Cw.x + el[6] * sh.Cw.y + el[10] * sh.Cw.z + el[14];
      v.copy(sh.Cw).project(cam);
      if (z < 0 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1) onScreen++;
      ev.m = ev.m || {};
      const size = () => { const d = Math.max(0.5, -z); return (2 * sh.R0 / d) * (H2 / Math.tan((cam.fov * Math.PI) / 360)) / W; };
      const H2 = (this.renderer ? this.renderer.canvas.height : 1080) / 2;
      if (ev.m.s0 === undefined && this.t >= ev.meetT - 0.8) ev.m.s0 = size();
      if (ev.m.s1 === undefined && this.t >= ev.meetT - 0.3) {
        ev.m.s1 = size();
        (M.events || (M.events = [])).push({ id: ev.id, type: ev.type, s: +ev.s.toFixed(1), grow: +(ev.m.s1 / Math.max(1e-6, ev.m.s0)).toFixed(2), s0: +ev.m.s0.toFixed(3), s1: +ev.m.s1.toFixed(3) });
      }
    }
    M.maxFood = Math.max(M.maxFood || 0, this.food.visible || 0);
    M.maxOnScreen = Math.max(M.maxOnScreen || 0, onScreen);
    // 9차: 위협 불꽃이 화면을 덮는 비율(그려진 별 캡슐을 화면 격자에 칠해 셈) — 3프레임마다
    if (M.frames % 3 === 0) {
      const H = this.renderer ? this.renderer.canvas.height : 1080;
      const Wd = this.renderer ? this.renderer.canvas.width : 1920;
      const cv = this.threats.coverage(cam, Wd, H);
      M.cover = M.cover || { max: 0, at: 0, wave: {}, waveMax: 0, n: 0, over45: 0, over55: 0, hullMax: 0, hullWaveMax: 0, hullOver45: 0, hullOver55: 0 };
      M.cover.hullMax = Math.max(M.cover.hullMax, cv.hull);
      if (cv.hull > 0.55) M.cover.hullOver55++;
      for (const f of cv.hullByEv.values()) { if (f > M.cover.hullWaveMax) M.cover.hullWaveMax = f; if (f > 0.45) M.cover.hullOver45++; }
      M.cover.n++;
      if (cv.all > M.cover.max) { M.cover.max = cv.all; M.cover.at = +this.stats.elapsed.toFixed(2); }
      if (cv.all > 0.55) M.cover.over55++;
      for (const [id, f] of cv.byEv) {
        if (f > (M.cover.wave[id] || 0)) M.cover.wave[id] = +f.toFixed(4);
        if (f > M.cover.waveMax) M.cover.waveMax = f;
        if (f > 0.45) M.cover.over45++;
      }
    }
    this._eggVis();
    // 0.5초마다: 열린 끝점이 안개 안 시야에 보이는가 · 빈 땅이 보이는가
    M.nextVis = M.nextVis || 0;
    if (this.stats.elapsed >= M.nextVis && this.world.checkView) {
      M.nextVis = this.stats.elapsed + 0.5;
      const r = this.world.checkView(cam);
      M.visChecks = (M.visChecks || 0) + 1;
      M.openEndSeen = (M.openEndSeen || 0) + r.openEnds;
      M.emptySeen = (M.emptySeen || 0) + r.empty;
      M.mapEndSeen = (M.mapEndSeen || 0) + r.mapEnd;
      if (r.openEnds || r.empty || r.mapEnd) (M.visViol || (M.visViol = [])).push({ e: +this.stats.elapsed.toFixed(1), s: +b.s.toFixed(0), ...r });
    }
  }

  // 8차 점검: 알마다 「화면 안 + 건물에 안 가림 + 4K 에서 빛무리 8px 이상」이 폭발까지 끊김 없이 이어진 시간
  _eggVis() {
    const cam = this.camera;
    const v = this._ev3 || (this._ev3 = new THREE.Vector3());
    const el = cam.matrixWorldInverse.elements;
    const H2160 = 2160 / 2 / Math.tan((cam.fov * Math.PI) / 360);
    for (const sh of this.threats.list) {
      if (sh.burst || !sh.launched) continue;
      const P = sh.opened ? sh.eggW : sh.headW;
      const z = -(el[2] * P.x + el[6] * P.y + el[10] * P.z + el[14]);
      let ok = z > 0.5;
      if (ok) {
        v.copy(P).project(cam);
        ok = Math.abs(v.x) <= 1 && Math.abs(v.y) <= 1;
      }
      if (ok) ok = (OMEN.eggR * OMEN.glow * 2 * H2160) / z >= 8;
      // 가려짐은 따로 센다(진한 알은 깊이 검사 없이 맨 위에 그려서 화면에서는 안 사라진다 — 건물 너머로 비쳐 보이는 경우를 센다)
      if (ok && this.world.occ && sh.tBurst - this.t <= 3.0 && Director.occluded(this.world, cam.position, P)) sh.occl = (sh.occl || 0) + 1;
      // 보이는 구간을 이어서 기록(폭발 직전에 카메라 옆으로 지나가며 화면 밖으로 나가는 것은 따로 센다)
      if (ok) {
        if (sh.visSince === undefined || sh.visSince === null) sh.visSince = this.t;
        sh.visLast = this.t;
      } else if (sh.visSince !== undefined && sh.visSince !== null) {
        (sh.visRuns || (sh.visRuns = [])).push([sh.visSince, sh.visLast]);
        sh.visSince = null;
      }
    }
    const st = this.threats.omens.stats;
    const M = this.metrics;
    M.omenStrong = Math.max(M.omenStrong || 0, st.strong);
    M.omenFaint = Math.max(M.omenFaint || 0, st.faint);
  }

  // 폭발 때: 끝이 폭발 1.0초 전 이후인 화면 안 구간 중 가장 이른 시작 → 예고가 보인 시간(폭발 − 시작), 끝 → 마지막 보인 때
  _eggVisEnd(sh) {
    const M = this.metrics;
    const runs = (sh.visRuns || []).slice();
    if (sh.visSince !== undefined && sh.visSince !== null) runs.push([sh.visSince, this.t]);
    let lead = 0, endGap = null;
    for (const [a, b] of runs) {
      if (b < sh.tBurst - 1.0) continue;
      if (sh.tBurst - a > lead) { lead = sh.tBurst - a; endGap = sh.tBurst - b; }
    }
    (M.eggVis || (M.eggVis = [])).push(+lead.toFixed(3));
    (M.eggVisEnd || (M.eggVisEnd = [])).push(endGap === null ? null : +endGap.toFixed(3));
    M.eggOccl = (M.eggOccl || 0) + (sh.occl ? 1 : 0);
    M.eggN = (M.eggN || 0) + 1;
  }

  // 스테이지 끝: 그리기 호출·삼각형·FPS 최댓값·최솟값 기록(디버그 로그)
  _logPerf() {
    const p = this.metrics.perf;
    const rec = { calls: p.calls, tris: p.tris, fps: p.fps, at: new Date().toISOString() };
    this.perfLog[`S${this.stage.id}`] = rec;
    if (DEV && typeof console !== 'undefined') console.info('[bvf perf]', `S${this.stage.id}`, JSON.stringify(rec));
  }

  // HP 0: 연기를 끌며 빙글빙글 추락, 군중은 최대 환호
  _fall(dt) {
    const b = this.bird;
    this.fallT += dt;
    this.fallVy -= FALL.gravity * dt;
    b.v = Math.max(0.5, b.v + this.fallVy * dt);
    b.u += this.fallVx * dt;
    b.s += b.forward * 0.45 * dt;
    b.place();
    b.group.rotation.z += FALL.spin * dt;
    b.group.rotation.x += FALL.spin * 0.3 * dt;
    b.invuln = 0;
    b.animate(dt, 0.3);
    for (let k = 0; k < 3; k++) {
      this.fw.smoke.emit(b.pos.x, b.pos.y, b.pos.z, (Math.random() - 0.5) * 0.6, 0.4, (Math.random() - 0.5) * 0.6,
        2.4, 0.6 * b.radius * 2, 3.5, 0.13, 0.12, 0.12, 0.05, 0.05, 0.05, 0.55, 0.6, -0.3, 0);
    }
    this.fw.update(dt, this.t);
    const ev = [];
    this.threats.update(dt, this.t, null, ev, this.camera.position, this.camera);
    this.world.update(b.s, this.camera, this.t, dt);
    this.crowd.update(this.t, this.camera);
    this.rig.follow(dt, b);
    if (this.fallT >= FALL.duration) {
      b.group.rotation.set(0, 0, 0);
      this.enterEnding();
    }
  }

  _endingAnim(dt) {
    this.chicken.rotation.y += dt * 0.6;
    for (const s of this.steam) {
      s.userData.t += dt;
      const u = (s.userData.t % 2.2) / 2.2;
      if (u < 0.02) s.userData.x = (Math.random() - 0.5) * 0.9;
      s.position.set((s.userData.x || 0) + Math.sin(u * 6 + s.userData.t) * 0.08, 1.1 + u * 1.6, (Math.random() - 0.5) * 0.02);
      s.scale.setScalar(0.6 + u * 1.6);
      s.material.opacity = 0.45 * (1 - u);
    }
  }

  render() {
    if (!this.renderer) return;
    if (this.state === 'ending') {
      this.renderer.render(this.endScene, this.endCam, false);
      return;
    }
    const cam = this.camera;
    const pr = this.renderer.pixelRatio;
    const vh = this.renderer.height * pr;
    const scale = vh / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2));
    if (this.mobile) {
      // 16차 3-4(M9): 불씨·연기 최대 픽셀 절반, 위협 별 머리 화면 지름 3 CSS px·범위 원 선 1.5 CSS px 이상
      const M = RENDER.mobile;
      this.fw.setPointScale(scale, this.renderer.width * pr, vh, M.maxSparkPx, M.maxSmokePx);
      this.threats.setPointScale(scale, this.renderer.width * pr, vh, M.maxSparkPx * (vh / 1080), { headMin: (M.headMinCss / 2) * pr, lineMin: Math.max(0.75, (M.lineMinCss / 2) * pr) });
    } else {
      this.fw.setPointScale(scale, this.renderer.width * pr, vh);
      this.threats.setPointScale(scale, this.renderer.width * pr, vh, RENDER.maxSparkPx * (vh / 1080));
    }
    const info = this.renderer.renderer.info;
    info.autoReset = false;
    info.reset();
    this.renderer.render(this.scene, cam, true, this.state === 'play' || this.state === 'falling' ? this.threats.overlay : null);
    if (this.state === 'play') {
      const p = this.metrics.perf;
      p.calls[0] = Math.min(p.calls[0], info.render.calls);
      p.calls[1] = Math.max(p.calls[1], info.render.calls);
      p.tris[0] = Math.min(p.tris[0], info.render.triangles);
      p.tris[1] = Math.max(p.tris[1], info.render.triangles);
    }
    this.lastInfo = { calls: info.render.calls, tris: info.render.triangles };
  }
}
