import React, { useState } from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import RoomNumberInput from "../components/join-room/RoomNumberInput";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";
import { useSockets, useUser } from "../hooks";

export default function JoinRoomPage() {
  const { joinRoom } = useSockets();
  const { user } = useUser();
  const [roomid, setRoomid] = useState("");

  // try to join socket
  const handleJoin = () => joinRoom(user.name, roomid);

  return (
    <AuthPage>
      <FadeTransition>
        <Heading p="0 0 2rem 0" textAlign="center">
          Enter a room number
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
          <RoomNumberInput setRoomId={setRoomid} />
          <Button onClick={handleJoin} colorScheme="purple">
            Join
          </Button>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
