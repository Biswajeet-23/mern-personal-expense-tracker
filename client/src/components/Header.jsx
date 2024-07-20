import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";
import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    toast({
      title: "Logout successful.",
      description: "You have successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    await logout();
    navigate("/login");
  };

  const textColor = useColorModeValue("#2d2d2d", "#f5f5f5");
  const linkColor = useColorModeValue("#f97316", "#f97316");
  const linkHoverColor = useColorModeValue("#4a90e2", "#4a90e2");

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
    <Flex
      style={neumorphismStyle}
      justifyContent={"space-between"}
      padding={3}
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
            boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
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
            >
              <Text
                fontWeight="700"
                _hover={{ color: linkHoverColor }}
                boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
                borderRadius="5px"
                padding="5px 10px"
              >
                Login
              </Text>
            </Link>
            <Link
              to="/register"
              style={{
                color: linkColor,
                textDecoration: "none",
              }}
            >
              <Text
                fontWeight="700"
                _hover={{ color: linkHoverColor }}
                boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
                borderRadius="5px"
                padding="5px 10px"
              >
                Register
              </Text>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
