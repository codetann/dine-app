import React from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
// components
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";

export default function WaitingPage() {
  const { socketio } = useAppContext();

  return (
    <AuthPage>
      <FadeTransition>
        <Heading>Waiting for members to join</Heading>
        {socketio.roomid && (
          <VStack>
            <Heading>Invite friends to join!</Heading>
            <Text>Invite Code: {socketio.roomid}</Text>
          </VStack>
        )}
        <VStack>
          {socketio.members.map((m) => (
            <Text key={m.id}>{m.name}</Text>
          ))}
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
