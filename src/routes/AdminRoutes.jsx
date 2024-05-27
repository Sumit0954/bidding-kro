import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPage from "../pages/admin/LayoutPage";
import CompanyListPage from "../pages/admin/CompanyListPage";
import CompanyDetailPage from "../pages/admin/CompanyDetailPage";
import AdminHeader from "../layouts/headers/AdminHeader";
import LoginPage from "../pages/admin/LoginPage";
import ForgotPasswordPage from "../pages/admin/ForgotPasswordPage";

const AdminRoutes = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/companies"
            element={<LayoutPage Component={CompanyListPage} />}
          />
          <Route
            path="/companies/:company_id"
            element={<LayoutPage Component={CompanyDetailPage} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default AdminRoutes;
