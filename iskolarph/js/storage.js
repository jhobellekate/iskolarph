// Saved scholarships and tracker progress, kept in this browser's localStorage.
const SAVED_KEY="iskolarph_saved", TRACK_KEY="iskolarph_tracker";
const STATUSES=["Interested","Preparing Requirements","Ready to Apply","Applied","Completed"];
function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback;}catch(e){return fallback;}}
function writeJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
function getSaved(){return readJSON(SAVED_KEY,[]);}
function isSaved(id){return getSaved().includes(id);}
function toggleSaved(id){
  let list=getSaved();
  list=list.includes(id)?list.filter(x=>x!==id):list.concat(id);
  writeJSON(SAVED_KEY,list);
}
function getEntry(id){return Object.assign({status:"Interested",checked:[],personalDeadline:""},readJSON(TRACK_KEY,{})[id]);}
function updateEntry(id,changes){
  const all=readJSON(TRACK_KEY,{});
  all[id]=Object.assign(getEntry(id),changes);
  writeJSON(TRACK_KEY,all);
}
