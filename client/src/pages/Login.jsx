import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const P = "#7B6EF6",
  S2 = "#06D6A0",
  ERR = "#FF6B6B";
const BG = "#080810",
  SF1 = "#0E0E1C",
  SF2 = "#141428";
const TS = "#8B8BA8",
  TT = "#4A4A68",
  TP = "#F0F0FF";
const BD = "rgba(255,255,255,0.06)",
  BDS = "rgba(255,255,255,0.12)";

// Input field component with focus state management
const FormInput = ({ label, icon, type = "text", val, setVal, ph, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: TS,
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: TS,
          }}
        >
          {icon}
        </span>
        <input
          type={type}
          required
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={ph}
          style={{
            width: "100%",
            background: SF1,
            border: `1px solid ${error ? ERR : isFocused ? P : BD}`,
            borderRadius: 10,
            padding: "12px 16px 12px 42px",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 15,
            color: TP,
            outline: "none",
            transition: "border 0.2s",
          }}
        />
      </div>
    </div>
  );
};

export function AuthLeftPanel() {
  return (
    <div
      style={{
        width: "40%",
        height: "100vh",
        background: `radial-gradient(circle at bottom left, rgba(123,110,246,0.15) 0%, transparent 60%), ${SF1}`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 48,
        overflow: "hidden",
        borderRight: `1px solid ${BD}`,
      }}
    >
      {/* Top Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          marginBottom: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: P,
            fontSize: 28,
            filter: `drop-shadow(0 0 12px rgba(123,110,246,0.6))`,
          }}
        >
          ⚡
        </div>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: "-0.5px",
          }}
        >
          <span style={{ color: TP }}>Skill</span>
          <span
            style={{
              background: `linear-gradient(135deg,${P},${S2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Forge
          </span>
        </div>
      </Link>

      {/* Middle Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 40,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: TP,
            marginBottom: 16,
            maxWidth: 340,
          }}
        >
          Turn your code into a career.
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 16,
            color: TS,
            lineHeight: 1.6,
            marginBottom: 48,
          }}
        >
          Real projects. AI feedback. Measurable growth.
        </p>

        {/* Floating Cards */}
        <div style={{ position: "relative", height: 260 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: "rgba(14,14,28,0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(123,110,246,0.3)`,
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: `0 10px 30px rgba(0,0,0,0.5),0 0 20px rgba(123,110,246,0.1)`,
              transform: "rotate(-3deg)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 32,
                fontWeight: 800,
                color: TP,
              }}
            >
              2,400+
            </div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                color: TS,
              }}
            >
              Active Learners
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 80,
              left: 80,
              background: "rgba(14,14,28,0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(6,214,160,0.3)`,
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: `0 10px 30px rgba(0,0,0,0.5),0 0 20px rgba(6,214,160,0.1)`,
              transform: "rotate(2deg)",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 32,
                fontWeight: 800,
                color: TP,
              }}
            >
              86%
            </div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                color: TS,
              }}
            >
              Interview Success Rate
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 160,
              left: 20,
              background: "rgba(14,14,28,0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,179,71,0.3)`,
              borderRadius: 16,
              padding: "20px 24px",
              boxShadow: `0 10px 30px rgba(0,0,0,0.5),0 0 20px rgba(255,179,71,0.1)`,
              transform: "rotate(-1deg)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 32,
                fontWeight: 800,
                color: TP,
              }}
            >
              12
            </div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                color: TS,
              }}
            >
              Real Projects
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "auto" }} />

      {/* Background Decor */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          border: `1px dashed ${BD}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{
            width: "80%",
            height: "80%",
            position: "absolute",
            inset: 0,
            margin: "auto",
          }}
        >
          <polygon
            points="50,10 90,40 75,90 25,90 10,40"
            fill="rgba(123,110,246,0.1)"
            stroke={P}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Password123!");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back to SkillForge!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to login");
      const f = document.getElementById("login-form");
      if (f) {
        f.classList.remove("shake");
        void f.offsetWidth;
        f.classList.add("shake");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: BG,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <AuthLeftPanel />

      {/* Right Panel */}
      <div
        style={{
          width: "60%",
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: 40,
          overflowY: "auto",
        }}
      >
        {/* Top Right Link */}
        <div
          style={{
            textAlign: "right",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: TS,
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: P, fontWeight: 600, textDecoration: "none" }}
          >
            Sign up →
          </Link>
        </div>

        {/* Center Form */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "100%", maxWidth: 420 }}>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 36,
                fontWeight: 800,
                color: TP,
                marginBottom: 8,
                letterSpacing: "-1px",
              }}
            >
              Welcome back
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                color: TS,
                marginBottom: 32,
              }}
            >
              Pick up where you left off.
            </p>

            {/* Google Btn */}
            <button
              style={{
                width: "100%",
                height: 48,
                background: "white",
                borderRadius: 10,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#080810",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                margin: "32px 0",
              }}
            >
              <div style={{ flex: 1, height: 1, background: BD }} />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  color: TT,
                }}
              >
                or continue with email
              </span>
              <div style={{ flex: 1, height: 1, background: BD }} />
            </div>

            {/* Form */}
            <form
              id="login-form"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: TS,
                    marginBottom: 8,
                  }}
                >
                  Email address
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                      color: TS,
                    }}
                  >
                    ✉
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    style={{
                      width: "100%",
                      background: SF1,
                      border: `1px solid ${error ? ERR : BD}`,
                      borderRadius: 10,
                      padding: "12px 16px 12px 42px",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: TP,
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                    onFocus={(e) => !error && (e.target.style.borderColor = P)}
                    onBlur={(e) => !error && (e.target.style.borderColor = BD)}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: TS,
                    }}
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      color: P,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 16,
                      color: TS,
                    }}
                  >
                    🔒
                  </span>
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      background: SF1,
                      border: `1px solid ${error ? ERR : BD}`,
                      borderRadius: 10,
                      padding: "12px 42px",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: TP,
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                    onFocus={(e) => !error && (e.target.style.borderColor = P)}
                    onBlur={(e) => !error && (e.target.style.borderColor = BD)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      fontSize: 16,
                      color: TS,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {showPwd ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Error MSG */}
              {error && (
                <div
                  style={{
                    color: ERR,
                    fontSize: 13,
                    fontFamily: "'DM Sans',sans-serif",
                    marginTop: "-10px",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Remember */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: P,
                    cursor: "pointer",
                    background: SF1,
                    border: `1px solid ${BDS}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    color: TS,
                  }}
                >
                  Remember me for 30 days
                </span>
              </label>

              {/* Submit */}
              <button
                disabled={loading}
                type="submit"
                style={{
                  width: "100%",
                  height: 48,
                  marginTop: 12,
                  background: `linear-gradient(135deg,${P},${S2})`,
                  borderRadius: 10,
                  border: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: `0 0 20px rgba(123,110,246,0.3)`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "scale(1.01)";
                    e.currentTarget.style.boxShadow = `0 0 35px rgba(123,110,246,0.5)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = `0 0 20px rgba(123,110,246,0.3)`;
                  }
                }}
              >
                {loading ? "Logging in..." : "Log in to SkillForge"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.5s; }
      `}</style>
    </div>
  );
}
