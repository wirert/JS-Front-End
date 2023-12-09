function solve(inputArr) {
  class Task {
    constructor(id, title, status, points, assignee) {
      this.id = id;
      this.title = title;
      this.status = status;
      this.points = points;
      this.assignee = assignee;
    }
  }
  const [taskCount, ...inputs] = inputArr;
  let sprintBoard = {
    "Add New": addNewTask,
    "Change Status": changeTaskStatus,
    "Remove Task": removeTask,
  };

  inputs.forEach((input, i) => {
    i < Number(taskCount)
      ? addNewTaskToTaskboard(input)
      : proceedCommantToTaskBoard(input);
  });

  printResult(sprintBoard);

  function addNewTaskToTaskboard(input) {
    const [assignee, id, title, status, points] = input.split(":");

    if (!sprintBoard[assignee]) {
      sprintBoard[assignee] = [];
    }
    addNewTask(sprintBoard[assignee], assignee, id, title, status, points);
  }

  function proceedCommantToTaskBoard(input) {
    const [command, assignee, ...params] = input.split(":");
    let tasks = sprintBoard[assignee];
    if (!tasks) {
      console.log(`Assignee ${assignee} does not exist on the board!`);
    } else {
      sprintBoard[command](tasks, assignee, ...params);
    }
  }

  function printResult(sprintBoard) {
    const statusPointsResult = Object.values(sprintBoard)
      .filter((v) => Array.isArray(v))
      .reduce(
        (acc, curr) => {
          curr.forEach((t) => {
            acc[t.status] += t.points;
            if (t.status !== "Done") {
              acc.undonePoints += t.points;
            }
          });
          return acc;
        },
        {
          ToDo: 0,
          "In Progress": 0,
          "Code Review": 0,
          Done: 0,
          undonePoints: 0,
        }
      );

    Object.entries(statusPointsResult).forEach(([status, points]) => {
      if (status !== "undonePoints") {
        status = status === "Done" ? "Done Points" : status;
        console.log(`${status}: ${points}pts`);
      }
    });

    var sprintResult =
      statusPointsResult.Done >= statusPointsResult.undonePoints
        ? "successful!"
        : "unsuccessful...";

    console.log(`Sprint was ${sprintResult}`);
  }

  function addNewTask(tasks, assignee, id, title, status, points) {
    tasks.push(new Task(id, title, status, Number(points), assignee));
  }

  function changeTaskStatus(tasks, assignee, id, newStatus) {
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      console.log(`Task with ID ${id} does not exist for ${assignee}!`);
      return;
    }
    task.status = newStatus;
  }

  function removeTask(tasks, assignee, indexStr) {
    const taskIndex = Number(indexStr);

    if (taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Index is out of range!");
      return;
    }

    tasks.splice(taskIndex, 1);
  }
}

solve([
  "5",
  "Kiril:BOP-1209:Fix Minor Bug:ToDo:3",
  "Mariya:BOP-1210:Fix Major Bug:In Progress:3",
  "Peter:BOP-1211:POC:Code Review:5",
  "Georgi:BOP-1212:Investigation Task:Done:2",
  "Mariya:BOP-1213:New Account Page:In Progress:13",
  "Add New:Kiril:BOP-1217:Add Info Page:In Progress:5",
  "Change Status:Peter:BOP-1290:ToDo",
  "Remove Task:Mariya:1",
  "Remove Task:Joro:1",
]);
