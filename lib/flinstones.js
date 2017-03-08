class Flinstones{
  constructor(ctx) {
    this.height = 175;
    this.width = 320;
    this.x = 1100;
    this.y = [180,270,220][Math.floor(Math.random()*3)];
    this.lane1 = this.y === 270;
    this.lane2 = this.y === 180;
    this.middlelane =  this.y === 220;
    this.ctx = ctx;
    const flinstonesImage = new Image();
    flinstonesImage.src = './assets/images/flinstones.png';
    this.image = flinstonesImage;
  }


}
module.exports = Flinstones;
