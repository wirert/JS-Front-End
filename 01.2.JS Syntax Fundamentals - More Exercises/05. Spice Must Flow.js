function spiceFlow(yield) {
  let days = 0;
  let collectedSpice = 0;

  while (yield >= 100) {
    days++;
    collectedSpice += yield - 26;
    yield -= 10;
  }

  if (collectedSpice >= 26) {
    collectedSpice -= 26;
  }

  console.log(days);
  console.log(collectedSpice);
}

spiceFlow(450);
