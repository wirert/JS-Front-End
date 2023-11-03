function printCharsBetween(char1, char2) {
  const firstCharCode = char1.charCodeAt();
  const secondCharCode = char2.charCodeAt();

  const start = Math.min(firstCharCode, secondCharCode) + 1;
  const end = Math.max(firstCharCode, secondCharCode) - 1;

  const result = [];

  for (let code = start; code <= end; code++) {
    result.push(String.fromCharCode(code));
  }

  console.log(result.join(" "));
}

printCharsBetween("#", ":");
