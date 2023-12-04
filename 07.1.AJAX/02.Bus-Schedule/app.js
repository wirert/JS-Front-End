function solve() {
  let currStop = {
    name: "",
    next: "depot",
  };
  const infoBox = document.querySelector("#info span");
  const departInput = document.querySelector("#depart");
  const arriveInput = document.querySelector("#arrive");

  async function depart() {
    try {
      currStop = await (
        await fetch(
          `http://localhost:3030/jsonstore/bus/schedule/${currStop.next}`
        )
      ).json();
    } catch (_) {
      updateInfo(true, true, "Error");
      return;
    }
    updateInfo(true, false, `Next stop ${currStop.name}`);
  }

  function arrive() {
    updateInfo(false, true, `Arriving at ${currStop.name}`);
  }

  function updateInfo(departBtnStatus, arriveBtnStatus, message) {
    infoBox.textContent = message;
    departInput.disabled = departBtnStatus;
    arriveInput.disabled = arriveBtnStatus;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
