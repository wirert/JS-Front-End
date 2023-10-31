function revealWords(wordsText, text) {
  const words = wordsText.split(", ");
  const splitedText = text.split(" ");

  for (const word of words) {
    const textToReplace = "*".repeat(word.length);
    let index = -2;

    while ((index = splitedText.indexOf(textToReplace)) !== -1) {
      splitedText[index] = word;
    }
  }
  console.log(splitedText.join(" "));
}

revealWords(
  "great, learning",
  "softuni is ***** place ***** for ******** new ******** programming languages"
);
