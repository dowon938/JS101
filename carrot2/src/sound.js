'use strict';


const bgSound = new Audio('./sound/bg.mp3')
const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bugPullSound = new Audio('./sound/bug_pull.mp3')
const alertSound = new Audio('./sound/alert.wav')
const gameWinSound = new Audio('./sound/game_win.mp3')
bgSound.volume = 0.1;
gameWinSound.volume = 0.1;


export function playBackground(){
  playSound(bgSound);
}
export function stopBackground(){
  stopSound(bgSound);
}
export function playCarrot(){
  playSound(carrotSound);
}
export function playBug(){
  playSound(bugPullSound);
}
export function playAlert(){
  playSound(alertSound);
}
export function playGameWin(){
  playSound(gameWinSound);
}

function playSound(sound){
  sound.currentTime=0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}