import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const Navbar: React.FC = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          ChroniCode
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {role == "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <Button className="btn-error ml-6" onClick={handleLogout}>
              Logout
            </Button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
