import { createContext, useState } from "react";
import useToken from "../custom_hook/useToken";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { token, setToken, removeToken } = useToken();
  const [userInfo, setUserInfo] = useState(null);

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
