import React, { useMemo } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Login } from "../index";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  //checking whether user is logged in or not logged in
  useMemo(() => {
    async function backendCall() {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/admin-auth`,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authInfo")).token,
            },
          }
        );
        if (result.data.OK) {
          navigate(location.pathname);
        }
      } catch (result) {
        if (!result.response.data.admin && result.response.status === 404) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    }
    if (JSON.parse(localStorage.getItem("authInfo"))) {
      backendCall();
    }
  }, [auth?.token]);

  return (
    <div>
      {auth.user && auth.user.role === 0 ? (
        <Outlet />
      ) : (
        <div className="h-[100%] flex w-[100%] justify-center text-4xl items-center">
          Loading ...
        </div>
      )}
    </div>
  );
};

export default AdminRoute;
