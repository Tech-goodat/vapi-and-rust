import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);

      if (data.success) {
        // Store username + credentials
        localStorage.setItem("username", data.name || "User");
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userPassword", form.password);

        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-100">
      {/* Left Side - Image */}
      <div className="flex-1 w-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center p-4">
        <img
          src="/login.jpg"
          alt="Login Visual"
          className="w-full h-auto rounded-3xl shadow-2xl"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 rounded-2xl shadow-lg bg-white"
        >
          <h2 className="mb-6 text-gray-800 font-bold text-2xl md:text-3xl tracking-wide text-center">
            Sign In
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-medium">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-medium">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
