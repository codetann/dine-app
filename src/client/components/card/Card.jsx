import React from "react";
import PropTypes from "prop-types";
import { VStack, Heading, Button } from "@chakra-ui/react";

export default function Card({ heading, isButton = false, ...rest }) {
  return (
    <>
      {!isButton && (
        <VStack
          {...rest}
          w="100%"
          maxW="lg"
          align="center"
          justify="center"
          bg="purple.500"
          color="white"
          borderRadius=".5rem"
          shadow="md"
        >
          <Heading>{heading}</Heading>
        </VStack>
      )}
      {isButton && (
        <Button
          {...rest}
          w="100%"
          maxW="lg"
          align="center"
          justify="center"
          colorScheme="purple"
          borderRadius=".5rem"
          shadow="md"
        >
          <Heading size="md">{heading}</Heading>
        </Button>
      )}
    </>
  );
}

Card.propTypes = {
  heading: PropTypes.string,
  isButton: PropTypes.bool,
};
