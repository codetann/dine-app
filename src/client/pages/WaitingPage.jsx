import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Heading, Button, VStack, HStack, Tag } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
// components
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import { useSockets, useUser } from "../hooks";

// TODO - add support to show other peoples avatars

export default function WaitingPage() {
  const { leaveRoom, quitRoom, members, room } = useSockets();
  const { isAdmin } = useUser();

  const handleLeave = () => leaveRoom();
  const handleQuit = () => quitRoom();

  return (
    <AuthPage>
      <FadeTransition>
        <VStack maxW="xl" width="100%" spacing="2rem">
          {/* Only Viewable By Creator Of Room */}
          {isAdmin && (
            <HStack>
              <Heading size="md">Invite Code:</Heading>
              <Tag size="lg" variant="solid" colorScheme="purple">
                {room}
              </Tag>
            </HStack>
          )}

          <Heading textAlign="center">Waiting for members to join</Heading>

          {/* Members */}
          <VStack w="100%">
            {members &&
              members.map((m) => (
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

          {isAdmin && (
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

          {!isAdmin && (
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
