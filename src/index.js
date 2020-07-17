const Board = require('./board');

document.addEventListener('DOMContentLoaded', () => {

  let b = new Board(20, 14);

  b.getPosition(1, 2);
  console.log('webpack is working')
})