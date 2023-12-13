const addCourseBtn = document.querySelector("#add-course");
const editCourseBtn = document.querySelector("#edit-course");
const URL = `http://localhost:3030/jsonstore/tasks/`;

const form = document.querySelector("#form form");
const titleInput = document.querySelector("#course-name");
const typeInput = document.querySelector("#course-type");
const descArea = document.querySelector("#description");
const teacherInput = document.querySelector("#teacher-name");
const list = document.querySelector("#list");

document
  .querySelector("#load-course")
  .addEventListener("click", loadCoursesHandler);
addCourseBtn.addEventListener("click", addCourseHandler);
editCourseBtn.addEventListener("click", editCourseHandler);

function loadCoursesHandler(e) {
  fetch(URL)
    .then((res) => res.json())
    .then((courses) => {
      editCourseBtn.disabled = true;
      addCourseBtn.disabled = false;
      list.textContent = "";

      Object.values(courses).forEach((course) =>
        list.appendChild(createCourseElement(course))
      );
    })
    .catch((err) => console.log(err));
}

function addCourseHandler(e) {
  e.preventDefault();
  putOrPostCourse("POST");
}

function editCourseHandler(e) {
  e.preventDefault();
  const id = e.currentTarget.dataset.id;
  putOrPostCourse("PUT", id);
}

function editBtnHandler(e) {
  if (editCourseBtn.disabled === false) {
    return;
  }
  const id = e.currentTarget.dataset.id;
  const courseCont = e.currentTarget.parentElement;

  titleInput.value = courseCont.querySelector("h2").textContent;
  teacherInput.value = courseCont.querySelector("h3").textContent;
  typeInput.value = courseCont.querySelector("h3:nth-of-type(2)").textContent;
  descArea.value = courseCont.querySelector("h4").textContent;

  editCourseBtn.disabled = false;
  editCourseBtn.dataset.id = id;
  addCourseBtn.disabled = true;

  courseCont.remove();
}

function finishCourseHandler(e) {
  const id = e.currentTarget.dataset.id;
  fetch(`${URL}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        loadCoursesHandler();
      }
    })
    .catch((err) => console.log(err));
}

function putOrPostCourse(method, id) {
  if (
    !titleInput.value ||
    !typeInput.value ||
    !descArea.value ||
    !teacherInput.value
  ) {
    return;
  }
  if (
    typeInput.value !== "Long" &&
    typeInput.value !== "Medium" &&
    typeInput.value !== "Short"
  ) {
    return;
  }

  const newUrl = id ? `${URL}${id}` : URL;

  fetch(newUrl, {
    method: method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: titleInput.value,
      type: typeInput.value,
      description: descArea.value,
      teacher: teacherInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        loadCoursesHandler();
      }
    })
    .catch((err) => console.log(err));
}

function createCourseElement(course) {
  const courseContainer = document.createElement("div");
  courseContainer.classList.add("container");
  courseContainer.innerHTML = `
    <h2>${course.title}</h2>
    <h3>${course.teacher}</h3>
    <h3>${course.type}</h3>
    <h4>${course.description}</h4>`;

  const editBtn = createActionBtn("Edit", course._id);
  const finishBtn = createActionBtn("Finish", course._id);

  courseContainer.appendChild(editBtn);
  courseContainer.appendChild(finishBtn);

  editBtn.addEventListener("click", editBtnHandler);
  finishBtn.addEventListener("click", finishCourseHandler);

  return courseContainer;
}

function createActionBtn(type, dataId) {
  const btn = document.createElement("button");
  btn.textContent = `${type} Course`;
  btn.classList.add(`${type.toLowerCase()}-btn`);
  btn.dataset.id = dataId;

  return btn;
}
