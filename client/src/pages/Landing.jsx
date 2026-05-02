import React from "react";
import { Link } from "react-router-dom";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B";
const BG="#080810",SF1="#0E0E1C",SF2="#141428";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)",BDS="rgba(255,255,255,0.1)";

function MeshBackground(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:-1,overflow:"hidden",background:BG}}>
      {/* Dot Grid */}
      <div style={{position:"absolute",inset:0,backgroundSize:"24px 24px",backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)"}}/>
      {/* Mesh Gradients */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%, rgba(123,110,246,0.15) 0%, transparent 50%),radial-gradient(ellipse at 80% 20%, rgba(6,214,160,0.10) 0%, transparent 50%),radial-gradient(ellipse at 60% 80%, rgba(255,107,157,0.08) 0%, transparent 50%)"}}/>
    </div>
  );
}

function Hero(){
  return(
    <section className="container" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"140px 0 100px",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",gap:80,flexWrap:"wrap"}}>
        {/* Left Content */}
        <div style={{flex:1.2,minWidth:340}} className="animate-fade-in">
          {/* Pill */}
          <div className="badge badge-primary" style={{marginBottom:32, padding: "8px 16px"}}>
            <span style={{color:P,marginRight:8}}>✦</span> v2.0 Now Live — The AI Revolution in Coding
          </div>
          
          <h1 className="text-hero" style={{marginBottom:32}}>
            <div style={{color:TP}}>Master Code with</div>
            <div className="text-gradient-primary">AI Precision.</div>
          </h1>
          
          <p className="text-body" style={{color:TS,maxWidth:560,marginBottom:48,fontSize:20}}>
            Stop guessing. Start growing. SkillForge uses advanced neural review to provide the feedback you need to land your dream role.
          </p>

          <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:24,flexWrap:"wrap"}}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started for Free
            </Link>
            <button className="btn btn-ghost btn-lg">
              <span>▶</span> View Demo
            </button>
          </div>
          <div style={{fontFamily: "var(--font-body)",fontSize:14,color:TT, display: "flex", alignItems: "center", gap: 8}}>
            <span style={{width: 8, height: 8, borderRadius: "50%", background: S2}} className="pulse-glow" /> 2,400+ developers leveling up right now
          </div>
        </div>

        {/* Right Visuals */}
        <div style={{flex:1,minWidth:340,position:"relative",height:560,display:"flex",justifyContent:"center",alignItems:"center"}}>
          {/* Glow Effect */}
          <div style={{position:"absolute",width:400,height:400,background:`radial-gradient(circle, ${P}20 0%, transparent 70%)`,filter:"blur(60px)",zIndex:0}}/>
          
          {/* Card 1 */}
          <div className="card-glass" style={{position:"absolute",width:380,padding:32,boxShadow:`0 40px 80px rgba(0,0,0,0.6), 0 0 40px ${P}10`,transform:"rotate(-2deg) translateX(-40px)",animation:"float1 8s ease-in-out infinite",zIndex:2}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
              <div style={{width:48,height:48,borderRadius:12,background:`linear-gradient(135deg,${P},${S2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🤖</div>
              <div>
                <div style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:18,color:TP}}>AI Mentor Review</div>
                <div style={{fontSize:12,color:TS}}>Analyzing architecture...</div>
              </div>
            </div>
            <div style={{background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 20, marginBottom: 24, border: `1px solid ${BD}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                <span style={{color:TS,fontSize:14,fontWeight:500}}>Consistency Score</span>
                <span className="text-code" style={{fontWeight:700,color:S2,fontSize:18}}>9.2/10</span>
              </div>
              <div style={{height:8,background:BG,borderRadius:999,overflow:"hidden"}}><div style={{width:"92%",height:"100%",background:S2,boxShadow:`0 0 15px ${S2}40`}}/></div>
            </div>
            <p className="text-sm" style={{color:TP,fontStyle:"italic",lineHeight:1.8,opacity:0.9}}>
              "Your implementation of the Singleton pattern is correct, but consider using a Proxy for better observability on line 42."
            </p>
          </div>

          {/* Card 2 */}
          <div className="card-glass" style={{position:"absolute",width:280,padding:24,boxShadow:`0 30px 60px rgba(0,0,0,0.5)`,transform:"rotate(6deg) translate(140px,120px)",animation:"float2 10s ease-in-out infinite",zIndex:1}}>
            <div style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:16,color:TP,marginBottom:20}}>Growth Trajectory</div>
            <div style={{height:140,display:"flex",alignItems:"flex-end",gap:8}}>
              {[40,65,45,90,75,100].map((h,i)=>(
                <div key={i} style={{flex:1,height:`${h}%`,background:i===5?P:BD,borderRadius:4,transition:"all 1s ease",boxShadow:i===5?`0 0 20px ${P}40`:""}}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float1{0%,100%{transform:rotate(-2deg) translate(-40px, 0px)}50%{transform:rotate(-2deg) translate(-40px, -20px)}}
        @keyframes float2{0%,100%{transform:rotate(6deg) translate(140px,120px)}50%{transform:rotate(6deg) translate(140px,140px)}}
      `}</style>
    </section>
  );
}

function SocialProof(){
  return(
    <section style={{borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`,padding:"40px 20px",background:"rgba(8,8,16,0.4)",textAlign:"center"}}>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:TS,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600,marginBottom:24}}>Trusted by developers from</p>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:48,flexWrap:"wrap",opacity:0.5}}>
        {["IIT Delhi","BITS Pilani","NIT Surathkal","VIT Vellore","DAIICT"].map(c=>(
          <span key={c} style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:TP,letterSpacing:"-0.5px"}}>{c}</span>
        ))}
      </div>
    </section>
  );
}

