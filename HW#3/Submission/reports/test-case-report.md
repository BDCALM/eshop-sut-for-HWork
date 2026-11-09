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
