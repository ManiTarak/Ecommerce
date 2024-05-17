import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    console.log(name + email + password + address + phone);
    const res = await fetch(`${process.env.REACT_APP_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
        email,
        address,
        phone,
        role: 1,
      }),
    });
    const finalRes = await res.json();
    if (finalRes.register) {
      toast.success(finalRes.message);
      navigate("/login");
    } else if (!finalRes.register && finalRes.existed) {
      toast.error(finalRes.message);
    } else if (!finalRes.cred) {
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
            REGISTER FORM
          </h1>
          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8 w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter Name"
            type="text"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
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
          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter PhoneNo"
            type="number"
            value={phone}
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
          <input
            className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Enter Address"
            type="text"
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="text-white text-xl mt-5 mb-2 font-semibold bg-black py-2 px-8 w-52 font-serif "
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
