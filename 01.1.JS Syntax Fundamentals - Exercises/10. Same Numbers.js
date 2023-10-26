function sameDigits(number) {
  let arr = number.toString().split("");

  const digit = Number(arr.pop());
  let isSame = true;
  let sum = digit;

  while (arr.length > 0) {
    let curDigit = Number(arr.pop());
    sum += curDigit;
    if (digit !== curDigit) {
      isSame = false;
    }
  }

  console.log(isSame);
  console.log(sum);
}

sameDigits(222422);
