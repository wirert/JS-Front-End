function censorText(text, word) {
  while (text.includes(word)) {
    text = text.replace(word, "*".repeat(word.length));
  }

  console.log(text);
}

censorText("Find the hidden word", "hidden");
