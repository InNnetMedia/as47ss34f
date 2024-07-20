
let newsContainer = document.getElementsByName('n');
function getData(cat){
    fetch(`pages/news/top-stories/${cat}.txt`)
    .then(res => res.text())
    .then(data => {
        document.getElementById('news').innerHTML = data;
    }).catch((error) => {
        throw error;
    })
    
}


//getData();
let link;
function someThing(step2){
    const getLink = new Promise((resolve,reject) => {
        newsContainer.forEach((element) => {
            element.addEventListener('click', async () => {
                link = element.id;
                sessionStorage.setItem('var1',link);
                console.log(link);
                resolve(link);
                // Resolve the promise with the link value
                window.location = './pages/news.html';
            });
        });
        
    });
}
getData(sessionStorage.getItem('var1'));


someThing(getData);
console.log("Link is "+sessionStorage.getItem('var1'));



// Call the function to set up event listeners and await the link
const header = document.querySelector('.top-header');
let windowScroll = window.scrollY;
window.addEventListener('scroll', hideHeader);
function hideHeader(){
    if(window.scrollY < windowScroll){
        header.style.display = 'block';
    }else{
        header.style.display = 'none';
    }
    windowScroll = window.scrollY;
}

console.clear();
