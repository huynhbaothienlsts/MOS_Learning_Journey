/* Logic quiz độc lập với giao diện để dễ kiểm thử và tái sử dụng. */
window.MOS = window.MOS || {};

function createSession(type, source, shuffle) {
  return {
    type,
    index: 0,
    answers: [],
    questions: shuffle(source).map((item) => {
      const options = item.options.map((text, index) => ({ text, correct: index === item.answer }));
      return { ...item, shuffled: shuffle(options) };
    })
  };
}

function answer(session, optionIndex) {
  const item = session.questions[session.index];
  const choice = item.shuffled[optionIndex];
  session.answers.push({
    correct: choice.correct,
    chapter: item.chapter,
    prompt: item.prompt,
    explain: item.explain
  });
  session.index += 1;
}

function getResult(session, passingScore) {
  const total = session.questions.length;
  const correct = session.answers.filter((item) => item.correct).length;
  const score = Math.round((correct / total) * 100);
  return { total, correct, score, passed: score >= passingScore, perfect: correct === total };
}

window.MOS.QuizEngine = { createSession, answer, getResult };
