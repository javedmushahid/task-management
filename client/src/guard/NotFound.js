import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NotFound = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/tasks" /> : <Navigate to="/" />;
};

export default NotFound;
