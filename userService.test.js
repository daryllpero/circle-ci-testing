import {
  calculateDiscount,
  getUserFullName,
  fetchUserData,
  divide,
  getProcessedData
} from "./userService.js";

// Async-aware test runner
async function test(name, fn) {
  try {
    await fn();
    console.log(`PASS: ${name}`);
  } catch (err) {
    console.error(`FAIL: ${name}`);
    console.error(err.message);
  }
}

// Run all tests sequentially
async function runTests() {

  // 1. Discount
  await test("calculateDiscount should apply percentage correctly", () => {
    const result = calculateDiscount(200, 10);
    if (result !== 180) {
      throw new Error(`Expected 180, got ${result}`);
    }
  });

  // 2. Full name
  await test("getUserFullName should return fallback for null", () => {
    const result = getUserFullName(null);
    if (result !== "Unknown User") {
      throw new Error(`Expected 'Unknown User', got ${result}`);
    }
  });

  // 3. API structure
  await test("fetchUserData should return correct structure", () => {
    const user = fetchUserData(1);
    if (!user.firstName || !user.lastName) {
      throw new Error("Invalid user structure");
    }
  });

  // 4. Divide
  await test("divide should handle divide by zero", () => {
    const result = divide(10, 0);
    if (result !== null) {
      throw new Error(`Expected null, got ${result}`);
    }
  });

  // 5. Async
  await test("getProcessedData should return processed value", async () => {
    const result = await getProcessedData();
    if (result !== 20) {
      throw new Error(`Expected 20, got ${result}`);
    }
  });
}

runTests();