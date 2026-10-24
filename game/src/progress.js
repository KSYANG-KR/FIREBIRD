// 16차 2-6: 스테이지 잠금 해제 진행. 키 `bvf.progress.v1` = { cleared: [1, …] } — 모드(전체 판·연습)에 상관없이 깨면 다음 스테이지가 열린다.
//   - 파싱이 실패하거나 모양이 틀리면 원문을 `bvf.progress.v1.corrupt` 에 한 번 복사한 뒤(이미 있으면 그대로 둠) 새로 쓴다.
//   - 15차 랭킹 v1(`bvf.ranking.v1`)에 기록이 있으면 S1 은 깬 것으로 본다(4-5) — 메모리에서만 더하고, 다음에 깰 때 함께 저장.
//   - three·window 를 쓰지 않는다(node 시험이 그대로 부른다).
import { STAGES } from './config.js';
import { KEY_V1 } from './ranking.js';

export const PROGRESS_KEY = 'bvf.progress.v1';
export const PROGRESS_CORRUPT = `${PROGRESS_KEY}.corrupt`;
const IDS = STAGES.map((s) => s.id);

const okList = (a) => Array.isArray(a) && a.every((n) => Number.isInteger(n) && IDS.includes(n));

export function createProgress(storage) {
  const get = (k) => {
    try {
      return storage ? storage.getItem(k) : null;
    } catch {
      return null;
    }
  };
  const set = (k, v) => {
    try {
      if (storage) storage.setItem(k, v);
      return true;
    } catch {
      return false;
    }
  };
  // 15차 v1 랭킹에 기록이 하나라도 있는가(형식 검사는 랭킹 쪽 일 — 여기서는 「배열이고 비지 않음」만)
  const hasV1 = () => {
    const r = get(KEY_V1);
    if (!r) return false;
    try {
      const a = JSON.parse(r);
      return Array.isArray(a) && a.length > 0;
    } catch {
      return false;
    }
  };
  let mem = null; // 저장하지 못했을 때 이번 세션 값
  function read() {
    const raw = get(PROGRESS_KEY);
    let cleared = [];
    if (raw !== null && raw !== undefined) {
      let o = null;
      try {
        o = JSON.parse(raw);
      } catch {
        o = null;
      }
      if (o && typeof o === 'object' && !Array.isArray(o) && okList(o.cleared)) {
        cleared = o.cleared.slice();
      } else {
        // 깨진 원문은 한 번만 복사(이미 복사본이 있으면 덮지 않음) → 새로 씀
        const prev = get(PROGRESS_CORRUPT);
        if (prev === null || prev === undefined) set(PROGRESS_CORRUPT, raw);
        set(PROGRESS_KEY, JSON.stringify({ cleared: [] }));
      }
    }
    if (mem) for (const n of mem) if (!cleared.includes(n)) cleared.push(n);
    if (hasV1() && !cleared.includes(1)) cleared.push(1);
    return cleared.sort((a, b) => a - b);
  }
  return {
    cleared: read,
    // 스테이지 n 이 열렸는가(1 은 늘 열림, 그 밖은 n−1 을 깼으면)
    unlocked(n, all = false) {
      const c = read(); // 깨진 값 정리는 늘(DEV 에서도) 한다
      return all || n === 1 || c.includes(n - 1);
    },
    // 스테이지 n 을 깼다
    markCleared(n) {
      const c = read();
      if (!c.includes(n)) c.push(n);
      c.sort((a, b) => a - b);
      if (!set(PROGRESS_KEY, JSON.stringify({ cleared: c }))) mem = c;
      return c;
    },
  };
}

export const progressStore = createProgress(typeof localStorage !== 'undefined' ? localStorage : null);
