import React from "react";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";

export default function RoomNumberInput({ setRoomNumber }) {
  const handleChange = (e) => setRoomNumber(e.target.value);

  return (
    <HStack>
      <PinInput colorScheme="purple" type="alphanumeric">
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
}
