# Domain Testing Report

## Document control

| Field | Value |
| --- | --- |
| Student/group | `10` |
| Date updated | `2026-10-18` |
| Scope | FR-05, FR-11, FR-19, and selected FR-20 subsection |
| Method | Equivalence Partitioning and Domain Testing |

## Rules and evidence

- Classes below are based on the checked feature inventory and source files.
- A class is marked `Unresolved` where the source/specification does not
  establish a constraint or oracle.
- Valid domain tests may multi-cover valid classes. Invalid tests vary one
  invalid class while keeping other variables nominal.
- `Expected output` means the observable result to verify; implementation
  behavior that conflicts with the requirement is not silently treated as
  correct.

| Evidence ID | Source/route/file | Verified observation |
| --- | --- | --- |
| E-001 | `README.md (of the project)`, FR-05 | Product listing/search supports loading and empty-result states. |
| E-002 | `frontend-web/src/pages/Home.jsx` | Empty search requests all products; non-empty search submits `search`; result count appears for non-empty results. |
| E-003 | `frontend-mobile/App.js` | Mobile product flow has loading, error, product-list, search, and empty-array branches. |
| E-004 | `backend/server.js`, `GET /api/orders/my-orders` | Authenticated orders are filtered by `req.user.id` and sorted by descending ID. |
| E-005 | `frontend-mobile/App.js`, `renderProfile` | Mobile history shows order ID, localized date, formatted total, mapped status, and an empty-order message. |
| E-006 | `README.md (of the project)`, FR-19 | Admin may view users without passwords and delete users except the current administrator. |
| E-007 | `backend/server.js`, `/api/admin/users` | User list query omits password; inspected admin endpoints use authentication middleware but show no explicit role/current-admin check. |
| E-008 | `frontend-admin/src/App.jsx` | Admin UI has user list and delete action; login UI checks the returned role before storing the token. |
| E-009 | `frontend-mobile/App.js`, mobile product/history flow | FR-20 selected scope reuses mobile browsing and authenticated order history; cancellation is excluded. |

## 1. FR-05 - Product listing and search

### Requirement and scope

- In scope: displaying products, submitting a product-name search, and
  observable loading, error, and empty-result states.
- Out of scope: product detail, cart, checkout, and product administration.
- Search maximum length, accepted character set, and dedicated no-results
  message are not defined by the checked evidence.

### Input/output variables

| ID | Type | Variable | Evidence-backed domain |
| --- | --- | --- | --- |
| FR05-V01 | Input | Search value | Empty value; non-empty text. Maximum length/character restrictions unresolved. |
| FR05-V02 | State | Product/request state | Loading; successful response with products; successful response with no products; error response. |
| FR05-O01 | Output | Product result | Product cards/list; empty result rendering; error rendering. |

### Complete input/output equivalence classes

| EC ID | Variable | Valid/invalid | Condition/domain | Representative | Expected observable output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR05-EC-01 | Search value | Valid | Empty search | `""` | All available products are requested/displayed. | E-001,E-002 | Pending |
| FR05-EC-02 | Search value | Valid | Non-empty text matching one or more names | A verified product-name fragment | Matching products are returned/displayed. | E-001,E-002 | Pending |
| FR05-EC-03 | Search value | Valid | Non-empty text matching no product | Verified absent name fragment | Empty result is observable; exact message remains unresolved. | E-001,E-002 | Pending |
| FR05-EC-04 | Product/request state | Valid state | Loading request | Controlled delayed request | Loading indicator/state is observable where implemented. | E-001,E-003 | Pending |
| FR05-EC-05 | Product/request state | Valid state | Request/database error | Controlled error response | Error state is observable. | E-001,E-002,E-003 | Pending |
| FR05-EC-06 | Search value | Invalid/unresolved | Unsupported length/characters | `[Value after constraint is confirmed]` | Cannot define an oracle until a UI/API constraint is verified. | E-002 | Pending |

### Minimum domain test cases

| ID | ECs covered | Representative data | Single-fault check | Expected output | Traceability |
| --- | --- | --- | --- | --- | --- |
| DT-FR05-01 | EC-01 | Empty search, nominal product data | Valid nominal | Product list is displayed. | FR-05/EC-01 |
| DT-FR05-02 | EC-02 | Matching product-name fragment | Valid nominal | Matching product cards are displayed. | FR-05/EC-02 |
| DT-FR05-03 | EC-03 | Absent product-name fragment | Valid nominal | Empty result is displayed without matching cards. | FR-05/EC-03 |
| DT-FR05-04 | EC-04 | Delayed product response | Valid nominal | Loading state is observable during request. | FR-05/EC-04 |
| DT-FR05-05 | EC-05 | Controlled request error | One error state only | Error state is displayed. | FR-05/EC-05 |

## 2. FR-11 - User order history

### Requirement and scope

- In scope: authenticated users viewing only their own orders, including ID,
  date, total, and translated current status.
- Out of scope: checkout, admin order management, and mobile cancellation.
- The order-detail endpoint exists without authentication middleware in the
  inspected source; its security oracle requires explicit runtime/spec review.

