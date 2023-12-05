function lockedProfile() {
  loadProfiles();
}

async function loadProfiles() {
  const profiles = await (
    await fetch("http://localhost:3030/jsonstore/advanced/profiles")
  ).json();

  const container = document.querySelector("#main");
  container.textContent = "";

  Object.values(profiles).forEach((profile, index) =>
    container.appendChild(generateProfile(profile, index + 1))
  );
}

function generateProfile(profile, i) {
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");

  const img = document.createElement("img");
  img.src = "./iconProfile2.png";
  img.classList.add("userIcon");
  profileDiv.appendChild(img);

  profileDiv.appendChild(createLabel("Lock"));
  profileDiv.appendChild(createRadio("lock", true, i));
  profileDiv.appendChild(createLabel("Unlock"));
  profileDiv.appendChild(createRadio("unlock", false, i));
  profileDiv.appendChild(document.createElement("hr"));
  profileDiv.appendChild(createLabel("Username"));
  profileDiv.appendChild(
    createInput("text", `user${i}Username`, profile.username)
  );

  const hiddenDiv = document.createElement("div");
  hiddenDiv.id = `user${i}HiddenFields`;
  hiddenDiv.hidden = true;
  profileDiv.appendChild(hiddenDiv);

  hiddenDiv.appendChild(document.createElement("hr"));
  hiddenDiv.appendChild(createLabel("Email:"));
  hiddenDiv.appendChild(createInput("email", `user${i}Email`, profile.email));
  hiddenDiv.appendChild(createLabel("Age:"));
  hiddenDiv.appendChild(createInput("email", `user${i}Age`, profile.age));

  const button = document.createElement("button");
  button.textContent = "Show more";
  button.addEventListener("click", lockUnlockProfile);
  profileDiv.appendChild(button);

  return profileDiv;
}

function lockUnlockProfile(e) {
  const btn = e.currentTarget;
  let radioLock = btn.parentElement.querySelector('input[value="lock"]');
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
}

function createRadio(value, isChecked, i) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = `user${i}Locked`;
  radio.value = value;
  radio.checked = isChecked;

  return radio;
}

function createInput(type, name, value) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.value = value;
  input.disabled = true;
  input.readOnly = true;

  return input;
}

function createLabel(content) {
  const label = document.createElement("label");
  label.textContent = content;

  return label;
}
