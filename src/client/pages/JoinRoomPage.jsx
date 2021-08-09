import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Heading, VStack, useToast } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import RoomNumberInput from "../components/join-room/RoomNumberInput";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";

export default function JoinRoomPage() {
  const toast = useToast();
  const history = useHistory();
  const { socketio, AUTH, user } = useAppContext();
  const [roomid, setRoomid] = useState("");

  // handle page change
  useEffect(() => {
    if (socketio.id && AUTH.isAuth) history.push("/waiting");
    if (!AUTH.isAuth) history.push("/login");
  }, [socketio.id]);

  // show error if one occurs. Error will reset after 1s
  useEffect(() => {
    if (socketio.error)
      toast({
        title: "Error",
        description: socketio.error,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
  }, [socketio.error]);

  // try to join socket
  const handleJoin = () => {
    socketio.emit.joinRoom(user.name, roomid);
  };

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
