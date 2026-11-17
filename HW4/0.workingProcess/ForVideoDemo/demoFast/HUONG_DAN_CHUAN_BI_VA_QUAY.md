# HƯỚNG DẪN CHUẨN BỊ VÀ THỰC HÀNH QUAY VIDEO DEMO (>= 5 PHÚT)

Tài liệu này cung cấp danh sách chuẩn bị (Pre-flight Checklist) và các bước thực hành từng giây để bạn có thể tự tin bấm máy quay video demo đạt trọn vẹn điểm số của đề bài HW04 Task 2.

---

## 1. YÊU CẦU CỦA ĐỀ BÀI (TASK 2)

```text
"Record an unlisted YouTube video of at least 5 minutes, narrated in
Vietnamese, demonstrating one of your automation scripts running end to
end (including the multi-browser run and the generated HTML report).
Narrate at least one fix you made to the AI-generated script during your
review."
```

**Bốn tiêu chí chấm điểm bắt buộc:**
1. Thời lượng video: **Tối thiểu 5 phút** (Khuyến nghị: từ **5:15 đến 5:45** để an toàn, không bị thiếu giây).
2. Ngôn ngữ: **Thuyết minh hoàn toàn bằng tiếng Việt**.
3. Nội dung thực thi: Chạy kịch bản tự động hóa **End-to-End đa trình duyệt** (Chromium, Firefox, WebKit) và mở **Playwright HTML Report** có mã sinh viên `Run by: 23120242`.
4. Nội dung đánh giá: Thuyết minh rõ ràng **ít nhất một lỗi của AI** trong script và **cách bạn đã can thiệp sửa lỗi (Human Review)**.

---

## 2. CHUẨN BỊ MÔI TRƯỜNG TRƯỚC KHI BẤM NÚT QUAY

### Bước 1: Khởi động sẵn các dịch vụ nền (Local Servers)
Mở PowerShell riêng biệt để chạy Backend và Frontend (không tắt trong lúc quay):
- **Backend (Port 3000):**
  ```powershell
  cd h:\Source\src\eshop-sut-for-HWork\backend
  node server.js
  ```
  *(Kiểm tra thấy `Server running on port 3000`)*
- **Frontend Web (Port 5173 - dành cho FR-11):**
  ```powershell
  cd h:\Source\src\eshop-sut-for-HWork\frontend-web
  npm run dev
  ```
- **Frontend Admin (Port 5174 - nếu quay FR-19):**
  ```powershell
  cd h:\Source\src\eshop-sut-for-HWork\frontend-admin
  npm run dev
  ```

### Bước 2: Thiết lập phần mềm quay màn hình
- Bạn có thể dùng bất kỳ công cụ nào:
  - **OBS Studio:** Tốt nhất, chọn `Display Capture` (quay toàn màn hình độ phân giải 1080p).
  - **Xbox Game Bar (Có sẵn trên Windows):** Bấm tổ hợp phím `Win + G` -> Bấm nút Record (hoặc bấm `Win + Alt + R`).
  - **Clipchamp / Camtasia:** Rất tiện lợi nếu muốn vừa quay vừa xem trước.
- **Kiểm tra Micro:** Nói thử một câu vào mic để đảm bảo âm lượng to, rõ ràng, không bị rè hoặc quá nhỏ.

### Bước 3: Mở sẵn các Tab trong VS Code
Để không mất thời gian tìm file trong lúc quay, hãy mở sẵn các tab sau theo thứ tự:
1. `HW4/tests/data/FR11-data.json`
2. `HW4/tests/FR11.spec.js` (cuộn sẵn đến dòng 135 - 145)
3. `frontend-web/src/pages/Profile.jsx` (cuộn sẵn đến dòng 200 - 208)
4. `README.md` (cuộn sẵn đến Mục 5 - Quản lý đơn hàng)
5. `HW4/Submission/reports/bug-report.md` (cuộn sẵn đến mục `BUG-FR11-001`)

---

## 3. CÁC CÂU LỆNH SẴN SÀNG COPY-PASTE KHI QUAY

Khi quay, bạn chỉ cần copy và paste các câu lệnh sau vào Terminal của VS Code hoặc PowerShell:

### 1. Lệnh xác thực định danh (Phần 1):
```powershell
whoami; hostname; git branch
```

### 2. Lệnh chạy Playwright đa trình duyệt (Phần 4):
*Đối với FR-11 (Khuyến nghị số 1):*
```powershell
cd HW4
npx playwright test tests/FR11.spec.js --project=chromium --project=firefox --project=webkit
```

*Hoặc đối với FR-19 (Nếu chọn FR-19):*
```powershell
cd HW4
npx playwright test tests/FR19.spec.js --project=chromium --project=firefox --project=webkit
```

