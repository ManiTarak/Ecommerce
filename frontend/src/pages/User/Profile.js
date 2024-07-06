import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sport, setSport] = useState("");
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
  }, []);

  // function to update Profile of user
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/login/update-profile`,
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
          sport: sport,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const authInfo = JSON.parse(localStorage.getItem("authInfo"));
      authInfo.user = result.data.user;
      setAuth(authInfo);
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      toast.success(result.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[77.7vh] bg-gradient-to-r from-green-400 to-blue-500">
      <form
        onSubmit={handleUpdateDetails}
        className="flex flex-col  w-[100%] md:w-96 justify-center bg-yellow-300 items-center bg-gradient-to-r from-pink-500 to-yellow-500 shadow-md shadow-green-700"
      >
        <h1 className="text-center mb-5 mt-2 font-bold text-black-500 text-3xl font-serif">
          PROFILE
        </h1>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8 w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter Email"
          type="email"
          value={email}
          disabled
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter PhoneNo"
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></input>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter Your Faviourte Sport"
          type="text"
          value={sport}
          onChange={(e) => {
            setSport(e.target.value);
          }}
        ></input>
        <input
          className="border-b-2 text-center border-solid border-slate-500 h-8  w-52 mb-2 focus:outline-none focus:ring-0 focus:border-gray-900"
          placeholder="Enter Address"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="text-white text-xl mt-5 mb-2 font-semibold bg-black py-2 px-8 w-52 font-serif "
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
