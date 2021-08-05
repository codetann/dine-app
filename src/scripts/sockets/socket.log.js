export const log = (socket) => {
  socket.on("log", (msg) => console.log(msg));
};
