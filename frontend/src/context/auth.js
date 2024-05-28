import { createContext, useContext, useEffect, useState } from "react";

import Login from "../pages/Auth/Login";
import axios from "axios";

//craeting Auth context
const AuthContext = createContext();

//creating a function which declare initial state as user value null and taken to empty string
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //checking whether the token present in localstorage and if present store it in global auth state variable
  useEffect(() => {
    async function backendCall() {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user-auth`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authInfo")).token,
        },
      });
      if (!res.data.OK) {
        <Login></Login>;
      } else {
        setAuth(JSON.parse(localStorage.getItem("authInfo")));
      }
    }

    if (localStorage.getItem("authInfo")) {
      if (JSON.parse(localStorage.getItem("authInfo")).token != "") {
        backendCall();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom Hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
