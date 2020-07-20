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

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Board {\n  constructor(width, height) {\n    this.numRows = height;\n    this.numCols = width;\n\n    this.renderBoard();\n  }\n\n  renderBoard() {\n    let board = document.getElementById('board');\n\n    for (let i = 0; i < this. numRows; i++) {\n      for (let j = 0; j < this.numCols; j++) {\n        let tileCont = document.createElement('div');\n        \n        let tile = document.createElement('img');\n        tileCont.setAttribute('id', `row${i}-col${j}`);\n        let src = this.getImgSrc(i, j);\n        let type = 'barrier';\n        if (!src) {\n          src = '../images/dot.gif';\n          type = 'coin';\n        }\n        tile.setAttribute('src', src);\n        tile.setAttribute('class', `tile-img ${type}`)\n        tileCont.setAttribute('class', `tile ${type}`)\n        tileCont.appendChild(tile);\n        board.appendChild(tileCont);\n      }\n    }\n  }\n\n  getImgSrc(row, col) {\n    if (col === 0 || col === 19 || row=== 0 || row=== 13) {\n      return this.getBorderSrc(row, col);\n    }\n    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||\n        (row === 7 && [3,9,10,16].includes(col))    ||\n        (row === 4 && [9, 10].includes(col)) ||\n        (row === 11 && [9,10].includes(col))) {\n      return '../images/horiz-tile.gif';\n    } \n    if ((row === 2 && [2, 8, 15].includes(col)) ||\n      (row === 7 && [15].includes(col))) {\n      return '../images/l-round.gif';\n    } \n\n    if ((row === 2 && [4, 11, 17].includes(col)) ||\n        (row === 7 && [4, 9, 10, 16].includes(col))) {\n      return '../images/r-round.gif';\n    } \n\n    if (([2,17].includes(col) && [5,6].includes(row)) ||\n        ([4,15].includes(col) && row === 10) ||\n        (col === 8 && [5,6].includes(row)) ||\n        ([6,13].includes(col) && [4,5,6,10].includes(row))) {\n      return '../images/vertical-tile.gif';\n    }\n\n    if (row === 7 && [2,8].includes(col)) {\n      return '../images/bl-corner.gif';\n    }\n\n    if (row === 7 && [11,17].includes(col)) {\n      return '../images/br-corner.gif';\n    }\n\n    if ((row === 9 && [4,13].includes(col)) ||\n        (row === 4 && col === 11)){\n      return '../images/tr-corner.gif';\n    }\n\n    if ((row === 9 && [6,15].includes(col)) ||\n        (row === 4 && col === 8)){\n      return '../images/tl-corner.gif';\n    }\n\n    if ((row === 4 && [2,4,15,17].includes(col)) ||\n        (row === 3 && [6,13].includes(col))) {\n      return '../images/t-round.gif';\n    }\n\n    if (([1,7].includes(row) && [6,13].includes(col)) ||\n        (row === 5 && [4,15].includes(col)) ||\n        (row === 11 && [4,6,13,15].includes(col))){\n      return '../images/b-round.gif';\n    }\n\n    if ((row === 9 && [3,9,12,18].includes(col))||\n        (row === 11 && col === 8)) {\n      return '../images/l-round.gif';\n    }\n\n    if ((row === 9 && [1,7,10,16].includes(col)) ||\n        (row === 11 && col === 11)) {\n      return '../images/r-round.gif';\n    }\n\n    if (row === 11 && [2,17].includes(col)) {\n      return '../images/plus.gif';\n    }\n\n    // return '../images/dot.gif';\n    return null;\n  }\n\n  getBorderSrc(row, col) {\n    if ((col === 0 || col === 19)) {\n      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {\n        return '../images/vertical-tile.gif';\n      }\n      if (col === 0 && row === 0) return '../images/tl-corner.gif';\n      if (col === 0 && row === 13) return '../images/bl-corner.gif';\n      if (col === 19 && row === 0) return '../images/tr-corner.gif';\n      if (col === 19 && row === 13) return '../images/br-corner.gif';\n      if (col === 0 && row === 5) return '../images/br-corner.gif';\n      if (col === 0 && row === 7) return '../images/tr-corner.gif';\n      if (col === 19 && row === 5) return '../images/bl-corner.gif';\n      if (col === 19 && row === 7) return '../images/tl-corner.gif';\n      if (col === 0 && row === 9) return '../images/tr.gif';\n      if (col === 19 && row === 9) return '../images/tl.gif';\n      return '../images/blank.gif';\n    }\n    if ((row === 0 || row === 13) ) {\n      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {\n        return '../images/horiz-tile.gif';\n      }\n      if (row === 0 && col === 8) return '../images/bl-corner.gif';\n      if (row === 0 && col === 11) return '../images/br-corner.gif';\n      if (row === 13 && col === 8) return '../images/tl-corner.gif';\n      if (row === 13 && col === 11) return '../images/tr-corner.gif';\n      if (row === 0 && col === 6) return '../images/tl.gif';\n      if (row === 0 && col === 13) return '../images/tr.gif';\n      if (row === 13 && col === 6) return '../images/tr-corner.gif';\n      if (row === 13 && col === 13) return '../images/tl-corner.gif';\n      return '../images/blank.gif';\n    }\n  }\n\n  getPosition(col, row) {\n    let xPos = (window.innerWidth / 100) * (col * 3);\n    let yPos = (window.innerWidth / 100) * (row * 3);\n    // console.log(xPos, yPos);\n    return [xPos, yPos];\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/dinosaur.js":
/*!*************************!*\
  !*** ./src/dinosaur.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Score = __webpack_require__(/*! ./score */ \"./src/score.js\");\n\nclass Dinosaur {\n  constructor(board) {\n    this.row = 8;\n    this.col = 10;\n    this.yPos = this.getPxPosition(8);\n    this.xPos = this.getPxPosition(10);\n    this.xDir = 1;\n    this.yDir = 0;\n    this.dx = (window.innerWidth * 3) / 100;\n    this.dy = (window.innerWidth * 3) / 100;\n    this.board = board;\n    this.dir = \"right\";\n    this.moving = true;\n    this.score = new Score();\n    \n\n    this.steps = 4;\n    this.step = this.dx / this.steps;\n    this.osx = 0;\n    this.osy = 0;\n    this.span = [];\n    \n\n    this.handleKeyPress = this.handleKeyPress.bind(this);\n    this.startMoving = this.startMoving.bind(this);\n    this.collectCoin = this.collectCoin.bind(this);\n    this.move = this.move.bind(this);\n\n    this.timer = setTimeout(this.move, 100);\n\n    // this.setSpan();\n    this.createDino();\n    this.registerListeners();\n    this.startAnimation();\n    this.startMoving();\n\n    console.log(this.dx, this.dy);\n  }\n\n  // setSpan() {\n  //   for (let n = 0; n < this.step; n++) {\n  //     if (n == 0) this.span[0] = 0;\n  //     else this.span[n] = Math.round((n * this.dx) / this.step);\n  //   }\n  //   console.log(this.dx)\n  //   console.log(this.span);\n  // }\n\n  createDino() {\n    let dino = document.createElement(\"div\");\n    dino.setAttribute(\"class\", \"grid-layer dino animate\");\n    dino.setAttribute(\"id\", \"gl1\");\n    let dinoImg = document.createElement(\"img\");\n    dinoImg.setAttribute(\"src\", \"../dino/walk1.png\");\n    dinoImg.setAttribute(\"class\", \"dino-img\");\n    dinoImg.setAttribute(\"id\", \"dino-img\");\n    dino.appendChild(dinoImg);\n    let main = document.getElementById(\"main\");\n    main.appendChild(dino);\n    this.dinoEl = dino;\n    this.dinoImg = dinoImg;\n    this.moveDino();\n  }\n\n  startAnimation() {\n    setInterval(() => {\n      let dino = document.getElementById(\"dino-img\");\n      let segments = dino.src.split(\"/\");\n      let imgSrc = segments[segments.length - 1];\n      let srcNum = Number(imgSrc.split(\".\")[0].slice(4));\n\n      if (srcNum === 10) {\n        srcNum = 1;\n      } else {\n        srcNum += 1;\n      }\n      dino.setAttribute(\"src\", `../dino/walk${srcNum}.png`);\n    }, 100);\n  }\n\n  getPxPosition(pos) {\n    let px = (window.innerWidth / 100) * (pos * 3);\n    return px;\n  }\n\n  handleKeyPress(event) {\n    const key = event.key; // \"ArrowRight\", \"ArrowLeft\", \"ArrowUp\", or \"ArrowDown\"\n    switch (key) {\n      case \"ArrowLeft\":\n        this.moving = false;\n        this.updateDir(\"left\", -1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowRight\":\n        this.moving = false;\n        this.updateDir(\"right\", 1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowDown\":\n        this.moving = false;\n        this.updateDir(\"down\", 0, 1);\n        this.moving = true;\n        break;\n      case \"ArrowUp\":\n        this.moving = false;\n        this.updateDir(\"up\", 0, -1);\n        this.moving = true;\n        break;\n    }\n  }\n\n  startMoving() {\n    this.posInterval = setInterval(() => {\n      if (this.moving) {\n        this.updatePos(this.xDir, this.yDir);\n      }\n    }, 500);\n  }\n\n  move() {\n    if (this.timer) clearTimeout(this.timer);\n\n    this.osx = Math.abs((this.osx + 1) % 4 * this.xDir);\n    this.osy = Math.abs((this.osy + 1) % 4 * this.yDir);\n\n    if (this.osx == 0 && this.osy === 0) {\n      \n    }\n\n    this.timer = setTimeout(this.move, 100);\n  }\n\n  updatePos() {\n    if (!this.isCollision()) {\n      this.row += this.yDir;\n      this.col += this.xDir;\n      this.xPos = this.xPos + this.xDir * this.dx;\n      this.yPos = this.yPos + this.yDir * this.dy;\n      this.moveDino();\n      this.collectCoin();\n    }\n  }\n\n  updateDir(dir, xDir, yDir) {\n    this.dinoEl.classList.remove(this.dir);\n    this.dinoEl.classList.add(dir);\n    this.dir = dir;\n    this.xDir = xDir;\n    this.yDir = yDir;\n  }\n\n  moveDino() {\n    this.dinoEl.style.left = `${this.xPos}px`;\n    this.dinoEl.style.top = `${this.yPos}px`;\n  }\n\n  isCollision() {\n    let newRow = this.row + this.yDir;\n    let newCol = this.col + this.xDir;\n    let tileId = `row${newRow}-col${newCol}`;\n    let tile = document.getElementById(tileId);\n\n    return tile.classList.contains(\"barrier\");\n  }\n\n  collectCoin() {\n    let tileId = `row${this.row}-col${this.col}`;\n    let tile = document.getElementById(tileId);\n\n    if (tile.classList.contains(\"coin\")) {\n      this.score.updateScore();\n      let img = document.querySelector(`#${tile.id} > img`);\n      img.setAttribute(\"src\", \"../images/blank.gif\");\n      tile.classList.remove(\"coin\");\n    }\n  }\n\n  registerListeners() {\n    document.addEventListener(\"keydown\", this.handleKeyPress);\n  }\n}\n\nmodule.exports = Dinosaur;\n\n//# sourceURL=webpack:///./src/dinosaur.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Dinosaur = __webpack_require__(/*! ./dinosaur */ \"./src/dinosaur.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  let b = new Board(20, 14);\n\n  b.getPosition(1, 2);\n\n  let d = new Dinosaur(b);\n  console.log('webpack is working')\n})\n\n//# sourceURL=webpack:///./src/index.js?");

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