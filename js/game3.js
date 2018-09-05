import {getElementFromTemplate, changeScreen} from './createdom.js';
import stats from './stats.js';
import greeting from './greeting.js';
import {header} from './header.js';

const caption = `<p class="game__task">Найдите рисунок среди изображений</p>`;

const option1 = ` <div class="game__option">
<img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
</div>`;

const option2 = `<div class="game__option  game__option--selected">
<img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
</div>`;

const option3 = `<div class="game__option">
<img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
</div>`;

const template = `
${header}
<section class="game">
${caption}
<form class="game__content  game__content--triple">
${option1}
${option2}
${option3}
</form>
<ul class="stats">
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--correct"></li>
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--unknown"></li>
</ul>
</section>`;

const game3 = getElementFromTemplate(template);

const options = game3.querySelectorAll(`.game__option`);

options[0].addEventListener(`click`, () => {
  changeScreen(stats);
});

options[1].addEventListener(`click`, () => {
  changeScreen(stats);
});

options[2].addEventListener(`click`, () => {
  changeScreen(stats);
});

const backbutton = game3.querySelector(`.back`);
backbutton.addEventListener(`click`, () => {
  changeScreen(greeting);
});
export default game3;
