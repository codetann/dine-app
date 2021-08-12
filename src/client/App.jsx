import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// components
import { VStack } from "@chakra-ui/react";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
// pages
import HomePage from "./pages/HomePage";
import NearbyPage from "./pages/NearbyPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import JoinRoomPage from "./pages/JoinRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import WaitingPage from "./pages/WaitingPage";
import GamePage from "./pages/GamePage";
import FinishPage from "./pages/FinishPage";
import FavoritesPage from "./pages/FavoritesPage";

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
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/joinroom" component={JoinRoomPage} />
          <PrivateRoute path="/createroom" component={CreateRoomPage} />
          <PrivateRoute path="/waiting" component={WaitingPage} />
          <PrivateRoute path="/game" component={GamePage} />
          <PrivateRoute path="/finished" component={FinishPage} />
          <PrivateRoute path="/nearby" component={NearbyPage} />
          <PrivateRoute path="/favorites" component={FavoritesPage} />
        </Switch>
      </Router>
    </VStack>
  );
}
