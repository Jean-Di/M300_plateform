import React, { useState, useMemo } from 'react'
import { useStore } from '../store/useStore'
import { COUNTRIES, DOMAINS, INDICATOR_META, INDICATOR_CATEGORIES, getProgress, getStatusColor, fmt } from '../data/countries'
import AfricaMap from '../components/Map/AfricaMap'
import CountryPanel from '../components/CountryPanel/CountryPanel'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'

const DISPLAY_MODES = [
  { v:'current', l:'Current Values' },
  { v:'target',  l:'2030 Targets' },
  { v:'progress',l:'Progress (%)' },
  { v:'gap',     l:'Gap to Target' },
]

function SummaryKPI({ domain, countries }) {
  const vals = domain.curField ? countries.map(c => c[domain.curField]).filter(v=>v!=null) : []
  const tgts = domain.tgtField ? countries.map(c => c[domain.tgtField]).filter(v=>v!=null) : []
  const avg = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null
  const avgT = tgts.length ? tgts.reduce((a,b)=>a+b,0)/tgts.length : null
  const prog = avg && avgT ? Math.min(100,Math.round(avg/avgT*100)) : null
  const sc = getStatusColor(prog)
  return (
    <div className="card-lift" style={{ background:'white', borderRadius:9, padding:'14px 14px', borderTop:`3px solid ${domain.color}`, boxShadow:'0 1px 8px rgba(10,49,97,.06)' }}>
      <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.76rem', color:domain.color, marginBottom:9 }}>{domain.label}</div>
      <div style={{ display:'flex', gap:10, marginBottom:8 }}>
        <div style={{ flex:1, background:domain.bg, borderRadius:6, padding:'8px' }}>
          <div style={{ fontSize:'.6rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:2 }}>Current</div>
          <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.15rem', color:domain.color }}>{avg!=null?fmt(avg,domain.unit):'—'}</div>
        </div>
        <div style={{ flex:1, background:'#EDF7EC', borderRadius:6, padding:'8px' }}>
          <div style={{ fontSize:'.6rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:2 }}>Target</div>
          <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.15rem', color:'#3BAA35' }}>{avgT!=null?fmt(avgT,domain.unit):'—'}</div>
        </div>
      </div>
      {prog!=null && (
        <>
          <div className="prog-track"><div className="prog-fill" style={{ width:`${prog}%`, background:sc }}/></div>
          <div style={{ fontSize:'.66rem', color:sc, fontWeight:700, marginTop:4, textAlign:'right' }}>{prog}%</div>
        </>
      )}
    </div>
  )
}

function DataTable({ countries }) {
  return (
    <div style={{ overflowX:'auto', maxHeight:400, overflowY:'auto' }}>
      <table className="tbl" style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead style={{ position:'sticky', top:0 }}>
          <tr>
            <th style={{ textAlign:'left' }}>Country</th>
            <th>Cohort</th>
            <th>Elec. Access</th>
            <th>Clean Cooking</th>
            <th>Renew. Share</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(c => {
            const prog = getProgress(c.elec_access_current, c.elec_access_target)
            const sc = getStatusColor(prog)
            const statusLabel = prog>=80?'On Track':prog>=50?'To Watch':'Behind'
            const statusCls = prog>=80?'badge-on-track':prog>=50?'badge-to-watch':'badge-behind'
            return (
              <tr key={c.iso3}>
                <td style={{ fontWeight:600, color:'#0A3161' }}>{c.name}</td>
                <td style={{ textAlign:'center' }}><span className={`ctag ctag-${c.cohort}`}>C{c.cohort}</span></td>
                <td style={{ textAlign:'center', fontFamily:'Montserrat', fontWeight:700 }}>
                  <span style={{ color:'#0A3161' }}>{c.elec_access_current!=null?`${c.elec_access_current}%`:'—'}</span>
                  <span style={{ color:'#3BAA35', fontSize:'.72rem' }}> / {c.elec_access_target!=null?`${c.elec_access_target}%`:'—'}</span>
                </td>
                <td style={{ textAlign:'center', fontFamily:'Montserrat', fontWeight:700, color:'#E8610A' }}>{c.cooking_current!=null?`${c.cooking_current}%`:'—'}</td>
                <td style={{ textAlign:'center', fontFamily:'Montserrat', fontWeight:700, color:'#3BAA35' }}>{c.renew_share_current!=null?`${c.renew_share_current}%`:'—'}</td>
                <td>
                  {prog!=null ? (
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <div className="prog-track" style={{ flex:1, height:5 }}><div className="prog-fill" style={{ width:`${prog}%`, background:sc }}/></div>
                      <span style={{ fontSize:'.7rem', fontWeight:700, color:sc, minWidth:30 }}>{prog}%</span>
                    </div>
                  ) : '—'}
                </td>
                <td style={{ textAlign:'center' }}><span className={`badge ${statusCls}`}>{statusLabel}</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function RankingsTab({ countries }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
      {[
        { title:'Electricity Access', cf:'elec_access_current', tf:'elec_access_target', color:'#0A3161', unit:'%' },
        { title:'Clean Cooking', cf:'cooking_current', tf:'cooking_target', color:'#E8610A', unit:'%' },
        { title:'Renewable Share', cf:'renew_share_current', tf:'renew_share_target', color:'#3BAA35', unit:'%' },
        { title:'Private Capital Target', cf:null, tf:'invest_private_B', color:'#5C2D91', unit:'$B' },
      ].map(r => {
        const data = [...countries].filter(c=>c[r.cf||r.tf]!=null)
          .sort((a,b)=>(b[r.cf||r.tf]||0)-(a[r.cf||r.tf]||0)).slice(0,8)
          .map(c => ({ name:c.name.split(' ')[0].slice(0,9), val:c[r.cf||r.tf], cohort:c.cohort }))
        return (
          <div key={r.title} className="panel" style={{ padding:'12px 14px' }}>
            <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.78rem', color:r.color, marginBottom:9 }}>{r.title}</div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={data} layout="vertical" margin={{ left:0, right:30, top:0, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F4F8"/>
                <XAxis type="number" tick={{ fontSize:9 }} unit={r.unit==='%'?'%':''}/>
                <YAxis dataKey="name" type="category" width={68} tick={{ fontSize:9 }}/>
                <Tooltip formatter={(v,n) => [`${v?.toFixed(1)}${r.unit==='%'?'%':' '+r.unit}`, n]}/>
                <Bar dataKey="val" name="Value" radius={[0,3,3,0]} barSize={14}>
                  {data.map((d,i) => <Cell key={i} fill={d.cohort===1?r.color:`${r.color}88`}/>)}
                  <LabelList dataKey="val" position="right" style={{ fontSize:9, fontWeight:700, fill:r.color }} formatter={v => v!=null?`${v.toFixed(0)}${r.unit==='%'?'%':''}`:''} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </div>
  )
}

function ScorecardTab({ countries }) {
  return (
    <div style={{ overflowX:'auto' }}>
      <table className="tbl" style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign:'left' }}>Country</th>
            <th>Cohort</th>
            {DOMAINS.map(d => <th key={d.key}>{d.label.split(' ')[0]}</th>)}
            <th>Overall</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(c => {
            const scores = DOMAINS.map(d => d.curField ? getProgress(c[d.curField], c[d.tgtField]) : null)
            const valid = scores.filter(s=>s!=null)
            const overall = valid.length ? Math.round(valid.reduce((a,b)=>a+b,0)/valid.length) : null
            return (
              <tr key={c.iso3}>
                <td style={{ fontWeight:600, fontSize:'.8rem' }}>{c.name}</td>
                <td style={{ textAlign:'center' }}><span className={`ctag ctag-${c.cohort}`}>C{c.cohort}</span></td>
                {scores.map((s,i) => {
                  const sc = getStatusColor(s)
                  return (
                    <td key={i} style={{ textAlign:'center' }}>
                      {s!=null ? (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                          <span style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.78rem', color:sc }}>{s}%</span>
                          <div style={{ width:34, background:'#E8EEF4', height:4, borderRadius:2, overflow:'hidden' }}>
                            <div style={{ background:sc, height:'100%', width:`${s}%` }}/>
                          </div>
                        </div>
                      ) : <span style={{ color:'#ccc' }}>—</span>}
                    </td>
                  )
                })}
                <td style={{ textAlign:'center' }}>
                  {overall!=null ? <span className={`badge ${overall>=80?'badge-on-track':overall>=50?'badge-to-watch':'badge-behind'}`}>{overall}%</span> : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CoverageTab({ countries }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:10 }}>
      {countries.map(c => {
        const filled = DOMAINS.filter(d => d.curField && c[d.curField]!=null).length
        const pct = Math.round(filled/DOMAINS.length*100)
        const sc = getStatusColor(pct)
        return (
          <div key={c.iso3} className="panel" style={{ padding:'11px 13px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:7 }}>
              <div>
                <div style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.8rem', color:'#0A3161' }}>{c.name}</div>
                <span className={`ctag ctag-${c.cohort}`} style={{ marginTop:3, display:'inline-block' }}>C{c.cohort}</span>
              </div>
              <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'.95rem', color:sc }}>{pct}%</div>
            </div>
            <div style={{ display:'flex', gap:3 }}>
              {DOMAINS.map((d,i) => (
                <div key={i} title={d.label} style={{ flex:1, height:4, borderRadius:2, background: (d.curField&&c[d.curField]!=null) ? d.color : '#E0E0E0' }}/>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Dashboard() {
  const { selectedIso3, setSelectedIso3, selectedCohort, setSelectedCohort } = useStore()
  const [tab, setTab] = useState('map')
  const [displayMode, setDisplayMode] = useState('current')
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0])

  const filtered = useMemo(() => {
    return selectedCohort === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.cohort === +selectedCohort)
  }, [selectedCohort])

  const mapField = useMemo(() => {
    if (displayMode === 'target') return activeDomain.tgtField
    if (displayMode === 'progress') return activeDomain.curField
    return activeDomain.curField
  }, [displayMode, activeDomain])

  const TABS = [
    { id:'map', l:'Map' },
    { id:'table', l:'Data Table' },
    { id:'rankings', l:'Rankings' },
    { id:'scorecard', l:'Scorecard' },
    { id:'coverage', l:'Data Coverage' },
  ]

  return (
    <div className="page-enter" style={{ maxWidth:1360, margin:'0 auto', padding:'18px 16px' }}>
      <div style={{ marginBottom:12 }}>
        <h1 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.45rem', color:'#0A3161', marginBottom:2 }}>NEC Dashboard</h1>
        <p style={{ fontSize:'.8rem', color:'#666' }}>National Energy Compact Progress Tracker · Mission 300 · {filtered.length} countries</p>
      </div>

      {/* Disclaimer */}
      <div style={{ background:'#FEFAF0', border:'1px solid #F4B400', borderLeft:'4px solid #F4B400', borderRadius:7, padding:'8px 13px', marginBottom:14, fontSize:'.74rem', color:'#5C4A00', lineHeight:1.6 }}>
        <strong>Data Notice:</strong> Data reflects NECs as signed. Ownership remains with respective governments and the World Bank / AfDB. SEforALL acts as facilitator.
      </div>

      {/* Domain KPI summary row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:14 }}>
        {DOMAINS.map(d => <SummaryKPI key={d.key} domain={d} countries={filtered}/>)}
      </div>

      {/* Domain selector */}
      <div style={{ display:'flex', gap:7, marginBottom:12, flexWrap:'wrap' }}>
        {DOMAINS.map(d => (
          <button key={d.key} onClick={() => setActiveDomain(d)}
            style={{ padding:'6px 13px', borderRadius:20, border:`1.5px solid ${d.color}`, background: activeDomain.key===d.key?d.color:'white', color: activeDomain.key===d.key?'white':d.color, fontFamily:'Montserrat', fontWeight:700, fontSize:'.75rem', cursor:'pointer', transition:'all .15s' }}
          >{d.label}</button>
        ))}
      </div>

      {/* Main 3-col layout */}
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 290px', gap:14 }}>
        {/* Filters */}
        <div className="panel" style={{ padding:'14px 12px', height:'fit-content' }}>
          <div className="section-label">Filters</div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:'.72rem', fontWeight:700, color:'#555', display:'block', marginBottom:5 }}>COHORT</label>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {[{v:'all',l:'All Cohorts'},{v:'1',l:'Cohort 1 · Jan 2025'},{v:'2',l:'Cohort 2 · Sep–Oct 2025'}].map(c => (
                <button key={c.v} onClick={() => setSelectedCohort(c.v)}
                  style={{ padding:'6px 10px', borderRadius:6, border:`1.5px solid ${selectedCohort===c.v?'var(--sea-blue)':'var(--sea-mid)'}`, background: selectedCohort===c.v?'var(--sea-blue)':'white', color: selectedCohort===c.v?'white':'#444', fontFamily:'Montserrat', fontWeight:700, fontSize:'.73rem', cursor:'pointer', textAlign:'left', transition:'all .15s' }}
                >{c.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:'.72rem', fontWeight:700, color:'#555', display:'block', marginBottom:5 }}>DISPLAY MODE</label>
            <select className="inp" value={displayMode} onChange={e=>setDisplayMode(e.target.value)} style={{ fontSize:'.78rem' }}>
              {DISPLAY_MODES.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
          </div>
          <div style={{ borderTop:'1px solid var(--sea-mid)', paddingTop:10, fontSize:'.7rem', color:'#999', lineHeight:1.9 }}>
            <div style={{ fontWeight:700, color:'#666', marginBottom:4, fontSize:'.68rem' }}>SOURCES</div>
            M300 National Energy Compacts<br/>
            SEforALL<br/>
            World Bank UPBEAT
          </div>
        </div>

        {/* Center: tabs */}
        <div>
          <div className="panel" style={{ borderRadius:'10px 10px 0 0', borderBottom:'1px solid #EEF0F8', display:'flex' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex:1, padding:'10px 5px', border:'none', background:'none',
                fontFamily:'Montserrat', fontWeight:700, fontSize:'.68rem', cursor:'pointer',
                textTransform:'uppercase', letterSpacing:'.04em', whiteSpace:'nowrap',
                color: tab===t.id?'var(--sea-teal)':'#888',
                borderBottom: tab===t.id?'2.5px solid var(--sea-teal)':'2.5px solid transparent',
              }}>{t.l}</button>
            ))}
          </div>
          <div className="panel" style={{ borderRadius:'0 0 10px 10px', padding:14 }}>
            {tab==='map' && <AfricaMap countries={filtered} selectedIso3={selectedIso3} onSelect={setSelectedIso3} field={mapField} showCohort={selectedCohort==='all'}/>}
            {tab==='table' && <DataTable countries={filtered}/>}
            {tab==='rankings' && <RankingsTab countries={filtered}/>}
            {tab==='scorecard' && <ScorecardTab countries={filtered}/>}
            {tab==='coverage' && <CoverageTab countries={filtered}/>}
          </div>
        </div>

        {/* Country panel */}
        <CountryPanel iso3={selectedIso3} onClose={() => setSelectedIso3(null)}/>
      </div>
    </div>
  )
}
