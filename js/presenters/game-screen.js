import FooterView from '../views/footer-view.js';
import HeaderView from '../views/header-view.js';
import OneFromThreeView from '../views/one-from-three-view.js';
import TwoFromThreeView from '../views/two-from-three-view.js';
import ThreeFromThreeView from '../views/three-from-three-view.js';
import {getElementFromTemplate} from '../utils/createdom.js';
import Timer from '../components/timer.js';

class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
    this.levelView = ``;
    this.root = getElementFromTemplate();
    this.headerElement = getElementFromTemplate();
    this.levelElement = getElementFromTemplate();
    this.footerElement = getElementFromTemplate();
    this.main = document.querySelector(`#main`);
    this.flashingState = `black`;
    this.timer = new Timer(30, () => {
      this.checkMistakes(`wrong`);
    });
  }

  //  Методы, которые я переопределяю в Application
  showStats() { }
  showIntro() { }

  //  Методы по обновлению элементов
  updateView(container, view) {
    container.innerHTML = ``;
    container.appendChild(view.element);
  }

  updateHeader() {
    const state = this.model.getCurrentState();
    let headerView = new HeaderView(this.timer.currentTime, state.lifes);
    headerView.onAnswer = () => {
      this.showIntro();
      this.timer.stop();
    };
    this.updateView(this.headerElement, headerView);
  }

  updateFooter() {
    this.updateView(this.footerElement, new FooterView(this.model.getAnswers()));
  }

  updateScreen(element) {
    this.updateHeader(this.model.getCurrentState().lifes);
    this.updateView(this.levelElement, element);
    this.updateFooter();
  }

  //  Метод начала игры
  startGame() {
    this.root.innerHTML = ``;
    this.main.innerHTML = ``;
    this.root.appendChild(this.headerElement);
    this.root.appendChild(this.levelElement);
    this.root.appendChild(this.footerElement);
    this.main.appendChild(this.root);
    this.changeScreens();
    this.timer.start();
  }

  //  Методы отображения игровых экранов
  showOneFromThree() {
    this.levelView = new OneFromThreeView(this.model.getCurrentQuestion());
    console.log(`This is: ` + this.model.questions[this.model.getCurrentState().currentQuestion].answers[0].type);
    this.levelView.onAnswer = (value) => {
      const answer = (value === this.model.questions[this.model.getCurrentState().currentQuestion].answers[0].type ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (this.levelView);
  }

  showTwoFromThree() {
    this.levelView = new TwoFromThreeView(this.model.getCurrentQuestion());
    console.log(`This is: ` + this.model.questions[this.model.getCurrentState().currentQuestion].answers[0].type, this.model.questions[this.model.getCurrentState().currentQuestion].answers[1].type);
    this.levelView.onAnswer = (value1, value2) => {
      const answer = (value1 === this.model.questions[this.model.getCurrentState().currentQuestion].answers[0].type && value2 === this.model.questions[this.model.getCurrentState().currentQuestion].answers[1].type ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (this.levelView);
  }

  showThreeFromThree() {
    this.levelView = new ThreeFromThreeView(this.model.getCurrentQuestion());
    console.log(`This is: ` + this.model.questions[this.model.getCurrentState().currentQuestion].answers[0].type, this.model.questions[this.model.getCurrentState().currentQuestion].answers[1].type, this.model.questions[this.model.getCurrentState().currentQuestion].answers[2].type);
    const correctValue = (this.model.questions[this.model.getCurrentState().currentQuestion].question === `Найдите фото среди изображений` ? `photo` : `painting`);
    this.levelView.onAnswer = (value) => {
      const answer = (value === correctValue ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (this.levelView);
  }

  //  Метод смены экранов
  changeScreens() {
    switch (this.model.returnQuestionType()) {
      case `tinder-like`:
        this.updateScreen(this.showOneFromThree());
        break;
      case `two-of-two`:
        this.updateScreen(this.showTwoFromThree());
        break;
      case `one-of-three`:
        this.updateScreen(this.showThreeFromThree());
        break;
    }
  }

  //  Проверка ответов пользователя
  checkMistakes(answer) {
    if (answer === `wrong`) {
      this.model.reduceLifes();
    } else if (this.timer.currentTime >= 20) {
      answer = `fast`;
    } else if (this.timer.currentTime <= 10) {
      answer = `slow`;
    }
    this.model.addAnswer(answer);
    if (this.model.getCurrentState().mistakes === 3 || this.model.getQuestionNumber() + 1 === 10) {
      this.timer.stop();
      this.showStats(this.model.state.answers, this.model.returnNumberOfLifes(), this.model.getScores());
    } else {
      this.model.nextLevel();
      this.timer.stop();
      this.timer.start();
      this.flashingState = `black`;
      this.changeScreens();
    }
  }
}

export default GameScreen;
