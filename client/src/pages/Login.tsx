import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../config/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        captchaToken: captchaValue,
      });

      const { token, role, id } = response.data;
      console.log(response.data);
      localStorage.setItem("authToken", token);
      login(role, id);
      navigate("/");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-md p-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="form-control mt-4">
          <label>Email</label>
          <input
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control mt-4">
          <label>Password</label>
          <input
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={(value) => setCaptchaValue(value)}
          className="mt-4"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
        <Link to="/signup" className="mt-3 underline">
          New Here ? Please Register.
        </Link>
      </form>
    </div>
  );
};

export default Login;
