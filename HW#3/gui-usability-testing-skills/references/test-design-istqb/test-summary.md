# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT)

## 1. Tóm tắt điều hành (Executive Summary)
- **Kết luận chính:** <Đánh giá tổng quan về chất lượng GUI và Usability của hệ thống>
- **Vấn đề ưu tiên cao:** <Liệt kê nhanh 3-5 lỗi/vấn đề chặn luồng người dùng hoặc vỡ giao diện nghiêm trọng nhất>
- **Đề xuất (Go/No-Go):** <Cho phép release hay cần khắc phục lỗi trước>

## 2. Phạm vi và phương pháp (Scope & Methodology)
- **Màn hình / Luồng đã test:** <VD: Luồng Đăng ký -> Thêm vào giỏ hàng -> Thanh toán>
- **Phương pháp thực hiện:** <VD: GUI Checklist, Usability Test có điều phối, Heuristic Evaluation>
- **Hạng mục nằm ngoài phạm vi (Out of Scope):** <Ghi rõ những gì không test và lý do>

## 3. Môi trường và người tham gia
- **Môi trường & Nền tảng:** <Liệt kê các viewport, thiết bị, trình duyệt đã thực thi>
- **Hồ sơ người tham gia (Usability):** <Số lượng, độ tuổi, kinh nghiệm với sản phẩm tương tự>

## 4. Tổng hợp Kết quả GUI & Tương thích
- **Tổng số Test Case / Checklist item:** <Số lượng>
  - **Passed:** <Số lượng>
  - **Failed:** <Số lượng>
  - **Blocked / Not Run:** <Số lượng>
- **Phân bổ lỗi theo nhóm:** <VD: Bao nhiêu lỗi bố cục, lỗi trạng thái, lỗi responsive>

## 5. Tổng hợp Kết quả Khả dụng (Usability Results)
| Task | Trạng thái (Thành công / Trợ giúp / Thất bại) | Thời gian trung vị | Số lỗi trung bình | Điểm SEQ |
|------|----------------------------------------------|--------------------|-------------------|----------|
| 1    | X / Y / Z                                    | ...                | ...               | ...      |
| 2    | X / Y / Z                                    | ...                | ...               | ...      |

- **Điểm SUS tổng hợp:** <VD: 72/100> (Kèm đánh giá độ tin cậy dựa trên cỡ mẫu)

## 6. Danh sách Usability Issue (Xếp theo Severity)
| Issue ID | Tiêu đề vấn đề | Heuristic vi phạm | Tần suất | Severity | Khuyến nghị sửa chữa |
|----------|----------------|-------------------|----------|----------|----------------------|
| UX-01    | ...            | ...               | ...      | ...      | ...                  |
| UX-02    | ...            | ...               | ...      | ...      | ...                  |
*(Lưu ý: Bảng này ánh xạ từ Nhật ký Usability Issue)*

## 7. Điểm tích cực của hệ thống
- <Ghi nhận các tính năng hoạt động mượt mà, thiết kế tốt cần được duy trì ở các phiên bản sau>

## 8. Rủi ro còn lại và Giới hạn (Risks & Limitations)
- <VD: Cỡ mẫu thử nghiệm còn nhỏ (7 người), chưa phủ hết các thiết bị di động Android đời cũ...>

## 9. Khuyến nghị và Bước tiếp theo
- **Khắc phục ngay:** <Các lỗi Functional/GUI severity cao và UX issue mức 3-4>
- **Bước tiếp theo:** <VD: Chạy lại bài test hồi quy (Regression Test) cho trang Thanh toán sau khi sửa lỗi>