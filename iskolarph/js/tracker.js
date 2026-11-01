function trackerCard(s){
  const e=getEntry(s.id);
  const options=STATUSES.map(x=>`<option ${x===e.status?"selected":""}>${x}</option>`).join("");
  const checks=s.docs.map((d,i)=>`<label class="check"><input type="checkbox" data-doc="${s.id}" value="${i}" ${e.checked.includes(i)?"checked":""}> ${d}</label>`).join("");
  return `<article class="card"><h3><a href="details.html?id=${s.id}">${s.name}</a></h3>
    <p class="small">Official deadline: ${formatDate(s.deadline)}</p>
    <label class="small">Status <select data-status="${s.id}">${options}</select></label>
    <label class="small">My own deadline <input type="date" data-pd="${s.id}" value="${e.personalDeadline}"></label>
    <fieldset><legend class="small">Document checklist</legend>${checks}</fieldset></article>`;
}
function render(){
  const items=getSaved().map(findScholarship).filter(Boolean), box=document.getElementById("tracker");
  if(!items.length){box.innerHTML='<p class="empty">Nothing to track yet. <a href="scholarships.html">Save a scholarship</a> first.</p>';return;}
  box.innerHTML=STATUSES.map(function(st){
    const group=items.filter(s=>getEntry(s.id).status===st);
    return group.length?`<section class="group"><h2>${st} (${group.length})</h2><div class="grid">${group.map(trackerCard).join("")}</div></section>`:"";
  }).join("");
}
document.getElementById("tracker").addEventListener("change",function(e){
  const t=e.target;
  if(t.dataset.status){updateEntry(t.dataset.status,{status:t.value});render();}
  else if(t.dataset.pd){updateEntry(t.dataset.pd,{personalDeadline:t.value});}
  else if(t.dataset.doc){
    const id=t.dataset.doc, boxes=document.querySelectorAll('input[data-doc="'+id+'"]');
    const checked=[...boxes].filter(b=>b.checked).map(b=>Number(b.value));
    updateEntry(id,{checked:checked});
  }
});
render();
