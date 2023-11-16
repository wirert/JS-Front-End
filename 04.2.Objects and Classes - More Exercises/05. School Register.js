function printSchoolRegister(input) {
  function createGrade(grade) {
    return {
      grade,
      students: [],
      totalScore: 0,
      getAverageScore() {
        return (this.totalScore / this.students.length).toFixed(2);
      },
    };
  }

  function createStudent(name, lastGrade, score) {
    return {
      name,
      lastGrade,
      score,
    };
  }

  const grades = {};

  const students = input
    .map((str) => {
      const splitStr = str.split(", ");
      const name = splitStr[0].split(": ")[1];
      const lastGrade = splitStr[1].split(": ")[1];
      const score = splitStr[2].split(": ")[1];

      return createStudent(name, lastGrade, Number(score));
    })
    .filter((student) => {
      return student.score >= 3;
    });

  for (const student of students) {
    let grade = Number(student.lastGrade) + 1;
    if (!grades[grade]) {
      grades[grade] = createGrade(grade);
    }

    grades[grade].students.push(student.name);
    grades[grade].totalScore += student.score;
  }

  Object.keys(grades)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((grade) => {
      console.log("");
      console.log(`${grade} Grade`);
      console.log(`List of students: ${grades[grade].students.join(", ")}`);
      console.log(
        `Average annual score from last year: ${grades[
          grade
        ].getAverageScore()}`
      );
    });
}

printSchoolRegister([
  "Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
  "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
  "Student name: George, Grade: 8, Graduated with an average score: 2.83",
  "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
  "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
  "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
  "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
  "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
  "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
  "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
  "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
  "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00",
]);
