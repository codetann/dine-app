import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  HStack,
  IconButton,
  Button,
  Heading,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { useAppContext } from "../../providers/AppContextProvider";

export default function Login() {
  const toast = useToast();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { AUTH, error, TEST } = useAppContext();

  useEffect(() => {
    if (AUTH.isAuth) history.push("/dashboard");
  }, [AUTH.isAuth]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error]);

  // event handler functions
  const handleLogin = async () => {
    if (!email || !password) return;

    await AUTH.login(email, password);

    setEmail("");
    setPassword("");
  };
  const handleSignup = () => history.push("/signup");
  const testingLogin = () => {
    if (!process.env.REACT_APP_TESTING) return;
    TEST.forceLogin();
  };
  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <VStack spacing="3rem" w="100%" maxW="lg">
      {/* Info Section */}
      <HStack spacing="1rem">
        <IconButton
          onClick={testingLogin}
          color="purple.600"
          fontSize="1.5rem"
          icon={<FaHamburger />}
        />
        <Heading size="xl">Food</Heading>
      </HStack>
      <VStack>
        <Heading>Login to your account</Heading>
        <HStack spacing=".4rem">
          <Text>or</Text>
          <Text color="purple.600" cursor="pointer" onClick={handleSignup}>
            create an account
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
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input id="email" type="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input id="password" type="password" onChange={handleChange} />
        </FormControl>
        <Button
          isDisabled={!email || !password}
          onClick={handleLogin}
          w="100%"
          colorScheme="purple"
        >
          Sign In
        </Button>
        {/* <HStack w="100%" spacing="2rem" justify="center">
          <Text fontWeight="500" color={"blackAlpha.700"}>
            or continue with
          </Text>
        </HStack>
        <HStack>
          <IconButton color="#1877f2" icon={<FaFacebook />} />
          <IconButton color="#ea4335" icon={<FaGoogle />} />
          <IconButton color="#1da1f2" icon={<FaTwitter />} />
        </HStack> */}
      </VStack>
    </VStack>
  );
}
