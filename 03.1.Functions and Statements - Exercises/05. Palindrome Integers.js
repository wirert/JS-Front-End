function arePalindromes(arr) {
  const isPalindrome = (number) => {
    const numAsString = number.toString();

    for (let index = 0; index < Math.floor(numAsString.length / 2); index++) {
      if (numAsString[index] !== numAsString[numAsString.length - 1 - index]) {
        return false;
      }
    }

    return true;
  };

  arr.forEach((number) => console.log(isPalindrome(number)));
}

arePalindromes([32, 2, 232, 1010]);
