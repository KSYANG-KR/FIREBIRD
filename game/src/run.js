// 16차 4-1: 한 판(run)의 순수 논리 — 점수·이어하기·스테이지 사이 회복·제출 내용·점수 상한.
// three·window·import.meta 를 쓰지 않는다(node 시험 tools/ranking-test.mjs 가 이 모듈을 그대로 부른다). game.js 가 실제로 이것을 쓴다.
import { BIRDS, BIRD_ORDER, STAGES, SCORING, HEAL_BETWEEN_STAGES, BURST, CHOREO, FOOD, ROLL } from './config.js';

export const RUN_MODES = ['run', 'practice'];
export const MIN_ROLLS_NEXT = 3; // 다음 스테이지 시작 롤 최소 개수

// 스테이지 점수 = 클리어 기본 × 스테이지 번호 + 보너스 + 남은 HP 점수 + 무피격 보너스
export function stageScore(stageId, rec) {
  return (
    SCORING.clearPerStage * stageId +
    (rec.bonus ?? 0) +
    SCORING.hpPoint * Math.ceil(Math.max(0, rec.hpEnd)) +
    (rec.hits === 0 ? SCORING.noHitBonus : 0)
  );
}

// 새 판. mode 'run' = 전체 판(S1 부터), 'practice' = 한 스테이지 연습. startStage 는 1~5
let _seq = 0;
export function newRun(bird, mode = 'run', startStage = 1, id = null) {
  return {
    id: id || `r${Date.now().toString(36)}${(++_seq).toString(36)}`,
    bird,
    mode,
    startStage,
    stageIndex: startStage - 1,
    stageStartHp: null,
    continues: 0, // 판 전체 이어하기 수
    stageContinues: [], // 스테이지별 이어하기 수
    records: [],
    totalTime: 0,
    registered: false,
    registering: false,
  };
}

// 스테이지 시작 HP 를 기억(이어하기는 이 HP 로 다시)
export function onStageStart(run, stageIndex, hp) {
  run.stageIndex = stageIndex;
  run.stageStartHp = hp;
  if (run.stageContinues[stageIndex] === undefined) run.stageContinues[stageIndex] = 0;
  return run;
}

// 스테이지 클리어: 기록을 남기고 다음 스테이지 HP(최대치의 30% 회복, 상한 maxHp)·롤(최소 3) 을 돌려준다
export function onStageClear(run, rec, maxHp) {
  const r = { ...rec, continues: run.stageContinues[run.stageIndex] || 0 };
  if (r.score === undefined) r.score = stageScore(r.id, r);
  run.records[run.stageIndex] = r;
  const nextHp = Math.min(maxHp, Math.max(0, rec.hpEnd) + maxHp * HEAL_BETWEEN_STAGES);
  const nextRolls = Math.min(ROLL.max, Math.max(MIN_ROLLS_NEXT, rec.rolls ?? 0));
  run.nextHp = nextHp;
  run.nextRolls = nextRolls;
  return { nextHp, nextRolls, rec: r };
}

// 추락 뒤 다시: 전체 판 S1 은 새 판(이어하기 0), 그 밖은 그 스테이지 시작 HP 로 이어하기 +1
export function onFallRetry(run) {
  if (run.mode === 'run' && run.stageIndex === 0) return { newRun: true };
  run.continues++;
  run.stageContinues[run.stageIndex] = (run.stageContinues[run.stageIndex] || 0) + 1;
  return { newRun: false, hp: run.stageStartHp, continues: run.continues };
}

export function runTotal(run) {
  return run ? run.records.reduce((a, r) => a + (r ? r.score : 0), 0) : 0;
}

// 전체 완주(S1 부터 S5 까지 모두 클리어)인가
export function isFullRun(run) {
  if (run.mode !== 'run' || run.startStage !== 1) return false;
  for (let i = 0; i < STAGES.length; i++) if (!run.records[i]) return false;
  return true;
}

// 제출 내용: { run: 전체 완주 항목 | null, stages: 스테이지 항목[] }. name = normalizeNickname 결과 { name, norm }
export function buildSubmission(run, name) {
  const base = { name: name.name, norm: name.norm, bird: run.bird };
  const stages = [];
  run.records.forEach((r, i) => {
    if (!r) return;
    stages.push({
      ...base, stage: i + 1, score: r.score, hits: r.hits, nearMiss: r.nearMiss, hpEnd: Math.ceil(Math.max(0, r.hpEnd)),
      continues: r.continues ?? run.stageContinues[i] ?? 0, mode: run.mode, runId: run.id,
    });
  });
  const full = isFullRun(run)
    ? { ...base, score: runTotal(run), continues: run.continues, stageScores: STAGES.map((_, i) => run.records[i].score), time: run.totalTime, runId: run.id, ver: 16 }
    : null;
  return { run: full, stages };
}

// 4-2 점수 상한(숫자를 박지 않고 config 에서 계산 — 정상 점수보다 아주 큰 보수적 상한)
//   = clearPerStage·id + hpPoint·max(HP) + noHitBonus + Σ_{k=1..N} P·Cmax·(1 + B·k) + (HP 먹이 최대 수·fullPts + 롤 먹이 최대 수·fullPts)
//   N = maxWaves × finaleMax, P = perfect + graze + center + timing + pass, Cmax = 마지막 comboMult, B = 2 × centerBonus
export function stageScoreCeil(id) {
  const S = SCORING;
  const maxHp = Math.max(...BIRD_ORDER.map((b) => BIRDS[b].hp));
  const N = CHOREO.maxWaves * CHOREO.finaleMax;
  const P = S.perfect + S.graze + S.center + S.timing + S.pass;
  const Cmax = S.comboMult[S.comboMult.length - 1][1];
  const B = 2 * BURST.centerBonus;
  const bonus = P * Cmax * (N + (B * N * (N + 1)) / 2);
  const food = FOOD.hp.n[1] * FOOD.hp.fullPts + FOOD.roll.n[1] * FOOD.roll.fullPts;
  return Math.ceil(S.clearPerStage * id + S.hpPoint * maxHp + S.noHitBonus + bonus + food);
}

export function runScoreCeil() {
  let t = 0;
  for (let i = 1; i <= STAGES.length; i++) t += stageScoreCeil(i);
  return t;
}
