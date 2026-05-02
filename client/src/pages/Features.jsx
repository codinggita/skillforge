import { Link } from "react-router-dom";


const P = "#7B6EF6",
  S2 = "#06D6A0",
  WARN = "#FFB347",
  INFO = "#4FC3F7";
const BG = "#080810",
  SF1 = "#0E0E1C",
  SF2 = "#141428";
const TS = "#8B8BA8",
  TT = "#4A4A68",
  TP = "#F0F0FF";
const BD = "rgba(255,255,255,0.06)";

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Powered Senior Dev",
    desc: "Get instant, pedagogical feedback. Our council of AI models reviews your logic, code efficiency, and structure without just giving you the answers.",
    color: P,
  },
  {
    icon: "💻",
    title: "In-Browser IDE",
    desc: "No environment setup needed. Write, compile, and execute code directly in our Monaco-powered editor with zero latency.",
    color: S2,
  },
  {
    icon: "🔥",
    title: "Heatmaps & Streaks",
    desc: "Build consistency. Track your daily coding activity with GitHub-style heatmaps and maintain your streak to unlock special multipliers.",
    color: WARN,
  },
  {
    icon: "📊",
    title: "Dimensional Skill Radar",
    desc: "Visualize your growth across 5 dimensions: Debugging, Problem Solving, Code Quality, Time Management, and Concepts.",
    color: INFO,
  },
  {
    icon: "🏆",
    title: "Leaderboard & Ranks",
    desc: "Compete with peers globally. Climb from Bronze to Grandmaster by completing challenges quickly and cleanly.",
    color: P,
  },
  {
    icon: "🛡️",
    title: "Real-world Architectures",
    desc: "Move beyond LeetCode. Build full-stack features like rate limiters, JWT middleware, and distributed caches.",
    color: S2,
  },
];

export default function Features() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        fontFamily: "'DM Sans', sans-serif",
        color: TP,
        overflowX: "hidden",
        paddingTop: 100,
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${P}20 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          right: -200,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${S2}15 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: `rgba(123,110,246,0.1)`,
                border: `1px solid rgba(123,110,246,0.3)`,
                color: P,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              The Arsenal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 56,
              fontWeight: 800,
              marginTop: 24,
              marginBottom: 16,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            Everything you need to{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${P}, ${S2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              master engineering.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 18,
              color: TS,
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            SkillForge bridges the gap between theoretical tutorials and
            real-world software engineering through an immersive, gamified
            ecosystem.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 32,
            marginBottom: 100,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              style={{
                background: SF1,
                border: `1px solid ${BD}`,
                borderRadius: 20,
                padding: 32,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${f.color}20`;
                e.currentTarget.style.borderColor = `${f.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = BD;
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 150,
                  height: 150,
                  background: `radial-gradient(circle at top right, ${f.color}15 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))`,
                  border: `1px solid ${BD}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  marginBottom: 24,
                  boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: TP,
                  marginBottom: 12,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 15, color: TS, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            borderTop: `1px solid ${BD}`,
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Ready to forge your skills?
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <Link
              to="/register"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                background: `linear-gradient(135deg, ${P}, ${S2})`,
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: `0 0 24px rgba(123,110,246,0.4)`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = `0 0 32px rgba(123,110,246,0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `0 0 24px rgba(123,110,246,0.4)`;
              }}
            >
              Start for Free
            </Link>
            <Link
              to="/pricing"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                background: "transparent",
                border: `1px solid ${BD}`,
                color: TP,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 15,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = SF2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
