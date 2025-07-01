import express from "express";
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let tasks = [
  { id: 1, task: "Task1", hour: 30, type: "bad" },
  { id: 2, task: "Task2", hour: 30, type: "bad" },
];
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "HELLO WORLD",
  });
});
// GET all users
app.get("/api/v1/tasks", (req, res) => {
  //   return res.json({
  //     status: false,
  //     message: "Users not found",
  //   });
  res.json({
    status: true,
    message: "Task Found",
    tasks: tasks,
  });
});
// Get specific user
app.get("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid;
  console.log("taskid: ", id);
  let task = tasks.find((u) => u.id == id);
  if (task) {
    res.json({
      status: true,
      message: "Task found",
      task: task,
    });
  } else {
    //passed the status code to 404
    res.status(404).json({
      status: false,
      message: "Task not found",
    });
  }
});
// Create user
app.post("/api/v1/tasks", (req, res) => {
  // req.body;
  let task = req.body;
  tasks.push(task);
  console.log(task);
  res.json({
    status: true,
    message: "Task Created",
    tasks,
  });
});
// update user
app.patch("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid;
  let updatedData = req.body;
  // { name: 'ghanshyam' }
  let task = tasks.find((u) => u.id == id);
  task.type = updatedData.type;
  res.json({
    status: true,
    message: "Task updated",
    task,
  });
});
// delete user
app.delete("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid;
  //   filter user with id
  tasks = tasks.filter((u) => u.id != id);
  res.json({
    status: true,
    message: "Task Deleted",
  });
});
app.listen(3000);
