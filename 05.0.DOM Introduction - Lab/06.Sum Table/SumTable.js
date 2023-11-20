function sumTable() {
  let elements = Array.from(
    document.querySelectorAll("td:nth-child(even):not(#sum)")
  );
  let result = elements.reduce(
    (acc, curr) => (acc += Number(curr.textContent)),
    0
  );
  document.getElementById("sum").textContent = result;
}
