function calcOrder(product, quantity) {
  const products = {
    coffee: 1.5,
    water: 1,
    coke: 1.4,
    snacks: 2,
  };
  const productPrice = products[product];

  if (productPrice) {
    console.log((productPrice * quantity).toFixed(2));
  }
}

calcOrder("coke", 4);
