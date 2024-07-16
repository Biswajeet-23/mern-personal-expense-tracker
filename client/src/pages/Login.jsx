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
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://127.0.0.4:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const { username, userId } = data;
        setUserInfo({ id: userId, username: username });
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

  const isErrorUsername = username === "";
  const isErrorPassword = password === "";

  return (
    <>
      {/* <form className="login" onSubmit={handleRegister}>
        <Heading>Login</Heading>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePassword}
        />
        <Button colorScheme="teal" variant="outline" type="submit">
          Login
        </Button>
      </form> */}
      <Flex alignItems="center" justifyContent="center">
        <form onSubmit={handleRegister}>
          <Heading marginTop={20}>Login</Heading>
          <FormControl isRequired marginTop={20}>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <FormLabel marginTop={5}>Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePassword}
            />

            <Button
              colorScheme="teal"
              variant="outline"
              type="submit"
              marginTop={5}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Flex>
    </>
  );
};

export default Login;
