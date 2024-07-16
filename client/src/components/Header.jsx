import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../global_context/UserContext";
import { Button, Flex } from "@chakra-ui/react";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://127.0.0.4:4000/users/profile", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((user) => {
          setUserInfo(user);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    };
    fetchData();
  }, [setUserInfo]);

  const logout = async () => {
    const response = await fetch("http://127.0.0.4:4000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    if (response.status === 200) navigate("/login");
  };

  const username = userInfo?.username;

  return (
    <main>
      <div className="navbar">
        <div className="logo">Expense Tracker</div>
        <div className="user-signup">
          {username ? (
            <Flex gap={4}>
              <p>Hi {username}</p>
              <Button colorScheme="red" onClick={logout}>
                Logout
              </Button>
            </Flex>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Header;
