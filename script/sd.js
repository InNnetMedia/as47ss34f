const hamMenu = document.querySelector(".icon-ham-menu");
const sideBar = document.getElementById("sidebar");
let isVisible = false,
barWidth = sideBar.offsetWidth;
const backgroundO = document.createElement("div");


function toogleBackgroundOn(){
    document.body.appendChild(backgroundO);
    backgroundO.classList.add("backgroundOp");
}
function toogleBackgroundOff(){
    document.body.removeChild(backgroundO);
}

backgroundO.addEventListener("click", () => {
    isVisible = true;
    sideBarAnime();
})

hamMenu.addEventListener("click",sideBarAnime);

function sideBarAnime(){
    if(isVisible){
        sideBar.style.left = -barWidth+"px";
        toogleBackgroundOff();
        isVisible = false;
    }else{
        sideBar.style.left = "0px";
        toogleBackgroundOn();
        isVisible = true;
    }
}

//The background, so that the user cannot click with the sidebar on

const opt = document.getElementById('estimate-option');
const periodeOption = opt.querySelectorAll('span');

periodeOption.forEach(function(element,index,array){
    element.addEventListener('click',() => {
        document.getElementById('per-periode').innerHTML = element.id;
    })
})


//News Image Controller

