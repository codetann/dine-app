import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Heading, Button, VStack, HStack, Tag } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
// components
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";

// TODO - add support to show other peoples avatars

export default function WaitingPage() {
  const history = useHistory();
  const { socketio } = useAppContext();

  useEffect(() => {
    if (!socketio.roomid) history.push("/dashboard");
  }, [socketio.roomid]);

  const handleLeave = () => {
    socketio.emit.leaveRoom();
    history.push("/dashboard");
  };

  const handleQuit = () => {
    socketio.emit.quitRoom();
    history.push("/dashboard");
  };

  if (!socketio.members) return <div></div>;
  return (
    <AuthPage>
      <FadeTransition>
        <VStack maxW="xl" width="100%" spacing="2rem">
          {/* Only Viewable By Creator Of Room */}
          {socketio.admin && (
            <HStack>
              <Heading size="md">Invite Code:</Heading>
              <Tag size="lg" variant="solid" colorScheme="purple">
                {socketio.roomid}
              </Tag>
            </HStack>
          )}

          <Heading textAlign="center">Waiting for members to join</Heading>

          {/* Members */}
          <VStack w="100%">
            {socketio.members.map((m) => (
              <HStack
                key={m.id}
                w="100%"
                maxW="md"
                p="2rem"
                borderRadius=".5rem"
                bg="white"
                justify="center"
                shadow="md"
              >
                <Heading size="md">{m.name}</Heading>
              </HStack>
            ))}
          </VStack>

          {socketio.admin && (
            <HStack w="100%" maxW="md">
              <Button
                onClick={handleQuit}
                colorScheme="red"
                variant="ghost"
                w="100%"
              >
                Quit
              </Button>
              <Button colorScheme="purple" variant="solid" w="100%">
                Start
              </Button>
            </HStack>
          )}

          {!socketio.admin && (
            <Button
              colorScheme="purple"
              variant="outline"
              w="100%"
              maxW="md"
              onClick={handleLeave}
            >
              Leave
            </Button>
          )}
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
