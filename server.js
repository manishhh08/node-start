// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello, world! this is port number 5021");
// });
// server.listen(5021, () => {
//   console.log("Server listening on port 5021");
// });
// console.log("this is the node start");

import express from "express";
import fs from "fs";
const app = express();
//middleware needed to display data captured
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/Users/manish/Projects/node-start/pages/home.html");
});
//login page
app.get("/login", (req, res) => {
  res.sendFile("/Users/manish/Projects/node-start/pages/login.html");
});
//read json and load it to a userList array
app.post("/login", (req, res) => {
  let userList = JSON.parse(fs.readFileSync("./data/users.json"));
});

app.post("/login", (req, res) => {
  console.log(req.body);

  // read users.json

  // load it to a userList array
  let userList = JSON.parse(fs.readFileSync("./data/users.json"));

  // compare the email and password from request with the userList array from the users.json
  let user = userList.find((u) => {
    return u.email == req.body.email && u.password == req.body.password;
  });

  if (user) {
    // if they match login successful and direct to home.html

    let homepage = fs.readFileSync(
      "D:/project/dented-code/BTC-APRIL-2025/node/pages/home.html",
      "utf8"
    );

    let htmlString = homepage.replace("[user]", user.name);

    res.send(htmlString);
  } else {
    // if unsuccessful let login unsuccessful message
    res.sendFile("D:/project/dented-code/BTC-APRIL-2025/node/pages/login.html");
  }
});

//register page
app.get("/register", (req, res) => {
  res.sendFile("/Users/manish/Projects/node-start/pages/register.html");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  let main = "Manish";
  console.log(main);

  // read file
  let data = fs.readFileSync("./data/users.json");
  console.log(JSON.parse(data));
  let userList = JSON.parse(data);
  userList.push(req.body);

  //write to file
  fs.writeFile("./data/users.json", JSON.stringify(userList), (err) => {
    if (err) {
      console.log("WRITE ERROR");
    }
  });

  res.sendFile("/Users/manish/Projects/node-start/pages/register.html");
});
app.listen(3000, () => {
  console.log("The server is started at port:", 3000);
});
