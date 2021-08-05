export const disconnect = (socket) => {
  socket.on("disconnect", () => console.log("disconnection"));
};
