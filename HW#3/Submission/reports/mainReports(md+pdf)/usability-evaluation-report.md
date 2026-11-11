# Báo cáo đánh giá Usability - Web Admin

## 1. Tóm tắt điều hành

Đánh giá tập trung vào hai nhiệm vụ quản trị sản phẩm:

- **T1:** Import sản phẩm từ CSV.
- **T2:** Tìm và sửa giá sản phẩm.

Dữ liệu hiện có gồm 7 hồ sơ người tham gia P1-P7, mỗi hồ sơ có bảng SUS và
phỏng vấn mở. Điểm SUS trung bình là **41.79/100**, trung vị **42.5/100**.
Kết quả cho thấy trải nghiệm usability thấp, đặc biệt ở khả năng tìm thao tác,
phản hồi sau khi sửa và phục hồi khi xóa.

Đây là đánh giá mô tả trên mẫu 7 người, không phải kết luận đại diện thống kê
cho toàn bộ người dùng.

## 2. Mục tiêu, phạm vi và phương pháp

### Mục tiêu

1. Đánh giá người dùng có tìm thấy và hoàn thành T1/T2 hay không.
2. Xác định pain point lặp lại trong clarity, error recovery, speed và trust.
3. Đối chiếu kết quả usability với GUI checklist FR15/FR16.

### Phạm vi

- Web Admin, màn hình `Quản lý Sản phẩm`.
- Form thêm/sửa sản phẩm.
- Import CSV.
- Xóa sản phẩm/danh mục trong các câu hỏi phục hồi lỗi.

### Phương pháp và dữ liệu

- SUS 10 câu hỏi, thang 1-5, tính về thang 0-100.
- Phỏng vấn mở sau phiên test.
- Phân tích heuristic theo các pain point được ghi nhận.
- Đối chiếu với [GUI-checklist-FR15-FR16.md](../../../Process/task1/GUI-checklist-FR15-FR16.md)
  và [report-task2.md](../../../Process/task2/report-task2.md).

## 3. Người tham gia và độ đầy đủ dữ liệu

Có 7 hồ sơ: P1 Tăng Nhật Đăng, P2 Dương Hoàng Phúc, P3 Trần Nhật Dương,
P4 Võ Văn Nam, P5 Nguyễn Văn Bá Khôi, P6 Viên Đăng Khoa và P7 Nguyễn Hải
Dương.

- Hồ sơ có vai trò/ngành học và thời lượng tổng phiên.
- Môi trường được khai báo trong các hồ sơ: 
  + Thông tin trình duyệt: Google Chrome Official build (157.0.8103.40)
  + Viewport: 1280x800
  + Thiết bị: Laptop Dell G15 5515, OS: Windows 11 Version 25H2 (Build 26200.9711)
  + URL/build: http://localhost:5174 
- Hồ sơ P1, P5, P6 và P7 có link video phỏng vấn; P7 còn có hai link góp ý bổ
  sung. P2-P4 chưa có link video.
- Hồ sơ chưa ghi timecode hoặc xác nhận các video bao gồm toàn bộ thao tác T1/T2;
  vì vậy không xem link phỏng vấn là bằng chứng đầy đủ cho log task.
- Bản kế hoạch cũ nhắc P2-P8 và P1 pilot, nhưng thư mục hiện chỉ có P1-P7. (
  P1 không phải là pilot)

Link video hiện có:

