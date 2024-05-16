import { Routes, Route } from "react-router-dom";
import WebsiteHeader from "../layouts/headers/WebsiteHeader";
import HomePage from "../pages/website/HomePage";
import RegistrationPage from "../pages/website/RegistrationPage";
import LoginPage from "../pages/website/LoginPage";
import RegistrationOTP from "../components/website/registration/RegistrationOTP";
import ForgotPasswordPage from "../pages/website/ForgotPasswordPage";
import ForgotPasswordOTP from "../components/website/forgot-password/ForgotPasswordOTP";
import ResetPassword from "../components/website/reset-password/ResetPassword";

const WebsiteRoutes = () => {
  return (
    <>
      <WebsiteHeader />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register/otp" element={<RegistrationOTP />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/login/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/login/forgot-password/otp"
            element={<ForgotPasswordOTP />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </>
  );
};

export default WebsiteRoutes;
