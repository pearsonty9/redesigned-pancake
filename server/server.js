const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();

app.use(express.static(`${__dirname}/../client/`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (sock) => {
  sock.emit("message", "You are connected");

  // sock.on("action", (event) => console.log(event));
  sock.on("action", (event) => io.emit("action", event));
});

server.on("error", (error) => {
  console.log(error);
});

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is ready");
});
