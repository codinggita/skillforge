import { useState } from "react";
import { Link } from "react-router-dom";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B",INFO="#4FC3F7";
const BG="#080810",SF1="#0E0E1C",SF2="#141428",DARK="#0A0A18";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)";

const RADAR_DATA=[
  {subject:"Debugging",user:72,top:85},
  {subject:"Problem Solving",user:85,top:90},
  {subject:"Code Quality",user:63,top:80},
  {subject:"Time Mgmt",user:78,top:85},
  {subject:"Concepts",user:90,top:95}
];

const PROG_DATA=[
  {date:"Jan 1",score:5.2},{date:"Jan 15",score:6.0},{date:"Feb 1",score:6.4},
  {date:"Feb 15",score:7.1},{date:"Mar 1",score:7.5},{date:"Mar 15",score:8.0},
  {date:"Apr 1",score:8.2},{date:"Apr 15",score:8.4}
];

const SKILLS=[
  {n:"Problem Solving",sc:85,tr:"+5",c:S2},
  {n:"Concepts",sc:90,tr:"+2",c:P},
  {n:"Time Mgmt",sc:78,tr:"+4",c:INFO},
  {n:"Debugging",sc:72,tr:"-1",c:WARN},
  {n:"Code Quality",sc:63,tr:"-3",c:ERR}
];

const BADGES=[
  {i:"🚀",n:"First Launch",e:true,d:"Jan 14"},{i:"🔥",n:"On Fire",e:true,d:"Jan 22"},
  {i:"🧩",n:"Puzzle Solver",e:true,d:"Feb 3"},{i:"🏗️",n:"API Architect",e:true,d:"Feb 18"},
  {i:"⚡",n:"Speed Coder",e:true,d:"Mar 2"},{i:"🔒",n:"Sharpshooter",e:false},
  {i:"🔒",n:"Bug Hunter",e:false},{i:"🔒",n:"Algo Master",e:false},
  {i:"🔒",n:"System Design",e:false},{i:"🔒",n:"Open Source",e:false},
  {i:"🔒",n:"Reviewer",e:false},{i:"🔒",n:"Mentor",e:false}
];

