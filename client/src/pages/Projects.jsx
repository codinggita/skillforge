import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectsApi } from "../api/client";
import Navbar from "../components/Navbar";

const P="#7B6EF6",S2="#06D6A0",WARN="#FFB347",ERR="#FF6B6B";
const BG="#080810",SF1="#0E0E1C",SF2="#141428";
const TS="#8B8BA8",TT="#4A4A68",BD="rgba(255,255,255,0.06)";

const DIFF_COLORS={easy:S2,medium:WARN,hard:ERR,beginner:S2,intermediate:WARN,advanced:ERR};
const DIFF_GRADIENT={easy:`linear-gradient(90deg,${S2},#4FC3F7)`,medium:`linear-gradient(90deg,${WARN},#FF6B9D)`,hard:`linear-gradient(90deg,${ERR},#FF6B9D)`};

const MOCK=[
  {_id:"p1",title:"Array Reversal",description:"Reverse an array in-place without extra memory. Classic interview warm-up.",difficulty:"easy",category:"DSA",tags:["Arrays","Two Pointer"],timeLimit:30,xpReward:40},
  {_id:"p2",title:"FizzBuzz Pro",description:"Classic FizzBuzz with a twist — custom divisors and configurable output strings.",difficulty:"easy",category:"DSA",tags:["Loops","Conditionals"],timeLimit:20,xpReward:30},
  {_id:"p3",title:"String Palindrome",description:"Determine if a string is a palindrome, ignoring non-alphanumeric characters.",difficulty:"easy",category:"DSA",tags:["Strings","Two Pointer"],timeLimit:25,xpReward:35},
  {_id:"p4",title:"Auth Middleware",description:"Build JWT authentication middleware for an Express API with refresh token rotation.",difficulty:"medium",category:"Web Dev",tags:["JWT","Express","Security"],timeLimit:45,xpReward:60},
  {_id:"p5",title:"Todo REST API",description:"Full CRUD API with filtering, pagination, and proper error handling using Express + MongoDB.",difficulty:"medium",category:"Web Dev",tags:["REST","MongoDB","Express"],timeLimit:60,xpReward:70},
  {_id:"p6",title:"Rate Limiter",description:"Implement a sliding window rate limiter from scratch using Redis-like in-memory storage.",difficulty:"medium",category:"System Design",tags:["Algorithms","Data Structures"],timeLimit:50,xpReward:65},
  {_id:"p7",title:"LRU Cache",description:"Implement an O(1) LRU cache using doubly linked list and hash map.",difficulty:"hard",category:"DSA",tags:["Linked List","HashMap","Design"],timeLimit:60,xpReward:80},
  {_id:"p8",title:"Event Emitter",description:"Build a Node.js-style event emitter with on(), off(), emit(), and once() methods.",difficulty:"hard",category:"System Design",tags:["Design Patterns","OOP"],timeLimit:55,xpReward:75},
  {_id:"p9",title:"Promise.all",description:"Implement Promise.all, Promise.race, and Promise.allSettled from scratch.",difficulty:"hard",category:"Web Dev",tags:["Async","Promises","JavaScript"],timeLimit:45,xpReward:70},
];

const FILTERS=["All","Easy","Medium","Hard"];
const CATS=["All","DSA","Web Dev","System Design","Debugging"];

function ScoreChip({score}){
  const c=score>=9?S2:score>=7?P:score>=5?WARN:ERR;
  return <span style={{padding:"2px 8px",borderRadius:6,background:`${c}18`,color:c,fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:600}}>{score}/10</span>;
}

