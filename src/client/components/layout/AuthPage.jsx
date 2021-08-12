import React from "react";
import { VStack } from "@chakra-ui/react";
import Nav from "../navigation/Nav";

export default function AuthPage({ children, pos = "center" }) {
  return (
    <VStack
      maxW="100vw"
      width="100%"
      minH="100vh"
      align="center"
      justify={pos}
      bg="gray.50"
      spacing="6rem"
      p={["1rem 1rem", "2rem 1rem", "2rem 2rem", "2rem 4rem", "2rem 4rem"]}
    >
      <Nav />
      {children}
    </VStack>
  );
}
