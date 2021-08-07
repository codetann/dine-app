import React, { useState } from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import RoomNumberInput from "../components/join-room/RoomNumberInput";
import Nav from "../components/navigation/Nav";
import AuthPage from "../components/layout/AuthPage";

export default function JoinRoomPage() {
  const [roomNumber, setRoomNumber] = useState(null);

  return (
    <AuthPage>
      <VStack
        h="20rem"
        w="100%"
        maxW="lg"
        bg="white"
        borderRadius=".5rem"
        shadow="md"
        align="center"
        justify="center"
        p="1rem"
        spacing="2rem"
      >
        <Heading textAlign="center">Enter a room number</Heading>
        <RoomNumberInput setRoomNumber={setRoomNumber} />
        <Button colorScheme="purple">Join</Button>
      </VStack>
    </AuthPage>
  );
}
