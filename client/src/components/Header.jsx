import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const headerBg = useColorModeValue(
    "background.secondary",
    "theme.background.secondaryDark"
  );
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const linkColor = useColorModeValue("accent.primary", "accent.primary");
  const linkHoverColor = useColorModeValue(
    "accent.secondary",
    "accent.secondary"
  );

  return (
    <Flex
      justifyContent={"space-between"}
      padding={3}
      bg={headerBg}
      color={textColor}
      alignItems="center"
    >
      <Text fontSize="22px" fontWeight={"bold"} ml={4}>
        Expense Tracker
      </Text>
      <Flex gap={5} alignItems="center">
        <ColorModeSwitch />
        {token ? (
          <Button
            colorScheme="red"
            variant="solid"
            onClick={handleLogout}
            ml={4}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: linkColor,
                textDecoration: "none",
              }}
              _hover={{ color: linkHoverColor }}
            >
              <Text fontWeight="700">Login</Text>
            </Link>
            <Link
              to="/register"
              style={{
                color: linkColor,
                textDecoration: "none",
              }}
              _hover={{ color: linkHoverColor }}
            >
              <Text fontWeight="700">Register</Text>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
