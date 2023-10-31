function findEveryNthElement(arr, step) {
  let index = 0;
  const result = [];
  while (index < arr.length) {
    result.push(arr[index]);
    index += step;
  }

  return result;
}

console.log(printEveryNthElement(["5", "20", "31", "4", "20"], 2));
