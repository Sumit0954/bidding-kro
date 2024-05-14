import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/website/HomePage";
import WebsiteHeader from "../layouts/headers/WebsiteHeader";
import RegistrationPage from '../pages/website/RegistrationPage';
import LoginPage from '../pages/website/LoginPage';

const WebsiteRoutes = () => {
  return (
    <main>
      <WebsiteHeader />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/register' element={<RegistrationPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </main>
  );
};

export default WebsiteRoutes;
