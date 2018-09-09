import {changeScreen} from '../utils/createdom.js';
import rules from './rules.js';
import {greetingData} from '../data/data.js';
import GreetingView from '../views/greetingview.js';

const greeting = () => {
  const greetingView = new GreetingView(greetingData);
  greetingView.onAnswer = () => {
    changeScreen(rules());
  };
  return greetingView.element;
};
export default greeting;
