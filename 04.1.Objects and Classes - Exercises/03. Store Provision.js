function printStoreProvisions(stock, order) {
  const store = {};
  let count = stock.length;
  for (let i = 0; i < count; i += 2) {
    store[stock[i]] = Number(stock[i + 1]);
  }

  count = order.length;
  for (let i = 0; i < count; i += 2) {
    if (store[order[i]]) {
      store[order[i]] += Number(order[i + 1]);
    } else {
      store[order[i]] = Number(order[i + 1]);
    }
  }

  Object.entries(store).forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
  });
}

printStoreProvisions(
  ["Salt", "2", "Fanta", "4", "Apple", "14", "Water", "4", "Juice", "5"],
  ["Sugar", "44", "Oil", "12", "Apple", "7", "Tomatoes", "7", "Bananas", "30"]
);
