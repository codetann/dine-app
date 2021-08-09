import { useState, useEffect } from "react";
import io from "socket.io-client";

const URL = `http://${window.location.hostname}:8050`;

export default function useWebSockets() {
  const [id, setId] = useState(null);
  const [roomid, setRoomId] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [members, setMembers] = useState([]);

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
      socket.on("success:join-room", ({ id, roomid, members }) => {
        console.log(members);
        setMembers(members);
        setRoomId(roomid);
        setId(id);
      });
      socket.on("success:create-room", ({ id, members, roomid }) => {
        setMembers(members);
        setId(id);
        setRoomId(roomid);
        setAdmin(true);
      });
      socket.on("new:leave-room", ({ members }) => {
        setMembers(members);
      });
      socket.on("success:leave-room", () => {
        setMembers(null);
        setRoomId(null);
      });
      socket.on("success:quit-room", () => {
        setMembers(null);
        setRoomId(null);
        setAdmin(false);
      });
      socket.on("new:quit-room", () => {
        setMembers(null);
        setRoomId(null);
        setAdmin(false);
      });
    }
  }, [socket]);

  const connect = () => {
    const newSocket = io(URL);
    setSocket(newSocket);
  };

  // socket.io event handlers
  const joinRoom = (name, roomid) => {
    socket.emit("join-room", { name, roomid });
  };
  const createRoom = (name, details) => {
    socket.emit("create-room", { name, details });
  };
  const leaveRoom = () => {
    socket.emit("leave-room");
  };
  const quitRoom = () => {
    socket.emit("quit-room");
  };

  return {
    emit: {
      joinRoom,
      createRoom,
      leaveRoom,
      quitRoom,
    },
    connect,
    members,
    admin,
    id,
    error,
    roomid,
  };
}
