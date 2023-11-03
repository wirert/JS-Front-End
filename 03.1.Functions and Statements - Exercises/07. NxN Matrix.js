function printMatrix(n) {
  const row = [];

  for (let i = 0; i < n; i++) {
    row.push(n);
  }

  for (let i = 0; i < n; i++) {
    console.log(row.join(" "));
  }
}

printMatrix(7);
