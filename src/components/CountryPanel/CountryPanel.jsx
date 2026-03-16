import React, { useState } from 'react'
import { COUNTRIES, DOMAINS, COUNTRY_BY_ISO3, getProgress, getStatus, getStatusColor, getAnnualProgress, fmt } from '../../data/countries'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
         ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts'

const CAT_COLORS = {
  'Electricity Access':'#0A3161','Generation & Capacity':'#1565C0','Networks & Efficiency':'#0277BD',
  'Connections':'#006064','Finance & Investment':'#5C2D91','Renewable Energy':'#3BAA35',
  'Climate & Environment':'#2E7D32','Clean Cooking':'#E8610A','Compact Metadata':'#455A64'
}

function KPICard({ domain, country }) {
  const cur = domain.curField ? country[domain.curField] : null
  const tgt = domain.tgtField ? country[domain.tgtField] : null
  const prog = getProgress(cur, tgt)
  const sc = getStatusColor(prog)
  const g = cur!=null && tgt!=null ? +(tgt-cur).toFixed(1) : null
  const need = g!=null ? +(g/6).toFixed(1) : null
  const DEF = {
    'Electricity Access': 'Share of population with access to electricity (on-grid or off-grid), as reported in the National Energy Compact.',
    'Clean Cooking': 'Share of population using clean cooking solutions (LPG, biogas, improved cookstoves, electric cooking), as defined in the National Energy Compact.',
  }
  return (
    <div style={{ background:'white', borderRadius:9, overflow:'hidden', border:`1px solid ${domain.color}18`, boxShadow:'0 1px 8px rgba(0,0,0,.05)' }}>
      <div style={{ background:domain.bg, borderTop:`3px solid ${domain.color}`, padding:'10px 13px' }}>
        <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.76rem', color:domain.color }}>{domain.label}</div>
      </div>
      <div style={{ padding:'12px 13px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7, marginBottom:9 }}>
          <div>
            <div style={{ fontSize:'.58rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:2 }}>Baseline 2024</div>
            <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.2rem', color:domain.color }}>{cur!=null?fmt(cur,domain.unit):'—'}</div>
          </div>
          <div>
            <div style={{ fontSize:'.58rem', color:'#888', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:2 }}>Target 2030</div>
            <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.2rem', color:'#3BAA35' }}>{tgt!=null?fmt(tgt,domain.unit):'—'}</div>
          </div>
        </div>
        {prog!=null && (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontSize:'.68rem', color:'#888' }}>
              <span>Progress to target</span><span style={{ fontWeight:700, color:sc }}>{prog}%</span>
            </div>
            <div className="prog-track" style={{ marginBottom:7 }}><div className="prog-fill" style={{ width:`${prog}%`, background:sc }}/></div>
          </>
        )}
        {g!=null && g>0 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
            <div style={{ background:'#FEF3EE', borderRadius:5, padding:'5px 7px' }}>
              <div style={{ fontSize:'.58rem', color:'#E8610A', fontWeight:700, textTransform:'uppercase' }}>Gap</div>
              <div style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.82rem', color:'#E8610A' }}>{domain.unit==='%'?`${g} pts`:fmt(g,domain.unit)}</div>
            </div>
            <div style={{ background:'#EDF7EC', borderRadius:5, padding:'5px 7px' }}>
              <div style={{ fontSize:'.58rem', color:'#3BAA35', fontWeight:700, textTransform:'uppercase' }}>Annual need</div>
              <div style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.82rem', color:'#3BAA35' }}>{domain.unit==='%'?`${need} pts/yr`:`${need}/yr`}</div>
            </div>
          </div>
        )}
        {DEF[domain.label] && (
          <details style={{ marginTop:7 }}>
            <summary style={{ fontSize:'.7rem', color:'var(--sea-teal)', fontWeight:700, cursor:'pointer' }}>Definition</summary>
            <p style={{ fontSize:'.7rem', color:'#666', lineHeight:1.6, marginTop:4, paddingLeft:7, borderLeft:`2px solid ${domain.color}30` }}>{DEF[domain.label]}</p>
          </details>
        )}
      </div>
    </div>
  )
}

function ProgressChart({ country }) {
  const data = getAnnualProgress(country, 'elec_access_current', 'elec_access_target')
  if (!data.length) return null
  return (
    <div style={{ background:'white', borderRadius:9, padding:'14px 12px', boxShadow:'0 1px 8px rgba(0,0,0,.05)' }}>
      <div style={{ fontFamily:'Montserrat', fontWeight:700, fontSize:'.78rem', color:'#0A3161', marginBottom:10 }}>Electricity Access — Projected 2024–2030</div>
      <ResponsiveContainer width="100%" height={180}>
        <ComposedChart data={data} margin={{ top:5, right:15, bottom:0, left:-10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false}/>
          <XAxis dataKey="year" tick={{ fontSize:10 }}/>
          <YAxis tick={{ fontSize:10 }} domain={[0,110]} unit="%"/>
          <Tooltip formatter={(v,n)=>[`${v?.toFixed(1)}%`,n]} labelStyle={{ fontFamily:'Montserrat', fontWeight:700 }}/>
          <ReferenceLine y={country.elec_access_target} stroke="#3BAA35" strokeDasharray="5 3"
            label={{ value:`Target ${country.elec_access_target}%`, position:'right', fontSize:9, fill:'#3BAA35' }}/>
          <Bar dataKey="value" name="Access Rate" fill="#0A3161" opacity={0.85} radius={[3,3,0,0]} barSize={20}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function AllIndicators({ country }) {
  const FIELDS = [
    ['Electricity Access', [
      ['elec_access_current','%','Current access rate','current'],
      ['urban_elec_current','%','Urban access rate','current'],
      ['rural_elec_current','%','Rural access rate','current'],
      ['elec_access_target','%','Target 2030','target'],
      ['urban_elec_target','%','Urban target 2030','target'],
      ['rural_elec_target','%','Rural target 2030','target'],
      ['pop_without_elec','M','Population without electricity','current'],
      ['elec_gap_current','M','Access gap (million)','current'],
      ['grid_connections_new','conn.','New grid connections target','target'],
      ['offgrid_connections','conn.','Off-grid connections target','target'],
    ]],
    ['Clean Cooking', [
      ['cooking_current','%','Current access rate','current'],
      ['cooking_urban_current','%','Urban access rate','current'],
      ['cooking_rural_current','%','Rural access rate','current'],
      ['cooking_lpg_current','%','By LPG (current)','current'],
      ['cooking_target','%','Target 2030','target'],
      ['cooking_gap_current','M','Access gap (million)','current'],
    ]],
    ['Renewable Energy', [
      ['renew_share_current','%','Renewable share current','current'],
      ['renew_share_target','%','Renewable share target 2030','target'],
      ['renew_cap_current','MW','Renewable capacity current','current'],
      ['renew_cap_target','MW','Renewable capacity target 2030','target'],
      ['solar_cap_target','MW','Solar capacity target','target'],
    ]],
    ['Generation & Capacity', [
      ['installed_cap_current','MW','Installed capacity current','current'],
      ['installed_cap_target','MW','Installed capacity target 2030','target'],
      ['peak_demand_current','MW','Peak demand current','current'],
      ['system_losses_current','%','System losses current','current'],
      ['system_losses_target','%','System losses target','target'],
    ]],
    ['Finance & Investment', [
      ['invest_total_B','$B','Total investment required','target'],
      ['invest_private_B','$B','Private financing required','target'],
      ['invest_public_B','$B','Public financing required','target'],
      ['avg_tariff','USD/kWh','Average tariff','current'],
      ['cost_recovery_current','%','Cost recovery ratio','current'],
    ]],
    ['Compact Metadata', [
      ['pop_2024','M','Population 2024','info'],
      ['pop_2030','M','Population 2030 projected','info'],
      ['compact_start','year','Compact start year','info'],
    ]],
  ]
  return (
    <div style={{ maxHeight:440, overflowY:'auto', paddingRight:4 }}>
      {FIELDS.map(([cat, fields]) => (
        <div key={cat} style={{ marginBottom:14 }}>
          <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.7rem', color:CAT_COLORS[cat]||'#444', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:7, paddingBottom:4, borderBottom:`2px solid ${(CAT_COLORS[cat]||'#ccc')}28` }}>{cat}</div>
          {fields.map(([field, unit, label, type]) => {
            const val = country[field]
            return (
              <div key={field} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'5px 0', borderBottom:'1px solid #F5F5F5', fontSize:'.79rem' }}>
                <div style={{ flex:1, paddingRight:8, color:'#444' }}>
                  <span style={{ fontSize:'.58rem', background:type==='target'?'#EDF7EC':'#EEF3FA', color:type==='target'?'#3BAA35':'#0A3161', borderRadius:3, padding:'1px 5px', fontWeight:700, marginRight:5 }}>{type==='target'?'2030':'2024'}</span>
                  {label}
                </div>
                <div style={{ fontFamily:'Montserrat', fontWeight:700, color:CAT_COLORS[cat]||'#0A3161', whiteSpace:'nowrap', fontSize:'.8rem' }}>
                  {val!=null ? fmt(val, unit) : '—'}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function CountryPanel({ iso3, onClose }) {
  const [tab, setTab] = useState('kpis')
  const country = iso3 ? COUNTRY_BY_ISO3[iso3] : null

  if (!iso3) return (
    <div className="panel" style={{ minHeight:380, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#aaa', gap:10 }}>
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25l.75-1.5M12 20.25l.75-1.5M15 20.25l.75-1.5M6.75 6.75L3 10.5l3.75 3.75M17.25 6.75L21 10.5l-3.75 3.75M9 10.5h6M4.5 15.75h15"/></svg>
      <div style={{ fontFamily:'Montserrat', fontWeight:600, fontSize:'.83rem', textAlign:'center' }}>Select a country<br/>on the map</div>
    </div>
  )

  if (!country) return null

  const cc = country.cohort === 1 ? '#0A3161' : '#00A896'
  const prog = getProgress(country.elec_access_current, country.elec_access_target)
  const sc = getStatusColor(prog)
  const statusLabel = { 'on-track':'On Track', 'to-watch':'To Watch', 'behind':'Behind' }[getStatus(prog)] || '—'
  const statusCls = { 'on-track':'badge-on-track', 'to-watch':'badge-to-watch', 'behind':'badge-behind' }[getStatus(prog)] || 'badge-grey'

  const TABS = [{ id:'kpis', label:'4 KPIs' },{ id:'progress', label:'Progress' },{ id:'all', label:'All Indicators' }]

  return (
    <div className="panel" style={{ display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${cc},${cc}CC)`, padding:'14px 16px', color:'white' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.1rem' }}>{country.name}</div>
            <div style={{ display:'flex', gap:6, marginTop:5, alignItems:'center', flexWrap:'wrap' }}>
              <span className={`ctag ctag-${country.cohort}`}>Cohort {country.cohort}</span>
              <span className={`badge ${statusCls}`}>{statusLabel}</span>
              <span style={{ fontSize:'.7rem', color:'rgba(255,255,255,.7)' }}>{country.compact_year || 2025}</span>
            </div>
          </div>
          {onClose && <button onClick={onClose} style={{ background:'rgba(255,255,255,.18)', border:'none', color:'white', width:26, height:26, borderRadius:6, cursor:'pointer', fontSize:'.95rem' }}>×</button>}
        </div>
        {prog!=null && (
          <div style={{ marginTop:11 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.7rem', color:'rgba(255,255,255,.75)', marginBottom:3 }}>
              <span>Electricity: {country.elec_access_current?.toFixed(1)}% → {country.elec_access_target}%</span>
              <span style={{ fontWeight:700 }}>{prog}%</span>
            </div>
            <div style={{ background:'rgba(255,255,255,.22)', height:5, borderRadius:3, overflow:'hidden' }}>
              <div style={{ background:'#F4B400', height:'100%', width:`${prog}%`, borderRadius:3, transition:'width 1s' }}/>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ borderBottom:'1px solid #EEF0F8', display:'flex' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:'8px 4px', border:'none', background:'none',
            fontFamily:'Montserrat', fontWeight:700, fontSize:'.7rem', cursor:'pointer',
            color: tab===t.id ? 'var(--sea-teal)' : '#888',
            borderBottom: tab===t.id ? '2.5px solid var(--sea-teal)' : '2.5px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding:13, overflowY:'auto', flex:1 }}>
        {tab === 'kpis' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {DOMAINS.map(d => <KPICard key={d.key} domain={d} country={country}/>)}
          </div>
        )}
        {tab === 'progress' && (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <ProgressChart country={country}/>
            {country.pop_without_elec && (
              <div style={{ background:'#FEF3EE', borderRadius:8, padding:'11px 14px', borderLeft:'4px solid #E8610A' }}>
                <div style={{ fontSize:'.68rem', color:'#E8610A', fontWeight:700, textTransform:'uppercase', marginBottom:3 }}>People Without Electricity</div>
                <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.2rem', color:'#E8610A' }}>{country.pop_without_elec}M</div>
              </div>
            )}
            {country.grid_connections_new && (
              <div style={{ background:'#EEF3FA', borderRadius:8, padding:'11px 14px', borderLeft:'4px solid #0A3161' }}>
                <div style={{ fontSize:'.68rem', color:'#0A3161', fontWeight:700, textTransform:'uppercase', marginBottom:3 }}>New Grid Connections Target</div>
                <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.2rem', color:'#0A3161' }}>{(country.grid_connections_new/1e6).toFixed(1)}M</div>
              </div>
            )}
          </div>
        )}
        {tab === 'all' && <AllIndicators country={country}/>}
      </div>
    </div>
  )
}