function ProblemSection(){
  return(
    <section style={{padding:"120px 40px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:80}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,letterSpacing:"-2px",color:TP,marginBottom:16}}>The gap is real.</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,color:TS,maxWidth:600,margin:"0 auto",lineHeight:1.7}}>
          Every year, thousands of CS graduates fail their first technical interview.
        </p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,position:"relative"}}>
        {/* Dashed line connector */}
        <div style={{position:"absolute",top:"50%",left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${BD} 20%,${BD} 80%,transparent)`,zIndex:0,borderTop:`2px dashed ${TS}`,opacity:0.2}}/>

        {/* Card 1 */}
        <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:40,position:"relative",zIndex:1,transform:"translateY(-16px)",boxShadow:`0 20px 40px rgba(0,0,0,0.3)`}}>
          <div style={{width:56,height:56,borderRadius:12,background:"rgba(255,107,107,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:24,border:`1px solid rgba(255,107,107,0.2)`,boxShadow:`0 0 20px rgba(255,107,107,0.2)`}}>❌</div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12}}>Theory Without Practice</h3>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TS,lineHeight:1.7}}>4 years of lectures. Zero production code experience.</p>
        </div>

        {/* Card 2 */}
        <div style={{background:SF2,border:`1px solid ${BDS}`,borderRadius:16,padding:48,position:"relative",zIndex:2,boxShadow:`0 30px 60px rgba(0,0,0,0.5)`}}>
          <div style={{width:64,height:64,borderRadius:12,background:`linear-gradient(135deg,rgba(123,110,246,0.1),rgba(6,214,160,0.1))`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:24,border:`1px solid rgba(123,110,246,0.3)`,boxShadow:`0 0 30px rgba(123,110,246,0.2)`}}>📊</div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:TP,marginBottom:12}}>Skills That Don't Transfer</h3>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TS,lineHeight:1.7}}>CGPA of 9.2, can't reverse a linked list under pressure.</p>
        </div>

        {/* Card 3 */}
        <div style={{background:SF1,border:`1px solid ${BD}`,borderRadius:16,padding:40,position:"relative",zIndex:1,transform:"translateY(16px)",boxShadow:`0 20px 40px rgba(0,0,0,0.3)`}}>
          <div style={{width:56,height:56,borderRadius:12,background:"rgba(255,179,71,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:24,border:`1px solid rgba(255,179,71,0.2)`,boxShadow:`0 0 20px rgba(255,179,71,0.2)`}}>😤</div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12}}>Rejected Despite Potential</h3>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TS,lineHeight:1.7}}>Interview failed. Not because of intelligence — because of exposure.</p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks(){
  const steps=[
    {num:"01",icon:"📋",col:P,bg:`rgba(123,110,246,0.1)`,br:`rgba(123,110,246,0.3)`,title:"Pick a Project",desc:"Choose from real-world projects sorted by skill and difficulty"},
    {num:"02",icon:"💻",col:TP,bg:SF2,br:BDS,title:"Code in Browser",desc:"Full VS Code-like editor. Multiple languages. Real execution."},
    {num:"03",icon:"🤖",col:S2,bg:`linear-gradient(135deg,rgba(123,110,246,0.1),rgba(6,214,160,0.1))`,br:`rgba(6,214,160,0.3)`,title:"AI Reviews You",desc:"Get feedback like a senior dev would give — specific, actionable, honest."},
    {num:"04",icon:"📈",col:WARN,bg:`rgba(255,179,71,0.1)`,br:`rgba(255,179,71,0.3)`,title:"Track Growth",desc:"See your skills improve across 5 dimensions in real time."},
  ];

  return(
    <section style={{padding:"120px 40px",background:"rgba(14,14,28,0.3)",borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,letterSpacing:"-1px",color:TP,textAlign:"center",marginBottom:80}}>From zero to job-ready.</h2>
        
        <div style={{display:"flex",justifyContent:"space-between",position:"relative",gap:24,flexWrap:"wrap"}}>
          {/* Connecting line */}
          <div style={{position:"absolute",top:32,left:40,right:40,height:2,background:BD,zIndex:0,display:window.innerWidth<768?"none":"block"}}/>

          {steps.map((s,i)=>(
            <div key={i} style={{flex:1,minWidth:240,position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:s.bg,border:`1px solid ${s.br}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:24,boxShadow:`0 0 30px ${s.bg.includes("linear")?"rgba(123,110,246,0.2)":s.bg}`}}>
                {s.icon}
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:s.col,marginBottom:12}}>STEP {s.num}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12}}>{s.title}</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:TS,lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoFeatures(){
  return(
    <section style={{padding:"120px 40px",maxWidth:1200,margin:"0 auto"}}>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,letterSpacing:"-2px",color:TP,marginBottom:48}}>Everything you need to level up.</h2>
      
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,gridAutoRows:"minmax(240px,auto)"}}>
        
        {/* Large 1 */}
        <div style={{gridColumn:"span 2",gridRow:"span 2",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:40,position:"relative",overflow:"hidden",transition:"all 0.3s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(123,110,246,0.4)";e.currentTarget.style.boxShadow=`0 0 60px rgba(123,110,246,0.15)`;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=BD;e.currentTarget.style.boxShadow="none";}}>
          <div style={{position:"absolute",inset:0,backgroundSize:"20px 20px",backgroundImage:"linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px)",opacity:0.5}}/>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:700,color:TP,marginBottom:16,position:"relative",zIndex:1}}>AI Code Review</h3>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TS,lineHeight:1.6,marginBottom:32,position:"relative",zIndex:1}}>Instant, contextual feedback on your exact implementation logic, efficiency, and styling.</p>
          
          <div style={{background:SF2,border:`1px solid ${BD}`,borderRadius:12,padding:20,position:"relative",zIndex:1}}>
            <pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#D0D0EE",margin:0}}>
{`try {
  const data = await api.fetch();
  return data;
} catch(e) {
  console.log(e);
}`}</pre>
            <div style={{position:"absolute",bottom:-20,right:20,background:"rgba(6,214,160,0.15)",border:`1px solid rgba(6,214,160,0.3)`,backdropFilter:"blur(10px)",borderRadius:8,padding:"10px 16px",color:TP,fontSize:13,fontFamily:"'DM Sans',sans-serif",boxShadow:`0 10px 30px rgba(0,0,0,0.5)`}}>
              <span style={{color:S2,fontWeight:700,marginRight:6}}>AI</span>
              Avoid silent catches. Throw a custom error or return a fallback state.
            </div>
          </div>
        </div>

        {/* Medium 1 */}
        <div style={{gridColumn:"span 1",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:32,display:"flex",flexDirection:"column"}}>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12}}>Skill Radar</h3>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg viewBox="0 0 100 100" width="120" height="120">
              <polygon points="50,10 90,40 75,90 25,90 10,40" fill="rgba(123,110,246,0.15)" stroke={P} strokeWidth="1.5"/>
              <circle cx="50" cy="10" r="2" fill={P}/>
              <circle cx="90" cy="40" r="2" fill={S2}/>
              <circle cx="75" cy="90" r="2" fill={WARN}/>
              <circle cx="25" cy="90" r="2" fill={ERR}/>
              <circle cx="10" cy="40" r="2" fill="#4FC3F7"/>
            </svg>
          </div>
        </div>

        {/* Medium 2 */}
        <div style={{gridColumn:"span 1",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:32}}>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:TP,marginBottom:12}}>Real IDE</h3>
          <div style={{background:"#050510",border:`1px solid ${BD}`,borderRadius:8,height:120,padding:12,fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:TS,overflow:"hidden"}}>
            <span style={{color:P}}>function</span> <span style={{color:S2}}>solve</span>() {"{"}<br/>
            &nbsp;&nbsp;<span style={{color:TT}}>// Write code</span><br/>
            &nbsp;&nbsp;<span style={{color:P}}>return</span> <span style={{color:WARN}}>true</span>;<br/>
            {"}"}
            <div style={{width:2,height:12,background:TP,display:"inline-block",animation:"blink 1s infinite"}}/>
          </div>
        </div>

        {/* Small 1 */}
        <div style={{gridColumn:"span 1",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:32,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:16,display:"flex",gap:8}}>
            <span>🚀</span><span style={{transform:"translateY(-8px)"}}>🔥</span><span>🧩</span>
          </div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:TP}}>12 Badges</h3>
        </div>

        {/* Small 2 */}
        <div style={{gridColumn:"span 1",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:32,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12,filter:`drop-shadow(0 0 20px rgba(255,179,71,0.5))`}}>🔥</div>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:TP}}>23 Day Streak</h3>
        </div>

        {/* Large 2 */}
        <div style={{gridColumn:"span 2",background:SF1,border:`1px solid ${BD}`,borderRadius:24,padding:40,display:"flex",alignItems:"center",gap:32,overflow:"hidden"}}>
          <div style={{flex:1}}>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:700,color:TP,marginBottom:16}}>Live Leaderboard</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TS,lineHeight:1.6}}>Compete globally. Build your rep. Get noticed by recruiters.</p>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
            <div style={{width:40,height:80,background:`linear-gradient(180deg,rgba(255,255,255,0.2),transparent)`,borderRadius:"6px 6px 0 0"}}/>
            <div style={{width:40,height:120,background:`linear-gradient(180deg,rgba(255,179,71,0.4),transparent)`,borderRadius:"6px 6px 0 0"}}/>
            <div style={{width:40,height:60,background:`linear-gradient(180deg,rgba(255,107,157,0.3),transparent)`,borderRadius:"6px 6px 0 0"}}/>
          </div>
        </div>

      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

