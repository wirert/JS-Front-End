function addItem() {
  let textToAdd = document.getElementById("newItemText").value;
  let newLiItem = document.createElement("li");
  newLiItem.textContent = textToAdd;

  document.getElementById("items").appendChild(newLiItem);
}
