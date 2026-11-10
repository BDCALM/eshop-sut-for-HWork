
### 3. Các Biểu mẫu dùng cho Phân tích & Viết Report

**A. Bảng Danh sách Người tham gia**
Bắt buộc có trong báo cáo nộp bài (che 4 số giữa của SĐT):

| P# | Họ và Tên | Nghề nghiệp / Vai trò | Thông tin liên lạc (SĐT/Zalo) |
| --- | --- | --- | --- |
| P1 | Nguyễn Văn A | Sinh viên Kinh tế | 0903****89 |
| P2 | Trần Thị B | Nhân viên văn phòng | 0987****12 |
| *(Ghi chú: P1 chạy phiên Pilot để tinh chỉnh thời gian/kịch bản. Lấy kết quả chính thức từ P2 đến P8).* |  |  |  |

**B. Bảng Ghi Quan sát (Lập cho từng người / từng task)**
Dùng để vừa quan sát vừa note lại lúc xem video:

| P# | Nhiệm vụ (Task) | Kết quả (Thành công / Có trợ giúp / Thất bại) | Thời gian | Lỗi thao tác | Quan sát hành vi & Trích lời (Think-aloud) | Mốc thời gian Video |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | T1: Import CSV | Có trợ giúp | 00:30 | 1 | Nhẫm lẫn giữa phần giao diện thên sản phẩm thủ công và giao diện import sản phẩm bằng file csv | Không có video |
| P1 | T1: Import CSV | Có trợ giúp | 01:00 | 1 | Tìm kiếm nút Import file csv | Không có video |
| P1 | T2: Tìm & Sửa giá | Có trợ giúp | 02:40 | 1 | Mất một hồi để biết mà cuộn chuột xuống, tìm ra danh sách sản phẩm. Mất thời gian để sửa giá | Không có video |
| P2 | T1: Import CSV | Có trợ giúp | 01:40 | 2 | Lúng túng tìm nơi quản lý sản phẩm và nút import sản phẩm | |
| P2 | T2: Tìm & Sửa giá | Có trợ giúp | 03:10 | 1 | Lúng túng không hiểu tại sao bấm nút "Sửa" nhưng màn hình không có phản ứng| Không có video |
| P3 | T1: Import CSV | Thành công | 00:40 | 0 | | Không có video |
| P3 | T2: Tìm & Sửa giá | Thành công | 02:10 | 0 | | Không có video |
| P4 | T1: Import CSV | Thành công | 00:28 | 0 | | Không có video |
| P4 | T2: Tìm & Sửa giá | Thành công | 01:50 | 0 | | Không có video |
| P5 | T1: Import CSV | Thành công | 01:18 | 0 | Mất thời gian để tìm nút Import sản phẩm | Không có video |
| P5 | T2: Tìm & Sửa giá | Có trợ giúp | 03:50 | 1 | Mất thời gian để biết kéo thanh cuộn xuống để tìm sản phẩm mới thêm và để sửa sản phẩm đó | Không có video |
| P6 | T1: Import CSV | Thành công | 00:31 | 0 | | Không có video |
| P6 | T2: Tìm & Sửa giá | Thành công | 01:30 | 0 | | Không có video |
| P7 | T1: Import CSV | Thành công | 00:37 | 0 | | Không có video |
| P7 | T2: Tìm & Sửa giá | Thành công | 01:40 | 0 | | Không có video |


**C. Nhật ký Usability Issue (Dành cho Phân tích Pain points)**
Sau khi chạy đủ 7 người, hãy gom các lỗi lặp lại thành một bảng Pain Points dựa theo mức độ nghiêm trọng (Severity từ 0 đến 4):

| ID | Tiêu đề Vấn đề | Tần suất | Heuristic vi phạm | Severity (0-4) | Khuyến nghị sửa chữa |
| --- | --- | --- | --- | --- | --- |
| UX-01 | Nút "Import sản phẩm" có khoảng cách không đủ gần so với nút "Chọn tệp"  | 3/7 người gặp | Heuristic 4 (Nhất quán & Chuẩn) | 3 | Đổi màu nút Import sang màu đậm hơn (khi chưa upload file) hoặc đặt cạnh nút "Chọn tệp". |
| UX-02 | "Sửa" sản phẩm, không focus vào nơi được sửa | 7/7 người gặp | Heuristic 4 (Nhất quán & Chuẩn) | 4 | Thêm phần tự động cuộn lên sản phẩm được chỉnh sửa ngay sau khi bấm "Sửa". |
| UX-03 | Xóa danh mục không có thông báo xác nhận | 7/7 người gặp | Heuristic 3 (Kiểm soát và tự do cho người dùng) và 5 (Ngăn ngừa lỗi) | 4 | Bổ sung Popup Confirm "Bạn có chắc chắn muốn xóa danh mục này không?" trước khi thực thi lệnh xóa. |
| UX-04 | Hoàn tác sản phẩm/danh mục vừa được xóa | 6/7 người gặp | Heuristic 3 (Kiểm soát và tự do cho người dùng) và 5 (Ngăn ngừa lỗi) | 4 | Bổ sung Popup "Hoàn tác" trong vòng 5s (sau đó biến mất) hoặc một nút "Hoàn tác" |