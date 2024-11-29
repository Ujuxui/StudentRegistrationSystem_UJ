// Selecting the form and table elements
const registrationForm = document.getElementById("form");
const studentTableBody = document.getElementById("studentTableBody");

// Getting existing data from localStorage
let students;
if (localStorage.getItem("students") !== null) {
  students = JSON.parse(localStorage.getItem("students"));
} else {
  students = [];
}


// Rendering student records in the table
function renderStudents() {
  studentTableBody.innerHTML = ""; // Clearing table before rendering
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;

    studentTableBody.appendChild(row);
  });

  addEventListenersToButtons();
}

// Validating form inputs
function validateInputs(name, studentId, email, contact) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const idRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]+$/;

  if (!nameRegex.test(name)) {
    alert("Name must contain only alphabets.");
    return false;
  }
  if (!idRegex.test(studentId)) {
    alert("Student ID must contain only numbers.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!contactRegex.test(contact)) {
    alert("Contact number must contain only numbers.");
    return false;
  }
  return true;
}

// Adding a new student record
function addStudent(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validating inputs
  if (!validateInputs(name, studentId, email, contact)) return;

  // Adding the student record
  students.push({ name, studentId, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();

  // Clearing the form
  registrationForm.reset();

  
  // Displaying the success alert
  alert("Registration done successfully!");
}

// Editing a student record
function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Removing the student from the list temporarily
  students.splice(index, 1);

  // Updating the localStorage
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();

}


// Now deleting a student record
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }
}

// Adding event listeners to the Edit and Delete buttons
function addEventListenersToButtons() {
  document.querySelectorAll(".editBtn").forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      editStudent(index);
    })
  );

  document.querySelectorAll(".deleteBtn").forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteStudent(index);
    })
  );
}

// Adding event listener to form submission
registrationForm.addEventListener("submit", addStudent);

// Rendering existing students on page load
document.addEventListener("DOMContentLoaded", renderStudents);
