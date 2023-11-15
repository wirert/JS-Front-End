function printTownsCoordinates(input) {
  const createTown = function (town, latitude, longitude) {
    return {
      town,
      latitude: Number(latitude).toFixed(2),
      longitude: Number(longitude).toFixed(2),
    };
  };
  input.map((townInfo) => {
    let [town, latitude, longitude] = townInfo.split(" | ");
    console.log(createTown(town, latitude, longitude));
  });
}

printTownsCoordinates([
  "Sofia | 42.696552 | 23.32601",
  "Beijing | 39.913818 | 116.363625",
]);
