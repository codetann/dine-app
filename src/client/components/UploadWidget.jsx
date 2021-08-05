import React, { useState, useRef } from "react";
import { IconButton, HStack, Button, Avatar } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import useUpload from "../hooks/useUpload";

export default function UploadWidget() {
  const [image, setImage] = useState(""); // actual image that will be sent to cloudinary
  const [imagePath, setImagePath] = useState(""); // holds the path to the image on users device
  const [uploadImage, url] = useUpload();
  const fileRef = useRef(null);

  const handleChange = (e) => {
    setImagePath(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleClick = () => fileRef.current.click();
  const handleUploadImage = () => uploadImage(image);

  return (
    <HStack>
      <input
        ref={fileRef}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Avatar src={url || imagePath} />
      <Button onClick={handleClick}>Change</Button>
      <IconButton icon={<FaAngleRight />} onClick={handleUploadImage} />
    </HStack>
  );
}
