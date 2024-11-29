import React, { useEffect } from "react";
import Button from "../components/Button";
import checkTokenExpiration from "../utils/token";

const Home: React.FC = () => {
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <div className="text-center py-20">
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
