import React, { useState, useMemo } from 'react'
import { COUNTRIES, DOMAINS, getProgress, getStatusColor, fmt } from '../data/countries'
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, LabelList, ReferenceLine,
} from 'recharts'

const COHORT_COLORS = { 1:'#0A3161', 2:'#00A896' }
const REGIONS = ['West Africa','East Africa','Central Africa','Southern Africa']
const YEARS = ['2024','2025','2026','2027','2028','2029','2030']

const CHART_TYPES = [
  { v:'bar',     l:'Bar Chart' },
  { v:'line',    l:'Line Chart (Trend)' },
  { v:'scatter', l:'Scatter Plot' },
  { v:'radar',   l:'Radar Chart' },
  { v:'bubble',  l:'Bubble Chart' },
  { v:'heatmap', l:'Heat Map' },
]

const KPI_OPTS = [
  { v:'elec_access_current', l:'Electricity Access (current %)', unit:'%' },
  { v:'elec_access_target',  l:'Electricity Access (target %)', unit:'%' },
  { v:'cooking_current',     l:'Clean Cooking (current %)', unit:'%' },
  { v:'cooking_target',      l:'Clean Cooking (target %)', unit:'%' },
  { v:'renew_share_current', l:'Renewable Share (current %)', unit:'%' },
  { v:'renew_share_target',  l:'Renewable Share (target %)', unit:'%' },
  { v:'invest_private_B',    l:'Private Capital Target ($B)', unit:'$B' },
]

const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'white', border:'1.5px solid #DDE4ED', borderRadius:8, padding:'10px 13px', boxShadow:'0 4px 16px rgba(0,0,0,.1)', fontSize:12, fontFamily:'Open Sans', minWidth:140 }}>
      <div style={{ fontFamily:'Montserrat', fontWeight:800, color:'#0A3161', marginBottom:5 }}>{label}</div>
      {payload.map((p,i) => <div key={i} style={{ color:p.color||'#333', marginBottom:2 }}>{p.name}: <strong>{typeof p.value==='number'?p.value.toFixed(1):p.value}</strong></div>)}
    </div>
  )
}

function lerp(a,b,t) { return a+(b-a)*Math.pow(t,.8) }
function getTrend(country, field, tgtField) {
  const base = country[field], target = country[tgtField]
  if (base==null || target==null) return null
  return YEARS.map((yr,i) => ({ year:yr, [country.name]: i===0?base:i===6?target:+lerp(base,target,i/6).toFixed(1) }))
}

