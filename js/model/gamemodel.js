class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.mistakes = 0;
    this.answers = [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`];
    this.currentQuestion = 0;
    this.lifes = [`full`, `full`, `full`];
    this.time = 30;
  }

  //  Предоставить данные для следующего уровня / нужного экрана
  getCurrentQuestion() {
    return this.questions[this.currentQuestion];
  }

  getAnswers() {
    return this.answers;
  }

  returnLife() {
    return this.lifes;
  }

  tick() {
    this.time -= 1;
  }

  resetTime() {
    this.time = 30;
  }

  checkTime() {
    return this.time === 0;
  }

  returnMistakes() {
    return this.mistakes;
  }

  returnQuestionType() {
    return this.questions[this.currentQuestion].type;
  }

  nextLevel() {
    this.currentQuestion += 1;
  }

  addAnswer(answer) {
    this.answers[this.currentQuestion] = answer;
  }

  reduceLifes() {
    this.lifes[this.mistakes] = `empty`;
    this.returnLife();
    this.mistakes += 1;
  }
//  Управлять количеством жизней
//
}

export default GameModel;
