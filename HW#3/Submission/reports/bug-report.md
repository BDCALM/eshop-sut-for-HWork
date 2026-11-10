# Bug Report

## Phạm vi và môi trường

- Phân hệ: Web Admin, màn hình `Quản lý Sản phẩm` và `Import sản phẩm từ CSV`.
- Môi trường GUI: Chrome stable, desktop local machine; responsive test tại
	320x640, 768x800 và 1280x800 khi được ghi rõ.
- Nguồn: [GUI-checklist-FR15-FR16.md](../../Process/task1/GUI-checklist-FR15-FR16.md)
	và [report-task2.md](../../Process/task2/report-task2.md).
- Trạng thái mặc định: `Open`, chờ gắn URL GitHub Issue.

## Quy ước

`Severity` dùng thang 0-4 theo skill GUI/usability. Các report từ checklist là
lỗi GUI/chức năng đã xác nhận; các report `UX-*` là pain point usability được
quan sát qua người dùng và không nên gộp nhầm thành lỗi API.

## Bug reports từ GUI checklist

### BUG-FR15-01: Ảnh sản phẩm không có fallback hoặc preview ổn định

- **Severity:** 3
- **Loại:** GUI / Feedback
- **Liên quan:** GUI-FR15-05, GUI-FR15-13, RETEST-FR15-03
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/1
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-05.png`,
	`HW#3/Submission/reports/assets/task1/GUI-FR15-13.png`
- **Tiền điều kiện:** Đăng nhập admin và mở `Sản phẩm`.
- **Bước tái hiện:**
	1. Tạo/sửa sản phẩm với ảnh trống, URL ảnh hợp lệ và URL ảnh không hợp lệ.
	2. Lưu sản phẩm và quan sát form/bảng sản phẩm.
- **Kết quả mong đợi:** URL hợp lệ hiển thị ảnh; URL lỗi hoặc ảnh trống hiển
	thị placeholder rõ ràng, không làm mất bố cục.
- **Kết quả thực tế:** Ảnh không hiển thị đúng như mong đợi; trường hợp ảnh
	trống không có fallback hữu ích.
- **Đề xuất:** Có preview ảnh, placeholder cố định và thông báo URL không tải
	được; cân nhắc upload ảnh từ máy tính như cải tiến UX.

### BUG-FR15-02: Tên sản phẩm dài gây tràn và cuộn ngang

- **Severity:** 2
- **Loại:** GUI / Responsive layout
- **Liên quan:** GUI-FR15-08
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/2
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-08.png`
- **Bước tái hiện:** Nhập một tên sản phẩm rất dài, lưu sản phẩm và quan sát
	form/bảng ở desktop.
- **Kết quả mong đợi:** Tên được wrap, truncate có tooltip, hoặc giới hạn hợp
	lý; không tạo thanh cuộn ngang ngoài ý muốn.
- **Kết quả thực tế:** Bảng/form tạo thanh cuộn ngang khi tên rất dài.
- **Đề xuất:** Dùng `overflow-wrap`, giới hạn chiều rộng cột và hiển thị
	tooltip; kết hợp validation độ dài theo FR-15.

### BUG-FR15-03: Thiếu nhãn rõ ràng cho trường danh mục

- **Severity:** 2
- **Loại:** GUI / Accessibility
- **Liên quan:** GUI-FR15-09, RETEST-FR15-04
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/3
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-09.png`
- **Bước tái hiện:** Mở form `Thêm sản phẩm mới` và quan sát control chọn danh
	mục, bằng chuột và bàn phím.
- **Kết quả mong đợi:** Select có nhãn `Danh mục` hiển thị rõ và được liên kết
	với control.
- **Kết quả thực tế:** Select thiếu nhãn rõ ràng ở phía trên nên người dùng
	khó nhận biết mục đích của control.
- **Đề xuất:** Thêm `<label>` và giữ thứ tự focus/nhóm form nhất quán.

### BUG-FR15-04: Form cho phép giá âm và bằng 0

