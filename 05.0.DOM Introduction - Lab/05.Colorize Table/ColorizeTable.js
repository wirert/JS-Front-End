function colorize() {
  let rows = Array.from(document.querySelectorAll("tr:nth-child(even)"));
  rows.forEach((row) => {
    row.style.background = "Teal";
  });
}
