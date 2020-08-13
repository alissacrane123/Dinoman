
class Board {
  constructor(width, height) {
    this.numRows = height;
    this.numCols = width;

    this.grid = new Array();
    this.vectorRef = this.createVectorRef();

    this.renderBoard();
  }

  resetBoard() {
    let board = document.getElementById('board');
    board.innerHTML = '';
    this.renderBoard();
  }

  renderBoard() {
    let board = document.getElementById('board');

    for (let i = 0; i < this. numRows; i++) {
      let row = new Array();
      for (let j = 0; j < this.numCols; j++) {
        let tileCont = document.createElement('div');
        
        let tile = document.createElement('img');
        tileCont.setAttribute('id', `row${i}-col${j}`);
        let src = this.getImgSrc(i, j);
        let type = 'barrier';
        if (!src) {
          src = './images/dot.gif';
          type = 'coin';
          row[j] = 1;
        } else {
          row[j] = 0;
				}
				
				if (([5,6].includes(i) && [9,10, 11].includes(j))) {
					src = './images/blank.gif'
				}
        tile.setAttribute('src', src);
        tile.setAttribute('class', `tile-img ${type}`)
        tileCont.setAttribute('class', `tile ${type}`)
        tileCont.appendChild(tile);
        board.appendChild(tileCont);
      }
      this.grid[i] = row
    }
    this.fillGrid();
  }

  createVectorRef() {
    let t2 = new Array();
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
    t2[15] = [1, 2, 4, 8];
    return t2;
  }

  fillGrid() {
    let grid = this.grid.slice();
    for (let row = 1; row < grid.length-1; row++) {

      for (let col = 1; col < grid[row].length-1; col++) {
        let tile = this.grid[row][col];
        if (tile) {
          let left = this.grid[row][col-1] ? 1 : 0;
          let right = this.grid[row][col+1] ? 2 : 0;
          let top = this.grid[row-1][col] ? 4 : 0;
          let bottom = this.grid[row+1][col] ? 8: 0;
  
          let sum = left + right + top + bottom;
          grid[row][col] = sum
        }
        
      }
    }
    this.grid = grid;
  }

  getImgSrc(row, col) {
    if (col === 0 || col === 19 || row=== 0 || row=== 13) {
      return this.getBorderSrc(row, col);
		}

    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||
        (row === 7 && [3,9,10,16].includes(col))    ||
        (row === 4 && [9, 10].includes(col)) ||
        (row === 11 && [9,10].includes(col))) {
      return './images/horiz-tile.gif';
    } 
    if ((row === 2 && [2, 8, 15].includes(col)) ||
      (row === 7 && [15].includes(col))) {
      return './images/l-round.gif';
    } 

    if ((row === 2 && [4, 11, 17].includes(col)) ||
        (row === 7 && [4, 9, 10, 16].includes(col))) {
      return './images/r-round.gif';
    } 

    if (([2,17].includes(col) && [5,6].includes(row)) ||
        ([4,15].includes(col) && row === 10) ||
        (col === 8 && [5,6].includes(row)) ||
        ([6,13].includes(col) && [4,5,6,10].includes(row))) {
      return './images/vertical-tile.gif';
    }

    if (row === 7 && [2,8].includes(col)) {
      return './images/bl-corner.gif';
    }

    if (row === 7 && [11,17].includes(col)) {
      return './images/br-corner.gif';
    }

    if ((row === 9 && [4,13].includes(col)) ||
        (row === 4 && col === 11)){
      return './images/tr-corner.gif';
    }

    if ((row === 9 && [6,15].includes(col)) ||
        (row === 4 && col === 8)){
      return './images/tl-corner.gif';
    }

    if ((row === 4 && [2,4,15,17].includes(col)) ||
        (row === 3 && [6,13].includes(col))) {
      return './images/t-round.gif';
    }

    if (([1,7].includes(row) && [6,13].includes(col)) ||
        (row === 5 && [4,15].includes(col)) ||
        (row === 11 && [4,6,13,15].includes(col))){
      return './images/b-round.gif';
    }

    if ((row === 9 && [3,9,12,18].includes(col))||
        (row === 11 && col === 8)) {
      return './images/l-round.gif';
    }

    if ((row === 9 && [1,7,10,16].includes(col)) ||
        (row === 11 && col === 11)) {
      return './images/r-round.gif';
    }

    if (row === 11 && [2,17].includes(col)) {
      return './images/plus.gif';
    }

    // return './images/dot.gif';
    return null;
  }

  getBorderSrc(row, col) {
    if ((col === 0 || col === 19)) {
      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {
        return './images/vertical-tile.gif';
      }
      if (col === 0 && row === 0) return './images/tl-corner.gif';
      if (col === 0 && row === 13) return './images/bl-corner.gif';
      if (col === 19 && row === 0) return './images/tr-corner.gif';
      if (col === 19 && row === 13) return './images/br-corner.gif';
      if (col === 0 && row === 5) return './images/br-corner.gif';
      if (col === 0 && row === 7) return './images/tr-corner.gif';
      if (col === 19 && row === 5) return './images/bl-corner.gif';
      if (col === 19 && row === 7) return './images/tl-corner.gif';
      if (col === 0 && row === 9) return './images/tr.gif';
      if (col === 19 && row === 9) return './images/tl.gif';
      return './images/blank.gif';
    }
    if ((row === 0 || row === 13) ) {
      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {
        return './images/horiz-tile.gif';
      }
      if (row === 0 && col === 8) return './images/bl-corner.gif';
      if (row === 0 && col === 11) return './images/br-corner.gif';
      if (row === 13 && col === 8) return './images/tl-corner.gif';
      if (row === 13 && col === 11) return './images/tr-corner.gif';
      if (row === 0 && col === 6) return './images/tl.gif';
      if (row === 0 && col === 13) return './images/tr.gif';
      if (row === 13 && col === 6) return './images/tr-corner.gif';
      if (row === 13 && col === 13) return './images/tl-corner.gif';
      return './images/blank.gif';
    }
  }

  getPosition(col, row) {
    let xPos = (window.innerWidth / 100) * (col * 3);
    let yPos = (window.innerWidth / 100) * (row * 3);
    // console.log(xPos, yPos);
    return [xPos, yPos];
  }

  setVectorGrid() {
    return new Array(
      "00000000000000000000",   // 1st row
      "01000205000060100020",   // 2nd row
      "00000506000050600000",   // ...
      "05070605000060507060",
      "00000000000000000000",
      "00000000000000000000",
      "06030600000000504050",
      "00000000000000000000",
      "03700908700780900740",
      "00000000000000000000",
      "01820001800820001820",
      "00000000000000000000",
      "03080809000090808040",
      "00000000000000000000"    // last row
    );
  }
}

module.exports = Board;