 # Báo cáo kiểm thử GUI - FR-15 và FR-16

## 1. Tóm tắt

Báo cáo này tổng hợp kết quả kiểm thử giao diện phân hệ Web Admin, tập trung
vào màn hình `Quản lý Sản phẩm` và chức năng `Import sản phẩm từ CSV`.

| Chỉ số | Kết quả |
|---|---:|
| Tổng số test case | 40 |
| Pass | 24 |
| Fail | 16 |
| Tỷ lệ Pass | 60% |
| Môi trường chính | Firefox và Google Chrome, máy Windows local |
| Viewport responsive | 320x640, 768x800, 1280x800 |

Các mục `RETEST-*` trong checklist là các phát hiện bổ sung đã được kiểm tra
lại và xác nhận là Fail, nhưng không cộng thêm vào 40 test case gốc để tránh
đếm trùng.

## 2. Phạm vi và phương pháp

- Đối chiếu với yêu cầu FR-15, FR-16 trong README/SRS.
- Kiểm tra GUI checklist theo các nhóm: bố cục, form, validation, feedback,
  navigation và responsive.
- Kiểm tra thực tế trên Firefox và Google Chrome ở máy Windows local.
- Minh chứng kiểm thử bổ sung theo trình duyệt được lưu tại
  `HW#3/Submission/reports/assets/task3/firefox/` và
  `HW#3/Submission/reports/assets/task3/google-chrome/`; README trong mỗi thư
  mục ghi viewport 1200x600. Ảnh/tệp trong hai thư mục này được đặt tiền tố
  `GUI-FR`.
- Minh chứng đa trình duyệt là phần bổ sung, không cộng thêm vào 40 test case
  đã thống kê.
- Đối chiếu bằng chứng trong thư mục
  `HW#3/Submission/reports/assets/task1/`.
- Các phát hiện suy ra từ mã nguồn được tách thành `RETEST-*`; chỉ chuyển sang
  Fail sau khi người thực hiện kiểm tra lại.

## 3. Kết quả FR-15 - Quản lý sản phẩm

| Nhóm | Test case | Kết quả |
|---|---|---|
| Tổng quan, bố cục và bảng | FR15-01..08 | 6 Pass, 2 Fail |
| Form và validation | FR15-09..18 | 5 Pass, 5 Fail |
| Navigation và persistence | FR15-19..22 | 4 Pass |
| Empty/error state | FR15-23..24 | 2 Fail |

### Các lỗi chính

1. Ảnh trống hoặc URL ảnh không hiển thị fallback/preview phù hợp
	(FR15-05, FR15-13).
2. Tên sản phẩm dài gây thanh cuộn ngang (FR15-08) và không bị giới hạn tối
	đa 255 ký tự (FR15-12).
3. Select danh mục thiếu nhãn rõ ràng (FR15-09).
4. Form cho phép giá âm và bằng 0 (FR15-11).
5. Sau khi sửa một sản phẩm, state cục bộ làm tên các dòng khác đổi theo; sau
	reload dữ liệu server mới trở lại đúng (FR15-17).
6. Danh sách rỗng và lỗi API không có feedback rõ ràng (FR15-23, FR15-24).

## 4. Kết quả FR-16 - Import sản phẩm từ CSV

| Nhóm | Test case | Kết quả |
|---|---|---|
| Khu vực import và file mẫu | FR16-01..04 | 4 Pass |
| File/header/validation | FR16-05..09 | 1 Pass, 4 Fail |
| Trạng thái import và kết quả | FR16-10..15 | 4 Pass, 2 Fail |
| Responsive | FR16-16 | 1 Fail |

### Các lỗi chính

1. File rỗng, chỉ có header hoặc không phải CSV không có cảnh báo đầy đủ; file
	không phải CSV vẫn có thể được chọn (FR16-05).
2. Header thiếu được cảnh báo nhưng cột dư vẫn được chấp nhận (FR16-07).
3. Parser xử lý sai quote/dấu phẩy theo RFC 4180 (FR16-08).
4. Không cảnh báo trước khi import khi `name` rỗng, `price` âm/không phải số
	hoặc `category_id` rỗng (FR16-09, FR16-13).
5. Nút Import có thể bị thao tác liên tục khi request đang xử lý (FR16-11).
6. Giao diện bị navigation che hoặc nút Import tràn ở viewport nhỏ (FR16-16).

## 5. Đánh giá theo trạng thái giao diện

| Trạng thái | Đánh giá |
|---|---|
| Thành công | Có feedback thành công sau tạo/import trong các luồng hợp lệ. |
| Loading | Nút import có trạng thái `Đang import...`, nhưng cần khóa ổn định hơn khi thao tác nhanh. |
| Empty | Chưa có empty state rõ cho danh sách sản phẩm rỗng. |
| Error | Một số lỗi API/file không được hiển thị đủ rõ hoặc không chỉ ra cách xử lý tiếp. |
| Responsive | Desktop cơ bản dùng được; 320x640 và 768x800 còn lỗi che/tràn. |

## 6. Phát hiện UX bổ sung

Các đề xuất sau không tự động được xem là vi phạm FR nếu SRS chưa quy định:

- Bổ sung upload ảnh từ máy tính và preview.
- Thiết kế lại ô giá để tránh accidental scroll và thao tác spinner khó dùng.
- Giữ ngữ cảnh khi xóa liên tiếp, thêm vùng cuộn riêng hoặc phân trang.
- Thêm tìm kiếm/lọc theo tên và giá cho bảng sản phẩm.

## 7. Khuyến nghị ưu tiên

1. Ưu tiên validation giá, dữ liệu CSV và lỗi cập nhật state vì có thể tạo dữ
	liệu sai hoặc làm người dùng mất niềm tin.
2. Bổ sung empty/error state và feedback file để phân biệt rõ thành công, rỗng
	và lỗi.
3. Sửa responsive ở viewport nhỏ trước khi đánh giá mobile usability.
4. Sau đó cải thiện preview/fallback ảnh, label danh mục và khả năng tìm kiếm.

## 8. Bằng chứng và giới hạn

- Checklist chi tiết: [GUI-checklist-FR15-FR16.md](../../Process/task1/GUI-checklist-FR15-FR16.md).
- Bug reports: [bug-report.md](../bug-report.md).
- Ảnh/video/text evidence: `HW#3/Submission/reports/assets/task1/`.
- Ảnh minh chứng kiểm thử trên Firefox và Google Chrome: thư mục
  `HW#3/Submission/reports/assets/task3/` (chia theo trình duyệt).
- Kết quả phản ánh kiểm thử trên Firefox và Google Chrome ở máy Windows local;
  chưa đủ để kết luận cho mọi trình duyệt, hệ điều hành hoặc thiết bị thật.
- Một số phát hiện UX là đề xuất cải tiến, cần đối chiếu lại với SRS trước khi
  phân loại thành bug bắt buộc sửa.
