import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B",INFO="#4FC3F7";
const BG="#080810",SF1="#0E0E1C",SF2="#141428",DARK="#0A0A18";
const TS="#8B8BA8",TT="#4A4A68",TP="#F0F0FF";
const BD="rgba(255,255,255,0.06)",BDS="rgba(255,255,255,0.12)";

const GOLD="linear-gradient(135deg, #FFD700, #FFA500)";
const SILVER="linear-gradient(135deg, #E0E0E0, #9E9E9E)";
const BRONZE="linear-gradient(135deg, #CD7F32, #8B4513)";

const TOP_3=[
  {r:2,n:"Sneha K.",c:"BITS Pilani",xp:14250,sc:9.1,g:SILVER,h:120,sym:"🥈"},
  {r:1,n:"Arjun P.",c:"DAIICT",xp:15800,sc:9.4,g:GOLD,h:160,sym:"👑"},
  {r:3,n:"Rahul M.",c:"NIT Trichy",xp:13900,sc:8.8,g:BRONZE,h:80,sym:"🥉"},
];

const LEADERBOARD=Array.from({length:47}).map((_,i)=>{
  const r=i+4;
  return{
    r,
    n:r===34?"You":`Dev User ${r}`,
    c:["VIT","IIT Bombay","BITS Goa","DAIICT","NIT Surathkal"][r%5],
    prj:Math.floor(40-r*0.5),
    sc:(9.0-r*0.05).toFixed(1),
    xp:Math.floor(13000-r*100),
    move:r%3===0?"up":r%4===0?"down":"same",
    isMe:r===34
  };
});

function scoreCol(s){if(s>=9)return S2;if(s>=7)return P;if(s>=5)return WARN;return ERR;}

