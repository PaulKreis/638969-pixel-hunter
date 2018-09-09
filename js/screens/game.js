import {changeScreen} from '../utils/createdom.js';
import {questions} from '../data/data.js';
import stats from './stats.js';
import OneFromThreeView from '../views/onefromthreeview.js';
import TwoFromThreeView from '../views/twofromthreeview.js';
import ThreeFromThreeView from '../views/threefromthreeview.js';

let currentScreen = 0;
const answers = [];
const numberOfScreens = questions.length;
let levelView = ``;

const game = (question = currentScreen) => {
  switch (questions[question].type) {
    case `one_from_three`:
      levelView = new OneFromThreeView(questions[question]);
      levelView.onAnswer = (value) => {
        answers[currentScreen] = value === questions[currentScreen].option1.value ? `correct` : `wrong`;
        checkMistakes();
      };
      break;
    case `two_from_three`:
      levelView = new TwoFromThreeView(questions[question]);
      levelView.onAnswer = (value1, value2) => {
        answers[currentScreen] = value1 === questions[currentScreen].option1.value && value2 === questions[currentScreen].option2.value ? `correct` : `wrong`;
        checkMistakes();
      };
      break;
    case `three_from_three`:
      levelView = new ThreeFromThreeView(questions[question]);
      levelView.onAnswer = (value) => {
        answers[currentScreen] = value === questions[currentScreen].correct ? `correct` : `wrong`;
        checkMistakes();
      };
      break;
  }

  const changeScreens = () => {
    currentScreen += 1;
    if (currentScreen < numberOfScreens) {
      changeScreen(game(currentScreen));
    } else {
      changeScreen(stats(answers));
    }
  };

  const checkMistakes = () => {
    let mistakes = 0;
    answers.forEach(function (answer) {
      if (answer === `wrong`) {
        mistakes += 1;
      }
    });
    if (mistakes === 3) {
      changeScreen(stats(answers));
    } else {
      changeScreens();
    }
  };

  return levelView.element;
};

export default game;
