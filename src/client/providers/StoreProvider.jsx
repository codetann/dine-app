import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  // creates socket on login / signup
  useEffect(() => {
    if (isAuth) {
      const newSocket = io(URL);
      setSocket(newSocket);
    }
  }, [isAuth]);

  // once socket is created, create the socket events
  useEffect(() => {
    if (socket) {
      socket.on("error:any", ({ error }) => {
        setError(error);
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
      socket.on("new:join-room", ({ members }) => {
        setMembers(members);
      });
      socket.on("success:join-room", ({ room, members }) => {
        setMembers(members);
        setRoom(room);
      });
      socket.on("success:create-room", ({ members, room }) => {
        setMembers(members);
        setRoom(room);
        setAdmin(true);
      });
      socket.on("new:leave-room", ({ members }) => {
        setMembers(members);
      });
      socket.on("success:leave-room", () => {
        setMembers(null);
        setRoom(null);
      });
      socket.on("success:quit-room", () => {
        setMembers(null);
        setRoom(null);
        setAdmin(false);
      });
      socket.on("new:quit-room", () => {
        setMembers(null);
        setRoom(null);
        setAdmin(false);
      });
    }
  }, [socket]);

  const store = {
    user,
    setUser,
    admin,
    setAdmin,
    error,
    setError,
    socket,
    setSocket,
    isAuth,
    setIsAuth,
    room,
    members,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
