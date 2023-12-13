function solve(input) {
  const horses = input.shift().split("|");

  commands = {
    Retake: (winner, loser) => {
      let winIndex = horses.indexOf(winner);
      let loserIndex = horses.indexOf(loser);
      if (winIndex < loserIndex) {
        horses[winIndex] = loser;
        horses[loserIndex] = winner;
        console.log(`${winner} retakes ${loser}.`);
      }
    },
    Trouble: (name) => {
      const index = horses.indexOf(name);
      if (index > 0) {
        horses[index] = horses[index - 1];
        horses[index - 1] = name;
        console.log(`Trouble for ${name} - drops one position.`);
      }
    },
    Rage: (name) => {
      const index = horses.indexOf(name);
      if (index + 2 < horses.length) {
        horses.splice(index, 1);
        horses.splice(index + 2, 0, name);
      } else if (index + 2 === horses.length) {
        horses[index] = horses[index + 1];
        horses[index + 1] = name;
      }

      console.log(`${name} rages 2 positions ahead.`);
    },
    Miracle: () => {
      const first = horses[0];
      horses.splice(0, 1);
      horses.push(first);
      console.log(`What a miracle - ${first} becomes first.`);
    },
  };
  while (input.length > 0) {
    line = input.shift();
    if (line === "Finish") {
      printResult();
      break;
    }
    const [command, ...params] = line.split(" ");
    commands[command](...params);
  }

  function printResult() {
    console.log(horses.join("->"));
    console.log(`The winner is: ${horses[horses.length - 1]}`);
  }
}

solve([
  "Fancy|Lilly",
  "Retake Lilly Fancy",
  "Trouble Lilly",
  "Trouble Lilly",
  "Finish",
  "Rage Lilly",
]);
