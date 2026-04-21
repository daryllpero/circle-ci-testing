// test.js

console.log("Running test...");

// Real logic test
const expected = 5;
const actual = 2 + 2;

// This will fail naturally
if (actual !== expected) {
  throw new Error(`Expected ${expected}, but got ${actual}`);
}

console.log("Test passed!");