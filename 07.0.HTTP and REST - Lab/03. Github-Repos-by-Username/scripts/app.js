async function loadRepos() {
  let usernameInput = document.getElementById("username");
  let reposUl = document.getElementById("repos");
  reposUl.textContent = "";
  try {
    const username = usernameInput.value;

    if (!username) {
      throw new Error("Inva.0lid username!");
    }

    let res = await fetch(`https://api.github.com/users/${username}/repos`);

    let repos = await res.json();

    if (!Array.isArray(repos)) {
      throw new Error("Invalid username!");
    }

    repos.forEach((repo) => {
      let li = document.createElement("li");
      let anchor = document.createElement("a");
      anchor.href = repo.html_url;
      anchor.textContent = repo.full_name;
      li.appendChild(anchor);
      reposUl.appendChild(li);
    });
  } catch (error) {
    reposUl.textContent = error;
  }
}
