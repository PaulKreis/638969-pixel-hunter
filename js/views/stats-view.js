import AbstractView from '../components/abstract-view.js';

export default class StatsView extends AbstractView {
  constructor(answers, scores) {
    super();
    this.answers = answers;
    this.scores = scores;
  }
  get template() {
    const header = `
      <header class="header">
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

    const result = `
      <section class="result">
        <h2 class="result__title">^___^</h2>
        <div class="scoreboard">Scoreboard is loading...</div>
      </section>`;

    return `
      ${header}
      ${result}
      `;
  }

  onAnswer() { }

  showScores(inputData) {
    let data = inputData.reverse().slice(0, 3);

    let _scoreBoardContainer = this.element.querySelector(`div.scoreboard`);
    this._resultTitle = this.element.querySelector(`h2.result__title`);
    this._resultTitle.innerHTML = data[0].scores.status;

    _scoreBoardContainer.innerHTML = ``;

    data.forEach(function (result, i) {
      _scoreBoardContainer.innerHTML +=
     `<table class="result__table">
          <tr>
            <td class="result__number">${i + 1}.</td>
            <td colspan="2">
              <ul class="stats">
              ${[...result.data].map((answer) =>
    `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">${result.scores.basic}</td>
          </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${result.scores.fast} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.scores.fast * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${result.scores.life} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.scores.life * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${result.scores.slow} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${result.scores.slow * 50 * (-1)}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${result.scores.total}</td>
        </tr>
        </table>`;
    });
  }

  bind() {
    const backbutton = this.element.querySelector(`.back`);
    backbutton.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}
