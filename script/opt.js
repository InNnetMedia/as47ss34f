const listType = document.querySelectorAll(".list-type"),
engineList = document.querySelector(".engine-list"),
transmitionList = document.querySelector(".transmition-list"),
selectedEngine = document.querySelector(".selected-engine"),
selectedTransmition = document.querySelector(".selected-engine");
AC_mode = document.querySelector('.selected-AC-mode'),
fuelType = document.querySelector('.selected-fuel-type');
let listOptions = engineList.querySelectorAll("span");

let j = true;


const backdrop = document.createElement('div');
listType.forEach(function(element,index,array){

    const dropDown = element.querySelector("div");
    let selectedOption = element.querySelectorAll("span");
    
    element.addEventListener("click",() => {
        if(j){
            document.body.appendChild(backdrop);
            backdrop.classList.add('j-ii3');
            dropDown.classList.toggle("list-display");
            console.log('Click event 1');
            j = false;
        }
        j = true;

    })

    backdrop.addEventListener('click', () => {
        dropDown.classList.remove('list-display');
        document.body.removeChild(backdrop);

    })

    const optionList = dropDown.querySelectorAll("span");
    optionList.forEach(function(element,index,array){
        element.addEventListener("click", () => {
            selectedOption[0].innerHTML = element.innerHTML;
            document.body.removeChild(backdrop);
            console.log('The remove thing executed');
            dropDown.classList.toggle("list-display");
            j = false;
        })
        
    })
    

})



//Bike selection error handling
const towWeight = document.getElementById('tow-weight');
const v_list = document.querySelector('.vehicle-list');
const vehicles = v_list.querySelectorAll('span');
const se_vehicle = document.querySelector('.selected-vehicle-type'),
AC = document.querySelector('.AC-list'),
se_AC = document.querySelector('.selected-AC'),
AC_selector = document.getElementById('airCon-selector'),
bikeFuel = document.getElementsByName('c3251'),
otherEngines = document.getElementsByName('c3351');



vehicles.forEach(function(element,index,array){
    element.addEventListener('click',handleBike.bind(null,element));
})
function handleBike(element){
    se_vehicle.innerHTML = element.innerHTML;
    console.log(`selected type is ${se_vehicle.innerHTML}`);
    AC_selector.style.pointerEvents = 'auto';
    se_AC.innerHTML = 'AirCon';
    //AC.classList.toggle('list-display');
    towWeight.disabled = false;
    if(se_vehicle.innerHTML == 'Bike'){
        console.error('We have a bike selected');
        towWeight.disabled = true;
        se_AC.innerHTML = 'AC Unit(none)';
        AC_selector.style.pointerEvents = 'none';
        towWeight.value = null;
        fuelType.innerHTML = 'Fuel Type';
        bikeFuel.forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.color = 'red';
        })
        otherEngines.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.color = 'black';
            selectedEngine.innerHTML = 'Engine';
        })
    }else{
        bikeFuel.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.color = 'black';
        })
        otherEngines.forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.color = 'red';
        })
        
    }
}

//Detailed fuel prices pop-up
document.querySelector('.right-section').addEventListener('click',detailedFuelInfo);

function detailedFuelInfo(){
    const backgroundDiv = document.createElement('div');
    const infoContainer = document.createElement('div');
    let date = new Date();
    infoContainer.innerHTML = `
        <h3>SA Fuel Prices ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h3>
        <div>
            <span class="title"><img src="web-icons/fuel-review-dark/icons8-inland-100.png" id="icon-inland">Inland</span>
            <span>Unleaded 93: R 22.71</span>
            <span>Unleaded 95: R 23.11</span>
            <span>LRP 93: R 22.71</span>
            <span>50 PPM(0.005%): R 20.74</span>
            <span>500 PPM(0.05%): R 19.59</span>
        </div>
        <div>
            <span class="title"><img src="web-icons/fuel-review-dark/icons8-coastal-100.png" id="icon-coast">Coast</span>
            <span>Unleaded 93: R 21.92</span>
            <span>Unleaded 95: R 22.32</span>
            <span>LRP 95: R 22.32</span>
            <span>50 PPM(0.005%): R 19.98</span>
            <span>500 PPM(0.05%): R 19.59</span>
        </div>
        
    `
    document.body.appendChild(backgroundDiv);
    backgroundDiv.append(infoContainer);
    backgroundDiv.classList.add('backgroundDiv');
    infoContainer.classList.add('infoContainer');
    backgroundDiv.addEventListener('click',() => {
        document.body.removeChild(backgroundDiv);
    })
    document.querySelector('.right-section').addEventListener('click',()=>{
    document.body.removeChild(backgroundDiv);
    });

}

