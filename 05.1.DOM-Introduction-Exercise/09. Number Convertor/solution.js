function solve() {
  let button = document.querySelector("button");
  button.addEventListener("click", onClick);

  function createOption(value, name) {
    let option = document.createElement("option");
    option.innerText = name;
    option.value = value;

    return option;
  }

  let toUnitSelect = document.querySelector("#selectMenuTo");
  toUnitSelect.appendChild(createOption("binary", "Binary"));
  toUnitSelect.appendChild(createOption("hexadecimal", "Hexadecimal"));

  //variant 1
  function onClick() {
    let number = Number(document.querySelector("#input").value);
    if (!number) {
      return;
    }
    let convertBase = 0;
    if (toUnitSelect.value === "binary") {
      convertBase = 2;
    } else if (toUnitSelect.value === "hexadecimal") {
      convertBase = 16;
    } else {
      return;
    }

    document.querySelector("#result").value = number
      .toString(convertBase)
      .toUpperCase();
  }

  //variant 2
  //   function onClick() {
  //     let number = Number(document.querySelector("#input").value);
  //     if (!number) {
  //       return;
  //     }

  //     let result;
  //     if (toUnitSelect.value === "binary") {
  //       result = convertToBinary(number);
  //     } else if (toUnitSelect.value === "hexadecimal") {
  //       result = convertToHexadecimal(number);
  //     } else {
  //       return;
  //     }

  //     document.querySelector("#result").value = result;
  //   }

  //   function convertToBinary(decimalNumber) {
  //     let binaryNumber = [];
  //     while (decimalNumber !== 0) {
  //       binaryNumber.unshift(decimalNumber % 2);
  //       decimalNumber = Math.floor(decimalNumber / 2);
  //     }
  //     return binaryNumber.join("");
  //   }

  //   function convertToHexadecimal(decimalNumber) {
  //     let hexadecimal = [];
  //     while (decimalNumber !== 0) {
  //       let reminder = decimalNumber % 16;
  //       hexadecimal.unshift(hexadecimalAnalog[reminder.toString()]);

  //       decimalNumber = Math.floor(decimalNumber / 16);
  //     }
  //     return hexadecimal.join("");
  //   }

  //   let hexadecimalAnalog = {
  //     0: "0",
  //     1: "1",
  //     2: "2",
  //     3: "3",
  //     4: "4",
  //     5: "5",
  //     6: "6",
  //     7: "7",
  //     8: "8",
  //     9: "9",
  //     10: "A",
  //     11: "B",
  //     12: "C",
  //     13: "D",
  //     14: "E",
  //     15: "F",
  //   };
}
