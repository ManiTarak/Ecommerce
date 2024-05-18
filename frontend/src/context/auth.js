import { createContext, useContext, useEffect, useState } from "react";

//craeting Auth context
const AuthContext = createContext();

//creating a function which declare initial state as user value null and taken to empty string
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    if (localStorage.getItem("authInfo")) {
      setAuth(JSON.parse(localStorage.getItem("authInfo")));
    }
  }, [auth]);
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
