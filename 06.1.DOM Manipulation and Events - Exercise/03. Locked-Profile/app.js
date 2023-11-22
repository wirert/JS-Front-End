function lockedProfile() {
  let buttons = Array.from(document.querySelectorAll("button"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let radioLock = e.target.parentElement.querySelector(
        'input[value="lock"]'
      );
      if (radioLock.checked === true) {
        return;
      }

      if (btn.innerText === "Show more") {
        btn.innerText = "Hide it";
        e.target.parentElement.querySelector(
          'div[id$="HiddenFields"'
        ).style.display = "block";
      } else {
        btn.innerText = "Show more";
        e.target.parentElement.querySelector(
          'div[id$="HiddenFields"'
        ).style.display = "none";
      }
    });
  });
}
