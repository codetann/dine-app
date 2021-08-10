import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import useApi from "../hooks/useApi";
import useWebSockets from "../hooks/useWebSockets";
import PropTypes from "prop-types";

// TODO - add success toast on updateinfo

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const toast = useToast();
  const socketio = useWebSockets();
  const { API, AUTH, user, error, TEST } = useApi();

  // initialize socketio on login / signup
  useEffect(() => {
    if (AUTH.isAuth) socketio.connect();
  }, [AUTH.isAuth]);

  useEffect(() => {
    if (socketio.error || error) {
      console.log(socketio.error);
      toast({
        title: "Error",
        description: socketio.error || error,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, socketio.error]);

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
