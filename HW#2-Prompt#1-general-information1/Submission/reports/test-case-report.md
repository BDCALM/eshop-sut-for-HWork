# Test Case Report

## 1. Environment and evidence

| Field | Value |
| --- | --- |
| SUT URL/build/commit | `https://orange-disco-9775gp4r5rv6c757g-5173.app.github.dev/`; build/commit not recorded in evidence |
| Backend/API URL | `Codespaces forwarded backend URL configured for the Web frontend; exact URL not visible in screenshots` |
| Web/mobile/admin environment | `Web frontend in GitHub Codespaces` |
| Browser/device/OS | `Chrome browser; device/OS not recorded in evidence` |
| Test data setup | `Existing seeded product data; no database reset performed` |
| Cleanup/reset method | `No persistent data changed; clear search input or reload page` |

| Evidence ID | Route/API/source | Verified observation | Screenshot/link |
| --- | --- | --- | --- |
| E-FR05-01 | `Web product listing route` | `Default product listing displays four visible product cards in the captured viewport.` | [FR05-01-default.png](./screenshots/FR-05/FR05-01-default.png) |
| E-FR05-02 | `Web product listing/search route` | `Empty search is submitted and five product cards are displayed.` | [FR05-02-searchEmpty.png](./screenshots/FR-05/FR05-02-searchEmpty.png) |
| E-FR05-03 | `Web product listing/search route` | `One-character search `i` is shown and two matching product cards are displayed.` | [FR05-03-searchOneChar.png](./screenshots/FR-05/FR05-03-searchOneChar.png) |
| E-FR05-04 | `Web product listing/search route` | `Search `xyz-no-product-999` displays no product card.` | [FR05-04-searchNoResult.png](./screenshots/FR-05/FR05-04-searchNoResult.png) |
| E-FR05-05 | `Web product listing/search route` | `Search `iPhone 15` displays one product card and the count text shows one product.` | [FR05-05-searchOneResult.png](./screenshots/FR-05/FR05-05-searchOneResult.png) |
| E-FR05-06 | `Web product listing/search route` | `Search `1` displays two product cards and the count text shows two products.` | [FR05-06-searchTwo+Result.png](./screenshots/FR-05/FR05-06-searchTwo+Result.png) |
| E-FR11-01 | `Web profile/order-history route` | `One-order history state was supplied and verified by the student.` | [FR-11-01-exactOneOrder.png](./screenshots/FR-11/FR-11-01-exactOneOrder.png) |
| E-FR11-02 | `Web profile/order-history route` | `Multiple-order history state was supplied and verified by the student.` | [FR-11-02-multiOrder.png](./screenshots/FR-11/FR-11-02-multiOrder.png) |
| E-FR11-03 | `Web profile/order-history route` | `Empty-order history state was supplied and verified by the student.` | [FR-11-03-empty.png](./screenshots/FR-11/FR-11-03-empty.png) |
| E-FR11-04 | `Web profile/order-history route` | `Supported-status evidence was supplied and verified by the student.` | [FR-11-02-multiOrderSupported.png](./screenshots/FR-11/FR-11-02-multiOrderSupported.png) |
| E-FR11-05 | `Web profile/order-history route` | `Missing/invalid-token state was supplied and verified by the student.` | [FR-11-04-missingOrInvalidToken.png](./screenshots/FR-11/FR-11-04-missingOrInvalidToken.png) |
| E-FR11-06 | `GET /api/orders/my-orders` | `User A and User B order-history evidence was supplied and verified by the student.` | [FR11-05-userAOrders.png](./screenshots/FR-11/FR11-05-userAOrders.png), [FR11-05-userBOrders.png](./screenshots/FR-11/FR11-05-userBOrders.png) |

## 2. FR-05 - Product listing and search

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 1.

Draft domain cases: `DT-FR05-01` through `DT-FR05-05`. These remain subject
to Gate A review.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 1.

