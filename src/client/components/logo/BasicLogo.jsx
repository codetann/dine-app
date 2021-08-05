import React from "react";
import PropTypes from "prop-types";
import { HStack, IconButton, Heading } from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";

export default function BasicLogo({ withTitle = true }) {
  return (
    <HStack spacing="1rem">
      <IconButton color="purple.600" fontSize="1.5rem" icon={<FaHamburger />} />
      {withTitle && <Heading size="xl">Dine</Heading>}
    </HStack>
  );
}

BasicLogo.propTypes = {
  withTitle: PropTypes.bool,
};
