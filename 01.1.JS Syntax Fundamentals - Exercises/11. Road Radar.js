function speedLimit(speed, area) {
  let speedLimit;

  switch (area) {
    case "motorway":
      speedLimit = 130;
      break;
    case "interstate":
      speedLimit = 90;
      break;
    case "city":
      speedLimit = 50;
      break;
    case "residential":
      speedLimit = 20;
      break;
    default:
      return;
  }

  const speedingUp = speed - speedLimit;
  let status;

  if (speedingUp <= 0) {
    console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    return;
  }

  if (speedingUp <= 20) {
    status = "speeding";
  } else if (speedingUp <= 40) {
    status = "excessive speeding";
  } else {
    status = "reckless driving";
  }

  console.log(
    `The speed is ${speedingUp} km/h faster than the allowed speed of ${speedLimit} - ${status}`
  );
}

speedLimit(120, "interstate");
