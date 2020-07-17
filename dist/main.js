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

eval("\nclass Board {\n  constructor(width, height) {\n    this.numRows = height;\n    this.numCols = width;\n\n    this.renderBoard();\n  }\n\n  renderBoard() {\n    let board = document.getElementById('board');\n\n    for (let i = 0; i < this. numRows; i++) {\n      for (let j = 0; j < this.numCols; j++) {\n        let tile = document.createElement('img');\n        tile.setAttribute('id', `row${i}-col${j}`);\n        let src = this.getImgSrc(i, j);\n        let type = 'barrier';\n        if (!src) {\n          src = '../images/dot.gif';\n          type = 'coin';\n        }\n        tile.setAttribute('src', src);\n        tile.setAttribute('class', `tile ${type}`)\n        board.appendChild(tile);\n      }\n    }\n  }\n\n  getImgSrc(row, col) {\n    if (col === 0 || col === 19 || row=== 0 || row=== 13) {\n      return this.getBorderSrc(row, col);\n    }\n    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||\n        (row === 7 && [3,9,10,16].includes(col))    ||\n        (row === 4 && [9, 10].includes(col)) ||\n        (row === 11 && [9,10].includes(col))) {\n      return '../images/horiz-tile.gif';\n    } \n    if ((row === 2 && [2, 8, 15].includes(col)) ||\n      (row === 7 && [15].includes(col))) {\n      return '../images/l-round.gif';\n    } \n\n    if ((row === 2 && [4, 11, 17].includes(col)) ||\n        (row === 7 && [4, 9, 10, 16].includes(col))) {\n      return '../images/r-round.gif';\n    } \n\n    if (([2,17].includes(col) && [5,6].includes(row)) ||\n        ([4,15].includes(col) && row === 10) ||\n        (col === 8 && [5,6].includes(row)) ||\n        ([6,13].includes(col) && [4,5,6,10].includes(row))) {\n      return '../images/vertical-tile.gif';\n    }\n\n    if (row === 7 && [2,8].includes(col)) {\n      return '../images/bl-corner.gif';\n    }\n\n    if (row === 7 && [11,17].includes(col)) {\n      return '../images/br-corner.gif';\n    }\n\n    if ((row === 9 && [4,13].includes(col)) ||\n        (row === 4 && col === 11)){\n      return '../images/tr-corner.gif';\n    }\n\n    if ((row === 9 && [6,15].includes(col)) ||\n        (row === 4 && col === 8)){\n      return '../images/tl-corner.gif';\n    }\n\n    if ((row === 4 && [2,4,15,17].includes(col)) ||\n        (row === 3 && [6,13].includes(col))) {\n      return '../images/t-round.gif';\n    }\n\n    if (([1,7].includes(row) && [6,13].includes(col)) ||\n        (row === 5 && [4,15].includes(col)) ||\n        (row === 11 && [4,6,13,15].includes(col))){\n      return '../images/b-round.gif';\n    }\n\n    if ((row === 9 && [3,9,12,18].includes(col))||\n        (row === 11 && col === 8)) {\n      return '../images/l-round.gif';\n    }\n\n    if ((row === 9 && [1,7,10,16].includes(col)) ||\n        (row === 11 && col === 11)) {\n      return '../images/r-round.gif';\n    }\n\n    if (row === 11 && [2,17].includes(col)) {\n      return '../images/plus.gif';\n    }\n\n    // return '../images/dot.gif';\n    return null;\n  }\n\n  getBorderSrc(row, col) {\n    if ((col === 0 || col === 19)) {\n      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {\n        return '../images/vertical-tile.gif';\n      }\n      if (col === 0 && row === 0) return '../images/tl-corner.gif';\n      if (col === 0 && row === 13) return '../images/bl-corner.gif';\n      if (col === 19 && row === 0) return '../images/tr-corner.gif';\n      if (col === 19 && row === 13) return '../images/br-corner.gif';\n      if (col === 0 && row === 5) return '../images/br-corner.gif';\n      if (col === 0 && row === 7) return '../images/tr-corner.gif';\n      if (col === 19 && row === 5) return '../images/bl-corner.gif';\n      if (col === 19 && row === 7) return '../images/tl-corner.gif';\n      if (col === 0 && row === 9) return '../images/tr.gif';\n      if (col === 19 && row === 9) return '../images/tl.gif';\n      return '../images/blank.gif';\n    }\n    if ((row === 0 || row === 13) ) {\n      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {\n        return '../images/horiz-tile.gif';\n      }\n      if (row === 0 && col === 8) return '../images/bl-corner.gif';\n      if (row === 0 && col === 11) return '../images/br-corner.gif';\n      if (row === 13 && col === 8) return '../images/tl-corner.gif';\n      if (row === 13 && col === 11) return '../images/tr-corner.gif';\n      if (row === 0 && col === 6) return '../images/tl.gif';\n      if (row === 0 && col === 13) return '../images/tr.gif';\n      if (row === 13 && col === 6) return '../images/tr-corner.gif';\n      if (row === 13 && col === 13) return '../images/tl-corner.gif';\n      return '../images/blank.gif';\n    }\n  }\n\n  getPosition(col, row) {\n    let xPos = (window.innerWidth / 100) * (col * 3);\n    let yPos = (window.innerWidth / 100) * (row * 3);\n    console.log(xPos, yPos);\n    return [xPos, yPos];\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  let b = new Board(20, 14);\n\n  b.getPosition(1, 2);\n  console.log('webpack is working')\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });