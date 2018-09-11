import IntroView from './views/introview.js';
import GreetingView from './views/greetingview';
import RulesView from './views/rulesview.js';
import * as Data from './data/data.js';
import GameScreen from './game.js';

const MAIN = document.querySelector(`#main`);

const changeView = (element) => {
  MAIN.innerHTML = ``;
  MAIN.appendChild(element);
};

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
    const gameScreen = new GameScreen(Data.questions);
    gameScreen.startGame();
  }
}

Router.showIntro();
