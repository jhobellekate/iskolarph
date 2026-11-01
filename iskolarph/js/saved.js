function refreshPage(){
  const items=getSaved().map(findScholarship).filter(Boolean), box=document.getElementById("savedList");
  box.innerHTML=items.length
    ? items.map(cardHTML).join("")+'<p><a class="btn" href="tracker.html">Go to application tracker</a></p>'
    : '<p class="empty">You have not saved anything yet. <a href="scholarships.html">Browse scholarships</a>.</p>';
}
refreshPage();
