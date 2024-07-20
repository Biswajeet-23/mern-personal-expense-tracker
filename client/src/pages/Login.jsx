import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Flex,
  Box,
  Center,
  useColorMode,
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
        setUserInfo({ id: userId, username: username });
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

  const boxColor = useColorModeValue(
    "hoverbutton.secondary",
    "background.secondaryDark"
  );
  const inputColor = useColorModeValue("background.light", "background.dark");

  return (
    <>
      <Flex justifyContent={"center"} minHeight="90vh" alignItems={"center"}>
        <Box
          bg={boxColor}
          width={"500px"}
          borderRadius={15}
          borderWidth={2}
          borderColor={"white"}
        >
          <Flex
            justifyContent="center"
            direction="column"
            alignItems="center"
            height="100%"
            mb={10}
          >
            <form onSubmit={handleRegister}>
              <Heading marginTop={10}>Login</Heading>
              <FormControl isRequired marginTop={20}>
                <FormLabel>Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  backgroundColor={inputColor}
                  onChange={handleUsername}
                />
                <FormLabel marginTop={5}>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  backgroundColor={inputColor}
                  onChange={handlePassword}
                />

                <Button
                  colorScheme="teal"
                  width="100%"
                  type="submit"
                  marginTop={5}
                  mb={4}
                >
                  Login
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
