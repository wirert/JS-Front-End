function search() {
  let list = Array.from(document.querySelectorAll("#towns li"));
  let resultDiv = document.querySelector("#result");
  let searchInput = document.querySelector("#searchText");

  searchInput.addEventListener("change", (e) => {
    list.forEach((item) => {
      item.style.fontWeight = "normal";
      item.style.textDecoration = "none";
      resultDiv.textContent = "";
    });
  });
  let matches = 0;
  list.forEach((item) => {
    if (item.textContent.includes(searchInput.value)) {
      item.style.fontWeight = "bold";
      item.style.textDecoration = "underline";
      matches++;
    }
  });
  resultDiv.textContent = `${matches} matches found`;
}
