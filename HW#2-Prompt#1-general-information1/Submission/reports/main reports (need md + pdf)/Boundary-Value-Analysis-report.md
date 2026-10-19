# Boundary Value Analysis Report

## Document control

| Field | Value |
| --- | --- |
| Student/group | `10` |
| Date updated | `2026-10-19` |
| Feature completed in this step | FR-05 - Product listing and search |
| Precondition | Gate A for FR-05 approved |

## BVA rules applied

- The authoritative requirement source is the project `README.md`.
- No maximum search length or maximum result count is specified in
  `README.md`, the inspected UI, or the inspected product endpoint.
- Therefore no arbitrary upper boundary is introduced. It is recorded as
  `Unresolved`.
- Each BVA case changes one variable/domain only. Other data remains nominal.
- For a categorical set such as matching/no-match, BVA is not forced where
  there is no ordered numeric boundary; the observed result-count transition
  is used only where it has a meaningful `0/1/multiple` boundary.

## Evidence used

| Evidence ID | Source | Observation |
| --- | --- | --- |
| BVA-E-01 | Project `README.md`, FR-05 | Home page displays all products, searches by product name, shows loading, and shows an empty state for no results. |
| BVA-E-02 | `frontend-web/src/pages/Home.jsx` | Empty search is sent to the product endpoint; non-empty search is submitted; product result count is rendered when results are non-empty. |
| BVA-E-03 | `backend/server.js`, `GET /api/products?search=...` | Empty/falsy `search` returns all products; non-empty search returns rows matching the product-name `LIKE` query. |
| BVA-E-04 | Current seeded database | Five products are available; one verified name can produce one result, and an absent term can produce zero results. |

## 1. Ordered domains and boundaries

### 1.1 Search input length: empty versus non-empty

The requirement distinguishes an empty search from a non-empty search, but does
not define a maximum length.

| BVA ID | Variable/domain | LB | UB | Alpha | Nominal | Smallest/largest UI value | Boundary points | Expected observable output | Evidence | Review |
| --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- | --- |
| BVA-FR05-01 | Search text length | 0 characters | Unresolved | 1 character | `""` | Smallest: 0; largest: Unresolved | 0, 1 | At 0, all products are requested/displayed. At 1, a non-empty search request is sent; output depends on matches. | BVA-E-01,BVA-E-02,BVA-E-03 | Approved |

`LB-alpha` would be `-1` character and is not an executable UI input. It is
therefore excluded and documented rather than fabricated. `UB`, `UB-alpha`,
and `UB+alpha` cannot be generated until a real maximum is specified or
verified.

### 1.2 Product result cardinality

The feature requirement and current seed data support the observable result
classes `0`, `1`, and `multiple`. This is a result cardinality domain, not a
user-entered numeric field.

| BVA ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected observable output | Evidence | Review |
| --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- |
| BVA-FR05-02 | Search result count | 0 results | Unresolved for multiple result upper limit | 1 result | 1 verified match | 0, 1, 2+ observed results | 0: empty state; 1: one matching product; 2+: multiple matching products/list cards. | BVA-E-01,BVA-E-02,BVA-E-04 | Approved |

There is no specified maximum number of products or pagination boundary in the
available evidence. `2+` is therefore an observed multi-result class, not an
invented upper boundary.

## 2. Boundary Value Test Cases

All cases vary one FR-05 variable only. Product data, request availability,
and the UI surface remain nominal unless the row explicitly varies the request
state.

| Test ID | Variable varied | Input/controlled data | Other variables at nominal values | Expected observable result | Actual result | Status | Traceability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-TC-FR05-01 | Search text length | Empty string `""` (0 characters) | Product API available; seeded product data | All available products are requested and product cards/list are displayed. | Screenshot shows five product cards after empty search. | Passed | FR05-EC-01, BVA-FR05-01; [FR05-02-searchEmpty.png](../../screenshots/FR-05/FR05-02-searchEmpty.png) |
| BVA-TC-FR05-02 | Search text length | One-character non-empty term, e.g. `i` | Product API available; same seeded product data | A non-empty search request is sent; the returned result cardinality is recorded without assuming a specific count. | Screenshot shows term `i` and two matching product cards. | Passed | FR05-EC-02/03, BVA-FR05-01; [FR05-03-searchOneChar.png](../../screenshots/FR-05/FR05-03-searchOneChar.png) |
| BVA-TC-FR05-03 | Result cardinality | Search term producing 0 results | Same UI/API and nominal request state | Empty-result state is observable and no matching product card is displayed. | Screenshot shows no product card for `xyz-no-product-999`. | Passed | FR05-EC-03, BVA-FR05-02; [FR05-04-searchNoResult.png](../../screenshots/FR-05/FR05-04-searchNoResult.png) |
| BVA-TC-FR05-04 | Result cardinality | Search term producing exactly 1 result | Same UI/API and nominal request state | Exactly one matching product is displayed. | Screenshot shows one product card for `iPhone 15`. | Passed | FR05-EC-02, BVA-FR05-02; [FR05-05-searchOneResult.png](../../screenshots/FR-05/FR05-05-searchOneResult.png) |
| BVA-TC-FR05-05 | Result cardinality | Search term producing 2 or more results | Same UI/API and nominal request state | Multiple matching products are displayed. | Screenshot shows two product cards for `1`. | Passed | FR05-EC-02, BVA-FR05-02; [FR05-06-searchTwo+Result.png](../../screenshots/FR-05/FR05-06-searchTwo+Result.png) |

## 3. Boundary limitations

| Potential boundary | Status | Reason |
| --- | --- | --- |
| Maximum search string length | Unresolved | Not specified in project `README.md`, UI source, or endpoint contract inspected. |
| Allowed special-character length/format | Unresolved | No explicit input constraint was found; do not invent one. |
| Maximum product result count/pagination | Unresolved | No pagination or maximum result count was specified or observed. |
| Loading timing threshold | Unresolved | No measurable response-time threshold is specified. |

## Gate B review

| Review item | Status | Student correction/confirmation |
| --- | --- | --- |
| Every justified ordered domain has LB/UB/alpha | Approved | Student approved on 2026-10-19; no corrections |
| Unspecified limits are not invented | Approved | Student approved on 2026-10-19; no corrections |
| One-variable-at-a-time constraint satisfied | Approved | Student approved on 2026-10-19; no corrections |
| Gate B approved before Step C | Approved | Student approved on 2026-10-19; UI evidence for Step C will be provided later |
