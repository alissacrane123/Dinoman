const MovingObject = require('./moving_object');

class Asteroid extends MovingObject{
  constructor(row, col, xDir, yDir, board, dino, game)  {
    super(row, col, xDir, yDir, board);

    this.dino = dino;
    this.game = game;
		this.moving = true;
		this.vector = this.getVector();

    this.renderVectors();
    this.timer = setTimeout(this.move, 100);
  }

  move() {
		if (this.timer) clearTimeout(this.timer);
		if (!this.moving) return;

		this.osx = Math.abs((this.osx + 1) % 4 * this.xDir);
		this.osy = Math.abs((this.osy + 1) % 4 * this.yDir);

    if (this.isDinoCollision()) {
      this.handleDinoCollision();
      return;
			
		} else if (this.isCollision() ) {
			this.checkOptions();

    } else {
			this.updatePos();

			if (this.osx == 0 && this.osy === 0) {
				this.checkOptions();
			}

			this.placeObject();
    }
    this.timer = setTimeout(this.move, 100);
	}

	checkOptions() {
		let value = this.board.grid[this.row][this.col];
		let vectors = this.board.vectorRef[value]
		let dirsToDino = this.shuffle(this.dirsToDino());
		dirsToDino = dirsToDino.filter(dir => !this.isOpposite(dir))
		for (let i = 0; i < dirsToDino.length; i++) {
			let newDir = dirsToDino[i];

			if (vectors.includes(newDir)) {
				this.updateDir(newDir);
				return;
			}
		}

		let randomVector = vectors[Math.floor(Math.random() * vectors.length)];
		this.updateDir(randomVector);
	}

	isOpposite(dir) {
		if (this.vector === 2 && dir === 1) return true;
		if (this.vector === 4 && dir === 8) return true
		if (this.vector === 1 && dir === 2) return true;
		if (this.vector === 8 && dir === 4) return true
		return false;
	}

	dirsToDino() {
		let dx = this.dino.col - this.col;
		let dy = this.dino.row - this.row;
		let bestDirs = [];
		if (dy < 0) {
			bestDirs.push(4)
		} else if (dy > 0) {
			bestDirs.push(8);
		} 

		if (dx < 0) {
			bestDirs.push(1);
		} else if (dx > 0) {
			bestDirs.push(2);
		}
		return bestDirs;
	}

	handleDinoCollision() {
		this.dino.moving = false;
		this.moving = false;
		clearInterval(this.dino.interval);
		clearTimeout(this.dino.timer)
		let reset = this.game.newGame;
		setTimeout(reset, 1000);
	}

	shuffle(array) {
		array.sort(() => Math.random() - 0.5);
		return array;
	}

	
	// changeDir() {
	// 	let value = this.board.grid[this.row][this.col];
	// 	let vectors = this.board.vectorRef[value]
	// 	let randomVector = vectors[Math.floor(Math.random() * vectors.length)];

	// 	this.updateDir(randomVector);
	// }

  updateDir(vector) {
		if (this.vector === vector) return;

    if (vector === 1) {
      this.xDir = -1;
      this.yDir = 0;
    } else if (vector === 2) {
      this.xDir = 1;
      this.yDir = 0;
    } else if (vector === 4) {
      this.xDir = 0;
      this.yDir = -1;
    } else if (vector === 8) {
      this.xDir = 0;
      this.yDir = 1;
		}
		this.vector = vector;
  }


  animate() {
    let diff = -3;
    setInterval(() => {
      let x = this.astImg.style.backgroundPositionX;
      let y = this.astImg.style.backgroundPositionY;
      let xNum = Number(x.slice(0, x.length - 2))
      
      if (xNum === -24) {
        diff = 3
      } else if (xNum === 0) {
        diff = -3
      }

      xNum = xNum + diff;
      x = `${xNum}vw`
     
      this.astImg.style.backgroundPositionX = x;
    }, 200)
  }

  renderVectors() {
    this.tx = new Array();
    this.ty = new Array();

    let tx = this.tx; let ty = this.ty;

    tx[0] = 0; ty[0] = 0;  // no movement
    tx[1] = 1; ty[1] = 0;  // right
    tx[2] = -1; ty[2] = 0;  // left
    tx[4] = 0; ty[4] = -1;  // up
    tx[8] = 0; ty[8] = 1;  // down

    this.t2 = new Array();
    let t2 = this.t2;

    t2[1] = [1];
    t2[2] = [2];
    t2[4] = [4];
    t2[8] = [8];
    t2[3] = [1, 2];
    t2[9] = [1, 8];
    t2[10] = [2, 8];
    t2[12] = [4, 8];
    t2[5] = [1, 4];
    t2[6] = [2, 4];
    t2[7] = [1, 2, 4];
    t2[11] = [1, 2, 8];
    t2[13] = [1, 4, 8];
    t2[14] = [2, 4, 8];
    t2[15] = [1, 2, 4, 8]; // left, right, up, down


    // console.log(this.board.grid)
  }

	isDinoCollision() {
		let radius = this.dx / 2;
		let dx = Math.abs(this.dino.xPos - this.xPos);
		let dy = Math.abs(this.dino.yPos - this.yPos);

		return (dx + dy < radius);
	} 

	getVector() {
		if (this.xDir > 0) return 2;
		if (this.xDir < 0) return 1;
		if (this.yDir > 0) return 8;
		if (this.yDir < 0) return 4;
	}
}

module.exports = Asteroid;