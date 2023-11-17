function printCarsInParking(input) {
  const parking = input.reduce((acc, curr) => {
    let [action, carNumber] = curr.split(", ");
    if (action === "IN") {
      acc[carNumber] = carNumber;
    } else {
      delete acc[carNumber];
    }
    return acc;
  }, {});
  let result = Object.values(parking).sort();

  result.length === 0
    ? console.log("Parking Lot is Empty")
    : console.log(result.join("\n"));
}

printCarsInParking([
  "IN, CA2844AA",
  "IN, CA1234TA",
  "OUT, CA2844AA",
  "IN, CA9999TT",
  "IN, CA2866HI",
  "OUT, CA1234TA",
  "IN, CA2844AA",
  "OUT, CA2866HI",
  "IN, CA9876HH",
  "IN, CA2822UU",
]);
