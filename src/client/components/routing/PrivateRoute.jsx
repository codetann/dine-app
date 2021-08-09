import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../providers/AppContextProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { AUTH } = useAppContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        AUTH.isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element,
};
