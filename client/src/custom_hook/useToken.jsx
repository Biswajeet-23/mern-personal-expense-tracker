import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setTokenState] = useState(getToken());

  const setToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setTokenState(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setTokenState(null);
  };

  return {
    token,
    setToken,
    removeToken,
  };
};

export default useToken;
