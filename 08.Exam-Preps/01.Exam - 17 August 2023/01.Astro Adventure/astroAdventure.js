function solve(input) {
  const n = Number(input.shift());
  if (n <= 0) {
    return;
  }
  const astronautsInput = input.slice(0, n);
  const commandsInput = input.splice(n, input.length - n);

  const team = astronautsInput.reduce(
    (acc, curr) => {
      const [name, oxygen, energy] = curr.trim().split(" ");
      acc.astronauts[name] = { oxygen: Number(oxygen), energy: Number(energy) };
      return acc;
    },
    {
      astronauts: {},
      Explore: explore,
      Refuel: refuel,
      Breathe: breathe,
    }
  );

  commandsInput.forEach((comandStr) => {
    if (comandStr.trim() === "End") {
      printAstronauts();
      return;
    }
    const [command, name, param, _] = comandStr.trim().split(" - ");
    if (!team.hasOwnProperty(command)) {
      return;
    }
    team[command](name, Number(param));
  });

  function explore(name, energyNeed) {
    if (!this.astronauts.hasOwnProperty(name)) {
      return;
    }
    const astronaut = this.astronauts[name];
    if (astronaut.energy >= energyNeed) {
      astronaut.energy -= energyNeed;
      console.log(
        `${name} has successfully explored a new area and now has ${astronaut.energy} energy!`
      );
    } else {
      console.log(`${name} does not have enough energy to explore!`);
    }
  }

  function refuel(name, energy) {
    if (!this.astronauts.hasOwnProperty(name)) {
      return;
    }
    const astronaut = this.astronauts[name];
    const initialEnergy = astronaut.energy;
    astronaut.energy += energy;
    if (astronaut.energy > 200) {
      astronaut.energy = 200;
    }

    console.log(
      `${name} refueled their energy by ${astronaut.energy - initialEnergy}!`
    );
  }

  function breathe(name, oxygen) {
    if (!this.astronauts.hasOwnProperty(name)) {
      return;
    }
    const astronaut = this.astronauts[name];
    const initialOxygen = astronaut.oxygen;
    astronaut.oxygen += oxygen;
    if (astronaut.oxygen > 100) {
      astronaut.oxygen = 100;
    }
    console.log(
      `${name} took a breath and recovered ${
        astronaut.oxygen - initialOxygen
      } oxygen!`
    );
  }

  function printAstronauts() {
    Object.entries(team.astronauts).forEach(([name, info]) => {
      console.log(
        `Astronaut: ${name}, Oxygen: ${info.oxygen}, Energy: ${info.energy}`
      );
    });
  }
}

solve([
  "3",
  "Alice 60 100",
  "Bob 40 80",
  "Charlie 70 150",
  "Explore - Bob - 100",
  "Refuel - Alice - 30",
  "Breathe - Charlie - 50",
  "Breathe - Charlie - 30",
  "Explore - Alice - 40",
  "End",
]);
