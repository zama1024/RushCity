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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
document.addEventListener('DOMContentLoaded', ()=> {
  const backgroundCanvas = document.getElementById('background');
  const foregroundCanvas = document.getElementById('foreground');
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const foregroundCtx = foregroundCanvas.getContext('2d');
  const game = new Game(backgroundCtx, foregroundCtx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(3);
const Obstacle = __webpack_require__(5);
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
    this.interval = setInterval(() => {this.velocity += 1;}, 100);
    this.velocity = 300;
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=this.velocity;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/citybackground.jpg';
    const player = new Player(foregroundCtx, 40, 415);

    const taxi = new Obstacle(foregroundCtx, 400, 300);

    const drawImage = (time) => {
      var framegap=time-lastRepaintTime;
      lastRepaintTime=time;
      var translateX=this.velocity*(framegap/900);
      backgroundCtx.clearRect(0,0,1100,650);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,1100,650);
      backgroundCtx.fill();
      backgroundCtx.translate(-translateX,0);
      requestAnimationFrame(drawImage);
    };
    backgroundImage.addEventListener('load',drawImage,false);
    var lastRepaintTime=window.performance.now();
  }

}

module.exports = Game;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Taxi = __webpack_require__(6);
const Barrier = __webpack_require__(7);
const Flinstones = __webpack_require__(9);
const Car = __webpack_require__(10);
class Player {
  constructor(ctx, x, y) {
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
    this.obs1 = new Barrier(this.ctx);
    this.frameNumber = 0;

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

    this.image.src = `./assets/images/image_part_00${this.photoCount}.png`;
    this.ctx.clearRect(0,0,1100,650);
    if(this.obs1.y > this.y){

      this.ctx.drawImage(this.image, this.x, this.y,230,230);
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
    }else{
      this.ctx.drawImage(this.obs1.image, this.obs1.x, this.obs1.y ,this.obs1.width,this.obs1.height);
      this.ctx.drawImage(this.image, this.x, this.y,230,230);
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

    if (this.y > 400) {
      this.y = 400;
    }

    if (this.x > 700) {
      this.x = 700;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updatePlayer(){
    this.frameNumber += 1;
    this.newPos();
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 50) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 700) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 270) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 400) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32]) {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -200;
      this.speedX = 50;
    }

    this.obs1.x -= 6;
    this.timerCount += 1;
    if (this.timerCount === 20) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.update();
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
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

class Taxi{
  constructor(ctx, x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    const taxiImage = new Image();
    taxiImage.src = './assets/images/taxi.png';
    this.image = taxiImage;
  }


}
module.exports = Taxi;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Taxi{
  constructor(ctx, x, y) {
    this.height = 250;
    this.width = 400;
    this.x = 1100;
    this.y = [270,400][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    const taxiImage = new Image();
    taxiImage.src = './assets/images/taxi.png';
    this.image = taxiImage;
  }


}
module.exports = Taxi;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

class Car{
  constructor(ctx) {
    this.height = 220;
    this.width = 280;
    this.x = 1100;
    this.y = [300,400][Math.floor(Math.random()*2)];
    this.ctx = ctx;
    const carImage = new Image();
    carImage.src = './assets/images/car.png';
    this.image = carImage;
  }


}
module.exports = Car;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map