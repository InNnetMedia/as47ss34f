const plotRute = document.getElementById("plot-rute");
const midSection = document.querySelector(".mid-section");
const midSectionContent = midSection.querySelectorAll("div");
const btnShowMap = document.getElementById("btnShowMap"); 
const mapContainer = document.querySelector(".map-container"),
        estimates = document.getElementById("estimates");
let mapOn = false,
    copyright = document.getElementById("current-date");



let date = new Date();
copyright.textContent = date.getFullYear();

plotRute.addEventListener("click", () => {
    if(!mapOn){
        mapContainer.classList.add("map-containerOn");
        estimates.style.marginTop = "5px";
        btnShowMap.textContent = "Hide Map";
        if(window.scrollY >= 100){scrollMap()};
        mapOn = true;
    }else{
        mapContainer.classList.remove("map-containerOn");
        //estimates.style.marginTop = "165px";
       if(window.innerWidth >= 601){
        estimates.style.marginTop = "158px";
       }
        btnShowMap.textContent = "Show Map";
        mapOn = false;
    }
    
})
function scrollMap(){
    let  x = window.scrollY;
    const timer3 = setInterval(pullPage,5);
    function pullPage(){
        if(x <= 180){
            clearInterval(timer3);
        }
        x -= 25;
        window.scrollTo(0,x);
        console.log(x);
    }
}
// plotRute.addEventListener("click",() => {
//     plotRute.style.display = "none";
//     midSectionContent[0].style.display = "flex";
//     midSectionContent[1].style.display = "flex";
//     midSectionContent[0].style.flexDirection = "column";
// })



