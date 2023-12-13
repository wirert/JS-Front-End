window.addEventListener("load", solve);

function solve() {
  const form = document.querySelector(".container-text form");
  const inputs = {
    name: document.querySelector("#name"),
    genre: document.querySelector("#genre"),
    author: document.querySelector("#author"),
    date: document.querySelector("#date"),
  };
  const addBtn = document.querySelector("#add-btn");

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (Object.values(inputs).some((input) => !input.value)) {
      return;
    }

    const name = inputs.name.value;
    const genre = inputs.genre.value;
    const author = inputs.author.value;
    const date = inputs.date.value;

    const allHitsDiv = document.querySelector("#all-hits .all-hits-container");
    const songInfoDiv = createSongElement();
    allHitsDiv.appendChild(songInfoDiv);

    form.reset();

    function createSongElement() {
      const songInfoDiv = createDomElement("div", null, "hits-info");

      const img = document.createElement("img");
      img.src = "./static/img/img.png";
      songInfoDiv.appendChild(img);
      songInfoDiv.appendChild(createDomElement("h2", `Genre: ${genre}`));
      songInfoDiv.appendChild(createDomElement("h2", `Name: ${name}`));
      songInfoDiv.appendChild(createDomElement("h2", `Author: ${author}`));
      songInfoDiv.appendChild(createDomElement("h3", `Date: ${date}`));

      const saveBtn = createDomElement("button", "Save song", "save-btn");
      const likeBtn = createDomElement("button", "Like song", "like-btn");
      const deleteBtn = createDomElement("button", "Delete", "delete-btn");

      songInfoDiv.appendChild(saveBtn);
      songInfoDiv.appendChild(likeBtn);
      songInfoDiv.appendChild(deleteBtn);

      saveBtn.addEventListener("click", saveSong);
      likeBtn.addEventListener("click", likeSong);
      deleteBtn.addEventListener("click", deleteSong);

      return songInfoDiv;
    }

    function likeSong(e) {
      e.currentTarget.disabled = true;
      const likesP = document.querySelector("#total-likes p");
      let numLikes = Number(likesP.textContent.split(": ")[1]);
      numLikes++;

      likesP.textContent = `Total Likes: ${numLikes}`;
    }

    function saveSong(e) {
      const currSongDiv = e.currentTarget.parentElement;
      allHitsDiv.removeChild(currSongDiv);

      currSongDiv.querySelector(".like-btn").remove();
      e.currentTarget.remove();

      const savedSongsDiv = document.querySelector(
        "#saved-hits .saved-container"
      );
      savedSongsDiv.appendChild(currSongDiv);
    }

    function deleteSong(e) {
      e.currentTarget.parentElement.remove();
    }
  });

  function createDomElement(type, content, elClass) {
    const element = document.createElement(type);
    if (content) {
      element.textContent = content;
    }
    if (elClass) {
      element.classList.add(elClass);
    }

    return element;
  }
}
