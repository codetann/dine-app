import React from "react";
import { Stack, Box, Button, Heading, HStack, Spacer } from "@chakra-ui/react";

export default function CallToAction() {
  const direction = ["column", "column", "column", "row"];

  return (
    <Stack p="4rem 0" w="100%" spacing="1rem" direction={direction} bg="white">
      <Box>
        <Heading>Ready to dive in?</Heading>
        <Heading color="blue.500">Start your free trial today.</Heading>
      </Box>
      <Spacer />
      <HStack spacing="1rem">
        <Button fontSize="md" size="lg" colorScheme="blue">
          Get Started
        </Button>
        <Button fontSize="md" size="lg">
          Learn More
        </Button>
      </HStack>
    </Stack>
  );
}
