import React, { useEffect } from "react";
import { useAuth } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  //checking whether user is logged in or not logged in
  useEffect(() => {
    if (auth?.token != "") {
      fetch(`${process.env.REACT_APP_URL}/user-auth`, {
        method: "GET",
        headers: {
          Authorization: auth.token,
        },
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          if (!data.OK) {
            navigate("/login");
          }
        });
    }
  }, [auth?.token]);

  return (
    <div>
      {auth.user ? (
        children
      ) : (
        <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
      )}
    </div>
  );
};

export default ProtectedRoute;
