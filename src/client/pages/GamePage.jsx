import React, { useEffect } from "react";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import ImageTransition from "../components/animations/ImageTransition";
import { useGame, useSockets } from "../hooks";
import {
  Spinner,
  Heading,
  VStack,
  HStack,
  IconButton,
  Image,
  Tag,
  Box,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Rating from "../components/display/Rating";

// TODO: add transition animation to Image

export default function GamePage() {
  const { answerYes, answerNo, currentBusiness, isFinished, answers, counter } =
    useGame();
  const { endGame } = useSockets();

  // ends game when user has gone through all businesses
  useEffect(() => {
    if (isFinished) endGame(answers);
  }, [isFinished]);

  return (
    <AuthPage>
      {currentBusiness && (
        <FadeTransition>
          <VStack
            spacing="3rem"
            borderRadius=".2rem"
            p="2rem"
            w="100%"
            maxW="xl"
            bg="white"
            shadow="sm"
          >
            <VStack w="100%" align="left" spacing="1rem">
              <Image
                src={currentBusiness.image}
                // boxSize="300px"
                w="100%"
                h="300px"
                objectFit="cover"
                borderRadius=".5rem"
                shadow="md"
              />

              {/* tags */}
              <HStack spacing="1rem">
                {currentBusiness.categories.map((b, i) => (
                  <Tag key={i}>{b.title}</Tag>
                ))}
              </HStack>
              {/* name */}
              <Heading size="md" textAlign="left">
                {currentBusiness.name}
              </Heading>
              {/* rating */}
              <Rating
                rating={currentBusiness.rating}
                count={currentBusiness.review_count}
              />
            </VStack>

            <HStack
              w="100%"
              justify="center"
              align="center"
              spacing="2rem"
              mt="4rem"
            >
              <IconButton
                colorScheme="red"
                // bg="red.100"
                // color="red.800"
                // fontSize="2rem"
                // h="4rem"
                // w="4rem"
                borderRadius="50%"
                // variant="outline"
                icon={<CloseIcon />}
                onClick={answerNo}
              />
              <IconButton
                colorScheme="green"
                // bg="green.100"
                // color="green.800"
                // fontSize="2rem"
                // h="4rem"
                // w="4rem"
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
