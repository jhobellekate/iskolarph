// Works out a deadline status from the recorded dates and today's date.
function getStatus(s){
  if(!s.deadline) return {label:"Needs Verification",cls:"warn",days:null};
  const today=new Date(); today.setHours(0,0,0,0);
  const end=new Date(s.deadline+"T00:00:00");
  const days=Math.round((end-today)/86400000);
  if(s.start && today<new Date(s.start+"T00:00:00")) return {label:"Upcoming",cls:"info",days:days};
  if(days<0) return {label:"Deadline Passed",cls:"closed",days:days};
  if(days<=14) return {label:"Closing Soon",cls:"soon",days:days};
  return {label:"Open",cls:"open",days:days};
}
function formatDate(d){
  if(!d) return "Not yet confirmed";
  return new Date(d+"T00:00:00").toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"});
}
