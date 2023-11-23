function solve() {
  let [checkBtn, clearBtn] = Array.from(
    document.querySelectorAll("tfoot button")
  );
  clearBtn.addEventListener("click", clearTable);
  checkBtn.addEventListener("click", checkGame);

  let resultP = document.querySelector("#check p");
  let table = document.querySelector("table");
  let cells = Array.from(document.querySelectorAll("tbody td input"));
  let neededSum = 0;
  for (let i = 1; i <= 9; i++) {
    neededSum += i;
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
        if (new Set([...curRow]).size < 9) {
          return false;
        }
        elements.push([...curRow]);
        curRow = [];
      }
    }

    if (checkSubMatrices(elements) == false || checkCols(elements) == false) {
      return false;
    }

    return true;
  }

  function checkCols(elements) {
    for (let col = 0; col < 9; col++) {
      let sum = 0;
      for (let row = 0; row < 9; row++) {
        sum += Number(elements[row][col]);
      }

      if (sum !== neededSum) {
        return false;
      }
    }

    return true;
  }

  function checkSubMatrices(elements) {
    let sum = 0;
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let sum = 0;
        for (let row = i; row < i + 3; row++) {
          for (let col = j; col < j + 3; col++) {
            sum += Number(elements[row][col]);
          }
        }
        if (sum !== neededSum) {
          return false;
        }
      }
    }

    return true;
  }
}
