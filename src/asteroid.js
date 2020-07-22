const MovingObject = require('./moving_object');

class Asteroid extends MovingObject{
  constructor(row, col, xDir, yDir, board)  {
    super(row, col, xDir, yDir, board);

    this.move = this.move.bind(this);

    
    this.createAsteroid();
    this.renderVectors();
    this.timer = setTimeout(this.move, 300);
  }

  move() {
    if (this.timer) clearTimeout(this.timer);
    if (!this.isCollision()) {
      this.updateRowAndCol();
      this.xPos = this.xPos + (this.xDir * this.dx);
      this.yPos = this.yPos + (this.yDir * this.dy);

      this.placeObject();
    } else {
      // debugger
      let value = this.board.grid[this.row][this.col];
      let vectors = this.board.vectorRef[value]
      let randomVector = vectors[Math.floor(Math.random() * vectors.length)];

      this.updateDir(randomVector);
    }

    this.timer = setTimeout(this.move, 300);
  }

  updateDir(vector) {
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
    this.el = asteroid;
    this.astImg = astImg;

    this.astImg.style.backgroundPositionX = '-0vw';
    this.astImg.style.backgroundPositionY = '-3vw';
    this.animate();
    this.placeObject();
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

    // console.log(this.t2)
    console.log(this.board.grid)
    // console.log(this.board.grid[this.row][this.col])
  }

  // placeObject() {
  //   this.el.style.left = `${this.xPos}px`;
  //   this.el.style.top = `${this.yPos}px`;
  // }

  // animate() {
  //   let prevTop = this.astImg.style.backgroundPosition
  //   debugger
  //   console.log(prevTop);
  //   // this.astImg.style.backgroundPosition = 
  // }
}

module.exports = Asteroid;