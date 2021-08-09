import React, { createContext, useContext, useEffect } from "react";
import useApi from "../hooks/useApi";
import useWebSockets from "../hooks/useWebSockets";
import PropTypes from "prop-types";

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const { API, AUTH, user, error, TEST } = useApi();
  const socketio = useWebSockets();

  // initialize socketio on login / signup
  useEffect(() => {
    if (AUTH.isAuth) socketio.connect();
  }, [AUTH.isAuth]);

  const data = {
    error,
    user,
    AUTH,
    API,
    socketio,
    TEST,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
