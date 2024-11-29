import React, { useEffect, useState } from "react";
import api from "../config/api";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users");
      console.log(response);
      setUsers(response.data.users);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (userId: string) => {
    try {
      await api.put(`/admin/users/${userId}/promote`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to promote user", err);
    }
  };

  const handleDemote = async (userId: string) => {
    try {
      await api.put(`/admin/users/${userId}/demote`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to demote user", err);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500 text-white";
      case "moderator":
        return "bg-yellow-500 text-white";
      case "user":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getNextRole = (currentRole: string) => {
    const roles = ["user", "moderator", "admin"];
    const currentIndex = roles.indexOf(currentRole);
    return currentIndex < roles.length - 1
      ? roles[currentIndex + 1]
      : currentRole;
  };

  const getPreviousRole = (currentRole: string) => {
    const roles = ["user", "moderator", "admin"];
    const currentIndex = roles.indexOf(currentRole);
    return currentIndex > 0 ? roles[currentIndex - 1] : currentRole;
  };

  if (loading) {
    return (
      <div className="text-center mt-8 text-gray-300">Loading users...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold text-info mb-8">Admin Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-secondary">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td
                className={`border border-gray-300 px-4 py-2 text-center ${getRoleClass(user.role)}`}
              >
                {user.role}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex gap-2 justify-center">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handlePromote(user.id)}
                      className="btn btn-success btn-sm"
                    >
                      Promote
                    </button>
                  )}
                  {user.role !== "user" && (
                    <button
                      onClick={() => handleDemote(user.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Demote
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