export default function Leaderboard(){
  const [filter,setFilter]=useState("This Month");
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setConfetti(Array.from({length:20}).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotate: Math.random() * 360,
        delay: 2 + Math.random() * 2
      })));
    }, 0);
  }, []);

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'DM Sans',sans-serif",color:TP,paddingBottom:120,overflowX:"hidden"}}>
      <Navbar/>

      <div style={{paddingTop:100,maxWidth:1000,margin:"0 auto",paddingLeft:20,paddingRight:20}}>
        
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60,flexWrap:"wrap",gap:24}}>
          <div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:TP,marginBottom:8}}>Leaderboard</h1>
            <p style={{fontSize:15,color:TS}}>The best developers. Measured. Ranked. Recognized.</p>
          </div>
          <div style={{display:"flex",background:SF1,border:`1px solid ${BD}`,borderRadius:999,padding:4}}>
            {["This Week","This Month","All Time"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"8px 16px",borderRadius:999,background:filter===f?`linear-gradient(135deg,${P},${S2})`:"transparent",color:filter===f?"white":TS,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",boxShadow:filter===f?`0 0 20px rgba(123,110,246,0.3)`:"none",transition:"all 0.2s"}}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:16,marginBottom:60,height:320,position:"relative"}}>
          
          {/* Confetti background for 1st place */}
          <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:300,height:200,pointerEvents:"none"}}>
            {confetti.map((c,i)=>(
              <div key={i} style={{position:"absolute",width:6,height:12,background:[P,S2,WARN,TP][i%4],left:`${c.left}%`,top:`${c.top}%`,transform:`rotate(${c.rotate}deg)`,opacity:0.6,animation:`fall ${c.delay}s linear infinite`}}/>
            ))}
          </div>

          {TOP_3.map(t=>{
            const is1=t.r===1;
            return(
              <div key={t.r} style={{display:"flex",flexDirection:"column",alignItems:"center",width:160,zIndex:is1?10:1}}>
                <div style={{fontSize:is1?32:20,marginBottom:8,filter:`drop-shadow(0 0 10px rgba(255,215,0,0.5))`}}>{t.sym}</div>
                <div style={{width:is1?80:64,height:is1?80:64,borderRadius:"50%",background:t.g,padding:4,marginBottom:12,boxShadow:is1?`0 0 30px rgba(255,215,0,0.4)`:`0 0 16px rgba(255,255,255,0.1)`}}>
                  <div style={{width:"100%",height:"100%",background:BG,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:is1?28:20,color:TP}}>{t.n[0]}</div>
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:is1?20:16,fontWeight:800,color:TP,marginBottom:4}}>{t.n}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:TS,marginBottom:8}}>{t.c}</div>
                <div style={{padding:"2px 8px",borderRadius:6,background:t.g,color:BG,fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,marginBottom:16,boxShadow:`0 4px 10px rgba(0,0,0,0.3)`}}>
                  {t.xp.toLocaleString()} XP
                </div>
                
                {/* Podium Block */}
                <div style={{width:"100%",height:t.h,background:t.g,borderRadius:"8px 8px 0 0",position:"relative",overflow:"hidden",display:"flex",justifyContent:"center",paddingTop:12,boxShadow:`inset 0 10px 20px rgba(255,255,255,0.2), 0 20px 40px rgba(0,0,0,0.5)`}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)"}}/>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:BG,opacity:0.5}}>{t.r}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Table */}
        <div style={{background:SF1,borderRadius:16,border:`1px solid ${BD}`,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"60px 2fr 1.5fr 1fr 1fr 1fr",padding:"16px 20px",borderBottom:`1px solid ${BD}`,background:SF2,fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,color:TT,textTransform:"uppercase",letterSpacing:"0.05em"}}>
            <div>Rank</div>
            <div>Developer</div>
            <div>College</div>
            <div style={{textAlign:"center"}}>Projects</div>
            <div style={{textAlign:"center"}}>Avg Score</div>
            <div style={{textAlign:"right"}}>Total XP</div>
          </div>

          <div style={{display:"flex",flexDirection:"column"}}>
            {LEADERBOARD.map(u=>(
              <div key={u.r} style={{
                display:"grid",gridTemplateColumns:"60px 2fr 1.5fr 1fr 1fr 1fr",padding:"0 20px",height:56,alignItems:"center",
                borderBottom:`1px solid ${BD}`,background:u.isMe?`rgba(123,110,246,0.08)`:"transparent",
                borderLeft:u.isMe?`3px solid ${P}`:"3px solid transparent",
                transition:"background 0.2s"
              }} onMouseEnter={e=>{if(!u.isMe)e.currentTarget.style.background=SF2}} onMouseLeave={e=>{if(!u.isMe)e.currentTarget.style.background="transparent"}}>
                
                {/* Rank */}
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:600,color:u.isMe?P:TP}}>{u.r}</span>
                  <span style={{fontSize:10,color:u.move==="up"?S2:u.move==="down"?ERR:TT}}>
                    {u.move==="up"?"↑2":u.move==="down"?"↓1":"-"}
                  </span>
                </div>

                {/* Developer */}
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:SF2,border:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:TP}}>
                    {u.n[0]}
                  </div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:u.isMe?700:500,color:u.isMe?TP:TS}}>
                    {u.n}
                  </div>
                </div>

                {/* College */}
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:TS}}>
                  {u.c}
                </div>

                {/* Projects */}
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:TP,textAlign:"center"}}>
                  {u.prj}
                </div>

                {/* Avg Score */}
                <div style={{textAlign:"center"}}>
                  <span style={{padding:"4px 8px",borderRadius:6,background:`${scoreCol(u.sc)}15`,border:`1px solid ${scoreCol(u.sc)}30`,color:scoreCol(u.sc),fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600}}>
                    {u.sc}
                  </span>
                </div>

                {/* XP */}
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:600,color:WARN,textAlign:"right"}}>
                  {u.xp.toLocaleString()}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Rank Card */}
      <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:600,padding:"0 20px",zIndex:50}}>
        <div style={{background:"rgba(14,14,28,0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:`1px solid ${P}40`,borderRadius:16,padding:"20px 24px",boxShadow:`0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(123,110,246,0.15)`,display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:TP}}>You are ranked <span style={{color:P}}>#34</span> globally</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:TS}}>Keep your streak to climb the ranks 🔥</div>
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontFamily:"'DM Sans',sans-serif",fontSize:12,color:TT,fontWeight:600}}>
              <span>Current: 9,600 XP</span>
              <span style={{color:TP}}>1,200 XP away from Top 10</span>
            </div>
            <div style={{height:6,background:SF2,borderRadius:999,overflow:"hidden"}}>
              <div style={{height:"100%",width:`75%`,background:`linear-gradient(90deg,${P},${S2})`,borderRadius:999}}/>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity:0; }
          10% { opacity:0.8; }
          100% { transform: translateY(200px) rotate(360deg); opacity:0; }
        }
      `}</style>
    </div>
  );
}
