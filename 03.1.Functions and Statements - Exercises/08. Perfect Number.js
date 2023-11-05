function isPerfectNumber(num) {
  const end = Math.floor(num / 2);
  let sumOfDividers = 0;
  for (let i = 1; i <= end; i++) {
    if (num % i === 0) {
      sumOfDividers += i;
    }
  }

  sumOfDividers === num
    ? console.log("We have a perfect number!")
    : console.log(`It's not so perfect.`);
}

isPerfectNumber(1236498);
