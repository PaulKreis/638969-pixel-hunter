class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.state = {
      mistakes: 0,
      answers: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
      currentQuestion: 0,
      lifes: [`full`, `full`, `full`]
    };

  }

  //  Предоставить данные для следующего уровня / нужного экрана
  getCurrentQuestion() {
    return this.questions[this.state.currentQuestion];
  }

  getQuestionNumber() {
    return this.state.currentQuestion;
  }

  getAnswers() {
    return this.state.answers;
  }

  returnQuestionType() {
    return this.questions[this.state.currentQuestion].type;
  }

  returnNumberOfLifes() {
    let number = 0;
    this.state.lifes.forEach(function (life) {
      if (life === `full`) {
        number += 1;
      }
    });
    return number;
  }

  getCurrentState() {
    return this.state;
  }

  getScores() {
    let basicScores = 0;
    let fastScores = 0;
    let slowScores = 0;
    let lifeBonus = 0;
    let totalScores = 0;

    let scoresArray = this.state.answers.filter(function (answer) {
      return answer === `correct`;
    });
    basicScores = scoresArray.length;

    scoresArray = this.state.answers.filter(function (answer) {
      return answer === `fast`;
    });
    basicScores += scoresArray.length;
    fastScores = scoresArray.length;

    scoresArray = this.state.answers.filter(function (answer) {
      return answer === `slow`;
    });
    basicScores += scoresArray.length;
    slowScores = scoresArray.length;

    basicScores = basicScores * 100;

    lifeBonus = this.returnNumberOfLifes();

    totalScores = (basicScores) + (fastScores * 50) + (slowScores * 50 * (-1)) + (lifeBonus * 50);
    let gameStatus = (basicScores >= 800 ? `Победа!` : `Поражение :(`);
    basicScores = (gameStatus === `Поражение :(` ? `Fail` : basicScores);

    return {
      status: gameStatus,
      basic: basicScores,
      fast: fastScores,
      slow: slowScores,
      life: lifeBonus,
      total: totalScores
    };
  }

  nextLevel() {
    this.state.currentQuestion += 1;
  }

  addAnswer(answer) {
    this.state.answers[this.state.currentQuestion] = answer;
  }

  reduceLifes() {
    this.state.lifes[this.state.mistakes] = `empty`;
    this.state.mistakes += 1;
  }
}

export default GameModel;
