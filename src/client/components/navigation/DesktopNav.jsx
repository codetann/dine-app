import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  HStack,
  Button,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import BasicLogo from "../logo/BasicLogo";
import { useAppContext } from "../../providers/AppContextProvider";

const LINKS = [
  { id: 1, text: "Home ", path: "/dashboard" },
  { id: 2, text: "Nearby", path: "/nearby" },
  { id: 3, text: "Favorites", path: "/favorites" },
];

export default function DesktopNav() {
  const history = useHistory();
  const location = useLocation();
  const { AUTH, user } = useAppContext();
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    if (location.pathname === "/desktop") setActiveId(1);
    if (location.pathname === "/nearby") setActiveId(2);
    if (location.pathname === "/favorites") setActiveId(3);
    if (location.pathname === "/joinroom") setActiveId(0);
    if (location.pathname === "/profile") setActiveId(0);
  }, [location]);
  // event handlers
  const handleSignOut = () => {
    AUTH.logout();
    history.push("/login");
  };
  const handleClick = (e) => {
    history.push(e.target.id);
  };
  const linkProfile = () => history.push("/profile");

  return (
    <HStack
      w="100%"
      spacing="2rem"
      shadow="md"
      position="fixed"
      top="0"
      p="1rem"
      bg="white"
    >
      <BasicLogo withTitle={false} />
      {/* Nav Links */}
      <HStack>
        {LINKS.map((l) => (
          <Button
            key={l.id}
            variant={activeId === l.id ? "solid" : "ghost"}
            colorScheme="purple"
            color={activeId === l.id ? "white" : "black"}
            id={l.path}
            onClick={handleClick}
          >
            {l.text}
          </Button>
        ))}
      </HStack>
      <Spacer />
      {/* Profile */}
      <Menu>
        <MenuButton>
          <Avatar size="sm" src={user.photo} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={linkProfile}>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={handleSignOut} color="red.400" fontWeight="bold">
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
