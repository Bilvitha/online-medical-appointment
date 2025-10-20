const authSection = document.getElementById("authSection");
const signupSection = document.getElementById("signupSection");
const appointmentSection = document.getElementById("appointmentSection");

const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const appointmentForm = document.getElementById("appointmentForm");

const message = document.getElementById("message");

signupBtn.addEventListener("click", () => {
  authSection.style.display = "none";
  signupSection.style.display = "block";
});

// Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    signupSection.style.display = "none";
    authSection.style.display = "block";
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    authSection.style.display = "none";
    appointmentSection.style.display = "block";
  } else {
    alert(data.message);
  }
});

// Book Appointment
appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    doctor: document.getElementById("doctor").value,
    reason: document.getElementById("reason").value,
  };

  const res = await fetch("http://localhost:5000/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  message.innerText = data.message;
});
