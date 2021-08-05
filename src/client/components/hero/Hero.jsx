import React from "react";
import { Stack, Button, Heading, VStack, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <VStack justify="center" align="center" maxW="2xl" spacing="2rem" h="68vh">
      <Heading textAlign="center" size="3xl">
        Dinning out, made simple!
      </Heading>
      <Text textAlign="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </Text>
      <Stack w={["100%", "auto"]} direction={["column", "row"]} spacing="1rem">
        <Button colorScheme="purple" size="lg">
          Get started
        </Button>
        <Button size="lg">Learn more</Button>
      </Stack>
    </VStack>
  );
}
