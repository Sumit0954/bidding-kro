import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PortalHeader from "../layouts/headers/PortalHeader";
import LayoutPage from "../pages/portal/LayoutPage";
import DashboardPage from "../pages/portal/DashboardPage";
import UserProfilePage from "../pages/portal/UserProfilePage";
import CompanyProfilePage from "../pages/portal/company-profile-pages/CompanyProfilePage";
import SettingPage from "../pages/portal/SettingPage";
import BidListPage from "../pages/portal/bid-pages/BidListPage";
import AuthProvider, { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import BidQuestionsPage from "../pages/portal/bid-pages/BidQuestionsPage";
import BidDocumentsPage from "../pages/portal/bid-pages/BidDocumentsPage";
import BidDetailsPage from "../pages/portal/bid-pages/BidDetailsPage";
import UserDetailsProvider from "../contexts/UserDetailsProvider";
import AlertProvider, { AlertContext } from "../contexts/AlertProvider";
import CustomAlert from "../elements/CustomAlert/CustomAlert";
import CompanyDetailsProvider from "../contexts/CompanyDetailsProvider";
import CompanyCategoryPage from "../pages/portal/company-profile-pages/CompanyCategoryPage";
import CompanyAddressAndCertificatePage from "../pages/portal/company-profile-pages/CompanyAddressAndCertificatePage";
import BidFormPage from "../pages/portal/bid-pages/BidFormPage";
import BidCategoriesPage from "../pages/portal/bid-pages/BidCategoriesPage";
import CompanyListPage from "../pages/portal/company-page/CompanyListPage";
import CompanyDetailPage from "../pages/portal/company-page/CompanyDetailPage";
import BidProducts from "../components/portal/bids/BidProducts";
import BidCreateDetails from "../components/portal/bids/BidCreateDetails";
import InvitedSuppliers from "../components/portal/bids/tabs/InvitedSuppliers";
import AcceptanceStatus from "../components/portal/bids/tabs/AcceptanceStatus";
import LiveBidsDetailPage from "../pages/portal/live-bids-pages/LiveBidsDetailPage";
import LivebidDetail from "../components/portal/live-bids/LivebidDetail";
import LiveBids from "../pages/portal/live-bids-pages/LiveBidsDetailPage";
import Messages from "../pages/portal/messsages/Messages";

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

                    {/* Company Profile Routes Start */}
                    <Route
                      path="/company-profile/:action"
                      element={<LayoutPage Component={CompanyProfilePage} />}
                    />
                    <Route
                      path="/company-profile/category/:id"
                      element={<LayoutPage Component={CompanyCategoryPage} />}
                    />
                    <Route
                      path="/company-profile/address-certificate/:id"
                      element={
                        <LayoutPage
                          Component={CompanyAddressAndCertificatePage}
                        />
                      }
                    />
                    {/* Company Profile Routes End */}

                    <Route
                      path="/settings"
                      element={<LayoutPage Component={SettingPage} />}
                    />

                    {/* Bids Routes Start */}
                    <Route
                      path="/bids"
                      element={<LayoutPage Component={BidListPage} />}
                    />
                    <Route
                      path="/bids/:action"
                      element={<LayoutPage Component={BidFormPage} />}
                    />
                    <Route
                      path="/bids/:action/:id"
                      element={<LayoutPage Component={BidFormPage} />}
                    />
                    <Route
                      path="/bids/categories/:id"
                      // path="/bids/categories"
                      element={<LayoutPage Component={BidCategoriesPage} />}
                    />
                    <Route
                      // path="/bids/categories/:id"
                      path="/bids/categories"
                      element={<LayoutPage Component={BidCategoriesPage} />}
                    />
                    <Route
                      path="/bids/products/:id"
                      // path="/bids/products"
                      element={<LayoutPage Component={BidProducts} />}
                    />
                    <Route
                      path="/bids/create/deatils/:id"
                      // path="/bids/deatils"
                      element={<LayoutPage Component={BidCreateDetails} />}
                    />
                    <Route
                      path="/bids/create/questions/:id"
                      element={<LayoutPage Component={BidQuestionsPage} />}
                    />
                    <Route
                      path="/bids/create/documents/:id"
                      // path="/bids/documents"
                      element={<LayoutPage Component={BidDocumentsPage} />}
                    />

                    <Route
                      path="/bids/details/:id"
                      element={<LayoutPage Component={BidDetailsPage} />}
                    />

                    <Route
                      path="/portal/bids/details/acceptanceStatus/:id/?type=invited"
                      element={<LayoutPage Component={AcceptanceStatus} />}
                    />
                    {/* Bids Routes End */}

                    {/* comapanies list route without id */}
                    <Route
                      path="/companies"
                      element={<LayoutPage Component={CompanyListPage} />}
                    />

                    {/* comapanies list route with id */}
                    <Route
                      path="/companies/:id"
                      element={<LayoutPage Component={CompanyListPage} />}
                    />

                    <Route
                      path="/invitesuppliers/:id"
                      element={<LayoutPage Component={InvitedSuppliers} />}
                    />

                    <Route
                      path="/companies/details/:id"
                      element={<LayoutPage Component={CompanyDetailPage} />}
                    />
                    {/* Live Bids Routes start */}
                    <Route
                      path="/liveBids"
                      element={<LayoutPage Component={LiveBids} />}
                    />

                    <Route
                      path="/liveBids/details"
                      element={<LayoutPage Component={LivebidDetail} />}
                    />
                     <Route
                      path="/messages"
                      element={<LayoutPage Component={Messages} />}
                    />
                  </Route>
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
  const { role, isAuthenticated } = useContext(AuthContext);
  return isAuthenticated && role === "PORTAL" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export const CallAlert = () => {
  const { alert } = useContext(AlertContext);
  return alert?.isVisible ? (
    <CustomAlert message={alert?.message} severity={alert?.severity} />
  ) : null;
};
