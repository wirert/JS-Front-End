function solve() {
  let inputElement = document.getElementById("input").value;
  let sentences = inputElement.split(".");
  sentences = sentences.filter((s) => s.length > 0);
  let output = document.getElementById("output");
  output.textContent = "";
  let curParagraphText = "";
  let i = 0;
  sentences.forEach((sentence, i) => {
    curParagraphText += sentence + ".";
    if ((i + 1) % 3 === 0 || i === sentences.length - 1) {
      let paragraph = document.createElement("p");
      paragraph.textContent = curParagraphText;
      output.appendChild(paragraph);
      curParagraphText = "";
    }
  });
}
