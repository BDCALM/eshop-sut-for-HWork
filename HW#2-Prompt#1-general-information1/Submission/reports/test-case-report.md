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
| TC-FR19-001 | Display the customer-user list with zero customer users | Admin is authenticated; admin user-management view is available. | Admin baseline only; zero customer users. | 1. Open the admin user-management view. 2. Observe the user table. | The admin baseline remains listed; no customer user is listed; password values are not exposed. | Supplied UI evidence shows the zero-customer-user state. | Passed | [FR-19-01-zeroUser.png](./screenshots/FR-19/FR-19-01-zeroUser.png) | N/A | No data changed. |
| TC-FR19-002 | Display the customer-user list with exactly one customer user | Admin is authenticated; admin user-management view is available. | Admin baseline plus one customer user. | 1. Open the admin user-management view. 2. Observe the user table. | The admin baseline and exactly one customer user are listed; password values are not exposed. | Supplied UI evidence shows the one-customer-user state. | Passed | [FR-19-02-oneUser.png](./screenshots/FR-19/FR-19-02-oneUser.png) | N/A | No data changed. |
| TC-FR19-003 | Display the customer-user list with multiple customer users | Admin is authenticated; admin user-management view is available. | Admin baseline plus 2+ customer users. | 1. Open the admin user-management view. 2. Observe the user table. | The admin baseline and multiple customer users are listed; password values are not exposed. | Supplied UI evidence shows the multiple-customer-user state. | Passed | [FR-19-03-multipleUser.png](./screenshots/FR-19/FR-19-03-multipleUser.png) | N/A | No data changed. |
| TC-FR19-004 | Delete an existing other user with a valid integer ID | Admin is authenticated; target user ID `3` exists and is not the current admin. | Target user ID `3`. | 1. Open the admin user-management view. 2. Select the row for user ID `3`. 3. Select `Xóa`. 4. Refresh the user list. | The selected other user is deleted and user ID `3` is absent from the refreshed list. | Supplied UI evidence shows the deletion of user ID `3`. | Passed | [FR-19-04-delUserID=3.png](./screenshots/FR-19/FR-19-04-delUserID=3.png) | N/A | Deleted test user remains removed as observed. |
| TC-FR19-005 | Protect the current admin from deletion with the current admin ID | Admin is authenticated; current admin row is visible. | Current logged-in admin ID. | 1. Open the admin user-management view. 2. Select the current admin row. 3. Select `Xóa`. 4. Refresh the user list. 5. Verify whether the authenticated session remains active. | The current admin is not deleted; the admin row remains present and protected behavior is displayed. | UI reports deletion success; after refresh the admin row is absent while the existing session remains active. | Failed | [FR-19-05-delAdminUserSuccessfully.png](./screenshots/FR-19/FR-19-05-delAdminUserSuccessfully.png) | BUG-FR19-001 | Student-owned bug record; restore test data before retest. |
| TC-FR19-006 | Reject invalid user deletion identifiers for absent and malformed IDs | Admin is authenticated; valid users with IDs `2`, `4`, and `5` are present. | `999999`, `abc`, and `1abc`, one identifier per request. | 1. Record the current user list. 2. Send a DELETE request for each test identifier. 3. Record each response status/body. 4. Request the user list again. 5. Compare the before/after lists. | Each invalid identifier produces an error or a defined no-op response without a false deletion-success message; valid users remain unchanged. | Each request returns `200 OK` and `{"message":"User deleted"}`; the valid user list remains unchanged. | Failed | [FR-19-06-deleteInvalidUser.md](./screenshots/FR-19/FR-19-06-deleteInvalidUser.md) | BUG-FR19-002 | No valid user was deleted; retain the before/after list evidence. |

**Gate C status:** Approved by the student after review; no corrections or
missing cases were identified. FR-19 has six designed and executed cases:
four passed and two failed with student-provided bug IDs.

## 5. FR-20 - Mobile product browsing and order history

### A. Domain

See [Domain-testing-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Domain-testing-report.md), section 4.

