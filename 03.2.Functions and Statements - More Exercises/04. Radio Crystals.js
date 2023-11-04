function solve(arr) {
  let operations = {
    Cut: (x) => x / 4,
    Lap: (x) => x * 0.8,
    Grind: (x) => x - 20,
    Etch: (x) => x - 2,
    "X-ray": (x) => x + 1,
    //washAndTransportCrystal: (x) => Math.floor(x),
  };
  // let operationName;
  // function chooseOperation(thickness, crystal) {
  //   if (crystal / 4 >= thickness - 1) {
  //     operationName = "Cut";
  //     return crystal / 4;
  //   }
  //   if (crystal * 0.8 >= thickness - 1) {
  //     operationName = "Lap";
  //     return (crystal *= 0.8);
  //   }
  //   if (crystal - 20 >= thickness - 1) {
  //     operationName = "Grind";
  //     return (crystal -= 20);
  //   }
  //   if (crystal - 2 >= thickness - 1) {
  //     operationName = "Etch";
  //     return (crystal -= 2);
  //   }
  //   if (crystal - 1 === thickness) {
  //     operationName = "X-ray";
  //     return (crystal += 1);
  //   }

  //   return null;
  // }

  let [thickness, ...crystals] = arr;

  for (const stone of crystals) {
    let crystal = stone;
    console.log(`Processing chunk ${crystal} microns`);

    if (crystal === thickness) {
      console.log(`Finished crystal ${thickness} microns`);
      continue;
    }

    let priviousOperationName;
    let count = 0;
    while (true) {
      if (crystal === thickness) {
        console.log(`${priviousOperationName} x${count}`);
        break;
      }
      let currOperationName;

      if (crystal / 4 >= thickness - 1) {
        currOperationName = "Cut";
      } else if (crystal * 0.8 >= thickness - 1) {
        currOperationName = "Lap";
      } else if (crystal - 20 >= thickness - 1) {
        currOperationName = "Grind";
      } else if (crystal - 2 >= thickness - 1) {
        currOperationName = "Etch";
      } else if (crystal - 1 === thickness) {
        currOperationName = "X-ray";
      }

      let operation = operations[currOperationName](crystal);

      if (
        priviousOperationName &&
        currOperationName !== priviousOperationName
      ) {
        console.log(`${priviousOperationName} x${count}`);
        console.log("Transporting and washing");

        crystal = Math.floor(crystal);
        if (crystal === thickness) break;
        crystal = operation;

        priviousOperationName = currOperationName;
        count = 1;
      } else {
        crystal = operation;
        count++;
      }
    }

    console.log(`Finished crystal ${thickness} microns`);
  }
}

solve([1375, 50000]);

// if (crystal === thickness) {
//   console.log(`${operationName} x${count}`);
//   break;
// }
// let currOperation = chooseOperation(thickness, crystal);
// if (operation && currOperation !== operation) {
//   console.log(`${operationName} x${count}`);
//   console.log("Transporting and washing");

//   crystal = Math.floor(crystal);
//   if (crystal === thickness) break;
//   crystal = currOperation(crystal);

//   operation = currOperation;
//   count = 1;
// } else {
//   crystal = currOperation(crystal);
//   count++;
// }
