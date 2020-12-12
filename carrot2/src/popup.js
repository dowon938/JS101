'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpRefresh.addEventListener('click',()=>{
      this.onclick && this.onclick();
      this.hide();
    });
  }

  setClickListener(onclick){
    this.onclick = onclick;
  }

  showWithText(text){
    this.popUpMessage.innerHTML = text;
    this.popUp.classList.remove('hide');
  }

  hide() {
    this.popUp.classList.add('hide');
  }
}