function generateReport() {
  function takeIndicesAndNamesOfCheckedColumns() {
    let theadChildern = Array.from(document.querySelectorAll("thead th input"));
    let result = [];
    theadChildern.forEach((element, index) => {
      if (element.checked) {
        result.push({ index, name: element.name });
      }
    });
    return result;
  }

  const indicesAndNames = takeIndicesAndNamesOfCheckedColumns();
  let rows = Array.from(document.querySelectorAll("tbody tr"));
  let result = rows.map((row) => {
    let resultRow = {};
    Array.from(row.children).forEach((element, index) => {
      let indexAndName = indicesAndNames.find((i) => i.index === index);

      if (indexAndName) {
        resultRow[indexAndName.name] = element.textContent;
      }
    });
    return resultRow;
  });

  let outputTextArea = document.querySelector("#output");

  outputTextArea.value = JSON.stringify(result);
}
