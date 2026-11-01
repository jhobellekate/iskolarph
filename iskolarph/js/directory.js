// Search, filter and sort for the directory page.
const qBox=document.getElementById("q"), fType=document.getElementById("fType"), fLevel=document.getElementById("fLevel"),
      fLoc=document.getElementById("fLoc"), fStatus=document.getElementById("fStatus"), fSort=document.getElementById("fSort");

const places=[...new Set(scholarships.map(s=>s.location))].sort();
places.forEach(p=>fLoc.insertAdjacentHTML("beforeend",`<option>${p}</option>`));
qBox.value=new URLSearchParams(location.search).get("q")||"";

function refreshPage(){
  const q=qBox.value.trim().toLowerCase();
  let list=scholarships.filter(function(s){
    const text=(s.name+" "+s.provider+" "+s.description+" "+s.location).toLowerCase();
    return (!q||text.includes(q)) && (!fType.value||s.type===fType.value) && (!fLevel.value||s.levels.includes(fLevel.value))
        && (!fLoc.value||s.location===fLoc.value) && (!fStatus.value||getStatus(s).label===fStatus.value);
  });
  if(fSort.value==="deadline"){
    list.sort((a,b)=>(a.deadline||"9999").localeCompare(b.deadline||"9999"));
  } else {
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }
  document.getElementById("count").textContent=list.length+" scholarship"+(list.length===1?"":"s")+" found";
  document.getElementById("results").innerHTML=list.length?list.map(cardHTML).join(""):'<p class="empty">No scholarships match. Try clearing a filter.</p>';
}
[qBox,fType,fLevel,fLoc,fStatus,fSort].forEach(el=>el.addEventListener("input",refreshPage));
refreshPage();
