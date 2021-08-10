import React, { useState, useRef } from "react";
import { HStack, Button, Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useUser } from "../../hooks";

export default function UploadWidget({ setImage }) {
  const fileRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("");
  const { user } = useUser();

  const handleClick = () => fileRef.current.click();
  const handleChange = (e) => {
    setPlaceholder(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <HStack>
      <input
        ref={fileRef}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Avatar src={placeholder || user.photo} />
      <Button onClick={handleClick}>Change</Button>
    </HStack>
  );
}

UploadWidget.propTypes = {
  setImage: PropTypes.func,
};
