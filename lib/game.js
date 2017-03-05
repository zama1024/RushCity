const Player = require('./player.js');
const Obstacle = require('./obstacle.js');
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
    this.interval = setInterval(() => {this.velocity += 1;}, 100);
    this.velocity = 300;
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=this.velocity;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/citybackground.jpg';
    const player = new Player(foregroundCtx, 40, 415);

    const taxi = new Obstacle(foregroundCtx, 400, 300);

    const drawImage = (time) => {
      var framegap=time-lastRepaintTime;
      lastRepaintTime=time;
      var translateX=this.velocity*(framegap/900);
      backgroundCtx.clearRect(0,0,1100,650);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,1100,650);
      backgroundCtx.fill();
      backgroundCtx.translate(-translateX,0);
      requestAnimationFrame(drawImage);
    };
    backgroundImage.addEventListener('load',drawImage,false);
    var lastRepaintTime=window.performance.now();
  }

}

module.exports = Game;
