import React from "react";
// components
import { VStack } from "@chakra-ui/react";
import Signup from "../components/signup/Signup";

export default function SignupPage() {
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
      <Signup />
    </VStack>
  );
}
