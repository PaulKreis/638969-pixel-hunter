class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.state = {
      mistakes: 0,
      answers: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
      currentQuestion: 0,
      lifes: [`full`, `full`, `full`]
    };
    this.settings = {
      basicAnswerScore: 100,
      fastAnswerTime: 10,
      fastAnswerBonus: 50,
      slowAnswerFine: -50,
      slowAnswerTime: 20,
      lifeBonus: 50,
      lifes: 3,
      numberOfQuestions: 10,
      timeForAnswer: 30
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

    basicScores = basicScores * this.settings.basicAnswerScore;

    lifeBonus = this.settings.lifes - this.state.mistakes;

    totalScores = (basicScores) + (fastScores * this.settings.fastAnswerBonus) + (slowScores * this.settings.slowAnswerFine) + (lifeBonus * this.settings.lifeBonus);
    let gameStatus = (this.state.mistakes === this.settings.lifes ? `Поражение :(` : `Победа!`);

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
