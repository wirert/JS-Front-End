const addBtn = document.querySelector("#add-vacation");
const editBtn = document.querySelector("#edit-vacation");
const formEl = document.querySelector("form");
const nameInput = document.querySelector("#name");
const dateInput = document.querySelector("#from-date");
const daysInput = document.querySelector("#num-days");

document
  .querySelector("#load-vacations")
  .addEventListener("click", loadVacationsHandler);

editBtn.addEventListener("click", editVacationHandler);
addBtn.addEventListener("click", addVacationHandler);

function loadVacationsHandler() {
  fetch("http://localhost:3030/jsonstore/tasks/")
    .then((res) => res.json())
    .then((vacations) => {
      const vacationsList = document.querySelector("#list");
      vacationsList.textContent = "";
      editBtn.disabled = "true";
      Object.values(vacations).forEach((vacation) =>
        vacationsList.appendChild(createVacationDiv(vacation))
      );
    })
    .catch((_) => {
      return;
    });
}

function addVacationHandler(e) {
  e.preventDefault();

  if (!nameInput.value || !daysInput.value || !dateInput.value) {
    return;
  }
  fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      days: daysInput.value,
      date: dateInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        formEl.reset();
        loadVacationsHandler();
      }
    })
    .catch((_) => {
      return;
    });
}

function editVacationHandler(e) {
  e.preventDefault();
  if (!nameInput.value || !daysInput.value || !dateInput.value) {
    return;
  }

  const id = editBtn.dataset.id;

  fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      days: daysInput.value,
      date: dateInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        formEl.reset();
        loadVacationsHandler();
        addBtn.disabled = false;
      }
    })
    .catch(() => {
      return;
    });
}

function changeVacationHandler(e) {
  let vacDiv = e.currentTarget.parentElement;
  nameInput.value = vacDiv.querySelector("h2").textContent;
  dateInput.value = vacDiv.querySelector("h3").textContent;
  daysInput.value = vacDiv.querySelector("h3:nth-of-type(2)").textContent;
  addBtn.disabled = true;
  editBtn.disabled = false;
  editBtn.dataset.id = e.currentTarget.dataset.id;
  vacDiv.remove();
}

function deleteVacation(e) {
  const id = e.currentTarget.dataset.id;
  fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        loadVacationsHandler();
      }
    })
    .catch((_) => {
      return;
    });
}

function createVacationDiv(vacation) {
  const vacDiv = document.createElement("div");
  vacDiv.classList.add("container");
  const nameH2 = document.createElement("h2");
  nameH2.textContent = vacation.name;
  vacDiv.appendChild(nameH2);

  const date = document.createElement("h3");
  date.textContent = vacation.date;
  vacDiv.appendChild(date);

  const days = document.createElement("h3");
  days.textContent = vacation.days;
  vacDiv.appendChild(days);

  const changeBtn = document.createElement("button");
  changeBtn.classList.add("change-btn");
  changeBtn.dataset.id = vacation._id;
  changeBtn.textContent = "Change";
  vacDiv.appendChild(changeBtn);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn");
  doneBtn.dataset.id = vacation._id;
  doneBtn.textContent = "Done";
  vacDiv.appendChild(doneBtn);

  changeBtn.addEventListener("click", changeVacationHandler);

  doneBtn.addEventListener("click", deleteVacation);

  return vacDiv;
}
