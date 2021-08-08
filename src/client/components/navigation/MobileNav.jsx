import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  { id: 1, text: "Home ", path: "/dashboard" },
  { id: 2, text: "Nearby", path: "/nearby" },
  { id: 3, text: "Favorites", path: "/favorites" },
];

export default function MobileNav() {
  const history = useHistory();
  const location = useLocation();
  const { logout, user } = useAppContext();
  const [activeId, setActiveId] = useState(1);
  const { isOpen, onToggle } = useDisclosure();
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    if (location.pathname === "/desktop") setActiveId(1);
    if (location.pathname === "/nearby") setActiveId(2);
    if (location.pathname === "/favorites") setActiveId(3);
    if (location.pathname === "/joinroom") setActiveId(0);
    if (location.pathname === "/profile") setActiveId(0);
  }, [location]);

  const handleSignOut = () => {
    logout();
    history.push("/login");
  };
  const handleClick = (e) => {
    history.push(e.target.id);
  };
  const linkProfile = () => history.push("/profile");

  if (!user) return <div>...Loading</div>;

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
                variant={activeId === l.id ? "solid" : "ghost"}
                colorScheme="purple"
                color={activeId === l.id ? "white" : "black"}
                display="flex"
                w="100%"
                alignItems="center"
                justifyContent="flex-start"
                key={l.id}
                id={l.path}
                onClick={handleClick}
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
              <Avatar size="sm" src={user.photo} />
              <VStack align="left" spacing=".2rem">
                <Heading size="sm">{user.name}</Heading>
                <Text fontSize="12px">{user.email}</Text>
              </VStack>
            </HStack>

            <Button
              variant="ghost"
              display="flex"
              w="100%"
              alignItems="center"
              justifyContent="flex-start"
              onClick={linkProfile}
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
