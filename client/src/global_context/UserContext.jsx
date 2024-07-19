import { createContext, useState } from "react";
import useToken from "../custom_hook/useToken";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { token, setToken, removeToken } = useToken();
  const [userInfo, setUserInfo] = useState(null);

  const logout = async () => {
    await fetch("http://127.0.0.4:4000/users/logout", {
      method: "POST",
      credentials: "include",
    });
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
