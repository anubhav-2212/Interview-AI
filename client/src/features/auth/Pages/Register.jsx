import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hooks.js";
import toast, { Toaster } from "react-hot-toast";

export default function InterviewAIRegister() {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ username, email, password });
      toast.success("Account created successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            Interview<span className="text-indigo-400">AI</span>
          </div>
          <div className="text-sm text-slate-300">Create Your Account</div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 py-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
            Get Started
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build Your <span className="text-indigo-400">Interview Edge</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Join InterviewAI to unlock personalized interview reports, mock
            sessions, resume analysis, and smart preparation plans for your
            dream role.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">Smart</div>
              <div className="text-xs text-slate-300">Reports</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">Live</div>
              <div className="text-xs text-slate-300">Mocks</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">Fast</div>
              <div className="text-xs text-slate-300">Growth</div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
          <div className="text-3xl font-semibold mb-2">Create Account</div>
          <p className="text-slate-300 mb-6">
            Start preparing smarter in minutes.
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-sm text-slate-300">UserName</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Your username"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {/* <label className="flex items-start gap-2 text-sm text-slate-300">
              <input type="checkbox" className="mt-1" /> I agree to the Terms &
              Privacy Policy
            </label> */}
            <button
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition py-4 font-semibold text-lg shadow-lg shadow-indigo-500/30"
            >
              Create Account
            </button>
            {/* <div className="grid grid-cols-2 gap-3">
              <button className="rounded-2xl bg-white/5 hover:bg-white/10 py-3">
                Google
              </button>
              <button className="rounded-2xl bg-white/5 hover:bg-white/10 py-3">
                GitHub
              </button>
            </div> */}
            <Link to="/login">  <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <span className="text-indigo-300 cursor-pointer">Login</span>
            </p></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
