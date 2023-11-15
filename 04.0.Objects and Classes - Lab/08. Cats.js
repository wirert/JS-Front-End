function printCatsInfo(input) {
  class Cat {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    meow() {
      console.log(`${this.name}, age ${this.age} says Meow`);
    }
  }

  input.map((catInfoStr) => {
    catInput = catInfoStr.split(" ");
    let [name, age] = catInput;
    let cat = new Cat(name, age);
    cat.meow();
  });
}

printCatsInfo(["Mellow 2", "Tom 5"]);
