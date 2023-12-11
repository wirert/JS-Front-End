function attachEvents() {
  document
    .querySelector("#load-board-btn")
    .addEventListener("click", loadBoardHandler);

  document
    .querySelector("#create-task-btn")
    .addEventListener("click", createTaskHandler);
}
const tasksInfos = {
  ToDo: {
    ul: document.querySelector("#todo-section .task-list"),
    buttonText: "Move to In Progress",
    buttonChangedStatus: "In Progress",
  },
  "In Progress": {
    ul: document.querySelector("#in-progress-section .task-list"),
    buttonText: "Move to Code Review",
    buttonChangedStatus: "Code Review",
  },
  "Code Review": {
    ul: document.querySelector("#code-review-section .task-list"),
    buttonText: "Move to Done",
    buttonChangedStatus: "Done",
  },
  Done: {
    ul: document.querySelector("#done-section .task-list"),
    buttonText: "Close",
    buttonChangedStatus: "Delete",
  },
};

function loadBoardHandler() {
  fetch("http://localhost:3030/jsonstore/tasks/")
    .then((res) => res.json())
    .then((tasks) => {
      const taskLists = document.querySelectorAll(".task-list");
      Array.from(taskLists).forEach((ul) => (ul.textContent = ""));
      Object.values(tasks).forEach((task) => createTaskDomElement(task));
    })
    .catch((err) => console.log(err));
}

function createTaskHandler() {
  const titleEl = document.querySelector("#title");
  const descriptionEl = document.querySelector("#description");

  if (!titleEl.value || !descriptionEl.value) {
    return;
  }

  fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: titleEl.value,
      description: descriptionEl.value,
      status: "ToDo",
    }),
  })
    .then((res) => {
      if (res.ok) {
        titleEl.value = "";
        descriptionEl.value = "";
        loadBoardHandler();
      }
    })
    .catch((_) => {
      return;
    });
}

function createTaskDomElement(task) {
  const taskUl = tasksInfos[task.status].ul;
  const taskLi = document.createElement("li");
  taskLi.classList.add("task");
  taskUl.appendChild(taskLi);
  const taskHeading = document.createElement("h3");
  taskHeading.textContent = task.title;
  taskLi.appendChild(taskHeading);

  const taskDescP = document.createElement("p");
  taskDescP.textContent = task.description;
  taskLi.appendChild(taskDescP);

  const button = document.createElement("button");
  button.textContent = tasksInfos[task.status].buttonText;
  button.setAttribute("data-id", task._id);
  taskLi.appendChild(button);

  button.addEventListener("click", changeStatusHandler);
}

function changeStatusHandler(e) {
  const taskSection = e.currentTarget.parentElement.parentElement.parentElement;
  const columnName = taskSection.querySelector("h1").textContent;

  const status = tasksInfos[columnName].buttonChangedStatus;
  const id = e.currentTarget.dataset.id;

  if (status === "Delete") {
    fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          loadBoardHandler();
        }
      })
      .catch((_) => {
        return;
      });
  } else {
    fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((res) => {
        if (res.ok) {
          loadBoardHandler();
        }
      })
      .catch((_) => {
        return;
      });
  }
}

attachEvents();
