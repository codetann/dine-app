import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function PasswordInput({
  password,
  confirm = false,
  handleChange,
}) {
  return (
    <FormControl id="password" isRequired>
      <FormLabel>{confirm ? "Confirm Password" : "Password"}</FormLabel>
      <Input
        value={password}
        id={confirm ? "confirmPassword" : "password"}
        type="password"
        onChange={handleChange}
      />
    </FormControl>
  );
}

PasswordInput.propTypes = {
  password: PropTypes.string,
  confirm: PropTypes.bool,
  handleChange: PropTypes.func,
};
