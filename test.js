// test.js

console.log("Running CI failure-focused test suite...\n");

// Track failures
let failCount = 0;

// Helper
function fail(testName, message) {
  failCount++;
  console.error(`FAIL: ${testName}`);
  console.error(message);
}

// =========================
// FAILING TESTS ONLY
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
      `Module resolution failed: ${err.message}`
    );
  }
})();

// 3. Runtime failure
(() => {
  try {
    const service = () => {
      throw new Error("Database connection timeout");
    };
    service();
  } catch (err) {
    fail(
      "Service layer should not crash",
      `Runtime failure: ${err.message}`
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
      `Reference error: ${err.message}`
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
      `Type error: ${err.message}`
    );
  }
})();

// 6. Async failure
(async () => {
  try {
    const fetchData = async () => {
      throw new Error("API responded with 500 Internal Server Error");
    };
    await fetchData();
  } catch (err) {
    fail(
      "Async API call should succeed",
      `Async error: ${err.message}`
    );
  } finally {
    finish();
  }
})();

// =========================
// FINAL RESULT
// =========================

function finish() {
  console.log(`\nSUMMARY: ${failCount} tests failed`);

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}