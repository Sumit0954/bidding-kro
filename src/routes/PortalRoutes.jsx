import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PortalHeader from "../layouts/headers/PortalHeader";
import LayoutPage from "../pages/portal/LayoutPage";
import DashboardPage from "../pages/portal/DashboardPage";
import UserProfilePage from "../pages/portal/UserProfilePage";
import CompanyProfilePage from "../pages/portal/CompanyProfilePage";
import SettingPage from "../pages/portal/SettingPage";
import BidListPage from "../pages/portal/BidListPage";
import AuthProvider, { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import BidFormPage from "../pages/portal/BidFormPage";
import BidDeatailsPage from "../pages/portal/BidDeatailsPage";
import UserDetailsProvider from "../contexts/UserDetailsProvider";
import AlertProvider, { AlertContext } from "../contexts/AlertProvider";
import CustomAlert from "../elements/CustomAlert/CustomAlert";
import CompanyDetailsProvider from "../contexts/CompanyDetailsProvider";

const PortalRoutes = () => {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <UserDetailsProvider>
            <CompanyDetailsProvider>
              <PortalHeader />
              <main>
                <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route
                      index
                      path="/"
                      element={<LayoutPage Component={DashboardPage} />}
                    />
                    <Route
                      path="/user-profile"
                      element={<LayoutPage Component={UserProfilePage} />}
                    />
                    <Route
                      path="/company-profile/:action"
                      element={<LayoutPage Component={CompanyProfilePage} />}
                    />
                    <Route
                      path="/settings"
                      element={<LayoutPage Component={SettingPage} />}
                    />
                    <Route
                      path="/bids"
                      element={<LayoutPage Component={BidListPage} />}
                    />
                  </Route>
                  <Route
                    path="/bids/create"
                    element={<LayoutPage Component={BidFormPage} />}
                  />
                  <Route
                    path="/bids/details"
                    element={<LayoutPage Component={BidDeatailsPage} />}
                  />
                </Routes>
                <CallAlert />
              </main>
            </CompanyDetailsProvider>
          </UserDetailsProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
};

export default PortalRoutes;

export const ProtectedRoutes = () => {
  const [isAuthenticated] = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const CallAlert = () => {
  const { alert } = useContext(AlertContext);
  return alert?.isVisible ? (
    <CustomAlert message={alert?.message} severity={alert?.severity} />
  ) : null;
};
