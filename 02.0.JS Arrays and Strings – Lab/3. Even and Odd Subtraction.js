function evenOddDifference(arr) {
  let oddSum = 0;
  let evenSum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenSum += arr[i];
    } else {
      oddSum += arr[i];
    }
  }

  console.log(evenSum - oddSum);
}

evenOddDifference([2, 4, 6, 8, 10]);
