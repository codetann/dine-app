import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function EmailInput({ email, handleChange }) {
  return (
    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input value={email} id="email" type="email" onChange={handleChange} />
    </FormControl>
  );
}

EmailInput.propTypes = {
  email: PropTypes.string,
  handleChange: PropTypes.func,
};
