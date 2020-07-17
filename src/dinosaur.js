class Dinosaur {
  constructor(board) {
    this.row = 8;
    this.col = 10;
    this.yPos = this.getPxPosition(8);
    this.xPos = this.getPxPosition(10);
    this.dx = (window.innerWidth * 3)/100;
    this.dy = (window.innerWidth * 3)/100;
    this.board = board;
    this.createDino();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.registerListeners();
  }

  createDino() {
    let dino = document.createElement('div');
    dino.setAttribute('class', 'grid-layer dino');
    dino.setAttribute('id', 'gl1');
    let dinoImg = document.createElement('img');
    dinoImg.setAttribute('src', '../dino/Idle1.png');
    dinoImg.setAttribute('class', 'dino-img');
    dino.appendChild(dinoImg);
    let main = document.getElementById('main');
    main.appendChild(dino);
    this.dinoEl = dino;
    this.moveDino();
  }

  getPxPosition(pos) {
    let px = (window.innerWidth / 100) * (pos * 3);
    return px;
  }

  handleKeyPress(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch(key) {
      case 'ArrowLeft':
        this.updatePos(-1, 0);
        break
      case 'ArrowRight':
        this.updatePos(1, 0);
        break;
      case 'ArrowDown':
        this.updatePos(0, 1);
        break;
      case 'ArrowUp':
        this.updatePos(0, -1);
        break;
    }
  }

  updatePos(x, y) {
    if (!this.isCollision(x, y)) {
      this.row += y;
      this.col += x;
      this.xPos = this.xPos + (x * this.dx);
      this.yPos = this.yPos + (y * this.dy);
      this.moveDino();
    }
  }

  moveDino() {
    this.dinoEl.style.left = `${this.xPos}px`;
    this.dinoEl.style.top = `${this.yPos}px`;
    console.log(this.row, this.col)
  }

  isCollision(x, y) {
    let newRow = this.row + y;
    let newCol = this.col + x;
    let tileId = `row${newRow}-col${newCol}`;
    let tile = document.getElementById(tileId);
    return tile.classList.contains('barrier');
  }

  registerListeners() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

}

module.exports = Dinosaur;