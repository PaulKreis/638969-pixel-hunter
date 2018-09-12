import AbstractView from '../components/abstractview.js';

export default class StatsView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }
  get template() {
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

    const caption = `<h2 class="result__title">Победа!</h2>`;

    const result1 = `<table class="result__table">
<tr>
  <td class="result__number">1.</td>
  <td colspan="2">
    <ul class="stats">
    ${[...this.answers].map((answer) =>
    `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
    </ul>
  </td>
  <td class="result__points">× 100</td>
  <td class="result__total">900</td>
</tr>
<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">50</td>
</tr>
<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">100</td>
</tr>
<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">-100</td>
</tr>
<tr>
  <td colspan="5" class="result__total  result__total--final">950</td>
</tr>
</table>`;

    const result2 = `<table class="result__table">
<tr>
  <td class="result__number">2.</td>
  <td>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--wrong"></li>
    </ul>
  </td>
  <td class="result__total"></td>
  <td class="result__total  result__total--final">fail</td>
</tr>
</table>`;

    const result3 = `<table class="result__table">
<tr>
  <td class="result__number">3.</td>
  <td colspan="2">
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
  </td>
  <td class="result__points">× 100</td>
  <td class="result__total">900</td>
</tr>
<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">100</td>
</tr>
<tr>
  <td colspan="5" class="result__total  result__total--final">950</td>
</tr>
</table>`;

    return `
${header}
<section class="result">
${caption}
${result1}
${result2}
${result3}
</section>`;
  }

  onAnswer() { }

  bind() {
    const backbutton = this.element.querySelector(`.back`);
    backbutton.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}
