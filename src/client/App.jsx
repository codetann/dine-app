import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// components
import { VStack } from "@chakra-ui/react";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
// pages
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

/**
 * TODO | socket.io
 * TODO | auth
 * TODO | context
 * TODO | dashboard
 */

export default function App() {
  return (
    <VStack maxW="100vw" width="100%" minH="100vh">
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={HomePage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </VStack>
  );
}
