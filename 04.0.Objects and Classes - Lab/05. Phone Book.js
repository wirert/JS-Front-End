function printPhonebook(input) {
  const arr = input.map((info) => {
    return info.split(" ");
  });

  const phoneBook = arr.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  Object.entries(phoneBook).map(([key, value]) =>
    console.log(`${key} -> ${value}`)
  );
}

printPhonebook([
  "Tim 0834212554",
  "Peter 0877547887",
  "Bill 0896543112",
  "Tim 0876566344",
]);
