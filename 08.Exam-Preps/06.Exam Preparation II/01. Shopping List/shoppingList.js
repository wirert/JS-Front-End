function solve(inputs) {
  const shoppingList = inputs.shift().split("!");
  let line = inputs.shift();

  const commands = {
    Urgent: (item) => {
      if (shoppingList.includes(item)) {
        return;
      }
      shoppingList.unshift(item);
    },
    Unnecessary: (item) => {
      const index = shoppingList.indexOf(item);

      if (index >= 0) {
        shoppingList.splice(index, 1);
      }
    },
    Correct: (oldItem, newItem) => {
      const index = shoppingList.indexOf(oldItem);

      if (index >= 0) {
        shoppingList[index] = newItem;
      }
    },
    Rearrange: (item) => {
      const index = shoppingList.indexOf(item);

      if (index >= 0) {
        shoppingList.splice(index, 1);
        shoppingList.push(item);
      }
    },
  };

  while (line && line !== "Go Shopping!") {
    const [command, ...params] = line.split(" ");
    commands[command](...params);

    line = inputs.shift();
  }

  console.log(shoppingList.join(", "));
}

solve([
  "Tomatoes!Potatoes!Bread",
  "Unnecessary Milk",
  "Urgent Tomatoes",
  "Go Shopping!",
]);
