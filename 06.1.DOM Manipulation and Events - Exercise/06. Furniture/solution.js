function solve() {
  let [genBtn, buyBtn] = Array.from(document.querySelectorAll("button"));
  let [inputTextArea, ouputTextArea] = Array.from(
    document.querySelectorAll("textarea")
  );
  genBtn.addEventListener("click", addFurnituresToTable);
  buyBtn.addEventListener("click", buyCheckedFurnitures);

  function addFurnituresToTable() {
    let table = document.querySelector("tbody");
    let inputs = JSON.parse(inputTextArea.value);

    inputs.forEach((furniture) => table.appendChild(createRow(furniture)));
  }

  function buyCheckedFurnitures() {
    let cart = Array.from(document.querySelectorAll("input:checked")).reduce(
      (acc, curr) => {
        let [name, price, decFactor] = Array.from(
          curr.parentElement.parentElement.querySelectorAll("p")
        );
        acc.names.push(name.textContent);
        acc.totalPrice += Number(price.textContent);
        acc.totalDecFactor += Number(decFactor.textContent);

        return acc;
      },
      {
        names: [],
        totalPrice: 0,
        totalDecFactor: 0,
        avFactor() {
          return this.totalDecFactor / this.names.length;
        },
      }
    );

    ouputTextArea.value = `Bought furniture: ${cart.names.join(
      ", "
    )}\nTotal price: ${cart.totalPrice.toFixed(
      2
    )}\nAverage decoration factor: ${cart.avFactor()}`;
  }

  function createRow(furniture) {
    let row = document.createElement("tr");
    row.appendChild(createCell.createImg(furniture.img));
    row.appendChild(createCell.createContentCell(furniture.name));
    row.appendChild(createCell.createContentCell(furniture.price));
    row.appendChild(createCell.createContentCell(furniture.decFactor));
    row.appendChild(createCell.createCheckBoxCell());

    return row;
  }

  const createCell = {
    addToCell(element) {
      let td = document.createElement("td");
      td.appendChild(element);
      return td;
    },
    createImg(src) {
      let imgEl = document.createElement("img");
      imgEl.src = src;
      return this.addToCell(imgEl);
    },
    createContentCell(text) {
      let p = document.createElement("p");
      p.textContent = text;
      return this.addToCell(p);
    },
    createCheckBoxCell() {
      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      return this.addToCell(checkBox);
    },
  };
}
