// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Circular progress ring for a single score
function ScoreRing({ score, label, size = 64 }) {
  const r    = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const pct  = Math.min(100, Math.max(0, score ?? 0));
  const dash = (pct / 100) * circ;
  const color =
    pct >= 80 ? "#22c55e" :
    pct >= 60 ? "#eab308" :
    pct >= 40 ? "#f97316" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
          <circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
          {pct}
        </span>
      </div>
      <span className="text-[10px] text-gray-500 text-center leading-tight">{label}</span>
    </div>
  );
}

// Animated list item that fades in with a delay
function AnimatedItem({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

export default function AIReviewPanel({ review, score, status, onClose }) {
  if (!review && status !== "completed") return null;

  const isLoading = status === "ai_reviewing" || status === "pending" || status === "running";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5 py-10">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-xl">🤖</div>
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">AI is reviewing your code…</p>
          <p className="text-gray-400 text-sm mt-1">Llama 3.3-70B is analysing your submission.</p>
          <p className="text-gray-600 text-xs mt-3">This usually takes 10–20 seconds</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!review) return null;

  const overallScore = score ?? 0;
  const scoreColor =
    overallScore >= 80 ? "text-green-400" :
    overallScore >= 60 ? "text-yellow-400" :
    overallScore >= 40 ? "text-orange-400" : "text-red-400";

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* Header */}
      <AnimatedItem>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🤖</span>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Review Complete</span>
            </div>
            <h3 className="text-white font-black text-xl leading-tight">
              {review.summary || "Code review complete"}
            </h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors ml-4 shrink-0">✕</button>
          )}
        </div>
      </AnimatedItem>

      {/* Overall score + sub scores */}
      <AnimatedItem delay={100}>
        <div className="glass rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-4">

            {/* Big score */}
            <div className="flex flex-col items-center shrink-0">
              <span className={`text-5xl font-black ${scoreColor}`}>{overallScore}</span>
              <span className="text-[10px] text-gray-500 mt-0.5">/ 100</span>
            </div>

            <div className="w-px h-14 bg-white/10 shrink-0" />

            {/* Sub-score rings */}
            <div className="flex gap-4 flex-wrap">
              <ScoreRing score={review.codeQualityScore}  label="Code Quality"  size={52} />
              <ScoreRing score={review.readabilityScore}  label="Readability"   size={52} />
              <ScoreRing score={review.efficiencyScore}   label="Efficiency"    size={52} />
            </div>
          </div>
        </div>
      </AnimatedItem>

      {/* Feedback */}
      <AnimatedItem delay={200}>
        <div className="glass rounded-2xl p-5 border border-white/5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            💬 Overall Feedback
          </h4>
          <p className="text-gray-200 text-sm leading-relaxed">{review.feedback}</p>
        </div>
      </AnimatedItem>

      {/* 🤖 The Council of AI */}
      {review.council?.length > 0 && (
        <AnimatedItem delay={250}>
          <div className="glass rounded-2xl p-5 border border-purple-500/20">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">
              🏛️ The Council of AI
            </h4>
            <div className="flex flex-col gap-4">
              {review.council.map((c, i) => (
                <div key={i} className="flex gap-4 items-start bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="text-2xl shrink-0 mt-0.5">
                    {c.persona.includes('Speed') ? '⚡' : c.persona.includes('Guard') ? '🛡️' : '🎨'}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-200">{c.persona}</h5>
                    <p className="text-sm text-gray-400 leading-relaxed mt-1">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedItem>
      )}

      {/* Strengths + Suggestions side by side */}
      <div className="grid sm:grid-cols-2 gap-4">
        <AnimatedItem delay={300}>
          <div className="glass rounded-2xl p-5 border border-green-500/15 h-full">
            <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
              ✅ Strengths
            </h4>
            <ul className="space-y-2">
              {(review.strengths?.length ? review.strengths : ["–"]).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-500 mt-0.5 shrink-0">›</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedItem>

        <AnimatedItem delay={380}>
          <div className="glass rounded-2xl p-5 border border-blue-500/15 h-full">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
              🔧 Suggestions
            </h4>
            <ul className="space-y-2">
              {(review.improvements || review.suggestions || ["–"]).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-0.5 shrink-0 font-bold">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedItem>
      </div>

      {/* Weak areas */}
      {review.weakAreas?.length > 0 && (
        <AnimatedItem delay={460}>
          <div className="glass rounded-2xl p-5 border border-orange-500/15">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">
              ⚠️ Areas to Improve
            </h4>
            <div className="flex flex-wrap gap-2">
              {review.weakAreas.map((w, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </AnimatedItem>
      )}

      {/* Skills tested tags */}
      {review.skillsTested?.length > 0 && (
        <AnimatedItem delay={540}>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-600 self-center">Skills tested:</span>
            {review.skillsTested.map((s, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold">
                {s}
              </span>
            ))}
          </div>
        </AnimatedItem>
      )}
    </div>
  );
}
