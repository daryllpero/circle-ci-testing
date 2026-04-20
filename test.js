// test.js

console.log("Running test...");

throw new Error("Intentional failure for CI testing");

// Simulate success (for now)
console.log("Test passed!");