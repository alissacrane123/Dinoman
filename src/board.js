
class Board {
  constructor(width, height) {
    this.numRows = height;
    this.numCols = width;

    this.renderBoard();
  }

  renderBoard() {
    let board = document.getElementById('board');

    for (let i = 0; i < this. numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        let tile = document.createElement('img');
        tile.setAttribute('id', `row${i}-col${j}`);
        let src = this.getImgSrc(i, j);
        let type = 'barrier';
        if (!src) {
          src = '../images/dot.gif';
          type = 'coin';
        }
        tile.setAttribute('src', src);
        tile.setAttribute('class', `tile ${type}`)
        board.appendChild(tile);
      }
    }
  }

  getImgSrc(row, col) {
    if (col === 0 || col === 19 || row=== 0 || row=== 13) {
      return this.getBorderSrc(row, col);
    }
    if ((row === 2 && [3, 9, 10, 16].includes(col)) ||
        (row === 7 && [3,9,10,16].includes(col))    ||
        (row === 4 && [9, 10].includes(col)) ||
        (row === 11 && [9,10].includes(col))) {
      return '../images/horiz-tile.gif';
    } 
    if ((row === 2 && [2, 8, 15].includes(col)) ||
      (row === 7 && [15].includes(col))) {
      return '../images/l-round.gif';
    } 

    if ((row === 2 && [4, 11, 17].includes(col)) ||
        (row === 7 && [4, 9, 10, 16].includes(col))) {
      return '../images/r-round.gif';
    } 

    if (([2,17].includes(col) && [5,6].includes(row)) ||
        ([4,15].includes(col) && row === 10) ||
        (col === 8 && [5,6].includes(row)) ||
        ([6,13].includes(col) && [4,5,6,10].includes(row))) {
      return '../images/vertical-tile.gif';
    }

    if (row === 7 && [2,8].includes(col)) {
      return '../images/bl-corner.gif';
    }

    if (row === 7 && [11,17].includes(col)) {
      return '../images/br-corner.gif';
    }

    if ((row === 9 && [4,13].includes(col)) ||
        (row === 4 && col === 11)){
      return '../images/tr-corner.gif';
    }

    if ((row === 9 && [6,15].includes(col)) ||
        (row === 4 && col === 8)){
      return '../images/tl-corner.gif';
    }

    if ((row === 4 && [2,4,15,17].includes(col)) ||
        (row === 3 && [6,13].includes(col))) {
      return '../images/t-round.gif';
    }

    if (([1,7].includes(row) && [6,13].includes(col)) ||
        (row === 5 && [4,15].includes(col)) ||
        (row === 11 && [4,6,13,15].includes(col))){
      return '../images/b-round.gif';
    }

    if ((row === 9 && [3,9,12,18].includes(col))||
        (row === 11 && col === 8)) {
      return '../images/l-round.gif';
    }

    if ((row === 9 && [1,7,10,16].includes(col)) ||
        (row === 11 && col === 11)) {
      return '../images/r-round.gif';
    }

    if (row === 11 && [2,17].includes(col)) {
      return '../images/plus.gif';
    }

    // return '../images/dot.gif';
    return null;
  }

  getBorderSrc(row, col) {
    if ((col === 0 || col === 19)) {
      if ([1, 2, 3, 4, 8, 10, 11, 12].includes(row)) {
        return '../images/vertical-tile.gif';
      }
      if (col === 0 && row === 0) return '../images/tl-corner.gif';
      if (col === 0 && row === 13) return '../images/bl-corner.gif';
      if (col === 19 && row === 0) return '../images/tr-corner.gif';
      if (col === 19 && row === 13) return '../images/br-corner.gif';
      if (col === 0 && row === 5) return '../images/br-corner.gif';
      if (col === 0 && row === 7) return '../images/tr-corner.gif';
      if (col === 19 && row === 5) return '../images/bl-corner.gif';
      if (col === 19 && row === 7) return '../images/tl-corner.gif';
      if (col === 0 && row === 9) return '../images/tr.gif';
      if (col === 19 && row === 9) return '../images/tl.gif';
      return '../images/blank.gif';
    }
    if ((row === 0 || row === 13) ) {
      if ([1, 2, 3, 4, 5, 9, 10, 14, 15, 16, 17, 18].includes(col)) {
        return '../images/horiz-tile.gif';
      }
      if (row === 0 && col === 8) return '../images/bl-corner.gif';
      if (row === 0 && col === 11) return '../images/br-corner.gif';
      if (row === 13 && col === 8) return '../images/tl-corner.gif';
      if (row === 13 && col === 11) return '../images/tr-corner.gif';
      if (row === 0 && col === 6) return '../images/tl.gif';
      if (row === 0 && col === 13) return '../images/tr.gif';
      if (row === 13 && col === 6) return '../images/tr-corner.gif';
      if (row === 13 && col === 13) return '../images/tl-corner.gif';
      return '../images/blank.gif';
    }
  }

  getPosition(col, row) {
    let xPos = (window.innerWidth / 100) * (col * 3);
    let yPos = (window.innerWidth / 100) * (row * 3);
    console.log(xPos, yPos);
    return [xPos, yPos];
  }
}

module.exports = Board;