class Car{
  constructor(ctx) {
    this.height = 220;
    this.width = 280;
    this.x = 1100;
    this.y = [300,400][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    this.lane1 = this.y > 330;
    this.lane2 = this.y < 315;
    const carImage = new Image();
    carImage.src = './assets/images/car.png';
    this.image = carImage;
  }


}
module.exports = Car;