### Input/output variables

| ID | Type | Variable | Evidence-backed domain |
| --- | --- | --- | --- |
| FR11-V01 | State | Authentication | Valid authenticated token; missing/invalid token. |
| FR11-V02 | State | Order count for current user | Zero; one; multiple orders. |
| FR11-V03 | Data | Order status | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; unknown status fallback is implementation behavior. |
| FR11-O01 | Output | History contents | Own orders only, descending ID; ID/date/total/status fields; empty state when no orders. |

### Complete input/output equivalence classes

| EC ID | Variable | Valid/invalid | Condition/domain | Representative | Expected observable output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR11-EC-01 | Authentication | Valid | Authenticated current user | Valid token for User A | User A's history can be loaded. | E-004,E-005 | Pending |
| FR11-EC-02 | Authentication | Invalid | Missing or invalid token | No token / invalid token | Access is rejected rather than returning a history. | E-004 | Pending |
| FR11-EC-03 | Order count | Valid | No orders for current user | User A with zero orders | Mobile empty-order message is displayed. | E-005 | Pending |
| FR11-EC-04 | Order count | Valid | Exactly one own order | User A with one order | One order with required fields is displayed. | E-004,E-005 | Pending |
| FR11-EC-05 | Order count | Valid | Multiple own orders | User A with two or more orders | All own orders are displayed in descending ID order. | E-004,E-005 | Pending |
| FR11-EC-06 | Order status | Valid | Supported status value | One order per supported status | Status is translated to the observed Vietnamese label. | E-005 | Pending |
| FR11-EC-07 | Ownership | Invalid/security | Attempt to obtain another user's order through own-history flow | User A token, User B order | User B's order must not appear in User A history. | E-004 | Pending |

### Minimum domain test cases

| ID | ECs covered | Representative data | Single-fault check | Expected output | Traceability |
| --- | --- | --- | --- | --- | --- |
| DT-FR11-01 | EC-01,EC-04,EC-06 | User A, one own order, `pending` | Valid multi-cover | One own order with ID/date/total/status is shown. | FR-11/EC-01,04,06 |
| DT-FR11-02 | EC-01,EC-05,EC-06 | User A, multiple own orders with supported statuses | Valid multi-cover | All own orders are shown in descending ID order with translated statuses. | FR-11/EC-01,05,06 |
| DT-FR11-03 | EC-01,EC-03 | User A, no orders | Valid multi-cover | Empty-order state is shown. | FR-11/EC-01,03 |
| DT-FR11-04 | EC-02 | Missing/invalid token | One invalid class only | Request is rejected; no order history is returned. | FR-11/EC-02 |
| DT-FR11-05 | EC-07 | User A token, User B order data | One ownership violation only | User B order is not exposed through User A history. | FR-11/EC-07 |

## 3. FR-19 - Admin user management

### Requirement and scope

- In scope: authorized admin viewing users without passwords and deleting a
  user other than the currently logged-in administrator.
- Out of scope: admin authentication implementation, role administration,
  bulk selection, and unrelated admin modules.
- The inspected backend does not prove role authorization or current-admin
  protection; these remain verification targets, not assumed results.

### Input/output variables

| ID | Type | Variable | Evidence-backed domain |
| --- | --- | --- | --- |
| FR19-V01 | State | Authentication/role | Admin; ordinary user; missing/invalid token. |
| FR19-V02 | State | User-list cardinality | Zero; one; multiple users. |
| FR19-V03 | Input | Target user identity | Other user; current admin; nonexistent/malformed identifier. |
| FR19-O01 | Output | User list/delete result | User data excluding password; successful deletion or protected/error result. |

### Complete input/output equivalence classes

| EC ID | Variable | Valid/invalid | Condition/domain | Representative | Expected observable output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR19-EC-01 | Auth/role | Valid | Authenticated admin | Admin token | User management is accessible. | E-006,E-008 | Pending |
| FR19-EC-02 | Auth/role | Invalid | Ordinary-user token | User token | Admin operation is rejected. | E-006,E-007 | Pending |
| FR19-EC-03 | Auth/role | Invalid | Missing/invalid token | No token / invalid token | Operation is rejected. | E-007 | Pending |
| FR19-EC-04 | User count | Valid | Empty list | Dataset with zero users | Empty user-list state is observable; exact UI message unresolved. | E-006,E-008 | Pending |
| FR19-EC-05 | User count | Valid | One or more users | Dataset with one/multiple users | Users are listed without password values. | E-006,E-007,E-008 | Pending |
| FR19-EC-06 | Target identity | Valid | Other user's existing ID | Existing non-admin user ID | Target user is deleted and list refreshes. | E-006,E-008 | Pending |
| FR19-EC-07 | Target identity | Invalid/protected | Current admin ID | Logged-in admin ID | Current administrator is not deleted. | E-006 | Pending |
| FR19-EC-08 | Target identity | Invalid | Nonexistent or malformed ID | Verified absent/malformed ID | Error/no-op behavior must be verified; source does not establish it. | E-007 | Pending |

