import FooterView from './views/footerview.js';
import HeaderView from './views/headerview.js';
import OneFromThreeView from './views/onefromthreeview.js';
import TwoFromThreeView from './views/twofromthreeview.js';
import ThreeFromThreeView from './views/threefromthreeview.js';
import stats from './screens/stats.js';
import {getElementFromTemplate, changeScreen} from './utils/createdom.js';

//  Объявляю константы
const MAIN = document.querySelector(`#main`);
const NUMBER_OF_SCREENS = 10;

//  И кое-какие переменные (потом надо будет все это пихнуть в модель)
let levelView = ``;
const root = getElementFromTemplate();
const headerElement = getElementFromTemplate();
const levelElement = getElementFromTemplate();
const footerElement = getElementFromTemplate();
//  Создаю базовые элементы для экрана игры


//  Функции обновления экранов

class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
    this.currentScreen = -1;
    this._interval = null;
  }

  updateHeader() {
    const state = this.model.getCurrentState();
    this.updateView(headerElement, new HeaderView(state.time, state.lifes));
  }

  updateView(container, view) {
    container.innerHTML = ``;
    container.appendChild(view.element);
  }

  updateFooter(ans) {
    this.updateView(footerElement, new FooterView(ans));
  }

  updateScreen(element) {
    this.updateHeader(this.model.getCurrentState().lifes);
    this.updateView(levelElement, element);
    this.updateFooter(this.model.state.answers);
  }

  changeView(element) {
    MAIN.innerHTML = ``;
    const headerView = new HeaderView([`full`, `full`, `empty`]);
    MAIN.appendChild(headerView.element);
    MAIN.appendChild(element);
    const footerView = new FooterView(this.model.state.answers);
    MAIN.appendChild(footerView.element);
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.checkTime()) {
        this.checkMistakes(`wrong`);
      }
      this.updateHeader();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this._interval);
    this.model.resetTime();
  }

  showOneFromThree() {
    levelView = new OneFromThreeView(this.model.getCurrentQuestion());
    levelView.onAnswer = (value) => {
      const answer = (value === this.model.questions[this.model.getCurrentState().currentQuestion].option1.value ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (levelView);
  }

  showTwoFromThree() {
    levelView = new TwoFromThreeView(this.model.getCurrentQuestion());
    levelView.onAnswer = (value1, value2) => {
      const answer = (value1 === this.model.questions[this.currentScreen].option1.value && value2 === this.model.questions[this.currentScreen].option2.value ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (levelView);
  }

  showThreeFromThree() {
    levelView = new ThreeFromThreeView(this.model.getCurrentQuestion());
    levelView.onAnswer = (value) => {
      const answer = (value === this.model.questions[this.currentScreen].correct ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (levelView);
  }

  changeScreens() {
    this.currentScreen += 1;
    if (this.currentScreen < NUMBER_OF_SCREENS) {
      switch (this.model.returnQuestionType()) {
        case `one_from_three`:
          this.updateScreen(this.showOneFromThree());
          break;
        case `two_from_three`:
          this.updateScreen(this.showTwoFromThree());
          break;
        case `three_from_three`:
          this.updateScreen(this.showThreeFromThree(this.currentScreen));
          break;
      }
    } else {
      this.changeView(stats(this.model.state.answers));
    }
  }

  startGame() {
    // Добвляю в контенер заготовки
    root.innerHTML = ``;
    root.appendChild(headerElement);
    root.appendChild(levelElement);
    root.appendChild(footerElement);
    MAIN.innerHTML = ``;
    MAIN.appendChild(root);
    this.changeScreens();
    this.startTimer();
  }

  checkMistakes(answer) {
    if (answer === `wrong`) {
      this.model.reduceLifes();
    } else if (this.model.getCurrentState().time >= 20) {
      answer = `fast`;
    } else if (this.model.getCurrentState().time <= 10) {
      answer = `slow`;
    }
    this.model.addAnswer(answer);
    if (this.model.getCurrentState().mistakes === 3) {
      changeScreen(stats(this.model.state.answers));
    } else {
      this.model.nextLevel();
      this.stopTimer();
      this.model.resetTime();
      this.startTimer();
      this.changeScreens();
    }
  }
}

export default GameScreen;
