/* ================================================================
   CẤU HÌNH NHANH CHO GIÁO VIÊN
   Đổi điểm đạt, XP hoặc tên website tại đây.
   ================================================================ */
window.MOS = window.MOS || {};

window.MOS.CONFIG = {
  siteName: "MOS Learning Journey",
  passingScore: 80,
  xpPerLesson: 10,
  xpPerExplore: 20,
  xpPerPractice: 30,
  xpPerChapter: 100,
  xpPerSubject: 500,
  perfectQuizBonus: 200,
  contentVersion: 2,
  storageKey: "mos-learning-journey-v1"
};

window.MOS.LEVELS = [
  { min: 0, name: "Office Rookie" },
  { min: 400, name: "Office Explorer" },
  { min: 1000, name: "Office Specialist" },
  { min: 2000, name: "Office Pro" },
  { min: 3500, name: "MOS Champion" }
];
