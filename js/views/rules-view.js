import AbstractView from '../components/abstract-view.js';

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

    const rulesTitle = `<h2 class="rules__title">Правила</h2>`;
    const rulesDescription = `<ul class="rules__description">

    <li>Угадай 10 раз для каждого изображения фото
    <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
    <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
    <li>Фотографиями или рисунками могут быть оба изображения.</li>
    <li>На каждую попытку отводится 30 секунд.</li>
    <li>Ошибиться можно не более 3 раз.</li>

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
    const name = this.element.querySelector(`.rules__input`);
    submit.addEventListener(`click`, () => {
      this.onAnswer(name.value);
    });


    name.addEventListener(`input`, () => {
      if (name.value !== ``) {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    });
  }
}
