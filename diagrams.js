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
<path d="M226,66 L233,50 L247,50 L254,66 L247,78 L233,78 Z" fill="${LAVA}"/>
<path d="M232,270 Q222,160 226,66 M254,66 Q258,160 248,270" fill="none" stroke="none"/>
<polygon points="222,270 258,270 248,66 232,66" fill="${LAVA}" opacity="0.9"/>
<ellipse cx="240" cy="290" rx="60" ry="26" fill="${LAVA}"/>
<polygon points="255,150 300,175 292,192 250,172" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/>
<path d="M292,180 Q296,183 294,190" fill="${LAVA}"/>
<path d="M255,60 C270,110 300,160 330,290" fill="none" stroke="${LAVA}" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
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
<rect x="20" y="80" width="440" height="200" fill="#D9CBB0"/>
<rect x="20" y="30" width="440" height="50" fill="#CFE3EA"/>
<line x1="20" y1="80" x2="460" y2="80" stroke="${INK}" stroke-width="2"/>
<path d="M150,280 L200,210 L190,180 L230,140 L260,110 L330,80" fill="none" stroke="${LAVA}" stroke-width="3" stroke-dasharray="6 4"/>
${[40,75,110].map(r=>`<circle cx="260" cy="180" r="${r}" fill="none" stroke="${CURRENT}" stroke-width="1.5" opacity="${0.7-r/160}"/>`).join('')}
<path d="M170,80 A90,20 0 0,1 350,80" fill="none" stroke="${CURRENT}" stroke-width="1.5" opacity="0.5"/>
<circle cx="260" cy="180" r="6" fill="${LAVA}"/>
<circle cx="260" cy="80" r="6" fill="${SEDIMENT}"/>
<line x1="260" y1="80" x2="260" y2="180" stroke="${INK}" stroke-width="1.5" stroke-dasharray="3 3"/>
<polygon points="230,80 235,60 260,55 275,80" fill="#B8AFA0" stroke="${INK}"/>
<polygon points="245,60 250,45 260,45 260,60" fill="#8B8478"/>
${lines(285,70,11,INK,["epicentre — point on the","surface right above the focus"])}
${lines(285,205,11,INK,["focus — where the","earthquake starts,","along the fault"])}
${lines(30,55,10,MUTED,["seismic waves spread"])}
<line x1="130" y1="150" x2="30" y2="150" stroke="${MUTED}" stroke-width="1"/>
${lines(30,145,10,INK,["fault line"])}
</svg>`
  },

  "wave-types": {
    caption: "Constructive vs destructive waves, and the beach each one builds",
    svg: `<svg viewBox="0 0 560 260" role="img" aria-label="Constructive wave building a gentle beach with a strong swash, compared to a destructive wave cutting a steep beach with a strong backwash">
${[
  {ox:10, title:"Constructive wave", sub:"low, long wavelength, low frequency", beach:"20,230 20,150 260,230", swashLen:80, backLen:34, note:"beach builds up — sand deposited"},
  {ox:290, title:"Destructive wave", sub:"steep, short wavelength, high frequency", beach:"20,230 20,190 260,230", swashLen:34, backLen:80, note:"beach cut back — sand removed"}
].map(p=>`<g transform="translate(${p.ox},0)">
<polygon points="20,60 260,60 260,230 20,230" fill="${SEA}"/>
<polygon points="${p.beach}" fill="${SAND}"/>
<path d="M20,110 Q60,${p.ox===10?85:70} 90,110 T160,110" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.85"/>
<line x1="90" y1="150" x2="${90+p.swashLen}" y2="200" stroke="${CURRENT}" stroke-width="3" marker-end="url(#wArr)"/>
<line x1="${90+p.swashLen}" y1="200" x2="90" y2="150" stroke="${SEDIMENT}" stroke-width="2.5" stroke-dasharray="4 3" marker-end="url(#wArr2)" transform="translate(0,0)"/>
<text x="140" y="20" text-anchor="middle" style="${F}font-size:12px;font-weight:600;fill:${INK}">${p.title}</text>
<text x="140" y="34" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">${p.sub}</text>
<text x="140" y="250" text-anchor="middle" style="${F}font-size:9px;fill:${MUTED}">${p.note}</text>
</g>`).join('')}
<line x1="480" y1="90" x2="500" y2="90" stroke="${CURRENT}" stroke-width="3"/><text x="506" y="94" style="${F}font-size:9.5px;fill:${INK}">swash</text>
<line x1="480" y1="108" x2="500" y2="108" stroke="${SEDIMENT}" stroke-width="2.5" stroke-dasharray="4 3"/><text x="506" y="112" style="${F}font-size:9.5px;fill:${INK}">backwash</text>
<defs>
<marker id="wArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${CURRENT}"/></marker>
<marker id="wArr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${SEDIMENT}"/></marker>
</defs>
</svg>`
  },

  "headland-bay-erosion": {
    caption: "Headlands and bays form where hard and soft rock meet the sea; the headland is then worn back through a cave–arch–stack–stump sequence",
    svg: `<svg viewBox="0 0 560 320" role="img" aria-label="Formation of headlands and bays from bands of hard and soft rock, and the erosion sequence from cave to arch to stack to stump">
