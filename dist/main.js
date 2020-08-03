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

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Asteroid extends MovingObject{\n  constructor(row, col, xDir, yDir, board, game, dino)  {\n    super(row, col, xDir, yDir, board, game);\n\n    this.dino = dino;\n    // this.game = game;\n\t\tthis.moving = true;\n\t\tthis.vector = this.getVector();\n\n    this.renderVectors();\n    // this.timer = setTimeout(this.move, 100);\n  }\n\n  move() {\n\t\tif (this.timer) clearTimeout(this.timer);\n\t\tif (!this.moving) return;\n\n\t\tthis.osx = Math.abs((this.osx + 1) % 4 * this.xDir);\n\t\tthis.osy = Math.abs((this.osy + 1) % 4 * this.yDir);\n\n    if (this.isDinoCollision()) {\n\t\t\tthis.handleDinoCollision();\n\t\t\t// this.game.handleLoss();\n      return;\n\t\t\t\n\t\t} else if (this.isCollision() ) {\n\t\t\tthis.checkOptions();\n\n    } else {\n\t\t\tthis.updatePos();\n\n\t\t\tif (this.osx == 0 && this.osy === 0) {\n\t\t\t\tthis.checkOptions();\n\t\t\t}\n\n\t\t\tthis.placeObject();\n    }\n    this.timer = setTimeout(this.move, 100);\n\t}\n\n\tcheckOptions() {\n\t\tlet value = this.board.grid[this.row][this.col];\n\t\tlet vectors = this.board.vectorRef[value]\n\t\tlet dirsToDino = this.shuffle(this.dirsToDino());\n\t\tdirsToDino = dirsToDino.filter(dir => !this.isOpposite(dir))\n\t\tfor (let i = 0; i < dirsToDino.length; i++) {\n\t\t\tlet newDir = dirsToDino[i];\n\n\t\t\tif (vectors.includes(newDir)) {\n\t\t\t\tthis.updateDir(newDir);\n\t\t\t\treturn;\n\t\t\t}\n\t\t}\n\n\t\tlet randomVector = vectors[Math.floor(Math.random() * vectors.length)];\n\t\tthis.updateDir(randomVector);\n\t}\n\n\tisOpposite(dir) {\n\t\tif (this.vector === 2 && dir === 1) return true;\n\t\tif (this.vector === 4 && dir === 8) return true\n\t\tif (this.vector === 1 && dir === 2) return true;\n\t\tif (this.vector === 8 && dir === 4) return true\n\t\treturn false;\n\t}\n\n\tdirsToDino() {\n\t\tlet dx = this.dino.col - this.col;\n\t\tlet dy = this.dino.row - this.row;\n\t\tlet bestDirs = [];\n\t\tif (dy < 0) {\n\t\t\tbestDirs.push(4)\n\t\t} else if (dy > 0) {\n\t\t\tbestDirs.push(8);\n\t\t} \n\n\t\tif (dx < 0) {\n\t\t\tbestDirs.push(1);\n\t\t} else if (dx > 0) {\n\t\t\tbestDirs.push(2);\n\t\t}\n\t\treturn bestDirs;\n\t}\n\n\thandleDinoCollision() {\n\t\tthis.game.clearAllTimers();\n\t\t// let reset = this.game.newGame;\n\t\tsetTimeout(this.game.handleLoss, 1500);\n\t}\n\n\tshuffle(array) {\n\t\tarray.sort(() => Math.random() - 0.5);\n\t\treturn array;\n\t}\n\n\n  updateDir(vector) {\n\t\tif (this.vector === vector) return;\n\n    if (vector === 1) {\n      this.xDir = -1;\n      this.yDir = 0;\n    } else if (vector === 2) {\n      this.xDir = 1;\n      this.yDir = 0;\n    } else if (vector === 4) {\n      this.xDir = 0;\n      this.yDir = -1;\n    } else if (vector === 8) {\n      this.xDir = 0;\n      this.yDir = 1;\n\t\t}\n\t\tthis.vector = vector;\n  }\n\n\n  animate() {\n    let diff = -2.5;\n    setInterval(() => {\n      let x = this.astImg.style.backgroundPositionX;\n      let y = this.astImg.style.backgroundPositionY;\n      let xNum = Number(x.slice(0, x.length - 2))\n      \n      if (xNum === -20) {\n        diff = 2.5\n      } else if (xNum === 0) {\n        diff = -2.5\n      }\n\n      xNum = xNum + diff;\n      x = `${xNum}vw`\n     \n      this.astImg.style.backgroundPositionX = x;\n    }, 200)\n  }\n\n  renderVectors() {\n    this.tx = new Array();\n    this.ty = new Array();\n\n    let tx = this.tx; let ty = this.ty;\n\n    tx[0] = 0; ty[0] = 0;  // no movement\n    tx[1] = 1; ty[1] = 0;  // right\n    tx[2] = -1; ty[2] = 0;  // left\n    tx[4] = 0; ty[4] = -1;  // up\n    tx[8] = 0; ty[8] = 1;  // down\n\n    this.t2 = new Array();\n    let t2 = this.t2;\n\n    t2[1] = [1];\n    t2[2] = [2];\n    t2[4] = [4];\n    t2[8] = [8];\n    t2[3] = [1, 2];\n    t2[9] = [1, 8];\n    t2[10] = [2, 8];\n    t2[12] = [4, 8];\n    t2[5] = [1, 4];\n    t2[6] = [2, 4];\n    t2[7] = [1, 2, 4];\n    t2[11] = [1, 2, 8];\n    t2[13] = [1, 4, 8];\n    t2[14] = [2, 4, 8];\n    t2[15] = [1, 2, 4, 8]; // left, right, up, down\n\n\n    // console.log(this.board.grid)\n  }\n\n\tisDinoCollision() {\n\t\tlet radius = this.dx / 2;\n\t\tlet dx = Math.abs(this.dino.xPos - this.xPos);\n\t\tlet dy = Math.abs(this.dino.yPos - this.yPos);\n\n\t\treturn (dx + dy < radius);\n\t} \n\n\tgetVector() {\n\t\tif (this.xDir > 0) return 2;\n\t\tif (this.xDir < 0) return 1;\n\t\tif (this.yDir > 0) return 8;\n\t\tif (this.yDir < 0) return 4;\n\t}\n\n\tsetAttributes(i) {\n\t\tthis.el.setAttribute(\"class\", \"grid-layer asteroid animate gl2\");\n\t\tthis.el.setAttribute(\"id\", `asteroid-${i}`);\n\t\tthis.astImg.setAttribute(\"class\", \"ast-img\");\n\t\tthis.astImg.setAttribute(\"id\", `asteroid-img-${i}}`);\n\n\t\tthis.astImg.style.backgroundPositionX = '-0vw';\n\t\tthis.astImg.style.backgroundPositionY = '-2.5vw';\n\t}\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Board {\n  constructor(width, height) {\n    this.numRows = height;\n    this.numCols = width;\n\n    this.grid = new Array();\n    this.vectorRef = this.createVectorRef();\n\n    this.renderBoard();\n  }\n\n  resetBoard() {\n    let board = document.getElementById('board');\n    board.innerHTML = '';\n    this.renderBoard();\n  }\n\n  renderBoard() {\n    let board = document.getElementById('board');\n\n    for (let i = 0; i < this. numRows; i++) {\n      let row = new Array();\n      for (let j = 0; j < this.numCols; j++) {\n        let tileCont = document.createElement('div');\n        \n        let tile = document.createElement('img');\n        tileCont.setAttribute('id', `row${i}-col${j}`);\n        let src = this.getImgSrc(i, j);\n        let type = 'barrier';\n        if (!src) {\n          src = '../images/dot.gif';\n          type = 'coin';\n          row[j] = 1;\n        } else {\n          row[j] = 0;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (([5,6].includes(i) && [9,10, 11].includes(j))) {\n\t\t\t\t\tsrc = '../images/blank.gif'\n\t\t\t\t}\n        tile.setAttribute('src', src);\n        tile.setAttribute('class', `tile-img ${type}`)\n        tileCont.setAttribute('class', `tile ${type}`)\n        tileCont.appendChild(tile);\n        board.appendChild(tileCont);\n      }\n      this.grid[i] = row\n    }\n    this.fillGrid();\n  }\n\n  createVectorRef() {\n    let t2 = new Array();\n    t2[1] = [1];\n    t2[2] = [2];\n    t2[4] = [4];\n    t2[8] = [8];\n    t2[3] = [1, 2];\n    t2[9] = [1, 8];\n    t2[10] = [2, 8];\n    t2[12] = [4, 8];\n    t2[5] = [1, 4];\n    t2[6] = [2, 4];\n    t2[7] = [1, 2, 4];\n    t2[11] = [1, 2, 8];\n    t2[13] = [1, 4, 8];\n    t2[14] = [2, 4, 8];\n    t2[15] = [1, 2, 4, 8];\n    return t2;\n  }\n\n  fillGrid() {\n    let grid = this.grid.slice();\n    for (let row = 1; row < grid.length-1; row++) {\n\n      for (let col = 1; col < grid[row].length-1; col++) {\n        let tile = this.grid[row][col];\n        if (tile) {\n          let left = this.grid[row][col-1] ? 1 : 0;\n          let right = this.grid[row][col+1] ? 2 : 0;\n          let top = this.grid[row-1][col] ? 4 : 0;\n          let bottom = this.grid[row+1][col] ? 8: 0;\n  \n          let sum = left + right + top + bottom;\n          grid[row][col] = sum\n        }\n        \n      }\n    }\n    this.grid = grid;\n  }\n\n  getImgSrc(row, col) {\n    if (col === 0 || col === 19 || row=== 0 || row=== 13) {\n      return this.getBorderSrc(row, col);\n\t\t}\n\n    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||\n        (row === 7 && [3,9,10,16].includes(col))    ||\n        (row === 4 && [9, 10].includes(col)) ||\n        (row === 11 && [9,10].includes(col))) {\n      return '../images/horiz-tile.gif';\n    } \n    if ((row === 2 && [2, 8, 15].includes(col)) ||\n      (row === 7 && [15].includes(col))) {\n      return '../images/l-round.gif';\n    } \n\n    if ((row === 2 && [4, 11, 17].includes(col)) ||\n        (row === 7 && [4, 9, 10, 16].includes(col))) {\n      return '../images/r-round.gif';\n    } \n\n    if (([2,17].includes(col) && [5,6].includes(row)) ||\n        ([4,15].includes(col) && row === 10) ||\n        (col === 8 && [5,6].includes(row)) ||\n        ([6,13].includes(col) && [4,5,6,10].includes(row))) {\n      return '../images/vertical-tile.gif';\n    }\n\n    if (row === 7 && [2,8].includes(col)) {\n      return '../images/bl-corner.gif';\n    }\n\n    if (row === 7 && [11,17].includes(col)) {\n      return '../images/br-corner.gif';\n    }\n\n    if ((row === 9 && [4,13].includes(col)) ||\n        (row === 4 && col === 11)){\n      return '../images/tr-corner.gif';\n    }\n\n    if ((row === 9 && [6,15].includes(col)) ||\n        (row === 4 && col === 8)){\n      return '../images/tl-corner.gif';\n    }\n\n    if ((row === 4 && [2,4,15,17].includes(col)) ||\n        (row === 3 && [6,13].includes(col))) {\n      return '../images/t-round.gif';\n    }\n\n    if (([1,7].includes(row) && [6,13].includes(col)) ||\n        (row === 5 && [4,15].includes(col)) ||\n        (row === 11 && [4,6,13,15].includes(col))){\n      return '../images/b-round.gif';\n    }\n\n    if ((row === 9 && [3,9,12,18].includes(col))||\n        (row === 11 && col === 8)) {\n      return '../images/l-round.gif';\n    }\n\n    if ((row === 9 && [1,7,10,16].includes(col)) ||\n        (row === 11 && col === 11)) {\n      return '../images/r-round.gif';\n    }\n\n    if (row === 11 && [2,17].includes(col)) {\n      return '../images/plus.gif';\n    }\n\n    // return '../images/dot.gif';\n    return null;\n  }\n\n  getBorderSrc(row, col) {\n    if ((col === 0 || col === 19)) {\n      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {\n        return '../images/vertical-tile.gif';\n      }\n      if (col === 0 && row === 0) return '../images/tl-corner.gif';\n      if (col === 0 && row === 13) return '../images/bl-corner.gif';\n      if (col === 19 && row === 0) return '../images/tr-corner.gif';\n      if (col === 19 && row === 13) return '../images/br-corner.gif';\n      if (col === 0 && row === 5) return '../images/br-corner.gif';\n      if (col === 0 && row === 7) return '../images/tr-corner.gif';\n      if (col === 19 && row === 5) return '../images/bl-corner.gif';\n      if (col === 19 && row === 7) return '../images/tl-corner.gif';\n      if (col === 0 && row === 9) return '../images/tr.gif';\n      if (col === 19 && row === 9) return '../images/tl.gif';\n      return '../images/blank.gif';\n    }\n    if ((row === 0 || row === 13) ) {\n      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {\n        return '../images/horiz-tile.gif';\n      }\n      if (row === 0 && col === 8) return '../images/bl-corner.gif';\n      if (row === 0 && col === 11) return '../images/br-corner.gif';\n      if (row === 13 && col === 8) return '../images/tl-corner.gif';\n      if (row === 13 && col === 11) return '../images/tr-corner.gif';\n      if (row === 0 && col === 6) return '../images/tl.gif';\n      if (row === 0 && col === 13) return '../images/tr.gif';\n      if (row === 13 && col === 6) return '../images/tr-corner.gif';\n      if (row === 13 && col === 13) return '../images/tl-corner.gif';\n      return '../images/blank.gif';\n    }\n  }\n\n  getPosition(col, row) {\n    let xPos = (window.innerWidth / 100) * (col * 3);\n    let yPos = (window.innerWidth / 100) * (row * 3);\n    // console.log(xPos, yPos);\n    return [xPos, yPos];\n  }\n\n  setVectorGrid() {\n    return new Array(\n      \"00000000000000000000\",   // 1st row\n      \"01000205000060100020\",   // 2nd row\n      \"00000506000050600000\",   // ...\n      \"05070605000060507060\",\n      \"00000000000000000000\",\n      \"00000000000000000000\",\n      \"06030600000000504050\",\n      \"00000000000000000000\",\n      \"03700908700780900740\",\n      \"00000000000000000000\",\n      \"01820001800820001820\",\n      \"00000000000000000000\",\n      \"03080809000090808040\",\n      \"00000000000000000000\"    // last row\n    );\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/dinosaur.js":
/*!*************************!*\
  !*** ./src/dinosaur.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// const Score = require('./score');\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Dinosaur extends MovingObject {\n  constructor(row, col, xDir, yDir, board, game) {\n    super(row, col, xDir, yDir, board,game);\n\n    this.dir = \"right\";\n\t\tthis.moving = true;\n\t\t// this.game = game;\n    // this.score = new Score();\n    \n\n    this.steps = 4;\n    this.step = this.dx / this.steps;\n    this.osx = 0;\n    this.osy = 0;\n    \n\n    this.handleKeyPress = this.handleKeyPress.bind(this);\n    this.collectCoin = this.collectCoin.bind(this);\n\t\tthis.registerListeners();\n\t\t// this.timer = setTimeout(this.move, 100);\n  }\n\n  setAttributes() {\n    this.el.setAttribute(\"class\", \"grid-layer dino animate\");\n    this.el.setAttribute(\"id\", \"gl1\");\n    this.dinoImg.setAttribute(\"src\", \"../dino/walk1.png\");\n    this.dinoImg.setAttribute(\"class\", \"dino-img\");\n    this.dinoImg.setAttribute(\"id\", \"dino-img\");\n    this.placeObject();\n  }\n\n  startAnimation() {\n    this.interval = setInterval(() => {\n      let dino = document.getElementById(\"dino-img\");\n      let segments = dino.src.split(\"/\");\n      let imgSrc = segments[segments.length - 1];\n      let srcNum = Number(imgSrc.split(\".\")[0].slice(4));\n\n      if (srcNum === 10) {\n        srcNum = 1;\n      } else {\n        srcNum += 1;\n      }\n      dino.setAttribute(\"src\", `../dino/walk${srcNum}.png`);\n    }, 50);\n  }\n\n  handleKeyPress(event) {\n    if (!this.moving) return;\n    const key = event.key; // \"ArrowRight\", \"ArrowLeft\", \"ArrowUp\", or \"ArrowDown\"\n    switch (key) {\n      case \"ArrowLeft\":\n        this.moving = false;\n        this.updateDir(\"left\", -1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowRight\":\n        this.moving = false;\n        this.updateDir(\"right\", 1, 0);\n        this.moving = true;\n        break;\n      case \"ArrowDown\":\n        this.moving = false;\n        this.updateDir(\"down\", 0, 1);\n        this.moving = true;\n        break;\n      case \"ArrowUp\":\n        this.moving = false;\n        this.updateDir(\"up\", 0, -1);\n        this.moving = true;\n        break;\n    }\n  }\n\n  move() {\n    if (this.timer) clearTimeout(this.timer);\n\t\tif (!this.moving) return;\n\n    this.osx = Math.abs((this.osx + 1) % 4 * this.xDir);\n    this.osy = Math.abs((this.osy + 1) % 4 * this.yDir);\n\t\t// this.updateOffset();\n    if (!this.isCollision()) {\n\t\t\tthis.updatePos();\n      this.placeObject();\n      this.collectCoin();\n    }\n\n    this.timer = setTimeout(this.move, 50);\n  }\n\n  is180(xDir, yDir) {\n    if ((xDir === 1 && this.xDir === -1) ||\n        (xDir === -1 && this.xDir === 1)) {\n      return true;\n    }\n    if ((yDir === 1 && this.yDir === -1) ||\n        (yDir === -1 && this.yDir === 1)) {\n      return true;\n    }\n\n    return false;\n  }\n\n  setRowAndColPos() {\n\n    if (!this.isCollision() && (this.osx > 2 || this.osy > 2)) {\n      this.updateRowAndCol();\n    } \n    this.osx = 0;\n    this.osy = 0;\n\n\n    this.xPos = this.getPxPosition(this.col);\n    this.yPos = this.getPxPosition(this.row);\n    this.placeObject();\n  }\n\n\n  updateDir(dir, xDir, yDir) {\n    this.el.classList.remove(this.dir);\n    this.el.classList.add(dir);\n    this.dir = dir;\n    \n    if (this.xDir !== xDir || this.yDir !== yDir) {\n      this.setRowAndColPos(xDir, yDir);\n    }\n    this.xDir = xDir;\n    this.yDir = yDir;\n  }\n\n\n  collectCoin() {\n    let tileId = `row${this.row}-col${this.col}`;\n    let tile = document.getElementById(tileId);\n\n    if (tile.classList.contains(\"coin\")) {\n      this.game.updateScore();\n      let img = document.querySelector(`#${tile.id} > img`);\n      img.setAttribute(\"src\", \"../images/blank.gif\");\n      tile.classList.remove(\"coin\");\n    }\n  }\n\n  registerListeners() {\n    document.addEventListener(\"keydown\", this.handleKeyPress);\n  }\n\n\n}\n\nmodule.exports = Dinosaur;\n\n//# sourceURL=webpack:///./src/dinosaur.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Dinosaur = __webpack_require__(/*! ./dinosaur */ \"./src/dinosaur.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\nconst Score = __webpack_require__(/*! ./score */ \"./src/score.js\");\n\nclass Game {\n  constructor() {\n\t\tthis.board = new Board(20, 14);\n\t\tthis.currentScore = null;\n\t\tthis.lives = null;\n\n    this.newGame = this.newGame.bind(this);\n    this.start = this.start.bind(this);\n    this.handleLoss = this.handleLoss.bind(this);\n    this.registerListeners();\n\t\tthis.newGame();\n\t\t\n  }\n\n  registerListeners() {\n\t\tdocument.querySelectorAll('.new-game').forEach(button => {\n\t\t\tbutton.addEventListener('click', this.newGame);\n\t\t})\n    // document.getElementById('new-game').addEventListener('click', this.newGame);\n    document.getElementById('start').addEventListener('click', this.start);\n\t}\n\t\n\tupdateScore() {\n\t\tthis.currentScore.updateScore();\n\t}\n\n  newGame() {\n\t\t// debugger\n    if (this.dino) {\n\t\t\tdocument.getElementById('modal').classList.add('hide')\n\t\t\tthis.removeMovingObjects();\n\t\t\tthis.clearAllTimers();\n    }\n\t\tthis.board.resetBoard();\n\t\tthis.lives = 3;\n\t\tthis.currentScore = new Score();\n\t\tthis.updateLives()\n\t\tthis.createMovingObjects();\n\t}\n\n\thandleLoss() {\n\t\tthis.removeMovingObjects();\n\t\tthis.board.resetBoard();\n\t\t// debugger\n\t\tthis.lives--\n\t\tthis.updateLives(this.lives);\n\t\tif (this.lives > 0) {\n\t\t\tthis.currentScore.resetScore();\n\t\t} else {\n\t\t\t// debugger\n\t\t\tthis.handleGameOver();\n\t\t}\n\t\tthis.createMovingObjects();\n\t}\n\n\thandleGameOver() {\n\t\t// debugger\n\t\tdocument.getElementById('modal').classList.remove('hide')\n\t}\n\n\tupdateLives() {\n\t\tlet lives = document.getElementById('lives');\n\t\tlet img = '<img src=\"../dino/walk1.png\" class=\"dino-img live\">'\n\t\tlet html = '';\n\t\tlet i = 0;\n\t\twhile (i < this.lives) {\n\t\t\t// debugger\n\t\t\thtml += img;\n\t\t\ti++\n\t\t}\n\t\tlives.innerHTML = html;\n\t}\n\n\tremoveMovingObjects() {\n\t\tlet main = document.getElementById(\"main\");\n\t\tmain.removeChild(this.dino.el);\n\t\tdocument.querySelectorAll('.asteroid').forEach(node => {\n\t\t\tnode.parentElement.removeChild(node);\n\t\t})\n\t}\n\n\tcreateMovingObjects() {\n\t\tthis.dino = new Dinosaur(8, 9, 1, 0, this.board, this);\n\t\tthis.createDinoEl();\n\n\t\tthis.asteroids = []\n\t\tlet ops = [[5, 9, 0, 1], [6, 9, 1, 0], [6, 10, -1, 0], [5, 10, 0, -1]];\n\t\tfor (let i = 0; i < 4; i++) {\n\t\t\tlet asteroid = new Asteroid(...ops[i], this.board, this,this.dino);\n\t\t\tthis.asteroids.push(asteroid);\n\t\t\tthis.createAsteroidEl(i);\n\t\t}\n\t}\n\t\n\tclearAllTimers() {\n\t\tthis.asteroids.forEach(asteroid => {\n\t\t\tasteroid.moving = false;\n\t\t\tclearTimeout(asteroid.timer)\n\t\t\tclearInterval(asteroid.interval);\n\t\t});\n\t\tthis.dino.moving = false;\n\t\tclearTimeout(this.dino.timer)\n\t\tclearInterval(this.dino.interval);\n\t}\n\n\tcreateDinoEl() {\n\t\tthis.dino.el = document.createElement(\"div\");\n\t\tthis.dino.dinoImg = document.createElement(\"img\");\n\t\tthis.dino.el.appendChild(this.dino.dinoImg);\n\t\tlet main = document.getElementById(\"main\");\n\t\tmain.appendChild(this.dino.el);\n\t\tthis.dino.setAttributes();\n\t\tthis.dino.startAnimation();\n\t}\n\n\tcreateAsteroidEl(i) {\n\t\tlet asteroid = this.asteroids[i];\n\n\t\tlet asteroidEl = document.createElement(\"div\");\n\t\tlet astImg = document.createElement(\"div\");\n\t\tlet main = document.getElementById(\"main\");\n\t\tasteroidEl.appendChild(astImg);\n\t\tmain.appendChild(asteroidEl);\n\n\t\tasteroid.el = asteroidEl;\n\t\tasteroid.astImg = astImg;\n\t\tasteroid.i = i;\n\t\tasteroid.setAttributes(i);\n\t\tasteroid.animate();\n\t\tasteroid.placeObject();\n\n\t\t// // asteroid.timer = setTimeout(asteroid.move, i * 500);\n\t}\n\n\tstart() {\n\t\tthis.dino.timer = setTimeout(this.dino.move, 100)\n\t\tthis.asteroids.forEach((asteroid, i)=> {\n\t\t\tasteroid.timer = setTimeout(asteroid.move, i * 500);\n\t\t})\n\t}\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

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

eval("class MovingObject {\n  constructor(row, col, xDir, yDir, board, game) {\n    this.row = row;\n    this.col = col;\n    this.xDir = xDir;\n    this.yDir = yDir;\n\t\tthis.board = board;\n\t\tthis.game = game;\n\t\tthis.dx = (window.innerWidth * 2.5) / 100;\n\t\tthis.dy = (window.innerWidth * 2.5) / 100;\n\t\t\n\t\tthis.steps = 4;\n\t\tthis.step = this.dx / this.steps;\n\t\tthis.osx = 0;\n\t\tthis.osy = 0;\n\n    this.yPos = this.getPxPosition(this.row);\n    this.xPos = this.getPxPosition(this.col);\n\n\n\t\t\n\t\tthis.move = this.move.bind(this);\n\t\t// this.timer = setTimeout(this.move, 2.500);\n\t}\n\n\tupdatePos() {\n\t\tthis.xPos = this.xPos + this.xDir * this.step;\n\t\tthis.yPos = this.yPos + this.yDir * this.step;\n\n\t\tif (this.osx == 0 && this.osy === 0) {\n\t\t\tthis.updateRowAndCol();\n\t\t}\n\t}\n\n\n  getPxPosition(pos) {\n    let px = (window.innerWidth / 100) * (pos * 2.5);\n    return px;\n  }\n\n  placeObject() {\n    this.el.style.left = `${this.xPos}px`;\n    this.el.style.top = `${this.yPos}px`;\n  }\n\n  updateRowAndCol() {\n    this.row += this.yDir;\n    this.col += this.xDir;\n  }\n\n  isCollision() {\n    let newRow = this.row + this.yDir;\n    let newCol = this.col + this.xDir;\n    \n    let tileId = `row${newRow}-col${newCol}`;\n    let tile = document.getElementById(tileId);\n\n    return tile.classList.contains(\"barrier\");\n\t}\n\t\n\n\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Score {\n  constructor() {\n    this.score = 0;\n\n    this.setScore();\n  }\n\n  setScore() {\n    let score = document.getElementById(\"score\");\n    score.innerHTML = this.score;\n  }\n\n  updateScore() {\n    this.score += 1;\n    this.setScore();\n\t}\n\t\n\tresetScore() {\n\t\tthis.score = 0;\n\t\tthis.setScore();\n\t}\n}\n\nmodule.exports = Score;\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ })

/******/ });