import { Routes, Route } from "react-router-dom";
import PortalHeader from "../layouts/headers/PortalHeader";
import LayoutPage from "../pages/portal/LayoutPage";
import DashboardPage from "../pages/portal/DashboardPage";

const PortalRoutes = () => {
  return (
    <>
      <PortalHeader />
      <main>
        <Routes>
          <Route path="/" element={<LayoutPage Component={DashboardPage} />} />
        </Routes>
      </main>
    </>
  );
};

export default PortalRoutes;
