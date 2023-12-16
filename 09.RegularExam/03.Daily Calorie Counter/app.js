const baseURL = "http://localhost:3030/jsonstore/tasks/";

const addBtn = document.querySelector("#add-meal");
const editBtn = document.querySelector("#edit-meal");
const loadBtn = document.querySelector("#load-meals");

const inputs = {
  food: document.querySelector("#food"),
  time: document.querySelector("#time"),
  calories: document.querySelector("#calories"),
};

const selections = {
  mealList: document.querySelector("#list"),
  form: document.querySelector("#form form"),
};

loadBtn.addEventListener("click", loadMealsHandler);
addBtn.addEventListener("click", addMealHandler);
editBtn.addEventListener("click", editMealHandler);

function loadMealsHandler(e) {
  e.preventDefault();

  fetch(baseURL)
    .then((res) => res.json())
    .then((meals) => {
      selections.mealList.textContent = "";

      Object.values(meals).forEach((meal) =>
        selections.mealList.appendChild(renderMeal(meal))
      );

      editBtn.disabled = true;
    })
    .catch((err) => console.log(err));
}

function addMealHandler(e) {
  e.preventDefault();

  const meal = {
    food: inputs.food.value,
    calories: inputs.calories.value,
    time: inputs.time.value,
  };

  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(meal),
  })
    .then((res) => {
      if (res.ok) {
        selections.form.reset();
        loadMealsHandler(e);
      }
    })
    .catch((err) => console.log(err));
}

function editMealHandler(e) {
  e.preventDefault();
  const id = e.currentTarget.dataset.id;
  const editedMeal = {
    food: inputs.food.value,
    calories: inputs.calories.value,
    time: inputs.time.value,
  };

  fetch(`${baseURL}${id}`, {
    method: "PUT",
    body: JSON.stringify(editedMeal),
  })
    .then((res) => {
      if (res.ok) {
        selections.form.reset();
        loadMealsHandler(e);

        editBtn.removeAttribute("data-id");
        editBtn.disabled = true;
        addBtn.disabled = false;
      }
    })
    .catch((err) => console.log(err));
}

function changeMealHandler(e) {
  e.preventDefault();
  const currMealDiv = e.currentTarget.parentElement.parentElement;
  const id = currMealDiv.dataset.id;
  inputs.food.value = currMealDiv.querySelector("h2").textContent;
  const h3s = currMealDiv.querySelectorAll("h3");
  inputs.time.value = h3s[0].textContent;
  inputs.calories.value = h3s[1].textContent;

  currMealDiv.remove();

  addBtn.disabled = true;
  editBtn.disabled = false;
  editBtn.dataset.id = id;
}

function deleteMealHandler(e) {
  e.preventDefault();
  const id = e.currentTarget.parentElement.parentElement.dataset.id;
  fetch(`${baseURL}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        loadMealsHandler(e);
      }
    })
    .catch((err) => console.log(err));
}

function renderMeal(meal) {
  const mealDiv = createDomElement("div", null, "meal");
  mealDiv.dataset.id = meal._id;
  mealDiv.appendChild(createDomElement("h2", meal.food));
  mealDiv.appendChild(createDomElement("h3", meal.time));
  mealDiv.appendChild(createDomElement("h3", meal.calories));

  const btnsDiv = createDomElement("div");
  btnsDiv.id = "meal-buttons";

  const changeBtn = createDomElement("button", "Change", "change-meal");
  const deleteBtn = createDomElement("button", "Delete", "delete-meal");

  btnsDiv.appendChild(changeBtn);
  btnsDiv.appendChild(deleteBtn);
  mealDiv.appendChild(btnsDiv);

  changeBtn.addEventListener("click", changeMealHandler);
  deleteBtn.addEventListener("click", deleteMealHandler);

  return mealDiv;
}

function createDomElement(name, content, ...classes) {
  const element = document.createElement(name);
  if (content) {
    element.textContent = content;
  }
  if (classes && classes != "") {
    element.classList.add(...classes);
  }
  return element;
}
