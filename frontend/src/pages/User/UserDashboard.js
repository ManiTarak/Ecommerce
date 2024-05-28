import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import UserMenu from "./UserMenu";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-[400px_400px] md:grid-cols-[40%_auto] h-[100%]">
        <UserMenu></UserMenu>
        <div className="bg-blue-500">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
