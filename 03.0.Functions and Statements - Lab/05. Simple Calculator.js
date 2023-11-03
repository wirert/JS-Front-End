function simpleCalculator(a, b, operation) {
  const proceedCalculation = {
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
  };

  return proceedCalculation[operation](a, b);
}

console.log(simpleCalculator(5, 5, "multiply"));
