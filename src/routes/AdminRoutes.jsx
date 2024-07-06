import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LayoutPage from "../pages/admin/LayoutPage";
import CompanyListPage from "../pages/admin/CompanyListPage";
import CompanyDetailPage from "../pages/admin/CompanyDetailPage";
import AdminHeader from "../layouts/headers/AdminHeader";
import LoginPage from "../pages/admin/LoginPage";
import ForgotPasswordPage from "../pages/admin/ForgotPasswordPage";
import AuthProvider, { AuthContext } from "../contexts/AuthProvider";
import AlertProvider, { AlertContext } from "../contexts/AlertProvider";
import CustomAlert from "../elements/CustomAlert/CustomAlert";
import BlogListPage from "../pages/admin/BlogListPage";
import BlogCreateUpdatePage from "../pages/admin/BlogCreateUpdatePage";
import TransactionListPage from "../pages/admin/TransactionListPage";
import TransactionDetailsPage from "../pages/admin/TransactionDetailsPage";

const AdminRoutes = () => {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <AdminHeader />
          <main>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/companies"
                  element={<LayoutPage Component={CompanyListPage} />}
                />
                <Route
                  path="/companies/:company_id"
                  element={<LayoutPage Component={CompanyDetailPage} />}
                />
                <Route
                  path="/transactions"
                  element={<LayoutPage Component={TransactionListPage} />}
                />
                <Route
                  path="/transactions/:transaction_id"
                  element={<LayoutPage Component={TransactionDetailsPage} />}
                />
                <Route
                  path="/blogs"
                  element={<LayoutPage Component={BlogListPage} />}
                />
                <Route
                  path="/blog/:action"
                  element={<LayoutPage Component={BlogCreateUpdatePage} />}
                />
                <Route
                  path="/blog/:action/:blog_id"
                  element={<LayoutPage Component={BlogCreateUpdatePage} />}
                />
              </Route>
            </Routes>
            <CallAlert />
          </main>
        </AuthProvider>
      </AlertProvider>
    </>
  );
};

export default AdminRoutes;

export const ProtectedRoutes = () => {
  const { role, isAuthenticated } = useContext(AuthContext);
  return isAuthenticated && role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
};

export const CallAlert = () => {
  const { alert } = useContext(AlertContext);
  return alert?.isVisible ? (
    <CustomAlert message={alert?.message} severity={alert?.severity} />
  ) : null;
};
