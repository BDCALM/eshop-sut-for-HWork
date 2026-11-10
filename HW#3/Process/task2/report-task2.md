# Báo cáo dữ liệu usability task 2

## 1. Phạm vi và nguồn dữ liệu

- Đối tượng: Web Admin, quản lý sản phẩm và import CSV.
- Người tham gia có hồ sơ trong thư mục `7-users`: P1 đến P7.
- Công cụ đo: SUS 10 câu hỏi, thang 1-5, và phỏng vấn mở về Clarity,
  Error Recovery, Speed và Trust.
- Môi trường được khai báo trong các hồ sơ: không có thông tin đầy đủ về phiên
  bản trình duyệt, viewport, thiết bị hoặc URL/build.
- P1 được bản nháp trước đó ghi là pilot, nhưng hồ sơ P1 vẫn được cung cấp và
  được tính trong thống kê mô tả dưới đây. Cần xác nhận lại trước khi nộp.

## 2. Danh sách người tham gia

Số điện thoại đã được che bốn chữ số ở giữa theo yêu cầu. Email không đưa vào
bảng báo cáo để giảm dữ liệu cá nhân không cần thiết.

| P# | Họ và tên | Nghề nghiệp / Vai trò | Thông tin liên lạc |
|---|---|---|---|
| P1 | Tăng Nhật Đăng | Sinh viên Cơ khí, ĐHBK - ĐHQG TP.HCM | 0948****48 |
| P2 | Dương Hoàng Phúc | Sinh viên Công nghệ thông tin, ĐH Nông Lâm | 0374****42 |
| P3 | Nguyễn Văn Hải | Sinh viên Kỹ thuật phần mềm, HCMUS | 0905****09 |
| P4 | Võ Văn Nam | Sinh viên Kỹ thuật phần mềm, HCMUS | 0974****19 |
| P5 | Nguyễn Văn Bá Khôi | Sinh viên Điện tử Viễn thông, HCMUS | 0393****00 |
| P6 | Viên Đăng Khoa | Sinh viên Hệ thống thông tin, UIT | 0889****23 |
| P7 | Nguyễn Hải Dương | Sinh viên Công nghệ thông tin, FPT University | 0792****88 |

## 3. Điểm SUS

Cách tính chuẩn: câu lẻ lấy `điểm - 1`, câu chẵn lấy `5 - điểm`, tổng nhân
`2.5` để đưa về thang 0-100.

| P# | Thời gian hồ sơ | SUS |
|---|---:|---:|
| P1 | 02:40 | 42.5 |
| P2 | 03:10 | 30.0 |
| P3 | 02:10 | 45.0 |
| P4 | 01:50 | 35.0 |
| P5 | 03:50 | 35.0 |
| P6 | 02:30 | 62.5 |
| P7 | 02:20 | 42.5 |
| **Trung bình** |  | **41.79** |
| **Trung vị** |  | **42.5** |

Điểm trung bình 41.79/100 cho thấy trải nghiệm được đánh giá thấp trong mẫu
này. Đây là thống kê mô tả của 7 người, không phải kết luận đại diện cho toàn
bộ người dùng.

## 4. Tổng hợp phỏng vấn mở

### 4.1. Clarity

| Nhóm trả lời | Người tham gia | Số lượng |
|---|---|---:|
| Đánh giá rõ ràng/dễ hiểu | P1, P2, P3, P4 | 4/7 |
| Không rõ hoặc có trở ngại | P5, P6, P7 | 3/7 |

Các trở ngại lặp lại: khó tìm nút Import, thiếu bước kiểm tra template/file type,
và thông báo thành công không đủ để giải quyết vấn đề tìm vị trí thao tác.

### 4.2. Error Recovery

- P1 trả lời có thể nhận ra cảnh báo/quay lại.
- P2-P7 đều nêu không có cảnh báo trước khi xóa, không có hoàn tác hoặc không
  có restore.
- Tổng hợp: 1/7 đánh giá tích cực, 6/7 đánh giá tiêu cực.

Đây là pain point mạnh nhất về ngăn ngừa lỗi và quyền kiểm soát người dùng.

### 4.3. Speed

Các khó khăn được nhắc lại:

- Khó tìm khu vực/nút Import: P2, P3, P4, P7.
- Thao tác `Sửa` mất thời gian hoặc thiếu chỉ dẫn: P1, P3, P4, P5, P7.
- P2 mất thời gian để import thành công sau khi chọn file.
- P5 và P6 đánh giá tốc độ nhìn chung tốt hơn, nhưng P5 vẫn gặp khó khăn khi
  tìm sản phẩm mới để sửa.

Kết luận mô tả: tốc độ hệ thống không phải vấn đề chính; discoverability và
feedback sau khi bấm `Sửa` mới là nguồn gây chậm.

### 4.4. Trust

| Nhóm trả lời | Người tham gia | Số lượng |
|---|---|---:|
| Tin tưởng/cho rằng dữ liệu được lưu | P2, P3 | 2/7 |
| Không tin tưởng do UI không phản ánh thay đổi | P1, P4, P5 | 3/7 |
| Phân vân/chưa đủ cơ sở | P6, P7 | 2/7 |

Nguyên nhân lặp lại là sau khi sửa giá, giao diện chưa phản ánh dữ liệu mới cho
đến khi reload. Điều này khớp với GUI-FR15-17 trong checklist.

## 5. Bảng quan sát task

