# Test Case Report

## 1. Environment and evidence

| Field | Value |
| --- | --- |
| SUT URL/build/commit | `[To be completed]` |
| Backend/API URL | `[To be completed]` |
| Web/mobile/admin environment | `[To be completed]` |
| Browser/device/OS | `[To be completed]` |
| Test data setup | `[To be completed]` |
| Cleanup/reset method | `[To be completed]` |

| Evidence ID | Route/API/source | Verified observation | Screenshot/link |
| --- | --- | --- | --- |
| E-001 | `[To be completed]` | `[Observation]` | `[Link/N/A]` |

## 2. FR-05 - Product listing and search

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 1.

Domain cases: `DT-FR05-01` through `DT-FR05-05`. Gate A was approved on
2026-10-18.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 1.

Seven FR-05 BVA probes (`BVA-TC-FR05-01` through `BVA-TC-FR05-07`) have been
designed. The student confirmed the UI evidence mapping on 2026-10-21.
`BVA-TC-FR05-07` remains exploratory because the repository has no evidence of
a 256-character maximum. Gate B was approved on 2026-10-21.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR05-001 | Display all products with an empty search | Product page is available; product request can complete | Search value `""` | Open product listing; leave search empty; submit or load the listing | Product list is displayed. | Product list displayed according to supplied UI evidence. | Passed | `FR05-01-default.png` | N/A | None |
| TC-FR05-002 | Search products with a one-character term | Product page is available; matching product exists | One-character matching term | Enter the term; submit search; inspect product results | Matching product result is displayed. | Matching result displayed according to supplied UI evidence. | Passed | `FR05-03-searchOneChar.png` | N/A | None |
| TC-FR05-003 | Search products with a two-character term | Product page is available; matching product exists | Two-character matching term | Enter the term; submit search; inspect product results | Matching product result is displayed. | Matching result displayed according to supplied UI evidence. | Passed | `FR05-02-searchEmpty.png` | N/A | None |
| TC-FR05-004 | Display empty state for a search with no results | Product page is available; request can complete | Verified absent product-name fragment | Enter the absent fragment; submit search; inspect results area | Empty result state is displayed without matching cards. | Empty result state displayed according to supplied UI evidence. | Passed | `FR05-04-searchNoResult.png` | N/A | None |
| TC-FR05-005 | Display exactly one matching product | Product page is available; term has one match | Verified one-result fragment | Enter the fragment; submit search; count displayed results | Exactly one matching product is displayed. | One result displayed according to supplied UI evidence. | Passed | `FR05-05-searchOneResult.png` | N/A | None |
| TC-FR05-006 | Display multiple matching products | Product page is available; term has multiple matches | Verified two-or-more-result fragment | Enter the fragment; submit search; count displayed results | Multiple matching products are displayed. | Multiple results displayed according to supplied UI evidence. | Passed | `FR05-06-searchTwo+Result.png` | N/A | None |
| TC-FR05-007 | Observe handling of a 257-character search value | Product page is available | Search value with 257 characters | Enter the value; submit search; record actual handling | Exploratory observation only; no pass/fail oracle exists without a documented maximum. | Handling recorded in supplied UI evidence; requirement oracle unresolved. | INFO | `BVA-TC-FR05-07.png` | N/A | None |

## 3. FR-11 - User order history

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 2.

Draft domain cases: `DT-FR11-01` through `DT-FR11-05`. These remain subject
to Gate A review.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 2.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR11-001 | `[To be completed]` | `[To be completed]` | `[To be completed]` | `[Steps]` | `[Observable result]` | `[To be executed]` | `Designed` | `[Link/N/A]` | `[N/A]` | `[To be completed]` |

## 4. FR-19 - Admin user management

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 3.

Draft domain cases: `DT-FR19-01` through `DT-FR19-07`. These remain subject
to Gate A review.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 3.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR19-001 | `[To be completed]` | `[To be completed]` | `[To be completed]` | `[Steps]` | `[Observable result]` | `[To be executed]` | `Designed` | `[Link/N/A]` | `[N/A]` | `[To be completed]` |

## 5. FR-20 - Mobile product browsing and order history

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 4.

Draft domain cases: `DT-FR20-MOB-01` through `DT-FR20-MOB-07`. These remain
subject to Gate A review.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 4.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR20-MOB-001 | `[To be completed]` | `[To be completed]` | `[To be completed]` | `[Steps]` | `[Observable result]` | `[To be executed]` | `Designed` | `[Link/N/A]` | `[N/A]` | `[To be completed]` |

## 6. Execution summary

| Feature | Designed | Executed | Passed | Failed | INFO | Not yet executed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-05 | 7 | 7 | 6 | 0 | 1 | 0 |
| FR-11 | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-19 | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-20 subsection | 0 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **7** | **7** | **6** | **0** | **1** | **0** |

## 7. Bugs and traceability

- Confirmed bugs: `0` until manually observed and documented.
- Bug report: [bug-report.md](./bug-report.md)
- Failed cases require real screenshot evidence and a bug ID where applicable.

## 8. Limitations and not-yet-executed work

`[Record unavailable environment, unresolved requirement, missing data, and
reason for each unexecuted case.]`
