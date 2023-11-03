function addAndSubtract(a, b, c) {
  const sum = (x, y) => x + y;
  const subtract = (x, y) => x - y;

  return subtract(sum(a, b), c);
}

console.log(addAndSubtract(1, 17, 30));
