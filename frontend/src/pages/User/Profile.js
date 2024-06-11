import React from "react";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="flex flex-col w-[100%] h-[100%] justify-center ">
      <div className="p-[10px] m-[10px] text-4xl font-serif text-gray-100 font-medium">
        {"User Name:" + auth?.user?.name}
      </div>
      <div className="p-[10px] m-[10px] text-4xl font-serif text-gray-100 font-medium">
        {"User Email:" + auth?.user?.email}
      </div>
      <div className="p-[10px] m-[10px] text-4xl font-serif text-gray-100 font-medium">
        {"User Phone:" + auth?.user?.phone}
      </div>
    </div>
  );
};

export default Profile;