
## 1 Tóm tắt bài nộp kiểm thử (Testing Submission Summary)

### 1.1 Bảng tự đánh giá (Self-Assessment)

| STT | Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
| --- | --- | ---: | ---: |
| 1 | Feature A — Domain và Boundary | 25 | 25 |
| 2 | Feature B — Domain và Boundary | 25 | 25 |
| 3 | Feature C — Domain và Boundary | 25 | 25 |
| 4 | Feature D — Mobile, Domain và Boundary | 15 | 10 |
| 5 | Agent Skills | 10 | 8 |
|  | **Tổng cộng** | **100** | 93 |

### 1.2 Phạm vi feature đã kiểm thử

| Pool | Feature | Phạm vi |
| --- | --- | --- |
| A | FR-05 — Product listing and search | Xem danh sách và tìm kiếm sản phẩm |
| B | FR-11 — User order history | Xem lịch sử đơn hàng của người dùng |
| C | FR-19 — Admin user management | Quản lý người dùng bằng tài khoản Admin |
| D | FR-20 — Mobile application | Duyệt sản phẩm và xem lịch sử đơn hàng trên Mobile |

**Số feature được kiểm thử:** 4

### 1.3 Tóm tắt test case

| Feature | Đã thiết kế | Đã thực thi | Passed | Failed | Chưa thực thi |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-05 | 6 | 6 | 6 | 0 | 0 |
| FR-11 | 6 | 6 | 6 | 0 | 0 |
| FR-19 | 6 | 6 | 4 | 2 | 0 |
| FR-20 | 11 | 11 | _Theo bằng chứng UI/API_ | 0 | _Cần đối chiếu UI_ |
| **Tổng cộng** | **29** | **29** | _Cập nhật sau khi chốt phân loại FR-20_ | **2** | _Cập nhật sau khi chốt phân loại FR-20_ |

> **Lưu ý:** Với FR-20, kết quả API chứng minh hành vi của endpoint nhưng không
> tự động thay thế bằng chứng hiển thị trên giao diện Mobile. Vì vậy, kết quả
> cuối cùng cần phân biệt rõ `API Passed`, `UI Passed`, `INFO` và `UI pending`
> theo báo cáo test case.

**Số bug đã xác nhận:** 2

- `BUG-FR19-001` — Admin có thể xóa chính tài khoản đang đăng nhập.
- `BUG-FR19-002` — User ID không hợp lệ trả về thông báo xóa thành công.

### 1.4 Demo video

Các video cần thể hiện end-to-end cách sử dụng Agent Skills trên một feature
hoàn chỉnh, từ phân tích domain đến thiết kế và thực thi test case.

| Feature | YouTube link |
| --- | --- |
| FR-05 | https://youtu.be/jlwLuDKltQQ |

### 1.5 Tài liệu tham khảo

- [ISTQB Foundation Level Syllabus](https://www.istqb.org/certifications/certified-tester-foundation-level)
- Hardman, P. (2025). _A Post-AI Learning Taxonomy._
- Fuster Rabella, M. (2025). _OECD Education Working Paper No. 338._
- Anthropic (2025). _Building Reliable AI Test Agents._
- [DeepEval documentation](https://docs.confident-ai.com/)
- [Promptfoo documentation](https://www.promptfoo.dev/docs/)