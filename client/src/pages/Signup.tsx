import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../config/api";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
        captchaToken: captchaValue,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (
        err.response.data.errors &&
        err.response.data.errors.length > 0
      ) {
        setError(err.response.data.errors[0].msg);
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
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="form-control mt-4">
          <label>Username</label>
          <input
            type="text"
            className="input input-bordered"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-4">
          <label>Email</label>
          <input
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-4">
          <label>Password</label>
          <input
            type="password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={(value) => setCaptchaValue(value)}
          className="mt-4"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Signup
        </button>
        <Link to="/login" className="mt-3 underline">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
