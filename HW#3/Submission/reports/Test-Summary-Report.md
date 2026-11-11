# Test Summary Report — HW#3 GUI & Usability

**Ngày tổng hợp:** 11/11/2026  
**Đối tượng kiểm thử:** EShop Web Admin — quản lý sản phẩm (FR-15) và import CSV (FR-16)

## 1. Tóm tắt kết quả

Đợt kiểm thử tập trung vào giao diện quản lý sản phẩm và luồng import CSV,
kết hợp GUI checklist, kiểm thử bổ sung trên nhiều trình duyệt và đánh giá
usability với người tham gia thực tế.

| Hạng mục | Kết quả |
|---|---|
| Màn hình/khu vực chính | Web Admin — Quản lý Sản phẩm, gồm form/bảng sản phẩm và khu vực Import CSV |
| Luồng usability | T1: Import sản phẩm từ CSV; T2: Tìm và sửa giá sản phẩm |
| GUI checklist | 40 mục đã thực thi: 24 Pass, 16 Fail; tỷ lệ Pass 60% |
| Người tham gia usability | 7 hồ sơ, P1–P7 |
| SUS | Trung bình 41,79/100; trung vị 42,5/100 |
| Báo cáo lỗi | 20 mục: 15 lỗi GUI/chức năng (FR-15: 9; FR-16: 6) và 5 pain point usability (UX-01–UX-05) |
| Trình duyệt có minh chứng | Firefox và Google Chrome trên máy Windows local |

Các mục `RETEST-*` được kiểm tra bổ sung, xác nhận là Fail và không cộng vào
40 mục checklist gốc để tránh đếm trùng. Minh chứng đa trình duyệt cũng là
bằng chứng bổ sung, không được tính thành test case mới.

## 2. Phạm vi và môi trường

### Phạm vi kiểm thử

- **FR-15 — Quản lý sản phẩm:** bố cục bảng/form, validation, thêm/sửa/xóa,
  trạng thái danh sách và phản hồi lỗi.
- **FR-16 — Import CSV:** chọn file, header/schema, parsing, validation dữ liệu,
  trạng thái import và responsive layout.
- **Usability:** độ rõ ràng, phục hồi lỗi, tốc độ và mức độ tin tưởng trong
  hai luồng T1/T2.
- **Cross-browser evidence:** ảnh/tệp minh chứng được lưu riêng theo Firefox
  và Google Chrome.

### Môi trường đã ghi nhận

| Loại kiểm thử | Môi trường |
|---|---|
| GUI checklist | Máy Windows local; Firefox và Google Chrome. Các viewport responsive trong checklist: 320x640, 768x800 và 1280x800. |
| Minh chứng Task 3 | Các thư mục Firefox/Google Chrome ghi viewport 1200x600 trong README của từng thư mục. |
| Usability sessions | Google Chrome 157.0.8103.40; Windows 11 25H2; Dell G15 5515; viewport 1280x800; Web Admin tại `http://localhost:5174`. |

## 3. Kết quả GUI checklist

| Nhóm | Số mục | Pass | Fail |
|---|---:|---:|---:|
| FR-15 — Quản lý sản phẩm | 24 | 15 | 9 |
| FR-16 — Import CSV | 16 | 9 | 7 |
| **Tổng checklist gốc** | **40** | **24** | **16** |

Các vấn đề chính được ghi nhận:

- Giá sản phẩm cho phép giá trị âm hoặc bằng 0; tên dài có thể tràn bố cục.
- Hình ảnh thiếu fallback/preview và trường danh mục thiếu nhãn rõ.
- Sau khi sửa một sản phẩm, state hiển thị có thể làm thay đổi tên các dòng
  khác cho đến khi reload.
- Import chưa kiểm tra đầy đủ loại file, header, dữ liệu CSV và
  `category_id`; parser xử lý chưa đúng một số trường hợp quote/dấu phẩy.
- Empty/error feedback chưa rõ; khu vực Import bị che hoặc tràn ở viewport nhỏ.

## 4. Kết quả usability

