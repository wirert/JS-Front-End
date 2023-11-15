function printHeroes(input) {
  function createHero(name, level, items) {
    return {
      name,
      level: Number(level),
      items: items,
      printInfo() {
        console.log(`Hero: ${this.name}`);
        console.log(`level => ${this.level}`);
        console.log(`items => ${items}`);
      },
    };
  }

  const heroes = input
    .map((heroString) => {
      let [name, level, items] = heroString.split(" / ");

      return createHero(name, level, items);
    })
    .sort((a, b) => a.level - b.level)
    .forEach((hero) => {
      hero.printInfo();
    });
}

printHeroes([
  "Isacc / 25 / Apple, GravityGun",
  "Derek / 12 / BarrelVest, DestructionSword",
  "Hes / 1 / Desolator, Sentinel, Antara",
]);
