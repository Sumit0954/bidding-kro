import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/website/HomePage";

const WebsiteRoutes = () => {
  return (
    <main>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </main>
  );
};

export default WebsiteRoutes;
