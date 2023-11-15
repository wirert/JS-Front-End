function printAddressBook(input) {
  const splittedInput = input.map((info) => info.split(":"));
  const addressBook = splittedInput.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  Object.keys(addressBook)
    .sort()
    .map((key) => console.log(`${key} -> ${addressBook[key]}`));
}

printAddressBook([
  "Tim:Doe Crossing",
  "Bill:Nelson Place",
  "Peter:Carlyle Ave",
  "Bill:Ornery Rd",
]);
