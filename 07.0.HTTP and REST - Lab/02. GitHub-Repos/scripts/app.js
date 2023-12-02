async function loadRepos() {
  let res = await fetch("https://api.github.com/users/testnakov/repos");

  let repos = await res.text();

  let resDiv = document.getElementById("res");
  resDiv.textContent = repos;
}
