// import { useEffect, useState } from "react";
// import { useAuth } from "../../auth/hooks/auth.hooks.js";
// import { useInterview } from "../hooks/useInterview.js";

// export default function Reports() {
//   const { } = useAuth();  
//   const { getReports, allReports } = useInterview();

//   useEffect(() => {
//     getReports();
//   }, []);

//  return (
//     <div>RecentReports
//       {allReports?.map((report) => (
//         <div key={report._id}>
//           <h1>{report.title}</h1>
//         </div>
//       ))}
//     </div>
//  )}


import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";

export default function Reports() {
  const { getReports, allReports, loading } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Interview<span className="text-indigo-400">AI</span>
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Page */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Recent Reports</h1>
          <p className="text-slate-300 mt-2">
            View your previously generated AI interview reports.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-300 text-lg">
            Loading reports...
          </div>
        )}

        {/* Empty State */}
        {!loading && allReports?.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center">
            <h2 className="text-2xl font-semibold">No Reports Yet</h2>
            <p className="text-slate-300 mt-2">
              Generate your first interview report from homepage.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400"
            >
              Generate Report
            </button>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && allReports?.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allReports.map((report) => (
              <div
                key={report._id}
                className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:-translate-y-1 transition"
              >
                {/* Top */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {report.title}
                    </h2>

                    <p className="text-sm text-slate-300 mt-1">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-indigo-400 font-bold text-2xl">
                    {report.matchScore}%
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-5 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${report.matchScore}%` }}
                  />
                </div>

                {/* Skill Gaps */}
                <div className="mt-5">
                  <p className="text-sm text-slate-400 mb-2">
                    Skill Gaps
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {report.skillGaps?.slice(0, 3).map((gap, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 text-sm"
                      >
                        {gap.skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    navigate(`/interview/${report._id}`)
                  }
                  className="w-full mt-6 px-4 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}