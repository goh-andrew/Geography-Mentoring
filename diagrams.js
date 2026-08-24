/* Inline SVG diagrams for the named/sketchable models in the 0460 syllabus.
   Each entry: { caption, svg }. Referenced from notes-data.js via a
   {"k":"diagram","id":"..."} node, rendered by renderNodes() in index.html.
   Kept as plain hand-built SVG (no external assets) so it works offline and
   matches the site's own mono/display type + colour palette. */

const F = "font-family:'IBM Plex Mono',ui-monospace,monospace;";
const INK = "#0D2029", MUTED = "#596E75", RULE = "#C3D1CC";
const CURRENT = "#1B7F8E", REEF = "#48B7A6", SEDIMENT = "#C98A2E", LAVA = "#B34329", SHELF = "#134B5A";
const SEA = "#9FCBDB", SEA_DEEP = "#6FA8C2", SAND = "#E8D6A8", ROCK_HARD = "#9C9184", ROCK_SOFT = "#C7B896", VEG = "#6B9E78";
// short helper for a multi-line <text>, one tspan per array entry
function lines(x,y,size,fill,arr,weight){
  return `<text x="${x}" y="${y}" style="${F}font-size:${size}px;fill:${fill};${weight?'font-weight:'+weight+';':''}">`+
    arr.map((l,i)=>`<tspan x="${x}" dy="${i===0?0:size+2.5}">${l}</tspan>`).join('')+`</text>`;
}

