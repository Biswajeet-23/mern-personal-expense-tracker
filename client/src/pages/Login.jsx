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
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo, setToken } = useContext(UserContext);

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
        const data = await response.json();
        const { username, userId, token } = data;
        setUserInfo({ id: userId, username });
        setToken(token);
        navigate("/");
      } else {
        alert("login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const boxColor = useColorModeValue("#f0f0f3", "#1e1e1e");
  const inputColor = useColorModeValue("#e0e0e0", "#333333");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#bebebe", "#141414");

  return (
    <Flex justifyContent="center" minHeight="90vh" alignItems="center">
      <Box
        bg={boxColor}
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
