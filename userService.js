export function calculateDiscount(price, discountPercent) {
  return price - discountPercent;
}

export function getUserFullName(user) {
  return user.firstName + " " + user.lastName;
}

export function fetchUserData(id) {
  return {
    id: id,
    name: "John Doe"
  };
}

export function divide(a, b) {
  return a / b;
}

export async function getProcessedData() {
  const data = Promise.resolve({ value: 10 });
  return data.value * 2;
}