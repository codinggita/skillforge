import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../context/AuthContext";

const P = "#7B6EF6",
  S2 = "#06D6A0",
  WARN = "#FFB347",
  ERR = "#FF6B6B",
  INFO = "#4FC3F7";
const BG = "#080810",
  SF1 = "#0E0E1C",
  SF2 = "#141428",
  DARK = "#0A0A18";
const TS = "#8B8BA8",
  TT = "#4A4A68",
  TP = "#F0F0FF";
const BD = "rgba(255,255,255,0.06)";

const NAV = [
  { lbl: "Dashboard", path: "/dashboard", ic: "🏠", count: null },
  { lbl: "Projects", path: "/projects", ic: "📋", count: "10" },
  { lbl: "My Submissions", path: "/submissions", ic: "📝", count: "24" },
  { lbl: "Skill Report", path: "/report", ic: "📊", count: null },
  { lbl: "Leaderboard", path: "/leaderboard", ic: "🏆", count: null },
  { lbl: "Settings", path: "/settings", ic: "⚙️", count: null },
];

const MOCK_RADAR = [
  { d: "Debugging", v: 72 },
  { d: "Problem Solving", v: 85 },
  { d: "Code Quality", v: 63 },
  { d: "Time Mgmt", v: 78 },
  { d: "Concepts", v: 90 },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [heatmapData, setHeatmapData] = React.useState(
    Array(14).fill(Array(7).fill(0)),
  );

  React.useEffect(() => {
    setHeatmapData(
      Array.from({ length: 14 }).map(() =>
        Array.from({ length: 7 }).map(() => {
          const r = Math.random();
          return r > 0.7 ? Math.ceil(r * 4) : 0;
        }),
      ),
    );
  }, []);

  const scoreColor = (v) => (v >= 9 ? S2 : v >= 7 ? P : v >= 5 ? WARN : ERR);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: 260,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "var(--bg-surface-1)",
          borderRight: `1px solid var(--border-subtle)`,
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
          padding: "32px 0"
        }}
      >
        {/* Logo */}
        <div style={{ padding: "0 24px", marginBottom: 40 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${P}, ${S2})`, display: "flex", alignItems: "center", justifyCenter: "center", color: "white", fontSize: 18, fontWeight: 800 }}>⚡</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: TP, letterSpacing: "-0.5px" }}>SkillForge</span>
          </Link>
        </div>

        {/* User Profile Summary */}
        <div style={{ padding: "0 24px", marginBottom: 32 }}>
          <div className="glass-panel" style={{ padding: 16, borderRadius: 16, border: `1px solid ${BD}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: P, display: "flex", alignItems: "center", justifyCenter: "center", fontWeight: 700 }}>{user?.name?.[0] || "A"}</div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: TP, whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{user?.name || "Arjun Pratap"}</div>
                <div style={{ fontSize: 11, color: TS }}>Level 12 • Pro</div>
              </div>
            </div>
            <div style={{ height: 4, background: BG, borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ width: "65%", height: "100%", background: P }} />
            </div>
            <div style={{ display: "flex", justifyCenter: "space-between", fontSize: 10, color: TT, fontWeight: 600 }}>
              <span>2,450 XP</span>
              <span>3,000 XP</span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "0 12px" }}>
          {NAV.map((n) => {
            const act = loc.pathname === n.path;
            return (
              <Link
                key={n.lbl}
                to={n.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  borderRadius: 10,
                  textDecoration: "none",
                  background: act ? "rgba(123,110,246,0.08)" : "transparent",
                  color: act ? TP : TS,
                  marginBottom: 4,
                  transition: "all 0.2s var(--ease-spring)",
                  border: `1px solid ${act ? "rgba(123,110,246,0.15)" : "transparent"}`
                }}
              >
                <span style={{ fontSize: 18, opacity: act ? 1 : 0.7 }}>{n.ic}</span>
                <span style={{ fontSize: 14, fontWeight: act ? 600 : 500, flex: 1 }}>{n.lbl}</span>
                {n.count && <span style={{ fontSize: 10, background: SF2, padding: "2px 6px", borderRadius: 4, color: TT }}>{n.count}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "0 16px" }}>
          <button onClick={logout} className="btn btn-ghost" style={{ width: "100%", justifyCenter: "flex-start", gap: 12, border: "none" }}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ marginLeft: 260, flex: 1, minWidth: 0 }}>
        <header style={{ height: 80, padding: "0 48px", display: "flex", alignItems: "center", justifyCenter: "space-between", position: "sticky", top: 0, zIndex: 40, background: "rgba(8,8,16,0.5)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BD}` }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Dashboard</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
             <div className="badge badge-primary">⚡ 12 Day Streak</div>
             <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${BD}`, display: "flex", alignItems: "center", justifyCenter: "center", cursor: "pointer" }}>🔔</div>
          </div>
        </header>

        <div style={{ padding: 48 }} className="animate-fade-in">
          {/* Hero Welcome */}
          <div style={{ marginBottom: 48 }}>
            <h1 className="text-h1" style={{ marginBottom: 8 }}>Welcome back, {user?.name?.split(" ")[0] || "Arjun"}</h1>
            <p className="text-body" style={{ color: TS }}>You've completed 2 projects this week. Keep the momentum going!</p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 48 }}>
            {[
              { l: "Global Rank", v: "#34", s: "Top 2%", c: P },
              { l: "Avg Score", v: "8.2", s: "+0.4", c: S2 },
              { l: "Projects", v: "12", s: "Completed", c: INFO },
              { l: "Skill Points", v: "2,450", s: "Total XP", c: WARN }
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: TS, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>{s.l}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: TP }}>{s.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: s.c }}>{s.s}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
            {/* Left Col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Activity Pulse */}
              <div className="card" style={{ padding: 32 }}>
                <div style={{ display: "flex", justifyCenter: "space-between", marginBottom: 24 }}>
                  <h3 className="text-h3">Activity Pulse</h3>
                  <Link to="/report" style={{ fontSize: 13, color: P, textDecoration: "none", fontWeight: 600 }}>Full Report →</Link>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {heatmapData.map((week, wi) => (
                    <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {week.map((day, di) => {
                        const colors = [SF2, `${P}33`, `${P}66`, `${P}99`, P];
                        return <div key={di} style={{ width: 14, height: 14, borderRadius: 3, background: colors[day], transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={e => e.currentTarget.style.transform = "none"} />;
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submissions */}
              <div className="card" style={{ padding: 32 }}>
                <h3 className="text-h3" style={{ marginBottom: 24 }}>Recent Submissions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { n: "REST API Design", l: "JS", s: 8.4, t: "2h ago" },
                    { n: "Auth Middleware", l: "TS", s: 9.1, t: "1d ago" },
                    { n: "Data Models", l: "Py", s: 7.2, t: "3d ago" }
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${BD}` }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: scoreColor(s.s) }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{s.n}</div>
                        <div style={{ fontSize: 11, color: TT }}>{s.l} • {s.t}</div>
                      </div>
                      <div style={{ fontWeight: 700, color: scoreColor(s.s) }}>{s.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Radar */}
              <div className="card" style={{ padding: 32 }}>
                <h3 className="text-h3" style={{ marginBottom: 24 }}>Skill Profile</h3>
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_RADAR}>
                      <PolarGrid stroke={BD} />
                      <PolarAngleAxis dataKey="d" tick={{ fill: TS, fontSize: 10 }} />
                      <Radar dataKey="v" stroke={P} fill={P} fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recommendations */}
              <div className="card" style={{ padding: 32, background: `linear-gradient(135deg, ${SF1}, ${BG})` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ fontSize: 24 }}>🚀</div>
                  <h3 className="text-h3">Next Challenge</h3>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Real-time Chat App</div>
                  <p style={{ fontSize: 13, color: TS, lineHeight: 1.6 }}>Master WebSockets and state management by building a high-performance chat interface.</p>
                </div>
                <Link to="/projects" className="btn btn-primary" style={{ width: "100%" }}>Start Project</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
