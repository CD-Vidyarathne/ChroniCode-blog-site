import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const token = localStorage.getItem("authToken");

  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || !token) {
    return <Navigate to="/auth/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/auth/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
