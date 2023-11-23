function solve() {
  let [checkBtn, clearBtn] = Array.from(
    document.querySelectorAll("tfoot button")
  );
  clearBtn.addEventListener("click", clearTable);
  checkBtn.addEventListener("click", checkGame);

  let resultP = document.querySelector("#check p");
  let table = document.querySelector("table");
  let cells = Array.from(document.querySelectorAll("tbody td input"));
  let neededSumOnElements = 0;
  for (let i = 1; i <= 9; i++) {
    neededSumOnElements += i;
  }

  function clearTable() {
    cells.forEach((c) => (c.value = ""));
    resultP.textContent = "";
    table.style.border = "none";
  }

  function checkGame() {
    if (validateGame()) {
      console.log("test");
      resultP.textContent = "You solve it! Congratulations!";
      resultP.style.color = "green";
      table.style.border = "2px solid green";
    } else {
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
      if (curRow.length === 9) {
        if (areRowValuesValid(curRow) == false) {
          return false;
        }
        elements.push([...curRow]);
        curRow = [];
      }
    }

    if (
      areSubmatricesValuesValid(elements) == false ||
      areColsValuesValid(elements) == false
    ) {
      return false;
    }

    return true;
  }

  function areRowValuesValid(row) {
    return new Set([...row]).size < 9;
  }

  function areColsValuesValid(elements) {
    for (let col = 0; col < 9; col++) {
      let sum = 0;
      for (let row = 0; row < 9; row++) {
        sum += Number(elements[row][col]);
      }

      if (sum !== neededSumOnElements) {
        return false;
      }
    }

    return true;
  }

  function areSubmatricesValuesValid(elements) {
    for (let rowStep = 0; rowStep < 9; rowStep += 3) {
      for (let colStep = 0; colStep < 9; colStep += 3) {
        let elementsSum = 0;
        for (let row = rowStep; row < rowStep + 3; row++) {
          for (let col = colStep; col < colStep + 3; col++) {
            elementsSum += Number(elements[row][col]);
          }
        }
        if (elementsSum !== neededSumOnElements) {
          return false;
        }
      }
    }

    return true;
  }
}
