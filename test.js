// test.js

console.log("Running CI failure-focused test suite...\n");

let failCount = 0;

// stack trace enable
function fail(testName, message) {
  failCount++;

  const err = new Error(message);

  console.error(`FAIL: ${testName}`);
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
}

// =========================
// FAILING TESTS
// =========================

// 1. Assertion failure
(() => {
  const expected = 100;
  const actual = 42;

  if (actual !== expected) {
    fail(
      "Calculation should equal 100",
      `Assertion failed: expected ${expected}, received ${actual}`
    );
  }
})();

// 2. Missing dependency
(() => {
  try {
    require("totally-non-existent-package-xyz");
  } catch (err) {
    fail(
      "Dependency should load",
      `Cannot find module 'totally-non-existent-package-xyz'`
    );
  };
})();

// 3. Runtime failure
(() => {
  try {
    throw new Error("Database connection timeout");
  } catch (err) {
    fail(
      "Service layer should not crash",
      err.message
    );
  }
})();

// 4. Reference error
(() => {
  try {
    console.log(nonExistentVariable);
  } catch (err) {
    fail(
      "Variable should exist",
      err.message
    );
  }
})();

// 5. Type error
(() => {
  try {
    const user = null;
    user.toString();
  } catch (err) {
    fail(
      "User object should not be null",
      err.message
    );
  }
})();

// 6. Async failure
(async () => {
  try {
    throw new Error("API responded with 500 Internal Server Error");
  } catch (err) {
    fail(
      "Async API call should succeed",
      err.message
    );
  } finally {
    finish();
  }
})();

// =========================
// FINAL
// =========================

function finish() {
  console.log(`\nSUMMARY: ${failCount} tests failed`);

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}