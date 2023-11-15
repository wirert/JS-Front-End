function manageMeetings(input) {
  const spittedInput = input.map((info) => info.split(" "));

  const schedule = spittedInput.reduce((acc, curr) => {
    let day = curr[0];
    let name = curr[1];
    if (acc[day]) {
      console.log(`Conflict on ${day}!`);
    } else {
      console.log(`Scheduled for ${day}`);
      acc[day] = name;
    }
    return acc;
  }, {});

  Object.entries(schedule).map(([key, value]) =>
    console.log(`${key} -> ${value}`)
  );
}

manageMeetings(["Monday Peter", "Wednesday Bill", "Monday Tim", "Friday Tim"]);
