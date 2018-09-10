import AbstractView from '../components/abstractview.js';

export default class RulesView extends AbstractView {
  constructor(rulesData) {
    super();
    this.rulesData = rulesData;
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

    const rulesTitle = `<h2 class="rules__title">${this.rulesData.title}</h2>`;
    const rulesDescription = `<ul class="rules__description">
${[...this.rulesData.rules].map((rule) =>
    `<li>${rule}</li>`).join(``)}
</ul>`;
    const form = `<p class="rules__ready">Готовы?</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>`;
    return `
${header}
<section class="rules">
${rulesTitle}
${rulesDescription}
${form}
</section>`;
  }

  onAnswer() { }

  bind() {
    const submit = this.element.querySelector(`.rules__button`);
    submit.addEventListener(`click`, () => {
      this.onAnswer();
    });
    const name = this.element.querySelector(`.rules__input`);

    name.addEventListener(`input`, () => {
      if (name.value !== ``) {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    });
  }
}
