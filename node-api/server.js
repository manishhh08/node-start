import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Hello Dented Code",
  });
});

app.get("/api/v1/users", (req, res) => {
  res.json({
    status: true,
    message: "Hello Dented Code",
    users: [
      { id: 1, name: "manish" },
      { id: 2, name: "lama" },
    ],
  });
});

app.get("/api/v1/users/:userid", (req, res) => {
  let id = req.params.userid;

  console.log("userid:", id);

  let user = users.find((u) => u.id == id);
  if (user) {
    res.json({
      status: true,
      message: "User found",
      user: user,
    });
  }
  //   res.json({
  //     status: true,
  //     message: "Hello Dented Code",
  //     users: [
  //       { id: 1, name: "manish" },
  //       { id: 2, name: "lama" },
  //     ],
  //   });
});

app.listen(3000);
