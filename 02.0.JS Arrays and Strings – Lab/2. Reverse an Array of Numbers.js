function printPartOfArray(numElements, arr) {
  console.log(arr.slice(0, numElements).reverse().join(" "));
}

printPartOfArray(4, [-1, 20, 99, 5]);