<polygon points="0,0 560,0 560,150 0,150" fill="${SEA}"/>
<path d="M0,60 L60,55 Q120,20 180,60 Q220,90 260,60 Q320,15 380,60 Q430,95 480,60 L560,55 L560,150 L0,150 Z" fill="${SAND}"/>
<rect x="60" y="20" width="120" height="40" fill="${ROCK_SOFT}" opacity="0.001"/>
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
  if(i===0) feature=`<ellipse cx="${x+40}" cy="240" rx="10" ry="14" fill="${SEA_DEEP}"/>`;
  if(i===1) feature=`<ellipse cx="${x+40}" cy="235" rx="16" ry="20" fill="${SEA_DEEP}"/>`;
  if(i===2) feature=`<polygon points="${x},260 ${x+22},205 ${x+44},260" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/>`;
  if(i===3) feature=`<polygon points="${x+15},260 ${x+40},245 ${x+65},260" fill="${ROCK_HARD}" stroke="${INK}" stroke-width="1.5"/>`;
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
<polygon points="0,0 200,0 170,120 0,90" fill="${SAND}"/>
<polygon points="0,280 480,280 480,180 220,150 0,220" fill="${SAND}"/>
<path d="M170,120 C230,140 260,150 280,155 C310,163 305,190 275,195 C255,198 235,188 225,175" fill="${SAND}" stroke="${INK}" stroke-width="1.5"/>
<path d="M225,175 C218,182 220,192 232,192" fill="none" stroke="${INK}" stroke-width="1.5"/>
<path d="M195,155 C215,168 220,178 218,188" fill="${VEG}" opacity="0.55"/>
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
${i===0?`<rect x="0" y="166" width="160" height="30" fill="${ROCK_SOFT}"/><rect x="90" y="176" width="70" height="20" fill="${SEA_DEEP}"/>`:''}
${i===1?`<rect x="0" y="166" width="70" height="30" fill="${ROCK_SOFT}"/><polygon points="70,150 70,166 30,166 30,150" fill="${ROCK_HARD}"/><ellipse cx="90" cy="205" rx="45" ry="14" fill="${SEA_DEEP}"/><polygon points="55,210 75,195 90,215" fill="${ROCK_HARD}" opacity="0.6"/>`:''}
${i===2?`<rect x="0" y="166" width="40" height="30" fill="${ROCK_SOFT}"/><rect x="90" y="150" width="70" height="46" fill="${ROCK_HARD}" opacity="0.25"/><ellipse cx="60" cy="205" rx="42" ry="13" fill="${SEA_DEEP}"/><line x1="90" y1="145" x2="90" y2="200" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3"/>`:''}
<path d="M0,140 L${i===1?70:i===2?40:90},150 ${i===0?'L90,166 L160,180':i===1?'L70,166 L90,205':'L40,166 L60,205'}" fill="none" stroke="${CURRENT}" stroke-width="3"/>
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
  {ox:10, title:"1 · Meander forms", body:`<path d="M10,110 Q60,60 110,110 Q160,160 210,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>`},
  {ox:150, title:"2 · Erosion &amp; deposition", body:`<path d="M10,110 Q60,40 110,110 Q160,180 210,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M55,55 q10,-8 20,-2" stroke="${LAVA}" stroke-width="2" marker-end="url(#mArr)" fill="none"/>
    <path d="M60,150 q12,6 22,0" stroke="${SEDIMENT}" stroke-width="2" marker-end="url(#mArr)" fill="none"/>`},
  {ox:290, title:"3 · Neck narrows", body:`<path d="M10,110 Q50,15 130,60 Q160,80 140,110 Q120,140 90,110 Q60,80 10,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <line x1="75" y1="70" x2="90" y2="95" stroke="${LAVA}" stroke-width="2" stroke-dasharray="3 3"/>`},
  {ox:430, title:"4 · Oxbow lake", body:`<path d="M10,110 Q90,110 150,110" fill="none" stroke="${CURRENT}" stroke-width="10" stroke-linecap="round"/>
    <path d="M60,105 Q50,15 130,60 Q168,82 145,112 Q120,145 85,112" fill="none" stroke="${SEA_DEEP}" stroke-width="9" stroke-linecap="round" opacity="0.75" stroke-dasharray="1 9"/>`}
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
<polygon points="215,80 280,45 345,80" fill="${ROCK_HARD}"/>
<rect x="225" y="80" width="110" height="60" fill="${SAND}"/>
<rect x="260" y="100" width="24" height="40" fill="${SHELF}"/>
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
<rect x="270" y="70" width="70" height="50" fill="${SHELF}"/>
<rect x="285" y="45" width="14" height="30" fill="${MUTED}"/>
<circle cx="292" cy="42" r="5" fill="${RULE}" opacity="0.7"/>
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
