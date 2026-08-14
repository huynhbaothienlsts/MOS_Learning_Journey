# MOS Learning Journey V3

Website tự học MOS 365 tương tác dành cho học sinh THCS/THPT. Phiên bản V3 sử dụng cấu trúc thư mục rõ ràng để giáo viên dễ sửa nội dung và mở rộng chức năng.

## Cấu trúc

```text
index.html
.nojekyll
README.md

css/
  styles.css

data/
  courses.js       # Nội dung 16 chapter
  questions.js     # Câu hỏi chapter, final và master
  badges.js        # Danh sách huy hiệu

js/
  config.js        # Điểm PASS, XP, level và tên website
  storage.js       # localStorage và fallback khi bị chặn
  utils.js         # Hàm dùng chung
  quiz-engine.js   # Đảo câu/đáp án và chấm điểm
  certificate.js   # Tạo Certificate
  canvas-mode.js   # Nhận biết iframe và nút mở toàn màn hình
  app.js           # Điều phối giao diện
```

## Deploy bằng GitHub Desktop

1. Đưa toàn bộ nội dung của thư mục này vào repository.
2. Commit và Push bằng GitHub Desktop.
3. Trên GitHub, mở **Settings → Pages**.
4. Chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`.
5. Bật **Enforce HTTPS** khi tùy chọn xuất hiện.

Mọi đường dẫn trong website đều là đường dẫn tương đối, nên website hoạt động ở cả domain gốc và project URL của GitHub Pages.

## Chỉnh sửa cho giáo viên

- Đổi điểm PASS hoặc XP trong `js/config.js`.
- Sửa micro-lesson trong `data/courses.js`.
- Sửa/thêm câu hỏi trong `data/questions.js`.
- Sửa điều kiện và tên badge trong `data/badges.js`.
- Không cần chỉnh `js/app.js` khi chỉ thay nội dung học tập.

## Nhúng vào Canvas LMS

Thay URL bằng địa chỉ GitHub Pages đã deploy:

```html
<iframe
  src="YOUR_GITHUB_PAGES_URL"
  title="MOS Learning Journey"
  width="100%"
  height="1200"
  style="width:100%; height:min(1200px, 85vh); border:0; border-radius:16px;"
  loading="lazy"
  allow="fullscreen"
  allowfullscreen>
</iframe>

<p>
  <a href="YOUR_GITHUB_PAGES_URL" target="_blank" rel="noopener">
    Mở MOS Learning Journey ở chế độ toàn màn hình
  </a>
</p>
```

Không tự thêm thuộc tính `sandbox` nếu nhà trường không yêu cầu. Nếu Canvas bắt buộc sandbox, website cần tối thiểu:

```html
sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
```

Khi chạy trong iframe, website tự hiển thị nút **Mở toàn màn hình**. Nếu trình duyệt chặn `localStorage`, website chuyển sang bộ nhớ tạm và hiện cảnh báo thay vì ngừng hoạt động.

## Hạn chế cần biết

- Tiến độ được lưu theo trình duyệt/thiết bị, không đồng bộ với tài khoản Canvas.
- Trình duyệt có thể tách tiến độ trong iframe khỏi tiến độ khi mở website trực tiếp.
- Website tĩnh không gửi điểm về Canvas Gradebook. Muốn đồng bộ danh tính/điểm cần backend và LTI.
- Đáp án nằm trong JavaScript phía người dùng; Final Challenge phù hợp cho tự học, không phải bài thi bảo mật.
- Certificate là Learning Completion Certificate, không phải chứng chỉ MOS chính thức.

## Tác giả

Huỳnh Bảo Thiên — Trường THCS và THPT Đinh Thiện Lý.
