import React, { useEffect } from "react";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import { useGame, useSockets } from "../hooks";
import {
  Spinner,
  Heading,
  VStack,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function GamePage() {
  const { answerYes, answerNo, currentBusiness, isFinished, answers } =
    useGame();
  const { endGame } = useSockets();

  useEffect(() => {
    if (isFinished) endGame(answers);
  }, [isFinished]);

  return (
    <AuthPage>
      {currentBusiness && (
        <FadeTransition>
          <VStack spacing="2rem">
            <Image
              src={currentBusiness.image}
              boxSize="300px"
              objectFit="cover"
              borderRadius=".5rem"
              shadow="md"
            />
            <Heading size="md" textAlign="center">
              {currentBusiness.name}
            </Heading>
            <HStack w="100%" justify="center" align="center" spacing="2rem">
              <IconButton
                colorScheme="red"
                // bg="red.100"
                // color="red.800"
                fontSize="2rem"
                h="4rem"
                w="4rem"
                borderRadius="50%"
                // variant="outline"
                icon={<CloseIcon />}
                onClick={answerNo}
              />
              <IconButton
                colorScheme="green"
                // bg="green.100"
                // color="green.800"
                fontSize="2rem"
                h="4rem"
                w="4rem"
                borderRadius="50%"
                // variant="outline"
                icon={<CheckIcon />}
                onClick={answerYes}
              />
            </HStack>
          </VStack>
        </FadeTransition>
      )}

      {!currentBusiness && (
        <FadeTransition>
          <VStack w="100%" spacing="2rem">
            <Heading textAlign="center">
              Waiting for other players to finish
            </Heading>
            <Spinner color="purple.400" speed="1s" size="md" />
          </VStack>
        </FadeTransition>
      )}
    </AuthPage>
  );
}
