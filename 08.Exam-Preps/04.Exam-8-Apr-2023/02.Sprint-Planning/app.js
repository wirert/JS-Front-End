window.addEventListener("load", solve);

function solve() {
  const inputs = {
    id: document.querySelector("#task-id"),
    title: document.querySelector("#title"),
    description: document.querySelector("#description"),
    label: document.querySelector("#label"),
    points: document.querySelector("#points"),
    assignee: document.querySelector("#assignee"),
  };
  const selections = {
    createTaskBtn: document.querySelector("#create-task-btn"),
    deleteTaskBtn: document.querySelector("#delete-task-btn"),
    form: document.querySelector("#create-task-form"),
    tasksSection: document.querySelector("#tasks-section"),
  };
  const labelSymbols = {
    Feature: "&#8865;",
    "Low Priority Bug": "&#9737;",
    "High Priority Bug": "&#9888;",
  };
  const labelClass = {
    Feature: "feature",
    "Low Priority Bug": "low-priority",
    "High Priority Bug": "high-priority",
  };
  const tasks = {};

  selections.deleteTaskBtn.addEventListener("click", deleteTask);
  selections.createTaskBtn.addEventListener("click", createTask);

  function deleteTask(e) {
    const id = inputs.id.value;
    console.log(id);
    const elementForDelete = document.querySelector(`#${id}`);

    elementForDelete.remove();
    delete tasks[id];

    selections.form.reset();
    changeInputWritability();
    selections.deleteTaskBtn.disabled = true;
    selections.createTaskBtn.disabled = false;

    updateTotalPoints();
  }

  function createTask(e) {
    e.preventDefault();
    const task = {
      id: `task-${Object.keys(tasks).length + 1}`,
      title: inputs.title.value,
      description: inputs.description.value,
      label: inputs.label.value,
      points: Number(inputs.points.value),
      assignee: inputs.assignee.value,
    };

    if (Object.values(task).some((input) => !input)) {
      return;
    }

    tasks[task.id] = task;
    const taskArticle = createAndFillTaskArticle(task);
    selections.tasksSection.appendChild(taskArticle);

    const btnDiv = createDomElement("div", null, "task-card-actions");
    const delBtn = createDomElement("button", "Delete");
    btnDiv.appendChild(delBtn);
    taskArticle.appendChild(btnDiv);

    updateTotalPoints();

    delBtn.addEventListener("click", loadConfirmDelete);

    selections.form.reset();

    function loadConfirmDelete() {
      Object.entries(inputs).forEach(([key, input]) => {
        input.value = task[key];
        input.disabled = true;
      });

      selections.deleteTaskBtn.disabled = false;
      selections.createTaskBtn.disabled = true;
    }
  }

  function createAndFillTaskArticle(task) {
    const taskArticle = createDomElement("article", null, "task-card");
    taskArticle.id = task.id;
    taskArticle.appendChild(
      createDomElement(
        "div",
        `${task.label} ${labelSymbols[task.label]}`,
        "task-card-label",
        labelClass[task.label]
      )
    );
    taskArticle.appendChild(
      createDomElement("h3", task.title, "task-card-title")
    );
    taskArticle.appendChild(
      createDomElement("p", task.description, "task-card-description")
    );
    taskArticle.appendChild(
      createDomElement(
        "div",
        `Estimated at ${task.points} pts`,
        "task-card-points"
      )
    );
    taskArticle.appendChild(
      createDomElement(
        "div",
        `Assigned to: ${task.assignee}`,
        "task-card-assignee"
      )
    );

    return taskArticle;
  }

  function changeInputWritability(value) {
    Object.values(inputs).forEach((input) => (input.disabled = value));
  }

  function createDomElement(type, content, ...classes) {
    const element = document.createElement(type);
    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }

    if (content && classes.includes("task-card-label")) {
      element.innerHTML = content;
    } else if (content) {
      element.textContent = content;
    }

    return element;
  }

  function updateTotalPoints() {
    const totalPointsP = document.querySelector("#total-sprint-points");

    let totalPoints = Object.values(tasks).reduce((acc, curr) => {
      acc += curr.points;
      return acc;
    }, 0);

    totalPointsP.textContent = `Total Points ${totalPoints}pts`;
  }
}
