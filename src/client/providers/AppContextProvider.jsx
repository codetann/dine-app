import React, { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const { isAuth, login, signup, logout, user } = useAuth();

  const data = {
    isAuth,
    login,
    signup,
    logout,
    user,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
