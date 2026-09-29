const ids=["from","to","date","train","class","passengers"];
const $=id=>document.getElementById(id);
function renderPassengers(){
  const n=Math.min(4,Math.max(1,Number($("passengers").value)||1));
  let html="";
  for(let i=1;i<=n;i++) html+=`<div class="passenger"><h3>Passenger ${i}</h3>
    <label>Name<input data-p="name" data-i="${i}" placeholder="Full name"></label>
    <label>NID/ID last details (optional)<input data-p="id" data-i="${i}" placeholder="Enter only if needed"></label>
  </div>`;
  $("passengerBox").innerHTML=html;
}
function save(){
  const data={};
  ids.forEach(id=>data[id]=$(id).value);
  data.passengers=[];
  document.querySelectorAll(".passenger").forEach(p=>{
    const i=p.querySelector("[data-p=name]").dataset.i;
    data.passengers.push({
      name:p.querySelector('[data-p="name"]').value,
      id:p.querySelector('[data-p="id"]').value
    });
  });
  localStorage.setItem("railwayHelper",JSON.stringify(data));
  $("status").textContent="Trip saved on this device.";
}
function load(){
  const raw=localStorage.getItem("railwayHelper");
  if(!raw){renderPassengers();return}
  const d=JSON.parse(raw);
  ids.forEach(id=>{if(d[id]!=null) $(id).value=d[id]});
  renderPassengers();
  (d.passengers||[]).forEach((p,i)=>{
    const box=document.querySelectorAll(".passenger")[i];
    if(box){
      box.querySelector('[data-p="name"]').value=p.name||"";
      box.querySelector('[data-p="id"]').value=p.id||"";
    }
  });
}
$("passengers").addEventListener("input",renderPassengers);
$("save").onclick=save;
$("open").onclick=()=>window.open("https://eticket.railway.gov.bd/","_blank","noopener");
$("clear").onclick=()=>{localStorage.removeItem("railwayHelper");location.reload()};
load();