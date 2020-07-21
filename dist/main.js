/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Asteroid extends MovingObject{\n  constructor(row, col, xDir, yDir, board)  {\n    super(row, col, xDir, yDir, board);\n\n    this.move = this.move.bind(this);\n\n    \n    this.createAsteroid();\n    this.renderVectors();\n    this.timer = setTimeout(this.move, 300);\n  }\n\n  move() {\n    if (this.timer) clearTimeout(this.timer);\n    if (!this.isCollision()) {\n      this.updateRowAndCol();\n      this.xPos = this.xPos + (this.xDir * this.dx);\n      this.yPos = this.yPos + (this.yDir * this.dy);\n      // debugger\n\n      this.placeObject();\n      \n    }\n\n    this.timer = setTimeout(this.move, 300);\n  }\n\n\n  createAsteroid(i) {\n    let asteroid = document.createElement(\"div\");\n    asteroid.setAttribute(\"class\", \"grid-layer asteroid animate\");\n    asteroid.setAttribute(\"id\", \"gl2\");\n    let astImg = document.createElement(\"div\");\n    astImg.setAttribute(\"class\", \"ast-img\");\n    astImg.setAttribute(\"id\", `asteroid-${i}}`);\n    asteroid.appendChild(astImg);\n    let main = document.getElementById(\"main\");\n    main.appendChild(asteroid);\n    this.el = asteroid;\n    this.astImg = astImg;\n\n    this.astImg.style.backgroundPositionX = '-0vw';\n    this.astImg.style.backgroundPositionY = '-3vw';\n    this.animate();\n    this.placeObject();\n  }\n\n  animate() {\n    let diff = -3;\n    setInterval(() => {\n      let x = this.astImg.style.backgroundPositionX;\n      let y = this.astImg.style.backgroundPositionY;\n      let xNum = Number(x.slice(0, x.length - 2))\n      \n      if (xNum === -24) {\n        diff = 3\n      } else if (xNum === 0) {\n        diff = -3\n      }\n\n      xNum = xNum + diff;\n      x = `${xNum}vw`\n     \n      this.astImg.style.backgroundPositionX = x;\n    }, 200)\n  }\n\n  renderVectors() {\n    this.tx = new Array();\n    this.ty = new Array();\n\n    let tx = this.tx; let ty = this.ty;\n\n    tx[0] = 0; ty[0] = 0;  // no movement\n    tx[1] = 1; ty[1] = 0;  // right\n    tx[2] = -1; ty[2] = 0;  // left\n    tx[4] = 0; ty[4] = -1;  // up\n    tx[8] = 0; ty[8] = 1;  // down\n\n    this.t2 = new Array();\n    let t2 = this.t2;\n\n    t2[1] = [1];\n    t2[2] = [2];\n    t2[4] = [4];\n    t2[8] = [8];\n    t2[3] = [1, 2];\n    t2[9] = [1, 8];\n    t2[10] = [2, 8];\n    t2[12] = [4, 8];\n    t2[5] = [1, 4];\n    t2[6] = [2, 4];\n    t2[7] = [1, 2, 4];\n    t2[11] = [1, 2, 8];\n    t2[13] = [1, 4, 8];\n    t2[14] = [2, 4, 8];\n    t2[15] = [1, 2, 4, 8]; // left, right, up, down\n\n    // console.log(this.t2)\n    console.log(this.board.grid)\n    // console.log(this.board.grid[this.row][this.col])\n  }\n\n  // placeObject() {\n  //   this.el.style.left = `${this.xPos}px`;\n  //   this.el.style.top = `${this.yPos}px`;\n  // }\n\n  // animate() {\n  //   let prevTop = this.astImg.style.backgroundPosition\n  //   debugger\n  //   console.log(prevTop);\n  //   // this.astImg.style.backgroundPosition = \n  // }\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Board {\n  constructor(width, height) {\n    this.numRows = height;\n    this.numCols = width;\n\n    this.grid = new Array();\n    this.vectorRef = this.createVectorRef();\n\n    this.renderBoard();\n  }\n\n  renderBoard() {\n    let board = document.getElementById('board');\n\n    for (let i = 0; i < this. numRows; i++) {\n      let row = new Array();\n      for (let j = 0; j < this.numCols; j++) {\n        let tileCont = document.createElement('div');\n        \n        let tile = document.createElement('img');\n        tileCont.setAttribute('id', `row${i}-col${j}`);\n        let src = this.getImgSrc(i, j);\n        let type = 'barrier';\n        if (!src) {\n          src = '../images/dot.gif';\n          type = 'coin';\n          row[j] = 1;\n        } else {\n          row[j] = 0;\n        }\n        tile.setAttribute('src', src);\n        tile.setAttribute('class', `tile-img ${type}`)\n        tileCont.setAttribute('class', `tile ${type}`)\n        tileCont.appendChild(tile);\n        board.appendChild(tileCont);\n      }\n      this.grid[i] = row\n    }\n    this.fillGrid();\n  }\n\n  createVectorRef() {\n    let t2 = new Array();\n    t2[1] = [1];\n    t2[2] = [2];\n    t2[4] = [4];\n    t2[8] = [8];\n    t2[3] = [1, 2];\n    t2[9] = [1, 8];\n    t2[10] = [2, 8];\n    t2[12] = [4, 8];\n    t2[5] = [1, 4];\n    t2[6] = [2, 4];\n    t2[7] = [1, 2, 4];\n    t2[11] = [1, 2, 8];\n    t2[13] = [1, 4, 8];\n    t2[14] = [2, 4, 8];\n    t2[15] = [1, 2, 4, 8];\n    return t2;\n  }\n\n  fillGrid() {\n    let grid = this.grid.slice();\n    for (let row = 1; row < grid.length-1; row++) {\n\n      for (let col = 1; col < grid[row].length-1; col++) {\n        let tile = this.grid[row][col];\n        if (tile) {\n          let left = this.grid[row][col-1] ? 1 : 0;\n          let right = this.grid[row][col+1] ? 2 : 0;\n          let top = this.grid[row-1][col] ? 4 : 0;\n          let bottom = this.grid[row+1][col] ? 8: 0;\n  \n          let sum = left + right + top + bottom;\n          grid[row][col] = sum\n        }\n        \n      }\n    }\n    this.grid = grid;\n  }\n\n  getImgSrc(row, col) {\n    if (col === 0 || col === 19 || row=== 0 || row=== 13) {\n      return this.getBorderSrc(row, col);\n    }\n    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||\n        (row === 7 && [3,9,10,16].includes(col))    ||\n        (row === 4 && [9, 10].includes(col)) ||\n        (row === 11 && [9,10].includes(col))) {\n      return '../images/horiz-tile.gif';\n    } \n    if ((row === 2 && [2, 8, 15].includes(col)) ||\n      (row === 7 && [15].includes(col))) {\n      return '../images/l-round.gif';\n    } \n\n    if ((row === 2 && [4, 11, 17].includes(col)) ||\n        (row === 7 && [4, 9, 10, 16].includes(col))) {\n      return '../images/r-round.gif';\n    } \n\n    if (([2,17].includes(col) && [5,6].includes(row)) ||\n        ([4,15].includes(col) && row === 10) ||\n        (col === 8 && [5,6].includes(row)) ||\n        ([6,13].includes(col) && [4,5,6,10].includes(row))) {\n      return '../images/vertical-tile.gif';\n    }\n\n    if (row === 7 && [2,8].includes(col)) {\n      return '../images/bl-corner.gif';\n    }\n\n    if (row === 7 && [11,17].includes(col)) {\n      return '../images/br-corner.gif';\n    }\n\n    if ((row === 9 && [4,13].includes(col)) ||\n        (row === 4 && col === 11)){\n      return '../images/tr-corner.gif';\n    }\n\n    if ((row === 9 && [6,15].includes(col)) ||\n        (row === 4 && col === 8)){\n      return '../images/tl-corner.gif';\n    }\n\n    if ((row === 4 && [2,4,15,17].includes(col)) ||\n        (row === 3 && [6,13].includes(col))) {\n      return '../images/t-round.gif';\n    }\n\n    if (([1,7].includes(row) && [6,13].includes(col)) ||\n        (row === 5 && [4,15].includes(col)) ||\n        (row === 11 && [4,6,13,15].includes(col))){\n      return '../images/b-round.gif';\n    }\n\n    if ((row === 9 && [3,9,12,18].includes(col))||\n        (row === 11 && col === 8)) {\n      return '../images/l-round.gif';\n    }\n\n    if ((row === 9 && [1,7,10,16].includes(col)) ||\n        (row === 11 && col === 11)) {\n      return '../images/r-round.gif';\n    }\n\n    if (row === 11 && [2,17].includes(col)) {\n      return '../images/plus.gif';\n    }\n\n    // return '../images/dot.gif';\n    return null;\n  }\n\n  getBorderSrc(row, col) {\n    if ((col === 0 || col === 19)) {\n      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {\n        return '../images/vertical-tile.gif';\n      }\n      if (col === 0 && row === 0) return '../images/tl-corner.gif';\n      if (col === 0 && row === 13) return '../images/bl-corner.gif';\n      if (col === 19 && row === 0) return '../images/tr-corner.gif';\n      if (col === 19 && row === 13) return '../images/br-corner.gif';\n      if (col === 0 && row === 5) return '../images/br-corner.gif';\n      if (col === 0 && row === 7) return '../images/tr-corner.gif';\n      if (col === 19 && row === 5) return '../images/bl-corner.gif';\n      if (col === 19 && row === 7) return '../images/tl-corner.gif';\n      if (col === 0 && row === 9) return '../images/tr.gif';\n      if (col === 19 && row === 9) return '../images/tl.gif';\n      return '../images/blank.gif';\n    }\n    if ((row === 0 || row === 13) ) {\n      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {\n        return '../images/horiz-tile.gif';\n      }\n      if (row === 0 && col === 8) return '../images/bl-corner.gif';\n      if (row === 0 && col === 11) return '../images/br-corner.gif';\n      if (row === 13 && col === 8) return '../images/tl-corner.gif';\n      if (row === 13 && col === 11) return '../images/tr-corner.gif';\n      if (row === 0 && col === 6) return '../images/tl.gif';\n      if (row === 0 && col === 13) return '../images/tr.gif';\n      if (row === 13 && col === 6) return '../images/tr-corner.gif';\n      if (row === 13 && col === 13) return '../images/tl-corner.gif';\n      return '../images/blank.gif';\n    }\n  }\n\n  getPosition(col, row) {\n    let xPos = (window.innerWidth / 100) * (col * 3);\n    let yPos = (window.innerWidth / 100) * (row * 3);\n    // console.log(xPos, yPos);\n    return [xPos, yPos];\n  }\n\n  setVectorGrid() {\n    return new Array(\n      \"00000000000000000000\",   // 1st row\n      \"01000205000060100020\",   // 2nd row\n      \"00000506000050600000\",   // ...\n      \"05070605000060507060\",\n      \"00000000000000000000\",\n      \"00000000000000000000\",\n      \"06030600000000504050\",\n      \"00000000000000000000\",\n      \"03700908700780900740\",\n      \"00000000000000000000\",\n      \"01820001800820001820\",\n      \"00000000000000000000\",\n      \"03080809000090808040\",\n      \"00000000000000000000\"    // last row\n    );\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/dinosaur.js":
/*!*************************!*\
  !*** ./src/dinosaur.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Score = __webpack_require__(/*! ./score */ \"./src/score.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Dinosaur extends MovingObject {\n  constructor(row, col, xDir, yDir, board) {\n    super(row, col, xDir, yDir, board);\n\n    // this.board = board;\n\n    this.dir = \"right\";\n    this.moving = true;\n    this.score = new Score();\n    \n\n    this.steps = 4;\n    this.step = this.dx / this.steps;\n    this.osx = 0;\n    this.osy = 0;\n    \n\n    this.handleKeyPress = this.handleKeyPress.bind(this);\n    this.collectCoin = this.collectCoin.bind(this);\n    this.move = this.move.bind(this);\n    \n    this.timer = setTimeout(this.move, 50);\n    \n    \n    this.createDino();\n    this.registerListeners();\n    this.startAnimation();\n\n    // this.startMoving = this.startMoving.bind(this);\n    // this.startMoving();\n\n    console.log(this.dx, this.dy);\n  }\n\n  createDino() {\n    let dino = document.createElement(\"div\");\n    dino.setAttribute(\"class\", \"grid-layer dino animate\");\n    dino.setAttribute(\"id\", \"gl1\");\n    let dinoImg = document.createElement(\"img\");\n    dinoImg.setAttribute(\"src\", \"../dino/walk1.png\");\n    dinoImg.setAttribute(\"class\", \"dino-img\");\n    dinoImg.setAttribute(\"id\", \"dino-img\");\n    dino.appendChild(dinoImg);\n    let main = document.getElementById(\"main\");\n    main.appendChild(dino);\n    this.el = dino;\n    this.dinoImg = dinoImg;\n    this.placeObject();\n  }\n\n  startAnimation() {\n    setInterval(() => {\n      let dino = document.getElementById(\"dino-img\");\n      let segments = dino.src.split(\"/\");\n      let imgSrc = segments[segments.length - 1];\n      let srcNum = Number(imgSrc.split(\".\")[0].slice(4));\n\n      if (srcNum === 10) {\n        srcNum = 1;\n      } else {\n        srcNum += 1;\n      }\n      dino.setAttribute(\"src\", `../dino/walk${srcNum}.png`);\n    }, 50);\n  }\n\n  handleKeyPress(event) {\n    const key = event.key; // \"ArrowRight\", \"ArrowLeft\", \"ArrowUp\", or \"ArrowDown\"\n    switch (key) {\n      case \"ArrowLeft\":\n        this.moving = false;\n        this.updateDir(\"left\", -1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowRight\":\n        this.moving = false;\n        this.updateDir(\"right\", 1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowDown\":\n        this.moving = false;\n        this.updateDir(\"down\", 0, 1);\n        this.moving = true;\n        break;\n      case \"ArrowUp\":\n        this.moving = false;\n        this.updateDir(\"up\", 0, -1);\n        this.moving = true;\n        break;\n    }\n  }\n\n  move() {\n    if (this.timer) clearTimeout(this.timer);\n\n    this.osx = Math.abs((this.osx + 1) % 4 * this.xDir);\n    this.osy = Math.abs((this.osy + 1) % 4 * this.yDir);\n\n    if (!this.isCollision()) {\n\n      this.xPos = this.xPos + this.xDir * this.step;\n      this.yPos = this.yPos + this.yDir * this.step;\n      // debugger\n      if (this.osx == 0 && this.osy === 0) {\n        this.updateRowAndCol();\n      } \n      // else {\n      //   this.placeObject();\n      // }\n\n      this.placeObject();\n      this.collectCoin();\n    }\n\n    this.timer = setTimeout(this.move, 50);\n  }\n\n  is180(xDir, yDir) {\n    if ((xDir === 1 && this.xDir === -1) ||\n        (xDir === -1 && this.xDir === 1)) {\n      return true;\n    }\n    if ((yDir === 1 && this.yDir === -1) ||\n        (yDir === -1 && this.yDir === 1)) {\n      return true;\n    }\n\n    return false;\n  }\n\n  setRowAndColPos() {\n\n    if (!this.isCollision() && (this.osx > 2 || this.osy > 2)) {\n      this.updateRowAndCol();\n    } \n    this.osx = 0;\n    this.osy = 0;\n\n\n    this.xPos = this.getPxPosition(this.col);\n    this.yPos = this.getPxPosition(this.row);\n    this.placeObject();\n  }\n\n  // updateRowAndCol() {\n  //   this.row += this.yDir;\n  //   this.col += this.xDir;\n  //   // this.placeObject();\n  //   // this.collectCoin();\n  // }\n\n  updateDir(dir, xDir, yDir) {\n    this.el.classList.remove(this.dir);\n    this.el.classList.add(dir);\n    this.dir = dir;\n    \n    if (this.xDir !== xDir || this.yDir !== yDir) {\n      this.setRowAndColPos(xDir, yDir);\n    }\n    this.xDir = xDir;\n    this.yDir = yDir;\n  }\n\n\n  collectCoin() {\n    let tileId = `row${this.row}-col${this.col}`;\n    let tile = document.getElementById(tileId);\n\n    if (tile.classList.contains(\"coin\")) {\n      this.score.updateScore();\n      let img = document.querySelector(`#${tile.id} > img`);\n      img.setAttribute(\"src\", \"../images/blank.gif\");\n      tile.classList.remove(\"coin\");\n    }\n  }\n\n  registerListeners() {\n    document.addEventListener(\"keydown\", this.handleKeyPress);\n  }\n\n  // startMoving() {\n  //   this.posInterval = setInterval(() => {\n  //     if (this.moving && !this.isCollision()) {\n  //       this.updateRowAndCol(this.xDir, this.yDir);\n  //     }\n  //   }, 500);\n  // }\n}\n\nmodule.exports = Dinosaur;\n\n//# sourceURL=webpack:///./src/dinosaur.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Dinosaur = __webpack_require__(/*! ./dinosaur */ \"./src/dinosaur.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\n\nclass Game {\n  constructor() {\n    this.board = new Board(20, 14);\n    this.dino = new Dinosaur(8, 9, 1, 0, this.board);\n    this.asteroid = new Asteroid(5, 9, 0, 1, this.board);\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Dinosaur = __webpack_require__(/*! ./dinosaur */ \"./src/dinosaur.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  new Game();\n  // let b = new Board(20, 14);\n\n  // b.getPosition(1, 2);\n\n  // let d = new Dinosaur(8, 9, 1, 0, b);\n\n  // let a = new Asteroid(5,9,0,1,b);\n  console.log('webpack is working')\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class MovingObject {\n  constructor(row, col, xDir, yDir, board) {\n    this.row = row;\n    this.col = col;\n    this.xDir = xDir;\n    this.yDir = yDir;\n    this.board = board;\n\n    this.yPos = this.getPxPosition(this.row);\n    this.xPos = this.getPxPosition(this.col);\n\n    this.dx = (window.innerWidth * 3) / 100;\n    this.dy = (window.innerWidth * 3) / 100;\n  }\n\n  getPxPosition(pos) {\n    let px = (window.innerWidth / 100) * (pos * 3);\n    return px;\n  }\n\n  placeObject() {\n    this.el.style.left = `${this.xPos}px`;\n    this.el.style.top = `${this.yPos}px`;\n  }\n\n  updateRowAndCol() {\n    this.row += this.yDir;\n    this.col += this.xDir;\n  }\n  \n\n  isCollision() {\n    let newRow = this.row + this.yDir;\n    let newCol = this.col + this.xDir;\n    \n    // debugger\n    let tileId = `row${newRow}-col${newCol}`;\n    let tile = document.getElementById(tileId);\n\n    return tile.classList.contains(\"barrier\");\n  }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Score {\n  constructor() {\n    this.score = 0;\n\n    this.setScore();\n  }\n\n  setScore() {\n    let score = document.getElementById(\"score\");\n    score.innerHTML = this.score;\n  }\n\n  updateScore() {\n    this.score += 1;\n    this.setScore();\n  }\n}\n\nmodule.exports = Score;\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ })

/******/ });