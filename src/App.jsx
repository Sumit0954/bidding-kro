import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import PortalRoutes from "./routes/PortalRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="portal/*" element={<PortalRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
