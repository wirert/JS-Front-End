window.addEventListener("load", solve);

function solve() {
  const form = document.querySelector("form.newPostContent");
  const titleInput = document.querySelector("#task-title");
  const categoryInput = document.querySelector("#task-category");
  const contentArea = document.querySelector("#task-content");

  const publishBtn = document.querySelector("#publish-btn");
  publishBtn.addEventListener("click", publishTaskHandler);

  function publishTaskHandler(e) {
    e.preventDefault();
    const title = titleInput.value;
    const category = categoryInput.value;
    const content = contentArea.value;

    if (!title || !category || !content) {
      return;
    }

    form.reset();

    const reviewList = document.querySelector("#review-list");
    const taskLi = document.createElement("li");
    taskLi.classList.add("rpost");
    reviewList.appendChild(taskLi);

    taskLi.appendChild(createTaskArticle());

    const editBtn = createActionBtn("Edit");
    const postBtn = createActionBtn("Post");

    taskLi.appendChild(editBtn);
    taskLi.appendChild(postBtn);

    editBtn.addEventListener("click", editTaskHandler);
    postBtn.addEventListener("click", postTaskHandler);

    function editTaskHandler() {
      titleInput.value = title;
      categoryInput.value = category;
      contentArea.value = content;
      reviewList.removeChild(taskLi);
    }

    function postTaskHandler() {
      const postList = document.querySelector("#published-list");
      taskLi.removeChild(editBtn);
      taskLi.removeChild(postBtn);

      postList.appendChild(taskLi);
    }

    function createTaskArticle() {
      const article = document.createElement("article");

      const titleH4 = document.createElement("h4");
      titleH4.textContent = title;
      article.appendChild(titleH4);

      const categoryP = document.createElement("p");
      categoryP.textContent = `Category: ${category}`;
      article.appendChild(categoryP);

      const contentP = document.createElement("p");
      contentP.textContent = `Content: ${content}`;
      article.appendChild(contentP);

      return article;
    }

    function createActionBtn(content) {
      const btn = document.createElement("button");
      btn.textContent = content;
      btn.classList.add("action-btn", content.toLowerCase());

      return btn;
    }
  }
}