### Minimum domain test cases

| ID | ECs covered | Representative data | Single-fault check | Expected output | Traceability |
| --- | --- | --- | --- | --- | --- |
| DT-FR19-01 | EC-01,EC-05 | Admin token, one/multiple users | Valid multi-cover | Users are listed and no password field is exposed. | FR-19/EC-01,05 |
| DT-FR19-02 | EC-01,EC-04 | Admin token, empty user dataset | Valid multi-cover | Empty list state is shown. | FR-19/EC-01,04 |
| DT-FR19-03 | EC-01,EC-06 | Admin token, other user's existing ID | Valid action | Other user is deleted and result is observable. | FR-19/EC-01,06 |
| DT-FR19-04 | EC-02 | Ordinary-user token | One invalid class only | Admin operation is rejected. | FR-19/EC-02 |
| DT-FR19-05 | EC-03 | Missing/invalid token | One invalid class only | Operation is rejected. | FR-19/EC-03 |
| DT-FR19-06 | EC-01,EC-07 | Admin token, current admin ID | Protected target only | Current admin remains. | FR-19/EC-01,07 |
| DT-FR19-07 | EC-08 | Admin token, invalid/nonexistent ID | One invalid class only | Verified error/no-op behavior is recorded. | FR-19/EC-08 |

## 4. FR-20 - Mobile product browsing and order history

### Requirement and scope

- In scope: mobile product listing/search and authenticated mobile order
  history.
- Out of scope: mobile authentication, profile editing, cart, checkout, and
  order cancellation.
- Mobile browsing reuses the product-state classes from FR-05; mobile history
  reuses the ownership/count/status classes from FR-11.

### Input/output variables

| ID | Type | Variable | Evidence-backed domain |
| --- | --- | --- | --- |
| FR20-V01 | Input/state | Mobile search/product request | Empty/non-empty search; loading; products; no products; error. |
| FR20-V02 | State | Mobile authenticated history | Authenticated current user; no/one/multiple own orders. |
| FR20-O01 | Output | Mobile browsing/history | Product cards/search result state; order ID/date/total/translated status; empty history state. |

### Complete equivalence classes

| EC ID | Variable | Valid/invalid | Condition/domain | Representative | Expected observable output | Evidence | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR20-EC-01 | Product search | Valid | Empty search | `""` | Mobile product list is loaded. | E-003,E-009 | Pending |
| FR20-EC-02 | Product search | Valid | Matching search | Verified product fragment | Matching mobile products are shown. | E-003,E-009 | Pending |
| FR20-EC-03 | Product result | Valid | No matching product | Absent fragment | Empty product result is observable. | E-003 | Pending |
| FR20-EC-04 | Product request | Valid state | Loading/error | Delayed/error request | Loading or error state is observable. | E-003 | Pending |
| FR20-EC-05 | History auth | Valid | Authenticated user | Valid token | Current user's history is loaded. | E-004,E-005,E-009 | Pending |
| FR20-EC-06 | History count | Valid | Zero/one/multiple own orders | Dataset cardinality | Empty state or all own orders are shown. | E-005,E-009 | Pending |
| FR20-EC-07 | History ownership | Invalid/security | Other user's order | User A token, User B order | Other user's order is not shown. | E-004,E-009 | Pending |

### Minimum domain test cases

| ID | ECs covered | Representative data | Single-fault check | Expected output | Traceability |
| --- | --- | --- | --- | --- | --- |
| DT-FR20-MOB-01 | EC-01 | Empty search, nominal product data | Valid nominal | Mobile product list is displayed. | FR-20/EC-01 |
| DT-FR20-MOB-02 | EC-02 | Matching product fragment | Valid nominal | Matching products are displayed. | FR-20/EC-02 |
| DT-FR20-MOB-03 | EC-03 | Absent product fragment | Valid nominal | Empty product result is observable. | FR-20/EC-03 |
| DT-FR20-MOB-04 | EC-04 | Delayed/error product request | One request state | Loading/error state is observable. | FR-20/EC-04 |
| DT-FR20-MOB-05 | EC-05,EC-06 | Authenticated user with one/multiple orders | Valid multi-cover | Own order history fields and status labels are shown. | FR-20/EC-05,06 |
| DT-FR20-MOB-06 | EC-05,EC-06 | Authenticated user with no orders | Valid multi-cover | Empty history message is shown. | FR-20/EC-05,06 |
| DT-FR20-MOB-07 | EC-07 | User A token, User B order data | One ownership violation only | User B order is not shown. | FR-20/EC-07 |

## Gate A review

| Gate item | Status | Student review/correction |
| --- | --- | --- |
| All classes have evidence or are marked unresolved | Approved | Student approved on 2026-10-18; no corrections |
| Representatives are executable | Approved | Student approved on 2026-10-18; no corrections |
| Invalid cases follow single-fault principle | Approved | Student approved on 2026-10-18; no corrections |
| Gate A approved before BVA | Approved | Student approved on 2026-10-18; no corrections |
