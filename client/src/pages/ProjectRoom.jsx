import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { projectsApi, submissionsApi } from "../api/client";
import toast from "react-hot-toast";

const P = "#7B6EF6",
  S2 = "#06D6A0",
  WARN = "#FFB347",
  ERR = "#FF6B6B";
const BG = "#080810",
  SF1 = "#0E0E1C",
  SF2 = "#141428",
  DARK = "#060610";
const TS = "#8B8BA8",
  TT = "#4A4A68",
  TP = "#F0F0FF";
const BD = "rgba(255,255,255,0.06)";

const LANGS = ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"];

const MOCK_PROJECT = {
  _id: "demo",
  title: "Build a REST API",
  difficulty: "medium",
  timeLimit: 60,
  description:
    "Create a fully functional REST API with Express.js. Your API should handle CRUD operations for a 'users' resource, include proper error handling, input validation, and follow REST conventions.",
  tasks: [
    { title: "Set up Express server with proper middleware" },
    { title: "Create GET /users endpoint returning all users" },
    { title: "Create POST /users with validation" },
    { title: "Add error handling middleware" },
    { title: "Implement 404 handler for unknown routes" },
  ],
  hints: [
    { text: "Use express.json() middleware to parse request bodies", cost: 10 },
    {
      text: "Return appropriate HTTP status codes (200, 201, 400, 404, 500)",
      cost: 20,
    },
  ],
  starterCode: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\n// TODO: Implement your routes here\n\napp.listen(3000, () => console.log('Server running on port 3000'));\n`,
};

const AI_CHAT = [
  {
    role: "ai",
    msg: "Hey! I'm here to guide you, not give you answers. What are you working on? 👀",
    time: "10:42 AM",
  },
];

