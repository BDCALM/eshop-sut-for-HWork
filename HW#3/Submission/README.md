
## 1. Tóm tắt bài nộp kiểm thử (Testing Submission Summary)

### 1.1 Bảng tự đánh giá (Self-Assessment)

| STT | Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
| --- | --- | ---: | ---: |
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | 30 |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | 35 |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | 13.33 |
| 4 | Agent Skills | 10 | 10 |
|  | **Tổng cộng** | **100** | 88.33 |

### 1.2 Tóm tắt báo cáo GUI Checklist

Báo cáo GUI tập trung vào Web Admin, gồm quản lý sản phẩm (FR-15) và import
sản phẩm từ CSV (FR-16). Trong 40 test case, có **24 Pass, 16 Fail**, tỷ lệ
Pass **60%**. Kiểm thử được thực hiện trên máy Windows local bằng Firefox và
Google Chrome; các ảnh minh chứng được phân theo trình duyệt trong thư mục
`reports/assets/task3/`. Các viewport responsive được kiểm tra gồm 320x640,
768x800 và 1280x800.

Các vấn đề nổi bật gồm validation giá và dữ liệu CSV chưa đầy đủ, lỗi hiển thị
ảnh, cập nhật state sau khi sửa sản phẩm và bố cục import bị che/tràn ở viewport
nhỏ. Báo cáo cũng nêu rõ các phát hiện bổ sung cần phân biệt với 40 test case
gốc.

Chi tiết: [GUI-checklist-report.md](<./reports/mainReports(md+pdf)/GUI-checklist-report.md>)
và [GUI-checklist-FR15-FR16.md](<./reports/mainReports(md+pdf)/GUI-checklist-FR15-FR16.md>).

### 1.3 Tóm tắt Usability Evaluation

Đánh giá usability Web Admin tập trung vào hai nhiệm vụ: import CSV (T1) và
tìm/sửa giá sản phẩm (T2). Dữ liệu gồm **7 hồ sơ P1–P7**; SUS trung bình là
**41,79/100**, trung vị **42,5/100**. Đây là kết quả mô tả của mẫu nhỏ, không
đại diện cho toàn bộ người dùng.

Pain point đáng chú ý: khó nhận biết/tìm nút Import (**3/7**), khó hiểu vị trí
chỉnh sửa sau khi bấm Sửa (**7/7**), thiếu xác nhận khi xóa (**7/7**) và thiếu
Undo/restore (**6/7**). Báo cáo ghi rõ giới hạn nguồn: một số hồ sơ chưa có
video, và video hiện có chưa được xác nhận là bản ghi đầy đủ các thao tác task.

Chi tiết: [usability-evaluation-report.md](<./reports/mainReports(md+pdf)/usability-evaluation-report.md>)
và [report-task2.md](../Process/task2/report-task2.md).

### 1.4 Tóm tắt Bug Report

Bug report tổng hợp **20 mục**: **9 lỗi FR-15**, **6 lỗi FR-16** và **5 pain
point usability (UX-01–UX-05)**. Các lỗi GUI/chức năng tập trung vào validation,
phản hồi lỗi, xử lý CSV, cập nhật dữ liệu sản phẩm và responsive layout. Các
pain point usability được ghi riêng, kèm tần suất quan sát, mức độ severity và
liên kết GitHub Issue để phân biệt chúng với lỗi chức năng.

Chi tiết: [bug-report.md](./reports/bug-report.md).

### 1.5 Demo video

Video demo cách sử dụng Agent Skills

| Feature | YouTube link |
| --- | --- |
| SKILL.md | https://youtu.be/-AHqU5JWlpc?si=4gPo8ZwpDlHUP6wk |

### 1.6 Tài liệu tham khảo

- [ISTQB Foundation Level Syllabus](https://www.istqb.org/certifications/certified-tester-foundation-level)
- Hardman, P. (2025). _A Post-AI Learning Taxonomy._
- Fuster Rabella, M. (2025). _OECD Education Working Paper No. 338._
- Anthropic (2025). _Building Reliable AI Test Agents._
- [DeepEval documentation](https://docs.confident-ai.com/)
- [Promptfoo documentation](https://www.promptfoo.dev/docs/)