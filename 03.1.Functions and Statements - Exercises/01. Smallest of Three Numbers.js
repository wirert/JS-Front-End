function getSmallestNumber(a, b, c) {
  const getSmallerNumber = (x, y) => (x < y ? x : y);

  return getSmallerNumber(getSmallerNumber(a, b), c);
}

console.log(getSmallestNumber(22, -8, 3));
