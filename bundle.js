/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(4);
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
    this.velocity = 300;
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=this.velocity;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/rsz_citybackground.jpg';

    const drawImage = (time) => {
      var framegap=time-lastRepaintTime;
      lastRepaintTime=time;
      var translateX=(this.velocity += .2)*(framegap/900);
      backgroundCtx.clearRect(0,0,850,475);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,850,475);
      backgroundCtx.fill();
      backgroundCtx.translate(-translateX,0);
      window.requestId = requestAnimationFrame(drawImage);
    };
    backgroundImage.addEventListener('load',drawImage,false);
    const player = new Player(backgroundCtx, foregroundCtx, 40, 250);
    var lastRepaintTime=window.performance.now();
  }

}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Taxi = __webpack_require__(5);
const Barrier = __webpack_require__(1);
const Flinstones = __webpack_require__(3);
const Car = __webpack_require__(2);
class Player {
  constructor(backgroundCtx, ctx, x, y) {
    this.backgroundCtx = backgroundCtx;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.photoCount = 1;
    this.timerCount = 1;
    this.jump = false;
    this.getInitHeight = 0;
    this.gravity = 5;
    this.gravitySpeed = 0;
    this.pressedKey = false;
    this.frameNumber = 0;
    this.obs1 = null;
    this.score = 0;
    this.createObstacles = {
      0: () => new Barrier(this.ctx),
      1: () => new Taxi(this.ctx),
      2: () => new Flinstones(this.ctx),
      3: () => new Car(this.ctx)
    };

    const bikerImage = new Image();
    this.image = bikerImage;

    this.interval = setInterval(this.updatePlayer.bind(this), 10);
    window.addEventListener('keydown', function (e) {
      Player.pressedKey = (Player.pressedKey || []);
      Player.pressedKey[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      Player.pressedKey = false;
    });
  }

  update(taxi){
    let photoCountChar;
    if (this.photoCount > 2) {
      this.photoCount = 1;
    }
    if (this.frameNumber === 1 || this.everyinterval(150)) {
      let randomIndex = (Math.floor(Math.random() * 4)).toString();
      this.obs1 = this.createObstacles[randomIndex]();
      this.checkCollision = true;
    }
    this.image.src = `./assets/images/image_part_00${this.photoCount}.png`;
    this.ctx.clearRect(0,0,850,475);
    if(this.obs1.y > this.y){
      this.ctx.drawImage(this.image, this.x, this.y,175,175);
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#FF9900";
      this.ctx.fillText(`Current Score: ${this.score}`,600,50);
    }else{
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.drawImage(this.image, this.x, this.y,175,175);
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "#FF9900";
      this.ctx.fillText(`Current Score: ${this.score}`,600,50);
    }
    if (this.checkCollision && this.crashWith(this.obs1)) {
      this.ctx.font = "41px Arial";
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0,100,850,100);
      this.ctx.fillStyle = "#FF9900";
      this.ctx.fillText("Oops! Game over, press Enter to try again!",30,150);
      window.cancelAnimationFrame(window.requestId);
      window.game = false;
      clearInterval(this.interval);
      const gameOver = document.getElementById('gameover');
      const gameOverCtx = gameOver.getContext('2d');

    }
  }

  newPos() {
    if (this.jump) {
      this.gravitySpeed = this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      this.x += this.speedX;
    }else {
      this.y += this.speedY;
      this.x += this.speedX;
    }

    if (this.getInitHeight <= this.y) {
      this.jump = false;
      this.getInitHeight = 0;
    }

    if (this.y > 260) {
      this.y = 260;
    }

    if(this.y < 170){
      this.lane1 = false;
      this.lane2 = false;
      this.middlelane = false;
    }
    if (this.y >= 212){
      this.lane1 = true;
      this.lane2 = false;
      this.middlelane = false;
    } else if(this.y <= 201 && this.y > 170){
      this.lane1 = false;
      this.lane2 = true;
      this.middlelane = false;
    } else if (this.y > 201 && this.y < 212){
      this.lane1 = false;
      this.lane2 = false;
      this.middlelane = true;
    }

    if (this.x > 700) {
      this.x = 700;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updatePlayer(){
    this.frameNumber += 1;
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 50) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 700) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 170) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 400) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32] && !this.jump && this.obs1.type === "barrier") {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -150;
      this.speedX = 70;
    }
    if (this.obs1){

      this.obs1.x -= 10.5;
    }
    this.timerCount += 1;
    if (this.timerCount === 20) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.newPos();
    this.update();
  }

  crashWith(otherobj) {
    var playerLeft = this.x;
    var playerRight = this.x + 140;
    var playerTop = this.y;
    var playerBottom = this.y + 175;
    var obstacleLeft = otherobj.x;
    var obstacleRight = otherobj.x;
    var obstacleTop = otherobj.y;
    var obstacleBottom = otherobj.y + (otherobj.height);
    var crash = false;
    if (( (this.lane1 && otherobj.lane1) || (this.lane2 && otherobj.lane2)) && playerRight > obstacleLeft) {
      crash = true;
    }else if ((otherobj.middlelane) && (playerRight > obstacleLeft) && (playerBottom < obstacleBottom) && (playerBottom > obstacleTop) && (playerTop > obstacleTop)) {
      crash = true;
    }else if ((otherobj.middlelane) && (this.middlelane) && (playerRight > obstacleLeft)) {
      crash = true;
    }else if(playerLeft > obstacleLeft) {
      this.checkCollision = false;
      this.score += 1;
    }

    return crash;
  }

  everyinterval(n) {
    if ((this.frameNumber / n) % 1 === 0) {
      return true;
    }
    return false;
  }

}
module.exports = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
document.addEventListener('DOMContentLoaded', ()=> {
  const backgroundCanvas = document.getElementById('background');
  const foregroundCanvas = document.getElementById('foreground');
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const foregroundCtx = foregroundCanvas.getContext('2d');
  const backgroundImage = new Image();
  window.game = false;
  backgroundImage.src = './assets/images/entrybackground.jpg';
  backgroundImage.onload = function(){
    backgroundCtx.drawImage(backgroundImage, 0, 0,850,475);
  };
  const logo = new Image();
  logo.src = './assets/images/rclogo.png';
  const keys = new Image();
  keys.src = './assets/images/dirkeys.png';
  const space = new Image();
  space.src = './assets/images/space.png';
  logo.onload = function(){
    backgroundCtx.drawImage(logo, 110, 0,600,300);
    backgroundCtx.font = "30px Verdana";
    backgroundCtx.fillStyle = "#ffffff";
    backgroundCtx.fillText("Press Enter to start game",220,280);
    backgroundCtx.font = "15px Verdana";
    backgroundCtx.fillStyle = "#FF9900";
    backgroundCtx.fillText("Move around lanes",427,450);
    backgroundCtx.fillText("Jump", 665,450);
    backgroundCtx.fillStyle = "#7fffd4";
// Turn transparency on
    backgroundCtx.fillText("Dodge traffic by moving around lanes.", 80,350);
    backgroundCtx.fillText("Use directional keys to change lane and", 80, 380);
    backgroundCtx.fillText("press space to jump over wood logs.",80,410);
     backgroundCtx.fillText("Jump is allowed for wood logs only.",80,440);
    backgroundCtx.drawImage(keys, 430,350, 130, 80);
    backgroundCtx.drawImage(space, 620,370, 130, 90);
  };
  window.addEventListener('keydown', function (e) {
    if(e.keyCode === 13 && !window.game){
      window.game = new Game(backgroundCtx, foregroundCtx);
    }
  },false);
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map