function solve(input) {
  const baristasCount = Number(input.shift());
  let baristasInfos = input.splice(0, baristasCount);

  const cafeteria = baristasInfos.reduce(
    (acc, curr) => {
      const [name, shift, coffeesStr] = curr.split(" ");
      const coffees = coffeesStr.split(",");
      acc.baristas[name] = { Barista: name, Shift: shift, Drinks: coffees };

      return acc;
    },
    {
      baristas: {},
      Prepare: prepare,
      "Change Shift": changeShift,
      Learn: learn,
    }
  );

  let line = input.shift();

  while (line !== "Closed") {
    const [command, ...params] = line.split(" / ");
    cafeteria[command](...params);

    line = input.shift();
  }

  Object.values(cafeteria.baristas).forEach((barista) =>
    console.log(
      `Barista: ${barista.Barista}, Shift: ${
        barista.Shift
      }, Drinks: ${barista.Drinks.join(", ")}`
    )
  );

  function prepare(name, shift, cofeeType) {
    const barista = this.baristas[name];

    if (
      barista &&
      barista.Shift === shift &&
      barista.Drinks.includes(cofeeType)
    ) {
      console.log(`${name} has prepared a ${cofeeType} for you!`);
    } else {
      console.log(`${name} is not available to prepare a ${cofeeType}.`);
    }
  }

  function changeShift(name, newShift) {
    const barista = this.baristas[name];

    if (barista) {
      barista.Shift = newShift;
      console.log(`${name} has updated his shift to: ${newShift}`);
    }
  }

  function learn(name, newCoffee) {
    const barista = this.baristas[name];

    if (barista.Drinks.includes(newCoffee)) {
      console.log(`${name} knows how to make ${newCoffee}.`);
    } else {
      barista.Drinks.push(newCoffee);
      console.log(`${name} has learned a new coffee type: ${newCoffee}.`);
    }
  }
}

solve([
  "3",
  "Alice day Espresso,Cappuccino",
  "Bob night Latte,Mocha",
  "Carol day Americano,Mocha",
  "Prepare / Alice / day / Espresso",
  "Change Shift / Bob / night",
  "Learn / Carol / Latte",
  "Learn / Bob / Latte",
  "Prepare / Bob / night / Latte",
  "Closed",
]);
