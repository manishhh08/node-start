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

app.get("/login", (req, res) => {
  res.sendFile("/Users/manish/Projects/node-start/pages/login.html");
});

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
