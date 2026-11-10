
### 3. Các Biểu mẫu dùng cho Phân tích & Viết Report

**A. Bảng Danh sách Người tham gia**
Bắt buộc có trong báo cáo nộp bài (che 4 số giữa của SĐT):

| P# | Họ và Tên | Nghề nghiệp / Vai trò | Thông tin liên lạc (SĐT/Zalo) |
| --- | --- | --- | --- |
| P1 | Tăng Nhật Đăng | Sinh viên Cơ khí | 0948626648 |
| P2 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| P3 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| P4 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| P5 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| P6 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| *(Ghi chú: P1 chạy phiên Pilot để tinh chỉnh thời gian/kịch bản. Lấy kết quả chính thức từ P2 đến P8).* |  |  |  |

**B. Bảng Ghi Quan sát (Lập cho từng người / từng task)**
Dùng để vừa quan sát vừa note lại lúc xem video:

| P# | Nhiệm vụ (Task) | Kết quả (Thành công / Có trợ giúp / Thất bại) | Thời gian | Lỗi thao tác | Quan sát hành vi & Trích lời (Think-aloud) | Mốc thời gian Video |
| --- | --- | --- | --- | --- | --- | --- |
| P2 | T1: Import CSV | Có trợ giúp | 02:15 | 1 | Bấm nhầm nút thêm tay thay vì Upload. Nói: "Ủa nút tải file ở đâu ta?" | 01:10 |
| P2 | T2: Tìm & Sửa giá | Thành công | 00:45 | 0 | Tìm rất nhanh bằng ô search. Nói: "Form sửa giá hiển thị rõ ràng". | 03:20 |

**C. Nhật ký Usability Issue (Dành cho Phân tích Pain points)**
Sau khi chạy đủ 7 người, hãy gom các lỗi lặp lại thành một bảng Pain Points dựa theo mức độ nghiêm trọng (Severity từ 0 đến 4):

| ID | Tiêu đề Vấn đề | Tần suất | Heuristic vi phạm | Severity (0-4) | Khuyến nghị sửa chữa |
| --- | --- | --- | --- | --- | --- |
| UX-01 | Khó tìm thấy nút "Import CSV" do bị chìm vào nền | 4/7 người gặp | Heuristic 4 (Nhất quán & Chuẩn) | 3 | Đổi màu nút Import thành màu nhấn mạnh (Primary color) hoặc đặt cạnh nút "Thêm mới". |
| UX-02 | Xóa danh mục không có thông báo xác nhận | 6/7 người gặp | Heuristic 5 (Ngăn ngừa lỗi) | 4 (Nghiêm trọng) | Bổ sung Popup Confirm "Bạn có chắc chắn muốn xóa danh mục này không?" trước khi thực thi lệnh xóa. |