function create(words) {
  let contentDiv = document.querySelector("#content");
  words.forEach((element) => {
    let newDiv = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = element;
    p.style.display = "none";
    newDiv.appendChild(p);
    newDiv.addEventListener("click", (e) => {
      e.target.querySelector("p").style.display = "block";
    });
    contentDiv.appendChild(newDiv);
  });
}
