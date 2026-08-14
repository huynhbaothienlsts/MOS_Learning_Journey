/* Điều phối giao diện. Dữ liệu và logic độc lập nằm trong data/ và các file js/ khác. */
const {
  CONFIG, LEVELS, COURSES, BADGES,
  CHAPTER_QUESTIONS, FINAL_QUESTIONS, MASTER_QUESTIONS,
  Storage, Utils, QuizEngine, Certificate, CanvasMode
} = window.MOS;

let state = Storage.loadState(CONFIG.storageKey);
let activeCourse = null;
let activeChapterIndex = 0;
let quizSession = null;
let storageWarningShown = false;

function saveState() {
  const persisted = Storage.persistState(CONFIG.storageKey, state);
  updateDashboard();
  if (!persisted && !storageWarningShown) {
    storageWarningShown = true;
    CanvasMode.showStorageWarning();
    toast("Trình duyệt đang chặn lưu tiến độ. Dữ liệu chỉ được giữ trong phiên này.");
  }
}

function award(key, amount, message) {
  if (state.awards[key]) return false;
  state.awards[key] = amount;
  state.xp += amount;
  saveState();
  toast(`✨ +${amount} XP · ${message}`, "xp");
  return true;
}

function toast(message, type = "") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  document.querySelector("#toast-region").append(el);
  setTimeout(() => el.remove(), 3200);
}

function getLevel() {
  let index = LEVELS.findLastIndex((level) => state.xp >= level.min);
  index = Math.max(index, 0);
  return { index, ...LEVELS[index], next: LEVELS[index + 1] };
}

function courseCompletedCount(courseId) {
  return COURSES[courseId].chapters.filter((chapter) => state.chapters[chapter.id]).length;
}

function courseProgress(courseId) {
  return Math.round((courseCompletedCount(courseId) / COURSES[courseId].chapters.length) * 100);
}

function allSubjectsPassed() {
  return Object.keys(COURSES).every((id) => state.quizResults[id]?.passed);
}

function overallProgress() {
  const total = Object.values(COURSES).reduce((sum, course) => sum + course.chapters.length, 0) + 4;
  const done = Object.values(COURSES).reduce(
    (sum, course) => sum + course.chapters.filter((chapter) => state.chapters[chapter.id]).length,
    0
  ) + Object.keys(COURSES).filter((id) => state.quizResults[id]?.passed).length
    + (state.quizResults.master?.passed ? 1 : 0);
  return Math.round((done / total) * 100);
}

function updateDashboard() {
  const level = getLevel();
  const base = level.min;
  const ceiling = level.next?.min ?? Math.max(5000, state.xp);
  const percent = Math.min(100, ((state.xp - base) / (ceiling - base)) * 100);
  document.querySelector("#level-number").textContent = `LV ${level.index + 1}`;
  document.querySelector("#level-name").textContent = level.name;
  document.querySelector("#xp-label").textContent = level.next ? `${state.xp} / ${ceiling}` : `${state.xp} XP`;
  document.querySelector("#xp-bar").style.width = `${percent}%`;
  document.querySelector("#badge-count").textContent = state.badges.length;
  document.querySelector("#overall-progress").textContent = `${overallProgress()}%`;
}

function unlockBadge(id) {
  if (state.badges.includes(id)) return;
  state.badges.push(id);
  saveState();
  const badge = BADGES.find((item) => item[0] === id);
  toast(`🔓 Badge unlocked: ${badge[2]}`, "badge");
  celebrate(28);
}

