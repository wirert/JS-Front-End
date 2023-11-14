function solve(arr) {
  const numsCounts = arr.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  const sortedArr = Object.entries(numsCounts).sort(
    ([num1, count1], [num2, count2]) => {
      return count2 - count1 || num2 - num1;
    }
  );

  const result = [];

  sortedArr.forEach(([numStr, numCount]) => {
    const num = Number(numStr);
    for (let count = 1; count <= numCount; count++) {
      result.push(num);
    }
  });

  console.log(result);
}

solve([1, 5, 3, 2, 4, 32, 5, 3, 5, 3, 5, 3, 6, 7, 5, 3, 1, 45]);
