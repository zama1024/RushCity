const Game = require('./game.js');
document.addEventListener('DOMContentLoaded', ()=> {
  const backgroundCanvas = document.getElementById('background');
  const foregroundCanvas = document.getElementById('foreground');
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const foregroundCtx = foregroundCanvas.getContext('2d');
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
    backgroundCtx.drawImage(logo, 110, 0,600,300);
    backgroundCtx.font = "30px Verdana";
    backgroundCtx.fillStyle = "#ffffff";
    backgroundCtx.fillText("Press Enter to start game",220,280);
    backgroundCtx.font = "15px Verdana";
    backgroundCtx.fillStyle = "#FF9900";
    backgroundCtx.fillText("Move around lanes",427,450);
    backgroundCtx.fillText("Jump", 665,450);
    backgroundCtx.fillStyle = "#7fffd4";
// Turn transparency on
    backgroundCtx.fillText("Dodge traffic by moving around lanes.", 80,350);
    backgroundCtx.fillText("Use directional keys to change lane and", 80, 380);
    backgroundCtx.fillText("press space to jump over wood logs.",80,410);
     backgroundCtx.fillText("Jump is allowed for wood logs only.",80,440);
    backgroundCtx.drawImage(keys, 430,350, 130, 80);
    backgroundCtx.drawImage(space, 620,370, 130, 90);
  };
  window.addEventListener('keydown', function (e) {
    if(e.keyCode === 13 && !window.game){
      window.game = new Game(backgroundCtx, foregroundCtx);
    }
  },false);
});
