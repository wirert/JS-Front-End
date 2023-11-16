function solve(input) {
  const leaders = {};
  for (const text of input) {
    if (text.includes("arrives")) {
      const index = text.indexOf("arrives");
      const leader = text.substring(0, index - 1);
      leaders[leader] = {};
      leaders[leader].totalCount = 0;
    } else if (text.includes("defeated")) {
      const index = text.indexOf("defeated");
      const leader = text.substring(0, index - 1);
      delete leaders[leader];
    } else {
      let [leader, armyInfo] = text.split(": ");
      if (armyInfo) {
        if (leaders[leader]) {
          let [armyName, count] = armyInfo.split(", ");
          leaders[leader][armyName] = Number(count);
          leaders[leader].totalCount += Number(count);
        }
      } else {
        let [armyName, count] = text.split(" + ");

        for (const leader in leaders) {
          if (leaders[leader][armyName]) {
            leaders[leader][armyName] += Number(count);
            leaders[leader].totalCount += Number(count);
            break;
          }
        }
      }
    }
  }

  var armies = Object.entries(leaders)
    .sort(([k1, v1], [k2, v2]) => v2.totalCount - v1.totalCount)
    .forEach(([leader, leaderArmies]) => {
      console.log(`${leader}: ${leaderArmies.totalCount}`);
      Object.entries(leaderArmies)
        .sort(([k1, v1], [k2, v2]) => v2 - v1)
        .forEach(([armyName, count]) => {
          if (armyName !== "totalCount") {
            console.log(`>>> ${armyName} - ${count}`);
          }
        });
    });
}

solve([
  "Rick Burr arrives",
  "Fergus: Wexamp, 30245",
  "Rick Burr: Juard, 50000",
  "Findlay arrives",
  "Findlay: Britox, 34540",
  "Wexamp + 6000",
  "Juard + 1350",
  "Britox + 4500",
  "Porter arrives",
  "Porter: Legion, 55000",
  "Legion + 302",
  "Rick Burr defeated",
  "Porter: Retix, 3205",
]);
