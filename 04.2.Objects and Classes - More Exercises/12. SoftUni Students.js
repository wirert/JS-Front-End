function storeSoftUniStudents(input) {
  function createCourse(name) {
    return {
      name,
      capacity: 0,
      students: [],
      addStudent(student) {
        if (this.capacity > this.students.length) {
          this.students.push(student);
        }
      },
    };
  }
  function createStudent(username, credits, email) {
    return {
      username,
      credits,
      email,
      courses: [],
      addCourse(course) {
        if (this.isInCourse(course)) {
          return false;
        }
        this.courses.push(course);
        return true;
      },
      isInCourse(course) {
        return this.courses.find((c) => c.name === course.name) !== undefined;
      },
    };
  }
  const inputActions = {
    addCourse(line) {
      const [courseName, capacityStr] = line.split(": ");
      const capacity = Number(capacityStr);
      let course = courses.find((c) => c.name === courseName);
      if (!course) {
        course = createCourse(courseName);
        courses.push(course);
      }
      course.capacity += capacity;
    },
    addStudentToCourse(line) {
      const [userCredit, _, __, email, ___, courseName] = line.split(" ");
      const [username, rest] = userCredit.split("[");
      const credits = Number(rest.substring(0, rest.length - 1));
      let student = students.find(
        (s) => s.email === email && s.username === username
      );
      if (!student) {
        student = createStudent(username, credits, email);
        students.push(student);
      }
      const course = courses.find((c) => c.name === courseName);
      if (course && student.addCourse(course)) {
        course.addStudent(student);
      }
    },
  };

  const courses = [];
  const students = [];

  input.forEach((line) => {
    if (line.includes(": ")) {
      inputActions.addCourse(line);
    } else if (line.includes("] with email ")) {
      inputActions.addStudentToCourse(line);
    }
  });

  courses
    .sort((a, b) => b.students.length - a.students.length)
    .forEach((c) => {
      console.log(`${c.name}: ${c.capacity - c.students.length} places left`);
      c.students
        .sort((a, b) => b.credits - a.credits)
        .forEach((s) =>
          console.log(`--- ${s.credits}: ${s.username}, ${s.email}`)
        );
    });
}

storeSoftUniStudents([
  "JavaBasics: 15",
  "user1[26] with email user1@user.com joins JavaBasics",
  "user2[36] with email user11@user.com joins JavaBasics",
  "JavaBasics: 5",
  "C#Advanced: 5",
  "user1[26] with email user1@user.com joins C#Advanced",
  "user2[36] with email user11@user.com joins C#Advanced",
  "user3[6] with email user3@user.com joins C#Advanced",
  "C#Advanced: 1",
  "JSCore: 8",
  "user23[62] with email user23@user.com joins JSCore",
]);
