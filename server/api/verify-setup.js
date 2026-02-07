// const fetch = require('node-fetch'); // Native fetch is available in Node 18+

const BASE_URL = "http://localhost:3000/api";

async function verify() {
  console.log("--- Starting Verification ---");

  // 1. Register Buyer
  console.log("\n1. Testing Registration...");
  const randomEmail = `test${Math.floor(Math.random() * 1000)}@example.com`;
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Buyer",
      email: randomEmail,
      password: "password123",
    }),
  });

  const registerData = await registerRes.json();
  console.log("Registration Status:", registerRes.status);
  console.log("Registration Response:", registerData);

  if (registerRes.status !== 201) {
    console.error("Registration Failed");
    return;
  }

  const token = registerData.token;

  // 2. Login
  console.log("\n2. Testing Login...");
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: randomEmail,
      password: "password123",
    }),
  });
  const loginData = await loginRes.json();
  console.log("Login Status:", loginRes.status);

  if (loginRes.status !== 200) {
    console.error("Login Failed");
    return;
  }

  // 3. Test Protected Route (Admin) as Buyer (Should fail)
  console.log("\n3. Testing Admin Route as Buyer (Should Fail)...");
  const adminRes = await fetch(`${BASE_URL}/admin/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Admin Access Status:", adminRes.status); // Should be 403

  if (adminRes.status === 403) {
    console.log("SUCCESS: Access Forbidden as expected.");
  } else {
    console.error("FAILURE: Unexpected status code for admin route.");
  }

  console.log("\n--- Verification Complete ---");
}

// Check if fetch is available (Node 18+) or install node-fetch if needed
if (!globalThis.fetch) {
  console.log(
    "Fetch not found, please run verification manually or use Node 18+",
  );
} else {
  verify();
}
