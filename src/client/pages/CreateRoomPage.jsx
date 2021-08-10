import React from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";
import { useSockets, useUser } from "../hooks";

export default function CreateRoomPage() {
  const { createRoom } = useSockets();
  const { user } = useUser();

  // try to create socket
  const handleCreate = () => createRoom(user.name, "details");

  return (
    <AuthPage>
      <FadeTransition>
        <Heading p="0 0 2rem 0" textAlign="center">
          Customize Settings
        </Heading>
        <VStack
          w="100%"
          maxW="lg"
          bg="white"
          borderRadius=".5rem"
          shadow="md"
          align="center"
          justify="center"
          p="3rem"
          spacing="2rem"
        >
          <Button onClick={handleCreate} colorScheme="purple">
            Create
          </Button>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
