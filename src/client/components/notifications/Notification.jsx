import React from "react";
import { HStack, VStack, Heading, Text, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon, WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";

export default function Notification() {
  return (
    <HStack
      h="8rem"
      p="2rem"
      spacing="2rem"
      position="absolute"
      bg="white"
      borderRadius=".5rem"
      shadow="xl"
      right={0}
      transform="translate(-1rem, 1rem)"
    >
      <VStack h="100%" ustify="flex-start">
        <WarningIcon fontSize="1.5rem" color="red.400" />
      </VStack>
      <VStack h="100%" align="left">
        <Heading size="md">This is a warning!</Heading>
        <Text color="blackAlpha.700">Could not update data. Try agian.</Text>
      </VStack>
      <VStack h="100%" ustify="flex-start">
        <IconButton
          size="md"
          variant="ghost"
          icon={<SmallCloseIcon color="blackAlpha.800" />}
        />
      </VStack>
    </HStack>
  );
}
