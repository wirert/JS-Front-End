function largestNumber(num1, num2, num3) {
  let largestNum;

  if (num1 > num2 && num1 > num3) {
    largestNum = num1;
  } else if (num2 > num1 && num2 > num3) {
    largestNum = num2;
  } else if (num3 > num1 && num3 > num2) {
    largestNum = num3;
  } else {
    largestNum = "Error";
  }

  console.log(`The largest number is ${largestNum}`);
}

largestNumber(1, "a", 1);
