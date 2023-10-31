function findWordInText(word, text) {
  const splText = text.toLowerCase().split(/\s+|\,|\.|\:|\;/g);
  if (splText.includes(word.toLowerCase())) {
    console.log(word);
  } else {
    console.log(`${word} not found!`);
  }
}

findWordInText("python", "JavaScript is the best programming language");
