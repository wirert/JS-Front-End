function attachEventsListeners() {
  const units = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yrd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
  };

  let convertBtn = document.getElementById("convert");
  convertBtn.addEventListener("click", () => {
    let inputUnits = document.getElementById("inputUnits").value;
    let outputUnits = document.getElementById("outputUnits").value;
    let count = Number(document.getElementById("inputDistance").value);
    let outputResult = document.getElementById("outputDistance");

    outputResult.value = (count * units[inputUnits]) / units[outputUnits];
  });
}
