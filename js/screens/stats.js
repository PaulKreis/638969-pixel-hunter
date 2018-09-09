import {changeScreen} from '../utils/createdom.js';
import greeting from './greeting.js';
import StatsView from '../views/statsview.js';

const stats = (answers) => {
  const statsView = new StatsView(answers);
  statsView.onAnswer = () => {
    changeScreen(greeting());
  };
  return statsView.element;
};

export default stats;
