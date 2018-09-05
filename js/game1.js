import {getElementFromTemplate, changeScreen} from './createdom.js';
import game2 from './game2.js';
import greeting from './greeting.js';
import {header} from './header.js';
import {question} from './data.js';

const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;

const option1 = `  <div class="game__option">
<img src="${question.question1.option1.src}" alt="${question.question1.option1.alt}" width="${question.question1.option1.width}" height="${question.question1.option1.height}">
<label class="game__answer game__answer--photo">
  <input class="visually-hidden" name="question1" type="radio" value="photo" data-item="1">
  <span>Фото</span>
</label>
<label class="game__answer game__answer--paint">
  <input class="visually-hidden" name="question1" type="radio" value="paint" data-item="2">
  <span>Рисунок</span>
</label>
</div>`;

const option2 = `<div class="game__option">
<img src="${question.question1.option2.src}" alt="${question.question1.option2.alt}" width="${question.question1.option2.width}" height="${question.question1.option2.height}">
<label class="game__answer  game__answer--photo">
  <input class="visually-hidden" name="question2" type="radio" value="photo" data-item="3">
  <span>Фото</span>
</label>
<label class="game__answer  game__answer--paint">
  <input class="visually-hidden" name="question2" type="radio" value="paint" data-item="4">
  <span>Рисунок</span>
</label>
</div>`;

const template = `
${header}
<section class="game">
${caption}
<form class="game__content">
${option1}
${option2}
</form>
<ul class="stats">
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--correct"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
</ul>
</section>`;

const game1 = getElementFromTemplate(template);

const radioElements = game1.getElementsByTagName(`input`);
let isFirstChecked = false;
let isSecondChecked = false;

const isAllChecked = () => {
  if (isFirstChecked === true && isSecondChecked === true) {
    changeScreen(game2);
  }
};


radioElements[0].addEventListener(`change`, () => {
  isFirstChecked = true;
  isAllChecked();
});
radioElements[1].addEventListener(`change`, () => {
  isFirstChecked = true;
  isAllChecked();
});
radioElements[2].addEventListener(`change`, () => {
  isSecondChecked = true;
  isAllChecked();
});
radioElements[3].addEventListener(`change`, () => {
  isSecondChecked = true;
  isAllChecked();
});

const backbutton = game1.querySelector(`.back`);
backbutton.addEventListener(`click`, () => {
  changeScreen(greeting);
});

export default game1;