export const DIAGRAMS = {

  dtm: {
    caption: "The demographic transition model — five stages, birth rate and death rate curves",
    svg: `<svg viewBox="0 0 640 330" role="img" aria-label="Demographic transition model showing birth rate and death rate across five stages">
<line x1="60" y1="40" x2="60" y2="260" stroke="${INK}" stroke-width="1.5"/>
<line x1="60" y1="260" x2="620" y2="260" stroke="${INK}" stroke-width="1.5"/>
<text x="30" y="150" style="${F}font-size:10px;fill:${MUTED}" text-anchor="middle" transform="rotate(-90 30 150)">rate per 1000</text>
${[172,284,396,508].map(x=>`<line x1="${x}" y1="40" x2="${x}" y2="260" stroke="${RULE}" stroke-width="1" stroke-dasharray="3 3"/>`).join('')}
<polyline points="60,255 172,250 284,220 396,150 508,90 620,70" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="1 5" stroke-linecap="round"/>
<polyline points="60,84 172,80 284,90 396,180 508,232 620,244" fill="none" stroke="${SEDIMENT}" stroke-width="2.5" stroke-linejoin="round"/>
<polyline points="60,96 172,90 284,196 396,230 508,238 620,232" fill="none" stroke="${CURRENT}" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="620" cy="244" r="3" fill="${SEDIMENT}"/>
<circle cx="620" cy="232" r="3" fill="${CURRENT}"/>
${[["1",60,172],["2",172,284],["3",284,396],["4",396,508],["5",508,620]].map(([n,x1,x2])=>
 `<text x="${(x1+x2)/2}" y="280" style="${F}font-size:13px;font-weight:600;fill:${INK}" text-anchor="middle">${n}</text>`).join('')}
${[["High\nfluctuating",116],["Early\nexpanding",228],["Late\nexpanding",340],["Low\nfluctuating",452],["Declining?",564]].map(([n,x])=>{
  const lines=n.split("\n");
  return `<text x="${x}" y="300" style="${F}font-size:9.5px;fill:${MUTED}" text-anchor="middle">${lines.map((l,i)=>`<tspan x="${x}" dy="${i===0?0:11}">${l}</tspan>`).join('')}</text>`;
}).join('')}
<circle cx="380" cy="35" r="4" fill="${SEDIMENT}"/><text x="390" y="39" style="${F}font-size:10px;fill:${INK}">birth rate</text>
<circle cx="480" cy="35" r="4" fill="${CURRENT}"/><text x="490" y="39" style="${F}font-size:10px;fill:${INK}">death rate</text>
<line x1="380" y1="20" x2="392" y2="20" stroke="${INK}" stroke-width="2" stroke-dasharray="1 4"/><text x="398" y="24" style="${F}font-size:10px;fill:${INK}">total population</text>
</svg>`
  },

  "population-pyramids": {
    caption: "Three population pyramid shapes, tied to stage of development",
    svg: `<svg viewBox="0 0 640 260" role="img" aria-label="Three population pyramid shapes: expansive, stationary and constrictive">
${[
  {cx:110, label:"Expansive", sub:"rapid growth · e.g. Uganda", w:[92,84,72,56,36,18]},
  {cx:320, label:"Stationary", sub:"slow growth · e.g. USA", w:[54,54,53,52,48,38]},
  {cx:530, label:"Constrictive", sub:"declining · e.g. Japan", w:[38,44,52,58,54,44]}
].map(p=>{
  const bandH=22, base=210;
  const bars=p.w.map((w,i)=>{
    const y=base-(i+1)*bandH;
    return `<rect x="${p.cx-w}" y="${y}" width="${w}" height="${bandH-3}" fill="${CURRENT}"/><rect x="${p.cx}" y="${y}" width="${w}" height="${bandH-3}" fill="${REEF}"/>`;
  }).join('');
  return `<line x1="${p.cx}" y1="60" x2="${p.cx}" y2="${base}" stroke="${RULE}" stroke-width="1"/>
  ${bars}
  <text x="${p.cx}" y="40" style="${F}font-size:12px;font-weight:600;fill:${INK}" text-anchor="middle">${p.label}</text>
  <text x="${p.cx}" y="54" style="${F}font-size:9.5px;fill:${MUTED}" text-anchor="middle">${p.sub}</text>
  <text x="${p.cx}" y="230" style="${F}font-size:9px;fill:${MUTED}" text-anchor="middle">age &uarr;</text>`;
}).join('')}
<rect x="20" y="245" width="10" height="10" fill="${CURRENT}"/><text x="34" y="254" style="${F}font-size:10px;fill:${INK}">male</text>
<rect x="80" y="245" width="10" height="10" fill="${REEF}"/><text x="94" y="254" style="${F}font-size:10px;fill:${INK}">female</text>
</svg>`
  },

  "burgess-model": {
    caption: "The Burgess concentric zone model",
    svg: `<svg viewBox="0 0 560 300" role="img" aria-label="Burgess concentric zone model, five rings around the CBD">
${[
  {r:130, fill:"#EAEFEB", label:"5 · commuter / rural-urban fringe"},
  {r:104, fill:"#D8E6DE", label:"4 · outer suburbs — high-class housing"},
  {r:76,  fill:"#BEDCCC", label:"3 · inner suburbs — low-class housing"},
  {r:48,  fill:REEF,      label:"2 · inner city — transition / twilight zone"},
  {r:22,  fill:SHELF,     label:"1 · CBD"}
].map(z=>`<circle cx="150" cy="150" r="${z.r}" fill="${z.fill}" stroke="#FFFFFF" stroke-width="2"/>`).join('')}
<text x="150" y="154" text-anchor="middle" style="${F}font-size:10px;font-weight:600;fill:#fff">CBD</text>
${[
  ["1 · CBD", "shops &amp; offices, highest bid rent"],
  ["2 · Transition zone", "old housing, small workshops"],
  ["3 · Inner suburbs", "low-class, high-density housing"],
  ["4 · Outer suburbs", "larger, high-class housing"],
  ["5 · Commuter zone", "lowest density, newest housing"]
].map(([title,sub],i)=>{ const y=32+i*54;
  return `<text x="300" y="${y}" style="${F}font-size:11.5px;font-weight:600;fill:${INK}">${title}</text>`+
    `<text x="300" y="${y+16}" style="${F}font-size:9.5px;fill:${MUTED}">${sub}</text>`;
}).join('')}
</svg>`
  },

  "hoyt-model": {
    caption: "The Hoyt sector model — Burgess's rings redrawn as wedges along transport routes",
    svg: `<svg viewBox="0 0 560 300" role="img" aria-label="Hoyt sector model, wedge-shaped sectors radiating from the CBD">
<g transform="translate(170,150)">
<path d="M0,0 L145,0 A145,145 0 0,1 93.2,111.1 Z" fill="${SEDIMENT}"/>
<path d="M0,0 L93.2,111.1 A145,145 0 0,1 -93.2,111.1 Z" fill="#CFA98F"/>
<path d="M0,0 L-93.2,111.1 A145,145 0 0,1 25.2,-142.8 Z" fill="#D8E6DE"/>
<path d="M0,0 L25.2,-142.8 A145,145 0 0,1 145,0 Z" fill="${REEF}"/>
<circle cx="0" cy="0" r="24" fill="${SHELF}"/>
<text x="0" y="4" text-anchor="middle" style="${F}font-size:10px;font-weight:600;fill:#fff">CBD</text>
</g>
${[
  ["CBD", SHELF, "centre — shops &amp; offices"],
  ["Industry", SEDIMENT, "along a road, rail line or river"],
  ["Low-class housing", "#CFA98F", "next to the industry sector"],
  ["Middle-class housing", "#D8E6DE", "largest sector, fills the gaps"],
  ["High-class housing", REEF, "best land, often opposite industry"]
].map(([t,c,sub],i)=>{ const y=32+i*54;
  return `<rect x="340" y="${y-11}" width="12" height="12" fill="${c}"/>`+
    `<text x="358" y="${y}" style="${F}font-size:11.5px;font-weight:600;fill:${INK}">${t}</text>`+
    `<text x="358" y="${y+16}" style="${F}font-size:9.5px;fill:${MUTED}">${sub}</text>`;
}).join('')}
</svg>`
  },

  "hydrological-cycle": {
    caption: "The hydrological (water) cycle and drainage basin",
    svg: `<svg viewBox="0 0 640 340" role="img" aria-label="The hydrological cycle showing evaporation, condensation, precipitation, interception, runoff, infiltration and groundwater flow through a hillside into the sea">
<defs>
 <clipPath id="hcGround"><path d="M0,235 L110,150 Q170,120 220,168 Q280,205 340,150 Q390,115 440,165 L640,235 L640,340 L0,340 Z"/></clipPath>
 <linearGradient id="hcSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE7EE"/><stop offset="1" stop-color="#EAF4F2"/></linearGradient>
</defs>
<rect x="0" y="0" width="640" height="235" fill="url(#hcSky)"/>
<circle cx="70" cy="55" r="26" fill="${SEDIMENT}" opacity="0.85"/>
${[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4; return `<line x1="${70+Math.cos(a)*34}" y1="${55+Math.sin(a)*34}" x2="${70+Math.cos(a)*44}" y2="${55+Math.sin(a)*44}" stroke="${SEDIMENT}" stroke-width="2"/>`;}).join('')}
<path d="M0,235 L110,150 Q170,120 220,168 Q280,205 340,150 Q390,115 440,165 L640,235 L640,340 L0,340 Z" fill="#D9CBA6" stroke="${INK}" stroke-width="1.5"/>
<g clip-path="url(#hcGround)">
${[0,1,2,3,4].map(i=>`<rect x="0" y="${230+i*20}" width="640" height="20" fill="${i%2===0?'#CBBA8E':'#BFAD80'}"/>`).join('')}
<line x1="0" y1="280" x2="640" y2="280" stroke="${SEA_DEEP}" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
</g>
<path d="M0,235 L110,150 Q170,120 220,168 Q280,205 340,150 Q390,115 440,165 L640,235" fill="none" stroke="${VEG}" stroke-width="4" opacity="0.7"/>
${[[95,150],[300,158],[420,163]].map(([x,y])=>`<g transform="translate(${x},${y})">
<line x1="0" y1="0" x2="0" y2="-22" stroke="#6B4A2E" stroke-width="3"/>
<ellipse cx="0" cy="-30" rx="16" ry="14" fill="${VEG}"/><ellipse cx="-9" cy="-24" rx="10" ry="9" fill="${VEG}" opacity="0.85"/><ellipse cx="9" cy="-24" rx="10" ry="9" fill="${VEG}" opacity="0.85"/>
</g>`).join('')}
<ellipse cx="150" cy="55" rx="46" ry="19" fill="#F3F5EF" stroke="${RULE}"/>
<ellipse cx="195" cy="48" rx="34" ry="16" fill="#F3F5EF" stroke="${RULE}"/>
<ellipse cx="115" cy="50" rx="28" ry="14" fill="#F3F5EF" stroke="${RULE}"/>
<text x="150" y="58" text-anchor="middle" style="${F}font-size:9px;fill:${INK}">condensation</text>
${[[110,90],[150,95],[190,88],[130,100]].map(([x,y])=>`<line x1="${x}" y1="${y}" x2="${x-6}" y2="${y+18}" stroke="${CURRENT}" stroke-width="1.5"/>`).join('')}
<text x="60" y="120" style="${F}font-size:9px;fill:${MUTED}">precipitation</text>
<path d="M60,175 q4,-22 -2,-33" stroke="${VEG}" stroke-width="1.5" fill="none"/>
<path d="M68,177 q5,-20 0,-30" stroke="${VEG}" stroke-width="1.5" fill="none"/>
<text x="10" y="205" style="${F}font-size:8.5px;fill:${MUTED}">transpiration</text>
<path d="M600,220 Q585,150 605,90" stroke="${CURRENT}" stroke-width="2.5" fill="none"/>
<path d="M605,90 L599,100 M605,90 L613,98" stroke="${CURRENT}" stroke-width="2.5" fill="none"/>
<text x="520" y="150" style="${F}font-size:9px;fill:${MUTED}">evaporation</text>
<path d="M130,175 Q180,195 220,178 Q260,165 300,160" fill="none" stroke="#5B7FA6" stroke-width="2.5"/>
<text x="140" y="200" style="${F}font-size:8px;fill:${MUTED}">surface runoff (overland flow)</text>
<path d="M145,190 Q142,205 150,215" stroke="#5B7FA6" stroke-width="2" fill="none" stroke-dasharray="2 3"/>
<text x="95" y="228" style="${F}font-size:8px;fill:${MUTED}">infiltration</text>
<path d="M150,255 Q230,270 300,262 Q360,256 400,245" fill="none" stroke="#5B7FA6" stroke-width="1.5" stroke-dasharray="3 3"/>
<text x="150" y="300" style="${F}font-size:8px;fill:${MUTED}">throughflow &amp; groundwater flow (to river &amp; sea)</text>
<path d="M220,168 Q260,220 340,235 Q400,246 460,250 L640,235" stroke="${SHELF}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M220,168 Q260,220 340,235 Q400,246 460,250 L640,235" stroke="#3E8FA6" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.8"/>
<text x="380" y="270" style="${F}font-size:10px;font-weight:600;fill:${INK}">river</text>
<path d="M440,165 L640,235 L640,340 L360,340 Z" fill="${SEA}"/>
<path d="M440,165 L640,235" stroke="${SEA_DEEP}" stroke-width="1.5" opacity="0.6"/>
<text x="560" y="300" style="${F}font-size:12px;font-weight:600;fill:${INK}">sea</text>
</svg>`
  },

  "river-long-profile": {
    caption: "River long profile — how gradient and valley cross-section change from source to mouth",
    svg: `<svg viewBox="0 0 640 300" role="img" aria-label="River long profile from source to mouth, with cross sections showing a V-shaped upper valley and a wide flat lower flood plain">
<path d="M40,50 C140,90 260,190 380,225 C460,245 540,255 610,260" fill="none" stroke="${CURRENT}" stroke-width="3"/>
<line x1="40" y1="260" x2="610" y2="260" stroke="${RULE}" stroke-width="1"/>
<text x="45" y="45" style="${F}font-size:10px;fill:${INK}">source</text>
<text x="565" y="275" style="${F}font-size:10px;fill:${INK}">mouth</text>
<line x1="200" y1="30" x2="200" y2="260" stroke="${RULE}" stroke-dasharray="3 3"/>
<line x1="420" y1="30" x2="420" y2="260" stroke="${RULE}" stroke-dasharray="3 3"/>
<text x="120" y="285" text-anchor="middle" style="${F}font-size:10.5px;fill:${MUTED}">upper course</text>
<text x="310" y="285" text-anchor="middle" style="${F}font-size:10.5px;fill:${MUTED}">middle course</text>
<text x="510" y="285" text-anchor="middle" style="${F}font-size:10.5px;fill:${MUTED}">lower course</text>
<g transform="translate(70,30)">
<polygon points="20,50 45,10 70,50" fill="${ROCK_SOFT}"/>
<polygon points="38,50 45,32 52,50" fill="${SEA_DEEP}"/>
<path d="M20,50 L45,10 L70,50" fill="none" stroke="${INK}" stroke-width="2"/>
<text x="45" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">V-shaped valley,<tspan x="45" dy="10">steep sides</tspan></text>
</g>
<g transform="translate(280,30)">
<polygon points="5,45 25,14 65,14 85,45" fill="${ROCK_SOFT}"/>
<polygon points="35,45 45,30 55,45" fill="${SEA_DEEP}"/>
<path d="M5,45 L25,14 L65,14 L85,45" fill="none" stroke="${INK}" stroke-width="2"/>
<text x="45" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">wider valley,<tspan x="45" dy="10">gentler slopes</tspan></text>
</g>
<g transform="translate(480,30)">
<polygon points="0,40 0,20 110,20 110,40" fill="${SAND}"/>
<path d="M0,40 L0,20 L110,20 L110,40" fill="none" stroke="${INK}" stroke-width="2"/>
<path d="M45,20 Q55,32 65,20" fill="${SEA_DEEP}" stroke="${CURRENT}" stroke-width="2"/>
<text x="55" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">wide flat flood plain,<tspan x="55" dy="10">meanders</tspan></text>
</g>
</svg>`
  },

  "plate-boundaries": {
    caption: "The three types of plate boundary",
    svg: `<svg viewBox="0 0 640 290" role="img" aria-label="Constructive, destructive and conservative plate boundaries, each drawn as a labelled rock cross section">
<defs>
 <clipPath id="pbA"><rect x="0" y="60" width="190" height="90"/></clipPath>
 <clipPath id="pbB"><rect x="0" y="60" width="190" height="90"/></clipPath>
 <clipPath id="pbC"><rect x="0" y="60" width="190" height="90"/></clipPath>
</defs>
<g transform="translate(10,15)">
<rect x="0" y="0" width="190" height="60" fill="#CFE7EE"/>
<g clip-path="url(#pbA)">
${[0,1,2].map(i=>`<rect x="0" y="${68+i*24}" width="80" height="24" fill="${i%2===0?ROCK_HARD:'#8B8478'}"/><rect x="110" y="${68+i*24}" width="80" height="24" fill="${i%2===0?ROCK_HARD:'#8B8478'}"/>`).join('')}
<path d="M80,150 Q95,90 80,68 L110,68 Q95,90 110,150 Z" fill="${LAVA}" opacity="0.9"/>
<ellipse cx="95" cy="150" rx="40" ry="18" fill="${LAVA}"/>
</g>
<path d="M0,60 L78,66 L95,50 L112,66 L190,60" fill="none" stroke="${INK}" stroke-width="2"/>
<polygon points="88,50 95,32 102,50" fill="${SEDIMENT}"/>
<path d="M55,80 L80,68 M135,80 L110,68" stroke="${INK}" stroke-width="2" marker-end="url(#arrR2)"/>
<rect x="0" y="60" width="190" height="90" fill="none" stroke="${INK}" stroke-width="1.5"/>
<text x="95" y="168" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Constructive</text>
<text x="95" y="181" text-anchor="middle" style="${F}font-size:8.5px;fill:${MUTED}">plates move apart —<tspan x="95" dy="10">magma rises to fill the gap,</tspan><tspan x="95" dy="10">building a mid-ocean ridge</tspan></text>
</g>
<g transform="translate(225,15)">
<rect x="0" y="0" width="190" height="60" fill="#CFE7EE"/>
<g clip-path="url(#pbB)">
${[0,1,2].map(i=>`<rect x="100" y="${68+i*24}" width="90" height="24" fill="${i%2===0?ROCK_HARD:'#8B8478'}"/>`).join('')}
<path d="M0,68 L95,68 L60,150 L0,150 Z" fill="${SHELF}" opacity="0.55"/>
<path d="M95,68 L60,150 L100,150 L110,72 Z" fill="#7C6A52"/>
<ellipse cx="118" cy="128" rx="20" ry="14" fill="${LAVA}" opacity="0.9"/>
<path d="M118,128 Q120,90 128,70" stroke="${LAVA}" stroke-width="5" fill="none" opacity="0.85"/>
</g>
<path d="M0,68 Q60,64 95,68 L128,50 L155,68 L190,60" fill="none" stroke="${INK}" stroke-width="2"/>
<polygon points="121,50 128,30 135,50" fill="${SEDIMENT}"/>
<path d="M40,78 L75,72" stroke="${INK}" stroke-width="2" marker-end="url(#arrR2)"/>
<path d="M165,66 L128,68" stroke="${INK}" stroke-width="2" marker-end="url(#arrL2)"/>
<rect x="0" y="60" width="190" height="90" fill="none" stroke="${INK}" stroke-width="1.5"/>
<text x="95" y="168" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Destructive</text>
<text x="95" y="181" text-anchor="middle" style="${F}font-size:8.5px;fill:${MUTED}">dense oceanic plate sinks —<tspan x="95" dy="10">trench, volcano, and the</tspan><tspan x="95" dy="10">strongest earthquakes</tspan></text>
</g>
<g transform="translate(440,15)">
<rect x="0" y="0" width="190" height="60" fill="#CFE7EE"/>
<g clip-path="url(#pbC)">
${[0,1,2].map(i=>`<rect x="0" y="${68+i*24}" width="85" height="24" fill="${i%2===0?ROCK_HARD:'#8B8478'}"/><rect x="105" y="${68+i*24+(i%2===0?6:-6)}" width="85" height="24" fill="${i%2===0?ROCK_HARD:'#8B8478'}"/>`).join('')}
</g>
<line x1="95" y1="58" x2="95" y2="150" stroke="${INK}" stroke-width="2.5" stroke-dasharray="1 4"/>
<path d="M0,68 L95,60 L190,68" fill="none" stroke="${INK}" stroke-width="2"/>
<path d="M40,78 L75,78" stroke="${INK}" stroke-width="2" marker-end="url(#arrR2)"/>
<path d="M150,110 L115,110" stroke="${INK}" stroke-width="2" marker-end="url(#arrL2)"/>
<rect x="0" y="60" width="190" height="90" fill="none" stroke="${INK}" stroke-width="1.5"/>
<text x="95" y="168" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Conservative</text>
<text x="95" y="181" text-anchor="middle" style="${F}font-size:8.5px;fill:${MUTED}">plates grind past —<tspan x="95" dy="10">no crust made or destroyed,</tspan><tspan x="95" dy="10">friction builds then releases</tspan></text>
</g>
<defs>
<marker id="arrR2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${INK}"/></marker>
<marker id="arrL2" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8 Z" fill="${INK}"/></marker>
</defs>
</svg>`
  },

  "longshore-drift": {
    caption: "Longshore drift — the zigzag movement of beach material, and how a groyne interrupts it",
    svg: `<svg viewBox="0 0 560 280" role="img" aria-label="Longshore drift showing swash moving material up the beach at an angle and backwash moving it straight back, with a groyne trapping sediment">
<path d="M0,0 L560,0 L560,150 L0,190 Z" fill="${SEA}"/>
${[0,1,2,3].map(i=>`<path d="M0,${20+i*8} Q90,${5+i*8} 180,${20+i*8} Q270,${35+i*8} 360,${20+i*8} Q450,${5+i*8} 540,${20+i*8}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="${0.55-i*0.1}"/>`).join('')}
<path d="M0,190 L560,150 L560,260 L0,260 Z" fill="${SAND}"/>
${[80,150,250].map(x=>`<circle cx="${x}" cy="${215+Math.sin(x)*5}" r="2" fill="${ROCK_HARD}" opacity="0.5"/>`).join('')}
<rect x="330" y="150" width="10" height="95" fill="#7C5A3A" transform="skewX(-4)"/>
${[0,1,2,3,4].map(i=>`<rect x="${332-i*1.5}" y="${158+i*18}" width="14" height="7" fill="#6B4A2E"/>`).join('')}
<text x="345" y="150" style="${F}font-size:8.5px;fill:${INK}">groyne</text>
${[0,1,2,3,4].map(i=>{
  const x=30+i*95, yb=185-i*6.5;
  return `<path d="M${x-16},${yb+22} Q${x+8},${yb+6} ${x+38},${yb-8}" stroke="${CURRENT}" stroke-width="3" fill="none" marker-end="url(#swash)"/>
  <path d="M${x+38},${yb-8} Q${x+10},${yb+8} ${x-6},${yb+14}" stroke="${SEDIMENT}" stroke-width="2" fill="none" stroke-dasharray="4 3" marker-end="url(#backwash)"/>
  <circle cx="${x-16}" cy="${yb+22}" r="3.5" fill="${LAVA}"/>`;
}).join('')}
<circle cx="360" cy="235" r="3.5" fill="${LAVA}" opacity="0.55"/>
<text x="450" y="230" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">beach</text>
<text x="40" y="55" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">sea</text>
<line x1="30" y1="90" x2="80" y2="112" stroke="${INK}" stroke-width="1.5" marker-end="url(#swash)"/>
${lines(10,78,9,MUTED,["prevailing","wind &amp; wave"])}
<circle cx="26" cy="272" r="4" fill="${LAVA}"/><text x="36" y="276" style="${F}font-size:9px;fill:${INK}">sediment particle path</text>
<line x1="200" y1="272" x2="216" y2="272" stroke="${CURRENT}" stroke-width="2.5"/><text x="222" y="276" style="${F}font-size:9px;fill:${INK}">swash — angled up by the wave</text>
${lines(345,272,8,MUTED,["sediment builds up on the","updrift side of the groyne"])}
<defs>
<marker id="swash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${CURRENT}"/></marker>
<marker id="backwash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${SEDIMENT}"/></marker>
</defs>
</svg>`
  },

  "volcano-cross-section": {
    caption: "Cross-section of a composite (strato) volcano",
    svg: `<svg viewBox="0 0 480 340" role="img" aria-label="Cross section of a composite volcano showing the vent, magma chamber, layered ash and lava, side vent and crater">
<defs><clipPath id="coneCut"><polygon points="240,55 380,300 240,300"/></clipPath></defs>
<rect x="20" y="300" width="440" height="8" fill="${VEG}" opacity="0.5"/>
<polygon points="100,300 240,55 240,300" fill="#8CA37E"/>
<polygon points="240,55 380,300 240,300" fill="#EAEFEB"/>
<g clip-path="url(#coneCut)">
${[0,1,2,3,4,5,6,7].map(i=>`<rect x="150" y="${50+i*32}" width="300" height="34" fill="${i%2===0?ROCK_HARD:'#7A3B22'}"/>`).join('')}
</g>
<polygon points="100,300 240,55 380,300" fill="none" stroke="${INK}" stroke-width="2"/>
${[[145,290],[175,275],[120,295]].map(([x,y])=>`<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="0" y2="-16" stroke="#5C4025" stroke-width="2.5"/><ellipse cx="0" cy="-22" rx="11" ry="10" fill="${VEG}"/></g>`).join('')}
<path d="M247,45 Q255,30 245,20 Q260,20 262,8" fill="none" stroke="${MUTED}" stroke-width="6" stroke-linecap="round" opacity="0.35"/>
<path d="M226,66 L233,50 L247,50 L254,66 L247,78 L233,78 Z" fill="${LAVA}"/>
<path d="M225,270 Q216,160 224,66 Q240,60 256,66 Q262,160 255,270 Z" fill="${LAVA}" opacity="0.92"/>
<path d="M232,266 Q225,160 231,70" stroke="#E8935E" stroke-width="2" fill="none" opacity="0.6"/>
<path d="M215,300 Q200,255 230,235 Q195,225 205,190 Q235,210 240,240 Q260,205 285,215 Q270,245 245,255 Q280,265 265,300 Z" fill="${LAVA}"/>
<polygon points="255,150 300,175 292,192 250,172" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/>
<path d="M292,180 Q296,183 294,190" fill="${LAVA}"/>
<path d="M255,60 C270,110 300,160 330,290" fill="none" stroke="${LAVA}" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
<path d="M255,60 C270,110 300,160 330,290" fill="none" stroke="#E8935E" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
<line x1="240" y1="45" x2="150" y2="45" stroke="${MUTED}" stroke-width="1"/>
${lines(30,42,10,INK,["crater"])}
<line x1="248" y1="66" x2="330" y2="40" stroke="${MUTED}" stroke-width="1"/>
${lines(335,43,10,INK,["main vent (pipe)"])}
<line x1="240" y1="290" x2="40" y2="230" stroke="${MUTED}" stroke-width="1"/>
${lines(30,215,10,INK,["magma chamber"])}
<line x1="310" y1="150" x2="400" y2="120" stroke="${MUTED}" stroke-width="1"/>
${lines(320,110,10,INK,["layers of ash","&amp; lava"])}
<line x1="290" y1="183" x2="400" y2="200" stroke="${MUTED}" stroke-width="1"/>
${lines(320,215,10,INK,["side vent"])}
<line x1="320" y1="220" x2="415" y2="245" stroke="${MUTED}" stroke-width="1"/>
${lines(320,260,10,INK,["lava flow"])}
</svg>`
  },

  "earthquake-focus-epicentre": {
    caption: "Earthquake focus and epicentre",
    svg: `<svg viewBox="0 0 480 300" role="img" aria-label="Cross section showing an earthquake focus underground, the epicentre directly above it on the surface, and seismic waves radiating outward">
<defs><clipPath id="eqGround"><rect x="20" y="80" width="440" height="200"/></clipPath></defs>
<rect x="20" y="80" width="440" height="200" fill="#D9CBB0"/>
<g clip-path="url(#eqGround)">
${[0,1,2,3,4].map(i=>`<path d="M0,${100+i*38} Q240,${90+i*38} 480,${105+i*38}" stroke="#C7B896" stroke-width="10" fill="none" opacity="0.5"/>`).join('')}
</g>
<rect x="20" y="30" width="440" height="50" fill="#CFE3EA"/>
<line x1="20" y1="80" x2="460" y2="80" stroke="${INK}" stroke-width="2"/>
<path d="M150,280 L200,210 L190,180 L230,140 L260,110 L330,80" fill="none" stroke="${LAVA}" stroke-width="3" stroke-dasharray="6 4"/>
${[40,75,110].map(r=>`<circle cx="260" cy="180" r="${r}" fill="none" stroke="${CURRENT}" stroke-width="1.5" opacity="${0.7-r/160}"/>`).join('')}
<path d="M170,80 A90,20 0 0,1 350,80" fill="none" stroke="${CURRENT}" stroke-width="1.5" opacity="0.5"/>
${[[-1,26],[1,34],[-1,44]].map(([d,l])=>`<path d="M260,80 L${260+d*l*0.6},${80+l*0.8}" stroke="${LAVA}" stroke-width="1.5" opacity="0.55"/>`).join('')}
<circle cx="260" cy="180" r="6" fill="${LAVA}"/>
<circle cx="260" cy="80" r="6" fill="${SEDIMENT}"/>
<line x1="260" y1="80" x2="260" y2="180" stroke="${INK}" stroke-width="1.5" stroke-dasharray="3 3"/>
<polygon points="190,80 195,58 210,58 215,80" fill="#B8AFA0" stroke="${INK}"/>
<polygon points="220,80 225,50 245,50 250,80" fill="#A69C8C" stroke="${INK}"/>
<polygon points="255,80 260,62 275,62 280,80" fill="#B8AFA0" stroke="${INK}"/>
<rect x="228" y="58" width="6" height="8" fill="${SEA}"/><rect x="238" y="58" width="6" height="8" fill="${SEA}"/>
${lines(285,70,11,INK,["epicentre — point on the","surface right above the focus"])}
${lines(285,205,11,INK,["focus — where the","earthquake starts,","along the fault"])}
${lines(30,55,10,MUTED,["seismic waves spread"])}
<line x1="130" y1="150" x2="30" y2="150" stroke="${MUTED}" stroke-width="1"/>
${lines(30,145,10,INK,["fault line"])}
</svg>`
  },

  "wave-types": {
    caption: "Constructive vs destructive waves, and the beach each one builds",
    svg: `<svg viewBox="0 0 560 320" role="img" aria-label="Constructive wave building a gentle beach with a strong swash, compared to a destructive wave cutting a steep beach with a strong backwash">
${[
  {ox:10, title:"Constructive wave", sub:"low, long wavelength, low frequency", beach:"20,230 20,150 260,230", crestY:95, crestBulge:20, swashTip:[95,140], note:"beach builds up — sand deposited"},
  {ox:290, title:"Destructive wave", sub:"steep, short wavelength, high frequency", beach:"20,230 20,195 260,230", crestY:80, crestBulge:42, swashTip:[95,200], note:"beach cut back — sand removed"}
].map(p=>`<g transform="translate(${p.ox},0)">
<polygon points="20,60 260,60 260,230 20,230" fill="${SEA}"/>
${[0,1,2].map(i=>`<path d="M20,${p.crestY-10+i*22} Q60,${p.crestY-10-p.crestBulge*0.3+i*22} 100,${p.crestY-10+i*22} T180,${p.crestY-10+i*22} T260,${p.crestY-10+i*22}" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="${0.4-i*0.1}"/>`).join('')}
<path d="M20,${p.crestY} Q60,${p.crestY-p.crestBulge} 100,${p.crestY} Q125,${p.crestY+p.crestBulge*0.4} 100,${p.crestY+p.crestBulge*0.55} Q60,${p.crestY+p.crestBulge*0.15} 20,${p.crestY+6} Z" fill="${SEA_DEEP}"/>
<path d="M20,${p.crestY} Q60,${p.crestY-p.crestBulge} 100,${p.crestY}" fill="none" stroke="#FFFFFF" stroke-width="3"/>
<polygon points="${p.beach}" fill="${SAND}"/>
<path d="M20,${p.beach.split(' ')[1].split(',')[1]} Q${(20+p.swashTip[0])/2},${(+p.beach.split(' ')[1].split(',')[1]+p.swashTip[1])/2-14} ${p.swashTip[0]},${p.swashTip[1]} Q${(20+p.swashTip[0])/2+10},${(+p.beach.split(' ')[1].split(',')[1]+p.swashTip[1])/2+8} 20,${+p.beach.split(' ')[2].split(',')[1]-4}" fill="#EAF6F5" opacity="0.85" stroke="#FFFFFF" stroke-width="1"/>
<text x="140" y="20" text-anchor="middle" style="${F}font-size:12px;font-weight:600;fill:${INK}">${p.title}</text>
<text x="140" y="34" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">${p.sub}</text>
<text x="140" y="250" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">${p.note}</text>
</g>`).join('')}
${lines(20,278,9,MUTED,["pale foam = how far the swash reaches up the beach.","a long, low swash beats a short, weak backwash on a constructive beach — sand builds up.","the reverse happens on a destructive beach, and the beach is cut back."])}
</svg>`
  },

  "headland-bay-erosion": {
    caption: "Headlands and bays form where hard and soft rock meet the sea; the headland is then worn back through a cave–arch–stack–stump sequence",
    svg: `<svg viewBox="0 0 560 320" role="img" aria-label="Formation of headlands and bays from bands of hard and soft rock, and the erosion sequence from cave to arch to stack to stump">
<polygon points="0,0 560,0 560,150 0,150" fill="${SEA}"/>
${[0,1,2].map(i=>`<path d="M0,${20+i*14} Q280,${12+i*14} 560,${22+i*14}" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="${0.4-i*0.1}"/>`).join('')}
<path d="M0,60 L60,55 Q120,20 180,60 Q220,90 260,60 Q320,15 380,60 Q430,95 480,60 L560,55 L560,150 L0,150 Z" fill="${SAND}"/>
<path d="M0,60 L60,55 Q120,20 180,60" fill="none" stroke="#B08650" stroke-width="3" opacity="0.5"/>
<path d="M180,60 Q220,90 260,60 Q320,15 380,60" fill="none" stroke="${ROCK_HARD}" stroke-width="4" opacity="0.7"/>
<path d="M380,60 Q430,95 480,60 L560,55" fill="none" stroke="#B08650" stroke-width="3" opacity="0.5"/>
${[[220,45,-25],[240,52,15],[290,40,-20],[310,50,20],[350,44,-15]].map(([x,y,r])=>`<line x1="${x}" y1="${y}" x2="${x+8}" y2="${y+8}" stroke="${INK}" stroke-width="1" opacity="0.3" transform="rotate(${r} ${x} ${y})"/>`).join('')}
${[["Soft rock",60,"bay — erodes faster"],["Hard rock",220,"headland — resists erosion"],["Soft rock",380,"bay — erodes faster"]].map(([t,x,sub])=>
 `<text x="${x+60}" y="35" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">${t}</text>`+
 `<text x="${x+60}" y="48" text-anchor="middle" style="${F}font-size:8.5px;fill:${MUTED}">${sub}</text>`).join('')}
<line x1="120" y1="8" x2="120" y2="130" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="340" y1="8" x2="340" y2="130" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="10" y1="180" x2="550" y2="180" stroke="${RULE}"/>
<text x="16" y="176" style="${F}font-size:10px;font-weight:600;fill:${INK}">The headland is then eroded back over time:</text>
${[
  {t:"1 · Cave", d:"waves widen a weakness"},
  {t:"2 · Arch", d:"cave breaks through headland"},
  {t:"3 · Stack", d:"arch roof collapses"},
  {t:"4 · Stump", d:"stack is worn down"}
].map((p,i)=>{
  const x=30+i*135;
  const rock = `<polygon points="${x},260 ${x+40},190 ${x+80},260" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/>`;
  let feature='';
  if(i===0) feature=`<ellipse cx="${x+40}" cy="240" rx="10" ry="14" fill="${SEA_DEEP}"/><path d="M${x+30},228 q3,-4 8,-2 M${x+45},226 q3,-3 7,0" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.8"/>`;
  if(i===1) feature=`<ellipse cx="${x+40}" cy="235" rx="16" ry="20" fill="${SEA_DEEP}"/><path d="M${x+22},220 q4,-5 9,-2 M${x+50},218 q4,-4 8,0" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.8"/>`;
  if(i===2) feature=`<polygon points="${x},260 ${x+22},205 ${x+44},260" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/><path d="M${x+10},255 q6,-8 4,-16" stroke="${INK}" stroke-width="1" opacity="0.3" fill="none"/>`;
  if(i===3) feature=`<polygon points="${x+15},260 ${x+40},245 ${x+65},260" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/><ellipse cx="${x+40}" cy="258" rx="18" ry="4" fill="#FFFFFF" opacity="0.5"/>`;
  const base = i===2 || i===3 ? '' : rock;
  return `<rect x="${x-15}" y="260" width="110" height="16" fill="${SEA}"/>${i===2||i===3?'':rock}${feature}
  <text x="${x+40}" y="290" text-anchor="middle" style="${F}font-size:10px;font-weight:600;fill:${INK}">${p.t}</text>
  <text x="${x+40}" y="303" text-anchor="middle" style="${F}font-size:8px;fill:${MUTED}">${p.d}</text>`;
}).join('')}
</svg>`
  },

  "spit-formation": {
    caption: "Formation of a spit",
    svg: `<svg viewBox="0 0 480 280" role="img" aria-label="Formation of a spit where the coastline changes direction, with longshore drift extending it and a salt marsh forming behind the sheltered end">
<polygon points="0,0 480,0 480,280 0,280" fill="${SEA}"/>
${[0,1,2].map(i=>`<path d="M20,${30+i*22} Q120,${20+i*22} 220,${34+i*22}" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="${0.4-i*0.1}"/>`).join('')}
<polygon points="0,0 200,0 170,120 0,90" fill="${SAND}"/>
<polygon points="0,280 480,280 480,180 220,150 0,220" fill="${SAND}"/>
${[[40,60],[90,45],[140,75],[30,110],[100,150],[350,220],[300,250],[400,240]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="${ROCK_HARD}" opacity="0.5"/>`).join('')}
<path d="M170,120 C230,140 260,150 280,155 C310,163 305,190 275,195 C255,198 235,188 225,175" fill="${SAND}" stroke="${INK}" stroke-width="1.5"/>
<path d="M225,175 C218,182 220,192 232,192" fill="none" stroke="${INK}" stroke-width="1.5"/>
<path d="M195,155 C215,168 220,178 218,188" fill="${VEG}" opacity="0.55"/>
${[[200,160],[208,168],[196,172],[213,178]].map(([x,y])=>`<line x1="${x}" y1="${y}" x2="${x-1}" y2="${y-6}" stroke="${VEG}" stroke-width="1.5"/>`).join('')}
<line x1="40" y1="40" x2="90" y2="75" stroke="${INK}" stroke-width="2" marker-end="url(#spitArr)"/>
${lines(15,30,9.5,MUTED,["prevailing wind","&amp; waves"])}
<path d="M100,90 C150,110 200,125 260,150" fill="none" stroke="${CURRENT}" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#spitArr)"/>
${lines(90,110,9.5,CURRENT,["longshore drift"])}
${lines(300,140,10.5,INK,["spit — sand &amp; shingle","deposited past the","bend in the coast"])}
${lines(210,205,10.5,INK,["recurved end — bent by","a second wave direction"])}
${lines(150,175,9.5,VEG,["salt marsh (sheltered","water behind the spit)"])}
<defs><marker id="spitArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${INK}"/></marker></defs>
</svg>`
  },

  "waterfall-formation": {
    caption: "Waterfall formation and retreat, forming a gorge",
    svg: `<svg viewBox="0 0 580 260" role="img" aria-label="Three stages of waterfall formation: undercutting of soft rock beneath hard rock, overhang collapse, and retreat upstream leaving a gorge">
${[
  {ox:10, title:"1 · Undercutting", d:"soft rock erodes faster,\\nhard rock left overhanging"},
  {ox:210, title:"2 · Overhang collapses", d:"unsupported hard rock\\nfalls into the plunge pool"},
  {ox:410, title:"3 · Retreats upstream", d:"repeats — leaves a\\nsteep-sided gorge behind"}
].map((p,i)=>`<g transform="translate(${p.ox},0)">
<rect x="0" y="150" width="160" height="16" fill="${ROCK_HARD}"/>
${[10,30,50,70,90,110,130,150].map(x=>`<line x1="${x}" y1="150" x2="${x-5}" y2="166" stroke="${INK}" stroke-width="1" opacity="0.25"/>`).join('')}
${i===0?`<rect x="0" y="166" width="160" height="30" fill="${ROCK_SOFT}"/>${[8,24,40,56,72,88].map(x=>`<circle cx="${x}" cy="180" r="1.3" fill="${INK}" opacity="0.25"/>`).join('')}<rect x="90" y="176" width="70" height="20" fill="${SEA_DEEP}"/><path d="M92,180 q4,-2 8,0 M100,184 q4,-2 8,0" stroke="#FFFFFF" stroke-width="1" opacity="0.5" fill="none"/>`:''}
${i===1?`<rect x="0" y="166" width="70" height="30" fill="${ROCK_SOFT}"/><polygon points="70,150 70,166 30,166 30,150" fill="${ROCK_HARD}"/><ellipse cx="90" cy="205" rx="45" ry="14" fill="${SEA_DEEP}"/><polygon points="55,210 75,195 90,215" fill="${ROCK_HARD}" opacity="0.6"/>${[[70,195],[80,200],[62,205]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="#FFFFFF" opacity="0.7"/>`).join('')}`:''}
${i===2?`<rect x="0" y="166" width="40" height="30" fill="${ROCK_SOFT}"/><rect x="90" y="150" width="70" height="46" fill="${ROCK_HARD}" opacity="0.25"/><ellipse cx="60" cy="205" rx="42" ry="13" fill="${SEA_DEEP}"/><line x1="90" y1="145" x2="90" y2="200" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>`:''}
<path d="M0,140 L${i===1?70:i===2?40:90},150 ${i===0?'L90,166 L160,180':i===1?'L70,166 L90,205':'L40,166 L60,205'}" fill="none" stroke="${CURRENT}" stroke-width="5" opacity="0.9"/>
<path d="M0,140 L${i===1?70:i===2?40:90},150 ${i===0?'L90,166 L160,180':i===1?'L70,166 L90,205':'L40,166 L60,205'}" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>
<text x="80" y="20" text-anchor="middle" style="${F}font-size:11px;font-weight:600;fill:${INK}">${p.title}</text>
${p.d.split("\\n").map((l,j)=>`<text x="80" y="${36+j*11}" text-anchor="middle" style="${F}font-size:8.5px;fill:${MUTED}">${l}</text>`).join('')}
</g>`).join('')}
<rect x="10" y="150" width="560" height="2" fill="${ROCK_HARD}" opacity="0"/>
</svg>`
  },

  "meander-oxbow-formation": {
    caption: "How a meander becomes an oxbow lake",
    svg: `<svg viewBox="0 0 580 220" role="img" aria-label="Four stages showing a meander bend tightening until the river cuts through the neck and leaves an oxbow lake">
${[
  {ox:10, title:"1 · Meander forms", body:`<path d="M10,110 Q60,60 110,110 Q160,160 210,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M10,110 Q60,60 110,110 Q160,160 210,110" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.5" stroke-linecap="round"/>`},
  {ox:150, title:"2 · Erosion &amp; deposition", body:`<path d="M10,110 Q60,40 110,110 Q160,180 210,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M10,110 Q60,40 110,110 Q160,180 210,110" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
    <path d="M75,96 Q84,110 76,124 Q68,110 75,96 Z" fill="${SAND}" opacity="0.9"/>
    <path d="M50,45 l6,5 M60,38 l5,7 M70,36 l4,7" stroke="${LAVA}" stroke-width="2"/>
    <path d="M50,175 l6,-5 M60,182 l5,-7" stroke="${LAVA}" stroke-width="2"/>
    ${lines(55,30,7.5,LAVA,["erosion"])}
    ${lines(35,195,7.5,SEDIMENT,["deposition (point bar)"])}`},
  {ox:290, title:"3 · Neck narrows", body:`<path d="M10,110 Q50,15 130,60 Q160,80 140,110 Q120,140 90,110 Q60,80 10,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M10,110 Q50,15 130,60 Q160,80 140,110 Q120,140 90,110 Q60,80 10,110" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
    <line x1="75" y1="70" x2="90" y2="95" stroke="${LAVA}" stroke-width="2" stroke-dasharray="3 3"/>
    ${lines(95,80,7.5,LAVA,["narrow neck"])}`},
  {ox:430, title:"4 · Oxbow lake", body:`<path d="M10,110 Q90,110 150,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M10,110 Q90,110 150,110" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
    <path d="M60,105 Q50,15 130,60 Q168,82 145,112 Q120,145 85,112 Z" fill="${SEA_DEEP}" opacity="0.7"/>
    <path d="M62,100 Q54,20 128,62" fill="none" stroke="${SAND}" stroke-width="3" opacity="0.7" stroke-dasharray="2 4"/>`}
].map(p=>`<g transform="translate(${p.ox},10)">
${p.body}
<text x="105" y="0" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">${p.title}</text>
</g>`).join('')}
<text x="290" y="200" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}"><tspan x="290" dy="0">outer bank erodes (fast current) · inner bank deposits (slow current)</tspan><tspan x="290" dy="12">neck is cut through in a flood, and the old loop is abandoned</tspan></text>
<defs><marker id="mArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${INK}"/></marker></defs>
</svg>`
  },

  "farming-system": {
    caption: "A farm as a system — inputs, processes and outputs",
    svg: `<svg viewBox="0 0 560 260" role="img" aria-label="A farm shown as a system with inputs on the left, farm processes in the middle, and outputs on the right">