- **Severity:** 3
- **Loại:** Validation / GUI
- **Liên quan:** GUI-FR15-11, RETEST-FR15-02
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/4
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-11.png`
- **Bước tái hiện:** Nhập `-1` và `0` vào `Giá tiền`, sau đó thử lưu sản phẩm.
- **Kết quả mong đợi:** Chỉ chấp nhận số dương theo FR-15; hiển thị lỗi ngay
	trên form và không gửi dữ liệu không hợp lệ.
- **Kết quả thực tế:** Giao diện cho phép nhập giá âm và giá bằng 0.
- **Đề xuất:** Thêm `min="0.01"` hoặc giới hạn phù hợp, kiểm tra lại ở
	frontend/backend và hiển thị lỗi trước nút submit.

### BUG-FR15-05: Không giới hạn độ dài tên sản phẩm

- **Severity:** 2
- **Loại:** Validation / GUI
- **Liên quan:** GUI-FR15-12
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/5
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-12.png`
- **Bước tái hiện:** Nhập tên dài hơn 255 ký tự và lưu sản phẩm.
- **Kết quả mong đợi:** Form chặn hoặc cảnh báo tên vượt tối đa 255 ký tự theo
	FR-15; nội dung lỗi chỉ rõ giới hạn.
- **Kết quả thực tế:** Không có giới hạn độ dài tên sản phẩm.
- **Đề xuất:** Thêm `maxLength={255}`, bộ đếm ký tự và validation server-side.

### BUG-FR15-06: Cập nhật một sản phẩm làm đổi tên các dòng khác trong state

- **Severity:** 3
- **Loại:** Functional GUI state
- **Liên quan:** GUI-FR15-17
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/6
- **Bước tái hiện:**
	1. Mở bảng có ít nhất hai sản phẩm.
	2. Chọn `Sửa` một sản phẩm và đổi tên/giá.
	3. Lưu, không reload trang.
- **Kết quả mong đợi:** Chỉ dòng được chọn cập nhật; các dòng khác giữ nguyên.
- **Kết quả thực tế:** Trước khi reload, tên các dòng khác bị đổi theo tên sản
	phẩm vừa sửa. Sau reload dữ liệu server trở lại đúng.
- **Đề xuất:** Sau PUT cập nhật đúng product theo `id` hoặc gọi lại `fetchData`,
	không map toàn bộ danh sách bằng tên mới.

### BUG-FR15-07: Không có empty state khi danh sách sản phẩm rỗng

- **Severity:** 3
- **Loại:** GUI / Feedback
- **Liên quan:** GUI-FR15-23, RETEST-FR15-05
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/7
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-23.png`
- **Bước tái hiện:** Mở màn hình Sản phẩm khi API trả về danh sách rỗng.
- **Kết quả mong đợi:** Hiển thị icon/placeholder và thông báo thân thiện như
	`Chưa có sản phẩm`, kèm hành động tiếp theo nếu phù hợp.
- **Kết quả thực tế:** Khu vực bảng gần như trống, không có `Trống`/`Empty`.
- **Đề xuất:** Thêm trạng thái rỗng riêng, không render bảng không có dòng như
	thể ứng dụng bị lỗi.

### BUG-FR15-08: Không có feedback khi request sản phẩm/danh mục thất bại

- **Severity:** 3
- **Loại:** GUI / Error handling
- **Liên quan:** GUI-FR15-24, RETEST-FR15-05
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/8
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR15-24.png`
- **Bước tái hiện:** Mô phỏng API 5xx, mất mạng hoặc request lấy dữ liệu thất
	bại rồi mở màn hình Sản phẩm.
- **Kết quả mong đợi:** Hiển thị lỗi dễ hiểu, trạng thái lỗi rõ ràng và nút
	thử lại; không để người dùng nhầm với danh sách rỗng.
- **Kết quả thực tế:** Không có thông báo rõ ràng, bảng cũng không hiển thị
	nội dung để giải thích tình trạng.
- **Đề xuất:** Tách state `loading`, `empty`, `error`; thêm retry và ghi lỗi
	phù hợp trong console/monitoring.

