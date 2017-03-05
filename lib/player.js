const Taxi = require('./taxi.js');
const Barrier = require('./barrier.js');
const Flinstones = require('./flinstones.js');
const Car = require('./car.js');
class Player {
  constructor(ctx, x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.photoCount = 1;
    this.timerCount = 1;
    this.jump = false;
    this.getInitHeight = 0;
    this.gravity = 5;
    this.gravitySpeed = 0;
    this.pressedKey = false;
    this.obs1 = new Barrier(this.ctx);
    this.frameNumber = 0;

    const bikerImage = new Image();
    this.image = bikerImage;

    this.interval = setInterval(this.updatePlayer.bind(this), 10);
    window.addEventListener('keydown', function (e) {
      Player.pressedKey = (Player.pressedKey || []);
      Player.pressedKey[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      Player.pressedKey = false;
    });
  }

  update(taxi){
    let photoCountChar;
    if (this.photoCount > 2) {
      this.photoCount = 1;
    }

    this.image.src = `./assets/images/image_part_00${this.photoCount}.png`;
    this.ctx.clearRect(0,0,1100,650);
    if(this.obs1.y > this.y){

      this.ctx.drawImage(this.image, this.x, this.y,230,230);
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
    }else{
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.drawImage(this.image, this.x, this.y,230,230);
    }
  }

  newPos() {
    if (this.jump) {
      this.gravitySpeed = this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      this.x += this.speedX;
    }else {
      this.y += this.speedY;
      this.x += this.speedX;
    }

    if (this.getInitHeight <= this.y) {
      this.jump = false;
      this.getInitHeight = 0;
    }

    if (this.y > 400) {
      this.y = 400;
    }

    if (this.x > 700) {
      this.x = 700;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updatePlayer(){
    this.frameNumber += 1;
    this.newPos();
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 50) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 700) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 270) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 400) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32]) {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -200;
      this.speedX = 50;
    }

    this.obs1.x -= 6;
    this.timerCount += 1;
    if (this.timerCount === 20) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.update();
  }

  everyinterval(n) {
    if ((this.frameNumber / n) % 1 === 0) {
      return true;
    }
    return false;
  }

}
module.exports = Player;
