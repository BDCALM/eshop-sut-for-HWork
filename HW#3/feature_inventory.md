# EShop Feature Inventory

This inventory is based on the homework specification, the project README, the
API specification, and the current Web, Admin, Mobile, and Backend source
folders.

## Summary

| Scope | Features |
| --- | ---: |
| Pool A - Authentication, categories, and products | 6 |
| Pool B - Cart, checkout, coupons, and orders | 5 |
| Pool C - Web Admin | 8 |
| Pool D - Mobile | 1 |
| Cross-cutting GUI requirements | 4 |
| **Total functional requirements** | **20** |

The homework requires each student to select four features: one from each
pool. The four GUI requirements are quality/interface constraints, not an
additional feature pool.

## Pool A - Authentication, Categories, and Products

### FR-01 - Account registration

Users register with name, unique valid email, strong password, and password
confirmation. A successful registration leads to login.

Main surfaces:

- Web: `frontend-web/src/pages/Register.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `POST /api/register`

### FR-02 - Login and account lockout

Users log in with email and password. Successful login returns a JWT. Repeated
failed attempts temporarily lock the account.

Main surfaces:

- Web: `frontend-web/src/pages/Login.jsx`
- Mobile: `frontend-mobile/App.js`
- Admin login: `frontend-admin/src/App.jsx`
- Backend: `POST /api/login`

### FR-03 - Forgot password and password reset

The two-step flow requests an OTP/reset token and then resets the password
using the email, token, new password, and confirmation.

Main surfaces:

- Web: `frontend-web/src/pages/ForgotPassword.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `POST /api/forgot-password`, `POST /api/reset-password`

### FR-04 - Personal profile management

An authenticated user can view and update their name, phone number, and
default shipping address. Email and role must not be user-editable.

Main surfaces:

- Web: `frontend-web/src/pages/Profile.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `GET/PUT /api/users/me`

### FR-05 - Product listing and search

The home page displays products and supports searching by product name,
including loading and empty-result states.

Main surfaces:

- Web: `frontend-web/src/pages/Home.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `GET /api/products?search=...`

### FR-06 - Product detail view

Users can view a product's image, name, price, description, and category,
choose a positive quantity, and add the product to the cart.

Main surfaces:

- Web: `frontend-web/src/pages/ProductDetail.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `GET /api/products/:id`

## Pool B - Shopping Cart and Checkout

### FR-07 - Shopping cart

The cart lists products, prices, quantities, line totals, and actions. Adding
the same product increases its quantity. Users can adjust quantities, remove
items, continue shopping, and see an empty-cart state.

Main surfaces:

- Web: `frontend-web/src/pages/Cart.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `/api/cart` endpoints

### FR-08 - Checkout

Authenticated users can review their cart and submit an order. The total
should be calculated from cart contents, recalculated by the backend, and the
cart should be cleared after a successful checkout.

Main surfaces:

- Web: `frontend-web/src/pages/Checkout.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `POST /api/checkout`

### FR-09 - Discount coupons

At checkout, an authenticated user can apply a coupon. The coupon must exist,
be active and unexpired, meet the minimum order amount, and remain within the
user's usage limit. Percent and fixed discounts are supported.

Main surfaces:

- Web: `frontend-web/src/pages/Checkout.jsx`
- Mobile: `frontend-mobile/App.js`
- Backend: `POST /api/apply-coupon`
- Admin coupon endpoints: `/api/coupons` and `/api/admin/coupons`

### FR-10 - Order state machine

Orders use the states `pending`, `confirmed`, `shipping`, `delivered`, and
`canceled`. Valid transitions, final states, and cancellation rules must be
enforced.

Main surfaces:

- User order and checkout flows
- Admin order status controls in `frontend-admin/src/App.jsx`
- Backend order status endpoints

### FR-11 - User order history

An authenticated user can view only their own orders, including order ID,
date, total, and translated current status.

Main surfaces:

- Mobile order-history flow: `frontend-mobile/App.js`
- Backend: `GET /api/orders/my-orders` and `GET /api/orders/:id`
- Web route support should be checked in the user order UI before testing

## Pool C - Web Admin

### FR-12 - Access control

Admin functionality requires a valid JWT and an administrator role. Ordinary
users must not access admin operations or protected data-changing endpoints.

Main surfaces:

- Admin login and token handling: `frontend-admin/src/App.jsx`
- Backend authentication and admin endpoints

### FR-13 - Dashboard

The admin dashboard shows total delivered-order revenue and the total number
of orders.

Main surface:

- `frontend-admin/src/App.jsx`

### FR-14 - Category management (CRUD)

Admins can view, add, update, and delete product categories. Category names
are required.

Main surfaces:

- `frontend-admin/src/App.jsx`
- Backend: `/api/categories`

### FR-15 - Product management (CRUD)

Admins can view, add, edit, and delete products. Product name, positive price,
and an existing category are required.

Main surfaces:

- `frontend-admin/src/App.jsx`
- Backend: `/api/products`

### FR-16 - Product import from CSV

Admins can preview/import multiple products from CSV data. The specification
requires the `.csv` extension, the defined header, RFC 4180 quoted fields,
validation, atomic rollback, and an import result report.

Main surfaces:

- CSV state and import UI: `frontend-admin/src/App.jsx`
- Backend: `POST /api/admin/import-products`

### FR-17 - Coupon management (CRUD)

Admins can view, create, and delete coupons with valid unique codes, coupon
types, positive discount values, expiry dates, minimum order amounts, and usage
limits.

Main surfaces:

- `frontend-admin/src/App.jsx`
- Backend: `/api/coupons` and `/api/admin/coupons`

### FR-18 - Admin order management

Admins can view all users' orders and update order status according to the
order state machine.

Main surfaces:

- `frontend-admin/src/App.jsx`
- Backend: `/api/admin/orders`

### FR-19 - Admin user management

Admins can view users without exposing passwords and delete users, except the
currently logged-in administrator.

Main surfaces:

- `frontend-admin/src/App.jsx`
- Backend: `/api/admin/users`

## Pool D - Mobile

### FR-20 - Mobile application

The React Native/Expo app provides product browsing, login, logout,
registration, cart, checkout, profile, order history, and state-machine
compliant order cancellation.

Main surface:

- `frontend-mobile/App.js`

## Cross-cutting GUI requirements

These are requirements to verify across the feature selected for testing:

1. **FR-21 - Common UI standards:** Vietnamese UI text, consistent action and
   danger colors, consistent `₫` formatting, one `<h1>` per page, and keyboard
   tab order.
2. **FR-22 - Form requirements:** labels, required-field indicators, inline
   validation, useful error messages, and submit-button behavior.
3. **FR-23 - Navigation requirements:** working links, back navigation,
   breadcrumbs where appropriate, and no broken routes.
4. **FR-24 - Feedback and state requirements:** loading indicators, empty
   states, success/error feedback, and disabled states during requests.

## Important testing note

This is a feature inventory, not a claim that every requirement is currently
implemented correctly. The project is explicitly a system under test, so the
homework expects comparison of the requirements above with the actual
behavior, followed by Domain Testing, Boundary Value Analysis, and bug
reporting.

