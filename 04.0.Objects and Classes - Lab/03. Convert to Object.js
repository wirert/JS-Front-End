function convertAndPrintFromJson(input) {
  const obj = JSON.parse(input);

  Object.entries(obj).forEach(([key, value]) =>
    console.log(`${key}: ${value}`)
  );
}

convertAndPrintFromJson('{"name": "George", "age": 40, "town": "Sofia"}');
