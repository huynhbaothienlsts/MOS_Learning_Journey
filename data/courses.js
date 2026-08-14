/*
 * NỘI DUNG BÀI HỌC
 * Mỗi chapter gồm: id, tiêu đề, mô tả, 3 micro-lesson và mission.
 */
window.MOS = window.MOS || {};
const makeChapter = (id, title, summary, lessons, mission) => ({ id, title, summary, lessons, mission });

window.MOS.COURSES = {
  powerpoint: {
    title: "PowerPoint 365", role: "Presentation Creator", code: "P", icon: "P", color: "#e85b35", exam: "MO-310",
    chapters: [
      makeChapter("powerpoint-1","Quản lý bản trình bày","Làm chủ Slide Master, chế độ xem, in ấn, trình chiếu và kiểm tra tệp trước khi phân phối.",[
        ["🧭","Master & Layout","Slide Master điều khiển theme, placeholder và thành phần nền dùng chung. Sửa master giúp toàn bộ slide nhất quán."],
        ["🎤","Present with confidence","Presenter View cho người thuyết trình xem ghi chú, slide kế tiếp và thời gian mà khán giả không nhìn thấy."],
        ["🛡️","Ready to share","Kiểm tra thuộc tính, khả năng tiếp cận, bình luận và nội dung ẩn trước khi xuất PDF hoặc chia sẻ tệp."]
      ],"Chọn công cụ hiệu quả nhất để áp dụng nhận diện trường cho toàn bộ bài trình bày."),
      makeChapter("powerpoint-2","Quản lý trang chiếu","Chèn, tái sử dụng, ẩn, sắp xếp slide và tổ chức bản trình bày bằng Sections.",[
        ["➕","Insert smart","Chọn layout phù hợp khi chèn slide; Reuse Slides giúp lấy slide từ tệp khác mà không làm lại."],
        ["🗂️","Organize with Sections","Sections nhóm các slide theo chủ đề để đổi tên, thu gọn và sắp xếp một bài dài dễ dàng."],
        ["🙈","Hide, don't delete","Hide Slide giữ nội dung trong tệp nhưng bỏ qua khi trình chiếu—hữu ích cho slide dự phòng."]
      ],"Sắp xếp một bộ 40 slide theo các phần và giữ lại slide dự phòng mà không trình chiếu."),
      makeChapter("powerpoint-3","Văn bản, hình dạng & hình ảnh","Định dạng nội dung, căn chỉnh, nhóm, xếp lớp và thêm Alt Text cho đối tượng.",[
        ["✍️","Clear visual hierarchy","Dùng cỡ chữ, độ đậm, màu và khoảng cách nhất quán để thông điệp chính được nhận biết nhanh."],
        ["🧲","Align & Distribute","Guides, Align và Distribute giúp đối tượng thẳng hàng, cách đều thay vì căn chỉnh bằng mắt."],
        ["♿","Accessible visuals","Alt Text mô tả mục đích của hình; Selection Pane hỗ trợ quản lý thứ tự và tên đối tượng."]
      ],"Căn đều ba hình, nhóm chúng và bổ sung mô tả để slide rõ ràng, dễ tiếp cận."),
      makeChapter("powerpoint-4","Bảng, biểu đồ, SmartArt & media","Biến dữ liệu và quy trình thành hình ảnh; kiểm soát bảng, chart, SmartArt, 3D, audio và video.",[
        ["📊","Data to story","Chọn loại chart theo thông điệp, quản lý data series và Switch Row/Column khi cách đọc dữ liệu chưa đúng."],
        ["🧩","SmartArt thinking","SmartArt chuyển danh sách thành quy trình, phân cấp hoặc mối quan hệ; nội dung vẫn chỉnh trong Text Pane."],
        ["▶️","Media control","Thiết lập Start, Trim, Volume, Loop và poster frame để audio/video phát đúng thời điểm."]
      ],"Chọn hình thức trực quan phù hợp cho quy trình, dữ liệu và video trong bài thuyết trình."),
      makeChapter("powerpoint-5","Chuyển tiếp & hoạt ảnh","Phân biệt Transition và Animation; kiểm soát thứ tự, timing, trigger và motion path.",[
        ["↔️","Transition","Transition xảy ra giữa các slide. Dùng tiết chế và Apply to All khi cần nhịp chuyển nhất quán."],
        ["✨","Animation","Animation tác động lên đối tượng: Entrance, Emphasis, Exit và Motion Path phục vụ các mục đích khác nhau."],
        ["⏱️","Timing & sequence","Animation Pane quản lý thứ tự, Start, Duration và Delay để hiệu ứng hỗ trợ thay vì làm nhiễu nội dung."]
      ],"Tạo chuỗi hiệu ứng có chủ đích và sắp thứ tự chính xác trong Animation Pane.")
    ]
  },
  word: {
    title: "Word 365", role: "Document Creator", code: "W", icon: "W", color: "#2f68d8", exam: "MO-110",
    chapters: [
      makeChapter("word-1","Quản lý tài liệu","Điều hướng, thiết lập trang, lưu, xuất và kiểm tra chất lượng tài liệu.",[
        ["🧭","Navigate fast","Navigation Pane tìm văn bản, heading và trang; Go To nhảy đến trang, section, bookmark hoặc đối tượng."],
        ["📄","Page setup","Margins, orientation, size, headers và footers tạo nền tảng bố cục trước khi định dạng chi tiết."],
        ["🔎","Inspect before sharing","Document Inspector, Accessibility Checker và Compatibility Checker phát hiện các rủi ro khác nhau."]
      ],"Chuẩn bị một báo cáo để chia sẻ: kiểm tra metadata, accessibility và định dạng xuất."),
      makeChapter("word-2","Văn bản, đoạn văn & section","Dùng styles, spacing, breaks và section để xây tài liệu có cấu trúc.",[
        ["🎨","Styles over manual formatting","Heading và paragraph styles tạo hệ thống nhất quán, dễ cập nhật và hỗ trợ mục lục tự động."],
        ["↕️","Paragraph rhythm","Line spacing, space before/after và indent nên được đặt có chủ đích thay vì dùng nhiều phím Enter hoặc Space."],
        ["✂️","Breaks matter","Page Break chuyển trang; Section Break cho phép phần mới có orientation, columns, header hoặc footer riêng."]
      ],"Tạo một phụ lục nằm ngang mà không thay đổi hướng trang của phần còn lại."),
      makeChapter("word-3","Bảng & danh sách","Tạo, chuyển đổi, sắp xếp và định dạng bảng; quản lý list đa cấp và đánh số.",[
        ["▦","Tables with purpose","Chuyển text có delimiter thành table; điều chỉnh AutoFit, cell margins, hàng/cột và lặp header khi qua trang."],
        ["↔️","Merge, split, size","Merge/Split Cells thay đổi cấu trúc ô; Split Table tách một bảng thành hai bảng độc lập."],
        ["☷","Reliable lists","Dùng list tools để tăng/giảm cấp, tiếp tục hoặc khởi động lại số—không gõ số thủ công."]
      ],"Sửa bảng nhiều trang để tiêu đề cột lặp lại và danh sách tiếp tục đánh số chính xác."),
      makeChapter("word-4","Tài liệu tham khảo","Tạo Footnote, Endnote và Table of Contents có thể cập nhật.",[
        ["¹","Footnote vs Endnote","Footnote xuất hiện cuối trang; Endnote thường ở cuối tài liệu hoặc section. Cả hai được Word đánh số tự động."],
        ["📑","Table of Contents","Mục lục tự động dựa trên Heading Styles, không dựa vào chữ in đậm được định dạng thủ công."],
        ["🔄","Keep references current","Sau khi nội dung thay đổi, dùng Update Table để cập nhật số trang hoặc toàn bộ mục lục."]
      ],"Xây mục lục tự động cho báo cáo và cập nhật nó sau khi thêm một chương mới."),
      makeChapter("word-5","Thành phần đồ họa","Chèn, định dạng và bố trí hình, shape, SmartArt, 3D, screenshot, icon và text box.",[
        ["🖼️","Insert & refine","Crop, Corrections, Artistic Effects và Remove Background xử lý hình ngay trong Word."],
        ["🌊","Wrap Text","In Line with Text coi ảnh như ký tự; các kiểu wrap khác cho văn bản chạy quanh và định vị linh hoạt hơn."],
        ["♿","Meaningful Alt Text","Mô tả mục đích/thông tin quan trọng; đánh dấu decorative nếu hình chỉ để trang trí."]
      ],"Đặt hình cạnh đoạn văn với wrap phù hợp và thêm Alt Text có ý nghĩa."),
      makeChapter("word-6","Cộng tác tài liệu","Thêm, trả lời, giải quyết comment và quản lý Track Changes.",[
        ["💬","Comment conversations","Reply giữ trao đổi theo luồng; Resolve đóng vấn đề nhưng vẫn giữ lịch sử, Delete xóa hẳn."],
        ["📝","Track Changes","Ghi lại insert, delete và formatting; chế độ hiển thị markup không đồng nghĩa thay đổi đã được chấp nhận."],
        ["✅","Accept or Reject","Xem từng thay đổi hoặc xử lý hàng loạt; Accept đưa sửa đổi vào bản cuối, Reject quay lại nội dung trước."]
      ],"Xử lý vòng phản biện: trả lời comment và quyết định Accept/Reject từng chỉnh sửa.")
    ]
  },
  excel: {
    title: "Excel 365", role: "Data Explorer", code: "X", icon: "X", color: "#168454", exam: "MO-210",
    chapters: [
      makeChapter("excel-1","Trang tính & sổ làm việc","Nhập dữ liệu, điều hướng, tùy chỉnh view, print, properties và chia sẻ workbook.",[
        ["📥","Bring data in","Nhập text/CSV và dữ liệu trực tuyến giúp giữ cấu trúc tốt hơn so với sao chép thủ công."],
        ["🧊","Views that help","Freeze Panes giữ tiêu đề khi cuộn; Page Break Preview và Page Layout phục vụ chuẩn bị in."],
        ["🖨️","Print with intent","Print Area, scaling, margins, orientation, header/footer quyết định dữ liệu xuất hiện trên giấy hoặc PDF."]
      ],"Chuẩn bị bảng dữ liệu dài để dễ cuộn, chỉ in vùng cần thiết và xuất đúng định dạng."),
      makeChapter("excel-2","Ô & phạm vi dữ liệu","Thao tác, định dạng, đặt tên phạm vi và tóm tắt trực quan bằng conditional formatting/Sparklines.",[
        ["⚡","Fill & Paste Special","AutoFill mở rộng mẫu; Paste Values, Formulas, Formatting hoặc Transpose cho phép kiểm soát phần được dán."],
        ["🔢","Format communicates","Number Format thay đổi cách hiển thị chứ không đổi giá trị lưu; Wrap Text giúp nội dung vừa ô."],
        ["🌡️","Visual signals","Conditional Formatting và Sparklines làm nổi xu hướng, ngoại lệ và mức độ ngay trong worksheet."]
      ],"Làm sạch vùng dữ liệu, giữ giá trị khi dán và làm nổi các điểm dưới mức yêu cầu."),
      makeChapter("excel-3","Bảng & dữ liệu bảng","Tạo Excel Table, quản lý Total Row, kiểu bảng, filter và multi-level sort.",[
        ["▦","Why Tables matter","Table có header, filter, banded rows, tự mở rộng và là nền tảng cho structured references."],
        ["Σ","Total Row","Total Row dùng SUBTOTAL để tính tổng hợp và phản ứng với dữ liệu đang được lọc."],
        ["⇅","Filter vs Sort","Filter tạm ẩn record không khớp; Sort thay đổi thứ tự và có thể dùng nhiều cấp."]
      ],"Chuyển dữ liệu lớp học thành Table, thêm Total Row và sắp theo nhiều tiêu chí."),
      makeChapter("excel-4","Công thức & hàm","Dùng tham chiếu tương đối/tuyệt đối/hỗn hợp, structured references và các hàm MOS cốt lõi.",[
        ["🔗","References","A1 thay đổi khi sao chép; $A$1 khóa hàng và cột; A$1 hoặc $A1 chỉ khóa một chiều."],
        ["🧮","Calculate & decide","SUM, AVERAGE, MIN, MAX, COUNT/COUNTA/COUNTBLANK và IF giải quyết tổng hợp, đếm và điều kiện."],
        ["🔤","Shape data","SORT, UNIQUE, LEFT/RIGHT/MID, UPPER/LOWER/LEN, CONCAT/TEXTJOIN biến đổi dữ liệu động."]
      ],"Viết công thức tính kết quả, cố định ngưỡng và tạo nhãn Đạt/Chưa đạt bằng IF."),
      makeChapter("excel-5","Biểu đồ","Tạo, sửa source, series, elements, layout, style và Alt Text cho chart.",[
        ["📈","Choose the message","Column so sánh, Line thể hiện xu hướng, Pie phù hợp tỷ trọng đơn giản; chọn chart theo câu hỏi dữ liệu."],
        ["🎛️","Edit the source","Select Data thêm series; Switch Row/Column đổi cách đọc chuỗi/danh mục mà không đổi dữ liệu gốc."],
        ["♿","Readable charts","Title, legend, labels và Alt Text phải truyền đạt điều chart cho thấy, không chỉ mô tả màu sắc."]
      ],"Tạo chart dễ hiểu, bổ sung series mới và mô tả thông tin chính cho người dùng hỗ trợ tiếp cận.")
    ]
  }
};
