'use strict';
const playBtn = document.querySelector('.play_btn');
const stopBtn = document.querySelector('.stop_btn');
const field = document.querySelector('.field');

//play BTN!!
playBtn.addEventListener('click',()=>{
    timeStart = setInterval(refreshTime, 1000);
    field.innerHTML= '';
    createImg('bug',15);
    createImg('carrot',20);
    refreshCarrotsNums();
    playBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    replay.style.display = 'none';
    victory.style.display = 'none';
});

//stop BTN!!
stopBtn.addEventListener('click',()=>{
    clearInterval(timeStart);
    //can't click bugs & carrots
    stopBtn.style.display = 'none';
    playBtn.style.display = 'none';
    replay.style.display = 'flex';
});

//timer!
var timeStart;
const timer = document.querySelector('.timer');
let time = 10;

function refreshTime() {
    time--;
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    if (seconds<10) { 
        seconds = '0'+seconds
    };
    timer.innerHTML=`${minutes}:${seconds}`;
    if (time<0) {
        clearInterval(timeStart);
        replay.style.display = 'flex';
    };
};

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

replay.addEventListener('click',(event)=>{
    time=11;
    timeStart = setInterval(refreshTime, 1000);
    field.innerHTML= '';
    createImg('bug',15);
    createImg('carrot',20);
    refreshCarrotsNums();
    playBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    replay.style.display = 'none';
    victory.style.display = 'none';
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
