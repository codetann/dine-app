import React, { useState, useEffect } from "react";
import { VStack, useBreakpointValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// components
import MobileNav from "../components/navigation/MobileNav";
import DesktopNav from "../components/navigation/DesktopNav";
import Card from "../components/card/Card";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";

function Dashboard() {
  const history = useHistory();

  const linkJoinRoom = () => {
    history.push("/joinroom");
  };
  return (
    <AuthPage>
      {/* home step */}

      <FadeTransition>
        <VStack w="100%">
          <>
            <Card onClick={linkJoinRoom} isButton heading="Join Friends" />
            <Card isButton heading="Create A Room" />
          </>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}

export default Dashboard;
