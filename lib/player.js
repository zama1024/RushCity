const Taxi = require('./taxi.js');
const Barrier = require('./barrier.js');
const Flinstones = require('./flinstones.js');
const Car = require('./car.js');
class Player {
  constructor(backgroundCtx, ctx, x, y) {
    this.backgroundCtx = backgroundCtx;
    this.lives = 3;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.photoCount = 1;
    this.timerCount = 1;
    this.jump = false;
    this.getInitHeight = 0;
    this.gravity = 3;
    this.gravitySpeed = 0;
    this.pressedKey = false;
    this.frameNumber = 0;
    this.obs1 = null;
    this.score = 0;
    this.createObstacles = {
      0: () => new Barrier(this.ctx),
      1: () => new Taxi(this.ctx),
      2: () => new Flinstones(this.ctx),
      3: () => new Car(this.ctx)
    };

    const bikerImage = new Image();
    this.image = bikerImage;

    const redheart = new Image();
    redheart.src = './assets/images/heartred.png';
    this.redheart = redheart;

    const blackheart = new Image();
    blackheart.src = './assets/images/heartblack.png';
    this.blackheart = blackheart;

    const collision = new Image();
    collision.src = './assets/images/collision.png';
    this.collision = collision;

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
    if (this.frameNumber === 1 || this.everyinterval(150)) {
      let randomIndex = (Math.floor(Math.random() * 4)).toString();
      this.obs1 = this.createObstacles[randomIndex]();
      this.checkCollision = true;
    }
    this.image.src = `./assets/images/image_part_00${this.photoCount}.png`;
    this.ctx.clearRect(0,0,850,475);
    if(this.obs1.y > this.y){
      this.ctx.drawImage(this.image, this.x, this.y,175,175);
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#fffff";
      this.ctx.fillText(`Current Score: ${this.score}`,600,50);
      this.drawheart();
    }else{
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.drawImage(this.image, this.x, this.y,175,175);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#fffff";
      this.ctx.fillText(`Current Score: ${this.score}`,600,50);
      this.drawheart();
    }
    if (this.checkCollision && this.crashWith(this.obs1)) {
      if(this.lives > 0){
        if (!this.interval2) {
          this.gotHit();
          setTimeout(this.stopFlickering.bind(this),1000);
        }
      }else{
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0,60,850,200);
        this.ctx.fillStyle = "#FF9900";
        clearInterval(this.interval);
        for (var i = 0; i < 299999999; i++) {

        }
        this.ctx.fillText(`Oops! Game over, Your Score: ${this.score}`,30,120);
        this.ctx.fillText(`Press Enter to try again`,30,170);
        window.cancelAnimationFrame(window.requestId);
        window.game = false;
        clearInterval(this.interval);
        const gameOver = document.getElementById('gameover');
        const gameOverCtx = gameOver.getContext('2d');

      }
    }
  }
  drawheart(){
    this.ctx.drawImage(this.image, 10, 20,30,30);
    let start = 40;
    for(let i = 0; i < this.lives; i++){
      this.ctx.drawImage(this.redheart, start, 20,30,30);
      start += 30;
    }
    for(let j = 0; j < 3-this.lives; j++){
      this.ctx.drawImage(this.blackheart, start, 20,30,30);
      start += 30;
    }
  }

  stopFlickering(){
    window.clearInterval(this.interval2);
    this.interval2 = null;
    this.msgCtx.clearRect(0,0,850,650);
  }

  gotHit(){
    const msgCanvas = document.getElementById('gameover');
    this.msgCtx = msgCanvas.getContext('2d');
    this.lives -= 1;
    this.msgCtx.drawImage(this.collision, 300,0, 200,200);
    this.interval2 = setInterval(() => {
      this.ctx.clearRect(0,200,850,400);
    },50);
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

    if (this.y > 260) {
      this.y = 260;
    }

    if(this.y < 170){
      this.lane1 = false;
      this.lane2 = false;
      this.middlelane = false;
    }
    if (this.y >= 212){
      this.lane1 = true;
      this.lane2 = false;
      this.middlelane = false;
    } else if(this.y <= 201 && this.y > 170){
      this.lane1 = false;
      this.lane2 = true;
      this.middlelane = false;
    } else if (this.y > 201 && this.y < 212){
      this.lane1 = false;
      this.lane2 = false;
      this.middlelane = true;
    }

    if (this.x > 700) {
      this.x = 700;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updatePlayer(){
    this.frameNumber += 1;
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 50) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 700) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 170) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 400) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32] && !this.jump && this.obs1.type === "barrier") {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -150;
      this.speedX = 100;
    }
    if (this.obs1){

      this.obs1.x -= 9;
    }
    this.timerCount += 1;
    if (this.timerCount === 20) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.newPos();
    this.update();
  }

  crashWith(otherobj) {
    var playerLeft = this.x;
    var playerRight = this.x + 140;
    var playerTop = this.y;
    var playerBottom = this.y + 175;
    var obstacleLeft = otherobj.x;
    var obstacleRight = otherobj.x;
    var obstacleTop = otherobj.y;
    var obstacleBottom = otherobj.y + (otherobj.height);
    var crash = false;
    if (( (this.lane1 && otherobj.lane1) || (this.lane2 && otherobj.lane2)) && playerRight > obstacleLeft) {
      if(!this.jump){crash = true;}
    }else if ((otherobj.middlelane) && (playerRight > obstacleLeft) && (playerBottom < obstacleBottom) && (playerBottom > 350)) {
      if(!this.jump){crash = true;}
    }else if ((otherobj.middlelane) && (this.middlelane) && (playerRight > obstacleLeft)) {
      if(!this.jump){crash = true;}
    }else if(playerLeft > obstacleLeft) {
      this.checkCollision = false;
      this.score += 1;
    }

    return crash;
  }

  everyinterval(n) {
    if ((this.frameNumber / n) % 1 === 0) {
      return true;
    }
    return false;
  }

}
module.exports = Player;