<rect x="205" y="40" width="150" height="180" fill="#EAEFEB" stroke="${INK}" stroke-width="2"/>
${[0,1,2,3].map(i=>`<rect x="${215+i*33}" y="90" width="28" height="45" fill="${i%2===0?'#C8D9AE':'#DCCB8E'}"/>`).join('')}
<polygon points="215,80 280,45 345,80" fill="${ROCK_HARD}"/>
<rect x="225" y="80" width="110" height="60" fill="${SAND}"/>
<rect x="260" y="100" width="24" height="40" fill="${SHELF}"/>
<rect x="263" y="105" width="7" height="10" fill="#CFE3EA"/>
<ellipse cx="330" cy="150" rx="9" ry="6" fill="#FFFFFF" stroke="${INK}" stroke-width="1"/><circle cx="325" cy="148" r="2" fill="${INK}"/>
<circle cx="222" cy="150" r="5" fill="${SHELF}"/><rect x="217" y="150" width="10" height="7" fill="${SHELF}"/>
<line x1="205" y1="160" x2="355" y2="160" stroke="${VEG}" stroke-width="14" opacity="0.55"/>
<text x="280" y="200" text-anchor="middle" style="${F}font-size:11px;font-weight:600;fill:${INK}">THE FARM</text>
<text x="280" y="213" text-anchor="middle" style="${F}font-size:8px;fill:${MUTED}">ploughing · planting · irrigating</text>
${["Land","Labour","Seeds / livestock","Machinery","Fertiliser &amp; capital"].map((t,i)=>{
  const y=48+i*36;
  return `<text x="10" y="${y}" style="${F}font-size:10px;fill:${INK}">${t}</text><line x1="120" y1="${y-4}" x2="200" y2="${y-4}" stroke="${CURRENT}" stroke-width="2" marker-end="url(#fsArr)"/>`;
}).join('')}
${["Crops / milk / meat","Profit","Waste"].map((t,i)=>{
  const y=70+i*42;
  return `<line x1="360" y1="${y-4}" x2="440" y2="${y-4}" stroke="${SEDIMENT}" stroke-width="2" marker-end="url(#fsArr)"/><text x="446" y="${y}" style="${F}font-size:10px;fill:${INK}">${t}</text>`;
}).join('')}
<text x="205" y="25" style="${F}font-size:9.5px;font-weight:600;letter-spacing:.08em;fill:${MUTED}">INPUTS</text>
<text x="446" y="25" style="${F}font-size:9.5px;font-weight:600;letter-spacing:.08em;fill:${MUTED}">OUTPUTS</text>
<defs><marker id="fsArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${INK}"/></marker></defs>
</svg>`
  },

  "industrial-system": {
    caption: "A factory as a system — inputs, processes and outputs",
    svg: `<svg viewBox="0 0 560 260" role="img" aria-label="A factory shown as a system with inputs on the left, manufacturing processes in the middle, and outputs on the right">
