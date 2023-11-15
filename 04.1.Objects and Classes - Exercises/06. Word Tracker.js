function printWordsOccurences(input) {
  let [wordsString, ...ocurrences] = input;
  let words = wordsString.split(" ");
  let result = {};

  for (const word of words) {
    const count = ocurrences.filter((string) => {
      return string === word;
    }).length;

    result[word] = count;
  }

  Object.entries(result)
    .sort(([k1, v1], [k2, v2]) => v2 - v1)
    .map(([key, value]) => console.log(`${key} - ${value}`));
}

printWordsOccurences([
  "is the",
  "first",
  "sentence",
  "Here",
  "is",
  "another",
  "the",
  "And",
  "finally",
  "the",
  "the",
  "sentence",
]);
