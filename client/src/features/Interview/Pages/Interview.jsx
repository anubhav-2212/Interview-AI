import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center gap-4 cursor-pointer"
      >
        <div className="flex gap-3 items-start">
          <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full mt-1">
            Q{index + 1}
          </span>

          <p className="text-white font-medium">{item.question}</p>
        </div>

        <span className="text-slate-400 text-xl">
          {open ? "−" : "+"}
        </span>
      </div>

      {open && (
        <div className="mt-5 space-y-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-300 mb-1">
              Intent
            </p>
            <p className="text-slate-300">{item.intent}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-300 mb-1">
              Model Answer
            </p>
            <p className="text-slate-300">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
    <div className="flex items-center gap-3 mb-4">
      <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
        Day {day.day}
      </span>

      <h3 className="text-white font-semibold">{day.focus}</h3>
    </div>

    <ul className="space-y-2">
      {day.task.map((item, i) => (
        <li key={i} className="text-slate-300 flex gap-2">
          <span className="text-indigo-400">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");

  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-2xl font-semibold animate-pulse">
          Loading your interview plan...
        </h1>
      </main>
    );
  }

  const data = report?.data?.data || report?.data || report;

  const scoreColor =
    data.matchScore >= 80
      ? "text-emerald-400 border-emerald-400"
      : data.matchScore >= 60
      ? "text-yellow-400 border-yellow-400"
      : "text-red-400 border-red-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr_320px] gap-6">

        {/* Left Sidebar */}
        <aside className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl h-fit sticky top-6">
          <p className="text-sm uppercase tracking-wider text-slate-400 mb-4">
            Sections
          </p>

          <div className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition ${
                  activeNav === item.id
                    ? "bg-indigo-500 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
              
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-5">

          {activeNav === "technical" && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Technical Questions</h2>
                <span className="text-slate-400">
                  {data.technicalQuestions.length} Questions
                </span>
              </div>

              <div className="space-y-4">
                {data.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </>
          )}

          {activeNav === "behavioral" && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Behavioral Questions</h2>
                <span className="text-slate-400">
                  {data.behavioralQuestions.length} Questions
                </span>
              </div>

              <div className="space-y-4">
                {data.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </>
          )}

          {activeNav === "roadmap" && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Preparation Road Map</h2>
                <span className="text-slate-400">
                  {data.preparationPlan.length} Days
                </span>
              </div>

              <div className="space-y-4">
                {data.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          {/* Match Score */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-wider text-slate-400 mb-5">
              Match Score
            </p>

            <div
              className={`h-36 w-36 rounded-full border-8 mx-auto flex items-center justify-center text-3xl font-bold ${scoreColor}`}
            >
              {data.matchScore}%
            </div>

            <p className="text-center text-slate-400 mt-4">
              Strong fit for this role
            </p>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-wider text-slate-400 mb-4">
              Skill Gaps
            </p>

            <div className="flex flex-wrap gap-2">
              {data.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className="px-3 py-2 rounded-full text-sm bg-indigo-500/20 text-indigo-300 border border-indigo-400/20"
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;