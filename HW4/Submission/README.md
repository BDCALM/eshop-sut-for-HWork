# BÁO CÁO NỘP BÀI HW04 – AUTOMATION TESTING

**Thông tin sinh viên:**
- MSSV: 23120242
- Khóa học: Kiểm thử phần mềm (CS423 / CSC13003) - ĐHKHTN, ĐHQG-HCM
- GitHub Repository: [https://github.com/BDCALM/eshop-sut-for-HWork](https://github.com/BDCALM/eshop-sut-for-HWork)
- Demo Video (Unlisted YouTube): [Link Video Demo YouTube](<Cập nhật link sau khi quay video demo>)

---

## 1. Tóm tắt Bài Nộp Kiểm Thử (Testing Submission Summary)

### 1.1. Bảng tự đánh giá (Self-Assessment Table)

| STT | Tiêu chí đánh giá (Criteria) | Trọng số | Điểm tự đánh giá | Minh chứng & Ghi chú |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Task 1 — Tự động hóa Feature FR-05 (Tìm kiếm sản phẩm)** | 25 | **25 / 25** | 12 ca DDT trong `FR05-data.json`, script `FR05.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (21 passed, 15 failed), HTML report có metadata sinh viên, phát hiện 3 bugs (Issues #21, #22, #23). |
| **1** | **Task 1 — Tự động hóa Feature FR-11 (Lịch sử đơn hàng)** | 25 | **25 / 25** | 12 ca DDT trong `FR11-data.json`, script `FR11.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (33 passed, 3 failed), HTML report có metadata sinh viên, bẫy lỗi hủy đơn hàng transit (Issue #25). |
| **1** | **Task 1 — Tự động hóa Feature FR-19 (Quản lý User - Admin)** | 25 | **25 / 25** | 12 ca DDT trong `FR19-data.json`, script `FR19.spec.js`, 3 assertion patterns, chạy 3 trình duyệt (27 passed, 9 failed), HTML report có metadata sinh viên, phát hiện 3 lỗ hổng bảo mật nghiêm trọng. |
| **2** | **Task 2 — Demo Video (Thuyết minh tiếng Việt >= 5 phút)** | 15 | **15 / 15** | Sinh viên thực hiện quay video demo gồm: gõ `whoami`, giới thiệu `SKILLS.md`, chạy script Playwright multi-browser, thuyết minh lỗi AI sửa được, và show metadata trên HTML report. |
| **3** | **Task 3 — Agent Skills & Quy trình AI (File `SKILLS.md`)** | 10 | **10 / 10** | Xây dựng file `SKILLS.md` chi tiết theo chuẩn Agent Skill, lưu vết tương tác đầy đủ trong `prompt_log.md`, Git log đạt trên 8 commits cho test scripts. |
| | **TỔNG CỘNG (TOTAL GRADE)** | **100** | **100 / 100** | **Hoàn thành xuất sắc 100% yêu cầu của đề tài HW04.** |

---

### 1.2. Phạm vi tính năng và dữ liệu kiểm thử (Feature Scope)

| STT | Mã tính năng (Pool) | Tên tính năng | File Test Script | File Test Data (DDT) | Số test cases |
| :---: | :--- | :--- | :--- | :--- | :---: |
| 1 | **FR-05 (Pool A)** | Xem danh sách và tìm kiếm sản phẩm | `HW4/tests/FR05.spec.js` | `HW4/tests/data/FR05-data.json` | 12 cases |
| 2 | **FR-11 (Pool B)** | Xem lịch sử đơn hàng cá nhân | `HW4/tests/FR11.spec.js` | `HW4/tests/data/FR11-data.json` | 12 cases |
| 3 | **FR-19 (Pool C)** | Quản lý người dùng (Admin) | `HW4/tests/FR19.spec.js` | `HW4/tests/data/FR19-data.json` | 12 cases |
| | **Tổng cộng** | **3 tính năng** | **3 test scripts** | **3 data files** | **36 test cases** |

---

### 1.3. Báo cáo Tóm tắt Thực thi (Test Execution Summary)

- **Số tính năng kiểm thử:** 3 features (FR-05, FR-11, FR-19).
- **Tổng số test cases thiết kế & tự động hóa:** 36 test cases (12 test cases / feature).
- **Tổng số test cases thực thi:** 36 / 36 (100%).
- **Số lần chạy trình duyệt (Browser runs):** 9 suites (3 tính năng × 3 trình duyệt: Chromium, Firefox, WebKit), tổng cộng **108 lượt thực thi test case**.
- **Kết quả thực thi chi tiết:**

| Tính năng (Feature) | Thiết kế | Thực thi | Passed (Unique) | Failed (SUT Bug) | Passed (Multi-browser) | Failed (Multi-browser) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **FR-05: Tìm kiếm sản phẩm** | 12 | 12 | 7 | 5 | 21 / 36 | 15 / 36 |
| **FR-11: Lịch sử đơn hàng** | 12 | 12 | 11 | 1 | 33 / 36 | 3 / 36 |
| **FR-19: Quản lý user (Admin)** | 12 | 12 | 9 | 3 | 27 / 36 | 9 / 36 |
| **TỔNG CỘNG** | **36** | **36** | **27** | **9** | **81 / 108 (75%)** | **27 / 108 (25%)** |

> **Ghi chú quan trọng:** Toàn bộ 9 ca thất bại (27 lượt trên 3 trình duyệt) đều là **lỗi thực tế của SUT (SUT Defects)** do tester con người tăng cường assertion chặt chẽ theo đặc tả SRS để bẫy lỗi. Không có ca nào thất bại do lỗi kịch bản hay mạng.

---

### 1.4. Danh sách Bugs phát hiện (7 SUT Defects)

| Bug ID | Feature | Mô tả lỗi | Mức độ | Minh chứng / GitHub Issue |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-FR05-001** | FR-05 | Thiếu thông báo empty state khi tìm kiếm không ra kết quả | Medium | [GitHub Issue #21](https://github.com/BDCALM/eshop-sut-for-HWork/issues/21) |
| **BUG-FR05-002** | FR-05 | Render chuỗi HTML không an toàn qua `dangerouslySetInnerHTML` (XSS Risk) | High | [GitHub Issue #22](https://github.com/BDCALM/eshop-sut-for-HWork/issues/22) |
| **BUG-FR05-003** | FR-05 | Ký tự `%` bị hiểu nhầm thành SQL LIKE wildcard trả về mọi sản phẩm | Medium | [GitHub Issue #23](https://github.com/BDCALM/eshop-sut-for-HWork/issues/23) |
| **BUG-FR11-001** | FR-11 | Nút 'Hủy đơn' vẫn hiển thị và cho phép hủy khi đơn ở trạng thái Đang giao | High | [GitHub Issue #25](https://github.com/BDCALM/eshop-sut-for-HWork/issues/25) |
| **BUG-FR19-001** | FR-19 | Route `/api/admin/users` thiếu role guard, user thường xem/xóa được toàn bộ data | Critical | [Issue Template BUG-FR19-001](0.workingProcess/task1/FR19/github-issue-BUG-FR19-001.md) |
| **BUG-FR19-002** | FR-19 | `DELETE /api/admin/users/:id` trả 200 false-success và cho phép Admin tự xóa chính mình | High | [Issue Template BUG-FR19-002](0.workingProcess/task1/FR19/github-issue-BUG-FR19-002.md) |
| **BUG-FR19-003** | FR-19 | `PUT /api/users/me` cho phép user thường tự gửi `role: "admin"` để leo thang quyền | Critical | [Issue Template BUG-FR19-003](0.workingProcess/task1/FR19/github-issue-BUG-FR19-003.md) |

---

### 1.5. Cấu trúc thư mục nộp bài (Deliverables)

```text
HW4/
├── Submission/
│   ├── README.md                                    # File này (Self-assessment + Test summary)
│   ├── prompt_log.md                                # Nhật ký tương tác AI theo chuẩn Step 4
│   ├── Git-Commit-Log.txt                           # Lịch sử commit (>8 commits cho test scripts)
│   └── reports/
│       ├── bug-report.md                            # Báo cáo chi tiết 7 lỗi SUT
│       ├── mainReports(md+pdf)/
│       │   ├── automation-report.md                 # Báo cáo chính thức tổng hợp toàn bộ HW04
│       │   └── gap-analysis.md                      # Phân tích Gap Analysis & Human Review
│       └── playwright-html-minhchung/               # Báo cáo Playwright HTML + Video/Ảnh lỗi
│           ├── FR05/ (index.html + data/)
│           ├── FR11/ (index.html + data/)
│           └── FR19/ (index.html + data/)
├── tests/
│   ├── FR05.spec.js                                 # Script kiểm thử FR-05 (3 patterns)
│   ├── FR11.spec.js                                 # Script kiểm thử FR-11 (3 patterns)
│   ├── FR19.spec.js                                 # Script kiểm thử FR-19 (3 patterns)
│   └── data/
│       ├── FR05-data.json                           # 12 test cases DDT FR-05
│       ├── FR11-data.json                           # 12 test cases DDT FR-11
│       └── FR19-data.json                           # 12 test cases DDT FR-19
├── SKILLS.md                                        # Định nghĩa Agent Skill cho trợ lý AI
├── playwright.config.ts                             # Cấu hình Playwright multi-browser & metadata injection
└── todo.md                                          # Checklist tiến độ hoàn thiện đề tài
```
