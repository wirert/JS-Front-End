function attachEvents() {
  const loadBtn = document.querySelector("#loadBooks");
  const submitBtn = document.querySelector("#form button");

  const titleEl = document.querySelector("#form input[name=title]");
  const authorEl = document.querySelector("#form input[name=author]");

  loadBtn.addEventListener("click", loadBooks);

  submitBtn.addEventListener("click", (e) => {
    submitBtn.textContent === "Submit" ? createBook(e) : editBook(e);
  });

  async function createBook() {
    const title = titleEl.value;
    const author = authorEl.value;

    if (!author || !title) {
      return;
    }

    try {
      await fetch("http://localhost:3030/jsonstore/collections/books", {
        method: "POST",
        body: JSON.stringify({ title, author }),
      });

      await loadBooks();
      titleEl.value = "";
      authorEl.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  function fillEditForm(e) {
    submitBtn.textContent = "Save";
    document.querySelector("#form h3").textContent = "Edit FORM";
    submitBtn.setAttribute(
      "data-bookId",
      e.currentTarget.getAttribute("data-bookId")
    );

    const title =
      e.currentTarget.parentElement.parentElement.querySelector(
        "td:first-child"
      ).textContent;
    const author =
      e.currentTarget.parentElement.parentElement.querySelector(
        "td:nth-child(2)"
      ).textContent;

    titleEl.value = title;
    authorEl.value = author;
  }

  async function editBook(e) {
    try {
      const id = e.currentTarget.getAttribute("data-bookId");
      const title = titleEl.value;
      const author = authorEl.value;

      await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, author }),
      });

      await loadBooks();
    } catch (error) {
      console.log(error);
    }

    submitBtn.textContent = "Submit";
    document.querySelector("#form h3").textContent = "FORM";
    titleEl.value = "";
    authorEl.value = "";
  }

  async function deleteBook(e) {
    const id = e.currentTarget.getAttribute("data-bookId");
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
      method: "DELETE",
    });

    await loadBooks();
  }

  async function loadBooks() {
    let books;
    try {
      const res = await fetch(
        "http://localhost:3030/jsonstore/collections/books"
      );
      books = await res.json();
    } catch (error) {
      console.log(error);
      return;
    }

    const booksTable = document.querySelector("tbody");
    booksTable.textContent = "";

    Object.entries(books).forEach((book) => {
      booksTable.appendChild(createBookRow(book));
    });
  }

  const bookElement = {
    createTextElement: function (name) {
      const cell = document.createElement("td");
      cell.textContent = name;

      return cell;
    },
    createButtonsElement: function (bookId) {
      const buttonsCell = document.createElement("td");
      buttonsCell.appendChild(this.createButton("Edit", bookId));
      buttonsCell.appendChild(this.createButton("Delete", bookId));

      return buttonsCell;
    },
    createButton: function (name, bookId) {
      const button = document.createElement("button");
      button.textContent = name;
      const action = name === "Edit" ? fillEditForm : deleteBook;
      button.addEventListener("click", action);
      button.setAttribute("data-bookId", bookId);

      return button;
    },
  };

  function createBookRow([bookId, book]) {
    const bookRow = document.createElement("tr");
    bookRow.appendChild(bookElement.createTextElement(book.title));
    bookRow.appendChild(bookElement.createTextElement(book.author));
    bookRow.appendChild(bookElement.createButtonsElement(bookId));

    return bookRow;
  }
}

attachEvents();
