import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="flex flex-col bg-gray-50 h-[100%] flex items-center justify-center ">
      <h4 className="text-4xl font-semibold font-serif mt-[100px] ">
        ADMIN PANEL
      </h4>
      <ul className="flex flex-col bg-gray-50 h-[100%] flex items-center justify-center ">
        <li className="w-[100%] m-[10px] p-[10px] text-center text-2xl font-serif justify-center bg-yellow-600 font-semibold">
          <NavLink to="create-category">Create Category</NavLink>
        </li>
        <li className="w-[100%] m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold">
          <NavLink to="create-product">Create Product</NavLink>
        </li>
        <li className="w-[100%] m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold">
          <NavLink to="users">Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
