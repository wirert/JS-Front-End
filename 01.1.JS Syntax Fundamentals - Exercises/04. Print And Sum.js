function printSum(start, end) {
  let sum = 0;
  const elements = [];
  for (let i = start; i <= end; i++) {
    elements.push(i);
    sum += i;
  }

  console.log(elements.join(" "));
  console.log(`Sum: ${sum}`);
}

printSum(5, 10);
