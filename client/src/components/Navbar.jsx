import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const P="#7B6EF6",S2="#06D6A0";
const BD="rgba(255,255,255,0.06)";
const TS="#8B8BA8",TP="#F0F0FF";

export default function Navbar(){
  const {user,logout}=useAuth();
  const location=useLocation();
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    const handleScroll=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  // Only show transparent on landing top
  const isLanding=location.pathname==="/";
  const isTransparent=isLanding&&!scrolled;

  return(
    <nav style={{
      position:"fixed",top:0,left:0,right:0,height:64,zIndex:1000,
      background:isTransparent?"transparent":"rgba(8,8,16,0.7)",
      backdropFilter:isTransparent?"none":"blur(20px)",
      WebkitBackdropFilter:isTransparent?"none":"blur(20px)",
      borderBottom:`1px solid ${isTransparent?"transparent":BD}`,
      transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 40px",fontFamily:"'DM Sans',sans-serif"
    }}>
      {/* Logo */}
      <Link to="/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
        <div style={{color:P,fontSize:22,filter:`drop-shadow(0 0 8px rgba(123,110,246,0.5))`}}>⚡</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,letterSpacing:"-0.5px"}}>
          <span style={{color:TP}}>Skill</span>
          <span style={{background:`linear-gradient(135deg,${P},${S2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Forge</span>
        </div>
      </Link>

      {/* Center Links */}
      <div style={{display:"flex",alignItems:"center",gap:32}}>
        {["Features","Projects","Leaderboard","Pricing"].map(l=>(
          <Link key={l} to={`/${l.toLowerCase()}`} style={{fontSize:14,color:TS,textDecoration:"none",fontWeight:500,transition:"color 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=TP} onMouseLeave={e=>e.currentTarget.style.color=TS}>{l}</Link>
        ))}
      </div>

      {/* Right Buttons */}
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        {user?(
          <>
            <Link to="/dashboard" style={{fontSize:14,color:TS,textDecoration:"none",fontWeight:500,transition:"color 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color=TP} onMouseLeave={e=>e.currentTarget.style.color=TS}>Dashboard</Link>
            <button onClick={logout} style={{padding:"8px 16px",borderRadius:8,background:"transparent",border:`1px solid ${BD}`,color:TP,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=BD;}}>Logout</button>
          </>
        ):(
          <>
            <Link to="/login" style={{padding:"8px 16px",borderRadius:8,background:"transparent",border:`1px solid ${BD}`,color:TP,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:"pointer",textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=BD;}}>Sign In</Link>
            <Link to="/register" style={{padding:"8px 20px",borderRadius:10,background:`linear-gradient(135deg,${P},${S2})`,color:"white",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,textDecoration:"none",boxShadow:`0 0 20px rgba(123,110,246,0.25)`,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 30px rgba(123,110,246,0.4)`;e.currentTarget.style.transform="scale(1.02)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow=`0 0 20px rgba(123,110,246,0.25)`;e.currentTarget.style.transform="scale(1)";}}>Start Free</Link>
          </>
        )}
      </div>
    </nav>
  );
}
