import IntroView from './views/introview.js';
import GreetingView from './views/greetingview';
import RulesView from './views/rulesview.js';
import StatsView from './views/statsview.js';
import * as Data from './data/data.js';
import GameScreen from './game.js';
import GameModel from './model/gamemodel.js';

const MAIN = document.querySelector(`#main`);

const changeView = (element) => {
  MAIN.innerHTML = ``;
  MAIN.appendChild(element);
};

export default class Application {
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
    const gameModel = new GameModel(Data.questions);
    const gameScreen = new GameScreen(gameModel);
    gameScreen.startGame();
    gameScreen.showStats = (questions) => {
      this.showStats(questions);
    };
  }

  static showStats(questions) {
    const stats = new StatsView(questions);
    stats.onAnswer = () => {
      this.showIntro();
    };
    changeView(stats.element);
  }
}

Application.showIntro();
