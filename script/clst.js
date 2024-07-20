const btnFill = document.getElementById("btnFill"),
errorMessage = document.getElementById('error-message');
    btnReset = document.getElementById("btnReset");
let fuelPrice = document.getElementById("fuel-price"),
    moneyPaid = document.getElementById("money-paid"),
    fuelPumped = document.getElementById("fuel-pumped");
let money = 0.0,
    liters = 0.0;





btnFill.addEventListener("mousedown",fillTank);
btnFill.addEventListener("touchstart",fillTank);
function resetPump(){
    money = 0.0;
    liters = 0.0;
    moneyPaid.textContent = `R ${money}.00`;
    fuelPumped.textContent = `${liters}.00 L`;
}
btnReset.addEventListener("click",resetPump);

const pumpSpeed = document.getElementsByName('pump-speed-select');
let pump_speed = 90;
pumpSpeed.forEach(function(element,index,array){
    element.addEventListener('change',() => {
        pump_speed = element.value;
    })
})
let interval2 = 0.2391;
function fillTank(){
    let timer = setInterval(fillAnime,pump_speed);
    btnFill.addEventListener("mouseup",() => {
        clearInterval(timer);
    });
    btnFill.addEventListener("touchend", () => {
        clearInterval(timer);
    })
    function fillAnime(){
        money += interval2;
        liters += 0.01;
        moneyPaid.textContent = `R ${money.toFixed(2)}`;
        fuelPumped.textContent = `${liters.toFixed(2)} L`;
    }
}


//Cookie Banner pop up

const cContainer = document.createElement("div"),
cInstruction = document.createElement("span"),
cbtnContainer = document.createElement("div"),
cookieDesc = document.createElement("p"),
policy = document.createElement("a");
btnAcceptCookies = document.createElement("button"),
btnRejectCookies = document.createElement("button");

const cookieTimer = setTimeout(() => {
    policy.textContent = "Cookie Policy";
    btnRejectCookies.textContent = "Reject All";
    btnAcceptCookies.textContent = "Accept";
    btnRejectCookies.classList.add("btnRejectCookies");
    btnAcceptCookies.classList.add("btnAcceptCookies");
    
    document.body.appendChild(cContainer);
    cookieDesc.textContent = `We use cookies that are strictly necessary for this website to function as well as for advertising purposes. Please refer to our ${policy.textContent}🍪`;
    cContainer.append(cookieDesc);
    cInstruction.textContent = "Do you consent to us using cookies on your device";
    cContainer.append(cInstruction);
    cbtnContainer.append(btnAcceptCookies);
    cbtnContainer.append(btnRejectCookies);
    cContainer.append(cbtnContainer);

    cContainer.classList.add("cookie-container");
    
    cbtnContainer.classList.add("cookiebtn-container");
}, 8000);

if(localStorage.getItem('adCookie') == 'ws2s125'){
    clearTimeout(cookieTimer);
}

btnAcceptCookies.addEventListener("click",() => {
    localStorage.setItem('adCookie','ws2s125');
    console.log(localStorage.getItem('adCookie'));
    document.body.removeChild(cContainer);
})
btnRejectCookies.addEventListener('click', () => {
    localStorage.setItem('adCookie','ws2s125');
    console.log(localStorage.getItem('adCookie'));
    document.body.removeChild(cContainer);
})



//Maps Stuff
//AIzaSyBqmN2f2jPHib3u4QbS7yKYluJOx6Ffn5k
async function calculateDistance() {
    console.log('calling the distance function');
    const origin = document.getElementById('from-location').value;
    const destination = document.getElementById('to-location').value;
    const apiKey = 'AIzaSyBqmN2f2jPHib3u4QbS7yKYluJOx6Ffn5k';

    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
        const element = data.rows[0].elements[0];
        if (element.status === 'OK') {
            const distance = element.distance.text;
            const duration = element.duration.text;
            console.log(`Distance: ${distance}, Duration: ${duration}`);
        } else {
            console.log('Error calculating distance');
        }
    } else {
        console.log('Error fetching data from API');
    }
}
document.getElementById('btnSearch').addEventListener('click', calculateDistance);

const h_fuelPrice = document.getElementById('fuelPrice');
const h_fuelType = document.getElementById('fuelType');

