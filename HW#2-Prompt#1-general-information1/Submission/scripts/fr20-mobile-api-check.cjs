#!/usr/bin/env node

const API_URL = (process.env.API_URL ||
  "http://localhost:3000/api").replace(/\/+$/, "");
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const OTHER_USER_EMAIL = process.env.OTHER_USER_EMAIL;
const OTHER_USER_PASSWORD = process.env.OTHER_USER_PASSWORD;

const results = [];

function record(id, title, status, details) {
  results.push({ id, title, status, details });
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const text = await response.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Keep non-JSON error bodies for diagnostics.
  }
  return { response, body };
}

function productCount(body) {
  return Array.isArray(body) ? body.length : 0;
}

async function findSearchTerms(products) {
  const terms = {
    empty: "",
    oneCharacter: "i",
    zero: "fr20-no-product-999999",
    one: null,
    multiple: null,
  };

  const candidates = [
    ...products.map((product) => String(product.name || "")),
    ...[..."abcdefghijklmnopqrstuvwxyz0123456789"],
  ].filter(Boolean);

  for (const term of candidates) {
    const { response, body } = await request(
      `/products?search=${encodeURIComponent(term)}`,
    );
    if (!response.ok || !Array.isArray(body)) continue;
    const count = body.length;
    if (count === 1 && terms.one === null) terms.one = term;
    if (count >= 2 && terms.multiple === null) terms.multiple = term;
    if (terms.one !== null && terms.multiple !== null) break;
  }

  return terms;
}

async function checkProductCases() {
  const initial = await request("/products?search=");
  if (!initial.response.ok || !Array.isArray(initial.body)) {
    record(
      "TC-FR20-MOB-001",
      "Product API responds to empty search",
      "FAIL",
      `HTTP ${initial.response.status}`,
    );
    return null;
  }

  const terms = await findSearchTerms(initial.body);
  const cases = [
    ["TC-FR20-MOB-001", "Empty search", terms.empty, (count) => count > 0],
    [
      "TC-FR20-MOB-002",
      "One-character search",
      terms.oneCharacter,
      (count) => count >= 0,
    ],
    ["TC-FR20-MOB-003", "Zero-result search", terms.zero, (count) => count === 0],
    [
      "TC-FR20-MOB-004",
      "Exactly-one-result search",
      terms.one,
      (count) => count === 1,
    ],
    [
      "TC-FR20-MOB-005",
      "Multiple-result search",
      terms.multiple,
      (count) => count >= 2,
    ],
  ];

  for (const [id, title, term, predicate] of cases) {
    if (term === null) {
      record(id, title, "BLOCKED", "No matching seeded search term was found");
      continue;
    }
    const { response, body } = await request(
      `/products?search=${encodeURIComponent(term)}`,
    );
    const count = productCount(body);
    record(
      id,
      title,
      response.ok && predicate(count) ? "PASS" : "FAIL",
      `term=${JSON.stringify(term)}, HTTP ${response.status}, count=${count}`,
    );
  }

  record(
    "TC-FR20-MOB-006",
    "Loading state",
    "MANUAL",
    "Requires mobile UI observation while the product request is delayed",
  );
  record(
    "TC-FR20-MOB-007",
    "Product request error state",
    "MANUAL",
    "Requires mobile UI observation with a controlled failed request",
  );

  return terms;
}

async function login(email, password) {
  if (!email || !password) return null;
  const { response, body } = await request("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok || !body?.token) return null;
  return { token: body.token, user: body.user };
}

async function getOrders(token) {
  const { response, body } = await request("/orders/my-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
    response,
    orders: Array.isArray(body) ? body : [],
  };
}

async function checkOrderCases() {
  if (!USER_EMAIL || !USER_PASSWORD) {
    for (const [id, title] of [
      ["TC-FR20-MOB-008", "Zero own orders"],
      ["TC-FR20-MOB-009", "Exactly one own order"],
      ["TC-FR20-MOB-010", "Multiple own orders"],
      ["TC-FR20-MOB-011", "Order ownership isolation"],
    ]) {
      record(id, title, "BLOCKED", "Set USER_EMAIL and USER_PASSWORD");
    }
    return;
  }

  const user = await login(USER_EMAIL, USER_PASSWORD);
  if (!user) {
    record("TC-FR20-MOB-008", "User login for order history", "FAIL", "Login failed");
    return;
  }

  const own = await getOrders(user.token);
  const count = own.orders.length;
  if (!own.response.ok) {
    record(
      "TC-FR20-MOB-008",
      "Order-history API access",
      "FAIL",
      `HTTP ${own.response.status}`,
    );
  } else {
    record(
      "TC-FR20-MOB-008",
      "Zero own orders",
      count === 0 ? "PASS" : "INFO",
      `userId=${user.user.id}, count=${count}`,
    );
    record(
      "TC-FR20-MOB-009",
      "Exactly one own order",
      count === 1 ? "PASS" : "INFO",
      `userId=${user.user.id}, count=${count}`,
    );
    record(
      "TC-FR20-MOB-010",
      "Multiple own orders",
      count >= 2 ? "PASS" : "INFO",
      `userId=${user.user.id}, count=${count}`,
    );
  }

  if (!OTHER_USER_EMAIL || !OTHER_USER_PASSWORD) {
    record(
      "TC-FR20-MOB-011",
      "Order ownership isolation",
      "BLOCKED",
      "Set OTHER_USER_EMAIL and OTHER_USER_PASSWORD",
    );
    return;
  }

  const other = await login(OTHER_USER_EMAIL, OTHER_USER_PASSWORD);
  if (!other) {
    record("TC-FR20-MOB-011", "Order ownership isolation", "FAIL", "Second login failed");
    return;
  }

  const otherOrders = await getOrders(other.token);
  const ownIds = new Set(own.orders.map((order) => order.id));
  const leakedIds = otherOrders.orders
    .map((order) => order.id)
    .filter((id) => ownIds.has(id));
  record(
    "TC-FR20-MOB-011",
    "Order ownership isolation",
    own.response.ok && otherOrders.response.ok && leakedIds.length === 0
      ? "PASS"
      : "FAIL",
    `userA=${user.user.id}, userB=${other.user.id}, sharedOrderIds=${JSON.stringify(
      leakedIds,
    )}`,
  );
}

async function main() {
  console.log(`FR-20 mobile API checks: ${API_URL}`);
  try {
    await checkProductCases();
    await checkOrderCases();
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log("\nID                 Status   Details");
  console.log("-".repeat(90));
  for (const result of results) {
    console.log(
      `${result.id.padEnd(18)} ${result.status.padEnd(8)} ${result.details}`,
    );
  }

  const failures = results.filter((result) => result.status === "FAIL");
  process.exitCode = failures.length > 0 ? 1 : 0;
}

main();
