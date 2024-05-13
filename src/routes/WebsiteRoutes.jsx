import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/website/HomePage";
import WebsiteHeader from "../layouts/headers/WebsiteHeader";

const WebsiteRoutes = () => {
  return (
    <main>
      < WebsiteHeader />
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </main>
  );
};

export default WebsiteRoutes;
