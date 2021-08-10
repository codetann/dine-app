import React, { useState } from "react";
import { VStack, Button, HStack, useToast } from "@chakra-ui/react";
import { EmailInput, UploadWidget, FullnameInput } from "../components/input";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import { useUpdate, useUser } from "../hooks";

export default function ProfilePage() {
  const { user } = useUser();
  const updateUser = useUpdate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.photo);

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

    await updateUser(info);
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
