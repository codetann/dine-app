import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IconButton,
  HStack,
  VStack,
  useDisclosure,
  Button,
  Spacer,
  Collapse,
  Divider,
  Avatar,
  Heading,
  Text,
} from "@chakra-ui/react";
import BasicLogo from "../logo/BasicLogo";
import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useAppContext } from "../../providers/AppContextProvider";

// there is a bug when applying spacing to the (VStack) when the collapse transition fires

const LINKS = [
  { id: 1, text: "Home ", path: "/" },
  { id: 2, text: "Nearby", path: "/" },
  { id: 3, text: "Favorites", path: "/" },
];

export default function MobileNav() {
  const { logout } = useAppContext();
  const history = useHistory();
  const { isOpen, onToggle } = useDisclosure();
  const [isActive, setIsActive] = useState("Start");
  const handleLinkChange = (e) => {
    setIsActive(e.target.id);
    onToggle();
  };
  const handleSignOut = () => {
    logout();
    history.push("/login");
  };

  return (
    <VStack
      zIndex="10"
      overflow="hidden"
      shadow="md"
      pos="fixed"
      top="0"
      bg="white"
      w="100%"
      padding="0 1rem 1rem 1rem"
      spacing="0"
    >
      {/* Nav Bar */}
      <HStack w="100%" paddingTop="1rem">
        <BasicLogo withTitle={false} />
        <Spacer />
        {isOpen && (
          <IconButton
            onClick={onToggle}
            fontSize="20px"
            bg="none"
            icon={<SmallCloseIcon />}
          />
        )}
        {!isOpen && (
          <IconButton
            onClick={onToggle}
            fontSize="20px"
            bg="none"
            icon={<HamburgerIcon />}
          />
        )}
      </HStack>

      {/* Nav Links */}
      <Collapse in={isOpen} unmountOnExit={true}>
        <VStack w="100vw" padding="1rem" spacing="1rem">
          <VStack w="100%">
            {LINKS.map((l) => (
              <Button
                variant={isActive === l.text ? "solid" : "ghost"}
                colorScheme="purple"
                color={isActive === l.text ? "white" : "black"}
                display="flex"
                w="100%"
                alignItems="center"
                justifyContent="flex-start"
                key={l.id}
                id={l.text}
                onClick={handleLinkChange}
              >
                {l.text}
              </Button>
            ))}
            {/* <Button w="100%" colorScheme="purple" variant="outline">
              Find me food
            </Button> */}
          </VStack>

          <Divider />

          {/* Profile Info */}
          <VStack w="100%">
            <HStack width="100%" justify="left" spacing="1rem">
              <Avatar size="sm" />
              <VStack align="left" spacing=".2rem">
                <Heading size="sm">John Doe</Heading>
                <Text fontSize="12px">john@example.com</Text>
              </VStack>
            </HStack>

            <Button
              variant="ghost"
              display="flex"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              display="flex"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
            >
              Settings
            </Button>
            <Button
              display="flex"
              w="100%"
              variant="ghost"
              colorScheme="red"
              alignItems="center"
              justifyContent="flex-start"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </VStack>
        </VStack>
      </Collapse>
    </VStack>
  );
}
