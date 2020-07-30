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
			
			document.querySelectorAll('.asteroid').forEach(node => {
				node.parentElement.removeChild(node);
			})
			// this.clearAllTimers();
    }
		this.board.resetBoard();
		
		this.dino = new Dinosaur(8, 9, 1, 0, this.board);
		this.createDino();

		this.asteroids = []

		let ops = [[5,9,0,1],[6,9,1,0],[6,10,-1,0],[5,10,0,-1]];
		for (let i = 0; i < 4; i++) {
			let asteroid = new Asteroid(...ops[i], this.board, this.dino, this);
			this.asteroids.push(asteroid);
			this.createAsteroid(i);
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
		this.asteroids[i].el = asteroid;
		this.asteroids[i].astImg = astImg;

		this.asteroids[i].astImg.style.backgroundPositionX = '-0vw';
		this.asteroids[i].astImg.style.backgroundPositionY = '-3vw';
		this.asteroids[i].animate();
		this.asteroids[i].placeObject();
	}

}

module.exports = Game;