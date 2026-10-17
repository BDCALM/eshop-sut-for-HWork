# HW02 Feature Selection Guide

## Assignment constraint

The homework requires **four features per student**:

- one feature from Pool A;
- one feature from Pool B;
- one feature from Pool C;
- one feature from Pool D.

Features must not be duplicated among group members.

## Complete pool list

### Pool A

| ID | Feature |
| --- | --- |
| FR-01 | Account registration |
| FR-02 | Login and account lockout |
| FR-03 | Forgot password and password reset |
| FR-04 | Personal profile management |
| FR-05 | Product listing and search |
| FR-06 | Product detail view |

### Pool B

| ID | Feature |
| --- | --- |
| FR-07 | Shopping cart |
| FR-08 | Checkout |
| FR-09 | Discount coupons |
| FR-10 | Order state machine |
| FR-11 | User order history |

### Pool C

| ID | Feature |
| --- | --- |
| FR-12 | Access control |
| FR-13 | Dashboard |
| FR-14 | Category management (CRUD) |
| FR-15 | Product management (CRUD) |
| FR-16 | Product import from CSV |
| FR-17 | Coupon management (CRUD) |
| FR-18 | Admin order management |
| FR-19 | Admin user management |

### Pool D

| ID | Feature |
| --- | --- |
| FR-20 | Mobile application |

## Suggested selection worksheet

Fill in one choice per row after coordinating with the group:

| Pool | Selected feature ID | Selected feature | Group member |
| --- | --- | --- | --- |
| A |  |  |  |
| B |  |  |  |
| C |  |  |  |
| D |  |  |  |

## Suggested test focus

For each selected feature, the report should include:

1. The feature's normal behavior and acceptance rules.
2. Domain partitions, including valid and invalid domains.
3. Boundary values and boundary-focused test cases.
4. Executed results: passed, failed, or not yet executed.
5. Bugs with reproducible steps, expected result, actual result, severity,
   evidence, and a GitHub Issue link.
6. AI prompts, outputs, human review, and missed cases in the AI Audit Report.

## Candidate set for a manageable first pass

This is only a suggestion; it must be checked against the group's
no-duplication rule:

- Pool A: FR-02 Login and account lockout
- Pool B: FR-09 Discount coupons
- Pool C: FR-16 Product import from CSV
- Pool D: FR-20 Mobile application

These candidates expose clear partitions and boundaries, such as failed-login
attempt counts, coupon thresholds and expiry, CSV row/field validation, and
mobile authentication/cart/order states.

## Suggested allocation for a team of three

### Important constraint about Pool D

The specification requires one feature from each pool for every student and
also says that features must not be duplicated. However, Pool D currently
contains only **FR-20 - Mobile application**. Therefore, it is impossible for
three students to each select a different Pool D feature.

Because Pool D contains only FR-20, the team cannot avoid repeating the FR-20
feature while also following the requirement that every member selects one
feature from each pool. The team should document this unavoidable duplication
and divide FR-20 into non-overlapping mobile subsections.

### Recommended balanced assignment

| Member | Pool A | Pool B | Pool C | Pool D - FR-20 subsection | Estimated difficulty |
| --- | --- | --- | --- | --- | --- |
| Member 1 - Authentication specialist | FR-02 Login and account lockout | FR-11 User order history | FR-14 Category management CRUD | Mobile authentication and profile | Medium |
| Member 2 - Transaction specialist | FR-05 Product listing and search | FR-09 Discount coupons | FR-18 Admin order management | Mobile cart and checkout | High |
| Member 3 - Admin/data specialist | FR-03 Forgot password and password reset | FR-07 Shopping cart | FR-16 Product import from CSV | Mobile product browsing and order history | High |

This allocation balances the work as follows:

- Member 1 receives the clearest authentication and CRUD domains, plus mobile
  authentication and profile testing.
- Member 2 receives the most complex business-rule combination: product
  search, coupons, order-state transitions, and mobile cart/checkout flows.
- Member 3 receives strong boundary-testing opportunities in password rules,
  cart quantities, CSV fields, import validation, and mobile product browsing.
- Each member has one feature from Pool A, one from Pool B, and one from Pool
  C, and the same FR-20 feature is divided into three non-overlapping
  subsections.

### Why these features are suitable for Domain Testing

| Member | Useful domain partitions and boundaries |
| --- | --- |
| Member 1 | Login: valid/invalid credentials, failed-attempt counts, and lockout duration; order history: own/other-user data and empty/non-empty history; category CRUD: empty/non-empty names and duplicate names; mobile authentication/profile: login state, protected screens, and profile updates. |
| Member 2 | Product search: empty, exact, partial, special-character, and no-result searches; coupons: existence, active/expired, minimum amount, discount type, and usage limit; admin orders: each valid/invalid state transition; mobile cart/checkout: duplicate products, quantities, authentication, and successful order submission. |
| Member 3 | Password reset: OTP length, matching email, token validity, and password-strength boundaries; cart: quantity 0/1/large values and duplicate products; CSV: extension, header, quoted commas, missing fields, invalid price, and rollback; mobile browsing/order history: loading, empty results, product details, and user-specific orders. |

### How to explain the FR-20 duplication

Use the following explanation in the report:

> Pool D contains only FR-20 - Mobile application. Since every student must
> select one feature from each pool, FR-20 is selected by all three members.
> To avoid duplicated testing effort, the team divides FR-20 into three
> non-overlapping subsections: authentication/profile, cart/checkout, and
> product browsing/order history.

The team still has exactly four feature assignments per member. The FR-20
label is repeated because it is the only available feature in Pool D, but the
test scope, test-case IDs, and ownership are separate.

### Coordination rules

1. Assign one primary owner for each feature and do not duplicate A/B/C
   feature IDs.
2. Share common test data, accounts, screenshots, and bug-report formatting.
3. Record FR-20 for all members, but use separate mobile subsection names and
   test-case ID ranges.
4. Review one another's domain partitions and boundary values before execution.
5. Use a shared feature matrix to record test cases designed, executed,
   passed, failed, and not yet executed.
