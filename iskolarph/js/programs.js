// Programs & Universities tab: search and filter a selected program list.
const pQ=document.getElementById("pQ"), pField=document.getElementById("pField"), pType=document.getElementById("pType"), pRegion=document.getElementById("pRegion");
[...new Set(programs.map(p=>p.field))].sort().forEach(f=>pField.insertAdjacentHTML("beforeend",`<option>${f}</option>`));
Object.keys(REGIONS).forEach(k=>pRegion.insertAdjacentHTML("beforeend",`<option value="${k}">${REGIONS[k]}</option>`));

function rowsFor(p){
  const rows=[];
  [["Public",p.pub],["Private",p.pri]].forEach(function(pair){
    Object.keys(pair[1]).forEach(function(r){
      pair[1][r].split(";").forEach(u=>rows.push({univ:u.trim(),type:pair[0],region:r}));
    });
  });
  return rows;
}
function rowHTML(r,program){
  const q=encodeURIComponent(r.univ+" "+program+" official site");
  return `<li><strong>${r.univ}</strong> <span class="badge ${r.type==="Public"?"info":"warn"}">${r.type}</span> <span class="small muted">${REGIONS[r.region]}</span>
    <a class="small" href="https://www.google.com/search?q=${q}" target="_blank" rel="noopener">Find official page</a> ·
    <a class="small" href="scholarships.html?q=${encodeURIComponent(r.univ)}">Search scholarships</a></li>`;
}
function render(){
  const q=pQ.value.trim().toLowerCase(), filtering=q||pField.value||pType.value||pRegion.value;
  let shown=0;
  const html=programs.filter(p=>!pField.value||p.field===pField.value).map(function(p){
    const nameMatch=p.name.toLowerCase().includes(q);
    const rows=rowsFor(p).filter(r=>(!pType.value||r.type===pType.value)&&(!pRegion.value||r.region===pRegion.value)&&(!q||nameMatch||r.univ.toLowerCase().includes(q)));
    if(!rows.length) return "";
    shown+=rows.length;
    return `<details class="topic" ${filtering?"open":""}><summary>${p.name} <span class="small muted">${p.field} · ${rows.length} listing${rows.length===1?"":"s"}</span></summary><ul class="plain">${rows.map(r=>rowHTML(r,p.name)).join("")}</ul></details>`;
  }).join("");
  document.getElementById("pCount").textContent=shown+" listing"+(shown===1?"":"s")+" shown";
  document.getElementById("progList").innerHTML=html||'<p class="empty">Nothing matches. Try clearing a filter.</p>';
}
[pQ,pField,pType,pRegion].forEach(el=>el.addEventListener("input",render));
render();
