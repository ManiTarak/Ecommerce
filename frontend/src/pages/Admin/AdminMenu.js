import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className="flex flex-col bg-gray-50 h-[100%] flex items-center justify-center  ">
      <h4 className="text-4xl font-semibold font-serif mt-[30px] ">
        ADMIN PANEL
      </h4>
      <ul className="bg-gray-50 h-[100%] w-[100%] flex flex-col md:flex-row items-between justify-between ">
        <li className=" m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold rounded-lg">
          <NavLink to="create-category">Create Category</NavLink>
        </li>
        <li className=" m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold rounded-lg">
          <NavLink to="create-product">Create Product</NavLink>
        </li>
        <li className=" m-[10px] justify-center items-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold rounded-lg">
          <NavLink to="products">Products</NavLink>
        </li>
        <li className="m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold rounded-lg">
          <NavLink to="users">Users</NavLink>
        </li>
        <li className=" m-[10px] justify-center bg-yellow-600 p-[10px] text-center text-2xl font-serif font-semibold rounded-lg">
          <NavLink to="orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
