import { useState, useEffect } from "react";
import io from "socket.io-client";

const URL = `http://${window.location.hostname}:8050`;

export default function useWebSockets() {
  const [id, setId] = useState(null);
  const [roomid, setRoomId] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [members, setMembers] = useState([]);

  // initialize new socket
  useEffect(() => {
    const newSocket = io(URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  // set socket listeners after the socket is created
  useEffect(() => {
    if (socket) {
      socket.on("error:any", ({ error }) => {
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
      socket.on("new:join-room", ({ members }) => {
        console.log(members);
        setMembers(members);
      });
      socket.on("success:join-room", ({ id, members }) => {
        console.log(members);
        setMembers(members);
        setId(id);
      });
      socket.on("success:create-room", ({ id, members, roomid }) => {
        setMembers(members);
        setId(id);
        setRoomId(roomid);
      });
    }
  }, [socket]);

  // socket.io event handlers
  const joinRoom = (name, roomid) => {
    socket.emit("join-room", { name, roomid });
  };
  const createRoom = (name, details) => {
    socket.emit("create-room", { name, details });
  };

  return {
    emit: {
      joinRoom,
      createRoom,
    },
    members,
    id,
    error,
    roomid,
  };
}
