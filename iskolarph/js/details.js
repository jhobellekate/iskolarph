function refreshPage(){
  const id=new URLSearchParams(location.search).get("id"), s=findScholarship(id), box=document.getElementById("detail");
  if(!s){box.innerHTML='<p class="empty">Scholarship not found. <a href="scholarships.html">Back to the directory</a>.</p>';return;}
  document.title=s.name+" | IskolarPH";
  const st=getStatus(s), list=a=>"<ul>"+a.map(x=>`<li>${x}</li>`).join("")+"</ul>";
  box.innerHTML=`<p><a href="scholarships.html">&larr; All scholarships</a></p>
   <span class="badge ${st.cls}">${st.label}</span><h1>${s.name}</h1><p class="muted">${s.provider} · ${s.type} · ${s.location}</p>
   <div class="row"><button class="btn" data-save="${s.id}">${isSaved(s.id)?"Remove from saved":"Save scholarship"}</button>
   ${isSaved(s.id)?'<a class="btn alt" href="tracker.html">Open in tracker</a>':""}</div>
   <section class="detail-sec"><h2>Overview</h2><p>${s.description}</p></section>
   <section class="detail-sec"><h2>Benefits</h2>${list(s.benefits)}</section>
   <section class="detail-sec"><h2>Eligibility requirements</h2>${list(s.eligibility)}</section>
   <section class="detail-sec"><h2>Required documents</h2>${list(s.docs)}</section>
   <section class="detail-sec"><h2>Application deadline</h2><p>${formatDate(s.deadline)}${s.start?" (opens "+formatDate(s.start)+")":""}</p></section>
   <section class="detail-sec"><h2>Official source</h2><p>${s.link?`<a href="${s.link}" target="_blank" rel="noopener">${s.link}</a>`:"No official link recorded. Ask the provider's office."}</p>
   <p class="small">Last checked: ${formatDate(s.verified)}</p>
   <button class="btn alt" id="reportBtn">Report outdated info</button> <span id="reportMsg" class="small" role="status"></span></section>`;
  document.getElementById("reportBtn").addEventListener("click",function(){
    document.getElementById("reportMsg").textContent="Thanks. This demo version does not send reports anywhere yet.";
  });
}
refreshPage();
