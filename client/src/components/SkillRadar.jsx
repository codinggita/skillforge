import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TIER_COLORS = {
  bronze:   { from: "#cd7f32", to: "#a0522d" },
  silver:   { from: "#c0c0c0", to: "#909090" },
  gold:     { from: "#ffd700", to: "#b8860b" },
  platinum: { from: "#e5e4e2", to: "#a0b0c0" },
  diamond:  { from: "#60a5fa", to: "#a78bfa" },
};

// Custom tooltip for the radar chart
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { dimension, score, trend } = payload[0].payload;
  const trendIcon = { improving: "↑", declining: "↓", stable: "→", new: "✦" }[trend] ?? "→";
  const trendColor = { improving: "text-green-400", declining: "text-red-400", stable: "text-gray-400", new: "text-blue-400" }[trend] ?? "text-gray-400";

  return (
    <div className="glass rounded-xl px-4 py-3 border border-white/10 text-sm min-w-[140px]">
      <p className="text-white font-bold mb-1">{dimension}</p>
      <p className="text-blue-400 font-black text-xl">{score}<span className="text-xs text-gray-500 font-normal">/100</span></p>
      <p className={`text-xs mt-1 ${trendColor}`}>{trendIcon} {trend}</p>
    </div>
  );
}

export default function SkillRadar({ radarData = [], overallScore = 0, tier = "bronze" }) {
  const isEmpty = radarData.every((d) => d.score === 0);

  // Fill with placeholder data so radar shape is visible even on first load
  const chartData = radarData.map((d) => ({
    ...d,
    score: isEmpty ? 20 : d.score,
  }));

  return (
    <div className="glass rounded-2xl p-6 border border-white/5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">Skill Radar</h3>
          <p className="text-gray-500 text-xs mt-0.5">5-dimension performance overview</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-2xl font-black gradient-text">
            {overallScore}<span className="text-sm font-normal text-gray-500">/100</span>
          </div>
          <TierBadge tier={tier} />
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <defs>
              <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <PolarGrid
              stroke="rgba(255,255,255,0.06)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
              tickCount={6}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#radarFill)"
              dot={{ r: 4, fill: "#60a5fa", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension bars */}
      <div className="mt-4 space-y-2">
        {radarData.map((d) => (
          <div key={d.key} className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 w-28 shrink-0 truncate">{d.dimension}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${d.score}%`,
                  background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
                }}
              />
            </div>
            <span className="text-[10px] text-gray-400 w-6 text-right">{d.score}</span>
          </div>
        ))}
      </div>

      {isEmpty && (
        <p className="text-center text-xs text-gray-600 mt-3">
          Complete projects to populate your radar
        </p>
      )}
    </div>
  );
}

function TierBadge({ tier }) {
  const labels = { bronze: "🥉 Bronze", silver: "🥈 Silver", gold: "🥇 Gold", platinum: "💿 Platinum", diamond: "💎 Diamond" };
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300">
      {labels[tier] || tier}
    </span>
  );
}
