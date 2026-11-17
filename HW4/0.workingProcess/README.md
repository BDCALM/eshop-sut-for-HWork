# Process Reports — HW02 Domain Testing

## 1. Mục đích của thư mục

Thư mục này lưu các báo cáo quá trình thực hiện bài tập HW02 Domain Testing
trên hệ thống EShop. Nội dung tập trung vào cách nhóm kiểm thử đã:

- Phân tích requirement và phạm vi feature.
- Xây dựng Equivalence Partitioning (EP).
- Xác định Boundary Value Analysis (BVA).
- Thiết kế và ghi nhận việc thực thi test case.
- Kiểm soát các cổng phê duyệt Gate A, Gate B và Gate C.
- Ghi lại bằng chứng, giới hạn, giả định và các bước bàn giao giữa các phiên.

Đây là thư mục nhật ký tiến trình, không phải nơi chứa toàn bộ đặc tả yêu cầu
hay toàn bộ bảng test case chính. Các báo cáo chính nằm trong thư mục
`Submission/reports`.

## 2. Phạm vi kiểm thử

| Pool | Feature | Phạm vi |
| --- | --- | --- |
| A | FR-05 — Product listing and search | Xem danh sách và tìm kiếm sản phẩm |
| B | FR-11 — User order history | Xem lịch sử đơn hàng của người dùng |
| C | FR-19 — Admin user management | Quản lý người dùng bằng tài khoản Admin |
| D | FR-20 — Mobile application | Chỉ duyệt sản phẩm và xem lịch sử đơn hàng trên Mobile |

FR-20 không bao gồm mobile authentication, profile, cart, checkout hoặc
order cancellation.

## 3. Quy trình đọc báo cáo

Quy trình được thực hiện theo thứ tự:

```text
Step A — Feature Analysis & Equivalence Partitioning
    ↓ Gate A
Step B — Boundary Value Analysis
    ↓ Gate B
Step C — Test Case Engineering & Execution
    ↓ Gate C
Step D — Bug Reporting, Audit & Critique
```

Mỗi Gate là một điểm dừng bắt buộc. Chỉ chuyển sang bước tiếp theo sau khi
sinh viên đã review và xác nhận. Trạng thái `Pending`, `Unresolved`, `INFO`
hoặc `UI pending` không được tự động xem là `Passed`.

## 4. Danh sách file

### [1.StepA-Report.md](./1.StepA-Report.md)

Báo cáo Step A ban đầu: context gathering, evidence đã kiểm tra, biến đầu
vào/đầu ra và trạng thái Gate A của bốn scope.

### [2.next-session-stepB.md](./2.next-session-stepB.md)

File handoff cho phiên tiếp theo. File này nêu bối cảnh cần giữ lại, tài liệu
phải đọc, nguyên tắc BVA và các giới hạn không được tự suy đoán.

### [3.FR05-report.md](./3.FR05-report.md)

Báo cáo riêng của FR-05, gồm Step A, Step B, Step C, bằng chứng UI, kết quả
test case và trạng thái Gate. Đây là báo cáo tiến trình chi tiết của feature
Product listing and search.

### [4.FR11-report.md](./4.FR11-report.md)

Báo cáo tiến trình của FR-11 User order history, gồm các boundary về số lượng
đơn hàng, authentication, ownership, status và kết quả test case.

### [5.FR19-report.md](./5.FR19-report.md)

Báo cáo tiến trình của FR-19 Admin user management, gồm boundary về số lượng
customer user, target user ID, bằng chứng UI và các case thất bại cần trace
đến bug report.

### [6.FR20-report.md](./6.FR20-report.md)

Báo cáo tiến trình của phạm vi FR-20 Mobile product browsing/order history.
Báo cáo phân biệt bằng chứng API với bằng chứng UI và ghi rõ các case `INFO`,
`API Passed; UI pending` hoặc manual UI evidence khi có.

## 5. Báo cáo chính liên quan

Các file trong thư mục này liên kết với những báo cáo chính sau:

- [Domain-testing-report.md](../Submission/reports/main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md)
  — Equivalence Partitioning và Domain Test Cases.
- [Boundary-Value-Analysis-report.md](../Submission/reports/main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md)
  — Boundary Value Analysis và Gate B.
- [test-case-report.md](../Submission/reports/test-case-report.md)
  — Thiết kế, thực thi và tổng hợp test case.
- [bug-report.md](../Submission/reports/bug-report.md)
  — Bug đã được sinh viên quan sát và xác nhận.
- [SKILLS-Domain-Testing.md](../Submission/SKILLS-Domain-Testing.md)
  — Quy trình và nguyên tắc Domain Testing bắt buộc áp dụng.

## 6. Quy ước bằng chứng và trạng thái

- `Passed`: hành vi đạt expected result và có evidence tương ứng.
- `Failed`: hành vi không đạt expected result, có evidence và cần bug ID khi
  bug đã được xác nhận.
- `INFO`: có quan sát hoặc dữ liệu nhưng chưa có oracle đủ rõ để kết luận
  `Passed`/`Failed`.
- `Not yet executed`: test case đã thiết kế nhưng chưa thực thi.
- `Unresolved`: requirement, boundary hoặc oracle chưa được xác định bằng
  evidence đáng tin cậy.
- `API Passed; UI pending`: API đã được kiểm tra, nhưng chưa đủ bằng chứng
  để kết luận giao diện đạt.

Tên file screenshot chỉ là liên kết bằng chứng. Không được suy diễn nội dung
UI, expected result hoặc bug từ tên file nếu chưa có xác nhận phù hợp.

## 7. Quy tắc về bug và quyền sở hữu học thuật

Chỉ ghi nhận bug đã được sinh viên trực tiếp quan sát hoặc xác nhận. Các phần
`Bug Description` và `Root Cause Analysis` trong bug report thuộc quyền viết
của sinh viên. Báo cáo AI Audit và AI Critique cũng cần được sinh viên review,
đánh giá và hoàn thiện trước khi nộp.

