import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import io from "socket.io-client";

const URL = `http://${window.location.hostname}:8050`;

export default function useWebSockets() {
  const [socket, setSocket] = useState(null);
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const newSocket = io(URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("new:join-room", ({ members }) => setMembers(members));
      socket.on("error:join-room", ({ err }) => setError(err));
      socket.on("success:join-room", ({ id, members }) => {
        setMembers(members);
        setId(id);
      });
    }
  }, [socket]);

  const joinRoom = (roomid) => {
    socket.emit("join-room", { id, roomid });
  };

  return {
    emit: {
      joinRoom,
    },
    members,
    id,
    error,
  };
}
