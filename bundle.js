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
    var velocity=500;
    const backgroundImage = new Image();
    backgroundImage.src = './assets/images/citybackground.jpg';
    const player = new Player(foregroundCtx, 40, 415);
    const drawImage = (time) => {
      var framegap=time-lastRepaintTime + 3;
      lastRepaintTime=time;
      var translateX=velocity*(framegap/900);
      backgroundCtx.clearRect(0,0,830,650);
      var pattern=backgroundCtx.createPattern(backgroundImage,"repeat-x");
      backgroundCtx.fillStyle=pattern;
      backgroundCtx.rect(translateX,0,830,650);
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
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    const bikerImage = new Image();
    bikerImage.src = './assets/images/biker.png';
    bikerImage.onload = function(){
      ctx.drawImage(bikerImage, x, y);
    };
    this.image = bikerImage;
    this.interval = setInterval(this.updateGame.bind(this), 20);
  }

  update(){
    this.ctx.drawImage(this.image, this.x, this.y);
  }

  updateGame(){
    this.ctx.clearRect(0,0,830,650);
    if (this.x < 600) {
      this.x += 1;
    }
    if (this.y > 300) {
      this.y -= 5;
    }
    this.update();
  }
}
module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map