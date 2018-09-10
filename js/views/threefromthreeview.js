import AbstractView from '../components/abstractview.js';
import resize from '../utils/resize.js';
import FooterView from '../views/footerview.js';
import HeaderView from '../views/headerview.js';

const FRAME_SIZE = {width: 304, height: 455};

export default class ThreeFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    const footerView = new FooterView();
    const headerView = new HeaderView();
    let correctSize1 = resize(FRAME_SIZE, {width: this.question.option1.width, height: this.question.option1.height});
    let correctSize2 = resize(FRAME_SIZE, {width: this.question.option2.width, height: this.question.option2.height});
    let correctSize3 = resize(FRAME_SIZE, {width: this.question.option3.width, height: this.question.option3.height});

    const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
    const formClass = `game__content  game__content--triple`;
    const option1 = `<div class="game__option" data-item="${this.question.option1.alt}">
      <img src="${this.question.option1.src}" width="${correctSize1.width}" height="${correctSize1.height}">
      </div>`;
    const option2 = `<div class="game__option" data-item="${this.question.option2.alt}">
      <img src="${this.question.option2.src}" width="${correctSize2.width}" height="${correctSize2.height}">
      </div>`;
    const option3 = `<div class="game__option" data-item="${this.question.option3.alt}">
      <img src="${this.question.option3.src}" width="${correctSize3.width}" height="${correctSize3.height}">
      </div>`;


    return `
    ${headerView.template}
      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
          ${option2}
          ${option3}
        </form>
        ${footerView.template}
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

