class Player {
  constructor(ctx, x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.jump = false;
    this.getInitHeight = 0;
    this.gravity = 10;
    this.gravitySpeed = 0;
    const bikerImage = new Image();
    bikerImage.src = './assets/images/bikeSprite.png';
    bikerImage.onload = () => {
      debugger
      this.biker = this.sprite({
        context: this.ctx,
        width: 450,
        height: 450,
        image: bikerImage
      });
      this.biker.render();
    };

    this.image = bikerImage;
    this.interval = setInterval(this.updateGame.bind(this), 20);
    this.pressedKey = false;
    window.addEventListener('keydown', function (e) {
      Player.pressedKey = (Player.pressedKey || []);
      Player.pressedKey[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      Player.pressedKey = false;
    });
  }
  sprite (options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = () => {
      that.context.drawImage(
        that.image,
        0,
        0,
        that.width,
        that.height,
        0,
        0,
        that.width,
        that.height
      );
    };


    return that;
  }

  update(){
    if (this.biker) {
      debugger
      this.biker.render();
    }
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
    if (this.y > 430) {
      this.y = 430;
    }
    if (this.x > 900) {
      this.x = 900;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updateGame(){
    this.ctx.clearRect(0,0,1100,650);
    this.newPos();
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 100) {this.speedX = -5; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 950) {this.speedX = 5; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 300) {this.speedY = -5; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 430) {this.speedY = 5; }
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