function Testimonials(){
  const ts=[
    {name:"Rahul M.",col:"NIT Trichy",c:"Atlassian",q:"I knew theory, but SkillForge forced me to write production-level code. The AI mentor is brutal but exactly what I needed."},
    {name:"Sneha K.",col:"BITS Pilani",c:"Microsoft",q:"The radar chart showed me my error handling was weak. 2 weeks later, I nailed my system design interview."},
    {name:"Aman P.",col:"VIT",c:"Amazon",q:"Better than LeetCode. Real APIs, real databases, and feedback that actually tells you WHY your code is bad."}
  ];

  return(
    <section style={{padding:"120px 40px",background:"rgba(14,14,28,0.3)",borderTop:`1px solid ${BD}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,letterSpacing:"-1px",color:TP,textAlign:"center",marginBottom:80}}>What developers are saying.</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
          {ts.map((t,i)=>(
            <div key={i} style={{background:SF1,border:`1px solid ${BD}`,borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-10,left:20,fontFamily:"'Syne',sans-serif",fontSize:120,fontWeight:800,color:P,opacity:0.1,lineHeight:1}}>“</div>
              <div style={{display:"flex",gap:4,marginBottom:20,color:WARN,fontSize:14}}>★★★★★</div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,color:TP,lineHeight:1.7,marginBottom:32,position:"relative",zIndex:1}}>"{t.q}"</p>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${P},${S2})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:18,color:"white"}}>{t.name[0]}</div>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:TP,fontSize:16}}>{t.name}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",color:TS,fontSize:13}}>{t.col} · Got hired at <span style={{color:S2,fontWeight:600}}>{t.c}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA(){
  return(
    <section style={{padding:"140px 40px",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(123,110,246,0.2) 0%, transparent 60%)",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:800,letterSpacing:"-2px",color:TP,marginBottom:16}}>Your first project is waiting.</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,color:TS,marginBottom:40}}>Join 2,400+ developers building real skills today.</p>
        <Link to="/register" style={{display:"inline-block",padding:"18px 40px",borderRadius:12,background:`linear-gradient(135deg,${P},${S2})`,color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:600,textDecoration:"none",boxShadow:`0 0 50px rgba(123,110,246,0.4)`,transition:"all 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow=`0 0 70px rgba(123,110,246,0.6)`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 0 50px rgba(123,110,246,0.4)`;}}>
          Start Building Free
        </Link>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:TT,marginTop:20}}>Free forever • No card needed</div>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{borderTop:`1px solid ${BD}`,background:"#05050A",padding:"80px 40px 40px",position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${P},transparent)`,opacity:0.5}}/>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:60}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
            <div style={{color:P,fontSize:20}}>⚡</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18}}><span style={{color:TP}}>Skill</span><span style={{color:P}}>Forge</span></div>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",color:TS,fontSize:14,lineHeight:1.6,maxWidth:240}}>Bridging the gap between academic theory and industry reality.</p>
        </div>
        <div>
          <h4 style={{fontFamily:"'DM Sans',sans-serif",color:TP,fontWeight:600,marginBottom:20}}>Product</h4>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {["Projects","AI Reviews","Leaderboard","Skill Radar"].map(l=><a key={l} href="#" style={{color:TS,textDecoration:"none",fontSize:14}}>{l}</a>)}
          </div>
        </div>
        <div>
          <h4 style={{fontFamily:"'DM Sans',sans-serif",color:TP,fontWeight:600,marginBottom:20}}>Company</h4>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {["About","Careers","Blog","Contact"].map(l=><a key={l} href="#" style={{color:TS,textDecoration:"none",fontSize:14}}>{l}</a>)}
          </div>
        </div>
        <div>
          <h4 style={{fontFamily:"'DM Sans',sans-serif",color:TP,fontWeight:600,marginBottom:20}}>Legal</h4>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {["Privacy","Terms","Cookie Policy"].map(l=><a key={l} href="#" style={{color:TS,textDecoration:"none",fontSize:14}}>{l}</a>)}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",paddingTop:32,borderTop:`1px solid ${BD}`,fontFamily:"'DM Sans',sans-serif",color:TT,fontSize:13,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>© 2026 SkillForge Inc. All rights reserved.</div>
        <div style={{display:"flex",gap:16}}>
          <span>Twitter</span><span>GitHub</span><span>LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}

export default function Landing(){
  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",color:TP,overflowX:"hidden"}}>
      <MeshBackground/>
      <Hero/>
      <SocialProof/>
      <ProblemSection/>
      <HowItWorks/>
      <BentoFeatures/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </div>
  );
}
