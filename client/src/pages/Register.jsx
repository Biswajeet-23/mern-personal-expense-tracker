import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      toast({
        title: "Registration successful.",
        description: "You have successfully registered in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else
      toast({
        title: "Registration failed.",
        description: "You have not been registered",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const inputBg = useColorModeValue("#e0e0e0", "#333333");
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
    <>
      <Flex
        justifyContent="center"
        minHeight="90vh"
        alignItems="center"
        style={neumorphismStyle}
      >
        <Box
          boxShadow={`10px 10px 20px ${shadowDark}, -10px -10px 20px ${shadowLight}`}
          width="500px"
          borderRadius="15px"
          padding="40px"
        >
          <Flex
            justifyContent="center"
            direction="column"
            alignItems="center"
            height="100%"
          >
            <form onSubmit={handleRegister}>
              <Heading marginBottom={10} textAlign="center" color={textColor}>
                Register
              </Heading>
              <FormControl isRequired>
                <FormLabel color={textColor}>Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  backgroundColor={inputBg}
                  boxShadow={`inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`}
                  border="none"
                  borderRadius="10px"
                  onChange={handleUsername}
                  marginBottom={4}
                  color={textColor}
                />
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  backgroundColor={inputBg}
                  boxShadow={`inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`}
                  border="none"
                  borderRadius="10px"
                  onChange={handleEmail}
                  marginBottom={4}
                  color={textColor}
                />
                <FormLabel color={textColor}>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  backgroundColor={inputBg}
                  boxShadow={`inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`}
                  border="none"
                  borderRadius="10px"
                  onChange={handlePassword}
                  marginBottom={4}
                  color={textColor}
                />
                <Button
                  colorScheme="teal"
                  width="100%"
                  type="submit"
                  borderRadius="10px"
                  boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
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
