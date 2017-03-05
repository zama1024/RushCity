class Barrier{
  constructor(ctx, x, y) {
    this.height = 100;
    this.width = 75;
    this.x = 1100;
    this.y = [425,480,540][Math.floor(Math.random()*3)];
    this.ctx = ctx;
    const barrierImage = new Image();
    barrierImage.src = './assets/images/barrier.png';
    this.image = barrierImage;
  }


}
module.exports = Barrier;
