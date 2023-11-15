function printEmployees(input) {
  function createEmployee(name) {
    return {
      name,
      number: name.length,

      print() {
        console.log(`Name: ${name} -- Personal Number: ${this.number}`);
      },
    };
  }

  input.map((empName) => {
    const employee = createEmployee(empName);
    employee.print();
  });
}

printEmployees([
  "Silas Butler",
  "Adnaan Buckley",
  "Juan Peterson",
  "Brendan Villarreal",
]);
