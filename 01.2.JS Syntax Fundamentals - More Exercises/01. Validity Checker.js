function validityChecker(x1, y1, x2, y2) {
  function printDistanceValidity(x1, y1, x2, y2) {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const isValid = Number.isInteger(distance) ? "valid" : "invalid";
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isValid}`);
  }

  printDistanceValidity(x1, y1, 0, 0);
  printDistanceValidity(x2, y2, 0, 0);
  printDistanceValidity(x1, y1, x2, y2);
}

validityChecker(2, 1, 1, 1);
