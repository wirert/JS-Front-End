function sortNumbers(arr) {
  arr.sort((a, b) => a - b);
  const result = [];
  const count = arr.length;

  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      result.push(arr.shift());
    } else {
      result.push(arr.pop());
    }
  }

  return result;
}

console.log(sortNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
