import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/auth.hooks.js";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export default function InterviewAILogin() {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      toast.success("Logged in successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            Interview<span className="text-indigo-400">AI</span>
          </div>
          <div className="text-sm text-slate-300">
            AI Powered Interview Prep
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 py-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
            Welcome Back
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Login to Continue Your{" "}
            <span className="text-indigo-400">Interview Journey</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Access personalized reports, AI mock interviews, skill-gap analysis,
            and preparation plans tailored to your dream job.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-slate-300">Questions</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-xs text-slate-300">Insights</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs text-slate-300">Coaching</div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
          <div className="text-3xl font-semibold mb-2">Sign In</div>
          <p className="text-slate-300 mb-6">
            Enter your credentials to access your dashboard.
          </p>
          <div className="space-y-5">
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
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <button className="text-indigo-300 hover:text-indigo-200">
                Forgot Password?
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition py-4 font-semibold text-lg shadow-lg shadow-indigo-500/30"
            >
              Login
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-2xl bg-white/5 hover:bg-white/10 py-3">
                Google
              </button>
              <button className="rounded-2xl bg-white/5 hover:bg-white/10 py-3">
                GitHub
              </button>
            </div>
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <span className="text-indigo-300 cursor-pointer">Create one</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