FR-05 BVA cases: `BVA-TC-FR05-01` through `BVA-TC-FR05-05` were approved at
Gate B. Maximum search length and maximum result count remain unresolved
because no evidence-backed upper boundary was found.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR05-001 | Display Product Listing with Default Search | Product listing route is available; seeded product data is present. | Search input empty on initial page load. | 1. Open the Web product listing route. 2. Observe the product cards and result area. | Product listing page shows the search input, search button, and available product cards. | Screenshot shows the listing page, search controls, and four visible product cards. | Passed | [FR05-01-default.png](./screenshots/FR-05/FR05-01-default.png) | N/A | Reload page; no data changed. |
| TC-FR05-002 | Display Product Listing with Empty Search | Product listing route is available; seeded product data is present. | Empty search string `""`. | 1. Open the product listing route. 2. Leave the search input empty. 3. Submit the search. 4. Observe the result area. | Empty search returns and displays the available product listing. | Screenshot shows an empty focused search input and five product cards. | Passed | [FR05-02-searchEmpty.png](./screenshots/FR-05/FR05-02-searchEmpty.png) | N/A | Clear input; no data changed. |
| TC-FR05-003 | Filter Product Listing with One-Character Search | Product listing route is available; seeded product data is present. | Search string `i` (1 character). | 1. Enter `i` in the search input. 2. Submit the search. 3. Observe the displayed search term and product cards. | A non-empty search is applied and the returned matching products are displayed. | Screenshot shows search term `i`, two matching product cards, and `Hiển thị 2 sản phẩm`. | Passed | [FR05-03-searchOneChar.png](./screenshots/FR-05/FR05-03-searchOneChar.png) | N/A | Clear input; no data changed. |
| TC-FR05-004 | Display Empty Product Results with Unmatched Search | Product listing route is available; seeded product data is present. | Search string `xyz-no-product-999`. | 1. Enter `xyz-no-product-999` in the search input. 2. Submit the search. 3. Observe the result area. | No matching product card is displayed for an unmatched product-name search. | Screenshot shows the submitted search term and no product card in the result area. | Passed | [FR05-04-searchNoResult.png](./screenshots/FR-05/FR05-04-searchNoResult.png) | N/A | Clear input; no data changed. |
| TC-FR05-005 | Display Single Product with Unique Search | Product listing route is available; seeded product data is present. | Search string `iPhone 15`. | 1. Enter `iPhone 15` in the search input. 2. Submit the search. 3. Observe the result count and product card. | Exactly one matching product card is displayed. | Screenshot shows one `iPhone 15 Pro Max` card and `Hiển thị 1 sản phẩm`. | Passed | [FR05-05-searchOneResult.png](./screenshots/FR-05-05-searchOneResult.png) | N/A | Clear input; no data changed. |
| TC-FR05-006 | Display Multiple Products with Multi-Match Search | Product listing route is available; seeded product data is present. | Search string `1`. | 1. Enter `1` in the search input. 2. Submit the search. 3. Observe the result count and product cards. | Two or more matching product cards are displayed. | Screenshot shows two product cards and `Hiển thị 2 sản phẩm`. | Passed | [FR05-06-searchTwo+Result.png](./screenshots/FR-05/FR05-06-searchTwo+Result.png) | N/A | Clear input; no data changed. |

**Gate C status:** Approved by the student on 2026-10-19. No corrections
were requested. Loading and API error states remain unexecuted because no
corresponding evidence was supplied.

## 3. FR-11 - User order history

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 2.