Bảng dưới đây là dữ liệu task đã có trong bản ghi tổng hợp trước đó. Các file
P1-P7 hiện chỉ chứa SUS và phỏng vấn mở, không chứa log task/video tương ứng;
do đó cần xác nhận người ghi và bổ sung mốc video trước khi dùng làm bằng chứng
chính thức.

| P# | Nhiệm vụ | Kết quả | Thời gian | Lỗi thao tác | Quan sát |
|---|---|---|---:|---:|---|
| P1 | T1: Import CSV | Có trợ giúp | 00:30 và 01:00 | 1 | Nhầm giữa thêm thủ công và import; mất thời gian tìm nút Import. |
| P1 | T2: Tìm & Sửa giá | Có trợ giúp | 02:40 | 1 | Phải cuộn để tìm danh sách; sửa giá mất thời gian. |
| P2 | T1: Import CSV | Có trợ giúp | 01:40 | 2 | Lúng túng tìm Quản lý sản phẩm và nút Import. |
| P2 | T2: Tìm & Sửa giá | Có trợ giúp | 03:10 | 1 | Không hiểu vì sao bấm `Sửa` nhưng không thấy phản ứng. |
| P3 | T1: Import CSV | Thành công | 00:40 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |
| P3 | T2: Tìm & Sửa giá | Thành công | 02:10 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |
| P4 | T1: Import CSV | Thành công | 00:28 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |
| P4 | T2: Tìm & Sửa giá | Thành công | 01:50 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |
| P5 | T1: Import CSV | Thành công | 01:18 | 0 | Mất thời gian tìm nút Import. |
| P5 | T2: Tìm & Sửa giá | Có trợ giúp | 03:50 | 1 | Mất thời gian cuộn để tìm sản phẩm mới và sửa. |
| P6 | T1: Import CSV | Thất bại rồi thành công | 00:31 và 00:51 | 0 | Thử import file `.py`, sau đó thực hiện thành công. |
| P6 | T2: Tìm & Sửa giá | Có trợ giúp | 02:30 | 1 | Không hiểu phản hồi sau khi bấm `Sửa`. |
| P7 | T1: Import CSV | Thành công | 00:37 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |
| P7 | T2: Tìm & Sửa giá | Thành công | 02:20 | 0 | Chưa có ghi chú task trong hồ sơ người dùng. |

## 6. Pain points đã tổng hợp

| ID | Vấn đề | Tần suất | Heuristic | Severity | Khuyến nghị |
|---|---|---:|---|---:|---|
| UX-01 | Nút Import khó nhận biết và cách control chọn file quá xa. | 3/7 | H4: Nhất quán và chuẩn | 3 | Đặt các control gần nhau, label rõ và thể hiện lý do disabled. |
| UX-02 | Bấm `Sửa` nhưng không focus/scroll đến nơi cần chỉnh sửa. | 7/7 | H1, H4 | 4 | Focus/scroll đến form hoặc dòng đang sửa, thêm highlight trạng thái. |
| UX-03 | Xóa danh mục không có xác nhận. | 7/7 | H3, H5 | 4 | Confirm trước khi xóa và cho phép hủy. |
| UX-04 | Không có hoàn tác sau khi xóa sản phẩm/danh mục. | 6/7 | H3, H5 | 4 | Toast Undo trong thời gian ngắn hoặc cơ chế khôi phục. Cần xác nhận nghiệp vụ. |
| UX-05 | Danh sách nhiều lỗi import làm panel tràn dài. | 1/7 | H4 | 2 | Giới hạn chiều cao và tạo vùng cuộn riêng; hiển thị tổng số lỗi. |

## 7. Kết luận

- Pain point nổi bật nhất là khả năng tìm thấy và hiểu kết quả của thao tác
  `Sửa`, xuất hiện ở cả phỏng vấn và dữ liệu GUI.
- Error recovery rất yếu: 6/7 người không thấy cảnh báo/hoàn tác khi xóa.
- Trust bị ảnh hưởng bởi việc UI không cập nhật ngay sau khi sửa giá.
- Import có thông báo thành công trong nhiều trường hợp, nhưng vị trí nút,
  kiểm tra file và hướng dẫn lỗi chưa đủ rõ.

## 8. Dữ liệu còn thiếu và việc cần bổ sung

1. Xác nhận P1 là pilot hay participant chính thức; nếu loại P1, tính lại SUS
   và tần suất pain point trên P2-P7.
2. Thiếu P8 nếu kế hoạch yêu cầu P2-P8; cần bổ sung hoặc sửa phạm vi mẫu thành
   P1-P7.
3. Bổ sung viewport, trình duyệt, thiết bị, URL/build và ngày/giờ test.
4. Bổ sung task script, tiêu chí thành công/thất bại và thời gian bắt đầu-kết
   thúc cho từng task.
5. Bổ sung video hoặc timestamp; hiện phần lớn hồ sơ ghi không có video.
6. Xác nhận bảng quan sát task ở mục 5 vì các giá trị này không xuất hiện trong
   bảy hồ sơ SUS/phỏng vấn được cung cấp.
7. Nếu cần kết luận usability mạnh hơn, bổ sung SEQ sau từng task, tỷ lệ hoàn
   thành, số lần trợ giúp và ghi chú điều phối viên.
8. Bổ sung bản ghi đầy đủ cho P1 clarity/error recovery vì câu trả lời hiện
   ngắn và không giải thích tình huống cụ thể.
