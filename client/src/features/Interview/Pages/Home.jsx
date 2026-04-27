import React from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/auth.hooks.js";

export default function InterviewAIHome() {
  const { loading, generateReport } = useInterview();
  const { handleLogout } = useAuth();
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e) => {
    const resume = resumeInputRef.current.files[0];
    e.preventDefault();
    try {
      const data = await generateReport({ resume, selfDescription, jobDescription });
    //   console.log(data._id);
    //   console.log(data);

      toast.success("Report generated successfully!");
      navigate(`/interview/${data._id}`, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Report generation failed. Please try again.",
      );
    }
  };

    
  if(loading){
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-2xl font-semibold animate-pulse">Loading your interview plan...</h1>
      </main>
    )
  }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            Interview<span className="text-indigo-400">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {/* <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10">
              Dashboard
            </button> */}
            <button onClick={() => navigate("/reports")} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10">
              Reports
            </button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="p-6 md:p-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
              AI Powered Interview Prep
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Crack Interviews with{" "}
              <span className="text-indigo-400">Smart AI Coaching</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Upload your resume, paste a job description, tell us about
              yourself, and get tailored interview questions, skill-gap
              analysis, match score, and a personalized preparation roadmap.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="text-2xl font-bold">5x</div>
                <div className="text-xs text-slate-300">Faster Prep</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="text-2xl font-bold">AI</div>
                <div className="text-xs text-slate-300">Personalized</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-slate-300">Available</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Generate Your Interview Report
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-slate-300">
                  Upload Resume (PDF)
                </label>
                <input
                  ref={resumeInputRef}
                  type="file"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:px-4 file:py-2 file:text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  Self Description
                </label>
                <textarea
                  onChange={(e) => setSelfDescription(e.target.value)}
                  rows="4"
                  placeholder="Tell us about your skills, projects, strengths..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  Job Description
                </label>
                <textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows="6"
                  placeholder="Paste the company job description here..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition py-4 font-semibold text-lg shadow-lg shadow-indigo-500/30"
              >
                Generate Questions
              </button>
              <p className="text-xs text-slate-400 text-center">
                You will receive technical questions, HR questions, match score
                & prep plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
