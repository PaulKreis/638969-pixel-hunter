class GameModel {
  constructor(questions) {
    this.questions = questions;
    this.mistakes = 0;
    this.answers = [];
    this.currentQuestion = 0;
  }

  //  Предоставить данные для следующего уровня / нужного экрана
  get nextQuestionData() {
    return this.questions[this.currentQuestion];
  }
//  Управлять количеством жизней
//
}
