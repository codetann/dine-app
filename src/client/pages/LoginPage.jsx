import React from "react";
// components
import { VStack } from "@chakra-ui/react";
import Login from "../components/login/Login";

export default function LoginPage() {
  return (
    <VStack
      maxW="100vw"
      width="100%"
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      p={["2rem 1rem", "2rem 1rem", "2rem 2rem", "2rem 6rem", "2rem 8rem"]}
    >
      <Login />
    </VStack>
  );
}
