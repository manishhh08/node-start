import express from "express";
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let users = [
  { id: 1, name: "ram" },
  { id: 2, name: "Joe" },
];
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "HELLO WORLD",
  });
});
// GET all users
app.get("/api/v1/users", (req, res) => {
  //   return res.json({
  //     status: false,
  //     message: "Users not found",
  //   });
  res.json({
    status: true,
    message: "Users Found",
    users: users,
  });
});
// Get specific user
app.get("/api/v1/users/:userid", (req, res) => {
  let id = req.params.userid;
  console.log("Userid: ", id);
  let user = users.find((u) => u.id == id);
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
app.post("/api/v1/users", (req, res) => {
  // req.body;
  let user = req.body;
  users.push(user);
  console.log(user);
  res.json({
    status: true,
    message: "User Created",
    users,
  });
});
// update user
app.patch("/api/v1/users/:userid", (req, res) => {
  let id = req.params.userid;
  let updatedData = req.body;
  // { name: 'ghanshyam' }
  let user = users.find((u) => u.id == id);
  user.name = updatedData.name;
  res.json({
    status: true,
    message: "User updated",
    user,
  });
});
// delete user
app.delete("/api/v1/users/:userid", (req, res) => {
  let id = req.params.userid;
  //   filter user with id
  users = users.filter((u) => u.id != id);
  res.json({
    status: true,
    message: "User Deleted",
  });
});
app.listen(3000);
