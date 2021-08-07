import socketio from "socket.io";
import { disconnect } from "./socket.disconnect";
import chalk from "chalk";
import { log } from "./socket.log";

const start = (server) => {
  const io = new socketio.Server(server);

  // put socket events here
  io.on("connection", (socket) => {
    console.log(`${chalk.blue("🔌 socket")}  - connection successful`);
    log(socket);
    disconnect(socket);
  });
};

export default { start };
