function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);

  function onClick() {
    let rows = Array.from(document.querySelectorAll("tbody>tr"));
    let searchField = document.querySelector("#searchField");
    rows.forEach((row) => {
      row.className = "";
      Array.from(row.children).forEach((child) => {
        if (
          child.textContent.includes(searchField.value) &&
          row.className === ""
        ) {
          row.className = "select";
        }
      });
    });

    searchField.value = "";
  }
}
