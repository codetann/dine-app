import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export default function PublicRoute({ component: Component, ...rest }) {
  return <Route {...rest} component={Component} />;
}

PublicRoute.propTypes = {
  component: PropTypes.element,
};