### BUG-FR15-09: Xóa sản phẩm không có hộp thoại xác nhận

- **Severity:** 3
- **Loại:** Usability / Error prevention
- **Liên quan:** RETEST-FR15-01
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/9
- **Bước tái hiện:** Nhấn `Xóa` tại một sản phẩm.
- **Kết quả mong đợi:** Hiển thị confirm dialog trước DELETE, cho phép hủy.
- **Kết quả thực tế:** Xóa được thực hiện trực tiếp, không có bước xác nhận.
- **Đề xuất:** Thêm dialog xác nhận và thông báo kết quả sau xóa.

### BUG-FR16-01: Import không kiểm tra loại file và file rỗng rõ ràng

- **Severity:** 3
- **Loại:** Validation / Feedback
- **Liên quan:** GUI-FR16-05, RETEST-FR16-01, RETEST-FR16-04
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/10
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-05.png`
- **Bước tái hiện:** Chọn file rỗng, file chỉ có header, `.exe` hoặc file không
	phải CSV.
- **Kết quả mong đợi:** Chỉ nhận `.csv`; file rỗng/header-only bị từ chối với
	thông báo rõ; nút Import bị disable có lý do.
- **Kết quả thực tế:** File không phải CSV vẫn chọn được và nút Import vẫn có
	thể hiện; file không có dòng dữ liệu chỉ bị disable mà không có hướng dẫn.
- **Đề xuất:** Dùng `accept=".csv,text/csv"`, kiểm tra extension/MIME và hiển
	thị lỗi ngay sau khi chọn file.

### BUG-FR16-02: Import không từ chối cột dư hoặc header sai

- **Severity:** 2
- **Loại:** Validation / Data integrity
- **Liên quan:** GUI-FR16-07
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/11
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-07-1.png`
- **Bước tái hiện:** Chọn CSV có cột dư, header sai hoặc thiếu cột bắt buộc.
- **Kết quả mong đợi:** Báo chính xác cột nào dư/thiếu/sai và chặn import.
- **Kết quả thực tế:** Header thiếu được cảnh báo, nhưng cột dư vẫn được chấp
	nhận/import bình thường.
- **Đề xuất:** So sánh tập header thực tế với schema bắt buộc trước khi tạo
	preview và trước khi gửi request.

### BUG-FR16-03: CSV parser xử lý sai quote và dấu phẩy theo RFC 4180

- **Severity:** 3
- **Loại:** Data parsing / GUI preview
- **Liên quan:** GUI-FR16-08, RETEST-FR16-02
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/12
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-08.png`
- **Bước tái hiện:** Chọn CSV có tên/mô tả chứa dấu phẩy trong dấu nháy kép,
	quote kép escape hoặc newline trong một field.
- **Kết quả mong đợi:** Preview giữ nguyên giá trị field và map đúng cột theo
	RFC 4180.
- **Kết quả thực tế:** Giá trị có quote/dấu phẩy bị tách hoặc hiển thị thêm
	nhiều dấu ngoặc kép.
- **Đề xuất:** Dùng thư viện CSV hỗ trợ RFC 4180 thay vì `split(",")`.

### BUG-FR16-04: Import không validate name, price và category_id trước khi gửi

- **Severity:** 3
- **Loại:** Validation / Data integrity
- **Liên quan:** GUI-FR16-09, GUI-FR16-13, RETEST-FR16-03
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/13
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-09-1.png`,
	`HW#3/Submission/reports/assets/task1/GUI-FR16-09-2.png`,
	`HW#3/Submission/reports/assets/task1/GUI-FR16-13.txt`
- **Bước tái hiện:** Chọn CSV có name rỗng, price âm/không phải số,
	`category_id` rỗng, bằng 0, không phải số hoặc không tồn tại.
- **Kết quả mong đợi:** Preview đánh dấu từng dòng/cột lỗi, chặn Import và
	nêu lý do sửa.
- **Kết quả thực tế:** Không cảnh báo trước khi Import; `category_id` rỗng có
	thể bị fallback về danh mục mặc định.
