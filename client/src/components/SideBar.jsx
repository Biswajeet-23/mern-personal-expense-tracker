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
      color: useColorModeValue("#4a90e2", "#4a90e2"),
      bg: useColorModeValue("#e0e0e0", "#333333"),
    },
    _activeLink: {
      color: useColorModeValue("#4a90e2", "#4a90e2"),
    },
  };

  const isActive = (path) => location.pathname === path;

  const sidebarBg = useColorModeValue("#f0f0f3", "#1e1e1e");
  const textColor = useColorModeValue("#2d2d2d", "#f5f5f5");

  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
  };

  return (
    <Box p={2} height="100%" style={neumorphismStyle} bg={sidebarBg}>
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
          bg={isActive("/") ? "#e0e0e0" : "transparent"}
          color={isActive("/") ? "#4a90e2" : textColor}
          boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
        >
          <Icon as={ExpensesIcon} boxSize={5} mr={2} />
          <Text>Expenses</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/dashboard"
          bg={isActive("/dashboard") ? "#e0e0e0" : "transparent"}
          color={isActive("/dashboard") ? "#4a90e2" : textColor}
          boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
        >
          <Icon as={HomeIcon} boxSize={5} mr={2} />
          <Text>Dashboard</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/settings"
          bg={isActive("/settings") ? "#e0e0e0" : "transparent"}
          color={isActive("/settings") ? "#4a90e2" : textColor}
          boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
        >
          <Icon as={SettingsIcon} boxSize={5} mr={2} />
          <Text>Settings</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default SideBar;
