function solve(arr) {
  const operations = {
    Cut: (x) => x / 4,
    Lap: (x) => x * 0.8,
    Grind: (x) => x - 20,
    Etch: (x) => x - 2,
    "X-ray": (x) => x + 1,
  };

  const [thickness, ...crystals] = arr;

  for (const stone of crystals) {
    let crystal = stone;
    console.log(`Processing chunk ${crystal} microns`);

    if (crystal === thickness) {
      console.log(`Finished crystal ${thickness} microns`);
      continue;
    }

    let priviousOperationName;
    let count = 1;
    while (crystal !== thickness) {
      const currOperationName = chooseProperOperation(crystal, thickness);
      crystal = operations[currOperationName](crystal);

      if (currOperationName === priviousOperationName) {
        count++;
      } else if (priviousOperationName) {
        console.log(`${priviousOperationName} x${count}`);
        console.log("Transporting and washing");
        crystal = Math.floor(crystal);
        count = 1;
      }

      priviousOperationName = currOperationName;
    }

    console.log(`${priviousOperationName} x${count}`);
    if (priviousOperationName !== "X-ray") {
      console.log("Transporting and washing");
    }
    console.log(`Finished crystal ${thickness} microns`);
  }

  function chooseProperOperation(crystal, thickness) {
    if (crystal / 4 >= thickness - 1) {
      operation = "Cut";
    } else if (crystal * 0.8 >= thickness - 1) {
      operation = "Lap";
    } else if (crystal - 20 >= thickness - 1) {
      operation = "Grind";
    } else if (crystal - 2 >= thickness - 1) {
      operation = "Etch";
    } else if (crystal === thickness - 1) {
      operation = "X-ray";
    }

    return Object.values(operation).join("");
  }
}

solve([1375, 50000]);
