const Board = require('./board');
const Dinosaur = require('./dinosaur');
const Asteroid = require('./asteroid')

class Game {
  constructor() {
    this.board = new Board(20, 14);
    this.newGame = this.newGame.bind(this);
    this.registerListeners();
    this.newGame();
  }

  registerListeners() {
    document.getElementById('new-game').addEventListener('click', this.newGame)
  }


  newGame() {
    // debugger
    let main = document.getElementById("main");
    if (this.dino) {
      main.removeChild(this.dino.el);
      main.removeChild(this.asteroid.el);
    }
    this.board.resetBoard();
    this.dino = new Dinosaur(8, 9, 1, 0, this.board);
    this.asteroid = new Asteroid(5, 9, 0, 1, this.board, this.dino, this);
  }


}

module.exports = Game;