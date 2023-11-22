function addItem() {
  let itemText = document.getElementById("newItemText");
  let itemValue = document.getElementById("newItemValue");

  let option = document.createElement("option");
  option.innerText = itemText.value;
  option.value = itemValue.value;
  itemText.value = "";
  itemValue.value = "";

  document.getElementById("menu").appendChild(option);
}
