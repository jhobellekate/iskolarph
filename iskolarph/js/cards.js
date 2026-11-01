// Builds a scholarship card and handles every Save/Remove button on any page.
function cardHTML(s){
  const st=getStatus(s);
  return `<article class="card"><span class="badge ${st.cls}">${st.label}</span>
    <h3>${s.name}</h3><p class="muted">${s.provider} · ${s.type}</p>
    <p>${s.description}</p><p class="small">Deadline: ${formatDate(s.deadline)}</p>
    <div class="row"><a class="btn" href="details.html?id=${s.id}">View details</a>
    <button class="btn alt" data-save="${s.id}">${isSaved(s.id)?"Remove":"Save"}</button></div></article>`;
}
document.addEventListener("click",function(e){
  const id=e.target.dataset.save;
  if(!id) return;
  toggleSaved(id);
  if(typeof refreshPage==="function") refreshPage();
});
