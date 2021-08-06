import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { VStack, Button, HStack } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import { EmailInput, UploadWidget, FullnameInput } from "../components/input";
import Nav from "../components/navigation/Nav";

export default function ProfilePage() {
  const { user, updatePhoto } = useAppContext();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.photo);
  const history = useHistory();

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "name") setName(e.target.value);
    if (id === "email") setEmail(e.target.value);
  };

  const handleSave = async () => {
    await updatePhoto(image);
    history.push("/dashboard");
  };

  return (
    <VStack
      maxW="100vw"
      width="100%"
      minH="100vh"
      align="center"
      justify="flex-start"
      bg="gray.50"
      spacing="6rem"
      p={["1rem 1rem", "2rem 1rem", "2rem 2rem", "2rem 4rem", "2rem 4rem"]}
    >
      <Nav />
      <FullnameInput name={name} handleChange={handleChange} />
      <EmailInput email={email} handleChange={handleChange} />
      <UploadWidget setImage={setImage} />
      <HStack justify="right">
        <Button colorScheme="purple" onClick={handleSave}>
          Save
        </Button>
      </HStack>
    </VStack>
  );
}
