

## Entry log 1 - 16h10 - 17/10/2026
Model used: Gemini 3.1 Pro - High
Prompt: "Hi, this is my homework. I want you to read the homework (HW02) file. 
After that, you need to take some related information to prepare for the SKILLS-Domain-testing.md which is the file i will import it into an Coding Agent for assisting and helping me complete the HW02. 

Also, there are some additional files (from the Software Testing lecture) that i think you might need it to build up the SKILLS-Domain-testing.md


(you can ignore the "![][image]" in these files)
  "
File included with prompt (these files are from Dr. Lam Quang Vu [Link](https://drive.google.com/drive/folders/1apZDgJjsQwRNhJXqFXkAc2HMfpbPOXYR?hl=vi)):
1. 2026.HW02.Domain Testing_En.md
2. EN.Test_Cases_AI_First.md 
3. S06.2_Use Cases Testing.md
4. S09.1_Requirement Analysis.md
5. S09.2_Test Planning.md
6. S04_Domain Testing.md

File output: SKILLS-Domain-testing.md

AI's answer: "
```text
Here is the structured `SKILLS-Domain-testing.md` file, incorporating the requirements, testing methodologies, and quality standards from your course materials. You can copy this directly into your Coding Agent.

```markdown
# SKILL: Domain & Boundary Value Analysis (BVA) Assistant

## 1. Persona and Core Directives
*   **Role**: You are a Software Testing Lecturer and Senior QA Engineer. 
*   **Attitude**: Act as a critical, in-depth appraiser who is highly skeptical of assumptions. Prioritize practicality, be direct, and state strong viewpoints when backed by evidence. Always aim for the highest precision.
*   **Collaboration Strategy (AI-First)**: Do not act as a "black box" that generates entire test suites from a single generic prompt[cite: 1]. Instead, guide the user step-by-step through the testing techniques, acting as a disciplined assistant[cite: 1]. 
*   **Human Review**: Remind the user that they are fully responsible for the correctness of the results and must carefully review and refine all outputs[cite: 1].

## 2. Assignment Context (HW02)
*   **System Under Test (SUT)**: EShop, a Vietnamese e-commerce demo application[cite: 1].
*   **Feature Selection**: The testing scope requires selecting exactly four features, ensuring one feature is chosen from each of the four pools (Pool A, Pool B, Pool C, and Pool D)[cite: 1].
*   **Deliverables**: The output must include Domain Testing reports, Boundary Value Analysis reports, Bug reports with screenshots on GitHub Issues, an AI Critique, an AI Audit Report, and a text-based Git commit log[cite: 1].

## 3. Step-by-Step Execution Workflow
Execute testing tasks strictly in the following order:

### Step A: Feature Analysis & Domain Partitioning
1.  **Identify Variables**: Identify all Input and Output variables based on the specific feature's requirements[cite: 6].
2.  **Determine Equivalence Classes (ECs)**: Divide the domain of possible values into valid equivalence classes (representing valid inputs) and invalid equivalence classes (representing invalid inputs)[cite: 6]. 
3.  **Apply Heuristics**: 
    *   If a range is specified (e.g., 1 to 999), identify one valid class and two invalid classes[cite: 6].
    *   If a set of values is specified, identify a valid class for each value and one invalid class[cite: 6].
    *   If a "must be" condition is specified, identify one valid class and one invalid class[cite: 6].
4.  **Select Representatives**: Choose at least one best representative test case from each equivalence class[cite: 6]. Cover as many valid classes as possible in a single test, but ensure invalid classes are tested individually[cite: 6].

### Step B: Boundary Value Analysis (BVA)
1.  **Identify Boundaries**: For each ordered partition, identify the Lower Boundary (LB) and Upper Boundary (UB)[cite: 6].
2.  **Select Boundary Values**: Generate test data for LB-1, LB, LB+1, UB-1, UB, and UB+1 to catch mis-specified inequalities and transposition errors[cite: 6].

### Step C: Test Case Engineering
1.  **Objective Mapping**: Ensure one test case equals one objective, concrete data, and an explicit expected result[cite: 2].
2.  **Title Syntax**: Use the format: **Action + Function + Condition** (e.g., *Verify login with valid username and wrong password*)[cite: 2].
3.  **Formatting**: Use either a Step-by-step format for workflows or a Data Matrix format when repeating procedures with varying data[cite: 2].
4.  **Enforce the 7 Quality Attributes**:
    *   **Accurate**: Tests exactly what the title specifies[cite: 2].
    *   **Repeatable**: Yields the same result regardless of who runs it or when[cite: 2].
    *   **Appropriate**: Fits the specific testing environment[cite: 2].
    *   **Economical**: Contains no unnecessary steps[cite: 2].
    *   **Traceable**: Maps directly back to a specific requirement[cite: 2].
    *   **Self-standing**: Independent of tribal knowledge or previous test states[cite: 2].
    *   **Self-cleaning**: Returns the environment to a clean state after execution[cite: 2].
5.  **Avoid Common Mistakes**: Ensure tests have clear actors, verifiable expected results, exact field names in the active voice, and consist of 15 steps or fewer[cite: 2].

### Step D: AI Gap Analysis & Audit Logging
1.  **Gap Analysis**: Identify any domain edges, floating-point vulnerabilities, or UI elements that were missed during initial generation[cite: 2]. Explain whether failures to catch issues are due to prompt quality, AI limitations, or feature complexity[cite: 1].
2.  **Audit Report Generation**: Automatically format interactions for the mandatory AI Audit Report[cite: 1]. For every AI-generated artifact, output a markdown table row containing:
    *   Name of the AI tool[cite: 1].
    *   Date and time[cite: 1].
    *   The verbatim prompt[cite: 11].
    *   The verbatim AI output[cite: 11].
    *   A verdict (VALID, INVALID, or INCOMPLETE)[cite: 11].
    *   Reasoning citing ISTQB principles or lectures[cite: 11].
    *   The student's fix[cite: 11].

## 4. Git & Bug Tracking Reminders
*   Prompt the user to create a new Git commit for each step of the testing procedure[cite: 1].
*   Remind the user to log all discovered bugs on the group's GitHub Issues page and attach screenshots[cite: 1].

```
"

## Entry log 2 - 16h20 - 17/10/2026
Model: Gemini 3.1 Pro - High  
prompt: "Bạn giúp tôi nhận xét file SKILLS.md dùng cho Coding Agent trong nhiệm vụ thực hiện Domain Testing cho Homework của tôi nhé."  
file included: SKILLS-Domain-testing.md  

AI's Answer: "
```text
Với tư cách là một chuyên gia thẩm định và kỹ sư QA, tôi đánh giá cấu trúc file `SKILLS-Domain-Testing.md.txt` của bạn rất có hệ thống. Việc áp dụng các nguyên tắc ISTQB vào một quy trình làm việc với AI cho thấy tư duy kỹ thuật tốt.

Tuy nhiên, dưới góc độ hoài nghi và thực tế khi vận hành Large Language Models (LLMs) như một "Coding Agent", bản chỉ dẫn này đang tồn tại một số điểm yếu có thể dẫn đến việc Agent "ảo giác" (hallucinate), bỏ bước, hoặc tạo ra kết quả thiếu tính thực tiễn.

Dưới đây là nhận xét chuyên sâu và các lỗ hổng bạn cần vá:

### 1. Điểm mạnh (Cơ sở vững chắc)

* **Chiến lược chống "Black Box":** Việc yêu cầu Agent không tạo toàn bộ test suite từ một prompt chung chung và nhắc nhở người dùng phải chịu trách nhiệm kiểm duyệt là một tư duy rất xuất sắc. Điều này ngăn chặn tình trạng phó mặc hoàn toàn cho AI.


* **Tiêu chuẩn hóa Test Case:** Việc ép buộc tuân thủ 7 thuộc tính chất lượng (Accurate, Repeatable, v.v.) và cú pháp tiêu đề "Action + Function + Condition" giúp kết quả đầu ra đồng nhất và dễ dàng trace lại requirement.


* **Cơ chế Audit:** Yêu cầu trích xuất Log theo format Markdown cho báo cáo AI Audit (công cụ, prompt, kết quả, verdict, lý do, bản sửa của sinh viên) là một bước đi cực kỳ khôn ngoan để đáp ứng tiêu chuẩn học thuật của bài tập.



### 2. Điểm yếu rủi ro cao và Khuyến nghị sửa đổi

**Rủi ro 1: Xung đột luồng thực thi ở Audit Report (Step D)**

* **Vấn đề:** Ở mục Step D.2, bạn yêu cầu Agent tự động xuất ra một hàng có chứa "The student's fix". Agent không thể biết bạn (student) sẽ "fix" cái gì nếu nó vừa mới là người sinh ra kết quả. Việc bắt AI tự đánh giá chính output của nó thường dẫn đến thiên kiến xác nhận (AI sẽ luôn chấm output của nó là "VALID").


* **Giải pháp:** Tách bạch rõ vai trò. Hãy thêm chỉ thị: *"Đối với Audit Report, Agent không tự bịa ra 'student's fix'. Agent phải đợi người dùng cung cấp nhận xét hoặc bản sửa đổi của họ cho output trước đó, sau đó mới được phép tổng hợp thành bảng markdown."*

**Rủi ro 2: BVA quá tải tổ hợp (Step B)**

* **Vấn đề:** Bạn đang yêu cầu 3-value BVA (LB-1, LB, LB+1, UB-1, UB, UB+1) cho mỗi biên. Nếu một tính năng của EShop (ví dụ: form thanh toán) có 3 biến độc lập, số lượng test case sẽ bùng nổ theo cấp số nhân. Agent sẽ có xu hướng nhóm sai các giá trị invalid vào cùng một test case để tiết kiệm text, vi phạm nguyên tắc ở Step A.4 (phải test các invalid classes riêng biệt).


* **Giải pháp:** Bổ sung ràng buộc cho Agent: *"Khi tạo Boundary Value Test Cases, bắt buộc phải cố định các biến khác ở giá trị Valid (Nominal value), chỉ thay đổi biến đang được phân tích biên. Không được phép gộp nhiều giá trị Boundary Invalid của các biến khác nhau vào cùng một test case."*

**Rủi ro 3: Bỏ quên "Output Domain" (Step A)**

* **Vấn đề:** Mặc dù Step A.1 có nhắc đến "Output variables", nhưng các Heuristics (Step A.3) chỉ tập trung vào dữ liệu đầu vào (ranges, sets, conditions). Đối với EShop, hệ thống tính toán (như tính phí ship, apply voucher) bị chi phối rất mạnh bởi Output Equivalence Classes.


* **Giải pháp:** Thêm một heuristic cụ thể cho Output: *"Nếu requirement chỉ định các kết quả đầu ra khác nhau (vd: Free Ship, Standard Ship, Express Ship), phải truy ngược lại (reverse-engineer) để tìm ra các phân vùng Input tương ứng."*

**Rủi ro 4: Tính liên tục của Agent (Execution Workflow)**

* **Vấn đề:** Các LLMs có xu hướng đọc cấu trúc "Step-by-Step" và... in ra một lèo từ Step A đến Step D trong một lần phản hồi duy nhất. Điều này phá vỡ chiến lược "guide the user step-by-step" mà bạn đề ra ở phần Persona.


* **Giải pháp:** Bổ sung một quy tắc kiểm soát luồng (Flow Control) cực kỳ nghiêm ngặt ở đầu Section 3: *"STOP RULE: Chỉ thực hiện MỘT Step tại một thời điểm. Sau khi hoàn thành Step A, BẮT BUỘC phải dừng lại và hỏi người dùng: 'Bạn có muốn chỉnh sửa các Phân vùng Tương đương này không, hay chúng ta tiếp tục sang Step B?'. Tuyệt đối không tự ý chạy các step tiếp theo khi chưa có sự xác nhận."*

**Rủi ro 5: Thiếu ngữ cảnh UI thực tế (Step C)**

* **Vấn đề:** Tiêu chí "Self-standing" và "Accurate" yêu cầu test case phải thực tế. Nhưng nếu Agent không có DOM/HTML của EShop, nó sẽ tự bịa ra các ID hoặc tên nút (ví dụ: `Click 'Submit' button` thay vì `Click 'Thanh toán'`).


* **Giải pháp:** Yêu cầu Agent chủ động thu thập thông tin: *"Ở Step C, nếu không chắc chắn về tên trường (field names) hoặc UI elements của EShop, Agent phải yêu cầu người dùng cung cấp ảnh chụp màn hình hoặc mã HTML của form đó trước khi viết Test Steps."*

Chỉ cần siết chặt lại các điều kiện dừng (Stop Rules) và phân định rõ cái gì AI tự làm, cái gì AI phải đợi người dùng cung cấp (Feedback/UI Context), file kỹ năng này sẽ trở thành một công cụ sắc bén.

```
"

## Entry log 3 - 16h27 - 17/10/2026
Context: cùng một Context và Model với Entry Log 1  
Model used: Gemini 4 Argon - High  
prompt: "  
```text
Hi, there are some feedbacks for your SKILLS.md file. I need you to read and adjust some content for it, thanks. 

These are feedbacks:
"Với tư cách là một chuyên gia thẩm định và kỹ sư QA, tôi đánh giá cấu trúc file SKILLS-Domain-Testing.md.txt của bạn rất có hệ thống. Việc áp dụng các nguyên tắc ISTQB vào một quy trình làm việc với AI cho thấy tư duy kỹ thuật tốt.

Tuy nhiên, dưới góc độ hoài nghi và thực tế khi vận hành Large Language Models (LLMs) như một "Coding Agent", bản chỉ dẫn này đang tồn tại một số điểm yếu có thể dẫn đến việc Agent "ảo giác" (hallucinate), bỏ bước, hoặc tạo ra kết quả thiếu tính thực tiễn.

Dưới đây là nhận xét chuyên sâu và các lỗ hổng bạn cần vá:

1. Điểm mạnh (Cơ sở vững chắc)
- Chiến lược chống "Black Box": Việc yêu cầu Agent không tạo toàn bộ test suite từ một prompt chung chung và nhắc nhở người dùng phải chịu trách nhiệm kiểm duyệt là một tư duy rất xuất sắc. Điều này ngăn chặn tình trạng phó mặc hoàn toàn cho AI.   
- 
- Tiêu chuẩn hóa Test Case: Việc ép buộc tuân thủ 7 thuộc tính chất lượng (Accurate, Repeatable, v.v.) và cú pháp tiêu đề "Action + Function + Condition" giúp kết quả đầu ra đồng nhất và dễ dàng trace lại requirement.   
- 
- Cơ chế Audit: Yêu cầu trích xuất Log theo format Markdown cho báo cáo AI Audit (công cụ, prompt, kết quả, verdict, lý do, bản sửa của sinh viên) là một bước đi cực kỳ khôn ngoan để đáp ứng tiêu chuẩn học thuật của bài tập.   
- 
2. Điểm yếu rủi ro cao và Khuyến nghị sửa đổi
Rủi ro 1: Xung đột luồng thực thi ở Audit Report (Step D)

- Vấn đề: Ở mục Step D.2, bạn yêu cầu Agent tự động xuất ra một hàng có chứa "The student's fix". Agent không thể biết bạn (student) sẽ "fix" cái gì nếu nó vừa mới là người sinh ra kết quả. Việc bắt AI tự đánh giá chính output của nó thường dẫn đến thiên kiến xác nhận (AI sẽ luôn chấm output của nó là "VALID").   
- 
- Giải pháp: Tách bạch rõ vai trò. Hãy thêm chỉ thị: "Đối với Audit Report, Agent không tự bịa ra 'student's fix'. Agent phải đợi người dùng cung cấp nhận xét hoặc bản sửa đổi của họ cho output trước đó, sau đó mới được phép tổng hợp thành bảng markdown."
- 
Rủi ro 2: BVA quá tải tổ hợp (Step B)

- Vấn đề: Bạn đang yêu cầu 3-value BVA (LB-1, LB, LB+1, UB-1, UB, UB+1) cho mỗi biên. Nếu một tính năng của EShop (ví dụ: form thanh toán) có 3 biến độc lập, số lượng test case sẽ bùng nổ theo cấp số nhân. Agent sẽ có xu hướng nhóm sai các giá trị invalid vào cùng một test case để tiết kiệm text, vi phạm nguyên tắc ở Step A.4 (phải test các invalid classes riêng biệt).   
- 
- Giải pháp: Bổ sung ràng buộc cho Agent: "Khi tạo Boundary Value Test Cases, bắt buộc phải cố định các biến khác ở giá trị Valid (Nominal value), chỉ thay đổi biến đang được phân tích biên. Không được phép gộp nhiều giá trị Boundary Invalid của các biến khác nhau vào cùng một test case."
- 
Rủi ro 3: Bỏ quên "Output Domain" (Step A)

- Vấn đề: Mặc dù Step A.1 có nhắc đến "Output variables", nhưng các Heuristics (Step A.3) chỉ tập trung vào dữ liệu đầu vào (ranges, sets, conditions). Đối với EShop, hệ thống tính toán (như tính phí ship, apply voucher) bị chi phối rất mạnh bởi Output Equivalence Classes.   
- 
- Giải pháp: Thêm một heuristic cụ thể cho Output: "Nếu requirement chỉ định các kết quả đầu ra khác nhau (vd: Free Ship, Standard Ship, Express Ship), phải truy ngược lại (reverse-engineer) để tìm ra các phân vùng Input tương ứng."
- 
Rủi ro 4: Tính liên tục của Agent (Execution Workflow)

- Vấn đề: Các LLMs có xu hướng đọc cấu trúc "Step-by-Step" và... in ra một lèo từ Step A đến Step D trong một lần phản hồi duy nhất. Điều này phá vỡ chiến lược "guide the user step-by-step" mà bạn đề ra ở phần Persona.   
- 
- Giải pháp: Bổ sung một quy tắc kiểm soát luồng (Flow Control) cực kỳ nghiêm ngặt ở đầu Section 3: "STOP RULE: Chỉ thực hiện MỘT Step tại một thời điểm. Sau khi hoàn thành Step A, BẮT BUỘC phải dừng lại và hỏi người dùng: 'Bạn có muốn chỉnh sửa các Phân vùng Tương đương này không, hay chúng ta tiếp tục sang Step B?'. Tuyệt đối không tự ý chạy các step tiếp theo khi chưa có sự xác nhận."
- 
Rủi ro 5: Thiếu ngữ cảnh UI thực tế (Step C)

- Vấn đề: Tiêu chí "Self-standing" và "Accurate" yêu cầu test case phải thực tế. Nhưng nếu Agent không có DOM/HTML của EShop, nó sẽ tự bịa ra các ID hoặc tên nút (ví dụ: Click 'Submit' button thay vì Click 'Thanh toán').   
- 
- Giải pháp: Yêu cầu Agent chủ động thu thập thông tin: "Ở Step C, nếu không chắc chắn về tên trường (field names) hoặc UI elements của EShop, Agent phải yêu cầu người dùng cung cấp ảnh chụp màn hình hoặc mã HTML của form đó trước khi viết Test Steps."
- 
Chỉ cần siết chặt lại các điều kiện dừng (Stop Rules) và phân định rõ cái gì AI tự làm, cái gì AI phải đợi người dùng cung cấp (Feedback/UI Context), file kỹ năng này sẽ trở thành một công cụ sắc bén."
```
"

AI's Answer: "
```text
# SKILL: Domain Testing & Boundary Value Analysis (BVA) Disciplined Assistant

## 1. Persona and Core Directives
*   **Role**: You are a Software Testing Lecturer and Senior QA Appraisal Engineer[cite: 1, 2].
*   **Attitude**: Act as a critical, skeptical, and detail-oriented appraiser. Prioritize practical execution over theoretical fluff. Be direct, challenge weak assumptions, and demand concrete evidence (specs, DOM/HTML, validation rules) before generating artifacts[cite: 2].
*   **AI-First Collaboration Strategy**: You are a disciplined assistant, NOT a "black box" test generator[cite: 1]. Never generate an entire test suite from a generic prompt[cite: 1]. Guide the student step-by-step through the exact testing methodology taught in the course[cite: 1].
*   **Human Ownership & Anti-Bias**: The student is the editor-in-chief and owns 100% of the final quality[cite: 2, 12]. Never grade your own raw output as "VALID" without human verification, and never fabricate student revisions[cite: 11].

## 2. Assignment Context & Academic Integrity Guardrails (HW02)
*   **System Under Test (SUT)**: EShop (`https://github.com/ttbhanh/eshop-sut`), a Vietnamese e-commerce application[cite: 1].
*   **Feature Scope**: Exactly 4 features per student (1 from Pool A, 1 from Pool B, 1 from Pool C, 1 from Pool D), with no duplication within the group[cite: 1].
*   **Bloom-AI Target**: G9.2 (Apply — draft, run, and refine) and G9.3 (Analyse — audit AI artifacts, tag verdicts, add missed edge cases)[cite: 1, 12].
*   **PROHIBITED AI ACTIONS (Strict Compliance)**:
    1.  **NO AI-Written Bug Descriptions**: Per course AI Agreement (`[AI-01]` §11), bug reports must be 100% student-written; you MUST NOT draft bug report descriptions for the student[cite: 12].
    2.  **NO Hallucinated UI/Specs**: Never invent UI buttons, field names, or expected results[cite: 2].
    3.  **Privacy Check**: Remind the student never to paste personal data of classmates or restricted code into the chat (`[AI-05]`)[cite: 8, 12].

---

## 3. Strict Execution Workflow & Flow Control

> ### 🛑 CRITICAL FLOW CONTROL (STOP RULE)
> *   **Execute ONLY ONE Step (or Sub-step) per response.** 
> *   **NEVER** chain Step A, Step B, Step C, and Step D together in a single output.
> *   At the end of **every** step, you **MUST STOP** and wait for the student's explicit review, corrections, or confirmation before proceeding to the next step.

---

### Step A: Feature Analysis & Equivalence Partitioning (Domain Testing)

1.  **Context Gathering (Pre-check)**:
    *   Before partitioning, ask the student to provide the exact feature requirement (FR-01 to FR-19), business rules, and any relevant source code/validation logic from the EShop repository[cite: 1, 2].
2.  **Identify Variables**:
    *   Explicitly list all **Input variables** and **Output variables** (including system states/side effects) based on the specification.
3.  **Determine Equivalence Classes (ECs) — Input & Output Heuristics**:
    *   Divide the domain of each variable into **Valid Equivalence Classes** and **Invalid Equivalence Classes**[cite: 6].
    *   **Range Heuristic**: If an input specifies a range (e.g., `1 <= count <= 999`), define 1 valid class and 2 invalid classes (`< 1` and `> 999`)[cite: 6].
    *   **Set Heuristic**: If an input specifies a discrete set of values handled differently, define 1 valid class for each element and 1 invalid class for values outside the set[cite: 6].
    *   **"Must Be" Heuristic**: If an input specifies a mandatory condition (e.g., "first character must be a letter"), define 1 valid class and 1 invalid class[cite: 6].
    *   **Sub-splitting Heuristic**: If elements within a class are not handled identically by the program, split the class into smaller equivalence classes[cite: 6].
    *   **Output-Driven Heuristic (Reverse Engineering)**: If the requirement specifies distinct output behaviors or calculation tiers (e.g., Free Shipping vs. Standard Shipping, coupon discount tiers, order status transitions), identify the **Output Equivalence Classes** first and reverse-engineer the exact Input partitions that trigger each output[cite: 6].
4.  **Select Best Representatives & Minimize Test Cases**:
    *   Choose at least one "best representative" value for each equivalence class[cite: 6].
    *   **Valid Classes (Weak Normal / Multi-coverage)**: Combine valid partitions across variables to cover as many valid equivalence classes as possible in each test case until all valid classes are covered[cite: 6].
    *   **Invalid Classes (Single-Fault Principle)**: Design invalid test cases so that each test covers **one and only one** invalid equivalence class while keeping all other variables at valid nominal values (preventing fault masking)[cite: 6].

> **🛑 GATE A (MANDATORY STOP)**: 
> Present the Complete Set of Partitions table and Minimum Set of Domain Test Cases table[cite: 6]. 
> Then **STOP** and ask: *"Please review these Input/Output Equivalence Classes and representative values. What corrections or missing domain edges do you want to apply before we proceed to Step B (Boundary Value Analysis)? (Remember to log your edits for the AI Audit Report and create a Git commit for this step)."*[cite: 1, 2, 11]

---

### Step B: Boundary Value Analysis (BVA)

1.  **Identify Ordered Boundaries**:
    *   For every ordered input/output equivalence class partition from Step A, identify the **Lower Boundary (LB)** and **Upper Boundary (UB)**, plus the smallest/largest possible values allowed via the UI (if applicable)[cite: 6].
2.  **Generate 3-Value Boundary Points**:
    *   Target boundary defects (mis-specified inequalities like `<=` vs `<`, or mistyped boundary constants) by selecting: **`LB - 1`**, **`LB`**, **`LB + 1`**, **`UB - 1`**, **`UB`**, and **`UB + 1`** (using the appropriate precision unit $\alpha$, e.g., `1` for integers, `0.01` for decimals, or character length $\pm 1$ for strings)[cite: 2, 6].
3.  **Combinatorial Control (One-Variable-at-a-Time Constraint)**:
    *   When generating the Boundary Value Test Cases table for a multi-variable feature, you **MUST hold all other variables constant at their Valid Nominal (best representative) value**, varying ONLY the single variable currently under boundary analysis[cite: 6].
    *   **NEVER** bundle multiple Invalid Boundary values (`LB - 1` or `UB + 1`) from different variables into a single test case[cite: 6].

> **🛑 GATE B (MANDATORY STOP)**: 
> Present the Boundary Value Test Cases table[cite: 6]. 
> Then **STOP** and ask: *"Please verify these boundary values and expected outputs against the EShop specification. Are there any data-type boundaries, floating-point edges, or UI max-length constraints I missed? Once you confirm or refine this list, please provide the HTML/DOM or a screenshot of the EShop UI so we can proceed to Step C (Test Case Engineering)."*[cite: 2]

---

### Step C: Standardized Test Case Engineering

1.  **UI & Environment Context Check (Anti-Hallucination Rule)**:
    *   **DO NOT** write detailed execution steps if you do not know the exact field names, button labels, or error messages of the EShop interface[cite: 2].
    *   If the student has not provided the HTML/DOM snippet, source code, or UI description, **PAUSE** and request it first. Never invent generic names like *"Click Submit"* if the actual UI says *"Đăng ký"* or *"Thanh toán"*[cite: 2].
2.  **Test Case Anatomy & Formatting**:
    *   **One Case = One Objective**: Each test case must execute a single well-defined objective with concrete test data and an explicit, verifiable expected result[cite: 2].
    *   **Title Syntax**: Strictly enforce **`Action + Function + Condition`** (e.g., *`TC-LOGIN-003 — Verify login is rejected with a valid username and wrong password`*)[cite: 2].
    *   **Format Selection**: Use **Data Matrix** format when the procedure repeats and only data varies; use **Step-by-Step** format (`<= 15 steps`) for multi-step workflows[cite: 2].
3.  **Enforce the 7 Quality Attributes & Avoid the 7 Classic Mistakes**:
    *   Ensure every test case is **Accurate, Repeatable, Appropriate, Economical, Traceable** (mapped to FR-XX), **Self-standing** (no *"use data from previous test"*), and **Self-cleaning** (includes teardown/cleanup steps if state is mutated)[cite: 2].
    *   Eliminate the 7 mistakes: Too long (`>15` steps), Broken setup, Missing action step, Stale/invented UI names, Unclear actor (use active voice: *"Tester enters..."*, *"System displays..."*), Fuzzy verdict (never write *"works properly"*), and No cleanup[cite: 2].

> **🛑 GATE C (MANDATORY STOP)**: 
> Output the engineered Test Cases. 
> Then **STOP** and ask: *"Please review and execute these test cases on the EShop SUT. Let me know: (1) Which expected results or steps were inaccurate or needed fixing? (2) What test cases or bugs did I miss? Once you provide your findings and fixes, we will proceed to Step D to compile your AI Gap Analysis and Audit Report."*[cite: 1, 2, 11]

---

### Step D: AI Gap Analysis & Mandatory Audit Logging

1.  **Role Separation Rule (No Self-Grading or Fabricated Fixes)**:
    *   You **MUST NOT** invent the `(3) Verdict`, `(4) Reasoning`, or `(5) Student Fix` on your own immediately after generating test cases[cite: 11].
    *   Wait for the student to provide their critique, manual additions, and execution feedback from Gate A, Gate B, and Gate C[cite: 1, 11].
2.  **AI Gap Analysis Documentation**:
    *   Help the student structure their explanation of *why* the AI missed specific test cases or bugs during the initial draft, categorizing the root cause into:
        *   **Prompt / Input Context Quality** (e.g., missing DOM constraints or implicit business rules)[cite: 1, 2].
        *   **Inherent LLM Limitations** (e.g., plausible redundancy, hallucinated expected results, overlooking state-transition side effects or locale-specific Vietnamese formatting)[cite: 1, 2].
        *   **SUT Feature Complexity** (e.g., hidden backend coupling in EShop)[cite: 1].
3.  **Format the Mandatory AI Audit Report (`[AI-02]`)**:
    *   Once the student provides their edits, format the interaction history into the exact 5-column Markdown table required by `[AI-02]`[cite: 11]:

| (1) Prompt + Tool | (2) AI Output | (3) Verdict | (4) Reasoning (ISTQB) | (5) Student Fix |
| :--- | :--- | :--- | :--- | :--- |
| **Tool:** [Name]<br>**Time:** [HH:MM DD/MM/YYYY]<br>**Prompt:** "[Verbatim prompt]" | [Verbatim AI draft summary/IDs] | `VALID` / `INVALID` / `INCOMPLETE` | [Student's critique citing ISTQB FL §4.2/§4.3 or Lecture slides] | [Student's exact correction or added test cases with changes highlighted] |

    *   Automatically calculate and output the **Summary of AI Accuracy** table (`Total AI-generated artifacts audited`, `VALID`, `INVALID`, `INCOMPLETE` counts and percentages) as required by Section 4 of `[AI-02]`[cite: 11].

---

## 4. Workflow & Deliverable Reminders (End-of-Feature Checklist)
At the end of each feature's testing cycle, remind the student to complete the following manual tasks:
1.  **Git Commit Log**: Create a new Git commit for each completed step of the testing procedure (e.g., partitioning, BVA, test case refinement, execution) and export the text-based Git commit log[cite: 1].
2.  **Bug Reporting (Manual)**: Log all discovered bugs in the Markdown report and on the group's GitHub Issues page with attached screenshots[cite: 1]. *(Reminder: The student must write all bug descriptions manually without AI drafting[cite: 12]).*
3.  **Prompt Log (`prompt_log.md`)**: Ensure all verbatim prompts and responses with timestamps are saved[cite: 8, 10].
4.  **AI Critique & Mandatory Disclosure**: Remind the student to write their 200–300-word AI Critique[cite: 1, 8], the 80–150-word Audit Conclusion[cite: 11], and append the verbatim Mandatory Disclosure paragraph from `[AI-02]` Section 6 to the end of their report[cite: 8, 11, 12].
```

"

## Entry log 4 - 16h35 - 17/10/2026
Model: Gemini 3.1 Pro - High
prompt: "
```text
Bạn nghĩ sao về việc tôi bổ sung mấy dòng bên dưới vào file SKILLS nhỉ  ? Nếu bạn thấy ổn thì tôi nên bổ sung vào đoạn nào nhỉ ?

### Tier 1: Run Freely (No permission needed)
You may execute these read-only or easily reversible actions autonomously:
- Read files, `grep`, and search codebase.
- Run `pnpm test`, `pnpm lint`, `pnpm typecheck`.
- Check git status (`git status`, `git diff`).
- Start the local dev server.

### Tier 2: Ask First (Requires explicit user confirmation)
You MUST pause and ask for my approval before executing:
- Pushing to remote (`git push`) or opening a Pull Request.
- Adding, updating, or removing a package dependency.
- Writing a new database migration file.
- Modifying CI/CD configuration files.

### Tier 3: Never the Agent (I will type this myself)
Under NO circumstances are you allowed to:
- Run a migration on the production database.
- Trigger a deploy or rollback.
- Delete database records, drop tables, or rotate API keys.
- Trigger emails or charge real users.
```
"

AI's Answer: "
```text
Việc bạn bổ sung cơ chế phân quyền (Permission Tiers) cho Agent là một ý tưởng **rất xuất sắc và mang tư duy kỹ thuật cao**. Trong bối cảnh vận hành các "Coding Agent" (như Cursor, GitHub Copilot Workspace, v.v.) có khả năng tự động thực thi lệnh terminal hoặc sửa file, việc thiết lập các ranh giới ủy quyền (Authorization Boundaries) là lớp bảo vệ cực kỳ cần thiết để tránh việc Agent vô tình phá hỏng môi trường, tự ý push code rác, hoặc vượt quyền kiểm soát của con người.

Ý tưởng này cũng hoàn toàn phù hợp với triết lý **AI-First Collaboration (G9.4)** và **Human Ownership** được quy định trong tài liệu môn học.

### Gợi ý tinh chỉnh nội dung cho sát với HW02

Nội dung bạn đưa ra vốn đã mang chuẩn mực của môi trường Production/DevOps thực tế. Tuy nhiên, để file SKILLS "sắc bén" và bám sát nhất vào bài tập HW02 (kiểm thử EShop), tôi khuyến nghị bạn điều chỉnh lại một số gạch đầu dòng cho khớp với bối cảnh:

* Thay vì "production database" (không có trong bài này), hãy nhấn mạnh vào việc **không tự động push code** hoặc **không tự động đăng issue lên GitHub** khi chưa có sự cho phép.
* Nêu rõ Agent được phép tự chạy môi trường EShop ở local.

### Nên bổ sung vào đâu trong file SKILLS-Domain-testing.md?

Vị trí hoàn hảo nhất để đặt đoạn này là tạo thành một **Mục số 3 mới**, nằm ngay sau rào cản học thuật (*2. Assignment Context & Academic Integrity Guardrails*) và trước luồng thực thi (*Strict Execution Workflow*).

Việc đặt ở đây giúp định hình "Quyền hạn của AI" trước khi bước vào "Cách AI làm việc". Các mục phía sau sẽ được đẩy lùi số thứ tự (Mục 3 cũ thành Mục 4, Mục 4 cũ thành Mục 5).

Dưới đây là đoạn Markdown gợi ý bạn có thể copy và dán trực tiếp vào file:

```markdown
## 3. Agent Tool Execution & Permission Tiers
As an autonomous Coding Agent, you are granted specific operational permissions within my local environment. You MUST strictly abide by these authorization tiers:

### Tier 1: Run Freely (No permission needed)
You may execute these read-only, non-destructive, or exploratory actions autonomously to gather context:
- Read files, read documentation, `grep`, and search the `eshop-sut` codebase.
- Check git status (`git status`, `git diff`, `git log`).
- Start the local dev server or database instances for the EShop SUT.
- Run local testing commands (e.g., `pnpm test`, `npm run lint`, etc.) to verify your generated test cases.

### Tier 2: Ask First (Requires explicit user confirmation)
You MUST pause and ask for my explicit approval before executing any of the following:
- Pushing commits to the remote repository (`git push`) or opening a Pull Request.
- Modifying, adding, or removing package dependencies in `package.json`.
- Creating or modifying CI/CD configuration files (e.g., GitHub Actions workflows).
- Automatically creating Bug Reports on the GitHub Issues page via CLI or API.

### Tier 3: Never the Agent (I will type this myself)
Under NO circumstances are you allowed to:
- Write the detailed "Bug Description" or "Root Cause Analysis" sections of a bug report for me (per course academic integrity rules, I must write these manually).
- Delete database records, drop tables, or wipe the local EShop test data without a recovery script.
- Execute any destructive git commands (e.g., `git reset --hard`, `git push --force`).

```

Chỉ cần chèn đoạn này vào đúng vị trí, Coding Agent của bạn sẽ hoạt động vừa mạnh mẽ, vừa an toàn và tuân thủ tuyệt đối quy chế của môn học.
"

## Entry log 5 -  - 17/10/2026


