function solve() {
  let inputElement = document.getElementById("input").value;
  let sentences = inputElement.split(".");
  sentences = sentences.filter((s) => s.length > 0);
  let output = document.getElementById("output");
  output.textContent = "";

  //variant 1
  // let curParagraphText = "";
  // sentences.forEach((sentence, i) => {
  //   curParagraphText += sentence + ".";
  //   if ((i + 1) % 3 === 0 || i === sentences.length - 1) {
  //     let paragraph = document.createElement("p");
  //     paragraph.textContent = curParagraphText;
  //     output.appendChild(paragraph);
  //     curParagraphText = "";
  //   }
  // });

  //variant 2
  while (sentences.length > 0) {
    let paragraph = document.createElement("p");
    paragraph.textContent = sentences.splice(0, 3).join(".") + ".";
    output.appendChild(paragraph);
  }
}
