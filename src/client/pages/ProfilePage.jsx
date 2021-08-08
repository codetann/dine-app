import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { VStack, Button, HStack } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import { EmailInput, UploadWidget, FullnameInput } from "../components/input";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
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
    <AuthPage>
      <FadeTransition>
        <VStack
          w="100%"
          p="2rem"
          maxW="xl"
          spacing="2rem"
          bg="white"
          borderRadius=".5rem"
          shadow="md"
        >
          <FullnameInput name={name} handleChange={handleChange} />
          <EmailInput email={email} handleChange={handleChange} />
          <HStack w="100%" justify="left">
            <UploadWidget setImage={setImage} />
          </HStack>

          <HStack justify="right">
            <Button colorScheme="purple" onClick={handleSave}>
              Save
            </Button>
          </HStack>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
