import React from "react";
import PropTypes from "prop-types";
import { Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function FullnameInput({ name, handleChange }) {
  return (
    <Stack direction={["column", "row"]} w={"100%"}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input value={name} id="name" onChange={handleChange} type="text" />
      </FormControl>
    </Stack>
  );
}

FullnameInput.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
};
