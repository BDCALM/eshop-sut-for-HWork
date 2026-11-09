# AGENTS.md - Rules for coding agents in the EShop project

Read this file before changing the EShop codebase. This repository is a
System Under Test (SUT) for software-testing coursework. Some defects are
intentional and are evidence for test cases, bug reports, and audits.

## 1. Project structure and stack

- `backend/`: CommonJS Node.js, Express, SQLite, JWT, CORS, and body-parser.
- `frontend-web/`: React and Vite storefront, using Tailwind CSS styles.
- `frontend-admin/`: React and Vite administration UI. Its Vite server uses
  port `5174`.
- `frontend-mobile/`: React Native and Expo application, also runnable on the
  web through React Native Web.
- `HW#2/` and `HW#3/`: testing notes, reports, scripts, and course evidence.

The backend is intentionally monolithic: routes, middleware, and business
logic are in `backend/server.js`; SQLite setup and seed data are in
`backend/database.js`.

## 2. Run commands

Use separate terminals. Start the backend and at least one frontend. Do not
run the database seed script during normal development because it can change
or reset local test data.

### Backend API

```bash
cd backend
npm install
node server.js
```

The API listens on port `3000`. Run `node database.js` only for an intentional
initial seed or reset, after confirming that changing the database is wanted.

### Frontend web

```bash
cd frontend-web
npm install
npm run dev
```

Vite serves the web frontend on port `5173` by default.

### Frontend admin

```bash
cd frontend-admin
npm install
npm run dev
```

The admin Vite configuration serves the application on port `5174`.

### Frontend mobile

```bash
cd frontend-mobile
npm install
npx expo start
```

Use Expo Go, an emulator, or press `w` for Expo Web. The mobile app needs a
reachable API URL from `EXPO_PUBLIC_API_URL`.

## 3. Environment configuration

- Web and admin read `VITE_API_URL`.
- Mobile reads `EXPO_PUBLIC_API_URL`.
- Copy the relevant `.env.example` to `.env.local` for local development and
  set the API URL to the current backend address. `.env.local` is ignored by
  Git and must not contain committed secrets.
- The backend reads `FRONTEND_ORIGINS` as a comma-separated CORS allowlist.
  Without it, the fallback list contains localhost and the configured
  Codespaces frontend origins.

## 4. Intended system behavior

Use the root `README.md` as the system requirements reference when designing
tests or evaluating behavior. Important intended rules include:

- Authenticated requests use `Authorization: Bearer <JWT>`.
- A successful login returns a JWT; repeated failed login attempts temporarily
  lock the account in the demo environment.
- Users should only update and view their own profile and order history.
- The cart is held in backend memory in `userCarts`, not persisted in SQLite.
- Order flow is `pending` -> `confirmed` -> `shipping` -> `delivered`, with
  cancellation allowed only where the requirements permit it. `delivered` and
  `canceled` are terminal states in the intended behavior.
- Admin access and data-changing admin operations are intended to require a
  valid JWT with the `admin` role.
- Coupon application is intended to check existence, active status, expiry,
  minimum order amount, authentication, and per-user usage limits.

## 5. Known SUT behavior and testing boundaries

The implementation does not fully enforce every intended rule. Do not silently
turn these discrepancies into fixes unless the user explicitly asks for a bug
fix or the task is specifically to align implementation with the requirements.
Examples currently present in the SUT include:

- Several `/api/admin/*` routes verify a JWT but do not independently enforce
  the `admin` role.
- `PUT /api/users/me` accepts a client-supplied `role` value.
- Product search builds a SQL `LIKE` expression using interpolated input.
- The JWT secret is hardcoded in `server.js`.
- Some order and coupon rules intentionally differ from the requirements.

These behaviors may be test targets. Preserve them when the task is testing,
reporting, documentation, or setup rather than remediation.

## 6. Editing and safety rules

- Make the smallest change that satisfies the task and preserve existing APIs.
- Do not change database schema, seed data, or order-state logic without
  confirming that the task requires it.
- Do not auto-fix intentional bugs or vulnerabilities.
- Do not add endpoints, alter in-memory cart behavior, or change authentication
  semantics as incidental cleanup.
- Do not expose passwords, tokens, or unnecessary personal data in new output.
- Do not commit `.env.local`, credentials, generated build output, or tokens.
- Keep documentation accurate when commands, ports, or environment variables
  change.

## 7. Permissions

- Freely allowed: read/search files, inspect Git status and diffs, install
  dependencies, run tests, build/lint, and run the local development commands
  above.
- Ask before: adding API endpoints, changing in-memory cart behavior, fixing
  intentional bugs or vulnerabilities, or modifying `database.js` seed data.
- Never perform without a direct human request: production deployment,
  changing core requirements in the README/SRS, or replacing the backend's
  single-file architecture with a refactor.