function solve(input) {
  let words = input.toLowerCase().split(" ");
  let result = {};

  for (const word of words) {
    if (result[word]) {
      continue;
    }

    let count = words.filter((text) => {
      return text === word;
    }).length;

    if (count % 2 === 1) {
      result[word] = word;
    }
  }

  console.log(Object.keys(result).join(" "));
}

solve("Cake IS SWEET is Soft CAKE sweet Food");
