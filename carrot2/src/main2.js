'use strict';
import * as sound from './sound.js';
import PopUp from './popup.js';
import { GameBuilder,  Reason } from './game.js';


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(5)
    .withBugCount(5)
    .withCarrotCount(3)
    .build();


game.setGameStopListener((reason)=> {
    switch (reason) {
        case Reason.cancel:
            sound.playAlert();
            gameFinishBanner.showWithText('REPLAY❓');
            break;
        case Reason.win:
            sound.playGameWin();
            gameFinishBanner.showWithText('YOU WIN🎉');
            break;  
        case Reason.lose:
            sound.playBug();
            gameFinishBanner.showWithText('YOU LOST💩');
            break;
        default:
            break;
    }
});

gameFinishBanner.setClickListener(()=>{
    game.start();
});
