import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.4:4000/users/register", {
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

  return (
    <>
      {/* <form className="register" onSubmit={handleRegister}>
        <h1>Register</h1>
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
        <button>Register</button>
      </form> */}

      <Flex alignItems="center" justifyContent="center">
        <form onSubmit={handleRegister}>
          <Heading marginTop={20}>Register</Heading>
          <FormControl isRequired marginTop={20}>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={handleUsername}
            />
            <FormLabel marginTop={5}>Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmail}
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
              Register
            </Button>
          </FormControl>
        </form>
      </Flex>
    </>
  );
};

export default Register;