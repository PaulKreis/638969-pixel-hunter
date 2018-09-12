import AbstractView from '../components/abstractview.js';
import resize from '../utils/resize.js';

const FRAME_SIZE = {width: 468, height: 458};

export default class TwoFromThreeView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  get template() {
    const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
    let formClass = `game__content`;
    let correctSize = resize(FRAME_SIZE, {width: this.question.option1.width, height: this.question.option1.height});
    let option1 = `  <div class="game__option">
    <img src="${this.question.option1.src}" alt="${this.question.option1.alt}" width="${correctSize.width}" height="${correctSize.height}">
    <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question1" type="radio" value="photo" data-item="1">
    <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question1" type="radio" value="paint" data-item="2">
    <span>Рисунок</span>
    </label>
    </div>`;

    let correctSize2 = resize(FRAME_SIZE, {width: this.question.option2.width, height: this.question.option2.height});
    let option2 = `<div class="game__option">
    <img src="${this.question.option2.src}" alt="${this.question.option2.alt}" width="${correctSize2.width}" height="${correctSize2.height}">
    <label class="game__answer  game__answer--photo">
    <input class="visually-hidden" name="question2" type="radio" value="photo" data-item="3">
    <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
    <input class="visually-hidden" name="question2" type="radio" value="paint" data-item="4">
    <span>Рисунок</span>
    </label>
    </div>`;

    return `
      <section class="game">
        ${caption}
        <form class="${formClass}">
          ${option1}
          ${option2}
        </form>
      </section>`;
  }

  onAnswer() { }

  bind() {
    let radioElements = this.element.getElementsByTagName(`input`);
    let isFirstChecked = ``;
    let isSecondChecked = ``;

    const isAllChecked = () => {
      if (isFirstChecked !== `` && isSecondChecked !== ``) {
        this.onAnswer(radioElements[isFirstChecked].value, radioElements[isSecondChecked].value);
      }
    };

    radioElements[0].addEventListener(`change`, () => {
      isFirstChecked = 0;
      isAllChecked();
    });
    radioElements[1].addEventListener(`change`, () => {
      isFirstChecked = 1;
      isAllChecked();
    });
    radioElements[2].addEventListener(`change`, () => {
      isSecondChecked = 2;
      isAllChecked();
    });
    radioElements[3].addEventListener(`change`, () => {
      isSecondChecked = 3;
      isAllChecked();
    });
  }
}

