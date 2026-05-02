import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const P = "#7B6EF6",
  S2 = "#06D6A0",
  WARN = "#FFB347",
  ERR = "#FF6B6B";
const BG = "#080810",
  SF1 = "#0E0E1C",
  SF2 = "#141428";
const TS = "#8B8BA8",
  TT = "#4A4A68",
  TP = "#F0F0FF";
const BD = "rgba(255,255,255,0.06)",
  BDS = "rgba(255,255,255,0.12)";

// Move InputField outside to prevent recreation on each render
const InputField = ({ label, icon, type = "text", val, setVal, ph }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
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
            border: `1px solid ${isFocused ? P : BD}`,
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

function AuthLeftPanel() {
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

const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "React",
  "Node.js",
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [college, setCollege] = useState("");
  const [gradYear, setGradYear] = useState("2026");
  const [selSkills, setSelSkills] = useState([]);
  const [agree, setAgree] = useState(false);

  // pwd strength
  let str = 0,
    strCol = ERR,
    strLabel = "Weak";
  if (pwd.length > 5) str = 1;
  if (pwd.length > 7 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
    str = 2;
    strCol = WARN;
    strLabel = "Fair";
  }
  if (
    pwd.length > 9 &&
    /[A-Z]/.test(pwd) &&
    /[0-9]/.test(pwd) &&
    /[^A-Za-z0-9]/.test(pwd)
  ) {
    str = 3;
    strCol = S2;
    strLabel = "Strong";
  }

  const nextStep = () => {
    if (step === 1) {
      if (!name || !email || !pwd) {
        toast.error("Please fill all fields");
        return;
      }
      if (pwd !== pwd2) {
        toast.error("Passwords do not match");
        return;
      }
    }
    if (step === 2) {
      if (!college) {
        toast.error("Please enter your college");
        return;
      }
      if (selSkills.length === 0) {
        toast.error("Select at least one skill");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!agree) {
      toast.error("Please agree to the Terms of Service");
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password: pwd, college });
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (e) {
      // Show detailed validation errors if available
      if (e.errors && Array.isArray(e.errors)) {
        e.errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(e.message || "Registration failed");
      }
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
          padding: "40px 60px",
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: P, fontWeight: 600, textDecoration: "none" }}
          >
            Log in →
          </Link>
        </div>

        {/* Form Container */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 460,
            margin: "0 auto",
            width: "100%",
          }}
        >
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
            Create your account
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: TS,
              marginBottom: 32,
            }}
          >
            Start your journey to becoming industry-ready.
          </p>

          {/* Progress Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 40,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 2,
                background: BD,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 2,
                background: P,
                zIndex: 0,
                transition: "width 0.3s",
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
            />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: i < step ? S2 : i === step ? P : BG,
                  border: `2px solid ${i <= step ? "transparent" : BD}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: i === step ? `0 0 16px ${P}66` : "none",
                  transition: "all 0.3s",
                }}
              >
                {i < step ? "✓" : i}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ animation: "fadeUp 0.3s ease forwards" }}>
              <InputField
                label="Full Name"
                icon="👤"
                val={name}
                setVal={setName}
                ph="John Doe"
              />
              <InputField
                label="Email Address"
                icon="✉"
                type="email"
                val={email}
                setVal={setEmail}
                ph="john@university.edu"
              />

              <div style={{ marginBottom: 16 }}>
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
                  Password
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
                    🔒
                  </span>
                  <input
                    type="password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      background: SF1,
                      border: `1px solid ${BD}`,
                      borderRadius: 10,
                      padding: "12px 16px 12px 42px",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      color: TP,
                      outline: "none",
                      transition: "border 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = P)}
                    onBlur={(e) => (e.target.style.borderColor = BD)}
                  />
                </div>
                {/* Strength Meter */}
                {pwd.length > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{ flex: 1, display: "flex", gap: 4, height: 4 }}
                    >
                      <div
                        style={{
                          flex: 1,
                          background: str >= 1 ? strCol : BD,
                          borderRadius: 2,
                          transition: "background 0.3s",
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          background: str >= 2 ? strCol : BD,
                          borderRadius: 2,
                          transition: "background 0.3s",
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          background: str >= 3 ? strCol : BD,
                          borderRadius: 2,
                          transition: "background 0.3s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: strCol,
                        width: 40,
                      }}
                    >
                      {strLabel}
                    </span>
                  </div>
                )}

                {/* Password Requirements */}
                {pwd.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: 12,
                      background: `rgba(123,110,246,0.08)`,
                      border: `1px solid rgba(123,110,246,0.2)`,
                      borderRadius: 8,
                      fontSize: 12,
                      color: TS,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ color: pwd.length >= 6 ? S2 : ERR }}>
                        {pwd.length >= 6 ? "✓" : "✗"}
                      </span>
                      At least 6 characters
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ color: /[A-Z]/.test(pwd) ? S2 : ERR }}>
                        {/[A-Z]/.test(pwd) ? "✓" : "✗"}
                      </span>
                      One uppercase letter
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: /[0-9]/.test(pwd) ? S2 : ERR }}>
                        {/[0-9]/.test(pwd) ? "✓" : "✗"}
                      </span>
                      One number
                    </div>
                  </div>
                )}
              </div>

              <InputField
                label="Confirm Password"
                icon="🔒"
                type="password"
                val={pwd2}
                setVal={setPwd2}
                ph="••••••••"
              />

              <button
                onClick={nextStep}
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
                  cursor: "pointer",
                  boxShadow: `0 0 20px rgba(123,110,246,0.3)`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                  e.currentTarget.style.boxShadow = `0 0 35px rgba(123,110,246,0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = `0 0 20px rgba(123,110,246,0.3)`;
                }}
              >
                Next Step →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ animation: "fadeUp 0.3s ease forwards" }}>
              <InputField
                label="College / University"
                icon="🏛"
                val={college}
                setVal={setCollege}
                ph="e.g. Stanford University"
              />

              <div style={{ marginBottom: 16 }}>
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
                  Graduation Year
                </label>
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  style={{
                    width: "100%",
                    background: SF1,
                    border: `1px solid ${BD}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: TP,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {["2024", "2025", "2026", "2027", "2028"].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 32 }}>
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
                  Primary Skills
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SKILLS.map((sk) => {
                    const sel = selSkills.includes(sk);
                    return (
                      <button
                        key={sk}
                        onClick={() => {
                          setSelSkills((ss) =>
                            sel ? ss.filter((x) => x !== sk) : [...ss, sk],
                          );
                        }}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 20,
                          border: `1px solid ${sel ? P : BD}`,
                          background: sel ? "rgba(123,110,246,0.15)" : SF1,
                          color: sel ? P : TS,
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {sk}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    height: 48,
                    background: "transparent",
                    border: `1px solid ${BD}`,
                    borderRadius: 10,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: TP,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = SF2)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  style={{
                    flex: 2,
                    height: 48,
                    background: `linear-gradient(135deg,${P},${S2})`,
                    borderRadius: 10,
                    border: "none",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "white",
                    cursor: "pointer",
                    boxShadow: `0 0 20px rgba(123,110,246,0.3)`,
                  }}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div
              style={{
                animation: "fadeUp 0.3s ease forwards",
                position: "relative",
              }}
            >
              {success && (
                <div
                  style={{
                    position: "absolute",
                    inset: -100,
                    pointerEvents: "none",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 60,
                      animation: "confetti 2s ease-out forwards",
                    }}
                  >
                    🎉
                  </div>
                </div>
              )}

              <div
                style={{
                  background: SF1,
                  border: `1px solid ${BD}`,
                  borderRadius: 14,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <h4
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: TP,
                    marginBottom: 16,
                    borderBottom: `1px solid ${BD}`,
                    paddingBottom: 8,
                  }}
                >
                  Profile Summary
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    fontSize: 14,
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: TS }}>Name</span>
                    <span style={{ color: TP, fontWeight: 500 }}>{name}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: TS }}>Email</span>
                    <span style={{ color: TP, fontWeight: 500 }}>{email}</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: TS }}>College</span>
                    <span style={{ color: TP, fontWeight: 500 }}>
                      {college} '{gradYear.slice(-2)}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: TS }}>Skills</span>
                    <span style={{ color: P, fontWeight: 500 }}>
                      {selSkills.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  cursor: "pointer",
                  marginBottom: 32,
                }}
              >
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  style={{
                    width: 18,
                    height: 18,
                    marginTop: 2,
                    accentColor: P,
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 13,
                    color: TS,
                    lineHeight: 1.5,
                  }}
                >
                  I agree to the{" "}
                  <a href="#" style={{ color: P, textDecoration: "none" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ color: P, textDecoration: "none" }}>
                    Privacy Policy
                  </a>
                  , and I confirm that I am creating this account to build real
                  skills.
                </span>
              </label>

              <div style={{ display: "flex", gap: 16 }}>
                <button
                  disabled={loading}
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1,
                    height: 48,
                    background: "transparent",
                    border: `1px solid ${BD}`,
                    borderRadius: 10,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: TP,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = SF2)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  ← Edit
                </button>
                <button
                  disabled={loading}
                  onClick={submit}
                  style={{
                    flex: 2,
                    height: 48,
                    background: `linear-gradient(135deg,${P},${S2})`,
                    borderRadius: 10,
                    border: "none",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: `0 0 24px rgba(123,110,246,0.4)`,
                  }}
                >
                  {loading ? "Creating..." : "Create My Account"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes confetti{0%{transform:translateY(100px) scale(0);opacity:1}50%{transform:translateY(-50px) scale(1.5)}100%{transform:translateY(0) scale(1);opacity:0}}
      `}</style>
    </div>
  );
}
