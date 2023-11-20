function extractText() {
  let elements = Array.from(document.querySelectorAll("#items>li"));
  let result = elements.reduce(
    (acc, curr) => (acc += curr.textContent + "\n"),
    ""
  );
  document.querySelector("#result").textContent = result;
}
