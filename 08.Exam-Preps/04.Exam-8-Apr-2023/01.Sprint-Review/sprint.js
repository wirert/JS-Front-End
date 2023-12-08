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

  const [n, ...inputs] = inputArr;

  let sprintBoard = {
    "Add New": addNewTask,
    "Change Status": changeTaskStatus,
    "Remove Task": removeTask,
  };

  inputs.forEach((input, i) => {
    if (i < n) {
      const [assignee, id, title, status, points] = input.split(":");
      const task = new Task(id, title, status, Number(points), assignee);
      if (!sprintBoard[assignee]) {
        sprintBoard[assignee] = [];
      }
      sprintBoard[assignee].push(task);
    } else {
      const [command, assignee, ...params] = input.split(":");
      let tasks = sprintBoard[assignee];
      if (!tasks) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
      } else {
        sprintBoard[command](tasks, assignee, ...params);
      }
    }
  });

  const result = Object.values(sprintBoard)
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

  Object.entries(result).forEach(([k, v]) => {
    if (k !== "undonePoints") {
      k = k === "Done" ? "Done Points" : k;
      console.log(`${k}: ${v}pts\n`);
    }
  });

  var sprintResult =
    result.Done >= result.undonePoints ? "successful!" : "unsuccessful...";

  console.log(`Sprint was ${sprintResult}`);

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
    const index = Number(indexStr);
    if (index < 0 || index >= tasks.length) {
      console.log("Index is out of range!");
    }
    tasks.splice(index, 1);
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
