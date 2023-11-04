function washCar(arr) {
  operations = {
    soap: (percentClean) => (percentClean += 10),
    water: (percentClean) => (percentClean *= 1.2),
    mud: (percentClean) => (percentClean *= 0.9),
    "vacuum cleaner": (percentClean) => (percentClean *= 1.25),
  };

  let percentClean = 0;

  for (const command of arr) {
    percentClean = operations[command](percentClean);
  }

  console.log(`The car is ${percentClean.toFixed(2)}% clean.`);
}

washCar(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);
