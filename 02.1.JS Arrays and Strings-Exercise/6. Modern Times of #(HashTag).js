function printHashTags(text) {
  const regEx = /[A-Za-z]+$/g;

  const tags = text.split(/\s+|\,|\.|\:|\;/g).filter(function (word) {
    return word.startsWith("#") && regEx.test(word);
  });
  const result = [];
  tags.forEach((word) => {
    if (
      word.endsWith(".") ||
      word.endsWith(",") ||
      word.endsWith(":") ||
      word.endsWith(";")
    ) {
      result.push(word.substring(1, word.length - 1));
    } else {
      result.push(word.substring(1));
    }
  });

  console.log(result.join("\r\n").trim());
}

printHashTags(
  "Nowadays everyone #uses # to tag #a, #special #word in #socialMedia."
);
