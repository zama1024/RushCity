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
    this.gravity = 6;
    this.gravitySpeed = 0;
    const bikerImage = new Image();

    this.image = bikerImage;
    this.interval = setInterval(this.updateGame.bind(this), 10);
    this.pressedKey = false;
    window.addEventListener('keydown', function (e) {
      Player.pressedKey = (Player.pressedKey || []);
      Player.pressedKey[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      Player.pressedKey = false;
    });
  }

  update(){
    let photoCountChar;
    if (this.photoCount > 2) {
      this.photoCount = 1;
    }
    photoCountChar = this.photoCount > 9 ? `${this.photoCount}` : `0${this.photoCount}`;
    this.image.src = `./assets/images/image_part_0${photoCountChar}.png`;
    this.ctx.clearRect(0,0,1100,650);
    this.ctx.drawImage(this.image, this.x, this.y);
  }

  newPos() {
    if (this.jump) {
      this.gravitySpeed = this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      this.x += this.speedX;
    }
    if (this.getInitHeight === this.y) {
      this.jump = false;
    }
      this.y += this.speedY;
      this.x += this.speedX;
    if (this.y > 350) {
      this.y = 350;
    }
    if (this.x > 900) {
      this.x = 900;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updateGame(){
    this.newPos();
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 100) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 950) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 220) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 350) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32]) {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -100;
      this.speedX = 0;
    }
    // if (this.x < 600) {
    // }
    // if (this.y > 300) {
    // }
    this.timerCount += 1;
    if (this.timerCount === 20) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.update();
  }



  moveup() {
    this.y -= 1;
  }

  movedown() {
    this.y += 1;
  }

  moveleft() {
    this.x -= 1;
  }

  moveright() {
    this.x += 1;
  }
}
module.exports = Player;
