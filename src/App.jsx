import React from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useStore } from './store/useStore'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Comparison from './pages/Comparison'
import Methodology from './pages/Methodology'

function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = React.useState(false)
  const LINKS = [
    { to:'/', label:'Home' },
    { to:'/dashboard', label:'Dashboard' },
    { to:'/comparison', label:'Comparison' },
    { to:'/methodology', label:'Methodology' },
  ]
  return (
    <header style={{ background:'linear-gradient(90deg,#061D3A 0%,#0A3161 100%)', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 16px rgba(0,0,0,.3)' }}>
      <div style={{ maxWidth:1360, margin:'0 auto', padding:'0 20px', height:58, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:6, background:'rgba(0,168,150,.2)', border:'1.5px solid rgba(0,168,150,.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A896" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'.95rem', color:'white', letterSpacing:'.03em', lineHeight:1 }}>M300 NEC TRACKER</div>
            <div style={{ fontSize:'.58rem', color:'rgba(255,255,255,.55)', letterSpacing:'.14em', marginTop:1 }}>SEFORALL · MISSION 300</div>
          </div>
        </Link>
        <nav style={{ display:'flex', alignItems:'center', gap:2 }} className="hidden md:flex">
          {LINKS.map(l => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)
            return (
              <Link key={l.to} to={l.to} style={{
                color: active ? '#00A896' : 'rgba(255,255,255,.8)',
                borderBottom: active ? '2px solid #00A896' : '2px solid transparent',
                fontFamily:'Montserrat', fontWeight:700, fontSize:'.76rem', letterSpacing:'.08em',
                textTransform:'uppercase', padding:'6px 14px', textDecoration:'none', transition:'all .18s',
              }}>{l.label}</Link>
            )
          })}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background:'none', border:'none', color:'white', cursor:'pointer', padding:4 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/></svg>
        </button>
      </div>
      {open && (
        <div style={{ background:'#061D3A', borderTop:'1px solid rgba(255,255,255,.08)', padding:'10px 20px 16px' }}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ display:'block', color:'white', fontFamily:'Montserrat', fontWeight:700, fontSize:'.85rem', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,.06)', textDecoration:'none' }}>{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background:'#061D3A', color:'rgba(255,255,255,.55)', marginTop:'auto' }}>
      <div style={{ maxWidth:1360, margin:'0 auto', padding:'20px 24px', display:'flex', flexWrap:'wrap', gap:12, justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontFamily:'Montserrat', fontWeight:800, color:'white', fontSize:'.88rem' }}>SEforALL · M300 NEC Tracker</div>
          <div style={{ fontSize:'.72rem', marginTop:3 }}>© 2025 Sustainable Energy for All · Data: World Bank / AfDB Mission 300</div>
        </div>
        <div style={{ fontSize:'.7rem', maxWidth:440, textAlign:'right', lineHeight:1.6 }}>
          Data reflects NECs as signed. Not an independent performance assessment.<br/>Ownership remains with respective governments and the World Bank / AfDB.
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <Navbar/>
        <main style={{ flex:1 }}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/comparison" element={<Comparison/>}/>
            <Route path="/methodology" element={<Methodology/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}
