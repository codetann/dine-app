import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Heading, VStack, useToast } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";

export default function CreateRoomPage() {
  const toast = useToast();
  const history = useHistory();
  const { socketio, AUTH, user } = useAppContext();

  // handle page change
  useEffect(() => {
    if (socketio.roomid) history.push("/waiting");
    if (!AUTH.isAuth) history.push("/login");
  }, [socketio.roomid]);

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

  // try to create socket
  const handleCreate = () => {
    socketio.emit.createRoom(user.name, "details");
  };

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
