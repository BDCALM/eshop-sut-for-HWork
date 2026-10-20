# Boundary Value Analysis Report

## Document control

| Field | Value |
| --- | --- |
| Student/group | `10` |
| Date updated | `2026-10-19` |
| Feature completed in this step | FR-05 and FR-11 sections |
| Precondition | Gate A approved for FR-05 and FR-11 |

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

## 4. FR-11 - User order history

### Evidence used

| Evidence ID | Source | Observation |
| --- | --- | --- |
| BVA-FR11-E-01 | Project `README.md`, FR-11 | Users can view only their own order history. |
| BVA-FR11-E-02 | `frontend-web/src/pages/Profile.jsx` | History renders order ID, date, total, translated status, and an empty-order message. |
| BVA-FR11-E-03 | `backend/server.js`, `GET /api/orders/my-orders` | Authenticated requests are filtered by `req.user.id` and sorted by descending order ID. |
| BVA-FR11-E-04 | `backend/database.js`, orders schema | Orders use integer IDs and a `pending` default status; no maximum count is specified. |

### BVA rules and boundary analysis

The evidence-backed ordered domain is order-history cardinality:

- LB: `0` orders.
- Alpha: `1` order.
- Observed multiple-order class: `2+` orders.
- UB: unresolved; no maximum order count or pagination limit is specified.
- `LB-alpha` is `-1` order and is not executable.

Authentication (`valid`, `missing`, `invalid`) and order status
(`pending`, `confirmed`, `shipping`, `delivered`, `canceled`) are
categorical/state domains. They remain equivalence-partition cases and are not
assigned artificial numeric boundaries.

| BVA ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected observable output | Evidence | Review |
| --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- |
| BVA-FR11-01 | Order count | 0 orders | Unresolved | 1 order | 1 own order | 0, 1, 2+ observed orders | At 0, the empty-order message is displayed. At 1, one order is displayed. At 2+, multiple own orders are displayed in descending ID order. | BVA-FR11-E-01 through BVA-FR11-E-04 | Pending |

### Boundary Value Test Cases

| Test ID | Variable varied | Input/controlled data | Other variables at nominal values | Expected observable result | Actual result | Status | Traceability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-TC-FR11-01 | Order count | User A with 0 orders | Authenticated User A; order-history endpoint available | Empty-order message is displayed. | UI evidence confirms the empty-order state. | Passed | FR11-EC-01/03, BVA-FR11-01; [FR-11-03-empty.png](../../screenshots/FR-11/FR-11-03-empty.png) |
| BVA-TC-FR11-02 | Order count | User A with exactly 1 own order | Authenticated User A; one own order | One order with ID, date, total, and translated status is displayed. | UI evidence confirms the one-order history state. | Passed | FR11-EC-01/04, BVA-FR11-01; [FR-11-01-exactOneOrder.png](../../screenshots/FR-11/FR-11-01-exactOneOrder.png) |
| BVA-TC-FR11-03 | Order count | User A with 2+ own orders | Authenticated User A; multiple own orders | All own orders are displayed in descending ID order. | UI evidence confirms the multiple-order history state. | Passed | FR11-EC-01/05, BVA-FR11-01; [FR-11-02-multiOrder.png](../../screenshots/FR-11/FR-11-02-multiOrder.png) |

Additional FR-11 evidence filenames supplied by the student:

- [FR-11-02-multiOrderSupported.png](../../screenshots/FR-11/FR-11-02-multiOrderSupported.png)
  - supplementary multi-order/status evidence;
- [FR-11-04-missingOrInvalidToken.png](../../screenshots/FR-11/FR-11-04-missingOrInvalidToken.png)
  - missing/invalid-token evidence;
- [FR11-05-userAOrders.png](../../screenshots/FR-11/FR11-05-userAOrders.png)
  and [FR11-05-userBOrders.png](../../screenshots/FR-11/FR11-05-userBOrders.png)
  - User A/User B ownership evidence.

### Boundary limitations

| Potential boundary | Status | Reason |
| --- | --- | --- |
| Maximum order count/pagination | Unresolved | No upper limit is specified or observed. |
| Order ID minimum/maximum | Unresolved | Integer primary key exists, but no user-facing ID range is specified. |
| Authentication token boundary | Not numeric | Valid, missing, and invalid are state classes. |
| Order status ordering | Not numeric | Supported status values are categorical. |

### Gate B review

| Review item | Status | Student correction/confirmation |
| --- | --- | --- |
| Every justified ordered domain has LB/UB/alpha | Approved | `Student approved on 2026-10-19; no corrections; 0/1/2+ order-count boundary documented` |
| Unspecified limits are not invented | Approved | `Student approved on 2026-10-19; maximum order count/pagination and order-ID range remain unresolved` |
| One-variable-at-a-time constraint satisfied | Approved | `Student approved on 2026-10-19; each BVA case varies order count only` |
| Gate B approved before Step C | Approved | `Student approved on 2026-10-19; no corrections` |

## 5. FR-19 - Admin user management

### Evidence used

| Evidence ID | Source | Observation |
| --- | --- | --- |
| BVA-FR19-E-01 | Project `README.md`, FR-19 | Admin can view all users without exposing passwords and may delete users except the currently logged-in administrator. |
| BVA-FR19-E-02 | `frontend-admin/src/App.jsx` | Admin UI loads users and sends delete requests using the selected user ID. |
| BVA-FR19-E-03 | `backend/server.js`, `/api/admin/users` | User listing selects user fields without password; delete endpoint accepts `:id` and uses authentication middleware. |
| BVA-FR19-E-04 | `backend/database.js`, users schema | User IDs are integer primary keys; seeded dataset contains an admin and a normal user. |

