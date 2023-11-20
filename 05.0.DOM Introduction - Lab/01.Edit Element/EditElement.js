function editElement(htmlElement, textToReplace, replacement) {
  regex = new RegExp(textToReplace, "g");
  let content = htmlElement.textContent;

  htmlElement.textContent = content.replace(regex, replacement);
}