export default function Comparison() {
  const [chartType, setChartType] = useState('bar')
  const [selCountries, setSelCountries] = useState([])
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterCohort, setFilterCohort] = useState('all')
  const [mainInd, setMainInd] = useState('elec_access_current')
  const [xAxis, setXAxis] = useState('elec_access_current')
  const [yAxis, setYAxis] = useState('cooking_current')

  const filtered = useMemo(() => {
    let c = [...COUNTRIES]
    if (filterRegion !== 'all') c = c.filter(x => x.region === filterRegion)
    if (filterCohort !== 'all') c = c.filter(x => x.cohort === +filterCohort)
    if (selCountries.length) c = c.filter(x => selCountries.includes(x.iso3))
    return c
  }, [filterRegion, filterCohort, selCountries])

  const mainOpt = KPI_OPTS.find(o => o.v === mainInd)
  const barData = filtered.map(c => ({ name:c.name.split(' ')[0].slice(0,10), fullName:c.name, val:c[mainInd], cohort:c.cohort }))

  // Line chart: merge trend data for all filtered countries
  const lineData = useMemo(() => {
    const tgtMap = { elec_access_current:'elec_access_target', cooking_current:'cooking_target', renew_share_current:'renew_share_target' }
    const tgtField = tgtMap[mainInd] || mainInd
    const rows = YEARS.map(yr => ({ year:yr }))
    filtered.slice(0,7).forEach(country => {
      const base = country[mainInd], target = country[tgtField]
      if (base==null || target==null) return
      rows.forEach((row,i) => { row[country.name] = i===0?base:i===6?target:+lerp(base,target,i/6).toFixed(1) })
    })
    return rows
  }, [filtered, mainInd])

  const COLORS = ['#0A3161','#00A896','#E8610A','#3BAA35','#5C2D91','#F4B400','#D32F2F']

  return (
    <div className="page-enter" style={{ maxWidth:1360, margin:'0 auto', padding:'20px 16px' }}>
      <div style={{ marginBottom:14 }}>
        <h1 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.45rem', color:'#0A3161', marginBottom:2 }}>Country Comparison</h1>
        <p style={{ fontSize:'.82rem', color:'#666' }}>Compare energy indicators across countries, regions and cohorts</p>
      </div>

      {/* Filter bar */}
      <div className="panel" style={{ padding:'14px 16px', marginBottom:14 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12, alignItems:'end' }}>
          <div>
            <label style={{ fontSize:'.7rem', fontWeight:700, color:'#555', display:'block', marginBottom:4 }}>COUNTRIES (multi-select)</label>
            <select className="inp" multiple value={selCountries} onChange={e => setSelCountries(Array.from(e.target.selectedOptions, o => o.value))} style={{ fontSize:'.8rem', height:80 }}>
              {COUNTRIES.map(c => <option key={c.iso3} value={c.iso3}>{c.name} (C{c.cohort})</option>)}
            </select>
            {selCountries.length>0 && <button onClick={()=>setSelCountries([])} style={{ marginTop:4, fontSize:'.7rem', color:'var(--sea-teal)', background:'none', border:'none', cursor:'pointer', fontFamily:'Montserrat', fontWeight:700 }}>Clear selection</button>}
          </div>
          <div>
            <label style={{ fontSize:'.7rem', fontWeight:700, color:'#555', display:'block', marginBottom:4 }}>REGION</label>
            <select className="inp" value={filterRegion} onChange={e=>setFilterRegion(e.target.value)} style={{ fontSize:'.82rem' }}>
              <option value="all">All Regions</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:'.7rem', fontWeight:700, color:'#555', display:'block', marginBottom:4 }}>COHORT</label>
            <select className="inp" value={filterCohort} onChange={e=>setFilterCohort(e.target.value)} style={{ fontSize:'.82rem' }}>
              <option value="all">All Cohorts</option>
              <option value="1">Cohort 1 (Jan 2025)</option>
              <option value="2">Cohort 2 (Sep–Oct 2025)</option>
            </select>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'2rem', color:'var(--sea-blue)' }}>{filtered.length}</div>
            <div style={{ fontSize:'.72rem', color:'#888' }}>countries selected</div>
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:14 }}>
        {/* Left: chart controls */}
        <div className="panel" style={{ padding:'14px 13px', height:'fit-content' }}>
          <div className="section-label" style={{ marginBottom:10 }}>Chart Type</div>
          {CHART_TYPES.map(t => (
            <button key={t.v} onClick={() => setChartType(t.v)} style={{
              display:'block', width:'100%', padding:'8px 11px', borderRadius:7, marginBottom:6,
              border:`1.5px solid ${chartType===t.v?'var(--sea-teal)':'var(--sea-mid)'}`,
              background: chartType===t.v?'var(--sea-teal)':'white',
              color: chartType===t.v?'white':'#444',
              fontFamily:'Montserrat', fontWeight:700, fontSize:'.76rem', cursor:'pointer', textAlign:'left',
            }}>{t.l}</button>
          ))}

          <div style={{ borderTop:'1px solid var(--sea-mid)', marginTop:12, paddingTop:12 }}>
            <div className="section-label" style={{ marginBottom:8 }}>Indicator</div>
            {(chartType!=='scatter' && chartType!=='bubble') && (
              <select className="inp" value={mainInd} onChange={e=>setMainInd(e.target.value)} style={{ fontSize:'.76rem' }}>
                {KPI_OPTS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            )}
            {chartType==='scatter' && (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <div>
                  <div style={{ fontSize:'.68rem', color:'#888', marginBottom:3 }}>X Axis</div>
                  <select className="inp" value={xAxis} onChange={e=>setXAxis(e.target.value)} style={{ fontSize:'.76rem' }}>
                    {KPI_OPTS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize:'.68rem', color:'#888', marginBottom:3 }}>Y Axis</div>
                  <select className="inp" value={yAxis} onChange={e=>setYAxis(e.target.value)} style={{ fontSize:'.76rem' }}>
                    {KPI_OPTS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Cohort legend */}
          <div style={{ borderTop:'1px solid var(--sea-mid)', marginTop:12, paddingTop:10 }}>
            {[1,2].map(n => (
              <div key={n} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
                <div style={{ width:11, height:11, borderRadius:3, background:COHORT_COLORS[n] }}/>
                <span style={{ fontSize:'.72rem', color:'#555' }}>Cohort {n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chart */}
        <div className="panel" style={{ padding:'16px 18px' }}>
          <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.9rem', color:'#0A3161', marginBottom:14 }}>
            {CHART_TYPES.find(t=>t.v===chartType)?.l}
            {chartType!=='scatter' && <span style={{ marginLeft:8, fontSize:'.78rem', color:'#888', fontWeight:500 }}>{mainOpt?.l}</span>}
            <span style={{ marginLeft:8, fontSize:'.72rem', color:'#aaa', fontWeight:500 }}>({filtered.length} countries)</span>
          </div>

          {!filtered.length ? (
            <div style={{ textAlign:'center', color:'#bbb', padding:60, fontFamily:'Montserrat' }}>No countries match the selected filters</div>
          ) : (
            <>
              {chartType==='bar' && (
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={barData} margin={{ top:5, right:15, bottom:45, left:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false}/>
                    <XAxis dataKey="name" tick={{ fontSize:10 }} angle={-35} textAnchor="end" interval={0}/>
                    <YAxis tick={{ fontSize:10 }} unit={mainOpt?.unit==='%'?'%':''}/>
                    <Tooltip content={<CT/>}/>
                    <Bar dataKey="val" name={mainOpt?.l||'Value'} radius={[4,4,0,0]} barSize={22}>
                      {barData.map((d,i) => <Cell key={i} fill={COHORT_COLORS[d.cohort]||'#0A3161'}/>)}
                      <LabelList dataKey="val" position="top" style={{ fontSize:9, fontWeight:700 }} formatter={v=>v!=null?`${v.toFixed(0)}${mainOpt?.unit==='%'?'%':''}`:''} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType==='line' && (
                <ResponsiveContainer width="100%" height={340}>
                  <LineChart data={lineData} margin={{ top:5, right:20, bottom:0, left:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8"/>
                    <XAxis dataKey="year" tick={{ fontSize:10 }}/>
                    <YAxis tick={{ fontSize:10 }} unit={mainOpt?.unit==='%'?'%':''}/>
                    <Tooltip content={<CT/>}/>
                    <Legend wrapperStyle={{ fontSize:11, fontFamily:'Montserrat' }}/>
                    <ReferenceLine x="2024" stroke="#F4B400" strokeDasharray="4 3" label={{ value:'Baseline', position:'insideTopLeft', fontSize:9, fill:'#F4B400' }}/>
                    <ReferenceLine x="2030" stroke="#3BAA35" strokeDasharray="4 3" label={{ value:'Target yr', position:'insideTopRight', fontSize:9, fill:'#3BAA35' }}/>
                    {filtered.slice(0,7).map((c,i) => (
                      <Line key={c.iso3} type="monotone" dataKey={c.name} stroke={COLORS[i%COLORS.length]} strokeWidth={2} dot={{ r:3 }} connectNulls/>
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}

              {chartType==='scatter' && (
                <ResponsiveContainer width="100%" height={340}>
                  <ScatterChart margin={{ top:10, right:20, bottom:20, left:0 }}>
                    <CartesianGrid stroke="#F0F4F8"/>
                    <XAxis type="number" dataKey={xAxis} name={KPI_OPTS.find(o=>o.v===xAxis)?.l} tick={{ fontSize:10 }} unit="%"
                      label={{ value:KPI_OPTS.find(o=>o.v===xAxis)?.l, position:'insideBottom', offset:-10, fontSize:10, fontFamily:'Montserrat', fontWeight:700 }}/>
                    <YAxis type="number" dataKey={yAxis} name={KPI_OPTS.find(o=>o.v===yAxis)?.l} tick={{ fontSize:10 }} unit="%"
                      label={{ value:KPI_OPTS.find(o=>o.v===yAxis)?.l, angle:-90, position:'insideLeft', fontSize:10, fontFamily:'Montserrat', fontWeight:700 }}/>
                    <Tooltip cursor={{ strokeDasharray:'3 3' }} content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const d = payload[0]?.payload
                      return <div className="map-tip" style={{ position:'relative', left:0, top:0 }}>
                        <div style={{ fontFamily:'Montserrat', fontWeight:800, color:'#0A3161', marginBottom:3 }}>{d?.name}</div>
                        <div style={{ fontSize:11 }}>{KPI_OPTS.find(o=>o.v===xAxis)?.l}: <strong>{d?.[xAxis]?.toFixed(1)}%</strong></div>
                        <div style={{ fontSize:11 }}>{KPI_OPTS.find(o=>o.v===yAxis)?.l}: <strong>{d?.[yAxis]?.toFixed(1)}%</strong></div>
                      </div>
                    }}/>
                    <Legend/>
                    {[1,2].map(cohort => (
                      <Scatter key={cohort} name={`Cohort ${cohort}`} data={filtered.filter(c=>c.cohort===cohort)} fill={COHORT_COLORS[cohort]} opacity={0.8}/>
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              )}

              {chartType==='radar' && (
                filtered.length < 2 ? <div style={{ textAlign:'center', color:'#aaa', padding:40 }}>Select at least 2 countries</div> :
                <ResponsiveContainer width="100%" height={340}>
                  <RadarChart data={DOMAINS.filter(d=>d.curField).map(d => {
                    const row = { domain: d.label.split(' ')[0] }
                    filtered.slice(0,5).forEach(c => { row[c.name] = c[d.curField] })
                    return row
                  })}>
                    <PolarGrid stroke="#E8EEF4"/>
                    <PolarAngleAxis dataKey="domain" tick={{ fontSize:10 }}/>
                    <PolarRadiusAxis domain={[0,100]} tick={{ fontSize:8 }} axisLine={false}/>
                    {filtered.slice(0,5).map((c,i) => (
                      <Radar key={c.iso3} name={c.name} dataKey={c.name} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.12} strokeWidth={2}/>
                    ))}
                    <Legend wrapperStyle={{ fontSize:11, fontFamily:'Montserrat' }}/>
                    <Tooltip/>
                  </RadarChart>
                </ResponsiveContainer>
              )}

              {chartType==='bubble' && (
                <ResponsiveContainer width="100%" height={340}>
                  <ScatterChart margin={{ top:10, right:20, bottom:20, left:0 }}>
                    <CartesianGrid stroke="#F0F4F8"/>
                    <XAxis type="number" dataKey="elec_access_current" name="Electricity" tick={{ fontSize:10 }} unit="%" label={{ value:'Electricity Access %', position:'insideBottom', offset:-10, fontSize:10 }}/>
                    <YAxis type="number" dataKey="cooking_current" name="Clean Cooking" tick={{ fontSize:10 }} unit="%" label={{ value:'Clean Cooking %', angle:-90, position:'insideLeft', fontSize:10 }}/>
                    <ZAxis type="number" dataKey="renew_share_current" range={[30,280]} name="Renewable Share"/>
                    <Tooltip cursor={{ strokeDasharray:'3 3' }}/>
                    <Legend/>
                    {[1,2].map(cohort => (
                      <Scatter key={cohort} name={`Cohort ${cohort}`} data={filtered.filter(c=>c.cohort===cohort)} fill={COHORT_COLORS[cohort]} opacity={0.75}/>
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              )}

              {chartType==='heatmap' && (
                <div style={{ overflowX:'auto' }}>
                  <table style={{ borderCollapse:'collapse', width:'100%', fontSize:'.8rem' }}>
                    <thead>
                      <tr>
                        <th style={{ padding:'8px 12px', background:'#061D3A', color:'white', fontFamily:'Montserrat', fontSize:'.7rem', textAlign:'left', position:'sticky', left:0 }}>Country</th>
                        {DOMAINS.filter(d=>d.curField).map(d => (
                          <th key={d.key} style={{ padding:'8px 10px', background:'#061D3A', color:'white', fontFamily:'Montserrat', fontSize:'.7rem', textAlign:'center', whiteSpace:'nowrap' }}>{d.label.split(' ').slice(0,2).join(' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(c => (
                        <tr key={c.iso3}>
                          <td style={{ padding:'7px 12px', fontWeight:700, fontSize:'.8rem', background:`${COHORT_COLORS[c.cohort]}12`, position:'sticky', left:0, borderRight:'1px solid #EEF0F8', whiteSpace:'nowrap' }}>
                            <span className={`ctag ctag-${c.cohort}`} style={{ marginRight:5 }}>C{c.cohort}</span>{c.name}
                          </td>
                          {DOMAINS.filter(d=>d.curField).map(d => {
                            const prog = getProgress(c[d.curField], c[d.tgtField])
                            const bg = prog==null?'#F5F5F5':prog>=80?'#C8E6C9':prog>=50?'#FFF9C4':'#FFCDD2'
                            const color = prog==null?'#ccc':prog>=80?'#1B5E20':prog>=50?'#F57F17':'#B71C1C'
                            return (
                              <td key={d.key} style={{ padding:'7px 10px', textAlign:'center', background:bg, color, fontFamily:'Montserrat', fontWeight:700, fontSize:'.8rem', border:'1px solid white' }}>
                                {c[d.curField]!=null?`${c[d.curField].toFixed(0)}%`:'—'}
                                {prog!=null&&<div style={{ fontSize:'.62rem', opacity:.7 }}>({prog}%)</div>}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Summary stats */}
      {filtered.length>0 && (
        <div className="panel" style={{ marginTop:14, padding:'16px 18px' }}>
          <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.82rem', color:'#0A3161', marginBottom:12 }}>Selection Summary</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:12 }}>
            {DOMAINS.filter(d=>d.curField).map(d => {
              const vals = filtered.map(c=>c[d.curField]).filter(v=>v!=null)
              const avg = vals.length ? (vals.reduce((a,b)=>a+b,0)/vals.length) : null
              return (
                <div key={d.key} style={{ background:d.bg, borderRadius:8, padding:'11px 13px', borderLeft:`4px solid ${d.color}` }}>
                  <div style={{ fontSize:'.66rem', color:d.color, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:3 }}>{d.label}</div>
                  <div style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.2rem', color:d.color }}>{avg!=null?`${avg.toFixed(1)}%`:'—'}</div>
                  <div style={{ fontSize:'.68rem', color:'#888' }}>avg · {vals.length} countries</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
