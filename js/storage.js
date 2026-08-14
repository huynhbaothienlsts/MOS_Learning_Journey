/* Lưu tiến độ an toàn. Nếu trình duyệt chặn localStorage, website vẫn chạy trong phiên hiện tại. */
window.MOS = window.MOS || {};

let memoryState = null;
let storageAvailable = true;

const emptyState = () => ({
  version: 1,
  xp: 0,
  awards: {},
  lessons: {},
  explores: {},
  practice: {},
  chapters: {},
  quizResults: {},
  badges: [],
  certificates: {},
  lastCourse: null,
  lastChapter: null,
  sound: true
});

function loadState(key) {
  try {
    const raw = localStorage.getItem(key);
    return { ...emptyState(), ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    storageAvailable = false;
    return { ...emptyState(), ...(memoryState || {}) };
  }
}

function persistState(key, state) {
  memoryState = JSON.parse(JSON.stringify(state));
  try {
    localStorage.setItem(key, JSON.stringify(state));
    storageAvailable = true;
    return true;
  } catch {
    storageAvailable = false;
    return false;
  }
}

function clearState(key) {
  memoryState = null;
  try {
    localStorage.removeItem(key);
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  return emptyState();
}

window.MOS.Storage = {
  emptyState,
  loadState,
  persistState,
  clearState,
  isAvailable: () => storageAvailable
};
