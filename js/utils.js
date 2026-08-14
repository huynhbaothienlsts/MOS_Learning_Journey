window.MOS = window.MOS || {};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHTML(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

window.MOS.Utils = { shuffle, escapeHTML };
