import React, { createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useJwtCookie from "../hooks/useJwtCookie";
import PropTypes from "prop-types";

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const history = useHistory();
  const cookie = useJwtCookie();
  const { isAuth, login, signup, logout, jwt, email } = useAuth();

  useEffect(() => {
    if (jwt) return history.push("/dashboard");
  }, []);

  const data = {
    isAuth,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
