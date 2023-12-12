const editBtn = document.querySelector("#edit-weather");
const addBtn = document.querySelector("#add-weather");

document
  .querySelector("#load-history")
  .addEventListener("click", loadHistoryHandler);
addBtn.addEventListener("click", addWeatherBtnHandler);
editBtn.addEventListener("click", editWeatherBtnHandler);

const form = document.querySelector("#form form");
const historyList = document.querySelector("#list");
const locationInput = document.querySelector("#location");
const tempInput = document.querySelector("#temperature");
const dateInput = document.querySelector("#date");

function loadHistoryHandler() {
  fetch("http://localhost:3030/jsonstore/tasks/")
    .then((res) => res.json())
    .then((entries) => {
      historyList.textContent = "";

      Object.values(entries).forEach((element) => {
        historyList.appendChild(createEntryElement(element));
      });

      form.reset();
      addBtn.disabled = false;
      editBtn.disabled = true;
    })
    .catch((err) => console.log(err));
}

function addWeatherBtnHandler(e) {
  if (!locationInput.value || !tempInput.value || !dateInput.value) {
    return;
  }

  fetch("http://localhost:3030/jsonstore/tasks/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      location: locationInput.value,
      temperature: tempInput.value,
      date: dateInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        loadHistoryHandler();
      }
    })
    .catch((err) => console.log(err));
}

function editWeatherBtnHandler(e) {
  const id = e.currentTarget.dataset.id;

  fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      location: locationInput.value,
      temperature: tempInput.value,
      date: dateInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        loadHistoryHandler();
      }
    })
    .catch((err) => console.log(err));
}

function changeBtnHandler(e) {
  const id = e.currentTarget.dataset.id;
  editBtn.dataset.id = id;
  editBtn.disabled = false;
  addBtn.disabled = true;
  const elementDiv = e.currentTarget.parentElement.parentElement;
  historyList.removeChild(elementDiv);

  const location = elementDiv.querySelector("h2").textContent;
  const date = elementDiv.querySelector("h3").textContent;
  const temp = elementDiv.querySelector("h3:nth-of-type(2)").textContent;

  locationInput.value = location;
  dateInput.value = date;
  tempInput.value = Number(temp);
}

function deleteBtnHandler(e) {
  const id = e.currentTarget.dataset.id;
  fetch(`http://localhost:3030/jsonstore/tasks/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        loadHistoryHandler();
      }
    })
    .catch((err) => console.log(err));
}

function createEntryElement(entry) {
  const container = createDomElement("div", null, "container");
  container.appendChild(createDomElement("h2", entry.location));
  container.appendChild(createDomElement("h3", entry.date));

  const tempH3 = createDomElement("h3", entry.temperature);
  tempH3.id = "celsius";
  container.appendChild(tempH3);

  const btnsDiv = createDomElement("div", null, "buttons-container");
  container.appendChild(btnsDiv);

  const changeBtn = createDomElement("button", "Change", "change-btn");
  changeBtn.dataset.id = entry._id;
  btnsDiv.appendChild(changeBtn);

  const delBtn = createDomElement("button", "Delete", "delete-btn");
  delBtn.dataset.id = entry._id;
  btnsDiv.appendChild(delBtn);

  changeBtn.addEventListener("click", changeBtnHandler);
  delBtn.addEventListener("click", deleteBtnHandler);

  return container;
}

function createDomElement(name, content, elClass) {
  const element = document.createElement(name);
  element.textContent = content;
  element.classList.add(elClass);

  return element;
}