function ProjectCard({project,idx}){
  const [hov,setHov]=useState(false);
  const diff=project.difficulty?.toLowerCase()||"easy";
  const dc=DIFF_COLORS[diff]||P;
  const dg=DIFF_GRADIENT[diff]||`linear-gradient(90deg,${P},${S2})`;
  const completed=project.myScore!=null;

  return(
    <div style={{background:SF1,border:`1px solid ${hov?"rgba(123,110,246,0.28)":BD}`,borderRadius:16,overflow:"hidden",transition:"all 0.22s ease",transform:hov?"translateY(-5px)":"none",boxShadow:hov?"0 24px 50px rgba(0,0,0,0.5),0 0 40px rgba(123,110,246,0.09)":"none",display:"flex",flexDirection:"column",animation:`fadeUp 0.5s ease ${idx*0.06}s both`}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {/* Top stripe */}
      <div style={{height:4,background:dg}}/>
      <div style={{padding:"20px 20px 16px",flex:1,display:"flex",flexDirection:"column"}}>
        {/* Header row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <span style={{padding:"3px 8px",borderRadius:6,background:"rgba(255,255,255,0.06)",color:TS,fontSize:11,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"}}>{project.category||"DSA"}</span>
          <span style={{padding:"3px 9px",borderRadius:6,fontSize:11,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase",background:`${dc}18`,color:dc,border:`1px solid ${dc}33`}}>{project.difficulty||"Easy"}</span>
        </div>
        {/* Title */}
        <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:8,color:"#F0F0FF",lineHeight:1.25}}>{project.title}</h3>
        {/* Description */}
        <p style={{color:TS,fontSize:14,lineHeight:1.65,marginBottom:14,flex:1,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{project.description}</p>
        {/* Tags */}
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {(project.tags||[]).slice(0,3).map(t=>(
            <span key={t} style={{padding:"3px 9px",borderRadius:999,background:"rgba(255,255,255,0.05)",border:`1px solid ${BD}`,color:TT,fontSize:11}}>{t}</span>
          ))}
        </div>
        {/* Meta row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <span style={{color:TT,fontSize:13}}>⏱ {project.timeLimit||45} min</span>
          <span style={{color:WARN,fontSize:13,fontWeight:600}}>⚡ +{project.xpReward||50} XP</span>
        </div>
        {/* Action */}
        {completed?(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:10,background:"rgba(6,214,160,0.06)",border:"1px solid rgba(6,214,160,0.15)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:S2,fontSize:16}}>✓</span>
              <span style={{color:S2,fontSize:13,fontWeight:600}}>Completed</span>
              <ScoreChip score={project.myScore}/>
            </div>
            <Link to={`/project/${project._id}`} style={{color:TS,fontSize:13,textDecoration:"none",border:`1px solid ${BD}`,padding:"4px 12px",borderRadius:7,transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#F0F0FF"} onMouseLeave={e=>e.currentTarget.style.color=TS}>Again</Link>
          </div>
        ):(
          <Link to={`/project/${project._id}`} style={{display:"block",width:"100%",padding:"11px",borderRadius:10,textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14,color:"white",textDecoration:"none",background:hov?`linear-gradient(135deg,${P},${S2})`:"rgba(255,255,255,0.04)",border:`1px solid ${hov?"transparent":BD}`,boxShadow:hov?"0 0 28px rgba(123,110,246,0.4)":"none",transition:"all 0.22s ease"}}>
            {hov?"Start Project →":"View Project"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Projects(){
  const [projects,setProjects]=useState([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [diff,setDiff]=useState("All");
  const [cat,setCat]=useState("All");

  useEffect(()=>{
    projectsApi.list().then(d=>setProjects(d?.data?.projects||d?.projects||MOCK)).catch(()=>setProjects(MOCK)).finally(()=>setLoading(false));
  },[]);

  const filtered=(projects.length?projects:MOCK).filter(p=>{
    const d=p.difficulty?.toLowerCase()||"";
    const matchD=diff==="All"||d===diff.toLowerCase();
    const matchC=cat==="All"||(p.category||"").toLowerCase().includes(cat.toLowerCase());
    const matchS=!search||p.title.toLowerCase().includes(search.toLowerCase())||p.description?.toLowerCase().includes(search.toLowerCase());
    return matchD&&matchC&&matchS;
  });

  const FilterBtn=({label,active,onClick})=>(
    <button onClick={onClick} style={{padding:"7px 16px",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:13,cursor:"pointer",border:`1px solid ${active?"transparent":BD}`,background:active?"linear-gradient(135deg,#7B6EF6,#06D6A0)":"transparent",color:active?"white":TS,boxShadow:active?"0 0 16px rgba(123,110,246,0.3)":"none",transition:"all 0.2s ease"}}
      onMouseEnter={e=>{if(!active)e.currentTarget.style.color="#F0F0FF";}}
      onMouseLeave={e=>{if(!active)e.currentTarget.style.color=TS;}}
    >{label}</button>
  );

  return(
    <div style={{minHeight:"100vh",background:BG,paddingTop:80,fontFamily:"'DM Sans',sans-serif"}}>
      <Navbar/>
      {/* Ambient */}
      <div style={{position:"fixed",top:0,right:0,width:500,height:500,background:"radial-gradient(ellipse,rgba(123,110,246,0.08) 0%,transparent 65%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 32px",position:"relative",zIndex:1}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:40}}>
          <div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:38,fontWeight:800,letterSpacing:"-1.5px",marginBottom:8}}>Project Library</h1>
            <p style={{color:TS,fontSize:16}}>Build real skills through real work.</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {[`${filtered.length} Projects`,"3 Languages","Updated daily"].map(s=>(
              <span key={s} style={{padding:"6px 14px",borderRadius:8,background:"rgba(123,110,246,0.08)",border:"1px solid rgba(123,110,246,0.15)",color:P,fontSize:13,fontWeight:500}}>{s}</span>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div style={{background:"rgba(8,8,16,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:`1px solid ${BD}`,borderRadius:14,padding:"14px 20px",marginBottom:32,display:"flex",alignItems:"center",flexWrap:"wrap",gap:12}}>
          {/* Search */}
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:TT,fontSize:15}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects..."
              style={{width:"100%",background:SF1,border:`1px solid ${BD}`,borderRadius:8,padding:"9px 12px 9px 36px",color:"#F0F0FF",fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none"}}
              onFocus={e=>{e.target.style.borderColor=P;e.target.style.boxShadow=`0 0 0 3px rgba(123,110,246,0.15)`;}}
              onBlur={e=>{e.target.style.borderColor=BD;e.target.style.boxShadow="none";}}
            />
          </div>
          <div style={{width:1,height:28,background:BD}}/>
          {/* Difficulty */}
          <div style={{display:"flex",gap:6}}>
            {FILTERS.map(f=><FilterBtn key={f} label={f} active={diff===f} onClick={()=>setDiff(f)}/>)}
          </div>
          <div style={{width:1,height:28,background:BD}}/>
          {/* Category */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {CATS.map(c=><FilterBtn key={c} label={c} active={cat===c} onClick={()=>setCat(c)}/>)}
          </div>
        </div>

        {/* Grid */}
        {loading?(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[...Array(9)].map((_,i)=>(
              <div key={i} style={{background:SF1,border:`1px solid ${BD}`,borderRadius:16,height:340,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",animation:"shimmer 1.5s infinite"}}/>
              </div>
            ))}
          </div>
        ):filtered.length===0?(
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <div style={{fontSize:56,marginBottom:16}}>🔍</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,marginBottom:10}}>No projects match your filter</h3>
            <p style={{color:TS,fontSize:15,marginBottom:24}}>Try removing some filters to discover more projects.</p>
            <button onClick={()=>{setSearch("");setDiff("All");setCat("All");}}
              style={{padding:"10px 24px",borderRadius:10,border:`1px solid ${BD}`,background:SF2,color:"#F0F0FF",fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:14,cursor:"pointer"}}>Reset Filters</button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
            {filtered.map((p,i)=><ProjectCard key={p._id} project={p} idx={i}/>)}
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}
