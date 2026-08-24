/* Inline SVG diagrams for the plottable/schematic models in the 0460
   syllabus. Each entry: { caption, svg }. Referenced from notes-data.js via
   a {"k":"diagram","id":"..."} node, rendered by renderNodes() in
   index.html. Kept as plain hand-built SVG (no external assets) so it works
   offline and matches the site's own mono/display type + colour palette.

   Scope: this file holds diagrams that plot data on axes (line/bar graphs)
   or draw a clean, self-contained geometric model (concentric rings, sector
   wedges, input→output system boxes) — the kind of shape that stays legible
   from hand-picked coordinates. Illustrated scenes (landform cross-sections,
   formation sequences) were dropped after repeated label/leader-line
   collisions and stay off the site until there's a trustworthy way to build
   them. */

const F = "font-family:'IBM Plex Mono',ui-monospace,monospace;";
const INK = "#0D2029", MUTED = "#596E75", RULE = "#C3D1CC";
const CURRENT = "#1B7F8E", REEF = "#48B7A6", SEDIMENT = "#C98A2E", SHELF = "#134B5A";
const ROCK_HARD = "#9C9184", VEG = "#6B9E78";

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

  "farming-system": {
    caption: "A farm as a system — inputs, processes and outputs",
    svg: `<svg viewBox="0 0 560 260" role="img" aria-label="A farm shown as a system with inputs on the left, farm processes in the middle, and outputs on the right">
<rect x="205" y="40" width="150" height="180" fill="#EAEFEB" stroke="${INK}" stroke-width="2"/>
${[0,1,2,3].map(i=>`<rect x="${215+i*33}" y="90" width="28" height="45" fill="${i%2===0?'#C8D9AE':'#DCCB8E'}"/>`).join('')}
<polygon points="215,80 280,45 345,80" fill="${ROCK_HARD}"/>
<rect x="225" y="80" width="110" height="60" fill="#E8D6A8"/>
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
