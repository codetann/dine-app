import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../providers/AppContextProvider";

export default function PublicRoute({ component: Component, ...rest }) {
  const { isAuth } = useAppContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.element,
};
