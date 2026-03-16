// ── M300 Official Cohorts ────────────────────────────────────────────────────
// Cohort 1: 12 countries — January 2025, Dar es Salaam
// Cohort 2: 18 countries — September 2025 UNGA (17) + October 2025 ACMF (1=Zimbabwe)
// Total: 30 countries | Source: World Bank / AfDB Mission 300

// numeric ISO → ISO3 (world-atlas, deduplicated)
export const NUM_ISO3 = {
  '204':'BEN','72':'BWA','108':'BDI','120':'CMR','148':'TCD','174':'COM',
  '384':'CIV','180':'COD','231':'ETH','270':'GMB','288':'GHA','324':'GIN',
  '404':'KEN','426':'LSO','430':'LBR','450':'MDG','454':'MWI','478':'MRT',
  '508':'MOZ','516':'NAM','562':'NER','566':'NGA','178':'COG','678':'STP',
  '686':'SEN','694':'SLE','834':'TZA','768':'TGO','894':'ZMB','716':'ZWE',
  '706':'SOM','800':'UGA','646':'RWA','818':'EGY','12':'DZA','504':'MAR',
  '729':'SDN','466':'MLI','854':'BFA','624':'GNB','686':'SEN',
}

export const ISLAND_COORDS = {
  COM: [-11.7, 43.3],
  STP: [0.2, 6.6],
}

// ── DOMAIN CONFIG (ordered: Electricity, Cooking, Renewable, Private Capital) ──
export const DOMAINS = [
  { key:'electricity_access', label:'Electricity Access', color:'#0A3161', bg:'#EEF3FA', curField:'elec_access_current', tgtField:'elec_access_target', unit:'%' },
  { key:'clean_cooking',      label:'Clean Cooking',      color:'#E8610A', bg:'#FEF3EE', curField:'cooking_current',      tgtField:'cooking_target',      unit:'%' },
  { key:'renewable_energy',   label:'Renewable Energy',   color:'#3BAA35', bg:'#EDF7EC', curField:'renew_share_current',  tgtField:'renew_share_target',  unit:'%' },
  { key:'private_capital',    label:'Private Capital',    color:'#5C2D91', bg:'#F3EEF9', curField:null,                   tgtField:'invest_private_B',    unit:'$B' },
]

// ── INDICATOR KEYS ─────────────────────────────────────────────────────────
export const INDICATOR_CATEGORIES = [
  'Electricity Access', 'Generation & Capacity', 'Networks & Efficiency',
  'Connections', 'Finance & Investment', 'Renewable Energy',
  'Climate & Environment', 'Clean Cooking', 'Compact Metadata',
]

export const INDICATOR_META = {
  elec_access_current:    { label:'Electricity Access Rate (%)',          cat:'Electricity Access',    kpi:true,  unit:'%',       type:'current' },
  urban_elec_current:     { label:'Urban Electricity Access Rate (%)',    cat:'Electricity Access',    kpi:false, unit:'%',       type:'current' },
  rural_elec_current:     { label:'Rural Electricity Access Rate (%)',    cat:'Electricity Access',    kpi:false, unit:'%',       type:'current' },
  elec_access_target:     { label:'Electricity Access Target 2030 (%)',   cat:'Electricity Access',    kpi:true,  unit:'%',       type:'target'  },
  urban_elec_target:      { label:'Urban Access Target 2030 (%)',         cat:'Electricity Access',    kpi:false, unit:'%',       type:'target'  },
  rural_elec_target:      { label:'Rural Access Target 2030 (%)',         cat:'Electricity Access',    kpi:false, unit:'%',       type:'target'  },
  pop_without_elec:       { label:'Population Without Electricity (M)',   cat:'Electricity Access',    kpi:false, unit:'M',       type:'current' },
  elec_gap_current:       { label:'Electricity Access Gap (M people)',    cat:'Electricity Access',    kpi:false, unit:'M',       type:'current' },
  installed_cap_current:  { label:'Installed Capacity Current (MW)',      cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'current' },
  installed_cap_target:   { label:'Installed Capacity Target 2030 (MW)',  cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'target'  },
  renew_cap_current:      { label:'Renewable Capacity Current (MW)',      cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'current' },
  renew_cap_target:       { label:'Renewable Capacity Target 2030 (MW)', cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'target'  },
  solar_cap_target:       { label:'Solar Capacity Target (MW)',           cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'target'  },
  peak_demand_current:    { label:'Peak Demand Current (MW)',             cat:'Generation & Capacity', kpi:false, unit:'MW',      type:'current' },
  system_losses_current:  { label:'System Losses Current (%)',            cat:'Networks & Efficiency', kpi:false, unit:'%',       type:'current' },
  system_losses_target:   { label:'System Losses Target 2030 (%)',        cat:'Networks & Efficiency', kpi:false, unit:'%',       type:'target'  },
  grid_connections_new:   { label:'New Grid Connections Target',          cat:'Connections',           kpi:false, unit:'conn.',   type:'target'  },
  offgrid_connections:    { label:'Off-grid Connections Target',          cat:'Connections',           kpi:false, unit:'conn.',   type:'target'  },
  invest_total_B:         { label:'Total Investment Required ($B)',       cat:'Finance & Investment',  kpi:false, unit:'$B',      type:'target'  },
  invest_private_B:       { label:'Private Financing Required ($B)',      cat:'Finance & Investment',  kpi:true,  unit:'$B',      type:'target'  },
  invest_public_B:        { label:'Public Financing Required ($B)',       cat:'Finance & Investment',  kpi:false, unit:'$B',      type:'target'  },
  avg_tariff:             { label:'Average Tariff (USD/kWh)',             cat:'Finance & Investment',  kpi:false, unit:'USD/kWh', type:'current' },
  cost_recovery_current:  { label:'Cost Recovery Ratio Current (%)',      cat:'Finance & Investment',  kpi:false, unit:'%',       type:'current' },
  renew_share_current:    { label:'Renewable Share Current (%)',          cat:'Renewable Energy',      kpi:true,  unit:'%',       type:'current' },
  renew_share_target:     { label:'Renewable Share Target 2030 (%)',      cat:'Renewable Energy',      kpi:true,  unit:'%',       type:'target'  },
  co2_reduction:          { label:'CO2 Emissions Reduction (tCO2)',       cat:'Climate & Environment', kpi:false, unit:'tCO2',    type:'target'  },
  cooking_current:        { label:'Clean Cooking Access Current (%)',     cat:'Clean Cooking',         kpi:true,  unit:'%',       type:'current' },
  cooking_urban_current:  { label:'Clean Cooking Urban Current (%)',      cat:'Clean Cooking',         kpi:false, unit:'%',       type:'current' },
  cooking_rural_current:  { label:'Clean Cooking Rural Current (%)',      cat:'Clean Cooking',         kpi:false, unit:'%',       type:'current' },
  cooking_lpg_current:    { label:'Clean Cooking by LPG Current (%)',     cat:'Clean Cooking',         kpi:false, unit:'%',       type:'current' },
  cooking_target:         { label:'Clean Cooking Target 2030 (%)',        cat:'Clean Cooking',         kpi:true,  unit:'%',       type:'target'  },
  cooking_gap_current:    { label:'Clean Cooking Access Gap (M)',         cat:'Clean Cooking',         kpi:false, unit:'M',       type:'current' },
  pop_2024:               { label:'Population 2024 (M)',                  cat:'Compact Metadata',      kpi:false, unit:'M',       type:'info'    },
  pop_2030:               { label:'Population 2030 Projected (M)',        cat:'Compact Metadata',      kpi:false, unit:'M',       type:'info'    },
  compact_start:          { label:'Compact Start Year',                   cat:'Compact Metadata',      kpi:false, unit:'year',    type:'info'    },
}

