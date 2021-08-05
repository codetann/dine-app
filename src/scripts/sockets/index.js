import socketio from "socket.io";
import { disconnect } from "./socket.disconnect";
import { log } from "./socket.log";

const start = (server) => {
  const io = new socketio.Server(server);

  // put socket events here
  io.on("connection", (socket) => {
    log(socket);
    disconnect(socket);
  });
};

export default { start };
