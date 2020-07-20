const Board = require('./board');
const Dinosaur = require('./dinosaur');


document.addEventListener('DOMContentLoaded', () => {

  let b = new Board(20, 14);

  b.getPosition(1, 2);

  let d = new Dinosaur(b);
  console.log('webpack is working')
})