### BVA rules and boundary analysis

Customer-user-list cardinality is an observable count domain with classes `0`,
`1`, and `2+` customer users, while the logged-in admin remains a baseline
record. No maximum list size or pagination limit is specified.

Target user identity has an observed integer-ID representation, but no
user-facing minimum/maximum or malformed-ID contract is specified. Therefore
no arbitrary numeric upper boundary is introduced.

Authentication/role and current-admin protection are categorical/security
states, not numeric boundaries. The source does not establish that role or
current-admin checks are enforced by the backend, so those outcomes remain
verification targets.

| BVA ID | Variable/domain | LB | UB | Alpha | Nominal | Boundary points | Expected observable output | Evidence | Review |
| --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- |
| BVA-FR19-01 | Customer-user-list count | 0 customer users | Unresolved | 1 customer user | 1 listed customer user | 0, 1, 2+ customer users | At 0, the admin baseline is listed with no customer user. At 1, one customer user is listed. At 2+, multiple customer users are listed and password values are absent. | BVA-FR19-E-01 through BVA-FR19-E-04 | Pending |
| BVA-FR19-02 | Target user ID | Unresolved | Unresolved | 1 integer ID | Existing other-user ID | Existing ID; current-admin ID; absent ID; malformed ID | Existing other-user ID triggers the delete flow; current-admin, absent, and malformed IDs require observed protection/error behavior. | BVA-FR19-E-02 through BVA-FR19-E-04 | Pending |

### Boundary Value Test Cases

| Test ID | Variable varied | Input/controlled data | Other variables at nominal values | Expected observable result | Actual result | Status | Traceability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BVA-TC-FR19-01 | Customer-user-list count | Admin with 0 customer users | Admin authentication; user-management route available | Admin baseline remains listed and no customer user is listed. | UI evidence filename supplied by student. | Passed | FR19-EC-01/04, BVA-FR19-01; [FR-19-01-zeroUser.png](../screenshots/FR-19/FR-19-01-zeroUser.png) |
| BVA-TC-FR19-02 | Customer-user-list count | Admin with exactly 1 customer user | Admin authentication; one valid customer user record | Admin and one customer user are listed; password is not exposed. | UI evidence filename supplied by student. | Passed | FR19-EC-01/05, BVA-FR19-01; [FR-19-02-oneUser.png](../screenshots/FR-19/FR-19-02-oneUser.png) |
| BVA-TC-FR19-03 | Customer-user-list count | Admin with 2+ customer users | Admin authentication; multiple valid customer user records | Admin and multiple customer users are listed; password values are absent. | UI evidence filename supplied by student. | Passed | FR19-EC-01/05, BVA-FR19-01; [FR-19-03-multipleUser.png](../screenshots/FR-19/FR-19-03-multipleUser.png) |
| BVA-TC-FR19-04 | Target user ID | Existing other-user integer ID `3` | Admin authentication; target is not current admin | The selected other user is deleted and the refreshed list no longer contains that user. | UI evidence filename supplied by student. | Passed | FR19-EC-01/06, BVA-FR19-02; [FR-19-04-delUserID=3.png](../screenshots/FR-19/FR-19-04-delUserID=3.png) |
| BVA-TC-FR19-05 | Target user ID | Current-admin integer ID | Admin authentication; no other target variation | Current administrator remains in the user list and current admin access is protected. | UI shows deletion success; after refresh admin is absent from the list while the existing session remains active. | Failed | FR19-EC-01/07, BVA-FR19-02; [FR-19-05-delAdminUserSuccessfully.png](../screenshots/FR-19/FR-19-05-delAdminUserSuccessfully.png); `BUG-FR19-001` |
| BVA-TC-FR19-06 | Target user ID | Absent integer ID and malformed IDs | Admin authentication; one invalid identifier per request | Invalid identifiers produce an error or defined no-op response without false success. | Requests return `200 OK` with `{"message":"User deleted"}` for absent/malformed IDs; valid user list remains unchanged. | Failed | FR19-EC-08, BVA-FR19-02; [FR-19-06-deleteInvalidUser.md](../screenshots/FR-19/FR-19-06-deleteInvalidUser.md); `BUG-FR19-002` |

### Boundary limitations

| Potential boundary | Status | Reason |
| --- | --- | --- |
| Maximum user-list count/pagination | Unresolved | No upper limit is specified or observed. |
| User ID minimum/maximum | Unresolved | Integer primary key exists, but no user-facing range is specified. |
| Malformed identifier format | Unresolved | Endpoint parameter format and expected error are not defined by the checked evidence. |
| Role/current-admin authorization boundary | State/security domain | Must be verified at runtime; source does not prove the required checks. |

### Gate B review

| Review item | Status | Student correction/confirmation |
| --- | --- | --- |
| Every justified ordered domain has LB/UB/alpha | Approved | `Student approved on 2026-10-20; no corrections; 0/1/2+ user-list boundary documented` |
| Unspecified limits are not invented | Approved | `Student approved on 2026-10-20; list size/pagination and user-ID range remain unresolved` |
| One-variable-at-a-time constraint satisfied | Approved | `Student approved on 2026-10-20; each case varies one domain only` |
| Gate B approved before Step C | Approved | `Student approved on 2026-10-20; no corrections` |
