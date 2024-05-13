import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
