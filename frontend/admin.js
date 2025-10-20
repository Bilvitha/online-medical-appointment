async function fetchAppointments() {
  const res = await fetch("http://localhost:5000/api/appointments/all");
  const data = await res.json();

  const tableBody = document.querySelector("#appointmentsTable tbody");
  tableBody.innerHTML = "";

  data.forEach(app => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${app.name}</td>
      <td>${app.age}</td>
      <td>${app.email}</td>
      <td>${app.phone}</td>
      <td>${app.date}</td>
      <td>${app.doctor}</td>
      <td>${app.reason}</td>
      <td><button onclick="deleteAppointment('${app._id}')">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

async function deleteAppointment(id) {
  if (confirm("Are you sure you want to delete this appointment?")) {
    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    fetchAppointments();
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

fetchAppointments();
