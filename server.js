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

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Dented Code Academy");
});

app.listen(3000, () => {
  console.log("The server is started at port:", 3000);
});
