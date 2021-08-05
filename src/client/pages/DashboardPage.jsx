import React from "react";
import { VStack, useBreakpointValue } from "@chakra-ui/react";
// components
import MobileNav from "../components/navigation/MobileNav";
import DesktopNav from "../components/navigation/DesktopNav";

function Dashboard() {
  const Nav = useBreakpointValue({ base: <MobileNav />, md: <DesktopNav /> });

  return (
    <VStack
      maxW="100vw"
      width="100%"
      minH="100vh"
      align="center"
      justify="flex-start"
      bg="gray.50"
      spacing="6rem"
      p={["1rem 1rem", "2rem 1rem", "2rem 2rem", "2rem 4rem", "2rem 4rem"]}
    >
      {Nav}
    </VStack>
  );
}

export default Dashboard;
