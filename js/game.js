import {getElementFromTemplate, changeScreen} from './createdom.js';
import {header} from './header.js';
import {footerstats} from './footer.js';
import {renderStatistics} from './stats.js';
import {questions} from './data.js';

const caption = `<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>`;
let currentScreen = 0;
let radioElements = ``;
const answers = [];
const numberOfScreens = questions.length;

const game = (question) => {
  let option1 = ``;
  let option2 = ``;
  let option3 = ``;
  let formClass = ``;
  switch (question.type) {
    //  Вариант с 1 картинкой
    case `one_from_three`:
      formClass = `game__content game__content--wide`;
      option1 = `<div class="game__option">
      <img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
      <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
      </label>
      </div>`;
      break;
    //  Вариант с 2 картинками
    case `two_from_three`:
      formClass = `game__content`;
      option1 = `  <div class="game__option">
      <img src="${question.option1.src}" alt="${question.option1.alt}" width="${question.option1.width}" height="${question.option1.height}">
      <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo" data-item="1">
      <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint" data-item="2">
      <span>Рисунок</span>
      </label> 
      </div>`;

      option2 = `<div class="game__option">
      <img src="${question.option2.src}" alt="${question.option2.alt}" width="${question.option2.width}" height="${question.option2.height}">
      <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo" data-item="3">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint" data-item="4">
      <span>Рисунок</span>
      </label>
      </div>`;
      break;
    //  Вариант с 3 картинками
    case `three_from_three`:
      formClass = `game__content  game__content--triple`;
      option1 = `<div class="game__option" data-item="${question.option1.alt}">
      <img src="${question.option1.src}" width="${question.option1.width}" height="${question.option1.height}">
      </div>`;

      option2 = `<div class="game__option" data-item="${question.option2.alt}">
      <img src="${question.option2.src}" width="${question.option2.width}" height="${question.option2.height}">
      </div>`;

      option3 = `<div class="game__option" data-item="${question.option3.alt}">
      <img src="${question.option3.src}" width="${question.option3.width}" height="${question.option3.height}">
      </div>`;
      break;
  }

  const template = `
      ${header}
    <section class="game">
      ${caption}
      <form class="${formClass}">
        ${option1}
        ${option2}
        ${option3}
      </form>
      ${footerstats}
    </section>
  `;
  return template;
};

const changeScreens = () => {
  currentScreen += 1;
  if (currentScreen < numberOfScreens) {
    changeScreen(renderScreen(currentScreen));
  } else {
    showStats();
  }
};

const scoreFor1Question = (value) => {
  if (value === questions[currentScreen].option1.value) {
    answers[currentScreen] = (`correct`);
  } else {
    answers[currentScreen] = (`wrong`);
  }
};

const showStats = () => {
  changeScreen(renderStatistics(answers));
};

const scoreFor2Question = (value1, value2) => {
  if (value1 === questions[currentScreen].option1.value && value2 === questions[currentScreen].option2.value) {
    answers[currentScreen] = (`correct`);
  } else {
    answers[currentScreen] = (`wrong`);
  }
};

const scoreFor3Question = (value) => {
  if (value === questions[currentScreen].correct) {
    answers[currentScreen] = (`correct`);
  } else {
    answers[currentScreen] = (`wrong`);
  }
};

const checkMistakes = () => {
  let mistakes = 0;
  answers.forEach(function (answer) {
    if (answer === `wrong`) {
      mistakes += 1;
    }
  });
  if (mistakes === 3) {
    showStats();
  } else {
    changeScreens();
  }
};

const addListener = (screen, type) => {
  switch (type) {
    //  Вариант с 1 картинкой
    case `one_from_three`:
      radioElements = screen.getElementsByTagName(`input`);
      radioElements[0].addEventListener(`change`, () => {
        scoreFor1Question(radioElements[0].value);
        checkMistakes();
      });
      radioElements[1].addEventListener(`change`, () => {
        scoreFor1Question(radioElements[1].value);
        checkMistakes();
      });
      break;

    //  Вариант с 2 картинками
    case `two_from_three`:
      radioElements = screen.getElementsByTagName(`input`);
      let isFirstChecked = ``;
      let isSecondChecked = ``;

      const isAllChecked = () => {
        if (isFirstChecked !== `` && isSecondChecked !== ``) {
          scoreFor2Question(radioElements[isFirstChecked].value, radioElements[isSecondChecked].value);
          checkMistakes();
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
      break;

    //  Вариант с 3 картинками
    case `three_from_three`:
      const options = screen.querySelectorAll(`.game__option`);
      options[0].addEventListener(`click`, () => {
        scoreFor3Question(options[0].getAttribute(`data-item`));
        checkMistakes();
      });

      options[1].addEventListener(`click`, () => {
        scoreFor3Question(options[1].getAttribute(`data-item`));
        checkMistakes();
      });

      options[2].addEventListener(`click`, () => {
        scoreFor3Question(options[2].getAttribute(`data-item`));
        checkMistakes();
      });
      break;
  }
};

export const renderScreen = (state) => {
  let questionScreen = getElementFromTemplate(game(questions[state]));
  addListener(questionScreen, questions[state].type);
  return questionScreen;
};
