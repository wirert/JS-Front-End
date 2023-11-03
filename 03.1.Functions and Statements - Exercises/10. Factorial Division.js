function divideFactorials(x, y) {
  const getFactorial = (x) => {
    let result = x;

    for (let i = x - 1; i > 1; i--) {
      result *= i;
    }
    return result;
  };

  console.log((getFactorial(x) / getFactorial(y)).toFixed(2));
}

divideFactorials(6, 2);
