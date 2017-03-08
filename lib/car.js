class Car{
  constructor(ctx) {
    this.height = 160;
    this.width = 210;
    this.x = 1000;
    this.y = [190,275][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    this.lane1 = this.y === 275;
    this.lane2 = this.y === 190;
    const carImage = new Image();
    carImage.src = './assets/images/car.png';
    this.image = carImage;
  }


}
module.exports = Car;
