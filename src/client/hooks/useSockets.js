import { useEffect } from "react";

import { useStore } from "../providers/StoreProvider";
import { useHistory } from "react-router-dom";

const useSockets = () => {
  const history = useHistory();
  const { socket, members, error, room, gameData, results } = useStore();

  // send all users to the game when gameData is loaded
  useEffect(() => {
    if (gameData) history.push("/game");
  }, [gameData]);

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
  const endGame = (answers) => {
    socket.emit("end-game", { answers });
  };

  return {
    joinRoom,
    createRoom,
    leaveRoom,
    startGame,
    quitRoom,
    members,
    room,
    gameData,
    endGame,
    results,
  };
};

export default useSockets;
