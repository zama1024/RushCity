class Flinstones{
  constructor(ctx) {
    this.height = 200;
    this.width = 350;
    this.x = 1100;
    this.y = [300,430,365][Math.floor(Math.random()*3)];
    this.lane1 = this.y === 430;
    this.lane2 = this.y === 300;
    this.middlelane =  this.y === 365;
    this.ctx = ctx;
    const flinstonesImage = new Image();
    flinstonesImage.src = './assets/images/flinstones.png';
    this.image = flinstonesImage;
  }


}
module.exports = Flinstones;
