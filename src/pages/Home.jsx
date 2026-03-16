import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { COUNTRIES, DOMAINS, getProgress, getStatusColor, fmt } from '../data/countries'

function AggregateStat({ domain }) {
  const vals = COUNTRIES.map(c => c[domain.curField]).filter(v => v != null)
  const tgts = COUNTRIES.map(c => c[domain.tgtField]).filter(v => v != null)
  const avg = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null
  const avgT = tgts.length ? tgts.reduce((a,b)=>a+b,0)/tgts.length : null
  const prog = avg && avgT ? Math.min(100, Math.round(avg/avgT*100)) : null
  const sc = getStatusColor(prog)
  return (
    <div className="card-lift" style={{ background:'white', borderRadius:10, padding:'18px 16px', borderTop:`3px solid ${domain.color}`, boxShadow:'0 1px 12px rgba(10,49,97,.07)' }}>
      <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.82rem', color:domain.color, marginBottom:12 }}>{domain.label}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
        <div style={{ background:domain.bg, borderRadius:7, padding:'10px 12px' }}>
          <div style={{ fontSize:'.6rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:3 }}>Current avg</div>
          <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.3rem', color:domain.color }}>{avg!=null ? fmt(avg,domain.unit) : '—'}</div>
        </div>
        <div style={{ background:'#EDF7EC', borderRadius:7, padding:'10px 12px' }}>
          <div style={{ fontSize:'.6rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:3 }}>Target 2030</div>
          <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.3rem', color:'#3BAA35' }}>{avgT!=null ? fmt(avgT,domain.unit) : '—'}</div>
        </div>
      </div>
      {prog!=null && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.7rem', color:'#888', marginBottom:3 }}>
            <span>Progress to target</span><span style={{ fontWeight:700, color:sc }}>{prog}%</span>
          </div>
          <div className="prog-track"><div className="prog-fill" style={{ width:`${prog}%`, background:sc }}/></div>
          <div style={{ fontSize:'.68rem', color:'#aaa', marginTop:4 }}>{vals.length} countries with data</div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const onTrack = COUNTRIES.filter(c => getProgress(c.elec_access_current, c.elec_access_target) >= 80).length
  const totalPop = COUNTRIES.reduce((s,c) => s + (c.pop_without_elec || 0), 0).toFixed(0)
  const top5 = [...COUNTRIES].sort((a,b) => (b.elec_access_current||0)-(a.elec_access_current||0)).slice(0,6)
  const bottom5 = [...COUNTRIES].filter(c=>c.elec_access_target!=null).sort((a,b) => {
    const ga = (a.elec_access_target||0)-(a.elec_access_current||0)
    const gb = (b.elec_access_target||0)-(b.elec_access_current||0)
    return gb - ga
  }).slice(0,6)

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg,#061D3A 0%,#0A3161 55%,#0D4A7A 100%)', padding:'60px 20px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:500, height:500, borderRadius:'50%', background:'rgba(0,168,150,.06)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-40, width:300, height:300, borderRadius:'50%', background:'rgba(244,180,0,.05)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1140, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,168,150,.12)', border:'1px solid rgba(0,168,150,.3)', borderRadius:20, padding:'5px 16px', marginBottom:18 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#00A896' }}/>
            <span style={{ color:'#00A896', fontFamily:'Montserrat', fontWeight:800, fontSize:'.68rem', letterSpacing:'.16em', textTransform:'uppercase' }}>SEFORALL · MISSION 300</span>
          </div>
          <h1 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'clamp(1.9rem,5vw,3.2rem)', color:'white', lineHeight:1.08, marginBottom:14, maxWidth:680 }}>
            Tracking Africa's<br/><span style={{ color:'#00A896' }}>Energy Commitments</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,.75)', fontSize:'.95rem', lineHeight:1.8, maxWidth:560, marginBottom:34 }}>
            National Energy Compact Progress Tracker — monitoring electricity access, clean cooking, renewable energy and private investment across 30 African countries through 2030.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, maxWidth:640, marginBottom:32 }}>
            {[
              { v: COUNTRIES.length, l: 'countries with NECs' },
              { v: `${totalPop}M`, l: 'people without electricity' },
              { v: '2030', l: 'target year' },
              { v: onTrack, l: 'countries on track' },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:'center', padding:'14px 8px', background:'rgba(255,255,255,.06)', borderRadius:8, border:'1px solid rgba(255,255,255,.1)' }}>
                <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.8rem', color: i===0?'#00A896':i===3?'#3BAA35':'white', lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.6)', marginTop:5 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ fontSize:'.88rem', padding:'11px 26px' }}>Open Dashboard</Link>
            <Link to="/comparison" className="btn btn-outline" style={{ fontSize:'.88rem', padding:'11px 22px', borderColor:'rgba(255,255,255,.4)', color:'white' }}>Country Comparison</Link>
          </div>
        </div>
      </section>

      {/* MISSION 300 DESCRIPTION */}
      <section style={{ background:'white', padding:'52px 20px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          <div>
            <div className="section-label">About the Initiative</div>
            <h2 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.65rem', color:'#0A3161', marginBottom:14 }}>Mission 300</h2>
            <p style={{ color:'#444', fontSize:'.95rem', lineHeight:1.85, marginBottom:14 }}>
              Mission 300 is a landmark initiative led by the <strong>World Bank</strong> and <strong>African Development Bank</strong> to extend electricity access to <strong>300 million people</strong> across Sub-Saharan Africa by 2030.
            </p>
            <p style={{ color:'#555', fontSize:'.88rem', lineHeight:1.85, marginBottom:14 }}>
              Through National Energy Compacts (NECs), participating governments commit to specific, measurable targets for electricity access, clean cooking, renewable energy deployment, and private investment mobilization — creating an accountability framework for tracking progress toward 2030.
            </p>
            <p style={{ color:'#555', fontSize:'.88rem', lineHeight:1.85 }}>
              This platform, maintained by <strong>SEforALL</strong>, centralizes NEC data and provides interactive tools to visualize country-level progress and identify where acceleration is needed.
            </p>
            <div style={{ background:'#FFF8E6', border:'1px solid #F4B400', borderLeft:'4px solid #F4B400', borderRadius:7, padding:'12px 15px', marginTop:18 }}>
              <div style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.7rem', color:'#B8860B', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>Data Notice</div>
              <p style={{ fontSize:'.79rem', color:'#5C4A00', lineHeight:1.65 }}>Data reflects National Energy Compacts as signed. This platform does not constitute an independent performance assessment. Data ownership remains with respective governments and the World Bank / AfDB.</p>
            </div>
          </div>
          <div>
            <div className="section-label">Mission 300 Cohorts</div>
            <h2 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.3rem', color:'#0A3161', marginBottom:14 }}>30 Countries · Two Cohorts</h2>
            {[
              { n:1, label:'Cohort 1', event:'January 2025 · Dar es Salaam', color:'#0A3161', count:12, countries:"Chad · Côte d'Ivoire · DR Congo · Liberia · Madagascar · Malawi · Mauritania · Niger · Nigeria · Senegal · Tanzania · Zambia" },
              { n:2, label:'Cohort 2', event:'Sep–Oct 2025 · UNGA New York + ACMF', color:'#00A896', count:18, countries:'Benin · Botswana · Burundi · Cameroon · Comoros · Rep. Congo · Ethiopia · Gambia · Ghana · Guinea · Kenya · Lesotho · Mozambique · Namibia · São Tomé & Príncipe · Sierra Leone · Togo · Zimbabwe' },
            ].map(c => (
              <div key={c.n} style={{ border:`1px solid ${c.color}22`, borderLeft:`5px solid ${c.color}`, borderRadius:8, padding:'14px 16px', background:`${c.color}06`, marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.95rem', color:c.color }}>{c.label}</div>
                  <span style={{ background:c.color, color:'white', borderRadius:20, padding:'2px 9px', fontSize:'.68rem', fontWeight:700, fontFamily:'Montserrat' }}>{c.count} countries</span>
                </div>
                <div style={{ fontSize:'.76rem', color:'#666', marginBottom:7 }}>{c.event}</div>
                <div style={{ fontSize:'.74rem', color:'#777', lineHeight:1.75 }}>{c.countries}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section style={{ background:'var(--sea-light)', padding:'52px 20px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div className="section-label" style={{ justifyContent:'center', display:'flex' }}>Key Metrics</div>
            <h2 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.55rem', color:'#0A3161' }}>Mission 300 at a Glance</h2>
            <p style={{ color:'#666', marginTop:7, fontSize:'.88rem' }}>Aggregated across all 30 countries — current baseline vs. 2030 commitments</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:16 }}>
            {DOMAINS.map(d => <AggregateStat key={d.key} domain={d}/>)}
          </div>

          {/* Performers */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:20 }}>
            {[
              { title:'Highest Electricity Access', data:top5, color:'#3BAA35', field:'elec_access_current', tgt:'elec_access_target' },
              { title:'Largest Gap to Target', data:bottom5, color:'#E8610A', field:'elec_access_current', tgt:'elec_access_target', gap:true },
            ].map(({title,data,color,field,tgt,gap:isGap}) => (
              <div key={title} className="panel" style={{ padding:'16px 18px' }}>
                <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.82rem', color, marginBottom:10 }}>{title}</div>
                {data.map(c => {
                  const prog = getProgress(c[field], c[tgt])
                  const sc = getStatusColor(prog)
                  const val = isGap ? `${((c[tgt]||0)-(c[field]||0)).toFixed(0)} pts` : `${c[field]}%`
                  return (
                    <div key={c.iso3} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid #F0F4F8' }}>
                      <span className={`ctag ctag-${c.cohort}`}>C{c.cohort}</span>
                      <span style={{ flex:1, fontSize:'.8rem', fontWeight:600, color:'#1A2B3C' }}>{c.name}</span>
                      <span style={{ fontSize:'.78rem', fontFamily:'Montserrat', fontWeight:700, color:isGap?'#E8610A':sc }}>{val}</span>
                      <div style={{ width:44, height:5, background:'#E8EEF4', borderRadius:3, overflow:'hidden' }}>
                        <div style={{ background:sc, height:'100%', width:`${prog||0}%`, borderRadius:3 }}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section style={{ background:'white', padding:'52px 20px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div className="section-label" style={{ justifyContent:'center', display:'flex' }}>Tracking Areas</div>
            <h2 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.55rem', color:'#0A3161' }}>Four Thematic Domains</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:18 }}>
            {[
              { d:DOMAINS[0], desc:'Access rates (%), new connections, population electrified — urban/rural breakdown and gap to 2030 targets.' },
              { d:DOMAINS[1], desc:'Access to clean cooking by technology (LPG, biogas, electric, improved stoves) — current state and 2030 commitments.' },
              { d:DOMAINS[2], desc:'Share of renewables in the electricity mix, installed capacity targets by technology (solar, wind, hydro, battery).' },
              { d:DOMAINS[3], desc:'Private sector investment targets — breakdown by source: World Bank, AfDB, private sector, and other donors.' },
            ].map(({d,desc}) => (
              <div key={d.key} className="card-lift" style={{ background:'white', borderRadius:10, padding:'22px 18px', borderTop:`3px solid ${d.color}`, boxShadow:'0 1px 12px rgba(10,49,97,.07)' }}>
                <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.95rem', color:d.color, marginBottom:9 }}>{d.label}</div>
                <p style={{ fontSize:'.82rem', color:'#555', lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:26 }}>
            <Link to="/dashboard" className="btn btn-navy" style={{ fontSize:'.88rem', padding:'11px 26px' }}>Open Dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
