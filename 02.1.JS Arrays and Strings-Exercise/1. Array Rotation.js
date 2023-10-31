function rotateArray(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push(arr.shift());
  }

  console.log(arr.join(" "));
}

rotateArray([32, 21, 61, 1], 4);
