/* Inline SVG diagrams for the named/sketchable models in the 0460 syllabus.
   Each entry: { caption, svg }. Referenced from notes-data.js via a
   {"k":"diagram","id":"..."} node, rendered by renderNodes() in index.html.
   Kept as plain hand-built SVG (no external assets) so it works offline and
   matches the site's own mono/display type + colour palette. */

const F = "font-family:'IBM Plex Mono',ui-monospace,monospace;";
const INK = "#0D2029", MUTED = "#596E75", RULE = "#C3D1CC";
const CURRENT = "#1B7F8E", REEF = "#48B7A6", SEDIMENT = "#C98A2E", LAVA = "#B34329", SHELF = "#134B5A";

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
    svg: `<svg viewBox="0 0 640 320" role="img" aria-label="The hydrological cycle showing evaporation, condensation, precipitation, runoff and groundwater flow">
<path d="M0,230 L120,140 L220,175 L320,110 L420,175 L640,230 L640,320 L0,320 Z" fill="#EAEFEB" stroke="${RULE}"/>
<path d="M420,175 L640,230 L640,320 L360,320 Z" fill="#CFE3EA"/>
<ellipse cx="230" cy="60" rx="55" ry="22" fill="#D8E6DE" stroke="${RULE}"/>
<ellipse cx="280" cy="50" rx="42" ry="18" fill="#D8E6DE" stroke="${RULE}"/>
<text x="255" y="55" text-anchor="middle" style="${F}font-size:9.5px;fill:${INK}">condensation</text>
<path d="M100,130 q8,-30 0,-45" stroke="${SHELF}" stroke-width="2" fill="none"/>
<path d="M108,132 q9,-28 2,-42" stroke="${SHELF}" stroke-width="2" fill="none"/>
<text x="70" y="100" style="${F}font-size:9.5px;fill:${MUTED}">transpiration</text>
<path d="M560,225 q-10,-40 4,-60" stroke="${CURRENT}" stroke-width="2.5" fill="none" marker-end="url(#arrowUp)"/>
<text x="520" y="150" style="${F}font-size:9.5px;fill:${MUTED}">evaporation</text>
<line x1="245" y1="75" x2="235" y2="100" stroke="${CURRENT}" stroke-width="2" marker-end="url(#arrowDown)"/>
<line x1="265" y1="70" x2="258" y2="98" stroke="${CURRENT}" stroke-width="2" marker-end="url(#arrowDown)"/>
<text x="200" y="95" style="${F}font-size:9.5px;fill:${MUTED}">precipitation</text>
<path d="M110,150 C160,180 260,150 320,120" stroke="${LAVA}" stroke-width="2" fill="none" marker-end="url(#arrowRight)"/>
<text x="130" y="145" style="${F}font-size:9px;fill:${MUTED}">surface runoff (overland flow)</text>
<line x1="140" y1="160" x2="145" y2="180" stroke="${SEDIMENT}" stroke-width="2" marker-end="url(#arrowDown)"/>
<text x="95" y="200" style="${F}font-size:9px;fill:${MUTED}">infiltration</text>
<path d="M150,185 C220,210 260,205 300,190" stroke="${SEDIMENT}" stroke-width="1.5" fill="none" stroke-dasharray="3 3" marker-end="url(#arrowRight)"/>
<text x="150" y="230" style="${F}font-size:9px;fill:${MUTED}">throughflow &amp; groundwater flow (to river / sea)</text>
<path d="M220,175 C260,220 340,235 420,240" stroke="${SHELF}" stroke-width="3" fill="none"/>
<text x="380" y="255" style="${F}font-size:10px;fill:#fff">river</text>
<text x="560" y="290" style="${F}font-size:11px;font-weight:600;fill:${INK}">sea</text>
<defs>
<marker id="arrowUp" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,8 L4,0 L8,8 Z" fill="${CURRENT}"/></marker>
<marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,0 L4,8 Z" fill="${CURRENT}"/></marker>
<marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${LAVA}"/></marker>
</defs>
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
<path d="M20,50 L45,0 L70,50 Z" fill="none" stroke="${SEDIMENT}" stroke-width="2"/>
<text x="45" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">V-shaped valley,<tspan x="45" dy="10">steep sides</tspan></text>
</g>
<g transform="translate(280,30)">
<path d="M5,45 L25,10 L65,10 L85,45" fill="none" stroke="${SEDIMENT}" stroke-width="2"/>
<text x="45" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">wider valley,<tspan x="45" dy="10">gentler slopes</tspan></text>
</g>
<g transform="translate(480,30)">
<path d="M0,40 L0,20 L110,20 L110,40" fill="none" stroke="${SEDIMENT}" stroke-width="2"/>
<path d="M45,20 Q55,32 65,20" fill="none" stroke="${CURRENT}" stroke-width="2"/>
<text x="55" y="65" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">wide flat flood plain,<tspan x="55" dy="10">meanders</tspan></text>
</g>
</svg>`
  },

  "plate-boundaries": {
    caption: "The three types of plate boundary",
    svg: `<svg viewBox="0 0 640 260" role="img" aria-label="Constructive, destructive and conservative plate boundaries">
<g transform="translate(10,20)">
<rect x="0" y="60" width="190" height="24" fill="#EAEFEB"/>
<path d="M20,84 L85,50 L95,84 Z" fill="${LAVA}" opacity="0.85"/>
<path d="M105,84 L115,50 L180,84 Z" fill="${LAVA}" opacity="0.85"/>
<path d="M85,84 L95,45 L105,84 Z" fill="${SEDIMENT}"/>
<path d="M40,90 L70,70 M120,70 L150,90" stroke="${INK}" stroke-width="2" marker-end="url(#arrR)"/>
<path d="M150,90 L120,70 M70,70 L40,90" stroke="none"/>
<text x="95" y="115" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Constructive</text>
<text x="95" y="128" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">plates move apart —<tspan x="95" dy="10">magma rises, new crust,</tspan><tspan x="95" dy="10">mid-ocean ridge</tspan></text>
</g>
<g transform="translate(225,20)">
<rect x="0" y="60" width="190" height="24" fill="#EAEFEB"/>
<path d="M0,84 L100,84 L100,64 L20,50 L0,55 Z" fill="${SHELF}" opacity="0.8"/>
<path d="M100,84 L190,84 L190,40 L100,64 Z" fill="${SEDIMENT}" opacity="0.8"/>
<path d="M100,60 L108,110 L128,150" fill="none" stroke="${LAVA}" stroke-width="3" stroke-dasharray="2 4"/>
<path d="M115,60 L100,20 L130,25 Z" fill="${LAVA}"/>
<path d="M60,80 L90,72" stroke="${INK}" stroke-width="2" marker-end="url(#arrR)"/>
<path d="M150,60 L120,68" stroke="${INK}" stroke-width="2" marker-end="url(#arrL)"/>
<text x="95" y="115" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Destructive</text>
<text x="95" y="128" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">oceanic plate subducts —<tspan x="95" dy="10">trench, volcano,</tspan><tspan x="95" dy="10">strong earthquakes</tspan></text>
</g>
<g transform="translate(440,20)">
<rect x="0" y="60" width="190" height="24" fill="#EAEFEB"/>
<line x1="95" y1="30" x2="95" y2="84" stroke="${INK}" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M40,45 L75,45" stroke="${INK}" stroke-width="2" marker-end="url(#arrR)"/>
<path d="M150,95 L115,95" stroke="${INK}" stroke-width="2" marker-end="url(#arrL)"/>
<text x="95" y="115" text-anchor="middle" style="${F}font-size:10.5px;font-weight:600;fill:${INK}">Conservative</text>
<text x="95" y="128" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">plates slide past —<tspan x="95" dy="10">friction builds then</tspan><tspan x="95" dy="10">releases as earthquakes</tspan></text>
</g>
<defs>
<marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${INK}"/></marker>
<marker id="arrL" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8 Z" fill="${INK}"/></marker>
</defs>
</svg>`
  },

  "longshore-drift": {
    caption: "Longshore drift — the zigzag movement of beach material",
    svg: `<svg viewBox="0 0 560 260" role="img" aria-label="Longshore drift showing swash moving material up the beach at an angle and backwash moving it straight back">
<path d="M0,0 L560,0 L560,150 L0,190 Z" fill="#CFE3EA"/>
<path d="M0,190 L560,150 L560,260 L0,260 Z" fill="#EAEFEB"/>
${[0,1,2,3,4,5].map(i=>{
  const x=40+i*90, yb=190-i*7.2;
  return `<path d="M${x-14},${yb+18} L${x+34},${yb-6}" stroke="${CURRENT}" stroke-width="2.5" marker-end="url(#swash)"/>
  <path d="M${x+34},${yb-6} L${x-4},${yb+10}" stroke="${SEDIMENT}" stroke-width="2" marker-end="url(#backwash)" stroke-dasharray="4 3"/>
  <circle cx="${x-14}" cy="${yb+18}" r="3.5" fill="${LAVA}"/>`;
}).join('')}
<text x="450" y="230" style="${F}font-size:11px;font-weight:600;fill:${INK}">beach</text>
<text x="60" y="60" style="${F}font-size:11px;font-weight:600;fill:${INK}">sea</text>
<line x1="30" y1="90" x2="90" y2="115" stroke="${INK}" stroke-width="1.5" marker-end="url(#swash)"/>
<text x="10" y="80" style="${F}font-size:9px;fill:${MUTED}">prevailing<tspan x="10" dy="10">wind &amp; wave</tspan></text>
<circle cx="26" cy="238" r="4" fill="${LAVA}"/><text x="36" y="242" style="${F}font-size:9.5px;fill:${INK}">sediment particle</text>
<line x1="200" y1="238" x2="216" y2="238" stroke="${CURRENT}" stroke-width="2.5"/><text x="222" y="242" style="${F}font-size:9.5px;fill:${INK}">swash (angled by wave)</text>
<line x1="200" y1="252" x2="216" y2="252" stroke="${SEDIMENT}" stroke-width="2" stroke-dasharray="4 3"/><text x="222" y="256" style="${F}font-size:9.5px;fill:${INK}">backwash (straight, gravity)</text>
<defs>
<marker id="swash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${CURRENT}"/></marker>
<marker id="backwash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${SEDIMENT}"/></marker>
</defs>
</svg>`
  }

};