function evaluateMilestones(courseId) {
  const count = courseCompletedCount(courseId);
  if (count >= 2) unlockBadge({ powerpoint: "ppt-design", word: "word-document", excel: "excel-data" }[courseId]);
  if (count >= 4) unlockBadge({ powerpoint: "ppt-story", word: "word-layout", excel: "excel-formula" }[courseId]);
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelector(`#${name}-view`)?.classList.add("active");
  document.querySelectorAll("[data-nav]").forEach((item) => item.classList.toggle("active", item.dataset.nav === name));
  document.querySelector("nav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const hasProgress = Object.keys(state.awards).length > 0;
  const start = document.querySelector("#start-button");
  start.innerHTML = hasProgress
    ? `Tiếp tục hành trình <span aria-hidden="true">→</span>`
    : `Bắt đầu hành trình <span aria-hidden="true">→</span>`;
  document.querySelector(".hero-copy .eyebrow").textContent = hasProgress
    ? "WELCOME BACK! • CONTINUE YOUR JOURNEY"
    : "LEARN • PRACTICE • CHALLENGE • GET CERTIFIED";

  document.querySelector("#world-grid").innerHTML = Object.entries(COURSES).map(([id, course]) => {
    const progress = courseProgress(id);
    const passed = state.quizResults[id]?.passed;
    return `<article class="world-card" style="--course:${course.color}">
      <div class="world-top"><span class="world-icon">${course.icon}</span><span class="status-pill">${passed ? "✓ Hoàn thành" : progress ? "Đang học" : "Sẵn sàng"}</span></div>
      <h3>${course.title}</h3><p>Become a ${course.role}</p>
      <div class="world-meta"><span>${courseCompletedCount(id)}/${course.chapters.length} chapter</span><strong>${progress}%</strong></div>
      <div class="course-progress"><span style="width:${progress}%"></span></div>
      <button class="button" data-course="${id}">${progress ? "Tiếp tục" : "Khám phá"} <span aria-hidden="true">→</span></button>
    </article>`;
  }).join("") + `<article class="world-card master-world" style="--course:#6d43e5">
    <div class="world-top"><span class="world-icon">♛</span><span class="status-pill">${state.quizResults.master?.passed ? "✓ Hoàn thành" : allSubjectsPassed() ? "Đã mở khóa" : "🔒 Locked"}</span></div>
    <h3>MOS Master Challenge</h3><p>Kết hợp PowerPoint, Word và Excel</p>
    <div class="world-meta"><span>27 câu tổng hợp</span><strong>Pass ≥ ${CONFIG.passingScore}%</strong></div>
    <div class="course-progress"><span style="width:${state.quizResults.master?.passed || allSubjectsPassed() ? 100 : 0}%"></span></div>
    <button class="button" data-master ${allSubjectsPassed() ? "" : "disabled"}>${state.quizResults.master?.passed ? "Làm lại" : allSubjectsPassed() ? "Bắt đầu Challenge" : "Hoàn thành 3 môn để mở"} <span aria-hidden="true">→</span></button>
  </article>`;
  renderMap();
}

function renderMap() {
  document.querySelector("#map-content").innerHTML = Object.entries(COURSES).map(([id, course]) => `<div class="map-lane">
    <h3><span style="color:${course.color}">${course.title}</span><small>${courseProgress(id)}%</small></h3>
    ${course.chapters.map((chapter, index) => {
      const done = state.chapters[chapter.id];
      const locked = index > 0 && !state.chapters[course.chapters[index - 1].id];
      return `<div class="map-step ${done ? "done" : locked ? "locked" : ""}"><span class="step-dot">${done ? "✓" : locked ? "🔒" : index + 1}</span><span>${chapter.title}</span><small>${done ? "Done" : locked ? "Locked" : "Open"}</small></div>`;
    }).join("")}
    <div class="map-step ${state.quizResults[id]?.passed ? "done" : courseCompletedCount(id) < course.chapters.length ? "locked" : ""}"><span class="step-dot">${state.quizResults[id]?.passed ? "✓" : courseCompletedCount(id) < course.chapters.length ? "🔒" : "🏆"}</span><span>Final Challenge</span><small>${state.quizResults[id]?.passed ? "Passed" : courseCompletedCount(id) < course.chapters.length ? "Locked" : "Open"}</small></div>
  </div>`).join("");
}

function openCourse(courseId, chapterIndex) {
  activeCourse = courseId;
  const course = COURSES[courseId];
  activeChapterIndex = Number.isInteger(chapterIndex)
    ? chapterIndex
    : Math.max(0, course.chapters.findIndex((chapter) => !state.chapters[chapter.id]));
  if (activeChapterIndex < 0) activeChapterIndex = course.chapters.length - 1;
  state.lastCourse = courseId;
  state.lastChapter = activeChapterIndex;
  saveState();
  showView("course");
  renderCourse();
}

function isChapterLocked(course, index) {
  return index > 0 && !state.chapters[course.chapters[index - 1].id];
}

function renderCourse() {
  const course = COURSES[activeCourse];
  const chapter = course.chapters[activeChapterIndex];
  const locked = isChapterLocked(course, activeChapterIndex);
  const done = state.chapters[chapter.id];
  const finalOpen = courseCompletedCount(activeCourse) === course.chapters.length;
  document.querySelector("#course-view").innerHTML = `<div class="course-shell" style="--course:${course.color}">
    <div class="course-banner"><div><button class="back-link" data-action="home" type="button">← MOS Explorer</button><p class="eyebrow">WORLD ${Object.keys(COURSES).indexOf(activeCourse) + 1} • ${course.exam}</p><h1>${course.title}</h1><p>Become a ${course.role} · ${course.chapters.length} stages · ${courseProgress(activeCourse)}% complete</p></div><div class="course-badge-big">${course.icon}</div></div>
    <div class="course-body"><aside class="chapter-sidebar" aria-label="Danh sách chapter">${course.chapters.map((item, index) => `<button class="chapter-nav ${index === activeChapterIndex ? "active" : ""} ${state.chapters[item.id] ? "done" : ""} ${isChapterLocked(course, index) ? "locked" : ""}" data-chapter="${index}" ${isChapterLocked(course, index) ? "disabled" : ""}><span>${state.chapters[item.id] ? "✓" : isChapterLocked(course, index) ? "🔒" : index + 1}</span><strong>${item.title}</strong><small>${state.chapters[item.id] ? "Done" : ""}</small></button>`).join("")}</aside>
    <section class="chapter-content">${locked ? `<div class="empty-lock"><h2>🔒 Stage đang khóa</h2><p>Hoàn thành chapter trước để mở khóa.</p></div>` : renderChapter(course, chapter, done)}
      <div class="final-gate ${finalOpen ? "" : "locked"}"><div><strong>${finalOpen ? "🏆 Final Challenge đã mở khóa" : "🔒 Final Challenge"}</strong><p>${finalOpen ? `15 câu · Pass ≥ ${CONFIG.passingScore}% · Câu hỏi và đáp án được đảo` : `Hoàn thành ${course.chapters.length - courseCompletedCount(activeCourse)} chapter còn lại để mở khóa.`}</p></div><button class="button primary" data-final="${activeCourse}" ${finalOpen ? "" : "disabled"}>${state.quizResults[activeCourse]?.passed ? "Làm lại" : "Bắt đầu"}</button></div>
    </section></div></div>`;
  showCycle("learn");
}

function renderChapter(course, chapter, done) {
  return `<p class="chapter-kicker">CHAPTER ${activeChapterIndex + 1} OF ${course.chapters.length} ${done ? "· ✓ COMPLETED" : ""}</p><h2>${chapter.title}</h2><p class="chapter-intro">${chapter.summary}</p><div class="cycle-tabs" role="tablist" aria-label="Chu trình học"><button data-cycle="learn">① Learn</button><button data-cycle="explore">② Explore</button><button data-cycle="practice">③ Practice</button><button data-cycle="mission">④ Mission</button></div><div class="activity-panel" data-panel="learn">${renderLessons(chapter)}</div><div class="activity-panel" data-panel="explore" hidden>${renderExplore(chapter)}</div><div class="activity-panel" data-panel="practice" hidden>${renderPractice(chapter)}</div><div class="activity-panel" data-panel="mission" hidden>${renderMission(chapter)}</div>`;
}

function renderLessons(chapter) {
  return `<div class="lesson-grid">${chapter.lessons.map((lesson, index) => {
    const key = `${chapter.id}-${index}`;
    const completed = state.lessons[key];
    return `<article class="lesson-card ${completed ? "completed" : ""}"><span class="lesson-icon">${lesson[0]}</span><h3>${lesson[1]}</h3><p>${lesson[2]}</p><button class="button small" data-lesson="${key}" ${completed ? "disabled" : ""}>${completed ? "✓ Đã học" : "Đánh dấu đã hiểu · +10 XP"}</button></article>`;
  }).join("")}</div>`;
}

function renderExplore(chapter) {
  const item = CHAPTER_QUESTIONS[chapter.id][0];
  const complete = state.explores[chapter.id];
  return `<div class="activity-card"><p class="eyebrow">CLICK TO REVEAL</p><h3>Explore Activity</h3><p class="scenario">${item.prompt}</p><div class="answers">${item.options.map((option, index) => `<button class="answer" data-explore="${index}" ${complete ? "disabled" : ""}>${String.fromCharCode(65 + index)}. ${option}</button>`).join("")}</div>${complete ? `<p class="feedback">✓ ${item.explain}</p>` : ""}</div>`;
}

function renderPractice(chapter) {
  const answers = state.practice[chapter.id] || {};
  return `<div class="practice-stack">${CHAPTER_QUESTIONS[chapter.id].map((item, questionIndex) => `<article class="practice-item"><p>${questionIndex + 1}. ${item.prompt}</p><div class="answers">${item.options.map((option, answerIndex) => `<button class="answer ${answers[questionIndex] === answerIndex ? "correct" : ""}" data-practice-q="${questionIndex}" data-practice-a="${answerIndex}" ${answers[questionIndex] !== undefined ? "disabled" : ""}>${option}</button>`).join("")}</div>${answers[questionIndex] !== undefined ? `<div class="feedback">✓ Chính xác! ${item.explain}</div>` : ""}</article>`).join("")}</div>`;
}

function renderMission(chapter) {
  const ready = chapter.lessons.every((_, index) => state.lessons[`${chapter.id}-${index}`])
    && state.explores[chapter.id]
    && Object.keys(state.practice[chapter.id] || {}).length === CHAPTER_QUESTIONS[chapter.id].length;
  const item = CHAPTER_QUESTIONS[chapter.id][2];
  const done = state.chapters[chapter.id];
  return `<div class="mission-card"><p class="eyebrow">CHAPTER MISSION</p><span class="mission-reward">+${CONFIG.xpPerChapter} XP</span><h3>Final checkpoint</h3>${ready || done ? `<p class="scenario">${item.prompt}</p><div class="answers">${item.options.map((option, index) => `<button class="answer" data-mission="${index}" ${done ? "disabled" : ""}>${option}</button>`).join("")}</div>${done ? "<p class=\"feedback\">✓ Mission complete. Stage đã chinh phục!</p>" : ""}` : `<p class="scenario">Hoàn tất LEARN, EXPLORE và cả 3 câu PRACTICE để mở khóa Mission.</p>`}</div>`;
}

function showCycle(name) {
  document.querySelectorAll("[data-panel]").forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
  document.querySelectorAll("[data-cycle]").forEach((button) => button.classList.toggle("active", button.dataset.cycle === name));
}

function handleLesson(key) {
  state.lessons[key] = true;
  award(`lesson-${key}`, CONFIG.xpPerLesson, "Micro lesson complete");
  renderCourse();
}

function handleExplore(answer, button) {
  const chapter = COURSES[activeCourse].chapters[activeChapterIndex];
  const item = CHAPTER_QUESTIONS[chapter.id][0];
  if (answer === item.answer) {
    state.explores[chapter.id] = true;
    button.classList.add("correct");
    award(`explore-${chapter.id}`, CONFIG.xpPerExplore, "Explore complete");
    setTimeout(() => { renderCourse(); showCycle("explore"); }, 450);
  } else {
    button.classList.add("wrong");
    toast("Chưa đúng — thử một lựa chọn khác.");
    setTimeout(() => button.classList.remove("wrong"), 550);
  }
}

function handlePractice(questionIndex, answer, button) {
  const chapter = COURSES[activeCourse].chapters[activeChapterIndex];
  const item = CHAPTER_QUESTIONS[chapter.id][questionIndex];
  if (answer !== item.answer) {
    button.classList.add("wrong");
    toast(`Chưa đúng. ${item.explain}`);
    setTimeout(() => button.classList.remove("wrong"), 700);
    return;
  }
  state.practice[chapter.id] ??= {};
  state.practice[chapter.id][questionIndex] = answer;
  saveState();
  award(`practice-${chapter.id}-${questionIndex}`, CONFIG.xpPerPractice, "Practice correct");
  renderCourse();
  showCycle("practice");
}

function handleMission(answer, button) {
  const chapter = COURSES[activeCourse].chapters[activeChapterIndex];
  const item = CHAPTER_QUESTIONS[chapter.id][2];
  if (answer !== item.answer) {
    button.classList.add("wrong");
    toast("Mission chưa hoàn tất — đọc gợi ý và thử lại.");
    setTimeout(() => button.classList.remove("wrong"), 600);
    return;
  }
  state.chapters[chapter.id] = true;
  award(`chapter-${chapter.id}`, CONFIG.xpPerChapter, "Chapter complete");
  evaluateMilestones(activeCourse);
  celebrate(34);
  renderCourse();
  showCycle("mission");
}

function startQuiz(type) {
  const source = type === "master" ? MASTER_QUESTIONS : FINAL_QUESTIONS[type];
  quizSession = QuizEngine.createSession(type, source, Utils.shuffle);
  showView("quiz");
  renderQuiz();
}

function renderQuiz() {
  const label = quizSession.type === "master" ? "MOS Master Challenge" : `${COURSES[quizSession.type].title} Final Challenge`;
  const total = quizSession.questions.length;
  if (quizSession.index >= total) { renderQuizResult(); return; }
  const item = quizSession.questions[quizSession.index];
  document.querySelector("#quiz-view").innerHTML = `<div class="quiz-wrap"><button class="back-link" data-action="quiz-exit" type="button">← Thoát challenge</button><div class="quiz-header"><div><p class="eyebrow">${label}</p><strong>Câu ${quizSession.index + 1} / ${total}</strong></div><span>${Math.round((quizSession.index / total) * 100)}%</span></div><div class="quiz-progress"><span style="width:${(quizSession.index / total) * 100}%"></span></div><article class="quiz-card"><span class="quiz-number">SCENARIO ${String(quizSession.index + 1).padStart(2, "0")}</span><h2>${item.prompt}</h2><div class="answers">${item.shuffled.map((option, index) => `<button class="answer" data-quiz-answer="${index}"><strong>${String.fromCharCode(65 + index)}</strong> · ${option.text}</button>`).join("")}</div></article></div>`;
}

function answerQuiz(index) {
  QuizEngine.answer(quizSession, index);
  renderQuiz();
}

function renderQuizResult() {
  const result = QuizEngine.getResult(quizSession, CONFIG.passingScore);
  const previous = state.quizResults[quizSession.type];
  state.quizResults[quizSession.type] = { score: result.score, passed: result.passed, date: new Date().toISOString() };
  saveState();
  if (result.passed && !previous?.passed) {
    if (quizSession.type === "master") {
      unlockBadge("mos-champion");
      award("master-pass", CONFIG.xpPerSubject, "MOS Master complete");
    } else {
      unlockBadge(`${quizSession.type}-specialist`.replace("powerpoint", "ppt"));
      award(`subject-${quizSession.type}`, CONFIG.xpPerSubject, "Subject complete");
    }
    if (result.perfect) award(`perfect-${quizSession.type}`, CONFIG.perfectQuizBonus, "Perfect Quiz bonus");
    celebrate(70);
  }
  const misses = quizSession.answers.filter((item) => !item.correct);
  const review = [...new Set(misses.map((item) => item.chapter))].map((id) => findChapter(id)?.title).filter(Boolean);
  document.querySelector("#quiz-view").innerHTML = `<div class="quiz-wrap"><div class="result-card"><p class="eyebrow">${result.passed ? "CHALLENGE COMPLETE" : "ALMOST THERE!"}</p><h1>${result.passed ? "🎉 Congratulations!" : "Tiếp tục luyện tập"}</h1><div class="score-ring" style="--score:${result.score}"><strong>${result.score}%</strong></div><p>${result.correct}/${result.total} câu đúng · Cần ${CONFIG.passingScore}% để đạt</p>${result.passed ? `<p>Bạn đã hoàn thành <strong>${quizSession.type === "master" ? "MOS Learning Journey Master" : `${COURSES[quizSession.type].title} Learning Journey`}</strong>.</p><form class="certificate-form" id="certificate-form"><label class="sr-only" for="student-name">Tên học sinh</label><input id="student-name" required maxlength="70" placeholder="Nhập họ và tên học sinh"><button class="button primary" type="submit">Tạo Certificate</button></form>` : `<div class="review-list"><strong>Chapter nên xem lại</strong><ul>${(review.length ? review : ["Ôn lại các micro lesson liên quan"]).map((item) => `<li>${item}</li>`).join("")}</ul></div>`}<div class="hero-actions" style="justify-content:center"><button class="button ghost" data-action="quiz-review">${result.passed ? "Về thế giới" : "Review Lessons"}</button><button class="button primary" data-action="quiz-retry">Try Again</button></div></div></div>`;
}

function findChapter(id) {
  for (const course of Object.values(COURSES)) {
    const chapter = course.chapters.find((item) => item.id === id);
    if (chapter) return chapter;
  }
  return null;
}

function createCertificate(name) {
  const type = quizSession.type;
  state.certificates[type] = Certificate.create(type, state.quizResults[type], name);
  saveState();
  openCertificate(type);
}

function openCertificate(type) {
  const data = state.certificates[type];
  if (!data) return;
  const dialog = document.querySelector("#certificate-dialog");
  dialog.innerHTML = Certificate.render(type, data, COURSES, Utils.escapeHTML);
  dialog.showModal();
}

function renderAchievements() {
  const level = getLevel();
  document.querySelector("#achievement-summary").innerHTML = `<div class="summary-card"><strong>${state.xp}</strong><span>Total XP</span></div><div class="summary-card"><strong>Level ${level.index + 1}</strong><span>${level.name}</span></div><div class="summary-card"><strong>${state.badges.length}/${BADGES.length}</strong><span>Badges unlocked</span></div><div class="summary-card"><strong>${overallProgress()}%</strong><span>Overall progress</span></div>`;
  document.querySelector("#badge-gallery").innerHTML = BADGES.map((badge) => `<article class="badge-card ${state.badges.includes(badge[0]) ? "unlocked" : ""}"><div class="badge-emblem">${state.badges.includes(badge[0]) ? badge[1] : "🔒"}</div><h3>${badge[2]}</h3><p>${state.badges.includes(badge[0]) ? badge[3] : `Locked · ${badge[3]}`}</p></article>`).join("");
  const certificates = Object.entries(state.certificates);
  document.querySelector("#certificate-gallery").innerHTML = `<h2>Certificates</h2>${certificates.length ? certificates.map(([type, data]) => `<div class="cert-mini"><div><strong>${type === "master" ? "MOS Master" : COURSES[type].title}</strong><small> · ${data.name} · ${data.score}%</small></div><button class="button small" data-certificate="${type}">Xem</button></div>`).join("") : "<p class=\"muted\">Certificate sẽ xuất hiện sau khi bạn đạt Final Challenge.</p>"}`;
}

function celebrate(count = 35) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = document.querySelector("#confetti");
  const colors = ["#6d43e5", "#e85b35", "#168454", "#f2b84b", "#2f68d8"];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    box.append(piece);
    setTimeout(() => piece.remove(), 2600);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button,a");
  if (!target) return;
  if (target.matches("[data-course]")) { event.preventDefault(); openCourse(target.dataset.course); }
  else if (target.matches("[data-master]")) startQuiz("master");
  else if (target.matches("[data-chapter]")) openCourse(activeCourse, Number(target.dataset.chapter));
  else if (target.matches("[data-cycle]")) showCycle(target.dataset.cycle);
  else if (target.matches("[data-lesson]")) handleLesson(target.dataset.lesson);
  else if (target.matches("[data-explore]")) handleExplore(Number(target.dataset.explore), target);
  else if (target.matches("[data-practice-q]")) handlePractice(Number(target.dataset.practiceQ), Number(target.dataset.practiceA), target);
  else if (target.matches("[data-mission]")) handleMission(Number(target.dataset.mission), target);
  else if (target.matches("[data-final]")) startQuiz(target.dataset.final);
  else if (target.matches("[data-quiz-answer]")) answerQuiz(Number(target.dataset.quizAnswer));
  else if (target.matches("[data-certificate]")) openCertificate(target.dataset.certificate);
  else if (target.matches(".dialog-close")) target.closest("dialog").close();
  else if (target.matches("[data-action='home']")) { showView("home"); renderHome(); }
  else if (target.matches("[data-action='show-map']")) document.querySelector("#learning-map").scrollIntoView({ behavior: "smooth" });
  else if (target.matches("[data-action='quiz-exit']") && confirm("Thoát challenge? Kết quả lần này sẽ không được lưu.")) openCourse(quizSession.type === "master" ? state.lastCourse || "powerpoint" : quizSession.type);
  else if (target.matches("[data-action='quiz-retry']")) startQuiz(quizSession.type);
  else if (target.matches("[data-action='quiz-review']")) openCourse(quizSession.type === "master" ? state.lastCourse || "powerpoint" : quizSession.type);
  else if (target.matches("[data-action='print-certificate']")) window.print();
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "certificate-form") {
    event.preventDefault();
    createCertificate(event.target.querySelector("input").value);
  }
});

