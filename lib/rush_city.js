const Game = require('./game.js');
document.addEventListener('DOMContentLoaded', ()=> {
  const backgroundCanvas = document.getElementById('background');
  const foregroundCanvas = document.getElementById('foreground');
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const foregroundCtx = foregroundCanvas.getContext('2d');
  const game = new Game(backgroundCtx, foregroundCtx);
});
