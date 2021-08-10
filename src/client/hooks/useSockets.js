import { useStore } from "../providers/StoreProvider";
import { useHistory } from "react-router-dom";

const useSockets = () => {
  const history = useHistory();
  const { socket, members, error } = useStore();

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

  return { joinRoom, createRoom, leaveRoom, quitRoom, members: members && [] };
};

export default useSockets;
