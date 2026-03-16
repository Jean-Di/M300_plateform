import React from 'react'
import { DOMAINS } from '../data/countries'

export default function Methodology() {
  return (
    <div className="page-enter" style={{ maxWidth:860, margin:'0 auto', padding:'40px 20px' }}>
      <div className="section-label">Reference</div>
      <h1 style={{ fontFamily:'Montserrat', fontWeight:900, fontSize:'1.7rem', color:'#0A3161', marginBottom:8 }}>Methodology & Data Sources</h1>
      <p style={{ color:'#555', fontSize:'.92rem', lineHeight:1.85, marginBottom:28 }}>
        This platform tracks commitments made in National Energy Compacts (NECs) under the World Bank and African Development Bank Mission 300 initiative.
      </p>

      {/* Cohorts */}
      <div className="panel" style={{ padding:'20px 22px', marginBottom:20 }}>
        <h2 style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'1.05rem', color:'#0A3161', marginBottom:14 }}>Mission 300 Cohorts</h2>
        {[
          { n:1, yr:'January 2025', event:'Mission 300 Africa Energy Summit · Dar es Salaam, Tanzania', color:'#0A3161', n_c:12, countries:"Chad · Côte d'Ivoire · DR Congo · Liberia · Madagascar · Malawi · Mauritania · Niger · Nigeria · Senegal · Tanzania · Zambia" },
          { n:2, yr:'September–October 2025', event:'Bloomberg/UNGA New York (17) + Africa Capital Markets Forum (1=Zimbabwe)', color:'#00A896', n_c:18, countries:'Benin · Botswana · Burundi · Cameroon · Comoros · Rep. Congo · Ethiopia · Gambia · Ghana · Guinea · Kenya · Lesotho · Mozambique · Namibia · São Tomé & Príncipe · Sierra Leone · Togo · Zimbabwe' },
        ].map(c => (
          <div key={c.n} style={{ borderLeft:`5px solid ${c.color}`, padding:'11px 15px', background:`${c.color}06`, borderRadius:'0 7px 7px 0', marginBottom:11 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
              <span style={{ fontFamily:'Montserrat', fontWeight:800, color:c.color }}>Cohort {c.n} — {c.yr}</span>
              <span style={{ background:c.color, color:'white', borderRadius:20, padding:'2px 9px', fontSize:'.68rem', fontWeight:700, fontFamily:'Montserrat' }}>{c.n_c} countries</span>
            </div>
            <div style={{ fontSize:'.76rem', color:'#777', marginBottom:4 }}>{c.event}</div>
            <div style={{ fontSize:'.74rem', color:'#666', lineHeight:1.75 }}>{c.countries}</div>
          </div>
        ))}
      </div>

      {/* Indicator definitions */}
      <div className="panel" style={{ padding:'20px 22px', marginBottom:20 }}>
        <h2 style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'1.05rem', color:'#0A3161', marginBottom:14 }}>Indicator Definitions — 4 KPI Domains</h2>
        {[
          { d:DOMAINS[0], items:[
            { name:'Electricity Access Rate (%)', def:'Share of total population with electricity access (on-grid or off-grid), as reported in the NEC.', kpi:true },
            { name:'Urban / Rural Breakdown (%)', def:'Access rate by settlement type per national census definition.', kpi:false },
            { name:'Population Without Electricity (M)', def:'Absolute count of people lacking electricity access (2024 baseline).', kpi:false },
            { name:'Grid / Off-grid Connections Target', def:'New household connections to be established by 2030 via grid, mini-grid, or solar home systems.', kpi:false },
          ]},
          { d:DOMAINS[1], items:[
            { name:'Clean Cooking Access (%)', def:'Share of population using clean cooking solutions: LPG, biogas, electric cooking, improved biomass cookstoves.', kpi:true },
            { name:'By Technology', def:'Breakdown by: electricity, LPG, biogas, bioethanol, and other clean technologies.', kpi:false },
          ]},
          { d:DOMAINS[2], items:[
            { name:'Renewable Share Current / Target (%)', def:'Percentage of total installed generation capacity from renewable sources (solar, wind, hydro, geothermal, biomass).', kpi:true },
            { name:'Installed / Renewable Capacity (MW)', def:'Total and renewable generation capacity on-grid.', kpi:false },
            { name:'Solar / Battery Storage Target', def:'Technology-specific capacity commitments by 2030.', kpi:false },
          ]},
          { d:DOMAINS[3], items:[
            { name:'Private Financing Required ($B)', def:'Target private sector investment to be mobilized for energy access and transition by 2030.', kpi:true },
            { name:'Total / Public Investment ($B)', def:'Total financing needed, split by public and private sources.', kpi:false },
            { name:'Cost Recovery / Tariff', def:'Utility financial health indicators: tariff level and cost recovery ratio.', kpi:false },
          ]},
        ].map(({ d, items }) => (
          <div key={d.key} style={{ marginBottom:18 }}>
            <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.82rem', color:d.color, marginBottom:9, paddingBottom:5, borderBottom:`2px solid ${d.color}28` }}>{d.label}</div>
            {items.map((ind,i) => (
              <div key={i} style={{ marginBottom:8, paddingLeft:11, borderLeft:`2px solid ${d.color}28` }}>
                <div style={{ fontWeight:700, fontSize:'.82rem', color:'#1A2B3C', marginBottom:2 }}>
                  {ind.name}
                  {ind.kpi && <span style={{ fontSize:'.6rem', background:'#FEF3EE', color:'#E8610A', borderRadius:3, padding:'1px 5px', marginLeft:5, fontWeight:700 }}>KPI</span>}
                </div>
                <p style={{ fontSize:'.79rem', color:'#666', lineHeight:1.65 }}>{ind.def}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ background:'#FEFAF0', border:'1px solid #F4B400', borderLeft:'4px solid #F4B400', borderRadius:8, padding:'16px 18px' }}>
        <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.78rem', color:'#B8860B', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:7 }}>Disclaimer & Data Ownership</div>
        <p style={{ fontSize:'.84rem', color:'#5C4A00', lineHeight:1.8, marginBottom:8 }}>
          Data presented reflects National Energy Compacts as signed. Empty values indicate absence of data in the Compact — they are neither interpolated nor estimated. This platform does not constitute an independent performance assessment.
        </p>
        <p style={{ fontSize:'.82rem', color:'#6B5800', lineHeight:1.7 }}>
          <strong>Data ownership</strong> and intellectual property remain with respective governments and the World Bank / African Development Bank. SEforALL acts as a facilitating organization. Reproduction should cite: <em>"Mission 300 National Energy Compacts, World Bank / AfDB, compiled by SEforALL."</em>
        </p>
      </div>
    </div>
  )
}
