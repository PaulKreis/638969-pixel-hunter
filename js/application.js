import IntroView from './views/introview.js';
import GreetingView from './views/greetingview';
import RulesView from './views/rulesview.js';
import StatsView from './views/statsview.js';
import * as Data from './data/data.js';
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
    this.start();
    const intro = new IntroView();
    intro.onAnswer = () => {
      this.showGreeting(Data.greetingData);
    };
    this.changeView(intro.element);
  }

  static showGreeting(data) {
    const greeting = new GreetingView(data);
    greeting.onAnswer = () => {
      this.showRules(Data.rulesData);
    };
    this.changeView(greeting.element);
  }

  static showRules(data) {
    const rules = new RulesView(data);
    rules.onAnswer = () => {
      this.showGame();
    };
    this.changeView(rules.element);
  }
  static start() {
    const whenStatsAreLoaded = window.fetch(`https://es.dump.academy/pixel-hunter/questions`);

    whenStatsAreLoaded.
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
      //  Как в одной из демок
      netData = data;
    });
    //  then((data) => console.log(data)).
    //  catch((err) => console.error(err));

  }
  static showGame() {
    console.log(netData);
    const gameModel = new GameModel(netData);
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
    this.changeView(stats.element);
  }
}

Application.showIntro();
