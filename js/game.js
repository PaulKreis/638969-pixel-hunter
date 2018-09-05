import {getElementFromTemplate/*  ,  changeScreen  */} from './createdom.js';
//  import game2 from './game2.js';
//  import greeting from './greeting.js';
import {header} from './header.js';
import {stats} from './footer.js';
import {questions} from './data.js';

const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
let option11 = ``;
let option12 = ``;
let option22 = ``;
let option13 = ``;
let option23 = ``;
let option33 = ``;

const game = (question) => {
  if (question.type === `one_from_three`) {
    option11 = `<div class="game__option">
    <img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
    </div>`;
  } else if (question.type === `two_from_three`) {
    option12 = `  <div class="game__option">
<img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
<label class="game__answer game__answer--photo">
  <input class="visually-hidden" name="question1" type="radio" value="photo" data-item="1">
  <span>Фото</span>
</label>
<label class="game__answer game__answer--paint">
  <input class="visually-hidden" name="question1" type="radio" value="paint" data-item="2">
  <span>Рисунок</span>
</label>
</div>`;

    option22 = `<div class="game__option">
<img src="${question.option2.src}" alt="${question.option2.alt}" width="${question.option2.width}" height="${question.option2.height}">
<label class="game__answer  game__answer--photo">
  <input class="visually-hidden" name="question2" type="radio" value="photo" data-item="3">
  <span>Фото</span>
</label>
<label class="game__answer  game__answer--paint">
  <input class="visually-hidden" name="question2" type="radio" value="paint" data-item="4">
  <span>Рисунок</span>
</label>
</div>`;
  } else if (question.type === `three_from_three`) {
    option13 = ` <div class="game__option">
<img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
</div>`;

    option23 = `<div class="game__option  game__option--selected">
    <img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
</div>`;

    option33 = `<div class="game__option">
    <img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
</div>`;
  }

  const template = `
${header}
<section class="game">
${caption}
<form class="game__content">
${option11}
${option12}
${option22}
${option13}
${option23}
${option33}
</form>
${stats}
</section>`;

  return template;
};
export const renderScreen = (state) => {
  const game1 = getElementFromTemplate(game(questions[state]));
  return game1;
};

