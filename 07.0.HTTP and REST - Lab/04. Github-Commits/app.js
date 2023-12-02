async function loadCommits() {
  const commitsUl = document.getElementById("commits");
  commitsUl.textContent = "";

  try {
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;

    // if (!username || !repo) {
    //   throw new Error("Invalid username or repo");
    // }

    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );

    if (!res.ok) {
      throw new Error(`${res.status} (Not Found)`);
    }

    const commits = await res.json();

    commits.forEach(({ commit }) => {
      const li = document.createElement("li");
      li.textContent = `${commit.author.name}: ${commit.message}`;
      commitsUl.appendChild(li);
    });
  } catch (error) {
    const li = document.createElement("li");
    li.textContent = error;
    commitsUl.appendChild(li);
  }
}
