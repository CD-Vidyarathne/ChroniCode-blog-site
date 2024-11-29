import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/auth/*" element={<PublicRoutes />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
