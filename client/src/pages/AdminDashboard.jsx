import { useState } from "react";
import { Link } from "react-router-dom";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, CartesianGrid } from "recharts";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B";
const BG="#030308",SF1="#0E0E1C",SF2="#141428",DARK="#060610";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)";

const LINE_DATA=[{d:"1",v:40},{d:"5",v:55},{d:"10",v:45},{d:"15",v:80},{d:"20",v:65},{d:"25",v:90},{d:"30",v:134}];
const PIE_DATA=[{n:"Easy",v:40,c:S2},{n:"Medium",v:45,c:WARN},{n:"Hard",v:15,c:ERR}];

const USERS=[
  {n:"Rahul S.",c:"VIT",xp:14500,p:12,s:8.1,j:"Jan 12"},
  {n:"Priya M.",c:"BITS",xp:8200,p:6,s:9.2,j:"Feb 04"},
  {n:"Arjun P.",c:"DAIICT",xp:15800,p:14,s:9.4,j:"Jan 05"},
  {n:"Sneha K.",c:"NIT",xp:4100,p:3,s:7.2,j:"Mar 11"}
];

const Sidebar=({view, setView})=>(
  <div style={{width:240,background:DARK,borderRight:`1px solid ${BD}`,display:"flex",flexDirection:"column",height:"100vh",flexShrink:0}}>
    <div style={{padding:"24px 20px",borderBottom:`1px solid ${BD}`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <span style={{fontSize:18,color:P,filter:`drop-shadow(0 0 8px rgba(123,110,246,0.5))`}}>🛡️</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:TP}}>SkillForge Admin</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:S2}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:S2}}/> System operational
      </div>
    </div>
    <div style={{padding:"20px 12px",display:"flex",flexDirection:"column",gap:4,flex:1}}>
      {[
        {id:"overview",lbl:"Overview",ic:"📊"},
        {id:"projects",lbl:"Projects",ic:"📋"},
        {id:"users",lbl:"Users",ic:"👥"},
        {id:"subs",lbl:"Submissions",ic:"📝",cnt:"12"},
        {id:"flagged",lbl:"Flagged",ic:"🚨",cnt:"3",err:true},
        {id:"settings",lbl:"Settings",ic:"⚙️"}
      ].map(n=>(
        <button key={n.id} onClick={()=>setView(n.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,background:view===n.id?SF2:"transparent",border:"none",borderLeft:view===n.id?`2px solid ${n.err?ERR:P}`:"2px solid transparent",color:view===n.id?TP:TS,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:view===n.id?600:500,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}>
          <span style={{fontSize:16}}>{n.ic}</span>
          <span style={{flex:1}}>{n.lbl}</span>
          {n.cnt&&<span style={{padding:"2px 6px",borderRadius:4,background:n.err?`${ERR}20`:`${P}20`,color:n.err?ERR:P,fontSize:11,fontWeight:700}}>{n.cnt}</span>}
        </button>
      ))}
    </div>
    <div style={{padding:20,borderTop:`1px solid ${BD}`}}>
      <Link to="/dashboard" style={{display:"flex",alignItems:"center",gap:8,color:TS,textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>
        ← Back to App
      </Link>
    </div>
  </div>
);

export default function AdminDashboard(){
  const [view,setView]=useState("overview");
  const [showAdd,setShowAdd]=useState(false);
  const [showProfile,setShowProfile]=useState(null);

  // Add Project Form State
  const [apTitle,setApTitle]=useState("");
  const [apDiff,setApDiff]=useState("Easy");
  const [apTime,setApTime]=useState("");

  return(
    <div style={{display:"flex",height:"100vh",background:BG,color:TP,fontFamily:"'DM Sans',sans-serif",overflow:"hidden"}}>
      <Sidebar view={view} setView={setView} />

      <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",padding:40}}>
        
        {/* OVERVIEW VIEW */}
        {view==="overview"&&(
          <div style={{animation:"fadeIn 0.3s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32}}>
              <div>
                <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:TP,marginBottom:8}}>Good morning, Admin ⚡</h1>
                <p style={{fontSize:15,color:S2}}>Platform performing well today.</p>
              </div>
              <button onClick={()=>setShowAdd(true)} style={{padding:"10px 20px",borderRadius:8,background:`linear-gradient(135deg,${P},${S2})`,color:"white",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,cursor:"pointer",boxShadow:`0 0 20px rgba(123,110,246,0.3)`}}>
                + New Project
              </button>
            </div>

            {/* Stats Row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:16,marginBottom:32}}>
              {[
                {l:"Total Users",v:"2,451",s:"+12 today"},{l:"Active Today",v:"89",s:""},
                {l:"Submissions Today",v:"134",s:""},{l:"Avg Score Today",v:"7.8",s:"/10"},
                {l:"New This Week",v:"45",s:""},{l:"Total XP Awarded",v:"48,200",s:""}
              ].map((s,i)=>(
                <div key={i} style={{background:SF1,border:`1px solid ${BD}`,borderRadius:12,padding:"16px 20px"}}>
                  <div style={{fontSize:12,color:TS,fontWeight:600,marginBottom:12}}>{s.l}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:TP}}>{s.v}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:S2}}>{s.s}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{display:"flex",gap:24,marginBottom:32}}>
              <div style={{flex:"6",background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:24}}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:24}}>Daily Submissions</h3>
                <div style={{height:240}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={LINE_DATA} margin={{top:0,right:0,left:-20,bottom:0}}>
                      <defs>
                        <linearGradient id="cSub" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={P} stopOpacity={0.3}/><stop offset="95%" stopColor={P} stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={BD}/>
                      <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fontSize:11,fill:TS}}/>
                      <Tooltip contentStyle={{background:SF2,border:`1px solid ${BD}`,borderRadius:8,color:TP}}/>
                      <Area type="monotone" dataKey="v" stroke={P} strokeWidth={3} fillOpacity={1} fill="url(#cSub)"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{flex:"4",background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:24}}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:24}}>Projects by Difficulty</h3>
                <div style={{height:240}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="v" paddingAngle={5}>
                        {PIE_DATA.map((e,i)=><Cell key={i} fill={e.c}/>)}
                      </Pie>
                      <Tooltip contentStyle={{background:SF2,border:`1px solid ${BD}`,borderRadius:8,color:TP}}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:-10}}>
                  {PIE_DATA.map(e=>(
                    <div key={e.n} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:TS}}><span style={{width:8,height:8,borderRadius:2,background:e.c}}/>{e.n}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div style={{display:"flex",gap:24}}>
              
              {/* Live Feed */}
              <div style={{flex:1,background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:24}}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:24}}>Live Submissions Feed</h3>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {[
                    {n:"Rahul S.",p:"Todo API",s:8.1,t:"2m ago"},
                    {n:"Priya M.",p:"Array Reversal",s:9.2,t:"5m ago"},
                    {n:"Arjun P.",p:"Auth Middleware",s:6.4,t:"12m ago"}
                  ].map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:SF2,border:`1px solid ${BD}`,borderLeft:`3px solid ${P}`,borderRadius:8}}>
                      <div>
                        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:TP,marginBottom:4}}><span style={{fontWeight:600}}>{s.n}</span> submitted <span style={{color:P}}>{s.p}</span></div>
                        <div style={{fontSize:12,color:TT}}>{s.t}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <span style={{padding:"2px 8px",borderRadius:6,background:`rgba(255,255,255,0.05)`,border:`1px solid ${BD}`,fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600,color:s.s>=9?S2:s.s>=7?P:WARN}}>{s.s}/10</span>
                        <button style={{background:"none",border:"none",color:TS,cursor:"pointer",fontSize:13}}>View →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Attempted */}
              <div style={{flex:1,background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:24}}>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:24}}>Most Attempted Projects</h3>
                <div style={{display:"grid",gridTemplateColumns:"40px 2fr 1fr 1fr",fontSize:11,color:TT,textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:`1px solid ${BD}`,paddingBottom:8,marginBottom:12}}>
                  <div>Rnk</div><div>Project</div><div>Attempts</div><div>Pass Rate</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {[
                    {r:1,n:"Build a REST API",a:842,pr:86},{r:2,n:"Promise Polyfill",a:620,pr:42},
                    {r:3,n:"Event Emitter",a:512,pr:68},{r:4,n:"Rate Limiter",a:490,pr:55}
                  ].map(p=>(
                    <div key={p.r} style={{display:"grid",gridTemplateColumns:"40px 2fr 1fr 1fr",alignItems:"center",padding:"8px 0",fontFamily:"'DM Sans',sans-serif",fontSize:13}}>
                      <div style={{color:TS}}>{p.r}</div>
                      <div style={{color:TP,fontWeight:500}}>{p.n}</div>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",color:TS}}>{p.a}</div>
                      <div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4,fontSize:11,color:p.pr>60?S2:WARN}}>{p.pr}%</div>
                        <div style={{height:4,background:SF2,borderRadius:999}}><div style={{width:`${p.pr}%`,height:"100%",background:p.pr>60?S2:WARN,borderRadius:999}}/></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* USERS VIEW */}
        {view==="users"&&(
          <div style={{animation:"fadeIn 0.3s"}}>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:TP,marginBottom:32}}>User Management</h1>
            <div style={{display:"flex",gap:16,marginBottom:24}}>
              <input placeholder="Search users by name or email..." style={{flex:1,background:SF1,border:`1px solid ${BD}`,borderRadius:8,padding:"10px 16px",color:TP,fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none"}}/>
              <button style={{padding:"0 20px",background:SF2,border:`1px solid ${BD}`,borderRadius:8,color:TP,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>Filter ▼</button>
            </div>
            
            <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:16,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 1fr 80px",padding:"16px 20px",borderBottom:`1px solid ${BD}`,background:SF2,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:TT,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                <div>User</div><div>College</div><div>XP</div><div>Projects</div><div>Avg Score</div><div>Joined</div><div>Actions</div>
              </div>
              <div style={{display:"flex",flexDirection:"column"}}>
                {USERS.map((u,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 1fr 80px",alignItems:"center",padding:"12px 20px",borderBottom:`1px solid ${BD}`,fontFamily:"'DM Sans',sans-serif",fontSize:14,transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=SF2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:`${P}20`,color:P,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{u.n[0]}</div>
                      <span style={{color:TP,fontWeight:500}}>{u.n}</span>
                    </div>
                    <div style={{color:TS}}>{u.c}</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",color:WARN,fontWeight:600}}>{u.xp}</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",color:TP}}>{u.p}</div>
                    <div><span style={{padding:"2px 8px",borderRadius:6,background:`${P}15`,border:`1px solid ${P}30`,color:P,fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600}}>{u.s}</span></div>
                    <div style={{color:TS,fontSize:13}}>{u.j}</div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setShowProfile(u)} style={{padding:"4px 10px",background:"transparent",border:`1px solid ${BD}`,borderRadius:6,color:TP,fontSize:12,cursor:"pointer"}}>View</button>
                      <button style={{background:"transparent",border:"none",color:TS,cursor:"pointer",fontSize:16}}>⋮</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* USER PROFILE MODAL (Right Slide) */}
      {showProfile&&(
        <>
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100}} onClick={()=>setShowProfile(null)}/>
          <div style={{position:"fixed",top:0,bottom:0,right:0,width:400,background:DARK,borderLeft:`1px solid ${BD}`,zIndex:101,padding:32,display:"flex",flexDirection:"column",animation:"slideIn 0.3s forwards"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,color:TP}}>User Profile</h2>
              <button onClick={()=>setShowProfile(null)} style={{background:"none",border:"none",color:TS,fontSize:24,cursor:"pointer"}}>×</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:32}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:`${P}20`,color:P,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700}}>{showProfile.n[0]}</div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700,color:TP,marginBottom:4}}>{showProfile.n}</div>
                <div style={{color:TS,fontSize:14}}>{showProfile.c}</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:32}}>
              <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:8,padding:16}}><div style={{fontSize:12,color:TS,marginBottom:4}}>Total XP</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:WARN,fontWeight:700}}>{showProfile.xp}</div></div>
              <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:8,padding:16}}><div style={{fontSize:12,color:TS,marginBottom:4}}>Avg Score</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:P,fontWeight:700}}>{showProfile.s}</div></div>
            </div>
            <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:8,padding:20,flex:1}}>
              <h3 style={{fontSize:14,color:TP,marginBottom:16}}>Action Center</h3>
              <button style={{width:"100%",padding:"10px",background:`${P}15`,border:`1px solid ${P}30`,borderRadius:6,color:P,marginBottom:12,cursor:"pointer"}}>Promote to Mentor</button>
              <button style={{width:"100%",padding:"10px",background:`${WARN}15`,border:`1px solid ${WARN}30`,borderRadius:6,color:WARN,marginBottom:12,cursor:"pointer"}}>Reset Password</button>
              <button style={{width:"100%",padding:"10px",background:`${ERR}15`,border:`1px solid ${ERR}30`,borderRadius:6,color:ERR,cursor:"pointer"}}>Suspend Account</button>
            </div>
          </div>
        </>
      )}

      {/* ADD PROJECT MODAL (Full Screen) */}
      {showAdd&&(
        <div style={{position:"fixed",inset:0,background:"rgba(8,8,16,0.95)",backdropFilter:"blur(10px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.2s"}}>
          <div style={{width:"90%",height:"90%",background:SF1,border:`1px solid ${BD}`,borderRadius:24,display:"flex",overflow:"hidden",boxShadow:`0 30px 60px rgba(0,0,0,0.5)`}}>
            
            {/* Form Left */}
            <div style={{flex:1,padding:40,overflowY:"auto",borderRight:`1px solid ${BD}`}}>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:700,color:TP,marginBottom:32}}>Create New Project</h2>
              <div style={{display:"flex",flexDirection:"column",gap:24}}>
                <div>
                  <label style={{display:"block",fontSize:13,color:TS,marginBottom:8,fontWeight:600}}>Project Title</label>
                  <input value={apTitle} onChange={e=>setApTitle(e.target.value)} placeholder="e.g. Build a Web Socket Chat" style={{width:"100%",background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"12px 16px",color:TP,fontSize:15,outline:"none"}}/>
                </div>
                <div>
                  <label style={{display:"block",fontSize:13,color:TS,marginBottom:8,fontWeight:600}}>Difficulty</label>
                  <div style={{display:"flex",gap:12}}>
                    {["Easy","Medium","Hard"].map(d=>(
                      <button key={d} onClick={()=>setApDiff(d)} style={{flex:1,padding:"12px",borderRadius:8,background:apDiff===d?`${d==="Easy"?S2:d==="Medium"?WARN:ERR}15`:BG,border:`1px solid ${apDiff===d?(d==="Easy"?S2:d==="Medium"?WARN:ERR):BD}`,color:apDiff===d?(d==="Easy"?S2:d==="Medium"?WARN:ERR):TS,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{display:"block",fontSize:13,color:TS,marginBottom:8,fontWeight:600}}>Estimated Time (minutes)</label>
                  <input type="number" value={apTime} onChange={e=>setApTime(e.target.value)} placeholder="45" style={{width:"100%",background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"12px 16px",color:TP,fontSize:15,outline:"none"}}/>
                </div>
                <div>
                  <label style={{display:"block",fontSize:13,color:TS,marginBottom:8,fontWeight:600}}>Category</label>
                  <select style={{width:"100%",background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"12px 16px",color:TP,fontSize:15,outline:"none",cursor:"pointer"}}>
                    <option>Frontend</option><option>Backend</option><option>Algorithms</option>
                  </select>
                </div>
                <div>
                  <label style={{display:"block",fontSize:13,color:TS,marginBottom:8,fontWeight:600}}>Tags (comma separated)</label>
                  <input placeholder="React, WebSockets, Node.js" style={{width:"100%",background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"12px 16px",color:TP,fontSize:15,outline:"none"}}/>
                </div>
              </div>
              <div style={{display:"flex",gap:16,marginTop:40}}>
                <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:"14px",borderRadius:10,background:"transparent",border:`1px solid ${BD}`,color:TP,fontSize:15,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                <button onClick={()=>{setShowAdd(false);setView("projects");}} style={{flex:2,padding:"14px",borderRadius:10,background:`linear-gradient(135deg,${P},${S2})`,border:"none",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",boxShadow:`0 0 20px rgba(123,110,246,0.3)`}}>Create Project</button>
              </div>
            </div>

            {/* Preview Right */}
            <div style={{flex:1,background:BG,padding:40,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:13,color:TS,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:24,fontWeight:600}}>Live Preview</div>
              
              {/* Card Preview */}
              <div style={{width:320,background:SF1,border:`1px solid ${BD}`,borderRadius:16,overflow:"hidden",boxShadow:`0 20px 40px rgba(0,0,0,0.5)`}}>
                <div style={{height:4,background:apDiff==="Easy"?S2:apDiff==="Medium"?WARN:ERR}}/>
                <div style={{padding:24}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <span style={{padding:"4px 10px",borderRadius:6,background:apDiff==="Easy"?`${S2}15`:apDiff==="Medium"?`${WARN}15`:`${ERR}15`,color:apDiff==="Easy"?S2:apDiff==="Medium"?WARN:ERR,fontSize:11,fontWeight:700,textTransform:"uppercase"}}>{apDiff||"Difficulty"}</span>
                    <span style={{fontSize:12,color:TT}}>⏱ {apTime||"0"} min</span>
                  </div>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12,lineHeight:1.3}}>{apTitle||"Project Title Preview"}</h3>
                  <p style={{fontSize:13,color:TS,marginBottom:20,lineHeight:1.6}}>Project description will appear here outlining the basic requirements and learning objectives.</p>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
                    <span style={{padding:"2px 8px",borderRadius:4,background:SF2,color:TS,fontSize:11}}>React</span>
                    <span style={{padding:"2px 8px",borderRadius:4,background:SF2,color:TS,fontSize:11}}>WebSockets</span>
                  </div>
                  <div style={{width:"100%",padding:"10px",borderRadius:8,background:BG,border:`1px solid ${BD}`,color:TP,textAlign:"center",fontSize:13,fontWeight:600}}>Start Project →</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
      `}</style>
    </div>
  );
}
