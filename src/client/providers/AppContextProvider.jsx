import React, { createContext, useContext, useEffect } from "react";
import useApi from "../hooks/useApi";
import PropTypes from "prop-types";

// initiallize context
const AppContext = createContext(null);

// custom context hook
export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const { API, AUTH, TEST } = useApi();

  const data = {
    isAuth: AUTH.isAuth,
    login: AUTH.login,
    signup: AUTH.signup,
    logout: AUTH.logout,
    user: AUTH.user,
    updatePhoto: API.updateImage,
    TEST,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
