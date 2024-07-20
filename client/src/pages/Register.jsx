import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      alert("registeration successful");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else alert("registeration failed");
  };

  const handleUsername = (e) => setUsername(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleEmail = (e) => setEmail(e.target.value);

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
              <Heading marginTop={20}>Register</Heading>
              <FormControl isRequired marginTop={20}>
                <FormLabel>Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  backgroundColor={inputColor}
                />
                <FormLabel marginTop={5}>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  backgroundColor={inputColor}
                />
                <FormLabel marginTop={5}>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  backgroundColor={inputColor}
                />

                <Button
                  colorScheme="teal"
                  type="submit"
                  marginTop={5}
                  width="100%"
                  mb={4}
                >
                  Register
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
