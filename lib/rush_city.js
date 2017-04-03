import { updateScore, callScore } from './fbase';
import Game from './game.js';
document.addEventListener('DOMContentLoaded', ()=> {
  var audio3 = document.getElementById('audio3');
  audio3.play();
  const backgroundCanvas = document.getElementById('background');
  const foregroundCanvas = document.getElementById('foreground');
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const foregroundCtx = foregroundCanvas.getContext('2d');
  callScore().then((res) => {
     let highestScore = res;
     backgroundCtx.fillStyle = "yellow";
     backgroundCtx.fillRect(270,250,300,45);
     backgroundCtx.font = "30px Verdana";
     backgroundCtx.fillStyle = "black";
     backgroundCtx.fillText(`High Score: ${highestScore}`,305,282);
  });
  const backgroundImage = new Image();
  window.game = false;
  backgroundImage.src = './assets/images/entrybackground.jpg';
  backgroundImage.onload = function(){
    backgroundCtx.drawImage(backgroundImage, 0, 0,850,475);
  };
  const logo = new Image();
  logo.src = './assets/images/rclogo.png';
  const keys = new Image();
  keys.src = './assets/images/dirkeys.png';
  const space = new Image();
  space.src = './assets/images/space.png';
  logo.onload = function(){
    backgroundCtx.drawImage(logo, 110, -50,600,300);
    backgroundCtx.font = "30px Verdana";
    backgroundCtx.fillStyle = "#ffffff";
    backgroundCtx.fillText("Press Enter to start game",220,230);
    backgroundCtx.font = "15px Verdana";
    backgroundCtx.fillStyle = "pink";
    backgroundCtx.fillText("Move around lanes",427,450);
    backgroundCtx.fillText("Jump", 665,450);
    backgroundCtx.fillStyle = "#7fffd4";
// Turn transparency on
    backgroundCtx.fillText("Dodge traffic by moving around lanes.", 80,350);
    backgroundCtx.fillText("Use directional keys to change lane and", 80, 380);
    backgroundCtx.fillText("press space to jump over wood logs.",80,410);
     backgroundCtx.fillText("Jump is allowed for wood logs only.",80,440);
    window.setTimeout(() => {backgroundCtx.drawImage(keys, 430,350, 130, 80),10});
    window.setTimeout(() => {backgroundCtx.drawImage(space, 620,370, 130, 90),10});
  };
  window.addEventListener('keydown', function (e) {
    if(e.keyCode === 13 && !window.game){
      window.game = new Game(backgroundCtx, foregroundCtx);
    }
  },false);
  var soundControl = document.getElementById("sound");
  soundControl.addEventListener("click", () => {
    if(audio3.muted){
      audio3.muted = false;
      soundControl.src = "./assets/images/mute.png";
    }else{
      audio3.muted = true;
      soundControl.src = "./assets/images/sound.png";
    }
  });
});
