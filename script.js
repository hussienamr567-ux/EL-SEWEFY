document.body.classList.add("loading");
window.addEventListener("load",()=>setTimeout(()=>{document.querySelector(".loader")?.classList.add("hide");document.body.classList.remove("loading");},500));
document.getElementById("year").textContent=new Date().getFullYear();

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(window.scrollY/h*100)+"%"},{passive:true});

const observer=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function countUp(el){
  const target=Number(el.dataset.target), duration=1200, start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/duration,1), eased=1-Math.pow(1-p,3);
    el.textContent=Math.floor(target*eased);
    if(p<1) requestAnimationFrame(tick); else el.textContent=target;
  }
  requestAnimationFrame(tick);
}
const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){countUp(e.target);counterObserver.unobserve(e.target)}}),{threshold:.7});
document.querySelectorAll(".count").forEach(c=>counterObserver.observe(c));

const dot=document.querySelector(".cursor-dot"), ring=document.querySelector(".cursor-ring");
if(matchMedia("(pointer:fine)").matches){
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
  function cursor(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(cursor)}
  cursor();
  document.querySelectorAll("a,.service,.office,.btn").forEach(el=>{
    el.addEventListener("mouseenter",()=>{ring.style.width="48px";ring.style.height="48px"});
    el.addEventListener("mouseleave",()=>{ring.style.width="32px";ring.style.height="32px"});
  });
}

document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});
  btn.addEventListener("mouseleave",()=>btn.style.transform="");
});

const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
