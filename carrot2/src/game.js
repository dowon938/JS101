'use strict';

import Field from './field.js';
import * as sound from './sound.js';


export const Reason = Object.freeze({
  cancel : 'cancel',
  win : 'win',
  lose : 'lose',
});

export default class GameBuilder {
  withGameDuration(duration){
    this.gameDuration = duration;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num; 
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  build(){
    return new Game(this.gameDuration, this.bugCount, this.carrotCount);
  }
}

class Game {
  constructor(gameDurationSec, bugCount,carrotCount) {
    this.gameDuration = gameDurationSec;
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;

    this.gameBTN = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameField = new Field(bugCount,carrotCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.gameBTN.addEventListener('click', this.onclick);
  }

  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    console.log(!this.started);
    if (!this.started){
      return;
    }
    if (item === 'carrot') {
        this.score++;
        this.updateScoreBoard();
        if(this.score===this.carrotCount){
            this.finish(true);
        }
    } else if (item === 'bug') {
        this.finish(false);
    }
  };


  onclick = ()=>{
    if (this.started) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(){
    sound.playBackground();
    this.initGame();
    this.showTimerAndScore();
    this.showStopBtn();
    this.startGameTimer();
    this.started = true;
  };

  stop(){
    this.started = false;
    sound.stopBackground();
    sound.playAlert();
    this.stopGameTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop(Reason.cancel);
  };

  finish(win){
    this.started = false;
    sound.stopBackground();
    this.stopGameTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop(win ?  Reason.win : Reason.lose );
    if (win){
        sound.playGameWin();
    } else {
        sound.playBug();
    }
  };

  showStopBtn(){
    this.gameBTN.style.visibility = 'visible';
    const btn = this.gameBTN.querySelector('.fas')
    btn.classList.remove('fa-play');
    btn.classList.add('fa-stop');
  };

  hideGameBtn(){
    this.gameBTN.style.visibility = 'hidden'
  };

  initGame(){
    this.score = 0;
    this.gameScore.innerHTML = this.carrotCount;
    this.gameField.init();
  };
  showTimerAndScore(){
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  };
  startGameTimer(){
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(()=>{
        if (remainingTimeSec<1) {
            clearInterval(this.timer);
            this.finish(false);
            return;
        };
        this.updateTimerText(--remainingTimeSec);
    },1000);
  };

  stopGameTimer(){
    clearInterval(this.timer);
  };
  
  updateTimerText(time){
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  if (seconds<10) {
      seconds = `0${seconds}`
  };
  this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  };

  updateScoreBoard(){
  this.gameScore.innerHTML = this.carrotCount - this.score;
  }


}