function login(input) {
  let [username, ...passwords] = input;
  const password = username.split("").reverse().join("");
  let count = 0;

  for (const word of passwords) {
    if (word === password) {
      console.log(`User ${username} logged in.`);
      return;
    } else {
      if (count === 3) {
        console.log(`User ${username} blocked!`);
        return;
      }
      console.log("Incorrect password. Try again.");
      count++;
    }
  }
}

login(["sunny", "rainy", "cloudy", "sunny", "not sunny"]);
