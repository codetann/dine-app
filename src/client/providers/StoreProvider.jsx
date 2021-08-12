import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useAlert from "./context-hooks/useAlert";
import useSetup from "./context-hooks/useSetup";
import axios from "axios";

const StoreContext = createContext(null);
const URL = `http://${window.location.hostname}:8050`;
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  // - Global State - //
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [results, setResults] = useState(null);
  const [nearby, setNearby] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // - Custom Context Hooks Only - //
  const { errorAlert } = useAlert();
  const initializeSocket = useSetup();
  // - Derived State - //
  const location = { lat: latitude, long: longitude };

  const fetchFavorites = async () => {
    try {
      const res = await axios.post("http://localhost:8050/api/favorites", {
        id: user.id,
      });
      const json = res.data;
      setFavorites(json);
      console.log(json);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

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
      fetchFavorites();
    }
  }, [socket]);

  // handle error alerts
  useEffect(() => {
    if (error) errorAlert(error);
  }, [error]);

  // get users location when page loads
  useEffect(() => {
    const fetchNearby = async (lat, long) => {
      const res = await axios.post("http://localhost:3000/api/nearby", {
        location: {
          lat,
          long,
        },
      });
      const nearbyData = res.data;
      setNearby(nearbyData);
    };
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      fetchNearby(position.coords.latitude, position.coords.longitude);
    });
  }, []);

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
    setResults,
    results,
    location,
    nearby,
    favorites,
    setFavorites,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
