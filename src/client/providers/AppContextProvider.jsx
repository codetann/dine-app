import React, { createContext, useContext, useEffect } from "react";
import Notification from "../components/notifications/Notification";
import useApi from "../hooks/useApi";
import useWebSockets from "../hooks/useWebSockets";
import PropTypes from "prop-types";

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const { API, AUTH, TEST } = useApi();
  const socketio = useWebSockets();

  const data = {
    isAuth: AUTH.isAuth,
    login: AUTH.login,
    signup: AUTH.signup,
    logout: AUTH.logout,
    user: AUTH.user,
    updatePhoto: API.updateImage,
    socketio,
    TEST,
  };

  return (
    <AppContext.Provider value={data}>
      <Notification />
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
