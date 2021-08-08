import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Heading, VStack, SlideFade } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import RoomNumberInput from "../components/join-room/RoomNumberInput";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";

export default function JoinRoomPage() {
  const { socketio } = useAppContext();
  const history = useHistory();
  const [roomid, setRoomid] = useState("ffff");

  useEffect(() => {
    if (socketio.id) history.push("/waiting");
  }, [socketio.id]);

  const handleJoin = () => socketio.emit.joinRoom(roomid);

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
          <RoomNumberInput />
          <Button onClick={handleJoin} colorScheme="purple">
            Join
          </Button>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