Draft domain cases: `DT-FR20-MOB-01` through `DT-FR20-MOB-07`. These remain
subject to Gate A review.

### B. BVA

See [Boundary-Value-Analysis-report.md](./main%20reports%20%28need%20md%20%2B%20pdf%29/Boundary-Value-Analysis-report.md), section 6.

### C. Test cases and execution

| ID | Objective/title (Action + Function + Condition) | Preconditions | Test data | Steps (≤15) | Expected | Actual | Status | Evidence | Bug ID | Cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-FR20-MOB-001 | Display the mobile product list with an empty search | Mobile app is configured with a reachable product API. | Empty search `""`; nominal seeded products. | 1. Open the mobile app. 2. Observe the `Danh sách sản phẩm` screen. 3. Leave `Tìm kiếm...` empty. 4. Select `Tìm`. | The mobile product list is displayed and product cards are visible. | API returned HTTP 200 with 5 products; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | No data changed. |
| TC-FR20-MOB-002 | Display matching mobile products for a one-character search | Mobile app is on the product list; product API is reachable. | One-character term `i`. | 1. Enter `i` in `Tìm kiếm...`. 2. Select `Tìm`. 3. Observe the result heading and product cards. | A non-empty search is performed; the result heading shows the search term and matching product cards are displayed. | API returned HTTP 200 with 2 products; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Clear the search field or reload the app. |
| TC-FR20-MOB-003 | Display the mobile empty state for a search with zero results | Mobile app is on the product list; product API is reachable. | Absent term `fr20-no-product-999999`. | 1. Enter `fr20-no-product-999999` in `Tìm kiếm...`. 2. Select `Tìm`. 3. Observe the product-list area. | No matching product card is displayed and the mobile empty-result state is observable. | API returned HTTP 200 with 0 products; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Reload the app. |
| TC-FR20-MOB-004 | Display exactly one matching mobile product for a one-result search | Mobile app is on the product list; a term with exactly one seeded match is known. | `iPhone 15 Pro Max`. | 1. Enter `iPhone 15 Pro Max` in `Tìm kiếm...`. 2. Select `Tìm`. 3. Count the product cards. | Exactly one matching product card is displayed. | API returned HTTP 200 with 1 product; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Reload the app. |
| TC-FR20-MOB-005 | Display multiple matching mobile products for a multi-result search | Mobile app is on the product list; a term with 2+ seeded matches is known. | `a`. | 1. Enter `a` in `Tìm kiếm...`. 2. Select `Tìm`. 3. Count the product cards. | Two or more matching product cards are displayed. | API returned HTTP 200 with 4 products; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Reload the app. |
| TC-FR20-MOB-006 | Display the mobile loading state while the product request is delayed | Mobile app can be run with a controlled delayed product API. | Delayed product request. | 1. Start the app with the controlled delayed request. 2. Observe the product screen while the request is pending. | `Đang tải...` is displayed while the product request is pending. | Mobile UI displayed `Đang tải...` in the product-list block. | Passed | [TC-FR20-MOB-006.png](./screenshots/FR-20/TC-FR20-MOB-006.png) | N/A | Restore the normal API URL and reload the app. |
| TC-FR20-MOB-007 | Display the mobile error state when the product request fails | Mobile app can be run with an unavailable or failed product API. | Failed product request. | 1. Start the app with the controlled failed request. 2. Observe the product screen after the request fails. | A visible error state is displayed and the app does not present the failed request as a successful product result. | Mobile UI displayed `Failed to fetch` at the upper-left of the product-list block. | Passed | [TC-FR20-MOB-007.png](./screenshots/FR-20/TC-FR20-MOB-007.png) | N/A | Restore the normal API URL and reload the app. |
| TC-FR20-MOB-008 | Display an empty mobile order history for an authenticated user with zero own orders | User credentials are available; the user has zero own orders; mobile API is reachable. | Valid user token; zero own orders. | 1. Authenticate using the supplied test account. 2. Select the profile greeting in the header. 3. Scroll to `Lịch sử đơn hàng`. | `Lịch sử đơn hàng` displays `Bạn chưa có đơn hàng nào.` and no order card. | API returned HTTP 200 with `userId=2`, `count=0` under the zero-order setup; a later two-order setup returned `INFO` for this zero-order partition. UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Select `Thoát` and clear the session. |
| TC-FR20-MOB-009 | Display one own order in mobile order history for an authenticated user | User credentials are available; exactly one own order exists. | Valid user token; one own order. | 1. Authenticate as the test user. 2. Select the profile greeting. 3. Scroll to `Lịch sử đơn hàng`. 4. Inspect the order card. | One order card displays `Đơn #`, `Ngày đặt`, `Tổng tiền`, and `Trạng thái` with the correct translated status label. | With User ID 2 configured with exactly 1 order, API returned `PASS`, `userId=2`, `count=1`; UI evidence pending. A two-order setup correctly returned `INFO` for this partition. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Restore or document the dataset after execution; select `Thoát`. |
| TC-FR20-MOB-010 | Display multiple own orders and translated statuses in mobile order history | User credentials are available; the authenticated user has 2+ own orders with supported statuses. | Valid user token; multiple own orders. | 1. Authenticate as the test user. 2. Select the profile greeting. 3. Scroll to `Lịch sử đơn hàng`. 4. Inspect all order cards and status labels. | All and only the user's own orders are displayed; each card shows the required fields and supported Vietnamese status labels. | With User ID 2 configured with 2 orders, API returned `PASS`, `userId=2`, `count=2`; UI evidence pending. A one-order setup correctly returned `INFO` for this partition. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Restore or document the dataset after execution; select `Thoát`. |
| TC-FR20-MOB-011 | Hide another user's orders from the authenticated mobile order history | Two users exist; User B has at least one order; each account can be authenticated independently. | User A token; User B order data. | 1. Authenticate as User A. 2. Select the profile greeting. 3. Inspect `Lịch sử đơn hàng`. 4. Compare displayed order IDs with User B's known order IDs. | User B's order IDs are not displayed in User A's mobile history. | API returned HTTP 200 for User A/User B in both order-count setups; `sharedOrderIds=[]`; UI evidence pending. | API Passed; UI pending | Student script output 2026-10-20; N/A for screenshot | N/A | Select `Thoát`; no order data changed. |

