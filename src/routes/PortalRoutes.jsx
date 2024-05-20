import { Routes, Route } from "react-router-dom";
import PortalHeader from "../layouts/headers/PortalHeader";
import LayoutPage from "../pages/portal/LayoutPage";
import DashboardPage from "../pages/portal/DashboardPage";
import UserProfilePage from "../pages/portal/UserProfilePage";
import CompanyProfilePage from "../pages/portal/CompanyProfilePage";
import SettingPage from "../pages/portal/SettingPage";

const PortalRoutes = () => {
  return (
    <>
      <PortalHeader />
      <main>
        <Routes>
          <Route path="/" element={<LayoutPage Component={DashboardPage} />} />
          <Route path="/user-profile" element={<LayoutPage Component={UserProfilePage} />} />
          <Route path="/company-profile" element={<LayoutPage Component={CompanyProfilePage} />} />
          <Route path="/settings" element={<LayoutPage Component={SettingPage} />} />
        </Routes>
      </main>
    </>
  );
};

export default PortalRoutes;
