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
import BlogFromPage from "../pages/admin/BlogFormPage";
import TransactionListPage from "../pages/admin/TransactionListPage";
import TransactionDetailsPage from "../pages/admin/TransactionDetailsPage";
import TransactionPaymentPage from "../pages/admin/TransactionPaymentPage";
import QueryListPage from "../pages/admin/QueryListPage";
import QueryDetailPage from "../pages/admin/QueryDetailPage";
import AdminManagementPage from "../pages/admin/AdminManagementPage";
import AdminManagementForm from "../components/admin/adminMangement/AdminManagementForm";
import DashboardPage from "../pages/admin/DashboardPage";
import ReportPage from "../pages/admin/ReportPage";
import PortalBids from "../pages/admin/PortalBids";
import PortalBidDetail from "../components/admin/portalBids/PortalBidDetail";

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
                  path="/dashboard"
                  element={<LayoutPage Component={DashboardPage} />}
                />
                <Route
                  path="/reports"
                  element={<LayoutPage Component={ReportPage} />}
                />
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
                  path="/transactions/payments/:order_id"
                  element={<LayoutPage Component={TransactionPaymentPage} />}
                />
                <Route
                  path="/queries"
                  element={<LayoutPage Component={QueryListPage} />}
                />
                <Route
                  path="/queries/:query_type/:query_id"
                  element={<LayoutPage Component={QueryDetailPage} />}
                />
                <Route
                  path="/blogs"
                  element={<LayoutPage Component={BlogListPage} />}
                />
                <Route
                  path="blogs/:action"
                  element={<LayoutPage Component={BlogFromPage} />}
                />
                <Route
                  path="blogs/:action/:blog_id"
                  element={<LayoutPage Component={BlogFromPage} />}
                />
                <Route
                  path="/management"
                  element={<LayoutPage Component={AdminManagementPage} />}
                />
                <Route
                  path="/management/addmanagementform/:action"
                  element={<LayoutPage Component={AdminManagementForm} />}
                />
                <Route
                  path="/management/addmanagementform/:action/:id"
                  element={<LayoutPage Component={AdminManagementForm} />}
                />
                <Route
                  path="/portal-bids"
                  element={<LayoutPage Component={PortalBids} />}
                />
                <Route
                  path="/portal-bids/:id"
                  element={<LayoutPage Component={PortalBidDetail} />}
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
