
const heade = document.querySelectorAll('.news-headers');
heade.forEach(function(element){
    console.log(element.innerHTML);
})
const autoImg = document.querySelectorAll('.news-image');
let imageFormat = 'jpg' || 'jpeg' || 'png';
console.log('Window location is '+window.location);
autoImg.forEach((element,index) => {
    let path = element.src;
    element.src = `../pages/news/news-images copy/aviation/tp-nws${index}.${imageFormat}`;
    
})



