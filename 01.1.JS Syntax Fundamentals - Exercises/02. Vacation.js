function calculatePrice(numPeople, type, weekDay) {
  let pricePerPerson;
  let totalPrice;

  switch (type) {
    case "Students":
      switch (weekDay) {
        case "Friday":
          pricePerPerson = 8.45;
          break;
        case "Saturday":
          pricePerPerson = 9.8;
          break;
        case "Sunday":
          pricePerPerson = 10.46;
          break;
        default:
          return;
      }

      totalPrice = numPeople * pricePerPerson;

      if (numPeople >= 30) {
        totalPrice *= 0.85;
      }
      break;

    case "Business":
      switch (weekDay) {
        case "Friday":
          pricePerPerson = 10.9;
          break;
        case "Saturday":
          pricePerPerson = 15.6;
          break;
        case "Sunday":
          pricePerPerson = 16;
          break;
        default:
          return;
      }

      totalPrice = numPeople * pricePerPerson;

      if (numPeople >= 100) {
        totalPrice -= 10 * pricePerPerson;
      }
      break;

    case "Regular":
      switch (weekDay) {
        case "Friday":
          pricePerPerson = 15;
          break;
        case "Saturday":
          pricePerPerson = 20;
          break;
        case "Sunday":
          pricePerPerson = 22.5;
          break;
        default:
          return;
      }

      totalPrice = numPeople * pricePerPerson;

      if (numPeople >= 10 && numPeople <= 20) {
        totalPrice *= 0.95;
      }
      break;

    default:
      return;
  }

  console.log(`Total price: ${totalPrice.toFixed(2)}`);
}
