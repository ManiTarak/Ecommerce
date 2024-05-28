import React, { useEffect } from "react";
import { useAuth } from "../context/auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  //checking whether user is logged in or not logged in
  useEffect(() => {
    async function backendCall() {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user-auth`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authInfo")).token,
        },
      });
      if (!res.data.OK) {
        navigate("/login");
      } else {
        navigate(location.pathname);
      }
    }
    if (JSON.parse(localStorage.getItem("authInfo"))) {
      backendCall();
    }
  }, [auth?.token]);

  return (
    <div>
      {auth.user ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
      )}
    </div>
  );
};

export default ProtectedRoute;