| P# | Video |
|---|---|
| P1 | [Phỏng vấn](https://youtu.be/XnK9s-bV-Uo?si=ljqck9RapOlsG1t4) |
| P5 | [Phỏng vấn](https://youtu.be/bZZPJyC-P4k?si=3Cfap-y2VVdNakfc) |
| P6 | [Phỏng vấn](https://youtu.be/JsFcyFmqHvo?si=5lgyUBYtk5zozTsA) |
| P7 | [Phỏng vấn](https://youtu.be/AnMUDrTQDqc?si=1PUmHcUYlKIMA9a9); [Góp ý 1](https://youtu.be/Iar0auHzu7o?si=5o1WfU8W9c3AQxRM); [Góp ý 2](https://youtu.be/LOttCmflJsw?si=m1HPHMj-qEvSco1x) |

## 4. Kết quả SUS

| P# | SUS |
|---|---:|
| P1 | 42.5 |
| P2 | 30.0 |
| P3 | 45.0 |
| P4 | 35.0 |
| P5 | 35.0 |
| P6 | 62.5 |
| P7 | 42.5 |
| **Trung bình** | **41.79** |
| **Trung vị** | **42.5** |

Điểm thấp nhất là P2 với 30.0; cao nhất là P6 với 62.5. Chênh lệch này cho
thấy trải nghiệm có thể phụ thuộc vào kinh nghiệm kỹ thuật, nhưng mẫu hiện tại
không đủ để kiểm định nguyên nhân.

## 5. Kết quả theo bốn tiêu chí

### 5.1. Clarity

- 4/7 người đánh giá giao diện/thông báo tương đối rõ: P1-P4.
- 3/7 người còn trở ngại: P5-P7.
- Các vấn đề lặp lại: khó tìm nút Import, nút Import cách xa control chọn file,
  thiếu kiểm tra template/file type và feedback chưa chỉ dẫn bước tiếp theo.

### 5.2. Error recovery

- 1/7 người trả lời tích cực: P1.
- 6/7 người trả lời tiêu cực: P2-P7.
- Những quan sát lặp lại: không có confirm trước khi xóa và không có Undo/restore.

Đây là pain point nghiêm trọng vì hành động xóa có thể gây mất dữ liệu và người
dùng không có cơ hội hủy hoặc phục hồi.

### 5.3. Speed

Các phiên không nhất thiết chậm do hệ thống xử lý; phần lớn thời gian bị mất do
khả năng tìm thấy control:

- Tìm khu vực/nút Import: P2, P3, P4, P7 và được nêu thêm trong quan sát P1/P5.
- Tìm sản phẩm hoặc hiểu vị trí form sửa: P1, P3, P4, P5, P6, P7.
- P2 mất nhiều thời gian để import thành công sau khi chọn file.

### 5.4. Trust

- 2/7 người tin hoặc cho rằng dữ liệu được lưu: P2, P3.
- 3/7 người không tin tưởng: P1, P4, P5.
- 2/7 người còn phân vân: P6, P7.

Lý do lặp lại là sau khi sửa giá, giao diện chưa phản ánh ngay dữ liệu mới và
người dùng phải reload để kiểm tra. Điều này khớp với GUI-FR15-17.

## 6. Pain points và mức độ ưu tiên

| ID | Pain point | Tần suất | Heuristic | Severity | Ưu tiên |
|---|---|---:|---|---:|---|
| UX-01 | Nút Import khó nhận biết/cách xa chọn file | 3/7 | H4: Consistency and standards | 3 | Cao |
| UX-02 | Bấm Sửa nhưng không focus/scroll đến nơi cần chỉnh | 7/7 | H1: Visibility; H4 | 4 | Rất cao |
| UX-03 | Xóa danh mục không có confirm | 7/7 | H3: User control; H5 | 4 | Rất cao |
| UX-04 | Không có Undo/restore sau xóa | 6/7 | H3: User control; H5 | 4 | Rất cao |
| UX-05 | Nhiều lỗi import làm panel tràn dài | 1/7 | H4: Consistency and standards | 2 | Trung bình |

Severity ở đây dùng theo ảnh hưởng usability, không thay thế severity của bug
chức năng. UX-03 và UX-04 cần xác nhận thêm với yêu cầu nghiệp vụ về việc có
cho phép khôi phục hay không.

## 7. Phân tích theo task

### T1 - Import CSV

**Điểm làm được:** Import hợp lệ có thể hoàn thành và hệ thống có thông báo thành
công trong một số phiên.

**Trở ngại:** Người dùng khó tìm khu vực/nút Import; file type/template chưa
được kiểm tra rõ; danh sách lỗi dài có thể làm tràn panel. Các vấn đề này phù
hợp với GUI-FR16-05, FR16-07, FR16-08, FR16-09, FR16-11 và FR16-16.

**Kết luận task:** Có thể hoàn thành nhưng discoverability và error prevention
chưa tốt; người dùng mới dễ cần trợ giúp.

### T2 - Tìm và sửa giá

**Điểm làm được:** Người dùng có thể tìm và sửa sản phẩm sau khi hiểu luồng.

**Trở ngại:** Form sửa không đưa người dùng đến đúng vị trí; sau khi lưu, UI
không cập nhật nhất quán, làm giảm trust. Điều này phù hợp với GUI-FR15-17 và
các phản hồi trực tiếp của P1, P3, P4, P5, P6, P7.

**Kết luận task:** Luồng có rủi ro cao hơn T1 vì người dùng có thể tưởng thay
đổi chưa được lưu hoặc không biết thao tác đã tác động ở đâu.

## 8. Khuyến nghị

### Ưu tiên P0/P1

1. Thêm confirm trước các thao tác xóa; hiển thị rõ item sẽ bị xóa.
2. Thêm feedback sau `Sửa`: focus/scroll đến form hoặc dòng tương ứng và hiển
   thị trạng thái đã cập nhật.
3. Sau PUT, cập nhật đúng dòng theo ID hoặc tải lại dữ liệu để không làm các dòng
   khác đổi sai.
4. Hiển thị rõ trạng thái loading, empty, error và retry.

### Ưu tiên P1/P2

1. Gom control chọn file, tên file và Import thành một nhóm trực quan.
2. Kiểm tra file type, template, dữ liệu CSV và hiển thị lỗi theo từng dòng.
3. Tạo vùng cuộn riêng cho danh sách lỗi import.
4. Bổ sung responsive layout cho viewport nhỏ.
5. Cân nhắc Undo/restore sau xóa nếu nghiệp vụ cho phép.

## 9. Kết luận

Mục tiêu usability chưa đạt ở mức mong muốn. Vấn đề cốt lõi không chỉ là tốc độ
API mà là khả năng nhận biết hành động và phản hồi trạng thái. Người dùng có thể
hoàn thành các luồng chính, nhưng thường cần tự tìm vị trí control, không biết
kết quả sửa đã được lưu hay chưa và không có cơ chế phục hồi khi xóa.

SUS trung bình 41.79 hỗ trợ nhận định này, nhưng cần thu thập thêm dữ liệu có
cấu trúc trước khi so sánh giữa nhóm người dùng hoặc đưa ra kết luận phổ quát.

## 10. Dữ liệu còn thiếu trước khi nộp

- Xác nhận phạm vi participant: P1 pilot hay chính thức; bổ sung P8 nếu kế hoạch
  thực sự yêu cầu P2-P8.
- Bổ sung task script và tiêu chí thành công định lượng cho T1/T2.
- Bổ sung thời gian riêng cho từng task, không chỉ thời lượng toàn phiên.
- Bổ sung số lần trợ giúp, số lỗi thao tác và kết quả thành công/thất bại có
  nguồn ghi rõ.
- Bổ sung browser version, viewport, thiết bị, URL/build và ngày test.
- Bổ sung timecode hoặc ghi chú quan sát có người xác nhận; xác minh video nào
  ghi toàn bộ task T1/T2 thay vì chỉ phỏng vấn. P2-P4 hiện chưa có link video.
- Bổ sung SEQ sau từng task nếu cần đo độ dễ hoàn thành.
- Đối chiếu lại tần suất UX-01..UX-05 với raw notes trước khi khẳng định là
  3/7, 7/7, 6/7 hoặc 1/7.
