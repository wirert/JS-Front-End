function orderAndPrintArray(arr) {
  arr.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  for (let i = 0; i < arr.length; i++) {
    arr[i] = `${i + 1}.${arr[i]}`;
  }

  console.log(arr.join("\r\n"));
}

orderAndPrintArray(["John", "Bob", "Christina", "Ema"]);
