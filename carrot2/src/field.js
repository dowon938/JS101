'use strict';

import * as sound from './sound.js';

export const ItemType = Object.freeze({
  carrot : 'carrot',
  bug : 'bug',
});
//Builder Pattern;
export default class Field {
  constructor(bugCount, carrotCount) {
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;
    this.carrotSize = 80;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click',(event)=>{this.onClick(event);});
  }
  
  init(){
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  };
  
  _addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width-this.carrotSize;
    const y2 = this.fieldRect.height-this.carrotSize;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        item.style.left = `${randomNumber(x1,x2)}px`;
        item.style.top = `${randomNumber(y1,y2)}px`;
        this.field.appendChild(item);
    };
  };

  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }

  onClick(event){
    const target = event.target;
    if (target.matches('.carrot')) {
        sound.playCarrot();
        target.remove();
        this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
        this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
