function attachEventsListeners() {
  let daysInput = document.getElementById("days");
  let daysBtn = document.getElementById("daysBtn");
  let hoursInput = document.getElementById("hours");
  let hoursBtn = document.getElementById("hoursBtn");
  let minutesInput = document.getElementById("minutes");
  let minutesBtn = document.getElementById("minutesBtn");
  let secondsInput = document.getElementById("seconds");
  let secondsBtn = document.getElementById("secondsBtn");

  daysBtn.addEventListener("click", () =>
    convertTimeAndDisplay(Number(daysInput.value * 1440))
  );
  hoursBtn.addEventListener("click", () =>
    convertTimeAndDisplay(Number(hoursInput.value * 60))
  );
  minutesBtn.addEventListener("click", () =>
    convertTimeAndDisplay(Number(minutesInput.value))
  );
  secondsBtn.addEventListener("click", () =>
    convertTimeAndDisplay(Number(secondsInput.value / 60))
  );

  function convertTimeAndDisplay(minutes) {
    daysInput.value = minutes / 1440;
    hoursInput.value = minutes / 60;
    minutesInput.value = minutes;
    secondsInput.value = minutes * 60;
  }
}