// ── FULL COUNTRY DATA ─────────────────────────────────────────────────────
// Each country: meta + all KPI fields + indicator snapshot
export const COUNTRIES = [
  // ── COHORT 1 ── January 2025 · Dar es Salaam ─────────────────────────────
  { iso3:'TCD', name:'Chad',          nameFr:'Tchad',             cohort:1, region:'Central Africa', lat:15.5,  lon:18.7,
    elec_access_current:11,   elec_access_target:90,  urban_elec_current:20,  rural_elec_current:1,
    urban_elec_target:90,     rural_elec_target:80,   pop_without_elec:14.0,  elec_gap_current:15.5,
    installed_cap_current:487, installed_cap_target:866, renew_cap_current:20, renew_cap_target:430,
    solar_cap_target:215,     peak_demand_current:26, system_losses_current:39, system_losses_target:15,
    grid_connections_new:4100000, offgrid_connections:6900000,
    invest_total_B:5.5, invest_private_B:3.3, invest_public_B:1.7,
    avg_tariff:0.14, cost_recovery_current:62,
    renew_share_current:4,    renew_share_target:30,  co2_reduction:215000,
    cooking_current:2,  cooking_urban_current:5,  cooking_rural_current:1,  cooking_lpg_current:1.0,  cooking_target:40,  cooking_gap_current:17.0,
    pop_2024:17.4, pop_2030:20.1, compact_start:2025 },

  { iso3:'CIV', name:"Côte d'Ivoire", nameFr:"Côte d'Ivoire",    cohort:1, region:'West Africa',    lat:7.5,   lon:-5.5,
    elec_access_current:69,   elec_access_target:100, urban_elec_current:88,  rural_elec_current:40,
    urban_elec_target:100,    rural_elec_target:95,   pop_without_elec:8.7,   elec_gap_current:8.2,
    installed_cap_current:2900, installed_cap_target:4500, renew_cap_current:1160, renew_cap_target:2700,
    solar_cap_target:1350,    peak_demand_current:1400, system_losses_current:14, system_losses_target:8,
    grid_connections_new:5200000, offgrid_connections:2900000,
    invest_total_B:12.0, invest_private_B:7.2, invest_public_B:3.6,
    avg_tariff:0.11, cost_recovery_current:78,
    renew_share_current:40,   renew_share_target:65,  co2_reduction:1350000,
    cooking_current:25, cooking_urban_current:50, cooking_rural_current:8,  cooking_lpg_current:12.5, cooking_target:80,  cooking_gap_current:19.8,
    pop_2024:26.4, pop_2030:30.2, compact_start:2025 },

  { iso3:'COD', name:'DR Congo',      nameFr:'RD Congo',          cohort:1, region:'Central Africa', lat:-4.0,  lon:21.8,
    elec_access_current:19,   elec_access_target:60,  urban_elec_current:49,  rural_elec_current:1,
    urban_elec_target:80,     rural_elec_target:35,   pop_without_elec:82.0,  elec_gap_current:80.2,
    installed_cap_current:2800, installed_cap_target:5800, renew_cap_current:2750, renew_cap_target:5200,
    solar_cap_target:2600,    peak_demand_current:2400, system_losses_current:22, system_losses_target:12,
    grid_connections_new:18000000, offgrid_connections:22000000,
    invest_total_B:35.0, invest_private_B:21.0, invest_public_B:10.5,
    avg_tariff:0.06, cost_recovery_current:55,
    renew_share_current:98,   renew_share_target:100, co2_reduction:2600000,
    cooking_current:3,  cooking_urban_current:7,  cooking_rural_current:1,  cooking_lpg_current:1.5,  cooking_target:30,  cooking_gap_current:96.0,
    pop_2024:99.0, pop_2030:120.0, compact_start:2025 },

  { iso3:'LBR', name:'Liberia',       nameFr:'Libéria',           cohort:1, region:'West Africa',    lat:6.4,   lon:-9.4,
    elec_access_current:30,   elec_access_target:70,  urban_elec_current:68,  rural_elec_current:8,
    urban_elec_target:90,     rural_elec_target:50,   pop_without_elec:3.5,   elec_gap_current:3.6,
    installed_cap_current:197, installed_cap_target:450, renew_cap_current:120, renew_cap_target:380,
    solar_cap_target:190,     peak_demand_current:180, system_losses_current:28, system_losses_target:15,
    grid_connections_new:820000, offgrid_connections:940000,
    invest_total_B:1.8, invest_private_B:1.1, invest_public_B:0.5,
    avg_tariff:0.17, cost_recovery_current:60,
    renew_share_current:60,   renew_share_target:80,  co2_reduction:190000,
    cooking_current:3,  cooking_urban_current:8,  cooking_rural_current:1,  cooking_lpg_current:1.5,  cooking_target:40,  cooking_gap_current:4.9,
    pop_2024:5.1, pop_2030:6.0, compact_start:2025 },

  { iso3:'MDG', name:'Madagascar',    nameFr:'Madagascar',        cohort:1, region:'East Africa',    lat:-18.8, lon:46.9,
    elec_access_current:24,   elec_access_target:70,  urban_elec_current:55,  rural_elec_current:5,
    urban_elec_target:85,     rural_elec_target:55,   pop_without_elec:21.0,  elec_gap_current:21.1,
    installed_cap_current:320, installed_cap_target:680, renew_cap_current:112, renew_cap_target:544,
    solar_cap_target:272,     peak_demand_current:430, system_losses_current:28, system_losses_target:14,
    grid_connections_new:6500000, offgrid_connections:7500000,
    invest_total_B:4.2, invest_private_B:2.5, invest_public_B:1.3,
    avg_tariff:0.13, cost_recovery_current:63,
    renew_share_current:35,   renew_share_target:80,  co2_reduction:272000,
    cooking_current:2,  cooking_urban_current:5,  cooking_rural_current:1,  cooking_lpg_current:1.0,  cooking_target:40,  cooking_gap_current:27.1,
    pop_2024:27.7, pop_2030:32.8, compact_start:2025 },

  { iso3:'MWI', name:'Malawi',        nameFr:'Malawi',            cohort:1, region:'Southern Africa', lat:-13.3, lon:34.3,
    elec_access_current:14,   elec_access_target:30,  urban_elec_current:30,  rural_elec_current:4,
    urban_elec_target:60,     rural_elec_target:20,   pop_without_elec:19.1,  elec_gap_current:16.5,
    installed_cap_current:480, installed_cap_target:820, renew_cap_current:470, renew_cap_target:790,
    solar_cap_target:395,     peak_demand_current:370, system_losses_current:23, system_losses_target:12,
    grid_connections_new:1600000, offgrid_connections:2400000,
    invest_total_B:2.8, invest_private_B:1.7, invest_public_B:0.8,
    avg_tariff:0.09, cost_recovery_current:66,
    renew_share_current:98,   renew_share_target:100, co2_reduction:395000,
    cooking_current:3,  cooking_urban_current:8,  cooking_rural_current:1,  cooking_lpg_current:1.5,  cooking_target:30,  cooking_gap_current:18.5,
    pop_2024:19.1, pop_2030:22.4, compact_start:2025 },

  { iso3:'MRT', name:'Mauritania',    nameFr:'Mauritanie',        cohort:1, region:'West Africa',    lat:21.0,  lon:-10.9,
    elec_access_current:45,   elec_access_target:80,  urban_elec_current:72,  rural_elec_current:20,
    urban_elec_target:95,     rural_elec_target:65,   pop_without_elec:2.5,   elec_gap_current:2.5,
    installed_cap_current:360, installed_cap_target:780, renew_cap_current:126, renew_cap_target:546,
    solar_cap_target:273,     peak_demand_current:290, system_losses_current:26, system_losses_target:13,
    grid_connections_new:950000, offgrid_connections:750000,
    invest_total_B:2.0, invest_private_B:1.2, invest_public_B:0.6,
    avg_tariff:0.12, cost_recovery_current:70,
    renew_share_current:35,   renew_share_target:70,  co2_reduction:273000,
    cooking_current:10, cooking_urban_current:25, cooking_rural_current:3,  cooking_lpg_current:5.0,  cooking_target:50,  cooking_gap_current:4.1,
    pop_2024:4.6, pop_2030:5.5, compact_start:2025 },

  { iso3:'NER', name:'Niger',         nameFr:'Niger',             cohort:1, region:'West Africa',    lat:17.6,  lon:8.1,
    elec_access_current:19,   elec_access_target:40,  urban_elec_current:52,  rural_elec_current:5,
    urban_elec_target:75,     rural_elec_target:25,   pop_without_elec:24.2,  elec_gap_current:19.6,
    installed_cap_current:290, installed_cap_target:700, renew_cap_current:87, renew_cap_target:490,
    solar_cap_target:245,     peak_demand_current:310, system_losses_current:32, system_losses_target:15,
    grid_connections_new:3200000, offgrid_connections:5200000,
    invest_total_B:4.8, invest_private_B:2.9, invest_public_B:1.4,
    avg_tariff:0.11, cost_recovery_current:61,
    renew_share_current:20,   renew_share_target:40,  co2_reduction:245000,
    cooking_current:2,  cooking_urban_current:6,  cooking_rural_current:1,  cooking_lpg_current:1.0,  cooking_target:30,  cooking_gap_current:23.7,
    pop_2024:24.2, pop_2030:30.0, compact_start:2025 },

  { iso3:'NGA', name:'Nigeria',       nameFr:'Nigéria',           cohort:1, region:'West Africa',    lat:9.1,   lon:8.7,
    elec_access_current:55,   elec_access_target:100, urban_elec_current:72,  rural_elec_current:38,
    urban_elec_target:100,    rural_elec_target:90,   pop_without_elec:98.0,  elec_gap_current:96.0,
    installed_cap_current:12400, installed_cap_target:25000, renew_cap_current:2480, renew_cap_target:12500,
    solar_cap_target:6250,    peak_demand_current:5000, system_losses_current:40, system_losses_target:18,
    grid_connections_new:36000000, offgrid_connections:60000000,
    invest_total_B:80.0, invest_private_B:48.0, invest_public_B:24.0,
    avg_tariff:0.07, cost_recovery_current:58,
    renew_share_current:20,   renew_share_target:50,  co2_reduction:6250000,
    cooking_current:12, cooking_urban_current:20, cooking_rural_current:5,  cooking_lpg_current:6.0,  cooking_target:60,  cooking_gap_current:187.8,
    pop_2024:213.4, pop_2030:263.0, compact_start:2025 },

  { iso3:'SEN', name:'Senegal',       nameFr:'Sénégal',           cohort:1, region:'West Africa',    lat:14.5,  lon:-14.5,
    elec_access_current:70,   elec_access_target:82,  urban_elec_current:85,  rural_elec_current:52,
    urban_elec_target:98,     rural_elec_target:70,   pop_without_elec:5.2,   elec_gap_current:5.2,
    installed_cap_current:1200, installed_cap_target:2400, renew_cap_current:420, renew_cap_target:1680,
    solar_cap_target:840,     peak_demand_current:900, system_losses_current:18, system_losses_target:10,
    grid_connections_new:1500000, offgrid_connections:1200000,
    invest_total_B:5.0, invest_private_B:3.0, invest_public_B:1.5,
    avg_tariff:0.13, cost_recovery_current:72,
    renew_share_current:35,   renew_share_target:60,  co2_reduction:840000,
    cooking_current:15, cooking_urban_current:35, cooking_rural_current:5,  cooking_lpg_current:7.5,  cooking_target:60,  cooking_gap_current:14.6,
    pop_2024:17.2, pop_2030:20.3, compact_start:2025 },

  { iso3:'TZA', name:'Tanzania',      nameFr:'Tanzanie',          cohort:1, region:'East Africa',    lat:-6.4,  lon:34.9,
    elec_access_current:38,   elec_access_target:80,  urban_elec_current:65,  rural_elec_current:21,
    urban_elec_target:95,     rural_elec_target:70,   pop_without_elec:39.3,  elec_gap_current:39.2,
    installed_cap_current:1600, installed_cap_target:3500, renew_cap_current:880, renew_cap_target:2800,
    solar_cap_target:1400,    peak_demand_current:1100, system_losses_current:25, system_losses_target:12,
    grid_connections_new:12000000, offgrid_connections:14000000,
    invest_total_B:12.0, invest_private_B:7.2, invest_public_B:3.6,
    avg_tariff:0.09, cost_recovery_current:68,
    renew_share_current:55,   renew_share_target:75,  co2_reduction:1400000,
    cooking_current:8,  cooking_urban_current:18, cooking_rural_current:3,  cooking_lpg_current:4.0,  cooking_target:50,  cooking_gap_current:58.3,
    pop_2024:63.3, pop_2030:78.0, compact_start:2025 },

  { iso3:'ZMB', name:'Zambia',        nameFr:'Zambie',            cohort:1, region:'Southern Africa', lat:-13.1, lon:27.8,
    elec_access_current:43,   elec_access_target:75,  urban_elec_current:73,  rural_elec_current:14,
    urban_elec_target:95,     rural_elec_target:55,   pop_without_elec:10.4,  elec_gap_current:10.5,
    installed_cap_current:2800, installed_cap_target:4000, renew_cap_current:2744, renew_cap_target:3840,
    solar_cap_target:1920,    peak_demand_current:1100, system_losses_current:17, system_losses_target:9,
    grid_connections_new:2600000, offgrid_connections:2300000,
    invest_total_B:4.5, invest_private_B:2.7, invest_public_B:1.3,
    avg_tariff:0.08, cost_recovery_current:74,
    renew_share_current:85,   renew_share_target:100, co2_reduction:1920000,
    cooking_current:10, cooking_urban_current:22, cooking_rural_current:3,  cooking_lpg_current:5.0,  cooking_target:50,  cooking_gap_current:16.6,
    pop_2024:18.4, pop_2030:22.2, compact_start:2025 },

  // ── COHORT 2 ── September–October 2025 ────────────────────────────────────
  { iso3:'BEN', name:'Benin',         nameFr:'Bénin',             cohort:2, region:'West Africa',    lat:9.3,   lon:2.3,
    elec_access_current:42,   elec_access_target:70,  urban_elec_current:71,  rural_elec_current:13,
    urban_elec_target:95,     rural_elec_target:55,   pop_without_elec:7.7,   elec_gap_current:7.8,
    installed_cap_current:200, installed_cap_target:794, renew_cap_current:10, renew_cap_target:397,
    solar_cap_target:200,     peak_demand_current:370, system_losses_current:25, system_losses_target:12,
    grid_connections_new:1800000, offgrid_connections:2000000,
    invest_total_B:2.5, invest_private_B:1.5, invest_public_B:0.7,
    avg_tariff:0.10, cost_recovery_current:67,
    renew_share_current:5,    renew_share_target:30,  co2_reduction:200000,
    cooking_current:7,  cooking_urban_current:15, cooking_rural_current:3,  cooking_lpg_current:3.5,  cooking_target:50,  cooking_gap_current:12.5,
    pop_2024:13.4, pop_2030:16.1, compact_start:2025 },

  { iso3:'BWA', name:'Botswana',      nameFr:'Botswana',          cohort:2, region:'Southern Africa', lat:-22.3, lon:24.7,
    elec_access_current:77,   elec_access_target:100, urban_elec_current:90,  rural_elec_current:60,
    urban_elec_target:100,    rural_elec_target:95,   pop_without_elec:0.6,   elec_gap_current:0.6,
    installed_cap_current:892, installed_cap_target:950, renew_cap_current:89, renew_cap_target:475,
    solar_cap_target:238,     peak_demand_current:678, system_losses_current:14, system_losses_target:8,
    grid_connections_new:230000, offgrid_connections:180000,
    invest_total_B:1.2, invest_private_B:0.7, invest_public_B:0.4,
    avg_tariff:0.08, cost_recovery_current:82,
    renew_share_current:10,   renew_share_target:50,  co2_reduction:238000,
    cooking_current:55, cooking_urban_current:80, cooking_rural_current:30, cooking_lpg_current:27.5, cooking_target:90,  cooking_gap_current:1.2,
    pop_2024:2.6, pop_2030:3.1, compact_start:2025 },

  { iso3:'BDI', name:'Burundi',       nameFr:'Burundi',           cohort:2, region:'East Africa',    lat:-3.4,  lon:29.9,
    elec_access_current:26,   elec_access_target:70,  urban_elec_current:66,  rural_elec_current:18,
    urban_elec_target:90,     rural_elec_target:60,   pop_without_elec:9.3,   elec_gap_current:9.3,
    installed_cap_current:205, installed_cap_target:410, renew_cap_current:201, renew_cap_target:401,
    solar_cap_target:200,     peak_demand_current:230, system_losses_current:19, system_losses_target:10,
    grid_connections_new:2400000, offgrid_connections:3500000,
    invest_total_B:1.5, invest_private_B:0.9, invest_public_B:0.4,
    avg_tariff:0.12, cost_recovery_current:60,
    renew_share_current:98,   renew_share_target:100, co2_reduction:200000,
    cooking_current:2,  cooking_urban_current:5,  cooking_rural_current:1,  cooking_lpg_current:1.0,  cooking_target:50,  cooking_gap_current:12.3,
    pop_2024:12.6, pop_2030:15.4, compact_start:2025 },

  { iso3:'CMR', name:'Cameroon',      nameFr:'Cameroun',          cohort:2, region:'Central Africa', lat:3.9,   lon:11.5,
    elec_access_current:74,   elec_access_target:100, urban_elec_current:94,  rural_elec_current:25,
    urban_elec_target:100,    rural_elec_target:80,   pop_without_elec:7.3,   elec_gap_current:7.3,
    installed_cap_current:3000, installed_cap_target:3000, renew_cap_current:2100, renew_cap_target:2250,
    solar_cap_target:1125,    peak_demand_current:1500, system_losses_current:10, system_losses_target:6,
    grid_connections_new:5000000, offgrid_connections:3000000,
    invest_total_B:8.5, invest_private_B:5.1, invest_public_B:2.5,
    avg_tariff:0.10, cost_recovery_current:75,
    renew_share_current:70,   renew_share_target:75,  co2_reduction:1125000,
    cooking_current:20, cooking_urban_current:45, cooking_rural_current:5,  cooking_lpg_current:10.0, cooking_target:70,  cooking_gap_current:22.3,
    pop_2024:27.9, pop_2030:32.7, compact_start:2025 },

  { iso3:'COM', name:'Comoros',       nameFr:'Comores',           cohort:2, region:'East Africa',    lat:-11.7, lon:43.3, island:true,
    elec_access_current:95,   elec_access_target:100, urban_elec_current:98,  rural_elec_current:90,
    urban_elec_target:100,    rural_elec_target:100,  pop_without_elec:0.04,  elec_gap_current:0.04,
    installed_cap_current:53, installed_cap_target:80, renew_cap_current:8, renew_cap_target:60,
    solar_cap_target:30,      peak_demand_current:32, system_losses_current:37, system_losses_target:18,
    grid_connections_new:18000, offgrid_connections:12000,
    invest_total_B:0.15, invest_private_B:0.09, invest_public_B:0.04,
    avg_tariff:0.16, cost_recovery_current:64,
    renew_share_current:15,   renew_share_target:50,  co2_reduction:30000,
    cooking_current:20, cooking_urban_current:35, cooking_rural_current:10, cooking_lpg_current:10.0, cooking_target:70,  cooking_gap_current:0.70,
    pop_2024:0.87, pop_2030:1.0, compact_start:2025 },

  { iso3:'COG', name:'Republic of Congo', nameFr:'République du Congo', cohort:2, region:'Central Africa', lat:-0.2, lon:15.8,
    elec_access_current:52,   elec_access_target:85,  urban_elec_current:82,  rural_elec_current:22,
    urban_elec_target:98,     rural_elec_target:70,   pop_without_elec:2.8,   elec_gap_current:2.8,
    installed_cap_current:560, installed_cap_target:1000, renew_cap_current:140, renew_cap_target:700,
    solar_cap_target:350,     peak_demand_current:330, system_losses_current:25, system_losses_target:12,
    grid_connections_new:900000, offgrid_connections:900000,
    invest_total_B:2.2, invest_private_B:1.3, invest_public_B:0.6,
    avg_tariff:0.09, cost_recovery_current:69,
    renew_share_current:25,   renew_share_target:50,  co2_reduction:350000,
    cooking_current:18, cooking_urban_current:40, cooking_rural_current:5,  cooking_lpg_current:9.0,  cooking_target:60,  cooking_gap_current:4.8,
    pop_2024:5.8, pop_2030:7.0, compact_start:2025 },

  { iso3:'ETH', name:'Ethiopia',      nameFr:'Éthiopie',          cohort:2, region:'East Africa',    lat:9.1,   lon:40.5,
    elec_access_current:45,   elec_access_target:100, urban_elec_current:85,  rural_elec_current:30,
    urban_elec_target:100,    rural_elec_target:90,   pop_without_elec:65.0,  elec_gap_current:66.2,
    installed_cap_current:4600, installed_cap_target:9000, renew_cap_current:4232, renew_cap_target:8280,
    solar_cap_target:4140,    peak_demand_current:2100, system_losses_current:18, system_losses_target:9,
    grid_connections_new:33000000, offgrid_connections:47000000,
    invest_total_B:25.0, invest_private_B:15.0, invest_public_B:7.5,
    avg_tariff:0.05, cost_recovery_current:57,
    renew_share_current:92,   renew_share_target:100, co2_reduction:4140000,
    cooking_current:10, cooking_urban_current:22, cooking_rural_current:4,  cooking_lpg_current:5.0,  cooking_target:50,  cooking_gap_current:108.3,
    pop_2024:120.3, pop_2030:147.0, compact_start:2025 },

  { iso3:'GMB', name:'Gambia',        nameFr:'Gambie',            cohort:2, region:'West Africa',    lat:13.4,  lon:-15.3,
    elec_access_current:55,   elec_access_target:100, urban_elec_current:78,  rural_elec_current:30,
    urban_elec_target:100,    rural_elec_target:85,   pop_without_elec:1.1,   elec_gap_current:1.1,
    installed_cap_current:95, installed_cap_target:190, renew_cap_current:5, renew_cap_target:95,
    solar_cap_target:48,      peak_demand_current:75, system_losses_current:28, system_losses_target:13,
    grid_connections_new:340000, offgrid_connections:320000,
    invest_total_B:0.5, invest_private_B:0.3, invest_public_B:0.14,
    avg_tariff:0.15, cost_recovery_current:63,
    renew_share_current:5,    renew_share_target:35,  co2_reduction:48000,
    cooking_current:15, cooking_urban_current:30, cooking_rural_current:5,  cooking_lpg_current:7.5,  cooking_target:60,  cooking_gap_current:2.1,
    pop_2024:2.5, pop_2030:3.0, compact_start:2025 },

  { iso3:'GHA', name:'Ghana',         nameFr:'Ghana',             cohort:2, region:'West Africa',    lat:8.0,   lon:-1.2,
    elec_access_current:85,   elec_access_target:100, urban_elec_current:95,  rural_elec_current:72,
    urban_elec_target:100,    rural_elec_target:95,   pop_without_elec:4.9,   elec_gap_current:4.9,
    installed_cap_current:3800, installed_cap_target:5000, renew_cap_current:1330, renew_cap_target:3000,
    solar_cap_target:1500,    peak_demand_current:2800, system_losses_current:22, system_losses_target:11,
    grid_connections_new:3600000, offgrid_connections:1300000,
    invest_total_B:6.5, invest_private_B:3.9, invest_public_B:1.9,
    avg_tariff:0.10, cost_recovery_current:76,
    renew_share_current:35,   renew_share_target:60,  co2_reduction:1500000,
    cooking_current:25, cooking_urban_current:45, cooking_rural_current:8,  cooking_lpg_current:12.5, cooking_target:70,  cooking_gap_current:24.3,
    pop_2024:32.4, pop_2030:38.5, compact_start:2025 },

  { iso3:'GIN', name:'Guinea',        nameFr:'Guinée',            cohort:2, region:'West Africa',    lat:11.0,  lon:-10.9,
    elec_access_current:35,   elec_access_target:70,  urban_elec_current:60,  rural_elec_current:12,
    urban_elec_target:90,     rural_elec_target:55,   pop_without_elec:8.5,   elec_gap_current:8.5,
    installed_cap_current:620, installed_cap_target:1500, renew_cap_current:403, renew_cap_target:1200,
    solar_cap_target:600,     peak_demand_current:500, system_losses_current:32, system_losses_target:15,
    grid_connections_new:2700000, offgrid_connections:2700000,
    invest_total_B:3.0, invest_private_B:1.8, invest_public_B:0.7,
    avg_tariff:0.11, cost_recovery_current:61,
    renew_share_current:65,   renew_share_target:80,  co2_reduction:600000,
    cooking_current:5,  cooking_urban_current:12, cooking_rural_current:2,  cooking_lpg_current:2.5,  cooking_target:40,  cooking_gap_current:12.5,
    pop_2024:13.1, pop_2030:16.1, compact_start:2025 },

  { iso3:'KEN', name:'Kenya',         nameFr:'Kenya',             cohort:2, region:'East Africa',    lat:0.0,   lon:37.9,
    elec_access_current:75,   elec_access_target:100, urban_elec_current:88,  rural_elec_current:60,
    urban_elec_target:100,    rural_elec_target:95,   pop_without_elec:13.7,  elec_gap_current:13.5,
    installed_cap_current:2900, installed_cap_target:5000, renew_cap_current:2465, renew_cap_target:4500,
    solar_cap_target:2250,    peak_demand_current:2200, system_losses_current:16, system_losses_target:8,
    grid_connections_new:6800000, offgrid_connections:6700000,
    invest_total_B:9.0, invest_private_B:5.4, invest_public_B:2.7,
    avg_tariff:0.09, cost_recovery_current:79,
    renew_share_current:85,   renew_share_target:100, co2_reduction:2250000,
    cooking_current:15, cooking_urban_current:30, cooking_rural_current:5,  cooking_lpg_current:7.5,  cooking_target:60,  cooking_gap_current:45.9,
    pop_2024:54.0, pop_2030:65.0, compact_start:2025 },

  { iso3:'LSO', name:'Lesotho',       nameFr:'Lesotho',           cohort:2, region:'Southern Africa', lat:-29.6, lon:28.2,
    elec_access_current:36,   elec_access_target:80,  urban_elec_current:75,  rural_elec_current:8,
    urban_elec_target:95,     rural_elec_target:70,   pop_without_elec:1.4,   elec_gap_current:1.3,
    installed_cap_current:72, installed_cap_target:200, renew_cap_current:72, renew_cap_target:190,
    solar_cap_target:95,      peak_demand_current:130, system_losses_current:20, system_losses_target:10,
    grid_connections_new:390000, offgrid_connections:430000,
    invest_total_B:0.6, invest_private_B:0.36, invest_public_B:0.18,
    avg_tariff:0.09, cost_recovery_current:71,
    renew_share_current:100,  renew_share_target:100, co2_reduction:95000,
    cooking_current:5,  cooking_urban_current:15, cooking_rural_current:2,  cooking_lpg_current:2.5,  cooking_target:50,  cooking_gap_current:2.0,
    pop_2024:2.1, pop_2030:2.6, compact_start:2025 },

  { iso3:'MOZ', name:'Mozambique',    nameFr:'Mozambique',        cohort:2, region:'Southern Africa', lat:-18.7, lon:35.5,
    elec_access_current:29,   elec_access_target:50,  urban_elec_current:70,  rural_elec_current:5,
    urban_elec_target:90,     rural_elec_target:35,   pop_without_elec:22.8,  elec_gap_current:22.9,
    installed_cap_current:600, installed_cap_target:3000, renew_cap_current:240, renew_cap_target:2700,
    solar_cap_target:1350,    peak_demand_current:480, system_losses_current:32, system_losses_target:14,
    grid_connections_new:4600000, offgrid_connections:5300000,
    invest_total_B:6.5, invest_private_B:3.9, invest_public_B:1.9,
    avg_tariff:0.07, cost_recovery_current:59,
    renew_share_current:40,   renew_share_target:60,  co2_reduction:1350000,
    cooking_current:5,  cooking_urban_current:12, cooking_rural_current:2,  cooking_lpg_current:2.5,  cooking_target:40,  cooking_gap_current:30.6,
    pop_2024:32.2, pop_2030:39.0, compact_start:2025 },

  { iso3:'NAM', name:'Namibia',       nameFr:'Namibie',           cohort:2, region:'Southern Africa', lat:-22.0, lon:17.1,
    elec_access_current:55,   elec_access_target:90,  urban_elec_current:78,  rural_elec_current:33,
    urban_elec_target:100,    rural_elec_target:75,   pop_without_elec:1.2,   elec_gap_current:1.2,
    installed_cap_current:510, installed_cap_target:1200, renew_cap_current:204, renew_cap_target:840,
    solar_cap_target:420,     peak_demand_current:490, system_losses_current:14, system_losses_target:7,
    grid_connections_new:420000, offgrid_connections:350000,
    invest_total_B:1.5, invest_private_B:0.9, invest_public_B:0.4,
    avg_tariff:0.11, cost_recovery_current:80,
    renew_share_current:40,   renew_share_target:70,  co2_reduction:420000,
    cooking_current:50, cooking_urban_current:75, cooking_rural_current:25, cooking_lpg_current:25.0, cooking_target:80,  cooking_gap_current:1.3,
    pop_2024:2.6, pop_2030:3.0, compact_start:2025 },

  { iso3:'STP', name:'São Tomé & Príncipe', nameFr:'São Tomé-et-Príncipe', cohort:2, region:'Central Africa', lat:0.2, lon:6.6, island:true,
    elec_access_current:75,   elec_access_target:100, urban_elec_current:92,  rural_elec_current:58,
    urban_elec_target:100,    rural_elec_target:100,  pop_without_elec:0.055, elec_gap_current:0.055,
    installed_cap_current:28, installed_cap_target:80, renew_cap_current:8, renew_cap_target:72,
    solar_cap_target:36,      peak_demand_current:18, system_losses_current:37, system_losses_target:15,
    grid_connections_new:15000, offgrid_connections:10000,
    invest_total_B:0.08, invest_private_B:0.05, invest_public_B:0.02,
    avg_tariff:0.15, cost_recovery_current:65,
    renew_share_current:30,   renew_share_target:65,  co2_reduction:36000,
    cooking_current:40, cooking_urban_current:60, cooking_rural_current:20, cooking_lpg_current:20.0, cooking_target:80,  cooking_gap_current:0.13,
    pop_2024:0.22, pop_2030:0.27, compact_start:2025 },

  { iso3:'SLE', name:'Sierra Leone',  nameFr:'Sierra Leone',      cohort:2, region:'West Africa',    lat:8.5,   lon:-11.8,
    elec_access_current:26,   elec_access_target:60,  urban_elec_current:60,  rural_elec_current:5,
    urban_elec_target:85,     rural_elec_target:45,   pop_without_elec:6.0,   elec_gap_current:6.0,
    installed_cap_current:110, installed_cap_target:350, renew_cap_current:66, renew_cap_target:280,
    solar_cap_target:140,     peak_demand_current:120, system_losses_current:30, system_losses_target:14,
    grid_connections_new:1400000, offgrid_connections:1600000,
    invest_total_B:1.2, invest_private_B:0.7, invest_public_B:0.3,
    avg_tariff:0.16, cost_recovery_current:58,
    renew_share_current:60,   renew_share_target:80,  co2_reduction:140000,
    cooking_current:3,  cooking_urban_current:8,  cooking_rural_current:1,  cooking_lpg_current:1.5,  cooking_target:35,  cooking_gap_current:7.9,
    pop_2024:8.1, pop_2030:9.9, compact_start:2025 },

  { iso3:'TGO', name:'Togo',          nameFr:'Togo',              cohort:2, region:'West Africa',    lat:8.6,   lon:0.8,
    elec_access_current:52,   elec_access_target:100, urban_elec_current:78,  rural_elec_current:22,
    urban_elec_target:100,    rural_elec_target:85,   pop_without_elec:3.9,   elec_gap_current:4.0,
    installed_cap_current:230, installed_cap_target:600, renew_cap_current:46, renew_cap_target:420,
    solar_cap_target:210,     peak_demand_current:300, system_losses_current:32, system_losses_target:14,
    grid_connections_new:1800000, offgrid_connections:2000000,
    invest_total_B:1.8, invest_private_B:1.1, invest_public_B:0.4,
    avg_tariff:0.11, cost_recovery_current:65,
    renew_share_current:35,   renew_share_target:50,  co2_reduction:210000,
    cooking_current:8,  cooking_urban_current:20, cooking_rural_current:3,  cooking_lpg_current:4.0,  cooking_target:50,  cooking_gap_current:7.6,
    pop_2024:8.3, pop_2030:10.1, compact_start:2025 },

  { iso3:'ZWE', name:'Zimbabwe',      nameFr:'Zimbabwe',          cohort:2, region:'Southern Africa', lat:-20.0, lon:30.0,
    elec_access_current:40,   elec_access_target:80,  urban_elec_current:75,  rural_elec_current:14,
    urban_elec_target:95,     rural_elec_target:65,   pop_without_elec:9.1,   elec_gap_current:9.1,
    installed_cap_current:2100, installed_cap_target:3500, renew_cap_current:1050, renew_cap_target:2800,
    solar_cap_target:1400,    peak_demand_current:1400, system_losses_current:22, system_losses_target:11,
    grid_connections_new:2600000, offgrid_connections:2800000,
    invest_total_B:4.2, invest_private_B:2.5, invest_public_B:1.2,
    avg_tariff:0.09, cost_recovery_current:68,
    renew_share_current:50,   renew_share_target:75,  co2_reduction:1400000,
    cooking_current:15, cooking_urban_current:35, cooking_rural_current:5,  cooking_lpg_current:7.5,  cooking_target:55,  cooking_gap_current:12.8,
    pop_2024:15.1, pop_2030:18.5, compact_start:2025 },
]

