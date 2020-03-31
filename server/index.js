const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const userRoute = require("./routes/users");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./helper");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//DB connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(`DB connection error: ${err.message}`);
  });

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

//Run when client connects
io.on("connection", socket => {
  //listening for connection event
  console.log("connection successful!");

  //joining event
  socket.on("join", ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    //if (error) return callback(error);

    socket.join(user.room);

    //admin generated message event-1
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room: ${user.room}`
    });

    //admin generated message event-2
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`
    });
  });

  //sending message event
  socket.on("sendMessage", async (message, callback) => {
    try {
      const user = await getUser(socket.id);

      //user generated message event
      io.to(user.room).emit("message", {
        room: user.room,
        text: message
      });
    } catch (err) {
      console.log({ err });
    }

    callback(); //do something after the message sent in the frontend
  });

  //disconnect event
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
