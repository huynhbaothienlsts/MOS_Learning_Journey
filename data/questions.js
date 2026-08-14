(function () {
/*
 * NGÂN HÀNG CÂU HỎI — giáo viên có thể sửa/thêm câu tại đây.
 * answer là vị trí đáp án đúng (bắt đầu từ 0). chapter dùng để gợi ý bài cần ôn.
 */
const q = (chapter, prompt, options, answer, explain) => ({ chapter, prompt, options, answer, explain });

const CHAPTER_QUESTIONS = {
  "powerpoint-1": [
    q("powerpoint-1","Muốn logo trường xuất hiện nhất quán trên mọi slide, bạn nên sửa ở đâu?",["Slide Master","Notes Master","Reading View","File Properties"],0,"Slide Master kiểm soát các thành phần dùng chung của slide và layout."),
    q("powerpoint-1","Bạn cần xem ghi chú riêng trong khi khán giả chỉ thấy slide. Dùng chế độ nào?",["Outline View","Presenter View","Slide Sorter","Reading View"],1,"Presenter View hiển thị slide hiện tại, slide kế tiếp, ghi chú và thời gian cho người trình bày."),
    q("powerpoint-1","Trước khi chia sẻ, công cụ nào tìm metadata và nội dung ẩn?",["Design Ideas","Document Inspector","Rehearse Timings","Format Background"],1,"Document Inspector hỗ trợ phát hiện thuộc tính ẩn và thông tin không nên phân phối.")
  ],
  "powerpoint-2": [
    q("powerpoint-2","Bạn muốn tổ chức 40 slide thành các nhóm có tên. Dùng gì?",["Sections","Comments","Custom Shows","Guides"],0,"Sections giúp nhóm, đổi tên và sắp xếp các cụm slide."),
    q("powerpoint-2","Một slide phụ không nên trình chiếu nhưng vẫn cần giữ. Chọn thao tác nào?",["Delete Slide","Hide Slide","Lock Slide","Skip Layout"],1,"Hide Slide giữ slide trong tệp nhưng bỏ qua khi trình chiếu thông thường."),
    q("powerpoint-2","Muốn dùng lại slide từ tệp khác mà không sao chép thủ công?",["Reuse Slides","Record Slide Show","Summary Zoom","Slide Master"],0,"Reuse Slides chèn slide từ bản trình bày khác và có thể giữ định dạng nguồn.")
  ],
  "powerpoint-3": [
    q("powerpoint-3","Nhiều đối tượng cần di chuyển như một khối. Thao tác phù hợp?",["Merge Shapes","Group","Align","Order"],1,"Group liên kết các đối tượng để di chuyển, đổi cỡ và định dạng cùng nhau."),
    q("powerpoint-3","Muốn các hình có khoảng cách ngang bằng nhau, chọn gì?",["Distribute Horizontally","Align Center","Group","Bring Forward"],0,"Distribute Horizontally tạo khoảng cách đều giữa các đối tượng."),
    q("powerpoint-3","Để người dùng trình đọc màn hình hiểu ảnh, cần thêm gì?",["Caption","Alt Text","Comment","Footer"],1,"Alt Text mô tả ý nghĩa của hình ảnh cho công nghệ hỗ trợ.")
  ],
  "powerpoint-4": [
    q("powerpoint-4","Bạn muốn biến danh sách quy trình thành sơ đồ trực quan. Công cụ nào?",["WordArt","SmartArt","Screenshot","3D Models"],1,"SmartArt phù hợp với quy trình, phân cấp, mối quan hệ và danh sách trực quan."),
    q("powerpoint-4","Muốn video tự chạy khi slide xuất hiện, thay đổi tùy chọn nào?",["Start: Automatically","Loop until Stopped","Play Full Screen","Trim Video"],0,"Start: Automatically kích hoạt video ngay khi slide bắt đầu."),
    q("powerpoint-4","Khi dữ liệu nguồn theo hàng nhưng biểu đồ cần đọc theo cột, dùng gì?",["Change Chart Type","Switch Row/Column","Edit Alt Text","Quick Layout"],1,"Switch Row/Column đổi cách biểu đồ diễn giải chuỗi và danh mục.")
  ],
  "powerpoint-5": [
    q("powerpoint-5","Hiệu ứng xảy ra giữa hai slide gọi là gì?",["Animation","Transition","Motion Path","Trigger"],1,"Transition áp dụng khi chuyển từ slide này sang slide khác."),
    q("powerpoint-5","Muốn đối tượng di chuyển theo đường tự vẽ, dùng gì?",["Morph","Motion Path","Emphasis","Fade Transition"],1,"Motion Path điều khiển đường di chuyển của đối tượng trên slide."),
    q("powerpoint-5","Muốn đổi thứ tự nhiều animation trên một slide, mở công cụ nào?",["Animation Pane","Selection Pane","Slide Sorter","Format Pane"],0,"Animation Pane hiển thị và cho phép sắp xếp, định thời các hiệu ứng.")
  ],
  "word-1": [
    q("word-1","Muốn đi nhanh đến một heading trong tài liệu dài, dùng gì?",["Navigation Pane","Clipboard","Styles Gallery","Editor"],0,"Navigation Pane cho phép tìm kiếm và nhảy giữa heading, trang hoặc kết quả."),
    q("word-1","Trước khi nộp tài liệu, muốn tìm thông tin cá nhân ẩn. Dùng gì?",["Accessibility Checker","Document Inspector","Compatibility Mode","Track Changes"],1,"Document Inspector tìm metadata, thuộc tính ẩn và nội dung không mong muốn."),
    q("word-1","Muốn kiểm tra tài liệu có dễ dùng với trình đọc màn hình không?",["Accessibility Checker","Spelling & Grammar","Compare","Protect Document"],0,"Accessibility Checker phát hiện nhiều vấn đề về khả năng tiếp cận.")
  ],
  "word-2": [
    q("word-2","Muốn một phần tài liệu có hướng trang ngang nhưng phần còn lại dọc, cần gì trước?",["Page Break","Section Break","Column Break","Line Break"],1,"Section Break cho phép phần mới có thiết lập trang riêng."),
    q("word-2","Muốn sao chép nhanh định dạng của tiêu đề sang đoạn khác, dùng gì?",["Format Painter","Find and Replace","Clear Formatting","Text Effects"],0,"Format Painter sao chép định dạng mà không sao chép nội dung."),
    q("word-2","Để cấu trúc tài liệu nhất quán và tạo mục lục tự động, nên dùng gì?",["Manual Bold","Built-in Heading Styles","Text Boxes","Themes only"],1,"Heading Styles tạo cấu trúc có ngữ nghĩa và là nguồn cho mục lục.")
  ],
  "word-3": [
    q("word-3","Bảng dài qua nhiều trang cần lặp lại tên cột. Chọn gì?",["Repeat Header Rows","Split Table","AutoFit Window","Sort"],0,"Repeat Header Rows lặp hàng tiêu đề ở đầu mỗi trang."),
    q("word-3","Muốn tạo hai ô từ một ô hiện tại, thao tác nào?",["Merge Cells","Split Cells","Split Table","Distribute Columns"],1,"Split Cells chia một ô thành số hàng/cột được chỉ định."),
    q("word-3","Danh sách thứ hai cần tiếp tục số từ danh sách trước. Dùng gì?",["Restart at 1","Continue Numbering","Define New Bullet","Decrease Indent"],1,"Continue Numbering nối chuỗi đánh số thay vì bắt đầu lại.")
  ],
  "word-4": [
    q("word-4","Mục lục tự động lấy nội dung chủ yếu từ đâu?",["Comments","Heading Styles","Page Color","Bookmarks only"],1,"Word xây mục lục tự động từ các heading có cấp độ."),
    q("word-4","Chú thích nên xuất hiện cuối mỗi trang gọi là gì?",["Endnote","Footnote","Caption","Citation"],1,"Footnote nằm ở cuối trang; Endnote thường nằm cuối tài liệu hoặc section."),
    q("word-4","Sau khi đổi heading, muốn cập nhật số trang trong mục lục, chọn gì?",["Update Table","Insert Index","Cross-reference","Track Changes"],0,"Update Table cập nhật số trang hoặc toàn bộ nội dung mục lục.")
  ],
  "word-5": [
    q("word-5","Muốn văn bản chạy quanh ảnh thay vì chỉ trên/dưới ảnh, chỉnh gì?",["Wrap Text","Crop","Alt Text","Position Lock"],0,"Wrap Text kiểm soát cách văn bản bao quanh đối tượng."),
    q("word-5","Muốn bỏ nền ảnh để chỉ giữ chủ thể, dùng gì?",["Artistic Effects","Remove Background","Corrections","Compress Pictures"],1,"Remove Background xác định và loại bỏ vùng nền của hình ảnh."),
    q("word-5","Đối tượng quan trọng cần gì để hỗ trợ người dùng trình đọc màn hình?",["Alt Text","Watermark","Caption style only","Shadow"],0,"Alt Text cung cấp mô tả thay thế có ý nghĩa.")
  ],
  "word-6": [
    q("word-6","Muốn ghi lại mọi chỉnh sửa của nhóm để xem xét sau, bật gì?",["Track Changes","Read Mode","Restrict Editing","AutoSave only"],0,"Track Changes đánh dấu phần chèn, xóa và thay đổi định dạng."),
    q("word-6","Một nhận xét đã xử lý nhưng vẫn cần giữ lịch sử. Chọn gì?",["Delete","Resolve","Reject","Hide Ink"],1,"Resolve đánh dấu hội thoại đã hoàn tất mà vẫn giữ lịch sử."),
    q("word-6","Muốn đưa một thay đổi được theo dõi vào bản cuối, chọn gì?",["Accept","Reply","Compare","Inspect"],0,"Accept đưa thay đổi vào tài liệu; Reject khôi phục nội dung trước đó.")
  ],
  "excel-1": [
    q("excel-1","Muốn hàng tiêu đề luôn thấy khi cuộn xuống, dùng gì?",["Split","Freeze Panes","Page Break Preview","New Window"],1,"Freeze Panes cố định hàng/cột trong khi phần còn lại cuộn."),
    q("excel-1","Chỉ một vùng ô cần được in. Thiết lập nào?",["Print Area","Page Background","Named Range","Filter"],0,"Print Area giới hạn vùng được gửi tới máy in."),
    q("excel-1","Muốn xem các công thức thay vì kết quả trong toàn trang tính?",["Show Formulas","Evaluate Formula","Trace Precedents","Name Manager"],0,"Show Formulas chuyển chế độ hiển thị giữa công thức và kết quả.")
  ],
  "excel-2": [
    q("excel-2","Muốn điền tiếp chuỗi Tháng 1, Tháng 2..., dùng gì?",["AutoFill","Flash Fill only","Consolidate","Subtotal"],0,"AutoFill nhận mẫu và mở rộng chuỗi qua fill handle."),
    q("excel-2","Muốn giữ kết quả nhưng bỏ công thức khi dán, chọn gì?",["Paste Values","Paste Link","Transpose","Paste Formatting"],0,"Paste Values chỉ dán giá trị đã tính."),
    q("excel-2","Muốn làm nổi các điểm dưới trung bình tự động, dùng gì?",["Cell Styles","Conditional Formatting","Format Painter","Themes"],1,"Conditional Formatting định dạng theo quy tắc và thay đổi cùng dữ liệu.")
  ],
  "excel-3": [
    q("excel-3","Lợi ích chính khi chuyển phạm vi thành Excel Table?",["Mất bộ lọc","Tự mở rộng và có structured references","Khóa mọi ô","Xóa định dạng"],1,"Table tự mở rộng, có header/filter và hỗ trợ structured references."),
    q("excel-3","Muốn hiển thị tổng mà không tự viết công thức, bật gì?",["Total Row","Header Row","Banded Columns","First Column"],0,"Total Row cung cấp danh sách hàm tổng hợp cho từng cột."),
    q("excel-3","Muốn sắp theo Lớp rồi theo Điểm giảm dần, cần gì?",["Multi-level Sort","Single Filter","Subtotal","Remove Duplicates"],0,"Custom Sort cho phép thêm nhiều cấp sắp xếp theo thứ tự ưu tiên.")
  ],
  "excel-4": [
    q("excel-4","Công thức sao chép xuống nhưng ô thuế B1 phải cố định. Tham chiếu nào?",["B1","$B$1","B$1 only","$B1 only"],1,"$B$1 là tham chiếu tuyệt đối, khóa cả cột và hàng."),
    q("excel-4","Hàm nào đếm ô không trống, kể cả văn bản?",["COUNT","COUNTA","COUNTBLANK","SUM"],1,"COUNTA đếm mọi ô không trống; COUNT chủ yếu đếm số."),
    q("excel-4","Muốn trả về “Đạt” nếu điểm >= 8, dùng hàm nào?",["IF","UNIQUE","SORT","TEXTJOIN"],0,"IF kiểm tra điều kiện và trả về một trong hai kết quả.")
  ],
  "excel-5": [
    q("excel-5","Muốn đổi nhanh toàn bộ kiểu trình bày biểu đồ, dùng gì?",["Chart Style","Gridlines","Data Table","Trendline"],0,"Chart Styles áp dụng phối màu và định dạng dựng sẵn."),
    q("excel-5","Muốn thêm một cột dữ liệu mới vào biểu đồ hiện có, cần làm gì?",["Add Data Series","Switch Row/Column only","Change Layout","Add Alt Text"],0,"Chọn lại nguồn hoặc thêm Data Series để đưa dữ liệu mới vào biểu đồ."),
    q("excel-5","Để biểu đồ dễ tiếp cận hơn, cần bổ sung gì?",["Alt Text","3D Rotation","Shadow","Animation"],0,"Alt Text giải thích thông tin hoặc mục đích chính của biểu đồ.")
  ]
};

// 15 câu mỗi môn — phủ toàn bộ chapter. Có thể tăng số lượng mà không sửa app.js.
const wordQuestionSets = Object.entries(CHAPTER_QUESTIONS)
  .filter(([key]) => key.startsWith("word-"))
  .map(([, items]) => items);
const FINAL_QUESTIONS = {
  powerpoint: Object.entries(CHAPTER_QUESTIONS).filter(([key])=>key.startsWith("powerpoint-")).flatMap(([,items])=>items),
  // 15 câu nhưng vẫn phủ đủ cả 6 chapter Word.
  word: wordQuestionSets.flatMap((items,index)=>items.slice(0,index<3?3:2)),
  excel: Object.entries(CHAPTER_QUESTIONS).filter(([key])=>key.startsWith("excel-")).flatMap(([,items])=>items)
};

// 27 câu tổng hợp: 9 câu ngẫu nhiên từ mỗi thế giới; app sẽ đảo cả câu và đáp án.
const MASTER_QUESTIONS = [
  ...FINAL_QUESTIONS.powerpoint.slice(0,9),
  ...FINAL_QUESTIONS.word.slice(0,9),
  ...FINAL_QUESTIONS.excel.slice(0,9)
];

window.MOS = window.MOS || {};
window.MOS.CHAPTER_QUESTIONS = CHAPTER_QUESTIONS;
window.MOS.FINAL_QUESTIONS = FINAL_QUESTIONS;
window.MOS.MASTER_QUESTIONS = MASTER_QUESTIONS;
})();
