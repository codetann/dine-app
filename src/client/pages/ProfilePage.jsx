import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { VStack, Button, HStack, useToast } from "@chakra-ui/react";
import { useAppContext } from "../providers/AppContextProvider";
import { EmailInput, UploadWidget, FullnameInput } from "../components/input";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";

export default function ProfilePage() {
  const toast = useToast();
  const history = useHistory();
  const { user, API, error } = useAppContext();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.photo);

  useEffect(() => {
    if (error)
      toast({
        title: "Error",
        description: error,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
  }, [error]);

  const isDisabled =
    name === user.name && email === user.email && image === user.photo;

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "name") setName(e.target.value);
    if (id === "email") setEmail(e.target.value);
  };

  const handleSave = async () => {
    if (isDisabled) return;

    const info = {
      name: name === user.name ? null : name,
      email: email === user.email ? null : email,
      photo: image === user.photo ? null : image,
    };

    API.updateInfo(info);

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
            <Button
              colorScheme="purple"
              onClick={handleSave}
              isDisabled={isDisabled}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
