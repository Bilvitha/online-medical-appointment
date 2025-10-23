// Elements
const authSection = document.getElementById("authSection");
const signupSection = document.getElementById("signupSection");
const appointmentSection = document.getElementById("appointmentSection");

const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const appointmentForm = document.getElementById("appointmentForm");

const message = document.getElementById("message");

// Backend URL
const BASE_URL = "http://localhost:5000";

// Create Logout button
const logoutBtn = document.createElement("button");
logoutBtn.innerText = "Logout";
logoutBtn.style.display = "none";
logoutBtn.style.marginBottom = "10px";
logoutBtn.style.padding = "8px 12px";
logoutBtn.style.border = "none";
logoutBtn.style.borderRadius = "6px";
logoutBtn.style.backgroundColor = "#f44336";
logoutBtn.style.color = "#fff";
logoutBtn.style.cursor = "pointer";
authSection.before(logoutBtn);

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  authSection.style.display = "block";
  signupSection.style.display = "none";
  appointmentSection.style.display = "none";
  logoutBtn.style.display = "none";
  message.innerText = "";
});

// Show Signup form
signupBtn.addEventListener("click", () => {
  authSection.style.display = "none";
  signupSection.style.display = "block";
});

// Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) return alert("Email and password are required.");

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      signupSection.style.display = "none";
      authSection.style.display = "block";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Network error during signup");
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) return alert("Email and password are required.");

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      authSection.style.display = "none";
      signupSection.style.display = "none";
      appointmentSection.style.display = "block";
      logoutBtn.style.display = "inline-block";
      message.innerText = "";
      alert(data.message || "Login successful!");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Network error during login");
  }
});

// Book appointment
appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) return alert("Please login first.");

  const formData = {
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    date: document.getElementById("date").value,
    doctor: document.getElementById("doctor").value,
    reason: document.getElementById("reason").value.trim(),
  };

  try {
    const res = await fetch(`${BASE_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    message.innerText = data.message || "Appointment booking failed";
    appointmentForm.reset();
  } catch (err) {
    console.error(err);
    message.innerText = "Appointment booking failed";
  }
});

// Persist login on page load
window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  if (token) {
    authSection.style.display = "none";
    signupSection.style.display = "none";
    appointmentSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    authSection.style.display = "block";
    signupSection.style.display = "none";
    appointmentSection.style.display = "none";
    logoutBtn.style.display = "none";
  }
});
