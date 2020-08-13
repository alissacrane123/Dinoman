const Board = require('./board');
const Dinosaur = require('./dinosaur');
const Asteroid = require('./asteroid')
const Score = require('./score');

class Game {
  constructor() {
		this.board = new Board(20, 14);
		this.currentScore = null;
		this.lives = null;

    this.newGame = this.newGame.bind(this);
    this.start = this.start.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.registerListeners();
		this.newGame();
		
  }

  registerListeners() {
		document.querySelectorAll('.new-game').forEach(button => {
			button.addEventListener('click', this.newGame);
		})
    // document.getElementById('new-game').addEventListener('click', this.newGame);
    document.getElementById('start').addEventListener('click', this.start);
	}
	
	updateScore() {
		this.currentScore.updateScore();
	}

  newGame() {
		// debugger
    if (this.dino) {
			document.getElementById('modal').classList.add('hide')
			this.removeMovingObjects();
			this.clearAllTimers();
    }
		this.board.resetBoard();
		this.lives = 3;
		this.currentScore = new Score();
		this.updateLives()
		this.createMovingObjects();
	}

	handleLoss() {
		this.removeMovingObjects();
		this.board.resetBoard();
		// debugger
		this.lives--
		this.updateLives(this.lives);
		if (this.lives > 0) {
			this.currentScore.resetScore();
		} else {
			// debugger
			this.handleGameOver();
		}
		this.createMovingObjects();
	}

	handleGameOver() {
		// debugger
		document.getElementById('modal').classList.remove('hide')
	}

	updateLives() {
		let lives = document.getElementById('lives');
		let img = '<img src="./dino/walk1.png" class="dino-img live">'
		let html = '';
		let i = 0;
		while (i < this.lives) {
			// debugger
			html += img;
			i++
		}
		lives.innerHTML = html;
	}

	removeMovingObjects() {
		let main = document.getElementById("main");
		main.removeChild(this.dino.el);
		document.querySelectorAll('.asteroid').forEach(node => {
			node.parentElement.removeChild(node);
		})
	}

	createMovingObjects() {
		this.dino = new Dinosaur(8, 9, 1, 0, this.board, this);
		this.createDinoEl();

		this.asteroids = []
		let ops = [[5, 9, 0, 1], [6, 9, 1, 0], [6, 10, -1, 0], [5, 10, 0, -1]];
		for (let i = 0; i < 4; i++) {
			let asteroid = new Asteroid(...ops[i], this.board, this,this.dino);
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
		asteroid.i = i;
		asteroid.setAttributes(i);
		asteroid.animate();
		asteroid.placeObject();

		// // asteroid.timer = setTimeout(asteroid.move, i * 500);
	}

	start() {
		this.dino.timer = setTimeout(this.dino.move, 100)
		this.asteroids.forEach((asteroid, i)=> {
			asteroid.timer = setTimeout(asteroid.move, i * 500);
		})
	}

}

module.exports = Game;