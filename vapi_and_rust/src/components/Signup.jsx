import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);

      if (data.success) {
        // Store user info locally so Home can greet without re-login
        localStorage.setItem("username", form.name);
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userPassword", form.password);

        navigate("/"); // Redirect straight to Home
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-100">
      {/* Left Side - Image */}
      <div className="flex-1 w-full bg-gradient-to-br from-teal-400 to-blue-900 flex items-center justify-center">
        <img
          src="/login.jpg"
          alt="Signup Visual"
          className="w-full h-auto shadow-2xl object-cover md:w-full"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 rounded-2xl shadow-lg bg-white"
        >
          <h2 className="mb-6 text-gray-800 font-bold text-3xl tracking-wide text-center">
            Sign Up
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-medium">Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-medium">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-medium">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-900 text-white rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
