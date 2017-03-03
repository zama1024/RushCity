class Player {
  constructor(ctx, x, y) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    const bikerImage = new Image();
    bikerImage.src = './assets/images/biker.png';
    bikerImage.onload = function(){
      ctx.drawImage(bikerImage, x, y);
    };
    this.image = bikerImage;
    this.interval = setInterval(this.updateGame.bind(this), 20);
  }

  update(){
    this.ctx.drawImage(this.image, this.x, this.y);
  }

  updateGame(){
    this.ctx.clearRect(0,0,830,650);
    if (this.x < 600) {
      this.x += 1;
    }
    if (this.y > 300) {
      this.y -= 5;
    }
    this.update();
  }
}
module.exports = Player;
