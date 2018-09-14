import IntroView from '../views/intro-view.js';
import GreetingView from '../views/greeting-view';
import RulesView from '../views/rules-view.js';
import StatsView from '../views/stats-view.js';
import GameScreen from './game-screen.js';
import GameModel from '../model/game-model.js';
import Loader from '../components/loader.js';
import ModalErrorView from '../views/modal-error-view.js';

const MAIN = document.querySelector(`#main`);
let netData;
let playerName;

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

  static showError(error) {
    const errorView = new ModalErrorView(error);
    this.changeView(errorView.element);
  }

  static showRules() {
    const rules = new RulesView();
    rules.onAnswer = (name) => {
      playerName = name;
      this.showGame();
    };
    this.changeView(rules.element);
  }
  static loadData() {
    const fetchData = window.fetch(`https://es.dump.academy/pixel-hunter/questions`);

    fetchData.
    then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        Application.showError(`404 - Не найдены данные для игры`);
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
    gameScreen.showStats = (questions, lifes, scores) => {
      this.showStats(questions, lifes, scores);
    };
    gameScreen.showIntro = () => {
      this.showIntro();
    };
    gameScreen.startGame();
  }

  static showStats(answers, lifes, scores) {
    const stats = new StatsView(answers, scores);
    stats.onAnswer = () => {
      this.showIntro();
    };
    this.changeView(stats.element);
    Loader.saveResults(answers, playerName, lifes, scores).
      then(() => Loader.loadResults(playerName)).
      catch((error) => Application.showError(error)).
      then((data) => stats.showScores(data));
  }
}
