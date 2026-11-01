function refreshPage(){
  document.getElementById("featured").innerHTML=scholarships.slice(0,3).map(cardHTML).join("");
  const upcoming=scholarships.filter(s=>s.deadline && getStatus(s).days>=0)
    .sort((a,b)=>getStatus(a).days-getStatus(b).days).slice(0,4);
  document.getElementById("upcoming").innerHTML=upcoming.length
    ? upcoming.map(s=>{const st=getStatus(s);
        return `<li><a href="details.html?id=${s.id}">${s.name}</a><span><span class="badge ${st.cls}">${st.label}</span> ${formatDate(s.deadline)}</span></li>`;}).join("")
    : '<li>No upcoming deadlines are recorded right now.</li>';
}
refreshPage();
