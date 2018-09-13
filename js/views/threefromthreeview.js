import AbstractView from '../components/abstractview.js';
import resize from '../utils/resize.js';

const FRAME_SIZE = {width: 304, height: 455};

export default class ThreeFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    let correctSize1 = resize(FRAME_SIZE, {width: this.question.answers[0].image.width, height: this.question.answers[0].image.height});
    let correctSize2 = resize(FRAME_SIZE, {width: this.question.answers[1].image.width, height: this.question.answers[1].image.height});
    let correctSize3 = resize(FRAME_SIZE, {width: this.question.answers[2].image.width, height: this.question.answers[2].image.height});

    const caption = `<p class="game__task">${this.question.question}</p>`;
    const formClass = `game__content  game__content--triple`;
    const option1 = `<div class="game__option" data-item="${this.question.answers[0].type}">
      <img src="${this.question.answers[0].image.url}" width="${correctSize1.width}" height="${correctSize1.height}">
      </div>`;
    const option2 = `<div class="game__option" data-item="${this.question.answers[1].type}">
      <img src="${this.question.answers[1].image.url}" width="${correctSize2.width}" height="${correctSize2.height}">
      </div>`;
    const option3 = `<div class="game__option" data-item="${this.question.answers[2].type}">
      <img src="${this.question.answers[2].image.url}" width="${correctSize3.width}" height="${correctSize3.height}">
      </div>`;


    return `
      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
          ${option2}
          ${option3}
        </form>
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

