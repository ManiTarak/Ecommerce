import { createContext, useContext, useEffect, useState } from "react";

import Login from "../pages/Auth/Login";

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
    if (localStorage.getItem("authInfo")) {
      if (JSON.parse(localStorage.getItem("authInfo")).token != "") {
        fetch(`${process.env.REACT_APP_URL}/user-auth`, {
          method: "GET",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("authInfo")).token,
          },
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            if (!data.OK) {
              <Login></Login>;
            } else {
              setAuth(JSON.parse(localStorage.getItem("authInfo")));
            }
          });
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
