import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../components/Layout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-[400px_400px] md:grid-cols-[40%_auto] h-[100%] min-h-[76vh]">
        <AdminMenu></AdminMenu>
        <div className="bg-blue-500">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
