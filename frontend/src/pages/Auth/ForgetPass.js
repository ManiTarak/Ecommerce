import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sport, setSport] = useState("");

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/forget-password`, {
        method: "POST",
        body: JSON.stringify({
          password: newPassword,
          email,
          sport,
        }),
      });
      const finalRes = await res.json();
      if (finalRes.updated) {
        toast.success(finalRes.message);
        navigate("/login");
      } else if (finalRes.invalidSport) {
        toast.error(finalRes.message);
      } else {
        toast.error(finalRes.message);
      }
    } catch (e) {
      toast.error("Something Bad Happended while updating password");
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
            RESET FORM
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
            placeholder="Enter New Password"
            type="password"
            value={newPassword}
            required
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter Your Faviourte Sport"
            type="text"
            value={sport}
            required
            onChange={(e) => {
              setSport(e.target.value);
            }}
          ></input>

          <button
            type="submit"
            className="text-white text-xl mt-5 mb-2 font-semibold bg-black py-2 px-8 w-52 font-serif "
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPass;
