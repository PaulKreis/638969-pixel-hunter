import {header} from '../screens/header.js';
import {footerstats} from '../screens/footer.js';
import AbstractView from '../components/abstractview.js';
import resize from '../utils/resize.js';

export default class ThreeFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
    const formClass = `game__content  game__content--triple`;
    let correctSize1 = resize({width: 304, height: 455}, {width: this.question.option1.width, height: this.question.option1.height});
    const option1 = `<div class="game__option" data-item="${this.question.option1.alt}">
      <img src="${this.question.option1.src}" width="${correctSize1.width}" height="${correctSize1.height}">
      </div>`;
    let correctSize2 = resize({width: 304, height: 455}, {width: this.question.option2.width, height: this.question.option2.height});
    const option2 = `<div class="game__option" data-item="${this.question.option2.alt}">
      <img src="${this.question.option2.src}" width="${correctSize2.width}" height="${correctSize2.height}">
      </div>`;

    let correctSize3 = resize({width: 304, height: 455}, {width: this.question.option3.width, height: this.question.option3.height});
    const option3 = `<div class="game__option" data-item="${this.question.option3.alt}">
      <img src="${this.question.option3.src}" width="${correctSize3.width}" height="${correctSize3.height}">
      </div>`;


    return `
      ${header}
      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
          ${option2}
          ${option3}
        </form>
        ${footerstats}
      </section>`;
  }

  onAnswer() { }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    options[0].addEventListener(`click`, () => {
      this.onAnswer(options[0].getAttribute(`data-item`));
    });

    options[1].addEventListener(`click`, () => {
      this.onAnswer(options[1].getAttribute(`data-item`));
    });

    options[2].addEventListener(`click`, () => {
      this.onAnswer(options[2].getAttribute(`data-item`));
    });
  }
}

