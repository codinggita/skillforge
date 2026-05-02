import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { submissionsApi } from "../api/client";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B";
const BG="#080810",SF1="#0E0E1C",SF2="#141428";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)",BDS="rgba(255,255,255,0.12)";

const MOCK_REVIEW={
  _id:"mock-res-1",
  project:{title:"Build a REST API",difficulty:"medium"},
  language:"JavaScript",
  createdAt:new Date().toISOString(),
  aiReview:{
    score:8.4,
    metrics:{logic:9,efficiency:7,readability:8,errorHandling:6},
    feedback:"Your implementation of the Express router is clean and follows RESTful conventions well. However, you're missing a global error handler for catching asynchronous promise rejections, which could lead to silent failures.",
    improvements:[
      "Add `express-async-errors` or a custom wrapper to handle async route errors.",
      "Implement a centralized error handling middleware.",
      "Use descriptive HTTP status codes for failure cases instead of generic 500s."
    ],
    skillDeltas:{
      "Problem Solving":3, "Code Quality":2, "Error Handling":-1
    }
  },
  code:`const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/users', (req, res) => {\n  res.json([]);\n});\n\napp.listen(3000);\n`
};

function getScoreColor(sc){
  if(sc>=9)return S2;
  if(sc>=7)return P;
  if(sc>=5)return WARN;
  return ERR;
}
function getScoreLabel(sc){
  if(sc>=9)return "Exceptional Work!";
  if(sc>=7)return "Good Progress!";
  if(sc>=5)return "Needs Polish";
  return "Keep Trying";
}

function ScoreRing({score,color}){
  const [prog,setProg]=useState(0);
  useEffect(()=>{
    const timer=setTimeout(()=>{setProg(score);},300);
    return ()=>clearTimeout(timer);
  },[score]);

  const rad=60,circ=2*Math.PI*rad;
  const strokeDashoffset=circ-(prog/10)*circ;

  return(
    <div style={{position:"relative",width:160,height:160,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
      <svg width="160" height="160" style={{transform:"rotate(-90deg)",filter:`drop-shadow(0 0 16px ${color}80)`}}>
        <circle cx="80" cy="80" r={rad} fill="transparent" stroke={SF2} strokeWidth="8"/>
        <circle cx="80" cy="80" r={rad} fill="transparent" stroke={color} strokeWidth="8" strokeDasharray={circ} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{transition:"stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:-4}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,color,lineHeight:1}}>{prog.toFixed(1)}</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,color:TT,fontWeight:700}}>/10</span>
        </div>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:TT,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>Overall Score</span>
      </div>
    </div>
  );
}

function MetricCard({label,icon,sc}){
  const [p,setP]=useState(0);
  const c=getScoreColor(sc);
  useEffect(()=>{const t=setTimeout(()=>setP(sc),400);return ()=>clearTimeout(t);},[sc]);
  
  return(
    <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:20,display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <span style={{fontSize:16}}>{icon}</span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:TS}}>{label}</span>
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:12}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:c}}>{sc}</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,color:TT}}>/10</span>
      </div>
      <div style={{height:4,background:SF2,borderRadius:999,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${(p/10)*100}%`,background:c,borderRadius:999,transition:"width 1s cubic-bezier(0.16,1,0.3,1)"}}/>
      </div>
    </div>
  );
}

function CouncilCard({ persona, comment }) {
  const isSpeedy = persona.includes("Speedy");
  const isGuardian = persona.includes("Guardian");
  const isArchitect = persona.includes("Architect");

  const color = isSpeedy ? INFO : isGuardian ? S2 : P;
  const icon = isSpeedy ? "⚡" : isGuardian ? "🛡️" : "🎨";

  return (
    <div style={{
      background: SF1,
      border: `1px solid ${BD}`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 16,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      position: "relative",
      overflow: "hidden"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.borderColor = color + "40";
      e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${color}10`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.borderColor = BD;
      e.currentTarget.style.boxShadow = "none";
    }}>
      <div style={{ position: "absolute", top: -10, right: -10, fontSize: 64, opacity: 0.03, pointerEvents: "none" }}>{icon}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: TP }}>{persona}</span>
      </div>
      <p style={{ fontSize: 14, color: TS, lineHeight: 1.6, margin: 0 }}>{comment}</p>
    </div>
  );
}

