import React, { useContext } from "react";
import {
  Box,
  Stack,
  Icon,
  Text,
  Flex,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { Home as HomeIcon } from "@styled-icons/boxicons-solid/Home";
import { CreditCard as ExpensesIcon } from "@styled-icons/boxicons-solid/CreditCard";
import { Settings as SettingsIcon } from "@styled-icons/feather/Settings";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";

const SideBar = () => {
  const location = useLocation();
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;

  const linkStyles = {
    as: NavLink,
    align: "center",
    p: 1,
    borderRadius: "md",
    fontWeight: "500",
    _hover: {
      textDecoration: "none",
      color: useColorModeValue("accent.secondary", "background.secondary"),
      bg: useColorModeValue("hoverbutton.light", "hoverbutton.dark"),
    },
    _activeLink: {
      color: useColorModeValue("accent.secondary", "background.light"),
    },
  };

  const isActive = (path) => location.pathname === path;

  const sidebarBg = useColorModeValue(
    "background.secondary",
    "background.secondaryDark"
  );
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const activeLinkBg = useColorModeValue(
    "hoverbutton.light",
    "hoverbutton.dark"
  );
  const activeLinkColor = useColorModeValue(
    "accent.secondary",
    "background.secondary"
  );

  return (
    <Box
      p={2}
      height="100%"
      bg={sidebarBg}
      borderRightWidth="1px"
      borderColor={useColorModeValue("borders.default", "borders.defaultDark")}
      borderRadius="md"
    >
      <Flex mb={5} mt={5} flexDirection={"column"} alignItems={"center"}>
        <Avatar size="md" />
        <Box mt={2}>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            {username}
          </Text>
        </Box>
      </Flex>
      <Stack spacing={2}>
        <Flex
          {...linkStyles}
          to="/"
          bg={isActive("/") ? activeLinkBg : "transparent"}
          color={isActive("/") ? activeLinkColor : textColor}
        >
          <Icon as={ExpensesIcon} boxSize={5} mr={2} />
          <Text>Expenses</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/dashboard"
          bg={isActive("/dashboard") ? activeLinkBg : "transparent"}
          color={isActive("/dashboard") ? activeLinkColor : textColor}
        >
          <Icon as={HomeIcon} boxSize={5} mr={2} />
          <Text>Dashboard</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/settings"
          bg={isActive("/settings") ? activeLinkBg : "transparent"}
          color={isActive("/settings") ? activeLinkColor : textColor}
        >
          <Icon as={SettingsIcon} boxSize={5} mr={2} />
          <Text>Settings</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default SideBar;
