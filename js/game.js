import FooterView from './views/footerview.js';
import HeaderView from './views/headerview.js';
import OneFromThreeView from './views/onefromthreeview.js';
import TwoFromThreeView from './views/twofromthreeview.js';
import ThreeFromThreeView from './views/threefromthreeview.js';
import {getElementFromTemplate} from './utils/createdom.js';

//  Объявляю константы
const MAIN = document.querySelector(`#main`);

//  Создаю различные DOM элементы
let levelView = ``;
const root = getElementFromTemplate();
const headerElement = getElementFromTemplate();
const levelElement = getElementFromTemplate();
const footerElement = getElementFromTemplate();

class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
  }

  //  Методы по обновлению элементов
  updateView(container, view) {
    container.innerHTML = ``;
    container.appendChild(view.element);
  }

  updateHeader() {
    const state = this.model.getCurrentState();
    this.updateView(headerElement, new HeaderView(state.time, state.lifes));
  }

  updateFooter(ans) {
    this.updateView(footerElement, new FooterView(ans));
  }

  updateScreen(element) {
    this.updateHeader(this.model.getCurrentState().lifes);
    this.updateView(levelElement, element);
    this.updateFooter(this.model.state.answers);
  }

  //  Методы таймера
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

  //  Метод начала игры
  startGame() {
    root.innerHTML = ``;
    root.appendChild(headerElement);
    root.appendChild(levelElement);
    root.appendChild(footerElement);
    MAIN.innerHTML = ``;
    MAIN.appendChild(root);
    this.changeScreens();
    this.startTimer();
  }

  //  Методы отображения игровых экранов
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
      const answer = (value1 === this.model.questions[this.model.getCurrentState().currentQuestion].option1.value && value2 === this.model.questions[this.model.getCurrentState().currentQuestion].option2.value ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (levelView);
  }

  showThreeFromThree() {
    levelView = new ThreeFromThreeView(this.model.getCurrentQuestion());
    levelView.onAnswer = (value) => {
      const answer = (value === this.model.questions[this.model.getCurrentState().currentQuestion].correct ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (levelView);
  }

  //  Метод отображения статистики
  showStats() { }

  //  Метод смены экранов
  changeScreens() {
    switch (this.model.returnQuestionType()) {
      case `one_from_three`:
        this.updateScreen(this.showOneFromThree());
        break;
      case `two_from_three`:
        this.updateScreen(this.showTwoFromThree());
        break;
      case `three_from_three`:
        this.updateScreen(this.showThreeFromThree());
        break;
    }
  }

  //  Проверка ответов пользователя
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
      this.stopTimer();
      this.showStats(this.model.state.answers);
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
