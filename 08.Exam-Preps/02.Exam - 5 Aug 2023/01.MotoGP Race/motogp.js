function motoGp(input) {
  const n = Number(input.shift());
  const racerInfo = input.slice(0, n);
  const commands = input.splice(n, input.length - n);
  const race = racerInfo.reduce(
    (acc, curr) => {
      const [name, fuel, position] = curr.split("|");
      acc.racers[name] = { fuel: Number(fuel), position: Number(position) };
      return acc;
    },
    {
      racers: {},
      StopForFuel: stopForFuel,
      Overtaking: overtake,
      EngineFail: engineFail,
    }
  );

  commands.forEach((line) => {
    if (line === "Finish") {
      printResult();
      return;
    }
    const [command, ...params] = line.split(" - ");
    race[command](...params);
  });

  function stopForFuel(name, minFuel, newPosition) {
    const racer = this.racers[name];
    if (racer.fuel >= minFuel) {
      console.log(`${name} does not need to stop for fuel!`);
    } else {
      racer.position = newPosition;
      racer.fuel = minFuel;
      console.log(
        `${name} stopped to refuel but lost his position, now he is ${newPosition}.`
      );
    }
  }

  function overtake(name1, name2) {
    const rider1 = this.racers[name1];
    const rider2 = this.racers[name2];
    if (rider1.position < rider2.position) {
      const temp = rider1.position;
      rider1.position = rider2.position;
      rider2.position = temp;
      console.log(`${name1} overtook ${name2}!`);
    }
  }

  function engineFail(name, leftLaps) {
    console.log(
      `${name} is out of the race because of a technical issue, ${leftLaps} laps before the finish.`
    );
    delete this.racers[name];
  }

  function printResult() {
    Object.entries(race.racers).forEach(([name, obj]) => {
      console.log(name);
      console.log(`  Final position: ${obj.position}`);
    });
  }
}

motoGp([
  "3",
  "Valentino Rossi|100|1",
  "Marc Marquez|90|2",
  "Jorge Lorenzo|80|3",
  "StopForFuel - Valentino Rossi - 50 - 1",
  "Overtaking - Marc Marquez - Jorge Lorenzo",
  "EngineFail - Marc Marquez - 10",
  "Finish",
]);
