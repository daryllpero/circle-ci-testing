// test.js

console.log("Running mixed CI test suite...\n");

// Helper to run tests safely
function runTest(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (err) {
    console.error(`FAIL: ${name}`);
    console.error(err.message);
  }
}

// =========================
// PASSING TESTS
// =========================

// 1. Simple math (PASS)
runTest("Addition works correctly", () => {
  const result = 40 + 60;
  if (result !== 100) throw new Error("Addition failed");
});

// 2. String test (PASS)
runTest("String includes works", () => {
  const text = "hello world";
  if (!text.includes("world")) throw new Error("String test failed");
});

// 3. Array length (PASS)
runTest("Array length is correct", () => {
  const arr = [1, 2, 3];
  if (arr.length !== 3) throw new Error("Array length incorrect");
});


// =========================
// FAILING TESTS
// =========================

// 4. Assertion failure (FAIL)
runTest("Calculation should equal 100", () => {
  const expected = 100;
  const actual = 40 + 2;
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
});

// 5. Missing dependency (FAIL)
runTest("Dependency should load", () => {
  require("totally-non-existent-package-xyz");
});

// 6. Runtime error (FAIL)
runTest("Service layer should not crash", () => {
  function crashApp() {
    throw new Error("Critical runtime failure in service layer");
  }
  crashApp();
});

// 7. Reference error (FAIL)
runTest("Variable should exist", () => {
  console.log(nonExistentVariable);
});

// 8. Type error (FAIL)
runTest("Object should not be null", () => {
  const x = null;
  x.toString();
});

// 9. Async error (FAIL)
runTest("Async call should succeed", async () => {
  async function asyncFail() {
    throw new Error("Async operation failed");
  }
  await asyncFail();
});


// =========================
// FINAL RESULT (IMPORTANT)
// =========================

console.log("\nTest suite completed.");

// Fail CI if any failures occurred
process.exit(1);