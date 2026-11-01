// Exam prep tab: topics, progress tracking, sample questions, and shared resource links.
const EXAM_KEY="iskolarph_exam", LEVELS=["Not Started","Reviewing","Completed"];
function getProgress(){return readJSON(EXAM_KEY,{});}
function topicStatus(id){return getProgress()[id]||"Not Started";}
function setTopicStatus(id,v){const p=getProgress();p[id]=v;writeJSON(EXAM_KEY,p);}

function topicHTML(t){
  const st=topicStatus(t.id);
  const opts=LEVELS.map(l=>`<option ${l===st?"selected":""}>${l}</option>`).join("");
  const f=t.formulas&&t.formulas.length?"<ul>"+t.formulas.map(x=>`<li><code>${x}</code></li>`).join("")+"</ul>":"";
  let q="";
  if(t.q) q=`<div class="sample"><p><strong>Sample question:</strong> ${t.q.text}</p>`+
    t.q.choices.map((c,i)=>`<button class="btn alt" data-q="${t.id}" data-i="${i}">${c}</button>`).join(" ")+`<p class="small" id="fb-${t.id}" role="status"></p></div>`;
  return `<details class="topic"><summary>${t.title} <span class="badge ${st==="Completed"?"open":st==="Reviewing"?"soon":"warn"}">${st}</span></summary>
    <p>${t.notes}</p>${f}${q}
    <label class="small">My progress <select data-topic="${t.id}">${opts}</select></label></details>`;
}
function resourcesHTML(s){
  if(!s.res.length) return "";
  return `<h3>Practice and review links</h3><ul>`+s.res.map((r,i)=>`<li><a href="${RES[r[0]](r[1])}" target="_blank" rel="noopener">${s.name}: ${RES_LABEL[r[0]]} ${i+1}</a></li>`).join("")+
    `</ul><p class="small">These links come from a shared list. They have not been checked for accuracy or coverage of any exam.</p>`;
}
function render(){
  const filter=document.getElementById("eFilter").value;
  let total=0,done=0;
  const html=examSubjects.map(function(s){
    s.topics.forEach(t=>{total++; if(topicStatus(t.id)==="Completed") done++;});
    const shown=s.topics.filter(t=>!filter||topicStatus(t.id)===filter);
    const count=s.topics.filter(t=>topicStatus(t.id)==="Completed").length;
    if(filter && !shown.length) return "";
    return `<section class="group"><h2>${s.name}</h2>${s.topics.length?`<p class="small">${count} of ${s.topics.length} topics completed</p>`:""}${shown.map(topicHTML).join("")}${resourcesHTML(s)}</section>`;
  }).join("");
  document.getElementById("examList").innerHTML=html||'<p class="empty">No topics match this filter.</p>';
  document.getElementById("eSummary").textContent=done+" of "+total+" topics completed";
}
document.getElementById("eFilter").addEventListener("change",render);
document.getElementById("examList").addEventListener("change",function(e){
  if(e.target.dataset.topic){setTopicStatus(e.target.dataset.topic,e.target.value);
    const open=[...document.querySelectorAll("details[open]")].map(d=>d.querySelector("summary").textContent.trim().split(" ")[0]); render();}
});
document.getElementById("examList").addEventListener("click",function(e){
  const id=e.target.dataset.q; if(!id) return;
  const t=examSubjects.flatMap(s=>s.topics).find(x=>x.id===id), i=Number(e.target.dataset.i), fb=document.getElementById("fb-"+id);
  fb.textContent=i===t.q.answer?"Correct.":"Not quite. The answer is: "+t.q.choices[t.q.answer];
});
render();
