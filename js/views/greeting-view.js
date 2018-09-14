import AbstractView from '../components/abstract-view.js';

export default class GreetingView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    const logo = `<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">`;
    const asterisk = `<div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>`;
    const header = `<h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>`;
    const rulesText = `<p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
    <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
    <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
    <li>Фотореализм обманчив и коварен.</li>
    <li>Помни, главное — смотреть очень внимательно.</li>
    </ul>`;
    const arrowBtn = `<button class="greeting__continue" type="button">
    <span class="visually-hidden">Продолжить</span>
    <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-right"></use>
    </svg>
    </button>`;
    return `<section class="greeting central--blur">
      ${logo}
      ${asterisk}
        <div class="greeting__challenge">
        ${header}
        ${rulesText}
        </div>
      ${arrowBtn}
      </section>`;
  }

  onAnswer() { }

  bind() {
    const arrow = this.element.querySelector(`.greeting__continue`);
    arrow.addEventListener(`click`, () => {
      this.onAnswer();
    });
  }
}