const fuelPricing = {
    petrolType:['Un 93','Un 95', 'LPR 93', 'LPR 95'],
    petrolPrice:[22.86, 23.26, 22.86, 22.47],

    dieselType:['ppm50', 'ppm500', 'ppm50','ppm500'],
    dieselPrice:[20.91, 19.87, 20.15, 19.87]
}
console.log("Index of Unleaded 95 is "+fuelPricing.petrolType.indexOf('Un 95'));
function h_priceDisplay(){
    let petrolDisplayed = true;
    let index = 0;

    const timer2 = setInterval(() => {
        try{
            if(petrolDisplayed){
                displayPetrol();
                index++;
            }else{
                displayDiesel();
                index++;
            }
        }catch(err){
            console.log(err);
            clearInterval(timer2);
        }
        
    },10000)

    function displayPetrol(){
        h_fuelType.textContent = `⛽${fuelPricing.petrolType[index]}`;
        h_fuelPrice.textContent = `R ${fuelPricing.petrolPrice[index]}`
        if(index == 3){
            petrolDisplayed = false;
            index = -1;
        }
    }
    function displayDiesel(){
        h_fuelType.textContent = `⛽${fuelPricing.dieselType[index]}`;
        h_fuelPrice.textContent = `R ${fuelPricing.dieselPrice[index]}`;
        if(index == 3){
            petrolDisplayed = true;
            index = -1;
        }
        
    }
}
h_priceDisplay();
let fuelType_index = 0;
let petrol = true;
const pumpFuelType = document.querySelector('.fuel-type-pumpDisplay');
pumpFuelType.addEventListener('click',changeFuelType);
function changeFuelType(){
   
    if(petrol){
        resetPump();
        pumpFuelType.textContent = fuelPricing.petrolType[fuelType_index];
        fuelPrice.textContent = `R ${fuelPricing.petrolPrice[fuelType_index]}`;
        fuelType_index += 1;
        if(fuelType_index >= 4){
            petrol = false;
            fuelType_index = 0;
        };
    }else{
        resetPump();
        pumpFuelType.textContent = fuelPricing.dieselType[fuelType_index];
        fuelPrice.textContent = `R ${fuelPricing.dieselPrice[fuelType_index]}`;
        fuelType_index += 1;
        if(fuelType_index >= 4){
            petrol = true;
            fuelType_index = 0;
        };
    }
    interval2 = (fuelPrice.textContent.slice(2,7)/100);
    console.log("Interval2 = "+interval2);
    console.log(fuelType_index);
    
}



const vConsFac = {
    aveSpeed:0,//****
    aveConsumption:0,//****
    engine_type:3,//****
    engine_diaplacement:1.6,//****
    transmission:'automatic',//****
    v_type:'Hatchback',
    v_age:2,
    v_milage:87000,
    fuel_capacity:0,//****
    trip_distance:0,//****
    tirePressure:'normal',
    AC:'OFF',
    fuelType:'Un 93',//****
    oil_level:'high',
    terrain:'flat',//****
    road_surface:'tarmac',//****
    towing:0,
    totalC:0.00,
    totalM:0.00,//****
    sportsCar:{
        sportsMode:false,
    },
    truck:{
        loadWeight:300,
    }
}




//Gathering Info before executed when the Calculate Button is activated
function setUserInfo(){
    vConsFac.aveSpeed = document.getElementById('average-speed').value;
    vConsFac.aveConsumption = document.getElementById('fuelPer100').value;
    vConsFac.fuel_capacity = document.getElementById('fuel-capacity').value;
    vConsFac.trip_distance = document.getElementById('trip-distance').value;
    vConsFac.towing = document.getElementById('tow-weight').value;
    
    if(document.querySelector('.selected-vehicle-type').innerHTML == 'Vehicle Type'){document.querySelector('.selected-vehicle-type').innerHTML = 'Hatchback'};
    if(vConsFac.engine_type == 'Engine'){vConsFac.engine_type == 'Turbocharged'};
    if(document.querySelector('.selected-transmition').innerHTML == 'Transmition'){document.querySelector('.selected-transmition').innerHTML = 'Automatic'};
    if(document.querySelector('.selected-fuel-type').innerHTML == 'Fuel Type'){document.querySelector('.selected-fuel-type').innerHTML = 'Un 95'};
    if(vConsFac.AC == 'AirCon'){vConsFac.AC == 'OFF'};

    vConsFac.transmission = document.querySelector('.selected-transmition').innerHTML;
    vConsFac.road_surface = document.querySelector('.selected-road-type').innerHTML;
    vConsFac.terrain = document.querySelector('.selected-terrain-type').innerHTML;
    vConsFac.v_type = document.querySelector('.selected-vehicle-type').innerHTML;
    vConsFac.fuelType = document.querySelector('.selected-fuel-type').innerHTML;

    
}

