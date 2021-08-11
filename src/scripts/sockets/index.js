import { v4 as uuid } from "uuid";
import rooms from "./rooms";
import chalk from "chalk";

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = uuid();
    this.room;

    socket.on("join-room", ({ name, room }) => this.joinRoom(name, room));
    socket.on("create-room", ({ name, details }) =>
      this.createRoom(name, details)
    );
    socket.on("leave-room", () => this.leaveRoom());
    socket.on("quit-room", () => this.quitRoom());
    socket.on("start-game", () => this.startGame());
  }

  async createRoom(name, details) {
    try {
      const { room, members } = await rooms.create(this.id, name, details);
      // set user roomid and join room
      this.room = room;
      this.socket.join(room);
      // send success message back to user
      this.socket.emit("success:create-room", { id: this.id, members, room });
    } catch (error) {
      console.log(error);
      this.socket.emit("error:any", { error: "Could not create room" });
    }
  }

  joinRoom(name, room) {
    try {
      const members = rooms.join(this.id, name, room);
      // set user roomid and join room
      this.room = room;
      this.socket.join(room);
      // send success message with user id and members
      this.socket.emit("success:join-room", { id: this.id, room, members });
      this.io.to(room).emit("new:join-room", { members });
    } catch (error) {
      this.socket.emit("error:any", { error: "Could not find room." });
      console.error(error);
    }
  }

  leaveRoom() {
    try {
      const members = rooms.leave(this.id, this.room);
      this.socket.leave(this.room);

      this.io.to(this.room).emit("new:leave-room", { members });
      this.room = "";

      this.socket.emit("success:leave-room");
    } catch (error) {
      console.log(error);
      this.socket.emit("error:any", {
        error: "Error while leaving room",
      });
    }
  }

  quitRoom() {
    rooms.quit(this.room);

    this.socket.leave(this.room);
    this.io.to(this.room).emit("new:quit-room");
    this.io
      .to(this.room)
      .emit("error:any", { error: "Admin has left the current room" });
    this.socket.emit("success:quit-room");
    this.roomid = "";
  }

  startGame() {
    try {
      const businesses = rooms.start(this.room);
      this.io.to(this.room).emit("new:start-game", { businesses });
    } catch (error) {
      console.log("Could not find room details");
      this.socket.emit("error:any", {
        error: "Could not find room details",
      });
    }
  }
}

function socketio(io) {
  io.on("connection", (socket) => {
    console.log(`${chalk.blue("🔌 socket")}  - connection successful`);
    new Connection(io, socket);
  });
}

export default socketio;
