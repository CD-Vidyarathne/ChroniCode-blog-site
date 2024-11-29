import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BlogsPage from "../pages/Blog";
import About from "../pages/About";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      {/* General Authenticated Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog"
        element={
          <ProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
            <BlogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute allowedRoles={["user", "moderator", "admin"]}>
            <About />
          </ProtectedRoute>
        }
      />

      {/* Admin-Specific Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Moderator-Specific Routes */}
      <Route
        path="/moderator"
        element={
          <ProtectedRoute allowedRoles={["moderator", "admin"]}>
            <h1>Moderator Panel</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
