function solve(num) {
  const arrNums = num
    .toString()
    .split("")
    .map((n) => Number(n));

  let sum = arrNums.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  while (sum / arrNums.length <= 5) {
    arrNums.push(9);
    sum += 9;
  }

  console.log(arrNums.join(""));
}

solve(5835);
