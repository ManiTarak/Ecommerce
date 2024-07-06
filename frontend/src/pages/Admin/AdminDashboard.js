import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../components/Layout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout>
      <AdminMenu></AdminMenu>
      <div className="md:overflow-y-auto h-auto md:min-h-[76vh]">
        <Outlet />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
