class MovingObject {
  constructor(row, col, xDir, yDir, board, game) {
    this.row = row;
    this.col = col;
    this.xDir = xDir;
    this.yDir = yDir;
		this.board = board;
		this.game = game;
		this.dx = (window.innerWidth * 2.5) / 100;
		this.dy = (window.innerWidth * 2.5) / 100;
		
		this.steps = 4;
		this.step = this.dx / this.steps;
		this.osx = 0;
		this.osy = 0;

    this.yPos = this.getPxPosition(this.row);
    this.xPos = this.getPxPosition(this.col);


		
		this.move = this.move.bind(this);
		// this.timer = setTimeout(this.move, 2.500);
	}

	updatePos() {
		this.xPos = this.xPos + this.xDir * this.step;
		this.yPos = this.yPos + this.yDir * this.step;

		if (this.osx == 0 && this.osy === 0) {
			this.updateRowAndCol();
		}
	}


  getPxPosition(pos) {
    let px = (window.innerWidth / 100) * (pos * 2.5);
    return px;
  }

  placeObject() {
    this.el.style.left = `${this.xPos}px`;
    this.el.style.top = `${this.yPos}px`;
  }

  updateRowAndCol() {
    this.row += this.yDir;
    this.col += this.xDir;
  }

  isCollision() {
    let newRow = this.row + this.yDir;
    let newCol = this.col + this.xDir;
    
    let tileId = `row${newRow}-col${newCol}`;
    let tile = document.getElementById(tileId);

    return tile.classList.contains("barrier");
	}
	


}

module.exports = MovingObject;