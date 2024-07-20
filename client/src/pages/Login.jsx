import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo, setToken } = useContext(UserContext);
  const toast = useToast();

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        toast({
          title: "Login successful.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        const data = await response.json();
        const { username, userId, token } = data;
        setUserInfo({ id: userId, username });
        setToken(token);
        navigate("/");
      } else {
        toast({
          title: "Login failed.",
          description: "You have not logged in.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const boxColor = useColorModeValue("#f0f0f3", "#1e1e1e");
  const inputBg = useColorModeValue("#e0e0e0", "#333333");
  const inputColor = useColorModeValue("#e0e0e0", "#1a1a1a");
  const inputBorder = useColorModeValue("#e0e0e0", "#1f1f1f");
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
      justifyContent="center"
      minHeight="90vh"
      alignItems="center"
      bg={bgColor}
    >
      <Box
        bg={bgColor}
        width="500px"
        borderRadius="15px"
        boxShadow={`10px 10px 20px ${shadowDark}, -10px -10px 20px ${shadowLight}`}
        padding="40px"
      >
        <Flex
          justifyContent="center"
          direction="column"
          alignItems="center"
          height="100%"
        >
          <form onSubmit={handleRegister}>
            <Heading marginBottom={10} textAlign="center">
              Login
            </Heading>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                value={username}
                backgroundColor={inputColor}
                boxShadow={`inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`}
                border="none"
                borderRadius="10px"
                onChange={handleUsername}
                marginBottom={4}
              />
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                backgroundColor={inputColor}
                boxShadow={`inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`}
                border="none"
                borderRadius="10px"
                onChange={handlePassword}
                marginBottom={4}
              />
              <Button
                colorScheme="teal"
                width="100%"
                type="submit"
                borderRadius="10px"
                boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
              >
                Login
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