document.querySelector("#start-button").addEventListener("click", () => openCourse(state.lastCourse || "powerpoint"));
document.querySelector("#author-button").addEventListener("click", () => document.querySelector("#author-dialog").showModal());
document.querySelector("#reset-progress").addEventListener("click", () => {
  if (confirm("Bạn chắc chắn muốn xóa toàn bộ tiến độ? Hành động này không thể hoàn tác.")) {
    state = Storage.clearState(CONFIG.storageKey);
    renderAchievements();
    renderHome();
    updateDashboard();
    toast("Đã xóa tiến độ trên thiết bị này.");
  }
});
document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const open = document.querySelector("nav").classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", open);
});
document.querySelector("#sound-toggle").addEventListener("click", (event) => {
  state.sound = !state.sound;
  saveState();
  event.currentTarget.textContent = state.sound ? "♪" : "♩";
  toast(state.sound ? "Âm thanh đã bật" : "Âm thanh đã tắt");
});
document.querySelectorAll("[data-nav]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  const name = link.dataset.nav;
  if (name === "journey") {
    showView("home"); renderHome(); setTimeout(() => document.querySelector("#journey").scrollIntoView(), 0);
  } else if (name === "achievements") {
    renderAchievements(); showView("achievements");
  } else {
    renderHome(); showView("home");
  }
}));
window.addEventListener("hashchange", () => {
  if (location.hash === "#achievements") { renderAchievements(); showView("achievements"); }
});

CanvasMode.init();
if (!Storage.isAvailable()) CanvasMode.showStorageWarning();
renderHome();
updateDashboard();
