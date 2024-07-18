import React from "react";
import { Box, Stack, Link, Icon, Text, Flex } from "@chakra-ui/react";
import { Home as HomeIcon } from "@styled-icons/boxicons-solid/Home";
import { CreditCard as ExpensesIcon } from "@styled-icons/boxicons-solid/CreditCard";
import { Settings as SettingsIcon } from "@styled-icons/feather/Settings";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const linkStyles = {
    as: NavLink,
    align: "center",
    p: 3,
    borderRadius: "md",
    _hover: {
      bg: "pink.500",
      textDecoration: "none",
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box p={5} bg="pink.300" height="100%">
      <Stack spacing={5}>
        <Flex
          {...linkStyles}
          to="/"
          bg={isActive("/") ? "pink.500" : "transparent"}
        >
          <Icon as={ExpensesIcon} boxSize={6} mr={2} />
          <Text>Expenses</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/dashboard"
          bg={isActive("/dashboard") ? "pink.500" : "transparent"}
        >
          <Icon as={HomeIcon} boxSize={6} mr={2} />
          <Text>Dashboard</Text>
        </Flex>
        <Flex
          {...linkStyles}
          to="/settings"
          bg={isActive("/settings") ? "pink.500" : "transparent"}
        >
          <Icon as={SettingsIcon} boxSize={6} mr={2} />
          <Text>Settings</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default SideBar;
