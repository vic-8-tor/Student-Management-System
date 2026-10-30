const form = document.getElementById("addStudentForm");
const studentsContainer = document.getElementById("studentsContainer");
const searchStudents = document.getElementById("searchStudents");
const success = document.getElementById("success");
const API = "https://student-management-system-l0o6.onrender.com";

// Search Students
if (searchStudents) {
  searchStudents.addEventListener("input", () => {
    const text = searchStudents.value.toLowerCase();

    document.querySelectorAll(".student").forEach((studentDiv) => {
      studentDiv.style.display = studentDiv.dataset.search.includes(text) ? "" : "none";
    });
  });
}

// Add Students
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const age = document.getElementById("age").value;
    const score = document.getElementById("score").value;

    const response = await fetch(`${API}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        course,
        age,
        score,
      }),
    });

    if (response) {
      success.style.display = "block";
    }

    const data = await response.json();
    console.log(data);
    form.reset();
  });
}

// Display
async function getStudents() {
  if (!studentsContainer) return;

  const response = await fetch(`${API}/students`);

  const data = await response.json();

  const students = data.students;

  studentsContainer.innerHTML = "";
  students.forEach((student) => {
    const div = document.createElement("div");
    div.className = "student";
    div.dataset.search =
      `${student.name} ${student.email} ${student.course}`.toLowerCase();
    div.innerHTML = `
        <h3>Name: ${student.name}</h3>
        <p>Email: ${student.email}</p>
        <p>Course: ${student.course}</p>
        <p>Score: ${student.score}</p>
        <p>Age: ${student.age}</p>
        <div class="updateAndDelte">
          <button class="deleteBtn">Delete</button>
          <button class="updateBtn">Edit</button>
        </div>`;

    studentsContainer.appendChild(div);

    // Update
    const updateBtn = div.querySelector(".updateBtn");
    updateBtn.addEventListener("click", () => {
      div.innerHTML = `
        <input type="text" class="name" value="${student.name}">
        <input type="email" class="email" value="${student.email}">
        <input type="text" class="course" value="${student.course}">
        <div class="ageScoreUpdate">
          <input type="number" class="score" value="${student.score}">
          <input type="number" class="age" value="${student.age}">
        </div>
        <div class="updateAndDelte">
          <button class="cancelBtn">Cancel</button>
          <button class="saveBtn">Save</button>
        </div>`;

      div.querySelector(".cancelBtn").addEventListener("click", getStudents);

      div.querySelector(".saveBtn").addEventListener("click", async () => {
        const response = await fetch(`${API}/students/${student._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: div.querySelector(".name").value,
            email: div.querySelector(".email").value,
            course: div.querySelector(".course").value,
            score: div.querySelector(".score").value,
            age: div.querySelector(".age").value,
          }),
        });
        if (response.ok) getStudents();
      });
    });

    // Delete
    const deleteBtn = div.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", async () => {
      console.log("clicked");
      const response = await fetch(`${API}/students/${student._id}`, {
        method: "DELETE",
      });
      if (response.ok) div.remove();
    });
  });
}

getStudents();
