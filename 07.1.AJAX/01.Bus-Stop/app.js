async function getInfo() {
  const stopId = document.querySelector("#stopId").value;
  const busesUl = document.querySelector("#buses");
  busesUl.textContent = "";
  const stopNameDiv = document.querySelector("#stopName");
  stopNameDiv.textContent = "";
  let stopInfo;
  try {
    stopInfo = await (
      await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
    ).json();
  } catch (_) {
    stopNameDiv.textContent = "Error";
    return;
  }

  stopNameDiv.textContent = stopInfo.name;

  Object.entries(stopInfo.buses).map(([busNumber, arrival]) =>
    addBusInfo(busNumber, arrival)
  );

  function addBusInfo(busNumber, arrivalMinutes) {
    var busLi = document.createElement("li");
    busLi.textContent = `Bus ${busNumber} arrives in ${arrivalMinutes} minutes`;
    busesUl.appendChild(busLi);
  }
}
