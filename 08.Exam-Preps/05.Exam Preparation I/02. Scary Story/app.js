window.addEventListener("load", solve);

function solve() {
  const form = document.querySelector(".form-wrapper form");
  const previewList = document.querySelector("#preview-list");
  const inputs = {
    firstName: document.querySelector("#first-name"),
    lastName: document.querySelector("#last-name"),
    age: document.querySelector("#age"),
    title: document.querySelector("#story-title"),
    text: document.querySelector("#story"),
    ganre: document.querySelector("#genre"),
  };
  const publishBtn = document.querySelector("#form-btn");

  publishBtn.addEventListener("click", publishStory);

  function publishStory(e) {
    e.preventDefault();

    if (Object.values(inputs).some((input) => !input.value)) {
      return;
    }

    const firstName = inputs.firstName.value;
    const lastName = inputs.lastName.value;
    const age = inputs.age.value;
    const title = inputs.title.value;
    const text = inputs.text.value;
    const ganre = inputs.ganre.value;

    const storyLi = createStoryLi();
    previewList.appendChild(storyLi);

    const saveBtn = createDomElement("button", "Save Story", "save-btn");
    const editBtn = createDomElement("button", "Edit Story", "edit-btn");
    const deleteBtn = createDomElement("button", "Delete Story", "delete-btn");

    storyLi.appendChild(saveBtn);
    storyLi.appendChild(editBtn);
    storyLi.appendChild(deleteBtn);

    saveBtn.addEventListener("click", saveStory);
    editBtn.addEventListener("click", editStory);
    deleteBtn.addEventListener("click", deleteStory);

    form.reset();
    publishBtn.disabled = true;

    function saveStory() {
      const mainDiv = document.querySelector("#main");
      mainDiv.textContent = "";
      mainDiv.appendChild(createDomElement("h1", "Your scary story is saved!"));
    }

    function editStory() {
      inputs.firstName.value = firstName;
      inputs.lastName.value = lastName;
      inputs.age.value = age;
      inputs.text.value = text;
      inputs.title.value = title;
      inputs.ganre.value = ganre;
      publishBtn.disabled = false;

      previewList.removeChild(storyLi);
    }

    function deleteStory(e) {
      previewList.removeChild(storyLi);
      publishBtn.disabled = false;
    }

    function createStoryLi() {
      const storyLi = createDomElement("li", null, "story-info");
      const article = createDomElement("article");
      storyLi.appendChild(article);

      article.appendChild(
        createDomElement("h4", `Name: ${firstName} ${lastName}`)
      );
      article.appendChild(createDomElement("p", `Age: ${age}`));
      article.appendChild(createDomElement("p", `Title: ${title}`));
      article.appendChild(createDomElement("p", `Genre: ${ganre}`));
      article.appendChild(createDomElement("p", text));

      return storyLi;
    }
  }

  function createDomElement(type, content, elClass) {
    const element = document.createElement(type);
    element.textContent = content;
    element.classList.add(elClass);

    return element;
  }
}
