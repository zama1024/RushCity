class Taxi{
  constructor(ctx, x, y) {
    this.height = 200;
    this.width = 300;
    this.x = 1000;
    this.y = [170,250][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    this.lane1 = this.y === 250;
    this.lane2 = this.y === 170;
    const taxiImage = new Image();
    taxiImage.src = './assets/images/taxi.png';
    this.image = taxiImage;
  }


}
module.exports = Taxi;
