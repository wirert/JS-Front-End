function signCheck(a, b, c) {
  const isNegative = (a) => (a < 0 ? 1 : 0);

  let sumMinuses = isNegative(a) + isNegative(b) + isNegative(c);

  return sumMinuses % 2 === 0 ? "Positive" : "Negative";
}

console.log(signCheck(-6, 0, 14));
