import React, { useState } from "react";
import { VStack, useBreakpointValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// components
import MobileNav from "../components/navigation/MobileNav";
import DesktopNav from "../components/navigation/DesktopNav";
import Card from "../components/card/Card";
import AuthPage from "../components/layout/AuthPage";

const STEPS = {
  HOME: "HOME",
  JOIN: "JOIN",
  CREATE: "CREATE",
  WAITING: "WAITING",
};

function Dashboard() {
  const Nav = useBreakpointValue({ base: <MobileNav />, md: <DesktopNav /> });
  const history = useHistory();
  const [step, setStep] = useState(STEPS.HOME);

  const linkJoinRoom = () => history.push("/joinroom");

  return (
    <AuthPage>
      {/* home step */}

      <VStack w="100%">
        <>
          <Card onClick={linkJoinRoom} isButton heading="Join Friends" />
          <Card isButton heading="Create A Room" />
        </>
      </VStack>
    </AuthPage>
  );
}

export default Dashboard;
