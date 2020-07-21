const Board = require('./board');
const Dinosaur = require('./dinosaur');
const Asteroid = require('./asteroid')
const Game = require('./game')

document.addEventListener('DOMContentLoaded', () => {

  new Game();
  // let b = new Board(20, 14);

  // b.getPosition(1, 2);

  // let d = new Dinosaur(8, 9, 1, 0, b);

  // let a = new Asteroid(5,9,0,1,b);
  console.log('webpack is working')
})