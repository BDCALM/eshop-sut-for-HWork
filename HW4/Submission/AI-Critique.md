
## AI Critique

Trong quá trình đồng hành cùng AI (Cursor / Gemini / Claude) để triển khai tự động hóa kiểm thử cho dự án EShop, tôi nhận thấy AI thể hiện thế mạnh tốt trong việc tạo mã nguồn mẫu, chuyển đổi các tập dữ liệu JSON sang kịch bản Playwright, và thiết lập nhanh cấu hình môi trường. Tuy nhiên, AI bộc lộ những "điểm mù" và thiên kiến cố hữu nguy hiểm trong kiểm thử phần mềm:

1. **Thiên kiến Happy-Path và Xu hướng Thỏa hiệp với Lỗi (Pessimistic Placation):**
   AI luôn có xu hướng ngầm giả định hệ thống hoạt động đúng hoặc có thói quen "thấy test đỏ là sửa assertion cho xanh". Điển hình ở tính năng FR-19, khi phát hiện API trả về HTTP 200 cho ID sai, AI liền đề xuất sửa lại mong đợi thành 200 thay vì gióng hồi chuông cảnh báo lỗi False-Success theo đặc tả SRS. Hành vi này biến kiểm thử từ việc "bảo vệ yêu cầu của người dùng" thành "hợp thức hóa hiện trạng của lập trình viên".

2. **Shallow Assertion Trap:**
   Ở ca FR11-TC09, AI chỉ kiểm tra trạng thái "Đang giao" có xuất hiện hay không, hoàn toàn bỏ lọt việc kiểm tra xem nút "Hủy đơn" có bị vô hiệu hóa hay không. AI chỉ nhìn vào những gì hiển thị ra (positive assertion) mà hiếm khi tự động tư duy về những gì *không được phép xuất hiện* (negative boundary constraint) nếu con người không chỉ định rõ ràng.

3. **DOM Hallucination:**
   AI thường áp đặt cấu trúc HTML chuẩn sách giáo khoa (dùng thẻ `<a>` cho link, dùng routing URL cho tab, dùng table id) vào một ứng dụng thực tế sử dụng các thư viện tiện ích hiện đại như Tailwind CSS và React State. Nếu không có con người dùng công cụ Browser kiểm tra DOM trực tiếp, script của AI sẽ liên tục thất bại vì lỗi locator yếu.

**Bài học cốt lõi:**
AI chỉ đóng vai trò như một "lập trình viên gõ code tốc độ cao". Kỹ sư kiểm thử con người (Human-in-the-loop) bắt buộc phải nắm giữ vai trò tư duy nghiệp vụ, thiết kế bẫy lỗi biên, bảo vệ tính trung thực của đặc tả yêu cầu (SRS), và thẩm định độc lập từng dòng assertion trước khi đưa vào thực thi.
