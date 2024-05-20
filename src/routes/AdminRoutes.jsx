import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "../pages/admin/LayoutPage";
import CompanyListPage from "../pages/admin/CompanyListPage";
import AdminHeader from "../layouts/headers/AdminHeader";

const AdminRoutes = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Routes>
          <Route
            path="/companies"
            element={<LayoutPage Component={CompanyListPage} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default AdminRoutes;
