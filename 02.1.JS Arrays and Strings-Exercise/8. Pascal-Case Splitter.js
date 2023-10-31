function pascalCaseSplitter(text) {
  const regEx = /[A-Z][a-z]*/g;

  const words = text.match(regEx);

  console.log(words.join(", "));
}

pascalCaseSplitter("SplitMeIfYouCanHaHaYouCantOrYouCan");
