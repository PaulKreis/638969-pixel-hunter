import {getElementFromTemplate, changeScreen} from '../utils/createdom.js';
import rules from './rules.js';
import {greetingData} from '../data/data.js';

const logo = `<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">`;
const asterisk = `<div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>`;
const header = `<h3 class="greeting__challenge-title">${greetingData.title}</h3>`;
const rulesText = `<p class="greeting__challenge-text">${greetingData.challengetext}</p>
<ul class="greeting__challenge-list">
${[...greetingData.rules].map((rule) =>
    `<li>${rule}</li>`).join(``)}
</ul>`;
const arrowBtn = `<button class="greeting__continue" type="button">
<span class="visually-hidden">Продолжить</span>
<svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
  <use xlink:href="img/sprite.svg#arrow-right"></use>
</svg>
</button>`;


const template = `<section class="greeting central--blur">
${logo}
${asterisk}
<div class="greeting__challenge">
${header}
${rulesText}
</div>
${arrowBtn}
</section>`;


const greeting = getElementFromTemplate(template);

const arrow = greeting.querySelector(`.greeting__continue`);
arrow.addEventListener(`click`, () => {
  changeScreen(rules);
});

export default greeting;
