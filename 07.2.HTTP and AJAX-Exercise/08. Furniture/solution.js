async function solve() {
  window.location.replace("home.html");
}

window.addEventListener("load", async () => {
  const furn = await (
    await fetch("http://localhost:3030/data/furniture")
  ).json();
});

const regBtn = document.querySelector('form[action="/register"] button');
regBtn.addEventListener("click", handleRegister);

async function handleRegister(e) {
  const regForm = regBtn.parentElement;
  const emailInput = regForm.querySelector('input[name="email"]');
  const passInput = regForm.querySelector('input[name="password"]');
  const repassInput = regForm.querySelector('input[name="rePass"]');

  if (
    !emailInput.value ||
    !passInput.value ||
    !repassInput.value ||
    passInput.value !== repassInput.value
  ) {
    return;
  }

  const res = await fetch("http://localhost:3030/users/register", {
    method: "post",
    body: JSON.stringify({
      email: emailInput.value,
      password: passInput.value,
    }),
  });
}
