function solve() {
  let [checkBtn, clearBtn] = Array.from(
    document.querySelectorAll("tfoot button")
  );

  clearBtn.addEventListener("click", clearTable);
  checkBtn.addEventListener("click", checkGame);

  let resultP = document.querySelector("#check p");
  let table = document.querySelector("table");
  let cells = Array.from(document.querySelectorAll("tbody td input"));

  function clearTable() {
    cells.forEach((c) => (c.value = ""));
    resultP.textContent = "";
    table.style.border = "none";
  }

  function checkGame() {
    if (validateGame()) {
      resultP.textContent = "You solve it! Congratulations!";
      resultP.style.color = "green";
      table.style.border = "2px solid green";
      console.log("correct");
    } else {
      console.log("not correnct");
      resultP.textContent = "NOP! You are not done yet...";
      resultP.style.color = "red";
      table.style.border = "2px solid red";
    }
  }

  function validateGame() {
    let elements = [];
    let curRow = [];

    for (const cell of cells) {
      curRow.push(cell.value);
      if (curRow.length == 3) {
        if (new Set([...curRow]).size < 3) {
          return false;
        }
        elements.push([...curRow]);
        curRow = [];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        elements[0][i] === elements[1][i] ||
        elements[0][i] === elements[2][i] ||
        elements[1][i] === elements[2][i]
      ) {
        return false;
      }
    }

    return true;
  }
}
