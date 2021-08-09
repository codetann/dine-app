import React from "react";
import PropTypes from "prop-types";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";

export default function RoomNumberInput({ setRoomId }) {
  const handleChange = (value) => {
    setRoomId(value);
  };

  return (
    <HStack>
      <PinInput
        onChange={handleChange}
        colorScheme="purple"
        type="alphanumeric"
      >
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
}

RoomNumberInput.propTypes = {
  setRoomId: PropTypes.func,
};
