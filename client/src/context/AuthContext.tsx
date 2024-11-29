import React, { createContext, useContext, useState } from "react";
import checkTokenExpiration from "../utils/token";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  role: string;
  id: number;
  login: (username: string, role: string, id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkTokenExpiration(),
  );
  const data = JSON.parse(localStorage.getItem("userData") || "{}");
  const [role, setRole] = useState<string>(data.role || "user");
  const [id, setId] = useState<number>(data.id || 0);
  const [username, setUsername] = useState<string>(data.username || "");

  const login = (username: string, role: string, id: number) => {
    setIsAuthenticated(true);
    setUsername(username);
    setId(id);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setRole("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, role, id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