**Gate C status:** Approved by the student on 2026-10-20 with no
corrections. The two manual request-state cases are now Passed from UI
evidence; the API-only cases still await corresponding mobile UI evidence.

## 6. Execution summary

| Feature | Designed | Executed | Passed | Failed | Not yet executed |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-05 | 6 | 6 | 6 | 0 | 0 |
| FR-11 | 6 | 6 | 6 | 0 | 0 |
| FR-19 | 6 | 6 | 4 | 2 | 0 |
| FR-20 subsection | 11 | 11 | 2 | 0 | 0 |
| **Total** | **29** | **29** | **18** | **2** | **0** |

## 7. Bugs and traceability

- FR-05 and FR-11 had no failed cases. FR-19 has two failed cases linked to
  `BUG-FR19-001` and `BUG-FR19-002`; their detailed records remain
  student-owned in [bug-report.md](./bug-report.md).
- Bug report: [bug-report.md](./bug-report.md)
- Failed cases require real screenshot evidence and a bug ID where applicable.

## 8. Limitations and not-yet-executed work

- FR-05 loading and API error states remain unexecuted.
- FR-11 maximum order count/pagination remains unresolved; no evidence was
  supplied for an upper cardinality boundary.
- FR-19 execution used the supplied filenames and the student-provided
  observations; the evidence images were not reinterpreted.
- FR-20 has UI evidence for TC-FR20-MOB-006 and TC-FR20-MOB-007. The other
  nine cases have API-only results and still need corresponding mobile UI
  evidence before they can be counted as complete UI passes.
- Device/OS, exact backend URL, and execution timestamps were not visible in
  the supplied screenshots.
