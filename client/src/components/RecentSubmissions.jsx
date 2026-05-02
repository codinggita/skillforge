const STATUS_CONFIG = {
  completed:           { label: "Reviewed",    color: "text-green-400",  bg: "bg-green-500/10",  dot: "bg-green-400" },
  accepted:            { label: "Accepted",    color: "text-green-400",  bg: "bg-green-500/10",  dot: "bg-green-400" },
  pending:             { label: "Pending",     color: "text-yellow-400", bg: "bg-yellow-500/10", dot: "bg-yellow-400" },
  ai_reviewing:        { label: "AI Review…",  color: "text-blue-400",   bg: "bg-blue-500/10",   dot: "bg-blue-400" },
  wrong_answer:        { label: "Wrong Ans",   color: "text-red-400",    bg: "bg-red-500/10",    dot: "bg-red-400" },
  runtime_error:       { label: "Error",       color: "text-red-400",    bg: "bg-red-500/10",    dot: "bg-red-400" },
  time_limit_exceeded: { label: "TLE",         color: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-400" },
  partial:             { label: "Partial",     color: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-400" },
};

function ScoreRing({ score }) {
  const radius    = 18;
  const circ      = 2 * Math.PI * radius;
  const progress  = ((score ?? 0) / 100) * circ;
  const color     = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : score >= 40 ? "#f97316" : "#ef4444";

  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${progress} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
        {score ?? "–"}
      </span>
    </div>
  );
}

export default function RecentSubmissions({ submissions = [], loading }) {
  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 border border-white/5">
        <h3 className="text-white font-bold text-lg mb-4">Recent Submissions</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-white/5 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-white/5 rounded w-2/3" />
                <div className="h-2 bg-white/5 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold text-lg">Recent Submissions</h3>
        {submissions.length > 0 && (
          <span className="text-xs text-gray-500">{submissions.length} total</span>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500 text-sm">No submissions yet.</p>
          <p className="text-gray-600 text-xs mt-1">Pick a project and submit your first solution!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => {
            const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG.pending;
            return (
              <div
                key={s._id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors group"
              >
                <ScoreRing score={s.score} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate group-hover:text-blue-300 transition-colors">
                    {s.projectId?.title || "Unknown Project"}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
                      {s.language}
                    </span>
                    <span className="text-gray-700">·</span>
                    <span className="text-[10px] text-gray-500">
                      {formatDate(s.createdAt)}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg} shrink-0`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${s.status === "ai_reviewing" ? "animate-pulse" : ""}`} />
                  <span className={`text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffHrs = (now - d) / 1000 / 3600;
  if (diffHrs < 1)   return "Just now";
  if (diffHrs < 24)  return `${Math.floor(diffHrs)}h ago`;
  if (diffHrs < 168) return `${Math.floor(diffHrs / 24)}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
