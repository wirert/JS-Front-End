function printUniqueArrays(input) {
  const arrays = input.reduce((acc, curr) => {
    let array = JSON.parse(curr).sort((a, b) => b - a);
    acc[array] = array;
    return acc;
  }, {});

  let result = Object.values(arrays).sort((a, b) => a.length - b.length);
  result.forEach((array) => console.log(`[${array.join(", ")}]`));
}

printUniqueArrays([
  "[7.14, 7.180, 7.339, 80.099]",
  "[7.339, 80.0990, 7.140000, 7.18]",
  "[7.339, 7.180, 7.14, 80.099]",
]);
