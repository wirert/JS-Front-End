function personInfo(firstName, lastName, age) {
  function createPerson(firstName, lastName, age) {
    return {
      firstName,
      lastName,
      age,
    };
  }

  return createPerson(firstName, lastName, age);
}

console.log(personInfo("Peter", "Pan", "20"));
