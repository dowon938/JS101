'use strict';
const bugs = document.querySelectorAll('.bug');
const carrots = document.querySelectorAll('.carrot');
const field = document.querySelector('.field');
const carrotsNumber = document.querySelector('.carrotsNumber');
const popUp = document.querySelector('.pop-up');
const victory = document.querySelector('.victory');
const replay = document.querySelector('.replay');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//place Bugs & carrots
bugs.forEach((bug)=>{
    bug.style.top = `${getRandomInt(100)}%`;
    bug.style.left = `${getRandomInt(100)}%`;
});
carrots.forEach((carrot)=>{
    carrot.style.top = `${getRandomInt(100)}%`;
    carrot.style.left = `${getRandomInt(100)}%`;
});

//field 'click' Event!
field.addEventListener('click', (event)=>{
    if (event.target.className == 'bug') {
        console.log('bug!');
        replay.style.display = 'flex';
    } else if (event.target.className == 'carrot'){
        event.target.remove();
        //how many carrots left!
        const carrotsNumbers = document.querySelectorAll('.carrot');
        carrotsNumber.textContent = `${carrotsNumbers.length}`;
        if (carrotsNumbers.length === 0){
            victory.style.display = 'flex';
        };
    };
});

//pop-up menu

popUp.addEventListener('click',(event)=>{
    if (event.target.className == 'replay'){
        event.target.remove();
    }
});