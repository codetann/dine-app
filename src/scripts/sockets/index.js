import { v4 as uuid } from "uuid";
import rooms from "./rooms";
import chalk from "chalk";

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = uuid();
    this.roomId;

    socket.on("join-room", ({ roomid }) => this.joinRoom(roomid));
  }

  joinRoom(roomid) {
    try {
      const members = rooms.join(this.id, roomid);
      this.roomId = roomid;
      this.socket.join(roomid);
      this.socket.emit("success:join-room", { id: this.id, members });
      this.io.to(roomid).emit("new:join-room", { members });
    } catch (error) {
      console.error(error);
      this.socket.emit("error:join-room", { msg: error });
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
