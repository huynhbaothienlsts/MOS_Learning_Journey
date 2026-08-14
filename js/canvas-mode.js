/* Các điều chỉnh chỉ bật khi website chạy bên trong Canvas/iframe. */
window.MOS = window.MOS || {};

function isEmbedded() {
  try { return window.self !== window.top; } catch { return true; }
}

function init() {
  const embedded = isEmbedded();
  document.body.classList.toggle("is-embedded", embedded);
  const fullSiteLink = document.querySelector("#open-fullsite");
  if (embedded && fullSiteLink) {
    fullSiteLink.hidden = false;
    fullSiteLink.href = `${location.origin}${location.pathname}${location.search}`;
  }
  return embedded;
}

function showStorageWarning() {
  const notice = document.querySelector("#storage-notice");
  if (notice) notice.hidden = false;
}

window.MOS.CanvasMode = { isEmbedded, init, showStorageWarning };
