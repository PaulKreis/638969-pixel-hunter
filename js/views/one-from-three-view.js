import AbstractView from '../components/abstract-view.js';
import resize from '../components/resize.js';
const FRAME_SIZE = {width: 705, height: 455};

export default class OneFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    const correctSize = resize(FRAME_SIZE, {width: this.question.answers[0].image.width, height: this.question.answers[0].image.height});
    const caption = `<p class="game__task">${this.question.question}</p>`;
    let formClass = `game__content game__content--wide`;
    let option1 = `<div class="game__option">
      <img src="${this.question.answers[0].image.url}" alt="${this.question.type}" width="${correctSize.width}" height="${correctSize.height}">
      <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="painting">
      <span>Рисунок</span>
      </label>
      </div>`;

    return `

      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
        </form>

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

