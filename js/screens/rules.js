import {changeScreen} from '../utils/createdom.js';
import game from './game.js';
//   import greeting from './greeting.js';
import {rulesData} from '../data/data.js';
import RulesView from '../views/rulesview.js';

// const backbutton = rules.querySelector(`.back`);
// backbutton.addEventListener(`click`, () => {
//   changeScreen(greeting);
// });

const rules = () => {
  const rulesView = new RulesView(rulesData);
  rulesView.onAnswer = () => {
    changeScreen(game());
  };
  return rulesView.element;
};

export default rules;
