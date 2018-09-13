import IntroView from './views/introview.js';
import GreetingView from './views/greetingview';
import RulesView from './views/rulesview.js';
import StatsView from './views/statsview.js';
import GameScreen from './game-screen.js';
import GameModel from './model/gamemodel.js';

const MAIN = document.querySelector(`#main`);
let netData;
export default class Application {

  static changeView(element) {
    MAIN.innerHTML = ``;
    MAIN.appendChild(element);
  }

  static showIntro() {
    this.loadData();
    const intro = new IntroView();
    intro.onAnswer = () => {
      this.showGreeting();
    };
    this.changeView(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingView();
    greeting.onAnswer = () => {
      this.showRules();
    };
    this.changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesView();
    rules.onAnswer = () => {
      this.showGame();
    };
    this.changeView(rules.element);
  }
  static loadData() {
    const fetchData = window.fetch(`https://es.dump.academy/pixel-hunter/questions`);

    fetchData.
    then((response) => {
      //  debugger;
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return [];
      }
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    }).
    then((data) => {
      netData = data;
    });

  }
  static showGame() {
    const gameModel = new GameModel(netData);
    const gameScreen = new GameScreen(gameModel);
    gameScreen.showStats = (questions) => {
      this.showStats(questions);
    };
    gameScreen.showIntro = () => {
      this.showIntro();
    };
    gameScreen.startGame();
  }

  static showStats(questions) {
    const stats = new StatsView(questions);
    stats.onAnswer = () => {
      this.showIntro();
    };
    this.changeView(stats.element);
  }
}

Application.showIntro();
