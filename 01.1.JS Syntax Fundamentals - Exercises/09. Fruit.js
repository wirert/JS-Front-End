function printBuy(fruit, weightInGrams, pricePerKilo) {
  console.log(
    `I need $${((weightInGrams * pricePerKilo) / 1000).toFixed(2)} to buy ${(
      weightInGrams / 1000
    ).toFixed(2)} kilograms ${fruit}.`
  );
}

printBuy("orange", 2500, 1.8);