- **Đề xuất:** Validate toàn bộ dòng trước khi bật nút Import; không dùng
	fallback để che dữ liệu lỗi.

### BUG-FR16-05: Nút Import không khóa ổn định khi thao tác liên tục

- **Severity:** 3
- **Loại:** GUI / Duplicate submission
- **Liên quan:** GUI-FR16-11, RETEST-FR16-05
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/14
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-11.txt`
- **Bước tái hiện:** Chọn CSV hợp lệ, làm chậm request bằng Network Throttling,
	sau đó nhấn liên tiếp hoặc dùng Enter/Space trên nút Import.
- **Kết quả mong đợi:** Nút chuyển thành `Đang import...`, bị disable ngay và
	chỉ phát sinh một request.
- **Kết quả thực tế:** Có thể thao tác Import lặp/feedback không khóa như mong
	đợi trong lúc request đang xử lý.
- **Đề xuất:** Khóa bằng state đồng bộ ở event handler, chống duplicate request
	ở frontend và backend, sau đó luôn reset state trong `finally`.

### BUG-FR16-06: Giao diện Import bị che/tràn ở viewport nhỏ

- **Severity:** 3
- **Loại:** Responsive GUI
- **Liên quan:** GUI-FR16-16
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/15
- **Bằng chứng:** `HW#3/Submission/reports/assets/task1/GUI-FR16-16-320-640.png`,
	`HW#3/Submission/reports/assets/task1/GUI-FR16-16-768-800.png`
- **Bước tái hiện:** Mở màn hình Import tại viewport 320x640 và 768x800.
- **Kết quả mong đợi:** Navigation không che vùng thao tác; input, preview và
	nút Import nằm trong viewport hoặc có cuộn có chủ ý.
- **Kết quả thực tế:** 320x640 bị navigation che vùng thao tác; 768x800 nút
	Import bị tràn sang phải.
- **Đề xuất:** Bố trí responsive theo breakpoint, cho phép wrap control Import
	và kiểm tra lại với zoom/keyboard.

## Usability issues từ report-task2

### UX-01: Nút Import khó nhận biết và cách xa control chọn file

- **Severity:** 3
- **Tần suất:** 3/7 người gặp
- **Heuristic:** H4 - Nhất quán và chuẩn
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/16
- **Bước/quan sát:** Người dùng tìm khu vực quản lý sản phẩm và mất thời gian
	nhận biết nút Import sau khi chọn file.
- **Kết quả mong đợi:** Nhóm chọn file, tên file và nút Import được đặt gần nhau,
	trạng thái bật/tắt và hành động tiếp theo dễ nhận biết.
- **Kết quả thực tế:** Khoảng cách/bố cục khiến một số người dùng lúng túng.
- **Khuyến nghị:** Đặt control trong cùng một nhóm, dùng label/hướng dẫn rõ và
	trạng thái disabled có lý do.
- **Bằng chứng:** Chưa có video/ảnh riêng; số liệu từ `report-task2.md`.

### UX-02: Sau khi bấm Sửa, giao diện không focus/scroll đến sản phẩm cần sửa

- **Severity:** 4
- **Tần suất:** 7/7 người gặp
- **Heuristic:** H4 - Nhất quán và chuẩn
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/17
- **Bước/quan sát:** Từ task `Tìm & Sửa giá`, bấm `Sửa` ở một sản phẩm trong
	danh sách dài và theo dõi vị trí hiển thị.
- **Kết quả mong đợi:** Form/dòng đang sửa được đưa vào vùng nhìn thấy; trạng
	thái sửa được nhận biết ngay.
- **Kết quả thực tế:** Người dùng không biết form sửa ở đâu hoặc phải tự cuộn,
	dẫn đến lúng túng và cần trợ giúp.
- **Khuyến nghị:** Scroll/focus đến form hoặc dòng tương ứng, thêm trạng thái
	nổi bật và thông báo ngắn.
- **Bằng chứng:** Quan sát 7/7 người trong `report-task2.md`; không có video.

### UX-03: Xóa danh mục không có xác nhận

