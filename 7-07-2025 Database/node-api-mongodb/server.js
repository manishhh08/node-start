import express from "express";
import mongoose from "mongoose";
import mongodbConnection from "./config/mongoConfig.js";

mongodbConnection();
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let users = [
//   { id: 1, name: "ram" },
//   { id: 2, name: "Joe" },
// ];
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: Number,
});

const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "HELLO WORLD",
  });
});

// GET all users
app.get("/api/v1/users", async (req, res) => {
  //   return res.json({
  //     status: false,
  //     message: "Users not found",
  //   });

  let users = await User.find();
  res.json({
    status: true,
    message: "Users Found",
    users: users,
  });
});

// Get specific user
app.get("/api/v1/users/:userid", async (req, res) => {
  let id = req.params.userid;

  console.log("Userid: ", id);

  //let user = users.find((u) => u.id == id);
  let user = await User.findById(id);
  if (user) {
    res.json({
      status: true,
      message: "User found",
      user: user,
    });
  } else {
    res.json({
      status: false,
      message: "User not found",
    });
  }
});

// Create user
app.post("/api/v1/users", async (req, res) => {
  // req.body;
  //let user = req.body;

  //push to array
  //users.push(user);
  //console.log(user);

  let user = new User(req.body);
  await user.save();
  res.json({
    status: true,
    message: "User Created",
    user,
  });
});

// update user
app.patch("/api/v1/users/:userid", async (req, res) => {
  let id = req.params.userid;
  let updatedData = req.body;
  // { name: 'ghanshyam' }

  //let user = users.find((u) => u.id == id);
  //user.name = updatedData.name;

  let user = await User.findByIdAndUpdate(id, updatedData, { new: true });
  res.json({
    status: true,
    message: "User updated",
    user,
  });
});

// delete user
app.delete("/api/v1/users/:userid", async (req, res) => {
  let id = req.params.userid;

  //   filter user with id
  //users = users.filter((u) => u.id != id);
  let deletedUser = await User.findByIdAndDelete(id);

  res.json({
    status: true,
    message: "User Deleted",
    deletedUser,
  });
});

app.listen(6000);
