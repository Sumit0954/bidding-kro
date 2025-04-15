import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import WebsiteHeader from "../layouts/headers/WebsiteHeader";
import HomePage from "../pages/website/HomePage";
import RegistrationPage from "../pages/website/RegistrationPage";
import LoginPage from "../pages/website/LoginPage";
import RegistrationOTP from "../components/website/registration/RegistrationOTP";
import ForgotPasswordPage from "../pages/website/ForgotPasswordPage";
import ForgotPasswordOTP from "../components/website/forgot-password/ForgotPasswordOTP";
import ResetPasswordPage from "../pages/website/ResetPasswordPage";
import RegisterDataProvider from "../contexts/RegisterDataProvider";
import EmailVerificationPage from "../pages/website/EmailVerificationPage";
import AuthProvider, { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import AlertProvider, { AlertContext } from "../contexts/AlertProvider";
import CustomAlert from "../elements/CustomAlert/CustomAlert";
import UserDetailsProvider from "../contexts/UserDetailsProvider";
import BlogPage from "../pages/website/BlogPage";
import WebsiteFooter from "../layouts/footers/WebsiteFooter";
import BlogDetailsPage from "../pages/website/BlogDetailsPage";
import TermsAndConditions from "../pages/website/TermsAndConditions";
import PrivacyAndPolicy from "../pages/website/PrivacyAndPolicy";
import AboutUs from "../pages/website/AboutUs";
import ContactusPage from "../pages/website/ContactusPage";
import Disclaimer from "../pages/website/Disclaimer";
import CodeOfEthics from "../pages/website/CodeOfEthics";

const WebsiteRoutes = () => {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <UserDetailsProvider>
            <RegisterDataProvider>
              <WebsiteHeader />
              <main>
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/register/otp" element={<RegistrationOTP />} />
                  <Route
                    path="/email/verification"
                    element={<EmailVerificationPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/login/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/terms-and-conditions"
                    element={<TermsAndConditions />}
                  />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyAndPolicy />}
                  />
                  <Route
                    path="/login/forgot-password/otp"
                    element={<ForgotPasswordOTP />}
                  />
                  <Route element={<ProtectedRoutes />}>
                    <Route
                      path="/reset-password"
                      element={<ResetPasswordPage />}
                    />
                  </Route>

                  <Route path="/blogs" element={<BlogPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contactUs" element={<ContactusPage />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/code-of-ethics" element={<CodeOfEthics />} />
                </Routes>

                <CallAlert />
              </main>
            </RegisterDataProvider>
          </UserDetailsProvider>
        </AuthProvider>
      </AlertProvider>
      <WebsiteFooter />
    </>
  );
};

export default WebsiteRoutes;

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
