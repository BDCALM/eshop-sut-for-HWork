# Boundary Value Analysis Report

## Document control

| Field | Value |
| --- | --- |
| Student/group | `10` |
| SUT/version/commit | `[To be completed]` |
| Date updated | `2026-10-21` |
| Precondition | Gate A reviewed and approved |

## Rules

- Analyze only ordered domains supported by specification, UI, API, or source
  evidence.
- Record `Unresolved` when no boundary is defined; do not invent a limit.
- Use the appropriate precision unit (`alpha`).
- Vary one variable at a time and keep all others at valid nominal values.

## 1. FR-05 - Product listing and search

| ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-FR05-01 | Search value length | `0` characters | `Unresolved` | `1` character | `1` character | `0`, `1`, `2` characters; upper boundary remains unresolved | Empty search requests/displays the full product list; a non-empty value performs a search. | E-001,E-002; `FR05-01-default.png` | Evidence supplied; Gate B approved |
| BVA-FR05-02 | Product result cardinality | `0` results | `2+` results | `1` result | `0`, `1`, `2` results | `0`, `1`, `2` results represent the zero, one, and multiple-result boundary partitions. | Empty state for `0`; one matching product for `1`; multiple matching products for `2+`. | E-001,E-002; `FR05-04-searchNoResult.png`, `FR05-05-searchOneResult.png`, `FR05-06-searchTwo+Result.png` | Evidence supplied; Gate B approved |

## 2. FR-11 - User order history

| ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-FR11-01 | `[Order count/identifier/status]` | `[Value/Unresolved]` | `[Value/Unresolved]` | `[Unit]` | `[Value]` | `[Points]` | `[Output]` | `[E-xxx]` | `[Pending]` |

## 3. FR-19 - Admin user management

| ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-FR19-01 | `[User count/identifier]` | `[Value/Unresolved]` | `[Value/Unresolved]` | `[Unit]` | `[Value]` | `[Points]` | `[Output]` | `[E-xxx]` | `[Pending]` |

## 4. FR-20 - Mobile product browsing and order history

| ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-FR20-MOB-01 | `[Search/order count/identifier]` | `[Value/Unresolved]` | `[Value/Unresolved]` | `[Unit]` | `[Value]` | `[Points]` | `[Output]` | `[E-xxx]` | `[Pending]` |

## Boundary test cases

| Test ID | Feature | Variable varied | Input | Other variables at nominal values | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-TC-FR05-01 | FR-05 | Search value length | `""` (0 characters) | Nominal product data; no other variable varied | Full product list is requested/displayed. | `FR05-01-default.png` | Evidence supplied; execution result to record in Step C |
| BVA-TC-FR05-02 | FR-05 | Search value length | One-character matching fragment | Nominal product data; no other variable varied | Matching product result is displayed. | `FR05-03-searchOneChar.png` | Evidence supplied; execution result to record in Step C |
| BVA-TC-FR05-03 | FR-05 | Search value length | Two-character matching fragment | Nominal product data; no other variable varied | Matching product result is displayed; this is the `LB + 1` probe. | `[Mapping to supplied filename to confirm]` | Evidence supplied; mapping to confirm |
| BVA-TC-FR05-04 | FR-05 | Product result cardinality | Verified absent fragment (`0` results) | Valid non-empty search; request succeeds | Empty result state is displayed. | `FR05-04-searchNoResult.png` | Evidence supplied; execution result to record in Step C |
| BVA-TC-FR05-05 | FR-05 | Product result cardinality | Verified fragment yielding exactly `1` result | Valid non-empty search; request succeeds | Exactly one matching product is displayed. | `FR05-05-searchOneResult.png` | Evidence supplied; execution result to record in Step C |
| BVA-TC-FR05-06 | FR-05 | Product result cardinality | Verified fragment yielding `2+` results | Valid non-empty search; request succeeds | Multiple matching products are displayed. | `FR05-06-searchTwo+Result.png` | Evidence supplied; execution result to record in Step C |
| BVA-TC-FR05-07 | FR-05 | Search value length | 257-character search value | Valid product data; no other variable varied | Observe acceptance, truncation, rejection, or error. No pass/fail oracle is assigned until a maximum-length requirement is evidenced. | `BVA-TC-FR05-07.png` | Exploratory evidence supplied; unresolved oracle |

## Gate B review

| Review item | Status | Student correction/confirmation |
| --- | --- | --- |
| Every ordered domain has evidence | Approved | Search length has a known lower boundary; maximum length is unresolved. Result cardinality is evidence-backed as `0`, `1`, and `2+`. |
| LB/UB/alpha are justified | Approved | `alpha = 1` character/result; no unsupported upper search-length limit is invented. The 257-character probe remains exploratory. |
| One-variable-at-a-time constraint satisfied | Approved | Each BVA case varies either search length or result cardinality while other data remains nominal. |
| Gate B approved before Step C | Approved | Student approved Gate B on 2026-10-21; no corrections requested. |
