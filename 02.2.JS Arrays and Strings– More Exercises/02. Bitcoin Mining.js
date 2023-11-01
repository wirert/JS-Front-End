function bitcoinMiningCalc(goldMined) {
  const bitcoinPrice = 11949.16;
  const goldPrice = 67.51;
  let boughtBitcoins = 0;
  let money = 0;
  let dayBuyFirstBitcoin = 0;

  for (let i = 0; i < goldMined.length; i++) {
    const day = i + 1;
    const gold = day % 3 === 0 ? goldMined[i] * 0.7 : goldMined[i];

    money += gold * goldPrice;

    while (money >= bitcoinPrice) {
      money -= bitcoinPrice;
      boughtBitcoins++;

      if (boughtBitcoins === 1) {
        dayBuyFirstBitcoin = day;
      }
    }
  }

  console.log(`Bought bitcoins: ${boughtBitcoins}`);

  if (boughtBitcoins > 0) {
    console.log(`Day of the first purchased bitcoin: ${dayBuyFirstBitcoin}`);
  }

  console.log(`Left money: ${money.toFixed(2)} lv.`);
}

bitcoinMiningCalc([50, 100]);
