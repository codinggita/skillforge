import { Link } from "react-router-dom";


const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347";
const BG="#080810",SF1="#0E0E1C",SF2="#141428";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)";

const TIERS = [
  {
    name: "Hobbyist",
    price: "0",
    desc: "Perfect for beginners exploring real-world coding.",
    color: TS,
    features: [
      "Access to 10 Beginner Projects",
      "5 AI Code Reviews per month",
      "Basic Skill Radar",
      "Community Support",
    ],
    cta: "Start Free",
    link: "/register",
    popular: false
  },
  {
    name: "Pro Engineer",
    price: "15",
    desc: "For serious developers leveling up for interviews.",
    color: P,
    features: [
      "Unlimited Project Access (All levels)",
      "Unlimited AI Senior Dev Reviews",
      "Full 5-Dimensional Analytics",
      "Global Leaderboard Access",
      "Priority Email Support",
    ],
    cta: "Upgrade to Pro",
    link: "/register",
    popular: true
  },
  {
    name: "Enterprise Bootcamps",
    price: "Custom",
    desc: "For institutions tracking student engineering metrics.",
    color: S2,
    features: [
      "Custom Project Creation",
      "Instructor Dashboards",
      "Bulk Seat Licensing",
      "White-labeled Environment",
      "Dedicated Technical Account Manager",
    ],
    cta: "Contact Sales",
    link: "mailto:sales@skillforge.com",
    popular: false
  }
];

export default function Pricing() {
  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'DM Sans', sans-serif", color: TP, overflowX: "hidden", paddingTop: 100 }}>
      {/* Background Decor */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 400, background: `radial-gradient(ellipse at top, ${P}15 0%, transparent 60%)`, zIndex: 0, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ fontFamily: "'Syne', sans-serif", fontSize: 56, fontWeight: 800, marginBottom: 16, letterSpacing: "-1.5px" }}>
            Invest in your <span style={{ background: `linear-gradient(135deg, ${P}, ${S2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Code Quality.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontSize: 18, color: TS, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Simple, transparent pricing. Skip the expensive bootcamps and learn directly from elite AI mentorship.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "center", paddingBottom: 100 }}>
          {TIERS.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}
              style={{
                background: tier.popular ? `linear-gradient(180deg, ${SF1}, ${BG})` : SF1,
                border: `1px solid ${tier.popular ? P : BD}`,
                borderRadius: 24,
                padding: 40,
                position: "relative",
                transform: tier.popular ? "scale(1.05)" : "scale(1)",
                boxShadow: tier.popular ? `0 20px 40px rgba(0,0,0,0.5), 0 0 40px ${P}20` : "none",
                zIndex: tier.popular ? 10 : 1
              }}
            >
              {tier.popular && (
                <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${P}, ${S2})`, padding: "6px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, color: "white", boxShadow: `0 4px 12px ${P}40`, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Most Popular
                </div>
              )}

              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: TP, marginBottom: 8 }}>{tier.name}</h3>
              <p style={{ fontSize: 14, color: TS, marginBottom: 24, minHeight: 42 }}>{tier.desc}</p>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 32 }}>
                {tier.price !== "Custom" && <span style={{ fontSize: 24, fontWeight: 600, color: TT }}>$</span>}
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: TP, lineHeight: 1 }}>{tier.price}</span>
                {tier.price !== "Custom" && <span style={{ fontSize: 16, color: TT, fontWeight: 500 }}>/mo</span>}
              </div>

              <div style={{ height: 1, background: BD, marginBottom: 32 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: 16 }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: TP }}>
                    <span style={{ color: tier.popular ? S2 : TS, fontSize: 14 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {tier.link.startsWith("http") || tier.link.startsWith("mail") ? (
                <a href={tier.link} style={{ display: "block", width: "100%", padding: "14px", textAlign: "center", borderRadius: 12, background: tier.popular ? `linear-gradient(135deg, ${P}, ${S2})` : "transparent", border: `1px solid ${tier.popular ? "transparent" : BD}`, color: tier.popular ? "white" : TP, textDecoration: "none", fontWeight: 600, fontSize: 15, transition: "all 0.2s" }}
                  onMouseEnter={e => { if(!tier.popular) e.currentTarget.style.background = SF2; }}
                  onMouseLeave={e => { if(!tier.popular) e.currentTarget.style.background = "transparent"; }}>
                  {tier.cta}
                </a>
              ) : (
                <Link to={tier.link} style={{ display: "block", width: "100%", padding: "14px", textAlign: "center", borderRadius: 12, background: tier.popular ? `linear-gradient(135deg, ${P}, ${S2})` : "transparent", border: `1px solid ${tier.popular ? "transparent" : BD}`, color: tier.popular ? "white" : TP, textDecoration: "none", fontWeight: 600, fontSize: 15, transition: "all 0.2s" }}
                  onMouseEnter={e => { if(!tier.popular) e.currentTarget.style.background = SF2; }}
                  onMouseLeave={e => { if(!tier.popular) e.currentTarget.style.background = "transparent"; }}>
                  {tier.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
