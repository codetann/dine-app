import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  HStack,
  IconButton,
  Button,
  Heading,
  VStack,
  Text,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { useAppContext } from "../../providers/AppContextProvider";
import useFormValidate from "../../hooks/useFormValidate";
import NameInput from "../input/NameInput";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

export default function Signup() {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const history = useHistory();
  const { AUTH, error } = useAppContext();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { isValid, isDisabled } = useFormValidate(formData, agreeTerms);

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

  useEffect(() => {
    if (AUTH.isAuth) {
      history.push("/dashboard");
    }
  });

  // handle events
  const handleClick = () => setAgreeTerms(!agreeTerms);
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setFormData((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  // handle actions
  const handleSignup = async () => {
    if (!formData) return;
    if (!isValid) return;

    await AUTH.signup(formData);
  };
  const handleLoginRedirect = () => history.push("/login");

  return (
    <VStack spacing="3rem" w="100%" maxW="lg">
      {/* Info Section */}
      <HStack spacing="1rem">
        <IconButton
          color="purple.600"
          fontSize="1.5rem"
          icon={<FaHamburger />}
        />
        <Heading size="xl">Food</Heading>
      </HStack>
      <VStack>
        <Heading textAlign="center">Sign up for a free account</Heading>
        <HStack spacing=".4rem">
          <Text>already have an account?</Text>
          <Text
            cursor="pointer"
            color="purple.600"
            onClick={handleLoginRedirect}
          >
            Login
          </Text>
        </HStack>
      </VStack>

      {/* Form Section */}
      <VStack
        w="100%"
        bg="white"
        spacing="2rem"
        p="2rem"
        shadow="md"
        borderRadius=".5rem"
      >
        <NameInput
          first={formData.first}
          last={formData.last}
          handleChange={handleChange}
        />
        <EmailInput email={formData.email} handleChange={handleChange} />
        <PasswordInput
          password={formData.password}
          handleChange={handleChange}
        />
        <PasswordInput
          password={formData.confirmPassword}
          confirm={true}
          handleChange={handleChange}
        />

        <HStack w="100%" spacing="1rem">
          <Switch colorScheme="purple" onChange={handleClick} />
          <Text size="xs">
            By Selecting this, you agree to the Privacy Policy and Cookie Policy
          </Text>
        </HStack>

        <Button
          isDisabled={isDisabled}
          onClick={handleSignup}
          w="100%"
          colorScheme="purple"
        >
          Continue
        </Button>
      </VStack>
    </VStack>
  );
}
