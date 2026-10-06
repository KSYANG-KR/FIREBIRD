// 랭킹 저장부. 지금은 이 브라우저(localStorage)에만 저장하는 「캐주얼 랭킹」이다.
// 나중에 원격 랭킹을 붙일 때는 같은 모양(list/submit)의 저장소를 하나 더 만들어 바꿔 끼운다.
// 금칙어 목록은 공개 코드에 넣지 않는다(원격 단계에서 서버 쪽에만 둔다). 여기서는 정규화와 글자 규칙만 본다.
import { RANKING } from './config.js';

const KEY = 'bvf.ranking.v1';

// 닉네임 정리: NFKC 정규화 → 공백·기호 제거 → 허용 글자(한글 음절·영문·숫자)·길이 확인.
// name: 화면에 보일 이름, norm: 비교용(소문자)
export function normalizeNickname(raw) {
  const s = String(raw ?? '')
    .normalize('NFKC')
    .replace(/[\s\p{P}\p{S}\p{C}]/gu, '');
  if (/[^가-힣a-zA-Z0-9]/.test(s)) return { ok: false, reason: '한글·영문·숫자만 쓸 수 있어요.' };
  if (s.length < RANKING.nameMin) return { ok: false, reason: `${RANKING.nameMin}자 이상 적어 주세요.` };
  if (s.length > RANKING.nameMax) return { ok: false, reason: `${RANKING.nameMax}자까지 쓸 수 있어요.` };
  return { ok: true, name: s, norm: s.toLowerCase() };
}

// 정렬: 점수 높은 순, 같으면 이어하기 적은 순, 그다음 먼저 등록한 순
export function sortEntries(list) {
  return list.slice().sort((a, b) => b.score - a.score || a.continues - b.continues || a.at - b.at);
}

// tab: 'clean' = 이어하기 없이 클리어한 기록만, 'all' = 이어하기 포함 전체
export function filterTab(list, tab) {
  return sortEntries(tab === 'clean' ? list.filter((e) => e.continues === 0) : list);
}

function createLocalStore(storage) {
  const read = () => {
    try {
      const raw = storage && storage.getItem(KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };
  return {
    kind: 'local',
    async list() {
      return read();
    },
    // entry: { name, norm, score, bird, continues, stages }
    async submit(entry) {
      const rec = { ...entry, id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`, at: Date.now() };
      const all = sortEntries([...read(), rec]).slice(0, RANKING.keep);
      try {
        storage && storage.setItem(KEY, JSON.stringify(all));
      } catch {
        return { ok: false, reason: '이 브라우저에 저장할 수 없어요.', id: rec.id };
      }
      return { ok: true, id: rec.id };
    },
  };
}

export const rankingStore = createLocalStore(typeof localStorage !== 'undefined' ? localStorage : null);
