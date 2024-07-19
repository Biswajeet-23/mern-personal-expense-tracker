import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../global_context/UserContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateRoute;