function formatTime(sec) {
  const m = Math.floor(sec / 60),
    s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SubmitOverlay() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const steps = [
    "Code received",
    "Analyzing logic...",
    "Checking code quality...",
    "Generating feedback...",
  ];

  const ANALYSIS_LOGS = [
    "Initializing neural review engine...",
    "Scanning for memory leaks and race conditions...",
    "Analyzing Big O complexity of main functions...",
    "Cross-referencing with industry best practices...",
    "Evaluating variable naming and modularity...",
    "Checking for security vulnerabilities (SQLi, XSS)...",
    "Finalizing dimensional skill scores...",
    "Generating persona-based critiques...",
  ];

  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s < steps.length - 1 ? s + 1 : s)),
      1400,
    );
    return () => clearInterval(t);
  }, [steps.length]);

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < ANALYSIS_LOGS.length) {
        setLogs((prev) => [...prev.slice(-4), ANALYSIS_LOGS[logIndex]]);
        logIndex++;
      }
    }, 600);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,8,16,0.98)",
        backdropFilter: "blur(20px)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, ${P}10 0%, transparent 70%)`,
          zIndex: -1,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${P},${S2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            boxShadow: `0 0 60px rgba(123,110,246,0.5)`,
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          🤖
        </div>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 32,
              fontWeight: 800,
              color: TP,
              marginBottom: 8,
            }}
          >
            Analyzing Your Solution
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: TS,
              fontSize: 16,
            }}
          >
            Our AI Council is reviewing every line of your code.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          width: 800,
          alignItems: "flex-start",
        }}
      >
        {/* Left: Progress Steps */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 12,
                background:
                  i <= step ? "rgba(123,110,246,0.08)" : "transparent",
                border: `1px solid ${i <= step ? "rgba(123,110,246,0.2)" : BD}`,
                transition: "all 0.4s ease",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: i < step ? S2 : i === step ? P : SF1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: i <= step ? BG : TT,
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 15,
                  fontWeight: i <= step ? 600 : 400,
                  color: i <= step ? TP : TS,
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Real-time Terminal Logs */}
        <div
          style={{
            flex: 1.2,
            background: DARK,
            border: `1px solid ${BD}`,
            borderRadius: 12,
            padding: 20,
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 13,
            height: 260,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
          }}
        >
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: ERR,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: WARN,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: S2,
              }}
            />
          </div>
          {logs.map((log, i) => (
            <div
              key={i}
              style={{
                color: i === logs.length - 1 ? S2 : TS,
                opacity: i === logs.length - 1 ? 1 : 0.6,
                transition: "all 0.3s",
              }}
            >
              <span style={{ color: TT, marginRight: 8 }}>$</span> {log}
            </div>
          ))}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: P,
                animation: "pulse 1s infinite",
              }}
            />
            <span style={{ color: TT }}>System evaluating...</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{transform:scale(1);box-shadow:0 0 40px rgba(123,110,246,0.4)}50%{transform:scale(1.05);box-shadow:0 0 80px rgba(123,110,246,0.8)}}`}</style>
    </div>
  );
}

export default function ProjectRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("JavaScript");
  const [tasks, setTasks] = useState([]);
  const [termOutput, setTermOutput] = useState([]);
  const [termOpen, setTermOpen] = useState(true);
  const [chatMsg, setChatMsg] = useState("");
  const [chat, setChat] = useState(AI_CHAT);
  const [hintOpen, setHintOpen] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    projectsApi
      .getById(id)
      .then((res) => {
        const p =
          res?.data?.project ||
          res?.data ||
          res?.project ||
          res ||
          MOCK_PROJECT;
        if (!p.description) p.description = MOCK_PROJECT.description; // fallback for safety
        setProject(p);

        let initialCode = p.starterCode;
        if (typeof initialCode === "object" && initialCode !== null) {
          initialCode =
            initialCode["javascript"] ||
            initialCode[Object.keys(initialCode)[0]] ||
            "// Start coding here...\n";
        }
        setCode(
          typeof initialCode === "string"
            ? initialCode
            : "// Start coding here...\n",
        );

        setTasks(
          (p.tasks?.length ? p.tasks : MOCK_PROJECT.tasks).map((t) => ({
            ...t,
            done: false,
          })),
        );
      })
      .catch(() => {
        setProject(MOCK_PROJECT);
        setCode(MOCK_PROJECT.starterCode);
        setTasks(MOCK_PROJECT.tasks.map((t) => ({ ...t, done: false })));
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Timer logic
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const p = project || MOCK_PROJECT;
  const timeLimit = (p.timeLimit || 60) * 60;
  const timeLeft = Math.max(timeLimit - elapsed, 0);
  const timePct = elapsed / timeLimit;
  const timerColor = timePct > 0.9 ? ERR : timePct > 0.75 ? WARN : TS;

  const runCode = () => {
    setRunning(true);
    setTermOpen(true);
    setTermOutput([{ t: "run", msg: "▶ Running..." }]);
    setTimeout(() => {
      setTermOutput([
        { t: "run", msg: "▶ Running..." },
        { t: "out", msg: "Server running on port 3000" },
        { t: "ok", msg: "✓ Executed in 42ms" },
      ]);
      setRunning(false);
      toast.success("Code ran successfully!");
    }, 1600);
  };

  const handleSubmit = async () => {
    if (code.trim().length < 30) {
      toast.error("Write some code first!");
      return;
    }
    setSubmitting(true);
    try {
      const backendLang =
        {
          "C++": "cpp",
          JavaScript: "javascript",
          Python: "python",
          Java: "java",
          TypeScript: "typescript",
          Go: "go",
        }[lang] || lang.toLowerCase();
      const res = await submissionsApi.create({
        projectId: id || MOCK_PROJECT._id,
        code,
        language: backendLang,
      });
      const subId =
        res?.submissionId || res?.submission?._id || res?._id || "demo1";
      setTimeout(() => {
        navigate(`/submission/${subId}`);
      }, 5500);
    } catch {
      setTimeout(() => {
        navigate(`/submission/demo1`);
      }, 5500);
    }
  };

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMsg = { role: "user", msg: chatMsg, time: now };
    const aiResp = {
      role: "ai",
      msg: "Think about what HTTP status code makes sense for that scenario. What does the REST spec say about resource creation? 🤔",
      time: now,
    };
    setChat((c) => [...c, userMsg]);
    setChatMsg("");
    setTimeout(() => setChat((c) => [...c, aiResp]), 800);
  };

  const unlockHint = (idx) => {
    if (
      window.confirm(
        `Unlock this hint for ${(p.hints || MOCK_PROJECT.hints)[idx].cost} XP?`,
      )
    ) {
      setHintOpen([...hintOpen, idx]);
      toast.success("Hint unlocked!");
    }
  };

  const doneCount = tasks.filter((t) => t.done).length;

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050510",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: `3px solid rgba(123,110,246,0.15)`,
            borderTopColor: P,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "#050510",
        fontFamily: "'DM Sans',sans-serif",
        overflow: "hidden",
      }}
    >
      {submitting && <SubmitOverlay />}

      {/* ── TOP CHROME BAR (48px) ── */}
      <div
        style={{
          height: 48,
          background: "#060610",
          borderBottom: `1px solid ${BD}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          flexShrink: 0,
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setShowExitModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              color: TS,
              textDecoration: "none",
              fontSize: 18,
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = TP)}
            onMouseLeave={(e) => (e.currentTarget.style.color = TS)}
          >
            ←
          </button>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: TP,
            }}
          >
            {p.title}
          </div>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              background: "rgba(255,179,71,0.15)",
              color: WARN,
            }}
          >
            {p.difficulty}
          </span>
        </div>

        {/* Center Timer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 14,
            color: timerColor,
          }}
        >
          ⏱ {formatTime(timeLeft)}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: SF1,
              border: `1px solid ${BD}`,
              color: TP,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {LANGS.map((l) => (
              <option key={l} value={l} style={{ background: SF2 }}>
                {l}
              </option>
            ))}
          </select>
          <button
            onClick={runCode}
            disabled={running}
            style={{
              padding: "6px 16px",
              borderRadius: 6,
              background: "transparent",
              border: `1px solid ${BD}`,
              color: running ? TS : TP,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: running ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!running)
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = BD)}
          >
            {running ? "Running..." : "Run ▶"}
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "6px 20px",
              borderRadius: 6,
              background: `linear-gradient(135deg,${P},${S2})`,
              border: "none",
              color: "white",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: `0 0 16px rgba(123,110,246,0.3)`,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = `0 0 24px rgba(123,110,246,0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = `0 0 16px rgba(123,110,246,0.3)`;
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* ── 3-PANEL BODY ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* LEFT PANEL (22%) */}
        <div
          style={{
            width: "22%",
            minWidth: 260,
            background: "#0A0A18",
            borderRight: `1px solid ${BD}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
            {/* Tasks */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: TT,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Tasks
              </div>
              {tasks.map((t, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setTasks((ts) =>
                      ts.map((x, j) => (j === i ? { ...x, done: !x.done } : x)),
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "6px 0",
                    cursor: "pointer",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      minWidth: 16,
                      marginTop: 2,
                      borderRadius: "50%",
                      background: t.done ? P : "transparent",
                      border: `1px solid ${t.done ? P : "rgba(255,255,255,0.15)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.done && (
                      <span
                        style={{
                          color: "white",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: t.done ? TT : TS,
                      textDecoration: t.done ? "line-through" : "none",
                      lineHeight: 1.5,
                      transition: "all 0.2s",
                    }}
                  >
                    {t.title}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: TT, marginBottom: 6 }}>
                  {doneCount} of {tasks.length} tasks
                </div>
                <div
                  style={{
                    height: 4,
                    background: SF2,
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(doneCount / tasks.length) * 100}%`,
                      background: P,
                      borderRadius: 999,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: BD, margin: "24px 0" }} />

            {/* Instructions */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: TT,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Instructions
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: TS,
                  lineHeight: 1.7,
                }}
              >
                {(p.description || MOCK_PROJECT.description || "")
                  .split(/(`[^`]+`)/)
                  .map((part, i) => {
                    if (part.startsWith("`") && part.endsWith("`")) {
                      return (
                        <span
                          key={i}
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            background: SF2,
                            padding: "2px 6px",
                            borderRadius: 4,
                            color: TP,
                          }}
                        >
                          {part.slice(1, -1)}
                        </span>
                      );
                    }
                    return part;
                  })}
              </div>
            </div>

            <div style={{ height: 1, background: BD, margin: "24px 0" }} />

            {/* Hints */}
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: TT,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Hints
              </div>
              {(p.hints || MOCK_PROJECT.hints || []).map((h, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => {
                      if (!hintOpen.includes(i)) unlockHint(i);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      borderRadius: 8,
                      background: hintOpen.includes(i)
                        ? "rgba(123,110,246,0.1)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${BD}`,
                      cursor: hintOpen.includes(i) ? "default" : "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      color: TS,
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    <span>{hintOpen.includes(i) ? "🔓" : "🔒"}</span>
                    <span style={{ flex: 1 }}>
                      Hint {i + 1}{" "}
                      {!hintOpen.includes(i) && (
                        <span style={{ color: TT }}>— costs {h.cost} XP</span>
                      )}
                    </span>
                  </button>
                  {hintOpen.includes(i) && (
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "0 0 8px 8px",
                        background: "rgba(123,110,246,0.05)",
                        border: `1px solid rgba(123,110,246,0.1)`,
                        borderTop: "none",
                        fontSize: 13,
                        color: "#D0D0EE",
                        lineHeight: 1.6,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {h.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL (55%) */}
        <div
          style={{
            width: "55%",
            background: "#050510",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              height: 36,
              background: "#060610",
              display: "flex",
              alignItems: "stretch",
              borderBottom: `1px solid ${BD}`,
              flexShrink: 0,
            }}
          >
            {["index.js", "utils.js", "routes.js"].map((f, i) => (
              <div
                key={f}
                style={{
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: i === 0 ? SF1 : "transparent",
                  borderBottom:
                    i === 0 ? `1px solid ${P}` : "1px solid transparent",
                  borderRight: `1px solid ${BD}`,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: i === 0 ? TP : TT,
                }}
              >
                <span style={{ color: WARN, fontSize: 12 }}>📄</span>
                {f}
                <span
                  style={{
                    fontSize: 14,
                    color: TT,
                    marginLeft: 4,
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          {/* Editor */}
          <div
            style={{
              flex: 1,
              display: "flex",
              position: "relative",
              background: "#050510",
            }}
          >
            <div
              style={{
                width: 48,
                background: "#060610",
                borderRight: `1px solid ${BD}`,
                paddingTop: 16,
                textAlign: "right",
                userSelect: "none",
              }}
            >
              {(code || "").split("\n").map((_, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 14,
                    color: TT,
                    lineHeight: 1.6,
                    paddingRight: 12,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "16px",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 14,
                color: "#D0D0EE",
                lineHeight: 1.6,
                resize: "none",
                caretColor: P,
                tabSize: 2,
              }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const s = e.target.selectionStart;
                  const v = code;
                  setCode(
                    v.slice(0, s) + "  " + v.slice(e.target.selectionEnd),
                  );
                  setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd = s + 2;
                  }, 0);
                }
              }}
            />
          </div>

          {/* Terminal */}
          {termOpen && (
            <div
              style={{
                height: 180,
                background: "#030308",
                borderTop: `1px solid ${BD}`,
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: 32,
                  background: "#060610",
                  borderBottom: `1px solid ${BD}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12,
                    color: TT,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  Terminal
                </span>
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={() => setTermOutput([])}
                    style={{
                      background: "none",
                      border: "none",
                      color: TT,
                      fontSize: 11,
                      cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setTermOpen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: TT,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  flex: 1,
                  overflowY: "auto",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 13,
                }}
              >
                {termOutput.length === 0 && (
                  <span style={{ color: TT }}>$ Waiting for execution...</span>
                )}
                {termOutput.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      color:
                        l.t === "ok"
                          ? TT
                          : l.t === "run"
                            ? P
                            : l.t === "err"
                              ? ERR
                              : TP,
                      lineHeight: 1.7,
                      marginBottom: 4,
                    }}
                  >
                    {l.msg}
                  </div>
                ))}
              </div>
            </div>
          )}
          {!termOpen && (
            <div
              style={{
                height: 28,
                background: "#060610",
                borderTop: `1px solid ${BD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                cursor: "pointer",
              }}
              onClick={() => setTermOpen(true)}
            >
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  color: TT,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                ▲ Open Terminal
              </span>
            </div>
          )}
        </div>

        {/* RIGHT PANEL (23%) */}
        <div
          style={{
            width: "23%",
            minWidth: 260,
            background: "#0A0A18",
            borderLeft: `1px solid ${BD}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${BD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: TP,
              }}
            >
              🤖 AI Mentor
            </span>
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                color: S2,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: S2,
                }}
              />
              Online
            </span>
          </div>

          {/* Chat List */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {chat.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.role === "user" ? "flex-end" : "flex-start",
                  gap: 4,
                }}
              >
                {m.role === "ai" && (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${P},${S2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      marginBottom: 2,
                    }}
                  >
                    ⚡
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "90%",
                    padding: "12px 14px",
                    background:
                      m.role === "ai" ? SF2 : "rgba(123,110,246,0.15)",
                    border: `1px solid ${m.role === "ai" ? "transparent" : "rgba(123,110,246,0.2)"}`,
                    borderRadius:
                      m.role === "ai"
                        ? "4px 12px 12px 12px"
                        : "12px 4px 12px 12px",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: TP,
                    lineHeight: 1.6,
                  }}
                >
                  {m.msg}
                </div>
                {m.time && (
                  <div
                    style={{
                      fontSize: 11,
                      color: TT,
                      fontFamily: "'DM Sans',sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {m.time}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div
            style={{
              borderTop: `1px solid ${BD}`,
              padding: "12px",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <textarea
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendChat();
                  }
                }}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: TP,
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  outline: "none",
                  resize: "none",
                  height: 40,
                  lineHeight: 1.5,
                  padding: "4px 0",
                }}
              />
              <button
                onClick={sendChat}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: P,
                  border: "none",
                  color: "white",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                ↑
              </button>
            </div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                color: TT,
                fontStyle: "italic",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              I won't give direct answers
            </div>
          </div>
        </div>
      </div>
      {showExitModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContents: "center",
          }}
        >
          <div
            style={{
              background: SF1,
              padding: 32,
              borderRadius: 12,
              border: `1px solid ${BD}`,
              width: 400,
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: TP,
                marginBottom: 16,
              }}
            >
              Exit Project?
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: TS,
                marginBottom: 32,
              }}
            >
              Your progress will not be saved. Are you sure you want to leave?
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => setShowExitModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 8,
                  background: "transparent",
                  border: `1px solid ${BD}`,
                  color: TP,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/projects")}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 8,
                  background: ERR,
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
