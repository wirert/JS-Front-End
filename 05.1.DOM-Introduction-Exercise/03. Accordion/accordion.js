function toggle() {
  let buttonText = document.querySelector("span.button").textContent;
  if (buttonText === "More") {
    document.querySelector("span.button").textContent = "Less";
    document.querySelector("#extra").style.display = "block";
  } else {
    document.querySelector("span.button").textContent = "More";
    document.querySelector("#extra").style.display = "none";
  }
}
