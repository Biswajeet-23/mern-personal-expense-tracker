import { createContext, useEffect, useState } from "react";
import useToken from "../custom_hook/useToken";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { token, setToken, removeToken } = useToken();
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  const logout = async () => {
    await fetch(
      "https://mern-personal-expense-tracker-backend.onrender.com/users/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    removeToken();
    setUserInfo(null);
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, token, setToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
