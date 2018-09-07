//  import {reduceLifes} from './checklifes.js';
let answerTime = 30;
export const reduceTimer = () => {
  answerTime -= 1;
  return answerTime;
};
export const initTimer = () => {
  answerTime = 30;
};
