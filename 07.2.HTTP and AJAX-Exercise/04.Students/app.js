function attachEvents() {
  window.addEventListener("load", showStudents);

  document.querySelector("#submit").addEventListener("click", addStudent);
}

async function showStudents() {
  const students = await (
    await fetch("http://localhost:3030/jsonstore/collections/students")
  ).json();

  const tableBody = document.querySelector("tbody");
  tableBody.textContent = "";

  Object.values(students).forEach((student) => {
    tableBody.appendChild(createStudentEntry(student));
  });
}

async function addStudent() {
  const firstNameInput = document.querySelector('input[name="firstName"]');
  const lastNameInput = document.querySelector('input[name="lastName"]');
  const facultyNumberInput = document.querySelector(
    'input[name="facultyNumber"]'
  );
  const gradeInput = document.querySelector('input[name="grade"]');

  if (
    !firstNameInput.value ||
    !lastNameInput.value ||
    !Number(facultyNumberInput.value) ||
    !Number(gradeInput.value)
  ) {
    return;
  }

  await fetch("http://localhost:3030/jsonstore/collections/students", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      facultyNumber: facultyNumberInput.value,
      grade: gradeInput.value,
    }),
  });

  firstNameInput.value = "";
  lastNameInput.value = "";
  facultyNumberInput.value = "";
  gradeInput.value = "";

  showStudents();
}

function createStudentEntry(student) {
  const tableRow = document.createElement("tr");
  tableRow.appendChild(createCell(student.firstName));
  tableRow.appendChild(createCell(student.lastName));
  tableRow.appendChild(createCell(student.facultyNumber));
  tableRow.appendChild(createCell(student.grade));

  return tableRow;
}

function createCell(content) {
  const cell = document.createElement("td");
  cell.textContent = content;
  return cell;
}

attachEvents();