<rect x="205" y="60" width="150" height="150" fill="#EAEFEB" stroke="${INK}" stroke-width="2"/>
<rect x="220" y="80" width="40" height="40" fill="${SHELF}"/>
<rect x="226" y="88" width="10" height="10" fill="#CFE3EA"/><rect x="244" y="88" width="10" height="10" fill="#CFE3EA"/>
<rect x="270" y="70" width="70" height="50" fill="${SHELF}"/>
<polygon points="270,70 290,55 340,55 340,70" fill="#0F3B47"/>
<rect x="285" y="45" width="14" height="30" fill="${MUTED}"/>
<circle cx="292" cy="38" r="5" fill="${RULE}" opacity="0.7"/><circle cx="296" cy="30" r="6" fill="${RULE}" opacity="0.55"/><circle cx="290" cy="24" r="7" fill="${RULE}" opacity="0.4"/>
<rect x="320" y="128" width="26" height="16" fill="${SEDIMENT}"/><circle cx="326" cy="147" r="5" fill="${INK}"/><circle cx="340" cy="147" r="5" fill="${INK}"/>
<text x="280" y="175" text-anchor="middle" style="${F}font-size:11px;font-weight:600;fill:${INK}">FACTORY</text>
<text x="280" y="188" text-anchor="middle" style="${F}font-size:8px;fill:${MUTED}">manufacturing · assembly</text>
<text x="280" y="199" text-anchor="middle" style="${F}font-size:8px;fill:${MUTED}">packaging</text>
${["Raw materials","Labour","Energy","Capital &amp; land"].map((t,i)=>{
  const y=68+i*36;
  return `<text x="10" y="${y}" style="${F}font-size:10px;fill:${INK}">${t}</text><line x1="120" y1="${y-4}" x2="200" y2="${y-4}" stroke="${CURRENT}" stroke-width="2" marker-end="url(#isArr)"/>`;
}).join('')}
${["Products","Profit","Waste &amp; pollution"].map((t,i)=>{
  const y=80+i*42;
  return `<line x1="360" y1="${y-4}" x2="440" y2="${y-4}" stroke="${SEDIMENT}" stroke-width="2" marker-end="url(#isArr)"/><text x="446" y="${y}" style="${F}font-size:10px;fill:${INK}">${t}</text>`;
}).join('')}
<text x="205" y="45" style="${F}font-size:9.5px;font-weight:600;letter-spacing:.08em;fill:${MUTED}">INPUTS</text>
<text x="446" y="45" style="${F}font-size:9.5px;font-weight:600;letter-spacing:.08em;fill:${MUTED}">OUTPUTS</text>
<text x="205" y="225" style="${F}font-size:9px;fill:${MUTED}">feedback — profit is reinvested as a new input</text>
<defs><marker id="isArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${INK}"/></marker></defs>
</svg>`
  }

};
