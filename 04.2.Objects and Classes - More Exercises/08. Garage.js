function printGarages(input) {
  const garages = input.reduce((acc, curr) => {
    let [garageNum, carInfoString] = curr.split(" - ");
    if (!acc[garageNum]) {
      acc[garageNum] = [];
    }
    let car = {};
    let carInfoTuples = carInfoString.split(", ");
    for (const tuple of carInfoTuples) {
      let [key, value] = tuple.split(": ");
      car[key] = value;
    }
    acc[garageNum].push(car);
    return acc;
  }, {});

  Object.keys(garages).forEach((garage) => {
    console.log(`Garage № ${garage}`);
    for (const car of garages[garage]) {
      var result = Object.entries(car).map(([key, value]) => {
        return `${key} - ${value}`;
      });

      console.log(`--- ${result.join(", ")}`);
    }
  });
}

printGarages([
  "1 - color: green, fuel type: petrol",
  "1 - color: dark red, manufacture: WV",
  "2 - fuel type: diesel",
  "3 - color: dark blue, fuel type: petrol",
]);
