function mathOperation(a, b, operation) {
  switch (operation) {
    case "*":
      console.log(a * b);
      break;
    case "/":
      console.log(a / b);
      break;
    case "+":
      console.log(a + b);
      break;
    case "-":
      console.log(a - b);
      break;
    case "%":
      console.log(a % b);
      break;
    case "**":
      console.log(a ** b);
      break;
    default:
      console.log("Error!");
      break;
  }
}

mathOperation(2, 2.5, "**");
