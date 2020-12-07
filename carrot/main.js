'use strict';
const playBtn = document.querySelector('.play_btn');
const field = document.querySelector('.field');

playBtn.addEventListener('click',()=>{
    field.innerHTML= '';
    createImg('bug',15);
    createImg('carrot',20);
    refreshCarrotsNums();
})

//timer!
const timer = document.querySelector('.timer');
let time = 10;
const timerInterval = setInterval(() => {
    timer.innerHTML=`${time}`;
    time--;
    if (time<0) {
        clearInterval(timerInterval);
        replay.style.display = 'flex';
    }
}, 1000);  

const carrotsNumber = document.querySelector('.carrotsNumber');
const popUp = document.querySelector('.pop-up');
const victory = document.querySelector('.victory');
const replay = document.querySelector('.replay');

//field 'click' Event!
field.addEventListener('click', (event)=>{
    if (event.target.className == 'bug') {
        console.log('bug!');
        replay.style.display = 'flex';
    } else if (event.target.className == 'carrot'){
        event.target.remove();
        //how many carrots left!
        refreshCarrotsNums();
    };
});

//pop-up menu

popUp.addEventListener('click',(event)=>{
    if (event.target.className == 'replay'){
        event.target.remove();
    }
});

//create Bugs & carrots
// ulBugs.innerHTML= `<img src="img/bug.png" alt="" class="bug">`;
function createImg(className, Numbers) {
    const ul = document.createElement("ul");
    ul.setAttribute("class", `${className}s`);
    field.appendChild(ul);
    for (let i=0; i<Numbers; i++){
        const img = document.createElement("img");
        img.setAttribute("class", `${className}`);
        img.setAttribute("src",`img/${className}.png`)
        ul.appendChild(img);
    };
    //place Bugs & carrots
    const classNmes = document.querySelectorAll(`.${className}`);
    classNmes.forEach((className)=>{
        className.style.top = `${getRandomInt(100)}%`;
        className.style.left = `${getRandomInt(100)}%`;
    });
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

//refresh carrots Numbers
function refreshCarrotsNums() {
    const carrotsNumbers = document.querySelectorAll('.carrot');
    carrotsNumber.textContent = `${carrotsNumbers.length}`;
    if (carrotsNumbers.length === 0){
        victory.style.display = 'flex';
    };
};