SUS được tính trên 7 hồ sơ P1–P7. Điểm dao động từ **30,0** đến **62,5**;
trung bình **41,79** và trung vị **42,5**. Đây là thống kê mô tả của mẫu nhỏ,
không đại diện cho toàn bộ người dùng.

Pain point nổi bật theo báo cáo:

| Pain point | Tần suất ghi nhận | Severity |
|---|---:|---:|
| Nút Import khó tìm/khó nhận biết | 3/7 | 3 |
| Không rõ vị trí/chưa có focus sau khi bấm Sửa | 7/7 | 4 |
| Xóa danh mục không có xác nhận | 7/7 | 4 |
| Không có Undo/restore sau khi xóa | 6/7 | 4 |
| Danh sách lỗi import dài làm panel tràn | 1/7 | 2 |

Tần suất được trích từ báo cáo tổng hợp hiện có. Báo cáo usability cũng lưu ý
cần đối chiếu các quan sát task với raw notes trước khi xem chúng là kết luận
cuối cùng.

## 5. Tổng hợp lỗi và ưu tiên

Bug report có 20 mục, trong đó các report GUI/chức năng liên kết tới GitHub
Issues `#1–#15`; các pain point usability được ghi riêng ở `UX-01–UX-05`,
liên kết Issues `#16–#20`.

Ưu tiên xử lý theo tác động người dùng:

1. **Severity 4:** giúp người dùng nhận ra form/dòng đang sửa; thêm xác nhận
   trước khi xóa; xem xét khả năng Undo/restore nếu nghiệp vụ cho phép.
2. **Severity 3:** validation giá và dữ liệu CSV, ngăn import file/dữ liệu
   không hợp lệ, xử lý trạng thái loading/empty/error, sửa state sau khi cập
   nhật và bố cục responsive.
3. **Severity 2:** cải thiện hiển thị tên dài, nhãn form và vùng hiển thị danh
   sách lỗi import.

Các mục `UX-*` là pain point usability; cần phân biệt với lỗi chức năng và
xác nhận yêu cầu nghiệp vụ trước khi xem đề xuất như Undo/restore là lỗi bắt
buộc.

## 6. Giới hạn và rủi ro

- Hồ sơ hiện có của người tham gia không cung cấp đầy đủ log từng task và
  timecode. Link video có ở P1, P5, P6 và P7; P2–P4 chưa có link. Chưa xác nhận
  các video hiện có ghi toàn bộ thao tác T1/T2.
- P1 được tính trong thống kê SUS; cần xác nhận rõ P1 là pilot hay participant
  chính thức trước khi diễn giải lại mẫu.
- Minh chứng cross-browser hiện ghi nhận Firefox và Google Chrome trên Windows
  local. Báo cáo này không kết luận đã hoàn tất kiểm thử Safari hoặc nền tảng
  thứ ba nếu chưa có evidence tương ứng.
- Số lỗi ở đây là số mục trong bug report; trạng thái xử lý/đóng issue cần xem
  trực tiếp trên GitHub Issues.

## 7. Kết luận

Kết quả cho thấy còn nhiều lỗi về validation, feedback, khả năng phục hồi và
discoverability. Tỷ lệ Pass 60% và SUS trung bình 41,79/100 cho thấy cần ưu
tiên cải thiện trước khi xem trải nghiệm là đạt yêu cầu. Đây là báo cáo tổng
hợp của phạm vi và bằng chứng hiện có; không thay thế việc xác minh issue,
video hoặc raw notes.

## 8. Tài liệu và bằng chứng liên quan

- [GUI checklist report](<./mainReports(md+pdf)/GUI-checklist-report.md>)
- [GUI checklist FR-15/FR-16](../../Process/task1/GUI-checklist-FR15-FR16.md)
- [Usability evaluation report](<./mainReports(md+pdf)/usability-evaluation-report.md>)
- [Usability data — Task 2](../../Process/task2/report-task2.md)
- [Bug report](./bug-report.md)
- [Task 3 — Firefox evidence](./assets/task3/firefox/)
- [Task 3 — Google Chrome evidence](./assets/task3/google-chrome/)
- [Task 1 — GUI evidence](./assets/task1/)
