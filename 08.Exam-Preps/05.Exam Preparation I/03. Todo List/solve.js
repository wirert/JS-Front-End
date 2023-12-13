const URL = `http://localhost:3030/jsonstore/tasks/`;
const toDoList = document.querySelector("#todo-list");
const taskNameInput = document.querySelector("#title");

function attachEvents() {
  document
    .querySelector("#load-button")
    .addEventListener("click", loadAllTasks);

  document.querySelector("#add-button").addEventListener("click", addNewTask);
}

function loadAllTasks(e) {
  e.preventDefault();
  fetch(URL)
    .then((res) => res.json())
    .then((tasks) => {
      toDoList.textContent = "";

      Object.values(tasks).forEach((task) => {
        toDoList.appendChild(createTaskElement(task));
      });
    })
    .catch((err) => console.log(err));
}

function addNewTask(e) {
  e.preventDefault();
  if (!taskNameInput.value) {
    return;
  }
  fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: taskNameInput.value }),
  })
    .then((res) => {
      if (res.ok) {
        taskNameInput.value = "";
        loadAllTasks(e);
      }
    })
    .catch((err) => console.log(err));
}

function removeTask(e) {
  const id = e.currentTarget.dataset.id;
  fetch(`${URL}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        loadAllTasks(e);
      }
    })
    .catch((err) => console.log(err));
}

function editTask(e) {
  const id = e.currentTarget.dataset.id;
  const taskLi = e.currentTarget.parentElement;
  const nameSpan = taskLi.querySelector("span");
  const editInput = document.createElement("input");
  editInput.value = nameSpan.textContent;

  taskLi.replaceChild(editInput, nameSpan);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";

  taskLi.replaceChild(submitBtn, e.currentTarget);

  submitBtn.addEventListener("click", () => {
    if (!editInput.value) {
      return;
    }

    fetch(`${URL}${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: editInput.value }),
    })
      .then((res) => {
        if (res.ok) {
          loadAllTasks(e);
        }
      })
      .catch((err) => console.log(err));
  });
}

function createTaskElement(task) {
  const taskLi = document.createElement("li");
  const nameSpan = document.createElement("span");
  nameSpan.textContent = task.name;
  taskLi.appendChild(nameSpan);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.dataset.id = task._id;
  taskLi.appendChild(removeBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.dataset.id = task._id;
  taskLi.appendChild(editBtn);

  editBtn.addEventListener("click", editTask);
  removeBtn.addEventListener("click", removeTask);

  return taskLi;
}

attachEvents();
