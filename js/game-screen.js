import FooterView from './views/footerview.js';
import HeaderView from './views/headerview.js';
import OneFromThreeView from './views/onefromthreeview.js';
import TwoFromThreeView from './views/twofromthreeview.js';
import ThreeFromThreeView from './views/threefromthreeview.js';
import {getElementFromTemplate} from './utils/createdom.js';

class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
    this._intervalFlashing = null;
    this.levelView = ``;
    this.root = getElementFromTemplate();
    this.headerElement = getElementFromTemplate();
    this.levelElement = getElementFromTemplate();
    this.footerElement = getElementFromTemplate();
    this.main = document.querySelector(`#main`);
    this.flashingState = `black`;
  }

  //  Методы по обновлению элементов
  updateView(container, view) {
    container.innerHTML = ``;
    container.appendChild(view.element);
  }

  updateHeader() {
    const state = this.model.getCurrentState();
    this.updateView(this.headerElement, new HeaderView(state.time, state.lifes));
  }

  updateFooter() {
    this.updateView(this.footerElement, new FooterView(this.model.getAnswers()));
  }

  updateScreen(element) {
    this.updateHeader(this.model.getCurrentState().lifes);
    this.updateView(this.levelElement, element);
    this.updateFooter();
  }

  //  Методы таймера
  startTimer() {
    const timerElement = document.getElementsByClassName(`game__timer`);
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.checkTime() === 0) {
        this.checkMistakes(`wrong`);
      } else if (this.model.checkTime() <= 5) {
        if (this.flashingState === `black`) {
          this.flashingState = `red`;
        } else {
          this.flashingState = `black`;
        }
      }
      this.updateHeader();
      timerElement[0].style.color = this.flashingState;
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this._interval);
    this.model.resetTime();
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
    this.startTimer();
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
    this.levelView.onAnswer = (value) => {
      const answer = (value === `photo` ? `correct` : `wrong`);
      this.checkMistakes(answer);
    };
    return (this.levelView);
  }

  //  Метод отображения статистики
  showStats() { }

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
    } else if (this.model.getCurrentState().time >= 20) {
      answer = `fast`;
    } else if (this.model.getCurrentState().time <= 10) {
      answer = `slow`;
    }
    this.model.addAnswer(answer);
    if (this.model.getCurrentState().mistakes === 3 || this.model.getQuestionNumber() + 1 === 10) {
      this.stopTimer();
      this.showStats(this.model.state.answers);
    } else {
      this.model.nextLevel();
      this.stopTimer();
      this.model.resetTime();
      this.startTimer();
      this.flashingState = `black`;
      this.changeScreens();
    }
  }
}

export default GameScreen;
