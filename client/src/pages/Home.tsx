import React from "react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { username } = useAuth();
  return (
    <div className="text-center py-20">
      <h1 className="text-7xl font-bold">
        Hi, <span className="text-primary">{username}</span>
      </h1>
      <h1 className="text-5xl font-bold">Welcome to ChroniCode</h1>
      <p className="mt-4 text-lg text-gray-600">
        Share your thoughts, ideas, and stories with the world.
      </p>
      <div className="mt-6">
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
