'use strict';

const BUG_COUNT = 10;
const CARROT_COUNT = 2;
const CARROT_SIZE = 80;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBTN = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const bgSound = new Audio('./sound/bg.mp3')
const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugPullSound = new Audio('./sound/bug_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const gameWinSound = new Audio('./sound/game_win.mp3')
bgSound.volume = 0.05;
gameWinSound.volume = 0.1;

let started = false;
let score = 0;
let timer = undefined;


gameBTN.addEventListener('click', ()=>{
    if (started) {
        gameStop();
    } else {
        gameStart();
    }
});

popUpRefresh.addEventListener('click',()=>{
    gameStart();
    hidePopUp();
});

field.addEventListener('click',(event)=>{
    const target = event.target;
    if (!started){
        return;
    }
    if (target.matches('.carrot')) {
        playSound(carrotSound);
        target.remove();
        score++;
        updateScoreBoard();
        if(score===CARROT_COUNT){
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    }
});


function gameStart(){
    playSound(bgSound);
    initGame();
    showTimerAndScore();
    showStopBtn();
    startGameTimer();
    started = true;
};

function gameStop(){
    stopSound(bgSound);
    playSound(alertSound);
    stopGameTimer();
    hideGameBtn();
    showPopUpWithText('REPLAY❓');
    started = false;
};

function finishGame(win){
    stopSound(bgSound);
    stopGameTimer();
    started = false;
    hideGameBtn();
    showPopUpWithText(win ? 'YOU WIN🎉' : 'YOU LOST💩');
    if (win){
        playSound(gameWinSound);
    } else {
        playSound(bugPullSound);
    }
};

function playSound(sound){
    sound.currentTime=0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function showPopUpWithText(text){
    popUpMessage.innerHTML = text;
    popUp.classList.remove('hide');
};

function hidePopUp(){
    popUp.classList.add('hide');
};

function showStopBtn(){
    gameBTN.style.visibility = 'visible';
    const btn = gameBTN.querySelector('.fas')
    btn.classList.remove('fa-play');
    btn.classList.add('fa-stop');
};

function hideGameBtn(){
    gameBTN.style.visibility = 'hidden'
};


function initGame(){
    score = 0;
    field.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
};
function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
};
function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if (remainingTimeSec<1) {
            clearInterval(timer);
            finishGame(false);
            return;
        };
        updateTimerText(--remainingTimeSec);
    },1000);
};

function stopGameTimer(){
    clearInterval(timer);
};

function updateTimerText(time){
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    if (seconds<10) {
        seconds = `0${seconds}`
    };
    gameTimer.innerHTML = `${minutes}:${seconds}`;
};

function updateScoreBoard(){
    gameScore.innerHTML = CARROT_COUNT - score;
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width-CARROT_SIZE;
    const y2 = fieldRect.height-CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        item.style.left = `${randomNumber(x1,x2)}px`;
        item.style.top = `${randomNumber(y1,y2)}px`;
        field.appendChild(item);
    };
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
