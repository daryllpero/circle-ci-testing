// test.js

console.log("Running complex CI failure test...");

// 1. Logic/Test failure (realistic assertion)
const expected = 100;
const actual = 40 + 2;

if (actual !== expected) {
  console.error(`Test Failed: Expected ${expected}, but got ${actual}`);
}

// 2. Missing dependency (VERY common in real projects)
try {
  require("totally-non-existent-package-xyz");
} catch (err) {
  console.error("Dependency Error:", err.message);
}

// 3. Runtime error
function crashApp() {
  throw new Error("Critical runtime failure in service layer");
}

try {
  crashApp();
} catch (err) {
  console.error("Runtime Error:", err.message);
}

// 4. Reference error (undefined variable)
try {
  console.log(nonExistentVariable);
} catch (err) {
  console.error("Reference Error:", err.message);
}

// 5. Type error
try {
  const x = null;
  x.toString();
} catch (err) {
  console.error("Type Error:", err.message);
}

// 6. Async error (common in APIs)
async function asyncFail() {
  throw new Error("Async operation failed");
}

asyncFail().catch(err => {
  console.error("Async Error:", err.message);
});

// Force CI to fail (IMPORTANT)
process.exit(1);