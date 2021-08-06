import React, { useState, useRef } from "react";
import { HStack, Button, Avatar } from "@chakra-ui/react";

import { useAppContext } from "../../providers/AppContextProvider";

export default function UploadWidget({ setImage }) {
  const fileRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("");
  const { user } = useAppContext();

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
