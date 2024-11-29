import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BlogsPage from "../pages/Blog";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Signup from "../pages/Signup";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogsPage />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <h1>Admin Dashboard</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="/moderator"
            element={
              <ProtectedRoute allowedRoles={["moderator", "admin"]}>
                <h1>Moderator Panel</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
