function validatePassword(password) {
  const isLengthOutOfBound = (password) =>
    password.length < 6 || password.length > 10;

  const isLettersAndDigitsOnly = (str) => {
    const regEx = /^[A-Za-z0-9]+$/g;
    return regEx.test(str);
  };

  const includesEnoughDigits = (str) => {
    const matches = str.match(/\d/g);
    return matches && matches.length >= 2;
  };

  const outputMessages = [];

  if (isLengthOutOfBound(password)) {
    outputMessages.push("Password must be between 6 and 10 characters");
  }
  if (!isLettersAndDigitsOnly(password)) {
    outputMessages.push("Password must consist only of letters and digits");
  }
  if (!includesEnoughDigits(password)) {
    outputMessages.push("Password must have at least 2 digits");
  }

  outputMessages.length === 0
    ? console.log("Password is valid")
    : console.log(outputMessages.join("\n"));
}

validatePassword("logIn");
