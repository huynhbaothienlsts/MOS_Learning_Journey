/* Tạo dữ liệu và giao diện Certificate. */
window.MOS = window.MOS || {};

function create(type, result, studentName) {
  const date = new Intl.DateTimeFormat("vi-VN").format(new Date());
  const prefix = type === "master" ? "MOS-MASTER" : `MOS-${type === "powerpoint" ? "PPT" : type.toUpperCase()}`;
  return {
    name: studentName.trim(),
    score: result.score,
    date,
    id: `${prefix}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  };
}

function render(type, data, courses, escapeHTML) {
  const title = type === "master"
    ? "MOS LEARNING JOURNEY — MASTER COMPLETION"
    : `MOS ${courses[type].title.toUpperCase()} LEARNING JOURNEY`;

  return `<button class="dialog-close" aria-label="Đóng" type="button">×</button>
    <div class="certificate">
      <div class="cert-mark">✦ M</div>
      <p>CERTIFICATE OF COMPLETION</p>
      <h2>This certifies that</h2>
      <div class="student-name">${escapeHTML(data.name)}</div>
      <p>has successfully completed</p>
      <div class="cert-course">${title}</div>
      <div class="certificate-meta">
        <span>Score: <strong>${data.score}%</strong></span>
        <span>Date: <strong>${data.date}</strong></span>
        <span>ID: <strong>${data.id}</strong></span>
      </div>
      <p class="certificate-note">Learning Completion Certificate – This is not an official Microsoft MOS certification.</p>
    </div>
    <div class="certificate-actions">
      <button class="button ghost dialog-close" type="button">Đóng</button>
      <button class="button primary" data-action="print-certificate" type="button">Print / Save as PDF</button>
    </div>`;
}

window.MOS.Certificate = { create, render };
