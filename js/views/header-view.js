import AbstractView from '../components/abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor(time, lifes) {
    super();
    this.lifes = lifes;
    this.time = time;

  }
  get template() {
    return `<header class="header">
<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
</button>
<div class="game__timer">${this.time}</div>
<div class="game__lives">
${[...this.lifes].map((life) =>
    `<img src="img/heart__${life}.svg" class="game__heart" alt="${life}" width="31" height="27">`).join(``)}
</div>
</header>
`;
  }

  onAnswer() { }

  bind() {
    const backbutton = this.element.querySelector(`.back`);
    backbutton.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}
