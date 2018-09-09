import {header} from '../screens/header.js';
import {footerstats} from '../screens/footer.js';
import AbstractView from '../components/abstractview.js';

export default class OneFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
    let formClass = `game__content game__content--wide`;
    let option1 = `<div class="game__option">
      <img src="${this.question.option1.src}" alt="${this.question.option1.alt}" width="${this.question.option1.width}" height="${this.question.option1.height}">
      <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
      </label>
      </div>`;

    return `
      ${header}
      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
        </form>
        ${footerstats}
      </section>`;
  }

  onAnswer() { }

  bind() {
    let radioElements = this.element.getElementsByTagName(`input`);
    radioElements[0].addEventListener(`change`, () => {
      this.onAnswer(radioElements[0].value);
    });
    radioElements[1].addEventListener(`change`, () => {
      this.onAnswer(radioElements[1].value);
    });
  }
}

