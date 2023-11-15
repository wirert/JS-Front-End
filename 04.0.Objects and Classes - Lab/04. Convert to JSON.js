function printJsonFromObj(name, lastName, hairColor) {
  class Person {
    constructor(name, lastName, hairColor) {
      this.name = name;
      this.lastName = lastName;
      this.hairColor = hairColor;
    }
  }

  const person = new Person(name, lastName, hairColor);

  console.log(JSON.stringify(person));
}

printJsonFromObj("George", "Jones", "Brown");
