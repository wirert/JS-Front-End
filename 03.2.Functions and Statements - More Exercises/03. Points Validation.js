function validatePoints(coordinates) {
  let [x1, y1, x2, y2, ...rest] = coordinates;
  function validateDistance(x1, y1, x2, y2) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const isValid = Number.isInteger(distance) ? "valid" : "invalid";

    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isValid}`);
  }

  validateDistance(x1, y1, 0, 0);
  validateDistance(x2, y2, 0, 0);
  validateDistance(x1, y1, x2, y2);
}

validatePoints([2, 1, 1, 1]);