Domain cases: `DT-FR11-01` through `DT-FR11-05`; Gate A was approved on
2026-10-19.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 2.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR11-001 | Display Empty Order History for a User with Zero Orders | User A is authenticated; order-history route is available. | User A with 0 orders. | 1. Sign in as User A. 2. Open the profile/order-history route. 3. Observe the order-history panel. | The order-history panel displays the empty-order message and no order row. | Student-verified evidence shows the empty-order state. | Passed | [FR-11-03-empty.png](./screenshots/FR-11/FR-11-03-empty.png) | N/A | Sign out; no order data changed. |
| TC-FR11-002 | Display One Order in Order History for a User with One Order | User A is authenticated; exactly one own order exists. | User A with 1 own order. | 1. Sign in as User A. 2. Open the profile/order-history route. 3. Observe the order row. | One order row displays its ID, date, total, and translated status. | Student-verified evidence shows the one-order history state. | Passed | [FR-11-01-exactOneOrder.png](./screenshots/FR-11/FR-11-01-exactOneOrder.png) | N/A | Sign out; no order data changed. |
| TC-FR11-003 | Display Multiple Orders in Descending Order for a User with Multiple Orders | User A is authenticated; at least two own orders exist. | User A with 2+ own orders. | 1. Sign in as User A. 2. Open the profile/order-history route. 3. Observe all order rows and their order IDs. | Multiple own orders are displayed in descending order ID order, with ID, date, total, and status fields. | Student-verified evidence shows the multiple-order history state. | Passed | [FR-11-02-multiOrder.png](./screenshots/FR-11/FR-11-02-multiOrder.png) | N/A | Sign out; no order data changed. |
| TC-FR11-004 | Display Supported Status Labels in Order History for Orders with Supported Statuses | User A is authenticated; orders with supported statuses exist. | `pending`, `confirmed`, `shipping`, `delivered`, or `canceled` order statuses. | 1. Sign in as User A. 2. Open the profile/order-history route. 3. Observe the status labels for the available orders. | Each supported status is displayed using its corresponding Vietnamese label. | Student-verified evidence covers supported order-status display. | Passed | [FR-11-02-multiOrderSupported.png](./screenshots/FR-11/FR-11-02-multiOrderSupported.png) | N/A | Sign out; no order data changed. |
| TC-FR11-005 | Reject Order History Access without a Valid Token | Profile route is available; no persistent order data change is required. | Data Matrix: missing token; invalid token. | 1. Remove the stored token or use an invalid token. 2. Open/reload the profile/order-history route. 3. Observe the authentication state and order-history request result. | The unauthenticated state is shown and the order-history request does not return order history. | Student-verified evidence shows the missing/invalid-token state. | Passed | [FR-11-04-missingOrInvalidToken.png](./screenshots/FR-11/FR-11-04-missingOrInvalidToken.png) | N/A | Remove invalid token; sign in again only if further testing is needed. |
| TC-FR11-006 | Isolate Order History by User for Two Authenticated Users | User A and User B exist; each has at least one order; order-history endpoint is available. | User A orders versus User B orders. | 1. Sign in as User A and open order history. 2. Record the returned order IDs/user IDs. 3. Sign out. 4. Sign in as User B and open order history. 5. Record the returned order IDs/user IDs. 6. Compare both result sets. | User A receives only User A orders; User B receives only User B orders; neither response exposes the other user's order. | Student-verified evidence shows separate User A and User B histories. | Passed | [FR11-05-userAOrders.png](./screenshots/FR-11/FR11-05-userAOrders.png), [FR11-05-userBOrders.png](./screenshots/FR-11/FR11-05-userBOrders.png) | N/A | Sign out; no order data changed. |

**Gate C status:** Approved by the student on 2026-10-19. The six FR-11 cases
were designed and recorded as passed from the student-verified evidence. No
failed case or bug ID was created.

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

| Feature | Designed | Executed | Passed | Failed | Not yet executed |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-05 | 6 | 6 | 6 | 0 | 0 |
| FR-11 | 6 | 6 | 6 | 0 | 0 |
| FR-19 | 0 | 0 | 0 | 0 | 0 |
| FR-20 subsection | 0 | 0 | 0 | 0 | 0 |
| **Total** | **12** | **12** | **12** | **0** | **0** |

## 7. Bugs and traceability

- Confirmed bugs: `0` for the executed FR-05 and FR-11 cases; no failed case
  or student-confirmed bug was reported.
- Bug report: [bug-report.md](./bug-report.md)
- Failed cases require real screenshot evidence and a bug ID where applicable.

## 8. Limitations and not-yet-executed work

- FR-05 loading and API error states remain unexecuted.
- FR-11 maximum order count/pagination remains unresolved; no evidence was
  supplied for an upper cardinality boundary.
- Device/OS, exact backend URL, and execution timestamps were not visible in
  the supplied screenshots.
