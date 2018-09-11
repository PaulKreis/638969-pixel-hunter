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
let state = {
  lifes: [`full`, `full`, `full`],
  time: 0,
  answers: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`]
};
let levelView = ``;
let timer = ``;
let time = 0;
const gameContainerElement = getElementFromTemplate();
const headerElement = getElementFromTemplate();
const levelElement = getElementFromTemplate();
const footerElement = getElementFromTemplate();
//  Создаю базовые элементы для экрана игры


//  Функции обновления экранов
const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

const updateHeader = () => {
  updateView(headerElement, new HeaderView(time, state.lifes));
};

const updateFooter = (ans) => {
  updateView(footerElement, new FooterView(ans));
};

const updateScreen = (element) => {
  updateHeader(state.lifes);
  updateView(levelElement, element);
  updateFooter(state.answers);
};

const changeView = (element) => {
  MAIN.innerHTML = ``;
  const headerView = new HeaderView([`full`, `full`, `empty`]);
  MAIN.appendChild(headerView.element);
  MAIN.appendChild(element);
  const footerView = new FooterView(state.answers);
  MAIN.appendChild(footerView.element);
};


class GameScreen {
  constructor(data) {
    // this.model = model;
    // this.header = new HeaderView(this.model.state);
    // this.content = new LevelView(this.model.getCurrentLevel());

    // this.root = document.createElement(`div`);
    // this.root.appendChild(this.header.element);
    // this.root.appendChild(this.content.element);
    // this.root.appendChild(new FooterView().element);
    this.data = data;
    this._interval = null;
    this.currentScreen = -1;
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startTimer() {
    this._interval = setInterval(() => {
      time += 1;
      updateHeader();
    }, 1000);
  }

  stopTimer() {
    clearTimeout(timer);
  }

  showOneFromThree(question) {
    levelView = new OneFromThreeView(this.data[question]);
    levelView.onAnswer = (value) => {
      state.answers[this.currentScreen] = value === this.data[this.currentScreen].option1.value ? `correct` : `wrong`;
      this.checkMistakes();
    };
    return (levelView);
  }

  showTwoFromThree(question) {
    levelView = new TwoFromThreeView(this.data[question]);
    levelView.onAnswer = (value1, value2) => {
      state.answers[this.currentScreen] = value1 === this.data[this.currentScreen].option1.value && value2 === this.data[this.currentScreen].option2.value ? `correct` : `wrong`;
      this.checkMistakes();
    };
    return (levelView);
  }

  showThreeFromThree(question) {
    levelView = new ThreeFromThreeView(this.data[question]);
    levelView.onAnswer = (value) => {
      state.answers[this.currentScreen] = value === this.data[this.currentScreen].correct ? `correct` : `wrong`;
      this.checkMistakes();
    };
    return (levelView);
  }

  changeScreens() {
    this.currentScreen += 1;
    if (this.currentScreen < NUMBER_OF_SCREENS) {
      switch (this.data[this.currentScreen].type) {
        case `one_from_three`:
          updateScreen(this.showOneFromThree(this.currentScreen));
          break;
        case `two_from_three`:
          updateScreen(this.showTwoFromThree(this.currentScreen));
          break;
        case `three_from_three`:
          updateScreen(this.showThreeFromThree(this.currentScreen));
          break;
      }
    } else {
      changeView(stats(state.answers));
    }
  }

  startGame() {
    // Добвляю в контенер заготовки
    gameContainerElement.appendChild(headerElement);
    gameContainerElement.appendChild(levelElement);
    gameContainerElement.appendChild(footerElement);
    MAIN.innerHTML = ``;
    MAIN.appendChild(gameContainerElement);
    this.changeScreens();
    this.startTimer();
  }
  checkMistakes() {
    let mistakes = 0;
    state.answers.forEach(function (answer) {
      if (answer === `wrong`) {
        state.lifes[mistakes] = `empty`;
        mistakes += 1;
      }
    });
    if (mistakes === 3) {
      changeScreen(stats(state.answers));
    } else {
      this.changeScreens();
    }
  }
}
export default GameScreen;
