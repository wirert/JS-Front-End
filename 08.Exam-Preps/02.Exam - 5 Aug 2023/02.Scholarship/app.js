window.addEventListener("load", solve);

function solve() {
  const nextBtn = document.querySelector("#next-btn");
  const formEl = document.querySelector("form");

  nextBtn.addEventListener("click", nextBtnHandler);

  let studentInput = document.querySelector("#student");
  let universityInput = document.querySelector("#university");
  let scoreInput = document.querySelector("#score");

  function nextBtnHandler() {
    let student = studentInput.value;
    let university = universityInput.value;
    let score = scoreInput.value;

    if (!student || !university || !score) {
      return;
    }
    const previewList = document.querySelector("#preview-list");
    const studentLi = createStudentLi();
    previewList.appendChild(studentLi);
    const editBtn = createDomElement("button", "edit", "action-btn", "edit");
    const applyBtn = createDomElement("button", "apply", "action-btn", "apply");
    studentLi.appendChild(editBtn);
    studentLi.appendChild(applyBtn);

    editBtn.addEventListener("click", editBtnHandler);

    applyBtn.addEventListener("click", applyBtnHandler);

    formEl.reset();
    nextBtn.disabled = true;

    function editBtnHandler() {
      studentInput.value = student;
      universityInput.value = university;
      scoreInput.value = Number(score);
      nextBtn.disabled = false;
      studentLi.parentElement.removeChild(studentLi);
    }

    function applyBtnHandler() {
      editBtn.remove();
      applyBtn.remove();

      previewList.removeChild(studentLi);
      document.querySelector("#candidates-list").appendChild(studentLi);
      nextBtn.disabled = false;
    }

    function createStudentLi() {
      const studentLi = createDomElement("li", null, "application");
      const studentArt = createDomElement("article");
      studentLi.appendChild(studentArt);

      studentArt.appendChild(createDomElement("h4", student));
      studentArt.appendChild(
        createDomElement("p", `University: ${university}`)
      );
      studentArt.appendChild(createDomElement("p", `Score: ${score}`));

      return studentLi;
    }

    function createDomElement(name, content, ...classes) {
      const element = document.createElement(name);
      if (content) {
        element.textContent = content;
      }
      if (classes != "") {
        element.classList.add(...classes);
      }
      return element;
    }
  }
}
