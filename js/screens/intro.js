import {changeScreen} from '../utils/createdom.js';
import greeting from './greeting.js';
import IntroView from '../views/introview.js';

const intro = () => {
  const introView = new IntroView();
  introView.onAnswer = () => {
    changeScreen(greeting());
  };
  return introView.element;
};
export default intro;
