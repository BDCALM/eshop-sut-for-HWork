# Boundary Value Analysis Report

## Document control

| Field | Value |
| --- | --- |
| Student/group | `[To be completed]` |
| SUT/version/commit | `[To be completed]` |
| Date updated | `[YYYY-MM-DD]` |
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
| BVA-FR05-01 | `[Search length/result cardinality]` | `[Value/Unresolved]` | `[Value/Unresolved]` | `[Unit]` | `[Value]` | `[LB-a, LB, LB+a, UB-a, UB, UB+a]` | `[Output]` | `[E-xxx]` | `[Pending]` |

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
| BVA-TC-001 | `[FR-xx]` | `[Variable]` | `[Value]` | `[Nominal data]` | `[Observable result]` | `[To be executed]` | `Not yet executed` |

## Gate B review

| Review item | Status | Student correction/confirmation |
| --- | --- | --- |
| Every ordered domain has evidence | `[Pending]` | `[To be completed]` |
| LB/UB/alpha are justified | `[Pending]` | `[To be completed]` |
| One-variable-at-a-time constraint satisfied | `[Pending]` | `[To be completed]` |
| Gate B approved before Step C | `[Pending]` | `[To be completed]` |
