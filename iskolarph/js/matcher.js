// Rule-based preliminary matching. Missing data gives "uncertain", never a guess.
const mLoc=document.getElementById("mLoc");
[...new Set(scholarships.map(s=>s.location))].filter(p=>p!=="Nationwide").sort().concat("Elsewhere in the Philippines")
  .forEach(p=>mLoc.insertAdjacentHTML("beforeend",`<option>${p}</option>`));

function checkScholarship(s,me){
  const bad=[], good=[], unsure=[];
  if(s.levels.includes(me.level)) good.push("Open to "+me.level+" students"); else bad.push("Not open to "+me.level+" students");
  if(s.location==="Nationwide"||s.location===me.loc) good.push("Location fits"); else bad.push("For residents of "+s.location);
  if(s.ofwOnly){ if(me.ofw) good.push("OFW-related requirement met"); else bad.push("Requires an OFW or OFW family member"); }
  if(s.minGWA===null) unsure.push("No minimum GWA recorded");
  else if(me.gwa>=s.minGWA) good.push("GWA meets "+s.minGWA+"%"); else bad.push("Needs a GWA of at least "+s.minGWA+"%");
  if(s.maxIncome!==null){
    if(me.income===null) unsure.push("Income limit exists, but you did not enter income");
    else if(me.income<=s.maxIncome) good.push("Income is within the limit"); else bad.push("Income is above PHP "+s.maxIncome.toLocaleString());
  }
  return {s:s,bad:bad,good:good,unsure:unsure};
}
function resultHTML(r){
  const notes=r.bad.concat(r.unsure).concat(r.good).map(x=>`<li>${x}</li>`).join("");
  return `<article class="card"><h3><a href="details.html?id=${r.s.id}">${r.s.name}</a></h3><p class="muted">${r.s.provider}</p><ul class="small">${notes}</ul></article>`;
}
document.getElementById("matchForm").addEventListener("submit",function(e){
  e.preventDefault();
  const level=document.getElementById("mLevel").value, loc=mLoc.value, gwa=parseFloat(document.getElementById("mGwa").value),
        incomeText=document.getElementById("mIncome").value, err=document.getElementById("formError");
  if(!level||!loc||isNaN(gwa)){err.textContent="Please choose a level and location, and enter your GWA.";return;}
  if(gwa<60||gwa>100){err.textContent="GWA must be between 60 and 100.";return;}
  err.textContent="";
  const me={level:level,loc:loc,gwa:gwa,income:incomeText===""?null:Number(incomeText),ofw:document.getElementById("mOfw").checked};
  const results=scholarships.map(s=>checkScholarship(s,me));
  const groups=[
    ["Potential matches",results.filter(r=>r.bad.length===0&&r.unsure.length===0)],
    ["Uncertain (some information is missing)",results.filter(r=>r.bad.length===0&&r.unsure.length>0)],
    ["Possible mismatches",results.filter(r=>r.bad.length>0)]];
  document.getElementById("matchResults").innerHTML=groups.map(g=>
    `<section class="group"><h2>${g[0]} (${g[1].length})</h2><div class="grid">${g[1].map(resultHTML).join("")||'<p class="small">None.</p>'}</div></section>`).join("");
});
