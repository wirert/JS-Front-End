function printDictionary(input) {
  const result = input.reduce((acc, curr) => {
    const wordArr = Object.entries(JSON.parse(curr));
    let [word, meaning] = wordArr[0];
    acc[word] = meaning;
    return acc;
  }, {});
  Object.keys(result)
    .sort()
    .forEach((word) => {
      console.log(`Term: ${word} => Definition: ${result[word]}`);
    });
}

printDictionary([
  '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
  '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
  '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
  '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
  '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
]);
