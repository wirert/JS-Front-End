function printProductCatalogue(input) {
  const catalogue = input.reduce((acc, curr) => {
    let [name, priceStr] = curr.split(" : ");
    let price = Number(priceStr);
    acc[name] = price;
    return acc;
  }, {});

  const sortedProductNames = Object.keys(catalogue).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "accent" })
  );
  let currLetter;
  for (const productName of sortedProductNames) {
    if (!productName.startsWith(currLetter)) {
      currLetter = productName.substring(0, 1);
      console.log(currLetter);
    }
    const productPrice = catalogue[productName];
    console.log(`  ${productName}: ${productPrice}`);
  }
}

printProductCatalogue([
  "Appricot : 20.4",
  "Fridge : 1500",
  "TV : 1499",
  "Deodorant : 10",
  "Boiler : 300",
  "Apple : 1.25",
  "Anti-Bug Spray : 15",
  "T-Shirt : 10",
]);
