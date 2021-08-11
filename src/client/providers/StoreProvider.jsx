import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useAlert from "./context-hooks/useAlert";
import useSetup from "./context-hooks/useSetup";

const StoreContext = createContext(null);
const URL = `http://${window.location.hostname}:8050`;
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  // custom hooks for context only
  const { errorAlert } = useAlert();
  const initializeSocket = useSetup();

  // initialize sockets on login/signup
  useEffect(() => {
    if (isAuth) {
      const newSocket = io(URL);
      setSocket(newSocket);
    }
  }, [isAuth]);

  // set socket events when socket is loaded
  useEffect(() => {
    if (socket) {
      initializeSocket(
        socket,
        setError,
        setMembers,
        setRoom,
        setIsAdmin,
        setGameData,
        setResults
      );
    }
  }, [socket]);

  // handle error alerts
  useEffect(() => {
    if (error) errorAlert(error);
  }, [error]);

  const store = {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    error,
    setError,
    socket,
    setSocket,
    isAuth,
    setIsAuth,
    room,
    members,
    setRoom,
    setMembers,
    gameData,
    setGameData,
    results,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
