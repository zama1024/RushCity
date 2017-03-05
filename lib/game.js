const Player = require('./player.js');
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
    this.velocity = 300;
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=this.velocity;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/citybackground.jpg';

    const drawImage = (time) => {
      var framegap=time-lastRepaintTime;
      lastRepaintTime=time;
      var translateX=(this.velocity += .2)*(framegap/900);
      backgroundCtx.clearRect(0,0,1100,650);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,1100,650);
      backgroundCtx.fill();
      backgroundCtx.translate(-translateX,0);
      window.requestId = requestAnimationFrame(drawImage);
    };
    backgroundImage.addEventListener('load',drawImage,false);
    const player = new Player(backgroundCtx, foregroundCtx, 40, 415);
    var lastRepaintTime=window.performance.now();
  }

}

module.exports = Game;
