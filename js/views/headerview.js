import AbstractView from '../components/abstractview.js';

export default class HeaderView extends AbstractView {
  constructor(lifes) {
    super();
    this.lifes = lifes;

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
<div class="game__timer">NN</div>
<div class="game__lives">
  <img src="img/heart__${this.lifes[0]}.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
  <img src="img/heart__${this.lifes[1]}.svg" class="game__heart" alt="Life" width="31" height="27">
  <img src="img/heart__${this.lifes[2]}.svg" class="game__heart" alt="Life" width="31" height="27">
</div>
</header>
`;
  }

  onAnswer() { }
}
