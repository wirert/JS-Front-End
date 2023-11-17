function printFlightStatus([inputFlights, flightChanges, [neededStatus]]) {
  class Flight {
    constructor(destination) {
      this.destination = destination;
      this.status = "Ready to fly";
    }
  }

  let flights = inputFlights.reduce((acc, curr) => {
    let [flightNo, ...arr] = curr.split(" ");
    const destination = arr.join(" ");
    acc[flightNo] = new Flight(destination);
    return acc;
  }, {});

  for (const string of flightChanges) {
    let [flightNo, ...arr] = string.split(" ");
    const newStatus = arr.join(" ");
    if (flights[flightNo]) {
      flights[flightNo].status = newStatus;
    }
  }

  Object.values(flights)
    .filter((flight) => {
      return flight.status === neededStatus;
    })
    .forEach((flight) =>
      console.log(
        `{ Destination: '${flight.destination}', Status: '${flight.status}' }`
      )
    );
}

printFlightStatus([
  [
    "WN269 Delaware",
    "FL2269 Oregon",
    "WN498 Las Vegas",
    "WN3145 Ohio",
    "WN612 Alabama",
    "WN4010 New York",
    "WN1173 California",
    "DL2120 Texas",
    "KL5744 Illinois",
    "WN678 Pennsylvania",
  ],
  [
    "DL2120 Cancelled",
    "WN612 Cancelled",
    "WN1173 Cancelled",
    "SK430 Cancelled",
  ],
  ["Cancelled"],
]);
