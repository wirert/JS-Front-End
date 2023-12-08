function solution() {
  window.addEventListener("load", getArticles);
}

async function getArticles() {
  const articles = await (
    await fetch("http://localhost:3030/jsonstore/advanced/articles/list ")
  ).json();
  const main = document.querySelector("#main");

  articles.forEach((article) => {
    main.appendChild(createAccordion(article));
  });
}

function createAccordion(article) {
  const accordion = createDiv("accordion");
  accordion.appendChild(createHeadElements(article));

  const extraDiv = createDiv("extra");
  extraDiv.hidden = true;
  accordion.appendChild(extraDiv);

  return accordion;
}

function createHeadElements(article) {
  const head = createDiv("head");

  const titleSpan = document.createElement("span");
  titleSpan.textContent = article.title;
  head.appendChild(titleSpan);

  const button = document.createElement("button");
  button.id = article._id;
  button.classList.add("button");
  button.textContent = "More";

  button.addEventListener("click", showHideContent);

  head.appendChild(button);

  return head;
}

async function showHideContent(e) {
  const button = e.currentTarget;
  const contentDiv = button.parentElement.parentElement.querySelector(".extra");

  if (button.textContent === "Less") {
    contentDiv.style.display = "none";
    button.textContent = "More";
    contentDiv.textContent = "";
    return;
  } else {
    const content = await (
      await fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`
      )
    ).json();

    contentDiv.style.display = "block";
    const contentP = document.createElement("p");
    contentP.textContent = content.content;
    contentDiv.appendChild(contentP);
    button.textContent = "Less";
  }
}

function createDiv(divClass) {
  const div = document.createElement("div");
  div.classList.add(divClass);
  return div;
}

solution();
