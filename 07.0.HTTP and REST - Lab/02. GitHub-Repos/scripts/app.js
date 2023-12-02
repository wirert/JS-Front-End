async function loadRepos() {
  let resDiv = document.getElementById("res");
  try {
    let res = await fetch("https://api.github.com/users/testnakov/repos1");
    let repos = await res.text();

    resDiv.textContent = repos;
  } catch (error) {
    resDiv.textContent = error.text;
  }
}
