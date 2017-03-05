class Barrier{
  constructor(ctx, x, y) {
    this.height = 150;
    this.width = 75;
    this.x = 1100;
    this.y = [425,480,510][Math.floor(Math.random()*3)];
    this.ctx = ctx;
    this.lane1 = this.y > 330;
    this.lane2 = this.y < 315;
    this.middlelane =  this.y === 480;
    const barrierImage = new Image();
    barrierImage.src = './assets/images/barrier.png';
    this.image = barrierImage;
  }


}
module.exports = Barrier;
