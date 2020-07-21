const Board = require('./board');
const Dinosaur = require('./dinosaur');
const Asteroid = require('./asteroid')

class Game {
  constructor() {
    this.board = new Board(20, 14);
    this.dino = new Dinosaur(8, 9, 1, 0, this.board);
    this.asteroid = new Asteroid(5, 9, 0, 1, this.board);
  }
}

module.exports = Game;