// const Score = require('./score');
const MovingObject = require('./moving_object');

class Dinosaur extends MovingObject {
  constructor(row, col, xDir, yDir, board, game) {
    super(row, col, xDir, yDir, board,game);

    this.dir = "right";
		this.moving = true;
		// this.game = game;
    // this.score = new Score();
    

    this.steps = 4;
    this.step = this.dx / this.steps;
    this.osx = 0;
    this.osy = 0;
    

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.collectCoin = this.collectCoin.bind(this);
		this.registerListeners();
		// this.timer = setTimeout(this.move, 100);
  }

  setAttributes() {
    this.el.setAttribute("class", "grid-layer dino animate");
    this.el.setAttribute("id", "gl1");
    this.dinoImg.setAttribute("src", "./dino/walk1.png");
    this.dinoImg.setAttribute("class", "dino-img");
    this.dinoImg.setAttribute("id", "dino-img");
    this.placeObject();
  }

  startAnimation() {
    this.interval = setInterval(() => {
      let dino = document.getElementById("dino-img");
      let segments = dino.src.split("/");
      let imgSrc = segments[segments.length - 1];
      let srcNum = Number(imgSrc.split(".")[0].slice(4));

      if (srcNum === 10) {
        srcNum = 1;
      } else {
        srcNum += 1;
      }
      dino.setAttribute("src", `./dino/walk${srcNum}.png`);
    }, 50);
  }

  handleKeyPress(event) {
    if (!this.moving) return;
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (key) {
      case "ArrowLeft":
        this.moving = false;
        this.updateDir("left", -1, 0);
        this.moving = true;
        break;
      case "ArrowRight":
        this.moving = false;
        this.updateDir("right", 1, 0);
        this.moving = true;
        break;
      case "ArrowDown":
        this.moving = false;
        this.updateDir("down", 0, 1);
        this.moving = true;
        break;
      case "ArrowUp":
        this.moving = false;
        this.updateDir("up", 0, -1);
        this.moving = true;
        break;
    }
  }

  move() {
    if (this.timer) clearTimeout(this.timer);
		if (!this.moving) return;

    this.osx = Math.abs((this.osx + 1) % 4 * this.xDir);
    this.osy = Math.abs((this.osy + 1) % 4 * this.yDir);
		// this.updateOffset();
    if (!this.isCollision()) {
			this.updatePos();
      this.placeObject();
      this.collectCoin();
    }

    this.timer = setTimeout(this.move, 50);
  }

  is180(xDir, yDir) {
    if ((xDir === 1 && this.xDir === -1) ||
        (xDir === -1 && this.xDir === 1)) {
      return true;
    }
    if ((yDir === 1 && this.yDir === -1) ||
        (yDir === -1 && this.yDir === 1)) {
      return true;
    }

    return false;
  }

  setRowAndColPos() {

    if (!this.isCollision() && (this.osx > 2 || this.osy > 2)) {
      this.updateRowAndCol();
    } 
    this.osx = 0;
    this.osy = 0;


    this.xPos = this.getPxPosition(this.col);
    this.yPos = this.getPxPosition(this.row);
    this.placeObject();
  }


  updateDir(dir, xDir, yDir) {
    this.el.classList.remove(this.dir);
    this.el.classList.add(dir);
    this.dir = dir;
    
    if (this.xDir !== xDir || this.yDir !== yDir) {
      this.setRowAndColPos(xDir, yDir);
    }
    this.xDir = xDir;
    this.yDir = yDir;
  }


  collectCoin() {
    let tileId = `row${this.row}-col${this.col}`;
    let tile = document.getElementById(tileId);

    if (tile.classList.contains("coin")) {
      this.game.updateScore();
      let img = document.querySelector(`#${tile.id} > img`);
      img.setAttribute("src", "./images/blank.gif");
      tile.classList.remove("coin");
    }
  }

  registerListeners() {
    document.addEventListener("keydown", this.handleKeyPress);
  }


}

module.exports = Dinosaur;