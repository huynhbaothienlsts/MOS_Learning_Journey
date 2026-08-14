(function () {
  /*
   * EXPLORE và MISSION là hai ngân hàng độc lập với PRACTICE.
   * Mỗi hoạt động gồm tình huống thực tế, lựa chọn, đáp án và giải thích.
   */
  const activity = (title, brief, prompt, options, answer, explain, hint) => ({
    title, brief, prompt, options, answer, explain, hint
  });

  const EXPLORE_ACTIVITIES = {
    "powerpoint-1": activity(
      "Phòng điều khiển trình chiếu",
      "Bạn sắp thuyết trình trong hội trường: khán giả chỉ được thấy slide, còn bạn cần ghi chú và slide kế tiếp.",
      "Cách thiết lập nào đúng nhất trước khi bắt đầu?",
      ["Mở Presenter View và chọn đúng màn hình trình chiếu", "Mở Slide Sorter trên cả hai màn hình", "Xuất bài thành ảnh rồi mở Reading View", "Bật Notes Master trong khi trình chiếu"],
      0,
      "Presenter View tách màn hình của người trình bày khỏi nội dung khán giả nhìn thấy.",
      "Hãy tìm chế độ cho phép người nói xem ghi chú mà không hiện chúng lên màn chiếu."
    ),
    "powerpoint-2": activity(
      "Sắp xếp bộ slide sự kiện",
      "Bạn nhận 40 slide từ nhiều nhóm. Một số slide cần dùng lại từ tệp năm trước và 5 slide chỉ để dự phòng.",
      "Workflow nào vừa nhanh vừa giữ được cấu trúc?",
      ["Reuse Slides → tạo Sections → Hide các slide dự phòng", "Copy từng slide → xóa slide dự phòng → đổi theme", "Insert Screenshot → Group → Lock", "Slide Master → Notes Master → Delete"],
      0,
      "Reuse Slides nhập nội dung, Sections tổ chức nhóm và Hide Slide giữ slide dự phòng mà không trình chiếu.",
      "Bạn cần ba thao tác: nhập lại, chia nhóm và giữ nhưng không chiếu."
    ),
    "powerpoint-3": activity(
      "Xưởng căn chỉnh hình ảnh",
      "Ba biểu tượng đang lệch hàng và khoảng cách không đều. Sau khi chỉnh xong, bạn muốn di chuyển chúng như một khối.",
      "Thứ tự thao tác hợp lý nhất là gì?",
      ["Align → Distribute → Group", "Group → Crop → Merge", "Bring Forward → Rotate → Ungroup", "Distribute → Delete → Align"],
      0,
      "Align tạo cùng đường chuẩn, Distribute làm đều khoảng cách, rồi Group giúp di chuyển cả cụm.",
      "Căn thẳng và chia đều trước khi gộp đối tượng."
    ),
    "powerpoint-4": activity(
      "Chọn đúng hình thức trực quan",
      "Một slide cần thể hiện 4 bước tuyển thành viên; slide khác cần so sánh số lượng theo lớp.",
      "Cặp công cụ nào phù hợp nhất?",
      ["SmartArt Process cho quy trình; Column Chart cho so sánh", "Pie Chart cho quy trình; WordArt cho so sánh", "Video cho quy trình; Screenshot cho so sánh", "Table Style cho cả hai"],
      0,
      "SmartArt Process diễn tả trình tự; Column Chart hỗ trợ so sánh các nhóm dữ liệu.",
      "Một công cụ mô tả các bước, công cụ kia so sánh các danh mục."
    ),
    "powerpoint-5": activity(
      "Đạo diễn hiệu ứng",
      "Tiêu đề phải xuất hiện trước, hình minh họa xuất hiện sau 0,5 giây và nút kết luận chỉ chạy khi được bấm.",
      "Bạn nên điều khiển chuỗi này ở đâu?",
      ["Animation Pane với Start, Delay và Trigger", "Transitions với Apply to All", "Slide Sorter với Rehearse Timings", "Selection Pane với Alt Text"],
      0,
      "Animation Pane quản lý thứ tự, thời điểm và trigger của từng đối tượng trên slide.",
      "Tình huống liên quan nhiều hiệu ứng trên cùng một slide, không phải chuyển giữa các slide."
    ),
    "word-1": activity(
      "Trạm kiểm tra trước khi nộp",
      "Báo cáo đã hoàn thành và cần gửi dưới dạng PDF. Bạn muốn giảm rủi ro về khả năng tiếp cận và thông tin ẩn.",
      "Quy trình kiểm tra nào hợp lý nhất?",
      ["Accessibility Checker → Document Inspector → kiểm tra bản PDF", "Spelling → Print → xóa tệp gốc", "Track Changes → Mail Merge → Save", "Navigation Pane → Translate → Close"],
      0,
      "Kiểm tra khả năng tiếp cận, loại bỏ dữ liệu ẩn rồi rà soát tệp xuất giúp tài liệu sẵn sàng chia sẻ.",
      "Hãy kiểm tra chất lượng tài liệu trước, sau đó mới kiểm tra đầu ra PDF."
    ),
    "word-2": activity(
      "Phòng thí nghiệm Section",
      "Bạn đổi phụ lục sang Landscape nhưng toàn bộ báo cáo cũng xoay ngang.",
      "Nguyên nhân có khả năng nhất là gì?",
      ["Phụ lục chưa được tách thành section riêng", "Tài liệu chưa có Page Break", "Heading chưa dùng Style", "Line spacing đang đặt sai"],
      0,
      "Orientation áp dụng theo section; cần Section Break trước và sau phần phụ lục nếu chỉ muốn xoay riêng phần đó.",
      "Page Break chỉ sang trang mới, còn thiết lập trang riêng cần một ranh giới mạnh hơn."
    ),
    "word-3": activity(
      "Cứu bảng biểu nhiều trang",
      "Bảng điểm tràn sang ba trang. Trang 2 và 3 không còn tên cột, còn độ rộng cột thay đổi khó đọc.",
      "Bộ thao tác nào giải quyết đúng vấn đề?",
      ["Repeat Header Rows và điều chỉnh AutoFit/độ rộng cột", "Split Cells và Convert to Text", "Merge Cells và xóa hàng đầu", "Sort rồi Restart Numbering"],
      0,
      "Repeat Header Rows lặp tiêu đề, còn AutoFit hoặc độ rộng cột giúp bảng ổn định và dễ đọc.",
      "Bạn cần một thao tác cho tiêu đề lặp và một thao tác cho kích thước cột."
    ),
    "word-4": activity(
      "Mục lục biết tự cập nhật",
      "Bạn thêm một chương mới, khiến tiêu đề và số trang trong mục lục cũ không còn đúng.",
      "Lựa chọn nào cập nhật đầy đủ nhất?",
      ["Update Table → Update entire table", "Gõ lại số trang bằng tay", "Insert Footnote cho chương mới", "Đổi font của mục lục"],
      0,
      "Update entire table làm mới cả danh sách heading lẫn số trang.",
      "Chỉ cập nhật page numbers sẽ không thêm tiêu đề mới."
    ),
    "word-5": activity(
      "Bố trí ảnh có chủ đích",
      "Ảnh đại diện cần nằm bên phải, văn bản chạy quanh ảnh và trình đọc màn hình hiểu được mục đích của ảnh.",
      "Bạn cần kết hợp những thiết lập nào?",
      ["Wrap Text/Position và Alt Text", "Crop và Page Color", "Remove Background và Footnote", "Artistic Effects và Track Changes"],
      0,
      "Wrap Text/Position xử lý bố cục; Alt Text truyền đạt ý nghĩa cho công nghệ hỗ trợ.",
      "Một thiết lập dành cho vị trí, một thiết lập dành cho khả năng tiếp cận."
    ),
    "word-6": activity(
      "Vòng phản biện nhóm",
      "Một góp ý đã được xử lý nhưng cần giữ lịch sử; một thay đổi nội dung đã được duyệt để đưa vào bản cuối.",
      "Cặp thao tác nào chính xác?",
      ["Resolve comment và Accept change", "Delete comment và Reject change", "Hide markup và Compare", "Reply comment và Protect Document"],
      0,
      "Resolve giữ lại luồng trao đổi; Accept đưa chỉnh sửa được theo dõi vào nội dung cuối.",
      "Đừng xóa lịch sử góp ý và đừng nhầm việc ẩn markup với chấp nhận thay đổi."
    ),
    "excel-1": activity(
      "Chuẩn bị workbook để trình bày",
      "Bảng có 2.000 dòng. Người xem cần luôn thấy tiêu đề khi cuộn, còn bản PDF chỉ được chứa vùng báo cáo.",
      "Cặp thiết lập nào phù hợp?",
      ["Freeze Panes và Print Area", "Split và Page Background", "New Window và Name Manager", "Show Formulas và Protect Sheet"],
      0,
      "Freeze Panes giữ tiêu đề trên màn hình; Print Area giới hạn vùng được in hoặc xuất PDF.",
      "Một thao tác dành cho việc cuộn, thao tác còn lại dành cho đầu ra in."
    ),
    "excel-2": activity(
      "Làm sạch dữ liệu nhận từ nhóm khác",
      "Bạn cần dán kết quả đã tính nhưng không mang theo công thức, sau đó làm nổi bật các giá trị dưới chuẩn.",
      "Workflow nào an toàn nhất?",
      ["Paste Values → Conditional Formatting", "Paste Link → Cell Styles", "Transpose → Remove Duplicates", "Flash Fill → Protect Workbook"],
      0,
      "Paste Values giữ kết quả; Conditional Formatting làm nổi các giá trị theo quy tắc và tự cập nhật.",
      "Không dán công thức nguồn, rồi dùng một quy tắc hiển thị theo điều kiện."
    ),
    "excel-3": activity(
      "Bảng dữ liệu phản hồi theo bộ lọc",
      "Bạn muốn tổng doanh thu chỉ tính các hàng đang hiển thị sau khi lọc.",
      "Giải pháp phù hợp nhất là gì?",
      ["Chuyển vùng thành Table và bật Total Row", "Dùng SUM cố định phía ngoài vùng", "Tô màu các hàng rồi đếm thủ công", "Chuyển Table thành Range trước khi lọc"],
      0,
      "Total Row của Table dùng hàm SUBTOTAL nên phản hồi theo các hàng được lọc.",
      "Hãy chọn tính năng tổng hợp được tích hợp vào Excel Table."
    ),
    "excel-4": activity(
      "Mô phỏng công thức học phí",
      "Cột B chứa học phí từng học sinh; ô F1 chứa tỷ lệ giảm giá dùng chung. Công thức sẽ được sao chép xuống nhiều dòng.",
      "Công thức mẫu nào giữ đúng tỷ lệ tại F1?",
      ["=B2*(1-$F$1)", "=$B$2*(1-F1)", "=B$2*(1-$F1)", "=$B2*(1-F$1)"],
      0,
      "B2 cần thay đổi theo dòng, còn $F$1 phải được khóa tuyệt đối khi sao chép.",
      "Chỉ ô chứa tỷ lệ dùng chung cần khóa cả cột lẫn hàng."
    ),
    "excel-5": activity(
      "Phòng biên tập biểu đồ",
      "Biểu đồ đang đọc mỗi tháng thành một series thay vì đọc mỗi lớp thành một series.",
      "Bạn nên thử thao tác nào trước?",
      ["Switch Row/Column", "Change Chart Style", "Add Trendline", "Move Chart"],
      0,
      "Switch Row/Column đổi cách Excel diễn giải series và category mà không sửa dữ liệu nguồn.",
      "Dữ liệu đúng, chỉ hướng đọc hàng/cột của biểu đồ chưa đúng."
    )
  };

  const MISSION_CHALLENGES = {
    "powerpoint-1": activity("Bàn giao bài thuyết trình", "", "Trước khi gửi tệp cho ban tổ chức, bạn cần kiểm tra bình luận, thuộc tính ẩn và nội dung không nên phân phối. Lệnh nào là checkpoint phù hợp nhất?", ["Inspect Document", "Compress Media", "Rehearse Timings", "Arrange All"], 0, "Inspect Document mở các công cụ kiểm tra thông tin ẩn trước khi chia sẻ."),
    "powerpoint-2": activity("Điều phối slide", "", "Bạn muốn bỏ qua một slide phụ trong lần trình chiếu hôm nay nhưng vẫn giữ nó cho buổi sau. Bạn sẽ làm gì?", ["Hide Slide", "Delete Slide", "Remove Section", "Reset Slide"], 0, "Hide Slide giữ nội dung trong tệp nhưng không đưa slide vào trình chiếu thông thường."),
    "powerpoint-3": activity("Hoàn thiện infographic", "", "Một hình ảnh truyền đạt dữ liệu quan trọng. Để người dùng trình đọc màn hình nhận được thông tin tương đương, bạn cần thêm gì?", ["Alt Text mô tả ý nghĩa", "Shadow", "Soft Edges", "Comment"], 0, "Alt Text nên truyền đạt mục đích hoặc thông tin chính của hình."),
    "powerpoint-4": activity("Kể chuyện bằng dữ liệu", "", "Bài thuyết trình cần mô tả một quy trình 5 bước có thứ tự. Thành phần nào phù hợp nhất?", ["SmartArt Process", "Pie Chart", "WordArt", "Audio"], 0, "SmartArt Process phù hợp với các bước có trình tự."),
    "powerpoint-5": activity("Kiểm soát nhịp trình chiếu", "", "Bạn muốn cùng một transition nhẹ áp dụng cho toàn bộ slide. Sau khi chọn transition, thao tác nào hoàn tất yêu cầu?", ["Apply to All", "Animation Painter", "Group", "Trigger"], 0, "Apply to All áp dụng transition hiện tại cho toàn bộ slide."),
    "word-1": activity("Xuất bản báo cáo", "", "Công cụ nào giúp phát hiện tài liệu thiếu Alt Text hoặc có cấu trúc khó dùng với công nghệ hỗ trợ?", ["Accessibility Checker", "Compatibility Checker", "Document Inspector", "Word Count"], 0, "Accessibility Checker phát hiện nhiều vấn đề cản trở khả năng tiếp cận."),
    "word-2": activity("Tạo phụ lục riêng", "", "Phụ lục cần cột và header khác phần chính. Thành phần nào tạo ranh giới định dạng cần thiết?", ["Section Break", "Line Break", "Soft Return", "Tab Stop"], 0, "Section Break cho phép phần sau có bố cục và header/footer riêng."),
    "word-3": activity("Chuẩn hóa bảng", "", "Bạn muốn chia một ô tiêu đề thành hai ô mà không tách toàn bộ bảng. Lệnh nào đúng?", ["Split Cells", "Split Table", "Convert to Text", "AutoFit"], 0, "Split Cells chia ô được chọn thành số hàng hoặc cột mong muốn."),
    "word-4": activity("Hoàn thiện tài liệu tham khảo", "", "Chú thích cần xuất hiện ở cuối đúng trang chứa ký hiệu tham chiếu. Bạn dùng loại nào?", ["Footnote", "Endnote", "Caption", "Bookmark"], 0, "Footnote xuất hiện ở cuối trang; Endnote thường nằm cuối tài liệu hoặc section."),
    "word-5": activity("Thiết kế trang giới thiệu", "", "Ảnh chỉ dùng để trang trí và không truyền đạt thông tin. Cách xử lý accessibility phù hợp là gì?", ["Đánh dấu ảnh là decorative", "Viết Alt Text thật dài", "Xóa ảnh", "Chèn ảnh vào header bắt buộc"], 0, "Ảnh thuần trang trí nên được đánh dấu decorative để trình đọc màn hình bỏ qua."),
    "word-6": activity("Chốt bản thảo", "", "Bạn chỉ ẩn markup rồi gửi tài liệu. Điều gì vẫn đúng?", ["Các thay đổi vẫn chưa được Accept/Reject", "Mọi thay đổi đã tự động được Accept", "Comments đã bị xóa", "Track Changes đã bị khóa"], 0, "Ẩn markup chỉ đổi cách hiển thị, không xử lý các thay đổi được theo dõi."),
    "excel-1": activity("Xuất báo cáo một trang", "", "Báo cáo rộng hơn trang giấy. Thiết lập nào giúp thu vừa chiều rộng khi in?", ["Scaling/Fit All Columns on One Page", "Freeze Top Row", "Show Formulas", "New Window"], 0, "Scaling có thể thu nội dung để vừa số trang mong muốn khi in."),
    "excel-2": activity("Giữ đúng dữ liệu", "", "Bạn muốn đổi hàng thành cột khi dán một vùng. Tùy chọn nào cần dùng?", ["Transpose", "Paste Link", "Skip Blanks", "Flash Fill"], 0, "Transpose hoán đổi hàng và cột của vùng được sao chép."),
    "excel-3": activity("Sắp xếp danh sách lớp", "", "Danh sách phải xếp theo Lớp A–Z, sau đó theo Điểm từ cao xuống thấp. Bạn cần dùng gì?", ["Custom Sort với hai level", "Một Filter duy nhất", "Remove Duplicates", "Subtotal"], 0, "Custom Sort cho phép định nghĩa nhiều cấp sắp xếp theo thứ tự ưu tiên."),
    "excel-4": activity("Phân loại kết quả", "", "Công thức cần trả về “Đạt” khi điểm từ 8 trở lên và “Chưa đạt” nếu thấp hơn. Hàm nào phù hợp?", ["IF", "SUM", "UNIQUE", "TEXTJOIN"], 0, "IF kiểm tra điều kiện và trả về một trong hai kết quả."),
    "excel-5": activity("Bàn giao biểu đồ", "", "Để người dùng trình đọc màn hình hiểu thông điệp chính của biểu đồ, bạn cần bổ sung gì?", ["Alt Text có ý nghĩa", "3-D Rotation", "Shadow", "Animation"], 0, "Alt Text nên giải thích dữ liệu hoặc kết luận quan trọng mà biểu đồ truyền đạt.")
  };

  window.MOS = window.MOS || {};
  window.MOS.EXPLORE_ACTIVITIES = EXPLORE_ACTIVITIES;
  window.MOS.MISSION_CHALLENGES = MISSION_CHALLENGES;
})();
