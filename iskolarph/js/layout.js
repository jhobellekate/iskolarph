// Shared header, navigation (with mobile menu) and footer for every page.
(function(){
  const links=[["index.html","Home"],["scholarships.html","Scholarships"],["matcher.html","Eligibility Matcher"],["saved.html","Saved"],["tracker.html","Tracker"],["about.html","About & Help"]];
  let here=location.pathname.split("/").pop()||"index.html";
  if(here==="details.html") here="scholarships.html";
  const nav=links.map(l=>`<a href="${l[0]}" ${l[0]===here?'class="active" aria-current="page"':""}>${l[1]}</a>`).join("");
  document.getElementById("site-header").innerHTML=
    `<header class="top"><div class="bar"><a class="logo" href="index.html">IskolarPH</a>
     <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mainNav">Menu</button>
     <nav id="mainNav" aria-label="Main">${nav}</nav></div></header>`;
  document.getElementById("site-footer").innerHTML=
    `<footer class="foot">IskolarPH lists scholarships for reference only. Confirm deadlines and requirements with the official provider before you apply.</footer>`;
  const btn=document.getElementById("menuBtn"), menu=document.getElementById("mainNav");
  btn.addEventListener("click",function(){
    const open=menu.classList.toggle("open");
    btn.setAttribute("aria-expanded",open);
  });
})();
