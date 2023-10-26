function calculate(a, operation, b) {
  switch (operation) {
    case "+":
      console.log((a + b).toFixed(2));
      break;
    case "-":
      console.log((a - b).toFixed(2));
      break;
    case "*":
      console.log((a * b).toFixed(2));
      break;
    case "/":
      console.log((a / b).toFixed(2));
      break;
  }
}