//testingInfo Function should be removed in production
function testingInfo(){
    console.log('The info below is from the object consumption factors');
    console.log(`${vConsFac.aveSpeed}, ${vConsFac.aveConsumption}, ${vConsFac.fuel_capacity}, ${vConsFac.trip_distance}, ${vConsFac.transmission}, ${vConsFac.road_surface}, ${vConsFac.terrain}, ${vConsFac.v_type}, ${vConsFac.fuelType}`);
}

const btnCalculate = document.getElementById('btnCalculate');
btnCalculate.addEventListener('click', () => {
    console.log('event Clicked, getting user info...');
    setUserInfo();
    errorHandler(testingInfo,tripCost);
})

function conditionalConsumption(currentPrice){
    //Relies on the Condition provided(v_type, airCon, RoadType, Terrain, Ave speed, towing);
    let gramsPerKm,fuelPerkm,totalConsumption,fuelCost;
    if(vConsFac.v_type == 'Bike'){gramsPerKm = 25.722+(276/vConsFac.aveSpeed)+(-0.254)*vConsFac.aveSpeed+0.00311*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Sedan' || vConsFac.v_type == 'Hatchback'){gramsPerKm = 54.7+(496/vConsFac.aveSpeed)+(-0.542)*vConsFac.aveSpeed+0.0042*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Utility' || vConsFac.v_type == 'Minibus' || vConsFac.v_type == 'Van'){gramsPerKm = 146.27+(-0.0000106/vConsFac.aveSpeed)+(-2.596)*vConsFac.aveSpeed+0.01984*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Semi-Truck'){gramsPerKm = 152.96+(604.156/vConsFac.aveSpeed)+(-2.295)*vConsFac.aveSpeed+0.0238*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Bus'){gramsPerKm = 281.735+(4186.178/vConsFac.aveSpeed)+(-3.457)*vConsFac.aveSpeed+0.0216*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Big Truck'){gramsPerKm = 332.603+(1680.879/vConsFac.aveSpeed)+(-4.676)*vConsFac.aveSpeed+0.0311*Math.pow(vConsFac.aveSpeed,2)}; 
    fuelPerkm = (gramsPerKm/748.9); 
    console.log("gramsPerKm "+gramsPerKm);
    totalConsumption = (vConsFac.trip_distance*fuelPerkm);
    console.log('totalConsumption: '+totalConsumption);

    //Below are the ranges of the manufacture estimates
    document.getElementById('conditional-fuel-remaining').innerHTML = `${cRemaining(totalConsumption)} L`;
    document.getElementById('conditional-fuel-range').innerHTML = `${(cRemaining(totalConsumption)/fuelPerkm).toFixed(2)} km`;
    document.getElementById('conditional-fuel-used').innerHTML = `${totalConsumption.toFixed(2)} L`;

    

    fuelCost = totalConsumption*currentPrice;
    console.log(fuelPerkm);
    console.log('Trip cost = R',fuelCost.toFixed(2));
    vConsFac.totalC = fuelCost;
    return fuelCost.toFixed(2);
    
}
function mRemaining(total){
    let r;
    r = vConsFac.fuel_capacity - total;
    if(r <= 0){
        return 0
    }else{
        return r.toFixed(2);
    }
}
function cRemaining(total){
    let r;
    r = vConsFac.fuel_capacity - total;
    if(r <= 0){
        return 0
    }else{
        return r.toFixed(2);
    }
}
let a3ba = document.getElementById('per-periode');

document.querySelector('.m-estimates').addEventListener('click', () => {
    console.log('the estimates grid container clicked');
    if(a3ba.innerHTML == 'Weekly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*7).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Monthly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*30).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Yearly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*365).toFixed(2)}`;
    }
})
document.querySelector('.c-estimates').addEventListener('click', () => {
    console.log('the estimates grid container clicked');
    if(a3ba.innerHTML == 'Weekly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*7).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Monthly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*30).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Yearly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*365).toFixed(2)}`;
    }
})

function manufactureEstimates(currentPrice){
    //Calculate the range, remaining and Trip Cost
    //Rely purely out of what manufacture says on the fuel economy
    let fuelPerkm,totalConsumption,fuelCost;
    fuelPerkm = vConsFac.aveConsumption/100;
    totalConsumption = (vConsFac.trip_distance*fuelPerkm);
    
    //Below are the ranges of the manufacture estimates
    document.getElementById('manufacture-fuel-remaining').innerHTML = `${mRemaining(totalConsumption)} L`;
    document.getElementById('manufacture-fuel-range').innerHTML = `${(mRemaining(totalConsumption)/fuelPerkm).toFixed(2)} km`;
    document.getElementById('manufacture-fuel-used').innerHTML = `${totalConsumption.toFixed(2)} L`;

    //Price Calculated, wether weekly monthly or yearly estimates
 
    fuelCost = totalConsumption*currentPrice;
    console.log(fuelPerkm);
    console.log('Trip cost = R',fuelCost.toFixed(2));
    vConsFac.totalM = fuelCost;
    return fuelCost.toFixed(2);
}
//Calculate the trip Cost
function tripCost(){
    let commonPrice;

    if(fuelPricing.petrolType.indexOf(vConsFac.fuelType) > -1){
        commonPrice = fuelPricing.petrolPrice[fuelPricing.petrolType.indexOf(vConsFac.fuelType)];
        console.log('If statement true commonPrice = '+commonPrice);
    }else{
        commonPrice = fuelPricing.dieselPrice[fuelPricing.dieselType.indexOf(vConsFac.fuelType)];
        console.log('If statement false commonPrice = '+commonPrice);
    }
    document.getElementById('manufacture-trip-cost').innerHTML = `R ${manufactureEstimates(commonPrice)}`;
    document.getElementById('conditional-trip-cost').innerHTML = `R ${conditionalConsumption(commonPrice)}`;
}


function errorHandler(callback,callback2){
    let errorFree = true;
    if(vConsFac.aveSpeed && 275 && vConsFac.v_type == 'Van' || vConsFac.v_type == 'Minibus' ||  vConsFac.v_type == 'Semi-Truck' || vConsFac.v_type == 'Big Truck'){
        console.error(`${vConsFac.v_type} cannot go ${vConsFac.aveSpeed} km/h`);
        errorFree = false;
    }
    if(vConsFac.aveSpeed > 530 || vConsFac.aveSpeed <= 0 || isNaN(vConsFac.aveSpeed)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct Average Speed';
    }
    if(vConsFac.aveConsumption > 55 || vConsFac.aveConsumption <= 0 || isNaN(vConsFac.aveConsumption)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct Average Consupmtion per 100 km';
    }
    if(vConsFac.fuel_capacity > 230 || vConsFac.fuel_capacity <= 0 || isNaN(vConsFac.fuel_capacity)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct fuel capacity';
    }
    if(isNaN(vConsFac.towing)){
        errorMessage.textContent = '*Enter correct towing weight';
        errorFree = false;
    }
    if(isNaN(vConsFac.trip_distance) || vConsFac.trip_distance == '' || vConsFac.trip_distance <= 0){
        errorMessage.textContent = '*Enter correct trip distance';
        errorFree = false;
    }
    
    if(errorFree){
        errorMessage.textContent = '';
        callback();
        callback2();
    }
}


const gConsFac = {
    age:2,
    frequency:20,
    type:'conventional',
    voltage:200,
    serviceHours:920,
    load:500,
    fuel_type:'diesel',
    load_factor:20, //In percentages(The percentage of the generator's capacity beign used)
    hoursRunning:30,
    fuel_capacity:200
}

const craftConsFac = {
    type:'accessna 200',age:8,aveConsumption:60,
    aveSpeed:80,alt:20,fuel_capacity:800,weight:500, trip_distance:0
}

const boatConsFac = {
    type:'skeejet',
    waves:'heavy',
    trip_distance:20,
    aveConsumption:20,
    fuel_capacity:500,
    sail:false,
    age:5,
    no_engine:2
}




