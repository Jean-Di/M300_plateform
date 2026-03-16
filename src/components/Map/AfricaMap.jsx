import React, { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import { NUM_ISO3, ISLAND_COORDS, COUNTRY_BY_ISO3, getStatusColor } from '../../data/countries'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const COHORT_COLOR = { 1:'#0A3161', 2:'#00A896' }

function buildScale(countries, field) {
  const vals = countries.map(c => c[field]).filter(v => v != null && !isNaN(v))
  if (!vals.length) return () => '#B0BEC5'
  const min = Math.min(...vals), max = Math.max(...vals), range = max - min || 1
  return scaleLinear().domain([min, max]).range(['#C8DFF5','#0A3161'])
}

export default function AfricaMap({ countries, selectedIso3, onSelect, field = 'elec_access_current', showCohort = false }) {
  const [tip, setTip] = useState(null)

  const byIso3 = useMemo(() => {
    const m = {}
    countries.forEach(c => { m[c.iso3] = c })
    return m
  }, [countries])

  const colorScale = useMemo(() => {
    if (showCohort) return null
    return buildScale(countries, field)
  }, [countries, field, showCohort])

  const getFill = iso3 => {
    const c = byIso3[iso3]
    if (!c) return '#E8ECF0'
    if (iso3 === selectedIso3) return '#F4B400'
    if (showCohort) return COHORT_COLOR[c.cohort] || '#9E9E9E'
    const val = c[field]
    if (val == null) return '#B0BEC5'
    return colorScale(val)
  }

  return (
    <div style={{ position:'relative', borderRadius:10, overflow:'hidden', background:'#EEF3F8' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center:[20,0], scale:380 }}
        style={{ width:'100%', height:460 }}
      >
        <ZoomableGroup zoom={1} minZoom={0.7} maxZoom={6} center={[20,0]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) => geographies.map(geo => {
              const iso3 = NUM_ISO3[String(geo.id)]
              const c = iso3 ? byIso3[iso3] : null
              const fill = getFill(iso3)
              return (
                <Geography key={geo.rsmKey} geography={geo}
                  fill={fill} stroke="#FFFFFF" strokeWidth={0.4}
                  style={{
                    default:{ outline:'none' },
                    hover:{ fill: c ? (iso3===selectedIso3?'#F4B400':'#00A896') : fill, outline:'none', cursor: c ? 'pointer' : 'default' },
                    pressed:{ outline:'none' },
                  }}
                  onMouseEnter={e => iso3 && setTip({ iso3, c, x:e.clientX, y:e.clientY })}
                  onMouseMove={e => tip && setTip(t => ({...t, x:e.clientX, y:e.clientY}))}
                  onMouseLeave={() => setTip(null)}
                  onClick={() => iso3 && c && onSelect(iso3)}
                />
              )
            })}
          </Geographies>
          {Object.entries(ISLAND_COORDS).map(([iso3, [lat, lon]]) => {
            const c = byIso3[iso3]
            if (!c) return null
            return (
              <Marker key={iso3} coordinates={[lon, lat]}
                onMouseEnter={e => setTip({ iso3, c, x:e.clientX, y:e.clientY })}
                onMouseLeave={() => setTip(null)}
                onClick={() => onSelect(iso3)}
              >
                <circle r={7}
                  fill={iso3===selectedIso3 ? '#F4B400' : (showCohort ? COHORT_COLOR[c.cohort] : getFill(iso3))}
                  stroke="#fff" strokeWidth={1.5} style={{ cursor:'pointer' }}
                />
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tip && (
        <div className="map-tip" style={{ left:tip.x+14, top:tip.y-10 }}>
          <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.85rem', color:'#0A3161', marginBottom:5 }}>{tip.c?.name || tip.iso3}</div>
          {tip.c ? (
            <>
              <span className={`ctag ctag-${tip.c.cohort}`} style={{ marginBottom:5, display:'inline-block' }}>Cohort {tip.c.cohort}</span>
              {tip.c[field] != null && (
                <div style={{ fontSize:'.82rem', color:'#333', marginTop:4 }}>
                  <strong>{typeof tip.c[field]==='number' ? tip.c[field].toFixed(1) : tip.c[field]}{field.includes('cap')?'MW':'%'}</strong>
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize:'.74rem', color:'#aaa' }}>No NEC submitted</div>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{ position:'absolute', bottom:12, left:12, background:'rgba(255,255,255,.95)', borderRadius:7, padding:'9px 12px', fontSize:'.7rem', boxShadow:'0 2px 8px rgba(0,0,0,.09)' }}>
        <div style={{ fontFamily:'Montserrat', fontWeight:800, fontSize:'.65rem', color:'#0A3161', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:7 }}>Legend</div>
        {showCohort ? [1,2].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:COHORT_COLOR[n] }}/>
            <span>Cohort {n} ({n===1?'Jan 2025':'Sep–Oct 2025'})</span>
          </div>
        )) : (
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
            <div style={{ width:60, height:8, borderRadius:3, background:'linear-gradient(90deg,#C8DFF5,#0A3161)' }}/>
            <span>Low → High</span>
          </div>
        )}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
          <div style={{ width:12, height:12, borderRadius:3, background:'#B0BEC5' }}/>
          <span style={{ color:'#888' }}>NEC — data not reported</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:12, height:12, borderRadius:3, background:'#E8ECF0', border:'1px solid #ccc' }}/>
          <span style={{ color:'#aaa' }}>No NEC submitted</span>
        </div>
      </div>
    </div>
  )
}
