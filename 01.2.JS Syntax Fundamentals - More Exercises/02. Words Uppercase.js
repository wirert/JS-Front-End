function wordsToUpper(text) {
  const regEx = /\w+/gm;
  text = text.toUpperCase();
  let arr = regEx.exec(text);
  let result = [];

  while (arr !== null) {
    result.push(arr[0]);
    arr = regEx.exec(text);
  }
  console.log(result.join(", "));
}
wordsToUpper("Hi, how are you?");
