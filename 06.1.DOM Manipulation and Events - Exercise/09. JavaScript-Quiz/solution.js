function solve() {
  let sections = Array.from(document.querySelectorAll("section"));
  let rightAnswers = 0;
  let answersLis = Array.from(document.querySelectorAll(".quiz-answer"));
  const correctAnswers = [
    "onclick",
    "JSON.stringify()",
    "A programming API for HTML and XML documents",
  ];

  answersLis.forEach((answerLi) =>
    answerLi.addEventListener("click", proceedAnswer)
  );

  function proceedAnswer(e) {
    let currSection =
      e.target.parentElement.parentElement.parentElement.parentElement;
    if (correctAnswers.includes(e.target.textContent.trim())) {
      rightAnswers++;
    }

    currSection.style.display = "none";

    let sectionIndex = sections.indexOf(currSection);
    sectionIndex++;
    if (sectionIndex === sections.length) {
      showResult();
      return;
    }

    sections[sectionIndex].style.display = "block";
  }

  function showResult() {
    let resultText =
      rightAnswers === sections.length
        ? "You are recognized as top JavaScript fan!"
        : `You have ${rightAnswers} right answers`;

    let resultH1 = document.querySelector(".results-inner h1");
    resultH1.parentElement.parentElement.style.display = "block";

    document.querySelector(".results-inner h1").textContent = resultText;
  }
}
