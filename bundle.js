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
class Game {
  constructor(backgroundCtx,foregroundCtx){
    this.background = null;
    this.createBackground(backgroundCtx,foregroundCtx);
  }

  createBackground(backgroundCtx, foregroundCtx) {
    var velocity=200;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/citybackground.jpg';
    const player = new Player(foregroundCtx, 40, 415);
    const drawImage = (time) => {
      var framegap=time-lastRepaintTime + 3;
      lastRepaintTime=time;
      var translateX=velocity*(framegap/900);
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
/***/ (function(module, exports) {

class Player {
  constructor(ctx, x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.photoCount = 1;
    this.timerCount = 0;
    this.jump = false;
    this.getInitHeight = 0;
    this.gravity = 3;
    this.gravitySpeed = 0;
    const bikerImage = new Image();

    this.image = bikerImage;
    this.interval = setInterval(this.updateGame.bind(this), 1);
    this.pressedKey = false;
    window.addEventListener('keydown', function (e) {
      Player.pressedKey = (Player.pressedKey || []);
      Player.pressedKey[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      Player.pressedKey = false;
    });
  }

  update(){
    if (this.photoCount > 5) {
      this.photoCount = 1;
    }
    this.image.src = `./assets/images/image_part_00${this.photoCount + 4}.png`;
    this.ctx.drawImage(this.image, this.x, this.y);
  }

  newPos() {
    if (this.jump) {
      this.gravitySpeed = this.gravity;
      this.y += this.speedY + this.gravitySpeed;
      this.x += this.speedX;
    }
    if (this.getInitHeight === this.y) {
      this.jump = false;
    }
      this.y += this.speedY;
      this.x += this.speedX;
    if (this.y > 430) {
      this.y = 430;
    }
    if (this.x > 900) {
      this.x = 900;
    }
    this.speedX = 0;
    this.speedY = 0;
  }

  updateGame(){
    this.ctx.clearRect(0,0,1100,650);
    this.newPos();
    if (Player.pressedKey && Player.pressedKey[37] && this.x > 100) {this.speedX = -2; }
    if (Player.pressedKey && Player.pressedKey[39] && this.x < 950) {this.speedX = 2; }
    if (Player.pressedKey && Player.pressedKey[38] && this.y > 300) {this.speedY = -2; }
    if (Player.pressedKey && Player.pressedKey[40] && this.y < 430) {this.speedY = 2; }
    if (Player.pressedKey && Player.pressedKey[32]) {
      Player.pressedKey = false;
      this.jump = true;
      this.getInitHeight = this.y;
      this.speedY = -100;
      this.speedX = 0;
    }
    // if (this.x < 600) {
    // }
    // if (this.y > 300) {
    // }
    this.timerCount += 1;
    if (this.timerCount === 15) {
      this.photoCount += 1;
      this.timerCount = 1;
    }
    this.update();
  }



  moveup() {
    this.y -= 1;
  }

  movedown() {
    this.y += 1;
  }

  moveleft() {
    this.x -= 1;
  }

  moveright() {
    this.x += 1;
  }
}
module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map