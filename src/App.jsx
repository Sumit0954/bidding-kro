import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import PortalRoutes from "./routes/PortalRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="portal/*" element={<PortalRoutes />} />
        <Route path="admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
