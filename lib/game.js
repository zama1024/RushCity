import Player from './player.js';
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
    this.velocity = 300;
    this.playAudio();

  }

  playAudio() {
    var audio3 = document.getElementById('audio3');
    audio3.pause();
    var audio = document.getElementById('audio1');
    if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
    }else{
        audio.currentTime = 0;
    }
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=this.velocity;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/rsz_citybackground.jpg';

    const drawImage = (time) => {
      var framegap=time-lastRepaintTime;
      lastRepaintTime=time;
      var translateX=(this.velocity += .2)*(framegap/900);
      backgroundCtx.clearRect(0,0,850,475);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,850,475);
      backgroundCtx.fill();
      backgroundCtx.translate(-translateX,0);
      window.requestId = requestAnimationFrame(drawImage);
    };
    backgroundImage.addEventListener('load',drawImage,false);
    const player = new Player(backgroundCtx, foregroundCtx, 40, 250);
    var lastRepaintTime=window.performance.now();
  }

}

export default Game
