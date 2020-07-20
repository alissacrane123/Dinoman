class Score {
  constructor() {
    this.score = 0;

    this.setScore();
  }

  setScore() {
    let score = document.getElementById("score");
    score.innerHTML = this.score;
  }

  updateScore() {
    this.score += 1;
    this.setScore();
  }
}

module.exports = Score;