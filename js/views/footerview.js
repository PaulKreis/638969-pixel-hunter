import AbstractView from '../components/abstractview.js';

export default class FooterView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
  }
  get template() {
    return `<section class="game">
    <ul class="stats">
    <li class="stats__result stats__result--${this.results[0]}"></li>
    <li class="stats__result stats__result--${this.results[1]}"></li>
    <li class="stats__result stats__result--${this.results[2]}"></li>
    <li class="stats__result stats__result--${this.results[3]}"></li>
    <li class="stats__result stats__result--${this.results[4]}"></li>
    <li class="stats__result stats__result--${this.results[5]}"></li>
    <li class="stats__result stats__result--${this.results[6]}"></li>
    <li class="stats__result stats__result--${this.results[7]}"></li>
    <li class="stats__result stats__result--${this.results[8]}"></li>
    <li class="stats__result stats__result--${this.results[9]}"></li>
  </ul>
  </section>`;
  }

  onAnswer() { }
}
