class Barrier{
  constructor(ctx, x, y) {
    this.height = 75;
    this.width = 40;
    this.x = 1100;
    this.y = [280,320,360][Math.floor(Math.random()*3)];
    this.ctx = ctx;
    this.lane1 = this.y === 360;
    this.lane2 = this.y === 280;
    this.middlelane =  this.y === 320;
    const barrierImage = new Image();
    barrierImage.src = './assets/images/barrier.png';
    this.image = barrierImage;
    this.type = "barrier";
  }


}
module.exports = Barrier;
