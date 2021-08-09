import { v4 as uuid } from "uuid";
import rooms from "./rooms";
import chalk from "chalk";

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = uuid();
    this.roomid;

    socket.on("join-room", ({ name, roomid }) => this.joinRoom(name, roomid));
    socket.on("create-room", ({ name, details }) =>
      this.createRoom(name, details)
    );
    socket.on("leave-room", () => this.leaveRoom());
  }

  async createRoom(name, details) {
    try {
      const { roomid, members } = await rooms.create(this.id, name, details);
      // set user roomid and join room
      this.roomid = roomid;
      this.socket.join(roomid);
      // send success message back to user
      this.socket.emit("success:create-room", { id: this.id, members, roomid });
    } catch (error) {
      console.log(error);
      this.socket.emit("error:any", { error: "Could not create room" });
    }
  }

  joinRoom(name, roomid) {
    try {
      const members = rooms.join(this.id, name, roomid);
      // set user roomid and join room
      this.roomid = roomid;
      this.socket.join(roomid);
      // send success message with user id and members
      this.socket.emit("success:join-room", { id: this.id, roomid, members });
      this.io.to(roomid).emit("new:join-room", { members });
    } catch (error) {
      this.socket.emit("error:any", { error: "Could not find room." });
      console.error(error);
    }
  }

  leaveRoom() {
    try {
      const members = rooms.leave(this.id, this.roomid);
      this.socket.leave(this.roomid);

      this.io.to(this.roomid).emit("new:leave-room", { members });
      this.roomid = "";

      this.socket.emit("success:leave-room", { members: null });
    } catch (error) {
      console.log(error);
      this.socket.emit("error:any", {
        error: "Error while leaving room",
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
