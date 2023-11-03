function printGrade(grade) {
  const getWordGrade = (grade) => {
    if (grade < 3) return "Fail";
    if (grade < 3.5) return "Poor";
    if (grade < 4.5) return "Good";
    if (grade < 5.5) return "Very good";

    return "Excellent";
  };

  const stringGrade = getWordGrade(grade);

  grade = stringGrade === "Fail" ? 2 : grade.toFixed(2);
  console.log(`${stringGrade} (${grade})`);
}

printGrade(3.33);
