class Taxi{
  constructor(ctx, x, y) {
    this.height = 250;
    this.width = 400;
    this.x = 1100;
    this.y = [270,400][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    this.lane1 = this.y > 330;
    this.lane2 = this.y < 315;
    const taxiImage = new Image();
    taxiImage.src = './assets/images/taxi.png';
    this.image = taxiImage;
  }


}
module.exports = Taxi;
