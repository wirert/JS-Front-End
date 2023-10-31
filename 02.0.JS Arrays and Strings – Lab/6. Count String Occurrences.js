function countWordInText(text, word) {
  let count = 0;

  text.split(" ").forEach((element) => {
    if (element === word) {
      count++;
    }
  });

  console.log(count);
}

countWordInText("This is a word and it also is a sentence", "is");
