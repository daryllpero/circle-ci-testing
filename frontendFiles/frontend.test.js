import { sum, getUser } from "./frontend.js";

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (err) {
    console.error(`FAIL: ${name}`);
    console.error(err.message);
  }
}

test("sum should add numbers", () => {
  const result = sum(1, 2);
  if (result !== 3) {
    throw new Error(`Expected 3, got ${result}`);
  }
});

test("getUser should handle null", () => {
  const result = getUser(null);
  if (result !== "UNKNOWN") {
    throw new Error("Expected UNKNOWN");
  }
});