### 3. Lệnh mở HTML Report có mã sinh viên (Phần 5):
*Mở report FR-11 (thêm `--port 0` để tự động chọn port trống, tránh lỗi trùng port 9323):*
```powershell
npx playwright show-report --port 0 Submission/reports/playwright-html-minhchung/FR11
```
*(Nếu muốn mở report FR-19: `npx playwright show-report --port 0 Submission/reports/playwright-html-minhchung/FR19`)*.
*(Hoặc mở trực tiếp file trong trình duyệt: `H:\Source\src\eshop-sut-for-HWork\HW4\Submission\reports\playwright-html-minhchung\FR11\index.html`)*.

---

## 4. BÍ QUYẾT ĐIỀU CHỈNH THỜI GIAN ĐẠT TRÊN 5 PHÚT (KHÔNG BỊ THIẾU GIÂY)

Nhiều bạn sinh viên khi quay hay bị nói nhanh dẫn đến video chỉ được 3-4 phút (vi phạm yêu cầu bài tập). Để giữ thời lượng từ **5:15 đến 5:45 phút**:

1. **Ở Phần 2 (Giới thiệu 3 Assertion Patterns):** Nói thong thả, chỉ chuột vào từng dòng code, giải thích rõ:
   - Dòng này là Visibility assertion dùng để làm gì.
   - Dòng này là Navigation assertion xác thực URL ra sao.
   - Dòng này là Count assertion đếm số dòng dữ liệu trong bảng.
2. **Ở Phần 3 (Phân tích lỗi AI):** Dành trọn vẹn 1.5 phút:
   - Đọc câu yêu cầu trong `README.md`.
   - Giải thích vì sao AI lại mắc bẫy viết assert nông cạn.
   - Giải thích khái niệm "Test Oracle": không được đổi assertion theo code lỗi.
   - Mở file `Profile.jsx` dòng 200 và chỉ chuột vào câu lệnh `if` bị sai của frontend.
3. **Ở Phần 4 (Chạy test):** Trong lúc terminal đang chạy (khoảng 30-40 giây), hãy thuyết minh trực tiếp: *"Hệ thống đang chạy qua Chromium... Bây giờ đang chuyển sang Firefox... và WebKit... Chúng ta thấy các tick xanh vượt qua rất nhanh..."*.
4. **Ở Phần 5 (Mở Report & Xem ảnh lỗi):** Nhấp mở từng tab:
   - Tab Chromium -> Mở ảnh `test-failed-1.png`, rê chuột vào nút Hủy đơn màu đỏ.
   - Bấm nút Play trên video `video.webm` chạy 3-5 giây.
   - Mở file `bug-report.md` và đọc tóm tắt báo cáo bug.

---

## 5. HƯỚNG DẪN XUẤT BẢN YOUTUBE (CHẾ ĐỘ UNLISTED)

1. Sau khi quay xong, kiểm tra lại thời lượng file video xuất ra (ví dụ: `05:24` -> Hợp lệ).
2. Đăng nhập vào tài khoản Google / YouTube cá nhân.
3. Nhấp vào biểu tượng **Tạo (Create)** hình máy quay ở góc trên bên phải -> Chọn **Tải video lên (Upload video)**.
4. Chọn file video vừa quay.
5. Đặt tiêu đề video:
   ```text
   [HW04] AI-First Automation Testing & Human Review Demo - 23120242
   ```
6. Ở phần nội dung mô tả (Description), dán thông tin ngắn gọn:
   ```text
   Họ và tên: [Tên của bạn]
   MSSV: 23120242
   Môn học: Kiểm thử phần mềm
   Bài tập: HW04 - AI-First Automation Testing & Human Review
   Tính năng demo: FR-11 (Xem lịch sử đơn hàng & Ràng buộc trạng thái đơn hàng)
   Repository: https://github.com/BDCALM/eshop-sut-for-HWork
   ```
7. Chọn phần khán giả: "Không, nội dung này không dành cho trẻ em" (để không bị hạn chế tính năng).
8. **QUAN TRỌNG NHẤT - Ở BƯỚC "CHẾ ĐỘ HIỂN THỊ" (VISIBILITY):**
   - Chọn chế độ **Không công khai (Unlisted)**.
   - *Lưu ý:* Tuyệt đối KHÔNG chọn "Riêng tư (Private)" vì thầy cô/TA sẽ không xem được; cũng không bắt buộc phải chọn "Công khai (Public)".
9. Bấm **Lưu (Save)**.
10. Copy đường link YouTube (dạng `https://youtu.be/...`) để dán vào file báo cáo hoặc nộp theo quy định của môn học!
