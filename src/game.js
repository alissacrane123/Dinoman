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
    if (this.dino) {
			this.removeMovingObjects();
    }
		this.board.resetBoard();
		this.createMovingObjects();
	}

	removeMovingObjects() {
		let main = document.getElementById("main");
		main.removeChild(this.dino.el);
		document.querySelectorAll('.asteroid').forEach(node => {
			node.parentElement.removeChild(node);
		})
	}

	createMovingObjects() {
		this.dino = new Dinosaur(8, 9, 1, 0, this.board);
		this.createDinoEl();

		this.asteroids = []
		let ops = [[5, 9, 0, 1], [6, 9, 1, 0], [6, 10, -1, 0], [5, 10, 0, -1]];
		for (let i = 0; i < 4; i++) {
			let asteroid = new Asteroid(...ops[i], this.board, this.dino, this);
			this.asteroids.push(asteroid);
			this.createAsteroidEl(i);
		}
	}
	
	clearAllTimers() {
		this.asteroids.forEach(asteroid => {
			asteroid.moving = false;
			clearTimeout(asteroid.timer)
			clearInterval(asteroid.interval);
		});
		this.dino.moving = false;
		clearTimeout(this.dino.timer)
		clearInterval(this.dino.interval);
	}

	createDinoEl() {
		this.dino.el = document.createElement("div");
		this.dino.dinoImg = document.createElement("img");
		this.dino.el.appendChild(this.dino.dinoImg);
		let main = document.getElementById("main");
		main.appendChild(this.dino.el);
		this.dino.setAttributes();
		this.dino.startAnimation();
	}

	createAsteroidEl(i) {
		let asteroid = this.asteroids[i];

		let asteroidEl = document.createElement("div");
		let astImg = document.createElement("div");
		let main = document.getElementById("main");
		asteroidEl.appendChild(astImg);
		main.appendChild(asteroidEl);

		asteroid.el = asteroidEl;
		asteroid.astImg = astImg;

		// asteroid.setAttribute("class", "grid-layer asteroid animate");
		// asteroid.setAttribute("id", "gl2");
		// astImg.setAttribute("class", "ast-img");
		// astImg.setAttribute("id", `asteroid-${i}}`);

		// this.asteroids[i].astImg.style.backgroundPositionX = '-0vw';
		// this.asteroids[i].astImg.style.backgroundPositionY = '-3vw';
		asteroid.setAttributes(i);
		asteroid.animate();
		asteroid.placeObject();
	}

}

module.exports = Game;