const USED_KEY = "quiz.usedCategories";
const HISTORY_KEY = "quiz.history";
const PPT_KEY = "quiz.pptPaths";

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsedCategoryIds = (): string[] => readJson<string[]>(USED_KEY, []);
export const isCategoryUsed = (id: string) => getUsedCategoryIds().includes(id);

export const getHistory = (): string[] => readJson<string[]>(HISTORY_KEY, []);

export const markCategoryUsed = (id: string) => {
  const used = new Set(getUsedCategoryIds());
  used.add(id);
  writeJson(USED_KEY, Array.from(used));
  const hist = getHistory();
  hist.push(id);
  writeJson(HISTORY_KEY, hist);
};

export const undoLastSelection = (): string | null => {
  const hist = getHistory();
  if (hist.length === 0) return null;
  const last = hist.pop()!;
  writeJson(HISTORY_KEY, hist);
  const used = new Set(getUsedCategoryIds());
  used.delete(last);
  writeJson(USED_KEY, Array.from(used));
  return last;
};

export const resetProgress = () => {
  localStorage.removeItem(USED_KEY);
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(PPT_KEY);
};

export const getPptPath = (id: string): string | undefined => {
  const map = readJson<Record<string, string>>(PPT_KEY, {});
  return map[id];
};

export const setPptPath = (id: string, url: string) => {
  const map = readJson<Record<string, string>>(PPT_KEY, {});
  map[id] = url;
  writeJson(PPT_KEY, map);
};
