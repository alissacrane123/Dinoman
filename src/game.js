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
    let main = document.getElementById("main");
    if (this.dino) {
      main.removeChild(this.dino.el);
      main.removeChild(this.asteroid.el);
    }
    this.board.resetBoard();
		this.dino = new Dinosaur(8, 9, 1, 0, this.board);
		this.createDino();
		this.asteroid = new Asteroid(5, 9, 0, 1, this.board, this.dino, this);
		this.createAsteroid(0);
  }

	createDino() {
		this.dino.el = document.createElement("div");
		this.dino.dinoImg = document.createElement("img");
		this.dino.el.appendChild(this.dino.dinoImg);
		let main = document.getElementById("main");
		main.appendChild(this.dino.el);
		this.dino.setAttributes();
		this.dino.startAnimation();
	}

	createAsteroid(i) {
		let asteroid = document.createElement("div");
		asteroid.setAttribute("class", "grid-layer asteroid animate");
		asteroid.setAttribute("id", "gl2");
		let astImg = document.createElement("div");
		astImg.setAttribute("class", "ast-img");
		astImg.setAttribute("id", `asteroid-${i}}`);
		asteroid.appendChild(astImg);
		let main = document.getElementById("main");
		main.appendChild(asteroid);
		this.asteroid.el = asteroid;
		this.asteroid.astImg = astImg;

		this.asteroid.astImg.style.backgroundPositionX = '-0vw';
		this.asteroid.astImg.style.backgroundPositionY = '-3vw';
		this.asteroid.animate();
		this.asteroid.placeObject();
	}

}

module.exports = Game;