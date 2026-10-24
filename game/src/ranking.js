// 랭킹 저장부. 이 브라우저(localStorage)에만 저장하는 「캐주얼 랭킹」이다.
// 16차 4절 랭킹 v2: 키 `bvf.ranking.v2` = { v:2, migratedFrom, migratedAt, runs:[], stages:{"1":[]…"5":[]}, quarantine:[] }
//   - 읽기(list)는 저장소에 쓰지 않는다. 메모리에서 검증·이관해서 보여 주기만 한다.
//   - 쓰기(submit)는 한 번: 직전 다시 읽기 → (깨졌으면 빈 백업 칸에 원문 복사·확인, 못 하면 쓰기 거부) → 검증 실패 항목은 quarantine → setItem 한 번
//   - 옛 키 `bvf.ranking.v1` 은 지우지 않는다. v2 가 없으면 v1 을 메모리에서 이관(S1 탭, legacy), 첫 저장 때 함께 저장
// 금칙어 목록은 공개 코드에 넣지 않는다. 여기서는 정규화와 글자 규칙만 본다.
import { RANKING, BIRD_ORDER, STAGES } from './config.js';
import { stageScoreCeil, runScoreCeil, RUN_MODES } from './run.js';

export const KEY_V1 = 'bvf.ranking.v1';
export const KEY_V2 = 'bvf.ranking.v2';
export const CORRUPT_SLOTS = [1, 2, 3].map((i) => `${KEY_V2}.corrupt.${i}`);
export const KEEP_RUNS = RANKING.keep; // 100
export const KEEP_STAGE = 50;
const SAVE_FAIL = "Couldn't save."; // 17차 U2: 짧게
const STAGE_IDS = STAGES.map((s) => String(s.id));

// 닉네임 정리: NFKC 정규화 → 공백·기호 제거 → 허용 글자(15차: 영문·숫자만)·길이 확인.
// name: 화면에 보일 이름, norm: 비교용(소문자)
export function normalizeNickname(raw) {
  const s = String(raw ?? '')
    .normalize('NFKC')
    .replace(/[\s\p{P}\p{S}\p{C}]/gu, '');
  if (/[^a-zA-Z0-9]/.test(s)) return { ok: false, reason: 'Letters and numbers only.' };
  if (s.length < RANKING.nameMin) return { ok: false, reason: `At least ${RANKING.nameMin} characters.` };
  if (s.length > RANKING.nameMax) return { ok: false, reason: `Up to ${RANKING.nameMax} characters.` };
  return { ok: true, name: s, norm: s.toLowerCase() };
}

// 15차: 표시 이름 — 지금 규칙(영문·숫자 2~12자)에 맞지 않는 옛 기록 이름은 지우지 않고 화면에만 "Player"
export function displayName(name) {
  const s = String(name ?? '');
  return /^[a-zA-Z0-9]+$/.test(s) && s.length >= RANKING.nameMin && s.length <= RANKING.nameMax ? s : 'Player';
}

// 정렬: 점수 높은 순, 같으면 이어하기 적은 순, 그다음 먼저 등록한 순
export function sortEntries(list) {
  return list.slice().sort((a, b) => b.score - a.score || a.continues - b.continues || a.at - b.at);
}

