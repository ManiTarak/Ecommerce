import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    });
    const finalRes = await res.json();
    if (finalRes.token && finalRes.token != "") {
      toast.success(finalRes.message);
      localStorage.setItem("authInfo", JSON.stringify(finalRes));
      setAuth({
        ...auth,
        user: finalRes.user,
        token: finalRes.token,
      });
      navigate("/", { replace: true });
    } else if (!finalRes.existed) {
      toast.error(finalRes.message);
    } else if (!finalRes.pass) {
      toast.error(finalRes.message);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center h-full bg-gradient-to-r from-green-400 to-blue-500">
        <form
          className="flex flex-col  w-96 justify-center bg-yellow-300 items-center bg-gradient-to-r from-pink-500 to-yellow-500 shadow-md shadow-green-700"
          onSubmit={handleSubmitClick}
        >
          <h1 className="text-center mb-5 mt-2 font-bold text-black-500 text-3xl font-serif">
            LOGIN FORM
          </h1>

          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter Email"
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter Password"
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>

          <button
            type="submit"
            className="text-white text-xl mt-5 mb-2 font-semibold bg-black py-2 px-8 w-52 font-serif "
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