- **Severity:** 4
- **Tần suất:** 7/7 người gặp
- **Heuristic:** H3 - Kiểm soát và tự do; H5 - Ngăn ngừa lỗi
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/18
- **Bước tái hiện:** Mở quản lý danh mục và nhấn `Xóa` một danh mục.
- **Kết quả mong đợi:** Confirm dialog cho phép xác nhận hoặc hủy trước khi
	xóa.
- **Kết quả thực tế:** Thao tác xóa không có bước xác nhận.
- **Khuyến nghị:** Thêm dialog `Bạn có chắc chắn muốn xóa danh mục này không?`
	và thông báo kết quả.
- **Bằng chứng:** Pain point 7/7 trong `report-task2.md`.

### UX-04: Không có khả năng hoàn tác sau khi xóa

- **Severity:** 4
- **Tần suất:** 6/7 người gặp
- **Heuristic:** H3 - Kiểm soát và tự do; H5 - Ngăn ngừa lỗi
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/19
- **Bước tái hiện:** Xóa một sản phẩm hoặc danh mục, sau đó tìm thao tác khôi
	phục/hoàn tác.
- **Kết quả mong đợi:** Có Undo trong thời gian ngắn hoặc đường dẫn khôi phục
	rõ ràng, nếu nghiệp vụ cho phép.
- **Kết quả thực tế:** Không có cơ chế hoàn tác trong giao diện.
- **Khuyến nghị:** Toast có nút `Hoàn tác` trong 5 giây hoặc xác nhận xóa
	mạnh hơn. Cần xác nhận đây là yêu cầu nghiệp vụ trước khi mở issue chức năng.
- **Bằng chứng:** Pain point 6/7 trong `report-task2.md`.

### UX-05: Danh sách lỗi import dài gây tràn màn hình

- **Severity:** 2
- **Tần suất:** 1/7 người gặp
- **Heuristic:** H4 - Nhất quán và chuẩn
- **GitHub Issue:** https://github.com/BDCALM/eshop-sut-for-HWork/issues/20
- **Bước tái hiện:** Import file có nhiều dòng lỗi để tạo danh sách error dài.
- **Kết quả mong đợi:** Danh sách lỗi có vùng cuộn riêng, vẫn giữ được nút và
	nội dung chính trong viewport.
- **Kết quả thực tế:** Các dòng lỗi làm panel kéo dài/tràn màn hình.
- **Khuyến nghị:** Đặt `max-height` và `overflow-y: auto`, đồng thời hiển thị
	tổng số lỗi và cho phép tải báo cáo chi tiết.
- **Bằng chứng:** [UX-05.png](../assets/task2/UX-05.png).

## Ma trận liên kết test và bug

| Bug report | Test/nguồn chính |
|---|---|
| BUG-FR15-01 | GUI-FR15-05, GUI-FR15-13, RETEST-FR15-03 |
| BUG-FR15-02 | GUI-FR15-08 |
| BUG-FR15-03 | GUI-FR15-09, RETEST-FR15-04 |
| BUG-FR15-04 | GUI-FR15-11, RETEST-FR15-02 |
| BUG-FR15-05 | GUI-FR15-12 |
| BUG-FR15-06 | GUI-FR15-17 |
| BUG-FR15-07 | GUI-FR15-23, RETEST-FR15-05 |
| BUG-FR15-08 | GUI-FR15-24, RETEST-FR15-05 |
| BUG-FR15-09 | RETEST-FR15-01 |
| BUG-FR16-01 | GUI-FR16-05, RETEST-FR16-01, RETEST-FR16-04 |
| BUG-FR16-02 | GUI-FR16-07 |
| BUG-FR16-03 | GUI-FR16-08, RETEST-FR16-02 |
| BUG-FR16-04 | GUI-FR16-09, GUI-FR16-13, RETEST-FR16-03 |
| BUG-FR16-05 | GUI-FR16-11, RETEST-FR16-05 |
| BUG-FR16-06 | GUI-FR16-16 |
| UX-01..UX-05 | `HW#3/Process/task2/report-task2.md` |