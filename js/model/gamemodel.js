class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.state = {
      mistakes: 0,
      answers: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
      currentQuestion: 0,
      lifes: [`full`, `full`, `full`],
      time: 30};
  }

  //  Предоставить данные для следующего уровня / нужного экрана
  getCurrentQuestion() {
    return this.questions[this.state.currentQuestion];
  }

  returnQuestionType() {
    return this.questions[this.state.currentQuestion].type;
  }

  getCurrentState() {
    return this.state;
  }

  tick() {
    this.state.time -= 1;
  }

  resetTime() {
    this.state.time = 30;
  }

  checkTime() {
    return this.state.time === 0;
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
