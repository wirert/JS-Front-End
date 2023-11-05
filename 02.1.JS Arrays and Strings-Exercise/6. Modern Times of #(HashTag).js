function printHashTags(text) {
  const regEx = /#[A-Za-z]+/g;

  let matches = text.match(regEx);

  for (const word of matches) {
    console.log(word.substring(1));
  }
}

printHashTags(
  "Nowadays everyone #uses # to tag #a, #special #word in #socialMedia."
);
