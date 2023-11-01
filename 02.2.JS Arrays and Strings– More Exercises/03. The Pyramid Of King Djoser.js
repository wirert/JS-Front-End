function calcPyramidMaterials(base, increment) {
  let stone = 0;
  let marble = 0;
  let lapis = 0;
  let gold = 0;
  let steps = 0;

  while (base > 0) {
    steps++;
    if (base <= 2) {
      gold += base ** 2 * increment;
      break;
    }

    stone += (base - 2) ** 2 * increment;

    if (steps % 5 == 0) {
      lapis += (4 * base - 4) * increment;
    } else {
      marble += (4 * base - 4) * increment;
    }

    base -= 2;
  }

  console.log(`Stone required: ${Math.ceil(stone)}`);
  console.log(`Marble required: ${Math.ceil(marble)}`);
  console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`);
  console.log(`Gold required: ${Math.ceil(gold)}`);
  console.log(`Final pyramid height: ${Math.floor(steps * increment)}`);
}

calcPyramidMaterials(11, 0.75);
