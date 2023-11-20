function solve() {
  function stringArrayToPascalCase(array) {
    return array.reduce((acc, curr) => {
      return acc + curr.charAt(0).toUpperCase() + curr.slice(1);
    }, "");
  }

  let textArr = document.getElementById("text").value.toLowerCase().split(" ");
  let convention = document.getElementById("naming-convention").value;
  let result;

  if (convention === "Camel Case") {
    let [first, ...rest] = textArr;
    result = first + stringArrayToPascalCase(rest);
  } else if (convention === "Pascal Case") {
    result = stringArrayToPascalCase(textArr);
  } else {
    result = "Error!";
  }

  document.getElementById("result").textContent = result;
}
