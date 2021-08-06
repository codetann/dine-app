import React from "react";
import PropTypes from "prop-types";
import { Stack, FormControl, FormLabel, Input, Spacer } from "@chakra-ui/react";

export default function NameInput({ first, last, handleChange }) {
  return (
    <Stack direction={["column", "row"]} w={"100%"}>
      <FormControl id="first" isRequired>
        <FormLabel>First name</FormLabel>
        <Input value={first} id="first" onChange={handleChange} type="text" />
      </FormControl>
      <Spacer />
      <FormControl id="last" isRequired>
        <FormLabel>Last name</FormLabel>
        <Input value={last} id="last" onChange={handleChange} type="text" />
      </FormControl>
    </Stack>
  );
}

NameInput.propTypes = {
  first: PropTypes.string,
  last: PropTypes.string,
  handleChange: PropTypes.func,
};