// ── Derived helpers ───────────────────────────────────────────────────────────
export function getProgress(current, target) {
  if (current == null || !target) return null
  return Math.min(100, Math.round(current / target * 100))
}

export function getStatus(progress) {
  if (progress == null) return 'grey'
  return progress >= 80 ? 'on-track' : progress >= 50 ? 'to-watch' : 'behind'
}

export function getStatusColor(progress) {
  if (progress == null) return '#9E9E9E'
  return progress >= 80 ? '#3BAA35' : progress >= 50 ? '#F4B400' : '#D32F2F'
}

export function fmt(v, unit = '%', dec = 1) {
  if (v == null || (typeof v === 'number' && isNaN(v))) return '—'
  if (unit === '$B') return `$${Number(v).toFixed(1)}B`
  if (unit === 'M')  return `${Number(v).toLocaleString()}M`
  if (unit === 'MW') return `${Number(v).toLocaleString()} MW`
  if (unit === '%')  return `${Number(v).toFixed(dec)}%`
  return `${Number(v).toLocaleString()} ${unit}`
}

export function getAnnualProgress(country, curField, tgtField) {
  const base = country[curField], target = country[tgtField]
  if (base == null || target == null) return []
  return [2024,2025,2026,2027,2028,2029,2030].map((yr, i) => {
    const t = i / 6
    const ease = Math.pow(t, 0.8)
    const val = base + (target - base) * ease
    return { year: yr.toString(), value: i === 0 ? base : i === 6 ? target : +val.toFixed(1) }
  })
}

export const COUNTRY_BY_ISO3 = Object.fromEntries(COUNTRIES.map(c => [c.iso3, c]))
