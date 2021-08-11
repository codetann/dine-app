import { useStore } from "../providers/StoreProvider";
import { useHistory } from "react-router-dom";

const useSockets = () => {
  const history = useHistory();
  const { socket, members, error, room } = useStore();

  const joinRoom = (name, room) => {
    socket.emit("join-room", { name, room });
    if (!error) history.push("/waiting");
  };
  const createRoom = (name, details) => {
    socket.emit("create-room", { name, details });
    if (!error) history.push("/waiting");
  };
  const leaveRoom = () => {
    socket.emit("leave-room");
    if (!error) history.push("/dashboard");
  };
  const quitRoom = () => {
    socket.emit("quit-room");
    if (!error) history.push("/dashboard");
  };
  const startGame = () => {
    socket.emit("start-game");
    //if (!error) history.push("/game");
  };

  return {
    joinRoom,
    createRoom,
    leaveRoom,
    startGame,
    quitRoom,
    members,
    room,
  };
};

export default useSockets;