// ---------- 검증 ----------
const isInt = (v) => typeof v === 'number' && Number.isInteger(v);
function baseOk(e) {
  return (
    !!e && typeof e === 'object' && !Array.isArray(e) &&
    typeof e.id === 'string' && e.id.length > 0 && e.id.length <= 40 &&
    typeof e.at === 'number' && Number.isFinite(e.at) && e.at > 0 &&
    typeof e.name === 'string' &&
    BIRD_ORDER.includes(e.bird) &&
    isInt(e.continues) && e.continues >= 0 && e.continues <= 999
  );
}
export function validStageEntry(e) {
  return (
    baseOk(e) && isInt(e.stage) && e.stage >= 1 && e.stage <= STAGES.length &&
    isInt(e.score) && e.score >= 0 && e.score <= stageScoreCeil(e.stage) &&
    RUN_MODES.includes(e.mode)
  );
}
export function validRunEntry(e) {
  return baseOk(e) && isInt(e.score) && e.score >= 0 && e.score <= runScoreCeil() && Array.isArray(e.stageScores) && e.stageScores.length === STAGES.length;
}
// v1 항목(15차까지): {name, norm, score, bird, continues, ver, stages[], id, at} — 점수는 S1 점수
function v1Score(e) {
  return e.stages && e.stages[0] && e.stages[0].score !== undefined ? e.stages[0].score : e.score;
}
function validV1(e) {
  if (!baseOk(e)) return false;
  const sc = v1Score(e);
  return isInt(sc) && sc >= 0 && sc <= stageScoreCeil(1);
}

const emptyStages = () => Object.fromEntries(STAGE_IDS.map((k) => [k, []]));
export function emptyV2() {
  return { v: 2, migratedFrom: null, migratedAt: null, runs: [], stages: emptyStages(), quarantine: [] };
}
// 겉모양이 v2 인가(항목 하나하나는 따로 검증)
function isV2Shape(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o) || o.v !== 2 || !Array.isArray(o.runs)) return false;
  if (!o.stages || typeof o.stages !== 'object' || Array.isArray(o.stages)) return false;
  for (const k of Object.keys(o.stages)) if (!Array.isArray(o.stages[k])) return false;
  if (o.quarantine !== undefined && !Array.isArray(o.quarantine)) return false;
  return true;
}

// 격리 목록: id(없으면 JSON 원문)로 중복을 뺀다. 상한은 두지 않는다(넘치면 지우는 경로가 생기므로)
const qKey = (item) => (item && typeof item === 'object' && typeof item.id === 'string' ? `id:${item.id}` : `raw:${JSON.stringify(item)}`);
function addQuarantine(list, item, from) {
  const k = qKey(item);
  if (!list.some((x) => qKey(x.item) === k)) list.push({ from, item });
}

// v1 배열 → v2(메모리). 같은 입력이면 같은 결과(멱등). migratedAt 은 저장할 때 붙인다
export function migrateV1(arr) {
  const out = emptyV2();
  out.migratedFrom = 'v1';
  if (!Array.isArray(arr)) {
    addQuarantine(out.quarantine, arr, 'v1');
    return out;
  }
  for (const e of arr) {
    if (!validV1(e)) {
      addQuarantine(out.quarantine, e, 'v1');
      continue;
    }
    const s0 = e.stages && e.stages[0] ? e.stages[0] : {};
    out.stages['1'].push({
      id: `v1:${e.id}`.slice(0, 40), at: e.at, name: e.name, norm: typeof e.norm === 'string' ? e.norm : String(e.name).toLowerCase(), bird: e.bird, stage: 1,
      score: v1Score(e), hits: s0.hits ?? null, nearMiss: s0.nearMiss ?? null, hpEnd: s0.hpEnd ?? null,
      continues: e.continues, mode: 'run', runId: null, legacy: true, from: 'v15',
    });
  }
  // 옛 기록은 지우지 않는다: 50개 컷은 새 기록이 들어올 때만(이관 자체로는 자르지 않음)
  out.stages['1'] = sortEntries(out.stages['1']);
  return out;
}

