function printDna(rows) {
  const dnaSequence = ["A", "T", "C", "G", "T", "T", "A", "G", "G", "G"];
  const patterns = {
    0: (a, b) => `**${a}${b}**`,
    1: (a, b) => `*${a}--${b}*`,
    2: (a, b) => `${a}----${b}`,
    3: (a, b) => `*${a}--${b}*`,
  };

  const dnaHelix = [];

  for (let i = 0; i < rows; i++) {
    const patternIndex = i < patterns.length ? i : i - 4 * Math.floor(i / 4);
    const firstChar = dnaSequence.shift();
    const secondChar = dnaSequence.shift();
    const pattern = patterns[patternIndex](firstChar, secondChar);

    dnaHelix.push(pattern);
    dnaSequence.push(firstChar, secondChar);
  }

  console.log(dnaHelix.join("\n"));
}

printDna(16);
