window.addEventListener("load", solve);

function solve() {
  const inputs = {
    expenseType: document.querySelector("#expense"),
    amount: document.querySelector("#amount"),
    date: document.querySelector("#date"),
  };

  const selections = {
    form: document.querySelector("#form-container form"),
    addBtn: document.querySelector("#add-btn"),
    previewList: document.querySelector("#preview-list"),
    expensesList: document.querySelector("#expenses-list"),
  };

  document
    .querySelector("#expenses button.delete")
    .addEventListener("click", () => location.reload());

  selections.addBtn.addEventListener("click", (e) => {
    let type = inputs.expenseType.value;
    let amount = inputs.amount.value;
    let date = inputs.date.value;

    if (!type || !amount || !date) {
      return;
    }

    const expenseLi = createDomElement("li", null, "expense-item");

    expenseLi.appendChild(createExpenseArticle());

    const buttonsDiv = createDomElement("div", null, "buttons");
    const editBtn = createDomElement("button", "edit", "btn", "edit");
    const okBtn = createDomElement("button", "ok", "btn", "ok");

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(okBtn);
    expenseLi.appendChild(buttonsDiv);

    selections.previewList.appendChild(expenseLi);

    selections.addBtn.disabled = true;
    selections.form.reset();

    editBtn.addEventListener("click", () => {
      inputs.expenseType.value = type;
      inputs.amount.value = Number(amount);
      inputs.date.value = date;

      expenseLi.remove();
      selections.addBtn.disabled = false;
    });

    okBtn.addEventListener("click", () => {
      selections.previewList.removeChild(expenseLi);
      buttonsDiv.remove();
      selections.expensesList.appendChild(expenseLi);
      selections.addBtn.disabled = false;
    });

    function createExpenseArticle() {
      const article = createDomElement("article");

      article.appendChild(createDomElement("p", `Type: ${type}`));
      article.appendChild(createDomElement("p", `Amount: ${amount}$`));
      article.appendChild(createDomElement("p", `Date: ${date}`));

      return article;
    }

    function createDomElement(name, content, ...classes) {
      const element = document.createElement(name);
      if (content) {
        element.textContent = content;
      }
      if (classes && classes != "") {
        element.classList.add(...classes);
      }
      return element;
    }
  });
}
