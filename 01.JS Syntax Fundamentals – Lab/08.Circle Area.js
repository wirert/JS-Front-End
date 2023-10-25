function circleArea(radius) {
  if (typeof radius !== "number") {
    console.log(
      `We can not calculate the circle area, because we receive a ${typeof radius}.`
    );
  } else {
    console.log((Math.PI * radius ** 2).toFixed(2));
  }
}

circleArea(undefined);
