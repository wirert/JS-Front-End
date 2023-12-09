window.addEventListener("load", solve);

function solve() {
  const createTaskBtn = document.querySelector("#create-task-btn");
  const deleteTaskBtn = document.querySelector("#delete-task-btn");

  createTaskBtn.addEventListener("click", createTask);
  deleteTaskBtn.addEventListener("click", deleteTask);

  const labelSymbol = {
    Feature: "&#8865;",
    "Low Priority Bug": "&#9737;",
    "High Priority Bug": "&#9888;",
  };

  const labelClass = {
    Feature: "feature",
    "Low Priority Bug": "low-priority",
    "High Priority Bug": "high-priority",
  };

  function createTask() {
    const tasksSection = document.querySelector("#tasks-section");
    const formData = getFormData();

    if (formData === null) {
      return;
    }
    clearFormData();
    let articleNumber = tasksSection.children.length - 1;
    const taskArticle = createAndFillTaskArticle(formData, articleNumber);
    tasksSection.appendChild(taskArticle);

    const buttonDiv = createDomElement("div", "", "task-card-actions");
    taskArticle.appendChild(buttonDiv);
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    buttonDiv.appendChild(delBtn);

    delBtn.addEventListener("click", loadConfirmDelete);

    updateTotalPoints();
  }

  function deleteTask() {
    const taskId = document.querySelector("#task-id").value;
    const taskForRemove = document.querySelector(`#${taskId}`);
    const tasksSection = document.querySelector("#tasks-section");
    tasksSection.removeChild(taskForRemove);
    clearFormData();
    changeInputWritability(false);
    deleteTaskBtn.disabled = true;

    updateTotalPoints();
  }

  function loadConfirmDelete(e) {
    let articleForDel = e.currentTarget.parentElement.parentElement;
    fillFormDataForDelete(articleForDel);

    changeInputWritability(true);
    deleteTaskBtn.disabled = false;
  }

  function createAndFillTaskArticle(formData, articleNumber) {
    const taskArticle = createDomElement("article", "", "task-card");
    taskArticle.id = `task-${articleNumber}`;
    taskArticle.appendChild(
      createDomElement(
        "div",
        `${formData.label} ${labelSymbol[formData.label]}`,
        "task-card-label",
        labelClass[formData.label]
      )
    );
    taskArticle.appendChild(
      createDomElement("h3", formData.title, "task-card-title")
    );
    taskArticle.appendChild(
      createDomElement("p", formData.description, "task-card-description")
    );
    taskArticle.appendChild(
      createDomElement(
        "div",
        `Estimated at ${formData.points} pts`,
        "task-card-points"
      )
    );
    taskArticle.appendChild(
      createDomElement(
        "div",
        `Assigned to: ${formData.assignee}`,
        "task-card-assignee"
      )
    );

    return taskArticle;
  }

  function changeInputWritability(value) {
    let inputs = Array.from(
      document.querySelectorAll("input, textarea, select")
    );
    inputs.forEach((input) => (input.disabled = value));
  }

  function fillFormDataForDelete(articleForDel) {
    document.querySelector("#title").value =
      articleForDel.querySelector(".task-card-title").textContent;
    document.querySelector("#description").value = articleForDel.querySelector(
      ".task-card-description"
    ).textContent;

    const labelContent =
      articleForDel.querySelector(".task-card-label").textContent;

    const label = labelContent.split(" ");
    label.pop();
    document.querySelector("#label").value = label.join(" ");

    const pointsContent = articleForDel
      .querySelector(".task-card-points")
      .textContent.split(" ");
    const points = pointsContent[2].substring(length - 3);
    document.querySelector("#points").value = Number(points);

    const assignee = articleForDel
      .querySelector(".task-card-assignee")
      .textContent.split(": ")[1];
    document.querySelector("#assignee").value = assignee;

    document.querySelector("#task-id").value = articleForDel.id;
  }

  function createDomElement(type, content, ...classes) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    element.innerHTML = content;
    return element;
  }

  function getFormData() {
    const formData = {};

    formData.title = document.querySelector("#title").value;
    formData.description = document.querySelector("#description").value;
    formData.label = document.querySelector("#label").value;
    formData.points = document.querySelector("#points").value;
    formData.assignee = document.querySelector("#assignee").value;

    return Object.values(formData).some((value) => !value) ? null : formData;
  }

  function clearFormData() {
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#label").value = "";
    document.querySelector("#points").value = "";
    document.querySelector("#assignee").value = "";
    document.querySelector("#task-id").value = "";
  }

  function updateTotalPoints() {
    const totalPointsP = document.querySelector("#total-sprint-points");

    const pointDivs = document.querySelectorAll(".task-card-points");
    let totalPoints = Array.from(pointDivs).reduce((acc, curr) => {
      acc += Number(curr.textContent.split(" ")[2]);
      return acc;
    }, 0);

    totalPointsP.textContent = `Total Points ${totalPoints}pts`;
  }
}
