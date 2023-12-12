window.addEventListener("load", solve);

function solve() {
  const form = document.querySelector("form");
  const playerInput = document.querySelector("#player");
  const scoreInput = document.querySelector("#score");
  const roundInput = document.querySelector("#round");
  const scoreList = document.querySelector("#sure-list");
  const scoreBoardList = document.querySelector("#scoreboard-list");

  const addBtn = document.querySelector("#add-btn");
  const clearBtn = document.querySelector("button.btn.clear");

  addBtn.addEventListener("click", addBtnHandler);

  clearBtn.addEventListener("click", () => window.location.reload());

  function addBtnHandler(e) {
    e.preventDefault();
    if (!playerInput.value || !scoreInput.value || !roundInput.value) {
      return;
    }
    let player = playerInput.value;
    let score = scoreInput.value;
    let round = roundInput.value;

    let playerLi = createPlayerScoreLi();
    scoreList.appendChild(playerLi);

    form.reset();
    addBtn.disabled = true;

    function editBtnHandler(e) {
      e.preventDefault();
      playerInput.value = player;
      scoreInput.value = score;
      roundInput.value = round;
      addBtn.disabled = false;

      scoreList.removeChild(playerLi);
    }

    function okBtnHandler(e) {
      e.preventDefault();

      let btns = scoreList.querySelectorAll("button.btn");
      Array.from(btns).forEach((btn) => btn.remove());

      scoreList.removeChild(playerLi);
      scoreBoardList.appendChild(playerLi);
      addBtn.disabled = false;
    }

    function createPlayerScoreLi() {
      const playerLi = document.createElement("li");
      playerLi.classList.add("dart-item");

      playerLi.appendChild(createPlayerArticle());

      const editBtn = document.createElement("button");
      editBtn.textContent = "edit";
      editBtn.classList.add("btn", "edit");
      playerLi.appendChild(editBtn);

      const okBtn = document.createElement("button");
      okBtn.textContent = "ok";
      okBtn.classList.add("btn", "ok");
      playerLi.appendChild(okBtn);

      editBtn.addEventListener("click", editBtnHandler);
      okBtn.addEventListener("click", okBtnHandler);

      return playerLi;
    }

    function createPlayerArticle() {
      const article = document.createElement("article");

      const playerP = document.createElement("p");
      playerP.textContent = player;
      article.appendChild(playerP);

      const scoreP = document.createElement("p");
      scoreP.textContent = `Score: ${score}`;
      article.appendChild(scoreP);

      const roundP = document.createElement("p");
      roundP.textContent = `Round: ${round}`;
      article.appendChild(roundP);

      return article;
    }
  }
}