// 검증: 형식이 틀린 항목을 quarantine 으로 옮긴 사본을 만든다(원본은 그대로)
function cleanV2(o) {
  const out = { v: 2, migratedFrom: o.migratedFrom ?? null, migratedAt: o.migratedAt ?? null, runs: [], stages: emptyStages(), quarantine: [] };
  for (const q of o.quarantine || []) {
    const isQ = q && typeof q === 'object' && !Array.isArray(q) && 'item' in q;
    addQuarantine(out.quarantine, isQ ? q.item : q, isQ && q.from ? q.from : 'v2');
  }
  for (const e of o.runs) {
    if (validRunEntry(e)) out.runs.push(e);
    else addQuarantine(out.quarantine, e, 'v2.runs');
  }
  for (const k of Object.keys(o.stages)) {
    for (const e of o.stages[k]) {
      if (STAGE_IDS.includes(k) && validStageEntry(e) && String(e.stage) === k) out.stages[k].push(e);
      else addQuarantine(out.quarantine, e, `v2.stages.${k}`);
    }
  }
  out.runs = sortEntries(out.runs);
  for (const k of STAGE_IDS) out.stages[k] = sortEntries(out.stages[k]);
  return out;
}

function defaultMakeId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

// storage: localStorage 와 같은 모양(getItem·setItem). now·makeId 는 시험용으로 바꿔 끼울 수 있다
export function createStore(storage, { now = () => Date.now(), makeId = defaultMakeId } = {}) {
  const session = { runs: [], stages: emptyStages() }; // 저장하지 못한 이번 세션 기록(메모리 전용)
  let memOnly = false;

  const get = (k) => {
    try {
      return storage ? storage.getItem(k) : null;
    } catch {
      return null;
    }
  };

  // 저장소를 읽어 지금 상태를 만든다(쓰지 않음). status: 'empty' | 'ok' | 'migrated' | 'corrupt'
  function readState() {
    const raw = get(KEY_V2);
    if (raw === null || raw === undefined) {
      const r1 = get(KEY_V1);
      if (r1 === null || r1 === undefined) return { status: 'empty', raw: null, data: emptyV2() };
      let arr;
      try {
        arr = JSON.parse(r1);
      } catch {
        arr = { unparsedV1: String(r1).slice(0, 4000) };
      }
      return { status: 'migrated', raw: null, data: migrateV1(arr) };
    }
    let o;
    try {
      o = JSON.parse(raw);
    } catch {
      return { status: 'corrupt', raw, data: emptyV2() };
    }
    if (!isV2Shape(o)) return { status: 'corrupt', raw, data: emptyV2() };
    return { status: 'ok', raw, data: cleanV2(o) };
  }

  const withSession = (data) => {
    const runs = sortEntries([...data.runs, ...session.runs]);
    const stages = {};
    for (const k of STAGE_IDS) stages[k] = sortEntries([...data.stages[k], ...session.stages[k]]);
    return { runs, stages, quarantine: data.quarantine };
  };

  // 깨진 원문을 빈 백업 칸에 복사하고 다시 읽어 확인. 칸이 다 찼거나 실패하면 false(지우지 않음)
  function backupCorrupt(raw) {
    for (const k of CORRUPT_SLOTS) {
      const cur = get(k);
      if (cur !== null && cur !== undefined) continue;
      try {
        storage.setItem(k, raw);
      } catch {
        return false;
      }
      return get(k) === raw;
    }
    return false;
  }

  return {
    kind: 'local',
    // 보여 줄 목록: { runs, stages:{"1":[]…}, quarantine, status, memOnly } — 저장소에 쓰지 않는다
    list() {
      const st = readState();
      return { ...withSession(st.data), status: st.status, memOnly };
    },
    // sub = run.js buildSubmission 결과 { run, stages[] }
    // 돌려줌: { ok, ids:{run, stages:{n:id}}, ranked:{run, stages:{n:bool}}, duplicate?, memOnly?, reason? }
    submit(sub) {
      const at = now();
      const ids = { run: null, stages: {} };
      const runEntry = sub.run ? { ...sub.run, id: makeId(), at } : null;
      const stageEntries = (sub.stages || []).map((s) => ({ ...s, id: makeId(), at }));
      if (runEntry) ids.run = runEntry.id;
      for (const s of stageEntries) ids.stages[s.stage] = s.id;
      if (runEntry && !validRunEntry(runEntry)) return { ok: false, reason: SAVE_FAIL, invalid: true, ids };
      for (const s of stageEntries) if (!validStageEntry(s)) return { ok: false, reason: SAVE_FAIL, invalid: true, ids };
      // ① 쓰기 직전 다시 읽기(다른 탭이 그사이 저장했어도 그 위에 더한다)
      const st = readState();
      const data = st.data;
      // 같은 판 같은 스테이지는 한 번만(두 번 저장 막기)
      const all = withSession(data);
      const dupStage = (s) => !!s.runId && all.stages[String(s.stage)].some((x) => x.runId === s.runId);
      const dupRun = !!runEntry && all.runs.some((x) => x.runId && x.runId === runEntry.runId);
      const newStages = stageEntries.filter((s) => !dupStage(s));
      const addRun = runEntry && !dupRun ? runEntry : null;
      if (!addRun && !newStages.length) return { ok: true, duplicate: true, ids, ranked: { run: false, stages: {} } };
      // ② 깨졌으면 원문을 빈 백업 칸에. 못 하면(칸 3개가 다 참·실패·할당량) 쓰기 거부 → 이번 세션 목록에만
      let refuse = memOnly || !storage;
      if (!refuse && st.status === 'corrupt' && !backupCorrupt(st.raw)) refuse = true;
      // ③ 검증 실패 항목은 cleanV2 가 이미 같은 객체의 quarantine 으로 옮겨 둠
      const next = {
        v: 2, migratedFrom: data.migratedFrom, migratedAt: data.migratedFrom && !data.migratedAt ? at : data.migratedAt,
        runs: data.runs.slice(), stages: Object.fromEntries(STAGE_IDS.map((k) => [k, data.stages[k].slice()])), quarantine: data.quarantine.slice(),
      };
      if (addRun) next.runs = sortEntries([...next.runs, addRun]).slice(0, KEEP_RUNS);
      for (const s of newStages) {
        const k = String(s.stage);
        next.stages[k] = sortEntries([...next.stages[k], s]).slice(0, Math.max(KEEP_STAGE, next.stages[k].length));
        // 새 기록이 들어올 때 50개 컷(옛 기록이 이미 50개를 넘으면 그 수를 유지 — 이관한 옛 기록을 지우지 않게)
      }
      const ranked = { run: !!addRun && next.runs.includes(addRun), stages: {} };
      for (const s of newStages) ranked.stages[s.stage] = next.stages[String(s.stage)].includes(s);
      if (refuse) {
        memOnly = true;
        if (addRun) session.runs.push(addRun);
        for (const s of newStages) session.stages[String(s.stage)].push(s);
        return { ok: false, memOnly: true, reason: SAVE_FAIL, ids, ranked };
      }
      // ④ 한 번에 쓰기(원자적). 예외면 메모리 상태 그대로
      try {
        storage.setItem(KEY_V2, JSON.stringify(next));
      } catch {
        return { ok: false, reason: SAVE_FAIL, ids, ranked: { run: false, stages: {} } };
      }
      return { ok: true, ids, ranked };
    },
  };
}

// 탭별 목록: tab 'full' → runs(sub 'clean' = 이어하기 0 만 / 'all'), tab '1'~'5' → stages[n](sub 'run' = 전체 판 기록 + 옛 기록 / 'practice')
export function tabList(view, tab, sub) {
  if (!view) return [];
  if (tab === 'full') return sortEntries(sub === 'all' ? view.runs : view.runs.filter((e) => e.continues === 0));
  const arr = (view.stages && view.stages[String(tab)]) || [];
  return sortEntries(arr.filter((e) => (sub === 'practice' ? e.mode === 'practice' : e.mode === 'run')));
}

// 기본 탭: FULL RUN 에 1건이라도 있으면 FULL RUN, 없으면 S1
export function defaultTab(view) {
  return view && view.runs && view.runs.length ? 'full' : '1';
}

export const rankingStore = createStore(typeof localStorage !== 'undefined' ? localStorage : null);
