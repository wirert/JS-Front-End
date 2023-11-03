function getOddAndEvenSums(number) {
  let oddSum = 0;
  let evenSum = 0;

  const numAsString = number.toString();

  for (let i = 0; i < numAsString.length; i++) {
    let curNum = Number(numAsString[i]);
    if (curNum % 2 == 0) {
      evenSum += curNum;
    } else {
      oddSum += curNum;
    }
  }

  return `Odd sum = ${oddSum}, Even sum = ${evenSum}`;
}

console.log(getOddAndEvenSums(3495892137259234));