export default function SkillReport(){
  const {user}=useAuth();
  const [showTop,setShowTop]=useState(false);
  const [progTab,setProgTab]=useState("Overall");
  const [badgeFil,setBadgeFil]=useState("All");

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'DM Sans',sans-serif",color:TP,paddingBottom:100}}>
      <Navbar/>
      
      <div style={{paddingTop:100,maxWidth:1200,margin:"0 auto",paddingLeft:40,paddingRight:40}}>
        
        {/* Profile Header Card */}
        <div style={{position:"relative",borderRadius:24,border:`1px solid ${BD}`,overflow:"hidden",marginBottom:40,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% -50%, ${P}40 0%, transparent 60%), radial-gradient(ellipse at 80% 120%, ${S2}30 0%, transparent 60%), ${SF1}`,zIndex:0}}/>
          
          <div style={{position:"relative",zIndex:1,padding:40,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:32}}>
            
            <div style={{display:"flex",alignItems:"center",gap:24}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${P},${S2})`,padding:3}}>
                <div style={{width:"100%",height:"100%",background:BG,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28,color:TP}}>{user?.name?.[0]||"A"}</div>
              </div>
              <div>
                <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,marginBottom:4}}>{user?.name||"Arjun Developer"}</h1>
                <p style={{fontSize:15,color:TS,marginBottom:16}}>DAIICT • B.Tech CSE • 2026</p>
                <div style={{display:"flex",gap:12}}>
                  <span style={{padding:"4px 12px",borderRadius:6,background:`${P}20`,border:`1px solid ${P}40`,color:P,fontSize:13,fontWeight:600}}>⚡ 2,450 XP</span>
                  <span style={{padding:"4px 12px",borderRadius:6,background:`linear-gradient(135deg,${P}20,${S2}20)`,border:`1px solid ${P}40`,color:TP,fontSize:13,fontWeight:600}}>🏆 Rank #34</span>
                  <span style={{padding:"4px 12px",borderRadius:6,background:`${WARN}20`,border:`1px solid ${WARN}40`,color:WARN,fontSize:13,fontWeight:600}}>🔥 12 Day Streak</span>
                </div>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:24}}>
              <button style={{padding:"8px 16px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:`1px solid ${BD}`,color:TP,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
                ⎋ Share Profile
              </button>
              <div style={{display:"flex",gap:32,fontFamily:"'JetBrains Mono',monospace"}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:TP}}>12</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:TS}}>Projects</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:TP}}>24</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:TS}}>Submissions</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:P}}>8.1</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:TS}}>Avg Score</div></div>
              </div>
            </div>

          </div>
        </div>

        {/* SKILL OVERVIEW (2 cols) */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginBottom:40}}>
          
          {/* Radar */}
          <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700}}>Skill Profile</h2>
              <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:TS,cursor:"pointer"}}>
                <input type="checkbox" checked={showTop} onChange={e=>setShowTop(e.target.checked)} style={{accentColor:S2,cursor:"pointer"}}/>
                vs. Top 10%
              </label>
            </div>
            <div style={{height:300}}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)"/>
                  <PolarAngleAxis dataKey="subject" tick={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fill:TS}}/>
                  <Radar name="You" dataKey="user" stroke={P} strokeWidth={2} fill={P} fillOpacity={0.3} dot={{r:3,fill:TP,stroke:P}}/>
                  {showTop&&<Radar name="Top 10%" dataKey="top" stroke={S2} strokeWidth={2} fill={S2} fillOpacity={0.1} strokeDasharray="4 4" dot={false}/>}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,marginBottom:32}}>Skill Breakdown</h2>
            <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:32}}>
              {SKILLS.map(s=>(
                <div key={s.n}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,color:TP}}>{s.n}</span>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:TP}}>{s.sc}/100</span>
                      <span style={{fontSize:12,color:s.tr.startsWith("+")?S2:ERR,width:80,textAlign:"right"}}>{s.tr.startsWith("+")?"↑":"↓"} {s.tr} this wk</span>
                    </div>
                  </div>
                  <div style={{height:8,background:SF2,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${s.sc}%`,background:s.c,borderRadius:4}}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{padding:20,borderRadius:12,border:`1px solid ${WARN}40`,background:`${WARN}10`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:WARN}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:16}}>💡</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,color:WARN}}>Focus on Code Quality</span>
              </div>
              <p style={{fontSize:13,color:TP,marginBottom:12}}>Your score is 22% below your average.</p>
              <Link to="/projects" style={{fontSize:13,color:WARN,fontWeight:600,textDecoration:"none"}}>Recommended: Bug Fix Challenge project →</Link>
            </div>
          </div>
        </div>

        {/* PROGRESS CHART */}
        <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32,marginBottom:40}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700}}>Score Progression</h2>
            <div style={{display:"flex",background:SF2,borderRadius:8,padding:4,border:`1px solid ${BD}`}}>
              {["Overall","Debugging","Problem Solving"].map(t=>(
                <button key={t} onClick={()=>setProgTab(t)} style={{padding:"6px 16px",borderRadius:6,background:progTab===t?SF1:"transparent",border:`1px solid ${progTab===t?BD:"transparent"}`,color:progTab===t?TP:TS,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s"}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{height:300}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROG_DATA} margin={{top:10,right:10,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={P} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={P} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={BD}/>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fill:TS}} dy={10}/>
                <YAxis domain={[0,10]} axisLine={false} tickLine={false} tick={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fill:TS}}/>
                <Tooltip contentStyle={{background:"rgba(14,14,28,0.8)",backdropFilter:"blur(10px)",border:`1px solid ${BD}`,borderRadius:8,color:TP,fontFamily:"'JetBrains Mono',monospace",boxShadow:`0 10px 20px rgba(0,0,0,0.4)`}} itemStyle={{color:P}}/>
                <Area type="monotone" dataKey="score" stroke={P} strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{r:6,fill:TP,stroke:P,strokeWidth:3,filter:`drop-shadow(0 0 8px ${P})`}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTIVITY HEATMAP */}
        <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:40,marginBottom:40,overflowX:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
            <div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:TP,marginBottom:4}}>Consistency Map</h2>
              <p style={{fontSize:14,color:TS}}>Your daily coding activity over the last year.</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:TT}}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(v => (
                <div key={v} style={{width:12,height:12,borderRadius:2,background:v===0?SF2:[`${P}33`,`${P}80`,`${P}CC`,P][v-1]}}/>
              ))}
              <span>More</span>
            </div>
          </div>
          
          <div style={{display:"flex",gap:12,minWidth:800}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",paddingTop:24,paddingBottom:4,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:TT}}>
              <span>Mon</span><span>Wed</span><span>Fri</span>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:TT,paddingLeft:4}}>
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m=><span key={m}>{m}</span>)}
              </div>
              <div style={{display:"flex",gap:4}}>
                {Array.from({length:52}).map((_,w)=>(
                  <div key={w} style={{display:"flex",flexDirection:"column",gap:4}}>
                    {Array.from({length:7}).map((_,d)=>{
                      const r=Math.random();
                      const lv=r>0.85?4:r>0.7?3:r>0.55?2:r>0.4?1:0;
                      const cols=[SF2,`${P}33`,`${P}80`,`${P}CC`,P];
                      return (
                        <div key={d} 
                          style={{
                            width:13,
                            height:13,
                            borderRadius:3,
                            background:cols[lv],
                            boxShadow:lv===4?`0 0 8px ${P}40`:"none",
                            transition:"all 0.2s cubic-bezier(0.16,1,0.3,1)",
                            cursor:"pointer"
                          }} 
                          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.4)";e.currentTarget.style.zIndex=10;}} 
                          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.zIndex=1;}}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BADGES & AI REC ROW */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:32}}>
          
          {/* BADGES */}
          <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700}}>Badges</h2>
                <span style={{fontSize:13,color:TT}}>5 of 12 earned</span>
              </div>
              <div style={{display:"flex",background:SF2,borderRadius:8,padding:4,border:`1px solid ${BD}`}}>
                {["All","Earned","Locked"].map(t=>(
                  <button key={t} onClick={()=>setBadgeFil(t)} style={{padding:"4px 12px",borderRadius:6,background:badgeFil===t?SF1:"transparent",border:`1px solid ${badgeFil===t?BD:"transparent"}`,color:badgeFil===t?TP:TS,fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
              {BADGES.filter(b=>badgeFil==="All"?true:badgeFil==="Earned"?b.e:!b.e).map((b,i)=>(
                <div key={i} style={{
                  padding:"24px 16px",borderRadius:16,textAlign:"center",position:"relative",
                  background:b.e?`linear-gradient(135deg, ${SF1}, ${P}15)`:SF1,
                  border:`1px solid ${b.e?`${P}80`:BD}`,
                  boxShadow:b.e?`0 0 30px ${P}20`:"none",
                  filter:b.e?"none":"grayscale(100%) opacity(0.4)",
                  transition:"all 0.2s",cursor:b.e?"default":"pointer"
                }} onMouseEnter={e=>{if(!b.e){e.currentTarget.style.filter="grayscale(100%) opacity(0.8)";}}} onMouseLeave={e=>{if(!b.e){e.currentTarget.style.filter="grayscale(100%) opacity(0.4)";}}}>
                  {!b.e&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,zIndex:2}}>🔒</div>}
                  <div style={{fontSize:48,marginBottom:12,filter:!b.e?"blur(4px)":"drop-shadow(0 0 16px rgba(255,255,255,0.2))"}}>{b.i}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:TP,marginBottom:4,filter:!b.e?"blur(4px)":"none"}}>{b.n}</div>
                  {b.e&&<div style={{fontSize:11,color:TT}}>Earned {b.d}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* AI REC */}
          <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700}}>What to work on next</h2>
              <span style={{fontSize:20}}>⚡</span>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[
                {c:ERR,imp:"Improve: Code Quality",n:"Bug Fix Challenge",d:"45 min • Medium • +50 XP"},
                {c:WARN,imp:"Improve: Debugging",n:"Event Emitter Logic",d:"30 min • Hard • +80 XP"},
                {c:INFO,imp:"Improve: Time Mgmt",n:"Rate Limiter",d:"50 min • Medium • +60 XP"}
              ].map((r,i)=>(
                <div key={i} style={{background:SF2,border:`1px solid ${BD}`,borderRadius:12,overflow:"hidden",display:"flex"}}>
                  <div style={{width:4,background:r.c}}/>
                  <div style={{padding:"16px",flex:1}}>
                    <div style={{fontSize:12,color:P,fontWeight:600,marginBottom:4}}>{r.imp}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:600,color:TP,marginBottom:8}}>{r.n}</div>
                    <div style={{fontSize:12,color:TS,marginBottom:16}}>{r.d}</div>
                    <Link to="/projects" style={{display:"inline-block",padding:"8px 16px",borderRadius:6,background:P,color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background="#6A5CE4"} onMouseLeave={e=>e.currentTarget.style.background=P}>Start →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
