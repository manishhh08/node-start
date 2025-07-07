import express from "express";
import mongoose from "mongoose";
import mongodbConnection from "./config/mongoConfig.js";
import cors from "cors";

mongodbConnection();
const app = express();
//allows cors for cross domain use
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  hour: { type: Number, required: true },
  type: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Task successfully added",
  });
});
// GET all tasks
app.get("/api/v1/tasks", async (req, res) => {
  //   return res.json({
  //     status: false,
  //     message: "Users not found",
  //   });

  let tasks = await Task.find();
  res.json({
    status: true,
    message: "Task Found",
    tasks: tasks,
  });
});
// Get specific task
app.get("/api/v1/tasks/:taskid", async (req, res) => {
  let id = req.params.taskid;
  //console.log("taskid: ", id);
  let task = await Task.findById(id);
  //let task = tasks.find((u) => u.id == id);
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
// Create task
app.post("/api/v1/tasks", async (req, res) => {
  // req.body;
  // let task = req.body;
  // tasks.push(task);
  // console.log(task);

  let task = new Task(req.body);
  await task.save();
  res.json({
    status: true,
    message: "Task Created",
    task,
  });
});
// update user
app.patch("/api/v1/tasks/:taskid", async (req, res) => {
  let id = req.params.taskid;
  let updatedData = req.body;
  // { name: 'ghanshyam' }
  // let task = tasks.find((u) => u.id == id);
  // task.type = updatedData.type;

  let task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
  res.json({
    status: true,
    message: "Task updated",
    task,
  });
});
// delete user
app.delete("/api/v1/tasks/:taskid", async (req, res) => {
  let id = req.params.taskid;
  //   filter user with id
  //tasks = tasks.filter((u) => u.id != id);
  let deletedTask = await Task.findByIdAndDelete(id);
  res.json({
    status: true,
    message: "Task Deleted",
    deletedTask,
  });
});
app.listen(3000);
