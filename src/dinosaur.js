class Dinosaur {
  constructor(initialPos) {
    this.rowPos = initialPos[1];
    this.colPos = initialPos[0];
    this.placeOnBoard();
  }

  placeOnBoard() {

    let dino = document.createElement('img');
    dino.setAttribute('sr', '../dino/Idle1/png');
    dino.setAttribute('class', 'dino');

    let tileId = `row${this.rowPos}-col${this.colPos}`;
    let board = document.getElementById('board');
  }


}