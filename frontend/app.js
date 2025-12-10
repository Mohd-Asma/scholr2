const API_URL = "http://localhost:5000";

// --- LOGIN ---
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if(data.role === "admin") window.location = "admin.html";
        else if(data.role === "student") window.location = "student.html";
        else alert("Invalid Login");
    })
    .catch(err => alert("Login failed"));
}

// --- REGISTER ---
function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    })
    .then(res => res.text())
    .then(data => alert(data))
    .catch(err => alert("Registration failed"));
}

// --- ADMIN: Add Scholarship ---
function addScholarship() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const deadline = document.getElementById("deadline").value;

    fetch(`${API_URL}/scholarships/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, amount, deadline })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadScholarships();
    })
    .catch(err => alert("Failed to add scholarship"));
}

// --- Load Scholarships for Admin ---
function loadScholarships() {
    fetch(`${API_URL}/scholarships`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#scholarshipTable tbody");
        tbody.innerHTML = "";
        data.forEach(s => {
            tbody.innerHTML += `<tr>
                <td>${s.id}</td>
                <td>${s.title}</td>
                <td>${s.description}</td>
                <td>${s.amount}</td>
                <td>${s.deadline}</td>
            </tr>`;
        });
    });
}

// --- Load Applications for Admin ---
function loadApplications() {
    fetch(`${API_URL}/applications`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#applicationTable tbody");
        tbody.innerHTML = "";
        data.forEach(a => {
            tbody.innerHTML += `<tr>
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.title}</td>
                <td>${a.status}</td>
            </tr>`;
        });
    });
}

// --- Load Scholarships for Student ---
function loadScholarshipsStudent() {
    fetch(`${API_URL}/scholarships`)
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector("#scholarshipTable tbody");
        tbody.innerHTML = "";
        data.forEach(s => {
            tbody.innerHTML += `<tr>
                <td>${s.id}</td>
                <td>${s.title}</td>
                <td>${s.description}</td>
                <td>${s.amount}</td>
                <td>${s.deadline}</td>
                <td><button onclick="apply(${s.id})">Apply</button></td>
            </tr>`;
        });
    });
}

// --- Apply Scholarship (Student) ---
function apply(scholarship_id) {
    const student_id = 1; // You can replace with logged-in student ID
    fetch(`${API_URL}/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id, scholarship_id })
    })
    .then(res => res.text())
    .then(data => alert(data))
    .catch(err => alert("Application failed"));
}

// --- Initialize Pages ---
if(document.getElementById("scholarshipTable") && window.location.pathname.includes("admin.html")) {
    loadScholarships();
    loadApplications();
}

if(document.getElementById("scholarshipTable") && window.location.pathname.includes("student.html")) {
    loadScholarshipsStudent();
}
