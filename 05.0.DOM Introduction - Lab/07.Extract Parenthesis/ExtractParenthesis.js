function extract(content) {
  const regEx = /\(([^)]+)\)/gm;
  let text = document.querySelector(`#${content}`).textContent;
  let matches = [];
  let array;
  while ((array = regEx.exec(text)) !== null) {
    matches.push(array[1]);
  }
  return matches.join("; ");
}