export default function ReviewResult(){
  const {id}=useParams();
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(true);
  const [codeOpen,setCodeOpen]=useState(false);

  useEffect(()=>{
    if(id&&id.startsWith("demo")) {
      setTimeout(() => {
        setData(MOCK_REVIEW);
        setLoading(false);
      }, 0);
      return;
    }
    
    let pollInterval;
    const fetchSub = async () => {
      try {
        const res = await submissionsApi.getOne(id);
        const sub = res.data || res.submission;
        if(sub && (sub.status === "pending" || sub.status === "ai_reviewing")) {
          // keep polling
          if(!pollInterval) {
            pollInterval = setInterval(fetchSub, 2000);
          }
        } else {
          // done
          if(pollInterval) clearInterval(pollInterval);
          setData(sub || MOCK_REVIEW);
          setLoading(false);
        }
      } catch {
        if(pollInterval) clearInterval(pollInterval);
        setData(MOCK_REVIEW);
        setLoading(false);
      }
    };
    
    fetchSub();
    return () => { if(pollInterval) clearInterval(pollInterval); };
  },[id]);

  if(loading) return (
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24}}>
      <div style={{width:48,height:48,border:`3px solid rgba(123,110,246,0.15)`,borderTopColor:P,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:600,color:TP}}>Waiting for AI Mentor...</h2>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const r = data.aiReview || {};
  const isMock = data._id === "mock-res-1" || !data.projectId;
  
  // Real backend uses data.score (0-100). Mock uses r.score (1-10).
  const rawScore = isMock ? r.score : (data.score / 10);
  const col = getScoreColor(rawScore);
  const lab = getScoreLabel(rawScore);
  const hasBadge = rawScore >= 8;
  
  const council = r.council || [
    { persona: "⚡ Speedy (Performance)", comment: "No specific performance critique." },
    { persona: "🛡️ Guardian (Security)", comment: "No critical security vulnerabilities found." },
    { persona: "🎨 Architect (Clean Code)", comment: "Good overall structure and naming conventions." }
  ];

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'DM Sans',sans-serif",color:TP,paddingBottom:100,overflowX:"hidden"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"100px 40px 40px"}}>
        
        {/* Header Section */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:48,flexWrap:"wrap",gap:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <Link to="/dashboard" style={{color:TS,textDecoration:"none",fontSize:14,fontWeight:500}}>Dashboard</Link>
              <span style={{color:TT}}>•</span>
              <span style={{color:TS,fontSize:14}}>{data.projectId?.title || "Project Review"}</span>
            </div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,letterSpacing:"-2px",marginBottom:8}}>Analysis Complete.</h1>
            <p style={{fontSize:18,color:TS}}>Here's how you performed across all dimensions.</p>
          </div>
          
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>setCodeOpen(!codeOpen)} style={{padding:"12px 24px",borderRadius:12,background:SF1,border:`1px solid ${BD}`,color:TP,fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>
              {codeOpen ? "View Report" : "View Your Code"}
            </button>
            <Link to="/projects" style={{padding:"12px 24px",borderRadius:12,background:`linear-gradient(135deg,${P},${S2})`,color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:600,textDecoration:"none",boxShadow:`0 0 30px rgba(123,110,246,0.3)`}}>
              Next Project →
            </Link>
          </div>
        </div>

        {!codeOpen ? (
          <div style={{animation:"fadeIn 0.5s ease"}}>
            {/* Top Stats Row */}
            <div style={{display:"grid",gridTemplateColumns:"320px 1fr",gap:32,marginBottom:48}}>
              {/* Score Ring Card */}
              <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:40,textAlign:"center",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at center, ${col}10 0%, transparent 70%)`,zIndex:0}}/>
                <ScoreRing score={rawScore} color={col}/>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:TP,marginBottom:8}}>{lab}</h3>
                {hasBadge && (
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:999,background:`${S2}15`,border:`1px solid ${S2}30`,color:S2,fontSize:12,fontWeight:700,textTransform:"uppercase"}}>
                    ✨ Achievement Unlocked
                  </div>
                )}
              </div>

              {/* Summary & Suggestions */}
              <div style={{display:"flex",flexDirection:"column",gap:24}}>
                <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:32,flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                    <span style={{fontSize:20}}>🤖</span>
                    <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700}}>AI Mentor Summary</h2>
                  </div>
                  <p style={{fontSize:16,color:TP,lineHeight:1.8,margin:0}}>{r.summary || r.feedback}</p>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
                  <div style={{background:`${S2}05`,border:`1px solid ${S2}20`,borderRadius:20,padding:24}}>
                    <h3 style={{fontSize:14,fontWeight:700,color:S2,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
                      <span>💪</span> Strengths
                    </h3>
                    <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                      {(r.strengths || ["Clean structure", "Correct logic"]).map((s,i)=>(
                        <li key={i} style={{fontSize:14,color:TP,display:"flex",alignItems:"center",gap:8}}>
                          <span style={{color:S2}}>✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{background:`${WARN}05`,border:`1px solid ${WARN}20`,borderRadius:20,padding:24}}>
                    <h3 style={{fontSize:14,fontWeight:700,color:WARN,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
                      <span>⚡</span> Improvements
                    </h3>
                    <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                      {(r.improvements || r.suggestions || ["Add error handling"]).map((s,i)=>(
                        <li key={i} style={{fontSize:14,color:TP,display:"flex",alignItems:"center",gap:8}}>
                          <span style={{color:WARN}}>→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Council Section */}
            <div style={{marginBottom:48}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800}}>The AI Council</h2>
                <div style={{height:1,flex:1,background:BD}}/>
                <span style={{fontSize:12,color:TT,textTransform:"uppercase",letterSpacing:"0.1em"}}>Detailed Persona Critique</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
                {council.map((c, i) => (
                  <CouncilCard key={i} persona={c.persona} comment={c.comment} />
                ))}
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
              <MetricCard label="Code Quality" icon="✨" sc={r.codeQualityScore ? r.codeQualityScore/10 : 8}/>
              <MetricCard label="Readability" icon="📖" sc={r.readabilityScore ? r.readabilityScore/10 : 7}/>
              <MetricCard label="Efficiency" icon="⚡" sc={r.efficiencyScore ? r.efficiencyScore/10 : 9}/>
              <MetricCard label="Logic" icon="🧩" sc={rawScore}/>
            </div>
          </div>
        ) : (
          <div style={{animation:"fadeIn 0.5s ease"}}>
            <div style={{background:DARK,border:`1px solid ${BD}`,borderRadius:24,overflow:"hidden",boxShadow:`0 30px 60px rgba(0,0,0,0.5)`}}>
              <div style={{background:SF2,padding:"12px 24px",borderBottom:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:8}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:ERR}}/>
                  <div style={{width:12,height:12,borderRadius:"50%",background:WARN}}/>
                  <div style={{width:12,height:12,borderRadius:"50%",background:S2}}/>
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:TT}}>{data.language || "source_code.js"}</div>
                <div style={{width:40}}/>
              </div>
              <pre style={{margin:0,padding:32,fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:TS,lineHeight:1.7,overflowX:"auto"}}>
                <code>{data.code || "// No code found"}</code>
              </pre>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
