function solve(input) {
  class Shelf {
    constructor(id, genre) {
      this.id = id;
      this.genre = genre;
      this.books = [];
    }
    get count() {
      return this.books.length;
    }
  }
  class Book {
    constructor(title, genre, author) {
      this.title = title;
      this.genre = genre;
      this.author = author;
    }
  }
  const printLibraryBooks = function () {
    library
      .sort((a, b) => b.books.length - a.books.length)
      .forEach((shelf) => {
        console.log(`${shelf.id} ${shelf.genre}: ${shelf.count}`);
        shelf.books
          .sort((b) => b.title)
          .forEach((b) => console.log(`--> ${b.title}: ${b.author}`));
      });
  };
  const libraryActions = {
    addShelf: (line) => {
      let [id, genre] = line.split(" -> ");
      if (!library.find((s) => s.id === id)) {
        library.push(new Shelf(id, genre));
      }
    },
    addBook: (line) => {
      let [title, rest] = line.split(": ");
      let [author, genre] = rest.split(", ");
      const shelf = library.find((s) => s.genre === genre);
      if (shelf) {
        shelf.books.push(new Book(title, genre, author));
      }
    },
  };
  const library = [];

  input.forEach((line) => {
    if (line.includes("->")) {
      libraryActions.addShelf(line);
    } else if (line.includes(": ")) {
      libraryActions.addBook(line);
    }
  });

  printLibraryBooks();
}

solve([
  "1 -> history",
  "1 -> action",
  "Death in Time: Criss Bell, mystery",
  "2 -> mystery",
  "3 -> sci-fi",
  "Child of Silver: Bruce Rich, mystery",
  "Hurting Secrets: Dustin Bolt, action",
  "Future of Dawn: Aiden Rose, sci-fi",
  "Lions and Rats: Gabe Roads, history",
  "2 -> romance",
  "Effect of the Void: Shay B, romance",
  "Losing Dreams: Gail Starr, sci-fi",
  "Name of Earth: Jo Bell, sci-fi",
  "Pilots of Stone: Brook Jay, history",
]);
