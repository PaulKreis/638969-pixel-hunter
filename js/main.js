import IntroView from './views/introview.js';
import GreetingView from './views/greetingview';
import RulesView from './views/rulesview.js';
import OneFromThreeView from './views/onefromthreeview.js';
import TwoFromThreeView from './views/twofromthreeview.js';
import ThreeFromThreeView from './views/threefromthreeview.js';
import FooteeView from './views/footerview.js';
import HeaderView from './views/headerview.js';
import stats from './screens/stats.js';
import * as Data from './data/data.js';

const MAIN = document.querySelector(`#main`);
const NUMBER_OF_SCREENS = Data.questions.length;

const changeView = (element) => {
  MAIN.innerHTML = ``;
  MAIN.appendChild(element);
};

let currentScreen = -1;
let answers = [];
let levelView = ``;

export default class Router {
  static showIntro() {
    const intro = new IntroView();
    intro.onAnswer = () => {
      this.showGreeting(Data.greetingData);
    };
    changeView(intro.element);
  }

  static showGreeting(data) {
    const greeting = new GreetingView(data);
    greeting.onAnswer = () => {
      this.showRules(Data.rulesData);
    };
    changeView(greeting.element);
  }

  static showRules(data) {
    const rules = new RulesView(data);
    rules.onAnswer = () => {
      this.showGame();
    };
    changeView(rules.element);
  }

  static showGame() {
    this.changeScreens();
  }

  static showOneFromThree(question) {
    levelView = new OneFromThreeView(Data.questions[question]);
    levelView.onAnswer = (value) => {
      answers[currentScreen] = value === Data.questions[currentScreen].option1.value ? `correct` : `wrong`;
      this.checkMistakes();
    };
    changeView(levelView.element);
  }

  static showTwoFromThree(question) {
    levelView = new TwoFromThreeView(Data.questions[question]);
    levelView.onAnswer = (value1, value2) => {
      answers[currentScreen] = value1 === Data.questions[currentScreen].option1.value && value2 === Data.questions[currentScreen].option2.value ? `correct` : `wrong`;
      this.checkMistakes();
    };
    changeView(levelView.element);
  }

  static showThreeFromThree(question) {
    levelView = new ThreeFromThreeView(Data.questions[question]);
    levelView.onAnswer = (value) => {
      answers[currentScreen] = value === Data.questions[currentScreen].correct ? `correct` : `wrong`;
      this.checkMistakes();
    };
    changeView(levelView.element);
  }

  static changeScreens() {
    currentScreen += 1;
    if (currentScreen < NUMBER_OF_SCREENS) {
      switch (Data.questions[currentScreen].type) {
        case `one_from_three`:
          this.showOneFromThree(currentScreen);
          break;
        case `two_from_three`:
          this.showTwoFromThree(currentScreen);
          break;
        case `three_from_three`:
          this.showThreeFromThree(currentScreen);
          break;
      }
    } else {
      changeView(stats(answers));
    }
  }

  static checkMistakes() {
    let mistakes = 0;
    answers.forEach(function (answer) {
      if (answer === `wrong`) {
        mistakes += 1;
      }
    });
    if (mistakes === 3) {
      changeView(stats(answers));
    } else {
      this.changeScreens();
    }
  }
}

Router.showIntro();
