class Flinstones{
  constructor(ctx) {
    this.height = 200;
    this.width = 350;
    this.x = 1100;
    this.y = [300,430][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    const flinstonesImage = new Image();
    flinstonesImage.src = './assets/images/flinstones.png';
    this.image = flinstonesImage;
  }


}
module.exports = Flinstones;
