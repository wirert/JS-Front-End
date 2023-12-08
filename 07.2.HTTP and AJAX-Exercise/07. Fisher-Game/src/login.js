const button = document.querySelector("#login button");

button.addEventListener("click", loginUser);

async function loginUser() {
  const emailInput = document.querySelector('#login input[name="email"]');
  const passInput = document.querySelector('#login input[name="password"]');
  try {
    console.log("test");
    const res = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput.value,
        password: passInput.value,
      }),
    });
    console.log(res);
    if (res.status !== 200) {
      throw new Error();
    }
    const resJson = await res.json();

    console.log(resJson);
  } catch (error) {}

  //window.location.href = "index.html";
}
