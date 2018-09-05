import {getElementFromTemplate, changeScreen} from './createdom.js';
import {renderScreen} from './game.js';
import greeting from './greeting.js';
import {rulesData} from './data.js';

const header = `<header class="header">
<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>
</header>`;

const rulesTitle = `<h2 class="rules__title">${rulesData.title}</h2>`;
const rulesDescription = `<ul class="rules__description">
${[...rulesData.rules].map((rule) =>
    `<li>${rule}</li>`).join(``)}
</ul>`;
const form = `<p class="rules__ready">Готовы?</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>`;
const template = `
${header}
<section class="rules">
${rulesTitle}
${rulesDescription}
${form}
</section>`;

const rules = getElementFromTemplate(template);

const submit = rules.querySelector(`.rules__button`);
submit.addEventListener(`click`, () => {
  changeScreen(renderScreen(2));
});
const name = rules.querySelector(`.rules__input`);

name.addEventListener(`input`, () => {
  if (name.value !== ``) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
});

const backbutton = rules.querySelector(`.back`);
backbutton.addEventListener(`click`, () => {
  changeScreen(greeting);
});

export default rules;
